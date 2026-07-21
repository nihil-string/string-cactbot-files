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
    MyDMU_P2EndTowerStrategy: 'north',
    MyDMU_P2TrineDrawMode: 'preview',
    MyDMU_P2TowerCallout: false,
    MyDMU_P2ActionCallout: true,
    MyDMU_P3MahjongMarkV3: false,
    MyDMU_P3TargetMarkV3: false,
    MyDMU_P3FireBuffOrder: 'MT/ST/H1/H2/D1/D2/D3/D4',
    MyDMU_P3SuperJumpBait: 'legacy',
    MyDMU_P3KnockbackStrategy: 'legacy',
    MyDMU_P3SlapRoleSectors: true,
    MyDMU_P3SlapRouteArrow: true,
    MyDMU_P3Attack1DoubleTether: false,
    MyDMU_P3Stop2DoubleTether: false,
    MyDMU_P3TowerStrategy: 'legacy',
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
    MyDMU_P5SymphonySpreadScheme: 'eden',
    MyDMU_P5SymphonyOrder: 'H2/D2/D4/ST/MT/D3/H1/D1',
    MyDMU_P5MitigationChannel: 'e',
    MyDMU_P5GroundFireCount: '3',
    MyDMU_P5GroundFireGuideEnabled: true,
    MyDMU_P5ForsakenGuideEnabled: true,
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

  let stringParty = [];
  let externalPartyRp;
  let partyUpdateTimer;
  let lastLiveParty = [];
  let arrReplayPartyMode = false;
  let arrReplayPartyCandidates = [];
  let arrReplayPartyReady = false;
  let arrReplayPartyPreservedForResume = false;
  let roleOverlayParty = [];
  let roleOverlayLastSeen = Number.NEGATIVE_INFINITY;
  let encounterState = {
    zoneId: 0,
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

  const isValidRoleOverlayParty = (records) => {
    if (!Array.isArray(records) || records.length !== roleOverlayRoles.length)
      return false;
    const ids = records.map((record) => normalizePartyId(record?.id));
    const roles = records.map((record) => record?.rp?.toString().trim().toUpperCase() ?? '');
    if (ids.some((id) => id === '') || new Set(ids).size !== roleOverlayRoles.length ||
        new Set(roles).size !== roleOverlayRoles.length ||
        !roleOverlayRoles.every((role) => roles.includes(role)))
      return false;

    const liveIds = lastLiveParty
      .filter((member) => member.inParty)
      .map((member) => normalizePartyId(member.id));
    return liveIds.length === roleOverlayRoles.length &&
      new Set(liveIds).size === roleOverlayRoles.length &&
      ids.every((id) => liveIds.includes(id));
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
      for (const member of stringParty) {
        member.stringRP = arrReplayExpectedParty.find((expected) =>
          expected.id === member.id && expected.name === member.name &&
          expected.job === Number(member.job))?.rp ?? 'unknown';
      }
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

  const placeSave = () => callOverlayHandler({ call: 'PostNamazu', c: 'place', p: 'save' });
  const placeLoad = () => callOverlayHandler({ call: 'PostNamazu', c: 'place', p: 'load' });
  const placeClear = () => callOverlayHandler({ call: 'PostNamazu', c: 'place', p: 'clear' });

  const vfxClientId = `raidboss-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  let vfxSessionPromise;
  let activeVfxSessionId;
  let vfxHeartbeatTimer;
  let vfxHeartbeatInFlight = false;
  let vfxGeneration = 0;
  const arrReplayQueueLimit = 4096;
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
  const arrReplayExpectedParty = Object.freeze([
    Object.freeze({ id: '10091A82', name: '伊莉雅nq', job: 23, rp: 'D3' }),
    Object.freeze({ id: '1007292D', name: '珂朵莉丶', job: 24, rp: 'H1' }),
    Object.freeze({ id: '1006BBC2', name: '神奈备命', job: 19, rp: 'MT' }),
    Object.freeze({ id: '10071ACF', name: '黑海黑鱼', job: 28, rp: 'H2' }),
    Object.freeze({ id: '10073A61', name: '白羽苏芳', job: 32, rp: 'ST' }),
    Object.freeze({ id: '100717E5', name: '小小泷丶', job: 39, rp: 'D1' }),
    Object.freeze({ id: '1006676A', name: '秋水微澜', job: 22, rp: 'D2' }),
    Object.freeze({ id: '1007157F', name: '克莱尔菲', job: 35, rp: 'D4' }),
  ]);
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
    playerIndex: 0,
    localPlayerId: undefined,
    localPlayerName: undefined,
    partyReady: false,
  };
  let arrReplayQueue = [];
  let arrReplayQueueHead = 0;
  let arrReplayPumpRunning = false;
  const arrReplayCombatantLimit = 256;
  const arrReplayCombatantQueryLimit = 64;
  let arrReplayCombatants = new Map();
  let arrReplayCombatantsGeneration = -1;
  let arrReplayCombatantsPreservedForResume = false;
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
      clearInterval(vfxHeartbeatTimer);
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
    vfxHeartbeatTimer = setInterval(async () => {
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

  const submitVfxPrimitives = (scope, primitives) =>
    callVfxEngine('frame', {
      scope: normalizeVfxScope(scope),
      drawings: normalizeVfxPrimitiveBatch(primitives),
    });

  const clearVfxScope = (scope) =>
    callVfxEngine('clearScope', { scope: normalizeVfxScope(scope) });

  const endVfxSession = async () => {
    vfxGeneration++;
    const endingPromise = vfxSessionPromise;
    const endingSessionId = activeVfxSessionId;
    if (vfxSessionPromise === endingPromise)
      vfxSessionPromise = undefined;
    stopVfxHeartbeat(endingSessionId);
    if (endingPromise === undefined)
      return { ok: true, active: false };
    try {
      let session;
      try {
        session = await endingPromise;
      } catch (error) {
        // A pending begin belongs to the generation we just invalidated.  Its
        // success path explicitly ends the stale server session; a failed or
        // lost response is bounded by the DLL lease and must not clobber the
        // replacement generation.
        return { ok: true, active: false, staleBegin: true };
      }
      if (isDebugPage)
        return { ok: true, debug: true };
      const result = await callOverlayHandler({
        call: 'stringVfx',
        action: 'endSession',
        sessionId: session.sessionId,
      });
      if (result?.ok !== true)
        throw new Error(result?.error ?? 'String VFX DLL 会话结束失败');
      return result;
    } finally {
      stopVfxHeartbeat(endingSessionId);
    }
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

  const arrReplayWallNow = () => {
    const value = globalThis.performance?.now?.();
    return Number.isFinite(value) ? value : Date.now();
  };

  const arrReplayClockSnapshot = () => {
    let exposedReplayMs = arrReplayState.replayMs;
    if (arrReplayState.active) {
      const elapsed = Math.max(0, Math.floor(arrReplayWallNow() - arrReplayState.wallAnchorMs));
      exposedReplayMs = Math.min(1264261, Math.max(
        arrReplayState.lastExposedReplayMs,
        arrReplayState.replayMs + elapsed,
      ));
      arrReplayState.lastExposedReplayMs = exposedReplayMs;
    }
    const { wallAnchorMs: _wallAnchorMs, lastExposedReplayMs: _lastExposed, ...publicState } =
      arrReplayState;
    return Object.freeze({ ...publicState, replayMs: exposedReplayMs });
  };

  const arrReplayClearCombatants = () => {
    arrReplayCombatants = new Map();
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
        if (arrReplayCombatants.get(sourceId)?.BNpcID !== 9020)
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
      return [{
        id: arrReplayLineActorId(line[2], '38.target'),
        update: arrReplayPositionUpdate(line, 11, 12, 13, 14, '38.target'),
      }];
    }
    if (type !== '261' || line[2] !== 'Add')
      return [];

    const id = arrReplayLineActorId(line[3], '261.actor');
    const allowedPairs = new Set([
      'BNpcID', 'BNpcNameID', 'Heading', 'Level', 'MaxHP', 'MaxMP',
      'Name', 'OwnerID', 'PosX', 'PosY', 'PosZ',
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

  const arrReplayDispatchCombatState = (inGameCombat) => {
    if (typeof window.dispatchOverlayEvent !== 'function')
      throw new Error('dispatchOverlayEvent 不可用');
    window.dispatchOverlayEvent({
      type: 'onInCombatChangedEvent',
      detail: { inGameCombat },
    });
  };

  const arrReplayRestoreLiveParty = () => {
    arrReplayPartyMode = false;
    arrReplayPartyCandidates = [];
    arrReplayPartyReady = false;
    arrReplayPartyPreservedForResume = false;
    arrReplayState.partyReady = false;
    if (lastLiveParty.length === 0) {
      stringParty = [];
      return;
    }
    if (typeof window.dispatchOverlayEvent !== 'function')
      throw new Error('dispatchOverlayEvent 不可用');
    window.dispatchOverlayEvent({
      type: 'PartyChanged',
      party: lastLiveParty.map((member) => ({ ...member })),
      stringArrReplayRestore: true,
    });
  };

  const arrReplayResetSyntheticParty = () => {
    arrReplayPartyMode = true;
    arrReplayPartyCandidates = [];
    arrReplayPartyReady = false;
    arrReplayPartyPreservedForResume = false;
    arrReplayState.partyReady = false;
  };

  const arrReplayAcceptPlayerSpawn = (event) => {
    if (arrReplayPartyReady)
      throw new Error('ARR PlayerSpawn 超过固定8人快照');
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
    if (arrReplayPartyCandidates.some((member) => member.id === id || member.name === name))
      throw new Error('ARR PlayerSpawn party ID/name不唯一');
    const expected = arrReplayExpectedParty[arrReplayPartyCandidates.length];
    if (expected === undefined || expected.id !== id || expected.name !== name || expected.job !== job)
      throw new Error('ARR PlayerSpawn与固定header job/actor映射不一致');

    arrReplayPartyCandidates.push({ id, name, job, inParty: true, stringRP: expected.rp });
    if (arrReplayPartyCandidates.length !== 8)
      return;

    const tanks = arrReplayPartyCandidates.filter((member) => tankJobs.includes(member.job)).length;
    const healers = arrReplayPartyCandidates.filter((member) => healerJobs.includes(member.job)).length;
    const dps = arrReplayPartyCandidates.filter((member) => dpsJobs.includes(member.job)).length;
    const localMatches = arrReplayPartyCandidates.filter((member) =>
      `0x${member.id}` === arrReplayState.localPlayerId &&
      member.name === arrReplayState.localPlayerName);
    const indexedLocal = arrReplayPartyCandidates[arrReplayState.playerIndex];
    const fixtureRoles = arrReplayPartyCandidates.map((member) => member.stringRP);
    if (tanks !== 2 || healers !== 2 || dps !== 4 || localMatches.length !== 1 ||
        indexedLocal !== localMatches[0] || new Set(fixtureRoles).size !== 8 ||
        !['MT', 'ST', 'H1', 'H2', 'D1', 'D2', 'D3', 'D4'].every((role) =>
          fixtureRoles.includes(role)))
      throw new Error('ARR synthetic party未通过2T2H4D或本地玩家双重门禁');

    arrReplayPartyReady = true;
    arrReplayState.partyReady = true;
    if (typeof window.dispatchOverlayEvent !== 'function')
      throw new Error('dispatchOverlayEvent 不可用');
    window.dispatchOverlayEvent({
      type: 'PartyChanged',
      party: arrReplayPartyCandidates.map((member) => ({ ...member })),
      stringArrReplaySynthetic: true,
    });
  };

  const arrReplayFailClosed = async (reason) => {
    const frozenReplayMs = arrReplayClockSnapshot().replayMs;
    arrReplayState = {
      ...arrReplayState,
      active: false,
      replayMs: frozenReplayMs,
      lastExposedReplayMs: frozenReplayMs,
      wallAnchorMs: arrReplayWallNow(),
      generation: arrReplayState.generation + 1,
      lastReset: `${reason}`.slice(0, 256),
    };
    arrReplayClearCombatants();
    arrReplayQueue = [];
    arrReplayQueueHead = 0;
    try {
      arrReplayRestoreLiveParty();
    } catch (error) {
      console.warn('String ARR 回放失败关闭时实际队伍恢复失败', error);
    }
    try {
      arrReplayDispatchCombatState(false);
    } catch (error) {
      console.warn('String ARR 回放失败关闭时 raidboss reset 失败', error);
    }
    try {
      await endVfxSession();
    } catch (error) {
      console.warn('String ARR 回放失败关闭时 VFX 全局清理失败', error);
    }
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

  const arrReplayProcessLifecycle = async (event) => {
    if (!arrReplayExactKeys(event, [
      'kind', 'replayEpoch', 'sequence', 'replayMs', 'playbackRate',
      'playerIndex', 'localPlayerId', 'localPlayerName', 'action', 'reason', 'logLines',
    ]))
      throw new Error('ARR lifecycle DTO 字段不精确');
    if (!arrReplaySafeInteger(event.replayEpoch, 1, Number.MAX_SAFE_INTEGER) ||
        event.replayEpoch <= arrReplayState.epochHighWater || event.sequence !== 0 ||
        !arrReplaySafeInteger(event.replayMs, 0, 1264261) ||
        typeof event.playbackRate !== 'number' || !Number.isFinite(event.playbackRate) ||
        event.playbackRate <= 0 || event.playbackRate > 16 ||
        !Number.isInteger(event.playerIndex) || !/^0x[0-9A-F]{8}$/u.test(event.localPlayerId) ||
        typeof event.localPlayerName !== 'string' || event.localPlayerName.length === 0 ||
        event.localPlayerName.length > 64 || /[|\r\n\0]/u.test(event.localPlayerName) ||
        typeof event.reason !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9_.-]{0,63}$/u.test(event.reason) ||
        !Array.isArray(event.logLines) || event.logLines.length !== 0)
      throw new Error('ARR lifecycle 顺序或字段非法');

    const previousState = arrReplayState;
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
      playerIndex: event.playerIndex,
      localPlayerId: event.localPlayerId,
      localPlayerName: event.localPlayerName,
      partyReady: arrReplayPartyReady,
    };
    if (liveSemanticState.active)
      throw new Error('ARR/live semantic 输入模式冲突');
    if (!['start', 'seek', 'reset', 'stop', 'pause', 'unload', 'overflow'].includes(event.action))
      throw new Error(`ARR lifecycle action 非法：${event.action}`);
    if (event.playbackRate !== 1.0)
      throw new Error('ARR playbackRate 只允许固定1.0x');
    if (event.playerIndex !== 0)
      throw new Error('ARR playerIndex 只允许固定0');
    if (previousState.localPlayerId !== undefined &&
        (event.localPlayerId !== previousState.localPlayerId ||
         event.localPlayerName !== previousState.localPlayerName))
      throw new Error('ARR 本地玩家身份在epoch之间发生变化');
    const resumeCombatants = event.action === 'start' &&
      previousState.lastReset?.startsWith('pause:') === true &&
      arrReplayCombatantsPreservedForResume &&
      arrReplayCombatantsGeneration === previousState.generation;
    if (resumeCombatants) {
      arrReplayCombatantsGeneration = arrReplayState.generation;
      arrReplayCombatantsPreservedForResume = false;
    } else if (event.action === 'pause' && previousState.active &&
        arrReplayCombatantsGeneration === previousState.generation) {
      arrReplayCombatantsGeneration = arrReplayState.generation;
      arrReplayCombatantsPreservedForResume = true;
    } else {
      arrReplayClearCombatants();
    }
    const resumeParty = event.action === 'start' &&
      arrReplayPartyPreservedForResume && arrReplayPartyReady;
    if (event.action === 'start' || event.action === 'seek') {
      if (resumeParty) {
        arrReplayPartyPreservedForResume = false;
        arrReplayPartyMode = true;
        arrReplayState.partyReady = true;
      } else {
        arrReplayResetSyntheticParty();
      }
    } else if (event.action === 'pause') {
      arrReplayPartyPreservedForResume = arrReplayPartyReady;
    } else {
      arrReplayRestoreLiveParty();
    }
    // The DLL has already completed verified-zero cleanup before publishing this
    // lifecycle event.  false stops delayed/suppressed triggers; true rebuilds
    // raidboss data via getDataObject()/Reset before the first new LogLine.
    arrReplayDispatchCombatState(false);
    await endVfxSession();
    if (event.action === 'start' || event.action === 'seek') {
      arrReplayDispatchCombatState(true);
      arrReplayState.active = true;
    }
  };

  const arrReplayProcessTransportReset = async (event) => {
    if (!arrReplayExactKeys(event, ['kind', 'action', 'reason', 'logLines']) ||
        !['disconnect', 'gap', 'cleanup-failed', 'overflow'].includes(event.action) ||
        typeof event.reason !== 'string' || event.reason.length > 512 ||
        !Array.isArray(event.logLines) || event.logLines.length !== 0)
      throw new Error('ARR transport-reset DTO 非法');
    await arrReplayFailClosed(`${event.action}:${event.reason}`);
  };

  const arrReplayProcessSemantic = (event) => {
    if (!arrReplayExactKeys(event, [
      'kind', 'replayEpoch', 'sequence', 'replayMs', 'semantic', 'logLines',
    ]))
      throw new Error('ARR semantic DTO 字段不精确');
    if (!arrReplayState.active || event.replayEpoch !== arrReplayState.replayEpoch ||
        !arrReplaySafeInteger(event.sequence, 1, Number.MAX_SAFE_INTEGER) ||
        event.sequence !== arrReplayState.sequence + 1 ||
        !arrReplaySafeInteger(event.replayMs, arrReplayState.replayMs, 1264261) ||
        arrReplayAllowedTypesBySemantic[event.semantic] === undefined ||
        !Array.isArray(event.logLines) || event.logLines.length > 128)
      throw new Error('ARR semantic 顺序、时间或白名单门禁失败');
    if (event.semantic === 'ActorControlTarget' && event.logLines.length !== 1)
      throw new Error('ARR ActorControlTarget 必须含唯一标准261投影');
    if (event.semantic === 'ContentDirectorActor' && event.logLines.length !== 1)
      throw new Error('ARR ContentDirectorActor 必须含唯一标准261投影');
    for (const line of event.logLines)
      arrReplayValidateLogLine(line, event.semantic);
    const combatantUpdates = arrReplayPrepareCombatantUpdates(event.logLines);
    if (event.semantic === 'PlayerSpawn')
      arrReplayAcceptPlayerSpawn(event);
    else if (!arrReplayPartyReady && event.replayMs > 202)
      throw new Error('ARR 固定8人party未在202ms门禁前构建完成');
    arrReplayApplyCombatantUpdates(combatantUpdates);

    arrReplayState.sequence = event.sequence;
    arrReplayState.replayMs = event.replayMs;
    arrReplayState.lastExposedReplayMs = Math.max(
      arrReplayState.lastExposedReplayMs,
      event.replayMs,
    );
    arrReplayState.wallAnchorMs = arrReplayWallNow();
    if (typeof window.dispatchOverlayEvent !== 'function')
      throw new Error('dispatchOverlayEvent 不可用');
    for (const logLine of event.logLines) {
      window.dispatchOverlayEvent({
        type: 'LogLine',
        line: [...logLine.line],
        rawLine: logLine.rawLine,
      });
    }
  };

  const arrReplayProcessEnvelope = async (envelope) => {
    if (!arrReplayExactKeys(envelope, ['type', 'source', 'protocolVersion', 'event']) ||
        envelope.type !== 'StringArrReplayEvent' ||
        envelope.source !== 'string-arr-replay-test' ||
        envelope.protocolVersion !== 1)
      throw new Error('ARR envelope 门禁失败');
    const event = envelope.event;
    if (event?.kind === 'lifecycle')
      await arrReplayProcessLifecycle(event);
    else if (event?.kind === 'transport-reset')
      await arrReplayProcessTransportReset(event);
    else if (event?.kind === 'event')
      arrReplayProcessSemantic(event);
    else
      throw new Error('ARR event kind 非法');
  };

  const arrReplayPump = async () => {
    if (arrReplayPumpRunning)
      return;
    arrReplayPumpRunning = true;
    try {
      while (arrReplayQueueHead < arrReplayQueue.length) {
        const envelope = arrReplayQueue[arrReplayQueueHead++];
        await arrReplayProcessEnvelope(envelope);
        if (arrReplayQueueHead >= 512 && arrReplayQueueHead * 2 >= arrReplayQueue.length) {
          arrReplayQueue = arrReplayQueue.slice(arrReplayQueueHead);
          arrReplayQueueHead = 0;
        }
      }
      arrReplayQueue = [];
      arrReplayQueueHead = 0;
    } catch (error) {
      console.warn('String ARR 回放事件失败关闭', error);
      await arrReplayFailClosed(error);
    } finally {
      arrReplayPumpRunning = false;
      if (arrReplayQueueHead < arrReplayQueue.length)
        void arrReplayPump();
    }
  };

  const handleArrReplayEvent = (event) => {
    if (arrReplayQueue.length - arrReplayQueueHead >= arrReplayQueueLimit) {
      console.warn('String ARR 回放浏览器队列达到硬上限，失败关闭');
      void arrReplayFailClosed('browser-queue-overflow');
      return;
    }
    arrReplayQueue.push(event);
    void arrReplayPump();
  };

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

  const callStringConfig = async (action, payload = {}) => {
    if (isDebugPage)
      return { ok: true, state: getEncounterConfigSnapshot(), debug: true };
    const result = await callOverlayHandler({ call: 'stringConfig', action, ...payload });
    if (result?.ok !== true)
      throw new Error(result?.error ?? 'String 本次设置桥接未返回成功状态');
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
    await endVfxSession().catch((error) =>
      console.warn('String VFX 战斗状态变化全局清理失败', error));
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
    if (externalPartyRp !== undefined && !arrReplayPartyMode)
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
      lastLiveParty = (event.party ?? []).map((member) => ({ ...member }));
      if (arrReplayPartyMode)
        return;
      if (externalPartyRp === undefined) {
        partyUpdateTimer = setTimeout(() => createParty(event.party), 500);
        return;
      }
      createParty(event.party);
    });
    addOverlayListener('BroadcastMessage', handleBroadcastMessage);
    addOverlayListener('StringConfigChanged', (event) => syncEncounterState(event.state));
    addOverlayListener('ChangeZone', handleZoneChanged);
    addOverlayListener('onInCombatChangedEvent', handleCombatChanged);
    addOverlayListener('StringArrReplayEvent', handleArrReplayEvent);
    addOverlayListener('StringLiveSemanticEvent', handleLiveSemanticEvent);
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
    getArrReplayCombatants,
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
