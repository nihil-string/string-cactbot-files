// 绝妖星自用触发器。
// 时间轴沿用公开版，触发器逻辑按自用打法逐步维护。

const myDmuPhaseStarts = {
  C403: 'p1',
  C24C: 'p2',
  C3F7: 'p3',
  C2DC: 'p4',
  BB40: 'p5',
};

const myDmuRoleOrder = ['MT', 'ST', 'H1', 'H2', 'D1', 'D2', 'D3', 'D4'];
const myDmuDefaultJobOrder = [
  'WAR', 'DRK', 'GNB', 'PLD',
  'AST', 'WHM', 'SGE', 'SCH',
  'VPR', 'SAM', 'NIN', 'RPR', 'DRG', 'MNK',
  'DNC', 'BRD', 'MCH',
  'PCT', 'BLM', 'SMN', 'RDM', 'BLU',
];
const myDmuManagedMarkTypes = [
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
const myDmuJobGroups = {
  PLD: 'tank',
  WAR: 'tank',
  DRK: 'tank',
  GNB: 'tank',
  WHM: 'healer',
  SCH: 'healer',
  AST: 'healer',
  SGE: 'healer',
  MNK: 'dps',
  DRG: 'dps',
  NIN: 'dps',
  SAM: 'dps',
  RPR: 'dps',
  VPR: 'dps',
  BRD: 'dps',
  MCH: 'dps',
  DNC: 'dps',
  BLM: 'dps',
  SMN: 'dps',
  RDM: 'dps',
  BLU: 'dps',
  PCT: 'dps',
};
const myDmuP3TargetFirstSecondOrder = ['D1', 'D2', 'D3', 'D4', 'MT', 'ST', 'H2', 'H1'];
const myDmuP3TargetThirdOrder = ['MT', 'ST', 'D1', 'D2', 'D3', 'D4', 'H2', 'H1'];
const myDmuRoleOrderText = (order) => order.join('/');

const myDmuP1Headmarkers = {
  stack: '0080',
  spread: '007F',
  fakeFire: '02A1',
  trueFire: '02A2',
  fakeIce: '02A3',
  trueIce: '02A4',
  fakeThunder: '02A5',
  trueThunder: '02A6',
};
const myDmuP1ArrowBuffs = {
  '13D7': '上',
  '13D8': '下',
  '13D9': '右',
  '13DA': '左',
  '130C': '上',
  '130D': '下',
  '130E': '右',
  '130F': '左',
};
const myDmuP1PoisonBuff = '13D6';
const myDmuP1PoisonMarkers = ['bind1', 'bind2'];
const myDmuP2ARounds = new Set([1, 2, 3, 8]);
const myDmuP2Pair2222IdleOddModes = {
  role: 'role',
  cone: 'cone',
};
const myDmuP2OddStrategies = {
  original: 'original',
  melee: 'melee',
};
const myDmuP2Pair2222Groups = [
  ['MT', 'H1'],
  ['ST', 'H2'],
  ['D1', 'D3'],
  ['D2', 'D4'],
];
const myDmuP2Pair2222IdleOrder = ['MT', 'ST', 'D1', 'D2', 'H1', 'H2', 'D3', 'D4'];
const myDmuP2Pair2222IdleMarkers = ['attack5', 'attack7', 'attack6', 'attack8'];
const myDmuP2OddActiveMarkers = ['triangle', 'circle', 'stop1', 'stop2'];
const myDmuP2EvenActiveMarkers = ['bind1', 'bind2', 'attack1', 'attack2'];
const myDmuP2Headmarkers = {
  '02CB': 'stack',
  '02CC': 'spread',
  '02CD': 'cone',
};
const myDmuP2TowerMapEffectFlags = '00020001';
const myDmuP2TowerPoints = {
  '01': { index: 1, label: '1', x: 100, z: 92 },
  '02': { index: 2, label: '2', x: 105.657, z: 94.343 },
  '03': { index: 3, label: '3', x: 108, z: 100 },
  '04': { index: 4, label: '4', x: 105.657, z: 105.657 },
  '05': { index: 5, label: '5', x: 100, z: 108 },
  '06': { index: 6, label: '6', x: 94.343, z: 105.657 },
  '07': { index: 7, label: '7', x: 92, z: 100 },
  '08': { index: 8, label: '8', x: 94.343, z: 94.343 },
};
const myDmuP2ProgressBuff = '13DB';

const myDmuP3MahjongHeadmarkers = {
  '0150': 1,
  '0151': 2,
  '0152': 3,
  '0153': 4,
  '01B5': 5,
  '01B6': 6,
  '01B7': 7,
  '01B8': 8,
};
const myDmuP3MahjongDirectMarkers = {
  1: 'attack1',
  2: 'attack2',
  3: 'attack3',
  4: 'attack4',
  5: 'square',
  6: 'bind3',
  7: 'bind2',
  8: 'bind1',
};
const myDmuP3MahjongLeftMarkers = ['attack1', 'attack2', 'attack3', 'attack4'];
const myDmuP3MahjongRightMarkers = ['bind1', 'bind2', 'bind3', 'square'];
const myDmuP3MahjongLineMaxPointDistance = 10;
const myDmuP3MahjongPoints = [
  { index: 1, label: 'A', x: 100, z: 88 },
  { index: 2, label: '1', x: 108.485, z: 91.515 },
  { index: 3, label: 'B', x: 112, z: 100 },
  { index: 4, label: '2', x: 108.485, z: 108.485 },
  { index: 5, label: 'C', x: 100, z: 112 },
  { index: 6, label: '3', x: 91.515, z: 108.485 },
  { index: 7, label: 'D', x: 88, z: 100 },
  { index: 8, label: '4', x: 91.515, z: 91.515 },
];

const myDmuP3TargetBuffs = {
  BBC: 'first',
  BBD: 'second',
  BBE: 'third',
};
const myDmuP3ElementDebuffs = {
  '640': { kind: 'fire', text: '火' },
  '641': { kind: 'water', text: '水' },
  '642': { kind: 'wind', text: '背对BOSS' },
  '643': { kind: 'antiwind', text: '面向艾克斯迪斯' },
};
const myDmuP4TruthHeadmarkers = {
  '045F': { target: 'chaos', value: false },
  '0460': { target: 'chaos', value: true },
  '0461': { target: 'ex', value: false },
  '0462': { target: 'ex', value: true },
};
const myDmuP4TruthStatuses = Object.fromEntries(
  Object.entries(myDmuP4TruthHeadmarkers).map(([id, value]) => [`${id}0808`, value]),
);
const myDmuP4TruthActorControlEffectIds = ['808', '0808'];
const myDmuP4TruthActorControlMarkers = [...new Set(
  Object.keys(myDmuP4TruthHeadmarkers).flatMap((id) => [id, id.replace(/^0+/u, '')]),
)];
const myDmuP4ElementBuffs = ['15A8', '15A9'];
const myDmuP4PetrifyBuff = '15A7';
const myDmuP4AccelerationBuff = '15AA';
const myDmuP4ChaosBuffs = ['15AB', '15AC'];
const myDmuP4MandarinDuckColorBuffs = ['1317', '1318', '15A5', '15A6'];
const myDmuP4MandarinDuckFateBuffs = ['1558', '1C6', '566'];
const myDmuP4MandarinDuckBuffs = [
  ...myDmuP4MandarinDuckColorBuffs,
  ...myDmuP4MandarinDuckFateBuffs,
];
const myDmuP4WhiteAntilightId = 'C394';
const myDmuP4FloodIds = ['C3A1', 'C3A2', 'C392', 'C393'];
const myDmuP4PersonalActionBuffs = [
  ...myDmuP4ElementBuffs,
  myDmuP4PetrifyBuff,
  myDmuP4AccelerationBuff,
  ...myDmuP4ChaosBuffs,
];
const myDmuP4MagicStorageStartId = 'BAA4';
const myDmuP4MagicReleaseId = 'BAA5';
const myDmuP4MagicStorageLabels = {
  BA9F: { element: 'thunder', label: '真雷' },
  BAA1: { element: 'thunder', label: '假雷' },
  BA98: { element: 'ice', label: '真冰' },
  BA9E: { element: 'ice', label: '假冰' },
};
const myDmuP4ThunderSpellIds = ['BA9F', 'BAA1'];
const myDmuP4IceSpellIds = ['BA98', 'BA9E'];
const myDmuP4MagicReleaseHeadmarkers = {
  '02A3': { element: 'ice', invert: true, label: '冰问号' },
  '02A4': { element: 'ice', invert: false, label: '冰无问号' },
  '02A5': { element: 'thunder', invert: true, label: '雷问号' },
  '02A6': { element: 'thunder', invert: false, label: '雷无问号' },
};

const myDmuNewP4MagicStorage = (previous, keepCount = false) => ({
  active: false,
  storeCount: keepCount ? previous?.storeCount ?? 0 : 0,
  labels: { thunder: [], ice: [] },
  baseLabels: {},
  release: { seen: {}, mods: {}, markers: [] },
  seen: {},
  expireAt: 0,
});
const myDmuP4TrackedBuffs = [
  ...myDmuP4ElementBuffs,
  myDmuP4PetrifyBuff,
  myDmuP4AccelerationBuff,
  ...myDmuP4ChaosBuffs,
];

const myDmuP5Mitigations = [
  { id: '01', skill: '连续究极 x4', target: 'MT血仇 D1牵制 扳手', field: '步道 策动 节制+盾 罩子' },
  { id: '02', skill: '魔击 x3', field: '幕帘' },
  { id: '03', skill: '混沌洪水 x4', field: '扩散盾 全大赦' },
  { id: '04', skill: '神圣', target: 'ST血仇', field: '大天使' },
  { id: '05', skill: '混沌核爆', field: '罩子' },
  { id: '06', skill: '魔击 x2', field: '群盾X1' },
  { id: '07', skill: '暴雷/冰封/爆炎', field: '群盾' },
  { id: '08', skill: '暴雷/冰封/爆炎', field: '群盾' },
  { id: '09', skill: '暴雷/冰封/爆炎', field: '群盾 跑快快 罩子' },
  { id: '10', skill: '连续究极 x4', target: 'MT血仇 D2牵制 昏乱', field: '步道 策动 全大赦 罩子 幕帘' },
  { id: '11', skill: '混沌涡旋', target: 'ST血仇' },
  { id: '12', skill: '神圣', field: '罩子 群盾' },
  { id: '13', skill: '魔击 x3', field: '群盾X3' },
  { id: '14', skill: '遗弃末世', target: 'MT血仇 D1牵制', field: '扩散盾 幕帘 罩子 节制+盾 大天使' },
  { id: '15', skill: '遗弃末狱', target: '扳手卡3个', field: '全大赦卡3个' },
  { id: '16', skill: '遗弃末世', field: '学者附体' },
  { id: '17', skill: '遗弃末狱', field: '铃铛 幻光' },
  { id: '18', skill: '遗弃末世', target: 'ST血仇 D2牵制 昏乱', field: '步道 策动 卡最后4个' },
];

const myDmuP3FirewallEffects = {
  '1060': {
    targetKind: 'chaos',
    text: '打卡奥斯',
  },
  '1062': {
    targetKind: 'exdeath',
    text: '打艾克斯迪司',
  },
};

const myDmuP5SymphonyBuffs = {
  '14E6': {
    kind: 'flare',
    initial: '分摊死刑，退避，准备去场边',
    followup: '去场边',
  },
  '14E7': {
    kind: 'holy',
    initial: '分摊死刑，挑衅，不要靠近',
    followup: '靠近',
  },
};
const myDmuP5SymphonySpreadSchemes = {
  regular: 'regular',
  leaning: 'leaning',
};
const myDmuP5SymphonySpreadDirectionLabels = {
  [myDmuP5SymphonySpreadSchemes.regular]: [
    '下南', '右下', '右东', '右上', '上北', '左上', '左西', '左下',
  ],
  [myDmuP5SymphonySpreadSchemes.leaning]: [
    '右偏下', '下偏右', '右偏上', '上偏右',
    '上偏左', '左偏上', '左偏下', '下偏左',
  ],
};
const myDmuP5SymphonySpreadOrder = ['H2', 'D2', 'D4', 'ST', 'MT', 'D3', 'H1', 'D1'];
const myDmuP5FloodWaves = {
  '117.662|89.372|-0.785': 1,
  '103.532|75.242|-0.785': 1,
  '82.292|89.372|0.785': 2,
  '96.452|75.242|0.785': 2,
  '124.743|96.452|-0.785': 3,
  '110.582|82.292|-0.785': 3,
  '89.372|82.292|0.785': 4,
  '75.242|96.452|0.785': 4,
};
const myDmuP5TrioBuffs = {
  B56: '火',
  BB6: '雷',
  B57: '冰',
};
const myDmuP5TrioTowerElements = {
  '1EC03E': '火',
  '1EC03F': '冰',
  '1EC040': '雷',
};
const myDmuP5TrioPositions = ['左上', '右上', '下'];
const myDmuP5MagicHitSequence = [3, 2, 1, 2, 1, 2, 1, 3, 2, 1];

const myDmuP5MitigationText = (entry) => {
  const parts = [`${entry.skill}减伤`];
  if (entry.target !== undefined)
    parts.push(`目标：${entry.target}`);
  if (entry.field !== undefined)
    parts.push(`场地：${entry.field}`);
  return parts.join(' / ');
};

const myDmuRoleOverlayConnected = (data) =>
  myDmuFl(data)?.isRoleOverlayConnected?.() === true;

const myDmuPartyChatEnabled = (data) =>
  myDmuRoleOverlayConnected(data) &&
  myDmuBooleanConfig(data, 'MyDMU_PartyChatEnabled', false);

const myDmuDoTextCommand = (data, text) => {
  if (!myDmuPartyChatEnabled(data))
    return false;
  const command = `/p ${text}`;
  const fl = myDmuFl(data);
  const result = fl?.doTextCommand !== undefined
    ? fl.doTextCommand(command)
    : callOverlayHandler({ call: 'PostNamazu', c: 'DoTextCommand', p: command });
  if (typeof result?.then !== 'function')
    return result !== false;
  return myDmuObservePromise(data, Promise.resolve(result).then(
    (value) => value !== false,
    (error) => {
      myDmuActLog('小队消息发送失败', { error: `${error}`, text });
      return false;
    },
  ), 'party-chat');
};

const myDmuP5MitigationTimelineTriggers = myDmuP5Mitigations.map((entry) => ({
  id: `绝妖星 P5 减伤 ${entry.id}`,
  regex: new RegExp(`^绝妖星 P5 减伤 ${entry.id}$`),
  beforeSeconds: 5,
  durationSeconds: 5,
  suppressSeconds: 1,
  condition: (data) => myDmuBooleanConfig(data, 'MyDMU_P5MitigationAlert', true),
  run: (data) => myDmuDoTextCommand(data, myDmuP5MitigationText(entry)),
}));

const myDmuP2TowerTimelineTriggers = [...Array(8).keys()].map((index) => {
  const round = index + 1;
  return {
    id: `绝妖星 P2 八轮塔 ${round}`,
    regex: new RegExp(`^(?:The Path of Light|光之波动) ${round}$`),
    beforeSeconds: 1.2,
    preRun: (data) => {
      data.myDmuP2Round = round;
      myDmuApplyP2Round(data, round);
    },
    infoText: (data) => {
      if (!myDmuBooleanConfig(data, 'MyDMU_P2TowerCallout', false))
        return undefined;
      return myDmuP2TakeCallout(data, round, `p2Tower${round}`);
    },
    tts: null,
    soundVolume: 0,
    run: (data) => myDmuSpeakCached(data, `p2Tower${round}`),
  };
});
const myDmuP3MahjongFallbackTimelineTrigger = {
  id: '绝妖星 P3 麻将兜底标点',
  regex: /^(?:Ultima Blaster|究极冲击波) 1$/,
  beforeSeconds: 0,
  suppressSeconds: 30,
  run: (data) => {
    if ((data.myDmuP3Mahjong?.lines?.length ?? 0) < 2)
      data.myDmuP3Mahjong.allowDirectFallback = true;
    myDmuApplyP3MahjongMarkers(data);
  },
};

const myDmuConfigValue = (data, key, fallback) => {
  const sessionValue = myDmuFl(data)?.getEncounterConfig?.(key);
  if (sessionValue !== undefined)
    return sessionValue;
  return data.triggerSetConfig?.[key] ?? fallback;
};

const myDmuP1P2InvalidConfig = (data, key, value) => {
  data.myDmuP1P2InvalidConfigs ??= {};
  const signature = `${typeof value}:${JSON.stringify(value)}`;
  if (data.myDmuP1P2InvalidConfigs[key] !== signature) {
    data.myDmuP1P2InvalidConfigs[key] = signature;
    console.log(`[String][DMUConfig] ${key} 非法，已失败关闭对应个人指路：${signature}`);
  }
  return undefined;
};

const myDmuP1P2EnumConfig = (data, key, fallback, allowed) => {
  const raw = myDmuConfigValue(data, key, fallback);
  if (typeof raw !== 'string')
    return myDmuP1P2InvalidConfig(data, key, raw);
  const normalized = raw.trim().toLowerCase();
  if (!allowed.includes(normalized))
    return myDmuP1P2InvalidConfig(data, key, raw);
  return normalized;
};

const myDmuBooleanConfig = (data, key, fallback = true) => {
  const value = myDmuConfigValue(data, key, fallback);
  if (value === undefined)
    return fallback;
  if (typeof value === 'boolean')
    return value;
  return value === 'true' || value === '开' || value === '本地';
};

const myDmuMarkLocalOnly = (data) => myDmuBooleanConfig(data, 'MyDMU_LocalMarkV3', false);

const myDmuAutoMarkEnabled = (data) => myDmuBooleanConfig(data, 'MyDMU_AutoMarkV5', false);

const myDmuMarkConfigured = (data, key) =>
  myDmuAutoMarkEnabled(data) && myDmuBooleanConfig(data, key, false);

const myDmuMarkEnabled = (data, key) =>
  myDmuRoleOverlayConnected(data) &&
  myDmuMarkConfigured(data, key);

const myDmuMarkConfigKeys = [
  'MyDMU_P1PoisonMarkV3',
  'MyDMU_P2TowerMarkV3',
  'MyDMU_P3MahjongMarkV3',
  'MyDMU_P3TargetMarkV3',
  'MyDMU_P4BuffMarkV3',
];

const myDmuAnyMarkEnabled = (data) =>
  myDmuMarkConfigKeys.some((key) => myDmuMarkConfigured(data, key));

const myDmuP1CalloutEnabled = (data) =>
  data.myDmuPhase === 'p1' && myDmuBooleanConfig(data, 'MyDMU_P1Callout', true);

const myDmuVoiceCalloutEnabled = (data) =>
  myDmuBooleanConfig(data, 'MyDMU_VoiceCalloutV2', false);

const myDmuP5CalloutEnabled = (data) =>
  data.myDmuPhase === 'p5' && myDmuBooleanConfig(data, 'MyDMU_P5MitigationAlert', true);

const myDmuFl = (data) => data.stringFL ?? globalThis.Util?.string;

const myDmuNormalizeHeadmarkerId = (id) => id?.toString().toUpperCase().padStart(4, '0');

const myDmuNumber = (value) => {
  const num = Number.parseFloat(value);
  return Number.isFinite(num) ? num : undefined;
};

const myDmuNormalizeActorId = (value) => {
  if (value === undefined || value === null)
    return undefined;
  if (typeof value === 'number') {
    if (!Number.isFinite(value) || value <= 0)
      return undefined;
    return Math.trunc(value).toString(16).toUpperCase().padStart(8, '0');
  }
  const text = value.toString().trim();
  if (text === '' || text === '0' || text.toUpperCase() === 'E0000000')
    return undefined;
  if (/^\d+$/u.test(text) && text.length > 8)
    return Number.parseInt(text, 10).toString(16).toUpperCase().padStart(8, '0');
  return text.toUpperCase().padStart(8, '0');
};

const myDmuEventMilliseconds = (matches) => {
  const replayMs = Number(matches?.replayMs);
  if (Number.isFinite(replayMs))
    return replayMs;
  const timestamp = typeof Date.parse === 'function'
    ? Date.parse(matches?.timestamp ?? '')
    : Number.NaN;
  return Number.isFinite(timestamp) ? timestamp : Date.now();
};

const myDmuAcceptLogicalEvent = (data, key, windowMilliseconds, matches) => {
  const window = Number(windowMilliseconds);
  if (typeof key !== 'string' || key.length === 0 || key.length > 160)
    throw new Error(`DMU logical event key 非法：${key}`);
  if (!Number.isFinite(window) || window < 0 || window > 5000)
    throw new Error(`DMU logical event window 非法：${windowMilliseconds}`);
  const events = data.myDmuLogicalEvents ??= {};
  const eventAt = myDmuEventMilliseconds(matches);
  const previous = events[key];
  if (previous !== undefined && eventAt >= previous.at && eventAt - previous.at < window)
    return undefined;
  const accepted = { at: eventAt };
  events[key] = accepted;
  return accepted;
};

const myDmuQueryCombatants = async (data, actorIds, scope = 'unknown') => {
  let normalizedIds;
  if (actorIds !== undefined) {
    if (!Array.isArray(actorIds) || actorIds.length === 0)
      throw new Error(`${scope} combatant 查询必须包含精确 actor ID`);
    normalizedIds = actorIds.map(myDmuNormalizeActorId);
    if (normalizedIds.some((id) => !/^[14][0-9A-F]{7}$/u.test(id ?? '')) ||
        new Set(normalizedIds).size !== normalizedIds.length) {
      throw new Error(`${scope} combatant 查询 actor ID 非法或重复`);
    }
  }

  if (typeof callOverlayHandler !== 'function')
    throw new Error(`${scope} live combatant 查询接口不可用`);
  const request = { call: 'getCombatants' };
  if (normalizedIds !== undefined)
    request.ids = normalizedIds.map((id) => Number.parseInt(id, 16));
  const result = await callOverlayHandler(request);
  if (!Array.isArray(result?.combatants))
    throw new Error(`${scope} combatant 查询未返回数组`);
  return result.combatants;
};

const myDmuTaskLifecycleRegistry = globalThis.__stringDmuTaskLifecycle ??= {
  nextToken: 0,
  currentData: undefined,
  listenersInstalled: false,
  markConfigListenerInstalled: false,
};

const myDmuTaskLifecycleState = (data) => data?.myDmuTaskLifecycle;

const myDmuCaptureTaskFence = (data) => {
  const state = myDmuTaskLifecycleState(data);
  return {
    token: state?.token,
  };
};

const myDmuTaskFenceCurrent = (data, fence) => {
  const state = myDmuTaskLifecycleState(data);
  if (state?.active !== true || state.token !== fence?.token ||
      myDmuTaskLifecycleRegistry.currentData !== data)
    return false;
  return true;
};

const myDmuCancelOwnedTask = (data, key) => {
  const state = myDmuTaskLifecycleState(data);
  const task = state?.tasks?.[key];
  if (task === undefined)
    return false;
  delete state.tasks[key];
  clearTimeout(task.handle);
  return true;
};

const myDmuCancelTaskGeneration = (data, reason) => {
  const state = myDmuTaskLifecycleState(data);
  if (state?.active !== true)
    return false;
  state.active = false;
  state.invalidatedReason = reason;
  for (const key of Object.keys(state.tasks))
    myDmuCancelOwnedTask(data, key);
  return true;
};

const myDmuStartTaskGeneration = (data, reason) => {
  myDmuCancelTaskGeneration(data, `${reason}:replace`);
  const state = {
    token: ++myDmuTaskLifecycleRegistry.nextToken,
    active: true,
    reason,
    invalidatedReason: undefined,
    tasks: {},
    pendingPromises: new Set(),
    createdTasks: 0,
    peakTasks: 0,
  };
  data.myDmuTaskLifecycle = state;
  myDmuTaskLifecycleRegistry.currentData = data;
  return state;
};

const myDmuTrackPromise = (data, promise, label, fence = myDmuCaptureTaskFence(data)) => {
  const state = myDmuTaskLifecycleState(data);
  if (state === undefined || typeof promise?.then !== 'function')
    return Promise.resolve(false);
  const pending = { label, fence };
  state.pendingPromises.add(pending);
  return Promise.resolve(promise)
    .then(
      (value) => myDmuTaskFenceCurrent(data, fence) ? value : false,
      (error) => {
        if (!myDmuTaskFenceCurrent(data, fence))
          return false;
        throw error;
      },
    )
    .finally(() => state.pendingPromises.delete(pending));
};

const myDmuObservePromise = (data, promise, label, fence = myDmuCaptureTaskFence(data)) => {
  const tracked = myDmuTrackPromise(data, promise, label, fence);
  void tracked.catch((error) => myDmuActLog('异步任务失败', {
    label,
    error: `${error}`,
    fallback: false,
  }));
  return tracked;
};

// Keep synchronous replay adapters usable, but commit output-dependent state only
// after the real OverlayPlugin promise has completed in this task generation.
const myDmuAfterOutput = (data, result, onSuccess, onFailure = () => false) => {
  if (typeof result?.then !== 'function')
    return result === false ? onFailure() : onSuccess();
  const fence = myDmuCaptureTaskFence(data);
  return myDmuObservePromise(data, Promise.resolve(result).then((accepted) => {
    if (!myDmuTaskFenceCurrent(data, fence))
      return false;
    return accepted === false ? onFailure() : onSuccess();
  }), 'output', fence);
};

const myDmuScheduleOwnedTask = (data, key, delayMilliseconds, callback) => {
  if (typeof key !== 'string' || key.length === 0 || key.length > 200)
    throw new Error(`DMU task key 非法：${key}`);
  const delay = Number(delayMilliseconds);
  if (!Number.isFinite(delay) || delay < 0 || delay > 86400000)
    throw new Error(`DMU task 延迟非法：${delayMilliseconds}`);
  if (typeof callback !== 'function')
    throw new Error(`DMU task callback 非函数：${key}`);
  const state = myDmuTaskLifecycleState(data);
  if (state?.active !== true || myDmuTaskLifecycleRegistry.currentData !== data)
    return undefined;
  myDmuCancelOwnedTask(data, key);
  const fence = myDmuCaptureTaskFence(data);
  const task = {
    handle: undefined,
    fence,
  };
  const invoke = () => {
    if (state.tasks[key] !== task)
      return;
    delete state.tasks[key];
    if (!myDmuTaskFenceCurrent(data, fence))
      return;
    const result = callback();
    if (typeof result?.then === 'function')
      return myDmuObservePromise(data, result, `timer:${key}`, fence);
    return result;
  };
  task.handle = setTimeout(invoke, delay);
  state.tasks[key] = task;
  state.createdTasks++;
  state.peakTasks = Math.max(state.peakTasks, Object.keys(state.tasks).length);
  return task.handle;
};

const myDmuRetryAction = (data, key, action, count = 6, intervalMs = 500) => {
  const finish = (done) => {
    if (done)
      return true;
    if (count <= 0)
      return false;
    myDmuScheduleOwnedTask(
      data,
      `retry:${key}`,
      intervalMs,
      () => myDmuRetryAction(data, key, action, count - 1, intervalMs),
    );
    return false;
  };
  const result = action();
  if (typeof result?.then !== 'function')
    return finish(result);
  const fence = myDmuCaptureTaskFence(data);
  return myDmuObservePromise(data, Promise.resolve(result).then((done) =>
    myDmuTaskFenceCurrent(data, fence) ? finish(done) : false), `retry:${key}`, fence);
};

const myDmuCacheSpeech = (data, key, text) => {
  if (text === undefined || text === null || text === '')
    return undefined;
  data.myDmuSpeech ??= {};
  data.myDmuSpeech[key] = text;
  return text;
};

const myDmuClearCachedSpeech = (data, key) => {
  if (data.myDmuSpeech !== undefined)
    delete data.myDmuSpeech[key];
};

const myDmuSpeakText = (data, text) => {
  if (!myDmuVoiceCalloutEnabled(data))
    return;
  if (text === undefined || text === null || text === '')
    return;
  if (typeof callOverlayHandler !== 'function')
    return;
  const result = callOverlayHandler({ call: 'cactbotSay', text: text });
  result?.catch?.((error) => {
    console.warn(`[String][DMU] cactbotSay 播报失败：${error}`);
  });
};

const myDmuSpeakCached = (data, key) => {
  const text = data.myDmuSpeech?.[key];
  if (data.myDmuSpeech !== undefined)
    delete data.myDmuSpeech[key];
  myDmuSpeakText(data, text);
  return text;
};

const myDmuActLog = (message, detail) => {
  if (globalThis.console?.log === undefined)
    return;
  const suffix = detail === undefined ? '' : ` ${JSON.stringify(detail)}`;
  console.log(`[String][DMU] ${message}${suffix}`);
};

const myDmuP3FirewallInfo = (effectId) =>
  myDmuP3FirewallEffects[effectId?.toString().toUpperCase()];

const myDmuBossKindFromName = (name) => {
  const text = name?.toString();
  if (text === undefined)
    return undefined;
  if (/艾克斯迪司|Exdeath/i.test(text))
    return 'exdeath';
  if (/卡奥斯|Chaos/i.test(text))
    return 'chaos';
  return undefined;
};

const myDmuP3FirewallTargetText = (kind) =>
  Object.values(myDmuP3FirewallEffects).find((info) => info.targetKind === kind)?.text;

const myDmuP3FirewallWrongTargetText = (data, matches) => {
  if (matches.source !== data.me)
    return undefined;
  const normalizedId = matches.id?.toString().toUpperCase().replace(/^0+/u, '');
  if (normalizedId === '7' || normalizedId === '8')
    return undefined;
  const targetKind = myDmuBossKindFromName(matches.target);
  if (targetKind === undefined || data.myDmuP3FirewallTargetKind === undefined)
    return undefined;
  if (targetKind === data.myDmuP3FirewallTargetKind)
    return undefined;
  const correct = myDmuP3FirewallTargetText(data.myDmuP3FirewallTargetKind);
  if (correct === undefined)
    return undefined;
  return `打错目标：${correct}`;
};

const myDmuCombatantTargetId = (combatant) =>
  myDmuNormalizeActorId(
    combatant?.TargetID ??
    combatant?.TargetId ??
    combatant?.targetID ??
    combatant?.PCTargetID ??
    combatant?.NPCTargetID,
  );

const myDmuUpdateSelectedTargetId = async (data) => {
  data.myDmuP3FirewallSelectedTargetId = undefined;
  const ownId = myDmuNormalizeActorId(myDmuGetHexIdByName(data, data.me));
  if (!/^1[0-9A-F]{7}$/u.test(ownId ?? ''))
    return;
  const taskFence = myDmuCaptureTaskFence(data);
  try {
    const combatants = await myDmuQueryCombatants(data, [ownId], 'p3.firewall-target');
    if (!myDmuTaskFenceCurrent(data, taskFence))
      return;
    const me = combatants.find((combatant) => combatant?.Name === data.me);
    data.myDmuP3FirewallSelectedTargetId = myDmuCombatantTargetId(me ?? combatants[0]);
  } catch (_err) {
    if (!myDmuTaskFenceCurrent(data, taskFence))
      return;
    data.myDmuP3FirewallSelectedTargetId = undefined;
  }
};

const myDmuP3FirewallSelectedWrongTargetText = (data, matches) => {
  const selectedTargetId = data.myDmuP3FirewallSelectedTargetId;
  const hitTargetId = myDmuNormalizeActorId(matches.targetId);
  if (selectedTargetId === undefined || hitTargetId === undefined || selectedTargetId !== hitTargetId)
    return undefined;
  return myDmuP3FirewallWrongTargetText(data, matches);
};

const myDmuP3SelectedTargetHitText = (data, matches, text) => {
  const selectedTargetId = data.myDmuP3FirewallSelectedTargetId;
  const hitTargetId = myDmuNormalizeActorId(matches.targetId);
  if (selectedTargetId === undefined || hitTargetId === undefined || selectedTargetId !== hitTargetId)
    return undefined;
  return text;
};

const myDmuP5SymphonyInfo = (effectId) =>
  myDmuP5SymphonyBuffs[effectId?.toString().toUpperCase()];

const myDmuP5SymphonySpreadScheme = (data) => {
  const configured = myDmuConfigValue(
    data,
    'MyDMU_P5SymphonySpreadScheme',
    myDmuP5SymphonySpreadSchemes.regular,
  );
  return Object.values(myDmuP5SymphonySpreadSchemes).includes(configured)
    ? configured
    : undefined;
};

const myDmuP5SymphonySpreadText = (data) => {
  const scheme = myDmuP5SymphonySpreadScheme(data);
  const role = myDmuGetRpByName(data, data.me);
  const directionIndex = myDmuP5SymphonySpreadOrder.indexOf(role);
  const direction = myDmuP5SymphonySpreadDirectionLabels[scheme]?.[directionIndex];
  if (direction === undefined) {
    myDmuActLog('P5 癫狂八方职能无法识别', { role, scheme });
    return undefined;
  }
  return `八方分散，${direction}`;
};

const myDmuBeginLifecycleCleanup = (data, reason) => {
  return myDmuCancelTaskGeneration(data, reason);
};

const myDmuRegisterLifecycleListeners = () => {
  if (typeof addOverlayListener === 'function' &&
      myDmuTaskLifecycleRegistry.markConfigListenerInstalled !== true) {
    myDmuTaskLifecycleRegistry.markConfigListenerInstalled = true;
    addOverlayListener('StringConfigChanged', myDmuHandleMarkConfigChanged);
  }
  if (myDmuTaskLifecycleRegistry.listenersInstalled)
    return;
  myDmuTaskLifecycleRegistry.listenersInstalled = true;
  const cleanup = (reason) => {
    const current = myDmuTaskLifecycleRegistry.currentData;
    if (current === undefined)
      return;
    myDmuBeginLifecycleCleanup(current, reason);
  };
  if (typeof addOverlayListener === 'function') {
    addOverlayListener('BroadcastMessage', (event) => {
      const message = event?.detail ?? event;
      if (message?.source !== 'stringRuntimeJS' || !Array.isArray(message.msg?.party) ||
          message.msg.party.length === 0)
        return;
      const current = myDmuTaskLifecycleRegistry.currentData;
      if (current?.myDmuPhase !== 'p4' ||
          !myDmuMarkConfigured(current, 'MyDMU_P4BuffMarkV3'))
        return;
      myDmuRetryAction(current, 'p4-mark-timing', () =>
        myDmuProcessP4MarkTiming(current, 'role-overlay-broadcast'), 12, 250);
    });
    addOverlayListener('ChangeZone', (event) => {
      if (Number(event?.zoneID) !== 1363)
        cleanup('zone-change');
    });
    addOverlayListener('onInCombatChangedEvent', (event) => {
      const detail = event?.detail ?? event ?? {};
      if (!Boolean(detail.inGameCombat ?? detail.inACTCombat ?? false))
        cleanup('combat-end');
    });
  }
  if (typeof globalThis.addEventListener === 'function') {
    globalThis.addEventListener('pagehide', () => cleanup('pagehide-reload'));
    globalThis.addEventListener('beforeunload', () => cleanup('beforeunload-reload'));
  }
};

const myDmuEnsureP5State = (data) => {
  data.myDmuP5 ??= {};
  data.myDmuP5.symphonyCrowdTargets ??= [];
  data.myDmuP5.floods ??= [];
  data.myDmuP5.floodWaveOrder ??= [];
  data.myDmuP5.floodDirectionAnnounced ??= false;
  data.myDmuP5.trioBuffs ??= [];
  data.myDmuP5.trioTowers ??= [];
  data.myDmuP5.trioLitTowers ??= [];
  data.myDmuP5.trioPending ??= [];
  data.myDmuP5.trioCount ??= 0;
  data.myDmuP5.trioFirstAnnounced ??= false;
  data.myDmuP5.magicHitCount ??= 0;
  data.myDmuP5.softEnrageStep ??= 0;
  return data.myDmuP5;
};

const myDmuResetP5Trio = (data) => {
  const state = myDmuEnsureP5State(data);
  state.trioBuffs = [];
  state.trioTowers = [];
  state.trioLitTowers = [];
  state.trioPending = [];
  state.trioCount = 0;
  state.trioIdle = false;
  state.trioFirstAnnounced = false;
};

const myDmuP5FloodKey = (matches) => {
  const x = myDmuNumber(matches.x);
  const y = myDmuNumber(matches.y) ?? myDmuNumber(matches.z);
  const heading = myDmuNumber(matches.heading);
  if (x === undefined || y === undefined || heading === undefined)
    return undefined;
  return `${x.toFixed(3)}|${y.toFixed(3)}|${heading.toFixed(3)}`;
};

const myDmuRecordP5Flood = (data, matches) => {
  const state = myDmuEnsureP5State(data);
  if (state.floodDirectionAnnounced)
    return;
  const key = myDmuP5FloodKey(matches);
  if (key === undefined) {
    myDmuActLog('P5 洪水缺少坐标或朝向', matches);
    return;
  }
  const wave = myDmuP5FloodWaves[key];
  if (wave === undefined) {
    myDmuActLog('P5 洪水坐标无法识别', { key });
    return;
  }
  if (state.floods.some((entry) => entry.key === key))
    return;
  state.floods.push({
    key: key,
    wave: wave,
  });
  if (!state.floodWaveOrder.includes(wave))
    state.floodWaveOrder.push(wave);
};

const myDmuP5FloodDirection = (firstWave, secondWave) => {
  const forward = (firstWave % 4) + 1;
  const backward = ((firstWave + 2) % 4) + 1;
  if (secondWave === forward)
    return '去左';
  if (secondWave === backward)
    return '去右';
  return undefined;
};

const myDmuP5FloodText = (data) => {
  const state = myDmuEnsureP5State(data);
  if (state.floodDirectionAnnounced || state.floods.length < 4 || state.floodWaveOrder.length < 2)
    return undefined;
  const direction = myDmuP5FloodDirection(state.floodWaveOrder[0], state.floodWaveOrder[1]);
  if (direction === undefined) {
    myDmuActLog('P5 洪水方向无法推导', { waves: state.floodWaveOrder.slice(0, 2) });
    return undefined;
  }
  state.floodDirectionAnnounced = true;
  return direction;
};

const myDmuRecordP5TrioBuff = (data, matches) => {
  const state = myDmuEnsureP5State(data);
  const effectId = matches.effectId?.toString().toUpperCase();
  const element = myDmuP5TrioBuffs[effectId];
  if (element === undefined)
    return;
  const key = matches.targetId ?? matches.target;
  if (key === undefined)
    return;
  if (state.trioBuffs.some((entry) => entry.key === key && entry.element === element))
    return;
  state.trioBuffs.push({
    key: key,
    id: myDmuNormalizeActorId(matches.targetId),
    name: matches.target,
    element: element,
  });
};

const myDmuP5TrioTowerPosition = (matches) => {
  const x = myDmuNumber(matches.pairPosX) ?? myDmuNumber(matches.x);
  const y = myDmuNumber(matches.pairPosY) ?? myDmuNumber(matches.y) ?? myDmuNumber(matches.z);
  if (x === undefined || y === undefined)
    return undefined;
  const centers = [
    { position: '左上', x: 93, y: 96 },
    { position: '右上', x: 107, y: 96 },
    { position: '下', x: 100, y: 109 },
  ];
  centers.sort((left, right) => {
    const leftDistance = (x - left.x) ** 2 + (y - left.y) ** 2;
    const rightDistance = (x - right.x) ** 2 + (y - right.y) ** 2;
    return leftDistance - rightDistance;
  });
  return centers[0]?.position;
};

const myDmuRecordP5TrioTower = (data, matches) => {
  const state = myDmuEnsureP5State(data);
  const bNpcId = matches.pairBNpcID?.toString().toUpperCase() ?? matches.bNpcId?.toString().toUpperCase();
  const element = myDmuP5TrioTowerElements[bNpcId];
  const position = myDmuP5TrioTowerPosition(matches);
  const key = matches.id ?? matches.pairId ?? `${bNpcId}:${matches.pairPosX ?? matches.x}:${matches.pairPosY ?? matches.y}`;
  if (element === undefined || position === undefined) {
    myDmuActLog('P5 三星塔资料不足', matches);
    return;
  }
  if (state.trioTowers.some((entry) => entry.key === key))
    return;
  state.trioTowers.push({
    key: key,
    element: element,
    position: position,
  });
};

const myDmuP5TrioGroups = (data) => {
  const state = myDmuEnsureP5State(data);
  const groups = Object.fromEntries(myDmuP5TrioPositions.map((position) => [position, []]));
  for (const tower of state.trioTowers) {
    groups[tower.position] ??= [];
    groups[tower.position].push(tower);
  }
  for (const towers of Object.values(groups))
    towers.sort((left, right) => left.element.localeCompare(right.element, 'zh-Hans') || left.key.localeCompare(right.key));
  return groups;
};

const myDmuP5NextTrioPosition = (position) => {
  const index = myDmuP5TrioPositions.indexOf(position);
  if (index < 0)
    return undefined;
  return myDmuP5TrioPositions[(index + 1) % myDmuP5TrioPositions.length];
};

const myDmuP5TrioOwnBuff = (data) => {
  const state = myDmuEnsureP5State(data);
  return state.trioBuffs.find((entry) =>
    entry.name === data.me ||
    entry.id === myDmuNormalizeActorId(data.myId) ||
    entry.id === myDmuNormalizeActorId(data.myHexId));
};

const myDmuP5TrioText = (position, element, count) => `${position}找${element}${count}`;

const myDmuP5TrioOwnText = (data) => {
  const state = myDmuEnsureP5State(data);
  if (state.trioFirstAnnounced || state.trioCount >= 3)
    return undefined;
  const ownBuff = myDmuP5TrioOwnBuff(data);
  if (ownBuff === undefined) {
    state.trioIdle = true;
    state.trioCount = 1;
    state.trioFirstAnnounced = true;
    return '闲人';
  }
  const groups = myDmuP5TrioGroups(data);
  const basePosition = myDmuP5TrioPositions.find((position) =>
    groups[position]?.some((tower) => tower.element === ownBuff.element));
  if (basePosition === undefined) {
    myDmuActLog('P5 三星找不到自己元素塔', { element: ownBuff.element, towers: state.trioTowers });
    return undefined;
  }
  const firstPosition = myDmuP5NextTrioPosition(basePosition);
  const secondPosition = myDmuP5NextTrioPosition(firstPosition);
  const thirdPosition = myDmuP5NextTrioPosition(secondPosition);
  if (firstPosition === undefined || secondPosition === undefined || thirdPosition === undefined)
    return undefined;
  state.trioPending = [
    myDmuP5TrioText(secondPosition, groups[secondPosition]?.[0]?.element ?? ownBuff.element, 2),
    myDmuP5TrioText(thirdPosition, groups[thirdPosition]?.[0]?.element ?? ownBuff.element, 3),
  ];
  state.trioCount = 1;
  state.trioFirstAnnounced = true;
  return myDmuP5TrioText(firstPosition, groups[firstPosition]?.[0]?.element ?? ownBuff.element, 1);
};

const myDmuP5TrioNextText = (data) => {
  const state = myDmuEnsureP5State(data);
  if (state.trioIdle)
    return undefined;
  const text = state.trioPending.shift();
  if (text === undefined)
    return undefined;
  state.trioCount++;
  return text;
};

const myDmuP5TrioChoiceText = (data, matches) => {
  const action = matches.id?.toString().toUpperCase() === 'C24E' ? '钢铁' : '月环';
  const next = myDmuP5TrioNextText(data);
  return next === undefined ? action : `${action}，${next}`;
};

const myDmuRecordP5TrioLitTower = (data, matches) => {
  const state = myDmuEnsureP5State(data);
  const key = matches.id ?? matches.param5 ?? matches.param6 ?? matches.sourceId ?? matches.targetId;
  if (key === undefined)
    return;
  if (!state.trioLitTowers.includes(key))
    state.trioLitTowers.push(key);
};

const myDmuP5TrioIdleTowerText = (data) => {
  const state = myDmuEnsureP5State(data);
  if (!state.trioIdle || state.trioLitTowers.length < 2)
    return undefined;
  const lit = new Set(state.trioLitTowers);
  const groups = myDmuP5TrioGroups(data);
  for (const position of myDmuP5TrioPositions) {
    const towers = groups[position] ?? [];
    const litTowers = towers.filter((tower) => lit.has(tower.key));
    if (litTowers.length >= 2) {
      state.trioLitTowers = [];
      return myDmuP5TrioText(position, litTowers[0]?.element ?? towers[0]?.element ?? '塔', 2);
    }
  }
  myDmuActLog('P5 三星闲人亮塔无法匹配', { lit: state.trioLitTowers, towers: state.trioTowers });
  return undefined;
};

const myDmuP5MagicHitText = (data) => {
  const state = myDmuEnsureP5State(data);
  const expectedHits = myDmuP5MagicHitSequence[state.magicHitCount] ?? 1;
  state.magicHitCount++;
  return expectedHits <= 1 ? '最后一下' : `还有${expectedHits - 1}下`;
};

const myDmuP5SoftEnrageStopText = (data) => {
  const state = myDmuEnsureP5State(data);
  state.softEnrageStep++;
  return state.softEnrageStep >= 4 ? '结束' : '停';
};

const myDmuRecordP5CrowdHoly = (data, matches) => {
  const state = myDmuEnsureP5State(data);
  if (state.symphonyCrowdTargets.length >= 6) {
    state.symphonyCrowdTargets = [];
    state.symphonyCrowdLastSize = 0;
  }

  const key = matches.targetId ?? matches.target;
  if (key === undefined)
    return;
  if (state.symphonyCrowdTargets.some((item) => item.key === key || item.name === matches.target))
    return;
  state.symphonyCrowdTargets.push({
    key: key,
    name: matches.target,
  });
};

const myDmuP5CrowdHolyText = (data) => {
  if (data.role === 'tank')
    return undefined;

  const state = myDmuEnsureP5State(data);
  const size = state.symphonyCrowdTargets.length;
  if (state.symphonyCrowdLastSize === size)
    return undefined;
  if (size !== 3 && size !== 6)
    return undefined;

  state.symphonyCrowdLastSize = size;
  if (size === 6)
    return '躲开大圈';

  const onYou = state.symphonyCrowdTargets.some((item) => item.name === data.me);
  return onYou ? '后退' : '原地不动';
};

const myDmuRolePriority = (role, order = myDmuRoleOrder) => {
  const index = order.indexOf(role);
  return index < 0 ? 99 : index;
};

const myDmuRoleGroup = (role) => {
  const normalized = myDmuNormalizeRp(role);
  if (normalized === undefined)
    return undefined;
  return normalized.startsWith('D') ? 'DPS' : 'TN';
};

const myDmuNormalizeRp = (role) => myDmuRoleOrder.includes(role) ? role : undefined;

const myDmuParseRoleOrder = (value, fallback) => {
  const rawRoles = Array.isArray(value) ? value : typeof value === 'string'
    ? value.toUpperCase().split(/[\s,，/|>＞、;；]+/u)
    : [];
  const seen = new Set();
  const order = [];
  for (const raw of rawRoles) {
    const role = myDmuNormalizeRp(raw.trim());
    if (role === undefined || seen.has(role))
      continue;
    seen.add(role);
    order.push(role);
  }
  for (const role of fallback) {
    if (!seen.has(role)) {
      seen.add(role);
      order.push(role);
    }
  }
  for (const role of myDmuRoleOrder) {
    if (!seen.has(role))
      order.push(role);
  }
  return order;
};

const myDmuP3TargetFirstPriority = (data) =>
  myDmuParseRoleOrder(
    myDmuConfigValue(data, 'MyDMU_P3TargetFirstPriority'),
    myDmuP3TargetFirstSecondOrder,
  );

const myDmuP3TargetSecondPriority = (data) =>
  myDmuParseRoleOrder(
    myDmuConfigValue(data, 'MyDMU_P3TargetSecondPriority'),
    myDmuP3TargetFirstSecondOrder,
  );

const myDmuP3TargetThirdPriority = (data) =>
  myDmuParseRoleOrder(
    myDmuConfigValue(data, 'MyDMU_P3TargetThirdPriority'),
    myDmuP3TargetThirdOrder,
  );

const myDmuPartyNames = (data) => data.party?.partyNames_ ?? data.party?.partyNames ?? [];

const myDmuJobGroup = (job) => myDmuJobGroups[job?.toString().toUpperCase()];

const myDmuDefaultRpByName = (data, name) => {
  const partyNames = [...new Set(myDmuPartyNames(data))];
  if (!partyNames.includes(name))
    return undefined;

  const entries = partyNames.map((partyName, index) => {
    const job = data.party?.jobName?.(partyName)?.toString().toUpperCase();
    const group = myDmuJobGroup(job) ?? data.party?.nameToRole_?.[partyName];
    return {
      name: partyName,
      job: job,
      group: group,
      index: index,
      priority: myDmuDefaultJobOrder.indexOf(job),
    };
  }).filter((entry) => entry.group === 'tank' || entry.group === 'healer' || entry.group === 'dps');

  entries.sort((left, right) => {
    const leftPriority = left.priority < 0 ? 999 : left.priority;
    const rightPriority = right.priority < 0 ? 999 : right.priority;
    return leftPriority - rightPriority || left.index - right.index;
  });

  const nextIndex = { tank: 0, healer: 0, dps: 0 };
  const roles = {
    tank: ['MT', 'ST'],
    healer: ['H1', 'H2'],
    dps: ['D1', 'D2', 'D3', 'D4'],
  };
  const roleByName = {};
  for (const entry of entries) {
    const role = roles[entry.group][nextIndex[entry.group]];
    nextIndex[entry.group]++;
    if (role !== undefined)
      roleByName[entry.name] = role;
  }
  return roleByName[name];
};

const myDmuGetRpByName = (data, name) =>
  myDmuNormalizeRp(myDmuFl(data)?.getRpByName?.(data, name)) ?? myDmuDefaultRpByName(data, name);

const myDmuGetStrictRpByActor = (data, actorId, name) => {
  const fl = myDmuFl(data);
  return myDmuNormalizeRp(fl?.getRpByHexId?.(data, actorId)) ??
    myDmuNormalizeRp(fl?.getRpByName?.(data, name));
};

const myDmuGetHexIdByName = (data, name) => {
  const fl = myDmuFl(data);
  return fl?.getHexIdByName?.(data, name) ?? fl?.getHexIdByRp?.(data, myDmuGetRpByName(data, name));
};

const myDmuP1IsGraven3 = (data) => data.myDmuP1Stage === 'graven3' || data.myDmuP1GravenCount >= 3;

const myDmuP1RecordFakeHeadmarker = (data, id) => {
  switch (myDmuNormalizeHeadmarkerId(id)) {
    case myDmuP1Headmarkers.fakeFire:
      data.myDmuP1Fake.fire = true;
      return true;
    case myDmuP1Headmarkers.trueFire:
      data.myDmuP1Fake.fire = false;
      return true;
    case myDmuP1Headmarkers.fakeIce:
      data.myDmuP1Fake.ice = true;
      return true;
    case myDmuP1Headmarkers.trueIce:
      data.myDmuP1Fake.ice = false;
      return true;
    case myDmuP1Headmarkers.fakeThunder:
      data.myDmuP1Fake.thunder = true;
      return true;
    case myDmuP1Headmarkers.trueThunder:
      data.myDmuP1Fake.thunder = false;
      return true;
    default:
      return false;
  }
};

const myDmuP1HeadmarkerText = (data, id) => {
  const marker = myDmuNormalizeHeadmarkerId(id);
  const isStackMarker = marker === myDmuP1Headmarkers.stack;
  const isSpreadMarker = marker === myDmuP1Headmarkers.spread;
  if (!isStackMarker && !isSpreadMarker)
    return undefined;

  const shouldStack = (!data.myDmuP1Fake.fire && isStackMarker) || (data.myDmuP1Fake.fire && isSpreadMarker);
  if (!myDmuP1IsGraven3(data))
    return shouldStack ? '分摊' : '分散';
  const action = shouldStack ? '集合' : '分散';
  return `${data.myDmuP1Fake.thunder ? '危险区' : '安全区'}+${action}`;
};

const myDmuP1RecordUniqueName = (list, name) => {
  if (name === undefined || list.includes(name))
    return;
  list.push(name);
};

const myDmuP1PoisonEntries = (data) =>
  data.myDmuP1PoisonTargets
    .map((name) => ({
      id: data.myDmuP1PoisonTargetIds?.[name] ?? myDmuGetHexIdByName(data, name),
      name: name,
      role: myDmuGetRpByName(data, name),
    }))
    .filter((entry) => entry.id !== undefined)
    .sort((left, right) => myDmuRolePriority(left.role) - myDmuRolePriority(right.role));

const myDmuApplyP1PoisonMarkers = (data, force = false) => {
  if (!myDmuMarkEnabled(data, 'MyDMU_P1PoisonMarkV3'))
    return false;

  const desired = myDmuP1PoisonEntries(data)
    .slice(0, 2)
    .map((entry, index) => ({
      id: entry.id,
      marker: myDmuP1PoisonMarkers[index],
    }));
  if (desired.length < 2)
    return false;

  const signature = desired.map((item) => `${item.id}:${item.marker}`).join('|');
  if (!force && data.myDmuP1PoisonMarkerSignature === signature)
    return true;

  return myDmuAfterOutput(data, myDmuMarkQueue(
    data,
    desired,
    '绝妖星 P1 5078锁链',
    'MyDMU_P1PoisonMarkV3',
  ), () => {
    data.myDmuP1PoisonMarkerSignature = signature;
    return true;
  });
};

const myDmuP1CombatantPosX = (combatants, sourceId) => {
  const id = Number.parseInt(sourceId, 16);
  if (!Number.isFinite(id))
    return undefined;
  return combatants.find((combatant) => combatant.ID === id)?.PosX;
};

const myDmuMarkActorKey = (actorId) => typeof actorId === 'string' ? actorId.toUpperCase() : `${actorId}`;

const myDmuNewMarkState = () => ({ markers: {}, actors: {}, owners: {}, localOnly: {} });

const myDmuEnsureMarkState = (data) => {
  data.myDmuMarkState ??= {};
  data.myDmuMarkState.markers ??= {};
  data.myDmuMarkState.actors ??= {};
  data.myDmuMarkState.owners ??= {};
  data.myDmuMarkState.localOnly ??= {};
  return data.myDmuMarkState;
};

const myDmuSnapshotMarkState = (data) => {
  const state = myDmuEnsureMarkState(data);
  return {
    markers: { ...state.markers },
    actors: { ...state.actors },
    owners: { ...state.owners },
    localOnly: { ...state.localOnly },
  };
};

const myDmuChangedMarks = (data, marks, ownerKey, localOnly) => {
  const state = myDmuEnsureMarkState(data);
  const nextMarkers = { ...state.markers };
  const nextActors = { ...state.actors };
  const nextOwners = { ...state.owners };
  const nextLocalOnly = { ...state.localOnly };
  const changed = [];
  for (const mark of marks) {
    const actorKey = myDmuMarkActorKey(mark.id);
    const currentMarkerActor = nextMarkers[mark.marker];
    const currentActorMarker = nextActors[actorKey];
    if (currentMarkerActor === actorKey && currentActorMarker === mark.marker) {
      if (ownerKey !== undefined)
        nextOwners[actorKey] = ownerKey;
      continue;
    }
    changed.push(mark);
    if (currentActorMarker !== undefined && currentActorMarker !== mark.marker)
      delete nextMarkers[currentActorMarker];
    if (currentMarkerActor !== undefined && currentMarkerActor !== actorKey) {
      delete nextActors[currentMarkerActor];
      delete nextOwners[currentMarkerActor];
      delete nextLocalOnly[currentMarkerActor];
    }
    nextMarkers[mark.marker] = actorKey;
    nextActors[actorKey] = mark.marker;
    if (ownerKey === undefined)
      delete nextOwners[actorKey];
    else
      nextOwners[actorKey] = ownerKey;
    nextLocalOnly[actorKey] = localOnly;
  }
  data.myDmuMarkState = {
    markers: nextMarkers,
    actors: nextActors,
    owners: nextOwners,
    localOnly: nextLocalOnly,
  };
  return changed;
};

const myDmuSendQueueActions = (data, queue, note) => {
  const fl = myDmuFl(data);
  if (fl?.doQueueActions !== undefined) {
    return fl.doQueueActions(queue, note);
  }
  return callOverlayHandler({
    call: 'PostNamazu',
    c: 'DoQueueActions',
    p: JSON.stringify(queue.map((item) => {
      if (item.c !== 'mark')
        return item;
      const payload = typeof item.p === 'string' ? JSON.parse(item.p) : item.p;
      return {
        ...item,
        p: JSON.stringify({
          ...payload,
          ActorID: typeof payload.ActorID === 'string' ? Number.parseInt(payload.ActorID, 16) : payload.ActorID,
        }),
      };
    })),
  });
};

const myDmuValidMarkItem = (item) =>
  item?.id !== undefined && item.id !== null && `${item.id}`.length > 0 &&
  item?.marker !== undefined && item.marker !== null && `${item.marker}`.length > 0;

const myDmuRunMarkOperation = (data, note, action) => {
  const lifecycle = myDmuTaskLifecycleState(data) ?? data;
  const output = lifecycle.markOutput ??= {};
  if (data.myDmuMarkDeliveryUnknown !== undefined)
    return false;
  if (output.pending !== undefined)
    return myDmuAfterOutput(data, output.pending, () => myDmuRunMarkOperation(data, note, action));
  const previous = myDmuSnapshotMarkState(data);
  let result;
  try {
    result = action();
  } catch (error) {
    data.myDmuMarkState = previous;
    throw error;
  }
  if (typeof result?.then !== 'function') {
    if (result === false)
      data.myDmuMarkState = previous;
    return result !== false;
  }
  const fence = myDmuCaptureTaskFence(data);
  const intended = myDmuSnapshotMarkState(data);
  const pending = Promise.resolve(result).then(
    (accepted) => {
      if (!myDmuTaskFenceCurrent(data, fence))
        return false;
      if (accepted === false)
        data.myDmuMarkState = previous;
      return accepted !== false;
    },
    (error) => {
      if (myDmuTaskFenceCurrent(data, fence)) {
        data.myDmuMarkState = previous;
        // A transport error cannot prove whether the toggle reached the game.
        // Keep the attempted state for diagnosis and never blindly replay it.
        output.uncertain = { note, intended, error: `${error}` };
        data.myDmuMarkDeliveryUnknown = output.uncertain;
        myDmuActLog('标点发送结果未知，本次战斗停止后续标点', output.uncertain);
      }
      return false;
    },
  ).finally(() => {
    if (output.pending === pending)
      delete output.pending;
  });
  output.pending = pending;
  return pending;
};

const myDmuMarkQueue = (data, items, note, ownerKey) => {
  return myDmuRunMarkOperation(data, note, () => {
    if (!myDmuRoleOverlayConnected(data))
      return false;
    if (ownerKey !== undefined && !myDmuMarkConfigured(data, ownerKey))
      return false;
    const validMarks = items.filter(myDmuValidMarkItem);
    if (validMarks.length === 0)
      return false;
    const localOnly = myDmuMarkLocalOnly(data);
    const marks = myDmuChangedMarks(data, validMarks, ownerKey, localOnly);
    if (marks.length === 0)
      return true;

    const queue = marks.map((item) => ({
      c: 'mark',
      p: {
        ActorID: item.id,
        MarkType: item.marker,
        LocalOnly: localOnly,
      },
      d: 0,
    }));
    return myDmuSendQueueActions(data, queue, note);
  });
};

const myDmuForgetMarkState = (data, items) => {
  const state = myDmuEnsureMarkState(data);
  const nextMarkers = { ...state.markers };
  const nextActors = { ...state.actors };
  const nextOwners = { ...state.owners };
  const nextLocalOnly = { ...state.localOnly };
  for (const item of items) {
    if (!myDmuValidMarkItem(item))
      continue;
    const actorKey = myDmuMarkActorKey(item.id);
    if (nextActors[actorKey] === item.marker) {
      delete nextActors[actorKey];
      delete nextOwners[actorKey];
      delete nextLocalOnly[actorKey];
    }
    if (nextMarkers[item.marker] === actorKey)
      delete nextMarkers[item.marker];
  }
  data.myDmuMarkState = {
    markers: nextMarkers,
    actors: nextActors,
    owners: nextOwners,
    localOnly: nextLocalOnly,
  };
};

const myDmuClearMarkQueue = (data, items, note) => {
  return myDmuRunMarkOperation(data, note, () => {
    const state = myDmuEnsureMarkState(data);
    const marks = items.filter(myDmuValidMarkItem).map((item) => ({
      ...item,
      localOnly: typeof item.localOnly === 'boolean' ? item.localOnly
        : state.localOnly[myDmuMarkActorKey(item.id)] ?? myDmuMarkLocalOnly(data),
    }));
    if (marks.length === 0)
      return false;

    myDmuForgetMarkState(data, marks);
    const queue = marks.map((item) => ({
      c: 'mark',
      p: {
        ActorID: item.id,
        MarkType: item.marker,
        LocalOnly: item.localOnly,
      },
      d: 0,
    }));
    return myDmuSendQueueActions(data, queue, note);
  });
};

const myDmuOwnedMarkItems = (data, ownerKeys) => {
  const state = myDmuEnsureMarkState(data);
  const selectedOwners = ownerKeys === undefined ? undefined : new Set(ownerKeys);
  return Object.entries(state.actors).flatMap(([actorKey, marker]) => {
    const ownerKey = state.owners[actorKey];
    if ((selectedOwners !== undefined &&
          (ownerKey === undefined || !selectedOwners.has(ownerKey))) ||
        state.markers[marker] !== actorKey)
      return [];
    return [{ id: actorKey, marker: marker, localOnly: state.localOnly[actorKey] }];
  });
};

const myDmuClearOwnedMarks = (data, ownerKeys, note) => {
  const owned = myDmuOwnedMarkItems(data, ownerKeys);
  if (owned.length === 0)
    return false;
  return myDmuClearMarkQueue(data, owned, note);
};

const myDmuConfigStateBoolean = (value) =>
  value === true || value === 'true' || value === '开' || value === '本地';

const myDmuConfigStateHas = (config, key) =>
  Object.prototype.hasOwnProperty.call(config, key);

const myDmuHandleMarkConfigChanged = (event) => {
  const data = myDmuTaskLifecycleRegistry.currentData;
  const config = event?.state?.config;
  if (data === undefined || config === null || typeof config !== 'object')
    return false;
  if (myDmuFl(data)?.isEncounterStateCurrent?.(event.state) === false)
    return false;

  if (myDmuConfigStateHas(config, 'MyDMU_AutoMarkV5') &&
      !myDmuConfigStateBoolean(config.MyDMU_AutoMarkV5)) {
    return myDmuClearOwnedMarks(
      data,
      undefined,
      '绝妖星 配置关闭 MyDMU_AutoMarkV5',
    );
  }

  const disabledOwners = myDmuMarkConfigKeys.filter((key) =>
    myDmuConfigStateHas(config, key) && !myDmuConfigStateBoolean(config[key]));
  if (disabledOwners.length > 0) {
    myDmuClearOwnedMarks(
      data,
      disabledOwners,
      `绝妖星 配置关闭 ${disabledOwners.join(',')}`,
    );
  }

  const autoMarkEnabled = myDmuConfigStateHas(config, 'MyDMU_AutoMarkV5')
    ? myDmuConfigStateBoolean(config.MyDMU_AutoMarkV5)
    : myDmuAutoMarkEnabled(data);
  const p4MarkEnabled = myDmuConfigStateHas(config, 'MyDMU_P4BuffMarkV3')
    ? myDmuConfigStateBoolean(config.MyDMU_P4BuffMarkV3)
    : myDmuBooleanConfig(data, 'MyDMU_P4BuffMarkV3', false);
  if (data.myDmuPhase !== 'p4' || !autoMarkEnabled || !p4MarkEnabled)
    return false;
  return myDmuRetryAction(data, 'p4-mark-timing', () =>
    myDmuProcessP4MarkTiming(data, 'config-enabled'), 12, 250);
};

const myDmuClearMarks = (data) => {
  const owned = myDmuOwnedMarkItems(data);
  if (owned.length > 0) {
    return myDmuClearMarkQueue(data, owned, '绝妖星 清理已有 String 标点');
  }
  data.myDmuMarkState = myDmuNewMarkState();
  if (!myDmuAnyMarkEnabled(data))
    return;
  const fl = myDmuFl(data);
  if (fl?.clearMark !== undefined) {
    return myDmuRunMarkOperation(data, '清理旧标记', () => fl.clearMark(myDmuMarkLocalOnly(data)));
  }
  return myDmuRunMarkOperation(data, '清理旧标记', () => callOverlayHandler({
    call: 'PostNamazu',
    c: 'DoQueueActions',
    p: JSON.stringify([
      { c: 'DoTextCommand', p: '/mk off <1>' },
      { c: 'DoTextCommand', p: '/mk off <2>' },
      { c: 'DoTextCommand', p: '/mk off <3>' },
      { c: 'DoTextCommand', p: '/mk off <4>' },
      { c: 'DoTextCommand', p: '/mk off <5>' },
      { c: 'DoTextCommand', p: '/mk off <6>' },
      { c: 'DoTextCommand', p: '/mk off <7>' },
      { c: 'DoTextCommand', p: '/mk off <8>' },
    ]),
  }));
};

const myDmuCancelScheduledClearMarks = (data, key) => {
  myDmuCancelOwnedTask(data, `marks:clear:${key}`);
  delete data.myDmuClearMarkTimers?.[key];
};

const myDmuScheduleClearMarks = (data, key, delaySeconds = 0.5, condition = () => true) => {
  data.myDmuClearMarkTimers ??= {};
  myDmuCancelScheduledClearMarks(data, key);
  data.myDmuClearMarkTimers[key] = myDmuScheduleOwnedTask(
    data,
    `marks:clear:${key}`,
    delaySeconds * 1000,
    () => {
      delete data.myDmuClearMarkTimers?.[key];
      if (condition(data))
        myDmuClearMarks(data);
    },
  );
};

const myDmuResetP1 = (data) => {
  data.myDmuSpeech = {};
  data.myDmuMarkState = myDmuNewMarkState();
  data.myDmuP1GravenCount = 0;
  data.myDmuP1Stage = 'opening';
  data.myDmuP1Fake = { fire: false, ice: false, thunder: false };
  data.myDmuP1Tethers = [];
  data.myDmuP1PoisonTargets = [];
  data.myDmuP1PoisonTargetIds = {};
  data.myDmuP1PoisonDurations = {};
  data.myDmuP1PoisonMarkerSignature = undefined;
  data.myDmuP1WaveCannonTargets = [];
  data.myDmuP1PlaceRock = false;
  data.myDmuP1FirstTethered = false;
  data.myDmuP1Arrow = [];
  data.myDmuP1Graven3Tethers = [];
  data.myDmuP1Combatants = [];
  data.myDmuP1Graven2TetherCount = 1;
  data.myDmuP1Graven2SourceX = undefined;
};

const myDmuResetP2 = (data) => {
  myDmuCancelOwnedTask(data, 'p2:round-8');
  data.myDmuP2Round8Timer = undefined;
  data.myDmuP2Initial = {};
  data.myDmuP2Current = {};
  data.myDmuP2GroupA = [];
  data.myDmuP2GroupB = [];
  data.myDmuP2InitialSlots = { A: [], B: [] };
  data.myDmuP2PointSlots = {};
  data.myDmuP2GroupMismatches = {};
  data.myDmuP2CalloutShown = {};
  data.myDmuP2InitialLocked = false;
  data.myDmuP2AppliedRounds = {};
  data.myDmuP2AppliedRoundSignatures = {};
  data.myDmuP2RoundSeen = {};
  data.myDmuP2Round = 0;
  data.myDmuP2AbilityRound = 0;
  data.myDmuP2Round8Timer = undefined;
  data.myDmuP2BuffCounts = {};
  data.myDmuP2FuturePastCount = 0;
  data.myDmuP2AllThingsEndingCalloutCount = 0;
  data.myDmuP2CombatantPositions = {};
  data.myDmuP2TowerRoundCount = 0;
  data.myDmuP2TowerCurrentRound = undefined;
  data.myDmuP2TowerLastAt = undefined;
  data.myDmuP2TowerRounds = {};
  data.myDmuP2TowerAbilityRoundCount = 0;
  data.myDmuP2TowerAbilityCurrentRound = undefined;
  data.myDmuP2TowerAbilityLastAt = undefined;
  data.myDmuP2TowerAbilityRounds = {};
  data.myDmuP2TowerFallbackLogs = {};
  data.myDmuP2TowerDecisionLogs = {};
};

const myDmuResetP3Mahjong = (data) => {
  data.myDmuP3Mahjong = {
    markers: {},
    lines: [],
    lineSources: {},
    earlyShockwaveSeen: false,
    plan: undefined,
    marked: false,
    calloutShown: false,
    resolveCount: 0,
    resolvedTargetIds: {},
  };
};

const myDmuResetP3Targets = (data) => {
  data.myDmuP3Targets = {
    first: [],
    second: [],
    third: [],
    marked: false,
  };
};

const myDmuCancelP4Timers = (data) => {
  for (const key of Object.keys(data.myDmuP4?.markTimers ?? {}))
    myDmuCancelOwnedTask(data, `p4:timer:${key}`);
  if (data.myDmuP4 !== undefined)
    data.myDmuP4.markTimers = {};
};

const myDmuResetP4 = (data) => {
  myDmuCancelP4Timers(data);
  data.myDmuP4 = {
    truth: { ex: undefined, chaos: undefined },
    truthAt: { ex: undefined, chaos: undefined },
    truthEvents: { ex: [], chaos: [] },
    buffs: {},
    buffRecords: [],
    buffChatSent: {},
    buffSerial: 0,
    elementMarked: {},
    elementCleared: {},
    petrifyMarked: {},
    petrifyCleared: {},
    markAssignments: {},
    markActorKinds: {},
    markActorMarkers: {},
    markAppliedAt: {},
    markTimers: {},
    mandarinDuck: {},
    lateSpell: {},
    magicStorage: myDmuNewP4MagicStorage(),
    flutteringUltimateCount: 0,
  };
};

const myDmuResetP5 = (data) => {
  data.myDmuP5 = {
    mitigationSent: {},
    scholarShieldCount: 0,
    symphonyCrowdTargets: [],
    symphonyCrowdLastSize: 0,
    floods: [],
    trioBuffs: [],
    trioTowers: [],
    trioLitTowers: [],
    trioPending: [],
    trioCount: 0,
    trioIdle: false,
    trioFirstAnnounced: false,
    magicHitCount: 0,
    softEnrageStep: 0,
  };
};

const myDmuResetAll = (data) => {
  myDmuResetP1(data);
  myDmuResetP2(data);
  myDmuResetP3Mahjong(data);
  myDmuResetP3Targets(data);
  myDmuResetP4(data);
  myDmuResetP5(data);
};

const myDmuInitState = () => {
  const previous = myDmuTaskLifecycleRegistry.currentData;
  if (previous !== undefined)
    myDmuBeginLifecycleCleanup(previous, 'pull-replaced');
  const data = {
    myDmuPhase: 'p1',
    myDmuSpeech: {},
    myDmuMarkState: myDmuNewMarkState(),
    myDmuP1GravenCount: 0,
    myDmuP1Stage: 'opening',
    myDmuP1Fake: { fire: false, ice: false, thunder: false },
    myDmuP1Tethers: [],
    myDmuP1PoisonTargets: [],
    myDmuP1PoisonTargetIds: {},
    myDmuP1PoisonDurations: {},
    myDmuP1PoisonMarkerSignature: undefined,
    myDmuP1WaveCannonTargets: [],
    myDmuP1PlaceRock: false,
    myDmuP1FirstTethered: false,
    myDmuP1Arrow: [],
    myDmuP1Graven3Tethers: [],
    myDmuP1Combatants: [],
    myDmuP1Graven2TetherCount: 1,
    myDmuP1Graven2SourceX: undefined,
    myDmuP2Initial: {},
    myDmuP2Current: {},
    myDmuP2GroupA: [],
    myDmuP2GroupB: [],
    myDmuP2InitialSlots: { A: [], B: [] },
    myDmuP2PointSlots: {},
    myDmuP2GroupMismatches: {},
    myDmuP2CalloutShown: {},
    myDmuP2InitialLocked: false,
    myDmuP2AppliedRounds: {},
    myDmuP2AppliedRoundSignatures: {},
    myDmuP2RoundSeen: {},
    myDmuP2Round: 0,
    myDmuP2AbilityRound: 0,
    myDmuP2Round8Timer: undefined,
    myDmuP2BuffCounts: {},
    myDmuP2FuturePastCount: 0,
    myDmuP2AllThingsEndingCalloutCount: 0,
    myDmuP2CombatantPositions: {},
    myDmuP2TowerRoundCount: 0,
    myDmuP2TowerCurrentRound: undefined,
    myDmuP2TowerLastAt: undefined,
    myDmuP2TowerRounds: {},
    myDmuP2TowerAbilityRoundCount: 0,
    myDmuP2TowerAbilityCurrentRound: undefined,
    myDmuP2TowerAbilityLastAt: undefined,
    myDmuP2TowerAbilityRounds: {},
    myDmuP2TowerFallbackLogs: {},
    myDmuP2TowerDecisionLogs: {},
    myDmuP3Mahjong: {
      markers: {},
      lines: [],
      lineSources: {},
      earlyShockwaveSeen: false,
      plan: undefined,
      marked: false,
      calloutShown: false,
      resolveCount: 0,
      resolvedTargetIds: {},
    },
    myDmuP3Targets: {
      first: [],
      second: [],
      third: [],
      marked: false,
    },
    myDmuP4: {
      truth: { ex: undefined, chaos: undefined },
      truthAt: { ex: undefined, chaos: undefined },
      truthEvents: { ex: [], chaos: [] },
      buffs: {},
      buffRecords: [],
      buffChatSent: {},
      buffSerial: 0,
      elementMarked: {},
      elementCleared: {},
      petrifyMarked: {},
      petrifyCleared: {},
      markAssignments: {},
      markActorKinds: {},
      markActorMarkers: {},
      markAppliedAt: {},
      markTimers: {},
      mandarinDuck: {},
      lateSpell: {},
      flutteringUltimateCount: 0,
    },
  };
  myDmuStartTaskGeneration(data, 'pull-init');
  myDmuRegisterLifecycleListeners();
  return data;
};

const myDmuP2EntryFromHeadmarker = (data, matches, mechanic) => {
  const role = myDmuGetRpByName(data, matches.target);
  const pos = myDmuP2CombatantPosition(data, matches.targetId);
  return {
    id: matches.targetId,
    name: matches.target,
    role: role,
    group: myDmuRoleGroup(role),
    mechanic: mechanic,
    x: pos?.x,
    z: pos?.z,
    seenAt: Date.now(),
  };
};

const myDmuP2ActorKey = (actorId) => typeof actorId === 'string' ? actorId.toUpperCase() : `${actorId}`;

const myDmuP2CombatantPoint = (combatant) => {
  const x = Number(combatant?.PosX);
  const z = Number(combatant?.PosY ?? combatant?.PosZ);
  if (!Number.isFinite(x) || !Number.isFinite(z))
    return undefined;
  return { x, z };
};

const myDmuP2RecordAbilityPosition = (data, matches) => {
  const x = Number(matches.targetX);
  const z = Number(matches.targetY);
  let recorded = false;
  if (matches.targetId !== undefined && Number.isFinite(x) && Number.isFinite(z)) {
    data.myDmuP2CombatantPositions ??= {};
    data.myDmuP2CombatantPositions[myDmuP2ActorKey(matches.targetId)] = { x, z };
    recorded = true;
  }
  return myDmuP2RecordTowerAbilityPosition(data, matches) || recorded;
};

const myDmuP2RememberCombatantPosition = async (data, targetId) => {
  if (targetId === undefined)
    return;

  const id = Number.parseInt(targetId, 16);
  if (!Number.isFinite(id))
    return;

  const taskFence = myDmuCaptureTaskFence(data);
  try {
    const combatants = await myDmuQueryCombatants(data, [id], 'p2.tower-position');
    if (!myDmuTaskFenceCurrent(data, taskFence))
      return;
    const pos = myDmuP2CombatantPoint(combatants[0]);
    if (pos === undefined)
      return;
    data.myDmuP2CombatantPositions ??= {};
    data.myDmuP2CombatantPositions[myDmuP2ActorKey(targetId)] = pos;
  } catch (err) {
    if (!myDmuTaskFenceCurrent(data, taskFence))
      return;
    console.log(`[String][P2TowerLR] fallback reason=getCombatants-failed target=${targetId} error=${err}`);
  }
};

const myDmuP2CombatantPosition = (data, targetId) => {
  if (targetId === undefined)
    return undefined;
  return data.myDmuP2CombatantPositions?.[myDmuP2ActorKey(targetId)];
};

const myDmuP2TowerLocationKey = (location) => {
  const value = Number.parseInt(location, 16);
  if (!Number.isInteger(value) || value < 1 || value > 8)
    return undefined;
  return value.toString(16).toUpperCase().padStart(2, '0');
};

const myDmuP2TowerRoundPoints = (data, round) => {
  const mapEffectPoints = data.myDmuP2TowerRounds?.[round]?.points;
  if (Array.isArray(mapEffectPoints) && mapEffectPoints.length >= 2)
    return mapEffectPoints;
  const abilityPoints = data.myDmuP2TowerAbilityRounds?.[round]?.points;
  return Array.isArray(abilityPoints) && abilityPoints.length >= 2 ? abilityPoints : undefined;
};

const myDmuP2TowerRoundSource = (data, round) =>
  (data.myDmuP2TowerRounds?.[round]?.points?.length ?? 0) >= 2 ? 'map-effect' :
    (data.myDmuP2TowerAbilityRounds?.[round]?.points?.length ?? 0) >= 2 ? 'ability' : 'missing';

const myDmuP2TowerPointFromAbility = (matches) => {
  const x = Number(matches.x);
  const z = Number(matches.y);
  if (!Number.isFinite(x) || !Number.isFinite(z))
    return undefined;

  let nearest;
  let nearestDistanceSquared = Number.POSITIVE_INFINITY;
  for (const [location, point] of Object.entries(myDmuP2TowerPoints)) {
    const distanceSquared = (point.x - x) ** 2 + (point.z - z) ** 2;
    if (distanceSquared >= nearestDistanceSquared)
      continue;
    nearest = { ...point, location };
    nearestDistanceSquared = distanceSquared;
  }
  // BABE 的来源实体应位于八个固定塔点；偏离过大时拒绝把异常坐标当成塔位。
  return nearestDistanceSquared <= 0.25 ? nearest : undefined;
};

const myDmuP2RetryFromTowerRound = (data, round, reason) => {
  if (round === 1 && myDmuP2RoundReadyForMapRetry(data, 1))
    myDmuApplyP2Round(data, 1);
  const targetRound = round + 1;
  if (targetRound > 8 || !myDmuP2RoundReadyForMapRetry(data, targetRound))
    return;
  myDmuP2RecordPointSlots(data, targetRound);
  myDmuApplyP2Round(data, targetRound);
};

const myDmuP2RecordTowerAbilityPosition = (data, matches) => {
  const point = myDmuP2TowerPointFromAbility(matches);
  const sourceId = myDmuNormalizeActorId(matches.sourceId);
  if (point === undefined || sourceId === undefined)
    return false;

  const now = myDmuEventMilliseconds(matches);
  data.myDmuP2TowerAbilityRounds ??= {};
  let round = data.myDmuP2TowerAbilityCurrentRound;
  let current = round === undefined ? undefined : data.myDmuP2TowerAbilityRounds[round];
  if (
    current === undefined ||
    (data.myDmuP2TowerAbilityLastAt !== undefined && now - data.myDmuP2TowerAbilityLastAt > 1500)
  ) {
    round = (data.myDmuP2TowerAbilityRoundCount ?? 0) + 1;
    if (round > 8)
      return false;
    data.myDmuP2TowerAbilityRoundCount = round;
    data.myDmuP2TowerAbilityCurrentRound = round;
    current = { round, startedAt: now, bySourceId: {}, byLocation: {}, points: [] };
    data.myDmuP2TowerAbilityRounds[round] = current;
  }
  data.myDmuP2TowerAbilityLastAt = now;

  if (current.bySourceId[sourceId] !== undefined)
    return true;
  current.bySourceId[sourceId] = point.location;
  if (current.byLocation[point.location] !== undefined)
    return true;
  current.byLocation[point.location] = point;
  current.points.push(point);
  current.points.sort((left, right) => left.index - right.index);

  if (current.points.length === 2)
    myDmuP2RetryFromTowerRound(data, round, 'round-8-ability-positions');
  return true;
};

const myDmuP2LogFallback = (data, round, reason) => {
  data.myDmuP2TowerFallbackLogs ??= {};
  const key = `${round}:${reason}`;
  if (data.myDmuP2TowerFallbackLogs[key] === true)
    return;
  data.myDmuP2TowerFallbackLogs[key] = true;
  console.log(`[String][P2TowerLR] fallback round=${round} reason=${reason}`);
};

const myDmuP2LogDecision = (data, round, mode) => {
  data.myDmuP2TowerDecisionLogs ??= {};
  const key = `${round}:${mode}`;
  if (data.myDmuP2TowerDecisionLogs[key] === true)
    return;
  data.myDmuP2TowerDecisionLogs[key] = true;
  const sourceRound = Math.max(1, round - 1);
  console.log(
    `[String][P2TowerLR] round=${round} mode=${mode} sourceRound=${sourceRound} ` +
    `towerSource=${myDmuP2TowerRoundSource(data, sourceRound)} ` +
    `towers=${myDmuP2TowerPointSummary(data, sourceRound)}`,
  );
};

const myDmuP2RoundReadyForMapRetry = (data, round) => {
  if (round === 1)
    return data.myDmuP2InitialLocked === true;
  return Object.keys(data.myDmuP2RoundSeen?.[round] ?? {}).length >= 4;
};

const myDmuP2RecordTowerMapEffect = (data, matches) => {
  if (matches.flags !== myDmuP2TowerMapEffectFlags)
    return false;

  const location = myDmuP2TowerLocationKey(matches.location);
  const base = location === undefined ? undefined : myDmuP2TowerPoints[location];
  if (base === undefined)
    return false;

  const now = myDmuEventMilliseconds(matches);
  data.myDmuP2TowerRounds ??= {};
  let round = data.myDmuP2TowerCurrentRound;
  let current = round === undefined ? undefined : data.myDmuP2TowerRounds[round];
  if (
    current === undefined ||
    (data.myDmuP2TowerLastAt !== undefined && now - data.myDmuP2TowerLastAt > 1500) ||
    (current.points?.length ?? 0) >= 2
  ) {
    round = (data.myDmuP2TowerRoundCount ?? 0) + 1;
    data.myDmuP2TowerRoundCount = round;
    data.myDmuP2TowerCurrentRound = round;
    current = { round, startedAt: now, byLocation: {}, points: [] };
    data.myDmuP2TowerRounds[round] = current;
  }
  data.myDmuP2TowerLastAt = now;

  if (current.byLocation[location] !== undefined)
    return true;

  current.byLocation[location] = { ...base, location };
  current.points.push(current.byLocation[location]);
  current.points.sort((left, right) => left.index - right.index);

  if (current.points.length >= 2)
    myDmuP2RetryFromTowerRound(data, round, 'round-8-map-effects');
  return true;
};

const myDmuP2Pair2222IdleOddMode = (data) => myDmuP1P2EnumConfig(
  data,
  'MyDMU_P2Pair2222IdleOddMode',
  myDmuP2Pair2222IdleOddModes.role,
  Object.values(myDmuP2Pair2222IdleOddModes),
);

const myDmuP2OddStrategy = (data) => myDmuP1P2EnumConfig(
  data,
  'MyDMU_P2OddStrategy',
  myDmuP2OddStrategies.original,
  Object.values(myDmuP2OddStrategies),
);

const myDmuP2RoleSort = (entries, order = myDmuRoleOrder) =>
  [...entries].sort((a, b) => myDmuRolePriority(a.role, order) - myDmuRolePriority(b.role, order));

const myDmuP2IsTH = (role) => ['MT', 'ST', 'H1', 'H2'].includes(role);

const myDmuP2ConeFirstSlots = (entries) => {
  if (entries.length !== 4)
    return undefined;
  const cones = entries.filter((entry) => entry.mechanic === 'cone');
  const others = entries.filter((entry) => entry.mechanic !== 'cone');
  if (cones.length !== 2 || others.length !== 2)
    return undefined;
  return [...cones, ...others];
};

const myDmuP2OrderIdleSlots = (data, round, entries) => {
  if (entries.length !== 4)
    return [];

  const mode = myDmuP2Pair2222IdleOddMode(data);
  if (mode === undefined)
    return [];
  if (mode === myDmuP2Pair2222IdleOddModes.cone) {
    const coneEntries = myDmuP2ARounds.has(round)
      ? entries.map((entry) => data.myDmuP2Initial?.[entry.id] ?? entry)
      : entries;
    return myDmuP2ConeFirstSlots(coneEntries) ?? [];
  }
  const left = myDmuP2RoleSort(entries.filter((entry) => myDmuP2IsTH(entry.role)),
    myDmuP2Pair2222IdleOrder);
  const right = myDmuP2RoleSort(entries.filter((entry) => !myDmuP2IsTH(entry.role)),
    myDmuP2Pair2222IdleOrder);
  if (left.length + right.length !== 4)
    return [];
  return [...left, ...right];
};

const myDmuEnsureP2Pair2222Groups = (data, entries) => {
  const entriesByRole = Object.fromEntries(entries.map((entry) => [entry.role, entry]));
  const pairGroups = myDmuP2Pair2222Groups.map((roles) => roles.map((role) => entriesByRole[role]));
  if (pairGroups.some((pair) => pair.some((entry) => entry === undefined)))
    return false;

  const stackPairs = pairGroups.filter((pair) => pair.some((entry) => entry.mechanic === 'stack'));
  if (stackPairs.length !== 2)
    return false;

  const groupA = stackPairs.flat();
  const groupAIds = new Set(groupA.map((entry) => entry.id));
  data.myDmuP2GroupA = myDmuP2RoleSort(groupA);
  data.myDmuP2GroupB = myDmuP2RoleSort(entries.filter((entry) => !groupAIds.has(entry.id)));
  const slotsA = myDmuP2InitialActiveSlots(data, data.myDmuP2GroupA);
  const slotsB = myDmuP2InitialBSlots(data, data.myDmuP2GroupB);
  data.myDmuP2InitialSlots = {
    A: slotsA ?? [],
    B: slotsB ?? [],
  };
  data.myDmuP2InitialLocked = slotsA !== undefined && slotsB !== undefined;
  return data.myDmuP2InitialLocked;
};

const myDmuEnsureP2Groups = (data) => {
  if (data.myDmuP2InitialLocked)
    return true;

  const entries = Object.values(data.myDmuP2Initial ?? {});
  if (entries.length < 8 || entries.some((entry) => entry.role === undefined))
    return false;

  return myDmuEnsureP2Pair2222Groups(data, entries);
};

const myDmuP2RosterEntries = (data) => {
  if (!myDmuEnsureP2Groups(data))
    return undefined;
  const roster = [...data.myDmuP2GroupA, ...data.myDmuP2GroupB];
  const ids = roster.map((entry) => myDmuNormalizeActorId(entry.id));
  const roles = roster.map((entry) => entry.role);
  if (roster.length !== 8 || ids.some((id) => id === undefined) || new Set(ids).size !== 8 ||
      roles.some((role) => !myDmuRoleOrder.includes(role)) || new Set(roles).size !== 8)
    return undefined;
  return roster.map((entry) => data.myDmuP2Current?.[entry.id] ?? entry);
};

const myDmuP2HeadmarkerCandidateRound = (data) => {
  if ((data.myDmuP2Round ?? 0) <= 0)
    return 1;
  return Math.min(data.myDmuP2Round + 1, 8);
};

const myDmuP2RecordRoundHeadmarker = (data, round, id) => {
  if (round < 1 || round > 8 || id === undefined)
    return 0;
  data.myDmuP2RoundSeen[round] ??= {};
  data.myDmuP2RoundSeen[round][id] = true;
  return Object.keys(data.myDmuP2RoundSeen[round]).length;
};

const myDmuP2RecordAbilityRound = (data, matches) => {
  if (myDmuAcceptLogicalEvent(data, 'p2.tower:BABE', 1000, matches) === undefined)
    return undefined;
  const round = Math.min((data.myDmuP2AbilityRound ?? 0) + 1, 8);
  data.myDmuP2AbilityRound = round;
  data.myDmuP2Round = round;
  return round;
};

const myDmuP2PairRoles = (role) =>
  myDmuP2Pair2222Groups.find((roles) => roles.includes(role));

const myDmuP2InitialActiveSlots = (data, entries) => {
  const stacks = entries.filter((entry) => entry.mechanic === 'stack');
  if (entries.length !== 4 || stacks.length !== 2)
    return undefined;

  const mechanicPriority = { cone: 0, spread: 1 };
  const pairs = stacks.map((stack) => {
    const pairRoles = myDmuP2PairRoles(stack.role);
    const partner = entries.find((entry) =>
      entry.id !== stack.id && pairRoles?.includes(entry.role));
    return { stack, partner };
  });
  if (pairs.some(({ partner }) =>
    partner === undefined || mechanicPriority[partner.mechanic] === undefined) ||
      new Set(pairs.map(({ partner }) => partner.id)).size !== 2)
    return undefined;

  pairs.sort((left, right) =>
    mechanicPriority[left.partner.mechanic] - mechanicPriority[right.partner.mechanic] ||
    myDmuRolePriority(left.partner.role) - myDmuRolePriority(right.partner.role) ||
    myDmuRolePriority(left.stack.role) - myDmuRolePriority(right.stack.role));
  return [pairs[0].partner, pairs[1].partner, pairs[0].stack, pairs[1].stack];
};

const myDmuP2InitialBSlots = (data, entries) => {
  const mechanicPriority = { cone: 0, spread: 1 };
  if (entries.length !== 4 || entries.some((entry) =>
    entry.mechanic === 'stack' || mechanicPriority[entry.mechanic] === undefined))
    return undefined;
  const mode = myDmuP2Pair2222IdleOddMode(data);
  if (mode === undefined)
    return undefined;
  let group = myDmuP2RoleSort(entries);
  if (mode === myDmuP2Pair2222IdleOddModes.cone && group[0].mechanic !== 'cone')
    group = [group[2], group[3], group[0], group[1]];
  if (group[0].mechanic === 'spread' && mode === myDmuP2Pair2222IdleOddModes.cone)
    return [group[2], group[3], group[1], group[0]];
  return group[0].mechanic === 'spread'
    ? [group[3], group[2], group[0], group[1]]
    : [group[0], group[1], group[3], group[2]];
};

const myDmuP2TowerAxis = (data, round) => {
  const points = myDmuP2TowerRoundPoints(data, round);
  if (points === undefined || points.length < 2)
    return undefined;

  const [first, second] = points;
  if (
    !Number.isFinite(first?.x) ||
    !Number.isFinite(first?.z) ||
    !Number.isFinite(second?.x) ||
    !Number.isFinite(second?.z)
  )
    return undefined;

  const x = (first.x + second.x) / 2;
  const z = (first.z + second.z) / 2;
  const axisX = 100 - x;
  const axisZ = 100 - z;
  if (axisX * axisX + axisZ * axisZ < 0.0001)
    return undefined;
  return { x, z, axisX, axisZ };
};

const myDmuP2TowerSide = (entry, axis) => {
  const x = Number(entry?.x);
  const z = Number(entry?.z);
  if (!Number.isFinite(x) || !Number.isFinite(z))
    return undefined;
  return axis.axisX * (z - axis.z) - axis.axisZ * (x - axis.x);
};

const myDmuP2TowerPointSummary = (data, round) =>
  (myDmuP2TowerRoundPoints(data, round) ?? [])
    .map((point) => `${point.label}(${point.x.toFixed(3)},${point.z.toFixed(3)})`)
    .join('/');

const myDmuP2SortTowerPairByLeft = (data, round, entries, label) => {
  const axis = myDmuP2TowerAxis(data, Math.max(1, round - 1));
  if (axis === undefined) {
    myDmuP2LogFallback(data, round, `no-tower-${label}`);
    return undefined;
  }

  const sortable = [];
  for (const entry of entries) {
    const side = myDmuP2TowerSide(entry, axis);
    if (side === undefined) {
      myDmuP2LogFallback(data, round, `no-pos-${label}-${entry.role ?? entry.name ?? entry.id}`);
      return undefined;
    }
    sortable.push({ entry, side });
  }
  if (sortable.length !== 2)
    return undefined;

  if (Math.abs(sortable[0].side - sortable[1].side) <= 0.01) {
    myDmuP2LogFallback(data, round, `ambiguous-pos-${label}`);
    return undefined;
  }
  sortable.sort((left, right) => left.side - right.side);
  return sortable.map((item) => item.entry);
};

const myDmuP2PointEntries = (data, round) =>
  Object.keys(data.myDmuP2RoundSeen?.[round] ?? {})
    .map((id) => data.myDmuP2Current?.[id])
    .filter((entry) => entry !== undefined);

const myDmuP2BuildPointSlots = (data, round, entries) => {
  if (entries.length !== 4)
    return undefined;
  const cones = entries.filter((entry) => entry.mechanic === 'cone');
  const spreads = entries.filter((entry) => entry.mechanic === 'spread');
  const stacks = entries.filter((entry) => entry.mechanic === 'stack');
  if (round % 2 === 0) {
    if (cones.length !== 2 || spreads.length !== 2 || stacks.length !== 0)
      return undefined;
    const sortedCones = myDmuP2SortTowerPairByLeft(data, round, cones, 'cone');
    const sortedSpreads = myDmuP2SortTowerPairByLeft(data, round, spreads, 'spread');
    if (sortedCones === undefined || sortedSpreads === undefined)
      return undefined;
    myDmuP2LogDecision(data, round, 'even-cone-spread');
    return [...sortedCones, ...sortedSpreads];
  }

  if (cones.length !== 1 || spreads.length !== 1 || stacks.length !== 2)
    return undefined;
  const sortedStacks = myDmuP2SortTowerPairByLeft(data, round, stacks, 'stack');
  if (sortedStacks === undefined)
    return undefined;
  myDmuP2LogDecision(data, round, 'odd-stack');
  return [cones[0], spreads[0], ...sortedStacks];
};

const myDmuP2GroupEntrySummary = (entries) =>
  entries.map((entry) => `${entry.role ?? '?'}:${entry.name ?? entry.id}`).join(',');

const myDmuP2ValidatePointGroup = (data, round, entries) => {
  const roster = myDmuP2RosterEntries(data);
  const rosterIds = new Set(roster?.map((entry) => myDmuNormalizeActorId(entry.id)) ?? []);
  const actualIds = entries.map((entry) => myDmuNormalizeActorId(entry.id));
  if (roster !== undefined && entries.length === 4 &&
      actualIds.every((id) => id !== undefined && rosterIds.has(id)) &&
      new Set(actualIds).size === 4)
    return true;

  myDmuP2LogFallback(data, round, 'invalid-point-partition');
  console.log(
    `[String][P2TowerGroup] invalid pointRound=${round} ` +
    `roster=${myDmuP2GroupEntrySummary(roster ?? [])} actual=${myDmuP2GroupEntrySummary(entries)}`,
  );
  return false;
};

const myDmuP2RecordPointSlots = (data, round) => {
  if (round < 2 || round > 7)
    return undefined;
  data.myDmuP2PointSlots ??= {};
  const entries = myDmuP2PointEntries(data, round);
  if (!myDmuP2ValidatePointGroup(data, round, entries))
    return undefined;
  const slots = myDmuP2BuildPointSlots(data, round, entries);
  if (slots !== undefined)
    data.myDmuP2PointSlots[round] = slots;
  return slots;
};

const myDmuP2ActiveSlots = (data, round) => {
  if (!myDmuEnsureP2Groups(data))
    return undefined;
  if (round === 1)
    return data.myDmuP2InitialSlots.A;
  if (round === 4)
    return data.myDmuP2InitialSlots.B;
  if (myDmuP2Pair2222IdleOddMode(data) === undefined)
    return undefined;
  const pointRound = round === 8 ? 4 : round;
  return data.myDmuP2PointSlots?.[pointRound] ?? myDmuP2RecordPointSlots(data, pointRound);
};

const myDmuP2Partition = (data, round) => {
  const roster = myDmuP2RosterEntries(data);
  const active = myDmuP2ActiveSlots(data, round);
  if (roster === undefined || !Array.isArray(active) || active.length !== 4)
    return undefined;

  const rosterIds = new Set(roster.map((entry) => myDmuNormalizeActorId(entry.id)));
  const activeIds = active.map((entry) => myDmuNormalizeActorId(entry.id));
  if (activeIds.some((id) => id === undefined || !rosterIds.has(id)) ||
      new Set(activeIds).size !== 4)
    return undefined;

  const activeIdSet = new Set(activeIds);
  const idleEntries = roster.filter((entry) => !activeIdSet.has(myDmuNormalizeActorId(entry.id)));
  const idle = myDmuP2OrderIdleSlots(data, round, idleEntries);
  const partitionIds = [...active, ...idle].map((entry) => myDmuNormalizeActorId(entry.id));
  if (idle.length !== 4 || partitionIds.some((id) => id === undefined) ||
      new Set(partitionIds).size !== 8 ||
      partitionIds.some((id) => !rosterIds.has(id))) {
    myDmuP2LogFallback(data, round, 'invalid-eight-player-partition');
    return undefined;
  }
  return { active, idle };
};

const myDmuP2IdleSlots = (data, round) => myDmuP2Partition(data, round)?.idle ?? [];

const myDmuP2DesiredMarkers = (data, round) => {
  const partition = myDmuP2Partition(data, round);
  if (partition === undefined)
    return [];
  const { active: activeSlots, idle: idleSlots } = partition;
  const activeMarkers = round % 2 === 1 ? myDmuP2OddActiveMarkers : myDmuP2EvenActiveMarkers;
  return [
    ...activeSlots.map((entry, index) => ({ id: entry.id, marker: activeMarkers[index] })),
    ...idleSlots.map((entry, index) => ({ id: entry.id, marker: myDmuP2Pair2222IdleMarkers[index] })),
  ];
};

const myDmuApplyP2Round = (data, round) => {
  if (!myDmuMarkEnabled(data, 'MyDMU_P2TowerMarkV3'))
    return false;
  const desired = myDmuP2DesiredMarkers(data, round);
  if (desired.length !== 8)
    return false;

  const signature = desired.map((item) => `${item.id}:${item.marker}`).join('|');
  if (data.myDmuP2AppliedRoundSignatures?.[round] === signature)
    return true;

  return myDmuAfterOutput(data, myDmuMarkQueue(
    data,
    desired,
    `绝妖星 P2 八轮塔 ${round}`,
    'MyDMU_P2TowerMarkV3',
  ), () => {
    data.myDmuP2AppliedRounds[round] = true;
    data.myDmuP2AppliedRoundSignatures[round] = signature;
    return true;
  });
};

const myDmuScheduleP2Round8 = (data) => {
  if (!myDmuMarkEnabled(data, 'MyDMU_P2TowerMarkV3'))
    return;
  myDmuScheduleOwnedTask(data, 'p2:round-8', 600, () => {
    if (data.myDmuPhase !== 'p2' || (data.myDmuP2AbilityRound ?? 0) !== 7)
      return false;
    data.myDmuP2Round = 8;
    return myDmuApplyP2Round(data, 8);
  });
};

const myDmuHandleP2Headmarker = (data, matches) => {
  const mechanic = myDmuP2Headmarkers[myDmuNormalizeHeadmarkerId(matches.id)];
  if (mechanic === undefined)
    return;
  const entry = myDmuP2EntryFromHeadmarker(data, matches, mechanic);
  data.myDmuP2Initial[entry.id] ??= entry;
  data.myDmuP2Current[entry.id] = entry;
  const candidateRound = myDmuP2HeadmarkerCandidateRound(data);
  const seen = myDmuP2RecordRoundHeadmarker(data, candidateRound, entry.id);
  myDmuEnsureP2Groups(data);
  if (candidateRound === 1) {
    if (data.myDmuP2InitialLocked)
      myDmuApplyP2Round(data, 1);
    return;
  }
  if (seen >= 4) {
    myDmuP2RecordPointSlots(data, candidateRound);
    myDmuApplyP2Round(data, candidateRound);
  }
};

const myDmuP2Instruction = (data, round) => {
  const myId = myDmuGetHexIdByName(data, data.me);
  const isOwn = (entry) => entry?.name === data.me || entry?.id === myId;
  const partition = myDmuP2Partition(data, round);
  const activeIndex = partition?.active.findIndex(isOwn) ?? -1;
  if (activeIndex >= 0) {
    const oddOriginal = [
      '踩左塔，靠后喷扇形',
      '踩右塔，靠内放钢铁',
      '踩左塔，左侧放分摊',
      '踩右塔，右侧放分摊',
    ];
    const oddMelee = [
      '踩左塔，左后喷扇形',
      '踩右塔，右后放钢铁',
      '踩左塔，稍微靠前放分摊',
      '踩右塔，靠前放分摊',
    ];
    const even = [
      '踩左塔，靠前对喷扇形',
      '踩左塔，靠后对喷扇形',
      '踩右塔，靠后放钢铁',
      '踩右塔，右侧放钢铁',
    ];
    const instructions = round % 2 === 0
      ? even
      : myDmuP2OddStrategy(data) === myDmuP2OddStrategies.melee ? oddMelee : oddOriginal;
    return `第${round}轮，${instructions[activeIndex]}`;
  }

  const idleIndex = partition?.idle.findIndex(isOwn) ?? -1;
  if (idleIndex < 0)
    return `第${round}轮准备`;
  const oddOriginal = [
    '左塔外，左侧参与分摊',
    '左塔外，后方引导扇形',
    '右塔外，右侧参与分摊',
    '右塔外，右侧参与分摊',
  ];
  const oddMelee = [
    '左塔外，前方参与分摊',
    '左塔外，后方引导扇形',
    '右塔外，前方参与分摊',
    '右塔外，前方参与分摊',
  ];
  const even = [
    '左前出去引导分身',
    '左塔边引导分身',
    '右前出去引导分身',
    '右塔边引导分身',
  ];
  const instructions = round % 2 === 0
    ? even
    : myDmuP2OddStrategy(data) === myDmuP2OddStrategies.melee ? oddMelee : oddOriginal;
  return `第${round}轮，${instructions[idleIndex]}`;
};

const myDmuP2TakeCallout = (data, round, cacheKey) => {
  if (data.myDmuP2CalloutShown?.[round] === true)
    return undefined;
  const text = myDmuP2Instruction(data, round);
  if (text === `第${round}轮准备`)
    return undefined;
  data.myDmuP2CalloutShown ??= {};
  data.myDmuP2CalloutShown[round] = true;
  return myDmuCacheSpeech(data, cacheKey, text);
};

const myDmuP2TakePointCalloutForTarget = (data, targetId, minRound, maxRound, cacheKey) => {
  for (let round = maxRound; round >= minRound; round--) {
    const seen = data.myDmuP2RoundSeen?.[round] ?? {};
    if (seen[targetId] === true && Object.keys(seen).length >= 4)
      return myDmuP2TakeCallout(data, round, cacheKey);
  }
  return undefined;
};

const myDmuP2FuturePastText = (data, type) => {
  if (data.myDmuP2FuturePastCount === 4)
    return type === 'future' ? '未来：穿' : '过去：原地';
  return type === 'future' ? '未来：塔对面' : '过去：塔中间';
};

const myDmuP3ElementDebuffText = (matches) => {
  const buff = myDmuP3ElementDebuffs[matches.effectId?.toUpperCase()];
  if (buff === undefined)
    return undefined;
  if (buff.kind === 'fire' || buff.kind === 'water') {
    const prefix = (myDmuNumber(matches.duration) ?? 0) > 60 ? '长' : '短';
    return `${prefix}${buff.text}`;
  }
  return buff.text;
};

const myDmuNearestMahjongPoint = (x, z) => {
  let best;
  let bestDist = Number.POSITIVE_INFINITY;
  for (const point of myDmuP3MahjongPoints) {
    const dist = (x - point.x) ** 2 + (z - point.z) ** 2;
    if (dist < bestDist) {
      best = point;
      bestDist = dist;
    }
  }
  if (best === undefined)
    return undefined;
  return { ...best, distance: Math.sqrt(bestDist) };
};

const myDmuOppositePointIndex = (index) => ((index + 3) % 8) + 1;

const myDmuStepBetween = (firstIndex, secondIndex) => {
  const clockwise = (secondIndex - firstIndex + 8) % 8;
  if (clockwise === 0)
    return 0;
  return clockwise <= 4 ? 1 : -1;
};

const myDmuMahjongTargetPosition = (baseIndex, standStep, mahjong) => {
  const angle = ((baseIndex - 1) * 45 + standStep * (22.5 + (mahjong - 1) * 45)) % 360;
  const rad = angle * Math.PI / 180;
  return {
    x: 100 + Math.sin(rad) * 18.8,
    z: 100 - Math.cos(rad) * 18.8,
  };
};

const myDmuBuildMahjongPlan = (lines) => {
  if ((lines?.length ?? 0) < 2)
    return undefined;

  const first = lines[0];
  const second = lines[1];
  const attackStep = myDmuStepBetween(first.point.index, second.point.index);
  const standStep = -attackStep;
  const baseIndex = myDmuOppositePointIndex(first.point.index);
  const leftSlots = [];
  const rightSlots = [];

  for (let mahjong = 1; mahjong <= 8; mahjong++) {
    const target = myDmuMahjongTargetPosition(baseIndex, standStep, mahjong);
    const slot = { mahjong: mahjong, x: target.x, z: target.z };
    if (slot.x < 100)
      leftSlots.push(slot);
    else
      rightSlots.push(slot);
  }

  const topToBottom = (a, b) => a.z === b.z ? a.x - b.x : a.z - b.z;
  leftSlots.sort(topToBottom);
  rightSlots.sort(topToBottom);

  if (leftSlots.length !== 4 || rightSlots.length !== 4)
    return { markerByMahjong: myDmuP3MahjongDirectMarkers, mode: 'direct' };

  const markerByMahjong = {};
  leftSlots.forEach((slot, index) => markerByMahjong[slot.mahjong] = myDmuP3MahjongLeftMarkers[index]);
  rightSlots.forEach((slot, index) => markerByMahjong[slot.mahjong] = myDmuP3MahjongRightMarkers[index]);
  return {
    markerByMahjong: markerByMahjong,
    mode: 'fixedA',
  };
};

const myDmuP3MahjongDirection = (lines) => {
  if ((lines?.length ?? 0) < 2)
    return undefined;

  const attackStep = myDmuStepBetween(lines[0].point.index, lines[1].point.index);
  if (attackStep === 0)
    return undefined;
  const chargePoint = myDmuP3MahjongPoints.find((point) => point.index === myDmuOppositePointIndex(lines[0].point.index));
  if (chargePoint === undefined)
    return undefined;

  return {
    chargePoint: chargePoint.label,
    crowdDirection: attackStep > 0 ? '逆' : '顺',
  };
};

const myDmuOwnP3Mahjong = (data) => {
  const markers = Object.values(data.myDmuP3Mahjong?.markers ?? {});
  const myId = myDmuGetHexIdByName(data, data.me);
  return markers.find((entry) => entry.name === data.me || entry.id === myId);
};

const myDmuP3MahjongCalloutText = (data) => {
  const state = data.myDmuP3Mahjong;
  const direction = myDmuP3MahjongDirection(state?.lines);
  const own = myDmuOwnP3Mahjong(data);
  if (direction === undefined || own === undefined)
    return undefined;
  return `麻将${own.mahjong}冲${direction.chargePoint} 人群${direction.crowdDirection}`;
};

const myDmuCacheP3MahjongCallout = (data) => {
  const state = data.myDmuP3Mahjong;
  if (state?.calloutShown)
    return undefined;
  const text = myDmuP3MahjongCalloutText(data);
  if (text === undefined)
    return undefined;
  state.calloutShown = true;
  return myDmuCacheSpeech(data, 'p3MahjongDirection', text);
};

const myDmuApplyP3MahjongMarkers = (data) => {
  if (!myDmuMarkEnabled(data, 'MyDMU_P3MahjongMarkV3'))
    return false;
  const state = data.myDmuP3Mahjong;
  const markers = Object.values(state?.markers ?? {});
  if (markers.length < 8)
    return false;

  if (state.plan === undefined) {
    if (state.lines.length >= 2)
      state.plan = myDmuBuildMahjongPlan(state.lines);
    else if (state.allowDirectFallback)
      state.plan = { markerByMahjong: myDmuP3MahjongDirectMarkers, mode: 'direct' };
  }
  if (state.plan === undefined)
    return false;

  const desired = markers.map((entry) => ({
    id: entry.id,
    marker: state.plan.markerByMahjong[entry.mahjong],
  }));
  const signature = desired
    .map((item) => `${item.id}:${item.marker}`)
    .sort()
    .join('|');
  if (state.markSignature === signature)
    return true;

  return myDmuAfterOutput(data, myDmuMarkQueue(data, desired, '绝妖星 P3 麻将', 'MyDMU_P3MahjongMarkV3'), () => {
    state.marked = true;
    state.markSignature = signature;
    return true;
  });
};

const myDmuRecordP3MahjongLine = (data, matches) => {
  const actionId = matches.id?.toUpperCase();
  if (actionId !== 'BAE3' && actionId !== 'BAE4')
    return;
  const state = data.myDmuP3Mahjong;
  state.lineSources ??= {};
  if (actionId === 'BAE3')
    state.earlyShockwaveSeen = true;
  else if (state.earlyShockwaveSeen)
    return;

  const sourceKey = `${actionId}:${matches.sourceId ?? matches.source ?? ''}`;
  if (state.lineSources[sourceKey])
    return;

  const x = myDmuNumber(matches.x);
  const z = myDmuNumber(matches.y) ?? myDmuNumber(matches.z);
  if (x === undefined || z === undefined)
    return;

  const point = myDmuNearestMahjongPoint(x, z);
  if (point === undefined)
    return;
  if (point.distance > myDmuP3MahjongLineMaxPointDistance)
    return;

  if (state.lines.some((line) => line.point.index === point.index))
    return;

  state.lineSources[sourceKey] = true;
  state.lines.push({
    point: point,
    sourceId: matches.sourceId,
    actionId: actionId,
  });
  if (state.lines.length === 2)
    state.plan = myDmuBuildMahjongPlan(state.lines);
};

const myDmuP4TruthFromStatus = (matches) => {
  for (const field of ['data0', 'data3']) {
    const status = matches[field]?.toString().toUpperCase();
    const truth = myDmuP4TruthStatuses[status];
    if (truth !== undefined)
      return truth;
  }
  return undefined;
};

const myDmuSortTargetEntries = (entries, order) =>
  entries.sort((a, b) => myDmuRolePriority(a.role, order) - myDmuRolePriority(b.role, order));

const myDmuP4TruthFor = (data, buffId, firstSeenAt) => {
  const source = myDmuP4TruthSource(buffId);
  if (source === undefined)
    return undefined;

  const events = data.myDmuP4.truthEvents?.[source] ?? [];
  let bestBefore;
  let bestBeforeDiff;
  let bestAfter;
  let bestAfterDiff;
  for (const event of events) {
    const at = event.at;
    if (typeof at !== 'number')
      continue;
    const diff = firstSeenAt === undefined ? 0 : Math.abs(firstSeenAt - at);
    if (firstSeenAt === undefined) {
      if (bestBefore === undefined || at > bestBefore.at) {
        bestBefore = event;
        bestBeforeDiff = diff;
      }
    } else if (at <= firstSeenAt && diff <= 15000) {
      if (bestBefore === undefined || at > bestBefore.at) {
        bestBefore = event;
        bestBeforeDiff = diff;
      }
    } else if (at > firstSeenAt && diff <= 2500) {
      if (bestAfter === undefined || diff < bestAfterDiff) {
        bestAfter = event;
        bestAfterDiff = diff;
      }
    }
  }
  if (bestBefore !== undefined)
    return { value: bestBefore.value, at: bestBefore.at, diff: bestBeforeDiff };
  if (bestAfter !== undefined)
    return { value: bestAfter.value, at: bestAfter.at, diff: bestAfterDiff };

  const value = data.myDmuP4.truth?.[source];
  const at = data.myDmuP4.truthAt?.[source];
  if (value === undefined || at === undefined)
    return undefined;
  const diff = firstSeenAt === undefined ? 0 : Math.abs(firstSeenAt - at);
  if (firstSeenAt === undefined || (at <= firstSeenAt && diff <= 15000) || (at > firstSeenAt && diff <= 2500))
    return { value: value, at: at, diff: diff };
  return undefined;
};

const myDmuP4RefreshRecordTruth = (data, rec) => {
  const truth = myDmuP4TruthFor(data, rec.buffId, rec.firstSeenAt);
  if (truth === undefined)
    return false;
  if (rec.truth !== undefined && rec.truthDiff !== undefined && truth.diff >= rec.truthDiff)
    return true;
  rec.truth = truth.value;
  rec.truthAt = truth.at;
  rec.truthDiff = truth.diff;
  return true;
};

const myDmuTryApplyP3TargetMarkers = (data) => {
  if (!myDmuMarkEnabled(data, 'MyDMU_P3TargetMarkV3'))
    return false;
  const state = data.myDmuP3Targets;
  if (state.marked)
    return true;
  if (state.first.length !== 3 || state.second.length !== 3 || state.third.length !== 2)
    return false;

  const firstOrder = myDmuP3TargetFirstPriority(data);
  const secondOrder = myDmuP3TargetSecondPriority(data);
  const thirdOrder = myDmuP3TargetThirdPriority(data);
  const desired = [];
  myDmuSortTargetEntries(state.first, firstOrder)
    .forEach((entry, index) => desired.push({ id: entry.id, marker: ['attack1', 'attack2', 'attack3'][index] }));
  myDmuSortTargetEntries(state.second, secondOrder)
    .forEach((entry, index) => desired.push({ id: entry.id, marker: ['bind1', 'bind2', 'bind3'][index] }));
  myDmuSortTargetEntries(state.third, thirdOrder)
    .forEach((entry, index) => desired.push({ id: entry.id, marker: ['stop1', 'stop2'][index] }));

  return myDmuAfterOutput(data, myDmuMarkQueue(data, desired, '绝妖星 P3 一二三目标', 'MyDMU_P3TargetMarkV3'), () => {
    state.marked = true;
    return true;
  });
};

const myDmuP4RecordTruth = (data, target, value, matches, source = 'fallback') => {
  const now = myDmuEventMilliseconds(matches);
  data.myDmuP4.truthEvents[target] ??= [];
  // OverlayPlugin Chromium 95 has no Array#findLast; preserve newest-match semantics.
  const duplicate = data.myDmuP4.truthEvents[target].slice().reverse().find((event) =>
    event.at === now && event.value === value);
  if (duplicate === undefined)
    data.myDmuP4.truthEvents[target].push({ at: now, value: value, source });
  else if (source === 'actor-control')
    duplicate.source = source;
  while (data.myDmuP4.truthEvents[target].length > 12)
    data.myDmuP4.truthEvents[target].shift();
  data.myDmuP4.truth[target] = value;
  data.myDmuP4.truthAt[target] = now;
  for (const rec of data.myDmuP4.buffRecords ?? []) {
    if (myDmuP4TruthSource(rec.buffId) === target)
      myDmuP4RefreshRecordTruth(data, rec);
  }
};

const myDmuP4TruthSource = (buffId) => {
  if (buffId === '15AB' || buffId === '15AC')
    return 'chaos';
  if (['15A7', '15A8', '15A9', '15AA', '1C6', '566', '1558'].includes(buffId))
    return 'ex';
  return undefined;
};

const myDmuP4CacheBuff = (data, matches) => {
  const buffId = matches.effectId.toUpperCase();
  const targetId = matches.targetId;
  const role = myDmuGetRpByName(data, matches.target);
  const duration = myDmuNumber(matches.duration);
  const now = myDmuEventMilliseconds(matches);
  data.myDmuP4.buffs[targetId] ??= {};
  data.myDmuP4.buffRecords ??= [];
  const duplicate = data.myDmuP4.buffRecords.slice().reverse().find((record) =>
    record.id === myDmuNormalizeActorId(targetId) && record.buffId === buffId &&
    record.firstSeenAt === now && Math.abs((record.initialDuration ?? 0) - (duration ?? 0)) < 0.01);
  if (duplicate !== undefined)
    return duplicate;
  data.myDmuP4.buffSerial = (data.myDmuP4.buffSerial ?? 0) + 1;
  const rec = {
    serial: data.myDmuP4.buffSerial,
    id: myDmuNormalizeActorId(targetId),
    name: matches.target,
    role: role,
    group: myDmuRoleGroup(role),
    buffId: buffId,
    firstSeenAt: now,
  };
  rec.role = role;
  rec.group = myDmuRoleGroup(role);
  rec.duration = duration;
  rec.initialDuration ??= duration;
  myDmuP4RefreshRecordTruth(data, rec);
  data.myDmuP4.buffRecords.push(rec);
  data.myDmuP4.buffs[targetId][buffId] = rec;
  return rec;
};

const myDmuP4RecordsFor = (data, buffIds) => {
  const wanted = new Set(buffIds);
  const records = (data.myDmuP4.buffRecords ?? []).filter((rec) => wanted.has(rec.buffId));
  return records.sort((a, b) => myDmuRolePriority(a.role) - myDmuRolePriority(b.role));
};

const myDmuP4RefreshRecordRoles = (data) => {
  let complete = true;
  for (const rec of data.myDmuP4.buffRecords ?? []) {
    const role = myDmuGetStrictRpByActor(data, rec.id, rec.name);
    rec.role = role;
    rec.group = myDmuRoleGroup(role);
    if (role === undefined || rec.group === undefined)
      complete = false;
  }
  return complete;
};

const myDmuP4RecordForEvent = (data, targetId, buffId, duration) => {
  const normalizedTargetId = myDmuNormalizeActorId(targetId);
  let candidates = (data.myDmuP4.buffRecords ?? [])
    .filter((rec) => rec.id === normalizedTargetId && rec.buffId === buffId);
  if (duration !== undefined) {
    const durationCandidates = candidates.filter((rec) => {
      const recDuration = rec.initialDuration ?? rec.duration;
      return recDuration !== undefined && Math.abs(recDuration - duration) < 0.2;
    });
    if (durationCandidates.length > 0)
      candidates = durationCandidates;
  }
  candidates.sort((a, b) => (b.firstSeenAt ?? 0) - (a.firstSeenAt ?? 0));
  return candidates[0];
};

const myDmuP4ClassifyLengths = (records) => {
  const durations = records.map((rec) => rec.initialDuration ?? rec.duration).filter((duration) => duration !== undefined);
  if (durations.length === 0)
    return false;
  const minDuration = Math.min(...durations);
  const maxDuration = Math.max(...durations);
  const threshold = maxDuration - minDuration >= 8 ? (minDuration + maxDuration) / 2 : 65;
  for (const rec of records) {
    const duration = rec.initialDuration ?? rec.duration;
    if (duration !== undefined)
      rec.length = duration < threshold ? 'short' : 'long';
  }
  return true;
};

const myDmuP4ElementSide = (rec) => {
  if (rec?.truth === undefined)
    return undefined;
  if (rec.buffId === '15A8')
    return rec.truth ? 'out' : 'in';
  if (rec.buffId === '15A9')
    return rec.truth ? 'in' : 'out';
  return undefined;
};

const myDmuP4RecordExpiresAt = (rec) => {
  const firstSeenAt = rec?.firstSeenAt;
  const duration = rec?.initialDuration ?? rec?.duration;
  if (typeof firstSeenAt !== 'number' || duration === undefined)
    return undefined;
  return firstSeenAt + duration * 1000;
};

const myDmuSendP4BuffChat = (data, key, text) => {
  if (data.myDmuPhase !== 'p4' || !myDmuBooleanConfig(data, 'MyDMU_P4BuffChat', true))
    return true;
  data.myDmuP4.buffChatSent ??= {};
  if (data.myDmuP4.buffChatSent[key])
    return true;
  const state = data.myDmuP4;
  state.buffChatPending ??= {};
  if (state.buffChatPending[key] !== undefined)
    return state.buffChatPending[key];
  const result = myDmuAfterOutput(data, myDmuDoTextCommand(data, text), () => {
    state.buffChatSent[key] = true;
    return true;
  });
  if (typeof result?.then !== 'function')
    return result;
  const pending = result.finally(() => delete state.buffChatPending[key]);
  state.buffChatPending[key] = pending;
  return myDmuObservePromise(data, pending, `p4-chat:${key}`);
};

const myDmuP4ElementSpreadTargets = (data, round) => {
  const records = myDmuP4RecordsFor(data, myDmuP4ElementBuffs);
  myDmuP4ClassifyLengths(records);
  const targets = { TN: undefined, DPS: undefined };
  for (const rec of records) {
    if (rec.length === round && myDmuP4ElementSide(rec) === 'out' && targets[rec.group] === undefined)
      targets[rec.group] = rec;
  }
  return targets;
};

const myDmuP4SolutionMacroLineIntervalMs = 60;

const myDmuP4SolutionRoleText = (records) => {
  const roles = [...records]
    .sort((a, b) => myDmuRolePriority(a.role) - myDmuRolePriority(b.role))
    .map((rec) => rec.role);
  if (roles.some((role) => !myDmuRoleOrder.includes(role)) || new Set(roles).size !== roles.length)
    return undefined;
  return roles.join(' ');
};

const myDmuP4SolutionEffectRounds = (records, expectedPerRound) => {
  if (records.length !== expectedPerRound * 2)
    return undefined;
  const seenRoles = new Set();
  const timed = [];
  for (const rec of records) {
    if (!myDmuRoleOrder.includes(rec.role) || seenRoles.has(rec.role))
      return undefined;
    const effectAt = myDmuP4RecordExpiresAt(rec);
    if (effectAt === undefined)
      return undefined;
    seenRoles.add(rec.role);
    timed.push({ rec, effectAt });
  }
  timed.sort((a, b) => a.effectAt - b.effectAt || myDmuRolePriority(a.rec.role) - myDmuRolePriority(b.rec.role));

  const short = timed.slice(0, expectedPerRound);
  const long = timed.slice(expectedPerRound);
  const shortSpan = short.at(-1).effectAt - short[0].effectAt;
  const longSpan = long.at(-1).effectAt - long[0].effectAt;
  const roundGap = long[0].effectAt - short.at(-1).effectAt;
  if (shortSpan > 7000 || longSpan > 7000 || roundGap <= 7000)
    return undefined;
  return [short.map((item) => item.rec), long.map((item) => item.rec)];
};

const myDmuP4SolutionAccelerationLines = (data) => {
  const records = myDmuP4RecordsFor(data, [myDmuP4AccelerationBuff]);
  for (const rec of records)
    myDmuP4RefreshRecordTruth(data, rec);
  if (records.some((rec) => rec.truth === undefined))
    return undefined;
  const rounds = myDmuP4SolutionEffectRounds(records, 4);
  if (rounds === undefined)
    return undefined;

  const lines = [];
  for (const round of rounds) {
    const staticText = myDmuP4SolutionRoleText(round.filter((rec) => rec.truth === true));
    const movingText = myDmuP4SolutionRoleText(round.filter((rec) => rec.truth === false));
    if (staticText === undefined || movingText === undefined)
      return undefined;
    const parts = [];
    if (staticText !== '')
      parts.push(`停：${staticText}`);
    if (movingText !== '')
      parts.push(`动：${movingText}`);
    if (parts.length === 0)
      return undefined;
    lines.push(`动静剑：${parts.join('，')}`);
  }
  return lines;
};

const myDmuP4SolutionElementLines = (data) => {
  const records = myDmuP4RecordsFor(data, myDmuP4ElementBuffs);
  for (const rec of records)
    myDmuP4RefreshRecordTruth(data, rec);
  if (records.some((rec) => rec.truth === undefined))
    return undefined;
  const rounds = myDmuP4SolutionEffectRounds(records, 4);
  if (rounds === undefined)
    return undefined;

  const lines = [];
  for (const round of rounds) {
    const spread = round.filter((rec) => myDmuP4ElementSide(rec) === 'out');
    const groupCounts = spread.reduce((counts, rec) => {
      if (rec.group in counts)
        counts[rec.group]++;
      return counts;
    }, { TN: 0, DPS: 0 });
    if (spread.length !== 2 || groupCounts.TN !== 1 || groupCounts.DPS !== 1)
      return undefined;
    const roleText = myDmuP4SolutionRoleText(spread);
    if (roleText === undefined)
      return undefined;
    lines.push(`雷分散：${roleText}`);
  }
  return lines;
};

const myDmuP4SolutionPetrifyLines = (data) => {
  const records = myDmuP4RecordsFor(data, [myDmuP4PetrifyBuff]);
  for (const rec of records)
    myDmuP4RefreshRecordTruth(data, rec);
  if (records.some((rec) => rec.truth === undefined))
    return undefined;
  const rounds = myDmuP4SolutionEffectRounds(records, 2);
  if (rounds === undefined)
    return undefined;

  const lines = [];
  for (const round of rounds) {
    const truth = round[0]?.truth;
    if (truth === undefined || round.some((rec) => rec.truth !== truth))
      return undefined;
    const roleText = myDmuP4SolutionRoleText(round);
    if (roleText === undefined)
      return undefined;
    const prefix = truth ? '真眼，背对点名：' : '假眼，看向点名：';
    lines.push(`石化眼：${prefix}${roleText}`);
  }
  return lines;
};

const myDmuP4SolutionChaosNames = (data) => {
  const records = myDmuP4RecordsFor(data, myDmuP4ChaosBuffs);
  if (records.length !== 16)
    return undefined;
  const names = [];
  for (const buffId of myDmuP4ChaosBuffs) {
    const round = records.filter((rec) => rec.buffId === buffId);
    if (round.length !== 8 || myDmuP4SolutionRoleText(round) === undefined)
      return undefined;
    const results = new Set();
    for (const rec of round) {
      myDmuP4RefreshRecordTruth(data, rec);
      const name = myDmuP4ChaosActionText(rec);
      if (name === undefined)
        return undefined;
      results.add(name);
    }
    if (results.size !== 1)
      return undefined;
    names.push([...results][0]);
  }
  return names;
};

const myDmuBuildP4SolutionMacro = (data) => {
  if (!myDmuP4RefreshRecordRoles(data))
    return undefined;
  const acceleration = myDmuP4SolutionAccelerationLines(data);
  const element = myDmuP4SolutionElementLines(data);
  const petrify = myDmuP4SolutionPetrifyLines(data);
  const chaos = myDmuP4SolutionChaosNames(data);
  if (acceleration === undefined || element === undefined || petrify === undefined || chaos === undefined)
    return undefined;
  return [
    '-------------------------- 第一轮 -------------------------',
    acceleration[0],
    element[0],
    petrify[0],
    `混沌火：${chaos[0]}`,
    '-------------------------- 第二轮 -------------------------',
    acceleration[1],
    element[1],
    petrify[1],
    `混沌水：${chaos[1]}`,
    '-------------------------- 宏结束 -------------------------',
  ];
};

const myDmuPumpP4SolutionMacro = (data) => {
  const macro = data.myDmuP4.solutionMacro;
  if (data.myDmuPhase !== 'p4' || !myDmuBooleanConfig(data, 'MyDMU_P4BuffChat', true) ||
      macro?.lines === undefined) {
    if (macro !== undefined)
      macro.running = false;
    return false;
  }

  while (macro.nextIndex < macro.lines.length &&
      data.myDmuP4.buffChatSent[`p4-solution-${String(macro.nextIndex + 1).padStart(2, '0')}`])
    macro.nextIndex++;
  if (macro.nextIndex >= macro.lines.length) {
    macro.running = false;
    macro.complete = true;
    return true;
  }

  const index = macro.nextIndex;
  const key = `p4-solution-${String(index + 1).padStart(2, '0')}`;
  const retry = () => {
    macro.retryCount++;
    if (macro.retryCount > 20) {
      macro.running = false;
      return false;
    }
    myDmuP4ScheduleTimer(data, 'solution-macro-pump', 500, () => myDmuPumpP4SolutionMacro(data));
    return false;
  };
  return myDmuAfterOutput(data, myDmuSendP4BuffChat(data, key, macro.lines[index]), () => {
    macro.retryCount = 0;
    macro.nextIndex++;
    if (macro.nextIndex >= macro.lines.length) {
      macro.running = false;
      macro.complete = true;
      return true;
    }
    myDmuP4ScheduleTimer(
      data,
      'solution-macro-pump',
      myDmuP4SolutionMacroLineIntervalMs,
      () => myDmuPumpP4SolutionMacro(data),
    );
    return true;
  }, retry);
};

const myDmuTrySendP4SolutionMacro = (data) => {
  if (data.myDmuPhase !== 'p4' || !myDmuBooleanConfig(data, 'MyDMU_P4BuffChat', true))
    return true;
  if (!myDmuPartyChatEnabled(data))
    return false;
  const macro = data.myDmuP4.solutionMacro ??= {
    lines: undefined,
    nextIndex: 0,
    retryCount: 0,
    running: false,
    complete: false,
  };
  if (macro.complete || macro.running)
    return true;
  macro.lines ??= myDmuBuildP4SolutionMacro(data);
  if (macro.lines === undefined)
    return false;
  macro.running = true;
  return myDmuPumpP4SolutionMacro(data);
};

const myDmuP4ChaosActionText = (rec) => {
  if (rec?.truth === undefined)
    return undefined;
  if (rec.buffId === '15AB')
    return rec.truth ? '钢铁' : '月环';
  if (rec.buffId === '15AC')
    return rec.truth ? '月环' : '钢铁';
  return undefined;
};

const myDmuP4ChaosActionForLength = (data, length) => {
  const records = myDmuP4RecordsFor(data, myDmuP4ChaosBuffs);
  myDmuP4ClassifyLengths(records);
  for (const rec of records) {
    myDmuP4RefreshRecordTruth(data, rec);
    const action = myDmuP4ChaosActionText(rec);
    if (rec.length === length && action !== undefined)
      return action;
  }
  return undefined;
};

const myDmuProjectDistance = (x, y, heading, centerX = 100, centerY = 100) =>
  (x - centerX) * Math.cos(heading) + (y - centerY) * Math.sin(heading);

const myDmuRecordP4MandarinDuckBuff = (data, matches) => {
  if (data.myDmuPhase !== 'p4' || matches.target !== data.me)
    return;
  const effectId = matches.effectId?.toUpperCase();
  const st = data.myDmuP4.mandarinDuck ??= {};
  if (['1317', '15A5'].includes(effectId) && st.ownPurple === undefined)
    st.ownPurple = true;
  if (['1318', '15A6'].includes(effectId) && st.ownPurple === undefined)
    st.ownPurple = false;
  if (myDmuP4MandarinDuckFateBuffs.includes(effectId) && st.ownDeathBeyond === undefined)
    st.ownDeathBeyond = effectId !== '1C6';
  if (st.ownPurple !== undefined && st.ownDeathBeyond !== undefined)
    st.goTruePurple = st.ownPurple === st.ownDeathBeyond;
};

const myDmuRecordP4MandarinDuckAntilight = (data, matches) => {
  const x = myDmuNumber(matches.x);
  const y = myDmuNumber(matches.y);
  const heading = myDmuNumber(matches.heading);
  if (x === undefined || y === undefined || heading === undefined)
    return false;
  const st = data.myDmuP4.mandarinDuck ??= {};
  st.truePurpleLeft = myDmuProjectDistance(x, y, heading + Math.PI / 2) > 0;
  st.seenAntilight = true;
  return true;
};

const myDmuP4NoFloodText = (data) => {
  const st = data.myDmuP4?.mandarinDuck ?? {};
  if (st.goTruePurple === undefined || st.truePurpleLeft === undefined || data.myDmuP4?.truth?.ex === undefined) {
    myDmuActLog('P4 无之泛滥资料不足', {
      goTruePurple: st.goTruePurple,
      truePurpleLeft: st.truePurpleLeft,
      exTruth: data.myDmuP4?.truth?.ex,
    });
    return undefined;
  }
  const goLeft = st.truePurpleLeft === st.goTruePurple;
  const rawPurple = data.myDmuP4.truth.ex === st.goTruePurple;
  return `鸳鸯锅：${goLeft ? '左' : '右'}侧${rawPurple ? '紫' : '蓝'}色半场`;
};

const myDmuRecordP4LateSpell = (data, matches) => {
  if (data.myDmuPhase !== 'p4' || data.myDmuP4.mandarinDuck?.seenAntilight !== true)
    return false;
  const id = matches.id?.toUpperCase();
  if (id === undefined)
    return false;
  const st = data.myDmuP4.lateSpell ??= {};
  if (st.releaseSeen)
    return false;
  if (myDmuP4ThunderSpellIds.includes(id)) {
    if (st.thunderSeen)
      return true;
    st.thunderSeen = true;
    st.thunderTrue = id === 'BA9F';
    myDmuRetryAction(data, 'p4-solution-macro', () =>
      myDmuTrySendP4SolutionMacro(data), 12, 500);
    return true;
  }
  if (myDmuP4IceSpellIds.includes(id)) {
    if (st.iceSeen)
      return true;
    st.iceSeen = true;
    st.iceTrue = id === 'BA98';
    myDmuRetryAction(data, 'p4-solution-macro', () =>
      myDmuTrySendP4SolutionMacro(data), 12, 500);
    return true;
  }
  return false;
};

const myDmuTrySendP4BuffChats = (data) => {
  if (data.myDmuPhase !== 'p4' || !myDmuBooleanConfig(data, 'MyDMU_P4BuffChat', true))
    return true;
  return myDmuTrySendP4SolutionMacro(data);
};

const myDmuP4RoundRecordsReady = (records, expected, requireTruth = true) => {
  if (records.length < expected)
    return false;
  if (requireTruth && records.some((rec) => rec.truth === undefined))
    return false;
  return true;
};

const myDmuP4RecordsStillActive = (records) => {
  const expiresAt = myDmuP4MinExpiresAt(records);
  return expiresAt === undefined || Date.now() <= expiresAt;
};

const myDmuP4MagicEnsureStorage = (data) => {
  data.myDmuP4.magicStorage ??= myDmuNewP4MagicStorage();
  const st = data.myDmuP4.magicStorage;
  st.labels ??= { thunder: [], ice: [] };
  st.labels.thunder ??= [];
  st.labels.ice ??= [];
  st.baseLabels ??= {};
  st.release ??= { seen: {}, mods: {}, markers: [] };
  st.release.seen ??= {};
  st.release.mods ??= {};
  st.release.markers ??= [];
  st.seen ??= {};
  return st;
};

const myDmuP4MagicResetRelease = (data, keepChannel = false) => {
  const st = myDmuP4MagicEnsureStorage(data);
  const old = st.release ?? {};
  st.release = {
    seen: {},
    mods: {},
    markers: [],
    channelSeen: keepChannel && old.channelSeen === true,
    channelAt: keepChannel ? old.channelAt : undefined,
    entityID: keepChannel ? old.entityID : undefined,
  };
  return st.release;
};

const myDmuP4MagicBeginStorage = (data, matches) => {
  if (data.myDmuPhase !== 'p4')
    return false;
  const now = Date.now();
  const previous = myDmuP4MagicEnsureStorage(data);
  const key = `${matches.sourceId ?? matches.source ?? '?'}:${myDmuP4MagicStorageStartId}`;
  if (previous.lastKey === key && typeof previous.lastAt === 'number' && now - previous.lastAt < 2500)
    return true;
  const previousCount = previous.storeCount ?? 0;
  data.myDmuP4.magicStorage = myDmuNewP4MagicStorage(previous, true);
  const st = myDmuP4MagicEnsureStorage(data);
  st.active = true;
  st.storeCount = previousCount + 1;
  st.lastKey = key;
  st.lastAt = now;
  st.expireAt = now + 70000;
  return true;
};

const myDmuP4MagicStorageSingleLabel = (data, element) => {
  const st = myDmuP4MagicEnsureStorage(data);
  if (st.baseLabels[element] !== undefined)
    return st.baseLabels[element];
  const labels = st.labels[element] ?? [];
  let found;
  for (const label of labels) {
    if (!['真雷', '假雷', '真冰', '假冰'].includes(label))
      continue;
    if (found !== undefined && found !== label)
      return undefined;
    found = label;
  }
  return found;
};

const myDmuP4MagicOppositeLabel = (label) => ({
  真雷: '假雷',
  假雷: '真雷',
  真冰: '假冰',
  假冰: '真冰',
}[label] ?? label);

const myDmuP4MagicEatText = (thunderLabel, iceLabel) => {
  const eatThunder = thunderLabel === '假雷';
  const eatIce = iceLabel === '假冰';
  if (eatThunder && eatIce)
    return '都吃';
  if (eatThunder)
    return '吃直条';
  if (eatIce)
    return '吃扇形';
  return '都不吃';
};

const myDmuP4MagicTrySendRelease = (data, source) => {
  if (data.myDmuPhase !== 'p4' || !myDmuBooleanConfig(data, 'MyDMU_P4BuffChat', true))
    return false;
  const st = myDmuP4MagicEnsureStorage(data);
  const rel = st.release ?? {};
  if (rel.sent === true || rel.channelSeen !== true)
    return false;
  if (rel.pending !== undefined)
    return rel.pending;
  const thunderBase = myDmuP4MagicStorageSingleLabel(data, 'thunder');
  const iceBase = myDmuP4MagicStorageSingleLabel(data, 'ice');
  const thunderMod = rel.mods?.thunder;
  const iceMod = rel.mods?.ice;
  if (thunderBase === undefined || iceBase === undefined || thunderMod === undefined || iceMod === undefined)
    return false;

  const thunderFinal = thunderMod.invert ? myDmuP4MagicOppositeLabel(thunderBase) : thunderBase;
  const iceFinal = iceMod.invert ? myDmuP4MagicOppositeLabel(iceBase) : iceBase;
  const finalChaos = myDmuP4ChaosActionForLength(data, 'long');
  const moveText = finalChaos === '钢铁' ? '，远离' :
    finalChaos === '月环' ? '，靠近' :
      '';
  const message = `魔法放出：${thunderFinal} ${iceFinal}/${myDmuP4MagicEatText(thunderFinal, iceFinal)}${moveText}`;
  const result = myDmuAfterOutput(data,
    myDmuSendP4BuffChat(data, `p4-magic-release:${st.storeCount}`, message), () => {
      rel.sent = true;
      rel.message = message;
      return true;
    });
  if (typeof result?.then !== 'function')
    return result;
  rel.pending = result.finally(() => delete rel.pending);
  return myDmuObservePromise(data, rel.pending, 'p4-magic-release');
};

const myDmuP4MagicRecordStorageSpell = (data, matches) => {
  if (data.myDmuPhase !== 'p4')
    return false;
  const id = matches.id?.toUpperCase();
  const info = id === undefined ? undefined : myDmuP4MagicStorageLabels[id];
  if (info === undefined)
    return false;
  const st = myDmuP4MagicEnsureStorage(data);
  const now = Date.now();
  if (st.active !== true || now > (st.expireAt ?? 0))
    return false;
  const key = `${info.element}:${info.label}:${matches.sourceId ?? matches.source ?? '?'}`;
  if (st.seen[key])
    return true;
  st.seen[key] = true;
  const labels = st.labels[info.element];
  if (!labels.includes(info.label))
    labels.push(info.label);
  if (labels.length === 1)
    st.baseLabels[info.element] = info.label;
  return true;
};

const myDmuP4MagicRecordReleaseMarker = (data, matches, source) => {
  if (data.myDmuPhase !== 'p4')
    return false;
  const markerId = myDmuNormalizeHeadmarkerId(matches.id);
  const info = myDmuP4MagicReleaseHeadmarkers[markerId];
  if (info === undefined)
    return false;
  const now = Date.now();
  const st = myDmuP4MagicEnsureStorage(data);
  let rel = st.release;
  const lastMarkerAt = rel.lastMarkerAt;
  if (rel.sent === true || (typeof lastMarkerAt === 'number' && now - lastMarkerAt > 3000)) {
    const keepChannel = rel.channelSeen === true && typeof rel.channelAt === 'number' && now - rel.channelAt < 2500;
    rel = myDmuP4MagicResetRelease(data, keepChannel);
  }
  rel.lastMarkerAt = now;
  const key = `${matches.targetId ?? matches.target ?? '?'}:${markerId}`;
  if (rel.seen[key])
    return true;
  rel.seen[key] = true;
  rel.mods[info.element] = {
    marker: markerId,
    invert: info.invert,
    label: info.label,
    targetId: matches.targetId,
    at: now,
  };
  rel.markers.push(markerId);
  return myDmuP4MagicTrySendRelease(data, source);
};

const myDmuP4MagicReleaseChannel = (data, matches, source) => {
  if (data.myDmuPhase !== 'p4')
    return false;
  data.myDmuP4.lateSpell ??= {};
  data.myDmuP4.lateSpell.releaseSeen = true;
  const st = myDmuP4MagicEnsureStorage(data);
  let rel = st.release;
  const now = Date.now();
  const lastMarkerAt = rel.lastMarkerAt;
  if (rel.sent === true || (typeof lastMarkerAt === 'number' && now - lastMarkerAt > 3000))
    rel = myDmuP4MagicResetRelease(data, false);
  rel.channelSeen = true;
  rel.channelAt = now;
  rel.entityID = matches.sourceId;
  return myDmuP4MagicTrySendRelease(data, source);
};

const myDmuP4PetrifyKind = (round) => `petrify-${round}`;

const myDmuP4RoundRecords = (data, buffIds, round) => {
  const records = myDmuP4RecordsFor(data, buffIds);
  myDmuP4ClassifyLengths(records);
  return records.filter((rec) => rec.length === round);
};

const myDmuP4MinExpiresAt = (records) => {
  const expiries = records.map((rec) => myDmuP4RecordExpiresAt(rec)).filter((time) => time !== undefined);
  if (expiries.length === 0)
    return undefined;
  return Math.min(...expiries);
};

const myDmuP4ScheduleTimer = (data, key, delayMs, callback) => {
  data.myDmuP4.markTimers ??= {};
  myDmuCancelOwnedTask(data, `p4:timer:${key}`);
  data.myDmuP4.markTimers[key] = myDmuScheduleOwnedTask(
    data,
    `p4:timer:${key}`,
    Math.max(delayMs, 0),
    () => {
      delete data.myDmuP4.markTimers?.[key];
      return callback();
    },
  );
};

const myDmuP4IsPetrifyKind = (kind) => typeof kind === 'string' && (kind === 'petrify' || kind.startsWith('petrify-'));

const myDmuP4EnsureMarkOwnership = (data) => {
  data.myDmuP4.markAssignments ??= {};
  data.myDmuP4.markActorKinds ??= {};
  data.myDmuP4.markActorMarkers ??= {};
};

const myDmuP4DropKindAssignmentForActor = (data, kind, actorKey) => {
  const assignments = data.myDmuP4.markAssignments?.[kind];
  if (!Array.isArray(assignments))
    return;
  data.myDmuP4.markAssignments[kind] = assignments.filter((item) => myDmuMarkActorKey(item.id) !== actorKey);
};

const myDmuP4PickKindMarkers = (data, kind, desired) => {
  myDmuP4EnsureMarkOwnership(data);
  const markers = [];
  const skipped = [];
  for (const item of desired) {
    if (item?.id === undefined || item?.marker === undefined)
      continue;
    const actorKey = myDmuMarkActorKey(item.id);
    const oldKind = data.myDmuP4.markActorKinds[actorKey];
    if (oldKind !== undefined && oldKind !== kind && !myDmuP4IsPetrifyKind(kind)) {
      skipped.push(item);
      continue;
    }
    markers.push(item);
  }
  return { markers, skipped };
};

const myDmuP4SetKindMarkers = (data, kind, desired, note) => {
  const pending = myDmuTaskLifecycleState(data)?.markOutput?.pending;
  if (pending !== undefined)
    return myDmuAfterOutput(data, pending, () => myDmuP4SetKindMarkers(data, kind, desired, note));
  if (!myDmuMarkEnabled(data, 'MyDMU_P4BuffMarkV3'))
    return false;
  if (desired.length === 0)
    return false;
  const { markers, skipped } = myDmuP4PickKindMarkers(data, kind, desired);
  if (markers.length === 0 && skipped.length === 0)
    return false;
  return myDmuAfterOutput(data, markers.length > 0
    ? myDmuMarkQueue(data, markers, note, 'MyDMU_P4BuffMarkV3') : true, () => {
    data.myDmuP4.markAppliedAt ??= {};
    for (const item of markers) {
      const actorKey = myDmuMarkActorKey(item.id);
      const oldKind = data.myDmuP4.markActorKinds[actorKey];
      if (oldKind !== undefined && oldKind !== kind)
        myDmuP4DropKindAssignmentForActor(data, oldKind, actorKey);
    }
    data.myDmuP4.markAssignments[kind] = markers.map((item) => ({
      ...item,
      localOnly: myDmuEnsureMarkState(data).localOnly[myDmuMarkActorKey(item.id)],
    }));
    for (const item of markers) {
      const actorKey = myDmuMarkActorKey(item.id);
      data.myDmuP4.markActorKinds[actorKey] = kind;
      data.myDmuP4.markActorMarkers[actorKey] = item.marker;
    }
    data.myDmuP4.markAppliedAt[kind] = Date.now();
    return true;
  });
};

const myDmuP4ClearKind = (data, kind, reason) => {
  const pending = myDmuTaskLifecycleState(data)?.markOutput?.pending;
  if (pending !== undefined)
    return myDmuAfterOutput(data, pending, () => myDmuP4ClearKind(data, kind, reason));
  if (!myDmuMarkConfigured(data, 'MyDMU_P4BuffMarkV3'))
    return false;
  myDmuP4EnsureMarkOwnership(data);
  const assignments = data.myDmuP4.markAssignments?.[kind] ?? [];
  const assigned = assignments.filter((item) => {
    const actorKey = myDmuMarkActorKey(item.id);
    return data.myDmuP4.markActorKinds[actorKey] === kind &&
      data.myDmuP4.markActorMarkers[actorKey] === item.marker;
  });
  const markState = myDmuEnsureMarkState(data);
  const owned = assigned.filter((item) =>
    markState.actors[myDmuMarkActorKey(item.id)] === item.marker);
  return myDmuAfterOutput(data, owned.length > 0
    ? myDmuClearMarkQueue(data, owned, `绝妖星 P4 清除 ${kind} ${reason ?? ''}`) : true, () => {
    for (const item of assigned) {
      const actorKey = myDmuMarkActorKey(item.id);
      delete data.myDmuP4.markActorKinds[actorKey];
      delete data.myDmuP4.markActorMarkers[actorKey];
    }
    delete data.myDmuP4.markAssignments?.[kind];
    if (kind === 'short' || kind === 'long')
      data.myDmuP4.elementCleared[kind] = true;
    if (kind === myDmuP4PetrifyKind('short'))
      data.myDmuP4.petrifyCleared.short = true;
    if (kind === myDmuP4PetrifyKind('long'))
      data.myDmuP4.petrifyCleared.long = true;
    myDmuRetryAction(data, `p4-after-clear-${kind}`, () =>
      myDmuProcessP4MarkTiming(data, `after-clear-${kind}`), 10, 250);
    return true;
  });
};

const myDmuP4ScheduleKindClear = (data, kind, records, minVisibleMs = 0) => {
  const expiresAt = myDmuP4MinExpiresAt(records);
  const now = Date.now();
  let dueAt = expiresAt === undefined ? now + 800 : expiresAt + 800;
  const markedAt = data.myDmuP4.markAppliedAt?.[kind];
  if (typeof markedAt === 'number')
    dueAt = Math.max(dueAt, markedAt + minVisibleMs);
  myDmuP4ScheduleTimer(data, `clear-${kind}`, dueAt - now, () =>
    myDmuP4ClearKind(data, kind, 'timer'));
};

const myDmuP4ScheduleElementTransition = (data, round, records) => {
  if (round === undefined || round === 'unknown')
    return;
  const expiresAt = myDmuP4MinExpiresAt(records);
  const now = Date.now();
  const dueAt = expiresAt === undefined ? now : expiresAt;
  myDmuP4ScheduleTimer(data, `transition-${round}`, dueAt - now, () =>
    myDmuP4TransitionElementToPetrify(data, round, 'timer'));
};

const myDmuApplyP4ElementRound = (data, round) => {
  if (!myDmuMarkEnabled(data, 'MyDMU_P4BuffMarkV3'))
    return false;
  if (round === undefined || data.myDmuP4.elementMarked[round])
    return true;
  if (round === 'long' && (!data.myDmuP4.elementCleared.short || !data.myDmuP4.petrifyCleared.short))
    return false;

  const records = myDmuP4RoundRecords(data, myDmuP4ElementBuffs, round);
  if (!myDmuP4RoundRecordsReady(records, 4) || !myDmuP4RecordsStillActive(records))
    return false;
  const targets = myDmuP4ElementSpreadTargets(data, round);
  if (targets.TN === undefined || targets.DPS === undefined)
    return false;

  const desired = [
    { id: targets.TN.id, marker: 'attack1' },
    { id: targets.DPS.id, marker: 'attack2' },
  ];
  return myDmuAfterOutput(data, myDmuP4SetKindMarkers(data, round, desired, `绝妖星 P4 元素 ${round}`), () => {
    data.myDmuP4.elementMarked[round] = true;
    myDmuP4ScheduleElementTransition(data, round, records);
    if (round === 'long')
      myDmuTrySendP4SolutionMacro(data);
    return true;
  });
};

const myDmuApplyP4PetrifyRound = (data, round) => {
  if (!myDmuMarkEnabled(data, 'MyDMU_P4BuffMarkV3'))
    return false;
  if (round === undefined || data.myDmuP4.petrifyMarked[round])
    return false;
  if (round === 'long' && (!data.myDmuP4.elementCleared.short || !data.myDmuP4.petrifyCleared.short))
    return false;

  const records = myDmuP4RoundRecords(data, [myDmuP4PetrifyBuff], round);
  if (!myDmuP4RoundRecordsReady(records, 2) || !myDmuP4RecordsStillActive(records))
    return false;
  const realRecords = records
    .filter((rec) => rec.truth === true)
    .sort((a, b) => myDmuRolePriority(a.role) - myDmuRolePriority(b.role));
  const fakeRecords = records
    .filter((rec) => rec.truth === false)
    .sort((a, b) => myDmuRolePriority(a.role) - myDmuRolePriority(b.role));
  if (realRecords.length + fakeRecords.length < 2)
    return false;

  const desired = [];
  realRecords.forEach((rec, index) => desired.push({ id: rec.id, marker: ['stop1', 'stop2'][index] ?? 'stop2' }));
  fakeRecords.forEach((rec, index) => desired.push({ id: rec.id, marker: ['bind1', 'bind2'][index] ?? 'bind2' }));
  const kind = myDmuP4PetrifyKind(round);
  return myDmuAfterOutput(data, myDmuP4SetKindMarkers(data, kind, desired, `绝妖星 P4 石化 ${round}`), () => {
    data.myDmuP4.petrifyMarked[round] = true;
    myDmuP4ScheduleKindClear(data, kind, records, round === 'long' ? 3500 : 0);
    myDmuTrySendP4SolutionMacro(data);
    return true;
  });
};

const myDmuP4TransitionElementToPetrify = (data, round, reason) => {
  if (!myDmuMarkConfigured(data, 'MyDMU_P4BuffMarkV3'))
    return false;
  if (round === undefined || round === 'unknown')
    return false;
  if (!data.myDmuP4.elementMarked[round] || data.myDmuP4.elementCleared[round])
    return false;

  const clear = (petrifyApplied) => {
    const cleared = myDmuP4ClearKind(data, round, reason);
    if (!petrifyApplied)
      myDmuRetryAction(data, `p4-after-transition-${round}`, () =>
        myDmuProcessP4MarkTiming(data, `after-transition-${round}`), 10, 250);
    return myDmuAfterOutput(data, cleared, () => true, () => petrifyApplied);
  };
  return myDmuAfterOutput(data, myDmuApplyP4PetrifyRound(data, round), () => clear(true), () => clear(false));
};

function myDmuProcessP4MarkTiming(data, source = 'process') {
  if (data.myDmuPhase !== 'p4' ||
      !myDmuMarkConfigured(data, 'MyDMU_P4BuffMarkV3'))
    return true;
  if (!myDmuRoleOverlayConnected(data) || !myDmuP4RefreshRecordRoles(data))
    return false;

  if (!data.myDmuP4.elementMarked.short && !data.myDmuP4.elementCleared.short)
    return myDmuApplyP4ElementRound(data, 'short');
  if (data.myDmuP4.elementCleared.short && !data.myDmuP4.petrifyMarked.short && !data.myDmuP4.petrifyCleared.short)
    return myDmuApplyP4PetrifyRound(data, 'short');
  if (data.myDmuP4.petrifyMarked.short)
    myDmuTrySendP4SolutionMacro(data);
  if (!data.myDmuP4.petrifyCleared.short)
    return true;

  if (!data.myDmuP4.elementMarked.long && !data.myDmuP4.elementCleared.long)
    return myDmuApplyP4ElementRound(data, 'long');
  if (data.myDmuP4.elementMarked.long)
    myDmuTrySendP4SolutionMacro(data);
  if (data.myDmuP4.elementCleared.long && !data.myDmuP4.petrifyMarked.long && !data.myDmuP4.petrifyCleared.long)
    return myDmuApplyP4PetrifyRound(data, 'long');
  return true;
}

const myDmuP4RoundForTarget = (data, targetId, buffId, duration) => {
  const records = myDmuP4RecordsFor(data, [buffId]);
  myDmuP4ClassifyLengths(records);
  return myDmuP4RecordForEvent(data, targetId, buffId, duration)?.length ??
    data.myDmuP4.buffs[targetId]?.[buffId]?.length;
};

const myDmuP4TruthFromActorControl = (matches) => {
  const first = (matches.param1 ?? matches.data0)?.toString().toUpperCase().padStart(4, '0');
  const marker = (matches.param2 ?? matches.data1)?.toString().toUpperCase().padStart(4, '0');
  if (first !== '0808')
    return undefined;
  return myDmuP4TruthHeadmarkers[marker];
};

Options.Triggers.push({
  id: 'MyDancingMadUltimate',
  zoneId: 1363,
  zoneLabel: { en: '绝妖星' },
  overrideTimelineFile: true,
  timelineFile: '绝妖星-自用.txt',
  initData: myDmuInitState,
  timelineTriggers: [
    ...myDmuP2TowerTimelineTriggers,
    ...myDmuP5MitigationTimelineTriggers,
    myDmuP3MahjongFallbackTimelineTrigger,
  ],
  triggers: [
    {
      id: '绝妖星 阶段追踪',
      type: 'StartsUsing',
      netRegex: { id: Object.keys(myDmuPhaseStarts), capture: true },
      run: (data, matches) => {
        const nextPhase = myDmuPhaseStarts[matches.id];
        if (nextPhase === undefined)
          return;
        // BB40 also opens Repeater 3 inside P5; it is not a second phase transition.
        if (nextPhase === 'p5' && data.myDmuPhase === 'p5')
          return;
        if (data.myDmuPhase === 'p4' && nextPhase !== 'p4')
          myDmuCancelP4Timers(data);
        const previousPhase = data.myDmuPhase;
        myDmuStartTaskGeneration(data, `phase:${previousPhase}->${nextPhase}`);
        data.myDmuPhase = nextPhase;
        if (data.myDmuPhase === 'p1') {
          myDmuResetP1(data);
          myDmuClearMarks(data);
        } else if (data.myDmuPhase === 'p2') {
          myDmuResetP2(data);
          myDmuClearMarks(data);
        } else if (data.myDmuPhase === 'p3') {
          myDmuResetP3Mahjong(data);
          myDmuResetP3Targets(data);
          data.myDmuP3FirewallTargetKind = undefined;
          myDmuClearMarks(data);
        } else if (data.myDmuPhase === 'p4') {
          myDmuResetP4(data);
          myDmuClearMarks(data);
        } else if (data.myDmuPhase === 'p5') {
          myDmuResetP5(data);
          myDmuClearMarks(data);
        }
      },
    },
    {
      id: '绝妖星 P1 神像计数',
      type: 'StartsUsing',
      netRegex: { id: 'BCF2', capture: false },
      condition: (data) => data.myDmuPhase === 'p1',
      run: (data) => {
        data.myDmuP1GravenCount++;
        if (data.myDmuP1GravenCount === 2)
          data.myDmuP1Stage = 'graven2';
        else if (data.myDmuP1GravenCount >= 3)
          data.myDmuP1Stage = 'graven3';
      },
    },
    {
      id: '绝妖星 P1 恶狠狠毁荡',
      type: 'StartsUsing',
      netRegex: { id: 'C403', capture: true },
      condition: (data) => data.myDmuPhase === 'p1' &&
        myDmuP1CalloutEnabled(data) && data.role === 'tank',
      durationSeconds: 5,
      alertText: (data) => myDmuP1CalloutEnabled(data) && data.role === 'tank'
        ? myDmuCacheSpeech(data, 'p1ManaCharge', '死刑换T')
        : undefined,
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p1ManaCharge'),
    },
    {
      id: '绝妖星 P1 踩踏进入神像3',
      type: 'StartsUsing',
      netRegex: { id: 'BAB9', capture: false },
      condition: (data) => data.myDmuPhase === 'p1',
      run: (data) => data.myDmuP1Stage = 'graven3',
    },
    {
      id: '绝妖星 P1 真假头标记录',
      type: 'HeadMarker',
      netRegex: {
        id: [
          myDmuP1Headmarkers.fakeFire,
          myDmuP1Headmarkers.trueFire,
          myDmuP1Headmarkers.fakeIce,
          myDmuP1Headmarkers.trueIce,
          myDmuP1Headmarkers.fakeThunder,
          myDmuP1Headmarkers.trueThunder,
        ],
        capture: true,
      },
      condition: (data) => data.myDmuPhase === 'p1',
      preRun: (data, matches) => myDmuP1RecordFakeHeadmarker(data, matches.id),
    },
    {
      id: '绝妖星 P1 第一组连线',
      type: 'Tether',
      netRegex: { id: '002D', capture: true },
      condition: (data) => data.myDmuPhase === 'p1' && data.myDmuP1GravenCount === 1 &&
        myDmuP1CalloutEnabled(data),
      preRun: (data, matches) => myDmuP1RecordUniqueName(data.myDmuP1Tethers, matches.target),
      delaySeconds: 0.5,
      durationSeconds: 6,
      infoText: (data) => {
        if (!myDmuP1CalloutEnabled(data))
          return;
        if (data.myDmuP1Tethers.length === 0)
          return;
        const onYou = data.myDmuP1Tethers.includes(data.me);
        data.myDmuP1FirstTethered = onYou;
        return myDmuCacheSpeech(data, 'p1FirstTether', onYou ? '击退' : '无');
      },
      tts: null,
      soundVolume: 0,
      run: (data) => {
        if (myDmuSpeakCached(data, 'p1FirstTether') !== undefined)
          data.myDmuP1Tethers = [];
      },
    },
    {
      id: '绝妖星 P1 连环环陷阱收集',
      type: 'GainsEffect',
      netRegex: { effectId: myDmuP1PoisonBuff, capture: true },
      condition: (data) => data.myDmuPhase === 'p1',
      preRun: (data, matches) => {
        myDmuCancelScheduledClearMarks(data, 'p1Poison');
        myDmuP1RecordUniqueName(data.myDmuP1PoisonTargets, matches.target);
        data.myDmuP1PoisonTargetIds[matches.target] = matches.targetId;
        data.myDmuP1PoisonDurations[matches.target] = myDmuNumber(matches.duration) ?? 3.5;
        myDmuApplyP1PoisonMarkers(data);
      },
    },
    {
      id: '绝妖星 P1 连环环陷阱移除',
      type: 'LosesEffect',
      netRegex: { effectId: myDmuP1PoisonBuff, capture: true },
      condition: (data) => data.myDmuPhase === 'p1',
      preRun: (data, matches) => {
        data.myDmuP1PoisonTargets = data.myDmuP1PoisonTargets.filter((name) => name !== matches.target);
        delete data.myDmuP1PoisonTargetIds[matches.target];
        delete data.myDmuP1PoisonDurations[matches.target];
        data.myDmuP1PoisonMarkerSignature = undefined;
        if (data.myDmuP1PoisonTargets.length === 0 && myDmuMarkConfigured(data, 'MyDMU_P1PoisonMarkV3'))
          myDmuScheduleClearMarks(data, 'p1Poison', 1.2, (data) =>
            data.myDmuP1PoisonTargets.length === 0 && myDmuMarkConfigured(data, 'MyDMU_P1PoisonMarkV3'));
      },
    },
    {
      id: '绝妖星 P1 5078锁链标点兜底',
      type: 'StartsUsing',
      netRegex: { id: ['BAA2', 'BAA3'], capture: false },
      condition: (data) => data.myDmuPhase === 'p1',
      suppressSeconds: 1,
      run: (data) => myDmuRetryAction(
        data,
        'p1-poison-markers',
        () => myDmuApplyP1PoisonMarkers(data, true),
        6,
        250,
      ),
    },
    {
      id: '绝妖星 P1 连环环陷阱预兆',
      type: 'GainsEffect',
      netRegex: { effectId: myDmuP1PoisonBuff, capture: true },
      condition: (data) => data.myDmuPhase === 'p1' && myDmuP1CalloutEnabled(data),
      delaySeconds: (_data, matches) => Math.max((myDmuNumber(matches.duration) ?? 0) - 3.5, 0),
      durationSeconds: 3.5,
      suppressSeconds: 1,
      alarmText: (data) => myDmuP1CalloutEnabled(data) &&
        data.myDmuP1PoisonTargets.includes(data.me)
        ? myDmuCacheSpeech(data, 'p1Poison', '传毒出去')
        : undefined,
      alertText: (data) => myDmuP1CalloutEnabled(data) &&
        !data.myDmuP1PoisonTargets.includes(data.me)
        ? myDmuCacheSpeech(data, 'p1Poison', '吃毒')
        : undefined,
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p1Poison'),
    },
    {
      id: '绝妖星 P1 分摊分散头标',
      type: 'HeadMarker',
      netRegex: { id: [myDmuP1Headmarkers.stack, myDmuP1Headmarkers.spread], capture: true },
      condition: (data) => data.myDmuPhase === 'p1' && myDmuP1CalloutEnabled(data),
      delaySeconds: (data) => data.myDmuP1GravenCount === 1 && data.myDmuP1FirstTethered ? 1.65 : 0.5,
      durationSeconds: 6,
      suppressSeconds: 1,
      alertText: (data, matches) => myDmuP1CalloutEnabled(data)
        ? myDmuCacheSpeech(data, 'p1Headmarker', myDmuP1HeadmarkerText(data, matches.id))
        : undefined,
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p1Headmarker'),
    },
    {
      id: '绝妖星 P1 波动炮',
      type: 'Ability',
      netRegex: { id: 'BAA8', capture: true },
      condition: (data) => data.myDmuPhase === 'p1' && data.myDmuP1GravenCount === 1 &&
        myDmuP1CalloutEnabled(data),
      preRun: (data, matches) => {
        myDmuP1RecordUniqueName(data.myDmuP1WaveCannonTargets, matches.target);
      },
      durationSeconds: 6,
      alertText: (data) => {
        if (!myDmuP1CalloutEnabled(data))
          return;
        if (data.myDmuP1WaveCannonTargets.length < 4)
          return;
        const avoid = data.myDmuP1WaveCannonTargets.includes(data.me);
        return myDmuCacheSpeech(data, 'p1WaveCannon', avoid ? '躲开' : '踩塔');
      },
      tts: null,
      soundVolume: 0,
      run: (data) => {
        if (myDmuSpeakCached(data, 'p1WaveCannon') !== undefined)
          data.myDmuP1WaveCannonTargets = [];
      },
    },
    {
      id: '绝妖星 P1 神像2 连线',
      type: 'Tether',
      netRegex: { id: '002D', capture: true },
      condition: (data, matches) =>
        myDmuP1CalloutEnabled(data) && data.myDmuP1GravenCount === 2 && matches.target === data.me,
      promise: async (data, matches) => {
        data.myDmuP1Graven2SourceX = undefined;
        data.myDmuP1PlaceRock = false;
        const sourceId = Number.parseInt(matches.sourceId, 16);
        if (!Number.isFinite(sourceId))
          return;
        try {
          const combatants = await myDmuQueryCombatants(data, [sourceId], 'p1.graven2-source');
          data.myDmuP1Graven2SourceX = combatants[0]?.PosX;
        } catch (error) {
          myDmuActLog('P1 神像2连线位置查询失败', {
            reason: 'source-combatant-query-failed',
            error: `${error}`,
            fallback: false,
          });
        }
      },
      durationSeconds: 6,
      alertText: (data) => {
        const x = data.myDmuP1Graven2SourceX;
        if (x === undefined)
          return myDmuCacheSpeech(data, 'p1Graven2Tether', '看连线');
        data.myDmuP1PlaceRock = x >= 110;
        return myDmuCacheSpeech(data, 'p1Graven2Tether', data.myDmuP1PlaceRock ? '石头' : '黑洞');
      },
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p1Graven2Tether'),
    },
    {
      id: '绝妖星 P1 神像2 延迟位置',
      type: 'Tether',
      netRegex: { id: '002D', capture: true },
      condition: (data, matches) =>
        myDmuP1CalloutEnabled(data) && data.myDmuP1GravenCount === 2 && matches.target === data.me,
      preRun: (data, matches) => {
        matches.myDmuP1Graven2TetherIndex = data.myDmuP1Graven2TetherCount;
        data.myDmuP1Graven2TetherCount++;
      },
      delaySeconds: (_data, matches) => matches.myDmuP1Graven2TetherIndex === 1 ? 6 : 8.5,
      durationSeconds: 4,
      alarmText: (data) => data.myDmuP1PlaceRock ? myDmuCacheSpeech(data, 'p1Graven2Late', '出去放石头') : undefined,
      infoText: (data) => data.myDmuP1PlaceRock ? undefined : myDmuCacheSpeech(data, 'p1Graven2Late', '中间'),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p1Graven2Late'),
    },
    {
      id: '绝妖星 P1 神像3 箭头',
      type: 'GainsEffect',
      netRegex: { effectId: Object.keys(myDmuP1ArrowBuffs), capture: true },
      condition: (data, matches) => data.myDmuPhase === 'p1' && myDmuP1IsGraven3(data) &&
        myDmuP1CalloutEnabled(data) && matches.target === data.me,
      preRun: (data, matches) => {
        const direction = myDmuP1ArrowBuffs[matches.effectId.toUpperCase()];
        if (direction === undefined)
          return;
        data.myDmuP1Arrow.push({ direction: direction, duration: myDmuNumber(matches.duration) ?? 0 });
        if (data.myDmuP1Arrow.length !== 2)
          return;
        const [first, second] = data.myDmuP1Arrow.sort((a, b) => a.duration - b.duration);
        myDmuCacheSpeech(data, 'p1Arrow', `${first.direction} + ${second.direction}`);
      },
      durationSeconds: 10,
      infoText: (data, matches) => myDmuP1CalloutEnabled(data) && matches.target === data.me
        ? data.myDmuSpeech?.p1Arrow
        : undefined,
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p1Arrow'),
    },
    {
      id: '绝妖星 P1 神像3 连线收集',
      type: 'Tether',
      netRegex: { id: '002D', capture: true },
      condition: (data) => data.myDmuPhase === 'p1' && myDmuP1IsGraven3(data) &&
        myDmuP1CalloutEnabled(data),
      preRun: (data, matches) => {
        if (!data.myDmuP1Graven3Tethers.some((entry) => entry.target === matches.target))
          data.myDmuP1Graven3Tethers.push({ sourceId: matches.sourceId, target: matches.target });
      },
    },
    {
      id: '绝妖星 P1 神像3 连线',
      type: 'Tether',
      netRegex: { id: '002D', capture: true },
      condition: (data, matches) =>
        data.myDmuPhase === 'p1' && myDmuP1IsGraven3(data) && matches.target === data.me &&
        myDmuP1CalloutEnabled(data),
      delaySeconds: 3,
      durationSeconds: 7,
      promise: async (data) => {
        try {
          const sourceIds = [...new Set(data.myDmuP1Graven3Tethers
            .map((entry) => myDmuNormalizeActorId(entry.sourceId))
            .filter((id) => /^4[0-9A-F]{7}$/u.test(id ?? '')))];
          data.myDmuP1Combatants = sourceIds.length === 0
            ? []
            : await myDmuQueryCombatants(data, sourceIds, 'p1.graven3-route');
        } catch (error) {
          data.myDmuP1Combatants = [];
          myDmuActLog('P1 神像3连线位置查询失败', {
            reason: 'route-combatant-query-failed',
            error: `${error}`,
            fallback: false,
          });
        }
      },
      alertText: (data) => {
        if (!myDmuP1CalloutEnabled(data))
          return;
        const tether = data.myDmuP1Graven3Tethers.find((entry) => entry.target === data.me);
        const x = tether === undefined ? undefined : myDmuP1CombatantPosX(data.myDmuP1Combatants, tether.sourceId);
        if (x === undefined)
          return myDmuCacheSpeech(data, 'p1Graven3Tether', '看连线');
        return x < 100 ? myDmuCacheSpeech(data, 'p1Graven3Tether', '去外面') : undefined;
      },
      infoText: (data) => {
        if (!myDmuP1CalloutEnabled(data))
          return;
        const tether = data.myDmuP1Graven3Tethers.find((entry) => entry.target === data.me);
        const x = tether === undefined ? undefined : myDmuP1CombatantPosX(data.myDmuP1Combatants, tether.sourceId);
        if (x === undefined || x < 100)
          return;
        return myDmuCacheSpeech(data, 'p1Graven3Tether', '在里面');
      },
      tts: null,
      soundVolume: 0,
      run: (data) => {
        myDmuSpeakCached(data, 'p1Graven3Tether');
      },
    },
    {
      id: '绝妖星 P1 制裁之光',
      type: 'StartsUsing',
      netRegex: { id: 'C622', capture: false },
      condition: (data) => myDmuP1CalloutEnabled(data),
      durationSeconds: 5,
      infoText: (data) =>
        myDmuCacheSpeech(data, 'p1LightOfJudgment', data.role === 'tank' || data.role === 'healer' ? '大AOE，后接死刑' : '大AOE'),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p1LightOfJudgment'),
    },
    {
      id: '绝妖星 P2 终末双腕',
      type: 'StartsUsing',
      netRegex: { id: 'C24C', capture: false },
      condition: (data) =>
        data.role === 'tank' &&
        myDmuBooleanConfig(data, 'MyDMU_P2ActionCallout', true),
      durationSeconds: 5,
      infoText: (data) => myDmuCacheSpeech(data, 'p2UltimateEmbrace', '双T死刑'),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p2UltimateEmbrace'),
    },
    {
      id: '绝妖星 P2 遗弃末世',
      type: 'StartsUsing',
      netRegex: { id: 'BABC', capture: false },
      condition: (data) => myDmuBooleanConfig(data, 'MyDMU_P2ActionCallout', true),
      durationSeconds: 5,
      infoText: (data) => myDmuCacheSpeech(data, 'p2Forsaken', '大AOE'),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p2Forsaken'),
    },
    {
      id: '绝妖星 P2 未来终结',
      type: 'StartsUsing',
      netRegex: { id: 'BAD2', capture: false },
      condition: (data) => data.myDmuPhase === 'p2' &&
        myDmuBooleanConfig(data, 'MyDMU_P2ActionCallout', true),
      preRun: (data) => data.myDmuP2FuturePastCount++,
      delaySeconds: 7,
      durationSeconds: (data) => data.myDmuP2FuturePastCount === 4 ? 10 : 5,
      infoText: (data) => myDmuBooleanConfig(data, 'MyDMU_P2ActionCallout', true)
        ? myDmuCacheSpeech(data, 'p2FuturePast', myDmuP2FuturePastText(data, 'future'))
        : undefined,
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p2FuturePast'),
    },
    {
      id: '绝妖星 P2 过去终结',
      type: 'StartsUsing',
      netRegex: { id: 'BAD3', capture: false },
      condition: (data) => data.myDmuPhase === 'p2' &&
        myDmuBooleanConfig(data, 'MyDMU_P2ActionCallout', true),
      preRun: (data) => data.myDmuP2FuturePastCount++,
      delaySeconds: 7,
      durationSeconds: (data) => data.myDmuP2FuturePastCount === 4 ? 10 : 5,
      infoText: (data) => myDmuBooleanConfig(data, 'MyDMU_P2ActionCallout', true)
        ? myDmuCacheSpeech(data, 'p2FuturePast', myDmuP2FuturePastText(data, 'past'))
        : undefined,
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p2FuturePast'),
    },
    {
      id: '绝妖星 P2 消灭之脚',
      type: 'StartsUsing',
      netRegex: { id: ['BADC', 'BADD'], capture: true },
      condition: (data) => data.myDmuPhase === 'p2' &&
        myDmuBooleanConfig(data, 'MyDMU_P2ActionCallout', true),
      preRun: (data) => data.myDmuP2AllThingsEndingCalloutCount++,
      durationSeconds: 4,
      suppressSeconds: 1,
      alertText: (data, matches) => {
        if (!myDmuBooleanConfig(data, 'MyDMU_P2ActionCallout', true))
          return undefined;
        const count = data.myDmuP2AllThingsEndingCalloutCount;
        const text = count <= 3
          ? '走'
          : count === 4
            ? matches.id.toUpperCase() === 'BADC' ? '穿到背后' : '留在原地'
            : undefined;
        return myDmuCacheSpeech(data, 'p2AllThingsEnding', text);
      },
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p2AllThingsEnding'),
    },
    {
      id: '绝妖星 P2 制裁之光',
      type: 'StartsUsing',
      netRegex: { id: 'BABD', capture: false },
      condition: (data) => myDmuBooleanConfig(data, 'MyDMU_P2ActionCallout', true),
      durationSeconds: 5,
      infoText: (data) => myDmuCacheSpeech(data, 'p2LightOfJudgment', '大AOE'),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p2LightOfJudgment'),
    },
    {
      id: '绝妖星 P2 单翼半场',
      type: 'StartsUsing',
      netRegex: { id: ['BACD', 'BACE'], capture: true },
      condition: (data) => data.myDmuPhase === 'p2' &&
        myDmuBooleanConfig(data, 'MyDMU_P2ActionCallout', true),
      durationSeconds: 5,
      infoText: (data, matches) => myDmuBooleanConfig(data, 'MyDMU_P2ActionCallout', true)
        ? myDmuCacheSpeech(data, 'p2SingleWing', matches.id === 'BACD' ? '去右' : '去左')
        : undefined,
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p2SingleWing'),
    },
    {
      id: '绝妖星 P2 双翼破坏',
      type: 'StartsUsing',
      netRegex: { id: 'C487', capture: false },
      condition: (data) => data.myDmuPhase === 'p2' &&
        myDmuBooleanConfig(data, 'MyDMU_P2ActionCallout', true),
      durationSeconds: 5,
      infoText: (data) => myDmuBooleanConfig(data, 'MyDMU_P2ActionCallout', true)
        ? myDmuCacheSpeech(
          data,
          'p2WingsOfDestruction',
          data.role === 'tank' ? '双翅膀：近远' : '最大近战，避开坦克',
        )
        : undefined,
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p2WingsOfDestruction'),
    },
    {
      id: '绝妖星 P2 疼飕飕暴风',
      type: 'StartsUsing',
      netRegex: { id: 'C3F7', capture: false },
      condition: (data) => myDmuBooleanConfig(data, 'MyDMU_P2ActionCallout', true),
      durationSeconds: 5,
      infoText: (data) => myDmuCacheSpeech(data, 'p2AeroAssault', '去脚下'),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p2AeroAssault'),
    },
    {
      id: '绝妖星 P2 事计数',
      type: 'GainsEffect',
      netRegex: { effectId: myDmuP2ProgressBuff, capture: true },
      condition: (data) => data.myDmuPhase === 'p2',
      preRun: (data, matches) => {
        const count = Number(matches.count);
        const value = Number.isFinite(count) ? count : 0;
        if (matches.targetId !== undefined)
          data.myDmuP2BuffCounts[matches.targetId] = value;
        if (matches.target !== undefined)
          data.myDmuP2BuffCounts[matches.target] = value;
      },
    },
    {
      id: '绝妖星 P2 事计数清除',
      type: 'LosesEffect',
      netRegex: { effectId: myDmuP2ProgressBuff, capture: true },
      condition: (data) => data.myDmuPhase === 'p2',
      preRun: (data, matches) => {
        if (matches.targetId !== undefined)
          data.myDmuP2BuffCounts[matches.targetId] = 0;
        if (matches.target !== undefined)
          data.myDmuP2BuffCounts[matches.target] = 0;
      },
    },
    {
      id: '绝妖星 P2 八轮塔塔位',
      type: 'MapEffect',
      netRegex: {
        flags: myDmuP2TowerMapEffectFlags,
        location: Object.keys(myDmuP2TowerPoints),
        capture: true,
      },
      condition: (data) => data.myDmuPhase === 'p2',
      run: (data, matches) => myDmuP2RecordTowerMapEffect(data, matches),
    },
    {
      id: '绝妖星 P2 光之波动位置记录',
      type: 'Ability',
      netRegex: { id: 'BABE', capture: true },
      condition: (data) => data.myDmuPhase === 'p2',
      run: (data, matches) => myDmuP2RecordAbilityPosition(data, matches),
    },
    {
      id: '绝妖星 P2 八轮塔头标',
      type: 'HeadMarker',
      netRegex: { id: Object.keys(myDmuP2Headmarkers), capture: true },
      promise: (data, matches) => myDmuP2RememberCombatantPosition(data, matches.targetId),
      run: (data, matches) => myDmuHandleP2Headmarker(data, matches),
    },
    {
      id: '绝妖星 P2 八轮塔初始事件播报',
      type: 'HeadMarker',
      netRegex: { id: Object.keys(myDmuP2Headmarkers), capture: true },
      condition: (data) =>
        data.myDmuPhase === 'p2' &&
        myDmuBooleanConfig(data, 'MyDMU_P2TowerCallout', false),
      delaySeconds: 0.1,
      durationSeconds: 10.2,
      infoText: (data, matches) => {
        const seen = data.myDmuP2RoundSeen?.[1] ?? {};
        if (seen[matches.targetId] !== true || Object.keys(seen).length < 8)
          return undefined;
        return myDmuP2TakeCallout(data, 1, 'p2TowerEventInitial');
      },
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p2TowerEventInitial'),
    },
    {
      id: '绝妖星 P2 八轮塔后续事件播报',
      type: 'HeadMarker',
      netRegex: { id: Object.keys(myDmuP2Headmarkers), capture: true },
      condition: (data) =>
        data.myDmuPhase === 'p2' &&
        myDmuBooleanConfig(data, 'MyDMU_P2TowerCallout', false),
      delaySeconds: 3,
      durationSeconds: 9,
      infoText: (data, matches) =>
        myDmuP2TakePointCalloutForTarget(data, matches.targetId, 2, 7, 'p2TowerEventFollowup'),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p2TowerEventFollowup'),
    },
    {
      id: '绝妖星 P2 光之波动轮次校验',
      type: 'Ability',
      netRegex: { id: 'BABE', capture: true },
      condition: (data) => data.myDmuPhase === 'p2',
      run: (data, matches) => {
        const round = myDmuP2RecordAbilityRound(data, matches);
        if (round === undefined)
          return;
        myDmuApplyP2Round(data, round);
        if (round === 7)
          myDmuScheduleP2Round8(data);
        if (round >= 8 && myDmuMarkConfigured(data, 'MyDMU_P2TowerMarkV3'))
          myDmuScheduleClearMarks(data, 'p2Tower', 1.2, (data) =>
            (data.myDmuP2AbilityRound ?? 0) >= 8 && myDmuMarkConfigured(data, 'MyDMU_P2TowerMarkV3'));
      },
    },
    {
      id: '绝妖星 P2 八轮塔第八轮事件播报',
      type: 'Ability',
      netRegex: { id: 'BABE', capture: false },
      condition: (data) =>
        data.myDmuPhase === 'p2' &&
        myDmuBooleanConfig(data, 'MyDMU_P2TowerCallout', false),
      delaySeconds: 0.1,
      suppressSeconds: 1,
      durationSeconds: 9,
      infoText: (data) => data.myDmuP2AbilityRound === 7
        ? myDmuP2TakeCallout(data, 8, 'p2TowerEventRound8')
        : undefined,
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p2TowerEventRound8'),
    },
    {
      id: '绝妖星 P3 水火Debuff',
      type: 'GainsEffect',
      netRegex: { effectId: ['640', '641'], capture: true },
      condition: (data, matches) =>
        data.myDmuPhase === 'p3' &&
        myDmuBooleanConfig(data, 'MyDMU_P3DebuffCallout', true) &&
        matches.target === data.me,
      delaySeconds: 0.5,
      durationSeconds: 5,
      suppressSeconds: 1,
      infoText: (data, matches) =>
        myDmuCacheSpeech(data, `p3Debuff${matches.effectId}`, myDmuP3ElementDebuffText(matches)),
      tts: null,
      soundVolume: 0,
      run: (data, matches) => myDmuSpeakCached(data, `p3Debuff${matches.effectId}`),
    },
    {
      id: '绝妖星 P3 风Debuff',
      type: 'GainsEffect',
      netRegex: { effectId: ['642', '643'], capture: true },
      condition: (data, matches) =>
        data.myDmuPhase === 'p3' &&
        myDmuBooleanConfig(data, 'MyDMU_P3DebuffCallout', true) &&
        matches.target === data.me,
      delaySeconds: (_data, matches) => Math.max((myDmuNumber(matches.duration) ?? 68) - 10, 0),
      durationSeconds: 5,
      suppressSeconds: 1,
      infoText: (data, matches) =>
        myDmuCacheSpeech(data, `p3Debuff${matches.effectId}`, myDmuP3ElementDebuffText(matches)),
      tts: null,
      soundVolume: 0,
      run: (data, matches) => myDmuSpeakCached(data, `p3Debuff${matches.effectId}`),
    },
    {
      id: '绝妖星 P3 防火墙',
      type: 'StartsUsing',
      netRegex: { id: ['C2E2', 'C2E3'], capture: false },
      condition: (data) =>
        data.myDmuPhase === 'p3' &&
        myDmuBooleanConfig(data, 'MyDMU_P3ActionCallout', true),
      delaySeconds: 0.5,
      durationSeconds: 5,
      suppressSeconds: 1,
      infoText: (data) => data.myDmuP3FirewallTargetKind === undefined ?
        myDmuCacheSpeech(data, 'p3Firewall', '获取防火墙') :
        undefined,
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p3Firewall'),
    },
    {
      id: '绝妖星 P3 防火墙目标',
      type: 'GainsEffect',
      netRegex: { effectId: Object.keys(myDmuP3FirewallEffects), capture: true },
      condition: (data, matches) =>
        data.myDmuPhase === 'p3' &&
        myDmuBooleanConfig(data, 'MyDMU_P3ActionCallout', true) &&
        matches.target === data.me,
      preRun: (data, matches) => {
        data.myDmuP3FirewallTargetKind = myDmuP3FirewallInfo(matches.effectId)?.targetKind;
      },
      durationSeconds: 5,
      suppressSeconds: 1,
      infoText: (data, matches) => myDmuBooleanConfig(data, 'MyDMU_P3ActionCallout', true)
        ? myDmuCacheSpeech(data, 'p3FirewallTarget', myDmuP3FirewallInfo(matches.effectId)?.text)
        : undefined,
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p3FirewallTarget'),
    },
    {
      id: '绝妖星 P3 防火墙移除',
      type: 'LosesEffect',
      netRegex: { effectId: Object.keys(myDmuP3FirewallEffects), capture: true },
      condition: (data, matches) => data.myDmuPhase === 'p3' && matches.target === data.me,
      run: (data) => data.myDmuP3FirewallTargetKind = undefined,
    },
    {
      id: '绝妖星 P3 防火墙打错目标',
      type: 'Ability',
      netRegex: {
        target: ['艾克斯迪司', '新生艾克斯迪司', '卡奥斯', 'Exdeath', 'Neo Exdeath', 'Chaos'],
        capture: true,
      },
      condition: (data, matches) =>
        data.myDmuPhase === 'p3' &&
        myDmuBooleanConfig(data, 'MyDMU_P3ActionCallout', true) &&
        myDmuP3FirewallWrongTargetText(data, matches) !== undefined,
      promise: async (data) => myDmuUpdateSelectedTargetId(data),
      durationSeconds: 3,
      alarmText: (data, matches) =>
        myDmuCacheSpeech(data, 'p3FirewallWrongTarget', myDmuP3FirewallSelectedWrongTargetText(data, matches)),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p3FirewallWrongTarget'),
    },
    {
      id: '绝妖星 P3 深层痛楚',
      type: 'StartsUsing',
      netRegex: { id: 'BAF2', capture: false },
      condition: (data) =>
        data.myDmuPhase === 'p3' &&
        myDmuBooleanConfig(data, 'MyDMU_P3ActionCallout', true),
      durationSeconds: 5,
      infoText: (data) => myDmuCacheSpeech(data, 'p3BowelsOfAgony', '大AOE'),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p3BowelsOfAgony'),
    },
    {
      id: '绝妖星 P3 经纬度聚爆',
      type: 'StartsUsing',
      netRegex: { id: ['BAFD', 'BAFE'], capture: true },
      condition: (data) =>
        data.myDmuPhase === 'p3' &&
        myDmuBooleanConfig(data, 'MyDMU_P3ActionCallout', true),
      durationSeconds: 5,
      suppressSeconds: 1,
      alertText: (data, matches) => myDmuBooleanConfig(data, 'MyDMU_P3ActionCallout', true)
        ? myDmuCacheSpeech(
          data,
          'p3LatitudeLongitude',
          matches.id.toUpperCase() === 'BAFE' ? '先去前后' : '先去左右',
        )
        : undefined,
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p3LatitudeLongitude'),
    },
    {
      id: '绝妖星 P3 经纬度聚爆穿',
      type: 'StartsUsing',
      netRegex: { id: ['BAFD', 'BAFE'], capture: false },
      condition: (data) =>
        data.myDmuPhase === 'p3' &&
        myDmuBooleanConfig(data, 'MyDMU_P3ActionCallout', true),
      delaySeconds: 5.3,
      durationSeconds: 3,
      suppressSeconds: 1,
      alertText: (data) => myDmuCacheSpeech(data, 'p3LatitudeLongitudeCross', '穿'),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p3LatitudeLongitudeCross'),
    },
    {
      id: '绝妖星 P3 响亮亮耳光',
      type: 'StartsUsing',
      netRegex: { id: ['BAE6', 'BAE7'], capture: true },
      condition: (data) =>
        data.myDmuPhase === 'p3' &&
        myDmuBooleanConfig(data, 'MyDMU_P3ActionCallout', true),
      durationSeconds: 5,
      suppressSeconds: 1,
      alertText: (data, matches) => myDmuBooleanConfig(data, 'MyDMU_P3ActionCallout', true)
        ? myDmuCacheSpeech(
          data,
          'p3LoudSlap',
          matches.id.toUpperCase() === 'BAE6' ? '右侧分摊' : '左侧职能分散',
        )
        : undefined,
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p3LoudSlap'),
    },
    {
      id: '绝妖星 P3 暴雷死刑',
      type: 'StartsUsing',
      netRegex: { id: 'BB09', capture: true },
      condition: (data) =>
        data.myDmuPhase === 'p3' &&
        data.role === 'tank' && myDmuBooleanConfig(data, 'MyDMU_P3ActionCallout', true),
      durationSeconds: 4,
      suppressSeconds: 1,
      alertText: (data) => data.role === 'tank' &&
        myDmuBooleanConfig(data, 'MyDMU_P3ActionCallout', true)
        ? myDmuCacheSpeech(data, 'p3ThunderTankbuster', '死刑')
        : undefined,
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p3ThunderTankbuster'),
    },
    {
      id: '绝妖星 P3 地震血量归一',
      type: 'StartsUsing',
      netRegex: { id: 'C572', capture: false },
      condition: (data) =>
        data.myDmuPhase === 'p3' &&
        myDmuBooleanConfig(data, 'MyDMU_P3ActionCallout', true),
      durationSeconds: 4,
      suppressSeconds: 1,
      alertText: (data) => myDmuCacheSpeech(data, 'p3EarthquakeHpOne', '血量归一'),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p3EarthquakeHpOne'),
    },
    {
      id: '绝妖星 P3 简易打铁警察',
      type: 'Ability',
      netRegex: { targetId: '4.{7}', capture: true },
      condition: (data, matches) => {
        if (data.myDmuPhase !== 'p3' || !myDmuBooleanConfig(data, 'MyDMU_P3ActionCallout', true))
          return false;
        if (matches.targetIndex !== undefined && matches.targetIndex !== '0')
          return false;
        if (Number.parseInt(matches.damage ?? '0', 16) !== 0)
          return false;
        const flags = Number.parseInt(matches.flags ?? '0', 16);
        if (!Number.isFinite(flags) || (flags & 0xFF) !== 7)
          return false;
        if (matches.source === data.me)
          return true;
        return myDmuPartyNames(data).includes(matches.source);
      },
      durationSeconds: 3,
      promise: async (data, matches) => {
        if (matches.source === data.me)
          await myDmuUpdateSelectedTargetId(data);
      },
      infoText: (data, matches) => {
        const role = myDmuGetRpByName(data, matches.source) ?? matches.source;
        const ability = matches.ability ?? matches.id ?? '技能';
        if (matches.source === data.me)
          return myDmuCacheSpeech(
            data,
            'p3Blacksmith',
            myDmuP3SelectedTargetHitText(data, matches, `打铁成功：${ability}`),
          );
        myDmuActLog('P3 打铁警察', {
          role,
          source: matches.source,
          ability,
          self: matches.source === data.me,
        });
        return undefined;
      },
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p3Blacksmith'),
    },
    {
      id: '绝妖星 P3 麻将头标',
      type: 'HeadMarker',
      netRegex: { id: Object.keys(myDmuP3MahjongHeadmarkers), capture: true },
      condition: (data) => data.myDmuPhase === 'p3',
      durationSeconds: 8,
      preRun: (data, matches) => {
        const mahjong = myDmuP3MahjongHeadmarkers[myDmuNormalizeHeadmarkerId(matches.id)];
        if (mahjong === undefined)
          return;
        const targetId = myDmuNormalizeActorId(matches.targetId);
        if (!/^1[0-9A-F]{7}$/u.test(targetId ?? ''))
          return;
        data.myDmuP3Mahjong.markers[targetId] = {
          id: targetId,
          name: matches.target,
          mahjong: mahjong,
        };
        myDmuApplyP3MahjongMarkers(data);
      },
      infoText: (data, matches) => matches.target === data.me ? myDmuCacheP3MahjongCallout(data) : undefined,
      tts: null,
      soundVolume: 0,
      run: (data, matches) => {
        if (matches.target === data.me)
          myDmuSpeakCached(data, 'p3MahjongDirection');
      },
    },
    {
      id: '绝妖星 P3 麻将究极冲击波方向',
      type: 'Ability',
      netRegex: { id: ['BAE3', 'BAE4'], capture: true },
      condition: (data) => data.myDmuPhase === 'p3' && data.myDmuP3Mahjong.lines.length < 2,
      preRun: (data, matches) => {
        myDmuRecordP3MahjongLine(data, matches);
        myDmuApplyP3MahjongMarkers(data);
      },
      durationSeconds: 8,
      infoText: (data) => myDmuCacheP3MahjongCallout(data),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p3MahjongDirection'),
    },
    {
      id: '绝妖星 P3 麻将结束清除标点',
      type: 'Ability',
      netRegex: { id: 'BAE4', capture: true },
      condition: (data) => data.myDmuPhase === 'p3',
      run: (data, matches) => {
        const targetId = myDmuNormalizeActorId(matches.targetId);
        if (/^1[0-9A-F]{7}$/u.test(targetId ?? ''))
          data.myDmuP3Mahjong.resolvedTargetIds[targetId] = true;
        data.myDmuP3Mahjong.resolveCount ??= 0;
        data.myDmuP3Mahjong.resolveCount++;
        if (data.myDmuP3Mahjong.resolveCount >= 8) {
          if (data.myDmuP3Mahjong.marked)
            myDmuScheduleClearMarks(data, 'p3Mahjong', 0.5, (data) => data.myDmuP3Mahjong.resolveCount >= 8);
        }
      },
    },
    {
      id: '绝妖星 P3 一二三目标',
      type: 'GainsEffect',
      netRegex: { effectId: Object.keys(myDmuP3TargetBuffs), capture: true },
      preRun: (data, matches) => {
        const effectId = matches.effectId.toUpperCase();
        const kind = myDmuP3TargetBuffs[effectId];
        if (kind === undefined)
          return;
        const bucket = data.myDmuP3Targets[kind];
        if (bucket.some((entry) => entry.id === matches.targetId))
          return;
        bucket.push({
          id: matches.targetId,
          name: matches.target,
          role: myDmuGetRpByName(data, matches.target),
        });
        myDmuTryApplyP3TargetMarkers(data);
      },
    },
    {
      id: '绝妖星 P3 一二三目标清除标点',
      type: 'LosesEffect',
      netRegex: { effectId: Object.keys(myDmuP3TargetBuffs), capture: true },
      condition: (data) => data.myDmuPhase === 'p3',
      run: (data, matches) => {
        const kind = myDmuP3TargetBuffs[matches.effectId.toUpperCase()];
        if (kind === undefined)
          return;
        data.myDmuP3Targets[kind] = data.myDmuP3Targets[kind].filter((entry) => entry.id !== matches.targetId);
        const remaining = data.myDmuP3Targets.first.length + data.myDmuP3Targets.second.length +
          data.myDmuP3Targets.third.length;
        if (remaining === 0 && data.myDmuP3Targets.marked)
          myDmuScheduleClearMarks(data, 'p3Targets', 0.5, (data) =>
            data.myDmuP3Targets.first.length + data.myDmuP3Targets.second.length +
              data.myDmuP3Targets.third.length === 0 && data.myDmuP3Targets.marked);
      },
    },
    {
      id: '绝妖星 P4 真假ActorControl优先证据',
      type: 'ActorControlExtra',
      netRegex: {
        category: '0014',
        param1: myDmuP4TruthActorControlEffectIds,
        param2: myDmuP4TruthActorControlMarkers,
        param3: '0',
        param4: '0',
        capture: true,
      },
      condition: (data) => data.myDmuPhase === 'p4',
      run: (data, matches) => {
        const truth = myDmuP4TruthFromActorControl(matches);
        if (truth === undefined)
          return;
        myDmuP4RecordTruth(data, truth.target, truth.value, matches, 'actor-control');
        myDmuRetryAction(data, 'p4-buff-chat', () =>
          myDmuTrySendP4BuffChats(data), 8, 500);
        myDmuRetryAction(data, 'p4-mark-timing', () =>
          myDmuProcessP4MarkTiming(data, 'truth-actor-control'), 12, 250);
      },
    },
    {
      id: '绝妖星 P4 真假状态列表',
      type: 'StatusEffect',
      netRegex: { data3: Object.keys(myDmuP4TruthStatuses), capture: true },
      condition: (data) => data.myDmuPhase === 'p4',
      preRun: (data, matches) => {
        const truth = myDmuP4TruthFromStatus(matches);
        if (truth === undefined)
          return;
        myDmuP4RecordTruth(data, truth.target, truth.value, matches, 'status-list');
        myDmuRetryAction(data, 'p4-buff-chat', () =>
          myDmuTrySendP4BuffChats(data), 8, 500);
        myDmuRetryAction(data, 'p4-mark-timing', () =>
          myDmuProcessP4MarkTiming(data, 'truth-status'), 12, 250);
      },
    },
    {
      id: '绝妖星 P4 真假头标',
      type: 'HeadMarker',
      netRegex: {
        id: [...Object.keys(myDmuP4TruthHeadmarkers), ...Object.keys(myDmuP4MagicReleaseHeadmarkers)],
        capture: true,
      },
      condition: (data) => data.myDmuPhase === 'p4',
      preRun: (data, matches) => {
        const markerId = myDmuNormalizeHeadmarkerId(matches.id);
        const truth = myDmuP4TruthHeadmarkers[markerId];
        if (truth !== undefined) {
          myDmuP4RecordTruth(data, truth.target, truth.value, matches, 'headmarker');
          myDmuRetryAction(data, 'p4-buff-chat', () =>
            myDmuTrySendP4BuffChats(data), 8, 500);
          myDmuRetryAction(data, 'p4-mark-timing', () =>
            myDmuProcessP4MarkTiming(data, 'truth-headmarker'), 12, 250);
        }
        myDmuP4MagicRecordReleaseMarker(data, matches, 'magic-headmarker');
      },
    },
    {
      id: '绝妖星 P4 魔法储存放出读条',
      type: 'StartsUsing',
      netRegex: {
        id: [myDmuP4MagicStorageStartId, myDmuP4MagicReleaseId, ...Object.keys(myDmuP4MagicStorageLabels)],
        capture: true,
      },
      condition: (data) => data.myDmuPhase === 'p4',
      run: (data, matches) => {
        const id = matches.id.toUpperCase();
        if (id === myDmuP4MagicStorageStartId)
          return myDmuP4MagicBeginStorage(data, matches);
        if (id === myDmuP4MagicReleaseId)
          return myDmuP4MagicReleaseChannel(data, matches, 'starts-using');
        myDmuRecordP4LateSpell(data, matches);
        return myDmuP4MagicRecordStorageSpell(data, matches);
      },
    },
    {
      id: '绝妖星 P4 魔法放出结算兜底',
      type: 'Ability',
      netRegex: { id: [myDmuP4MagicReleaseId, ...Object.keys(myDmuP4MagicStorageLabels)], capture: true },
      condition: (data) => data.myDmuPhase === 'p4',
      run: (data, matches) => {
        const id = matches.id.toUpperCase();
        if (id === myDmuP4MagicReleaseId)
          return myDmuP4MagicReleaseChannel(data, matches, 'ability');
        myDmuRecordP4LateSpell(data, matches);
        return myDmuP4MagicRecordStorageSpell(data, matches);
      },
    },
    {
      id: '绝妖星 P4 鸳鸯锅个人记录',
      type: 'GainsEffect',
      netRegex: { effectId: myDmuP4MandarinDuckBuffs, capture: true },
      condition: (data, matches) => data.myDmuPhase === 'p4' && matches.target === data.me,
      run: (data, matches) => {
        myDmuRecordP4MandarinDuckBuff(data, matches);
        myDmuRetryAction(data, 'p4-solution-macro', () =>
          myDmuTrySendP4SolutionMacro(data), 10, 500);
      },
    },
    {
      id: '绝妖星 P4 鸳鸯锅暗黑光',
      type: 'StartsUsing',
      netRegex: { id: myDmuP4WhiteAntilightId, capture: true },
      condition: (data) => data.myDmuPhase === 'p4',
      run: (data, matches) => {
        myDmuRecordP4MandarinDuckAntilight(data, matches);
        myDmuRetryAction(data, 'p4-solution-macro', () =>
          myDmuTrySendP4SolutionMacro(data), 12, 500);
      },
    },
    {
      id: '绝妖星 P4 无之泛滥',
      type: 'StartsUsing',
      netRegex: { id: myDmuP4FloodIds, capture: false },
      condition: (data) =>
        data.myDmuPhase === 'p4' &&
        myDmuBooleanConfig(data, 'MyDMU_P4BuffChat', true),
      durationSeconds: 5,
      suppressSeconds: 1,
      infoText: (data) => myDmuCacheSpeech(data, 'p4NoFlood', myDmuP4NoFloodText(data)),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p4NoFlood'),
    },
    {
      id: '绝妖星 P4 Buff 缓存与元素标点',
      type: 'GainsEffect',
      netRegex: { effectId: myDmuP4TrackedBuffs, capture: true },
      preRun: (data, matches) => {
        myDmuP4CacheBuff(data, matches);
        myDmuRetryAction(data, 'p4-buff-chat', () =>
          myDmuTrySendP4BuffChats(data), 8, 500);
        myDmuRetryAction(data, 'p4-mark-timing', () =>
          myDmuProcessP4MarkTiming(data, 'buff-cache'), 12, 250);
      },
    },
    {
      id: '绝妖星 P4 Buff 剩余5秒默语',
      type: 'GainsEffect',
      netRegex: { effectId: myDmuP4PersonalActionBuffs, capture: true },
      condition: (data, matches) =>
        data.myDmuPhase === 'p4' &&
        matches.target === data.me &&
        myDmuBooleanConfig(data, 'MyDMU_P4BuffChat', true),
      delaySeconds: (_data, matches) => Math.max((myDmuNumber(matches.duration) ?? 0) - 5, 0),
      run: (data, matches) => {
        myDmuRetryAction(data, 'p4-solution-macro', () =>
          myDmuTrySendP4SolutionMacro(data), 8, 300);
      },
    },
    {
      id: '绝妖星 P5 学者扩散盾',
      type: 'StartsUsing',
      netRegex: { id: 'C24A', capture: false },
      condition: (data) => data.myDmuPhase === 'p4',
      preRun: (data) => data.myDmuP4.flutteringUltimateCount++,
      delaySeconds: 9.1,
      durationSeconds: 5,
      suppressSeconds: 10,
      infoText: (data) => {
        if (
          data.myDmuP4.flutteringUltimateCount !== 2 ||
          data.job !== 'SCH' ||
          !myDmuBooleanConfig(data, 'MyDMU_P5MitigationAlert', true)
        )
          return undefined;
        return myDmuCacheSpeech(data, 'p5ScholarShield', '扩散盾');
      },
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p5ScholarShield'),
    },
    {
      id: '绝妖星 P5 癫狂交响曲八方',
      type: 'StartsUsing',
      netRegex: { id: 'BB50', capture: false },
      condition: (data) => myDmuP5CalloutEnabled(data),
      durationSeconds: 5,
      suppressSeconds: 1,
      infoText: (data) => {
        const text = myDmuP5SymphonySpreadText(data);
        if (text === undefined && data.myDmuSpeech !== undefined)
          delete data.myDmuSpeech.p5SymphonySpread;
        return myDmuCacheSpeech(data, 'p5SymphonySpread', text);
      },
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p5SymphonySpread'),
    },
    {
      id: '绝妖星 P5 癫狂交响曲死刑',
      type: 'GainsEffect',
      netRegex: { effectId: Object.keys(myDmuP5SymphonyBuffs), capture: true },
      condition: (data, matches) => myDmuP5CalloutEnabled(data) && matches.target === data.me,
      durationSeconds: 5,
      suppressSeconds: 1,
      infoText: (data, matches) =>
        myDmuCacheSpeech(data, 'p5SymphonyTankbuster', myDmuP5SymphonyInfo(matches.effectId)?.initial),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p5SymphonyTankbuster'),
    },
    {
      id: '绝妖星 P5 癫狂交响曲后续',
      type: 'GainsEffect',
      netRegex: { effectId: Object.keys(myDmuP5SymphonyBuffs), capture: true },
      condition: (data, matches) => myDmuP5CalloutEnabled(data) && matches.target === data.me,
      delaySeconds: 2.8,
      durationSeconds: 3,
      suppressSeconds: 1,
      infoText: (data, matches) =>
        myDmuCacheSpeech(data, 'p5SymphonyFollowup', myDmuP5SymphonyInfo(matches.effectId)?.followup),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p5SymphonyFollowup'),
    },
    {
      id: '绝妖星 P5 人群神圣',
      type: 'Ability',
      netRegex: { id: 'BB54', capture: true },
      condition: (data) => myDmuP5CalloutEnabled(data),
      preRun: (data, matches) => myDmuRecordP5CrowdHoly(data, matches),
      durationSeconds: 4,
      infoText: (data) => myDmuCacheSpeech(data, 'p5CrowdHoly', myDmuP5CrowdHolyText(data)),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p5CrowdHoly'),
    },
    {
      id: '绝妖星 P5 洪水方向',
      type: 'StartsUsingExtra',
      netRegex: { id: 'C183', capture: true },
      condition: (data) => myDmuP5CalloutEnabled(data),
      preRun: (data, matches) => myDmuRecordP5Flood(data, matches),
      durationSeconds: 7,
      infoText: (data) => myDmuCacheSpeech(data, 'p5Flood', myDmuP5FloodText(data)),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p5Flood'),
    },
    {
      id: '绝妖星 P5 三星状态重置',
      type: 'StartsUsing',
      netRegex: { id: 'BB42', capture: false },
      condition: (data) => data.myDmuPhase === 'p5',
      run: (data) => myDmuResetP5Trio(data),
    },
    {
      id: '绝妖星 P5 三星塔记录',
      type: 'CombatantMemory',
      netRegex: {
        change: 'Add',
        pair: [{ key: 'BNpcID', value: Object.keys(myDmuP5TrioTowerElements) }],
        capture: true,
      },
      condition: (data) => data.myDmuPhase === 'p5',
      preRun: (data, matches) => myDmuRecordP5TrioTower(data, matches),
    },
    {
      id: '绝妖星 P5 三星Buff记录',
      type: 'GainsEffect',
      netRegex: { effectId: Object.keys(myDmuP5TrioBuffs), capture: true },
      condition: (data) => data.myDmuPhase === 'p5',
      preRun: (data, matches) => myDmuRecordP5TrioBuff(data, matches),
    },
    {
      id: '绝妖星 P5 三星行动',
      type: 'GainsEffect',
      netRegex: { effectId: Object.keys(myDmuP5TrioBuffs), capture: true },
      condition: (data) => myDmuP5CalloutEnabled(data),
      delaySeconds: 0.5,
      durationSeconds: 5,
      suppressSeconds: 1,
      infoText: (data) => myDmuCacheSpeech(data, 'p5TrioFirst', myDmuP5TrioOwnText(data)),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p5TrioFirst'),
    },
    {
      id: '绝妖星 P5 三星钢月',
      type: 'StartsUsing',
      netRegex: { id: ['C24E', 'C24F'], capture: true },
      condition: (data) => myDmuP5CalloutEnabled(data),
      durationSeconds: 5,
      suppressSeconds: 1,
      infoText: (data, matches) =>
        myDmuCacheSpeech(data, `p5TrioChoice${matches.id}`, myDmuP5TrioChoiceText(data, matches)),
      tts: null,
      soundVolume: 0,
      run: (data, matches) => myDmuSpeakCached(data, `p5TrioChoice${matches.id}`),
    },
    {
      id: '绝妖星 P5 三星亮塔收集',
      type: 'ActorControlExtra',
      netRegex: { category: '019D', param1: '10', param2: '20', param3: '0', param4: '0', capture: true },
      condition: (data) => data.myDmuPhase === 'p5',
      preRun: (data, matches) => myDmuRecordP5TrioLitTower(data, matches),
    },
    {
      id: '绝妖星 P5 三星闲人塔',
      type: 'ActorControlExtra',
      netRegex: { category: '019D', param1: '10', param2: '20', param3: '0', param4: '0', capture: false },
      condition: (data) => myDmuP5CalloutEnabled(data),
      delaySeconds: 0.2,
      durationSeconds: 5,
      suppressSeconds: 1,
      infoText: (data) => myDmuCacheSpeech(data, 'p5TrioIdleTower', myDmuP5TrioIdleTowerText(data)),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p5TrioIdleTower'),
    },
    {
      id: '绝妖星 P5 魔击计数',
      type: 'Ability',
      netRegex: { id: 'C652', capture: false },
      condition: (data) => myDmuP5CalloutEnabled(data),
      durationSeconds: 3,
      suppressSeconds: 1,
      infoText: (data) => myDmuCacheSpeech(data, 'p5MagicHit', myDmuP5MagicHitText(data)),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p5MagicHit'),
    },
    {
      id: '绝妖星 P5 软狂暴集合',
      type: 'StartsUsing',
      netRegex: { id: 'BB35', capture: false },
      condition: (data) => myDmuP5CalloutEnabled(data),
      countdownSeconds: 9.7,
      durationSeconds: 5,
      alertText: (data) => myDmuCacheSpeech(data, 'p5SoftEnrageStack', '软狂暴集合'),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p5SoftEnrageStack'),
    },
    {
      id: '绝妖星 P5 软狂暴走',
      type: 'StartsUsing',
      netRegex: { id: 'BB38', capture: false },
      condition: (data) => myDmuP5CalloutEnabled(data),
      countdownSeconds: 4.7,
      durationSeconds: 3,
      alertText: (data) => myDmuCacheSpeech(data, 'p5SoftEnrageMove', '走'),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p5SoftEnrageMove'),
    },
    {
      id: '绝妖星 P5 软狂暴停',
      type: 'StartsUsing',
      netRegex: { id: 'BB38', capture: false },
      condition: (data) => myDmuP5CalloutEnabled(data),
      delaySeconds: 4.7,
      durationSeconds: 3,
      infoText: (data) => myDmuCacheSpeech(data, 'p5SoftEnrageStop', myDmuP5SoftEnrageStopText(data)),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p5SoftEnrageStop'),
    },
    {
      id: '绝妖星 P5 狂暴',
      type: 'StartsUsing',
      netRegex: { id: 'BB3A', capture: false },
      condition: (data) => myDmuP5CalloutEnabled(data),
      countdownSeconds: 30,
      durationSeconds: 5,
      infoText: (data) => myDmuCacheSpeech(data, 'p5Enrage', '狂暴'),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p5Enrage'),
    },
    {
      id: '绝妖星 P4 元素标点时机',
      type: 'GainsEffect',
      netRegex: { effectId: myDmuP4ElementBuffs, capture: true },
      run: (data) => myDmuRetryAction(
        data,
        'p4-mark-timing',
        () => myDmuProcessP4MarkTiming(data, 'element-fallback'),
        12,
        250,
      ),
    },
    {
      id: '绝妖星 P4 元素结束清除标点',
      type: 'LosesEffect',
      netRegex: { effectId: myDmuP4ElementBuffs, capture: true },
      condition: (data) => data.myDmuPhase === 'p4',
      run: (data, matches) => {
        const round = myDmuP4RoundForTarget(
          data,
          matches.targetId,
          matches.effectId.toUpperCase(),
          myDmuNumber(matches.duration),
        ) ?? 'unknown';
        if (data.myDmuP4.elementMarked[round] && !data.myDmuP4.elementCleared[round])
          myDmuP4TransitionElementToPetrify(data, round, 'lose-effect');
      },
    },
    {
      id: '绝妖星 P4 石化标点时机',
      type: 'GainsEffect',
      netRegex: { effectId: myDmuP4PetrifyBuff, capture: true },
      run: (data) => myDmuRetryAction(
        data,
        'p4-mark-timing',
        () => myDmuProcessP4MarkTiming(data, 'petrify-fallback'),
        12,
        250,
      ),
    },
    {
      id: '绝妖星 P4 石化结束清除标点',
      type: 'LosesEffect',
      netRegex: { effectId: myDmuP4PetrifyBuff, capture: true },
      condition: (data) => data.myDmuPhase === 'p4',
      run: (data, matches) => {
        const round = myDmuP4RoundForTarget(
          data,
          matches.targetId,
          myDmuP4PetrifyBuff,
          myDmuNumber(matches.duration),
        ) ?? 'unknown';
        const kind = myDmuP4PetrifyKind(round);
        if (data.myDmuP4.petrifyMarked[round] && !data.myDmuP4.petrifyCleared[round])
          myDmuP4ScheduleTimer(data, `lose-${kind}`, 800, () =>
            myDmuP4ClearKind(data, kind, 'lose-effect'));
      },
    },
    {
      id: '绝妖星 P2 结束清除标点',
      type: 'StartsUsing',
      netRegex: { id: 'C3F7', capture: false },
      delaySeconds: 1,
      run: (data) => myDmuClearMarks(data),
    },
  ],
  timelineReplace: [
    {
      locale: 'cn',
      replaceText: {
        'Revolting Ruin III': '恶狠狠毁荡',
        'Graven Image': '众神之像',
        'Pulse Wave': '波动冲击',
        'Mystery Magic': '玄乎乎魔法',
        'Blizzard III Blowout': '扩大大冰封',
        'Flagrant Fire III': '呼啦啦爆炎',
        'Wave Cannon': '波动炮',
        'Double-trouble Trap': '连环环陷阱',
        'Double-Trouble Trap': '连环环陷阱',
        'Explosion': '大引爆',
        'Thrumming Thunder III': '劈啪啪暴雷',
        'Light of Judgment': '制裁之光',
        'Hyperdrive': '超驱动',
        'Gravitas': '重力弹',
        'Vitrophyre': '岩石弹',
        'Intemperate Will': '扑杀的神气',
        'Gravitational Wave': '重力波',
        'Gravity III': '强重力',
        'Tele-trouncing': '唰啦啦传送',
        'Indulgent Will': '圣母的神气',
        'Idyllic Will': '睡魔的神气',
        'Indolent Will': '懒惰的神气',
        'Ave Maria': '圣母颂',
        'Ultimate Embrace': '终末双腕',
        'Forsaken': '遗弃末世',
        'The Path of Light': '光之波动',
        'Spelldriver': '咏唱危机·驱动',
        'Spellscatter': '咏唱危机·散碎',
        'Spellwave': '咏唱危机·波动',
        'Future\'s End': '未来终结',
        'Past\'s End': '过去终结',
        'All Things Ending': '消灭之脚',
        'Trine': '异三角',
        'Wings of Destruction': '破坏之翼',
        'Aero III Assault': '疼飕飕暴风',
        'Definition of Insanity': '重构',
        'the Decisive Battle': '决战',
        'Bowels of Agony': '深层痛楚',
        'Thunder III': '暴雷',
        'Stray Flames': '混沌之炎',
        'Inferno': '地狱之火炎',
        'Cyclone': '气旋',
        'Stray Spray': '混沌之水',
        'Tsunami': '大海啸',
        'Trance': '幻化',
        'Longitudinal Implosion': '经度聚爆',
        'Latitudinal Implosion': '纬度聚爆',
        'Shockwave': '震荡波',
        'Shocking Impact': '重冲击',
        'Ultima Blaster': '究极冲击波',
        'Umbra Smash': '本影爆碎',
        'Vacuum Wave': '真空波',
        'Aetherlink': '以太连接',
        'Max': '放大',
        'Earthquake': '地震',
        'Slap Happy': '响亮亮耳光',
        'Black Hole': '黑洞',
        'Nothingness': '无之波动',
        'Damning Edict': '诅咒敕令',
        'Black Spark': '暗黑火花',
        'Look upon Me and Despair': '本色出演的我',
        'Blackblood': '黑血',
        'White Hole': '白洞',
        'Blizzard III': '冰封',
        'Stomp-a-Mole': '轰隆隆跺脚',
        'Knock Down': '轰击',
        'Big Bang': '顶起',
        'Meteor': '陨石流星',
      },
    },
  ],
});
