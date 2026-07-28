(globalThis.StringRunLibrary ??= (() => {
  const stringNativeVfxApiVersion = 5;
  const stringNativeVfxInstallCapability = '__STRING_VFX_INSTALL_CAPABILITY__';
  const isDebugPage = /(raidemulator|config)\.html/.test(location.href);
  const dancingMadUltimateZoneId = 1363;
  const safeEncounterConfig = Object.freeze({
    MyDMU_AutoMarkV5: false,
    MyDMU_LocalMarkV3: false,
    MyDMU_PartyChatEnabled: false,
    MyDMU_StringNativeVfx: false,
    MyDMU_StringNativeVfxP1: false,
    MyDMU_StringNativeVfxP2: false,
    MyDMU_StringNativeVfxP3: false,
    MyDMU_StringNativeVfxP4: false,
    MyDMU_StringNativeVfxP5: false,
    MyDMU_StringNativeVfxPersonalGuide: false,
    MyDMU_P1Callout: true,
    MyDMU_P1PoisonMarkV3: false,
    MyDMU_P1BeamOrder: 'H2/H1/ST/MT/D1/D2/D3/D4',
    MyDMU_P1Line23Strategy: 'mt_st',
    MyDMU_P1TeleportStrategy: 'standard',
    MyDMU_P2TowerMarkV3: false,
    MyDMU_P2Pair2222IdleOddMode: 'role',
    MyDMU_P2OddStrategy: 'original',
    MyDMU_P2UseBbyPos: false,
    MyDMU_P2EndTowerStrategy: 'north',
    MyDMU_P2TrineDrawMode: 'preview',
    MyDMU_P2TowerCallout: false,
    MyDMU_P2ActionCallout: true,
    MyDMU_P3MahjongMarkV3: false,
    MyDMU_P3TargetMarkV3: false,
    MyDMU_P3FireBuffOrder: 'MT/ST/H1/H2/D1/D2/D3/D4',
    MyDMU_P3SuperJumpBait: 'D3',
    MyDMU_P3KnockbackStrategy: 'thht',
    MyDMU_P3SlapRoleSectors: false,
    MyDMU_P3SlapRouteArrow: false,
    MyDMU_P3Attack1DoubleTether: false,
    MyDMU_P3Stop2DoubleTether: false,
    MyDMU_P3TowerStrategy: 'nocchh',
    MyDMU_P3TowerHeading: 'heel',
    MyDMU_P3TowerFrame: 'boss',
    MyDMU_P3TargetFirstPriority: 'D1/D2/D3/D4/MT/ST/H2/H1',
    MyDMU_P3TargetSecondPriority: 'D1/D2/D3/D4/MT/ST/H2/H1',
    MyDMU_P3TargetThirdPriority: 'MT/ST/D1/D2/D3/D4/H2/H1',
    MyDMU_P3DebuffCallout: true,
    MyDMU_P3ActionCallout: true,
    MyDMU_P4BuffMarkV3: false,
    MyDMU_P4BuffChat: true,
    MyDMU_P4BuffChatChannel: 'e',
    MyDMU_P4ElementSpreadStrategy: 'd_left',
    MyDMU_P4EyeStrategy: 'fixed',
    MyDMU_P5MitigationAlert: true,
    MyDMU_P5SymphonySpreadScheme: 'regular',
    MyDMU_P5SymphonyOrder: 'H2/D2/D4/ST/MT/D3/H1/D1',
    MyDMU_P5MitigationChannel: 'e',
    MyDMU_P5GroundFireCount: '3',
    MyDMU_P5GroundFireGuideEnabled: false,
    MyDMU_P5ForsakenGuideEnabled: false,
    MyDMU_P5ForsakenStart: '1',
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
  const defaultJobSort = [
    21, // WAR
    32, // DRK
    37, // GNB
    19, // PLD
    33, // AST
    24, // WHM
    40, // SGE
    28, // SCH
    41, // VPR
    34, // SAM
    30, // NIN
    39, // RPR
    22, // DRG
    20, // MNK
    38, // DNC
    23, // BRD
    31, // MCH
    42, // PCT
    25, // BLM
    27, // SMN
    35, // RDM
    36, // BLU
  ];
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
  let externalPartyRp;
  let partyUpdateTimer;
  let lastLiveParty = [];
  let lastLivePlayerEvent;
  let arrReplayPartyMode = false;
  let arrReplayPartyCandidates = [];
  let arrReplayPartyReady = false;
  let arrReplayPartyPreservedForResume = false;
  let arrReplayPartySpawnCursor = 0;
  let arrReplayRoleById = new Map();
  let arrReplayStrictRestoreZone;
  let arrReplayStrictIdentityPinned = false;
  let arrReplayStrictRestoreParty = [];
  let arrReplayStrictRestorePlayerEvent;
  const arrLogReplayNativePartySettleMs = 500;
  let arrLogReplayTimer;
  let arrLogReplayRestoreCaptured = false;
  let arrLogReplayRestoreParty = [];
  let arrLogReplayRestorePlayerEvent;
  let arrLogReplayState = {
    active: false,
    pending: false,
    published: false,
    generation: 0,
    zoneId: 0,
    zoneName: '',
    localPlayerId: undefined,
    localPlayerName: undefined,
    members: new Map(),
  };
  let roleOverlayParty = [];
  let roleOverlayLastSeen = Number.NEGATIVE_INFINITY;
  let encounterState = {
    zoneId: 0,
    zoneName: '',
    inEncounter: false,
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

  const isValidRoleOverlayParty = (records) => {
    const party = arrReplayPartyMode ? stringParty : lastLiveParty;
    return isCompletePartyRoleMapping(records, party);
  };

  const isRoleOverlayConnected = () => {
    if (isDebugPage || arrReplayPartyMode)
      return true;
    return monotonicMilliseconds() - roleOverlayLastSeen <= roleOverlayLeaseMilliseconds &&
      isValidRoleOverlayParty(roleOverlayParty);
  };

  const defaultSort = () => {
    const tankRoles = ['MT', 'ST', ...createRoleArray('T', 14)];
    const healerRoles = createRoleArray('H', 16);
    const dpsRoles = createRoleArray('D', 16);
    let tankIndex = 0;
    let healerIndex = 0;
    let dpsIndex = 0;

    stringParty.sort((a, b) => {
      const left = defaultJobSort.indexOf(Number(a.job));
      const right = defaultJobSort.indexOf(Number(b.job));
      return (left < 0 ? 999 : left) - (right < 0 ? 999 : right);
    });

    for (const member of stringParty) {
      const job = Number(member.job);
      if (tankJobs.includes(job))
        member.stringRP = tankRoles[tankIndex++] ?? 'unknown';
      else if (healerJobs.includes(job))
        member.stringRP = healerRoles[healerIndex++] ?? 'unknown';
      else if (dpsJobs.includes(job))
        member.stringRP = dpsRoles[dpsIndex++] ?? 'unknown';
      else
        member.stringRP = 'unknown';
    }
  };

  const updatePartyRp = () => {
    if (arrReplayPartyMode) {
      if (isCompletePartyRoleMapping(externalPartyRp, stringParty)) {
        for (const member of stringParty) {
          const id = normalizePartyId(member.id);
          member.stringRP = externalPartyRp.find((record) =>
            normalizePartyId(record.id) === id)?.rp?.toString().trim().toUpperCase() ?? 'unknown';
        }
        return;
      }
      if (arrReplayRoleById.size === roleOverlayRoles.length) {
        for (const member of stringParty)
          member.stringRP = arrReplayRoleById.get(normalizePartyId(member.id)) ?? 'unknown';
        return;
      }
      defaultSort();
      arrReplayRoleById = new Map(stringParty.map((member) => [
        normalizePartyId(member.id),
        member.stringRP,
      ]));
      return;
    }
    if (isDebugPage || externalPartyRp === undefined) {
      defaultSort();
      return;
    }

    for (const member of stringParty) {
      member.stringRP = externalPartyRp.find((record) => record.id === member.id)?.rp ?? 'unknown';
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

  const getRpByHexId = (data, hexId) => getRpByName(data, getNameByHexId(data, hexId));

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

  let arrReplayExternalEffectsAuthority = 'live';
  const arrReplayExternalEffectsAllowed = () =>
    arrReplayExternalEffectsAuthority === 'live' &&
    !arrReplayState.active && !arrLogReplayState.active && !arrLogReplayState.pending;
  const arrReplayBlockExternalEffects = (active) => {
    arrReplayExternalEffectsAuthority = active ? 'replay' : 'quarantine';
  };
  const arrReplayReleaseExternalEffects = () => {
    arrReplayExternalEffectsAuthority = 'live';
  };

  const mark = (actorId, markType, localOnly = false) => {
    if (markType === 'none' || actorId === undefined)
      return;
    if (!isLegalMarkType(markType))
      throw new Error(`非法标点类型: ${markType}`);

    const actorIdNumber = normalizeActorId(actorId);
    if (!Number.isFinite(actorIdNumber))
      throw new Error(`非法 ActorID: ${actorId}`);
    if (!arrReplayExternalEffectsAllowed())
      return false;

    if (isDebugPage) {
      console.debug('String运行库 mark', actorIdNumber, markType, localOnly);
      return;
    }
    callOverlayHandler({
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
    if (!arrReplayExternalEffectsAllowed())
      return false;
    if (isDebugPage) {
      console.debug('String运行库 command', text);
      return;
    }
    callOverlayHandler({ call: 'PostNamazu', c: 'DoTextCommand', p: text });
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
    if (!arrReplayExternalEffectsAllowed())
      return false;
    const normalizedQueue = normalizeQueue(queue);
    if (isDebugPage) {
      console.debug('String运行库 queue', note, JSON.stringify(normalizedQueue, null, 1));
      return;
    }
    callOverlayHandler({
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
    if (!arrReplayExternalEffectsAllowed())
      return false;
    if (isDebugPage) {
      console.debug('String运行库 waymark', waymark);
      return;
    }
    callOverlayHandler({
      call: 'PostNamazu',
      c: 'place',
      p: JSON.stringify(waymark),
    });
  };

  const placeSave = () => arrReplayExternalEffectsAllowed()
    ? callOverlayHandler({ call: 'PostNamazu', c: 'place', p: 'save' })
    : false;
  const placeLoad = () => arrReplayExternalEffectsAllowed()
    ? callOverlayHandler({ call: 'PostNamazu', c: 'place', p: 'load' })
    : false;
  const placeClear = () => arrReplayExternalEffectsAllowed()
    ? callOverlayHandler({ call: 'PostNamazu', c: 'place', p: 'clear' })
    : false;

  const vfxClientId = `raidboss-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  let vfxSessionPromise;
  let activeVfxSessionId;
  let vfxHeartbeatTimer;
  let vfxHeartbeatInFlight = false;
  let vfxGeneration = 0;
  let arrReplayWarmVfx = false;
  let arrReplayWarmVfxScopes = new Map();
  let arrReplayVfxRetainedMode = false;
  let arrReplayVfxPhysicalActive = false;
  let arrReplayVfxPhysicalRevision = 0;
  let arrReplayVfxExpiryTimer;
  let arrReplayVfxCleanupPromise;
  let arrReplayVfxPublishChain = Promise.resolve();
  let arrReplayVfxPublishGeneration = -1;
  let arrReplayVfxStableIds = new Map();
  const arrReplayVfxPhysicalScope = 'arr.replay.scene';
  const arrReplayQueueLimit = 64;
  const arrReplayQueueMaximumUtf8Bytes = 16 * 1024 * 1024;
  const arrReplayMaximumEnvelopeUtf8Bytes = 256 * 1024;
  const arrReplayStateProjectionVersion = 1;
  const arrReplayMaximumStatePositionAbsolute = 10000;
  const arrReplayMaximumStateHeadingAbsolute = 3.141593;
  const arrReplayBrowserRpcTimeoutMs = 1000;
  const arrReplayBrowserFastRetryMs = 500;
  const arrReplayBrowserRetryMs = 5000;
  const arrReplayBrowserRenewalMs = 2000;
  const arrReplayBrowserMaximumHandshakeRpcAttempts = 4;
  const arrReplayBrowserHandshakeBudgetMs = 15000;
  const arrReplayBrowserReadinessProbeMs = 1000;
  const arrReplayBrowserMaximumExplicitRetries = 3;
  const arrReplayBrowserExplicitRetryCooldownMs = 5000;
  const arrReplayBrowserPageRole = (() => {
    let query = '';
    try {
      if (typeof globalThis.location?.search === 'string')
        query = globalThis.location.search;
      if (query === '' && typeof globalThis.location?.href === 'string') {
        const question = globalThis.location.href.indexOf('?');
        if (question >= 0)
          query = globalThis.location.href.slice(question);
      }
    } catch (_error) {
      return 'alerts';
    }
    const hash = query.indexOf('#');
    if (hash >= 0)
      query = query.slice(0, hash);
    if (query.startsWith('?'))
      query = query.slice(1);
    for (const field of query.split('&')) {
      if (field === '')
        continue;
      const equals = field.indexOf('=');
      const rawKey = equals < 0 ? field : field.slice(0, equals);
      const rawValue = equals < 0 ? '' : field.slice(equals + 1);
      try {
        if (decodeURIComponent(rawKey.replace(/\+/gu, ' ')) === 'alerts' &&
            decodeURIComponent(rawValue.replace(/\+/gu, ' ')) === '0')
          return 'timeline-only';
      } catch (_error) {
        // Only a successfully decoded explicit alerts=0 removes ARR authority.
      }
    }
    return 'alerts';
  })();
  const arrReplayBrowserPageEligible =
    arrReplayBrowserPageRole === 'alerts';
  const arrReplayWarmBatchMaximumEvents = 64;
  const arrReplayWarmBatchMaximumUtf8Bytes = 256 * 1024;
  const arrReplayAllowedLineLengths = Object.freeze({
    '03': [21, 21],
    '20': [13, 13],
    '21': [54, 54],
    '22': [54, 54],
    '26': [12, 12],
    '27': [10, 10],
    '30': [12, 12],
    '35': [12, 12],
    '38': [15, 195],
    '257': [7, 7],
    '261': [4, 128],
    '263': [8, 8],
    '270': [9, 9],
    '271': [9, 9],
    '273': [8, 8],
    '274': [10, 10],
  });
  const arrReplayAllowedTypesBySemantic = Object.freeze({
    PlayerSpawn: ['03', '261'],
    NpcSpawn: ['03', '261'],
    ActorCast: ['20', '263'],
    Ability1: ['21'],
    Ability8: ['21', '22'],
    Ability16: ['21', '22'],
    Ability24: ['21', '22'],
    Ability32: ['21', '22'],
    ActorControl: ['273', '27', '35'],
    ActorControlSelf: ['274'],
    ActorControlTarget: ['261'],
    StatusEffectList: ['38', '26', '30'],
    BossStatusEffectList: ['38', '26', '30'],
    ActorMove: [],
    ActorSetPos: ['271'],
    MapEffect: ['257'],
    ContentDirectorActor: ['261'],
  });
  const arrReplayPinnedTargetlessAbilityIds = Object.freeze(['BB3C', 'BB3D', 'BB38']);
  const arrReplayFixtureProfiles = Object.freeze([
    Object.freeze({
      id: 'd033',
      fixtureSha256: 'D0333A9A49FDF7ED3B85E9410450E0AE4EA002AF201BA6663C984728DE5B40D1',
      headerPlayerIndex: 0,
      headerJobs: Object.freeze([23, 24, 19, 28, 32, 39, 22, 35]),
      localActorId: '0x10091A82',
      localAlias: '吟游诗人',
      localJob: 23,
      maximumReplayMs: 1264261,
      maximumSegmentSequence: 185292,
      partyReadyByMs: 202,
      p5NpcBaseId: 9020,
      pullResets: Object.freeze([
        Object.freeze({
          chapterIndex: 0,
          chapterType: 5,
          relativeOffset: 149222,
          replayMs: 8270,
          reason: 'chapter-5',
        }),
        Object.freeze({
          chapterIndex: 2,
          chapterType: 2,
          relativeOffset: 450566,
          replayMs: 67766,
          reason: 'chapter-2',
        }),
      ]),
      party: Object.freeze([
        Object.freeze({
          id: '10091A82',
          name: '吟游诗人',
          job: 23,
          currentHP: 0,
          rp: 'D3',
        }),
        Object.freeze({ id: '1007292D', name: '白魔法师', job: 24, rp: 'H1' }),
        Object.freeze({ id: '1006BBC2', name: '骑士', job: 19, rp: 'MT' }),
        Object.freeze({ id: '10071ACF', name: '学者', job: 28, rp: 'H2' }),
        Object.freeze({ id: '10073A61', name: '暗黑骑士', job: 32, rp: 'ST' }),
        Object.freeze({ id: '100717E5', name: '钐镰客', job: 39, rp: 'D1' }),
        Object.freeze({ id: '1006676A', name: '龙骑士', job: 22, rp: 'D2' }),
        Object.freeze({ id: '1007157F', name: '赤魔法师', job: 35, rp: 'D4' }),
      ]),
    }),
    Object.freeze({
      id: '3fd',
      fixtureSha256: '3FD189AADE796006304365133B431A0DCEFB02B5E9C9127556694829E06FA72A',
      headerPlayerIndex: 2,
      headerJobs: Object.freeze([28, 19, 23, 39, 32, 24, 41, 27]),
      localActorId: '0x10025941',
      localAlias: '吟游诗人',
      localJob: 23,
      maximumReplayMs: 1187331,
      maximumSegmentSequence: 186309,
      partyReadyByMs: 216,
      p5NpcBaseId: 19511,
      pullResets: Object.freeze([
        Object.freeze({
          chapterIndex: 0,
          chapterType: 5,
          relativeOffset: 145718,
          replayMs: 9311,
          reason: 'chapter-5',
        }),
      ]),
      party: Object.freeze([
        Object.freeze({ id: '10029515', name: '骑士', job: 19, rp: 'MT' }),
        Object.freeze({ id: '1002751C', name: '暗黑骑士', job: 32, rp: 'ST' }),
        Object.freeze({
          id: '10025941',
          name: '吟游诗人',
          job: 23,
          currentHP: 0,
          rp: 'D1',
        }),
        Object.freeze({ id: '10021B42', name: '钐镰客', job: 39, rp: 'D2' }),
        Object.freeze({ id: '10029456', name: '白魔法师', job: 24, rp: 'H1' }),
        Object.freeze({ id: '10028A6A', name: '学者', job: 28, rp: 'H2' }),
        Object.freeze({ id: '10026A73', name: '蝰蛇剑士', job: 41, rp: 'D3' }),
        Object.freeze({ id: '10026C63', name: '召唤师', job: 27, rp: 'D4' }),
      ]),
    }),
  ]);
  const arrReplayMaximumMs = Math.max(
    ...arrReplayFixtureProfiles.map((profile) => profile.maximumReplayMs),
  );
  const arrReplayProfileById = new Map(
    arrReplayFixtureProfiles.map((profile) => [profile.id, profile]),
  );
  const arrReplayFindFixtureProfile = (
      fixtureSha256,
      playerIndex,
      localPlayerId,
      localPlayerName) =>
    arrReplayFixtureProfiles.find((profile) =>
      profile.fixtureSha256 === fixtureSha256 &&
      profile.headerPlayerIndex === playerIndex &&
      profile.localActorId === localPlayerId &&
      profile.localAlias === localPlayerName &&
      profile.headerJobs[profile.headerPlayerIndex] === profile.localJob);
  const arrReplayCurrentFixtureProfile = () => arrReplayProfileById.get(arrReplayState.profileId);
  const arrReplayNextPullReset = () =>
    arrReplayCurrentFixtureProfile()?.pullResets[arrReplayState.nextPullResetIndex];
  let arrReplayState = {
    active: false,
    epochHighWater: -1,
    replayEpoch: -1,
    sequence: 0,
    replayMs: 0,
    playbackRate: 1.0,
    generation: 0,
    lastReset: undefined,
    wallAnchorMs: 0,
    lastExposedReplayMs: 0,
    profileId: undefined,
    fixtureSha256: undefined,
    playerIndex: undefined,
    localPlayerId: undefined,
    localPlayerName: undefined,
    partyReady: false,
    lastSegmentSequence: -1,
    cutSegmentSequence: -1,
    warmComplete: false,
    nextPullResetIndex: 0,
  };
  let arrReplayQueue = [];
  let arrReplayQueueHead = 0;
  let arrReplayPumpRunning = false;
  let arrReplayProcessingItem;
  let arrReplayPendingDeliveryCount = 0;
  let arrReplayQueuedUtf8Bytes = 0;
  let arrReplayIngressGeneration = 0;
  let arrReplayIngressEpochHighWater = -1;
  let arrReplayIngressActive = false;
  let arrReplayCleanupToken = 0;
  // 3FD contains 288 unique NPC spawns plus the fixed 8-player party.
  // Type-5 chapter boundaries are replay barriers, not actor despawns.
  const arrReplayCombatantLimit = 512;
  const arrReplayCombatantQueryLimit = 64;
  let arrReplayCombatants = new Map();
  let arrReplayCombatantsGeneration = -1;
  let arrReplayCombatantsPreservedForResume = false;
  const arrReplayNativeDate = globalThis.Date;
  const arrReplayNativePromise = globalThis.Promise;
  const arrReplayNativePromiseThen = globalThis.Promise.prototype.then;
  const arrReplayNativeSetTimeout = globalThis.setTimeout.bind(globalThis);
  const arrReplayNativeClearTimeout = globalThis.clearTimeout.bind(globalThis);
  const arrReplayNativeSetInterval = globalThis.setInterval.bind(globalThis);
  const arrReplayNativeClearInterval = globalThis.clearInterval.bind(globalThis);
  const arrReplayNativeCallOverlayHandler =
    typeof globalThis.callOverlayHandler === 'function'
      ? globalThis.callOverlayHandler.bind(globalThis)
      : undefined;
  const arrReplayNativeCryptoGetRandomValues =
    typeof globalThis.crypto?.getRandomValues === 'function'
      ? globalThis.crypto.getRandomValues.bind(globalThis.crypto)
      : undefined;
  let arrReplayLastPageActivationUnixMicros = 0;
  const arrReplayBrowserSession = {
    status: arrReplayBrowserPageEligible
      ? 'uninitialized'
      : 'ineligible-timeline-only',
    pageRole: arrReplayBrowserPageRole,
    eligible: arrReplayBrowserPageEligible,
    locked: false,
    subscribed: false,
    pageHidden: false,
    pageSessionId: undefined,
    pageActivatedAtUnixMicros: 0,
    handshakeGeneration: 0,
    handshakeTimer: undefined,
    handshakeInFlight: false,
    handshakeRpcAttempts: 0,
    handshakeBudgetStartedAtMs: undefined,
    rawRpcOutstanding: 0,
    dormant: false,
    dormantReason: undefined,
    dormantCleanupInFlight: false,
    dormantCleanupPromise: arrReplayNativePromise.resolve(),
    overlayApiReadiness: 'unknown',
    readinessObservedNotReady: false,
    explicitRetryCount: 0,
    lastExplicitRetryAtMs: undefined,
    active: undefined,
    candidate: undefined,
    candidateDelivery: undefined,
    postAckDelivery: undefined,
    pageCleanupPromise: arrReplayNativePromise.resolve(),
    lastError: undefined,
  };
  const arrReplaySchedulerLimits = Object.freeze({
    maximumPendingTasks: 16384,
    maximumCreatedTasks: 131072,
    maximumCallbacksPerAdvance: 32768,
    maximumDelayMilliseconds: 86400000,
    maximumMicrotaskTurnsPerControlledRun: 4096,
  });
  const arrReplayVirtualTimerFirstHandle = 0x40000000;
  let arrReplayVirtualTimerNextHandle = arrReplayVirtualTimerFirstHandle;
  const arrReplayPromiseTimerHandles = new WeakMap();
  let arrReplayControlledContext;
  let arrReplayScheduler = {
    generation: 0,
    tasks: new Map(),
    nextOrdinal: 0,
    createdTasks: 0,
    callbacksExecuted: 0,
    peakPendingTasks: 0,
    dateEpochMs: arrReplayNativeDate.now(),
    nativeWakeHandle: undefined,
    fault: undefined,
  };
  const liveSemanticQueueLimit = 256;
  let liveSemanticState = {
    active: false,
    generationHighWater: -1,
    generation: -1,
    sequence: 0,
    lastNetworkEpoch: 0,
    lastReset: undefined,
  };
  let liveSemanticQueue = [];
  let liveSemanticQueueHead = 0;
  let liveSemanticPumpRunning = false;

  const vfxPrimitiveTypes = Object.freeze({
    circle: 'circle',
    donut: 'donut',
    sector: 'sector',
    rect: 'rect',
    line: 'line',
    arrow: 'arrow',
    fixedLabel: 'fixedLabel',
  });
  const vfxClassifications = Object.freeze({
    danger: 'danger',
    guide: 'guide',
    label: 'label',
  });
  const vfxDirectionModes = Object.freeze({
    fixed: 'fixed',
    sourceHeading: 'sourceHeading',
    towardTarget: 'towardTarget',
    spanEndpoints: 'spanEndpoints',
  });
  const vfxRectPivots = Object.freeze({
    center: 'center',
    start: 'start',
  });
  const vfxFixedLabels = Object.freeze({
    move: 'move',
    stop: 'stop',
    real: 'real',
    fake: 'fake',
  });
  const vfxLimits = Object.freeze({
    maximumPrimitivesPerFrame: 32,
    maximumFramesPerSecond: 20,
    maximumActivePrimitives: 64,
    maximumFixedLabels: 16,
    maximumEntityReferencesPerTick: 128,
    maximumScopes: 16,
    maximumIdentifierLength: 48,
    minimumDurationSeconds: 0.5,
    maximumDurationSeconds: 60,
    minimumSize: 0.01,
    maximumSize: 1000,
    minimumEndpointDistance: 0.01,
    maximumAbsoluteCoordinate: 100000,
    maximumAbsoluteRotationRadians: Math.PI * 2,
    minimumSectorAngleRadians: 0.001,
    maximumSectorAngleRadians: Math.PI * 2,
    minimumLabelPixelHeight: 8,
    maximumLabelPixelHeight: 128,
    maximumAbsoluteLabelWorldYOffset: 100,
    maximumBrightness: 4,
    maximumOutlineWidth: 100,
    minimumGradientPower: 0.1,
    maximumGradientPower: 8,
    maximumPulseRate: 4,
    maximumPulseAmplitude: 1,
  });

  const assertVfxObject = (value, name) => {
    if (value === null || typeof value !== 'object' || Array.isArray(value))
      throw new TypeError(`${name} 必须是对象`);
    return value;
  };

  const assertVfxKeys = (value, allowedKeys, name) => {
    const unexpected = Object.keys(value).filter((key) => !allowedKeys.includes(key));
    if (unexpected.length !== 0)
      throw new TypeError(`${name} 不支持字段：${unexpected.join(', ')}`);
  };

  const normalizeVfxNumber = (value, minimum, maximum, name) => {
    if (typeof value !== 'number' || !Number.isFinite(value) ||
        value < minimum || value > maximum) {
      throw new RangeError(`${name} 必须是 ${minimum} 到 ${maximum} 之间的有限数字`);
    }
    return value;
  };

  const normalizeVfxIdentifier = (value, name) => {
    if (typeof value !== 'string' || value !== value.trim() ||
        !/^[a-z0-9][a-z0-9_.-]{0,47}$/iu.test(value)) {
      throw new TypeError(`${name} 必须是 1..48 位字母、数字、点、下划线或连字符`);
    }
    return value.toLowerCase();
  };

  const normalizeVfxColor = (value, name) => {
    if (!Array.isArray(value) || value.length !== 4)
      throw new TypeError(`${name} 必须是 [r, g, b, a]`);
    return Object.freeze(value.map((component, index) =>
      normalizeVfxNumber(component, 0, 1, `${name}[${index}]`)));
  };

  const normalizeVfxAnchor = (value, name = 'anchor') => {
    const anchor = assertVfxObject(value, name);
    const normalizeEntityId = () => {
      let entityId;
      if (typeof anchor.entityId === 'string')
        entityId = anchor.entityId.replace(/^0x/iu, '');
      else if (Number.isSafeInteger(anchor.entityId))
        entityId = anchor.entityId.toString(16);
      else
        throw new TypeError(`${name}.entityId 必须是实体 ID`);
      if (!/^[14][0-9a-f]{7}$/iu.test(entityId)) {
        throw new TypeError(
          `${name}.entityId 必须是 0x1XXXXXXX 玩家或 0x4XXXXXXX 游戏实体 ID`,
        );
      }
      return entityId.toUpperCase();
    };
    const normalizeCoordinate = (coordinate, field) => normalizeVfxNumber(
      coordinate,
      -vfxLimits.maximumAbsoluteCoordinate,
      vfxLimits.maximumAbsoluteCoordinate,
      `${name}.${field}`,
    );

    if (anchor.kind === 'entity') {
      assertVfxKeys(anchor, ['kind', 'entityId', 'x', 'y', 'z'], `${name} entity anchor`);
      return Object.freeze({
        kind: 'entity',
        entityId: normalizeEntityId(),
        x: normalizeCoordinate(anchor.x, 'x'),
        y: normalizeCoordinate(anchor.y, 'y'),
        z: normalizeCoordinate(anchor.z, 'z'),
      });
    }
    if (anchor.kind === 'world') {
      assertVfxKeys(anchor, ['kind', 'x', 'y', 'z'], `${name} world anchor`);
      return Object.freeze({
        kind: 'world',
        x: normalizeCoordinate(anchor.x, 'x'),
        y: normalizeCoordinate(anchor.y, 'y'),
        z: normalizeCoordinate(anchor.z, 'z'),
      });
    }
    if (anchor.type === 'entity') {
      assertVfxKeys(anchor, ['type', 'entityId'], `${name} shorthand entity anchor`);
      return Object.freeze({
        kind: 'entity',
        entityId: normalizeEntityId(),
        x: 0,
        y: 0,
        z: 0,
      });
    }
    if (anchor.type === 'world') {
      assertVfxKeys(anchor, ['type', 'position'], `${name} world anchor`);
      if (!Array.isArray(anchor.position) || anchor.position.length !== 3)
        throw new TypeError(`${name}.position 必须是 [x, y, z]`);
      return Object.freeze({
        kind: 'world',
        x: normalizeCoordinate(anchor.position[0], 'position[0]'),
        y: normalizeCoordinate(anchor.position[1], 'position[1]'),
        z: normalizeCoordinate(anchor.position[2], 'position[2]'),
      });
    }
    throw new TypeError(`${name} 必须使用 canonical kind 或 shorthand type anchor`);
  };

  const getKnownVfxAnchorDistance = (left, right) => {
    if (left.kind !== right.kind)
      return;
    if (left.kind === 'entity' && left.entityId !== right.entityId)
      return;
    const deltaX = left.x - right.x;
    const deltaZ = left.z - right.z;
    return Math.hypot(deltaX, deltaZ);
  };

  const assertVfxAnchorPair = (left, right, name) => {
    const distance = getKnownVfxAnchorDistance(left, right);
    if (distance === undefined)
      return;
    if (distance < vfxLimits.minimumEndpointDistance || distance > vfxLimits.maximumSize) {
      throw new RangeError(
        `${name} 的已知 XZ 端点距离必须在 ` +
        `${vfxLimits.minimumEndpointDistance} 到 ${vfxLimits.maximumSize} 之间`,
      );
    }
  };

  const normalizeVfxClassification = (value, defaultValue, primitiveType) => {
    const classification = value ?? defaultValue;
    if (!Object.values(vfxClassifications).includes(classification)) {
      throw new TypeError(
        `${primitiveType}.classification 只接受 ${Object.values(vfxClassifications).join('、')}`,
      );
    }
    if (primitiveType === vfxPrimitiveTypes.fixedLabel) {
      if (classification !== vfxClassifications.label)
        throw new TypeError('fixedLabel.classification 必须是 label');
    } else if (classification === vfxClassifications.label) {
      throw new TypeError(`${primitiveType}.classification 不能是 label`);
    }
    return classification;
  };

  const normalizeVfxStyle = (value, primitiveType, maximumShapeOutlineWidth) => {
    const style = value === undefined ? {} : assertVfxObject(value, `${primitiveType}.style`);
    const isLabel = primitiveType === vfxPrimitiveTypes.fixedLabel;
    assertVfxKeys(
      style,
      isLabel
        ? ['color', 'brightness']
        : ['color', 'brightness', 'gradient', 'outline', 'pulse'],
      `${primitiveType}.style`,
    );
    const normalized = {
      color: normalizeVfxColor(
        style.color ?? [1, 1, 1, 1],
        `${primitiveType}.style.color`,
      ),
      brightness: normalizeVfxNumber(
        style.brightness ?? 1,
        0,
        vfxLimits.maximumBrightness,
        `${primitiveType}.style.brightness`,
      ),
    };
    if (isLabel)
      return Object.freeze(normalized);

    const gradient = style.gradient === undefined
      ? { color: normalized.color, power: 1 }
      : assertVfxObject(style.gradient, `${primitiveType}.style.gradient`);
    assertVfxKeys(gradient, ['color', 'power'], `${primitiveType}.style.gradient`);
    normalized.gradient = Object.freeze({
      color: normalizeVfxColor(
        gradient.color,
        `${primitiveType}.style.gradient.color`,
      ),
      power: normalizeVfxNumber(
        gradient.power,
        vfxLimits.minimumGradientPower,
        vfxLimits.maximumGradientPower,
        `${primitiveType}.style.gradient.power`,
      ),
    });

    const outline = style.outline === undefined
      ? { color: [0, 0, 0, 0], width: 0 }
      : assertVfxObject(style.outline, `${primitiveType}.style.outline`);
    assertVfxKeys(outline, ['color', 'width'], `${primitiveType}.style.outline`);
    const maximumOutlineWidth = Math.min(
      vfxLimits.maximumOutlineWidth,
      maximumShapeOutlineWidth,
    );
    normalized.outline = Object.freeze({
      color: normalizeVfxColor(outline.color, `${primitiveType}.style.outline.color`),
      width: normalizeVfxNumber(
        outline.width,
        0,
        maximumOutlineWidth,
        `${primitiveType}.style.outline.width`,
      ),
    });

    const pulse = style.pulse === undefined
      ? { rate: 0, amplitude: 0 }
      : assertVfxObject(style.pulse, `${primitiveType}.style.pulse`);
    assertVfxKeys(pulse, ['rate', 'amplitude'], `${primitiveType}.style.pulse`);
    normalized.pulse = Object.freeze({
      rate: normalizeVfxNumber(
        pulse.rate,
        0,
        vfxLimits.maximumPulseRate,
        `${primitiveType}.style.pulse.rate`,
      ),
      amplitude: normalizeVfxNumber(
        pulse.amplitude,
        0,
        vfxLimits.maximumPulseAmplitude,
        `${primitiveType}.style.pulse.amplitude`,
      ),
    });
    return Object.freeze(normalized);
  };

  const vfxCommonKeys = Object.freeze([
    'id',
    'type',
    'classification',
    'durationSeconds',
    'style',
  ]);

  const normalizeVfxCommon = (value, primitiveType, defaultClassification, shapeKeys) => {
    const primitive = assertVfxObject(value, primitiveType);
    assertVfxKeys(primitive, [...vfxCommonKeys, ...shapeKeys], primitiveType);
    if (primitive.type !== undefined && primitive.type !== primitiveType)
      throw new TypeError(`${primitiveType}.type 必须是 ${primitiveType}`);
    return {
      primitive,
      normalized: {
        id: normalizeVfxIdentifier(primitive.id, `${primitiveType}.id`),
        type: primitiveType,
        classification: normalizeVfxClassification(
          primitive.classification,
          defaultClassification,
          primitiveType,
        ),
        durationSeconds: normalizeVfxNumber(
          primitive.durationSeconds ?? 10,
          vfxLimits.minimumDurationSeconds,
          vfxLimits.maximumDurationSeconds,
          `${primitiveType}.durationSeconds`,
        ),
      },
    };
  };

  const normalizeVfxSize = (value, name) => normalizeVfxNumber(
    value,
    vfxLimits.minimumSize,
    vfxLimits.maximumSize,
    name,
  );

  const normalizeVfxRotation = (value, name) => normalizeVfxNumber(
    value ?? 0,
    -vfxLimits.maximumAbsoluteRotationRadians,
    vfxLimits.maximumAbsoluteRotationRadians,
    name,
  );

  const normalizeVfxDirection = (value, origin, primitiveType) => {
    const direction = value === undefined
      ? { mode: vfxDirectionModes.fixed }
      : assertVfxObject(value, `${primitiveType}.direction`);
    assertVfxKeys(
      direction,
      ['mode', 'rotationRadians', 'target'],
      `${primitiveType}.direction`,
    );
    if (!Object.values(vfxDirectionModes).includes(direction.mode)) {
      throw new TypeError(
        `${primitiveType}.direction.mode 只接受 ${Object.values(vfxDirectionModes).join('、')}`,
      );
    }
    const normalized = { mode: direction.mode };
    if (direction.mode === vfxDirectionModes.spanEndpoints) {
      if (direction.rotationRadians !== undefined)
        throw new TypeError(`${primitiveType}.direction.spanEndpoints 不接受 rotationRadians`);
    } else {
      normalized.rotationRadians = normalizeVfxRotation(
        direction.rotationRadians,
        `${primitiveType}.direction.rotationRadians`,
      );
    }
    const needsTarget = direction.mode === vfxDirectionModes.towardTarget ||
      direction.mode === vfxDirectionModes.spanEndpoints;
    if (needsTarget) {
      normalized.target = normalizeVfxAnchor(
        direction.target,
        `${primitiveType}.direction.target`,
      );
      assertVfxAnchorPair(
        origin,
        normalized.target,
        `${primitiveType}.anchor/direction.target`,
      );
    } else if (direction.target !== undefined) {
      throw new TypeError(`${primitiveType}.direction.target 仅用于 towardTarget/spanEndpoints`);
    }
    if (direction.mode === vfxDirectionModes.sourceHeading && origin.kind !== 'entity')
      throw new TypeError(`${primitiveType}.direction.sourceHeading 需要 entity anchor`);
    return Object.freeze(normalized);
  };

  const finishVfxPrimitive = (normalized, style) => Object.freeze({
    ...normalized,
    style,
  });

  const createVfxCircle = (value) => {
    const { primitive, normalized } = normalizeVfxCommon(
      value,
      vfxPrimitiveTypes.circle,
      vfxClassifications.danger,
      ['anchor', 'radius'],
    );
    normalized.anchor = normalizeVfxAnchor(primitive.anchor);
    normalized.radius = normalizeVfxSize(primitive.radius, 'circle.radius');
    return finishVfxPrimitive(
      normalized,
      normalizeVfxStyle(primitive.style, normalized.type, normalized.radius),
    );
  };

  const createVfxDonut = (value) => {
    const { primitive, normalized } = normalizeVfxCommon(
      value,
      vfxPrimitiveTypes.donut,
      vfxClassifications.danger,
      ['anchor', 'innerRadius', 'outerRadius'],
    );
    normalized.anchor = normalizeVfxAnchor(primitive.anchor);
    normalized.innerRadius = normalizeVfxNumber(
      primitive.innerRadius,
      vfxLimits.minimumSize,
      vfxLimits.maximumSize,
      'donut.innerRadius',
    );
    normalized.outerRadius = normalizeVfxSize(primitive.outerRadius, 'donut.outerRadius');
    if (normalized.innerRadius >= normalized.outerRadius)
      throw new RangeError('donut.innerRadius 必须小于 donut.outerRadius');
    return finishVfxPrimitive(
      normalized,
      normalizeVfxStyle(
        primitive.style,
        normalized.type,
        (normalized.outerRadius - normalized.innerRadius) * 0.5,
      ),
    );
  };

  const createVfxSector = (value) => {
    const { primitive, normalized } = normalizeVfxCommon(
      value,
      vfxPrimitiveTypes.sector,
      vfxClassifications.danger,
      ['anchor', 'radius', 'angleRadians', 'direction'],
    );
    normalized.anchor = normalizeVfxAnchor(primitive.anchor);
    normalized.radius = normalizeVfxSize(primitive.radius, 'sector.radius');
    normalized.angleRadians = normalizeVfxNumber(
      primitive.angleRadians,
      vfxLimits.minimumSectorAngleRadians,
      vfxLimits.maximumSectorAngleRadians,
      'sector.angleRadians',
    );
    normalized.direction = normalizeVfxDirection(
      primitive.direction,
      normalized.anchor,
      normalized.type,
    );
    if (normalized.direction.mode === vfxDirectionModes.spanEndpoints)
      throw new TypeError('sector.direction.mode 不接受 spanEndpoints');
    return finishVfxPrimitive(
      normalized,
      normalizeVfxStyle(primitive.style, normalized.type, normalized.radius),
    );
  };

  const createVfxRect = (value) => {
    const { primitive, normalized } = normalizeVfxCommon(
      value,
      vfxPrimitiveTypes.rect,
      vfxClassifications.danger,
      ['anchor', 'width', 'length', 'direction', 'pivot'],
    );
    normalized.anchor = normalizeVfxAnchor(primitive.anchor);
    normalized.width = normalizeVfxSize(primitive.width, 'rect.width');
    normalized.direction = normalizeVfxDirection(
      primitive.direction,
      normalized.anchor,
      normalized.type,
    );
    normalized.pivot = primitive.pivot ?? vfxRectPivots.center;
    if (!Object.values(vfxRectPivots).includes(normalized.pivot))
      throw new TypeError(`rect.pivot 只接受 ${Object.values(vfxRectPivots).join('、')}`);
    if (normalized.direction.mode === vfxDirectionModes.spanEndpoints) {
      if (primitive.length !== undefined)
        throw new TypeError('rect.direction.spanEndpoints 要求省略 length');
      if (normalized.pivot !== vfxRectPivots.center)
        throw new TypeError('rect.direction.spanEndpoints 要求 pivot 为 center');
    } else {
      normalized.length = normalizeVfxSize(primitive.length, 'rect.length');
    }
    const maximumOutlineWidth = normalized.direction.mode === vfxDirectionModes.spanEndpoints
      ? normalized.width * 0.5
      : Math.min(normalized.width, normalized.length) * 0.5;
    return finishVfxPrimitive(
      normalized,
      normalizeVfxStyle(primitive.style, normalized.type, maximumOutlineWidth),
    );
  };

  const normalizeVfxEndpoints = (primitive, primitiveType, normalized) => {
    normalized.from = normalizeVfxAnchor(primitive.from, `${primitiveType}.from`);
    normalized.to = normalizeVfxAnchor(primitive.to, `${primitiveType}.to`);
    assertVfxAnchorPair(normalized.from, normalized.to, `${primitiveType}.from/to`);
  };

  const createVfxLine = (value) => {
    const { primitive, normalized } = normalizeVfxCommon(
      value,
      vfxPrimitiveTypes.line,
      vfxClassifications.guide,
      ['from', 'to', 'width'],
    );
    normalizeVfxEndpoints(primitive, normalized.type, normalized);
    normalized.width = normalizeVfxSize(primitive.width, 'line.width');
    return finishVfxPrimitive(
      normalized,
      normalizeVfxStyle(primitive.style, normalized.type, normalized.width * 0.5),
    );
  };

  const createVfxArrow = (value) => {
    const { primitive, normalized } = normalizeVfxCommon(
      value,
      vfxPrimitiveTypes.arrow,
      vfxClassifications.guide,
      ['from', 'to', 'width', 'headLength', 'headWidth'],
    );
    normalizeVfxEndpoints(primitive, normalized.type, normalized);
    normalized.width = normalizeVfxSize(primitive.width, 'arrow.width');
    normalized.headLength = normalizeVfxSize(
      primitive.headLength ?? normalized.width * 3,
      'arrow.headLength',
    );
    normalized.headWidth = normalizeVfxSize(
      primitive.headWidth ?? normalized.width * 2,
      'arrow.headWidth',
    );
    return finishVfxPrimitive(
      normalized,
      normalizeVfxStyle(
        primitive.style,
        normalized.type,
        Math.min(normalized.width, normalized.headWidth) * 0.5,
      ),
    );
  };

  const createVfxFixedLabel = (value) => {
    const { primitive, normalized } = normalizeVfxCommon(
      value,
      vfxPrimitiveTypes.fixedLabel,
      vfxClassifications.label,
      ['anchor', 'label', 'pixelHeight', 'worldYOffset'],
    );
    if (!Object.values(vfxFixedLabels).includes(primitive.label)) {
      throw new TypeError(
        `fixedLabel.label 只接受 ${Object.values(vfxFixedLabels).join('、')}`,
      );
    }
    normalized.anchor = normalizeVfxAnchor(primitive.anchor);
    normalized.label = primitive.label;
    normalized.pixelHeight = normalizeVfxNumber(
      primitive.pixelHeight ?? 32,
      vfxLimits.minimumLabelPixelHeight,
      vfxLimits.maximumLabelPixelHeight,
      'fixedLabel.pixelHeight',
    );
    if (!Number.isInteger(normalized.pixelHeight))
      throw new TypeError('fixedLabel.pixelHeight 必须是整数');
    normalized.worldYOffset = normalizeVfxNumber(
      primitive.worldYOffset ?? 0,
      -vfxLimits.maximumAbsoluteLabelWorldYOffset,
      vfxLimits.maximumAbsoluteLabelWorldYOffset,
      'fixedLabel.worldYOffset',
    );
    return finishVfxPrimitive(normalized, normalizeVfxStyle(primitive.style, normalized.type));
  };

  const vfxPrimitiveBuilders = Object.freeze({
    [vfxPrimitiveTypes.circle]: createVfxCircle,
    [vfxPrimitiveTypes.donut]: createVfxDonut,
    [vfxPrimitiveTypes.sector]: createVfxSector,
    [vfxPrimitiveTypes.rect]: createVfxRect,
    [vfxPrimitiveTypes.line]: createVfxLine,
    [vfxPrimitiveTypes.arrow]: createVfxArrow,
    [vfxPrimitiveTypes.fixedLabel]: createVfxFixedLabel,
  });

  const normalizeVfxPrimitive = (value) => {
    const primitive = assertVfxObject(value, 'primitive');
    if (typeof primitive.type !== 'string' ||
        !Object.prototype.hasOwnProperty.call(vfxPrimitiveBuilders, primitive.type)) {
      throw new TypeError(
        `primitive.type 只接受 ${Object.values(vfxPrimitiveTypes).join('、')}`,
      );
    }
    return vfxPrimitiveBuilders[primitive.type](primitive);
  };

  const normalizeVfxPrimitiveBatch = (value) => {
    if (!Array.isArray(value))
      throw new TypeError('primitives 必须是数组');
    if (value.length > vfxLimits.maximumPrimitivesPerFrame) {
      throw new RangeError(
        `primitives 单帧不得超过 ${vfxLimits.maximumPrimitivesPerFrame} 个对象`,
      );
    }
    const ids = new Set();
    let fixedLabelCount = 0;
    const normalized = value.map((primitive) => {
      const result = normalizeVfxPrimitive(primitive);
      if (ids.has(result.id))
        throw new TypeError(`primitives 不允许重复 id：${result.id}`);
      ids.add(result.id);
      if (result.type === vfxPrimitiveTypes.fixedLabel &&
          ++fixedLabelCount > vfxLimits.maximumFixedLabels) {
        throw new RangeError(
          `primitives 单帧 fixedLabel 不得超过 ${vfxLimits.maximumFixedLabels} 个`,
        );
      }
      return result;
    });
    return Object.freeze(normalized);
  };

  const normalizeVfxScope = (value) => normalizeVfxIdentifier(value, 'scope');

  const stopVfxHeartbeat = (expectedSessionId) => {
    // This is deliberately exact-match only.  Treating undefined as a wildcard
    // lets an old async cleanup tear down a newer generation's heartbeat.
    if (expectedSessionId === undefined || activeVfxSessionId !== expectedSessionId)
      return;
    if (vfxHeartbeatTimer !== undefined)
      arrReplayNativeClearInterval(vfxHeartbeatTimer);
    vfxHeartbeatTimer = undefined;
    vfxHeartbeatInFlight = false;
    activeVfxSessionId = undefined;
  };

  const invalidateVfxSession = (sessionId, advanceGeneration = false) => {
    if (activeVfxSessionId !== undefined && activeVfxSessionId !== sessionId)
      return;
    if (advanceGeneration)
      vfxGeneration++;
    stopVfxHeartbeat(sessionId);
    vfxSessionPromise = undefined;
  };

  const isTerminalVfxSessionCode = (code) => [
    'stale_session',
    'session_required',
    'handler_stopped',
    'engine_stopped',
    'vfx_disabled',
  ].includes(code);

  const startVfxHeartbeat = (session) => {
    stopVfxHeartbeat(activeVfxSessionId);
    activeVfxSessionId = session.sessionId;
    const requestedInterval = Number(session.heartbeatIntervalMilliseconds);
    const interval = Number.isFinite(requestedInterval)
      ? Math.max(500, Math.min(2000, requestedInterval))
      : 1000;
    // The DLL lease is physical wall-clock state, not replay trigger time.
    vfxHeartbeatTimer = arrReplayNativeSetInterval(async () => {
      if (activeVfxSessionId !== session.sessionId || vfxHeartbeatInFlight)
        return;
      vfxHeartbeatInFlight = true;
      try {
        const result = await callOverlayHandler({
          call: 'stringVfx',
          action: 'heartbeat',
          sessionId: session.sessionId,
        });
        if (result?.ok === true)
          return;
        if (isTerminalVfxSessionCode(result?.code)) {
          invalidateVfxSession(session.sessionId, true);
          return;
        }
        console.warn('String VFX 心跳被 DLL 拒绝', result?.error ?? result);
      } catch (error) {
        // A transient handler failure does not grant a longer lease. The DLL will
        // expire and clean the session unless a later heartbeat succeeds in time.
        console.warn('String VFX 心跳失败', error);
      } finally {
        vfxHeartbeatInFlight = false;
      }
    }, interval);
  };

  const beginVfxSession = async (expectedGeneration) => {
    if (expectedGeneration !== vfxGeneration)
      throw new Error('String VFX generation 已变化，会话建立已取消');
    if (isDebugPage)
      return {
        ok: true,
        debug: true,
        apiVersion: stringNativeVfxApiVersion,
        sessionId: `debug-${vfxClientId}`,
      };
    const result = await callOverlayHandler({
      call: 'stringVfx',
      action: 'beginSession',
      clientId: vfxClientId,
      installCapability: stringNativeVfxInstallCapability,
    });
    if (expectedGeneration !== vfxGeneration) {
      if (result?.ok === true && result.sessionId !== undefined) {
        callOverlayHandler({
          call: 'stringVfx',
          action: 'endSession',
          sessionId: result.sessionId,
        })?.catch?.(() => {});
      }
      throw new Error('String VFX generation 在会话建立期间变化');
    }
    if (result?.ok !== true)
      throw new Error(result?.error ?? 'String VFX DLL 会话建立失败');
    if (result.apiVersion !== stringNativeVfxApiVersion) {
      throw new Error(
        `String VFX API 版本不匹配：需要 ${stringNativeVfxApiVersion}，实际 ${result.apiVersion}`,
      );
    }
    startVfxHeartbeat(result);
    return result;
  };

  const getVfxSession = async (expectedGeneration) => {
    if (expectedGeneration !== vfxGeneration)
      throw new Error('String VFX generation 已变化');
    vfxSessionPromise ??= beginVfxSession(expectedGeneration);
    const localPromise = vfxSessionPromise;
    try {
      const session = await localPromise;
      if (expectedGeneration !== vfxGeneration)
        throw new Error('String VFX generation 在等待会话期间变化');
      return session;
    } catch (error) {
      if (vfxSessionPromise === localPromise)
        vfxSessionPromise = undefined;
      throw error;
    }
  };

  const callVfxEngine = async (action, payload) => {
    const expectedGeneration = vfxGeneration;
    const session = await getVfxSession(expectedGeneration);
    if (expectedGeneration !== vfxGeneration)
      throw new Error('String VFX generation 在提交前变化');
    if (isDebugPage)
      return { ok: true, accepted: true, debug: true, action, payload, sessionId: session.sessionId };
    const result = await callOverlayHandler({
      call: 'stringVfx',
      action,
      sessionId: session.sessionId,
      ...payload,
    });
    if (expectedGeneration !== vfxGeneration)
      throw new Error('String VFX generation 在提交期间变化');
    if (result?.ok === true)
      return result;
    if (isTerminalVfxSessionCode(result?.code)) {
      invalidateVfxSession(session.sessionId, true);
      throw new Error(result?.error ?? 'String VFX 会话已失效；旧 payload 不会自动重放');
    }
    throw new Error(result?.error ?? 'String VFX DLL 未返回成功状态');
  };

  const arrReplayVfxStableHash = (value) => {
    let left = 0x811C9DC5;
    let right = 0x9E3779B9;
    for (let index = 0; index < value.length; ++index) {
      const code = value.charCodeAt(index);
      left = Math.imul(left ^ code, 0x01000193);
      right = Math.imul(right ^ code, 0x85EBCA6B);
      right ^= right >>> 13;
    }
    return `a${(left >>> 0).toString(16).padStart(8, '0')}` +
      `${(right >>> 0).toString(16).padStart(8, '0')}`;
  };
  const arrReplayVfxCompareOrdinal = (left, right) =>
    left < right ? -1 : left > right ? 1 : 0;

  const arrReplayCancelVfxExpiryTimer = () => {
    if (arrReplayVfxExpiryTimer !== undefined)
      clearTimeout(arrReplayVfxExpiryTimer);
    arrReplayVfxExpiryTimer = undefined;
  };

  const arrReplayRecordVfxPhysicalState = (active) => {
    arrReplayVfxPhysicalActive = active;
    ++arrReplayVfxPhysicalRevision;
  };

  const arrReplayAwaitWithTimeout = (
      value,
      timeoutMs,
      timeoutMessage) =>
    new arrReplayNativePromise((resolve, reject) => {
      let settled = false;
      const timeout = arrReplayNativeSetTimeout(() => {
        if (settled)
          return;
        settled = true;
        reject(new Error(timeoutMessage));
      }, timeoutMs);
      arrReplayNativePromiseThen.call(
        arrReplayNativePromise.resolve(value),
        (result) => {
          if (settled)
            return;
          settled = true;
          arrReplayNativeClearTimeout(timeout);
          resolve(result);
        },
        (error) => {
          if (settled)
            return;
          settled = true;
          arrReplayNativeClearTimeout(timeout);
          reject(error);
        },
      );
    });

  const arrReplayResetVfxPublishGeneration = (generation) => {
    arrReplayVfxPublishGeneration = generation;
    arrReplayVfxPublishChain = Promise.resolve();
  };

  const arrReplayRetainedSceneAt = (replayMs) => {
    const nextScopes = new Map();
    const drawings = [];
    let nearestClampedExpiry;
    const sortedScopes = [...arrReplayWarmVfxScopes.entries()]
      .sort(([left], [right]) => arrReplayVfxCompareOrdinal(left, right));
    for (const [scope, entries] of sortedScopes) {
      const alive = entries
        .filter((entry) => entry.expiresAtReplayMs > replayMs)
        .sort((left, right) =>
          arrReplayVfxCompareOrdinal(left.drawing.id, right.drawing.id));
      if (alive.length === 0)
        continue;
      nextScopes.set(scope, alive);
      for (const entry of alive) {
        const logicalId = `${scope}\0${entry.drawing.id}`;
        const physicalId = arrReplayVfxStableHash(logicalId);
        const previousLogicalId = arrReplayVfxStableIds.get(physicalId);
        if (previousLogicalId !== undefined && previousLogicalId !== logicalId) {
          throw new Error(
            `ARR whole-scene stable id 碰撞：${previousLogicalId} / ${logicalId}`,
          );
        }
        arrReplayVfxStableIds.set(physicalId, logicalId);
        const remainingMilliseconds = entry.expiresAtReplayMs - replayMs;
        if (remainingMilliseconds < vfxLimits.minimumDurationSeconds * 1000) {
          nearestClampedExpiry = nearestClampedExpiry === undefined
            ? entry.expiresAtReplayMs
            : Math.min(nearestClampedExpiry, entry.expiresAtReplayMs);
        }
        drawings.push({
          ...entry.drawing,
          id: physicalId,
          durationSeconds: Math.max(
            vfxLimits.minimumDurationSeconds,
            remainingMilliseconds / 1000,
          ),
        });
      }
    }
    if (nextScopes.size > vfxLimits.maximumScopes || drawings.length > 32) {
      throw new RangeError(
        `ARR whole-scene 超过单帧上限：${nextScopes.size} scopes / ` +
        `${drawings.length} drawings`,
      );
    }
    arrReplayWarmVfxScopes = nextScopes;
    return { drawings, nearestClampedExpiry };
  };

  const arrReplayScheduleVfxExpiry = (
      expectedGeneration,
      nearestClampedExpiry,
      replayMs) => {
    arrReplayCancelVfxExpiryTimer();
    if (nearestClampedExpiry === undefined)
      return;
    const delayMilliseconds = Math.max(0, Math.ceil(nearestClampedExpiry - replayMs));
    arrReplayVfxExpiryTimer = setTimeout(() => {
      arrReplayVfxExpiryTimer = undefined;
      if (expectedGeneration !== arrReplayState.generation ||
          !arrReplayState.active || !arrReplayState.warmComplete ||
          !arrReplayVfxRetainedMode)
        return;
      void arrReplayQueueWholeScenePublish(expectedGeneration).catch((error) => {
        if (expectedGeneration !== arrReplayState.generation)
          return;
        return arrReplayFailClosedAndLock(`vfx-expiry:${error}`);
      });
    }, delayMilliseconds);
    arrReplayVfxExpiryTimer?.unref?.();
  };

  const arrReplayPublishWholeScene = async (expectedGeneration) => {
    if (expectedGeneration !== arrReplayState.generation ||
        !arrReplayState.active || !arrReplayState.warmComplete ||
        !arrReplayVfxRetainedMode) {
      throw new Error('ARR whole-scene generation 已变化');
    }
    const replayMs = arrReplayClockSnapshot().replayMs;
    const scene = arrReplayRetainedSceneAt(replayMs);
    if (scene.drawings.length === 0) {
      arrReplayCancelVfxExpiryTimer();
      if (!arrReplayVfxPhysicalActive) {
        return {
          ok: true,
          accepted: true,
          virtual: true,
          empty: true,
          scope: arrReplayVfxPhysicalScope,
        };
      }
      const result = await callVfxEngine('clearScope', { scope: arrReplayVfxPhysicalScope });
      if (expectedGeneration !== arrReplayState.generation)
        throw new Error('ARR whole-scene generation 在清理期间变化');
      arrReplayRecordVfxPhysicalState(false);
      return result;
    }
    const result = await callVfxEngine('frame', {
      scope: arrReplayVfxPhysicalScope,
      drawings: scene.drawings,
    });
    if (expectedGeneration !== arrReplayState.generation)
      throw new Error('ARR whole-scene generation 在提交期间变化');
    arrReplayRecordVfxPhysicalState(true);
    arrReplayScheduleVfxExpiry(
      expectedGeneration,
      scene.nearestClampedExpiry,
      arrReplayClockSnapshot().replayMs,
    );
    return result;
  };

  function arrReplayQueueWholeScenePublish(expectedGeneration) {
    if (expectedGeneration !== arrReplayState.generation)
      return Promise.reject(new Error('ARR whole-scene generation 已变化'));
    if (arrReplayVfxPublishGeneration !== expectedGeneration)
      arrReplayResetVfxPublishGeneration(expectedGeneration);
    const publish = arrReplayVfxPublishChain
      .catch(() => undefined)
      .then(() => arrReplayPublishWholeScene(expectedGeneration));
    if (arrReplayVfxPublishGeneration === expectedGeneration)
      arrReplayVfxPublishChain = publish;
    return publish;
  }

  const arrReplayRetainVfxFrame = (scope, drawings) => {
    const replayMs = arrReplayClockSnapshot().replayMs;
    const previous = arrReplayWarmVfxScopes;
    const next = new Map(arrReplayWarmVfxScopes);
    next.set(scope, drawings.map((drawing) => ({
      drawing: { ...drawing },
      expiresAtReplayMs: replayMs + drawing.durationSeconds * 1000,
    })));
    arrReplayWarmVfxScopes = next;
    try {
      const scene = arrReplayRetainedSceneAt(replayMs);
      return scene.drawings.length;
    } catch (error) {
      arrReplayWarmVfxScopes = previous;
      throw error;
    }
  };

  const submitVfxPrimitives = (scope, primitives) => {
    const normalizedScope = normalizeVfxScope(scope);
    const normalizedDrawings = normalizeVfxPrimitiveBatch(primitives);
    if (arrReplayVfxRetainedMode) {
      const drawingCount = arrReplayRetainVfxFrame(normalizedScope, normalizedDrawings);
      if (arrReplayWarmVfx || !arrReplayState.warmComplete) {
        return Promise.resolve({
          ok: true,
          accepted: true,
          virtual: true,
          warming: true,
          scope: normalizedScope,
          drawingCount,
        });
      }
      return arrReplayQueueWholeScenePublish(arrReplayState.generation);
    }
    return callVfxEngine('frame', {
      scope: normalizedScope,
      drawings: normalizedDrawings,
    });
  };

  const clearVfxScope = (scope) => {
    const normalizedScope = normalizeVfxScope(scope);
    if (arrReplayVfxRetainedMode) {
      arrReplayWarmVfxScopes.delete(normalizedScope);
      if (arrReplayWarmVfx || !arrReplayState.warmComplete) {
        return Promise.resolve({
          ok: true,
          accepted: true,
          virtual: true,
          warming: true,
          scope: normalizedScope,
        });
      }
      return arrReplayQueueWholeScenePublish(arrReplayState.generation);
    }
    return callVfxEngine('clearScope', { scope: normalizedScope });
  };

  const endVfxSession = async ({ acceptAlreadyRevoked = false } = {}) => {
    arrReplayCancelVfxExpiryTimer();
    const physicalRevisionAtStart = arrReplayVfxPhysicalRevision;
    vfxGeneration++;
    const endingPromise = vfxSessionPromise;
    const endingSessionId = activeVfxSessionId;
    if (vfxSessionPromise === endingPromise)
      vfxSessionPromise = undefined;
    stopVfxHeartbeat(endingSessionId);
    const confirmPhysicalCleanup = (result) => {
      let confirmed = !arrReplayVfxPhysicalActive;
      if (arrReplayVfxPhysicalRevision === physicalRevisionAtStart) {
        arrReplayRecordVfxPhysicalState(false);
        confirmed = true;
      }
      return {
        ...result,
        physicalCleanupConfirmed: confirmed,
      };
    };
    if (endingPromise === undefined) {
      return {
        ok: true,
        active: false,
        physicalCleanupConfirmed: !arrReplayVfxPhysicalActive,
      };
    }
    try {
      let session;
      try {
        session = await arrReplayAwaitWithTimeout(
          endingPromise,
          arrReplayBrowserRpcTimeoutMs,
          `String VFX beginSession 清理等待超过 ${arrReplayBrowserRpcTimeoutMs}ms`,
        );
      } catch (error) {
        // A pending begin belongs to the generation we just invalidated.  Its
        // success path explicitly ends the stale server session; a failed or
        // lost response is bounded by the DLL lease and must not clobber the
        // replacement generation.
        return {
          ok: true,
          active: false,
          staleBegin: true,
          physicalCleanupConfirmed: !arrReplayVfxPhysicalActive,
        };
      }
      if (isDebugPage)
        return confirmPhysicalCleanup({ ok: true, debug: true });
      const result = await arrReplayNativeCallWithTimeout(
        {
          call: 'stringVfx',
          action: 'endSession',
          sessionId: session.sessionId,
        },
        arrReplayBrowserRpcTimeoutMs,
      );
      if (acceptAlreadyRevoked && result?.code === 'stale_session') {
        return confirmPhysicalCleanup({
          ok: true,
          accepted: true,
          idempotent: true,
          alreadyRevoked: true,
        });
      }
      if (result?.ok !== true)
        throw new Error(result?.error ?? 'String VFX DLL 会话结束失败');
      return confirmPhysicalCleanup(result);
    } finally {
      stopVfxHeartbeat(endingSessionId);
    }
  };

  const arrReplayAcquireVfxCleanup = () => {
    if (arrReplayVfxCleanupPromise !== undefined)
      return arrReplayVfxCleanupPromise;
    const cleanup = arrReplayNativePromise.resolve(
      endVfxSession({ acceptAlreadyRevoked: true }),
    );
    arrReplayVfxCleanupPromise = cleanup;
    const clearCleanup = () => {
      if (arrReplayVfxCleanupPromise === cleanup)
        arrReplayVfxCleanupPromise = undefined;
    };
    void arrReplayNativePromiseThen.call(
      cleanup,
      clearCleanup,
      clearCleanup,
    );
    return cleanup;
  };

  const getVfxStatus = async () => {
    if (isDebugPage)
      return { ok: true, available: false, debug: true, reason: '调试页不调用 ACT VFX 桥接' };
    return await callOverlayHandler({
      call: 'stringVfx',
      action: 'status',
      installCapability: stringNativeVfxInstallCapability,
    });
  };

  // ARR replay test adapter: accepts only StringDownloader's validated LogLine DTO.
  const arrReplayExactKeys = (value, expected) => {
    if (value === null || typeof value !== 'object' || Array.isArray(value))
      return false;
    const actual = Object.keys(value).sort();
    const wanted = [...expected].sort();
    return actual.length === wanted.length && actual.every((key, index) => key === wanted[index]);
  };

  const arrReplaySafeInteger = (value, minimum, maximum) =>
    Number.isSafeInteger(value) && value >= minimum && value <= maximum;

  const arrReplayUtf8StringBytes = (json) => {
    let bytes = 0;
    for (let index = 0; index < json.length; ++index) {
      const codePoint = json.codePointAt(index);
      if (codePoint > 0xFFFF)
        ++index;
      if (codePoint <= 0x7F)
        ++bytes;
      else if (codePoint <= 0x7FF)
        bytes += 2;
      else if (codePoint <= 0xFFFF)
        bytes += 3;
      else
        bytes += 4;
    }
    return bytes;
  };

  const arrReplayUtf8JsonBytes = (value) => {
    const json = JSON.stringify(value);
    if (typeof json !== 'string')
      throw new Error('ARR envelope 无法序列化');
    return arrReplayUtf8StringBytes(json);
  };

  const arrReplayCloneJsonWithSize = (value) => {
    const json = JSON.stringify(value);
    if (typeof json !== 'string')
      throw new Error('ARR envelope 无法序列化');
    return {
      value: JSON.parse(json),
      bytes: arrReplayUtf8StringBytes(json),
    };
  };

  const arrReplayRandomHexId = () => {
    if (arrReplayNativeCryptoGetRandomValues === undefined)
      throw new Error('ARR 浏览器页面会话要求 crypto.getRandomValues');
    const bytes = new Uint8Array(16);
    arrReplayNativeCryptoGetRandomValues(bytes);
    let result = '';
    for (const value of bytes)
      result += value.toString(16).padStart(2, '0');
    if (!/^[0-9a-f]{32}$/u.test(result))
      throw new Error('ARR 浏览器页面会话随机ID生成失败');
    return result;
  };

  const arrReplayPageActivationUnixMicros = () => {
    const timeOrigin = Number(globalThis.performance?.timeOrigin);
    const now = Number(globalThis.performance?.now?.());
    const milliseconds = Number.isFinite(timeOrigin) && Number.isFinite(now)
      ? timeOrigin + now
      : arrReplayNativeDate.now();
    if (!Number.isFinite(milliseconds))
      throw new Error('ARR 浏览器页面会话激活时钟不可用');
    const candidate = Math.floor(milliseconds * 1000);
    if (!arrReplaySafeInteger(candidate, 1, Number.MAX_SAFE_INTEGER))
      throw new Error('ARR 浏览器页面会话激活时钟超出安全整数');
    arrReplayLastPageActivationUnixMicros = Math.max(
      candidate,
      arrReplayLastPageActivationUnixMicros + 1,
    );
    return arrReplayLastPageActivationUnixMicros;
  };

  const arrReplayNativeCallWithTimeout = (
      request,
      timeoutMs = arrReplayBrowserRpcTimeoutMs,
      { trackRawRpc = false } = {}) =>
    new arrReplayNativePromise((resolve, reject) => {
      if (arrReplayNativeCallOverlayHandler === undefined) {
        reject(new Error('callOverlayHandler 不可用'));
        return;
      }
      let settled = false;
      const timeout = arrReplayNativeSetTimeout(() => {
        if (settled)
          return;
        settled = true;
        reject(new Error(`ARR 浏览器桥调用超过 ${timeoutMs}ms`));
      }, timeoutMs);
      let result;
      let rawRpcTracked = false;
      const settleRawRpc = () => {
        if (!rawRpcTracked)
          return;
        rawRpcTracked = false;
        arrReplayBrowserSession.rawRpcOutstanding = Math.max(
          0,
          arrReplayBrowserSession.rawRpcOutstanding - 1,
        );
      };
      try {
        if (trackRawRpc) {
          ++arrReplayBrowserSession.rawRpcOutstanding;
          rawRpcTracked = true;
        }
        result = arrReplayNativeCallOverlayHandler(request);
      } catch (error) {
        settleRawRpc();
        arrReplayNativeClearTimeout(timeout);
        reject(error);
        return;
      }
      arrReplayNativePromiseThen.call(
        arrReplayNativePromise.resolve(result),
        (value) => {
          settleRawRpc();
          if (settled)
            return;
          settled = true;
          arrReplayNativeClearTimeout(timeout);
          resolve(value);
        },
        (error) => {
          settleRawRpc();
          if (settled)
            return;
          settled = true;
          arrReplayNativeClearTimeout(timeout);
          reject(error);
        },
      );
    });

  const arrReplayIngressIsCurrent = (generation) =>
    generation === arrReplayIngressGeneration;

  const arrReplayWallNow = () => {
    const value = globalThis.performance?.now?.();
    return Number.isFinite(value) ? value : Date.now();
  };

  const arrReplayClockSnapshot = () => {
    if (arrReplayControlledContext?.generation === arrReplayState.generation) {
      const { wallAnchorMs: _wallAnchorMs, lastExposedReplayMs: _lastExposed, ...publicState } =
        arrReplayState;
      return Object.freeze({
        ...publicState,
        replayMs: arrReplayControlledContext.replayMs,
      });
    }
    let exposedReplayMs = arrReplayState.replayMs;
    if (arrReplayState.active && arrReplayState.warmComplete) {
      const fixtureProfile = arrReplayCurrentFixtureProfile();
      if (fixtureProfile === undefined)
        throw new Error('ARR active 状态缺少固定 fixture profile');
      const elapsed = Math.max(0, Math.floor(arrReplayWallNow() - arrReplayState.wallAnchorMs));
      exposedReplayMs = Math.min(fixtureProfile.maximumReplayMs, Math.max(
        arrReplayState.lastExposedReplayMs,
        arrReplayState.replayMs + elapsed,
      ));
      arrReplayState.lastExposedReplayMs = exposedReplayMs;
    }
    const { wallAnchorMs: _wallAnchorMs, lastExposedReplayMs: _lastExposed, ...publicState } =
      arrReplayState;
    return Object.freeze({ ...publicState, replayMs: exposedReplayMs });
  };

  const arrReplaySchedulerFault = (error) => {
    const normalized = error instanceof Error ? error : new Error(`${error}`);
    arrReplayScheduler.fault ??= normalized;
    return normalized;
  };

  const arrReplayPatchProperty = (target, key, value, restores) => {
    if (target === undefined || target === null)
      return;
    const descriptor = Object.getOwnPropertyDescriptor(target, key);
    try {
      if (descriptor === undefined) {
        Object.defineProperty(target, key, {
          configurable: true,
          enumerable: true,
          writable: true,
          value,
        });
        restores.push(() => {
          delete target[key];
        });
        return;
      }
      if ('value' in descriptor) {
        if (descriptor.writable !== true)
          throw new Error(`${key} 不可写`);
        Object.defineProperty(target, key, { ...descriptor, value });
      } else {
        if (descriptor.configurable !== true)
          throw new Error(`${key} accessor 不可替换`);
        Object.defineProperty(target, key, {
          configurable: descriptor.configurable,
          enumerable: descriptor.enumerable,
          writable: true,
          value,
        });
      }
      restores.push(() => Object.defineProperty(target, key, descriptor));
    } catch (error) {
      throw new Error(`ARR 受控上下文无法替换 ${key}: ${error}`);
    }
  };

  const arrReplayIsVirtualTimerHandle = (handle) =>
    Number.isSafeInteger(handle) &&
    handle >= arrReplayVirtualTimerFirstHandle &&
    handle < arrReplayVirtualTimerNextHandle;

  const arrReplayScheduleVirtualTimeout = (callback, milliseconds = 0, ...args) => {
    const context = arrReplayControlledContext;
    if (context === undefined)
      return arrReplayNativeSetTimeout(callback, milliseconds, ...args);
    if (typeof callback !== 'function') {
      const error = arrReplaySchedulerFault(
        new TypeError('ARR 受控 setTimeout 只接受函数 callback'),
      );
      throw error;
    }
    const delay = Number(milliseconds);
    if (!Number.isFinite(delay) || delay < 0 ||
        delay > arrReplaySchedulerLimits.maximumDelayMilliseconds) {
      const error = arrReplaySchedulerFault(
        new RangeError(`ARR 受控 setTimeout 延迟非法：${milliseconds}`),
      );
      throw error;
    }
    if (context.generation !== arrReplayScheduler.generation ||
        context.generation !== arrReplayState.generation) {
      const error = arrReplaySchedulerFault(new Error('ARR 受控 setTimeout generation 已变化'));
      throw error;
    }
    if (arrReplayScheduler.tasks.size >= arrReplaySchedulerLimits.maximumPendingTasks ||
        arrReplayScheduler.createdTasks >= arrReplaySchedulerLimits.maximumCreatedTasks) {
      const error = arrReplaySchedulerFault(new Error('ARR replay timer 达到任务硬上限'));
      throw error;
    }
    if (arrReplayVirtualTimerNextHandle >= Number.MAX_SAFE_INTEGER) {
      const error = arrReplaySchedulerFault(new Error('ARR replay timer handle 空间耗尽'));
      throw error;
    }
    const handle = arrReplayVirtualTimerNextHandle++;
    arrReplayScheduler.tasks.set(handle, {
      handle,
      generation: context.generation,
      dueReplayMs: context.replayMs + Math.ceil(delay),
      ordinal: ++arrReplayScheduler.nextOrdinal,
      callback,
      args,
    });
    context.promiseConstructionStack?.at(-1)?.push(handle);
    ++arrReplayScheduler.createdTasks;
    arrReplayScheduler.peakPendingTasks = Math.max(
      arrReplayScheduler.peakPendingTasks,
      arrReplayScheduler.tasks.size,
    );
    return handle;
  };

  const arrReplayClearVirtualTimeout = (handle) => {
    if (arrReplayIsVirtualTimerHandle(handle)) {
      arrReplayScheduler.tasks.delete(handle);
      return;
    }
    arrReplayNativeClearTimeout(handle);
  };

  const arrReplayRejectControlledInterval = () => {
    const error = arrReplaySchedulerFault(
      new Error('ARR 受控 trigger pipeline 禁止 setInterval；请使用有界 setTimeout'),
    );
    throw error;
  };

  const arrReplayMakeControlledDate = () => {
    const controlledNow = () =>
      arrReplayScheduler.dateEpochMs + (arrReplayControlledContext?.replayMs ?? 0);
    const ControlledDate = function(...args) {
      if (new.target !== undefined) {
        const actualArgs = args.length === 0 ? [controlledNow()] : args;
        return Reflect.construct(arrReplayNativeDate, actualArgs, new.target);
      }
      return new arrReplayNativeDate(controlledNow()).toString();
    };
    Object.setPrototypeOf(ControlledDate, arrReplayNativeDate);
    ControlledDate.prototype = arrReplayNativeDate.prototype;
    Object.defineProperty(ControlledDate, 'now', {
      configurable: true,
      value: controlledNow,
    });
    return ControlledDate;
  };

  const arrReplayMakeControlledPromise = () => {
    const ControlledPromise = function(executor) {
      if (new.target === undefined)
        throw new TypeError('Promise constructor 必须使用 new');
      if (typeof executor !== 'function')
        throw new TypeError('Promise executor 必须是函数');
      const context = arrReplayControlledContext;
      if (context === undefined)
        return new arrReplayNativePromise(executor);
      const timerHandles = [];
      context.promiseConstructionStack.push(timerHandles);
      let promise;
      try {
        promise = new arrReplayNativePromise(executor);
      } finally {
        context.promiseConstructionStack.pop();
      }
      if (timerHandles.length > 0)
        arrReplayPromiseTimerHandles.set(promise, timerHandles);
      return promise;
    };
    ControlledPromise.prototype = arrReplayNativePromise.prototype;
    Object.setPrototypeOf(ControlledPromise, arrReplayNativePromise);
    for (const method of ['resolve', 'reject', 'all', 'allSettled', 'any', 'race']) {
      if (typeof arrReplayNativePromise[method] !== 'function')
        continue;
      Object.defineProperty(ControlledPromise, method, {
        configurable: true,
        value: (...args) => arrReplayNativePromise[method](...args),
      });
    }
    return ControlledPromise;
  };

  const arrReplayControlledPromiseThen = function(onFulfilled, onRejected) {
    const registrationContext = arrReplayControlledContext;
    if (registrationContext === undefined) {
      return arrReplayNativePromiseThen.call(this, onFulfilled, onRejected);
    }
    const timerHandles = arrReplayPromiseTimerHandles.get(this);
    const deferredByReplayTimer = timerHandles !== undefined && timerHandles.length > 0;
    // cactbot delaySeconds promises must not block the source event that
    // created them.  Their continuations become pending work only when the
    // generation-owned replay timer is actually due.
    let trackedContext = deferredByReplayTimer ? undefined : registrationContext;
    if (trackedContext !== undefined)
      ++registrationContext.pendingPromiseContinuations;
    let completed = false;
    const finish = () => {
      if (completed)
        return;
      completed = true;
      if (trackedContext !== undefined) {
        ++trackedContext.promiseActivity;
        --trackedContext.pendingPromiseContinuations;
      }
    };
    const wrap = (callback, rejected) => (value) => {
      if (completed)
        return undefined;
      if (deferredByReplayTimer) {
        if (registrationContext.generation !== arrReplayState.generation) {
          finish();
          return undefined;
        }
        const executionContext = arrReplayControlledContext;
        if (executionContext === undefined ||
            executionContext.generation !== registrationContext.generation) {
          throw arrReplaySchedulerFault(
            new Error('ARR replay timer Promise continuation 越过 generation'),
          );
        }
        trackedContext = executionContext;
        ++trackedContext.pendingPromiseContinuations;
      } else if (arrReplayControlledContext !== registrationContext ||
          registrationContext.generation !== arrReplayState.generation) {
        finish();
        return undefined;
      }
      ++trackedContext.promiseActivity;
      if (typeof callback !== 'function') {
        finish();
        if (rejected)
          throw value;
        return value;
      }
      let result;
      try {
        result = callback(value);
      } catch (error) {
        finish();
        throw error;
      }
      if (result !== null &&
          (typeof result === 'object' || typeof result === 'function')) {
        const resultTimerHandles = arrReplayPromiseTimerHandles.get(result);
        if (resultTimerHandles !== undefined && resultTimerHandles.length > 0) {
          if (chainedPromise !== undefined)
            arrReplayPromiseTimerHandles.set(chainedPromise, resultTimerHandles);
          finish();
          return result;
        }
        let then;
        try {
          then = result.then;
        } catch (error) {
          finish();
          throw error;
        }
        if (typeof then === 'function') {
          return arrReplayNativePromiseThen.call(
            arrReplayNativePromise.resolve(result),
            (resolved) => {
              finish();
              return resolved;
            },
            (error) => {
              finish();
              throw error;
            },
          );
        }
      }
      finish();
      return result;
    };
    let chainedPromise;
    try {
      chainedPromise = arrReplayNativePromiseThen.call(
        this,
        wrap(onFulfilled, false),
        wrap(onRejected, true),
      );
      if (deferredByReplayTimer)
        arrReplayPromiseTimerHandles.set(chainedPromise, timerHandles);
      return chainedPromise;
    } catch (error) {
      if (!deferredByReplayTimer)
        finish();
      throw error;
    }
  };

  const arrReplayWarmTextSnapshot = () => {
    if (!arrReplayWarmVfx || arrReplayState.warmComplete ||
        typeof globalThis.document?.querySelectorAll !== 'function')
      return [];
    const holders = globalThis.document.querySelectorAll(
      '#popup-text-info .holder, #popup-text-alert .holder, ' +
      '#popup-text-alarm .holder, .popup-text-container-outer',
    );
    return [...holders].map((holder) => [
      holder,
      new Set([...(holder.childNodes ?? holder.children ?? [])]),
    ]);
  };

  const arrReplayRestoreWarmTextSnapshot = (snapshot) => {
    for (const [holder, originalChildren] of snapshot) {
      for (const child of [...(holder.childNodes ?? holder.children ?? [])]) {
        if (originalChildren.has(child))
          continue;
        if (typeof child.remove === 'function')
          child.remove();
        else if (typeof holder.removeChild === 'function')
          holder.removeChild(child);
      }
    }
  };

  const arrReplayInstallControlledGlobals = (restores, suppressVisibleEffects) => {
    arrReplayPatchProperty(
      globalThis,
      'Date',
      arrReplayMakeControlledDate(),
      restores,
    );
    arrReplayPatchProperty(
      globalThis,
      'Promise',
      arrReplayMakeControlledPromise(),
      restores,
    );
    arrReplayPatchProperty(
      arrReplayNativePromise.prototype,
      'then',
      arrReplayControlledPromiseThen,
      restores,
    );
    arrReplayPatchProperty(
      globalThis,
      'setTimeout',
      arrReplayScheduleVirtualTimeout,
      restores,
    );
    arrReplayPatchProperty(
      globalThis,
      'clearTimeout',
      arrReplayClearVirtualTimeout,
      restores,
    );
    arrReplayPatchProperty(
      globalThis,
      'setInterval',
      arrReplayRejectControlledInterval,
      restores,
    );
    arrReplayPatchProperty(
      globalThis,
      'clearInterval',
      arrReplayNativeClearInterval,
      restores,
    );

    if (!suppressVisibleEffects)
      return;

    const blockedOverlayCalls = new Set(['cactbotSay', 'PostNamazu']);
    if (typeof globalThis.callOverlayHandler === 'function') {
      const originalCallOverlayHandler = globalThis.callOverlayHandler;
      arrReplayPatchProperty(
        globalThis,
        'callOverlayHandler',
        function(request, ...args) {
          if (blockedOverlayCalls.has(request?.call))
            return Promise.resolve({ ok: true, accepted: false, suppressed: true });
          return originalCallOverlayHandler.call(this, request, ...args);
        },
        restores,
      );
    }

    const overlayApi = globalThis.OverlayPluginApi;
    if (typeof overlayApi?.callHandler === 'function') {
      const originalCallHandler = overlayApi.callHandler;
      arrReplayPatchProperty(
        overlayApi,
        'callHandler',
        function(message, callback) {
          let request;
          try {
            request = JSON.parse(message);
          } catch (_error) {
            return originalCallHandler.call(this, message, callback);
          }
          if (!blockedOverlayCalls.has(request?.call))
            return originalCallHandler.call(this, message, callback);
          callback?.('{}');
        },
        restores,
      );
    }

    if (typeof globalThis.Audio === 'function') {
      const NativeAudio = globalThis.Audio;
      const SuppressedAudio = function() {
        this.volume = 1;
      };
      SuppressedAudio.prototype = Object.create(NativeAudio.prototype);
      Object.defineProperties(SuppressedAudio.prototype, {
        constructor: { value: SuppressedAudio },
        play: { value: () => Promise.resolve() },
        pause: { value: () => undefined },
      });
      arrReplayPatchProperty(globalThis, 'Audio', SuppressedAudio, restores);
    }

    if (typeof globalThis.speechSynthesis?.speak === 'function') {
      arrReplayPatchProperty(
        globalThis.speechSynthesis,
        'speak',
        () => undefined,
        restores,
      );
    }

    if (typeof globalThis.navigator?.getGamepads === 'function') {
      arrReplayPatchProperty(
        globalThis.navigator,
        'getGamepads',
        () => [],
        restores,
      );
    }
  };

  const arrReplayDrainControlledMicrotasks = async (context) => {
    let previousActivity = -1;
    let stableTurns = 0;
    for (let turn = 0;
      turn < arrReplaySchedulerLimits.maximumMicrotaskTurnsPerControlledRun;
      ++turn) {
      context.microtaskTurns = turn + 1;
      await arrReplayNativePromise.resolve();
      if (arrReplayScheduler.fault !== undefined)
        throw arrReplayScheduler.fault;
      if (context.pendingPromiseContinuations === 0 &&
          context.promiseActivity === previousActivity) {
        if (++stableTurns >= 2)
          return;
      } else {
        stableTurns = 0;
      }
      previousActivity = context.promiseActivity;
    }
    throw new Error(
      `ARR trigger Promise 未在微任务硬上限内静止：` +
      `${context.pendingPromiseContinuations} pending / ` +
      `${context.promiseActivity} activity`,
    );
  };

  const arrReplayRunControlled = async (replayMs, action) => {
    if (!Number.isSafeInteger(replayMs) || replayMs < 0)
      throw new Error(`ARR 受控执行 replayMs 非法：${replayMs}`);
    if (typeof action !== 'function')
      throw new TypeError('ARR 受控执行 action 必须是函数');
    if (arrReplayControlledContext !== undefined)
      throw new Error('ARR 受控执行禁止嵌套');
    if (arrReplayScheduler.generation !== arrReplayState.generation)
      throw new Error('ARR 受控执行 scheduler generation 已变化');

    const suppressVisibleEffects = arrReplayState.active;
    const textSnapshot = arrReplayWarmTextSnapshot();
    const restores = [];
    arrReplayControlledContext = {
      generation: arrReplayState.generation,
      replayMs,
      pendingPromiseContinuations: 0,
      promiseActivity: 0,
      promiseConstructionStack: [],
      microtaskTurns: 0,
    };
    let primaryError;
    try {
      arrReplayInstallControlledGlobals(restores, suppressVisibleEffects);
      const actionResult = action();
      arrReplayNativePromise.resolve(actionResult).then(
        undefined,
        (error) => {
          arrReplaySchedulerFault(error);
        },
      );
      await arrReplayDrainControlledMicrotasks(arrReplayControlledContext);
      if (arrReplayScheduler.fault !== undefined)
        throw arrReplayScheduler.fault;
    } catch (error) {
      primaryError = error;
    } finally {
      for (const restore of restores.reverse()) {
        try {
          restore();
        } catch (error) {
          primaryError ??= new Error(`ARR 受控全局恢复失败：${error}`);
        }
      }
      arrReplayControlledContext = undefined;
      try {
        arrReplayRestoreWarmTextSnapshot(textSnapshot);
      } catch (error) {
        primaryError ??= new Error(`ARR warm 文本隔离恢复失败：${error}`);
      }
    }
    if (primaryError !== undefined)
      throw primaryError;
  };

  const arrReplayCancelSchedulerWake = () => {
    if (arrReplayScheduler.nativeWakeHandle !== undefined)
      arrReplayNativeClearTimeout(arrReplayScheduler.nativeWakeHandle);
    arrReplayScheduler.nativeWakeHandle = undefined;
  };

  const arrReplayResetScheduler = (generation, replayEpoch) => {
    arrReplayCancelSchedulerWake();
    const dateEpochMs = 946684800000 + (replayEpoch % 100000) * 172800000;
    arrReplayScheduler = {
      generation,
      tasks: new Map(),
      nextOrdinal: 0,
      createdTasks: 0,
      callbacksExecuted: 0,
      peakPendingTasks: 0,
      dateEpochMs,
      nativeWakeHandle: undefined,
      fault: undefined,
    };
  };

  const arrReplayNextScheduledTask = (limitReplayMs, inclusive) => {
    let next;
    for (const task of arrReplayScheduler.tasks.values()) {
      const inRange = inclusive
        ? task.dueReplayMs <= limitReplayMs
        : task.dueReplayMs < limitReplayMs;
      if (!inRange)
        continue;
      if (next === undefined ||
          task.dueReplayMs < next.dueReplayMs ||
          task.dueReplayMs === next.dueReplayMs && task.ordinal < next.ordinal)
        next = task;
    }
    return next;
  };

  const arrReplayRunScheduledThrough = async (limitReplayMs, inclusive) => {
    if (!Number.isSafeInteger(limitReplayMs) || limitReplayMs < 0)
      throw new Error(`ARR scheduler limit 非法：${limitReplayMs}`);
    let callbacks = 0;
    while (true) {
      const task = arrReplayNextScheduledTask(limitReplayMs, inclusive);
      if (task === undefined)
        break;
      arrReplayScheduler.tasks.delete(task.handle);
      if (task.generation !== arrReplayState.generation ||
          task.generation !== arrReplayScheduler.generation)
        continue;
      if (++callbacks > arrReplaySchedulerLimits.maximumCallbacksPerAdvance)
        throw new Error('ARR replay timer 达到单次推进回调硬上限');
      ++arrReplayScheduler.callbacksExecuted;
      await arrReplayRunControlled(
        task.dueReplayMs,
        () => task.callback(...task.args),
      );
    }
  };

  const arrReplayArmSchedulerWake = () => {
    arrReplayCancelSchedulerWake();
    if (!arrReplayState.active || !arrReplayState.warmComplete ||
        arrReplayScheduler.generation !== arrReplayState.generation ||
        arrReplayScheduler.tasks.size === 0)
      return;
    const next = [...arrReplayScheduler.tasks.values()]
      .filter((task) => task.generation === arrReplayState.generation)
      .sort((left, right) =>
        left.dueReplayMs - right.dueReplayMs || left.ordinal - right.ordinal)[0];
    if (next === undefined)
      return;
    const now = arrReplayClockSnapshot().replayMs;
    const delay = Math.max(0, Math.ceil(next.dueReplayMs - now));
    const expectedGeneration = arrReplayState.generation;
    arrReplayScheduler.nativeWakeHandle = arrReplayNativeSetTimeout(() => {
      arrReplayScheduler.nativeWakeHandle = undefined;
      if (expectedGeneration !== arrReplayState.generation ||
          expectedGeneration !== arrReplayScheduler.generation ||
          !arrReplayState.active || !arrReplayState.warmComplete)
        return;
      const currentReplayMs = arrReplayClockSnapshot().replayMs;
      const failScheduler = (error) => {
        if (expectedGeneration !== arrReplayState.generation)
          return;
        void arrReplayFailClosedAndLock(`trigger-scheduler:${error}`);
      };
      const schedulerRun = arrReplayRunScheduledThrough(currentReplayMs, true);
      // Using the patched .then here would make the controlled run wait for
      // the scheduler promise that is itself waiting for that controlled run.
      void arrReplayNativePromiseThen.call(
        schedulerRun,
        () => {
          try {
            arrReplayArmSchedulerWake();
          } catch (error) {
            failScheduler(error);
          }
        },
        failScheduler,
      );
    }, delay);
    arrReplayScheduler.nativeWakeHandle?.unref?.();
  };

  const arrReplayAdvanceSchedulerBeforeSource = async (replayMs) => {
    arrReplayCancelSchedulerWake();
    // Equal-time tasks run after every source event at that replay timestamp.
    await arrReplayRunScheduledThrough(replayMs, false);
  };

  const arrReplayCompleteSchedulerWarm = async (replayMs) => {
    arrReplayCancelSchedulerWake();
    await arrReplayRunScheduledThrough(replayMs, true);
    await arrReplayRunControlled(replayMs, () => undefined);
    if (arrReplayScheduler.fault !== undefined)
      throw arrReplayScheduler.fault;
  };

  const scheduleArrReplayTask = (callback, delayMilliseconds) => {
    if (!arrReplayState.active)
      throw new Error('ARR replay task 只能在固定回放 epoch 内创建');
    if (arrReplayControlledContext !== undefined)
      return arrReplayScheduleVirtualTimeout(callback, delayMilliseconds);
    const replayMs = arrReplayClockSnapshot().replayMs;
    arrReplayControlledContext = {
      generation: arrReplayState.generation,
      replayMs,
    };
    try {
      const handle = arrReplayScheduleVirtualTimeout(callback, delayMilliseconds);
      arrReplayArmSchedulerWake();
      return handle;
    } finally {
      arrReplayControlledContext = undefined;
    }
  };

  const cancelArrReplayTask = (handle) => {
    if (!arrReplayIsVirtualTimerHandle(handle))
      throw new TypeError('ARR replay task handle 非法');
    arrReplayScheduler.tasks.delete(handle);
    arrReplayArmSchedulerWake();
  };

  const getArrReplaySchedulerState = () => Object.freeze({
    generation: arrReplayScheduler.generation,
    pendingTasks: arrReplayScheduler.tasks.size,
    createdTasks: arrReplayScheduler.createdTasks,
    callbacksExecuted: arrReplayScheduler.callbacksExecuted,
    peakPendingTasks: arrReplayScheduler.peakPendingTasks,
    nativeWakeArmed: arrReplayScheduler.nativeWakeHandle !== undefined,
    faulted: arrReplayScheduler.fault !== undefined,
    controlledActive: arrReplayControlledContext !== undefined,
    controlledPendingPromiseContinuations:
      arrReplayControlledContext?.pendingPromiseContinuations ?? 0,
    controlledPromiseActivity: arrReplayControlledContext?.promiseActivity ?? 0,
    controlledMicrotaskTurns: arrReplayControlledContext?.microtaskTurns ?? 0,
  });

  const arrReplayClearCombatants = () => {
    arrReplayCombatants = new Map();
    arrReplayCombatantsGeneration = arrReplayState.generation;
    arrReplayCombatantsPreservedForResume = false;
  };

  const arrReplayPreserveCombatantsForPullReset = () => {
    const fixtureProfile = arrReplayCurrentFixtureProfile();
    if (fixtureProfile === undefined)
      throw new Error('ARR pull-reset 缺少固定 fixture profile');
    for (const member of fixtureProfile.party) {
      if (!arrReplayCombatants.has(member.id))
        throw new Error(`ARR pull-reset 缺少固定party combatant：${member.id}`);
    }
    arrReplayCombatants = new Map(
      [...arrReplayCombatants].map(([id, combatant]) => [id, { ...combatant }]),
    );
    arrReplayCombatantsGeneration = arrReplayState.generation;
    arrReplayCombatantsPreservedForResume = false;
  };

  const arrReplayLineActorId = (value, field) => {
    if (typeof value !== 'string' || !/^[14][0-9A-F]{7}$/u.test(value))
      throw new Error(`ARR replay combatant ${field} actor ID非法`);
    return value;
  };

  const arrReplayLineNumber = (value, field, maximumAbsolute = 100000) => {
    if (typeof value !== 'string' ||
        !/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?$/u.test(value))
      throw new Error(`ARR replay combatant ${field} 数值格式非法`);
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || Math.abs(parsed) > maximumAbsolute)
      throw new Error(`ARR replay combatant ${field} 数值越界`);
    return parsed;
  };

  const arrReplayLineHeading = (value, field) => {
    const parsed = arrReplayLineNumber(value, field, Math.PI + 0.001);
    return parsed;
  };

  const arrReplayLineUInt32 = (value, field, radix) => {
    const pattern = radix === 16 ? /^[0-9A-F]{1,8}$/u : /^(?:0|[1-9][0-9]{0,9})$/u;
    if (typeof value !== 'string' || !pattern.test(value))
      throw new Error(`ARR replay combatant ${field} 整数格式非法`);
    const parsed = Number.parseInt(value, radix);
    if (!Number.isSafeInteger(parsed) || parsed < 0 || parsed > 0xFFFFFFFF)
      throw new Error(`ARR replay combatant ${field} 整数越界`);
    return parsed;
  };

  const arrReplayLineBoundedUInt = (value, field, maximum) => {
    const parsed = arrReplayLineUInt32(value, field, 10);
    if (parsed > maximum)
      throw new Error(`ARR replay combatant ${field} 整数越界`);
    return parsed;
  };

  const arrReplayPositionUpdate = (line, xIndex, yIndex, zIndex, headingIndex, field) => ({
    PosX: arrReplayLineNumber(line[xIndex], `${field}.PosX`),
    PosY: arrReplayLineNumber(line[yIndex], `${field}.PosY`),
    PosZ: arrReplayLineNumber(line[zIndex], `${field}.PosZ`),
    Heading: arrReplayLineHeading(line[headingIndex], `${field}.Heading`),
  });

  const arrReplayCombatantLineMutations = (entry) => {
    const line = entry.line;
    const type = line[0];
    if (type === '03') {
      return [{
        id: arrReplayLineActorId(line[2], '03.source'),
        update: {
          BNpcID: arrReplayLineUInt32(line[10], '03.BNpcID', 10),
          ...arrReplayPositionUpdate(line, 17, 18, 19, 20, '03'),
        },
      }];
    }
    if (type === '20') {
      return [{
        id: arrReplayLineActorId(line[2], '20.source'),
        update: arrReplayPositionUpdate(line, 9, 10, 11, 12, '20.source'),
      }];
    }
    if (type === '21' || type === '22') {
      const sourceId = arrReplayLineActorId(line[2], `${type}.source`);
      const sourceMutation = {
        id: sourceId,
        update: arrReplayPositionUpdate(line, 40, 41, 42, 43, `${type}.source`),
      };
      if (line[6] === 'E0000000') {
        const expectedP5NpcBaseId = arrReplayCurrentFixtureProfile()?.p5NpcBaseId;
        if (!Number.isInteger(expectedP5NpcBaseId) ||
            arrReplayCombatants.get(sourceId)?.BNpcID !== expectedP5NpcBaseId)
          throw new Error(`ARR targetless Ability ${type} source未通过固定NPC门禁`);
        return [sourceMutation];
      }
      return [
        {
          id: arrReplayLineActorId(line[6], `${type}.target`),
          update: arrReplayPositionUpdate(line, 30, 31, 32, 33, `${type}.target`),
        },
        sourceMutation,
      ];
    }
    if (type === '38') {
      const currentHp =
        arrReplayLineBoundedUInt(line[5], '38.CurrentHP', 0x7FFFFFFF);
      const maxHp =
        arrReplayLineBoundedUInt(line[6], '38.MaxHP', 0x7FFFFFFF);
      const currentMp =
        arrReplayLineBoundedUInt(line[7], '38.CurrentMP', 0xFFFF);
      const maxMp =
        arrReplayLineBoundedUInt(line[8], '38.MaxMP', 0xFFFF);
      arrReplayLineBoundedUInt(line[9], '38.ShieldValue', 0xFFFF);
      if (line[10] !== '0')
        throw new Error('ARR replay combatant 38.Unknown 字段非法');
      return [{
        id: arrReplayLineActorId(line[2], '38.target'),
        update: {
          CurrentHP: currentHp,
          MaxHP: maxHp,
          CurrentMP: currentMp,
          MaxMP: maxMp,
          ...arrReplayPositionUpdate(line, 11, 12, 13, 14, '38.target'),
        },
      }];
    }
    if (type !== '261' || line[2] !== 'Add')
      return [];

    const id = arrReplayLineActorId(line[3], '261.actor');
    const allowedPairs = new Set([
      'BNpcID', 'BNpcNameID', 'Heading', 'Level', 'MaxHP', 'MaxMP',
      'Name', 'OwnerID', 'TargetID', 'PosX', 'PosY', 'PosZ',
    ]);
    const pairs = new Map();
    for (let index = 4; index < line.length; index += 2) {
      const key = line[index];
      if (!allowedPairs.has(key) || pairs.has(key))
        throw new Error(`ARR replay combatant 261 pair ${key} 非法或重复`);
      pairs.set(key, line[index + 1]);
    }
    const update = {};
    if (!pairs.has('BNpcID'))
      throw new Error('ARR replay combatant 261 Add缺少BNpcID');
    update.BNpcID = arrReplayLineUInt32(pairs.get('BNpcID'), '261.BNpcID', 16);
    if (pairs.has('Heading'))
      update.Heading = arrReplayLineHeading(pairs.get('Heading'), '261.Heading');
    const positionKeys = ['PosX', 'PosY', 'PosZ'];
    const positionCount = positionKeys.filter((key) => pairs.has(key)).length;
    if (positionCount !== positionKeys.length)
      throw new Error('ARR replay combatant 261 Add position pair不完整');
    update.PosX = arrReplayLineNumber(pairs.get('PosX'), '261.PosX');
    update.PosY = arrReplayLineNumber(pairs.get('PosY'), '261.PosY');
    update.PosZ = arrReplayLineNumber(pairs.get('PosZ'), '261.PosZ');
    if (pairs.has('TargetID')) {
      const targetId =
        arrReplayLineUInt32(pairs.get('TargetID'), '261.TargetID', 16);
      if (targetId !== 0xE0000000)
        arrReplayStateActorId(targetId, '261.TargetID');
      update.TargetID = targetId;
    }
    return [{ id, update }];
  };

  const arrReplayPrepareCombatantUpdates = (logLines) => {
    if (!arrReplayState.active || arrReplayCombatantsGeneration !== arrReplayState.generation)
      throw new Error('ARR replay combatant generation栅栏失败');
    const pending = new Map();
    for (const entry of logLines) {
      for (const mutation of arrReplayCombatantLineMutations(entry)) {
        const previous = pending.get(mutation.id) ?? arrReplayCombatants.get(mutation.id) ?? {
          ID: Number.parseInt(mutation.id, 16),
        };
        pending.set(mutation.id, { ...previous, ...mutation.update });
      }
    }
    const newIds = [...pending.keys()].filter((id) => !arrReplayCombatants.has(id)).length;
    if (arrReplayCombatants.size + newIds > arrReplayCombatantLimit)
      throw new Error(`ARR replay combatant 达到${arrReplayCombatantLimit}状态硬上限`);
    return pending;
  };

  const arrReplayApplyCombatantUpdates = (pending) => {
    for (const [id, combatant] of pending)
      arrReplayCombatants.set(id, combatant);
  };

  const arrReplayStateUInt32 = (value, field) => {
    if (!Number.isSafeInteger(value) || value < 0 || value > 0xFFFFFFFF)
      throw new Error(`ARR state projection ${field} 必须是uint32`);
    return value;
  };

  const arrReplayStateActorId = (value, field) => {
    const parsed = arrReplayStateUInt32(value, field);
    const id = parsed.toString(16).toUpperCase().padStart(8, '0');
    if (!/^[14][0-9A-F]{7}$/u.test(id))
      throw new Error(`ARR state projection ${field} 不在固定actor范围`);
    return id;
  };

  const arrReplayStateTargetId = (value, field) => {
    const parsed = arrReplayStateUInt32(value, field);
    if (parsed === 0xE0000000)
      return parsed;
    arrReplayStateActorId(parsed, field);
    return parsed;
  };

  const arrReplayStateOwnerId = (value, field) => {
    const parsed = arrReplayStateUInt32(value, field);
    if (parsed === 0)
      return parsed;
    arrReplayStateActorId(parsed, field);
    return parsed;
  };

  const arrReplayStateInteger = (value, field, minimum, maximum) => {
    if (!Number.isSafeInteger(value) || value < minimum || value > maximum)
      throw new Error(`ARR state projection ${field} 整数越界`);
    return value;
  };

  const arrReplayStateNumberPattern = /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]{1,6})?$/u;
  const arrReplayStateNumber = (value, field, minimum, maximum) => {
    if (typeof value !== 'number' || !Number.isFinite(value) ||
        Object.is(value, -0) || value < minimum || value > maximum) {
      throw new Error(`ARR state projection ${field} 数值越界`);
    }
    const serialized = JSON.stringify(value);
    if (typeof serialized !== 'string' ||
        !arrReplayStateNumberPattern.test(serialized))
      throw new Error(`ARR state projection ${field} 不是canonical 6位小数`);
    return value;
  };

  const arrReplayStateSafeName = (value, field) => {
    if (typeof value !== 'string' || value.trim().length === 0 ||
        value.length > 64 || /[|\r\n\0]/u.test(value))
      throw new Error(`ARR state projection ${field} 名称非法`);
    return value;
  };

  const arrReplayExpectedStateOp = (semantic) => {
    if (semantic === 'PlayerSpawn' || semantic === 'NpcSpawn')
      return 'actor-upsert';
    if (semantic === 'ActorMove' || semantic === 'ActorSetPos')
      return 'actor-position';
    if (semantic === 'ActorControlTarget')
      return 'actor-target';
    return undefined;
  };

  const arrReplayPrepareProjectedCombatantUpdates = (semantic, stateUpdates) => {
    if (!arrReplayState.active ||
        arrReplayCombatantsGeneration !== arrReplayState.generation)
      throw new Error('ARR state projection generation栅栏失败');
    if (!Array.isArray(stateUpdates) || stateUpdates.length > 1)
      throw new Error('ARR state projection 每个语义事件只允许0或1项更新');
    const expectedOp = arrReplayExpectedStateOp(semantic);
    if (stateUpdates.length === 0) {
      if (expectedOp !== undefined)
        throw new Error(`ARR ${semantic} semantic 缺少${expectedOp}`);
      return new Map();
    }
    const update = stateUpdates[0];
    if (typeof update !== 'object' || update === null || Array.isArray(update) ||
        update.op !== expectedOp)
      throw new Error('ARR state projection op 与semantic不匹配');

    const pending = new Map();
    if (update.op === 'actor-upsert') {
      if (!arrReplayExactKeys(update, ['op', 'actor']))
        throw new Error('ARR actor-upsert DTO字段不精确');
      const actor = update.actor;
      if (!arrReplayExactKeys(actor, [
        'ID', 'OwnerID', 'Type', 'TargetID', 'Job', 'Level', 'Name',
        'CurrentHP', 'MaxHP', 'CurrentMP', 'MaxMP',
        'PosX', 'PosY', 'PosZ', 'Heading',
        'BNpcID', 'BNpcNameID', 'PartyType',
      ]))
        throw new Error('ARR actor-upsert actor字段不精确');
      const id = arrReplayStateActorId(actor.ID, 'actor.ID');
      const type = arrReplayStateInteger(actor.Type, 'actor.Type', 1, 2);
      const partyType =
        arrReplayStateInteger(actor.PartyType, 'actor.PartyType', 0, 1);
      const job = arrReplayStateInteger(actor.Job, 'actor.Job', 0, 0xFF);
      const name = arrReplayStateSafeName(actor.Name, 'actor.Name');
      const bNpcId = arrReplayStateUInt32(actor.BNpcID, 'actor.BNpcID');
      const bNpcNameId =
        arrReplayStateUInt32(actor.BNpcNameID, 'actor.BNpcNameID');
      const ownerId = arrReplayStateOwnerId(actor.OwnerID, 'actor.OwnerID');
      if (semantic === 'PlayerSpawn') {
        const fixtureMember =
          arrReplayCurrentFixtureProfile()?.party.find((member) => member.id === id);
        if (type !== 1 || partyType !== 1 || id[0] !== '1' ||
            bNpcId !== 0 || bNpcNameId !== 0 ||
            ownerId !== 0 ||
            fixtureMember === undefined ||
            fixtureMember.name !== name || fixtureMember.job !== job)
          throw new Error('ARR player actor-upsert 未绑定固定匿名party身份');
      } else if (type !== 2 || partyType !== 0 || id[0] !== '4') {
        throw new Error('ARR NPC actor-upsert 类型或ID不一致');
      }
      const projected = {
        ID: actor.ID,
        OwnerID: ownerId,
        Type: type,
        TargetID: arrReplayStateTargetId(actor.TargetID, 'actor.TargetID'),
        Job: job,
        Level: arrReplayStateInteger(actor.Level, 'actor.Level', 0, 0xFF),
        Name: name,
        CurrentHP: arrReplayStateUInt32(actor.CurrentHP, 'actor.CurrentHP'),
        MaxHP: arrReplayStateUInt32(actor.MaxHP, 'actor.MaxHP'),
        CurrentMP: arrReplayStateUInt32(actor.CurrentMP, 'actor.CurrentMP'),
        MaxMP: arrReplayStateUInt32(actor.MaxMP, 'actor.MaxMP'),
        PosX: arrReplayStateNumber(
          actor.PosX,
          'actor.PosX',
          -arrReplayMaximumStatePositionAbsolute,
          arrReplayMaximumStatePositionAbsolute,
        ),
        PosY: arrReplayStateNumber(
          actor.PosY,
          'actor.PosY',
          -arrReplayMaximumStatePositionAbsolute,
          arrReplayMaximumStatePositionAbsolute,
        ),
        PosZ: arrReplayStateNumber(
          actor.PosZ,
          'actor.PosZ',
          -arrReplayMaximumStatePositionAbsolute,
          arrReplayMaximumStatePositionAbsolute,
        ),
        Heading: arrReplayStateNumber(
          actor.Heading,
          'actor.Heading',
          -arrReplayMaximumStateHeadingAbsolute,
          arrReplayMaximumStateHeadingAbsolute,
        ),
        BNpcID: bNpcId,
        BNpcNameID: bNpcNameId,
        PartyType: partyType,
      };
      if (!arrReplayCombatants.has(id) &&
          arrReplayCombatants.size + pending.size >= arrReplayCombatantLimit)
        throw new Error(`ARR replay combatant 达到${arrReplayCombatantLimit}状态硬上限`);
      pending.set(id, projected);
      return pending;
    }

    const id = arrReplayStateActorId(update.id, `${update.op}.id`);
    const previous = arrReplayCombatants.get(id);
    if (previous === undefined)
      throw new Error(`ARR ${update.op} 引用了尚未upsert的actor：${id}`);
    if (update.op === 'actor-position') {
      if (!arrReplayExactKeys(update, [
        'op', 'id', 'PosX', 'PosY', 'PosZ', 'Heading',
      ]))
        throw new Error('ARR actor-position DTO字段不精确');
      pending.set(id, {
        ...previous,
        PosX: arrReplayStateNumber(
          update.PosX,
          'actor-position.PosX',
          -arrReplayMaximumStatePositionAbsolute,
          arrReplayMaximumStatePositionAbsolute,
        ),
        PosY: arrReplayStateNumber(
          update.PosY,
          'actor-position.PosY',
          -arrReplayMaximumStatePositionAbsolute,
          arrReplayMaximumStatePositionAbsolute,
        ),
        PosZ: arrReplayStateNumber(
          update.PosZ,
          'actor-position.PosZ',
          -arrReplayMaximumStatePositionAbsolute,
          arrReplayMaximumStatePositionAbsolute,
        ),
        Heading: arrReplayStateNumber(
          update.Heading,
          'actor-position.Heading',
          -arrReplayMaximumStateHeadingAbsolute,
          arrReplayMaximumStateHeadingAbsolute,
        ),
      });
      return pending;
    }

    if (!arrReplayExactKeys(update, ['op', 'id', 'TargetID']))
      throw new Error('ARR actor-target DTO字段不精确');
    pending.set(id, {
      ...previous,
      TargetID: arrReplayStateTargetId(update.TargetID, 'actor-target.TargetID'),
    });
    return pending;
  };

  const arrReplayStateMatchesRoundedLogNumber = (stateValue, rawValue, field) => {
    const logValue = arrReplayLineNumber(rawValue, field);
    // Standard LogLine fields are formatted to three decimals while typed
    // projection keeps six. Half a millimetre is the maximum representation
    // loss; it is not a tolerance for two independent world states.
    return Math.abs(stateValue - logValue) <= 0.000500001;
  };

  const arrReplayValidateSpawnProjectionConsistency = (event, projected) => {
    const spawnEntries = event.logLines.filter((entry) => entry.line[0] === '03');
    const memoryEntries = event.logLines.filter((entry) => entry.line[0] === '261');
    if (event.logLines.length !== 2 ||
        spawnEntries.length !== 1 || memoryEntries.length !== 1 ||
        memoryEntries[0].line[2] !== 'Add' || projected.size !== 1)
      throw new Error(`ARR ${event.semantic} 必须含唯一03/261与actor-upsert`);

    const [projectedId, actor] = projected.entries().next().value;
    const spawn = spawnEntries[0].line;
    const memory = memoryEntries[0].line;
    const spawnId = arrReplayLineActorId(spawn[2], '03.source');
    const memoryId = arrReplayLineActorId(memory[3], '261.actor');
    const spawnOwnerId = arrReplayLineUInt32(spawn[6], '03.OwnerID', 16);
    const spawnMatches =
      projectedId === spawnId && projectedId === memoryId &&
      actor.ID === Number.parseInt(projectedId, 16) &&
      actor.Name === spawn[3] &&
      actor.Job === arrReplayLineUInt32(spawn[4], '03.Job', 16) &&
      actor.Level === arrReplayLineUInt32(spawn[5], '03.Level', 16) &&
      actor.OwnerID === spawnOwnerId &&
      actor.BNpcNameID === arrReplayLineUInt32(spawn[9], '03.BNpcNameID', 10) &&
      actor.BNpcID === arrReplayLineUInt32(spawn[10], '03.BNpcID', 10) &&
      actor.CurrentHP === arrReplayLineUInt32(spawn[11], '03.CurrentHP', 10) &&
      actor.MaxHP === arrReplayLineUInt32(spawn[12], '03.MaxHP', 10) &&
      actor.CurrentMP === arrReplayLineUInt32(spawn[13], '03.CurrentMP', 10) &&
      actor.MaxMP === arrReplayLineUInt32(spawn[14], '03.MaxMP', 10) &&
      arrReplayStateMatchesRoundedLogNumber(actor.PosX, spawn[17], '03.PosX') &&
      arrReplayStateMatchesRoundedLogNumber(actor.PosY, spawn[18], '03.PosY') &&
      arrReplayStateMatchesRoundedLogNumber(actor.PosZ, spawn[19], '03.PosZ') &&
      arrReplayStateMatchesRoundedLogNumber(actor.Heading, spawn[20], '03.Heading');
    if (!spawnMatches)
      throw new Error(`ARR ${event.semantic} actor-upsert 与03不一致`);

    const requiredPairs = [
      'BNpcID', 'BNpcNameID', 'Heading', 'Level', 'MaxHP', 'MaxMP',
      'Name', 'OwnerID', 'TargetID', 'PosX', 'PosY', 'PosZ',
    ];
    const pairs = new Map();
    for (let index = 4; index < memory.length; index += 2) {
      const key = memory[index];
      if (!requiredPairs.includes(key) || pairs.has(key))
        throw new Error(`ARR ${event.semantic} 261 pair非法或重复：${key}`);
      pairs.set(key, memory[index + 1]);
    }
    if (pairs.size !== requiredPairs.length ||
        requiredPairs.some((key) => !pairs.has(key)))
      throw new Error(`ARR ${event.semantic} 261 Add字段不完整`);
    const memoryMatches =
      actor.BNpcID === arrReplayLineUInt32(pairs.get('BNpcID'), '261.BNpcID', 16) &&
      actor.BNpcNameID ===
        arrReplayLineUInt32(pairs.get('BNpcNameID'), '261.BNpcNameID', 16) &&
      actor.Level === arrReplayLineUInt32(pairs.get('Level'), '261.Level', 10) &&
      actor.MaxHP === arrReplayLineUInt32(pairs.get('MaxHP'), '261.MaxHP', 10) &&
      actor.MaxMP === arrReplayLineUInt32(pairs.get('MaxMP'), '261.MaxMP', 10) &&
      actor.Name === pairs.get('Name') &&
      actor.OwnerID === arrReplayLineUInt32(pairs.get('OwnerID'), '261.OwnerID', 16) &&
      actor.TargetID ===
        arrReplayLineUInt32(pairs.get('TargetID'), '261.TargetID', 16) &&
      arrReplayStateMatchesRoundedLogNumber(
        actor.PosX, pairs.get('PosX'), '261.PosX') &&
      arrReplayStateMatchesRoundedLogNumber(
        actor.PosY, pairs.get('PosY'), '261.PosY') &&
      arrReplayStateMatchesRoundedLogNumber(
        actor.PosZ, pairs.get('PosZ'), '261.PosZ') &&
      arrReplayStateMatchesRoundedLogNumber(
        actor.Heading, pairs.get('Heading'), '261.Heading');
    if (!memoryMatches)
      throw new Error(`ARR ${event.semantic} actor-upsert 与261 Add不一致`);
  };

  const arrReplayValidateTargetProjectionConsistency = (event, projected) => {
    if (event.logLines.length !== 1 || projected.size !== 1)
      throw new Error('ARR ActorControlTarget 必须含唯一261与actor-target');
    const line = event.logLines[0].line;
    const sourceId = arrReplayLineActorId(line[3], '261.Change.source');
    const targetId = arrReplayLineUInt32(line[5], '261.Change.TargetID', 16);
    const [projectedId, actor] = projected.entries().next().value;
    if (projectedId !== sourceId ||
        actor.ID !== Number.parseInt(sourceId, 16) ||
        actor.TargetID !== targetId)
      throw new Error('ARR actor-target 与261 Change/TargetID不一致');
  };

  const arrReplayPrepareSemanticCombatantUpdates = (event) => {
    const projected = arrReplayPrepareProjectedCombatantUpdates(
      event.semantic,
      event.stateUpdates,
    );
    // Typed updates are authoritative for spawn, raw movement, set-position,
    // and the pinned target-change semantic. Other cactbot LogLine projections
    // carry fresher source/target positions (cast/ability/status) and remain
    // the single adapter for those disjoint semantics.
    if (arrReplayExpectedStateOp(event.semantic) !== undefined) {
      if (event.semantic === 'PlayerSpawn' || event.semantic === 'NpcSpawn') {
        arrReplayPrepareCombatantUpdates(event.logLines);
        arrReplayValidateSpawnProjectionConsistency(event, projected);
      } else if (event.semantic === 'ActorControlTarget') {
        arrReplayValidateTargetProjectionConsistency(event, projected);
      }
      return projected;
    }
    return arrReplayPrepareCombatantUpdates(event.logLines);
  };

  const getArrReplayCombatants = (ids) => {
    if (!Array.isArray(ids) || ids.length === 0 || ids.length > arrReplayCombatantQueryLimit)
      throw new TypeError(`ARR replay combatant 查询必须包含1-${arrReplayCombatantQueryLimit}个精确ID`);
    const normalized = ids.map((id) => {
      if (!Number.isSafeInteger(id) || id < 0 || id > 0xFFFFFFFF)
        throw new TypeError('ARR replay combatant 查询ID必须是uint32整数');
      const hex = id.toString(16).toUpperCase().padStart(8, '0');
      if (!/^[14][0-9A-F]{7}$/u.test(hex))
        throw new TypeError('ARR replay combatant 查询ID不在固定actor范围');
      return hex;
    });
    if (new Set(normalized).size !== normalized.length)
      throw new TypeError('ARR replay combatant 查询ID不得重复');
    if (!arrReplayState.active || arrReplayCombatantsGeneration !== arrReplayState.generation)
      return [];
    return normalized.flatMap((id) => {
      const combatant = arrReplayCombatants.get(id);
      return combatant === undefined ? [] : [{ ...combatant }];
    });
  };

  const arrReplayDispatchCombatState = (
      inGameCombat,
      { localOnly = false } = {}) => {
    if (typeof window.dispatchOverlayEvent !== 'function')
      throw new Error('dispatchOverlayEvent 不可用');
    window.dispatchOverlayEvent({
      type: 'onInCombatChangedEvent',
      detail: { inGameCombat },
      stringArrReplaySyntheticCombat: true,
      stringArrReplayLocalOnly: localOnly,
    });
  };

  const arrReplayApplySyntheticZone = async (
      zoneId,
      zoneName,
      {
        localOnly = false,
        isCurrent = () => true,
        failOnConfigError = false,
      } = {}) => {
    if (!Number.isInteger(zoneId) || zoneId < 0 || typeof zoneName !== 'string')
      throw new Error('ARR synthetic ChangeZone 参数非法');
    if (!isCurrent())
      return false;
    if (localOnly) {
      syncEncounterState({
        zoneId,
        zoneName,
        inEncounter: zoneId === dancingMadUltimateZoneId,
        confirmed: false,
        locked: false,
        revision: encounterState.revision + 1,
        config: safeEncounterConfig,
      });
    } else {
      let configError;
      let configResult;
      try {
        configResult = await callStringConfig(
          'enterZone',
          { zoneId, zoneName },
          {
            applyState: false,
            timeoutMs: arrReplayBrowserRpcTimeoutMs,
          },
        );
      } catch (error) {
        configError = error;
      }
      if (!isCurrent())
        return false;
      if (configError !== undefined) {
        if (failOnConfigError)
          throw configError;
        console.warn('String ARR synthetic ChangeZone 配置同步失败，使用安全状态', configError);
        syncEncounterState({
          zoneId,
          zoneName,
          inEncounter: zoneId === dancingMadUltimateZoneId,
          confirmed: false,
          locked: false,
          revision: encounterState.revision + 1,
          config: safeEncounterConfig,
        });
      } else {
        syncEncounterState(configResult.state);
      }
    }
    if (typeof window.dispatchOverlayEvent !== 'function')
      throw new Error('dispatchOverlayEvent 不可用');
    window.dispatchOverlayEvent({
      type: 'ChangeZone',
      zoneID: zoneId,
      zoneName,
      stringArrReplaySyntheticZone: true,
      stringArrReplayStrictZoneApplied: true,
    });
    return true;
  };

  const arrReplayEnterStrictZone = async (options) => {
    if (arrReplayStrictRestoreZone === undefined &&
        encounterState.zoneId !== dancingMadUltimateZoneId) {
      arrReplayStrictRestoreZone = {
        zoneId: encounterState.zoneId,
        zoneName: encounterState.zoneName ?? '',
      };
    }
    return await arrReplayApplySyntheticZone(
      dancingMadUltimateZoneId,
      '妖星乱舞绝境战',
      options,
    );
  };

  const arrReplayRestoreStrictZone = async (options) => {
    const restore = arrReplayStrictRestoreZone;
    if (restore === undefined)
      return true;
    const restored = await arrReplayApplySyntheticZone(
      restore.zoneId,
      restore.zoneName,
      options,
    );
    if (restored && arrReplayStrictRestoreZone === restore)
      arrReplayStrictRestoreZone = undefined;
    return restored;
  };

  const broadcastArrReplayParty = (active, members) => {
    callOverlayHandler({
      call: 'broadcast',
      source: 'stringUserJS',
      msg: {
        type: 'arrReplayParty',
        active,
        party: members.map((member) => ({
          id: member.id,
          name: member.name,
          job: member.job,
          inParty: member.inParty !== false,
        })),
      },
    });
  };

  const arrReplayClonePlayerEvent = (event) => event === undefined
    ? undefined
    : {
      ...event,
      detail: { ...(event.detail ?? {}) },
    };

  const arrReplayPinStrictIdentity = () => {
    if (arrReplayStrictIdentityPinned)
      return;
    arrReplayStrictIdentityPinned = true;
    arrReplayStrictRestoreParty =
      lastLiveParty.map((member) => ({ ...member }));
    arrReplayStrictRestorePlayerEvent =
      arrReplayClonePlayerEvent(lastLivePlayerEvent);
  };

  const arrReplayUnpinStrictIdentity = () => {
    arrReplayStrictIdentityPinned = false;
    arrReplayStrictRestoreParty = [];
    arrReplayStrictRestorePlayerEvent = undefined;
  };

  const arrReplayPartyRestoreSnapshot = () =>
    (arrReplayStrictIdentityPinned
      ? arrReplayStrictRestoreParty
      : lastLiveParty).map((member) => ({ ...member }));

  const arrReplayRestoreLiveParty = ({ broadcast = true } = {}) => {
    const restoreParty = arrReplayPartyRestoreSnapshot();
    arrReplayPartyMode = false;
    arrReplayPartyCandidates = [];
    arrReplayPartyReady = false;
    arrReplayPartyPreservedForResume = false;
    arrReplayPartySpawnCursor = 0;
    arrReplayRoleById = new Map();
    arrReplayState.partyReady = false;
    if (typeof window.dispatchOverlayEvent !== 'function')
      throw new Error('dispatchOverlayEvent 不可用');
    window.dispatchOverlayEvent({
      type: 'PartyChanged',
      party: restoreParty,
      stringArrReplayRestore: true,
    });
    if (broadcast)
      broadcastArrReplayParty(false, restoreParty);
  };

  const arrReplayRestoreLivePlayer = async ({
    isCurrent = () => true,
  } = {}) => {
    if (!arrReplayStrictIdentityPinned || !isCurrent())
      return true;
    const restorePlayerEvent =
      arrReplayClonePlayerEvent(arrReplayStrictRestorePlayerEvent);
    if (restorePlayerEvent !== undefined) {
      if (typeof window.dispatchOverlayEvent !== 'function')
        throw new Error('dispatchOverlayEvent 不可用');
      window.dispatchOverlayEvent({
        ...restorePlayerEvent,
        type: 'onPlayerChangedEvent',
        detail: { ...(restorePlayerEvent.detail ?? {}) },
        stringArrReplayRestore: true,
        stringArrReplayStrictRestore: true,
      });
      return isCurrent();
    }
    try {
      await arrReplayNativeCallWithTimeout(
        { call: 'cactbotRequestPlayerUpdate' },
        arrReplayBrowserRpcTimeoutMs,
      );
    } catch (error) {
      // A cold page has no truthful identity to synthesize. Ask the event
      // source once, but keep cleanup successful when no live source exists.
      console.warn('String ARR 冷页恢复本地玩家请求失败', error);
    }
    return isCurrent();
  };

  const arrReplayPrepareSyntheticParty = () => {
    const fixtureProfile = arrReplayCurrentFixtureProfile();
    if (fixtureProfile === undefined || fixtureProfile.party.length !== 8)
      throw new Error('ARR lifecycle 缺少固定8人 fixture party');
    arrReplayPartyMode = true;
    arrReplayPartyCandidates = fixtureProfile.party.map((member) => ({
      ...member,
      inParty: true,
      stringRP: member.rp,
    }));
    arrReplayPartyReady = true;
    arrReplayPartyPreservedForResume = false;
    arrReplayPartySpawnCursor = 0;
    arrReplayRoleById = new Map(arrReplayPartyCandidates.map((member) => [
      normalizePartyId(member.id),
      member.stringRP,
    ]));
    arrReplayState.partyReady = true;

    const tanks = arrReplayPartyCandidates.filter((member) => tankJobs.includes(member.job)).length;
    const healers = arrReplayPartyCandidates.filter((member) => healerJobs.includes(member.job)).length;
    const dps = arrReplayPartyCandidates.filter((member) => dpsJobs.includes(member.job)).length;
    const localMatches = arrReplayPartyCandidates.filter((member) =>
      `0x${member.id}` === fixtureProfile.localActorId);
    const local = localMatches[0];
    const fixtureRoles = arrReplayPartyCandidates.map((member) => member.stringRP);
    const partyIds = arrReplayPartyCandidates.map((member) => member.id);
    const partyNames = arrReplayPartyCandidates.map((member) => member.name);
    if (fixtureProfile.headerJobs.length !== 8 ||
        !Number.isInteger(fixtureProfile.headerPlayerIndex) ||
        fixtureProfile.headerPlayerIndex < 0 ||
        fixtureProfile.headerPlayerIndex >= fixtureProfile.headerJobs.length ||
        fixtureProfile.headerJobs[fixtureProfile.headerPlayerIndex] !==
          fixtureProfile.localJob ||
        arrReplayState.playerIndex !== fixtureProfile.headerPlayerIndex ||
        arrReplayState.localPlayerId !== fixtureProfile.localActorId ||
        arrReplayState.localPlayerName !== fixtureProfile.localAlias ||
        tanks !== 2 || healers !== 2 || dps !== 4 ||
        new Set(partyIds).size !== 8 || new Set(partyNames).size !== 8 ||
        localMatches.length !== 1 ||
        local.name !== fixtureProfile.localAlias ||
        local.job !== fixtureProfile.localJob ||
        !Number.isSafeInteger(local.currentHP) || local.currentHP < 0 ||
        new Set(fixtureRoles).size !== 8 ||
        !['MT', 'ST', 'H1', 'H2', 'D1', 'D2', 'D3', 'D4'].every((role) =>
          fixtureRoles.includes(role)))
      throw new Error('ARR fixed party未通过header身份、actor唯一性或2T2H4D门禁');
  };

  const arrReplayPublishSyntheticParty = () => {
    if (!arrReplayPartyReady || arrReplayPartyCandidates.length !== 8)
      throw new Error('ARR fixed party尚未准备完成');
    if (typeof window.dispatchOverlayEvent !== 'function')
      throw new Error('dispatchOverlayEvent 不可用');
    window.dispatchOverlayEvent({
      type: 'PartyChanged',
      party: arrReplayPartyCandidates.map((member) => ({ ...member })),
      stringArrReplaySynthetic: true,
      stringArrReplayPinnedBeforeSourceZero: true,
    });
    broadcastArrReplayParty(true, arrReplayPartyCandidates);
  };

  const arrReplayPublishSyntheticPlayer = () => {
    const fixtureProfile = arrReplayCurrentFixtureProfile();
    const local = fixtureProfile === undefined
      ? undefined
      : arrReplayPartyCandidates.find((member) =>
        `0x${member.id}` === fixtureProfile.localActorId);
    const job = local === undefined ? undefined : jobNameById[local.job];
    if (local === undefined || job === undefined ||
        local.name !== fixtureProfile.localAlias ||
        local.job !== fixtureProfile.localJob ||
        !Number.isSafeInteger(local.currentHP) || local.currentHP < 0)
      throw new Error('ARR synthetic Player 缺少显式本地成员');
    if (typeof window.dispatchOverlayEvent !== 'function')
      throw new Error('dispatchOverlayEvent 不可用');
    window.dispatchOverlayEvent({
      type: 'onPlayerChangedEvent',
      detail: {
        id: Number.parseInt(local.id, 16),
        name: local.name,
        job,
        currentHP: local.currentHP,
      },
      stringArrReplaySynthetic: true,
      stringArrReplayPinnedBeforeSourceZero: true,
    });
  };

  const arrReplayAcceptPlayerSpawn = (event) => {
    if (!arrReplayPartyReady || arrReplayPartySpawnCursor >= 8)
      throw new Error('ARR PlayerSpawn 超过固定8人快照');
    const fixtureProfile = arrReplayCurrentFixtureProfile();
    if (fixtureProfile === undefined)
      throw new Error('ARR PlayerSpawn 缺少固定 fixture profile');
    const spawnLines = event.logLines.filter((entry) => entry.line[0] === '03');
    if (spawnLines.length !== 1)
      throw new Error('ARR PlayerSpawn 缺少唯一标准03');
    const fields = spawnLines[0].line;
    const id = fields[2];
    const name = fields[3];
    const job = Number.parseInt(fields[4], 16);
    if (!/^[0-9A-F]{8}$/u.test(id) || typeof name !== 'string' || name.length === 0 ||
        name.length > 64 || /[|\r\n\0]/u.test(name) ||
        !Number.isInteger(job) ||
        !tankJobs.includes(job) && !healerJobs.includes(job) && !dpsJobs.includes(job))
      throw new Error('ARR PlayerSpawn party字段非法');
    const expected = fixtureProfile.party[arrReplayPartySpawnCursor];
    if (expected === undefined || expected.id !== id || expected.name !== name || expected.job !== job)
      throw new Error('ARR PlayerSpawn与固定spawn-order party快照不一致');
    ++arrReplayPartySpawnCursor;
  };

  const arrLogReplayResetRoster = (zoneId, zoneName, active, pending) => {
    const wasReplay = arrLogReplayState.active || arrLogReplayState.pending;
    clearTimeout(arrLogReplayTimer);
    arrLogReplayTimer = undefined;
    arrLogReplayState = {
      active,
      pending,
      published: false,
      generation: arrLogReplayState.generation + 1,
      zoneId,
      zoneName,
      localPlayerId: undefined,
      localPlayerName: undefined,
      members: new Map(),
    };
    if (active || pending)
      arrReplayBlockExternalEffects(true);
    else if (wasReplay)
      arrReplayBlockExternalEffects(false);
    arrReplayPartyMode = active;
    arrReplayPartyCandidates = [];
    arrReplayPartyReady = false;
    arrReplayPartySpawnCursor = 0;
    arrReplayRoleById = new Map();
  };

  const arrLogReplayCaptureRestoreState = () => {
    if (arrLogReplayRestoreCaptured)
      return;
    arrLogReplayRestoreCaptured = true;
    arrLogReplayRestoreParty = lastLiveParty.map((member) => ({ ...member }));
    arrLogReplayRestorePlayerEvent = lastLivePlayerEvent === undefined
      ? undefined
      : {
        ...lastLivePlayerEvent,
        detail: { ...(lastLivePlayerEvent.detail ?? {}) },
      };
  };

  const arrLogReplayClearRestoreState = () => {
    arrLogReplayRestoreCaptured = false;
    arrLogReplayRestoreParty = [];
    arrLogReplayRestorePlayerEvent = undefined;
  };

  const arrLogReplayCancelForStrictReplay = () => {
    if (!arrLogReplayState.active && !arrLogReplayState.pending)
      return;
    clearTimeout(arrLogReplayTimer);
    arrLogReplayTimer = undefined;
    arrLogReplayState = {
      active: false,
      pending: false,
      published: false,
      generation: arrLogReplayState.generation + 1,
      zoneId: 0,
      zoneName: '',
      localPlayerId: undefined,
      localPlayerName: undefined,
      members: new Map(),
    };
    arrLogReplayClearRestoreState();
  };

  const arrLogReplayMatchesNativeParty = () => {
    if (arrLogReplayState.members.size !== 8)
      return false;
    const nativeParty = lastLiveParty.filter((member) => member.inParty);
    if (nativeParty.length !== 8)
      return false;
    const nativeById = new Map(nativeParty.map((member) => [
      normalizePartyId(member.id),
      member,
    ]));
    if (nativeById.size !== 8)
      return false;
    return [...arrLogReplayState.members.values()].every((replayMember) => {
      const nativeMember = nativeById.get(normalizePartyId(replayMember.id));
      return nativeMember !== undefined &&
        nativeMember.name === replayMember.name &&
        Number(nativeMember.job) === replayMember.job;
    });
  };

  const arrLogReplayStopForNativeParty = () => {
    if ((!arrLogReplayState.active && !arrLogReplayState.pending) ||
        !arrLogReplayMatchesNativeParty())
      return false;
    arrLogReplayResetRoster(0, '', false, false);
    arrLogReplayClearRestoreState();
    broadcastArrReplayParty(false, lastLiveParty);
    return true;
  };

  const arrLogReplayDispatchCombat = (inGameCombat) => {
    if (typeof window.dispatchOverlayEvent !== 'function')
      throw new Error('dispatchOverlayEvent 不可用');
    window.dispatchOverlayEvent({
      type: 'onInCombatChangedEvent',
      detail: { inGameCombat },
      stringArrReplayDetected: true,
    });
  };

  const arrLogReplayRestoreLiveState = (zoneId, zoneName) => {
    const wasActive = arrLogReplayState.active || arrLogReplayState.pending;
    const restoreParty = arrLogReplayRestoreCaptured
      ? arrLogReplayRestoreParty.map((member) => ({ ...member }))
      : lastLiveParty.map((member) => ({ ...member }));
    const restorePlayerEvent = arrLogReplayRestoreCaptured &&
      arrLogReplayRestorePlayerEvent !== undefined
      ? {
        ...arrLogReplayRestorePlayerEvent,
        detail: { ...(arrLogReplayRestorePlayerEvent.detail ?? {}) },
      }
      : lastLivePlayerEvent;
    arrLogReplayResetRoster(0, '', false, false);
    arrLogReplayClearRestoreState();
    if (!wasActive)
      return;
    arrLogReplayDispatchCombat(false);
    window.dispatchOverlayEvent({
      type: 'PartyChanged',
      party: restoreParty,
      stringArrReplayRestore: true,
    });
    broadcastArrReplayParty(false, restoreParty);
    if (restorePlayerEvent !== undefined) {
      window.dispatchOverlayEvent({
        ...restorePlayerEvent,
        detail: { ...(restorePlayerEvent.detail ?? {}) },
        stringArrReplayRestore: true,
      });
    }
    window.dispatchOverlayEvent({
      type: 'ChangeZone',
      zoneID: zoneId,
      zoneName,
      stringArrReplaySyntheticZone: true,
    });
  };

  const arrLogReplayTryPublish = () => {
    if (!arrLogReplayState.active || arrLogReplayState.published ||
        arrLogReplayState.members.size !== 8 ||
        arrLogReplayState.localPlayerId === undefined ||
        arrLogReplayState.localPlayerName === undefined)
      return;
    const party = [...arrLogReplayState.members.values()];
    const tanks = party.filter((member) => tankJobs.includes(member.job)).length;
    const healers = party.filter((member) => healerJobs.includes(member.job)).length;
    const dps = party.filter((member) => dpsJobs.includes(member.job)).length;
    const local = party.find((member) =>
      member.id === arrLogReplayState.localPlayerId &&
      member.name === arrLogReplayState.localPlayerName);
    if (tanks !== 2 || healers !== 2 || dps !== 4 || local === undefined)
      return;
    const jobName = jobNameById[local.job];
    if (jobName === undefined)
      return;

    arrReplayPartyMode = true;
    arrReplayPartyReady = true;
    clearTimeout(partyUpdateTimer);
    createParty(party);
    arrLogReplayState.published = true;
    window.dispatchOverlayEvent({
      type: 'ChangeZone',
      zoneID: arrLogReplayState.zoneId,
      zoneName: arrLogReplayState.zoneName,
      stringArrReplaySyntheticZone: true,
    });
    window.dispatchOverlayEvent({
      type: 'PartyChanged',
      party: party.map((member) => ({ ...member })),
      stringArrReplaySynthetic: true,
      stringArrReplayDetected: true,
    });
    broadcastArrReplayParty(true, party);
    window.dispatchOverlayEvent({
      type: 'onPlayerChangedEvent',
      detail: {
        name: local.name,
        job: jobName,
        currentHP: local.currentHP,
        maxHP: local.maxHP,
      },
      stringArrReplayDetected: true,
    });
    arrLogReplayDispatchCombat(true);
  };

  const arrLogReplayActivate = (generation) => {
    if (!arrLogReplayState.pending || arrLogReplayState.generation !== generation)
      return;
    if (arrLogReplayStopForNativeParty())
      return;
    arrLogReplayState.pending = false;
    arrLogReplayDispatchCombat(false);
    arrLogReplayState.active = true;
    arrReplayPartyMode = true;
    arrLogReplayTryPublish();
  };

  const arrLogReplayPlayerSpawn = (line) => {
    if ((!arrLogReplayState.active && !arrLogReplayState.pending) ||
        arrLogReplayState.members.size >= 8)
      return;
    const id = normalizePartyId(line[2]);
    const name = line[3];
    const job = Number.parseInt(line[4], 16);
    const currentHP = Number.parseInt(line[11], 10);
    const maxHP = Number.parseInt(line[12], 10);
    if (!/^1[0-9A-F]{7}$/u.test(id) || typeof name !== 'string' || name.length === 0 ||
        name.length > 64 || /[|\r\n\0]/u.test(name) || !Number.isInteger(job) ||
        !tankJobs.includes(job) && !healerJobs.includes(job) && !dpsJobs.includes(job) ||
        !Number.isFinite(currentHP) || !Number.isFinite(maxHP))
      return;
    if ([...arrLogReplayState.members.values()].some((member) => member.name === name))
      return;
    arrLogReplayState.members.set(id, {
      id,
      name,
      job,
      inParty: true,
      currentHP,
      maxHP,
    });
    if (arrLogReplayStopForNativeParty())
      return;
    arrLogReplayTryPublish();
  };

  const handleArrLogReplayLine = (event) => {
    if (arrReplayState.active)
      return;
    const line = event?.line;
    if (!Array.isArray(line))
      return;
    if (line[0] === '01') {
      const zoneId = Number.parseInt(line[2], 16);
      const zoneName = line[3];
      if (!Number.isInteger(zoneId) || zoneId < 0 || typeof zoneName !== 'string')
        return;
      if ((arrLogReplayState.active || arrLogReplayState.pending) &&
          zoneId !== dancingMadUltimateZoneId) {
        arrLogReplayRestoreLiveState(zoneId, zoneName);
        return;
      }
      if (zoneId !== dancingMadUltimateZoneId)
        return;
      if (arrLogReplayState.active) {
        arrLogReplayDispatchCombat(false);
        arrLogReplayResetRoster(zoneId, zoneName, true, false);
        return;
      }
      arrLogReplayCaptureRestoreState();
      arrLogReplayResetRoster(zoneId, zoneName, false, true);
      const generation = arrLogReplayState.generation;
      arrLogReplayTimer = setTimeout(
        () => arrLogReplayActivate(generation),
        arrLogReplayNativePartySettleMs,
      );
      arrLogReplayTimer?.unref?.();
      return;
    }
    if (!arrLogReplayState.active && !arrLogReplayState.pending)
      return;
    if (line[0] === '02') {
      const id = normalizePartyId(line[2]);
      const name = line[3];
      if (/^1[0-9A-F]{7}$/u.test(id) && typeof name === 'string' && name.length > 0 &&
          name.length <= 64 && !/[|\r\n\0]/u.test(name)) {
        arrLogReplayState.localPlayerId = id;
        arrLogReplayState.localPlayerName = name;
        arrLogReplayTryPublish();
      }
      return;
    }
    if (line[0] === '03')
      arrLogReplayPlayerSpawn(line);
  };

  const arrReplayCleanupFailed = (result) =>
    result?.ok !== true && result?.stale !== true;

  const arrReplayFailClosed = async (
      reason,
      expectedIngressGeneration,
      { localOverlayRestore = false } = {}) => {
    if (expectedIngressGeneration !== undefined &&
        expectedIngressGeneration !== arrReplayIngressGeneration) {
      return {
        ok: false,
        stale: true,
        cleanupToken: arrReplayCleanupToken,
        localResetApplied: false,
        vfxCleanupConfirmed: !arrReplayVfxPhysicalActive,
        error: 'ingress-generation-changed',
      };
    }
    const cleanupToken = ++arrReplayCleanupToken;
    const cleanupIsCurrent = () => cleanupToken === arrReplayCleanupToken;
    let cleanupError;
    const recordCleanupError = (stage, error) => {
      cleanupError ??= `${stage}:${error}`.slice(0, 512);
    };
    ++arrReplayIngressGeneration;
    arrReplayIngressActive = false;
    const frozenReplayMs = arrReplayClockSnapshot().replayMs;
    arrReplayCancelVfxExpiryTimer();
    arrReplayVfxRetainedMode = true;
    arrReplayState = {
      ...arrReplayState,
      active: false,
      replayMs: frozenReplayMs,
      lastExposedReplayMs: frozenReplayMs,
      wallAnchorMs: arrReplayWallNow(),
      generation: arrReplayState.generation + 1,
      lastReset: `${reason}`.slice(0, 256),
      warmComplete: false,
    };
    arrReplayResetScheduler(arrReplayState.generation, arrReplayState.replayEpoch);
    arrReplayResetVfxPublishGeneration(arrReplayState.generation);
    arrReplayClearCombatants();
    arrReplayBlockExternalEffects(false);
    arrReplayWarmVfx = false;
    arrReplayWarmVfxScopes = new Map();
    arrReplayVfxStableIds = new Map();
    arrReplayDropQueuedDeliveriesAsStale();
    try {
      arrReplayDispatchCombatState(false, { localOnly: localOverlayRestore });
    } catch (error) {
      recordCleanupError('combat', error);
      console.warn('String ARR 回放失败关闭时 raidboss reset 失败', error);
    }
    let vfxCleanupConfirmed = false;
    try {
      const vfxResult = await arrReplayAcquireVfxCleanup();
      vfxCleanupConfirmed = vfxResult?.physicalCleanupConfirmed === true;
      if (!vfxCleanupConfirmed)
        recordCleanupError('vfx', 'physical cleanup was not confirmed');
    } catch (error) {
      recordCleanupError('vfx', error);
      console.warn('String ARR 回放失败关闭时 VFX 全局清理失败', error);
    }
    if (!cleanupIsCurrent()) {
      return {
        ok: false,
        stale: true,
        cleanupToken,
        localResetApplied: true,
        vfxCleanupConfirmed,
        error: 'cleanup-superseded-after-vfx',
      };
    }
    try {
      arrReplayRestoreLiveParty({ broadcast: !localOverlayRestore });
    } catch (error) {
      recordCleanupError('party', error);
      console.warn('String ARR 回放失败关闭时实际队伍恢复失败', error);
    }
    try {
      const zoneRestored = await arrReplayRestoreStrictZone({
        localOnly: localOverlayRestore,
        isCurrent: cleanupIsCurrent,
        failOnConfigError: !localOverlayRestore,
      });
      if (!zoneRestored)
        recordCleanupError('zone', 'cleanup superseded');
    } catch (error) {
      recordCleanupError('zone', error);
      console.warn('String ARR 回放失败关闭时区域恢复失败', error);
    }
    if (!cleanupIsCurrent()) {
      return {
        ok: false,
        stale: true,
        cleanupToken,
        localResetApplied: true,
        vfxCleanupConfirmed,
        error: 'cleanup-superseded-after-zone',
      };
    }
    try {
      const playerRestored = await arrReplayRestoreLivePlayer({
        isCurrent: cleanupIsCurrent,
      });
      if (!playerRestored)
        recordCleanupError('player', 'cleanup superseded');
    } catch (error) {
      recordCleanupError('player', error);
      console.warn('String ARR 回放失败关闭时本地玩家恢复失败', error);
    }
    if (!cleanupIsCurrent()) {
      return {
        ok: false,
        stale: true,
        cleanupToken,
        localResetApplied: true,
        vfxCleanupConfirmed,
        error: 'cleanup-superseded-after-player',
      };
    }
    arrReplayUnpinStrictIdentity();
    if (cleanupError !== undefined) {
      return {
        ok: false,
        stale: false,
        cleanupToken,
        localResetApplied: true,
        vfxCleanupConfirmed,
        error: cleanupError,
      };
    }
    arrReplayVfxRetainedMode = false;
    arrReplayWarmVfxScopes = new Map();
    return {
      ok: true,
      stale: false,
      cleanupToken,
      localResetApplied: true,
      vfxCleanupConfirmed: true,
    };
  };

  const arrReplayValidateLogLine = (entry, semantic) => {
    if (!arrReplayExactKeys(entry, ['line', 'rawLine']))
      throw new Error('ARR LogLine DTO 字段不精确');
    if (!Array.isArray(entry.line) || entry.line.some((field) =>
      typeof field !== 'string' || field.length > 512 || /[|\r\n\0]/u.test(field)))
      throw new Error('ARR LogLine 字段非法');
    if (entry.rawLine !== entry.line.join('|') || entry.rawLine.length > 32768)
      throw new Error('ARR rawLine 与 line 不一致');
    const type = entry.line[0];
    const limits = arrReplayAllowedLineLengths[type];
    const semanticTypes = arrReplayAllowedTypesBySemantic[semantic];
    if (limits === undefined || semanticTypes?.includes(type) !== true)
      throw new Error(`ARR semantic ${semantic} 不允许 LogLine ${type}`);
    if (entry.line.length < limits[0] || entry.line.length > limits[1])
      throw new Error(`ARR LogLine ${type} 字段数非法`);
    if (type === '38' && (entry.line.length - 15) % 3 !== 0)
      throw new Error('ARR StatusEffect triplet 字段数非法');
    if (type === '261' && (entry.line.length - 4) % 2 !== 0)
      throw new Error('ARR CombatantMemory pair 字段数非法');
    if ((type === '21' || type === '22') && entry.line[6] === 'E0000000') {
      const actionId = entry.line[4];
      const canonicalTargetless = semantic === 'Ability8' && type === '21' &&
        /^4[0-9A-F]{7}$/u.test(entry.line[2]) && entry.line[3] === '凯夫卡' &&
        arrReplayPinnedTargetlessAbilityIds.includes(actionId) &&
        entry.line[5] === '' && entry.line[7] === '' &&
        entry.line.slice(8, 24).every((value) => value === '') &&
        [24, 25, 26, 27, 30, 31, 32, 33].every((index) => entry.line[index] === '0') &&
        entry.line[28] === '' && entry.line[29] === '' &&
        entry.line[38] === '' && entry.line[39] === '' &&
        entry.line[44] === '00000000' && entry.line[45] === '0' &&
        entry.line[46] === '0' && entry.line[47] === '00' && entry.line[48] === '' &&
        entry.line[49] === '01' && entry.line[50] === actionId &&
        entry.line[51] === actionId && entry.line[52] === '0.000' &&
        entry.line[53] === '0000';
      if (!canonicalTargetless)
        throw new Error('ARR targetless Ability 不符合P5固定投影');
      for (const index of [34, 35, 36, 37])
        arrReplayLineUInt32(entry.line[index], `21.sourceState[${index}]`, 10);
    }
    if (semantic === 'ActorControlTarget' &&
        (entry.line.length !== 6 || entry.line[2] !== 'Change' ||
         !/^[14][0-9A-F]{7}$/u.test(entry.line[3]) || entry.line[4] !== 'TargetID' ||
         !/^(?:[14][0-9A-F]{7}|E0000000)$/u.test(entry.line[5])))
      throw new Error('ARR ActorControlTarget 只接受标准261 Change/TargetID投影');
    if (semantic === 'ContentDirectorActor' &&
        (entry.line.length !== 12 || entry.line[2] !== 'Add' ||
         !/^4[0-9A-F]{7}$/u.test(entry.line[3]) || entry.line[4] !== 'BNpcID' ||
         !/^(?:1EBFB[23CD]|1EC0(?:3[ABCEF]|40))$/u.test(entry.line[5]) ||
         entry.line[6] !== 'PosX' || entry.line[8] !== 'PosY' || entry.line[10] !== 'PosZ' ||
         ![entry.line[7], entry.line[9], entry.line[11]].every((value) =>
           value !== '' && Number.isFinite(Number(value)) && Math.abs(Number(value)) <= 100000)))
      throw new Error('ARR ContentDirectorActor 只接受十种固定ID的标准261 Add投影');
  };

  const arrReplayValidateSyntheticTimestamps = (event) => {
    const expectedTimestamp = arrReplayScheduler.dateEpochMs + event.replayMs;
    for (const entry of event.logLines) {
      const parsedTimestamp = arrReplayNativeDate.parse(entry.line[1]);
      if (!Number.isFinite(parsedTimestamp) || parsedTimestamp !== expectedTimestamp) {
        throw new Error(
          `ARR LogLine timestamp 与 replayEpoch/replayMs 不一致：` +
          `${entry.line[1]} != ${new arrReplayNativeDate(expectedTimestamp).toISOString()}`,
        );
      }
    }
  };

  const arrReplayProcessLifecycle = async (
      event,
      fixtureSha256,
      ingressGeneration,
      previousIngressActive) => {
    if (!arrReplayIngressIsCurrent(ingressGeneration))
      return false;
    if (!arrReplayExactKeys(event, [
      'kind', 'replayEpoch', 'sequence', 'replayMs', 'playbackRate',
      'playerIndex', 'localPlayerId', 'localPlayerName', 'action', 'reason',
      'logLines', 'stateUpdates',
    ]))
      throw new Error('ARR lifecycle DTO 字段不精确');
    if (!arrReplaySafeInteger(event.replayEpoch, 1, Number.MAX_SAFE_INTEGER) ||
        event.replayEpoch <= arrReplayState.epochHighWater || event.sequence !== 0 ||
        !arrReplaySafeInteger(event.replayMs, 0, arrReplayMaximumMs) ||
        typeof event.playbackRate !== 'number' || !Number.isFinite(event.playbackRate) ||
        event.playbackRate <= 0 || event.playbackRate > 16 ||
        !Number.isInteger(event.playerIndex) || !/^0x[0-9A-F]{8}$/u.test(event.localPlayerId) ||
        typeof event.localPlayerName !== 'string' || event.localPlayerName.length === 0 ||
        event.localPlayerName.length > 64 || /[|\r\n\0]/u.test(event.localPlayerName) ||
        typeof event.reason !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9_.-]{0,63}$/u.test(event.reason) ||
        !Array.isArray(event.logLines) || event.logLines.length !== 0 ||
        !Array.isArray(event.stateUpdates) || event.stateUpdates.length !== 0)
      throw new Error('ARR lifecycle 顺序或字段非法');

    const previousState = arrReplayState;
    arrReplayCancelVfxExpiryTimer();
    arrReplayVfxRetainedMode = true;
    const fixtureProfile = arrReplayFindFixtureProfile(
      fixtureSha256,
      event.playerIndex,
      event.localPlayerId,
      event.localPlayerName,
    );
    // Consume every syntactically valid newer epoch before environment, action,
    // rate, identity or cleanup gates.  A rejected epoch cannot be replayed
    // later with corrected contents after reconnect or fail-closed cleanup.
    arrReplayState = {
      active: false,
      epochHighWater: event.replayEpoch,
      replayEpoch: event.replayEpoch,
      sequence: 0,
      replayMs: event.replayMs,
      playbackRate: event.playbackRate,
      generation: arrReplayState.generation + 1,
      lastReset: `${event.action}:${event.reason}`,
      wallAnchorMs: arrReplayWallNow(),
      lastExposedReplayMs: event.replayMs,
      profileId: fixtureProfile?.id,
      fixtureSha256,
      playerIndex: event.playerIndex,
      localPlayerId: event.localPlayerId,
      localPlayerName: event.localPlayerName,
      partyReady: arrReplayPartyReady,
      lastSegmentSequence: -1,
      cutSegmentSequence: -1,
      warmComplete: false,
      nextPullResetIndex: 0,
    };
    arrReplayResetScheduler(arrReplayState.generation, event.replayEpoch);
    arrReplayResetVfxPublishGeneration(arrReplayState.generation);
    arrReplayBlockExternalEffects(event.action === 'start' || event.action === 'seek');
    arrReplayWarmVfx = event.action === 'start' || event.action === 'seek';
    arrReplayWarmVfxScopes = new Map();
    arrReplayVfxStableIds = new Map();
    if (liveSemanticState.active)
      throw new Error('ARR/live semantic 输入模式冲突');
    if (!['start', 'seek', 'reset', 'stop', 'pause', 'unload', 'overflow'].includes(event.action))
      throw new Error(`ARR lifecycle action 非法：${event.action}`);
    if ((event.action === 'start' || event.action === 'seek') && event.replayMs !== 0)
      throw new Error('ARR start/seek lifecycle 必须从 replayMs=0 开始');
    if (event.action === 'seek' && previousIngressActive !== true)
      throw new Error('ARR seek lifecycle 要求上一epoch仍为active');
    if (event.playbackRate !== 1.0)
      throw new Error('ARR playbackRate 只允许固定1.0x');
    if (fixtureProfile === undefined)
      throw new Error('ARR lifecycle 不匹配任一固定 fixture 身份');
    if (event.replayMs > fixtureProfile.maximumReplayMs)
      throw new Error(`ARR lifecycle 超过 ${fixtureProfile.id} fixture 最大时间`);
    if (previousState.profileId !== undefined &&
        fixtureProfile.id !== previousState.profileId)
      throw new Error('ARR fixture profile 在epoch之间发生变化');
    if (previousState.localPlayerId !== undefined &&
        (event.localPlayerId !== previousState.localPlayerId ||
         event.localPlayerName !== previousState.localPlayerName))
      throw new Error('ARR 本地玩家身份在epoch之间发生变化');
    const startsStrictContext =
      event.action === 'start' || event.action === 'seek';
    const pausesStrictContext = event.action === 'pause';
    if (startsStrictContext) {
      arrLogReplayCancelForStrictReplay();
      arrReplayPinStrictIdentity();
    }
    if (pausesStrictContext && previousState.active &&
        arrReplayCombatantsGeneration === previousState.generation) {
      arrReplayCombatantsGeneration = arrReplayState.generation;
      arrReplayCombatantsPreservedForResume = true;
    } else {
      arrReplayClearCombatants();
    }
    if (startsStrictContext) {
      arrReplayPrepareSyntheticParty();
    } else if (pausesStrictContext) {
      arrReplayPartyPreservedForResume = arrReplayPartyReady;
    }
    // The DLL has already completed verified-zero cleanup before publishing this
    // lifecycle event.  false stops delayed/suppressed triggers; true rebuilds
    // raidboss data via getDataObject()/Reset before the first new LogLine.
    arrReplayDispatchCombatState(false);
    const vfxCleanup = await arrReplayAcquireVfxCleanup();
    if (vfxCleanup?.physicalCleanupConfirmed !== true)
      throw new Error('ARR lifecycle VFX cleanup 未确认 physical zero');
    if (!arrReplayIngressIsCurrent(ingressGeneration))
      return false;
    if (startsStrictContext) {
      const zoneEntered = await arrReplayEnterStrictZone({
        isCurrent: () => arrReplayIngressIsCurrent(ingressGeneration),
      });
      if (!zoneEntered ||
          !arrReplayIngressIsCurrent(ingressGeneration))
        return false;
      arrReplayPublishSyntheticParty();
      arrReplayPublishSyntheticPlayer();
      arrReplayDispatchCombatState(true);
      arrReplayState.active = true;
    } else if (!pausesStrictContext) {
      arrReplayRestoreLiveParty();
      await arrReplayRestoreStrictZone();
      if (!arrReplayIngressIsCurrent(ingressGeneration))
        return false;
      const playerRestored = await arrReplayRestoreLivePlayer({
        isCurrent: () => arrReplayIngressIsCurrent(ingressGeneration),
      });
      if (!playerRestored ||
          !arrReplayIngressIsCurrent(ingressGeneration))
        return false;
      arrReplayUnpinStrictIdentity();
    }
    if (!startsStrictContext) {
      arrReplayVfxRetainedMode = false;
      arrReplayWarmVfxScopes = new Map();
    }
    return true;
  };

  const arrReplayProcessTransportReset = async (
      event,
      fixtureSha256,
      ingressGeneration) => {
    if (!arrReplayIngressIsCurrent(ingressGeneration))
      return false;
    if (!arrReplayExactKeys(event, [
      'kind', 'action', 'reason', 'logLines', 'stateUpdates',
    ]) ||
        !['disconnect', 'gap', 'cleanup-failed', 'overflow'].includes(event.action) ||
        typeof event.reason !== 'string' || event.reason.length > 512 ||
        !Array.isArray(event.logLines) || event.logLines.length !== 0 ||
        !Array.isArray(event.stateUpdates) || event.stateUpdates.length !== 0)
      throw new Error('ARR transport-reset DTO 非法');
    if (fixtureSha256 !== null &&
        arrReplayState.fixtureSha256 !== undefined &&
        fixtureSha256 !== arrReplayState.fixtureSha256)
      throw new Error('ARR transport-reset fixture 身份变化');
    const cleanup = await arrReplayFailClosed(
      `${event.action}:${event.reason}`,
      ingressGeneration,
    );
    if (arrReplayCleanupFailed(cleanup)) {
      const error = new Error(`ARR transport-reset cleanup 未确认：${cleanup.error}`);
      error.arrReplayCleanupResult = cleanup;
      throw error;
    }
    if (cleanup.stale)
      return false;
    return true;
  };

  const arrReplayProcessSemantic = async (
      event,
      fixtureSha256,
      ingressGeneration) => {
    if (!arrReplayIngressIsCurrent(ingressGeneration))
      return false;
    if (!arrReplayExactKeys(event, [
      'kind', 'replayEpoch', 'sequence', 'segmentSequence', 'replayMs',
      'semantic', 'logLines', 'stateUpdates',
    ]))
      throw new Error('ARR semantic DTO 字段不精确');
    const fixtureProfile = arrReplayCurrentFixtureProfile();
    if (!arrReplayState.active || event.replayEpoch !== arrReplayState.replayEpoch ||
        fixtureSha256 !== arrReplayState.fixtureSha256 ||
        fixtureProfile === undefined ||
        !arrReplaySafeInteger(event.sequence, 1, Number.MAX_SAFE_INTEGER) ||
        event.sequence !== arrReplayState.sequence + 1 ||
        !arrReplaySafeInteger(
          event.segmentSequence,
          0,
          fixtureProfile?.maximumSegmentSequence ?? -1,
        ) ||
        event.segmentSequence <= arrReplayState.lastSegmentSequence ||
        arrReplayState.warmComplete &&
          event.segmentSequence <= arrReplayState.cutSegmentSequence ||
        !arrReplaySafeInteger(
          event.replayMs,
          arrReplayState.replayMs,
          fixtureProfile?.maximumReplayMs ?? -1,
        ) ||
        arrReplayAllowedTypesBySemantic[event.semantic] === undefined ||
        !Array.isArray(event.logLines) || event.logLines.length > 128 ||
        !Array.isArray(event.stateUpdates) || event.stateUpdates.length > 1)
      throw new Error('ARR semantic 顺序、时间或白名单门禁失败');
    const pendingPullReset = arrReplayNextPullReset();
    if (pendingPullReset !== undefined && event.replayMs > pendingPullReset.replayMs)
      throw new Error('ARR semantic 越过固定chapter pull-reset边界');
    if (event.semantic === 'ActorControlTarget' && event.logLines.length !== 1)
      throw new Error('ARR ActorControlTarget 必须含唯一标准261投影');
    if (event.semantic === 'ContentDirectorActor' && event.logLines.length !== 1)
      throw new Error('ARR ContentDirectorActor 必须含唯一标准261投影');
    for (const line of event.logLines)
      arrReplayValidateLogLine(line, event.semantic);
    arrReplayValidateSyntheticTimestamps(event);
    await arrReplayAdvanceSchedulerBeforeSource(event.replayMs);
    if (!arrReplayIngressIsCurrent(ingressGeneration))
      return false;
    const combatantUpdates = arrReplayPrepareSemanticCombatantUpdates(event);
    if (event.semantic === 'PlayerSpawn')
      arrReplayAcceptPlayerSpawn(event);
    else if (arrReplayPartySpawnCursor !== 8 &&
        event.replayMs > fixtureProfile.partyReadyByMs)
      throw new Error(
        `ARR 固定8人PlayerSpawn未在 ${fixtureProfile.partyReadyByMs}ms 门禁前验证完成`,
      );
    arrReplayApplyCombatantUpdates(combatantUpdates);

    arrReplayState.sequence = event.sequence;
    arrReplayState.lastSegmentSequence = event.segmentSequence;
    arrReplayState.replayMs = event.replayMs;
    arrReplayState.lastExposedReplayMs = Math.max(
      arrReplayState.lastExposedReplayMs,
      event.replayMs,
    );
    arrReplayState.wallAnchorMs = arrReplayWallNow();
    if (typeof window.dispatchOverlayEvent !== 'function')
      throw new Error('dispatchOverlayEvent 不可用');
    await arrReplayRunControlled(event.replayMs, () => {
      for (const logLine of event.logLines) {
        window.dispatchOverlayEvent({
          type: 'LogLine',
          line: [...logLine.line],
          rawLine: logLine.rawLine,
        });
      }
    });
    if (!arrReplayIngressIsCurrent(ingressGeneration))
      return false;
    arrReplayArmSchedulerWake();
    return true;
  };

  const arrReplayProcessPullReset = async (
      event,
      fixtureSha256,
      ingressGeneration) => {
    if (!arrReplayIngressIsCurrent(ingressGeneration))
      return false;
    if (!arrReplayExactKeys(event, [
      'kind', 'replayEpoch', 'sequence', 'replayMs', 'chapterIndex',
      'chapterType', 'relativeOffset', 'reason', 'logLines', 'stateUpdates',
    ]))
      throw new Error('ARR pull-reset DTO 字段不精确');
    const fixtureProfile = arrReplayCurrentFixtureProfile();
    const expected = arrReplayNextPullReset();
    if (!arrReplayState.active ||
        event.replayEpoch !== arrReplayState.replayEpoch ||
        fixtureSha256 !== arrReplayState.fixtureSha256 ||
        fixtureProfile === undefined || expected === undefined ||
        !arrReplaySafeInteger(event.sequence, 1, Number.MAX_SAFE_INTEGER) ||
        event.sequence !== arrReplayState.sequence + 1 ||
        event.replayMs !== expected.replayMs ||
        event.replayMs < arrReplayState.replayMs ||
        event.chapterIndex !== expected.chapterIndex ||
        event.chapterType !== expected.chapterType ||
        event.relativeOffset !== expected.relativeOffset ||
        event.reason !== expected.reason ||
        !Array.isArray(event.logLines) || event.logLines.length !== 0 ||
        !Array.isArray(event.stateUpdates) || event.stateUpdates.length !== 0)
      throw new Error('ARR pull-reset epoch、顺序或固定chapter门禁失败');
    if (arrReplayPartySpawnCursor !== 8 ||
        !arrReplayPartyReady || arrReplayState.partyReady !== true)
      throw new Error('ARR pull-reset 前固定8人PlayerSpawn尚未验证完成');

    await arrReplayAdvanceSchedulerBeforeSource(event.replayMs);
    if (!arrReplayIngressIsCurrent(ingressGeneration))
      return false;

    arrReplayCancelVfxExpiryTimer();
    arrReplayState = {
      ...arrReplayState,
      sequence: event.sequence,
      replayMs: event.replayMs,
      lastExposedReplayMs: Math.max(
        arrReplayState.lastExposedReplayMs,
        event.replayMs,
      ),
      wallAnchorMs: arrReplayWallNow(),
      generation: arrReplayState.generation + 1,
      lastReset: `pull-reset:${event.reason}`,
      nextPullResetIndex: arrReplayState.nextPullResetIndex + 1,
    };
    arrReplayResetScheduler(arrReplayState.generation, arrReplayState.replayEpoch);
    arrReplayResetVfxPublishGeneration(arrReplayState.generation);
    arrReplayPreserveCombatantsForPullReset();
    arrReplayWarmVfxScopes = new Map();
    arrReplayVfxStableIds = new Map();
    arrReplayDispatchCombatState(false);
    const vfxCleanup = await arrReplayAcquireVfxCleanup();
    if (vfxCleanup?.physicalCleanupConfirmed !== true)
      throw new Error('ARR pull-reset VFX cleanup 未确认 physical zero');
    if (!arrReplayIngressIsCurrent(ingressGeneration))
      return false;
    arrReplayDispatchCombatState(true);
    arrReplayArmSchedulerWake();
    return true;
  };

  const arrReplayProcessWarmComplete = async (
      event,
      fixtureSha256,
      ingressGeneration) => {
    if (!arrReplayIngressIsCurrent(ingressGeneration))
      return false;
    if (!arrReplayExactKeys(event, [
      'kind', 'replayEpoch', 'sequence', 'replayMs', 'cutSegmentSequence',
      'logLines', 'stateUpdates',
    ]))
      throw new Error('ARR warm-complete DTO 字段不精确');
    const fixtureProfile = arrReplayCurrentFixtureProfile();
    const pendingPullReset = arrReplayNextPullReset();
    if (!arrReplayState.active || !arrReplayWarmVfx || arrReplayState.warmComplete ||
        event.replayEpoch !== arrReplayState.replayEpoch ||
        fixtureSha256 !== arrReplayState.fixtureSha256 ||
        fixtureProfile === undefined ||
        !arrReplaySafeInteger(event.sequence, 1, Number.MAX_SAFE_INTEGER) ||
        event.sequence !== arrReplayState.sequence + 1 ||
        !arrReplaySafeInteger(
          event.replayMs,
          arrReplayState.replayMs,
          fixtureProfile?.maximumReplayMs ?? -1,
        ) ||
        !arrReplaySafeInteger(
          event.cutSegmentSequence,
          0,
          fixtureProfile?.maximumSegmentSequence ?? -1,
        ) ||
        event.cutSegmentSequence < arrReplayState.lastSegmentSequence ||
        event.replayMs > fixtureProfile.partyReadyByMs &&
          (!arrReplayPartyReady || arrReplayState.partyReady !== true ||
           arrReplayPartySpawnCursor !== 8) ||
        pendingPullReset !== undefined &&
          event.replayMs > pendingPullReset.replayMs ||
        !Array.isArray(event.logLines) || event.logLines.length !== 0 ||
        !Array.isArray(event.stateUpdates) || event.stateUpdates.length !== 0)
      throw new Error('ARR warm-complete epoch、顺序、party、cut或时间门禁失败');

    await arrReplayCompleteSchedulerWarm(event.replayMs);
    if (!arrReplayIngressIsCurrent(ingressGeneration))
      return false;
    arrReplayState.sequence = event.sequence;
    arrReplayState.replayMs = event.replayMs;
    arrReplayState.lastExposedReplayMs = Math.max(
      arrReplayState.lastExposedReplayMs,
      event.replayMs,
    );
    arrReplayState.wallAnchorMs = arrReplayWallNow();
    arrReplayState.cutSegmentSequence = event.cutSegmentSequence;
    arrReplayState.warmComplete = true;
    arrReplayWarmVfx = false;
    await arrReplayQueueWholeScenePublish(arrReplayState.generation);
    if (!arrReplayIngressIsCurrent(ingressGeneration))
      return false;
    arrReplayArmSchedulerWake();
    return true;
  };

  const arrReplayBrowserLeaseKeys = Object.freeze([
    'type',
    'source',
    'protocolVersion',
    'projectionVersion',
    'fixtureSha256',
    'event',
    'deliveryId',
    'pageSessionId',
    'pageSessionOrdinal',
    'bridgeInstanceId',
  ]);
  const arrReplaySupportedReceiptKinds = Object.freeze([
    'lifecycle',
    'event',
    'warm-batch',
    'warm-complete',
    'pull-reset',
    'transport-reset',
  ]);
  const arrReplayValidLowerHexId = (value) =>
    typeof value === 'string' && /^[0-9a-f]{32}$/u.test(value);

  const arrReplayTrustedEnvelopeHeader = (envelope) =>
    arrReplayExactKeys(envelope, arrReplayBrowserLeaseKeys) &&
    envelope.type === 'StringArrReplayEvent' &&
    envelope.source === 'string-arr-replay-test' &&
    envelope.protocolVersion === 2 &&
    envelope.projectionVersion === arrReplayStateProjectionVersion &&
    (envelope.fixtureSha256 === null ||
      /^[0-9A-F]{64}$/u.test(envelope.fixtureSha256)) &&
    arrReplaySafeInteger(envelope.deliveryId, 1, Number.MAX_SAFE_INTEGER) &&
    arrReplayValidLowerHexId(envelope.pageSessionId) &&
    arrReplaySafeInteger(envelope.pageSessionOrdinal, 1, Number.MAX_SAFE_INTEGER) &&
    arrReplayValidLowerHexId(envelope.bridgeInstanceId);

  const arrReplayLifecycleIngressCandidate = (event) =>
    arrReplayExactKeys(event, [
      'kind', 'replayEpoch', 'sequence', 'replayMs', 'playbackRate',
      'playerIndex', 'localPlayerId', 'localPlayerName', 'action', 'reason',
      'logLines', 'stateUpdates',
    ]) &&
    event.kind === 'lifecycle' &&
    arrReplaySafeInteger(event.replayEpoch, 1, Number.MAX_SAFE_INTEGER) &&
    event.sequence === 0 &&
    ['start', 'seek', 'reset', 'stop', 'pause', 'unload', 'overflow'].includes(event.action);

  const arrReplayTransportResetIngressCandidate = (event) =>
    arrReplayExactKeys(event, [
      'kind', 'action', 'reason', 'logLines', 'stateUpdates',
    ]) &&
    event.kind === 'transport-reset';

  const arrReplayEnvelopeIsSourceZeroLifecycle = (envelope) => {
    const event = envelope?.event;
    return event?.kind === 'lifecycle' &&
      (event.action === 'start' || event.action === 'seek') &&
      event.sequence === 0 &&
      event.replayMs === 0;
  };

  const arrReplayReceiptBoundary = (envelope) => {
    const event = envelope?.event;
    const eventKind = event?.kind;
    if (!arrReplaySupportedReceiptKinds.includes(eventKind))
      throw new Error('ARR receipt event kind 非法');
    if (eventKind === 'transport-reset') {
      return Object.freeze({
        eventKind,
        replayEpoch: 0,
        lastSequence: 0,
        lastSegmentSequence: 0,
      });
    }
    if (!arrReplaySafeInteger(event.replayEpoch, 1, Number.MAX_SAFE_INTEGER))
      throw new Error('ARR receipt replayEpoch 非法');
    if (eventKind === 'lifecycle') {
      if (!arrReplaySafeInteger(event.sequence, 0, Number.MAX_SAFE_INTEGER))
        throw new Error('ARR lifecycle receipt sequence 非法');
      return Object.freeze({
        eventKind,
        replayEpoch: event.replayEpoch,
        lastSequence: event.sequence,
        lastSegmentSequence: 0,
      });
    }
    if (eventKind === 'event') {
      if (!arrReplaySafeInteger(event.sequence, 1, Number.MAX_SAFE_INTEGER) ||
          !arrReplaySafeInteger(event.segmentSequence, 0, Number.MAX_SAFE_INTEGER))
        throw new Error('ARR event receipt 边界非法');
      return Object.freeze({
        eventKind,
        replayEpoch: event.replayEpoch,
        lastSequence: event.sequence,
        lastSegmentSequence: event.segmentSequence,
      });
    }
    if (eventKind === 'warm-batch') {
      const last = Array.isArray(event.events)
        ? event.events[event.events.length - 1]
        : undefined;
      if (!arrReplaySafeInteger(last?.sequence, 1, Number.MAX_SAFE_INTEGER) ||
          !arrReplaySafeInteger(last?.segmentSequence, 0, Number.MAX_SAFE_INTEGER))
        throw new Error('ARR warm-batch receipt 边界非法');
      return Object.freeze({
        eventKind,
        replayEpoch: event.replayEpoch,
        lastSequence: last.sequence,
        lastSegmentSequence: last.segmentSequence,
      });
    }
    if (eventKind === 'warm-complete') {
      if (!arrReplaySafeInteger(event.sequence, 1, Number.MAX_SAFE_INTEGER) ||
          !arrReplaySafeInteger(event.cutSegmentSequence, 0, Number.MAX_SAFE_INTEGER))
        throw new Error('ARR warm-complete receipt 边界非法');
      return Object.freeze({
        eventKind,
        replayEpoch: event.replayEpoch,
        lastSequence: event.sequence,
        lastSegmentSequence: event.cutSegmentSequence,
      });
    }
    if (!arrReplaySafeInteger(event.sequence, 1, Number.MAX_SAFE_INTEGER))
      throw new Error('ARR pull-reset receipt sequence 非法');
    return Object.freeze({
      eventKind,
      replayEpoch: event.replayEpoch,
      lastSequence: event.sequence,
      // A pull reset advances the runtime generation but does not consume a
      // new segment. Freeze the pre-reset boundary before processing begins.
      lastSegmentSequence: Math.max(0, arrReplayState.lastSegmentSequence),
    });
  };

  const arrReplayPrepareDeliveryItem = (envelope) => {
    const cloned = arrReplayCloneJsonWithSize(envelope);
    if (cloned.bytes > arrReplayMaximumEnvelopeUtf8Bytes)
      throw new Error('ARR delivery 超过浏览器完整 envelope 上限');
    if (!arrReplayTrustedEnvelopeHeader(cloned.value))
      throw new Error('ARR delivery envelope 门禁失败');
    return {
      envelope: cloned.value,
      utf8Bytes: cloned.bytes,
      boundary: arrReplayReceiptBoundary(cloned.value),
      deliveryId: cloned.value.deliveryId,
      pageSessionId: cloned.value.pageSessionId,
      pageSessionOrdinal: cloned.value.pageSessionOrdinal,
      bridgeInstanceId: cloned.value.bridgeInstanceId,
      ingressGeneration: arrReplayIngressGeneration,
      previousIngressActive: undefined,
      pending: false,
      receiptAttempted: false,
    };
  };

  const arrReplayTrackPendingDelivery = (item) => {
    if (arrReplayPendingDeliveryCount >= arrReplayQueueLimit ||
        arrReplayQueuedUtf8Bytes + item.utf8Bytes > arrReplayQueueMaximumUtf8Bytes)
      throw new Error('ARR 浏览器 delivery 队列达到数量或字节硬上限');
    item.pending = true;
    ++arrReplayPendingDeliveryCount;
    arrReplayQueuedUtf8Bytes += item.utf8Bytes;
  };

  const arrReplayReleaseDelivery = (item) => {
    if (item?.pending !== true)
      return;
    item.pending = false;
    arrReplayPendingDeliveryCount = Math.max(0, arrReplayPendingDeliveryCount - 1);
    arrReplayQueuedUtf8Bytes = Math.max(0, arrReplayQueuedUtf8Bytes - item.utf8Bytes);
  };

  const arrReplayAckResponseIsExact = (response, item, accepted, stale) => {
    const expectedKeys = stale
      ? ['ok', 'projectionVersion', 'deliveryId', 'accepted', 'stale']
      : ['ok', 'projectionVersion', 'deliveryId', 'accepted'];
    return arrReplayExactKeys(response, expectedKeys) &&
      response.ok === true &&
      response.projectionVersion === arrReplayStateProjectionVersion &&
      response.deliveryId === item.deliveryId &&
      response.accepted === accepted &&
      (!stale || response.stale === true);
  };

  const arrReplayLockBrowserPage = (
      reason,
      { discardDeliveriesLocally = false } = {}) => {
    if (arrReplayBrowserSession.locked)
      return;
    arrReplayBrowserSession.locked = true;
    arrReplayBrowserSession.status = 'locked';
    arrReplayBrowserSession.lastError = `${reason}`.slice(0, 256);
    ++arrReplayBrowserSession.handshakeGeneration;
    if (arrReplayBrowserSession.handshakeTimer !== undefined)
      arrReplayNativeClearTimeout(arrReplayBrowserSession.handshakeTimer);
    arrReplayBrowserSession.handshakeTimer = undefined;
    arrReplayBrowserSession.handshakeInFlight = false;
    arrReplayBrowserSession.active = undefined;
    arrReplayBrowserSession.candidate = undefined;
    const candidateDelivery = arrReplayBrowserSession.candidateDelivery;
    arrReplayBrowserSession.candidateDelivery = undefined;
    if (candidateDelivery !== undefined) {
      if (discardDeliveriesLocally) {
        candidateDelivery.receiptAttempted = true;
        arrReplayReleaseDelivery(candidateDelivery);
      } else {
        void arrReplaySendReceipt(candidateDelivery, false, 'stale-generation');
      }
    }
    const postAckDelivery = arrReplayBrowserSession.postAckDelivery;
    arrReplayBrowserSession.postAckDelivery = undefined;
    if (postAckDelivery !== undefined) {
      if (discardDeliveriesLocally) {
        postAckDelivery.receiptAttempted = true;
        arrReplayReleaseDelivery(postAckDelivery);
      } else {
        void arrReplaySendReceipt(postAckDelivery, false, 'stale-generation');
      }
    }
  };

  const arrReplayFailClosedAndLock = async (
      reason,
      expectedIngressGeneration,
      lockReason = reason) => {
    const handshakeGeneration = arrReplayBrowserSession.handshakeGeneration;
    const result = await arrReplayFailClosed(reason, expectedIngressGeneration);
    if (handshakeGeneration === arrReplayBrowserSession.handshakeGeneration &&
        arrReplayCleanupFailed(result))
      arrReplayLockBrowserPage(`cleanup:${lockReason}`);
    return result;
  };

  const arrReplayBuildReceipt = (item, accepted, reason) => ({
    call: 'stringArrReplayTest',
    action: 'ack',
    projectionVersion: arrReplayStateProjectionVersion,
    deliveryId: item.deliveryId,
    accepted,
    reason,
    replayEpoch: item.boundary.replayEpoch,
    runtimeGeneration: Math.max(0, arrReplayState.generation),
    eventKind: item.boundary.eventKind,
    lastSequence: item.boundary.lastSequence,
    lastSegmentSequence: item.boundary.lastSegmentSequence,
    queueDepth: Math.max(0, arrReplayPendingDeliveryCount - (item.pending ? 1 : 0)),
    schedulerFaulted: arrReplayScheduler.fault !== undefined,
    pageSessionId: item.pageSessionId,
    pageSessionOrdinal: item.pageSessionOrdinal,
    bridgeInstanceId: item.bridgeInstanceId,
  });

  const arrReplaySendReceipt = async (item, accepted, reason) => {
    if (item.receiptAttempted)
      return false;
    item.receiptAttempted = true;
    item.receiptReason = reason;
    const stale = reason === 'stale-generation';
    // Transport-reset and processing-failed intentionally advance ingress
    // before acknowledging. Freeze the generation that owns this ACK itself,
    // rather than reusing the delivery's pre-processing generation.
    const receiptAuthorityGeneration = arrReplayIngressGeneration;
    let acknowledged = false;
    if (stale)
      arrReplayReleaseDelivery(item);
    const request = arrReplayBuildReceipt(item, accepted, reason);
    try {
      const response = await arrReplayNativeCallWithTimeout(request);
      if (!arrReplayAckResponseIsExact(response, item, accepted, stale))
        throw new Error('ARR delivery ACK 响应字段或身份不匹配');
      if (!stale &&
          receiptAuthorityGeneration !== arrReplayIngressGeneration)
        return false;
      if (accepted &&
          arrReplayBrowserSession.active?.pageSessionId === item.pageSessionId &&
          arrReplayBrowserSession.active?.pageSessionOrdinal === item.pageSessionOrdinal &&
          arrReplayBrowserSession.active?.bridgeInstanceId === item.bridgeInstanceId &&
          arrReplayEnvelopeIsSourceZeroLifecycle(item.envelope)) {
        arrReplayBrowserSession.active.requiresSourceZeroLifecycle = false;
      }
      acknowledged = true;
      return true;
    } catch (error) {
      if (!stale) {
        if (receiptAuthorityGeneration !== arrReplayIngressGeneration) {
          // A newer managed generation canceled this receipt while its ACK was
          // in flight. Never let the obsolete response path close the new one.
          return false;
        }
        arrReplayLockBrowserPage(`receipt:${error}`);
        if (accepted) {
          const cleanup = await arrReplayFailClosed(
            `browser-receipt:${error}`,
            receiptAuthorityGeneration,
          );
          if (arrReplayCleanupFailed(cleanup))
            console.warn('String ARR accepted receipt 失败后的清理未确认', cleanup.error);
        }
      }
      return false;
    } finally {
      if (!stale)
        arrReplayReleaseDelivery(item);
      if (acknowledged && accepted) {
        const buffered = arrReplayBrowserSession.postAckDelivery;
        arrReplayBrowserSession.postAckDelivery = undefined;
        if (buffered !== undefined) {
          try {
            if (!arrReplayAdmitDelivery(buffered))
              arrReplaySendStaleWithoutWaiting(buffered);
          } catch (error) {
            void arrReplayRejectCurrentDelivery(buffered, error);
          }
        }
      }
    }
  };

  const arrReplaySendStaleWithoutWaiting = (item) => {
    const receipt = arrReplaySendReceipt(item, false, 'stale-generation');
    void arrReplayNativePromiseThen.call(receipt, undefined, () => {});
  };

  const arrReplayDropQueuedDeliveriesAsStale = () => {
    const dropped = arrReplayQueue.slice(arrReplayQueueHead);
    arrReplayQueue = [];
    arrReplayQueueHead = 0;
    for (const item of dropped)
      arrReplaySendStaleWithoutWaiting(item);
  };

  const arrReplayDropDeliveriesLocally = () => {
    const dropped = arrReplayQueue.slice(arrReplayQueueHead);
    arrReplayQueue = [];
    arrReplayQueueHead = 0;
    if (arrReplayProcessingItem !== undefined)
      dropped.push(arrReplayProcessingItem);
    for (const item of dropped) {
      item.receiptAttempted = true;
      arrReplayReleaseDelivery(item);
    }
  };

  const arrReplayCancelInFlightForIngress = () => {
    if (!arrReplayPumpRunning)
      return;
    arrReplayCancelVfxExpiryTimer();
    arrReplayState = {
      ...arrReplayState,
      generation: arrReplayState.generation + 1,
    };
    arrReplayResetScheduler(arrReplayState.generation, arrReplayState.replayEpoch);
    arrReplayResetVfxPublishGeneration(arrReplayState.generation);
  };

  const arrReplayPreemptIngress = () => {
    ++arrReplayIngressGeneration;
    arrReplayCancelInFlightForIngress();
    arrReplayDropQueuedDeliveriesAsStale();
  };

  const arrReplayProcessWarmBatch = async (
      event,
      envelope,
      fixtureSha256,
      ingressGeneration) => {
    if (!arrReplayIngressIsCurrent(ingressGeneration))
      return false;
    if (!arrReplayExactKeys(event, [
      'kind', 'replayEpoch', 'events', 'stateUpdates',
    ]) ||
        event.kind !== 'warm-batch' ||
        !arrReplaySafeInteger(event.replayEpoch, 1, Number.MAX_SAFE_INTEGER) ||
        !Array.isArray(event.events) ||
        !Array.isArray(event.stateUpdates) || event.stateUpdates.length !== 0 ||
        event.events.length < 1 ||
        event.events.length > arrReplayWarmBatchMaximumEvents ||
        arrReplayUtf8JsonBytes(envelope) > arrReplayWarmBatchMaximumUtf8Bytes ||
        !arrReplayState.active || !arrReplayWarmVfx || arrReplayState.warmComplete)
      throw new Error('ARR warm-batch 结构、大小或阶段门禁失败');
    for (const semantic of event.events) {
      if (!arrReplayExactKeys(semantic, [
        'kind', 'replayEpoch', 'sequence', 'segmentSequence', 'replayMs',
        'semantic', 'logLines', 'stateUpdates',
      ]) ||
          semantic.kind !== 'event' ||
          semantic.replayEpoch !== event.replayEpoch)
        throw new Error('ARR warm-batch nested DTO 或 epoch 不一致');
    }
    for (const semantic of event.events) {
      if (!arrReplayIngressIsCurrent(ingressGeneration))
        return false;
      const processed = await arrReplayProcessSemantic(
        semantic,
        fixtureSha256,
        ingressGeneration,
      );
      if (!processed)
        return false;
    }
    return true;
  };

  const arrReplayProcessEnvelope = async (item) => {
    const {
      envelope,
      ingressGeneration,
      previousIngressActive,
    } = item;
    if (!arrReplayIngressIsCurrent(ingressGeneration))
      return false;
    if (!arrReplayTrustedEnvelopeHeader(envelope))
      throw new Error('ARR envelope 门禁失败');
    const event = envelope.event;
    if (event?.kind === 'lifecycle')
      return await arrReplayProcessLifecycle(
        event,
        envelope.fixtureSha256,
        ingressGeneration,
        previousIngressActive,
      );
    if (event?.kind === 'transport-reset')
      return await arrReplayProcessTransportReset(
        event,
        envelope.fixtureSha256,
        ingressGeneration,
      );
    if (event?.kind === 'event')
      return await arrReplayProcessSemantic(
        event,
        envelope.fixtureSha256,
        ingressGeneration,
      );
    if (event?.kind === 'pull-reset')
      return await arrReplayProcessPullReset(
        event,
        envelope.fixtureSha256,
        ingressGeneration,
      );
    if (event?.kind === 'warm-batch')
      return await arrReplayProcessWarmBatch(
        event,
        envelope,
        envelope.fixtureSha256,
        ingressGeneration,
      );
    if (event?.kind === 'warm-complete')
      return await arrReplayProcessWarmComplete(
        event,
        envelope.fixtureSha256,
        ingressGeneration,
      );
    throw new Error('ARR event kind 非法');
  };

  const arrReplayPump = async () => {
    if (arrReplayPumpRunning)
      return;
    arrReplayPumpRunning = true;
    try {
      while (arrReplayQueueHead < arrReplayQueue.length) {
        const item = arrReplayQueue[arrReplayQueueHead++];
        arrReplayProcessingItem = item;
        try {
          if (!arrReplayIngressIsCurrent(item.ingressGeneration)) {
            await arrReplaySendReceipt(item, false, 'stale-generation');
            continue;
          }
          const processed = await arrReplayProcessEnvelope(item);
          const transportReset = item.boundary.eventKind === 'transport-reset';
          if (!processed ||
              (!transportReset && !arrReplayIngressIsCurrent(item.ingressGeneration))) {
            await arrReplaySendReceipt(item, false, 'stale-generation');
            continue;
          }
          if (arrReplayScheduler.fault !== undefined)
            throw arrReplayScheduler.fault;
          if (arrReplayPendingDeliveryCount !== 1)
            throw new Error('ARR managed single-flight delivery 边界被破坏');
          await arrReplaySendReceipt(item, true, 'accepted');
        } catch (error) {
          if (!arrReplayIngressIsCurrent(item.ingressGeneration) &&
              item.boundary.eventKind !== 'transport-reset') {
            await arrReplaySendReceipt(item, false, 'stale-generation');
            continue;
          }
          console.warn('String ARR 回放事件失败关闭', error);
          const cleanup = error?.arrReplayCleanupResult ??
            await arrReplayFailClosed(error, item.ingressGeneration);
          const cleanupAuthorityGeneration = arrReplayIngressGeneration;
          await arrReplaySendReceipt(item, false, 'processing-failed');
          if (cleanupAuthorityGeneration === arrReplayIngressGeneration &&
              arrReplayCleanupFailed(cleanup))
            arrReplayLockBrowserPage(`processing-cleanup:${cleanup.error}`);
        } finally {
          if (arrReplayProcessingItem === item)
            arrReplayProcessingItem = undefined;
        }
        if (arrReplayQueueHead >= 16 && arrReplayQueueHead * 2 >= arrReplayQueue.length) {
          arrReplayQueue = arrReplayQueue.slice(arrReplayQueueHead);
          arrReplayQueueHead = 0;
        }
      }
      arrReplayQueue = [];
      arrReplayQueueHead = 0;
    } finally {
      arrReplayPumpRunning = false;
      if (arrReplayQueueHead < arrReplayQueue.length)
        void arrReplayPump();
    }
  };

  const arrReplayHasDeliveryForLease = (lease) => {
    const sameLease = (item) =>
      item?.pageSessionId === lease.pageSessionId &&
      item?.pageSessionOrdinal === lease.pageSessionOrdinal &&
      item?.bridgeInstanceId === lease.bridgeInstanceId &&
      item?.pending === true;
    if (sameLease(arrReplayProcessingItem))
      return true;
    if (sameLease(arrReplayBrowserSession.candidateDelivery))
      return true;
    if (sameLease(arrReplayBrowserSession.postAckDelivery))
      return true;
    return arrReplayQueue.slice(arrReplayQueueHead).some(sameLease);
  };

  const arrReplayAdmitDelivery = (item) => {
    let previousIngressActive;
    const event = item.envelope.event;
    const active = arrReplayBrowserSession.active;
    if (active?.requiresSourceZeroLifecycle === true &&
        !arrReplayEnvelopeIsSourceZeroLifecycle(item.envelope)) {
      throw new Error('ARR 新浏览器页面会话必须由source-zero start/seek重建');
    }
    if (arrReplayLifecycleIngressCandidate(event)) {
      if (event.replayEpoch < arrReplayIngressEpochHighWater)
        return false;
      if (event.replayEpoch > arrReplayIngressEpochHighWater) {
        previousIngressActive = arrReplayIngressActive;
        arrReplayIngressEpochHighWater = event.replayEpoch;
        arrReplayIngressActive =
          event.action === 'start' || event.action === 'seek';
        arrReplayPreemptIngress();
      }
    } else if (arrReplayTransportResetIngressCandidate(event)) {
      arrReplayIngressActive = false;
      arrReplayPreemptIngress();
    } else if (arrReplaySafeInteger(event?.replayEpoch, 1, Number.MAX_SAFE_INTEGER) &&
        event.replayEpoch < arrReplayIngressEpochHighWater) {
      return false;
    }

    item.ingressGeneration = arrReplayIngressGeneration;
    item.previousIngressActive = previousIngressActive;
    arrReplayQueue.push({
      ...item,
    });
    void arrReplayPump();
    return true;
  };

  const arrReplayRejectCurrentDelivery = async (item, error) => {
    console.warn('String ARR 浏览器 delivery 入站失败关闭', error);
    const cleanup = await arrReplayFailClosed(`browser-ingress:${error}`);
    const cleanupAuthorityGeneration = arrReplayIngressGeneration;
    await arrReplaySendReceipt(item, false, 'processing-failed');
    if (cleanupAuthorityGeneration === arrReplayIngressGeneration &&
        arrReplayCleanupFailed(cleanup))
      arrReplayLockBrowserPage(`ingress-cleanup:${cleanup.error}`);
  };

  const arrReplayLeaseMatches = (lease, item) =>
    lease !== undefined && item !== undefined &&
    lease.pageSessionId === item.pageSessionId &&
    lease.pageSessionOrdinal === item.pageSessionOrdinal &&
    lease.bridgeInstanceId === item.bridgeInstanceId;

  const handleArrReplayEvent = (envelope) => {
    let item;
    try {
      item = arrReplayPrepareDeliveryItem(envelope);
    } catch (error) {
      console.warn('String ARR 回放 delivery envelope 被拒绝', error);
      const exactOuter = arrReplayTrustedEnvelopeHeader(envelope);
      const ownsActiveLease =
        arrReplayLeaseMatches(arrReplayBrowserSession.active, envelope);
      const ownsCandidateLease =
        arrReplayLeaseMatches(arrReplayBrowserSession.candidate, envelope);
      if (exactOuter && (ownsActiveLease || ownsCandidateLease) &&
          !arrReplayBrowserSession.locked &&
          !arrReplayBrowserSession.pageHidden) {
        const ingressGeneration = arrReplayIngressGeneration;
        const handshakeGeneration =
          arrReplayBrowserSession.handshakeGeneration;
        const closeWithoutReceipt = async () => {
          await arrReplayFailClosed(
            `browser-envelope:${error}`,
            ingressGeneration,
          );
          if (handshakeGeneration !==
              arrReplayBrowserSession.handshakeGeneration)
            return;
          arrReplayLockBrowserPage(
            `browser-envelope-no-receipt:${error}`,
            { discardDeliveriesLocally: true },
          );
        };
        const cleanup = closeWithoutReceipt();
        void arrReplayNativePromiseThen.call(cleanup, undefined, () => {});
      }
      return;
    }
    if (arrReplayBrowserSession.dormant) {
      item.receiptAttempted = true;
      arrReplayReleaseDelivery(item);
      return;
    }
    if (arrReplayBrowserSession.locked || arrReplayBrowserSession.pageHidden) {
      arrReplaySendStaleWithoutWaiting(item);
      return;
    }

    const candidate = arrReplayBrowserSession.candidate;
    if (arrReplayLeaseMatches(candidate, item)) {
      if (item.deliveryId <= candidate.lastDeliveryId ||
          arrReplayBrowserSession.candidateDelivery !== undefined) {
        arrReplaySendStaleWithoutWaiting(item);
        return;
      }
      try {
        arrReplayTrackPendingDelivery(item);
      } catch (error) {
        void arrReplayRejectCurrentDelivery(item, error);
        return;
      }
      candidate.lastDeliveryId = item.deliveryId;
      arrReplayBrowserSession.candidateDelivery = item;
      return;
    }

    const active = arrReplayBrowserSession.active;
    if (!arrReplayLeaseMatches(active, item)) {
      arrReplaySendStaleWithoutWaiting(item);
      return;
    }
    if (item.deliveryId <= active.lastDeliveryId) {
      arrReplaySendStaleWithoutWaiting(item);
      return;
    }
    const event = item.envelope.event;
    const preemptive = arrReplayLifecycleIngressCandidate(event) &&
        event.replayEpoch > arrReplayIngressEpochHighWater ||
      arrReplayTransportResetIngressCandidate(event);
    if (arrReplayLeaseMatches(active, arrReplayProcessingItem) &&
        arrReplayProcessingItem.receiptReason === 'accepted' &&
        !preemptive &&
        arrReplayBrowserSession.postAckDelivery === undefined) {
      try {
        arrReplayTrackPendingDelivery(item);
        active.lastDeliveryId = item.deliveryId;
        arrReplayBrowserSession.postAckDelivery = item;
      } catch (error) {
        void arrReplayRejectCurrentDelivery(item, error);
      }
      return;
    }
    if (arrReplayHasDeliveryForLease(active) && !preemptive) {
      arrReplaySendStaleWithoutWaiting(item);
      return;
    }
    try {
      arrReplayTrackPendingDelivery(item);
      active.lastDeliveryId = item.deliveryId;
      if (!arrReplayAdmitDelivery(item))
        arrReplaySendStaleWithoutWaiting(item);
    } catch (error) {
      void arrReplayRejectCurrentDelivery(item, error);
    }
  };

  const arrReplayChallengeResponse = (response, pageSessionId, activation) => {
    if (!arrReplayExactKeys(response, [
      'ok',
      'projectionVersion',
      'action',
      'pageSessionId',
      'pageSessionOrdinal',
      'pageActivatedAtUnixMicros',
      'challenge',
      'bridgeInstanceId',
    ]) ||
        response.ok !== true ||
        response.projectionVersion !== arrReplayStateProjectionVersion ||
        response.action !== 'challenge' ||
        response.pageSessionId !== pageSessionId ||
        response.pageActivatedAtUnixMicros !== activation ||
        !arrReplaySafeInteger(response.pageSessionOrdinal, 1, Number.MAX_SAFE_INTEGER) ||
        !arrReplayValidLowerHexId(response.challenge) ||
        !arrReplayValidLowerHexId(response.bridgeInstanceId))
      return undefined;
    return {
      pageSessionId,
      pageSessionOrdinal: response.pageSessionOrdinal,
      pageActivatedAtUnixMicros: activation,
      challenge: response.challenge,
      bridgeInstanceId: response.bridgeInstanceId,
      lastDeliveryId: 0,
    };
  };

  const arrReplayConfirmedResponse = (response, pageSessionId, activation) => {
    if (!arrReplayExactKeys(response, [
      'ok',
      'projectionVersion',
      'action',
      'pageSessionId',
      'pageSessionOrdinal',
      'pageActivatedAtUnixMicros',
      'bridgeInstanceId',
    ]) ||
        response.ok !== true ||
        response.projectionVersion !== arrReplayStateProjectionVersion ||
        response.action !== 'confirmed' ||
        response.pageSessionId !== pageSessionId ||
        response.pageActivatedAtUnixMicros !== activation ||
        !arrReplaySafeInteger(response.pageSessionOrdinal, 1, Number.MAX_SAFE_INTEGER) ||
        !arrReplayValidLowerHexId(response.bridgeInstanceId))
      return undefined;
    return {
      pageSessionId,
      pageSessionOrdinal: response.pageSessionOrdinal,
      pageActivatedAtUnixMicros: activation,
      bridgeInstanceId: response.bridgeInstanceId,
      lastDeliveryId: 0,
    };
  };

  const arrReplaySameBrowserLease = (left, right) =>
    left !== undefined && right !== undefined &&
    left.pageSessionId === right.pageSessionId &&
    left.pageSessionOrdinal === right.pageSessionOrdinal &&
    left.bridgeInstanceId === right.bridgeInstanceId;

  const arrReplayOverlayApiReadiness = () => {
    try {
      const api = globalThis.OverlayPluginApi;
      if ((typeof api !== 'object' || api === null) &&
          typeof api !== 'function')
        return 'unknown';
      if (!('ready' in api))
        return 'unknown';
      return api.ready === true ? 'ready' : 'not-ready';
    } catch (_error) {
      // An absent or nonstandard global is valid in WebSocket and some
      // embedded CEF modes. The bounded RPC budget remains the authority.
      return 'unknown';
    }
  };

  const arrReplayBrowserHandshakeBudgetElapsedMs = () => {
    const startedAt = arrReplayBrowserSession.handshakeBudgetStartedAtMs;
    return startedAt === undefined
      ? 0
      : Math.max(0, arrReplayWallNow() - startedAt);
  };

  const arrReplayBrowserHandshakeBudgetExhausted = () =>
    arrReplayBrowserSession.rawRpcOutstanding >=
      arrReplayBrowserMaximumHandshakeRpcAttempts ||
    arrReplayBrowserSession.handshakeRpcAttempts >=
      arrReplayBrowserMaximumHandshakeRpcAttempts ||
    arrReplayBrowserSession.handshakeBudgetStartedAtMs !== undefined &&
      arrReplayBrowserHandshakeBudgetElapsedMs() >=
        arrReplayBrowserHandshakeBudgetMs;

  const arrReplayResetBrowserHandshakeBudget = () => {
    arrReplayBrowserSession.handshakeRpcAttempts = 0;
    arrReplayBrowserSession.handshakeBudgetStartedAtMs = undefined;
    arrReplayBrowserSession.dormant = false;
    arrReplayBrowserSession.dormantReason = undefined;
  };

  const arrReplayBudgetedBrowserHandshakeCall = (request) => {
    const readiness = arrReplayOverlayApiReadiness();
    arrReplayBrowserSession.overlayApiReadiness = readiness;
    if (readiness === 'not-ready') {
      arrReplayBrowserSession.readinessObservedNotReady = true;
      const error = new Error('OverlayPlugin API 尚未就绪');
      error.arrReplayOverlayApiNotReady = true;
      throw error;
    }
    if (arrReplayBrowserHandshakeBudgetExhausted()) {
      const error = new Error('ARR 浏览器桥握手预算已耗尽');
      error.arrReplayHandshakeBudgetExhausted = true;
      throw error;
    }
    arrReplayBrowserSession.handshakeBudgetStartedAtMs ??= arrReplayWallNow();
    ++arrReplayBrowserSession.handshakeRpcAttempts;
    return arrReplayNativeCallWithTimeout(
      request,
      arrReplayBrowserRpcTimeoutMs,
      { trackRawRpc: true },
    );
  };

  const arrReplayPromoteBrowserCandidate = async (candidate, handshakeGeneration) => {
    if (handshakeGeneration !== arrReplayBrowserSession.handshakeGeneration ||
        !arrReplaySameBrowserLease(arrReplayBrowserSession.candidate, candidate))
      return false;
    const previous = arrReplayBrowserSession.active;
    const sameLease = arrReplaySameBrowserLease(previous, candidate);
    if (previous !== undefined && !sameLease) {
      const cleanup = await arrReplayFailClosed('browser-page-session-replaced');
      if (handshakeGeneration !== arrReplayBrowserSession.handshakeGeneration)
        return false;
      if (arrReplayCleanupFailed(cleanup)) {
        arrReplayLockBrowserPage(`candidate-cleanup:${cleanup.error}`);
        return false;
      }
      if (cleanup.stale)
        return false;
    }
    if (handshakeGeneration !== arrReplayBrowserSession.handshakeGeneration ||
        arrReplayBrowserSession.locked || arrReplayBrowserSession.pageHidden)
      return false;

    candidate.requiresSourceZeroLifecycle = sameLease
      ? previous.requiresSourceZeroLifecycle
      : true;
    candidate.lastDeliveryId = sameLease
      ? Math.max(previous.lastDeliveryId, candidate.lastDeliveryId)
      : candidate.lastDeliveryId;
    arrReplayBrowserSession.active = candidate;
    arrReplayBrowserSession.candidate = undefined;
    arrReplayBrowserSession.status = 'active';
    arrReplayBrowserSession.lastError = undefined;
    arrReplayBrowserSession.readinessObservedNotReady = false;
    arrReplayResetBrowserHandshakeBudget();
    const buffered = arrReplayBrowserSession.candidateDelivery;
    arrReplayBrowserSession.candidateDelivery = undefined;
    if (buffered !== undefined) {
      try {
        if (!arrReplayAdmitDelivery(buffered))
          arrReplaySendStaleWithoutWaiting(buffered);
      } catch (error) {
        void arrReplayRejectCurrentDelivery(buffered, error);
      }
    }
    return true;
  };

  const arrReplayClearHandshakeTimer = () => {
    if (arrReplayBrowserSession.handshakeTimer !== undefined)
      arrReplayNativeClearTimeout(arrReplayBrowserSession.handshakeTimer);
    arrReplayBrowserSession.handshakeTimer = undefined;
  };

  const arrReplayScheduleBrowserHandshake = (delayMs) => {
    if (arrReplayBrowserSession.locked || arrReplayBrowserSession.pageHidden)
      return;
    arrReplayClearHandshakeTimer();
    const generation = arrReplayBrowserSession.handshakeGeneration;
    arrReplayBrowserSession.handshakeTimer = arrReplayNativeSetTimeout(() => {
      arrReplayBrowserSession.handshakeTimer = undefined;
      if (generation !== arrReplayBrowserSession.handshakeGeneration)
        return;
      void arrReplayRunBrowserHandshake(generation);
    }, delayMs);
    arrReplayBrowserSession.handshakeTimer?.unref?.();
  };

  const arrReplayDiscardCandidateDeliveryLocally = () => {
    const item = arrReplayBrowserSession.candidateDelivery;
    arrReplayBrowserSession.candidateDelivery = undefined;
    if (item !== undefined) {
      item.receiptAttempted = true;
      arrReplayReleaseDelivery(item);
    }
  };

  const arrReplayDropCandidateDelivery = () => {
    const item = arrReplayBrowserSession.candidateDelivery;
    arrReplayBrowserSession.candidateDelivery = undefined;
    if (item !== undefined)
      arrReplaySendStaleWithoutWaiting(item);
  };

  const arrReplayEnterBrowserDormant = (reason) => {
    if (arrReplayBrowserSession.dormant)
      return arrReplayBrowserSession.dormantCleanupPromise;
    ++arrReplayBrowserSession.handshakeGeneration;
    const dormantHandshakeGeneration =
      arrReplayBrowserSession.handshakeGeneration;
    arrReplayClearHandshakeTimer();
    arrReplayBrowserSession.handshakeInFlight = false;
    arrReplayBrowserSession.subscribed = false;
    arrReplayBrowserSession.active = undefined;
    arrReplayBrowserSession.candidate = undefined;
    arrReplayDiscardCandidateDeliveryLocally();
    const postAckDelivery = arrReplayBrowserSession.postAckDelivery;
    arrReplayBrowserSession.postAckDelivery = undefined;
    if (postAckDelivery !== undefined) {
      postAckDelivery.receiptAttempted = true;
      arrReplayReleaseDelivery(postAckDelivery);
    }
    arrReplayDropDeliveriesLocally();
    arrReplayBrowserSession.dormant = true;
    arrReplayBrowserSession.dormantReason = `${reason}`.slice(0, 256);
    arrReplayBrowserSession.dormantCleanupInFlight = true;
    arrReplayBrowserSession.status = 'dormant-cleanup';
    arrReplayBrowserSession.lastError = arrReplayBrowserSession.dormantReason;
    arrReplayBrowserSession.readinessObservedNotReady = false;
    let cleanupResult;
    const cleanup = (async () => {
      try {
        cleanupResult = await arrReplayFailClosed(
          `browser-dormant:${arrReplayBrowserSession.dormantReason}`,
          undefined,
          { localOverlayRestore: true },
        );
      } catch (error) {
        cleanupResult = {
          ok: false,
          stale: false,
          error: `${error}`,
        };
      } finally {
        if (dormantHandshakeGeneration !==
            arrReplayBrowserSession.handshakeGeneration)
          return;
        arrReplayBrowserSession.dormantCleanupInFlight = false;
        if (arrReplayCleanupFailed(cleanupResult)) {
          arrReplayLockBrowserPage(
            `browser-dormant-cleanup:${cleanupResult.error}`,
          );
          return;
        }
        if (cleanupResult?.stale === true)
          return;
        if (!arrReplayBrowserSession.locked &&
            !arrReplayBrowserSession.pageHidden) {
          arrReplayBrowserSession.status = 'dormant';
          arrReplayScheduleBrowserHandshake(arrReplayBrowserReadinessProbeMs);
        }
      }
    })();
    arrReplayBrowserSession.dormantCleanupPromise = cleanup;
    return cleanup;
  };

  const arrReplayCreateLogicalPageSession = ({
    resetHandshakeBudget = true,
    resetExplicitRetries = true,
    discardCandidateWithoutReceipt = false,
  } = {}) => {
    ++arrReplayBrowserSession.handshakeGeneration;
    ++arrReplayCleanupToken;
    arrReplayClearHandshakeTimer();
    if (discardCandidateWithoutReceipt)
      arrReplayDiscardCandidateDeliveryLocally();
    else
      arrReplayDropCandidateDelivery();
    if (resetHandshakeBudget)
      arrReplayResetBrowserHandshakeBudget();
    arrReplayBrowserSession.dormantCleanupInFlight = false;
    if (resetExplicitRetries) {
      arrReplayBrowserSession.explicitRetryCount = 0;
      arrReplayBrowserSession.lastExplicitRetryAtMs = undefined;
    }
    arrReplayBrowserSession.pageSessionId = arrReplayRandomHexId();
    arrReplayBrowserSession.pageActivatedAtUnixMicros =
      arrReplayPageActivationUnixMicros();
    arrReplayBrowserSession.candidate = undefined;
    arrReplayBrowserSession.subscribed = false;
    arrReplayBrowserSession.handshakeInFlight = false;
    arrReplayBrowserSession.readinessObservedNotReady = false;
    arrReplayBrowserSession.status = 'waiting-bridge';
    arrReplayBrowserSession.lastError = undefined;
    void arrReplayRunBrowserHandshake(arrReplayBrowserSession.handshakeGeneration);
  };

  const arrReplayFailActiveBrowserLease = async (
      error,
      expectedHandshakeGeneration) => {
    if (expectedHandshakeGeneration !==
        arrReplayBrowserSession.handshakeGeneration)
      return false;
    const active = arrReplayBrowserSession.active;
    arrReplayBrowserSession.active = undefined;
    arrReplayBrowserSession.candidate = undefined;
    arrReplayBrowserSession.subscribed = false;
    arrReplayBrowserSession.lastError = `${error}`.slice(0, 256);
    arrReplayBrowserSession.status = 'lease-failed';
    let cleanup = {
      ok: true,
      stale: false,
      vfxCleanupConfirmed: true,
    };
    if (active !== undefined) {
      cleanup = await arrReplayFailClosed(
        `browser-lease:${error}`,
        undefined,
        { localOverlayRestore: true },
      );
    }
    if (expectedHandshakeGeneration !==
        arrReplayBrowserSession.handshakeGeneration)
      return false;
    if (arrReplayCleanupFailed(cleanup)) {
      arrReplayLockBrowserPage(`browser-lease-cleanup:${cleanup.error}`);
      return false;
    }
    if (cleanup.stale)
      return false;
    if (!arrReplayBrowserSession.locked && !arrReplayBrowserSession.pageHidden) {
      arrReplayCreateLogicalPageSession({
        resetHandshakeBudget: false,
        resetExplicitRetries: false,
        discardCandidateWithoutReceipt: true,
      });
      return true;
    }
    return false;
  };

  const arrReplayRunBrowserHandshake = async (handshakeGeneration) => {
    if (handshakeGeneration !== arrReplayBrowserSession.handshakeGeneration ||
        arrReplayBrowserSession.handshakeInFlight ||
        arrReplayBrowserSession.locked ||
        arrReplayBrowserSession.pageHidden ||
        globalThis.document?.prerendering === true)
      return;

    const readiness = arrReplayOverlayApiReadiness();
    arrReplayBrowserSession.overlayApiReadiness = readiness;
    if (readiness === 'not-ready') {
      arrReplayBrowserSession.readinessObservedNotReady = true;
      if (!arrReplayBrowserSession.dormant) {
        arrReplayBrowserSession.status = 'waiting-overlay-api';
        arrReplayBrowserSession.lastError = undefined;
      }
      arrReplayScheduleBrowserHandshake(arrReplayBrowserReadinessProbeMs);
      return;
    }
    if (arrReplayBrowserSession.readinessObservedNotReady) {
      if (readiness === 'ready') {
        arrReplayCreateLogicalPageSession({
          resetHandshakeBudget: true,
          resetExplicitRetries: false,
          discardCandidateWithoutReceipt: true,
        });
      } else {
        arrReplayScheduleBrowserHandshake(arrReplayBrowserReadinessProbeMs);
      }
      return;
    }
    if (arrReplayBrowserSession.dormant) {
      if (!arrReplayBrowserSession.dormantCleanupInFlight)
        arrReplayScheduleBrowserHandshake(arrReplayBrowserReadinessProbeMs);
      return;
    }
    if (arrReplayBrowserHandshakeBudgetExhausted()) {
      await arrReplayEnterBrowserDormant('ARR 浏览器桥握手预算已耗尽');
      return;
    }
    if (arrReplayBrowserSession.active !== undefined &&
        arrReplayPendingDeliveryCount > 0) {
      arrReplayScheduleBrowserHandshake(arrReplayBrowserRenewalMs);
      return;
    }
    arrReplayBrowserSession.handshakeInFlight = true;
    const pageSessionId = arrReplayBrowserSession.pageSessionId;
    const activation = arrReplayBrowserSession.pageActivatedAtUnixMicros;
    const hadActiveAtStart = arrReplayBrowserSession.active !== undefined;
    let stage = 'preflight';
    try {
      if (!arrReplayBrowserSession.subscribed) {
        stage = 'subscribe';
        const subscribed = await arrReplayBudgetedBrowserHandshakeCall({
          call: 'subscribe',
          events: ['StringArrReplayEvent'],
        });
        if (subscribed !== null)
          throw new Error('StringArrReplayEvent 显式 subscribe 未返回 null');
        if (handshakeGeneration !== arrReplayBrowserSession.handshakeGeneration)
          return;
        arrReplayBrowserSession.subscribed = true;
      }

      stage = 'ready';
      const readyResponse = await arrReplayBudgetedBrowserHandshakeCall({
        call: 'stringArrReplayTest',
        action: 'ready',
        projectionVersion: arrReplayStateProjectionVersion,
        pageRole: arrReplayBrowserPageRole,
        pageSessionId,
        pageActivatedAtUnixMicros: activation,
      });
      if (handshakeGeneration !== arrReplayBrowserSession.handshakeGeneration)
        return;

      let candidate = arrReplayConfirmedResponse(readyResponse, pageSessionId, activation);
      if (candidate !== undefined) {
        const active = arrReplayBrowserSession.active;
        const pending = arrReplayBrowserSession.candidate;
        if (arrReplaySameBrowserLease(active, candidate)) {
          candidate.lastDeliveryId = active.lastDeliveryId;
          candidate.requiresSourceZeroLifecycle = active.requiresSourceZeroLifecycle;
        } else if (arrReplaySameBrowserLease(pending, candidate)) {
          candidate.lastDeliveryId = pending.lastDeliveryId;
        }
        arrReplayBrowserSession.candidate = candidate;
        await arrReplayPromoteBrowserCandidate(candidate, handshakeGeneration);
        return;
      }

      candidate = arrReplayChallengeResponse(readyResponse, pageSessionId, activation);
      if (candidate === undefined) {
        const code = typeof readyResponse?.code === 'string'
          ? readyResponse.code
          : 'browser-ready-schema';
        const error = new Error(`ARR ready 被拒绝：${code}`);
        error.arrReplayCode = code;
        throw error;
      }
      const oldCandidate = arrReplayBrowserSession.candidate;
      if (arrReplaySameBrowserLease(oldCandidate, candidate)) {
        candidate.lastDeliveryId = oldCandidate.lastDeliveryId;
      } else {
        arrReplayDropCandidateDelivery();
      }
      // Arm the candidate before invoking confirm. Managed may synchronously
      // publish the first delivery after committing the confirm side effect.
      arrReplayBrowserSession.candidate = candidate;
      arrReplayBrowserSession.status = 'confirming';
      stage = 'confirm';
      const confirmResponse = await arrReplayBudgetedBrowserHandshakeCall({
        call: 'stringArrReplayTest',
        action: 'confirm',
        projectionVersion: arrReplayStateProjectionVersion,
        pageRole: arrReplayBrowserPageRole,
        pageSessionId: candidate.pageSessionId,
        pageSessionOrdinal: candidate.pageSessionOrdinal,
        pageActivatedAtUnixMicros: candidate.pageActivatedAtUnixMicros,
        challenge: candidate.challenge,
        bridgeInstanceId: candidate.bridgeInstanceId,
      });
      if (handshakeGeneration !== arrReplayBrowserSession.handshakeGeneration)
        return;
      const confirmed = arrReplayConfirmedResponse(
        confirmResponse,
        pageSessionId,
        activation,
      );
      if (confirmed === undefined ||
          !arrReplaySameBrowserLease(confirmed, candidate))
        throw new Error('ARR confirm 响应字段或 lease 不匹配');
      confirmed.lastDeliveryId = candidate.lastDeliveryId;
      arrReplayBrowserSession.candidate = confirmed;
      await arrReplayPromoteBrowserCandidate(confirmed, handshakeGeneration);
    } catch (error) {
      if (handshakeGeneration !== arrReplayBrowserSession.handshakeGeneration)
        return;
      arrReplayBrowserSession.lastError = `${error}`.slice(0, 256);
      arrReplayBrowserSession.status = 'retrying';
      if (stage === 'subscribe' ||
          arrReplayOverlayApiReadiness() === 'not-ready')
        arrReplayBrowserSession.subscribed = false;
      if (arrReplayBrowserHandshakeBudgetExhausted() ||
          error?.arrReplayHandshakeBudgetExhausted === true) {
        await arrReplayEnterBrowserDormant(error);
        return;
      }
      if (hadActiveAtStart) {
        await arrReplayFailActiveBrowserLease(error, handshakeGeneration);
        return;
      }
      if (error?.arrReplayCode === 'browser_ready_clock') {
        arrReplayCreateLogicalPageSession({
          resetHandshakeBudget: false,
          resetExplicitRetries: false,
        });
        return;
      }
    } finally {
      if (handshakeGeneration === arrReplayBrowserSession.handshakeGeneration) {
        arrReplayBrowserSession.handshakeInFlight = false;
        let retryDelay = arrReplayBrowserRetryMs;
        if (arrReplayBrowserSession.readinessObservedNotReady)
          retryDelay = arrReplayBrowserReadinessProbeMs;
        else if (arrReplayBrowserSession.active !== undefined)
          retryDelay = arrReplayBrowserRenewalMs;
        else if (arrReplayBrowserSession.candidate !== undefined ||
            arrReplayBrowserSession.candidateDelivery !== undefined)
          retryDelay = arrReplayBrowserFastRetryMs;
        arrReplayScheduleBrowserHandshake(retryDelay);
      }
    }
  };

  const arrReplayHandlePageHide = () => {
    if (arrReplayBrowserSession.pageHidden)
      return;
    const wasDormant = arrReplayBrowserSession.dormant;
    arrReplayBrowserSession.pageHidden = true;
    ++arrReplayBrowserSession.handshakeGeneration;
    arrReplayClearHandshakeTimer();
    arrReplayBrowserSession.status = arrReplayBrowserSession.locked
      ? 'locked'
      : 'page-hidden';
    arrReplayBrowserSession.active = undefined;
    arrReplayBrowserSession.candidate = undefined;
    arrReplayDropCandidateDelivery();
    const postAckDelivery = arrReplayBrowserSession.postAckDelivery;
    arrReplayBrowserSession.postAckDelivery = undefined;
    if (postAckDelivery !== undefined)
      arrReplaySendStaleWithoutWaiting(postAckDelivery);
    arrReplayBrowserSession.subscribed = false;
    arrReplayBrowserSession.handshakeInFlight = false;
    if (!arrReplayBrowserSession.locked) {
      arrReplayBrowserSession.pageCleanupPromise = arrReplayFailClosed(
        'browser-pagehide',
        undefined,
        { localOverlayRestore: wasDormant },
      );
      void arrReplayNativePromiseThen.call(
        arrReplayBrowserSession.pageCleanupPromise,
        undefined,
        () => {},
      );
    }
  };

  const arrReplayHandlePageShow = (event) => {
    if (arrReplayBrowserSession.locked || event?.persisted !== true)
      return;
    arrReplayBrowserSession.pageHidden = false;
    const resumeHandshakeGeneration =
      arrReplayBrowserSession.handshakeGeneration;
    const cleanup = arrReplayBrowserSession.pageCleanupPromise;
    const resume = async () => {
      try {
        const result = await cleanup;
        if (resumeHandshakeGeneration !==
            arrReplayBrowserSession.handshakeGeneration ||
            arrReplayBrowserSession.locked ||
            arrReplayBrowserSession.pageHidden)
          return;
        if (arrReplayCleanupFailed(result)) {
          arrReplayLockBrowserPage(`browser-pagehide-cleanup:${result.error}`);
          return;
        }
        if (result?.stale === true)
          return;
        arrReplayCreateLogicalPageSession();
      } catch (error) {
        arrReplayLockBrowserPage(error);
      }
    };
    void resume();
  };

  const arrReplayInitializeBrowserPageSession = () => {
    if (!arrReplayBrowserPageEligible) {
      arrReplayBrowserSession.status = 'ineligible-timeline-only';
      return;
    }
    if (globalThis.document?.prerendering === true) {
      arrReplayBrowserSession.status = 'prerendering';
      globalThis.document.addEventListener?.('prerenderingchange', () => {
        if (globalThis.document?.prerendering === true ||
            arrReplayBrowserSession.locked)
          return;
        try {
          arrReplayCreateLogicalPageSession();
        } catch (error) {
          arrReplayLockBrowserPage(error);
        }
      }, { once: true });
      return;
    }
    try {
      arrReplayCreateLogicalPageSession();
    } catch (error) {
      arrReplayLockBrowserPage(error);
    }
  };

  const arrReplayCanExplicitBrowserRetry = () => {
    if (!arrReplayBrowserPageEligible ||
        !arrReplayBrowserSession.dormant ||
        arrReplayBrowserSession.dormantCleanupInFlight ||
        arrReplayBrowserSession.locked ||
        arrReplayBrowserSession.pageHidden ||
        globalThis.document?.prerendering === true ||
        arrReplayBrowserSession.rawRpcOutstanding >=
          arrReplayBrowserMaximumHandshakeRpcAttempts ||
        arrReplayBrowserSession.explicitRetryCount >=
          arrReplayBrowserMaximumExplicitRetries)
      return false;
    const lastRetryAt = arrReplayBrowserSession.lastExplicitRetryAtMs;
    return lastRetryAt === undefined ||
      arrReplayWallNow() - lastRetryAt >= arrReplayBrowserExplicitRetryCooldownMs;
  };

  const arrReplayRetryBrowserSession = () => {
    if (!arrReplayCanExplicitBrowserRetry())
      return false;
    ++arrReplayBrowserSession.explicitRetryCount;
    arrReplayBrowserSession.lastExplicitRetryAtMs = arrReplayWallNow();
    try {
      arrReplayCreateLogicalPageSession({
        resetHandshakeBudget: true,
        resetExplicitRetries: false,
        discardCandidateWithoutReceipt: true,
      });
      return true;
    } catch (error) {
      arrReplayLockBrowserPage(error);
      return false;
    }
  };

  const arrReplayBrowserSessionSnapshot = () => Object.freeze({
    status: arrReplayBrowserSession.status,
    pageRole: arrReplayBrowserSession.pageRole,
    eligible: arrReplayBrowserSession.eligible,
    locked: arrReplayBrowserSession.locked,
    subscribed: arrReplayBrowserSession.subscribed,
    dormant: arrReplayBrowserSession.dormant,
    dormantReason: arrReplayBrowserSession.dormantReason,
    dormantCleanupInFlight: arrReplayBrowserSession.dormantCleanupInFlight,
    overlayApiReadiness: arrReplayBrowserSession.overlayApiReadiness,
    handshakeRpcAttempts: arrReplayBrowserSession.handshakeRpcAttempts,
    rawRpcOutstanding: arrReplayBrowserSession.rawRpcOutstanding,
    maximumHandshakeRpcAttempts:
      arrReplayBrowserMaximumHandshakeRpcAttempts,
    handshakeBudgetMilliseconds: arrReplayBrowserHandshakeBudgetMs,
    handshakeBudgetElapsedMilliseconds:
      arrReplayBrowserHandshakeBudgetElapsedMs(),
    explicitRetryCount: arrReplayBrowserSession.explicitRetryCount,
    maximumExplicitRetries: arrReplayBrowserMaximumExplicitRetries,
    canExplicitRetry: arrReplayCanExplicitBrowserRetry(),
    pageSessionId: arrReplayBrowserSession.pageSessionId,
    pageActivatedAtUnixMicros: arrReplayBrowserSession.pageActivatedAtUnixMicros,
    active: arrReplayBrowserSession.active === undefined
      ? undefined
      : Object.freeze({
        pageSessionId: arrReplayBrowserSession.active.pageSessionId,
        pageSessionOrdinal: arrReplayBrowserSession.active.pageSessionOrdinal,
        bridgeInstanceId: arrReplayBrowserSession.active.bridgeInstanceId,
        requiresSourceZeroLifecycle:
          arrReplayBrowserSession.active.requiresSourceZeroLifecycle,
        lastDeliveryId: arrReplayBrowserSession.active.lastDeliveryId,
      }),
    candidate: arrReplayBrowserSession.candidate === undefined
      ? undefined
      : Object.freeze({
        pageSessionId: arrReplayBrowserSession.candidate.pageSessionId,
        pageSessionOrdinal: arrReplayBrowserSession.candidate.pageSessionOrdinal,
        bridgeInstanceId: arrReplayBrowserSession.candidate.bridgeInstanceId,
        bufferedDelivery:
          arrReplayBrowserSession.candidateDelivery !== undefined,
      }),
    queueDepth: arrReplayPendingDeliveryCount,
    queuedUtf8Bytes: arrReplayQueuedUtf8Bytes,
    processingDeliveryId: arrReplayProcessingItem?.deliveryId,
    postAckDeliveryId: arrReplayBrowserSession.postAckDelivery?.deliveryId,
    lastError: arrReplayBrowserSession.lastError,
  });

  // Live 0x0362 adapter: the DLL emits only the three validated P3 element
  // semantics and a standard 261 LogLine DTO. Raw network bytes never reach JS.
  const liveSemanticClockSnapshot = () => Object.freeze({ ...liveSemanticState });

  const liveSemanticFailClosed = async (reason) => {
    liveSemanticState = {
      ...liveSemanticState,
      active: false,
      lastReset: `${reason}`.slice(0, 256),
    };
    liveSemanticQueue = [];
    liveSemanticQueueHead = 0;
    try {
      await endVfxSession();
    } catch (error) {
      console.warn('String live semantic 失败关闭时 VFX 清理失败', error);
    }
  };

  const liveSemanticProcessReset = async (event) => {
    if (arrReplayState.active)
      throw new Error('live/ARR semantic 输入模式冲突');
    if (!arrReplayExactKeys(event, ['kind', 'generation', 'sequence', 'reason', 'logLines']) ||
        event.kind !== 'reset' ||
        !arrReplaySafeInteger(event.generation, 1, Number.MAX_SAFE_INTEGER) ||
        event.generation <= liveSemanticState.generationHighWater || event.sequence !== 0 ||
        typeof event.reason !== 'string' || event.reason.length === 0 || event.reason.length > 256 ||
        !Array.isArray(event.logLines) || event.logLines.length !== 0)
      throw new Error('live semantic reset DTO 非法');

    liveSemanticState = {
      active: !event.reason.startsWith('fail-closed:') && event.reason !== 'source-stop',
      generationHighWater: event.generation,
      generation: event.generation,
      sequence: 0,
      lastNetworkEpoch: 0,
      lastReset: event.reason,
    };
    await endVfxSession();
  };

  const liveSemanticProcessEvent = (event) => {
    if (!arrReplayExactKeys(event, [
      'kind', 'generation', 'sequence', 'networkEpoch', 'semantic', 'logLines',
    ]) || event.kind !== 'event' || event.semantic !== 'ContentDirectorActor' ||
        !liveSemanticState.active || event.generation !== liveSemanticState.generation ||
        !arrReplaySafeInteger(event.sequence, 1, Number.MAX_SAFE_INTEGER) ||
        event.sequence !== liveSemanticState.sequence + 1 ||
        !arrReplaySafeInteger(event.networkEpoch, liveSemanticState.lastNetworkEpoch, 253402300799999) ||
        !Array.isArray(event.logLines) || event.logLines.length !== 1)
      throw new Error('live semantic 顺序、时间或白名单门禁失败');

    const logLine = event.logLines[0];
    arrReplayValidateLogLine(logLine, 'ContentDirectorActor');
    if (!/^1EC03[ABC]$/u.test(logLine.line[5]))
      throw new Error('live semantic ContentDirectorActor 只接受P3三种固定ID');
    liveSemanticState.sequence = event.sequence;
    liveSemanticState.lastNetworkEpoch = event.networkEpoch;
    if (typeof window.dispatchOverlayEvent !== 'function')
      throw new Error('dispatchOverlayEvent 不可用');
    window.dispatchOverlayEvent({
      type: 'LogLine',
      line: [...logLine.line],
      rawLine: logLine.rawLine,
    });
  };

  const liveSemanticProcessEnvelope = async (envelope) => {
    if (!arrReplayExactKeys(envelope, ['type', 'source', 'protocolVersion', 'event']) ||
        envelope.type !== 'StringLiveSemanticEvent' ||
        envelope.source !== 'string-live-semantic' || envelope.protocolVersion !== 1)
      throw new Error('live semantic envelope 门禁失败');
    if (envelope.event?.kind === 'reset')
      await liveSemanticProcessReset(envelope.event);
    else if (envelope.event?.kind === 'event')
      liveSemanticProcessEvent(envelope.event);
    else
      throw new Error('live semantic event kind 非法');
  };

  const liveSemanticPump = async () => {
    if (liveSemanticPumpRunning)
      return;
    liveSemanticPumpRunning = true;
    try {
      while (liveSemanticQueueHead < liveSemanticQueue.length) {
        const envelope = liveSemanticQueue[liveSemanticQueueHead++];
        await liveSemanticProcessEnvelope(envelope);
      }
      liveSemanticQueue = [];
      liveSemanticQueueHead = 0;
    } catch (error) {
      console.warn('String live semantic 事件失败关闭', error);
      await liveSemanticFailClosed(error);
    } finally {
      liveSemanticPumpRunning = false;
      if (liveSemanticQueueHead < liveSemanticQueue.length)
        void liveSemanticPump();
    }
  };

  const handleLiveSemanticEvent = (event) => {
    if (liveSemanticQueue.length - liveSemanticQueueHead >= liveSemanticQueueLimit) {
      console.warn('String live semantic 浏览器队列达到硬上限，失败关闭');
      void liveSemanticFailClosed('browser-queue-overflow');
      return;
    }
    liveSemanticQueue.push(event);
    void liveSemanticPump();
  };

  const vfx = Object.freeze({
    apiVersion: stringNativeVfxApiVersion,
    primitiveTypes: vfxPrimitiveTypes,
    classifications: vfxClassifications,
    directionModes: vfxDirectionModes,
    rectPivots: vfxRectPivots,
    fixedLabels: vfxFixedLabels,
    limits: vfxLimits,
    createCircle: createVfxCircle,
    createDonut: createVfxDonut,
    createSector: createVfxSector,
    createRect: createVfxRect,
    createLine: createVfxLine,
    createArrow: createVfxArrow,
    createFixedLabel: createVfxFixedLabel,
    submitPrimitives: submitVfxPrimitives,
    submitFrame: submitVfxPrimitives,
    submitCircles: async (scope, circles) => {
      if (!Array.isArray(circles))
        throw new TypeError('circles 必须是数组');
      return await submitVfxPrimitives(scope, circles.map(createVfxCircle));
    },
    clearScope: clearVfxScope,
    endSession: endVfxSession,
    getStatus: getVfxStatus,
  });

  const vfxEnableConfigKeys = Object.freeze([
    'MyDMU_StringNativeVfx',
    'MyDMU_StringNativeVfxP1',
    'MyDMU_StringNativeVfxP2',
    'MyDMU_StringNativeVfxP3',
    'MyDMU_StringNativeVfxP4',
    'MyDMU_StringNativeVfxP5',
    'MyDMU_StringNativeVfxPersonalGuide',
  ]);

  const syncEncounterState = (state) => {
    if (state?.config === undefined)
      return encounterState;
    const nextState = {
      ...state,
      config: { ...safeEncounterConfig, ...state.config },
    };
    const disabledVfx = vfxEnableConfigKeys.some((key) =>
      encounterState.config?.[key] === true && nextState.config[key] !== true);
    encounterState = nextState;
    if (disabledVfx) {
      // endVfxSession advances the generation synchronously, so disabling a
      // switch fences old frames before the asynchronous IPC cleanup begins.
      void endVfxSession().catch((error) =>
        console.warn('String VFX 配置关闭全局清理失败', error));
    }
    return encounterState;
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

  const callStringConfig = async (
      action,
      payload = {},
      { applyState = true, timeoutMs } = {}) => {
    if (isDebugPage)
      return { ok: true, state: getEncounterConfigSnapshot(), debug: true };
    const request = { call: 'stringConfig', action, ...payload };
    const result = timeoutMs === undefined
      ? await callOverlayHandler(request)
      : await arrReplayNativeCallWithTimeout(request, timeoutMs);
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
    if (event?.stringArrReplayStrictZoneApplied === true)
      return;
    if (event?.stringArrReplaySyntheticZone !== true &&
        !arrReplayState.active && !arrLogReplayState.active && !arrLogReplayState.pending)
      arrReplayReleaseExternalEffects();
    if (event?.stringArrReplaySyntheticZone !== true) {
      if (zoneId === dancingMadUltimateZoneId &&
          !arrReplayState.active &&
          !arrLogReplayState.active &&
          !arrLogReplayState.pending)
        arrLogReplayCaptureRestoreState();
      else if (zoneId !== dancingMadUltimateZoneId &&
          !arrLogReplayState.active &&
          !arrLogReplayState.pending)
        arrLogReplayClearRestoreState();
    }
    await endVfxSession().catch((error) =>
      console.warn('String VFX 区域变化全局清理失败', error));
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
    if (event?.stringArrReplaySyntheticCombat !== true && inCombat &&
        !arrReplayState.active && !arrLogReplayState.active && !arrLogReplayState.pending)
      arrReplayReleaseExternalEffects();
    if (event?.stringArrReplaySyntheticCombat !== true) {
      await endVfxSession().catch((error) =>
        console.warn('String VFX 战斗状态变化全局清理失败', error));
    }
    if (event?.stringArrReplayLocalOnly === true)
      return;
    try {
      await callStringConfig('setCombat', { inCombat });
    } catch (error) {
      console.warn('String 本次设置战斗锁定同步失败', error);
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
      roleOverlayParty = msg.msg.party.map((member) => ({ ...member }));
      if (isValidRoleOverlayParty(roleOverlayParty))
        roleOverlayLastSeen = monotonicMilliseconds();
    }
    externalPartyRp = msg.msg.party;
    if (externalPartyRp !== undefined &&
        (!arrReplayPartyMode || isCompletePartyRoleMapping(externalPartyRp, stringParty)))
      updatePartyRp();
  };

  if (!/config\.html/.test(location.href)) {
    sendBroadcast('requestData');
    const roleOverlayHeartbeatTimer = setInterval(() => sendBroadcast('requestData'), 1000);
    roleOverlayHeartbeatTimer?.unref?.();
    addOverlayListener('PartyChanged', (event) => {
      clearTimeout(partyUpdateTimer);
      if (event.stringArrReplaySynthetic === true || event.stringArrReplayRestore === true) {
        createParty(event.party);
        return;
      }
      if (arrReplayStrictIdentityPinned)
        return;
      lastLiveParty = (event.party ?? []).map((member) => ({ ...member }));
      arrLogReplayStopForNativeParty();
      if (arrReplayPartyMode || arrLogReplayState.pending)
        return;
      if (externalPartyRp === undefined) {
        partyUpdateTimer = setTimeout(() => createParty(event.party), 500);
        return;
      }
      createParty(event.party);
    });
    addOverlayListener('onPlayerChangedEvent', (event) => {
      if (event?.stringArrReplaySynthetic === true ||
          event?.stringArrReplayDetected === true ||
          event?.stringArrReplayRestore === true)
        return;
      if (arrReplayStrictIdentityPinned)
        return;
      lastLivePlayerEvent = {
        ...event,
        detail: { ...(event?.detail ?? {}) },
      };
    });
    addOverlayListener('BroadcastMessage', handleBroadcastMessage);
    addOverlayListener('StringConfigChanged', (event) => syncEncounterState(event.state));
    addOverlayListener('ChangeZone', handleZoneChanged);
    addOverlayListener('onInCombatChangedEvent', handleCombatChanged);
    if (arrReplayBrowserPageEligible)
      addOverlayListener('StringArrReplayEvent', handleArrReplayEvent);
    addOverlayListener('StringLiveSemanticEvent', handleLiveSemanticEvent);
    addOverlayListener('LogLine', handleArrLogReplayLine);
    if (arrReplayBrowserPageEligible) {
      globalThis.addEventListener?.('pagehide', arrReplayHandlePageHide);
      globalThis.addEventListener?.('pageshow', arrReplayHandlePageShow);
      // Listener registration must precede the explicit subscribe/ready barrier.
      // Otherwise a synchronous managed confirm can publish into a missing receiver.
      arrReplayInitializeBrowserPageSession();
    }
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
    stringNativeVfxApiVersion,
    vfx,
    submitVfxFrame: submitVfxPrimitives,
    clearVfxScope,
    endVfxSession,
    getVfxStatus,
    getArrReplayClock: arrReplayClockSnapshot,
    getArrReplayBrowserSession: arrReplayBrowserSessionSnapshot,
    retryArrReplayBrowserSession: arrReplayRetryBrowserSession,
    getArrReplayCombatants,
    scheduleArrReplayTask,
    cancelArrReplayTask,
    getArrReplaySchedulerState,
    isArrReplayActive: () =>
      arrReplayState.active || arrLogReplayState.active || arrLogReplayState.pending,
    getLiveSemanticClock: liveSemanticClockSnapshot,
    getEncounterConfig,
    getEncounterConfigSnapshot,
    getSafeEncounterConfigSnapshot,
    requestEncounterState,
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
