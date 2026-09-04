(globalThis.StringRunLibrary ??= (() => {
  const isDebugPage = /(raidemulator|config)\.html/.test(location.href);
  const dancingMadUltimateZoneId = 1363;
  const safeEncounterConfig = Object.freeze({
    MyDMU_AutoMarkV5: false,
    MyDMU_LocalMarkV3: false,
    MyDMU_PartyChatEnabled: false,
    MyDMU_VoiceCalloutV2: false,
    MyDMU_P1Callout: true,
    MyDMU_P1PoisonMarkV3: false,
    MyDMU_P2TowerMarkV3: false,
    MyDMU_P2Pair2222IdleOddMode: 'role',
    MyDMU_P2OddStrategy: 'original',
    MyDMU_P2TowerCallout: false,
    MyDMU_P2ActionCallout: true,
    MyDMU_P3MahjongMarkV3: false,
    MyDMU_P3TargetMarkV3: false,
    MyDMU_P3TargetFirstPriority: 'D1/D2/D3/D4/MT/ST/H2/H1',
    MyDMU_P3TargetSecondPriority: 'D1/D2/D3/D4/MT/ST/H2/H1',
    MyDMU_P3TargetThirdPriority: 'MT/ST/D1/D2/D3/D4/H2/H1',
    MyDMU_P3DebuffCallout: true,
    MyDMU_P3ActionCallout: true,
    MyDMU_P4BuffMarkV3: false,
    MyDMU_P4BuffChat: true,
    MyDMU_P5MitigationAlert: true,
    MyDMU_P5SymphonySpreadScheme: 'regular',
  });
  const markTypes = [
    'attack1',
    'attack2',
    'attack3',
    'attack4',
    'attack5',
    'attack6',
    'attack7',
    'attack8',
    'bind1',
    'bind2',
    'bind3',
    'stop1',
    'stop2',
    'square',
    'circle',
    'cross',
    'triangle',
  ];
  const tankJobs = [1, 3, 19, 21, 32, 37];
  const healerJobs = [6, 24, 28, 33, 40];
  const dpsJobs = [2, 4, 5, 7, 20, 22, 23, 25, 26, 27, 29, 30, 31, 34, 35, 36, 38, 39, 41, 42];
  const roleOverlayRoles = Object.freeze(['MT', 'ST', 'H1', 'H2', 'D1', 'D2', 'D3', 'D4']);
  const roleOverlayLeaseMilliseconds = 4000;
  const tankJobPriority = [21, 32, 37, 19, 3, 1];
  const healerJobPriority = [24, 33, 40, 28, 6];
  const meleeJobPriority = [34, 20, 39, 22, 41, 30, 2, 4, 29];
  const physicalRangedJobPriority = [31, 23, 38, 5];
  const casterJobPriority = [42, 27, 35, 25, 36, 7, 26];
  const meleeJobs = new Set(meleeJobPriority);
  const physicalRangedJobs = new Set(physicalRangedJobPriority);
  const casterJobs = new Set(casterJobPriority);
  const jobNameById = Object.freeze({
    1: 'GLA',
    2: 'PGL',
    3: 'MRD',
    4: 'LNC',
    5: 'ARC',
    6: 'CNJ',
    7: 'THM',
    19: 'PLD',
    20: 'MNK',
    21: 'WAR',
    22: 'DRG',
    23: 'BRD',
    24: 'WHM',
    25: 'BLM',
    26: 'ACN',
    27: 'SMN',
    28: 'SCH',
    29: 'ROG',
    30: 'NIN',
    31: 'MCH',
    32: 'DRK',
    33: 'AST',
    34: 'SAM',
    35: 'RDM',
    36: 'BLU',
    37: 'GNB',
    38: 'DNC',
    39: 'RPR',
    40: 'SGE',
    41: 'VPR',
    42: 'PCT',
  });

  let stringParty = [];
  let soumaPartyRp;
  let partyUpdateTimer;
  let lastLiveParty = [];
  let roleOverlayParty = [];
  let roleOverlayLastSeen = Number.NEGATIVE_INFINITY;
  let activeEncounterInstanceId = '';
  const retiredEncounterInstanceIds = new Set();
  let latestEncounterRevision = -1;
  let encounterState = {
    zoneId: 0,
    zoneName: '',
    inEncounter: false,
    inCombat: false,
    confirmed: false,
    locked: false,
    revision: 0,
    config: { ...safeEncounterConfig },
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const waitFor = async (condition, intervalMs = 200) => {
    while (!condition())
      await sleep(intervalMs);
    return condition();
  };

  const waitForData = async (data, attrName, timeoutMs = 7000) => {
    let timer;
    try {
      return await Promise.race([
        waitFor(() => data[attrName]),
        new Promise((_resolve, reject) => {
          timer = setTimeout(() => reject(new Error(`String运行库等待 ${attrName} 超时`)), timeoutMs);
        }),
      ]);
    } finally {
      clearTimeout(timer);
    }
  };

  const getPartyDetails = (data) => {
    if (Array.isArray(data?.party?.details))
      return data.party.details;
    return [];
  };

  const createRoleArray = (prefix, count) =>
    [...Array(count).keys()].map((index) => `${prefix}${index + 1}`);

  const monotonicMilliseconds = () => globalThis.performance?.now?.() ?? Date.now();

  const normalizePartyId = (value) => value?.toString().trim().toUpperCase() ?? '';

  const isCompletePartyRoleMapping = (records, party) => {
    if (!Array.isArray(records) || records.length !== roleOverlayRoles.length ||
        !Array.isArray(party) || party.length !== roleOverlayRoles.length)
      return false;
    const ids = records.map((record) => normalizePartyId(record?.id));
    const roles = records.map((record) => record?.rp?.toString().trim().toUpperCase() ?? '');
    const partyIds = party
      .filter((member) => member.inParty)
      .map((member) => normalizePartyId(member.id));
    return ids.every((id) => id !== '') &&
      new Set(ids).size === roleOverlayRoles.length &&
      new Set(roles).size === roleOverlayRoles.length &&
      roleOverlayRoles.every((role) => roles.includes(role)) &&
      partyIds.length === roleOverlayRoles.length &&
      new Set(partyIds).size === roleOverlayRoles.length &&
      ids.every((id) => partyIds.includes(id));
  };

  const isValidRoleOverlayParty = (records) =>
    isCompletePartyRoleMapping(records, lastLiveParty);

  const isRoleOverlayConnected = () => {
    if (isDebugPage)
      return true;
    return monotonicMilliseconds() - roleOverlayLastSeen <= roleOverlayLeaseMilliseconds &&
      isValidRoleOverlayParty(roleOverlayParty);
  };

  const getRolePartySnapshot = () => {
    if (isValidRoleOverlayParty(roleOverlayParty))
      return roleOverlayParty;
    return soumaPartyRp;
  };

  const sortByJobPriority = (members, priority) => {
    const scoreByJob = new Map(priority.map((job, index) => [job, index]));
    return members
      .map((member, index) => ({ member, index }))
      .sort((left, right) => {
        const leftScore = scoreByJob.get(Number(left.member.job)) ?? 999;
        const rightScore = scoreByJob.get(Number(right.member.job)) ?? 999;
        return leftScore - rightScore || left.index - right.index;
      })
      .map(({ member }) => member);
  };

  const assignPreferredRoles = (members, preferredRoles, priority, occupiedMembers = members) => {
    const sorted = sortByJobPriority(members, priority);
    for (const role of preferredRoles) {
      if (occupiedMembers.some((member) => member.stringRP === role))
        continue;
      const member = sorted.find((candidate) => candidate.stringRP === undefined);
      if (member !== undefined)
        member.stringRP = role;
    }
  };

  const defaultSort = () => {
    const tankRoles = ['MT', 'ST', ...createRoleArray('T', 14)];
    const healerRoles = createRoleArray('H', 16);
    const dpsRoles = createRoleArray('D', 16);

    for (const member of stringParty)
      member.stringRP = undefined;
    const tanks = stringParty.filter((member) => tankJobs.includes(Number(member.job)));
    const healers = stringParty.filter((member) => healerJobs.includes(Number(member.job)));
    const dps = stringParty.filter((member) => dpsJobs.includes(Number(member.job)));
    assignPreferredRoles(tanks, tankRoles, tankJobPriority);
    assignPreferredRoles(healers, healerRoles, healerJobPriority);

    const casterCount = dps.filter((member) => casterJobs.has(Number(member.job))).length;
    if (casterCount >= 2) {
      const blackMage = dps.find((member) => Number(member.job) === 25);
      if (blackMage !== undefined)
        blackMage.stringRP = 'D2';
    }
    assignPreferredRoles(
      dps.filter((member) => meleeJobs.has(Number(member.job))),
      ['D1', 'D2'],
      meleeJobPriority,
      dps,
    );
    assignPreferredRoles(
      dps.filter((member) => physicalRangedJobs.has(Number(member.job))),
      ['D3'],
      physicalRangedJobPriority,
      dps,
    );
    assignPreferredRoles(
      dps.filter((member) => casterJobs.has(Number(member.job))),
      ['D4'],
      casterJobPriority,
      dps,
    );
    assignPreferredRoles(dps, dpsRoles, [
      ...meleeJobPriority,
      ...physicalRangedJobPriority,
      ...casterJobPriority,
    ]);

    for (const member of stringParty) {
      if (member.stringRP === undefined)
        member.stringRP = 'unknown';
    }
  };

  const updatePartyRp = () => {
    const roleParty = getRolePartySnapshot();
    if (isDebugPage || roleParty === undefined) {
      defaultSort();
      return;
    }

    for (const member of stringParty) {
      const id = normalizePartyId(member.id);
      member.stringRP = roleParty.find((record) =>
        normalizePartyId(record.id) === id)?.rp?.toString().trim().toUpperCase() ?? 'unknown';
    }
  };

  const createParty = (party) => {
    stringParty = (party ?? []).filter((member) => member.inParty).map((member) => ({ ...member }));
    updatePartyRp();
  };

  const ensureParty = (data) => {
    if (stringParty.length === 0)
      createParty(getPartyDetails(data));
  };

  const getRpByName = (data, name) => {
    ensureParty(data);
    return stringParty.find((member) => member.name === name)?.stringRP;
  };

  const getNameByRp = (data, rp) => {
    ensureParty(data);
    return stringParty.find((member) => member.stringRP === rp)?.name;
  };

  const getNameByHexId = (data, hexId) => data?.party?.idToName_?.[hexId?.toString().toUpperCase()];

  const getHexIdByName = (data, name) => {
    const partyDetail = getPartyDetails(data).find((member) => member.name === name);
    if (partyDetail?.id !== undefined)
      return partyDetail.id;
    const index = data?.party?.partyNames_?.indexOf(name) ?? -1;
    return index >= 0 ? data.party.partyIds_[index] : undefined;
  };

  const getHexIdByRp = (data, rp) => getHexIdByName(data, getNameByRp(data, rp));

  const getDecIdByRp = (data, rp) => {
    const id = getHexIdByRp(data, rp);
    return id === undefined ? undefined : Number.parseInt(id, 16);
  };

  const getRpByHexId = (data, hexId) => {
    ensureParty(data);
    const id = normalizePartyId(hexId);
    if (id === '')
      return undefined;
    return stringParty.find((member) => normalizePartyId(member.id) === id)?.stringRP;
  };

  const getRpById = (data, id) => getRpByHexId(data, Number(id).toString(16));

  const isLegalMarkType = (markType) => markTypes.includes(markType);

  const getLegalityMarkType = (markType, markNum, fallback) => {
    if (!isLegalMarkType(fallback))
      throw new Error(`备用标记非法: ${fallback}`);
    const result = `${markType}${markNum}`;
    return isLegalMarkType(result) ? result : fallback;
  };

  const normalizeActorId = (actorId) => {
    if (typeof actorId === 'string')
      return Number.parseInt(actorId, 16);
    return actorId;
  };

  const mark = (actorId, markType, localOnly = false) => {
    if (markType === 'none' || actorId === undefined)
      return;
    if (!isLegalMarkType(markType))
      throw new Error(`非法标点类型: ${markType}`);

    const actorIdNumber = normalizeActorId(actorId);
    if (!Number.isFinite(actorIdNumber))
      throw new Error(`非法 ActorID: ${actorId}`);
    if (isDebugPage) {
      console.debug('String运行库 mark', actorIdNumber, markType, localOnly);
      return;
    }
    return callOverlayHandler({
      call: 'PostNamazu',
      c: 'mark',
      p: JSON.stringify({
        ActorID: actorIdNumber,
        MarkType: markType,
        LocalOnly: localOnly,
      }),
    });
  };

  const doTextCommand = (text) => {
    if (isDebugPage) {
      console.debug('String运行库 command', text);
      return;
    }
    return callOverlayHandler({ call: 'PostNamazu', c: 'DoTextCommand', p: text });
  };

  const normalizeQueue = (queue) => queue.map((item) => {
    const normalized = { ...item };
    if (normalized.c === 'mark') {
      if (typeof normalized.p === 'string')
        normalized.p = JSON.parse(normalized.p);
      normalized.p.ActorID = normalizeActorId(normalized.p.ActorID);
      if (!Number.isFinite(normalized.p.ActorID))
        throw new Error(`非法 ActorID: ${normalized.p.ActorID}`);
      if (!isLegalMarkType(normalized.p.MarkType))
        throw new Error(`非法标点类型: ${normalized.p.MarkType}`);
    }
    if (typeof normalized.p === 'object')
      normalized.p = JSON.stringify(normalized.p);
    return normalized;
  });

  const doQueueActions = (queue, note = 'String运行库队列') => {
    const normalizedQueue = normalizeQueue(queue);
    if (isDebugPage) {
      console.debug('String运行库 queue', note, JSON.stringify(normalizedQueue, null, 1));
      return;
    }
    return callOverlayHandler({
      call: 'PostNamazu',
      c: 'DoQueueActions',
      p: JSON.stringify(normalizedQueue),
    });
  };

  const getClearMarkQueue = (localOnly = false, delayMs = 0) => {
    if (localOnly) {
      return markTypes.map((markType, index) => ({
        c: 'mark',
        p: {
          ActorID: 0xe000000,
          MarkType: markType,
          LocalOnly: true,
        },
        d: index === 0 ? delayMs : 0,
      }));
    }
    return [...Array(8).keys()].map((index) => ({
      c: 'DoTextCommand',
      p: `/mk off <${index + 1}>`,
      d: index === 0 ? delayMs : 0,
    }));
  };

  const clearMark = (localOnly = false) => doQueueActions(getClearMarkQueue(localOnly), `clearMark localOnly:${localOnly}`);

  const doWaymarks = (waymark) => {
    if (isDebugPage) {
      console.debug('String运行库 waymark', waymark);
      return;
    }
    return callOverlayHandler({
      call: 'PostNamazu',
      c: 'place',
      p: JSON.stringify(waymark),
    });
  };

  const placeSave = () => callOverlayHandler({ call: 'PostNamazu', c: 'place', p: 'save' });
  const placeLoad = () => callOverlayHandler({ call: 'PostNamazu', c: 'place', p: 'load' });
  const placeClear = () => callOverlayHandler({ call: 'PostNamazu', c: 'place', p: 'clear' });

  const getEncounterInstanceId = (state) =>
    typeof state?.instanceId === 'string' ? state.instanceId.trim() : '';

  const getEncounterRevision = (state) => {
    const revision = Number(state?.revision);
    return Number.isSafeInteger(revision) && revision >= 0 ? revision : undefined;
  };

  const isStaleEncounterState = (state) => {
    const instanceId = getEncounterInstanceId(state);
    if (instanceId !== '' && retiredEncounterInstanceIds.has(instanceId))
      return true;
    if (instanceId === '' && activeEncounterInstanceId !== '')
      return true;
    if (instanceId !== '' && activeEncounterInstanceId !== '' &&
        instanceId !== activeEncounterInstanceId) {
      return false;
    }
    const revision = getEncounterRevision(state);
    return revision !== undefined && revision < latestEncounterRevision;
  };

  const acceptEncounterState = (state) => {
    if (isStaleEncounterState(state))
      return false;
    const instanceId = getEncounterInstanceId(state);
    if (instanceId !== '' && instanceId !== activeEncounterInstanceId) {
      if (activeEncounterInstanceId !== '')
        retiredEncounterInstanceIds.add(activeEncounterInstanceId);
      activeEncounterInstanceId = instanceId;
      latestEncounterRevision = -1;
    }
    const revision = getEncounterRevision(state);
    if (revision !== undefined)
      latestEncounterRevision = revision;
    return true;
  };

  const syncEncounterState = (state) => {
    if (state?.config === undefined || !acceptEncounterState(state))
      return encounterState;
    encounterState = {
      ...state,
      inCombat: state.inCombat === true,
      config: { ...safeEncounterConfig, ...state.config },
    };
    return encounterState;
  };

  const isEncounterStateCurrent = (state) => {
    if (state?.config === undefined ||
        getEncounterInstanceId(state) !== getEncounterInstanceId(encounterState)) {
      return false;
    }
    const stateRevision = getEncounterRevision(state);
    const acceptedRevision = getEncounterRevision(encounterState);
    return stateRevision === acceptedRevision;
  };

  const getEncounterConfig = (key, fallback) => {
    const value = encounterState.config?.[key];
    return value === undefined ? fallback : value;
  };

  const getEncounterConfigSnapshot = () => ({
    ...encounterState,
    config: { ...encounterState.config },
  });

  const getSafeEncounterConfigSnapshot = () => ({ ...safeEncounterConfig });

  const callStringConfig = async (action, payload = {}, { applyState = true } = {}) => {
    if (isDebugPage)
      return { ok: true, state: getEncounterConfigSnapshot(), debug: true };
    const request = { call: 'stringConfig', action, ...payload };
    const result = await callOverlayHandler(request);
    if (result?.ok !== true)
      throw new Error(result?.error ?? 'String 本次设置桥接未返回成功状态');
    if (applyState)
      syncEncounterState(result.state);
    return result;
  };

  const requestEncounterState = async () => {
    try {
      await callStringConfig('get');
    } catch (error) {
      console.warn('String 本次设置不可用，继续使用安全默认值', error);
    }
  };

  const handleZoneChanged = async (event) => {
    const detail = event?.detail ?? event ?? {};
    const zoneId = Number(detail.zoneID ?? detail.zoneId ?? 0);
    if (!Number.isInteger(zoneId) || zoneId < 0)
      return;
    try {
      await callStringConfig('enterZone', {
        zoneId,
        zoneName: detail.zoneName ?? '',
      });
    } catch (error) {
      console.warn('String 本次设置进本重置失败，继续使用安全默认值', error);
      if (zoneId === dancingMadUltimateZoneId) {
        syncEncounterState({
          zoneId,
          inEncounter: true,
          inCombat: false,
          confirmed: false,
          locked: false,
          revision: encounterState.revision + 1,
          config: safeEncounterConfig,
        });
      }
    }
  };

  const handleCombatChanged = async (event) => {
    const detail = event?.detail ?? event ?? {};
    const inCombat = Boolean(detail.inGameCombat ?? detail.inACTCombat ?? false);
    try {
      await callStringConfig('setCombat', { inCombat });
    } catch (error) {
      console.warn('String 本次设置战斗状态同步失败', error);
    }
  };

  const sendBroadcast = (text) => {
    callOverlayHandler({
      call: 'broadcast',
      source: 'stringUserJS',
      msg: { text: text },
    });
  };

  const handleBroadcastMessage = (msg) => {
    if (msg.source !== 'stringRuntimeJS' && msg.source !== 'soumaRuntimeJS')
      return;
    if (!Array.isArray(msg.msg?.party) || msg.msg.party.length === 0)
      return;
    if (msg.source === 'stringRuntimeJS') {
      const party = msg.msg.party.map((member) => ({ ...member }));
      if (isValidRoleOverlayParty(party)) {
        roleOverlayParty = party;
        roleOverlayLastSeen = monotonicMilliseconds();
      } else {
        roleOverlayLastSeen = Number.NEGATIVE_INFINITY;
      }
    } else {
      soumaPartyRp = msg.msg.party;
    }
    if (lastLiveParty.length > 0)
      createParty(lastLiveParty);
    else
      updatePartyRp();
  };

  if (!/config\.html/.test(location.href)) {
    sendBroadcast('requestData');
    const roleOverlayHeartbeatTimer = setInterval(() => sendBroadcast('requestData'), 1000);
    roleOverlayHeartbeatTimer?.unref?.();
    addOverlayListener('PartyChanged', (event) => {
      clearTimeout(partyUpdateTimer);
      lastLiveParty = (event.party ?? []).map((member) => ({ ...member }));
      if (getRolePartySnapshot() === undefined) {
        partyUpdateTimer = setTimeout(() => createParty(event.party), 500);
        return;
      }
      createParty(event.party);
    });
    addOverlayListener('BroadcastMessage', handleBroadcastMessage);
    addOverlayListener('StringConfigChanged', (event) => syncEncounterState(event.state));
    addOverlayListener('ChangeZone', handleZoneChanged);
    addOverlayListener('onInCombatChangedEvent', handleCombatChanged);
    requestEncounterState();
  }

  return {
    getRpByName,
    getRpByHexId,
    getRpById,
    getNameByRp,
    getNameByHexId,
    getHexIdByRp,
    getHexIdByName,
    getDecIdByRp,
    sleep,
    waitFor,
    waitForData,
    mark,
    doTextCommand,
    clearMark,
    doWaymarks,
    doQueueActions,
    placeSave,
    placeLoad,
    placeClear,
    getEncounterConfig,
    getEncounterConfigSnapshot,
    getSafeEncounterConfigSnapshot,
    requestEncounterState,
    isEncounterStateCurrent,
    isRoleOverlayConnected,
    getClearMarkQueue,
    getLegalityMarkType,
  };
})());

globalThis.Util ??= {};
Util.string = globalThis.StringRunLibrary;

Options.Triggers.push({
  id: 'StringRunLibrary',
  zoneId: ZoneId.MatchAll,
  initData: () => ({ stringFL: globalThis.StringRunLibrary }),
});
