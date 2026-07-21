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
const myDmuP1BeamDefaultOrder = ['H2', 'H1', 'ST', 'MT', 'D1', 'D2', 'D3', 'D4'];
const myDmuP1Line23Strategies = {
  mtSt: 'mt_st',
  tankRanged: 'tank_ranged',
};
const myDmuP1TeleportStrategies = {
  standard: 'standard',
  sushiMelee: 'sushi_melee',
};
const myDmuP1Line23TopRoles = {
  [myDmuP1Line23Strategies.mtSt]: new Set(['MT', 'H1', 'D1', 'D3']),
  [myDmuP1Line23Strategies.tankRanged]: new Set(['MT', 'ST', 'D3', 'D4']),
};
const myDmuP1Line23SpreadPoints = {
  [myDmuP1Line23Strategies.mtSt]: {
    MT: { x: 108, z: 95 }, D1: { x: 108, z: 95 },
    ST: { x: 92, z: 105 }, D2: { x: 92, z: 105 },
    H1: { x: 88, z: 94 }, D3: { x: 88, z: 94 },
    H2: { x: 112, z: 106 }, D4: { x: 112, z: 106 },
  },
  [myDmuP1Line23Strategies.tankRanged]: {
    MT: { x: 109, z: 97 }, D3: { x: 109, z: 97 },
    ST: { x: 91, z: 97 }, D4: { x: 91, z: 97 },
    H1: { x: 91, z: 103 }, D1: { x: 91, z: 103 },
    H2: { x: 109, z: 103 }, D2: { x: 109, z: 103 },
  },
};
const myDmuP1TeleportDirectionNames = {
  '上': 'up',
  '下': 'down',
  '左': 'left',
  '右': 'right',
};
const myDmuP1TeleportPoints = {
  [myDmuP1TeleportStrategies.standard]: {
    up_up: [{ x: 112, z: 100 }, { x: 112, z: 106 }],
    left_left: [{ x: 100, z: 88 }, { x: 106, z: 88 }],
    down_down: [{ x: 88, z: 100 }, { x: 88, z: 94 }],
    right_right: [{ x: 100, z: 112 }, { x: 94, z: 112 }],
  },
  [myDmuP1TeleportStrategies.sushiMelee]: {
    up_up: [{ x: 112, z: 99 }, { x: 112, z: 106 }],
    left_left: [{ x: 99, z: 88 }, { x: 106, z: 88 }],
    down_down: [{ x: 88, z: 99 }, { x: 88, z: 94 }],
    right_right: [{ x: 99, z: 112 }, { x: 94, z: 112 }],
  },
};
const myDmuP1TeleportMixedPoints = {
  right_up: { up: { x: 112, z: 112 }, right: { x: 106, z: 112 } },
  up_left: { left: { x: 112, z: 88 }, up: { x: 112, z: 94 } },
  left_down: { down: { x: 88, z: 88 }, left: { x: 94, z: 88 } },
  down_right: { right: { x: 88, z: 112 }, down: { x: 88, z: 106 } },
};
const myDmuP1BasePartners = {
  MT: 'D3', ST: 'D4', H1: 'D1', H2: 'D2',
  D1: 'H1', D2: 'H2', D3: 'MT', D4: 'ST',
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
const myDmuP2EndTowerStrategies = {
  north: 'north',
  between: 'between',
};
const myDmuP2TrineDrawModes = {
  current: 'current',
  preview: 'preview',
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

const myDmuNativeVfxApiVersion = 5;
const myDmuNativeVfxConfigKeys = {
  enabled: 'MyDMU_StringNativeVfx',
  p1: 'MyDMU_StringNativeVfxP1',
  p2: 'MyDMU_StringNativeVfxP2',
  p3: 'MyDMU_StringNativeVfxP3',
  p4: 'MyDMU_StringNativeVfxP4',
  p5: 'MyDMU_StringNativeVfxP5',
  personalGuide: 'MyDMU_StringNativeVfxPersonalGuide',
};
const myDmuNativeVfxScopes = {
  p1: [
    'p1.death',
    'p1.poison',
    'p1.truefalse',
    'p1.beamTower',
    'p1.graven2',
    'p1.graven3',
    'p1.fireThunder',
  ],
  p2: [
    'p2.tower.r1',
    'p2.tower.r2',
    'p2.tower.r3',
    'p2.tower.r4',
    'p2.tower.r5',
    'p2.tower.r6',
    'p2.tower.r7',
    'p2.tower.r8',
    'p2.futurePast',
    'p2.wings',
    'p2.farNear',
    'p2.trine.w1',
    'p2.trine.w2',
    'p2.trine.w3',
  ],
  p3: [
    'p3.elements.water',
    'p3.elements.fire',
    'p3.elements.bigCircle',
    'p3.elements.guide',
    'p3.implosion',
    'p3.thunder',
    'p3.slap',
    'p3.look',
    'p3.edict',
    'p3.umbra',
    'p3.vacuum',
    'p3.mahjong',
    'p3.blackhole.w1',
    'p3.blackhole.w2',
    'p3.blackhole.w3',
    'p3.blackhole.w4',
    'p3.blackhole.guide',
    'p3.tower',
  ],
  p4: [
    'p4.exdeath',
    'p4.elements.short',
    'p4.elements.long',
    'p4.eyes.short',
    'p4.eyes.long',
    'p4.chaos1',
    'p4.chaos2',
    'p4.common.w1',
    'p4.common.w2',
    'p4.common.w3',
    'p4.common.w4',
    'p4.common.w5',
    'p4.common.w6',
  ],
  p5: [
    'p5.repeater.1',
    'p5.repeater.2',
    'p5.repeater.3',
    'p5.repeater.4',
    'p5.flood.w1',
    'p5.flood.w2',
    'p5.flood.w3',
    'p5.flood.w4',
    'p5.symphony.1',
    'p5.symphony.2',
    'p5.trio.w1',
    'p5.trio.w2',
    'p5.trio.w3',
    'p5.groundFire',
    'p5.vortex',
    'p5.forsaken.1',
    'p5.forsaken.2',
    'p5.forsaken.3',
    'p5.forsaken.4',
    'p5.forsaken.5',
  ],
};
const myDmuNativeVfxNpcBaseIds = {
  p1HalfArena: new Set([2015164, 2015165]),
  p2Trine: new Set([2015154, 2015155]),
  p3Elements: new Set([2015290, 2015291, 2015292]),
  p3BlackHole: new Set([19512]),
};
const myDmuNativeVfxStyles = {
  danger: {
    color: [1, 0.08, 0.08, 0.22],
    brightness: 1,
  },
  dangerAlt: {
    color: [0.72, 0.14, 1, 0.2],
    brightness: 1,
  },
  guide: {
    color: [0.05, 0.82, 1, 0.18],
    brightness: 1,
  },
  target: {
    color: [0.15, 1, 0.52, 0.14],
    brightness: 1,
  },
  preview: {
    color: [1, 0.72, 0.04, 0.16],
    brightness: 1,
  },
  fire: {
    color: [1, 0.12, 0.03, 0.3],
    brightness: 1,
  },
  water: {
    color: [0.02, 0.82, 1, 0.28],
    brightness: 1,
  },
  purple: {
    color: [0.7, 0.08, 1, 0.3],
    brightness: 1,
  },
  orange: {
    color: [1, 0.38, 0.02, 0.3],
    brightness: 1,
  },
  litBlue: {
    color: [0.1, 0.58, 1, 0.25],
    brightness: 1,
  },
};

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
const myDmuP4ExdeathBeamIds = {
  C394: 'alive',
  C395: 'death',
  C396: 'boundary',
};
const myDmuP4ElementStartIds = ['C393', 'C3A1', 'C3A2'];
const myDmuP4CommonSpellIds = ['BA98', 'BA9E', 'BA9F', 'BAA1'];
const myDmuP4CommonExpectedCounts = [0, 4, 4, 4, 2, 2, 4];
const myDmuP4CommonExpectedActions = {
  1: { BA98: 2, BA9F: 2 },
  2: { BA9E: 2, BA9F: 2 },
  3: { BA98: 2, BAA1: 2 },
  4: { BAA1: 2 },
  5: { BA9E: 2 },
  6: { BA9E: 2, BA9F: 2 },
};
const myDmuP4ChaosPlacementIds = {
  BB22: { scope: 'p4.chaos1', buffId: '15AB', truth: true, shape: 'circle' },
  BB23: { scope: 'p4.chaos1', buffId: '15AB', truth: false, shape: 'donut' },
  BB24: { scope: 'p4.chaos2', buffId: '15AC', truth: true, shape: 'donut' },
  BB25: { scope: 'p4.chaos2', buffId: '15AC', truth: false, shape: 'circle' },
};
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
const myDmuPartyMarkerLabels = {
  attack1: '攻击1',
  attack2: '攻击2',
  attack3: '攻击3',
  attack4: '攻击4',
  attack5: '攻击5',
  attack6: '攻击6',
  attack7: '攻击7',
  attack8: '攻击8',
  bind1: '锁链1',
  bind2: '锁链2',
  bind3: '锁链3',
  stop1: '禁止1',
  stop2: '禁止2',
  square: '方形',
  circle: '圆圈',
  cross: '叉形',
  triangle: '三角',
};

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
  eden: 'eden',
  omega: 'omega',
};
const myDmuP5SymphonySpreadDirections = {
  [myDmuP5SymphonySpreadSchemes.eden]: {
    MT: '上北',
    ST: '右上',
    H1: '左西',
    H2: '下南',
    D1: '左下',
    D2: '右下',
    D3: '左上',
    D4: '右东',
  },
  [myDmuP5SymphonySpreadSchemes.omega]: {
    MT: '上偏左',
    ST: '上偏右',
    H1: '左偏下',
    H2: '右偏下',
    D1: '下偏左',
    D2: '下偏右',
    D3: '左偏上',
    D4: '右偏上',
  },
};
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
const myDmuP5NativeInvulnerabilityEffects = new Set(['0052', '072C', '0199', '032B', '0CB7']);
const myDmuP5NativeInvulnerabilityLogEffects = ['52', '72C', '199', '32B', 'CB7'];
const myDmuP5NativeSymphonyDefaultOrder = ['H2', 'D2', 'D4', 'ST', 'MT', 'D3', 'H1', 'D1'];
const myDmuP5NativeTrioElements = {
  B56: 'fire',
  B57: 'ice',
  BB6: 'thunder',
};
const myDmuP5NativeTrioTowerElements = {
  '1EC03E': 'fire',
  '1EC03F': 'ice',
  '1EC040': 'thunder',
};
const myDmuP5NativeGroundFireTtlMs = 3640;
const myDmuP5NativeGroundFireSpacing = Math.sqrt(50);
const myDmuP5NativeGroundFireGroupWindowMs = 200;
const myDmuP5NativeGroundFireMatchDistanceSquared = 0.25 ** 2;
const myDmuP5NativeGroundFireStylesByOffset = [
  myDmuNativeVfxStyles.danger,
  myDmuNativeVfxStyles.orange,
  myDmuNativeVfxStyles.preview,
  myDmuNativeVfxStyles.water,
  myDmuNativeVfxStyles.target,
];
const myDmuP5NativeGroundFireGuidePositions = {
  MT: { left: 3, right: 3, x: 100, z: 100 },
  ST: { left: 3, right: 3, x: 100, z: 100 },
  D1: { left: 3, right: 3, x: 100, z: 100 },
  D2: { left: 3, right: 3, x: 100, z: 100 },
  D3: { left: 4, right: 2, x: 100, z: 90 },
  D4: { left: 2, right: 4, x: 100, z: 110 },
  H1: { left: 2, right: 2, x: 90, z: 100 },
  H2: { left: 4, right: 4, x: 110, z: 100 },
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
  if (fl?.doTextCommand !== undefined) {
    fl.doTextCommand(command);
    return true;
  }
  callOverlayHandler({ call: 'PostNamazu', c: 'DoTextCommand', p: command });
  return true;
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

const myDmuP1BeamOrder = (data) => {
  const raw = myDmuConfigValue(data, 'MyDMU_P1BeamOrder', myDmuP1BeamDefaultOrder.join(','));
  const values = Array.isArray(raw)
    ? raw
    : typeof raw === 'string'
      ? raw.split(/[,/]/u)
      : undefined;
  if (values === undefined)
    return myDmuP1P2InvalidConfig(data, 'MyDMU_P1BeamOrder', raw);
  const normalized = values.map((role) => typeof role === 'string' ? role.trim().toUpperCase() : '');
  if (normalized.length !== myDmuRoleOrder.length || new Set(normalized).size !== myDmuRoleOrder.length ||
      normalized.some((role) => !myDmuRoleOrder.includes(role)))
    return myDmuP1P2InvalidConfig(data, 'MyDMU_P1BeamOrder', raw);
  return normalized;
};

const myDmuNewP1BeamOrderLatch = () => ({
  captured: false,
  order: undefined,
});

const myDmuP1MechanicBeamOrder = (data) => {
  const latch = data.myDmuP1BeamOrderLatch ??= myDmuNewP1BeamOrderLatch();
  if (!latch.captured) {
    const order = myDmuP1BeamOrder(data);
    latch.captured = true;
    latch.order = order === undefined ? undefined : [...order];
  }
  return latch.order;
};

const myDmuResetP1BeamOrderLatch = (data) => {
  data.myDmuP1BeamOrderLatch = myDmuNewP1BeamOrderLatch();
};

const myDmuP1Line23Strategy = (data) => myDmuP1P2EnumConfig(
  data,
  'MyDMU_P1Line23Strategy',
  myDmuP1Line23Strategies.mtSt,
  Object.values(myDmuP1Line23Strategies),
);

const myDmuP1TeleportStrategy = (data) => myDmuP1P2EnumConfig(
  data,
  'MyDMU_P1TeleportStrategy',
  myDmuP1TeleportStrategies.standard,
  Object.values(myDmuP1TeleportStrategies),
);

const myDmuP2EndTowerStrategy = (data) => myDmuP1P2EnumConfig(
  data,
  'MyDMU_P2EndTowerStrategy',
  myDmuP2EndTowerStrategies.north,
  Object.values(myDmuP2EndTowerStrategies),
);

const myDmuP2TrineDrawMode = (data) => myDmuP1P2EnumConfig(
  data,
  'MyDMU_P2TrineDrawMode',
  myDmuP2TrineDrawModes.preview,
  Object.values(myDmuP2TrineDrawModes),
);

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
  myDmuRoleOverlayConnected(data) && myDmuMarkConfigured(data, key);

const myDmuAnyMarkEnabled = (data) => [
  'MyDMU_P1PoisonMarkV3',
  'MyDMU_P2TowerMarkV3',
  'MyDMU_P3MahjongMarkV3',
  'MyDMU_P3TargetMarkV3',
  'MyDMU_P4BuffMarkV3',
].some((key) => myDmuMarkConfigured(data, key));

const myDmuP1CalloutEnabled = (data) =>
  data.myDmuPhase === 'p1' && myDmuBooleanConfig(data, 'MyDMU_P1Callout', true);

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

  const runtime = myDmuFl(data);
  const replay = runtime?.getArrReplayClock?.();
  if (replay?.active === true) {
    if (normalizedIds === undefined)
      throw new Error(`${scope} ARR 回放禁止无界 combatant 查询`);
    if (typeof runtime?.getArrReplayCombatants !== 'function')
      throw new Error(`${scope} ARR combatant 快照接口不可用`);
    return runtime.getArrReplayCombatants(
      normalizedIds.map((id) => Number.parseInt(id, 16)),
    );
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

const myDmuRetryAction = (action, count = 6, intervalMs = 500) => {
  if (action())
    return;
  if (count <= 0)
    return;
  setTimeout(() => myDmuRetryAction(action, count - 1, intervalMs), intervalMs);
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

const myDmuSpeakCached = (data, key) => {
  const text = data.myDmuSpeech?.[key];
  if (data.myDmuSpeech !== undefined)
    delete data.myDmuSpeech[key];
  return text;
};

const myDmuActLog = (message, detail) => {
  if (globalThis.console?.log === undefined)
    return;
  const suffix = detail === undefined ? '' : ` ${JSON.stringify(detail)}`;
  console.log(`[String][DMU] ${message}${suffix}`);
};

const myDmuNativeVfxPhaseEnabled = (data, phase = data.myDmuPhase) => {
  if (!myDmuBooleanConfig(data, myDmuNativeVfxConfigKeys.enabled, false))
    return false;
  const key = myDmuNativeVfxConfigKeys[phase];
  return key !== undefined && myDmuBooleanConfig(data, key, false);
};

const myDmuNativeVfxPersonalGuideEnabled = (data) =>
  myDmuNativeVfxPhaseEnabled(data) &&
  myDmuBooleanConfig(data, myDmuNativeVfxConfigKeys.personalGuide, false);

const myDmuNewNativeVfxState = (phase = 'p1') => ({
  rootPhase: phase,
  scopes: {},
  scopeTimers: {},
  scopeGenerations: {},
  commitTimers: {},
  clockTasks: {},
  logicalEvents: {},
  logicalEventOrdinal: 0,
  chain: Promise.resolve(),
  epoch: 1,
  lastSubmittedCount: 0,
  peakActiveCount: 0,
  lastError: undefined,
  activated: false,
  clockKey: undefined,
  blocked: false,
  cleanupStatus: 'idle',
});

const myDmuEnsureNativeVfxState = (data) => {
  data.myDmuNativeVfx ??= myDmuNewNativeVfxState(data.myDmuPhase);
  return data.myDmuNativeVfx;
};

const myDmuNativeVfxApi = (data) => {
  const vfx = myDmuFl(data)?.vfx;
  if (vfx === undefined)
    throw new Error('String Native VFX API 不可用（[必装] String运行库未先加载）');
  if (vfx.apiVersion !== myDmuNativeVfxApiVersion)
    throw new Error(`String Native VFX API 版本不匹配：需要 ${myDmuNativeVfxApiVersion}，实际 ${vfx.apiVersion}`);
  for (const name of [
    'createCircle',
    'createDonut',
    'createSector',
    'createRect',
    'createLine',
    'createArrow',
    'submitFrame',
    'clearScope',
    'endSession',
  ]) {
    if (typeof vfx[name] !== 'function')
      throw new Error(`String Native VFX API 缺少 ${name}`);
  }
  for (const limit of [
    'maximumPrimitivesPerFrame',
    'maximumActivePrimitives',
    'maximumScopes',
  ]) {
    if (!Number.isInteger(vfx.limits?.[limit]) || vfx.limits[limit] <= 0)
      throw new Error(`String Native VFX API 缺少有效 limits.${limit}`);
  }
  return vfx;
};

const myDmuNativeVfxEntityAnchor = (value, offsets = {}) => {
  const entityId = myDmuNormalizeActorId(value);
  if (!/^[14][0-9A-F]{7}$/u.test(entityId ?? ''))
    throw new Error(`VFX 实体 ID 非法：${value}`);
  const x = Number(offsets.x ?? 0);
  const y = Number(offsets.y ?? 0);
  const z = Number(offsets.z ?? 0);
  if (![x, y, z].every(Number.isFinite))
    throw new Error(`VFX 实体偏移非法：${entityId}`);
  return { kind: 'entity', entityId, x, y, z };
};

const myDmuNativeVfxWorldAnchor = (x, z, y = 0) => {
  const values = [Number(x), Number(y), Number(z)];
  if (!values.every(Number.isFinite))
    throw new Error(`VFX 世界坐标非法：${x}/${y}/${z}`);
  return { kind: 'world', x: values[0], y: values[1], z: values[2] };
};

const myDmuNativeVfxDuration = (value, fallback = 5) => {
  const duration = myDmuNumber(value) ?? fallback;
  if (!Number.isFinite(duration))
    throw new Error(`VFX TTL 非法：${value}`);
  return Math.max(0.5, Math.min(60, duration));
};

const myDmuNativeVfxHeading = (matches) => {
  const heading = myDmuNumber(matches?.heading ?? matches?.sourceHeading);
  if (heading === undefined)
    throw new Error(`VFX 缺少 source heading：${matches?.id ?? 'unknown'}`);
  if (heading < -Math.PI * 2 || heading > Math.PI * 2)
    throw new Error(`VFX source heading 越界：${heading}`);
  return heading;
};

const myDmuNativeVfxNormalizeRotation = (value) =>
  Math.atan2(Math.sin(value), Math.cos(value));

const myDmuNativeVfxEventMilliseconds = (matches) => {
  const replayMs = Number(matches?.replayMs);
  if (Number.isFinite(replayMs))
    return replayMs;
  const timestamp = typeof Date.parse === 'function'
    ? Date.parse(matches?.timestamp ?? '')
    : Number.NaN;
  return Number.isFinite(timestamp) ? timestamp : Date.now();
};

const myDmuNativeVfxClock = (data) => {
  const replay = myDmuFl(data)?.getArrReplayClock?.();
  if (replay?.active === true && Number.isSafeInteger(replay.replayMs) &&
      Number.isSafeInteger(replay.generation)) {
    return {
      key: `arr:${replay.generation}`,
      now: replay.replayMs,
    };
  }
  return { key: 'live', now: Date.now() };
};

const myDmuNativeVfxSyncClock = (data) => {
  const state = myDmuEnsureNativeVfxState(data);
  const clock = myDmuNativeVfxClock(data);
  if (state.clockKey === undefined) {
    state.clockKey = clock.key;
    return clock;
  }
  if (state.clockKey === clock.key)
    return clock;
  const previousClockKey = state.clockKey;
  const staleScopes = Object.keys(state.scopes);
  state.epoch++;
  myDmuNativeVfxCancelAllTimers(state);
  state.scopes = {};
  state.scopeGenerations = {};
  state.logicalEvents = {};
  state.lastSubmittedCount = 0;
  state.clockKey = clock.key;
  const epoch = state.epoch;
  if (staleScopes.length > 0) {
    void myDmuNativeVfxEnqueue(data, async () => {
      for (const scope of staleScopes) {
        const cleared = await myDmuNativeVfxClearPhysicalScope(
          data,
          scope,
          `clock-change:${previousClockKey}->${clock.key}`,
        );
        if (!cleared)
          return false;
      }
      return true;
    }, epoch);
  }
  myDmuActLog('Native VFX lifecycle epoch advanced', {
    previousClockKey,
    clockKey: clock.key,
    epoch: state.epoch,
    fallback: false,
  });
  return clock;
};

const myDmuNativeVfxScopeAllowed = (phase, scope) =>
  myDmuNativeVfxScopes[phase]?.includes(scope) === true;

const myDmuNativeVfxCancelScopeTimer = (state, scope) => {
  if (state.scopeTimers[scope] !== undefined)
    clearTimeout(state.scopeTimers[scope]);
  delete state.scopeTimers[scope];
};

const myDmuNativeVfxCancelCommitTimer = (state, scope) => {
  if (state.commitTimers[scope] !== undefined)
    clearTimeout(state.commitTimers[scope]);
  delete state.commitTimers[scope];
};

const myDmuNativeVfxCancelClockTask = (state, key) => {
  if (state.clockTasks[key] !== undefined)
    clearTimeout(state.clockTasks[key]);
  delete state.clockTasks[key];
};

const myDmuNativeVfxCancelClockTasksForScope = (state, scope) => {
  for (const key of Object.keys(state.clockTasks)) {
    if (key.startsWith(`${scope}:`) || key.startsWith(`${scope}.`))
      myDmuNativeVfxCancelClockTask(state, key);
  }
};

const myDmuNativeVfxCancelAllTimers = (state) => {
  for (const scope of Object.keys(state.commitTimers))
    myDmuNativeVfxCancelCommitTimer(state, scope);
  for (const scope of Object.keys(state.scopeTimers))
    myDmuNativeVfxCancelScopeTimer(state, scope);
  for (const key of Object.keys(state.clockTasks))
    myDmuNativeVfxCancelClockTask(state, key);
};

const myDmuNativeVfxScheduleClockTask = (data, key, delayMilliseconds, action) => {
  const state = myDmuEnsureNativeVfxState(data);
  const delay = Number(delayMilliseconds);
  if (!Number.isFinite(delay) || delay < 0 || delay > 300000)
    throw new Error(`Native VFX clock task 延迟非法：${delayMilliseconds}`);
  if (typeof action !== 'function')
    throw new Error(`Native VFX clock task action 非函数：${key}`);
  const clock = myDmuNativeVfxSyncClock(data);
  const clockKey = clock.key;
  const epoch = state.epoch;
  const target = clock.now + delay;
  myDmuNativeVfxCancelClockTask(state, key);
  const poll = () => {
    if (state.epoch !== epoch || state.clockKey !== clockKey) {
      delete state.clockTasks[key];
      return;
    }
    const current = myDmuNativeVfxClock(data);
    if (current.key !== clockKey) {
      delete state.clockTasks[key];
      myDmuNativeVfxSyncClock(data);
      return;
    }
    if (current.now >= target) {
      delete state.clockTasks[key];
      void myDmuNativeVfxEnqueue(data, action, epoch);
      return;
    }
    const remaining = target - current.now;
    state.clockTasks[key] = setTimeout(poll, Math.min(250, Math.max(50, remaining)));
  };
  state.clockTasks[key] = setTimeout(poll, Math.min(250, Math.max(50, delay)));
  return true;
};

const myDmuNativeVfxAcceptLogicalEvent = (data, key, windowMilliseconds, matches) => {
  const state = myDmuEnsureNativeVfxState(data);
  const window = Number(windowMilliseconds);
  if (typeof key !== 'string' || key.length === 0 || key.length > 160)
    throw new Error(`Native VFX logical event key 非法：${key}`);
  if (!Number.isFinite(window) || window < 0 || window > 5000)
    throw new Error(`Native VFX logical event window 非法：${windowMilliseconds}`);
  const clock = myDmuNativeVfxSyncClock(data);
  const eventAt = myDmuNativeVfxEventMilliseconds(matches);
  const previous = state.logicalEvents[key];
  if (previous?.clockKey === clock.key && eventAt >= previous.at &&
      eventAt - previous.at < window)
    return undefined;
  const accepted = {
    clockKey: clock.key,
    at: eventAt,
    ordinal: ++state.logicalEventOrdinal,
  };
  state.logicalEvents[key] = accepted;
  return accepted;
};

const myDmuNativeVfxActiveCount = (state) => Object.values(state.scopes)
  .reduce((sum, entry) => sum + (entry?.records?.length ?? 0), 0);

const myDmuNativeVfxRecordDrawings = (drawings, clock) => drawings.map((drawing) => ({
  drawing,
  clockKey: clock.key,
  expiresAt: clock.now + drawing.durationSeconds * 1000,
}));

const myDmuNativeVfxLiveRecords = (records, clock) => records.filter((record) =>
  record.clockKey === clock.key && record.expiresAt > clock.now);

const myDmuNativeVfxCanonicalDrawings = (records, clock) => records
  .map((record) => ({
    record,
    remainingSeconds: (record.expiresAt - clock.now) / 1000,
  }))
  .filter((entry) => entry.remainingSeconds >= 0.5)
  .map(({ record, remainingSeconds }) => ({
    ...record.drawing,
    durationSeconds: Math.min(record.drawing.durationSeconds, remainingSeconds),
  }));

const myDmuNativeVfxEnqueue = (data, action, epoch = myDmuEnsureNativeVfxState(data).epoch) => {
  const state = myDmuEnsureNativeVfxState(data);
  state.chain = (state.chain ?? Promise.resolve())
    .catch(() => undefined)
    .then(() => state.epoch === epoch ? action() : false);
  return state.chain;
};

const myDmuNativeVfxClearPhysicalScope = async (data, scope, reason) => {
  const state = myDmuEnsureNativeVfxState(data);
  if (state.blocked && state.cleanupStatus === 'global-cleanup-verified')
    return true;
  let vfx;
  try {
    vfx = myDmuNativeVfxApi(data);
    await vfx.clearScope(scope);
    state.cleanupStatus = 'scope-clear-verified';
    return true;
  } catch (error) {
    state.lastError = `${error}`;
    state.blocked = true;
    state.cleanupStatus = 'scope-clear-failed';
    state.epoch++;
    myDmuNativeVfxCancelAllTimers(state);
    state.scopes = {};
    state.scopeGenerations = {};
    state.logicalEvents = {};
    state.lastSubmittedCount = 0;
    let globalCleanupError;
    try {
      vfx ??= myDmuNativeVfxApi(data);
      await vfx.endSession();
      state.cleanupStatus = 'global-cleanup-verified';
    } catch (cleanupError) {
      globalCleanupError = `${cleanupError}`;
      state.cleanupStatus = 'global-cleanup-failed';
    }
    myDmuActLog('Native VFX scope 清理失败', {
      scope,
      reason,
      error: `${error}`,
      globalCleanup: state.cleanupStatus,
      globalCleanupError,
      fallback: false,
    });
    return state.cleanupStatus === 'global-cleanup-verified';
  }
};

const myDmuNativeVfxFailClosed = async (data, phase, scope, reason, error) => {
  const state = myDmuEnsureNativeVfxState(data);
  state.lastError = `${error}`;
  delete state.scopes[scope];
  state.scopeGenerations[scope] = (state.scopeGenerations[scope] ?? 0) + 1;
  myDmuNativeVfxCancelScopeTimer(state, scope);
  myDmuNativeVfxCancelCommitTimer(state, scope);
  myDmuNativeVfxCancelClockTasksForScope(state, scope);
  state.lastSubmittedCount = myDmuNativeVfxActiveCount(state);
  const cleaned = await myDmuNativeVfxClearPhysicalScope(data, scope, reason);
  myDmuActLog('Native VFX 失败关闭', {
    phase,
    scope,
    reason,
    error: `${error}`,
    cleaned,
    fallback: false,
  });
};

const myDmuNativeVfxCommit = async (data, scope, reason, generation, clockKey) => {
  const state = myDmuEnsureNativeVfxState(data);
  const phase = scope.split('.')[0];
  if (state.scopeGenerations[scope] !== generation)
    return false;
  if (state.clockKey !== clockKey || myDmuNativeVfxClock(data).key !== clockKey) {
    myDmuNativeVfxSyncClock(data);
    return false;
  }
  if (!myDmuNativeVfxPhaseEnabled(data, phase) ||
      state.rootPhase !== phase || data.myDmuPhase !== phase) {
    delete state.scopes[scope];
    return await myDmuNativeVfxClearPhysicalScope(data, scope, `${reason}:disabled-or-stale`);
  }
  try {
    const vfx = myDmuNativeVfxApi(data);
    const clock = myDmuNativeVfxSyncClock(data);
    if (clock.key !== clockKey || state.scopeGenerations[scope] !== generation)
      return false;
    const entry = state.scopes[scope];
    const records = myDmuNativeVfxLiveRecords(entry?.records ?? [], clock);
    const drawings = myDmuNativeVfxCanonicalDrawings(records, clock);
    if (entry !== undefined)
      entry.records = records;
    if (drawings.length === 0) {
      delete state.scopes[scope];
      return await myDmuNativeVfxClearPhysicalScope(data, scope, `${reason}:empty`);
    }
    const maximum = vfx.limits.maximumPrimitivesPerFrame;
    if (drawings.length > maximum)
      throw new Error(`scope ${scope} 的 ${drawings.length} 个图元超过单帧硬上限 ${maximum}`);
    if (myDmuNativeVfxClock(data).key !== clockKey) {
      myDmuNativeVfxSyncClock(data);
      return false;
    }
    await vfx.submitFrame(scope, drawings);
    state.lastSubmittedCount = myDmuNativeVfxActiveCount(state);
    state.peakActiveCount = Math.max(state.peakActiveCount, state.lastSubmittedCount);
    state.lastError = undefined;
    state.cleanupStatus = 'session-active';
    return true;
  } catch (error) {
    await myDmuNativeVfxFailClosed(data, phase, scope, reason, error);
    return false;
  }
};

const myDmuNativeVfxScheduleCommit = (data, scope, reason) => {
  const state = myDmuEnsureNativeVfxState(data);
  if (state.commitTimers[scope] !== undefined)
    return;
  const epoch = state.epoch;
  const generation = state.scopeGenerations[scope];
  const clockKey = state.clockKey ?? myDmuNativeVfxSyncClock(data).key;
  state.commitTimers[scope] = setTimeout(() => {
    myDmuNativeVfxCancelCommitTimer(state, scope);
    if (state.epoch !== epoch || state.scopeGenerations[scope] !== generation ||
        state.clockKey !== clockKey || myDmuNativeVfxClock(data).key !== clockKey) {
      myDmuNativeVfxSyncClock(data);
      return;
    }
    void myDmuNativeVfxEnqueue(
      data,
      () => myDmuNativeVfxCommit(data, scope, reason, generation, clockKey),
      epoch,
    );
  }, 50);
};

const myDmuNativeVfxScheduleScopeExpiry = (data, scope) => {
  const state = myDmuEnsureNativeVfxState(data);
  myDmuNativeVfxCancelScopeTimer(state, scope);
  const generation = (state.scopeGenerations[scope] ?? 0) + 1;
  state.scopeGenerations[scope] = generation;
  const epoch = state.epoch;
  const clockKey = state.clockKey ?? myDmuNativeVfxSyncClock(data).key;
  const schedule = () => {
    const clock = myDmuNativeVfxClock(data);
    if (clock.key !== clockKey) {
      myDmuNativeVfxSyncClock(data);
      return;
    }
    const records = myDmuNativeVfxLiveRecords(state.scopes[scope]?.records ?? [], clock);
    if (state.scopes[scope] !== undefined)
      state.scopes[scope].records = records;
    const remaining = Math.max(...records.map((record) => record.expiresAt - clock.now), 0);
    state.scopeTimers[scope] = setTimeout(() => {
      if (state.epoch !== epoch || state.scopeGenerations[scope] !== generation ||
          state.clockKey !== clockKey || myDmuNativeVfxClock(data).key !== clockKey) {
        myDmuNativeVfxSyncClock(data);
        return;
      }
      const currentClock = myDmuNativeVfxSyncClock(data);
      if (currentClock.key !== clockKey || state.epoch !== epoch ||
          state.scopeGenerations[scope] !== generation)
        return;
      const live = myDmuNativeVfxLiveRecords(state.scopes[scope]?.records ?? [], currentClock);
      if (live.length > 0) {
        state.scopes[scope].records = live;
        schedule();
        return;
      }
      delete state.scopes[scope];
      myDmuNativeVfxCancelScopeTimer(state, scope);
      state.scopeGenerations[scope]++;
      state.lastSubmittedCount = myDmuNativeVfxActiveCount(state);
      void myDmuNativeVfxEnqueue(
        data,
        () => myDmuNativeVfxClearPhysicalScope(data, scope, `${scope}:ttl-expired`),
        epoch,
      );
    }, clockKey.startsWith('arr:') ? 50 : Math.max(100, remaining + 100));
  };
  schedule();
};

const myDmuNativeVfxReplaceScope = (data, scope, build, reason = 'replace') => {
  const phase = scope.split('.')[0];
  if (!myDmuNativeVfxPhaseEnabled(data, phase))
    return false;
  const state = myDmuEnsureNativeVfxState(data);
  if (state.rootPhase !== phase || data.myDmuPhase !== phase) {
    myDmuActLog('Native VFX coverage gap', { scope, reason: 'phase-mismatch', fallback: false });
    return false;
  }
  if (!myDmuNativeVfxScopeAllowed(phase, scope)) {
    myDmuActLog('Native VFX coverage gap', { scope, reason: 'unknown-scope', fallback: false });
    return false;
  }
  try {
    if (state.blocked) {
      if (state.cleanupStatus !== 'global-cleanup-verified')
        throw new Error(`Native VFX 清理状态阻断提交：${state.cleanupStatus}`);
      state.blocked = false;
      state.cleanupStatus = 'session-reopen-pending';
      state.lastError = undefined;
    }
    state.activated = true;
    const vfx = myDmuNativeVfxApi(data);
    const clock = myDmuNativeVfxSyncClock(data);
    const drawings = build(vfx);
    if (!Array.isArray(drawings))
      throw new Error('scene builder 必须返回 typed primitive 数组');
    if (drawings.length === 0) {
      myDmuNativeVfxClearScope(data, scope, `${reason}:empty`);
      return true;
    }
    const records = myDmuNativeVfxRecordDrawings(drawings, clock);
    const nextActiveCount = myDmuNativeVfxActiveCount(state) -
      (state.scopes[scope]?.records?.length ?? 0) + records.length;
    if (nextActiveCount > vfx.limits.maximumActivePrimitives)
      throw new Error(`活动图元 ${nextActiveCount} 超过硬上限 ${vfx.limits.maximumActivePrimitives}`);
    const nextScopeCount = Object.keys(state.scopes).length +
      (state.scopes[scope] === undefined ? 1 : 0);
    if (nextScopeCount > vfx.limits.maximumScopes)
      throw new Error(`活动 scope ${nextScopeCount} 超过硬上限 ${vfx.limits.maximumScopes}`);
    state.scopes[scope] = { records };
    myDmuNativeVfxCancelCommitTimer(state, scope);
    myDmuNativeVfxScheduleScopeExpiry(data, scope);
    myDmuNativeVfxScheduleCommit(data, scope, `${scope}:${reason}`);
    return true;
  } catch (error) {
    myDmuActLog('Native VFX coverage gap', { scope, reason, error: `${error}`, fallback: false });
    void myDmuNativeVfxEnqueue(
      data,
      () => myDmuNativeVfxFailClosed(data, phase, scope, reason, error),
    );
    return false;
  }
};

const myDmuNativeVfxMergeScope = (data, scope, build, reason = 'merge') =>
  myDmuNativeVfxReplaceScope(data, scope, (vfx) => {
    const state = myDmuEnsureNativeVfxState(data);
    const clock = myDmuNativeVfxClock(data);
    const previous = myDmuNativeVfxLiveRecords(state.scopes[scope]?.records ?? [], clock);
    const additions = myDmuNativeVfxRecordDrawings(build(vfx), clock);
    const byId = new Map(previous.map((record) => [record.drawing.id, record]));
    for (const record of additions) {
      const existing = byId.get(record.drawing.id);
      byId.set(record.drawing.id, existing === undefined ? record : {
        ...existing,
        drawing: record.drawing,
      });
    }
    return [...byId.values()].map((record) => ({
      ...record.drawing,
      durationSeconds: Math.min(
        record.drawing.durationSeconds,
        (record.expiresAt - clock.now) / 1000,
      ),
    }));
  }, reason);

const myDmuNativeVfxFilterScope = (data, scope, keep, reason = 'filter') => {
  const phase = scope.split('.')[0];
  if (!myDmuNativeVfxPhaseEnabled(data, phase))
    return false;
  const state = myDmuEnsureNativeVfxState(data);
  const clock = myDmuNativeVfxSyncClock(data);
  const previous = myDmuNativeVfxLiveRecords(state.scopes[scope]?.records ?? [], clock);
  const records = previous.filter((record) => keep(record.drawing));
  if (records.length === 0)
    return myDmuNativeVfxClearScope(data, scope, `${reason}:empty`);
  state.scopes[scope] = { records };
  myDmuNativeVfxCancelCommitTimer(state, scope);
  myDmuNativeVfxScheduleScopeExpiry(data, scope);
  myDmuNativeVfxScheduleCommit(data, scope, `${scope}:${reason}`);
  return true;
};

const myDmuNativeVfxClearScope = (data, scope, reason = 'clear', options = {}) => {
  const state = myDmuEnsureNativeVfxState(data);
  const preserveClockTasks = options.preserveClockTasks === true;
  const hadClockTask = !preserveClockTasks && Object.keys(state.clockTasks).some((key) =>
    key.startsWith(`${scope}:`) || key.startsWith(`${scope}.`));
  const hadScope = state.scopes[scope] !== undefined ||
    state.scopeTimers[scope] !== undefined || state.commitTimers[scope] !== undefined || hadClockTask;
  delete state.scopes[scope];
  state.scopeGenerations[scope] = (state.scopeGenerations[scope] ?? 0) + 1;
  myDmuNativeVfxCancelScopeTimer(state, scope);
  myDmuNativeVfxCancelCommitTimer(state, scope);
  if (!preserveClockTasks)
    myDmuNativeVfxCancelClockTasksForScope(state, scope);
  state.lastSubmittedCount = myDmuNativeVfxActiveCount(state);
  if (!hadScope)
    return false;
  void myDmuNativeVfxEnqueue(
    data,
    () => myDmuNativeVfxClearPhysicalScope(data, scope, `${scope}:${reason}`),
  );
  return true;
};

const myDmuNativeVfxSwitchPhase = async (data, nextPhase, force = false) => {
  const state = myDmuEnsureNativeVfxState(data);
  const previousPhase = state.rootPhase;
  if (previousPhase === nextPhase && !force)
    return true;
  state.epoch++;
  const epoch = state.epoch;
  myDmuNativeVfxCancelAllTimers(state);
  state.scopes = {};
  state.scopeGenerations = {};
  state.logicalEvents = {};
  state.lastSubmittedCount = 0;
  state.rootPhase = nextPhase;
  state.lastError = undefined;
  if (!state.activated &&
      !myDmuBooleanConfig(data, myDmuNativeVfxConfigKeys.enabled, false))
    return true;
  const scopes = [previousPhase, ...(myDmuNativeVfxScopes[previousPhase] ?? [])];
  return await myDmuNativeVfxEnqueue(data, async () => {
    let success = true;
    for (const scope of scopes)
      success = await myDmuNativeVfxClearPhysicalScope(
        data,
        scope,
        `phase-root:${previousPhase}->${nextPhase}`,
      ) && success;
    myDmuActLog('Native VFX phase root cleared', {
      phase: previousPhase,
      nextPhase,
      scopes: scopes.length,
      success,
      fallback: false,
    });
    return success;
  }, epoch);
};

const myDmuNativeVfxVerifyNpc = async (data, actorId, allowedNpcBaseIds, scope) => {
  if (!myDmuNativeVfxPhaseEnabled(data))
    return false;
  const normalizedId = myDmuNormalizeActorId(actorId);
  if (!/^4[0-9A-F]{7}$/u.test(normalizedId ?? '')) {
    myDmuActLog('Native VFX coverage gap', { scope, reason: 'invalid-object-id', actorId, fallback: false });
    return false;
  }
  data.myDmuNativeVfxNpcBaseIdByActor ??= {};
  data.myDmuNativeVfxCombatantByActor ??= {};
  const cached = data.myDmuNativeVfxNpcBaseIdByActor[normalizedId];
  if (cached !== undefined && data.myDmuNativeVfxCombatantByActor[normalizedId] !== undefined)
    return allowedNpcBaseIds.has(cached);
  try {
    const combatant = (await myDmuQueryCombatants(data, [normalizedId], scope))[0];
    const npcBaseId = Number(combatant?.BNpcID ?? combatant?.BNpcBaseID ?? combatant?.NpcBaseId);
    if (!Number.isInteger(npcBaseId))
      throw new Error('未返回 BNpcID');
    const x = Number(combatant?.PosX);
    const z = Number(combatant?.PosY ?? combatant?.PosZ);
    if (![x, z].every(Number.isFinite))
      throw new Error('未返回有效场地坐标');
    data.myDmuNativeVfxNpcBaseIdByActor[normalizedId] = npcBaseId;
    data.myDmuNativeVfxCombatantByActor[normalizedId] = {
      id: normalizedId,
      npcBaseId,
      x,
      z,
    };
    if (allowedNpcBaseIds.has(npcBaseId))
      return true;
    myDmuActLog('Native VFX coverage gap', {
      scope,
      reason: 'npc-base-id-mismatch',
      actorId: normalizedId,
      npcBaseId,
      fallback: false,
    });
    return false;
  } catch (error) {
    myDmuActLog('Native VFX coverage gap', {
      scope,
      reason: 'combatant-query-failed',
      actorId: normalizedId,
      error: `${error}`,
      fallback: false,
    });
    return false;
  }
};

const myDmuNativeVfxResolveFarNear = async (data, scope = 'p2.farNear') => {
  if (!myDmuNativeVfxPhaseEnabled(data, 'p2'))
    return [];
  const actorIds = myDmuNativeVfxPartyActorIds(data);
  if (actorIds.length !== 8) {
    myDmuActLog('Native VFX coverage gap', {
      scope,
      reason: 'party-actor-ids-incomplete',
      count: actorIds.length,
      fallback: false,
    });
    return [];
  }
  try {
    const positions = (await myDmuQueryCombatants(data, actorIds, scope))
      .map((combatant) => {
        const id = myDmuNormalizeActorId(combatant?.ID ?? combatant?.Id);
        const x = Number(combatant?.PosX);
        const z = Number(combatant?.PosY ?? combatant?.PosZ);
        return { id, distance: Math.hypot(x - 100, z - 100) };
      })
      .filter((entry) => actorIds.includes(entry.id) && Number.isFinite(entry.distance))
      .sort((left, right) => left.distance - right.distance || left.id.localeCompare(right.id));
    if (positions.length !== 8)
      throw new Error(`只返回 ${positions.length}/8 个小队成员坐标`);
    return [positions[0].id, positions.at(-1).id];
  } catch (error) {
    myDmuActLog('Native VFX coverage gap', {
      scope,
      reason: 'combatant-query-failed',
      error: `${error}`,
      fallback: false,
    });
    return [];
  }
};

const myDmuNativeVfxPartyActorIds = (data) => {
  const ids = myDmuPartyNames(data)
    .map((name) => myDmuNormalizeActorId(myDmuGetHexIdByName(data, name)))
    .filter((id) => /^[1][0-9A-F]{7}$/u.test(id ?? ''));
  return [...new Set(ids)];
};

const myDmuNativeVfxCaptureFence = (data) => {
  const state = myDmuEnsureNativeVfxState(data);
  const clock = myDmuNativeVfxSyncClock(data);
  return { state, epoch: state.epoch, clockKey: clock.key };
};

const myDmuNativeVfxFenceCurrent = (data, fence) =>
  myDmuEnsureNativeVfxState(data) === fence.state &&
  fence.state.epoch === fence.epoch &&
  fence.state.clockKey === fence.clockKey &&
  myDmuNativeVfxClock(data).key === fence.clockKey;

const myDmuNativeVfxResolveCombatants = async (data, actorIds, scope) => {
  const ids = [...new Set(actorIds.map(myDmuNormalizeActorId))]
    .filter((id) => /^[14][0-9A-F]{7}$/u.test(id ?? ''));
  if (ids.length !== actorIds.length) {
    myDmuActLog('Native VFX coverage gap', {
      scope,
      reason: 'actor-ids-incomplete',
      expected: actorIds.length,
      actual: ids.length,
      fallback: false,
    });
    return [];
  }
  const fence = myDmuNativeVfxCaptureFence(data);
  try {
    const result = await myDmuQueryCombatants(data, ids, scope);
    if (!myDmuNativeVfxFenceCurrent(data, fence))
      return [];
    const combatants = result.map((combatant) => {
      const id = myDmuNormalizeActorId(combatant?.ID ?? combatant?.Id);
      const x = Number(combatant?.PosX);
      const z = Number(combatant?.PosY ?? combatant?.PosZ);
      const heading = Number(combatant?.Heading);
      return { id, x, z, heading };
    }).filter((entry) => ids.includes(entry.id) &&
      Number.isFinite(entry.x) && Number.isFinite(entry.z));
    if (combatants.length !== ids.length)
      throw new Error(`只返回 ${combatants.length}/${ids.length} 个有效实体坐标`);
    return combatants.sort((left, right) => left.id.localeCompare(right.id));
  } catch (error) {
    myDmuActLog('Native VFX coverage gap', {
      scope,
      reason: 'combatant-query-failed',
      error: `${error}`,
      fallback: false,
    });
    return [];
  }
};

const myDmuNativeVfxRoleActorId = (data, role) => {
  const name = myDmuPartyNames(data).find((name) => myDmuGetRpByName(data, name) === role);
  return myDmuNormalizeActorId(myDmuGetHexIdByName(data, name));
};

const myDmuNativeVfxThinGuideStyle = () => ({ ...myDmuNativeVfxStyles.guide });

const myDmuNativeVfxCreateArrow = (vfx, descriptor) => {
  return vfx.createArrow({ ...descriptor, type: 'arrow' });
};

const myDmuNativeVfxCreateStatusCircle = (vfx, descriptor) => {
  const {
    label,
    pixelHeight: _pixelHeight,
    worldYOffset: _worldYOffset,
    classification: _classification,
    style: _style,
    ...circle
  } = descriptor;
  const style = label === 'stop'
    ? myDmuNativeVfxStyles.dangerAlt
    : label === 'fake' ? myDmuNativeVfxStyles.preview : myDmuNativeVfxStyles.target;
  return vfx.createCircle({
    ...circle,
    type: 'circle',
    classification: 'guide',
    radius: label === 'move' ? 1.4 : 1.1,
    style,
  });
};

const myDmuP1CombatantPoint = (combatant) => {
  const x = Number(combatant?.PosX);
  const z = Number(combatant?.PosY ?? combatant?.PosZ);
  if (!Number.isFinite(x) || !Number.isFinite(z))
    return undefined;
  return { x, z };
};

const myDmuP1BeamLinePositions = (data) => {
  const order = myDmuP1MechanicBeamOrder(data);
  if (order === undefined)
    return undefined;
  const combatants = data.myDmuP1BeamPartyCombatants ?? [];
  const byActor = new Map(combatants.map((combatant) => [
    myDmuNormalizeActorId(combatant?.ID),
    myDmuP1CombatantPoint(combatant),
  ]));
  const byRole = Object.fromEntries(myDmuRoleOrder.map((role) => [
    role,
    byActor.get(myDmuNativeVfxRoleActorId(data, role)),
  ]));
  if (Object.values(byRole).some((point) => point === undefined))
    return undefined;
  const result = {
    [order[0]]: { x: 80.5, z: 100 },
    [order[order.length - 1]]: { x: 119.5, z: 100 },
  };
  for (let index = 1; index < order.length - 1; index++) {
    const left = byRole[order[index - 1]];
    const right = byRole[order[index + 1]];
    result[order[index]] = { x: (left.x + right.x) / 2, z: 100 };
  }
  return result;
};

const myDmuP1BeamTowerPositions = (data) => Object.values(data.myDmuP1BeamTowers ?? {})
  .filter((point) => Number.isFinite(point?.x) && Number.isFinite(point?.z))
  .sort((left, right) => left.x - right.x || left.z - right.z);

const myDmuBuildP1BeamGuideVfx = (vfx, data) => {
  if (!myDmuNativeVfxPersonalGuideEnabled(data))
    return [];
  const order = myDmuP1MechanicBeamOrder(data);
  const linePositions = myDmuP1BeamLinePositions(data);
  const ownRole = myDmuGetRpByName(data, data.me);
  const ownId = myDmuNormalizeActorId(myDmuGetHexIdByName(data, data.me));
  const linePoint = linePositions?.[ownRole];
  if (order === undefined || linePoint === undefined || !/^1[0-9A-F]{7}$/u.test(ownId ?? ''))
    return [];
  const drawings = [
    vfx.createCircle({
      id: `p1.beamTower.guide.line.target.${ownId}`,
      type: 'circle',
      classification: 'guide',
      durationSeconds: 7,
      anchor: myDmuNativeVfxWorldAnchor(linePoint.x, linePoint.z),
      radius: 0.65,
      style: myDmuNativeVfxStyles.target,
    }),
    myDmuNativeVfxCreateArrow(vfx, {
      id: `p1.beamTower.guide.line.arrow.${ownId}`,
      type: 'arrow',
      classification: 'guide',
      durationSeconds: 7,
      from: myDmuNativeVfxEntityAnchor(ownId),
      to: myDmuNativeVfxWorldAnchor(linePoint.x, linePoint.z),
      width: 0.05,
      headLength: 0.5,
      headWidth: 0.5,
      style: myDmuNativeVfxThinGuideStyle(),
    }),
  ];
  const towers = myDmuP1BeamTowerPositions(data);
  const hitIds = new Set(data.myDmuP1BeamTargetIds ?? []);
  if (towers.length !== 4 || hitIds.size !== 4)
    return drawings;
  const hitRoles = order.filter((role) => hitIds.has(myDmuNativeVfxRoleActorId(data, role)));
  const unhitRoles = order.filter((role) => !hitIds.has(myDmuNativeVfxRoleActorId(data, role)));
  const list = hitRoles.includes(ownRole) ? hitRoles : unhitRoles;
  const index = list.indexOf(ownRole);
  if (index < 0 || index >= towers.length)
    return drawings;
  const towerPoint = {
    x: towers[index].x,
    z: towers[index].z + (hitRoles.includes(ownRole) ? 5 : 0),
  };
  drawings.push(vfx.createCircle({
    id: `p1.beamTower.guide.tower.target.${ownId}`,
    type: 'circle',
    classification: 'guide',
    durationSeconds: 4,
    anchor: myDmuNativeVfxWorldAnchor(towerPoint.x, towerPoint.z),
    radius: 0.65,
    style: myDmuNativeVfxStyles.target,
  }));
  drawings.push(myDmuNativeVfxCreateArrow(vfx, {
    id: `p1.beamTower.guide.tower.arrow.${ownId}`,
    type: 'arrow',
    classification: 'guide',
    durationSeconds: 4,
    from: myDmuNativeVfxEntityAnchor(ownId),
    to: myDmuNativeVfxWorldAnchor(towerPoint.x, towerPoint.z),
    width: 0.05,
    headLength: 0.5,
    headWidth: 0.5,
    style: myDmuNativeVfxThinGuideStyle(),
  }));
  return drawings;
};

const myDmuRenderP1BeamGuide = (data, reason) => {
  if (!myDmuNativeVfxPhaseEnabled(data, 'p1'))
    return false;
  const vfx = myDmuNativeVfxApi(data);
  const drawings = myDmuBuildP1BeamGuideVfx(vfx, data);
  if (drawings.length === 0) {
    return myDmuNativeVfxFilterScope(
      data,
      'p1.beamTower',
      (drawing) => !drawing.id.startsWith('p1.beamtower.guide.'),
      `${reason}:guide-fail-closed`,
    );
  }
  return myDmuNativeVfxMergeScope(data, 'p1.beamTower', () => drawings, reason);
};

const myDmuP1Line23GuidePoint = (data, role, sourceX) => {
  const strategy = myDmuP1Line23Strategy(data);
  if (strategy === undefined || !myDmuRoleOrder.includes(role) || !Number.isFinite(sourceX))
    return undefined;
  if (sourceX >= 110)
    return myDmuP1Line23SpreadPoints[strategy][role];
  return { x: 100, z: 100 };
};

const myDmuBuildP1Line23GuideVfx = (vfx, data, matches, sourceX, scope) => {
  if (!myDmuNativeVfxPersonalGuideEnabled(data) || matches.target !== data.me)
    return [];
  const role = myDmuGetRpByName(data, matches.target);
  const point = myDmuP1Line23GuidePoint(data, role, sourceX);
  const actorId = myDmuNormalizeActorId(matches.targetId);
  if (point === undefined || !/^1[0-9A-F]{7}$/u.test(actorId ?? ''))
    return [];
  return [myDmuNativeVfxCreateArrow(vfx, {
    id: `${scope}.line23.${actorId}`,
    type: 'arrow',
    classification: 'guide',
    durationSeconds: myDmuNativeVfxDuration(matches.duration, 6),
    from: myDmuNativeVfxEntityAnchor(actorId),
    to: myDmuNativeVfxWorldAnchor(point.x, point.z),
    width: 0.05,
    headLength: 0.5,
    headWidth: 0.5,
    style: myDmuNativeVfxThinGuideStyle(),
  })];
};

const myDmuP1RecordArrowEffect = (data, matches) => {
  const actorId = myDmuNormalizeActorId(matches.targetId);
  const effectId = matches.effectId?.toUpperCase();
  const direction = myDmuP1TeleportDirectionNames[myDmuP1ArrowBuffs[effectId]];
  if (!/^1[0-9A-F]{7}$/u.test(actorId ?? '') || direction === undefined)
    return false;
  data.myDmuP1ArrowEffectsByActor ??= {};
  data.myDmuP1ArrowEffectsByActor[actorId] ??= {};
  data.myDmuP1ArrowEffectsByActor[actorId][effectId] = {
    effectId,
    direction,
    duration: myDmuNumber(matches.duration) ?? 0,
  };
  return true;
};

const myDmuP1TeleportRoutePoints = (data, actorId) => {
  const strategy = myDmuP1TeleportStrategy(data);
  const effects = Object.values(data.myDmuP1ArrowEffectsByActor?.[actorId] ?? {})
    .sort((left, right) => left.duration - right.duration || left.effectId.localeCompare(right.effectId));
  if (strategy === undefined || effects.length !== 2)
    return undefined;
  const [short, long] = effects;
  if (short.direction === long.direction) {
    const points = myDmuP1TeleportPoints[strategy][`${short.direction}_${long.direction}`];
    if (points === undefined)
      return undefined;
    return { first: points[0], second: points[1], duration: Math.max(short.duration, long.duration) };
  }
  const direct = myDmuP1TeleportMixedPoints[`${short.direction}_${long.direction}`];
  const reverse = myDmuP1TeleportMixedPoints[`${long.direction}_${short.direction}`];
  const points = direct ?? reverse;
  if (points?.[short.direction] === undefined || points?.[long.direction] === undefined)
    return undefined;
  return {
    first: points[short.direction],
    second: points[long.direction],
    duration: Math.max(short.duration, long.duration),
  };
};

const myDmuBuildP1TeleportRouteVfx = (vfx, data, matches) => {
  if (!myDmuNativeVfxPersonalGuideEnabled(data) || matches.target !== data.me)
    return [];
  const actorId = myDmuNormalizeActorId(matches.targetId);
  const route = myDmuP1TeleportRoutePoints(data, actorId);
  if (route === undefined)
    return [];
  const duration = myDmuNativeVfxDuration(route.duration, 10);
  return [
    myDmuNativeVfxCreateArrow(vfx, {
      id: `p1.graven3.teleport.${actorId}.first`,
      type: 'arrow',
      classification: 'guide',
      durationSeconds: duration,
      from: myDmuNativeVfxEntityAnchor(actorId),
      to: myDmuNativeVfxWorldAnchor(route.first.x, route.first.z),
      width: 0.05,
      headLength: 0.5,
      headWidth: 0.5,
      style: myDmuNativeVfxThinGuideStyle(),
    }),
    myDmuNativeVfxCreateArrow(vfx, {
      id: `p1.graven3.teleport.${actorId}.second`,
      type: 'arrow',
      classification: 'guide',
      durationSeconds: duration,
      from: myDmuNativeVfxWorldAnchor(route.first.x, route.first.z),
      to: myDmuNativeVfxWorldAnchor(route.second.x, route.second.z),
      width: 0.05,
      headLength: 0.5,
      headWidth: 0.5,
      style: myDmuNativeVfxThinGuideStyle(),
    }),
  ];
};

const myDmuP1TeleportAdjustedSourceX = (data, role, ownSourceX) => {
  const strategy = myDmuP1TeleportStrategy(data);
  if (strategy === undefined)
    return undefined;
  if (strategy !== myDmuP1TeleportStrategies.sushiMelee ||
      !['H1', 'H2', 'D3', 'D4'].includes(role) || !(ownSourceX > 100))
    return ownSourceX;
  const partnerRole = myDmuP1BasePartners[role];
  const partnerName = myDmuPartyNames(data).find((name) => myDmuGetRpByName(data, name) === partnerRole);
  const partnerTether = data.myDmuP1Graven3Tethers.find((entry) => entry.target === partnerName);
  const partnerSourceX = partnerTether === undefined
    ? undefined
    : myDmuP1CombatantPosX(data.myDmuP1Combatants, partnerTether.sourceId);
  return partnerSourceX ?? ownSourceX;
};

const myDmuBuildP1DeathVfx = (vfx, matches) => [vfx.createSector({
  id: `p1.death.${myDmuNormalizeActorId(matches.sourceId)}`,
  type: 'sector',
  classification: 'danger',
  durationSeconds: myDmuNativeVfxDuration((myDmuNumber(matches.castTime) ?? 5) + 0.2, 5.2),
  anchor: myDmuNativeVfxEntityAnchor(matches.sourceId),
  radius: 30,
  angleRadians: Math.PI * 2 / 3,
  direction: {
    mode: 'towardTarget',
    rotationRadians: 0,
    target: myDmuNativeVfxEntityAnchor(matches.targetId),
  },
  style: myDmuNativeVfxStyles.danger,
})];

const myDmuBuildP1PoisonVfx = (vfx, data) => {
  const entries = myDmuP1PoisonEntries(data)
    .map((entry) => ({
      ...entry,
      id: myDmuNormalizeActorId(entry.id),
      duration: data.myDmuP1PoisonDurations?.[entry.name],
    }))
    .filter((entry) => /^[1][0-9A-F]{7}$/u.test(entry.id ?? ''));
  const drawings = entries.map((entry) => vfx.createCircle({
    id: `p1.poison.${entry.id}`,
    type: 'circle',
    classification: 'guide',
    durationSeconds: myDmuNativeVfxDuration(Math.min(entry.duration ?? 3.5, 3.5), 3.5),
    anchor: myDmuNativeVfxEntityAnchor(entry.id),
    radius: 6,
    style: myDmuNativeVfxStyles.guide,
  }));
  if (!myDmuNativeVfxPersonalGuideEnabled(data))
    return drawings;
  const ownId = myDmuNormalizeActorId(myDmuGetHexIdByName(data, data.me));
  if (!/^1[0-9A-F]{7}$/u.test(ownId ?? '') || entries.some((entry) => entry.id === ownId))
    return drawings;
  for (const entry of entries) {
    drawings.push(myDmuNativeVfxCreateArrow(vfx, {
      id: `p1.poison.guide.${entry.id}`,
      type: 'arrow',
      classification: 'guide',
      durationSeconds: myDmuNativeVfxDuration(Math.min(entry.duration ?? 3.5, 3.5), 3.5),
      from: myDmuNativeVfxEntityAnchor(entry.id),
      to: myDmuNativeVfxEntityAnchor(ownId),
      width: 0.2,
      headLength: 0.4,
      headWidth: 0.4,
      style: myDmuNativeVfxStyles.guide,
    }));
  }
  return drawings;
};

const myDmuP1FireShouldStack = (data, markerId = data.myDmuP1FireMarkerId) => {
  const marker = myDmuNormalizeHeadmarkerId(markerId);
  const isStackMarker = marker === myDmuP1Headmarkers.stack;
  const isSpreadMarker = marker === myDmuP1Headmarkers.spread;
  if (!isStackMarker && !isSpreadMarker)
    return undefined;
  return (!data.myDmuP1Fake.fire && isStackMarker) ||
    (data.myDmuP1Fake.fire && isSpreadMarker);
};

const myDmuBuildP1FireVfx = (vfx, data, scope) => {
  const shouldStack = myDmuP1FireShouldStack(data);
  if (shouldStack === undefined)
    throw new Error('真假火缺少有效分摊/分散头标');
  const targetIds = shouldStack
    ? [...new Set(data.myDmuP1FireMarkerTargetIds ?? [])]
    : myDmuNativeVfxPartyActorIds(data);
  if (targetIds.length === 0)
    throw new Error('真假火缺少目标实体');
  return targetIds.map((actorId) => vfx.createCircle({
    id: `${scope}.fire.${actorId}`,
    type: 'circle',
    classification: shouldStack ? 'guide' : 'danger',
    durationSeconds: 6,
    anchor: myDmuNativeVfxEntityAnchor(actorId),
    radius: 5,
    style: shouldStack ? myDmuNativeVfxStyles.target : myDmuNativeVfxStyles.danger,
  }));
};

const myDmuBuildP1TruthPartyVfx = (vfx, data, scope, matches) => {
  const drawings = myDmuBuildP1FireVfx(vfx, data, scope);
  if (!data.myDmuP1Fake.thunder) {
    for (const actorId of myDmuNativeVfxPartyActorIds(data)) {
      drawings.push(vfx.createCircle({
        id: `${scope}.thunder.${actorId}`,
        type: 'circle',
        classification: 'danger',
        durationSeconds: 6,
        anchor: myDmuNativeVfxEntityAnchor(actorId),
        radius: 5,
        style: myDmuNativeVfxStyles.dangerAlt,
      }));
    }
  }
  if (!data.myDmuP1Fake.ice && matches?.sourceId !== undefined) {
    drawings.push(vfx.createDonut({
      id: `${scope}.ice.${myDmuNormalizeActorId(matches.sourceId)}`,
      type: 'donut',
      classification: 'danger',
      durationSeconds: 6,
      anchor: myDmuNativeVfxEntityAnchor(matches.sourceId),
      innerRadius: 4,
      outerRadius: 20,
      style: myDmuNativeVfxStyles.dangerAlt,
    }));
  }
  return drawings;
};

const myDmuBuildP1TetherVfx = (vfx, data, matches, scope) => {
  const duration = myDmuNativeVfxDuration(matches.duration, 6);
  const drawings = [vfx.createLine({
    id: `${scope}.tether.${myDmuNormalizeActorId(matches.targetId)}`,
    type: 'line',
    classification: 'danger',
    durationSeconds: duration,
    from: myDmuNativeVfxEntityAnchor(matches.sourceId),
    to: myDmuNativeVfxEntityAnchor(matches.targetId),
    width: 0.35,
    style: myDmuNativeVfxStyles.dangerAlt,
  })];
  if (myDmuNativeVfxPersonalGuideEnabled(data) && matches.target === data.me) {
    drawings.push(myDmuNativeVfxCreateArrow(vfx, {
      id: `${scope}.kick.${myDmuNormalizeActorId(matches.targetId)}`,
      type: 'arrow',
      classification: 'guide',
      durationSeconds: duration,
      from: myDmuNativeVfxEntityAnchor(matches.sourceId),
      to: myDmuNativeVfxEntityAnchor(matches.targetId),
      width: 0.2,
      headLength: 0.4,
      headWidth: 0.4,
      style: myDmuNativeVfxStyles.guide,
    }));
  }
  return drawings;
};

const myDmuBuildP1BeamVfx = (vfx, matches) => [vfx.createRect({
  id: `p1.beamTower.beam.${myDmuNormalizeActorId(matches.targetId)}`,
  type: 'rect',
  classification: 'danger',
  durationSeconds: 4,
  anchor: myDmuNativeVfxWorldAnchor(100, 70),
  width: 6,
  direction: {
    mode: 'spanEndpoints',
    target: myDmuNativeVfxEntityAnchor(matches.targetId),
  },
  pivot: 'center',
  style: myDmuNativeVfxStyles.guide,
})];

const myDmuBuildP1BeamTowerVfx = (vfx, matches) => [vfx.createCircle({
  id: `p1.beamTower.tower.${myDmuNormalizeActorId(matches.sourceId)}`,
  type: 'circle',
  classification: 'guide',
  durationSeconds: myDmuNativeVfxDuration((myDmuNumber(matches.castTime) ?? 2.7) + 0.2, 2.9),
  anchor: myDmuNativeVfxEntityAnchor(matches.sourceId),
  radius: 3,
  style: myDmuNativeVfxStyles.target,
})];

const myDmuBuildP1Graven2HalfVfx = (vfx, actorId, npcBaseId) => {
  const isLeft = npcBaseId === 2015164;
  if (!isLeft && npcBaseId !== 2015165)
    throw new Error(`神像2半场 BNpcID 非法：${npcBaseId}`);
  return [vfx.createRect({
    id: `p1.graven2.half.${myDmuNormalizeActorId(actorId)}`,
    type: 'rect',
    classification: 'danger',
    durationSeconds: 5.15,
    anchor: myDmuNativeVfxWorldAnchor(isLeft ? 90 : 110, 100),
    width: 20,
    length: 42,
    direction: { mode: 'fixed', rotationRadians: isLeft ? -Math.PI / 2 : Math.PI / 2 },
    pivot: 'center',
    style: myDmuNativeVfxStyles.dangerAlt,
  })];
};

const myDmuBuildP1Graven2TetherVfx = (vfx, data, matches, sourceX) => {
  const drawings = myDmuBuildP1TetherVfx(vfx, data, matches, 'p1.graven2');
  drawings.push(vfx.createCircle({
    id: `p1.graven2.puddle.${myDmuNormalizeActorId(matches.targetId)}`,
    type: 'circle',
    classification: 'danger',
    durationSeconds: 6,
    anchor: myDmuNativeVfxEntityAnchor(matches.targetId),
    radius: 5,
    style: myDmuNativeVfxStyles.danger,
  }));
  drawings.push(...myDmuBuildP1Line23GuideVfx(vfx, data, matches, sourceX, 'p1.graven2'));
  return drawings;
};

const myDmuP1ArrowOffset = (direction) => ({
  '上': { x: 0, z: -6 },
  '下': { x: 0, z: 6 },
  '左': { x: -6, z: 0 },
  '右': { x: 6, z: 0 },
})[direction];

const myDmuBuildP1Graven3ArrowVfx = (vfx, matches) => {
  const direction = myDmuP1ArrowBuffs[matches.effectId?.toUpperCase()];
  const offset = myDmuP1ArrowOffset(direction);
  if (offset === undefined)
    throw new Error(`神像3箭头状态非法：${matches.effectId}`);
  const actorId = myDmuNormalizeActorId(matches.targetId);
  return [myDmuNativeVfxCreateArrow(vfx, {
    id: `p1.graven3.arrow.${actorId}.${matches.effectId.toLowerCase()}`,
    type: 'arrow',
    classification: 'guide',
    durationSeconds: myDmuNativeVfxDuration(matches.duration, 10),
    from: myDmuNativeVfxEntityAnchor(actorId),
    to: myDmuNativeVfxEntityAnchor(actorId, offset),
    width: 0.2,
    headLength: 0.6,
    headWidth: 0.4,
    style: myDmuNativeVfxStyles.guide,
  })];
};

const myDmuBuildP1Graven3RouteVfx = (vfx, data, targetId, sourceX) => {
  if (!myDmuNativeVfxPersonalGuideEnabled(data))
    return [];
  if (!Number.isFinite(sourceX))
    throw new Error('神像3个人路线缺少连线源 X');
  const destination = sourceX < 100
    ? myDmuNativeVfxWorldAnchor(85, 100)
    : myDmuNativeVfxWorldAnchor(105, 100);
  return [myDmuNativeVfxCreateArrow(vfx, {
    id: `p1.graven3.route.${myDmuNormalizeActorId(targetId)}`,
    type: 'arrow',
    classification: 'guide',
    durationSeconds: 6.5,
    from: myDmuNativeVfxEntityAnchor(targetId),
    to: destination,
    width: 0.2,
    headLength: 0.6,
    headWidth: 0.4,
    style: myDmuNativeVfxStyles.guide,
  })];
};

const myDmuP2TowerStandTemplates = {
  odd: {
    doing: [
      { isLeft: true, distance: 3.6, offset: -Math.PI / 6 },
      { isLeft: true, distance: 3.6, offset: Math.PI / 4 },
      { isLeft: false, distance: 3.6, offset: -Math.PI * 3 / 4 },
      { isLeft: false, distance: 3.6, offset: Math.PI / 4 },
    ],
    standby: [
      { isLeft: true, distance: 4.4, offset: -Math.PI / 4 },
      { isLeft: true, distance: 4.4, offset: Math.PI * 3 / 10 },
      { isLeft: false, distance: 4.4, offset: Math.PI / 4 },
      { isLeft: false, distance: 4.4, offset: Math.PI / 4 },
    ],
  },
  even: {
    doing: [
      { isLeft: true, distance: 3.6, offset: -Math.PI / 5 },
      { isLeft: true, distance: 3.6, offset: 0 },
      { isLeft: false, distance: 3.6, offset: -Math.PI * 17 / 36 },
      { isLeft: false, distance: 3.6, offset: Math.PI * 17 / 36 },
    ],
    standby: [
      { isLeft: true, distance: 12, offset: -Math.PI * 17 / 20 },
      { isLeft: true, distance: 4.4, offset: -Math.PI * 17 / 18 },
      { isLeft: false, distance: 11, offset: Math.PI * 7 / 9 },
      { isLeft: false, distance: 4.4, offset: Math.PI * 17 / 18 },
    ],
  },
  oddMelee: {
    doing: [
      { isLeft: true, distance: 1, offset: Math.PI },
      { isLeft: true, distance: 3, offset: 0 },
      { isLeft: false, distance: 3.6, offset: 0 },
      { isLeft: false, distance: 3.6, offset: Math.PI },
    ],
    standby: [
      { isLeft: true, distance: 4.4, offset: Math.PI },
      { isLeft: true, distance: 4.4, offset: 0 },
      { isLeft: false, distance: 4.4, offset: Math.PI },
      { isLeft: false, distance: 4.4, offset: Math.PI },
    ],
  },
};

const myDmuP2HeadingTo = (from, to) => Math.atan2(to.x - from.x, to.z - from.z);

const myDmuP2PointInDirection = (from, heading, distance) => ({
  x: from.x + Math.sin(heading) * distance,
  z: from.z + Math.cos(heading) * distance,
});

const myDmuP2Distance = (left, right) => Math.hypot(left.x - right.x, left.z - right.z);

const myDmuP2FarIntersection = (origin, heading, center, radius) => {
  const direction = { x: Math.sin(heading), z: Math.cos(heading) };
  const relative = { x: center.x - origin.x, z: center.z - origin.z };
  const projected = relative.x * direction.x + relative.z * direction.z;
  const perpendicularSquared = relative.x * relative.x + relative.z * relative.z -
    projected * projected;
  const radiusSquared = radius * radius;
  if (perpendicularSquared > radiusSquared)
    return undefined;
  const delta = Math.sqrt(Math.max(0, radiusSquared - perpendicularSquared));
  const near = projected - delta;
  const far = projected + delta;
  const distance = Math.abs(near) > Math.abs(far) ? near : far;
  if (!Number.isFinite(distance))
    return undefined;
  return myDmuP2PointInDirection(origin, heading, distance);
};

const myDmuP2TowerPair = (data, round) => {
  const sourceRound = Math.max(1, round - 1);
  const points = data.myDmuP2TowerRounds?.[sourceRound]?.points;
  if (!Array.isArray(points) || points.length < 2)
    throw new Error(`P2 第${round}轮缺少双塔坐标`);
  const axis = myDmuP2TowerAxis(data, sourceRound);
  if (axis === undefined)
    throw new Error(`P2 第${round}轮塔轴无效`);
  const pair = points.slice(0, 2)
    .map((point) => ({ point, side: myDmuP2TowerSide(point, axis) }))
    .sort((left, right) => left.side - right.side)
    .map((item) => item.point);
  return { left: pair[0], right: pair[1] };
};

const myDmuP2TowerGuidePositions = (data, round) => {
  const pair = myDmuP2TowerPair(data, round);
  const partition = myDmuP2Partition(data, round);
  if (partition === undefined)
    throw new Error(`P2 第${round}轮八人分组不完整`);
  const { active, idle: standby } = partition;
  const oddStrategy = myDmuP2OddStrategy(data);
  if (oddStrategy === undefined)
    throw new Error(`P2 第${round}轮奇数塔策略配置非法`);
  const template = round % 2 === 0
    ? myDmuP2TowerStandTemplates.even
    : oddStrategy === myDmuP2OddStrategies.melee
      ? myDmuP2TowerStandTemplates.oddMelee
      : myDmuP2TowerStandTemplates.odd;
  const build = (entries, templates) => entries.map((entry, index) => {
    const current = templates[index];
    const tower = current.isLeft ? pair.left : pair.right;
    const heading = myDmuP2HeadingTo({ x: 100, z: 100 }, tower) + current.offset;
    return { entry, point: myDmuP2PointInDirection(tower, heading, current.distance) };
  });
  const activeGuides = build(active, template.doing);
  if (round % 2 === 1 && oddStrategy === myDmuP2OddStrategies.melee &&
      myDmuNativeVfxPersonalGuideEnabled(data)) {
    const ownId = myDmuNormalizeActorId(myDmuGetHexIdByName(data, data.me));
    const ownGuide = activeGuides.find(({ entry }) =>
      entry.mechanic === 'cone' &&
      (entry.name === data.me || myDmuNormalizeActorId(entry.id) === ownId));
    const stackGuide = activeGuides.find(({ entry }) => {
      if (entry.mechanic !== 'stack')
        return false;
      const position = myDmuP2CombatantPosition(data, entry.id);
      return position !== undefined && myDmuP2Distance(position, pair.left) <= 4;
    });
    const stackPosition = stackGuide === undefined
      ? undefined
      : myDmuP2CombatantPosition(data, stackGuide.entry.id);
    if (ownGuide !== undefined && stackPosition !== undefined) {
      const heading = myDmuP2HeadingTo({ x: 100, z: 100 }, pair.left);
      const intersection = myDmuP2FarIntersection(
        { x: 100, z: 100 },
        heading,
        stackPosition,
        4.6,
      );
      if (intersection !== undefined && myDmuP2Distance(intersection, pair.left) < 3.8)
        ownGuide.point = intersection;
    }
  }
  return { pair, active: activeGuides, standby: build(standby, template.standby) };
};

const myDmuBuildP2TowerVfx = (vfx, data, round) => {
  const scope = `p2.tower.r${round}`;
  const guide = myDmuP2TowerGuidePositions(data, round);
  const drawings = [guide.pair.left, guide.pair.right].map((point, index) => vfx.createCircle({
    id: `${scope}.tower.${index + 1}`,
    type: 'circle',
    classification: 'guide',
    durationSeconds: 10,
    anchor: myDmuNativeVfxWorldAnchor(point.x, point.z),
    radius: 4,
    style: myDmuNativeVfxStyles.target,
  }));
  const allGuides = [...guide.active, ...guide.standby];
  for (const { entry, point } of allGuides) {
    drawings.push(vfx.createCircle({
      id: `${scope}.target.${myDmuNormalizeActorId(entry.id)}`,
      type: 'circle',
      classification: 'guide',
      durationSeconds: 10,
      anchor: myDmuNativeVfxWorldAnchor(point.x, point.z),
      radius: 0.65,
      style: myDmuNativeVfxStyles.target,
    }));
  }
  for (const { entry } of guide.active) {
    const actorId = myDmuNormalizeActorId(entry.id);
    if (entry.mechanic === 'cone') {
      drawings.push(vfx.createSector({
        id: `${scope}.cone.${actorId}`,
        type: 'sector',
        classification: 'danger',
        durationSeconds: 10,
        anchor: myDmuNativeVfxEntityAnchor(actorId),
        radius: 40,
        angleRadians: Math.PI / 2,
        direction: {
          mode: 'towardTarget',
          rotationRadians: 0,
          target: myDmuNativeVfxWorldAnchor(100, 100),
        },
        style: myDmuNativeVfxStyles.dangerAlt,
      }));
    } else {
      drawings.push(vfx.createCircle({
        id: `${scope}.${entry.mechanic}.${actorId}`,
        type: 'circle',
        classification: entry.mechanic === 'stack' ? 'guide' : 'danger',
        durationSeconds: 10,
        anchor: myDmuNativeVfxEntityAnchor(actorId),
        radius: 5,
        style: entry.mechanic === 'stack'
          ? myDmuNativeVfxStyles.target
          : myDmuNativeVfxStyles.danger,
      }));
    }
  }
  if (myDmuNativeVfxPersonalGuideEnabled(data)) {
    const ownId = myDmuNormalizeActorId(myDmuGetHexIdByName(data, data.me));
    const own = allGuides.find(({ entry }) =>
      entry.name === data.me || myDmuNormalizeActorId(entry.id) === ownId);
    if (own !== undefined) {
      drawings.push(myDmuNativeVfxCreateArrow(vfx, {
        id: `${scope}.guide.${ownId}`,
        type: 'arrow',
        classification: 'guide',
        durationSeconds: 10,
        from: myDmuNativeVfxEntityAnchor(ownId),
        to: myDmuNativeVfxWorldAnchor(own.point.x, own.point.z),
        width: 0.05,
        headLength: 0.5,
        headWidth: 0.5,
        style: myDmuNativeVfxThinGuideStyle(),
      }));
    }
  }
  return drawings;
};

const myDmuP2EndTowerPoints = (data) => {
  const strategy = myDmuP2EndTowerStrategy(data);
  const points = data.myDmuP2TowerRounds?.[8]?.points;
  if (strategy === undefined || !Array.isArray(points) || points.length !== 2 ||
      points.some((point) => !Number.isFinite(point?.x) || !Number.isFinite(point?.z)))
    return undefined;
  if (strategy === myDmuP2EndTowerStrategies.north) {
    return {
      first: { x: 100, z: 90 },
      behind: { x: 100, z: 110 },
    };
  }
  const first = {
    x: (points[0].x + points[1].x) / 2,
    z: (points[0].z + points[1].z) / 2,
  };
  const headingBehind = myDmuP2HeadingTo(first, { x: 100, z: 100 });
  return {
    first,
    behind: myDmuP2PointInDirection({ x: 100, z: 100 }, headingBehind, 10),
  };
};

const myDmuBuildP2EndTowerGuideVfx = (vfx, data) => {
  if (!myDmuNativeVfxPersonalGuideEnabled(data))
    return [];
  const points = myDmuP2EndTowerPoints(data);
  const ownId = myDmuNormalizeActorId(myDmuGetHexIdByName(data, data.me));
  if (points === undefined || !/^1[0-9A-F]{7}$/u.test(ownId ?? ''))
    return [];
  const drawings = [myDmuNativeVfxCreateArrow(vfx, {
    id: `p2.tower.r8.end.first.${ownId}`,
    type: 'arrow',
    classification: 'guide',
    durationSeconds: 15,
    from: myDmuNativeVfxEntityAnchor(ownId),
    to: myDmuNativeVfxWorldAnchor(points.first.x, points.first.z),
    width: 0.05,
    headLength: 0.5,
    headWidth: 0.5,
    style: myDmuNativeVfxThinGuideStyle(),
  })];
  if (data.myDmuP2LastKickId === 'BADC') {
    drawings.push(myDmuNativeVfxCreateArrow(vfx, {
      id: `p2.tower.r8.end.behind.${ownId}`,
      type: 'arrow',
      classification: 'guide',
      durationSeconds: 15,
      from: myDmuNativeVfxWorldAnchor(points.first.x, points.first.z),
      to: myDmuNativeVfxWorldAnchor(points.behind.x, points.behind.z),
      width: 0.05,
      headLength: 0.5,
      headWidth: 0.5,
      style: myDmuNativeVfxThinGuideStyle(),
    }));
  }
  return drawings;
};

const myDmuRenderP2EndTowerGuide = (data, reason) => {
  if (!myDmuNativeVfxPhaseEnabled(data, 'p2'))
    return false;
  const drawings = myDmuBuildP2EndTowerGuideVfx(myDmuNativeVfxApi(data), data);
  if (drawings.length === 0) {
    return myDmuNativeVfxFilterScope(
      data,
      'p2.tower.r8',
      (drawing) => !drawing.id.startsWith('p2.tower.r8.end.'),
      `${reason}:end-guide-fail-closed`,
    );
  }
  return myDmuNativeVfxMergeScope(data, 'p2.tower.r8', () => drawings, reason);
};

const myDmuBuildP2FuturePastVfx = (vfx, data, matches) => {
  const heading = myDmuNativeVfxHeading(matches) + (data.myDmuP2FuturePastFlip ? Math.PI : 0);
  const rotation = myDmuNativeVfxNormalizeRotation(heading);
  return [vfx.createRect({
    id: `p2.futurePast.${myDmuNormalizeActorId(matches.sourceId)}`,
    type: 'rect',
    classification: 'danger',
    durationSeconds: 5.5,
    anchor: myDmuNativeVfxEntityAnchor(matches.sourceId),
    width: 25,
    length: 50,
    direction: { mode: 'fixed', rotationRadians: rotation },
    pivot: 'center',
    style: myDmuNativeVfxStyles.danger,
  })];
};

const myDmuBuildP2WingsVfx = (vfx, matches) => {
  const offset = matches.id?.toUpperCase() === 'BACD' ? Math.PI / 2 : -Math.PI / 2;
  const rotation = myDmuNativeVfxNormalizeRotation(myDmuNativeVfxHeading(matches) + offset);
  return [vfx.createRect({
    id: `p2.wings.${matches.id.toLowerCase()}`,
    type: 'rect',
    classification: 'danger',
    durationSeconds: 5,
    anchor: myDmuNativeVfxWorldAnchor(100, 100),
    width: 20,
    length: 40,
    direction: { mode: 'fixed', rotationRadians: rotation },
    pivot: 'center',
    style: myDmuNativeVfxStyles.dangerAlt,
  })];
};

const myDmuBuildP2FarNearVfx = (vfx, actorIds) => actorIds.map((actorId, index) =>
  vfx.createCircle({
    id: `p2.farNear.${index === 0 ? 'near' : 'far'}.${myDmuNormalizeActorId(actorId)}`,
    type: 'circle',
    classification: 'danger',
    durationSeconds: 5,
    anchor: myDmuNativeVfxEntityAnchor(actorId),
    radius: 6,
    style: myDmuNativeVfxStyles.dangerAlt,
  }));

const myDmuP2TrineOffsets = {
  left: [
    { x: -5.773, z: 0 },
    { x: 2.887, z: -5 },
    { x: 2.887, z: 5 },
  ],
  right: [
    { x: 5.773, z: 0 },
    { x: -2.887, z: -5 },
    { x: -2.887, z: 5 },
  ],
};

const myDmuBuildP2TrineActorVfx = (vfx, actor, wave, preview) => {
  const actorId = myDmuNormalizeActorId(actor.id);
  const side = actor.npcBaseId === 2015155 || (actor.x < 95 && actor.z < 95) ? 'left' : 'right';
  const style = preview ? myDmuNativeVfxStyles.preview : myDmuNativeVfxStyles.danger;
  return myDmuP2TrineOffsets[side].map((offset, index) => vfx.createCircle({
    id: `p2.trine.w${wave}.${actorId}.${index + 1}`,
    type: 'circle',
    classification: 'danger',
    durationSeconds: 15,
    anchor: myDmuNativeVfxEntityAnchor(actorId, offset),
    radius: 6,
    style,
  }));
};

const myDmuRenderP2Trine = (data, reason) => {
  if (!myDmuNativeVfxPhaseEnabled(data, 'p2'))
    return false;
  const trine = data.myDmuP2Trine;
  if (trine?.armed !== true)
    return false;
  const drawMode = myDmuP2TrineDrawMode(data);
  if (drawMode === undefined) {
    let cleared = false;
    for (let wave = 1; wave <= 3; wave++)
      cleared = myDmuNativeVfxClearScope(data, `p2.trine.w${wave}`, `${reason}:invalid-mode`) || cleared;
    return cleared;
  }
  const populated = [1, 2, 3].filter((wave) =>
    wave > trine.resolvedWave && Object.keys(trine.actorsByWave?.[wave] ?? {}).length > 0);
  const visible = populated.slice(0, drawMode === myDmuP2TrineDrawModes.preview ? 2 : 1);
  let changed = false;
  for (let wave = 1; wave <= 3; wave++) {
    const scope = `p2.trine.w${wave}`;
    if (!visible.includes(wave)) {
      changed = myDmuNativeVfxClearScope(data, scope, `${reason}:not-visible`) || changed;
      continue;
    }
    const actors = Object.values(trine.actorsByWave[wave]);
    const isPreview = wave !== visible[0];
    changed = myDmuNativeVfxMergeScope(
      data,
      scope,
      (vfx) => actors.flatMap((actor) =>
        myDmuBuildP2TrineActorVfx(vfx, actor, wave, isPreview)),
      `${reason}:${isPreview ? 'preview' : 'active'}`,
    ) || changed;
  }
  return changed;
};

const myDmuRecordP2TrineActor = (data, matches) => {
  const trine = data.myDmuP2Trine;
  const actorId = myDmuNormalizeActorId(
    matches.id ?? matches.sourceId ?? matches.myDmuNativeVfxActorId,
  );
  const actor = data.myDmuNativeVfxCombatantByActor?.[actorId];
  if (trine?.armed !== true || actor === undefined)
    return false;
  if (trine.waveByActor[actorId] !== undefined)
    return true;
  const eventAt = myDmuNativeVfxEventMilliseconds(matches);
  if (trine.lastOpenAt === undefined || eventAt - trine.lastOpenAt > 500)
    trine.wave++;
  trine.lastOpenAt = eventAt;
  if (trine.wave < 1 || trine.wave > 3) {
    myDmuActLog('Native VFX coverage gap', {
      scope: 'p2.trine',
      reason: 'unexpected-wave-count',
      wave: trine.wave,
      actorId,
      fallback: false,
    });
    return false;
  }
  trine.waveByActor[actorId] = trine.wave;
  trine.actorsByWave[trine.wave][actorId] = actor;
  return myDmuRenderP2Trine(data, `actor-open-${actorId}`);
};

const myDmuResolveP2TrineWave = (data) => {
  const trine = data.myDmuP2Trine;
  if (trine?.armed !== true)
    return false;
  const current = [1, 2, 3].find((wave) =>
    wave > trine.resolvedWave && Object.keys(trine.actorsByWave?.[wave] ?? {}).length > 0);
  if (current === undefined)
    return false;
  trine.resolvedWave = current;
  myDmuNativeVfxClearScope(data, `p2.trine.w${current}`, `wave-${current}-resolved`);
  return myDmuRenderP2Trine(data, `wave-${current}-promote`);
};

const myDmuResolveP2TrineLogicalEvent = (data, matches) => {
  const key = 'p2.trine:wave-resolve';
  const state = myDmuEnsureNativeVfxState(data);
  const clock = myDmuNativeVfxSyncClock(data);
  const eventAt = myDmuNativeVfxEventMilliseconds(matches);
  const previous = state.logicalEvents[key];
  if (previous?.clockKey === clock.key && eventAt < previous.at)
    return false;
  if (myDmuNativeVfxAcceptLogicalEvent(
    data,
    key,
    500,
    matches,
  ) === undefined)
    return false;
  return myDmuResolveP2TrineWave(data);
};

const myDmuP3ElementObjectKinds = {
  '1EC03A': 'fire',
  '1EC03B': 'water',
  '1EC03C': 'wind',
};

const myDmuP3LegacyConfig = 'legacy';
const myDmuP3FireBuffDefaultOrder = ['MT', 'ST', 'H1', 'H2', 'D1', 'D2', 'D3', 'D4'];

const myDmuP3InvalidConfig = (data, key, value) => {
  data.myDmuP3InvalidConfigs ??= {};
  const signature = `${typeof value}:${JSON.stringify(value)}`;
  if (data.myDmuP3InvalidConfigs[key] !== signature) {
    data.myDmuP3InvalidConfigs[key] = signature;
    console.log(`[String][DMUConfig] ${key} 非法，已失败关闭对应 P3 个人指路：${signature}`);
  }
  return undefined;
};

const myDmuP3OptionalEnumConfig = (data, key, allowed) => {
  const raw = myDmuConfigValue(data, key);
  if (raw === undefined)
    return myDmuP3LegacyConfig;
  if (typeof raw !== 'string')
    return myDmuP3InvalidConfig(data, key, raw);
  const normalized = raw.trim().toLowerCase();
  if (!allowed.includes(normalized))
    return myDmuP3InvalidConfig(data, key, raw);
  return normalized;
};

const myDmuP3OptionalBooleanConfig = (data, key) => {
  const raw = myDmuConfigValue(data, key);
  if (raw === undefined)
    return myDmuP3LegacyConfig;
  if (typeof raw === 'boolean')
    return raw;
  if (typeof raw === 'string') {
    const normalized = raw.trim().toLowerCase();
    if (['true', '开', '本地'].includes(normalized))
      return true;
    if (['false', '关', '关闭'].includes(normalized))
      return false;
  }
  return myDmuP3InvalidConfig(data, key, raw);
};

const myDmuP3FireBuffOrder = (data) => {
  const raw = myDmuConfigValue(data, 'MyDMU_P3FireBuffOrder');
  if (raw === undefined)
    return myDmuP3FireBuffDefaultOrder;
  const values = Array.isArray(raw)
    ? raw
    : typeof raw === 'string'
      ? raw.split(/[\s,，/|>＞、;；]+/u)
      : undefined;
  if (values === undefined)
    return myDmuP3InvalidConfig(data, 'MyDMU_P3FireBuffOrder', raw);
  const order = values
    .map((role) => typeof role === 'string' ? role.trim().toUpperCase() : '')
    .filter((role) => role !== '');
  if (order.length !== myDmuP3FireBuffDefaultOrder.length || new Set(order).size !== order.length ||
      order.some((role) => !myDmuP3FireBuffDefaultOrder.includes(role)))
    return myDmuP3InvalidConfig(data, 'MyDMU_P3FireBuffOrder', raw);
  return order;
};

const myDmuP3VfxState = (data) => data.myDmuP3Vfx ??= myDmuNewP3VfxState();

const myDmuP3MechanicFireBuffOrder = (data) => {
  const state = myDmuP3VfxState(data).elements;
  if (!state.fireBuffOrderCaptured) {
    const order = myDmuP3FireBuffOrder(data);
    state.fireBuffOrderCaptured = true;
    state.fireBuffOrder = order === undefined ? undefined : [...order];
  }
  return state.fireBuffOrder;
};

const myDmuResetP3FireBuffOrderLatch = (data) => {
  const state = myDmuP3VfxState(data).elements;
  state.fireBuffOrderCaptured = false;
  state.fireBuffOrder = undefined;
};

const myDmuP3RecordBoss = (data, kind, actorId) => {
  const id = myDmuNormalizeActorId(actorId);
  if (/^4[0-9A-F]{7}$/u.test(id ?? ''))
    myDmuP3VfxState(data).bosses[`${kind}Id`] = id;
  return id;
};

const myDmuP3RecordBossHeading = (data, kind, matches) => {
  const id = myDmuP3RecordBoss(data, kind, matches.sourceId);
  const heading = myDmuNumber(matches.heading ?? matches.sourceHeading);
  if (heading !== undefined)
    myDmuP3VfxState(data).bosses[`${kind}Heading`] = heading;
  return id;
};

const myDmuP3ElementScope = (kind) => `p3.elements.${kind}`;
const myDmuP3ElementActivationTaskKey = (kind, actorId) =>
  `${myDmuP3ElementScope(kind)}:activate:${actorId}`;

const myDmuRenderP3Element = async (data, kind, reason) => {
  const scope = myDmuP3ElementScope(kind);
  if (!myDmuNativeVfxPhaseEnabled(data, 'p3'))
    return false;
  const state = myDmuP3VfxState(data).elements;
  const object = state.objects[kind];
  const clock = myDmuNativeVfxClock(data);
  const holders = Object.values(state.buffs[kind] ?? {})
    .filter((entry) => entry.active === true && entry.expiresAt > clock.now)
    .sort((left, right) => left.id.localeCompare(right.id));
  const inGrace = state.graceUntil[kind] > clock.now;
  if (object === undefined || (!state.started[kind] && !inGrace) ||
      (holders.length === 0 && !inGrace))
    return myDmuNativeVfxClearScope(
      data,
      scope,
      `${reason}:inactive-or-object-missing`,
      { preserveClockTasks: true },
    );
  if (holders.length > 2) {
    myDmuActLog('Native VFX coverage gap', {
      scope,
      reason: 'unexpected-element-holder-count',
      count: holders.length,
      fallback: false,
    });
    return myDmuNativeVfxClearScope(data, scope, `${reason}:holder-overflow`);
  }
  const actorIds = myDmuNativeVfxPartyActorIds(data);
  if (actorIds.length !== 8)
    return myDmuNativeVfxClearScope(data, scope, `${reason}:party-incomplete`);
  const fence = myDmuNativeVfxCaptureFence(data);
  const positions = await myDmuNativeVfxResolveCombatants(data, actorIds, scope);
  if (!myDmuNativeVfxFenceCurrent(data, fence))
    return false;
  if (positions.length !== 8)
    return myDmuNativeVfxClearScope(data, scope, `${reason}:position-query-failed`);
  const nearest = positions
    .map((entry) => ({ ...entry, distance: Math.hypot(entry.x - object.x, entry.z - object.z) }))
    .sort((left, right) => left.distance - right.distance || left.id.localeCompare(right.id))
    .slice(0, 2);
  if (nearest.length !== 2)
    return myDmuNativeVfxClearScope(data, scope, `${reason}:nearest-incomplete`);
  const remainingSeconds = Math.max(0.5, Math.min(7,
    holders.length === 0
      ? (state.graceUntil[kind] - clock.now) / 1000
      : Math.max(...holders.map((entry) => (entry.expiresAt - clock.now) / 1000)),
  ));
  return myDmuNativeVfxReplaceScope(data, scope, (vfx) => {
    const drawings = holders.map((holder) => kind === 'fire'
      ? vfx.createCircle({
        id: `${scope}.holder.${holder.id}`,
        type: 'circle',
        classification: 'danger',
        durationSeconds: Math.max(0.5, Math.min(7, (holder.expiresAt - clock.now) / 1000)),
        anchor: myDmuNativeVfxEntityAnchor(holder.id),
        radius: 5,
        style: myDmuNativeVfxStyles.fire,
      })
      : vfx.createDonut({
        id: `${scope}.holder.${holder.id}`,
        type: 'donut',
        classification: 'danger',
        durationSeconds: Math.max(0.5, Math.min(7, (holder.expiresAt - clock.now) / 1000)),
        anchor: myDmuNativeVfxEntityAnchor(holder.id),
        innerRadius: 4,
        outerRadius: 10,
        style: myDmuNativeVfxStyles.water,
      }));
    for (const target of nearest) {
      drawings.push(kind === 'fire'
        ? vfx.createDonut({
          id: `${scope}.inverse.${target.id}`,
          type: 'donut',
          classification: 'danger',
          durationSeconds: remainingSeconds,
          anchor: myDmuNativeVfxEntityAnchor(target.id),
          innerRadius: 4,
          outerRadius: 10,
          style: myDmuNativeVfxStyles.water,
        })
        : vfx.createCircle({
          id: `${scope}.inverse.${target.id}`,
          type: 'circle',
          classification: 'danger',
          durationSeconds: remainingSeconds,
          anchor: myDmuNativeVfxEntityAnchor(target.id),
          radius: 5,
          style: myDmuNativeVfxStyles.fire,
        }));
    }
    return drawings;
  }, reason);
};

const myDmuRenderP3ElementGuide = (data, reason) => {
  const scope = 'p3.elements.guide';
  if (!myDmuNativeVfxPersonalGuideEnabled(data))
    return myDmuNativeVfxClearScope(data, scope, `${reason}:guide-disabled`);
  const state = myDmuP3VfxState(data).elements;
  const fireObject = state.objects.fire;
  const waterObject = state.objects.water;
  const windObject = state.objects.wind;
  const ownId = myDmuNormalizeActorId(myDmuGetHexIdByName(data, data.me));
  if (fireObject === undefined || waterObject === undefined || windObject === undefined ||
      !/^1[0-9A-F]{7}$/u.test(ownId ?? ''))
    return myDmuNativeVfxClearScope(data, scope, `${reason}:guide-input-incomplete`);
  const direction = Math.atan2(fireObject.x - 100, fireObject.z - 100);
  const point = (rotation, distance) => myDmuP2PointInDirection({ x: 100, z: 100 }, rotation, distance);
  const exPull = point(direction + Math.PI, 19);
  const chaosPull = point(direction, 19);
  const gather = point(direction, 17);
  const fireBuffOrder = myDmuP3MechanicFireBuffOrder(data);
  if (fireBuffOrder === undefined)
    return myDmuNativeVfxClearScope(data, scope, `${reason}:invalid-fire-buff-order`);
  const fireTargets = Object.values(state.buffs.fire)
    .map((entry) => ({ ...entry, role: myDmuGetRpByName(data, entry.name) }))
    .sort((left, right) =>
      myDmuRolePriority(left.role, fireBuffOrder) -
      myDmuRolePriority(right.role, fireBuffOrder) ||
      left.id.localeCompare(right.id));
  const ownRole = myDmuGetRpByName(data, data.me);
  let target = gather;
  if (!state.exCasting && (ownRole === 'MT' || ownRole === 'ST')) {
    if (data.myDmuP3FirewallTargetKind === 'exdeath')
      target = exPull;
    else if (data.myDmuP3FirewallTargetKind === 'chaos')
      target = chaosPull;
  } else {
    const fireIndex = fireTargets.findIndex((entry) => entry.id === ownId);
    if (fireIndex === 0)
      target = point(direction - Math.PI / 4, 10);
    else if (fireIndex === 1)
      target = point(direction + Math.PI / 4, 10);
  }
  return myDmuNativeVfxReplaceScope(data, scope, (vfx) => [
    myDmuNativeVfxCreateArrow(vfx, {
      id: `${scope}.route.${ownId}`,
      type: 'arrow',
      classification: 'guide',
      durationSeconds: 15,
      from: myDmuNativeVfxEntityAnchor(ownId),
      to: myDmuNativeVfxWorldAnchor(target.x, target.z),
      width: 0.08,
      headLength: 0.65,
      headWidth: 0.55,
      style: myDmuNativeVfxThinGuideStyle(),
    }),
    vfx.createCircle({
      id: `${scope}.target.${ownId}`,
      type: 'circle',
      classification: 'guide',
      durationSeconds: 15,
      anchor: myDmuNativeVfxWorldAnchor(target.x, target.z),
      radius: 0.75,
      style: myDmuNativeVfxStyles.target,
    }),
  ], reason);
};

const myDmuRecordP3ElementObject = (data, matches) => {
  const contentId = matches.pairBNpcID?.toString().toUpperCase().replace(/^0+/, '');
  const kind = myDmuP3ElementObjectKinds[contentId];
  const id = myDmuNormalizeActorId(matches.id);
  const x = myDmuNumber(matches.pairPosX ?? matches.x);
  const z = myDmuNumber(matches.pairPosY ?? matches.y ?? matches.z);
  if (kind === undefined || !/^4[0-9A-F]{7}$/u.test(id ?? '') || x === undefined || z === undefined)
    return false;
  myDmuP3MechanicFireBuffOrder(data);
  myDmuP3VfxState(data).elements.objects[kind] = { id, x, z };
  void myDmuRenderP3ElementGuide(data, `object-${kind}`);
  if (kind === 'fire' || kind === 'water')
    void myDmuRenderP3Element(data, kind, `object-${kind}`);
  return true;
};

const myDmuRecordP3ElementBuff = (data, matches) => {
  const info = myDmuP3ElementDebuffs[matches.effectId?.toUpperCase()];
  if (info?.kind !== 'fire' && info?.kind !== 'water')
    return false;
  const actorId = myDmuNormalizeActorId(matches.targetId);
  const duration = myDmuNumber(matches.duration);
  if (!/^1[0-9A-F]{7}$/u.test(actorId ?? '') || duration === undefined)
    return false;
  myDmuP3MechanicFireBuffOrder(data);
  const state = myDmuP3VfxState(data).elements;
  const clock = myDmuNativeVfxSyncClock(data);
  const active = duration < 7;
  state.buffs[info.kind][actorId] = {
    id: actorId,
    name: matches.target,
    active,
    expiresAt: clock.now + duration * 1000,
  };
  if (active)
    state.started[info.kind] = true;
  state.graceUntil[info.kind] = 0;
  const nativeState = myDmuEnsureNativeVfxState(data);
  myDmuNativeVfxCancelClockTask(nativeState, `${myDmuP3ElementScope(info.kind)}:grace`);
  if (!active) {
    myDmuNativeVfxScheduleClockTask(
      data,
      myDmuP3ElementActivationTaskKey(info.kind, actorId),
      Math.max(0, (duration - 7) * 1000),
      () => {
        const current = myDmuP3VfxState(data).elements.buffs[info.kind][actorId];
        if (current === undefined)
          return false;
        current.active = true;
        myDmuP3VfxState(data).elements.started[info.kind] = true;
        return myDmuRenderP3Element(data, info.kind, `buff-activate-${actorId}`);
      },
    );
  }
  void myDmuRenderP3Element(data, info.kind, `buff-gain-${actorId}`);
  myDmuRenderP3ElementGuide(data, `buff-gain-${actorId}`);
  return true;
};

const myDmuLoseP3ElementBuff = (data, matches) => {
  const info = myDmuP3ElementDebuffs[matches.effectId?.toUpperCase()];
  if (info?.kind !== 'fire' && info?.kind !== 'water')
    return false;
  const actorId = myDmuNormalizeActorId(matches.targetId);
  const state = myDmuP3VfxState(data).elements;
  delete state.buffs[info.kind][actorId];
  myDmuNativeVfxCancelClockTask(
    myDmuEnsureNativeVfxState(data),
    myDmuP3ElementActivationTaskKey(info.kind, actorId),
  );
  if (state.started[info.kind] && Object.keys(state.buffs[info.kind]).length === 0) {
    const clock = myDmuNativeVfxSyncClock(data);
    state.graceUntil[info.kind] = clock.now + 2000;
    myDmuNativeVfxScheduleClockTask(
      data,
      `${myDmuP3ElementScope(info.kind)}:grace`,
      2000,
      () => Object.keys(myDmuP3VfxState(data).elements.buffs[info.kind]).length === 0
        ? myDmuNativeVfxClearScope(data, myDmuP3ElementScope(info.kind), 'buff-grace-ended')
        : false,
    );
  }
  void myDmuRenderP3Element(data, info.kind, `buff-lose-${actorId}`);
  myDmuRenderP3ElementGuide(data, `buff-lose-${actorId}`);
  return true;
};

const myDmuBuildP3BigCircleVfx = (vfx, matches) => [vfx.createCircle({
  id: `p3.elements.big.${myDmuNormalizeActorId(matches.sourceId)}`,
  type: 'circle',
  classification: 'danger',
  durationSeconds: 8.5,
  anchor: myDmuNativeVfxEntityAnchor(matches.sourceId),
  radius: 15,
  style: myDmuNativeVfxStyles.purple,
})];

const myDmuBuildP3ImplosionVfx = (vfx, matches, stage) => {
  const id = matches.id?.toUpperCase();
  const frontBackFirst = id === 'BAFD';
  const frontBack = stage === 1 ? frontBackFirst : !frontBackFirst;
  const offsets = frontBack ? [0, Math.PI] : [Math.PI / 2, -Math.PI / 2];
  const durationSeconds = stage === 1 ? 5.5 : 2.5;
  return offsets.map((offset, index) => vfx.createSector({
    id: `p3.implosion.s${stage}.${index + 1}`,
    type: 'sector',
    classification: 'danger',
    durationSeconds,
    anchor: myDmuNativeVfxEntityAnchor(matches.sourceId),
    radius: 40,
    angleRadians: Math.PI / 2,
    direction: { mode: 'sourceHeading', rotationRadians: offset },
    style: myDmuNativeVfxStyles.fire,
  }));
};

const myDmuRenderP3Implosion = (data, matches) => {
  myDmuP3RecordBoss(data, 'chaos', matches.sourceId);
  const opened = myDmuNativeVfxReplaceScope(
    data,
    'p3.implosion',
    (vfx) => myDmuBuildP3ImplosionVfx(vfx, matches, 1),
    `${matches.id}-stage-1`,
  );
  if (opened) {
    myDmuNativeVfxScheduleClockTask(data, 'p3.implosion:stage-2', 5500, () =>
      myDmuNativeVfxReplaceScope(
        data,
        'p3.implosion',
        (vfx) => myDmuBuildP3ImplosionVfx(vfx, matches, 2),
        `${matches.id}-stage-2`,
      ));
  }
  return opened;
};

const myDmuResolveP3PartyExtreme = async (data, sourceId, mode, scope) => {
  const source = myDmuNormalizeActorId(sourceId);
  const partyIds = myDmuNativeVfxPartyActorIds(data);
  if (!/^4[0-9A-F]{7}$/u.test(source ?? '') || partyIds.length !== 8)
    return undefined;
  const positions = await myDmuNativeVfxResolveCombatants(data, [source, ...partyIds], scope);
  if (positions.length !== 9)
    return undefined;
  const sourcePosition = positions.find((entry) => entry.id === source);
  if (sourcePosition === undefined)
    return undefined;
  const candidates = positions.filter((entry) => partyIds.includes(entry.id))
    .map((entry) => ({
      ...entry,
      distance: Math.hypot(entry.x - sourcePosition.x, entry.z - sourcePosition.z),
    }))
    .sort((left, right) => left.distance - right.distance || left.id.localeCompare(right.id));
  return {
    source: sourcePosition,
    target: mode === 'farthest' ? candidates.at(-1) : candidates[0],
    party: candidates,
  };
};

const myDmuRenderP3Thunder = async (data, matches) => {
  const sourceId = myDmuP3RecordBoss(data, 'exdeath', matches.sourceId);
  const fence = myDmuNativeVfxCaptureFence(data);
  const resolved = await myDmuResolveP3PartyExtreme(data, sourceId, 'nearest', 'p3.thunder');
  if (!myDmuNativeVfxFenceCurrent(data, fence))
    return false;
  if (resolved?.target === undefined)
    return myDmuNativeVfxClearScope(data, 'p3.thunder', 'BB09-query-failed');
  return myDmuNativeVfxReplaceScope(data, 'p3.thunder', (vfx) => [vfx.createCircle({
    id: `p3.thunder.${resolved.target.id}`,
    type: 'circle',
    classification: 'danger',
    durationSeconds: 8.5,
    anchor: myDmuNativeVfxEntityAnchor(resolved.target.id),
    radius: 5,
    style: myDmuNativeVfxStyles.purple,
  })], 'BB09-start');
};

const myDmuBuildP3SlapVfx = (vfx, data, matches, positions) => {
  const scope = 'p3.slap';
  const heading = myDmuNativeVfxHeading(matches);
  const right = matches.id?.toUpperCase() === 'BAE6';
  const headings = right
    ? [heading - Math.PI * 3 / 4, heading - Math.PI / 2, heading - Math.PI / 4]
    : [heading + Math.PI * 3 / 4, heading + Math.PI / 2, heading + Math.PI / 4];
  const distances = [10 * Math.SQRT2, 10, 10 * Math.SQRT2];
  const points = headings.map((rotation, index) =>
    myDmuP2PointInDirection({ x: 100, z: 100 }, rotation, distances[index]));
  points[0] = myDmuP2PointInDirection(points[0], heading + Math.PI, 6);
  points[2] = myDmuP2PointInDirection(points[2], heading, 4);
  const drawings = points.map((point, index) => vfx.createCircle({
    id: `${scope}.outer.${index + 1}`,
    type: 'circle',
    classification: 'danger',
    durationSeconds: 9,
    anchor: myDmuNativeVfxWorldAnchor(point.x, point.z),
    radius: 14,
    style: myDmuNativeVfxStyles.orange,
  }));
  drawings.push(vfx.createCircle({
    id: `${scope}.center`,
    type: 'circle',
    classification: 'danger',
    durationSeconds: 9,
    anchor: myDmuNativeVfxWorldAnchor(100, 100),
    radius: 6,
    style: myDmuNativeVfxStyles.fire,
  }));
  if (!myDmuNativeVfxPersonalGuideEnabled(data))
    return drawings;
  const sectorSetting = myDmuP3OptionalBooleanConfig(data, 'MyDMU_P3SlapRoleSectors');
  const arrowSetting = myDmuP3OptionalBooleanConfig(data, 'MyDMU_P3SlapRouteArrow');
  const drawSectors = sectorSetting === myDmuP3LegacyConfig || sectorSetting === true;
  const drawArrow = arrowSetting === myDmuP3LegacyConfig || arrowSetting === true;
  if (drawSectors) {
    const byId = new Map(positions.map((entry) => [entry.id, entry]));
    const sectorIds = right
      ? [myDmuNormalizeActorId(myDmuGetHexIdByName(data, data.me))]
      : ['MT', 'H1', 'D1'].map((role) => myDmuNativeVfxRoleActorId(data, role));
    for (const [index, actorId] of sectorIds.entries()) {
      const target = byId.get(actorId);
      if (target === undefined)
        continue;
      drawings.push(vfx.createSector({
        id: `${scope}.guide.sector.${index + 1}`,
        type: 'sector',
        classification: 'guide',
        durationSeconds: 9,
        anchor: myDmuNativeVfxWorldAnchor(100, 100),
        radius: right ? 30 : 20,
        angleRadians: Math.PI / 3,
        direction: {
          mode: 'fixed',
          rotationRadians: Math.atan2(target.x - 100, target.z - 100),
        },
        style: myDmuNativeVfxStyles.litBlue,
      }));
    }
  }
  if (drawArrow) {
    const roleOffset = right ? Math.PI / 2 : data.role === 'tank'
      ? -Math.PI * 5 / 6
      : data.role === 'healer' ? -Math.PI / 2 : -Math.PI / 6;
    const arrowTarget = myDmuP2PointInDirection({ x: 100, z: 100 }, heading + roleOffset, 10);
    drawings.push(myDmuNativeVfxCreateArrow(vfx, {
      id: `${scope}.guide.route`,
      type: 'arrow',
      classification: 'guide',
      durationSeconds: 9,
      from: myDmuNativeVfxWorldAnchor(100, 100),
      to: myDmuNativeVfxWorldAnchor(arrowTarget.x, arrowTarget.z),
      width: 0.08,
      headLength: 0.7,
      headWidth: 0.6,
      style: myDmuNativeVfxThinGuideStyle(),
    }));
  }
  return drawings;
};

const myDmuRenderP3Slap = async (data, matches) => {
  myDmuP3RecordBoss(data, 'kefka', matches.sourceId);
  let positions = [];
  const sectorSetting = myDmuP3OptionalBooleanConfig(data, 'MyDMU_P3SlapRoleSectors');
  const needsPositions = sectorSetting === myDmuP3LegacyConfig || sectorSetting === true;
  if (myDmuNativeVfxPersonalGuideEnabled(data) && needsPositions) {
    const actorIds = myDmuNativeVfxPartyActorIds(data);
    const fence = myDmuNativeVfxCaptureFence(data);
    positions = await myDmuNativeVfxResolveCombatants(data, actorIds, 'p3.slap');
    if (!myDmuNativeVfxFenceCurrent(data, fence))
      return false;
    if (positions.length !== 8)
      return myDmuNativeVfxClearScope(data, 'p3.slap', `${matches.id}-party-query-failed`);
  }
  return myDmuNativeVfxReplaceScope(
    data,
    'p3.slap',
    (vfx) => myDmuBuildP3SlapVfx(vfx, data, matches, positions),
    `${matches.id}-start`,
  );
};

const myDmuBuildP3LookVfx = (vfx, matches) => [vfx.createRect({
  id: `p3.look.${myDmuNormalizeActorId(matches.sourceId)}`,
  type: 'rect',
  classification: 'danger',
  durationSeconds: 5.7,
  anchor: myDmuNativeVfxWorldAnchor(100, 100),
  width: 16,
  length: 40,
  direction: { mode: 'fixed', rotationRadians: myDmuNativeVfxHeading(matches) },
  pivot: 'center',
  style: myDmuNativeVfxStyles.fire,
})];

const myDmuBuildP3EdictVfx = (vfx, matches) => [vfx.createRect({
  id: `p3.edict.${myDmuNormalizeActorId(matches.sourceId)}`,
  type: 'rect',
  classification: 'danger',
  durationSeconds: 5,
  anchor: myDmuNativeVfxEntityAnchor(matches.sourceId),
  width: 50,
  length: 50,
  direction: { mode: 'sourceHeading', rotationRadians: 0 },
  pivot: 'start',
  style: myDmuNativeVfxStyles.orange,
})];

const myDmuBuildP3UmbraVfx = (vfx, data, resolved, snapshot) => {
  const targetAnchor = snapshot
    ? myDmuNativeVfxWorldAnchor(resolved.target.x, resolved.target.z)
    : myDmuNativeVfxEntityAnchor(resolved.target.id);
  const drawings = [vfx.createCircle({
    id: `p3.umbra.${resolved.target.id}`,
    type: 'circle',
    classification: 'danger',
    durationSeconds: 4.7,
    anchor: targetAnchor,
    radius: 19,
    style: myDmuNativeVfxStyles.fire,
  })];
  const ownId = myDmuNormalizeActorId(myDmuGetHexIdByName(data, data.me));
  const bait = myDmuP3OptionalEnumConfig(
    data,
    'MyDMU_P3SuperJumpBait',
    [myDmuP3LegacyConfig, 'd3', 'd4'],
  );
  const ownRole = myDmuGetRpByName(data, data.me)?.toLowerCase();
  const legacyGuide = bait === myDmuP3LegacyConfig && ownId === resolved.target.id;
  const configuredGuide = (bait === 'd3' || bait === 'd4') && ownRole === bait;
  if (myDmuNativeVfxPersonalGuideEnabled(data) && (legacyGuide || configuredGuide)) {
    let target;
    if (legacyGuide) {
      const rotation = Math.atan2(
        resolved.target.x - resolved.source.x,
        resolved.target.z - resolved.source.z,
      );
      target = myDmuP2PointInDirection(resolved.target, rotation, 3);
    } else {
      const fireObject = myDmuP3VfxState(data).elements.objects.fire;
      if (fireObject !== undefined) {
        const fireDirection = Math.atan2(fireObject.x - 100, fireObject.z - 100);
        target = myDmuP2PointInDirection({ x: 100, z: 100 }, fireDirection + Math.PI, 19);
      }
    }
    if (target === undefined)
      return drawings;
    drawings.push(myDmuNativeVfxCreateArrow(vfx, {
      id: `p3.umbra.guide.${ownId}`,
      type: 'arrow',
      classification: 'guide',
      durationSeconds: 4.7,
      from: myDmuNativeVfxEntityAnchor(ownId),
      to: myDmuNativeVfxWorldAnchor(target.x, target.z),
      width: 0.08,
      headLength: 0.7,
      headWidth: 0.6,
      style: myDmuNativeVfxThinGuideStyle(),
    }));
  }
  return drawings;
};

const myDmuRenderP3Umbra = async (data, matches) => {
  const sourceId = myDmuP3RecordBoss(data, 'chaos', matches.sourceId);
  const fence = myDmuNativeVfxCaptureFence(data);
  const resolved = await myDmuResolveP3PartyExtreme(data, sourceId, 'farthest', 'p3.umbra');
  if (!myDmuNativeVfxFenceCurrent(data, fence))
    return false;
  if (resolved?.target === undefined)
    return myDmuNativeVfxClearScope(data, 'p3.umbra', 'BB00-query-failed');
  const opened = myDmuNativeVfxReplaceScope(
    data,
    'p3.umbra',
    (vfx) => myDmuBuildP3UmbraVfx(vfx, data, resolved, false),
    'BB00-dynamic',
  );
  if (opened) {
    myDmuNativeVfxScheduleClockTask(data, 'p3.umbra:snapshot', 30, async () => {
      const snapshotFence = myDmuNativeVfxCaptureFence(data);
      const snapshot = await myDmuResolveP3PartyExtreme(data, sourceId, 'farthest', 'p3.umbra');
      if (!myDmuNativeVfxFenceCurrent(data, snapshotFence))
        return false;
      if (snapshot?.target === undefined)
        return myDmuNativeVfxClearScope(data, 'p3.umbra', 'BB00-snapshot-query-failed');
      return myDmuNativeVfxReplaceScope(
        data,
        'p3.umbra',
        (vfx) => myDmuBuildP3UmbraVfx(vfx, data, snapshot, true),
        'BB00-snapshot',
      );
    });
  }
  return opened;
};

const myDmuBuildP3VacuumVfx = (vfx, data, resolved, partyCircles) => {
  const ownId = myDmuNormalizeActorId(myDmuGetHexIdByName(data, data.me));
  const own = resolved.party.find((entry) => entry.id === ownId);
  if (own === undefined)
    throw new Error('P3 真空波缺少本人坐标');
  const strategy = myDmuP3OptionalEnumConfig(
    data,
    'MyDMU_P3KnockbackStrategy',
    [myDmuP3LegacyConfig, 'thht', 'hth', 'all'],
  );
  const role = myDmuGetRpByName(data, data.me);
  const baseHeading = Math.atan2(100 - resolved.source.x, 100 - resolved.source.z);
  let arrowTarget;
  if (strategy === myDmuP3LegacyConfig) {
    const rotation = Math.atan2(own.x - resolved.source.x, own.z - resolved.source.z);
    arrowTarget = myDmuP2PointInDirection(own, rotation, 9.6);
  } else if (strategy !== undefined && myDmuNativeVfxPersonalGuideEnabled(data)) {
    const beforeOffsets = strategy === 'thht'
      ? {
        MT: -Math.PI * 3 / 8, D3: -Math.PI * 3 / 8,
        H1: -Math.PI / 8, D1: -Math.PI / 8,
        H2: Math.PI / 8, D2: Math.PI / 8,
        ST: Math.PI * 3 / 8, D4: Math.PI * 3 / 8,
      }
      : strategy === 'hth'
        ? {
          H1: -Math.PI / 4, D3: -Math.PI / 4,
          MT: 0, D1: 0, ST: 0, D2: 0,
          H2: Math.PI / 4, D4: Math.PI / 4,
        }
        : Object.fromEntries(myDmuP3FireBuffDefaultOrder.map((entry) => [entry, 0]));
    if (!partyCircles) {
      const offset = beforeOffsets[role];
      if (offset !== undefined)
        arrowTarget = myDmuP2PointInDirection(resolved.source, baseHeading + offset, 4);
    } else {
      const afterRadius = strategy === 'all' ? 15
        : strategy === 'thht' ? 12
          : ['MT', 'D1'].includes(role) ? 5
            : ['ST', 'D2'].includes(role) ? 15 : 12;
      arrowTarget = myDmuP2PointInDirection(resolved.source, baseHeading, afterRadius);
    }
  }
  const durationSeconds = partyCircles ? 5 : 12.7;
  const drawings = [];
  if (arrowTarget !== undefined) {
    drawings.push(myDmuNativeVfxCreateArrow(vfx, {
      id: `p3.vacuum.kick.${ownId}`,
      type: 'arrow',
      classification: 'guide',
      durationSeconds,
      from: myDmuNativeVfxEntityAnchor(ownId),
      to: myDmuNativeVfxWorldAnchor(arrowTarget.x, arrowTarget.z),
      width: 0.08,
      headLength: 0.7,
      headWidth: 0.6,
      style: myDmuNativeVfxThinGuideStyle(),
    }));
  }
  if (partyCircles) {
    for (const member of resolved.party) {
      drawings.push(vfx.createCircle({
        id: `p3.vacuum.wind.${member.id}`,
        type: 'circle',
        classification: 'danger',
        durationSeconds: 5,
        anchor: myDmuNativeVfxEntityAnchor(member.id),
        radius: 6,
        style: myDmuNativeVfxStyles.water,
      }));
    }
  }
  return drawings;
};

const myDmuRenderP3Vacuum = async (data, matches) => {
  const sourceId = myDmuP3RecordBoss(data, 'exdeath', matches.sourceId);
  const fence = myDmuNativeVfxCaptureFence(data);
  const resolved = await myDmuResolveP3PartyExtreme(data, sourceId, 'nearest', 'p3.vacuum');
  if (!myDmuNativeVfxFenceCurrent(data, fence))
    return false;
  if (resolved?.party?.length !== 8)
    return myDmuNativeVfxClearScope(data, 'p3.vacuum', 'BB13-query-failed');
  const opened = myDmuNativeVfxReplaceScope(
    data,
    'p3.vacuum',
    (vfx) => myDmuBuildP3VacuumVfx(vfx, data, resolved, false),
    'BB13-kick',
  );
  if (opened) {
    myDmuNativeVfxScheduleClockTask(data, 'p3.vacuum:wind-circles', 7700, async () => {
      const nextFence = myDmuNativeVfxCaptureFence(data);
      const next = await myDmuResolveP3PartyExtreme(data, sourceId, 'nearest', 'p3.vacuum');
      if (!myDmuNativeVfxFenceCurrent(data, nextFence))
        return false;
      if (next?.party?.length !== 8)
        return myDmuNativeVfxClearScope(data, 'p3.vacuum', 'BB13-wind-query-failed');
      return myDmuNativeVfxReplaceScope(
        data,
        'p3.vacuum',
        (vfx) => myDmuBuildP3VacuumVfx(vfx, data, next, true),
        'BB13-wind-circles',
      );
    });
  }
  return opened;
};

const myDmuBuildP3MahjongVfx = (vfx, data) => {
  const state = data.myDmuP3Mahjong;
  const markers = Object.values(state.markers ?? {});
  if (markers.length !== 8 || new Set(markers.map((entry) => entry.id)).size !== 8 ||
      new Set(markers.map((entry) => entry.mahjong)).size !== 8 || state.lines.length !== 2 ||
      new Set(state.lines.map((line) => line.point.index)).size !== 2)
    throw new Error('P3 麻将需要 8 个唯一 owner/编号与 2 个唯一环点');
  const attackStep = myDmuStepBetween(state.lines[0].point.index, state.lines[1].point.index);
  if (attackStep === 0)
    throw new Error('P3 麻将双线方向无效');
  const baseHeading = Math.atan2(state.lines[0].point.x - 100, state.lines[0].point.z - 100);
  const drawings = [];
  for (const entry of markers.sort((left, right) => left.mahjong - right.mahjong)) {
    if (state.resolvedTargetIds?.[entry.id])
      continue;
    const sourceHeading = baseHeading + attackStep * (entry.mahjong - 1) * Math.PI / 4;
    const source = myDmuP2PointInDirection({ x: 100, z: 100 }, sourceHeading, 20);
    drawings.push(vfx.createRect({
      id: `p3.mahjong.line.${entry.id}`,
      type: 'rect',
      classification: 'danger',
      durationSeconds: 14.5,
      anchor: myDmuNativeVfxWorldAnchor(source.x, source.z),
      width: 10,
      length: 40,
      direction: {
        mode: 'towardTarget',
        rotationRadians: 0,
        target: myDmuNativeVfxEntityAnchor(entry.id),
      },
      pivot: 'start',
      style: myDmuNativeVfxStyles.litBlue,
    }));
  }
  if (myDmuNativeVfxPersonalGuideEnabled(data)) {
    const own = myDmuOwnP3Mahjong(data);
    if (own !== undefined && !state.resolvedTargetIds?.[own.id]) {
      const standStep = -attackStep;
      const baseIndex = myDmuOppositePointIndex(state.lines[0].point.index);
      const target = myDmuMahjongTargetPosition(baseIndex, standStep, own.mahjong);
      drawings.push(myDmuNativeVfxCreateArrow(vfx, {
        id: `p3.mahjong.guide.${own.id}`,
        type: 'arrow',
        classification: 'guide',
        durationSeconds: 14.5,
        from: myDmuNativeVfxEntityAnchor(own.id),
        to: myDmuNativeVfxWorldAnchor(target.x, target.z),
        width: 0.08,
        headLength: 0.7,
        headWidth: 0.6,
        style: myDmuNativeVfxThinGuideStyle(),
      }));
    }
  }
  return drawings;
};

const myDmuRenderP3Mahjong = (data, reason) => {
  const state = data.myDmuP3Mahjong;
  if (!myDmuNativeVfxPhaseEnabled(data, 'p3'))
    return false;
  const markers = Object.values(state?.markers ?? {});
  if (markers.length < 8 || (state?.lines?.length ?? 0) < 2)
    return false;
  if ((state.resolveCount ?? 0) >= 8)
    return myDmuNativeVfxClearScope(data, 'p3.mahjong', `${reason}:resolved`);
  return myDmuNativeVfxReplaceScope(
    data,
    'p3.mahjong',
    (vfx) => myDmuBuildP3MahjongVfx(vfx, data),
    reason,
  );
};

const myDmuBuildP3BlackholeVfx = (vfx, data, wave) => {
  const scope = `p3.blackhole.w${wave}`;
  const state = myDmuP3VfxState(data).blackhole.waves[wave];
  const clock = myDmuNativeVfxClock(data);
  const actors = Object.values(state.actors)
    .filter((entry) => entry.expiresAt > clock.now)
    .sort((left, right) => left.id.localeCompare(right.id));
  const tethers = Object.values(state.tethers)
    .filter((entry) => state.actors[entry.sourceId] !== undefined && entry.expiresAt > clock.now)
    .sort((left, right) => left.sourceId.localeCompare(right.sourceId));
  if (tethers.length > 3)
    throw new Error(`P3 黑洞第${wave}波同时存在 ${tethers.length} 条 0054，超过硬上限 3`);
  const drawings = actors.map((actor) => vfx.createCircle({
    id: `${scope}.hole.${actor.id}`,
    type: 'circle',
    classification: 'danger',
    durationSeconds: Math.max(0.5, Math.min(21, (actor.expiresAt - clock.now) / 1000)),
    anchor: myDmuNativeVfxEntityAnchor(actor.id),
    radius: 2,
    style: myDmuNativeVfxStyles.fire,
  }));
  for (const tether of tethers) {
    drawings.push(vfx.createRect({
      id: `${scope}.tether.${tether.sourceId}`,
      type: 'rect',
      classification: 'danger',
      durationSeconds: Math.max(0.5, Math.min(21, (tether.expiresAt - clock.now) / 1000)),
      anchor: myDmuNativeVfxEntityAnchor(tether.sourceId),
      width: 6,
      length: 40,
      direction: {
        mode: 'towardTarget',
        rotationRadians: 0,
        target: myDmuNativeVfxEntityAnchor(tether.targetId),
      },
      pivot: 'start',
      style: myDmuNativeVfxStyles.litBlue,
    }));
  }
  return drawings;
};

const myDmuP3TargetMarkerActors = (data) => {
  const state = data.myDmuP3Targets;
  if (state?.first?.length !== 3 || state?.second?.length !== 3 || state?.third?.length !== 2)
    return undefined;
  const result = {};
  const assign = (entries, order, markers) => {
    const sorted = [...entries].sort((left, right) =>
      myDmuRolePriority(left.role, order) - myDmuRolePriority(right.role, order) ||
      `${left.id}`.localeCompare(`${right.id}`));
    for (const [index, entry] of sorted.entries()) {
      const actorId = myDmuNormalizeActorId(entry.id);
      if (!/^1[0-9A-F]{7}$/u.test(actorId ?? ''))
        return false;
      result[markers[index]] = actorId;
    }
    return true;
  };
  if (!assign(state.first, myDmuP3TargetFirstPriority(data), ['attack1', 'attack2', 'attack3']) ||
      !assign(state.second, myDmuP3TargetSecondPriority(data), ['bind1', 'bind2', 'bind3']) ||
      !assign(state.third, myDmuP3TargetThirdPriority(data), ['stop1', 'stop2']))
    return undefined;
  return result;
};

const myDmuInvalidateP3Blackhole = (data, reason, detail = {}) => {
  const blackhole = myDmuP3VfxState(data).blackhole;
  if (!blackhole.invalid) {
    blackhole.invalid = true;
    blackhole.invalidReason = reason;
    blackhole.batch = {};
    blackhole.batchOpenedAt = undefined;
    myDmuActLog('Native VFX coverage gap', {
      scope: 'p3.blackhole',
      reason,
      ...detail,
      fallback: false,
    });
  }
  for (let wave = 1; wave <= 4; wave++)
    myDmuNativeVfxClearScope(data, `p3.blackhole.w${wave}`, `${reason}:fail-closed`);
  myDmuNativeVfxClearScope(data, 'p3.blackhole.guide', `${reason}:fail-closed`);
  return false;
};

const myDmuScheduleP3BlackholeBatchAudit = (data, wave, openedAt) => {
  const key = `p3.blackhole.guide:batch-${wave}`;
  return myDmuNativeVfxScheduleClockTask(data, key, 550, () => {
    const blackhole = myDmuP3VfxState(data).blackhole;
    if (blackhole.invalid || blackhole.batchOpenedAt !== openedAt || blackhole.wave + 1 !== wave)
      return false;
    const count = Object.keys(blackhole.batch).length;
    if (count === 0)
      return false;
    return myDmuInvalidateP3Blackhole(data, 'incomplete-blackhole-wave-timeout', {
      wave,
      count,
    });
  });
};

const myDmuRenderP3BlackholeGuide = async (data, reason) => {
  const scope = 'p3.blackhole.guide';
  if (myDmuP3VfxState(data).blackhole.invalid)
    return myDmuNativeVfxClearScope(data, scope, `${reason}:invalid-latched`);
  if (!myDmuNativeVfxPersonalGuideEnabled(data))
    return myDmuNativeVfxClearScope(data, scope, `${reason}:guide-disabled`);
  const ownId = myDmuNormalizeActorId(myDmuGetHexIdByName(data, data.me));
  const blackhole = myDmuP3VfxState(data).blackhole;
  const revision = blackhole.guideRevision;
  const attackSetting = myDmuP3OptionalBooleanConfig(data, 'MyDMU_P3Attack1DoubleTether');
  const stopSetting = myDmuP3OptionalBooleanConfig(data, 'MyDMU_P3Stop2DoubleTether');
  if (attackSetting === undefined || stopSetting === undefined)
    return myDmuNativeVfxClearScope(data, scope, `${reason}:invalid-double-config`);
  const attackDouble = attackSetting === true;
  const stopDouble = stopSetting === true;
  const doubleSpec = attackDouble && blackhole.wave === 1
    ? { wave: 1, marker: 'attack1' }
    : stopDouble && blackhole.wave === 4
      ? { wave: 4, marker: 'stop2' }
      : undefined;
  if (doubleSpec !== undefined) {
    const markerActors = myDmuP3TargetMarkerActors(data);
    if (markerActors === undefined)
      return myDmuNativeVfxClearScope(data, scope, `${reason}:double-assignment-incomplete`);
    if (markerActors[doubleSpec.marker] === ownId) {
      const waveState = blackhole.waves[doubleSpec.wave];
      const sources = Object.values(waveState.tethers)
        .filter((entry) => entry.targetId === ownId)
        .map((entry) => entry.sourceId)
        .sort();
      if (sources.length < 2)
        return myDmuNativeVfxClearScope(data, scope, `${reason}:double-sources-incomplete`);
      if (sources.length > 2)
        return myDmuNativeVfxClearScope(data, scope, `${reason}:double-source-overflow`);
      const actorIds = [...sources, ownId];
      const cached = actorIds.map((actorId) => {
        if (actorId === ownId)
          return undefined;
        const actor = waveState.actors[actorId];
        return Number.isFinite(actor?.x) && Number.isFinite(actor?.z)
          ? { id: actorId, x: actor.x, z: actor.z }
          : undefined;
      });
      let ownPosition;
      let sourcePositions = cached.slice(0, 2);
      if (sourcePositions.some((entry) => entry === undefined)) {
        const fence = myDmuNativeVfxCaptureFence(data);
        const positions = await myDmuNativeVfxResolveCombatants(data, actorIds, scope);
        if (!myDmuNativeVfxFenceCurrent(data, fence))
          return false;
        if (myDmuP3VfxState(data).blackhole.guideRevision !== revision)
          return false;
        if (positions.length !== actorIds.length)
          return myDmuNativeVfxClearScope(data, scope, `${reason}:double-position-query-failed`);
        const byId = new Map(positions.map((entry) => [entry.id, entry]));
        sourcePositions = sources.map((sourceId) => byId.get(sourceId));
        ownPosition = byId.get(ownId);
      }
      let target = {
        x: (sourcePositions[0].x + sourcePositions[1].x) / 2,
        z: (sourcePositions[0].z + sourcePositions[1].z) / 2,
      };
      if (Math.hypot(target.x - 100, target.z - 100) < 2) {
        const heading = myDmuP3VfxState(data).bosses.kefkaHeading;
        if (!Number.isFinite(heading))
          return myDmuNativeVfxClearScope(data, scope, `${reason}:double-kefka-heading-missing`);
        if (ownPosition === undefined) {
          const fence = myDmuNativeVfxCaptureFence(data);
          const positions = await myDmuNativeVfxResolveCombatants(data, [ownId], scope);
          if (!myDmuNativeVfxFenceCurrent(data, fence))
            return false;
          if (myDmuP3VfxState(data).blackhole.guideRevision !== revision)
            return false;
          ownPosition = positions[0];
        }
        if (ownPosition === undefined)
          return myDmuNativeVfxClearScope(data, scope, `${reason}:double-self-position-missing`);
        const sides = [heading + Math.PI / 2, heading - Math.PI / 2]
          .map((rotation) => myDmuP2PointInDirection({ x: 100, z: 100 }, rotation, 12));
        target = sides.sort((left, right) =>
          Math.hypot(left.x - ownPosition.x, left.z - ownPosition.z) -
          Math.hypot(right.x - ownPosition.x, right.z - ownPosition.z))[0];
      }
      return myDmuNativeVfxReplaceScope(data, scope, (vfx) => [myDmuNativeVfxCreateArrow(vfx, {
        id: `${scope}.double.${doubleSpec.marker}`,
        type: 'arrow',
        classification: 'guide',
        durationSeconds: 8,
        from: myDmuNativeVfxEntityAnchor(ownId),
        to: myDmuNativeVfxWorldAnchor(target.x, target.z),
        width: 0.08,
        headLength: 0.7,
        headWidth: 0.6,
        style: myDmuNativeVfxThinGuideStyle(),
      })], `${reason}:double-${doubleSpec.marker}`);
    }
  }
  const own = Object.values(blackhole.waves)
    .flatMap((wave) => Object.values(wave.tethers))
    .filter((entry) => entry.targetId === ownId && blackhole.waveByActor[entry.sourceId] !== undefined)
    .sort((left, right) => left.sourceId.localeCompare(right.sourceId))[0];
  if (own === undefined)
    return myDmuNativeVfxClearScope(data, scope, `${reason}:no-personal-tether`);
  return myDmuNativeVfxReplaceScope(data, scope, (vfx) => [myDmuNativeVfxCreateArrow(vfx, {
    id: `${scope}.route.${own.sourceId}`,
    type: 'arrow',
    classification: 'guide',
    durationSeconds: 8,
    from: myDmuNativeVfxEntityAnchor(ownId),
    to: myDmuNativeVfxEntityAnchor(own.sourceId),
    width: 0.08,
    headLength: 0.7,
    headWidth: 0.6,
    style: myDmuNativeVfxThinGuideStyle(),
  })], reason);
};

const myDmuRenderP3BlackholeWave = (data, wave, reason) => {
  const scope = `p3.blackhole.w${wave}`;
  const blackhole = myDmuP3VfxState(data).blackhole;
  if (blackhole.invalid)
    return myDmuNativeVfxClearScope(data, scope, `${reason}:invalid-latched`);
  const state = blackhole.waves[wave];
  if (state === undefined || Object.keys(state.actors).length === 0)
    return myDmuNativeVfxClearScope(data, scope, `${reason}:empty`);
  return myDmuNativeVfxReplaceScope(
    data,
    scope,
    (vfx) => myDmuBuildP3BlackholeVfx(vfx, data, wave),
    reason,
  );
};

const myDmuRecordP3Blackhole = (data, matches) => {
  const npcBaseId = Number(matches.npcBaseId ?? Number.parseInt(matches.pairBNpcID ?? '', 16));
  const npcNameId = Number(matches.npcNameId ?? Number.parseInt(matches.pairBNpcNameID ?? '', 16));
  const actorId = myDmuNormalizeActorId(matches.id);
  if (!myDmuNativeVfxNpcBaseIds.p3BlackHole.has(npcBaseId) || npcNameId !== 8343 ||
      !/^4[0-9A-F]{7}$/u.test(actorId ?? ''))
    return false;
  const blackhole = myDmuP3VfxState(data).blackhole;
  if (blackhole.invalid)
    return false;
  if (blackhole.waveByActor[actorId] !== undefined || blackhole.batch[actorId] !== undefined)
    return true;
  const eventAt = myDmuNativeVfxEventMilliseconds(matches);
  if (blackhole.lastWaveClosedAt !== undefined &&
      eventAt - blackhole.lastWaveClosedAt >= 0 && eventAt - blackhole.lastWaveClosedAt <= 500) {
    return myDmuInvalidateP3Blackhole(data, 'unexpected-blackhole-wave-overflow', {
      wave: blackhole.wave,
      actorId,
    });
  }
  if (blackhole.batchOpenedAt !== undefined && eventAt - blackhole.batchOpenedAt > 500 &&
      Object.keys(blackhole.batch).length !== 0) {
    return myDmuInvalidateP3Blackhole(data, 'incomplete-blackhole-wave', {
      count: Object.keys(blackhole.batch).length,
    });
  }
  if (blackhole.batchOpenedAt === undefined) {
    blackhole.batchOpenedAt = eventAt;
    myDmuScheduleP3BlackholeBatchAudit(data, blackhole.wave + 1, eventAt);
  }
  const x = myDmuNumber(matches.x ?? matches.posX ?? matches.pairPosX);
  const z = myDmuNumber(matches.y ?? matches.z ?? matches.posY ?? matches.pairPosY);
  blackhole.batch[actorId] = { id: actorId, x, z };
  const count = Object.keys(blackhole.batch).length;
  if (count < 11)
    return true;
  if (count !== 11 || blackhole.wave >= 4) {
    return myDmuInvalidateP3Blackhole(data, 'unexpected-blackhole-wave-size', {
      wave: blackhole.wave + 1,
      count,
    });
  }
  blackhole.wave++;
  const wave = blackhole.wave;
  const expiresAt = myDmuNativeVfxClock(data).now + 21000;
  for (const entry of Object.values(blackhole.batch)) {
    blackhole.waves[wave].actors[entry.id] = {
      id: entry.id,
      expiresAt,
      x: entry.x,
      z: entry.z,
    };
    blackhole.waveByActor[entry.id] = wave;
  }
  blackhole.batch = {};
  blackhole.batchOpenedAt = undefined;
  blackhole.lastWaveClosedAt = eventAt;
  myDmuNativeVfxCancelClockTask(
    myDmuEnsureNativeVfxState(data),
    `p3.blackhole.guide:batch-${wave}`,
  );
  return myDmuRenderP3BlackholeWave(data, wave, `wave-${wave}-complete`);
};

const myDmuRecordP3BlackholeTether = async (data, matches) => {
  const sourceId = myDmuNormalizeActorId(matches.sourceId);
  const targetId = myDmuNormalizeActorId(matches.targetId);
  const blackhole = myDmuP3VfxState(data).blackhole;
  if (blackhole.invalid)
    return false;
  const wave = blackhole.waveByActor[sourceId];
  if (wave === undefined || !/^1[0-9A-F]{7}$/u.test(targetId ?? '')) {
    return myDmuInvalidateP3Blackhole(data, 'tether-source-or-target-unresolved', {
      sourceId,
      targetId,
    });
  }
  const previous = blackhole.waves[wave].tethers[sourceId];
  if (previous !== undefined && previous.targetId === targetId)
    return true;
  const actor = blackhole.waves[wave].actors[sourceId];
  blackhole.waves[wave].tethers[sourceId] = {
    sourceId,
    targetId,
    expiresAt: actor.expiresAt,
  };
  blackhole.guideRevision++;
  const rendered = myDmuRenderP3BlackholeWave(data, wave, `tether-${sourceId}`);
  await myDmuRenderP3BlackholeGuide(data, `tether-${sourceId}`);
  return rendered;
};

const myDmuRemoveP3Object = (data, actorId, reason) => {
  const id = myDmuNormalizeActorId(actorId);
  const p3 = myDmuP3VfxState(data);
  let removedElementObject = false;
  for (const [kind, object] of Object.entries(p3.elements.objects)) {
    if (object.id !== id)
      continue;
    delete p3.elements.objects[kind];
    removedElementObject = true;
    if (kind === 'fire' || kind === 'water')
      myDmuNativeVfxClearScope(data, myDmuP3ElementScope(kind), `${reason}:element-remove`);
    myDmuNativeVfxClearScope(data, 'p3.elements.guide', `${reason}:element-remove`);
  }
  if (removedElementObject && Object.keys(p3.elements.objects).length === 0)
    myDmuResetP3FireBuffOrderLatch(data);
  if (p3.blackhole.invalid)
    return false;
  const wave = p3.blackhole.waveByActor[id];
  if (wave === undefined)
    return false;
  delete p3.blackhole.waveByActor[id];
  delete p3.blackhole.waves[wave].actors[id];
  delete p3.blackhole.waves[wave].tethers[id];
  p3.blackhole.guideRevision++;
  myDmuRenderP3BlackholeWave(data, wave, `${reason}:remove-${id}`);
  void myDmuRenderP3BlackholeGuide(data, `${reason}:remove-${id}`);
  return true;
};

const myDmuP3LegacyTowerRoutePoint = (data, heading) => {
  const role = myDmuGetRpByName(data, data.me);
  if (['D1', 'D3'].includes(role))
    return myDmuP2PointInDirection({ x: 100, z: 100 }, heading - Math.PI / 2, 10);
  if (['D2', 'D4'].includes(role))
    return myDmuP2PointInDirection({ x: 100, z: 100 }, heading + Math.PI / 2, 10);
  return { x: 100, z: 100 };
};

const myDmuP3TowerConfiguredRoutePoint = (data, heading, strategy, headingMode, frame) => {
  const state = myDmuP3VfxState(data).tower;
  const role = myDmuGetRpByName(data, data.me);
  if (!myDmuP3FireBuffDefaultOrder.includes(role))
    return undefined;
  const placementHeading = heading + (headingMode === 'heel' ? Math.PI : 0);
  const roleIsTh = ['MT', 'ST', 'H1', 'H2'].includes(role);
  if (state.bb0dCount < 1) {
    if (strategy === 'nocchh')
      return { x: 100, z: 100 };
    return myDmuP2PointInDirection(
      { x: 100, z: 100 },
      placementHeading + (roleIsTh ? 0 : Math.PI),
      9,
    );
  }
  if (state.bb0dCount < 9) {
    if (strategy === 'nocchh') {
      return myDmuP2PointInDirection(
        { x: 100, z: 100 },
        placementHeading + (roleIsTh ? 0 : Math.PI),
        9,
      );
    }
    const bossOffsets = {
      MT: -Math.PI / 4, H1: -Math.PI / 4,
      ST: Math.PI / 4, H2: Math.PI / 4,
      D1: Math.PI * 3 / 4, D3: Math.PI * 3 / 4,
      D2: -Math.PI * 3 / 4, D4: -Math.PI * 3 / 4,
    };
    const arenaOffsets = {
      MT: Math.PI / 4, H1: Math.PI / 4,
      ST: -Math.PI / 4, H2: -Math.PI / 4,
      D1: Math.PI * 3 / 4, D3: Math.PI * 3 / 4,
      D2: -Math.PI * 3 / 4, D4: -Math.PI * 3 / 4,
    };
    const offset = (frame === 'arena' ? arenaOffsets : bossOffsets)[role];
    return myDmuP2PointInDirection({ x: 100, z: 100 }, placementHeading + offset, 13);
  }

  const firstTarget = state.targets[0];
  const firstRole = firstTarget?.name === undefined
    ? undefined
    : myDmuGetRpByName(data, firstTarget.name);
  if (!myDmuP3FireBuffDefaultOrder.includes(firstRole))
    return undefined;
  let left = myDmuP2PointInDirection({ x: 100, z: 100 }, heading - Math.PI / 2, 10);
  let right = myDmuP2PointInDirection({ x: 100, z: 100 }, heading + Math.PI / 2, 10);
  if (headingMode === 'toe')
    [left, right] = [right, left];
  const thFirst = {
    MT: { x: 100, z: 100 }, ST: { x: 100, z: 100 },
    H1: { x: 100, z: 100 }, H2: { x: 100, z: 100 },
    D1: left, D3: left, D2: right, D4: right,
  };
  const dpsFirst = frame === 'arena'
    ? {
      MT: left, H1: left, ST: right, H2: right,
      D1: { x: 100, z: 100 }, D2: { x: 100, z: 100 },
      D3: { x: 100, z: 100 }, D4: { x: 100, z: 100 },
    }
    : {
      MT: right, H1: right, ST: left, H2: left,
      D1: { x: 100, z: 100 }, D2: { x: 100, z: 100 },
      D3: { x: 100, z: 100 }, D4: { x: 100, z: 100 },
    };
  const firstTargetIsTh = ['MT', 'ST', 'H1', 'H2'].includes(firstRole);
  const firstGuide = firstTargetIsTh ? thFirst : dpsFirst;
  const secondGuide = firstTargetIsTh ? dpsFirst : thFirst;
  return (state.baf0Count < 2 ? firstGuide : secondGuide)[role];
};

const myDmuBuildP3TowerVfx = (vfx, data) => {
  const scope = 'p3.tower';
  const p3 = myDmuP3VfxState(data);
  const state = p3.tower;
  const heading = p3.bosses.kefkaHeading;
  if (state.targets.length !== 2 || !Number.isFinite(heading))
    throw new Error('P3 塔需要恰好 2 个 00A1 目标与 Kefka heading');
  const strategy = myDmuP3OptionalEnumConfig(
    data,
    'MyDMU_P3TowerStrategy',
    [myDmuP3LegacyConfig, 'off', 'nocchh', 'daohuo'],
  );
  const configuredHeading = myDmuP3OptionalEnumConfig(
    data,
    'MyDMU_P3TowerHeading',
    [myDmuP3LegacyConfig, 'heel', 'toe'],
  );
  const configuredFrame = myDmuP3OptionalEnumConfig(
    data,
    'MyDMU_P3TowerFrame',
    [myDmuP3LegacyConfig, 'boss', 'arena'],
  );
  const headingMode = configuredHeading === myDmuP3LegacyConfig ? 'heel' : configuredHeading;
  const frame = configuredFrame === myDmuP3LegacyConfig ? 'boss' : configuredFrame;
  const axisHeading = strategy === myDmuP3LegacyConfig
    ? heading
    : headingMode === 'heel' ? heading + Math.PI
      : headingMode === 'toe' ? heading : undefined;
  const drawings = [];
  if (axisHeading !== undefined) {
    const start = myDmuP2PointInDirection({ x: 100, z: 100 }, axisHeading + Math.PI, 20);
    const far = myDmuP2PointInDirection(start, axisHeading, 39.5);
    const middle = myDmuP2PointInDirection(start, axisHeading, 20);
    drawings.push(...[far, middle].map((target, index) => myDmuNativeVfxCreateArrow(vfx, {
      id: `${scope}.axis.${index + 1}`,
      type: 'arrow',
      classification: 'guide',
      durationSeconds: 16,
      from: myDmuNativeVfxWorldAnchor(start.x, start.z),
      to: myDmuNativeVfxWorldAnchor(target.x, target.z),
      width: 0.05,
      headLength: 0.5,
      headWidth: 0.5,
      style: myDmuNativeVfxThinGuideStyle(),
    })));
  }
  for (const [index, snapshot] of state.snapshots.entries()) {
    drawings.push(vfx.createCircle({
      id: `${scope}.target.${index + 1}`,
      type: 'circle',
      classification: 'danger',
      durationSeconds: 8,
      anchor: myDmuNativeVfxWorldAnchor(snapshot.x, snapshot.z),
      radius: 6,
      style: myDmuNativeVfxStyles.fire,
    }));
  }
  const ownId = myDmuNormalizeActorId(myDmuGetHexIdByName(data, data.me));
  const clock = myDmuNativeVfxClock(data);
  if (state.moveUntil > clock.now && /^1[0-9A-F]{7}$/u.test(ownId ?? '')) {
    drawings.push(myDmuNativeVfxCreateStatusCircle(vfx, {
      id: `${scope}.move.${ownId}`,
      type: 'circle',
      classification: 'guide',
      durationSeconds: Math.max(0.5, Math.min(6, (state.moveUntil - clock.now) / 1000)),
      anchor: myDmuNativeVfxEntityAnchor(ownId),
      label: 'move',
      pixelHeight: 36,
      worldYOffset: 2.5,
      style: { color: [0.2, 1, 0.55, 1], brightness: 1 },
    }));
  } else if (state.snapshots.length < 2 && myDmuNativeVfxPersonalGuideEnabled(data) &&
      /^1[0-9A-F]{7}$/u.test(ownId ?? '')) {
    const target = strategy === myDmuP3LegacyConfig
      ? myDmuP3LegacyTowerRoutePoint(data, heading)
      : (strategy === 'nocchh' || strategy === 'daohuo') &&
          headingMode !== undefined && frame !== undefined
        ? myDmuP3TowerConfiguredRoutePoint(data, heading, strategy, headingMode, frame)
        : undefined;
    if (target !== undefined) {
      drawings.push(myDmuNativeVfxCreateArrow(vfx, {
        id: `${scope}.route.${ownId}`,
        type: 'arrow',
        classification: 'guide',
        durationSeconds: 10,
        from: myDmuNativeVfxEntityAnchor(ownId),
        to: myDmuNativeVfxWorldAnchor(target.x, target.z),
        width: 0.08,
        headLength: 0.7,
        headWidth: 0.6,
        style: myDmuNativeVfxThinGuideStyle(),
      }));
    }
  }
  if (drawings.length > 5)
    throw new Error(`P3 塔图元 ${drawings.length} 超过机制峰值 5`);
  return drawings;
};

const myDmuRenderP3Tower = (data, reason) => {
  if (!myDmuNativeVfxPhaseEnabled(data, 'p3'))
    return false;
  if (myDmuP3VfxState(data).tower.targets.length < 2)
    return false;
  return myDmuNativeVfxReplaceScope(
    data,
    'p3.tower',
    (vfx) => myDmuBuildP3TowerVfx(vfx, data),
    reason,
  );
};

const myDmuP4VfxState = (data) => {
  data.myDmuP4.vfx ??= myDmuNewP4VfxState();
  return data.myDmuP4.vfx;
};

const myDmuP4VfxClearScopes = (data, scopes, reason) => {
  for (const scope of scopes)
    myDmuNativeVfxClearScope(data, scope, reason);
  return false;
};

const myDmuP4VfxInvalidate = (data, state, scopes, reason, detail = {}) => {
  if (!state.invalid) {
    state.invalid = true;
    state.invalidReason = reason;
    myDmuActLog('Native VFX coverage gap', {
      scope: scopes.join(','),
      reason,
      ...detail,
      fallback: false,
    });
  }
  return myDmuP4VfxClearScopes(data, scopes, `${reason}:fail-closed`);
};

const myDmuP4TruthScopes = (target) => target === 'ex'
  ? ['p4.exdeath', 'p4.elements.short', 'p4.elements.long', 'p4.eyes.short', 'p4.eyes.long']
  : target === 'chaos' ? ['p4.chaos1', 'p4.chaos2'] : [];

const myDmuInvalidateP4Truth = (data, target, reason, detail = {}) => {
  const state = myDmuP4VfxState(data);
  if (state.truthInvalid[target] !== true) {
    state.truthInvalid[target] = true;
    myDmuActLog('Native VFX coverage gap', {
      scope: `p4.truth.${target}`,
      reason,
      ...detail,
      fallback: false,
    });
  }
  return myDmuP4VfxClearScopes(data, myDmuP4TruthScopes(target), `${reason}:truth-fail-closed`);
};

const myDmuP4VfxTruthAt = (data, target, at) => {
  if (myDmuP4VfxState(data).truthInvalid[target] === true)
    return undefined;
  if (!Number.isFinite(at))
    return undefined;
  const candidates = (data.myDmuP4.truthEvents?.[target] ?? [])
    .filter((event) => Number.isFinite(event.at) &&
      ((event.at <= at && at - event.at <= 15000) ||
       (event.at > at && event.at - at <= 2500)))
    .sort((left, right) =>
      Math.abs(left.at - at) - Math.abs(right.at - at) ||
      (left.source === 'actor-control' ? -1 : 1));
  if (candidates.length === 0)
    return undefined;
  const values = new Set(candidates.map((event) => event.value));
  if (values.size !== 1) {
    myDmuInvalidateP4Truth(data, target, 'truth-window-conflict', { at, candidates });
    return undefined;
  }
  return { value: candidates[0].value, at: candidates[0].at };
};

const myDmuP4VfxTruthForRecord = (data, record) => {
  const target = myDmuP4TruthSource(record?.buffId);
  if (target === undefined)
    return undefined;
  return myDmuP4VfxTruthAt(data, target, record.firstSeenAt);
};

const myDmuP4VfxRound = (record) => {
  const duration = myDmuNumber(record?.initialDuration ?? record?.duration);
  if (duration === undefined)
    return undefined;
  return duration < 64.5 ? 'short' : 'long';
};

const myDmuP4VfxRecords = (data, effectId, round) =>
  (data.myDmuP4.buffRecords ?? [])
    .filter((record) => record.buffId === effectId && record.lostAt === undefined &&
      (round === undefined || myDmuP4VfxRound(record) === round));

const myDmuP4WhiteLabelStyle = () => ({ color: [1, 1, 1, 1], brightness: 1 });

const myDmuP4OwnActorId = (data) =>
  myDmuNormalizeActorId(myDmuGetHexIdByName(data, data.me));

const myDmuP4VfxActorTag = (value) => {
  const actorId = myDmuNormalizeActorId(value);
  if (!/^[14][0-9A-F]{7}$/u.test(actorId ?? ''))
    throw new Error(`P4 VFX actor ID 非法：${value}`);
  return actorId.toLowerCase();
};

const myDmuP4RecordExdeathSource = (data, matches) => {
  const kind = myDmuP4ExdeathBeamIds[matches.id?.toUpperCase()];
  if (kind === undefined)
    return false;
  const state = myDmuP4VfxState(data).exdeath;
  if (state.invalid)
    return false;
  const sourceId = myDmuNormalizeActorId(matches.sourceId);
  const x = myDmuNumber(matches.x);
  const z = myDmuNumber(matches.y ?? matches.z);
  const heading = myDmuNumber(matches.heading ?? matches.sourceHeading);
  const at = myDmuNativeVfxEventMilliseconds(matches);
  if (!/^4[0-9A-F]{7}$/u.test(sourceId ?? '') || x === undefined || z === undefined ||
      heading === undefined) {
    return myDmuP4VfxInvalidate(data, state, ['p4.exdeath'], 'exdeath-source-evidence-invalid', {
      kind, sourceId, x, z, heading,
    });
  }
  const previous = state.sources[kind];
  if (previous !== undefined) {
    if (previous.sourceId === sourceId && previous.at === at)
      return true;
    return myDmuP4VfxInvalidate(data, state, ['p4.exdeath'], 'exdeath-source-conflict', {
      kind, previous, sourceId, at,
    });
  }
  state.sources[kind] = { kind, sourceId, x, z, heading, at };
  return myDmuRenderP4Exdeath(data, `${matches.id}-source`);
};

const myDmuP4ExdeathGuideTarget = (data, sources, truth) => {
  if (!myDmuNativeVfxPersonalGuideEnabled(data))
    return undefined;
  const personal = data.myDmuP4.mandarinDuck ?? {};
  if (personal.goTruePurple === undefined || personal.truePurpleLeft === undefined)
    return undefined;
  const rawPurple = truth === personal.goTruePurple;
  const target = rawPurple ? sources.alive : sources.death;
  const boundary = sources.boundary;
  const dx = target.x - boundary.x;
  const dz = target.z - boundary.z;
  const distance = Math.hypot(dx, dz);
  if (!Number.isFinite(distance) || distance < 0.01)
    return undefined;
  return { x: 100 + dx / distance * 5, z: 100 + dz / distance * 5 };
};

const myDmuP4ExdeathBeamCenter = (source, boundary) => {
  const dx = source.x - boundary.x;
  const dz = source.z - boundary.z;
  const distance = Math.hypot(dx, dz);
  if (!Number.isFinite(distance) || distance < 0.01)
    return undefined;
  return {
    x: source.x + dx / distance * 2,
    z: source.z + dz / distance * 2,
  };
};

const myDmuBuildP4ExdeathVfx = (vfx, data, state, truth) => {
  const configs = {
    alive: { width: 20, length: 40, style: myDmuNativeVfxStyles.purple },
    death: { width: 20, length: 40, style: myDmuNativeVfxStyles.litBlue },
    boundary: { width: 3, length: 40, style: myDmuNativeVfxStyles.danger },
  };
  const drawings = Object.entries(configs).map(([kind, config]) => {
    const source = state.sources[kind];
    const center = kind === 'boundary'
      ? { x: source.x, z: source.z }
      : myDmuP4ExdeathBeamCenter(source, state.sources.boundary);
    if (center === undefined)
      throw new Error(`P4 Exdeath ${kind} 与边界坐标重合，拒绝生成射线`);
    return vfx.createRect({
      id: `p4.exdeath.${kind}.${myDmuP4VfxActorTag(source.sourceId)}`,
      type: 'rect',
      classification: 'danger',
      durationSeconds: 5.2,
      anchor: myDmuNativeVfxWorldAnchor(center.x, center.z),
      width: config.width,
      length: config.length,
      direction: { mode: 'fixed', rotationRadians: source.heading },
      pivot: 'center',
      style: config.style,
    });
  });
  const guide = myDmuP4ExdeathGuideTarget(data, state.sources, truth);
  const ownId = myDmuP4OwnActorId(data);
  if (guide !== undefined && /^1[0-9A-F]{7}$/u.test(ownId ?? '')) {
    drawings.push(myDmuNativeVfxCreateArrow(vfx, {
      id: `p4.exdeath.guide.${myDmuP4VfxActorTag(ownId)}`,
      type: 'arrow',
      classification: 'guide',
      durationSeconds: 5.2,
      from: myDmuNativeVfxEntityAnchor(ownId),
      to: myDmuNativeVfxWorldAnchor(guide.x, guide.z),
      width: 0.08,
      headLength: 0.7,
      headWidth: 0.6,
      style: myDmuNativeVfxThinGuideStyle(),
    }));
  }
  return drawings;
};

function myDmuRenderP4Exdeath(data, reason) {
  const state = myDmuP4VfxState(data).exdeath;
  if (state.invalid)
    return myDmuP4VfxClearScopes(data, ['p4.exdeath'], `${reason}:invalid-latched`);
  const sources = Object.values(state.sources);
  if (sources.length !== 3)
    return myDmuP4VfxClearScopes(data, ['p4.exdeath'], `${reason}:incomplete-three-source`);
  if (new Set(sources.map((source) => source.sourceId)).size !== 3)
    return myDmuP4VfxInvalidate(data, state, ['p4.exdeath'], 'exdeath-source-not-unique');
  const boundary = state.sources.boundary;
  if (boundary === undefined || ['alive', 'death'].some((kind) =>
    myDmuP4ExdeathBeamCenter(state.sources[kind], boundary) === undefined)) {
    return myDmuP4VfxInvalidate(data, state, ['p4.exdeath'], 'exdeath-beam-boundary-vector-invalid');
  }
  const at = Math.max(...sources.map((source) => source.at));
  const truth = myDmuP4VfxTruthAt(data, 'ex', at);
  if (truth === undefined)
    return myDmuP4VfxClearScopes(data, ['p4.exdeath'], `${reason}:truth-missing-or-conflict`);
  return myDmuNativeVfxReplaceScope(
    data,
    'p4.exdeath',
    (vfx) => myDmuBuildP4ExdeathVfx(vfx, data, state, truth.value),
    reason,
  );
}

const myDmuResolveP4ExdeathSource = (data, matches) => {
  const kind = myDmuP4ExdeathBeamIds[matches.id?.toUpperCase()];
  if (kind === undefined)
    return false;
  const state = myDmuP4VfxState(data).exdeath;
  const sourceId = myDmuNormalizeActorId(matches.sourceId);
  if (state.sources[kind]?.sourceId !== sourceId)
    return myDmuP4VfxInvalidate(data, state, ['p4.exdeath'], 'exdeath-ability-source-mismatch', {
      kind, sourceId,
    });
  state.resolved[kind] = true;
  if (Object.keys(state.resolved).length >= 3)
    return myDmuNativeVfxClearScope(data, 'p4.exdeath', 'exdeath-all-resolved');
  return myDmuNativeVfxFilterScope(
    data,
    'p4.exdeath',
    (drawing) => !drawing.id.includes(`.${kind}.`),
    `${matches.id}-exact-resolve`,
  );
};

const myDmuP4EffectiveElement = (record, truth) => {
  if (record.buffId === '15A8')
    return truth ? 'thunder' : 'water';
  if (record.buffId === '15A9')
    return truth ? 'water' : 'thunder';
  return undefined;
};

const myDmuP4IceOffset = (point, iceType) => {
  if (iceType !== 'danger13' && iceType !== 'danger24')
    return point;
  let dx = 0;
  let dz = 0;
  if (point.z < 99)
    dx = iceType === 'danger13' ? -1 : 1;
  else if (point.x > 101)
    dz = iceType === 'danger13' ? 1 : -1;
  else if (point.z > 101)
    dx = iceType === 'danger13' ? 1 : -1;
  else if (point.x < 99)
    dz = iceType === 'danger13' ? -1 : 1;
  return { x: point.x + dx, z: point.z + dz };
};

const myDmuP4ElementSpreadStrategies = {
  dLeft: 'd_left',
  tnLeft: 'tn_left',
};

const myDmuP4EyeStrategies = {
  fixed: 'fixed',
  eyesIn: 'eyes_in',
  crowdStatic: 'crowd_static',
  off: 'off',
};

const myDmuP4ElementSpreadStrategy = (data) => {
  const strategy = myDmuConfigValue(
    data,
    'MyDMU_P4ElementSpreadStrategy',
    myDmuP4ElementSpreadStrategies.dLeft,
  );
  return Object.values(myDmuP4ElementSpreadStrategies).includes(strategy)
    ? strategy
    : undefined;
};

const myDmuP4EyeStrategy = (data) => {
  const strategy = myDmuConfigValue(data, 'MyDMU_P4EyeStrategy', myDmuP4EyeStrategies.fixed);
  return Object.values(myDmuP4EyeStrategies).includes(strategy)
    ? strategy
    : undefined;
};

const myDmuP4GuideRoleGroup = (role) => {
  if (['MT', 'ST', 'H1', 'H2'].includes(role))
    return 'TN';
  if (['D1', 'D2', 'D3', 'D4'].includes(role))
    return 'DPS';
  return undefined;
};

const myDmuP4ElementGuidePoint = (data, round, entries) => {
  if (!myDmuNativeVfxPersonalGuideEnabled(data))
    return undefined;
  const strategy = myDmuP4ElementSpreadStrategy(data);
  if (strategy === undefined)
    return undefined;
  const ownId = myDmuP4OwnActorId(data);
  const ownRole = myDmuGetRpByName(data, data.me);
  const group = myDmuP4GuideRoleGroup(ownRole);
  if (!/^1[0-9A-F]{7}$/u.test(ownId ?? '') || !['TN', 'DPS'].includes(group))
    return undefined;
  const own = entries.find((entry) => entry.record.id === ownId);
  let point;
  if (own?.kind === 'thunder') {
    const tnLeft = strategy === myDmuP4ElementSpreadStrategies.tnLeft;
    point = group === 'TN'
      ? { x: tnLeft ? 91 : 109, z: 100 }
      : { x: tnLeft ? 109 : 91, z: 100 };
  } else {
    point = group === 'TN' ? { x: 100, z: 91 } : { x: 100, z: 109 };
  }
  if (round === 'long')
    point = myDmuP4IceOffset(point, myDmuP4VfxState(data).common.iceForLong);
  return { ownId, point };
};

const myDmuBuildP4ElementsVfx = (vfx, data, round, entries) => {
  const scope = `p4.elements.${round}`;
  const drawings = entries.map(({ record, kind }) => vfx.createCircle({
    id: `${scope}.${kind}.${myDmuP4VfxActorTag(record.id)}`,
    type: 'circle',
    classification: kind === 'thunder' ? 'danger' : 'guide',
    durationSeconds: 9.5,
    anchor: myDmuNativeVfxEntityAnchor(record.id),
    radius: 8,
    style: kind === 'thunder' ? myDmuNativeVfxStyles.orange : myDmuNativeVfxStyles.water,
  }));
  const guide = myDmuP4ElementGuidePoint(data, round, entries);
  if (guide !== undefined) {
    drawings.push(myDmuNativeVfxCreateArrow(vfx, {
      id: `${scope}.guide.${myDmuP4VfxActorTag(guide.ownId)}`,
      type: 'arrow',
      classification: 'guide',
      durationSeconds: 9.5,
      from: myDmuNativeVfxEntityAnchor(guide.ownId),
      to: myDmuNativeVfxWorldAnchor(guide.point.x, guide.point.z),
      width: 0.08,
      headLength: 0.7,
      headWidth: 0.6,
      style: myDmuNativeVfxThinGuideStyle(),
    }));
  }
  return drawings;
};

const myDmuRenderP4Elements = (data, round, reason) => {
  const scope = `p4.elements.${round}`;
  const state = myDmuP4VfxState(data).elements[round];
  if (state?.invalid)
    return myDmuP4VfxClearScopes(data, [scope], `${reason}:invalid-latched`);
  const records = [...myDmuP4VfxRecords(data, '15A8', round),
    ...myDmuP4VfxRecords(data, '15A9', round)];
  if (records.length < 4)
    return myDmuP4VfxClearScopes(data, [scope], `${reason}:incomplete-four-owner`);
  const ids = records.map((record) => record.id);
  if (records.length !== 4 || new Set(ids).size !== 4 ||
      records.some((record) => !/^1[0-9A-F]{7}$/u.test(record.id ?? '') || record.role === undefined)) {
    return myDmuP4VfxInvalidate(data, state, [scope], 'element-owner-count-role-invalid', {
      round, count: records.length, ids,
    });
  }
  if (round === 'long' && myDmuP4VfxState(data).common.iceForLong === undefined)
    return myDmuP4VfxClearScopes(data, [scope], `${reason}:wave5-ice-evidence-missing`);
  const entries = [];
  for (const record of records) {
    const truth = myDmuP4VfxTruthForRecord(data, record);
    if (truth === undefined)
      return myDmuP4VfxClearScopes(data, [scope], `${reason}:truth-missing-or-conflict`);
    entries.push({ record, kind: myDmuP4EffectiveElement(record, truth.value) });
  }
  const counts = entries.reduce((value, entry) => {
    value[entry.kind] = (value[entry.kind] ?? 0) + 1;
    return value;
  }, {});
  if (counts.thunder !== 2 || counts.water !== 2)
    return myDmuP4VfxInvalidate(data, state, [scope], 'element-effective-kind-not-two-two', { round, counts });
  return myDmuNativeVfxReplaceScope(
    data,
    scope,
    (vfx) => myDmuBuildP4ElementsVfx(vfx, data, round, entries),
    reason,
  );
};

const myDmuP4EyeMoveOffset = {
  Left13: { x: 0.354, z: -0.354 },
  Left24: { x: -0.354, z: 0.354 },
  Right13: { x: -0.354, z: -0.354 },
  Right24: { x: 0.354, z: 0.354 },
};

const myDmuP4Eye1Templates = {
  Left13: {
    support: { x: 95, z: 95 }, dps: { x: 105, z: 105 }, real: { x: 105, z: 95 },
    fakeSupport: { x: 98, z: 98 }, fakeDps: { x: 102, z: 102 },
  },
  Left24: {
    support: { x: 95, z: 95 }, dps: { x: 105, z: 105 }, real: { x: 95, z: 105 },
    fakeSupport: { x: 98, z: 98 }, fakeDps: { x: 102, z: 102 },
  },
  Right13: {
    support: { x: 105, z: 95 }, dps: { x: 95, z: 105 }, real: { x: 95, z: 95 },
    fakeSupport: { x: 102, z: 98 }, fakeDps: { x: 98, z: 102 },
  },
  Right24: {
    support: { x: 105, z: 95 }, dps: { x: 95, z: 105 }, real: { x: 105, z: 105 },
    fakeSupport: { x: 102, z: 98 }, fakeDps: { x: 98, z: 102 },
  },
};

const myDmuP4Eye1CrowdStaticTemplates = {
  '13': {
    crowd: { x: 100, z: 94 }, real: { x: 100, z: 90 }, fake: { x: 100, z: 99 },
  },
  '24': {
    crowd: { x: 100, z: 106 }, real: { x: 100, z: 110 }, fake: { x: 100, z: 101 },
  },
};

const myDmuP4EyeGuidePoint = (data, round, owners, truth) => {
  if (!myDmuNativeVfxPersonalGuideEnabled(data))
    return undefined;
  const strategy = myDmuP4EyeStrategy(data);
  if (strategy === undefined)
    return undefined;
  const ownId = myDmuP4OwnActorId(data);
  const role = myDmuGetRpByName(data, data.me);
  const group = myDmuP4GuideRoleGroup(role);
  if (!/^1[0-9A-F]{7}$/u.test(ownId ?? '') || !['TN', 'DPS'].includes(group))
    return undefined;
  const owner = owners.some((record) => record.id === ownId);
  if (strategy === myDmuP4EyeStrategies.off)
    return undefined;
  if (round === 'long') {
    if (strategy === myDmuP4EyeStrategies.eyesIn)
      return owner ? { ownId, point: { x: 100, z: 100 } } : undefined;
    if (strategy === myDmuP4EyeStrategies.crowdStatic) {
      const point = !owner
        ? { x: 100, z: 106 }
        : truth ? { x: 100, z: 110 } : { x: 100, z: 101 };
      return { ownId, point };
    }
    if (!owner)
      return { ownId, point: group === 'TN' ? { x: 100, z: 94 } : { x: 100, z: 106 } };
    if (truth)
      return { ownId, point: { x: 105, z: 100 } };
    return { ownId, point: group === 'TN' ? { x: 100, z: 98 } : { x: 100, z: 102 } };
  }
  const thunderType = myDmuP4VfxState(data).common.eye1Thunder;
  const template = myDmuP4Eye1Templates[thunderType];
  const offset = myDmuP4EyeMoveOffset[thunderType];
  if (template === undefined || offset === undefined)
    return undefined;
  if (strategy === myDmuP4EyeStrategies.eyesIn) {
    if (!owner)
      return undefined;
    return { ownId, point: { x: 100 + offset.x, z: 100 + offset.z } };
  }
  if (strategy === myDmuP4EyeStrategies.crowdStatic) {
    const crowdTemplate = myDmuP4Eye1CrowdStaticTemplates[thunderType.endsWith('13') ? '13' : '24'];
    const point = !owner ? crowdTemplate.crowd : truth ? crowdTemplate.real : crowdTemplate.fake;
    return { ownId, point: { ...point } };
  }
  let base;
  if (!owner)
    base = group === 'TN' ? template.support : template.dps;
  else if (truth)
    base = template.real;
  else
    base = group === 'TN' ? template.fakeSupport : template.fakeDps;
  return { ownId, point: { x: base.x + offset.x, z: base.z + offset.z } };
};

const myDmuBuildP4EyesVfx = (vfx, data, round, owners, truth) => {
  const scope = `p4.eyes.${round}`;
  const drawings = owners.map((record) => myDmuNativeVfxCreateStatusCircle(vfx, {
    id: `${scope}.${truth ? 'real' : 'fake'}.${myDmuP4VfxActorTag(record.id)}`,
    type: 'circle',
    classification: 'guide',
    durationSeconds: 14.5,
    anchor: myDmuNativeVfxEntityAnchor(record.id),
    label: truth ? 'real' : 'fake',
    pixelHeight: 34,
    worldYOffset: 2.5,
    style: myDmuP4WhiteLabelStyle(),
  }));
  const guide = myDmuP4EyeGuidePoint(data, round, owners, truth);
  if (guide !== undefined) {
    drawings.push(myDmuNativeVfxCreateArrow(vfx, {
      id: `${scope}.guide.${myDmuP4VfxActorTag(guide.ownId)}`,
      type: 'arrow',
      classification: 'guide',
      durationSeconds: 14.5,
      from: myDmuNativeVfxEntityAnchor(guide.ownId),
      to: myDmuNativeVfxWorldAnchor(guide.point.x, guide.point.z),
      width: 0.08,
      headLength: 0.7,
      headWidth: 0.6,
      style: myDmuNativeVfxThinGuideStyle(),
    }));
  }
  return drawings;
};

const myDmuRenderP4Eyes = (data, round, reason) => {
  const scope = `p4.eyes.${round}`;
  const state = myDmuP4VfxState(data).eyes[round];
  if (state?.invalid)
    return myDmuP4VfxClearScopes(data, [scope], `${reason}:invalid-latched`);
  const owners = myDmuP4VfxRecords(data, myDmuP4PetrifyBuff, round);
  if (owners.length < 2)
    return myDmuP4VfxClearScopes(data, [scope], `${reason}:incomplete-two-owner`);
  if (owners.length !== 2 || new Set(owners.map((record) => record.id)).size !== 2 ||
      owners.some((record) => record.role === undefined)) {
    return myDmuP4VfxInvalidate(data, state, [scope], 'eye-owner-count-role-invalid', {
      round, count: owners.length,
    });
  }
  const truths = owners.map((record) => myDmuP4VfxTruthForRecord(data, record));
  if (truths.some((truth) => truth === undefined) || new Set(truths.map((truth) => truth.value)).size !== 1)
    return myDmuP4VfxClearScopes(data, [scope], `${reason}:truth-missing-conflict-or-inconsistent`);
  if (round === 'short' && myDmuP4VfxState(data).common.eye1Thunder === undefined)
    return myDmuP4VfxClearScopes(data, [scope], `${reason}:thunder-evidence-missing`);
  const strategy = myDmuP4EyeStrategy(data);
  if (strategy === undefined || strategy === myDmuP4EyeStrategies.off) {
    myDmuNativeVfxFilterScope(
      data,
      scope,
      (drawing) => !drawing.id.includes('.guide.'),
      `${reason}:invalid-strategy-clear-guide`,
    );
  }
  return myDmuNativeVfxMergeScope(
    data,
    scope,
    (vfx) => myDmuBuildP4EyesVfx(vfx, data, round, owners, truths[0].value),
    reason,
  );
};

const myDmuRenderP4AccelerationLabel = (data, record, reason) => {
  const round = myDmuP4VfxRound(record);
  const scope = `p4.eyes.${round}`;
  const state = myDmuP4VfxState(data).eyes[round];
  if (round === undefined || state?.invalid)
    return false;
  const truth = myDmuP4VfxTruthForRecord(data, record);
  if (truth === undefined)
    return myDmuP4VfxClearScopes(data, [scope], `${reason}:acceleration-truth-missing-or-conflict`);
  return myDmuNativeVfxMergeScope(data, scope, (vfx) => [myDmuNativeVfxCreateStatusCircle(vfx, {
    id: `${scope}.accel.${myDmuP4VfxActorTag(record.id)}`,
    type: 'circle',
    classification: 'guide',
    durationSeconds: 14.5,
    anchor: myDmuNativeVfxEntityAnchor(record.id),
    label: truth.value ? 'stop' : 'move',
    pixelHeight: 34,
    worldYOffset: 2.5,
    style: myDmuP4WhiteLabelStyle(),
  })], reason);
};

const myDmuP4AngleNear = (value, expected, tolerance = Math.PI / 16) =>
  Math.abs(myDmuNativeVfxNormalizeRotation(value - expected)) <= tolerance;

const myDmuP4ClassifyThunder = (matches) => {
  const heading = myDmuNativeVfxHeading(matches);
  const normalized = (heading + Math.PI * 2) % (Math.PI * 2);
  const x = myDmuNumber(matches.x);
  if (x === undefined)
    return undefined;
  if (myDmuP4AngleNear(normalized, Math.PI * 7 / 4)) {
    if (x > 100 && x < 107)
      return 'Right13';
    if (x >= 107 && x < 114)
      return 'Right24';
  }
  if (myDmuP4AngleNear(normalized, Math.PI / 4)) {
    if (x > 93 && x < 100)
      return 'Left13';
    if (x > 86 && x <= 93)
      return 'Left24';
  }
  return undefined;
};

const myDmuP4ClassifyIce = (matches) => {
  const heading = myDmuNativeVfxHeading(matches);
  const normalized = (heading + Math.PI * 2) % (Math.PI * 2);
  if (myDmuP4AngleNear(normalized, Math.PI / 4) ||
      myDmuP4AngleNear(normalized, Math.PI * 5 / 4))
    return 'danger24';
  if (myDmuP4AngleNear(normalized, Math.PI * 3 / 4) ||
      myDmuP4AngleNear(normalized, Math.PI * 7 / 4))
    return 'danger13';
  return undefined;
};

const myDmuP4CommonScopes = () => Array.from({ length: 6 }, (_unused, index) => `p4.common.w${index + 1}`);

const myDmuInvalidateP4Common = (data, reason, detail = {}) =>
  myDmuP4VfxInvalidate(data, myDmuP4VfxState(data).common, myDmuP4CommonScopes(), reason, detail);

const myDmuP4ApplyCommonEvidence = (data, wave, state) => {
  const common = myDmuP4VfxState(data).common;
  if (wave === 1)
    common.eye1Thunder = state.thunderType;
  if (wave === 5)
    common.iceForLong = state.iceType;
  if (wave === 6) {
    common.chaosThunder = state.thunderType;
    common.chaosIce = state.iceType;
  }
  if (wave === 1)
    myDmuRenderP4Eyes(data, 'short', 'common-wave1-evidence');
  if (wave === 5)
    myDmuRenderP4Elements(data, 'long', 'common-wave5-evidence');
  return true;
};

const myDmuFinalizeP4CommonWave = (data, wave, openedAt, reason) => {
  const common = myDmuP4VfxState(data).common;
  const state = common.waves[wave];
  if (common.invalid || state === undefined || state.openedAt !== openedAt)
    return false;
  const expected = myDmuP4CommonExpectedCounts[wave];
  if (state.count !== expected) {
    return myDmuInvalidateP4Common(data, 'common-wave-count-mismatch', {
      wave, expected, actual: state.count, reason,
    });
  }
  const actualActions = Object.values(state.seen).reduce((counts, entry) => {
    counts[entry.id] = (counts[entry.id] ?? 0) + 1;
    return counts;
  }, {});
  const expectedActions = myDmuP4CommonExpectedActions[wave];
  const actionIds = new Set([...Object.keys(actualActions), ...Object.keys(expectedActions)]);
  if ([...actionIds].some((id) => actualActions[id] !== expectedActions[id])) {
    return myDmuInvalidateP4Common(data, 'common-wave-action-multiset-mismatch', {
      wave, expectedActions, actualActions, reason,
    });
  }
  const needsThunder = Object.keys(expectedActions).some((id) => id === 'BA9F' || id === 'BAA1');
  const needsIce = Object.keys(expectedActions).some((id) => id === 'BA98' || id === 'BA9E');
  if ((needsThunder && state.thunderType === undefined) || (needsIce && state.iceType === undefined)) {
    return myDmuInvalidateP4Common(data, 'common-wave-element-evidence-missing', {
      wave, needsThunder, needsIce, thunderType: state.thunderType, iceType: state.iceType, reason,
    });
  }
  state.complete = true;
  return myDmuP4ApplyCommonEvidence(data, wave, state);
};

const myDmuBuildP4CommonVfx = (vfx, wave, matches) => {
  const id = matches.id.toUpperCase();
  const sourceId = myDmuNormalizeActorId(matches.sourceId);
  const base = {
    id: `p4.common.w${wave}.${id.toLowerCase()}.${myDmuP4VfxActorTag(sourceId)}`,
    classification: 'danger',
    durationSeconds: 4.7,
    anchor: myDmuNativeVfxEntityAnchor(sourceId),
    direction: { mode: 'sourceHeading', rotationRadians: 0 },
  };
  if (id === 'BA98' || id === 'BA9E') {
    return [vfx.createSector({
      ...base,
      type: 'sector',
      radius: 20,
      angleRadians: Math.PI / 2,
      style: myDmuNativeVfxStyles.dangerAlt,
    })];
  }
  return [vfx.createRect({
    ...base,
    type: 'rect',
    width: 10,
    length: 40,
    pivot: 'start',
    style: myDmuNativeVfxStyles.orange,
  })];
};

const myDmuRecordP4CommonCast = (data, matches) => {
  const id = matches.id?.toUpperCase();
  if (!myDmuP4CommonSpellIds.includes(id))
    return false;
  const common = myDmuP4VfxState(data).common;
  if (common.invalid)
    return false;
  const at = myDmuNativeVfxEventMilliseconds(matches);
  const sourceId = myDmuNormalizeActorId(matches.sourceId);
  if (!/^4[0-9A-F]{7}$/u.test(sourceId ?? ''))
    return myDmuInvalidateP4Common(data, 'common-source-invalid', { id, sourceId });
  if (common.lastAt === undefined || at - common.lastAt > 500) {
    if (common.wave > 0) {
      const previous = common.waves[common.wave];
      if (!myDmuFinalizeP4CommonWave(data, common.wave, previous.openedAt, 'next-wave-boundary'))
        return false;
    }
    common.wave++;
    if (common.wave > 6)
      return myDmuInvalidateP4Common(data, 'common-wave-overflow', { id, sourceId, at });
    common.waves[common.wave] = {
      openedAt: at,
      count: 0,
      seen: {},
      thunderType: undefined,
      iceType: undefined,
      complete: false,
    };
    const wave = common.wave;
    myDmuNativeVfxScheduleClockTask(data, `p4.common.w${wave}:batch-audit`, 550, () =>
      myDmuFinalizeP4CommonWave(data, wave, at, 'clock-audit'));
  }
  if (at < common.lastAt)
    return myDmuInvalidateP4Common(data, 'common-event-time-regression', { at, lastAt: common.lastAt });
  common.lastAt = at;
  const wave = common.wave;
  const state = common.waves[wave];
  const seenKey = `${id}:${sourceId}`;
  if (state.seen[seenKey] !== undefined)
    return true;
  if (Object.values(state.seen).some((entry) => entry.sourceId === sourceId))
    return myDmuInvalidateP4Common(data, 'common-source-variant-conflict', { wave, id, sourceId });
  let variant;
  try {
    variant = id === 'BA9F' || id === 'BAA1'
      ? myDmuP4ClassifyThunder(matches)
      : myDmuP4ClassifyIce(matches);
  } catch (error) {
    return myDmuInvalidateP4Common(data, 'common-heading-invalid', { wave, id, sourceId, error: `${error}` });
  }
  const field = id === 'BA9F' || id === 'BAA1' ? 'thunderType' : 'iceType';
  if (variant !== undefined && state[field] !== undefined && state[field] !== variant)
    return myDmuInvalidateP4Common(data, 'common-variant-conflict', { wave, field, previous: state[field], variant });
  if (variant !== undefined)
    state[field] = variant;
  state.seen[seenKey] = { id, sourceId, variant };
  state.count++;
  if (state.count > myDmuP4CommonExpectedCounts[wave])
    return myDmuInvalidateP4Common(data, 'common-wave-primitive-overflow', { wave, count: state.count });
  const scope = `p4.common.w${wave}`;
  common.sourceScopes[seenKey] = scope;
  return myDmuNativeVfxMergeScope(
    data,
    scope,
    (vfx) => myDmuBuildP4CommonVfx(vfx, wave, matches),
    `${id}-${sourceId}`,
  );
};

const myDmuResolveP4CommonCast = (data, matches) => {
  const id = matches.id?.toUpperCase();
  const sourceId = myDmuNormalizeActorId(matches.sourceId);
  const key = `${id}:${sourceId}`;
  const common = myDmuP4VfxState(data).common;
  const scope = common.sourceScopes[key];
  if (scope === undefined || common.invalid)
    return false;
  delete common.sourceScopes[key];
  return myDmuNativeVfxFilterScope(
    data,
    scope,
    (drawing) => !drawing.id.endsWith(`.${myDmuP4VfxActorTag(sourceId)}`),
    `${id}-${sourceId}-exact-resolve`,
  );
};

const myDmuP4MixNearPoint = (thunderType, iceType) => ({
  'Left13:danger13': { x: 104, z: 101.6568 },
  'Left13:danger24': { x: 104, z: 96 },
  'Left24:danger13': { x: 101.6568, z: 104 },
  'Left24:danger24': { x: 96, z: 104 },
  'Right13:danger13': { x: 96, z: 96 },
  'Right13:danger24': { x: 96, z: 101.6568 },
  'Right24:danger13': { x: 104, z: 104 },
  'Right24:danger24': { x: 98.3432, z: 104 },
})[`${thunderType}:${iceType}`];

const myDmuP4ChaosState = (data, scope) =>
  myDmuP4VfxState(data)[scope === 'p4.chaos1' ? 'chaos1' : 'chaos2'];

const myDmuP4OwnChaosTruth = (data, buffId) => {
  const records = myDmuP4VfxRecords(data, buffId)
    .filter((record) => record.name === data.me || record.id === myDmuP4OwnActorId(data));
  if (records.length !== 1)
    return undefined;
  return myDmuP4VfxTruthForRecord(data, records[0]);
};

const myDmuP4ChaosGuidePoint = (data, scope, truth) => {
  if (!myDmuNativeVfxPersonalGuideEnabled(data))
    return undefined;
  const ownId = myDmuP4OwnActorId(data);
  if (!/^1[0-9A-F]{7}$/u.test(ownId ?? ''))
    return undefined;
  if (scope === 'p4.chaos1') {
    if (!truth)
      return { ownId, point: { x: 100, z: 100 } };
    const group = myDmuRoleGroup(myDmuGetRpByName(data, data.me));
    if (!['TN', 'DPS'].includes(group))
      return undefined;
    return { ownId, point: group === 'TN' ? { x: 100, z: 90 } : { x: 100, z: 110 } };
  }
  const common = myDmuP4VfxState(data).common;
  const near = myDmuP4MixNearPoint(common.chaosThunder, common.chaosIce);
  if (near === undefined)
    return undefined;
  const dx = near.x - 100;
  const dz = near.z - 100;
  const distance = Math.hypot(dx, dz);
  const radius = truth ? 2 : 8;
  return { ownId, point: { x: 100 + dx / distance * radius, z: 100 + dz / distance * radius } };
};

const myDmuBuildP4ChaosVfx = (vfx, data, scope, state, truth) => {
  const second = scope === 'p4.chaos2';
  const shape = second ? (truth ? 'donut' : 'circle') : (truth ? 'circle' : 'donut');
  const drawings = Object.values(state.placements)
    .sort((left, right) => left.sourceId.localeCompare(right.sourceId))
    .map((entry) => {
      const base = {
        id: `${scope}.aoe.${myDmuP4VfxActorTag(entry.sourceId)}`,
        classification: 'danger',
        durationSeconds: 5,
        anchor: myDmuNativeVfxWorldAnchor(entry.x, entry.z),
        style: second ? myDmuNativeVfxStyles.litBlue : myDmuNativeVfxStyles.purple,
      };
      if (shape === 'circle')
        return vfx.createCircle({ ...base, type: 'circle', radius: 6 });
      return vfx.createDonut({ ...base, type: 'donut', innerRadius: 6, outerRadius: 40 });
    });
  const guide = myDmuP4ChaosGuidePoint(data, scope, truth);
  if (guide !== undefined) {
    drawings.push(myDmuNativeVfxCreateArrow(vfx, {
      id: `${scope}.guide.${myDmuP4VfxActorTag(guide.ownId)}`,
      type: 'arrow',
      classification: 'guide',
      durationSeconds: 5,
      from: myDmuNativeVfxEntityAnchor(guide.ownId),
      to: myDmuNativeVfxWorldAnchor(guide.point.x, guide.point.z),
      width: 0.08,
      headLength: 0.7,
      headWidth: 0.6,
      style: myDmuNativeVfxThinGuideStyle(),
    }));
  }
  return drawings;
};

const myDmuFinalizeP4Chaos = (data, scope, openedAt, reason) => {
  const state = myDmuP4ChaosState(data, scope);
  if (state.invalid || state.openedAt !== openedAt)
    return false;
  const placements = Object.values(state.placements);
  if (placements.length !== 8)
    return myDmuP4VfxInvalidate(data, state, [scope], 'chaos-placement-count-mismatch', {
      scope, expected: 8, actual: placements.length, reason,
    });
  const info = myDmuP4ChaosPlacementIds[placements[0].id];
  const truth = myDmuP4OwnChaosTruth(data, info.buffId);
  if (truth === undefined || truth.value !== info.truth)
    return myDmuP4VfxInvalidate(data, state, [scope], 'chaos-placement-truth-conflict', {
      scope, action: placements[0].id, expectedTruth: info.truth, actualTruth: truth?.value,
    });
  state.completedAt = myDmuNativeVfxClock(data).now;
  return myDmuNativeVfxReplaceScope(
    data,
    scope,
    (vfx) => myDmuBuildP4ChaosVfx(vfx, data, scope, state, truth.value),
    reason,
  );
};

const myDmuRecordP4ChaosPlacement = (data, matches) => {
  const id = matches.id?.toUpperCase();
  const info = myDmuP4ChaosPlacementIds[id];
  if (info === undefined)
    return false;
  const state = myDmuP4ChaosState(data, info.scope);
  if (state.invalid)
    return false;
  const at = myDmuNativeVfxEventMilliseconds(matches);
  const sourceId = myDmuNormalizeActorId(matches.sourceId);
  const x = myDmuNumber(matches.x);
  const z = myDmuNumber(matches.y ?? matches.z);
  if (!/^4[0-9A-F]{7}$/u.test(sourceId ?? '') || x === undefined || z === undefined)
    return myDmuP4VfxInvalidate(data, state, [info.scope], 'chaos-placement-source-position-invalid', {
      id, sourceId, x, z,
    });
  if (state.completedAt !== undefined && at - state.completedAt <= 500)
    return myDmuP4VfxInvalidate(data, state, [info.scope], 'chaos-placement-overflow', { id, sourceId });
  const previous = state.placements[sourceId];
  if (previous !== undefined) {
    if (previous.id === id && previous.at === at)
      return true;
    return myDmuP4VfxInvalidate(data, state, [info.scope], 'chaos-placement-source-conflict', {
      sourceId, previous, id, at,
    });
  }
  if (Object.values(state.placements).some((entry) => entry.id !== id))
    return myDmuP4VfxInvalidate(data, state, [info.scope], 'chaos-placement-variant-conflict', { id });
  if (state.openedAt === undefined) {
    state.openedAt = at;
    myDmuNativeVfxScheduleClockTask(data, `${info.scope}:batch-audit`, 550, () =>
      myDmuFinalizeP4Chaos(data, info.scope, at, 'clock-audit'));
  } else if (at - state.openedAt > 500) {
    return myDmuP4VfxInvalidate(data, state, [info.scope], 'chaos-placement-window-expired', {
      openedAt: state.openedAt, at,
    });
  }
  state.placements[sourceId] = { id, sourceId, x, z, at };
  if (Object.keys(state.placements).length > 8)
    return myDmuP4VfxInvalidate(data, state, [info.scope], 'chaos-placement-overflow', { id, sourceId });
  if (Object.keys(state.placements).length === 8) {
    myDmuNativeVfxCancelClockTask(myDmuEnsureNativeVfxState(data), `${info.scope}:batch-audit`);
    return myDmuFinalizeP4Chaos(data, info.scope, state.openedAt, 'eight-source-complete');
  }
  return true;
};

const myDmuResolveP4ChaosPlacement = (data, matches) => {
  const info = myDmuP4ChaosPlacementIds[matches.id?.toUpperCase()];
  if (info === undefined)
    return false;
  const state = myDmuP4ChaosState(data, info.scope);
  const sourceId = myDmuNormalizeActorId(matches.sourceId);
  if (state.invalid || state.placements[sourceId] === undefined)
    return false;
  state.resolved[sourceId] = true;
  if (Object.keys(state.resolved).length >= 8)
    return myDmuNativeVfxClearScope(data, info.scope, `${matches.id}-all-resolved`);
  return myDmuNativeVfxFilterScope(
    data,
    info.scope,
    (drawing) => !drawing.id.endsWith(`.${myDmuP4VfxActorTag(sourceId)}`),
    `${matches.id}-${sourceId}-exact-resolve`,
  );
};

const myDmuRecordP3TowerMarker = (data, matches) => {
  if (myDmuNormalizeHeadmarkerId(matches.id) !== '00A1')
    return false;
  const actorId = myDmuNormalizeActorId(matches.targetId);
  const state = myDmuP3VfxState(data).tower;
  if (!/^1[0-9A-F]{7}$/u.test(actorId ?? '') || state.targets.some((entry) => entry.id === actorId))
    return false;
  if (state.targets.length >= 2) {
    myDmuActLog('Native VFX coverage gap', {
      scope: 'p3.tower',
      reason: 'more-than-two-00A1-targets',
      actorId,
      fallback: false,
    });
    myDmuNativeVfxClearScope(data, 'p3.tower', 'marker-overflow');
    return false;
  }
  state.targets.push({ id: actorId, name: matches.target });
  return myDmuRenderP3Tower(data, `marker-${state.targets.length}`);
};

const myDmuSnapshotP3Tower = async (data, matches) => {
  if (matches.targetIndex !== undefined && matches.targetIndex !== '0')
    return false;
  const state = myDmuP3VfxState(data).tower;
  if (state.targets.length !== 2 || state.snapshots.length >= 2)
    return false;
  const target = state.targets[state.snapshots.length];
  const fence = myDmuNativeVfxCaptureFence(data);
  const positions = await myDmuNativeVfxResolveCombatants(data, [target.id], 'p3.tower');
  if (!myDmuNativeVfxFenceCurrent(data, fence))
    return false;
  if (positions.length !== 1)
    return myDmuNativeVfxClearScope(data, 'p3.tower', 'BB03-snapshot-failed');
  state.snapshots.push({ id: target.id, x: positions[0].x, z: positions[0].z });
  return myDmuRenderP3Tower(data, `BB03-snapshot-${state.snapshots.length}`);
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
  try {
    const combatants = await myDmuQueryCombatants(data, [ownId], 'p3.firewall-target');
    const me = combatants.find((combatant) => combatant?.Name === data.me);
    data.myDmuP3FirewallSelectedTargetId = myDmuCombatantTargetId(me ?? combatants[0]);
  } catch (_err) {
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
  const scheme = myDmuConfigValue(
    data,
    'MyDMU_P5SymphonySpreadScheme',
    myDmuP5SymphonySpreadSchemes.eden,
  );
  return Object.values(myDmuP5SymphonySpreadSchemes).includes(scheme)
    ? scheme
    : undefined;
};

const myDmuP5SymphonySpreadText = (data) => {
  const scheme = myDmuP5SymphonySpreadScheme(data);
  const role = myDmuGetRpByName(data, data.me);
  const direction = myDmuP5SymphonySpreadDirections[scheme]?.[role];
  if (direction === undefined) {
    myDmuActLog('P5 癫狂八方职能无法识别', { role, scheme });
    return undefined;
  }
  return `八方分散，${direction}`;
};

const myDmuNewP5NativeState = () => ({
  repeater: {
    invalid: false,
    round: 0,
    bb40Count: 0,
    bossActorId: undefined,
    activeScope: undefined,
    targetId: undefined,
    invulnerable: {},
  },
  flood: {
    invalid: false,
    armed: false,
    groups: [],
    currentGroup: undefined,
    resolvedWave: 0,
    resolvedOccurrences: {},
    resolutionBatches: {},
    route: undefined,
    routeReady: false,
  },
  symphony: {
    invalid: false,
    cycle: 0,
    activeScope: undefined,
    guideConfigValid: true,
    guideFailure: undefined,
    isLeaning: false,
    jobOrder: [...myDmuP5NativeSymphonyDefaultOrder],
    clusterAt: undefined,
    clusterTargets: [],
    clusters: [],
    buffs: {},
    lost: {},
  },
  trio: {
    invalid: false,
    armed: false,
    towers: {},
    buffs: {},
    activeTowerIds: {},
    batch: undefined,
    wave: 0,
    bases: {},
    lastChoiceAction: undefined,
    lastChoiceBossId: undefined,
  },
  groundFire: {
    invalid: false,
    armed: false,
    casts: [],
    castKeys: {},
    startedKeys: {},
  },
  vortex: {
    invalid: false,
    active: false,
    occurrence: undefined,
    generation: 0,
  },
  forsaken: {
    invalid: false,
    active: false,
    wave: 0,
    seenAdvances: {},
  },
});

const myDmuP5NativeLifecycleRegistry = globalThis.__stringDmuP5NativeLifecycle ??= {
  data: undefined,
  listenersInstalled: false,
};

const myDmuP5NativeState = (data) => {
  myDmuP5NativeRegisterLifecycleData(data);
  data.myDmuP5 ??= {};
  data.myDmuP5.native ??= myDmuNewP5NativeState();
  return data.myDmuP5.native;
};

const myDmuP5NativeEventMilliseconds = (data, matches = {}) => {
  const replay = myDmuFl(data)?.getArrReplayClock?.();
  if (replay?.active === true) {
    if (!Number.isSafeInteger(replay.replayMs))
      throw new Error('P5 ARR replay clock 缺少安全 replayMs');
    return replay.replayMs;
  }
  // P5 production matches use the standard cactbot timestamp only. ARR
  // envelope clocks are read above and never injected as capture fields.
  return myDmuNativeVfxEventMilliseconds({ timestamp: matches.timestamp });
};

const myDmuP5NativeMechanismScopes = (mechanism) =>
  (myDmuNativeVfxScopes.p5 ?? []).filter((scope) =>
    scope === `p5.${mechanism}` || scope.startsWith(`p5.${mechanism}.`));

const myDmuP5NativeClearMechanism = (data, mechanism, reason) => {
  let changed = false;
  for (const scope of myDmuP5NativeMechanismScopes(mechanism))
    changed = myDmuNativeVfxClearScope(data, scope, reason) || changed;
  return changed;
};

const myDmuP5NativeFail = (data, mechanism, reason, detail) => {
  const state = myDmuP5NativeState(data)[mechanism];
  if (state === undefined)
    throw new Error(`P5 Native 未知机制：${mechanism}`);
  state.invalid = true;
  myDmuP5NativeClearMechanism(data, mechanism, `fail-closed:${reason}`);
  myDmuActLog('P5 Native 失败关闭', {
    mechanism,
    reason,
    detail,
    fallback: false,
  });
  return false;
};

const myDmuP5NativeLifecycleCleanup = async (data, reason = 'lifecycle-cleanup') => {
  const native = myDmuEnsureNativeVfxState(data);
  const groundFire = data.myDmuP5?.native?.groundFire;
  if (groundFire?.renderTimer !== undefined)
    clearTimeout(groundFire.renderTimer);
  const vortex = data.myDmuP5?.native?.vortex;
  if (vortex !== undefined) {
    vortex.generation = (vortex.generation ?? 0) + 1;
    vortex.active = false;
    vortex.pending = false;
  }
  native.epoch++;
  const epoch = native.epoch;
  myDmuNativeVfxCancelAllTimers(native);
  native.scopes = {};
  native.scopeGenerations = {};
  native.lastSubmittedCount = 0;
  data.myDmuP5NativePendingBossTargets = undefined;
  if (data.myDmuP5 !== undefined)
    data.myDmuP5.native = myDmuNewP5NativeState();
  return await myDmuNativeVfxEnqueue(data, async () => {
    try {
      const vfx = myDmuNativeVfxApi(data);
      await vfx.endSession();
      native.activated = false;
      native.blocked = false;
      native.cleanupStatus = 'global-cleanup-verified';
      native.lastError = undefined;
      myDmuActLog('P5 Native lifecycle cleanup verified', {
        reason,
        epoch,
        fallback: false,
      });
      return true;
    } catch (error) {
      native.blocked = true;
      native.cleanupStatus = 'global-cleanup-failed';
      native.lastError = `${error}`;
      myDmuActLog('P5 Native lifecycle cleanup failed', {
        reason,
        epoch,
        error: `${error}`,
        fallback: false,
      });
      return false;
    }
  }, epoch);
};

const myDmuP5NativeRegisterLifecycleData = (data) => {
  myDmuP5NativeLifecycleRegistry.data = data;
  if (myDmuP5NativeLifecycleRegistry.listenersInstalled)
    return;
  myDmuP5NativeLifecycleRegistry.listenersInstalled = true;
  const cleanup = (reason) => {
    const current = myDmuP5NativeLifecycleRegistry.data;
    if (current === undefined)
      return;
    void myDmuP5NativeLifecycleCleanup(current, reason).catch((error) =>
      myDmuActLog('P5 Native lifecycle listener failed', {
        reason,
        error: `${error}`,
        fallback: false,
      }));
  };
  if (typeof addOverlayListener === 'function') {
    addOverlayListener('ChangeZone', () => cleanup('zone-change'));
    addOverlayListener('onInCombatChangedEvent', (event) => {
      const detail = event?.detail ?? event ?? {};
      if (!Boolean(detail.inGameCombat ?? detail.inACTCombat ?? false))
        cleanup('combat-end');
    });
    addOverlayListener('StringArrReplayEvent', (event) => {
      const envelope = event?.detail ?? event ?? {};
      const payload = envelope.event;
      if (payload?.kind === 'lifecycle')
        cleanup(`arr-${payload.action ?? 'lifecycle'}`);
      else if (payload?.kind === 'transport-reset')
        cleanup(`arr-${payload.action ?? 'transport-reset'}`);
    });
    addOverlayListener('StringLiveSemanticEvent', (event) => {
      const envelope = event?.detail ?? event ?? {};
      if (envelope.event?.kind === 'reset')
        cleanup('live-semantic-reset');
    });
  }
  if (typeof globalThis.addEventListener === 'function') {
    globalThis.addEventListener('error', () => cleanup('window-error'));
    globalThis.addEventListener('unhandledrejection', () => cleanup('unhandled-rejection'));
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

const myDmuP5NativeOwnActorId = (data) =>
  myDmuNormalizeActorId(myDmuGetHexIdByName(data, data.me));

const myDmuP5NativeRoleForActorId = (data, actorId) => {
  const id = myDmuNormalizeActorId(actorId);
  const name = myDmuPartyNames(data).find((partyName) =>
    myDmuNormalizeActorId(myDmuGetHexIdByName(data, partyName)) === id);
  return name === undefined ? undefined : myDmuGetRpByName(data, name);
};

const myDmuP5NativeRecordBossTarget = (data, matches) => {
  const sourceId = myDmuNormalizeActorId(matches.sourceId ?? matches.id);
  const targetId = myDmuNormalizeActorId(
    matches.pairTargetID ?? matches.targetId ?? matches.pairValue,
  );
  const eventAt = myDmuP5NativeEventMilliseconds(data, matches);
  const occurrence = `${sourceId}:${eventAt}`;
  if (!/^4[0-9A-F]{7}$/u.test(sourceId ?? ''))
    return false;
  const repeater = myDmuP5NativeState(data).repeater;
  if (repeater.bossActorId !== undefined && repeater.bossActorId !== sourceId)
    return false;
  data.myDmuP5NativePendingBossTargets ??= {};
  const candidates = data.myDmuP5NativePendingBossTargets;
  const previous = candidates[sourceId];
  if (previous?.occurrence === occurrence) {
    if (previous.targetId !== targetId)
      previous.ambiguous = true;
    return !previous.ambiguous;
  }
  candidates[sourceId] = {
    occurrence,
    sourceId,
    targetId,
    eventAt,
    ambiguous: false,
  };
  const ordered = Object.values(candidates)
    .sort((left, right) => right.eventAt - left.eventAt);
  for (const stale of ordered.slice(8))
    delete candidates[stale.sourceId];
  return true;
};

const myDmuP5NativeRepeaterPoint = (data, state) => {
  const ownRole = myDmuGetRpByName(data, data.me);
  if (ownRole === 'MT' || ownRole === 'ST') {
    const targetRole = myDmuP5NativeRoleForActorId(data, state.targetId);
    const invulnerable = state.invulnerable[state.targetId]?.guideExpiresAt >
      myDmuNativeVfxClock(data).now;
    if (invulnerable && targetRole !== ownRole)
      return { x: 106, z: 94 };
    return { x: 100, z: 92 };
  }
  if (ownRole === 'H1' || ownRole === 'H2')
    return { x: 94.34, z: 105.66 };
  if (['D1', 'D2', 'D3', 'D4'].includes(ownRole))
    return { x: 105.66, z: 105.66 };
  return undefined;
};

const myDmuP5NativeRepeaterRolePoint = (data, state, role) => {
  if (role === 'MT' || role === 'ST') {
    const targetRole = myDmuP5NativeRoleForActorId(data, state.targetId);
    const invulnerable = state.invulnerable[state.targetId]?.guideExpiresAt >
      myDmuNativeVfxClock(data).now;
    if (invulnerable && targetRole !== role)
      return { x: 106, z: 94 };
    return { x: 100, z: 92 };
  }
  if (role === 'H1' || role === 'H2')
    return { x: 94.34, z: 105.66 };
  if (['D1', 'D2', 'D3', 'D4'].includes(role))
    return { x: 105.66, z: 105.66 };
  return undefined;
};

const myDmuP5NativeRenderRepeater = (data, reason) => {
  const state = myDmuP5NativeState(data).repeater;
  if (state.invalid || state.activeScope === undefined || state.targetId === undefined)
    return false;
  const ownId = myDmuP5NativeOwnActorId(data);
  const point = myDmuP5NativeRepeaterPoint(data, state);
  return myDmuNativeVfxReplaceScope(data, state.activeScope, (vfx) => {
    const drawings = myDmuRoleOrder.map((role) => {
      const actorId = myDmuNativeVfxRoleActorId(data, role);
      const rolePoint = myDmuP5NativeRepeaterRolePoint(data, state, role);
      if (!/^1[0-9A-F]{7}$/u.test(actorId ?? '') || rolePoint === undefined)
        throw new Error(`P5 复读机缺少 ${role} 稳定站位`);
      return vfx.createCircle({
        id: `${state.activeScope}.spot.${role}.${actorId}`,
        type: 'circle',
        classification: 'danger',
        durationSeconds: 20,
        anchor: myDmuNativeVfxWorldAnchor(rolePoint.x, rolePoint.z),
        radius: 0.8,
        style: role === 'MT' || role === 'ST'
          ? myDmuNativeVfxStyles.orange
          : myDmuNativeVfxStyles.target,
      });
    });
    if (myDmuNativeVfxPersonalGuideEnabled(data) &&
        /^1[0-9A-F]{7}$/u.test(ownId ?? '') && point !== undefined) {
      drawings.push(myDmuNativeVfxCreateArrow(vfx, {
        id: `${state.activeScope}.guide.${ownId}`,
        type: 'arrow',
        classification: 'guide',
        durationSeconds: 20,
        from: myDmuNativeVfxEntityAnchor(ownId),
        to: myDmuNativeVfxWorldAnchor(point.x, point.z),
        width: 0.08,
        headLength: 0.65,
        headWidth: 0.55,
        style: myDmuNativeVfxThinGuideStyle(),
      }));
    }
    return drawings;
  }, reason);
};

const myDmuP5NativeScheduleInvulnerabilityThreshold = (data, state, targetId) => {
  const scope = state.activeScope;
  if (scope === undefined || targetId === undefined)
    return false;
  const key = `${scope}.invuln.${targetId}`;
  myDmuNativeVfxCancelClockTask(myDmuEnsureNativeVfxState(data), key);
  const record = state.invulnerable[targetId];
  const clock = myDmuNativeVfxClock(data);
  const delay = (record?.guideExpiresAt ?? 0) - clock.now;
  if (!Number.isFinite(delay) || delay <= 0)
    return false;
  const expectedGuideExpiresAt = record.guideExpiresAt;
  const effectId = record.effectId;
  return myDmuNativeVfxScheduleClockTask(data, key, delay, () => {
    const current = myDmuP5NativeState(data).repeater;
    if (current.activeScope !== scope ||
        current.invulnerable[targetId]?.guideExpiresAt !== expectedGuideExpiresAt)
      return false;
    return myDmuP5NativeRenderRepeater(data, `${effectId}-threshold`);
  });
};

const myDmuP5NativeEnterRepeater = (data, matches = {}) => {
  const state = myDmuP5NativeState(data).repeater;
  if (state.invalid)
    return false;
  let round = Number(matches.round);
  if (!Number.isInteger(round)) {
    state.bb40Count++;
    round = state.bb40Count === 1 ? 1 : state.bb40Count === 2 ? 3 : undefined;
  } else if (round === 1 || round === 3) {
    state.bb40Count = Math.max(state.bb40Count, round === 1 ? 1 : 2);
  }
  if (![1, 2, 3, 4].includes(round))
    return myDmuP5NativeFail(data, 'repeater', 'unexpected-round', { round });

  const candidates = data.myDmuP5NativePendingBossTargets ?? {};
  const entrySourceId = round === 1 || round === 3
    ? myDmuNormalizeActorId(matches.sourceId)
    : undefined;
  if (state.bossActorId === undefined) {
    const candidateIds = Object.keys(candidates);
    const bossActorId = /^4[0-9A-F]{7}$/u.test(entrySourceId ?? '')
      ? entrySourceId
      : candidateIds.length === 1 ? candidateIds[0] : undefined;
    if (bossActorId === undefined || candidates[bossActorId] === undefined)
      return myDmuP5NativeFail(data, 'repeater', 'boss-identity-not-bound-by-BB40', {
        entrySourceId,
        candidateIds,
      });
    state.bossActorId = bossActorId;
  } else if (entrySourceId !== undefined && entrySourceId !== state.bossActorId) {
    return myDmuP5NativeFail(data, 'repeater', 'BB40-source-changed-within-pull', {
      expected: state.bossActorId,
      actual: entrySourceId,
    });
  }
  const pending = candidates[state.bossActorId];
  const entryAt = myDmuP5NativeEventMilliseconds(data, matches);
  if (pending === undefined || pending.targetId === undefined || pending.ambiguous ||
      pending.sourceId !== state.bossActorId ||
      pending.eventAt > entryAt + 1000 || entryAt - pending.eventAt > 60000) {
    return myDmuP5NativeFail(data, 'repeater', 'missing-or-ambiguous-boss-target', {
      round,
      entryAt,
      pending,
    });
  }
  const targetRole = myDmuP5NativeRoleForActorId(data, pending.targetId);
  if (targetRole !== 'MT' && targetRole !== 'ST')
    return myDmuP5NativeFail(data, 'repeater', 'boss-target-is-not-exact-tank', {
      round,
      targetId: pending.targetId,
      targetRole,
    });

  for (const scope of myDmuP5NativeMechanismScopes('repeater')) {
    if (scope !== `p5.repeater.${round}`)
      myDmuNativeVfxClearScope(data, scope, `enter-repeater-${round}`);
  }
  state.round = round;
  state.activeScope = `p5.repeater.${round}`;
  state.targetId = pending.targetId;
  myDmuP5NativeScheduleInvulnerabilityThreshold(data, state, state.targetId);
  if (round === 3)
    myDmuP5NativeClearMechanism(data, 'trio', 'enter-repeater-3');
  return myDmuP5NativeRenderRepeater(data, `enter-round-${round}`);
};

const myDmuP5NativeRecordInvulnerability = (data, matches) => {
  const state = myDmuP5NativeState(data).repeater;
  if (state.invalid)
    return false;
  const effectId = matches.effectId?.toString().toUpperCase().padStart(4, '0');
  if (!myDmuP5NativeInvulnerabilityEffects.has(effectId))
    return false;
  const targetId = myDmuNormalizeActorId(matches.targetId);
  const role = myDmuP5NativeRoleForActorId(data, targetId);
  if ((role !== 'MT' && role !== 'ST') || targetId === undefined)
    return myDmuP5NativeFail(data, 'repeater', 'invulnerability-target-is-not-tank', {
      targetId,
      role,
    });
  const present = matches.present !== false && matches.present !== 'false';
  const remaining = myDmuNumber(matches.duration ?? matches.remainingSeconds) ?? 0;
  const scope = state.activeScope;
  if (scope !== undefined)
    myDmuNativeVfxCancelClockTask(
      myDmuEnsureNativeVfxState(data),
      `${scope}.invuln.${targetId}`,
    );
  if (present && remaining > 1.5) {
    const clock = myDmuNativeVfxClock(data);
    state.invulnerable[targetId] = {
      effectId,
      expiresAt: clock.now + remaining * 1000,
      guideExpiresAt: clock.now + (remaining - 1.5) * 1000,
    };
    myDmuP5NativeScheduleInvulnerabilityThreshold(data, state, targetId);
  } else {
    delete state.invulnerable[targetId];
  }
  if (state.activeScope !== undefined)
    return myDmuP5NativeRenderRepeater(data, `${effectId}-${present ? 'gain' : 'lose'}`);
  return true;
};

const myDmuP5NativeResetFlood = (data) => {
  const previous = myDmuP5NativeState(data).flood;
  if (previous.invalid)
    return false;
  myDmuP5NativeClearMechanism(data, 'repeater', 'C13F-enter-flood');
  myDmuP5NativeState(data).repeater.activeScope = undefined;
  myDmuP5NativeClearMechanism(data, 'flood', 'flood-reset');
  myDmuP5NativeState(data).flood = {
    invalid: false,
    armed: true,
    groups: [],
    currentGroup: undefined,
    resolvedWave: 0,
    resolvedOccurrences: {},
    resolutionBatches: {},
    castOccurrences: {},
    route: undefined,
    expectedTypes: undefined,
    routeReady: false,
  };
  return true;
};

const myDmuP5NativeLineIntersection = (left, right) => {
  const p = { x: left.x, z: left.z };
  const q = { x: right.x, z: right.z };
  const r = { x: Math.sin(left.heading), z: Math.cos(left.heading) };
  const s = { x: Math.sin(right.heading), z: Math.cos(right.heading) };
  const cross = (a, b) => a.x * b.z - a.z * b.x;
  const denominator = cross(r, s);
  if (Math.abs(denominator) < 0.0001)
    return undefined;
  const t = cross({ x: q.x - p.x, z: q.z - p.z }, s) / denominator;
  return { x: p.x + t * r.x, z: p.z + t * r.z };
};

const myDmuP5NativeFloodCardinal = (point) => {
  if (point === undefined || !Number.isFinite(point.x) || !Number.isFinite(point.z))
    return undefined;
  const x = point.x - 100;
  const z = point.z - 100;
  if (Math.max(Math.abs(x), Math.abs(z)) < 1)
    return undefined;
  if (Math.abs(x) > Math.abs(z))
    return x > 0 ? 'B' : 'D';
  return z > 0 ? 'C' : 'A';
};

const myDmuP5NativeResolveFloodRoute = (state) => {
  if (state.groups.length !== 4 || state.groups.some((group) => group.entries.length !== 2))
    return undefined;
  const inside = state.groups.map((group) => [...group.entries].sort((left, right) =>
    Math.hypot(left.x - 100, left.z - 100) - Math.hypot(right.x - 100, right.z - 100))[0]);
  const crosses = {
    cross12: myDmuP5NativeFloodCardinal(myDmuP5NativeLineIntersection(inside[0], inside[1])),
    cross34: myDmuP5NativeFloodCardinal(myDmuP5NativeLineIntersection(inside[2], inside[3])),
    cross23: myDmuP5NativeFloodCardinal(myDmuP5NativeLineIntersection(inside[1], inside[2])),
    cross14: myDmuP5NativeFloodCardinal(myDmuP5NativeLineIntersection(inside[0], inside[3])),
  };
  const values = Object.values(crosses);
  if (values.some((value) => value === undefined) || new Set(values).size !== 4)
    return undefined;
  const route = [crosses.cross34, crosses.cross14, crosses.cross12];
  const allowed = new Set([
    'A-B-C', 'D-C-B', 'B-C-D', 'A-D-C',
    'C-D-A', 'B-A-D', 'D-A-B', 'C-B-A',
  ]);
  return allowed.has(route.join('-')) ? route : undefined;
};

const myDmuP5NativeFloodRoutesByFirstPairs = {
  '1,2': ['A', 'B', 'C'],
  '1,4': ['D', 'C', 'B'],
  '2,3': ['B', 'C', 'D'],
  '2,1': ['A', 'D', 'C'],
  '3,4': ['C', 'D', 'A'],
  '3,2': ['B', 'A', 'D'],
  '4,1': ['D', 'A', 'B'],
  '4,3': ['C', 'B', 'A'],
};

const myDmuP5NativeFloodTypesByFirstPairs = {
  '1,2': [1, 2, 3, 4],
  '1,4': [1, 4, 3, 2],
  '2,3': [2, 3, 4, 1],
  '2,1': [2, 1, 4, 3],
  '3,4': [3, 4, 1, 2],
  '3,2': [3, 2, 1, 4],
  '4,1': [4, 1, 2, 3],
  '4,3': [4, 3, 2, 1],
};

const myDmuP5NativeFloodGroupType = (group) => {
  const types = group.entries.map((entry) => myDmuP5FloodWaves[
    `${entry.x.toFixed(3)}|${entry.z.toFixed(3)}|${entry.heading.toFixed(3)}`
  ]);
  return types.length === 2 && types[0] !== undefined && types[0] === types[1]
    ? types[0]
    : undefined;
};

const myDmuP5NativeFloodGuidePoints = {
  A: { x: 100, z: 98 },
  B: { x: 102, z: 100 },
  C: { x: 100, z: 102 },
  D: { x: 98, z: 100 },
};

const myDmuP5NativeRenderFloodWave = (data, wave, reason) => {
  const state = myDmuP5NativeState(data).flood;
  const requiredGroups = Math.min(wave + 1, 4);
  if (state.invalid || !state.armed || state.route === undefined ||
      wave < 1 || wave > 4 || state.groups.length < requiredGroups)
    return false;
  const scope = `p5.flood.w${wave}`;
  for (const other of myDmuP5NativeMechanismScopes('flood')) {
    if (other !== scope)
      myDmuNativeVfxClearScope(data, other, `promote-flood-wave-${wave}`);
  }
  return myDmuNativeVfxReplaceScope(data, scope, (vfx) => {
    const drawings = [];
    const addRects = (group, preview) => {
      for (const entry of group.entries) {
        drawings.push(vfx.createRect({
          id: `${scope}.${preview ? 'preview' : 'current'}.${entry.drawingKey}`,
          type: 'rect',
          classification: 'danger',
          durationSeconds: 12,
          anchor: myDmuNativeVfxWorldAnchor(entry.x, entry.z),
          width: 10,
          length: 40,
          direction: { mode: 'fixed', rotationRadians: entry.heading },
          pivot: 'center',
          style: preview ? myDmuNativeVfxStyles.preview : myDmuNativeVfxStyles.danger,
        }));
      }
    };
    addRects(state.groups[wave - 1], false);
    if (wave < 4)
      addRects(state.groups[wave], true);

    if (myDmuNativeVfxPersonalGuideEnabled(data)) {
      const route = state.route.map((label) => myDmuP5NativeFloodGuidePoints[label]);
      const segmentIndexes = !state.routeReady && wave === 1
        ? []
        : wave <= 2 ? [[0, 1], [1, 2]] : [[1, 2]];
      for (const [index, [from, to]] of segmentIndexes.entries()) {
        drawings.push(vfx.createLine({
          id: `${scope}.route.${index + 1}`,
          type: 'line',
          classification: 'guide',
          durationSeconds: 12,
          from: myDmuNativeVfxWorldAnchor(route[from].x, route[from].z),
          to: myDmuNativeVfxWorldAnchor(route[to].x, route[to].z),
          width: 0.08,
          style: myDmuNativeVfxThinGuideStyle(),
        }));
      }
      const targetIndex = wave === 1 ? 0 : wave === 2 ? 1 : 2;
      const target = route[targetIndex];
      drawings.push(vfx.createCircle({
        id: `${scope}.guide-target`,
        type: 'circle',
        classification: 'guide',
        durationSeconds: 12,
        anchor: myDmuNativeVfxWorldAnchor(target.x, target.z),
        radius: 0.65,
        style: myDmuNativeVfxStyles.target,
      }));
    }
    const expected = !state.routeReady && wave === 1 ? 5 : [0, 7, 7, 6, 4][wave];
    if (myDmuNativeVfxPersonalGuideEnabled(data) && drawings.length !== expected)
      throw new Error(`P5 洪水 wave${wave} 图元 ${drawings.length}/${expected}`);
    return drawings;
  }, reason);
};

const myDmuP5NativeRecordFlood = (data, matches) => {
  const state = myDmuP5NativeState(data).flood;
  if (state.invalid)
    return false;
  if (!state.armed)
    return myDmuP5NativeFail(data, 'flood', 'cast-before-reset', matches);
  const actorId = myDmuNormalizeActorId(matches.sourceId);
  const x = myDmuNumber(matches.x);
  const z = myDmuNumber(matches.y ?? matches.z);
  const heading = myDmuNumber(matches.heading);
  const eventAt = myDmuP5NativeEventMilliseconds(data, matches);
  const occurrence = `${eventAt}:${actorId}`;
  if (!/^4[0-9A-F]{7}$/u.test(actorId ?? '') ||
      ![x, z, heading].every(Number.isFinite))
    return myDmuP5NativeFail(data, 'flood', 'malformed-cast', { actorId, x, z, heading });
  if (state.castOccurrences[occurrence])
    return myDmuP5NativeFail(data, 'flood', 'duplicate-cast-occurrence', { occurrence });
  state.castOccurrences[occurrence] = true;

  let group = state.currentGroup;
  if (group === undefined || group.eventAt !== eventAt) {
    if (group !== undefined && group.entries.length !== 2)
      return myDmuP5NativeFail(data, 'flood', 'incomplete-same-time-pair', group);
    if (state.groups.length >= 4)
      return myDmuP5NativeFail(data, 'flood', 'extra-line-pair', { eventAt });
    group = { eventAt, ordinal: state.groups.length + 1, entries: [] };
    state.groups.push(group);
    state.currentGroup = group;
  }
  if (group.entries.some((entry) => entry.actorId === actorId))
    return myDmuP5NativeFail(data, 'flood', 'duplicate-actor-in-pair', { actorId, eventAt });
  const drawingKey = `g${group.ordinal}e${group.entries.length + 1}`;
  group.entries.push({ occurrence, drawingKey, actorId, x, z, heading });
  if (group.entries.length > 2)
    return myDmuP5NativeFail(data, 'flood', 'pair-overflow', group);

  if (group.entries.length === 2) {
    group.waveType = myDmuP5NativeFloodGroupType(group);
    if (group.waveType === undefined)
      return myDmuP5NativeFail(data, 'flood', 'unrecognized-line-pair-type', group);
    const expectedType = state.expectedTypes?.[group.ordinal - 1];
    if (expectedType !== undefined && group.waveType !== expectedType)
      return myDmuP5NativeFail(data, 'flood', 'line-pair-order-contradicts-route', {
        ordinal: group.ordinal,
        expectedType,
        actualType: group.waveType,
        expectedTypes: state.expectedTypes,
      });
  }

  if (state.groups.length === 2 && state.groups.every((entry) => entry.entries.length === 2)) {
    const firstPairKey = state.groups.map((entry) => entry.waveType).join(',');
    state.route = myDmuP5NativeFloodRoutesByFirstPairs[firstPairKey];
    state.expectedTypes = myDmuP5NativeFloodTypesByFirstPairs[firstPairKey];
    if (state.route === undefined || state.expectedTypes === undefined)
      return myDmuP5NativeFail(data, 'flood', 'illegal-first-two-line-pairs', {
        firstPairKey,
      });
    state.routeReady = false;
    return myDmuP5NativeRenderFloodWave(data, 1, 'first-two-pairs-recorded');
  }

  if (state.groups.length === 3 && state.groups.every((entry) => entry.entries.length === 2)) {
    // The first two pairs identify a tentative route, but both remaining
    // pairs must agree before it is promoted to a confirmed frame.
    return true;
  }

  if (state.groups.length === 4 && state.groups.every((entry) => entry.entries.length === 2)) {
    const geometryRoute = myDmuP5NativeResolveFloodRoute(state);
    if (geometryRoute === undefined || geometryRoute.join(',') !== state.route?.join(','))
      return myDmuP5NativeFail(data, 'flood', 'line-intersection-route-invalid', state.groups);
    state.routeReady = true;
    return myDmuP5NativeRenderFloodWave(data, 1, 'all-eight-casts-recorded');
  }
  return true;
};

const myDmuP5NativeResolveFlood = (data, matches) => {
  const state = myDmuP5NativeState(data).flood;
  if (state.invalid)
    return false;
  if (!state.armed || state.route === undefined || state.groups.length !== 4 ||
      state.groups.some((group) => group.entries.length !== 2))
    return myDmuP5NativeFail(data, 'flood', 'resolution-before-complete-casts', matches);
  const actorId = myDmuNormalizeActorId(matches.sourceId);
  const eventAt = myDmuP5NativeEventMilliseconds(data, matches);
  const targetCount = Number(matches.targetCount);
  const targetIndex = Number(matches.targetIndex);
  if (Number.isFinite(targetCount) && targetCount !== 8)
    return myDmuP5NativeFail(data, 'flood', 'BB4F-target-count-is-not-eight', {
      targetCount,
      targetIndex,
    });
  const occurrence = `${actorId}:${eventAt}`;
  state.resolutionBatches[occurrence] ??= { indexes: {}, advanced: false };
  const batch = state.resolutionBatches[occurrence];
  if (Number.isInteger(targetIndex) && targetIndex >= 0 && targetIndex < 8) {
    if (batch.indexes[targetIndex])
      return true;
    batch.indexes[targetIndex] = true;
  }
  const aggregateCount = Array.isArray(matches.targetIds) ? matches.targetIds.length : 0;
  const complete = aggregateCount === 8 || Object.keys(batch.indexes).length === 8 ||
    (!Number.isFinite(targetCount) && !Number.isFinite(targetIndex));
  if (!complete)
    return true;
  if (batch.advanced || state.resolvedOccurrences[occurrence])
    return true;
  batch.advanced = true;
  state.resolvedOccurrences[occurrence] = true;
  const wave = state.resolvedWave + 1;
  if (wave > 4)
    return myDmuP5NativeFail(data, 'flood', 'extra-resolution', { occurrence });
  myDmuNativeVfxClearScope(data, `p5.flood.w${wave}`, `BB4F-wave-${wave}`);
  state.resolvedWave = wave;
  if (wave < 4)
    return myDmuP5NativeRenderFloodWave(data, wave + 1, `BB4F-promote-${wave + 1}`);
  return true;
};

const myDmuP5NativeSymphonyOrder = (data) => {
  const raw = myDmuConfigValue(
    data,
    'MyDMU_P5SymphonyOrder',
    myDmuP5NativeSymphonyDefaultOrder.join('/'),
  );
  const values = Array.isArray(raw)
    ? raw
    : typeof raw === 'string'
      ? raw.trim().split(/[\s,，/|>＞、;；]+/u)
      : undefined;
  if (values === undefined)
    return undefined;
  const order = values.map((role) => typeof role === 'string' ? role.trim().toUpperCase() : '');
  if (order.length !== myDmuRoleOrder.length ||
      new Set(order).size !== myDmuRoleOrder.length ||
      order.some((role) => !myDmuRoleOrder.includes(role)))
    return undefined;
  return order;
};

const myDmuP5NativeSymphonyPolarPoint = (
  role,
  isLeaning,
  radius,
  order = myDmuP5NativeSymphonyDefaultOrder,
) => {
  const index = order.indexOf(role);
  if (index < 0 || !Number.isFinite(radius))
    return undefined;
  const heading = index * Math.PI / 4 + (isLeaning ? Math.PI / 8 : 0);
  return {
    x: 100 + Math.sin(heading) * radius,
    z: 100 + Math.cos(heading) * radius,
  };
};

const myDmuP5NativeSymphonyInitialPoint = (
  role,
  isLeaning,
  order = myDmuP5NativeSymphonyDefaultOrder,
) =>
  myDmuP5NativeSymphonyPolarPoint(
    role,
    isLeaning,
    role === 'MT' || role === 'ST' ? 10 : 7.5,
    order,
  );

const myDmuP5NativeSymphonyFirstClusterPoint = (
  role,
  isLeaning,
  isHit,
  order = myDmuP5NativeSymphonyDefaultOrder,
) => {
  if (role === 'MT' || role === 'ST')
    return { x: 100, z: 90 };
  if (!isHit)
    return myDmuP5NativeSymphonyInitialPoint(role, isLeaning, order);
  const guideOutRadius = ['H1', 'H2', 'D3', 'D4'].includes(role)
    ? 14
    : ['D1', 'D2'].includes(role) ? 11 : undefined;
  return myDmuP5NativeSymphonyPolarPoint(role, isLeaning, guideOutRadius, order);
};

const myDmuP5NativeSymphonyFinalPoint = (state, ownId) => {
  if (state.buffs['14E6'] === ownId)
    return { x: 100, z: 80.5 };
  if (state.buffs['14E7'] === ownId)
    return { x: 100, z: 92.5 };
  return { x: 100, z: 111 };
};

const myDmuP5NativeSymphonyParty = (data, order = myDmuP5NativeSymphonyDefaultOrder) => {
  const entries = order.map((role) => ({
    role,
    id: myDmuNativeVfxRoleActorId(data, role),
  }));
  if (entries.some((entry) => !/^1[0-9A-F]{7}$/u.test(entry.id ?? '')) ||
      new Set(entries.map((entry) => entry.id)).size !== 8)
    return undefined;
  return entries;
};

const myDmuP5NativeRenderSymphonyInitial = (data, reason) => {
  const state = myDmuP5NativeState(data).symphony;
  const party = myDmuP5NativeSymphonyParty(data, state.jobOrder);
  if (state.invalid || state.activeScope === undefined || party === undefined)
    return party === undefined
      ? myDmuP5NativeFail(data, 'symphony', 'party-incomplete', undefined)
      : false;
  const ownId = myDmuP5NativeOwnActorId(data);
  const ownRole = myDmuP5NativeRoleForActorId(data, ownId);
  const point = state.guideConfigValid
    ? myDmuP5NativeSymphonyInitialPoint(ownRole, state.isLeaning, state.jobOrder)
    : undefined;
  return myDmuNativeVfxReplaceScope(data, state.activeScope, (vfx) => {
    const drawings = party.map((entry) => vfx.createCircle({
      id: `${state.activeScope}.spread.${entry.id}`,
      type: 'circle',
      classification: 'danger',
      durationSeconds: 10,
      anchor: myDmuNativeVfxEntityAnchor(entry.id),
      radius: 5,
      style: entry.role === 'MT' || entry.role === 'ST'
        ? myDmuNativeVfxStyles.orange
        : myDmuNativeVfxStyles.litBlue,
    }));
    if (myDmuNativeVfxPersonalGuideEnabled(data) && state.guideConfigValid && point !== undefined) {
      drawings.push(myDmuNativeVfxCreateArrow(vfx, {
        id: `${state.activeScope}.guide.initial.${ownId}`,
        type: 'arrow',
        classification: 'guide',
        durationSeconds: 10,
        from: myDmuNativeVfxEntityAnchor(ownId),
        to: myDmuNativeVfxWorldAnchor(point.x, point.z),
        width: 0.08,
        headLength: 0.65,
        headWidth: 0.55,
        style: myDmuNativeVfxThinGuideStyle(),
      }));
    }
    return drawings;
  }, reason);
};

const myDmuP5NativeRenderSymphonyFirstCluster = (data, reason) => {
  const state = myDmuP5NativeState(data).symphony;
  const targets = state.clusterTargets;
  if (state.invalid || state.activeScope === undefined || targets.length !== 3)
    return false;
  const mtId = myDmuNativeVfxRoleActorId(data, 'MT');
  const ownId = myDmuP5NativeOwnActorId(data);
  const ownRole = myDmuP5NativeRoleForActorId(data, ownId);
  const point = state.guideConfigValid
    ? myDmuP5NativeSymphonyFirstClusterPoint(
      ownRole,
      state.isLeaning,
      targets.includes(ownId),
      state.jobOrder,
    )
    : undefined;
  if (!/^1[0-9A-F]{7}$/u.test(mtId ?? ''))
    return myDmuP5NativeFail(data, 'symphony', 'missing-mt', undefined);
  return myDmuNativeVfxReplaceScope(data, state.activeScope, (vfx) => {
    const drawings = targets.map((targetId) => vfx.createCircle({
      id: `${state.activeScope}.cluster1.${targetId}`,
      type: 'circle',
      classification: 'danger',
      durationSeconds: 6,
      anchor: myDmuNativeVfxEntityAnchor(targetId),
      radius: 5,
      style: myDmuNativeVfxStyles.litBlue,
    }));
    drawings.push(vfx.createCircle({
      id: `${state.activeScope}.cluster1.mt.${mtId}`,
      type: 'circle',
      classification: 'danger',
      durationSeconds: 6,
      anchor: myDmuNativeVfxEntityAnchor(mtId),
      radius: 5,
      style: myDmuNativeVfxStyles.orange,
    }));
    if (myDmuNativeVfxPersonalGuideEnabled(data) && state.guideConfigValid && point !== undefined) {
      drawings.push(myDmuNativeVfxCreateArrow(vfx, {
        id: `${state.activeScope}.guide.cluster1.${ownId}`,
        type: 'arrow',
        classification: 'guide',
        durationSeconds: 6,
        from: myDmuNativeVfxEntityAnchor(ownId),
        to: myDmuNativeVfxWorldAnchor(point.x, point.z),
        width: 0.08,
        headLength: 0.65,
        headWidth: 0.55,
        style: myDmuNativeVfxThinGuideStyle(),
      }));
    }
    return drawings;
  }, reason);
};

const myDmuP5NativeRenderSymphonyFinal = (data, reason) => {
  const state = myDmuP5NativeState(data).symphony;
  const flareId = state.buffs['14E6'];
  const holyId = state.buffs['14E7'];
  const ownId = myDmuP5NativeOwnActorId(data);
  const point = state.guideConfigValid
    ? myDmuP5NativeSymphonyFinalPoint(state, ownId)
    : undefined;
  if (!/^1[0-9A-F]{7}$/u.test(flareId ?? '') ||
      !/^1[0-9A-F]{7}$/u.test(holyId ?? '') || flareId === holyId)
    return myDmuP5NativeFail(data, 'symphony', 'final-buffs-incomplete', state.buffs);
  return myDmuNativeVfxReplaceScope(data, state.activeScope, (vfx) => {
    const drawings = [
      vfx.createCircle({
        id: `${state.activeScope}.flare.${flareId}`,
        type: 'circle',
        classification: 'danger',
        durationSeconds: 7,
        anchor: myDmuNativeVfxEntityAnchor(flareId),
        radius: 26,
        style: myDmuNativeVfxStyles.dangerAlt,
      }),
      vfx.createCircle({
        id: `${state.activeScope}.holy.${holyId}`,
        type: 'circle',
        classification: 'danger',
        durationSeconds: 7,
        anchor: myDmuNativeVfxEntityAnchor(holyId),
        radius: 6,
        style: myDmuNativeVfxStyles.orange,
      }),
    ];
    if (myDmuNativeVfxPersonalGuideEnabled(data) && state.guideConfigValid &&
        point !== undefined && /^1[0-9A-F]{7}$/u.test(ownId ?? '')) {
      drawings.push(myDmuNativeVfxCreateArrow(vfx, {
        id: `${state.activeScope}.guide.final.${ownId}`,
        type: 'arrow',
        classification: 'guide',
        durationSeconds: 7,
        from: myDmuNativeVfxEntityAnchor(ownId),
        to: myDmuNativeVfxWorldAnchor(point.x, point.z),
        width: 0.08,
        headLength: 0.65,
        headWidth: 0.55,
        style: myDmuNativeVfxThinGuideStyle(),
      }));
    }
    return drawings;
  }, reason);
};

const myDmuP5NativeStartSymphony = (data, matches = {}) => {
  const previous = myDmuP5NativeState(data).symphony;
  if (previous.invalid)
    return false;
  const explicitCycle = Number(matches.cycle);
  const cycle = Number.isInteger(explicitCycle) ? explicitCycle : previous.cycle + 1;
  if (cycle < 1 || cycle > 2 || cycle <= previous.cycle)
    return myDmuP5NativeFail(data, 'symphony', 'unexpected-cycle', {
      cycle,
      previous: previous.cycle,
    });
  if (cycle === 1) {
    myDmuP5NativeClearMechanism(data, 'flood', 'BB50-enter-symphony-1');
    myDmuP5NativeState(data).flood.armed = false;
  } else {
    myDmuP5NativeClearMechanism(data, 'groundFire', 'BB50-enter-symphony-2');
    myDmuP5NativeClearMechanism(data, 'vortex', 'BB50-enter-symphony-2');
    myDmuP5NativeState(data).groundFire.armed = false;
    myDmuP5NativeState(data).vortex.active = false;
  }
  myDmuP5NativeClearMechanism(data, 'symphony', `start-cycle-${cycle}`);
  const spreadScheme = myDmuP5SymphonySpreadScheme(data);
  const jobOrder = myDmuP5NativeSymphonyOrder(data);
  const guideFailures = [];
  if (spreadScheme === undefined)
    guideFailures.push({
      reason: 'invalid-spread-scheme',
      value: myDmuConfigValue(data, 'MyDMU_P5SymphonySpreadScheme', undefined),
    });
  if (jobOrder === undefined)
    guideFailures.push({
      reason: 'invalid-job-order',
      value: myDmuConfigValue(data, 'MyDMU_P5SymphonyOrder', undefined),
    });
  if (guideFailures.length > 0) {
    myDmuActLog('P5 Native 个人引导失败关闭', {
      mechanism: 'symphony',
      failures: guideFailures,
      objectiveDangerPreserved: true,
      fallback: false,
    });
  }
  const replay = myDmuFl(data)?.getArrReplayClock?.();
  // isLeaning is not present on a live BB50 line.  An explicit match value is
  // accepted only inside the isolated ARR harness; live always uses persisted config.
  const replayOverride = replay?.active === true &&
    Object.prototype.hasOwnProperty.call(matches, 'isLeaning');
  const isLeaning = replayOverride
    ? matches.isLeaning === true || matches.isLeaning === 'true'
    : spreadScheme === myDmuP5SymphonySpreadSchemes.omega;
  myDmuP5NativeState(data).symphony = {
    invalid: false,
    cycle,
    activeScope: `p5.symphony.${cycle}`,
    guideConfigValid: guideFailures.length === 0,
    guideFailure: guideFailures.length === 0 ? undefined : guideFailures,
    isLeaning,
    jobOrder,
    clusterAt: undefined,
    clusterTargets: [],
    clusters: [],
    buffs: {},
    lost: {},
  };
  return myDmuP5NativeRenderSymphonyInitial(data, `BB50-cycle-${cycle}`);
};

const myDmuP5NativeRecordSymphonyHit = (data, matches) => {
  const state = myDmuP5NativeState(data).symphony;
  if (state.invalid)
    return false;
  if (state.activeScope === undefined)
    return myDmuP5NativeFail(data, 'symphony', 'hit-before-start', matches);
  const targetId = myDmuNormalizeActorId(matches.targetId);
  const role = myDmuP5NativeRoleForActorId(data, targetId);
  if (!['H1', 'H2', 'D1', 'D2', 'D3', 'D4'].includes(role))
    return myDmuP5NativeFail(data, 'symphony', 'hit-target-is-not-unique-non-tank', {
      targetId,
      role,
    });
  if (state.clusterTargets.includes(targetId) ||
      state.clusters.some((cluster) => cluster.includes(targetId)))
    return myDmuP5NativeFail(data, 'symphony', 'duplicate-hit-target', { targetId });
  const eventAt = myDmuP5NativeEventMilliseconds(data, matches);
  if (state.clusterAt === undefined) {
    state.clusterAt = eventAt;
  } else if (state.clusterAt !== eventAt) {
    if (state.clusterTargets.length !== 3)
      return myDmuP5NativeFail(data, 'symphony', 'missing-hit-in-cluster', {
        eventAt: state.clusterAt,
        targets: state.clusterTargets,
      });
    state.clusters.push([...state.clusterTargets]);
    if (state.clusters.length >= 2)
      return myDmuP5NativeFail(data, 'symphony', 'extra-hit-cluster', { eventAt });
    state.clusterAt = eventAt;
    state.clusterTargets = [];
  }
  state.clusterTargets.push(targetId);
  if (state.clusterTargets.length > 3)
    return myDmuP5NativeFail(data, 'symphony', 'cluster-overflow', state.clusterTargets);
  if (state.clusterTargets.length < 3)
    return true;
  if (state.clusters.length === 0)
    return myDmuP5NativeRenderSymphonyFirstCluster(data, 'BB54-cluster-1');
  return myDmuP5NativeRenderSymphonyFinal(data, 'BB54-cluster-2');
};

const myDmuP5NativeRecordSymphonyBuff = (data, matches) => {
  const state = myDmuP5NativeState(data).symphony;
  if (state.invalid)
    return false;
  if (state.activeScope === undefined)
    return false;
  const effectId = matches.effectId?.toString().toUpperCase().padStart(4, '0');
  const targetId = myDmuNormalizeActorId(matches.targetId);
  const role = myDmuP5NativeRoleForActorId(data, targetId);
  if (!['14E6', '14E7'].includes(effectId) || (role !== 'MT' && role !== 'ST'))
    return myDmuP5NativeFail(data, 'symphony', 'invalid-buff-owner-pair', {
      effectId,
      targetId,
      role,
    });
  if (state.buffs[effectId] !== undefined)
    return myDmuP5NativeFail(data, 'symphony', 'duplicate-buff-gain', { effectId, targetId });
  if (Object.values(state.buffs).includes(targetId))
    return myDmuP5NativeFail(data, 'symphony', 'same-owner-has-two-buffs', { effectId, targetId });
  state.buffs[effectId] = targetId;
  return true;
};

const myDmuP5NativeLoseSymphonyBuff = (data, matches) => {
  const state = myDmuP5NativeState(data).symphony;
  if (state.invalid || state.activeScope === undefined)
    return false;
  const effectId = matches.effectId?.toString().toUpperCase().padStart(4, '0');
  const targetId = myDmuNormalizeActorId(matches.targetId);
  if (!['14E6', '14E7'].includes(effectId) || state.buffs[effectId] !== targetId)
    return false;
  if (state.lost[effectId])
    return true;
  state.lost[effectId] = true;
  if (!state.lost['14E6'] || !state.lost['14E7'])
    return true;
  if (state.clusters.length !== 1 || state.clusterTargets.length !== 3)
    return myDmuP5NativeFail(data, 'symphony', 'buffs-lost-before-final-cluster-complete', {
      clusters: state.clusters,
      clusterTargets: state.clusterTargets,
    });
  const cycle = state.cycle;
  const scope = state.activeScope;
  state.activeScope = undefined;
  myDmuNativeVfxClearScope(data, scope, `symphony-cycle-${cycle}-buffs-lost`);
  return myDmuP5NativeEnterRepeater(data, {
    round: cycle * 2,
    replayMs: matches.replayMs,
    timestamp: matches.timestamp,
    sequence: matches.sequence,
    reason: 'symphony-buffs-lost',
  });
};

const myDmuP5NativeResetTrio = (data) => {
  const previous = myDmuP5NativeState(data).trio;
  if (previous.invalid)
    return false;
  myDmuP5NativeClearMechanism(data, 'repeater', 'BB42-enter-trio');
  myDmuP5NativeState(data).repeater.activeScope = undefined;
  myDmuP5NativeClearMechanism(data, 'trio', 'trio-reset');
  myDmuP5NativeState(data).trio = {
    invalid: false,
    armed: true,
    towers: {},
    buffs: {},
    activeTowerIds: {},
    batch: undefined,
    wave: 0,
    bases: {},
    lastChoiceAction: undefined,
    lastChoiceBossId: undefined,
  };
  return true;
};

const myDmuP5NativeRecordTrioTower = (data, matches) => {
  const state = myDmuP5NativeState(data).trio;
  if (state.invalid)
    return false;
  if (!state.armed)
    return myDmuP5NativeFail(data, 'trio', 'tower-before-reset', matches);
  const id = myDmuNormalizeActorId(matches.id ?? matches.sourceId);
  const contentId = matches.pairBNpcID?.toString().toUpperCase()
    .replace(/^0+(?=[0-9A-F])/u, '')
    .padStart(6, '0');
  const element = myDmuP5NativeTrioTowerElements[contentId];
  const x = myDmuNumber(matches.pairPosX ?? matches.x);
  const z = myDmuNumber(matches.pairPosY ?? matches.y ?? matches.z);
  if (!/^4[0-9A-F]{7}$/u.test(id ?? '') || element === undefined ||
      ![x, z].every(Number.isFinite))
    return myDmuP5NativeFail(data, 'trio', 'malformed-tower', { id, contentId, x, z });
  if (state.towers[id] !== undefined)
    return myDmuP5NativeFail(data, 'trio', 'duplicate-tower', { id });
  if (Object.keys(state.towers).length >= 9)
    return myDmuP5NativeFail(data, 'trio', 'extra-tower', { id });
  state.towers[id] = {
    id,
    element,
    x,
    z,
    heading: Math.atan2(x - 100, z - 100),
  };
  return true;
};

const myDmuP5NativeRecordTrioBuff = (data, matches) => {
  const state = myDmuP5NativeState(data).trio;
  if (state.invalid)
    return false;
  const effectId = matches.effectId?.toString().toUpperCase()
    .replace(/^0+(?=[0-9A-F])/u, '');
  const element = myDmuP5NativeTrioElements[effectId];
  const targetId = myDmuNormalizeActorId(matches.targetId);
  const sourceId = matches.sourceId === undefined
    ? undefined
    : matches.sourceId.toString().trim().toUpperCase().padStart(8, '0');
  const initialSource = sourceId === undefined || sourceId === 'E0000000';
  const initialComplete = Object.keys(state.buffs).length === 6;
  if (!state.armed) {
    if (!initialSource && element !== undefined && /^4[0-9A-F]{7}$/u.test(sourceId) &&
        /^1[0-9A-F]{7}$/u.test(targetId ?? '') &&
        myDmuP5NativeRoleForActorId(data, targetId) !== undefined)
      return true;
    return myDmuP5NativeFail(data, 'trio', 'buff-before-reset', matches);
  }
  if (!initialSource) {
    if (initialComplete && element !== undefined && /^4[0-9A-F]{7}$/u.test(sourceId) &&
        /^1[0-9A-F]{7}$/u.test(targetId ?? '') &&
        myDmuP5NativeRoleForActorId(data, targetId) !== undefined)
      return true;
    return myDmuP5NativeFail(data, 'trio', 'non-initial-element-buff-before-freeze', {
      effectId,
      sourceId,
      targetId,
      initialComplete,
    });
  }
  if (element === undefined || !/^1[0-9A-F]{7}$/u.test(targetId ?? '') ||
      myDmuP5NativeRoleForActorId(data, targetId) === undefined)
    return myDmuP5NativeFail(data, 'trio', 'malformed-element-buff', {
      effectId,
      targetId,
    });
  if (state.buffs[targetId] !== undefined)
    return myDmuP5NativeFail(data, 'trio', 'duplicate-element-buff', { targetId, effectId });
  if (Object.keys(state.buffs).length >= 6)
    return myDmuP5NativeFail(data, 'trio', 'extra-element-buff', { targetId, effectId });
  state.buffs[targetId] = element;
  return true;
};

const myDmuP5NativeTrioReady = (data, state) => {
  const towers = Object.values(state.towers);
  const buffs = Object.values(state.buffs);
  const partyIds = myDmuNativeVfxPartyActorIds(data);
  return towers.length === 9 && new Set(towers.map((tower) => tower.id)).size === 9 &&
    ['fire', 'ice', 'thunder'].every((element) =>
      towers.filter((tower) => tower.element === element).length === 3 &&
      buffs.filter((buff) => buff === element).length === 2) &&
    Object.keys(state.buffs).length === 6 && partyIds.length === 8 &&
    Object.keys(state.buffs).every((id) => partyIds.includes(id)) &&
    partyIds.filter((id) => state.buffs[id] === undefined).length === 2;
};

const myDmuP5NativeActorControlValue = (value) => {
  if (typeof value === 'number')
    return value;
  if (typeof value !== 'string' || !/^[0-9A-F]+$/iu.test(value))
    return undefined;
  return Number.parseInt(value, 16);
};

const myDmuP5NativeRecordTrioTowerControl = (data, matches) => {
  const state = myDmuP5NativeState(data).trio;
  if (state.invalid)
    return false;
  if (!state.armed || !myDmuP5NativeTrioReady(data, state))
    return myDmuP5NativeFail(data, 'trio', '019D-before-complete-towers-and-buffs', {
      towers: Object.keys(state.towers).length,
      buffs: Object.keys(state.buffs).length,
    });
  const id = myDmuNormalizeActorId(matches.id ?? matches.sourceId);
  const rawParams = Array.isArray(matches.params)
    ? matches.params
    : [matches.param1, matches.param2, matches.param3, matches.param4];
  const params = rawParams.map(myDmuP5NativeActorControlValue);
  const isOn = params[0] === 0x10 && params[1] === 0x20 &&
    params[2] === 0 && params[3] === 0;
  const isOff = params[0] === 0x1 && params[1] === 0x40 &&
    params[2] === 0 && params[3] === 0;
  if (state.towers[id] === undefined || (!isOn && !isOff))
    return myDmuP5NativeFail(data, 'trio', 'malformed-019D-control', { id, params });
  const eventAt = myDmuP5NativeEventMilliseconds(data, matches);
  if (state.batch === undefined || state.batch.eventAt !== eventAt) {
    if (state.batch !== undefined && !state.batch.finalized)
      return myDmuP5NativeFail(data, 'trio', '019D-batch-advanced-before-complete', state.batch);
    state.batch = { eventAt, on: [], off: [], finalized: false };
  }
  const list = isOn ? state.batch.on : state.batch.off;
  if (list.includes(id))
    return myDmuP5NativeFail(data, 'trio', 'duplicate-019D-control', { id, eventAt, isOn });
  if (isOn) {
    if (state.activeTowerIds[id])
      return myDmuP5NativeFail(data, 'trio', '019D-on-for-active-tower', { id });
    state.activeTowerIds[id] = true;
  } else {
    if (!state.activeTowerIds[id])
      return myDmuP5NativeFail(data, 'trio', '019D-off-for-inactive-tower', { id });
    delete state.activeTowerIds[id];
  }
  list.push(id);
  const finalCleanup = state.wave === 3;
  const maximumOn = finalCleanup ? 0 : 4;
  const maximumOff = state.wave === 0 ? 0 : 4;
  if (state.batch.on.length > maximumOn || state.batch.off.length > maximumOff)
    return myDmuP5NativeFail(data, 'trio', '019D-batch-overflow', state.batch);
  if (finalCleanup && state.batch.off.length === 4) {
    state.batch.finalized = true;
    state.armed = false;
    myDmuP5NativeClearMechanism(data, 'trio', '019D-final-off');
    return true;
  }
  const expectedOff = state.wave === 0 ? 0 : 4;
  if (state.batch.on.length === 4 && state.batch.off.length === expectedOff)
    return myDmuP5NativeAdvanceTrioWave(data, `019D-wave-${state.wave + 1}`);
  return true;
};

const myDmuP5NativeTrioCanonicalBases = (state) => {
  const result = {};
  for (const element of ['fire', 'ice', 'thunder']) {
    const tower = Object.values(state.towers)
      .filter((entry) => entry.element === element)
      .sort((left, right) => left.heading - right.heading || left.id.localeCompare(right.id))[0];
    if (tower === undefined)
      return undefined;
    result[element] = tower.id;
  }
  return result;
};

const myDmuP5NativeTrioNextLitTower = (state, baseId) => {
  const ordered = Object.values(state.towers)
    .sort((left, right) => left.heading - right.heading || left.id.localeCompare(right.id));
  const baseIndex = ordered.findIndex((tower) => tower.id === baseId);
  if (baseIndex < 0)
    return undefined;
  for (let offset = 1; offset <= ordered.length; offset++) {
    const index = (baseIndex - offset + ordered.length) % ordered.length;
    if (state.activeTowerIds[ordered[index].id])
      return ordered[index];
  }
  return undefined;
};

const myDmuP5NativeRenderTrioGuide = (data, reason) => {
  const state = myDmuP5NativeState(data).trio;
  if (state.invalid || state.wave < 1 || state.wave > 3 || state.currentTarget === undefined)
    return false;
  const scope = `p5.trio.w${state.wave}`;
  for (const other of myDmuP5NativeMechanismScopes('trio')) {
    if (other !== scope)
      myDmuNativeVfxClearScope(data, other, `promote-trio-wave-${state.wave}`);
  }
  if (!myDmuNativeVfxPersonalGuideEnabled(data))
    return myDmuNativeVfxClearScope(data, scope, `${reason}:guide-disabled`);
  const ownId = myDmuP5NativeOwnActorId(data);
  const target = state.currentTarget;
  return myDmuNativeVfxReplaceScope(data, scope, (vfx) => [myDmuNativeVfxCreateArrow(vfx, {
    id: `${scope}.guide.${state.currentBranch}.${ownId}`,
    type: 'arrow',
    classification: 'guide',
    durationSeconds: 8,
    from: myDmuNativeVfxEntityAnchor(ownId),
    to: myDmuNativeVfxWorldAnchor(target.x, target.z),
    width: 0.08,
    headLength: 0.65,
    headWidth: 0.55,
    style: myDmuNativeVfxThinGuideStyle(),
  })], reason);
};

const myDmuP5NativeAdvanceTrioWave = (data, reason) => {
  const state = myDmuP5NativeState(data).trio;
  const wave = state.wave + 1;
  const expectedOff = wave === 1 ? 0 : 4;
  if (state.invalid || !myDmuP5NativeTrioReady(data, state) || state.batch === undefined ||
      state.batch.finalized || state.batch.on.length !== 4 ||
      state.batch.off.length !== expectedOff ||
      Object.keys(state.activeTowerIds).length !== 4 || wave > 3) {
    return myDmuP5NativeFail(data, 'trio', 'incomplete-019D-wave', {
      wave,
      batch: state.batch,
      active: Object.keys(state.activeTowerIds),
    });
  }
  const canonical = myDmuP5NativeTrioCanonicalBases(state);
  if (canonical === undefined)
    return myDmuP5NativeFail(data, 'trio', 'canonical-base-incomplete', state.towers);
  if (Object.keys(state.bases).length === 0)
    state.bases = { ...canonical };
  const assignments = {};
  const used = new Set();
  const nextBases = {};
  for (const element of ['fire', 'ice', 'thunder']) {
    const tower = myDmuP5NativeTrioNextLitTower(state, state.bases[element]);
    if (tower === undefined || used.has(tower.id))
      return myDmuP5NativeFail(data, 'trio', 'element-tower-assignment-ambiguous', {
        element,
        bases: state.bases,
        active: Object.keys(state.activeTowerIds),
      });
    assignments[element] = tower;
    used.add(tower.id);
    nextBases[element] = canonical[tower.element];
  }
  const idleTowers = Object.keys(state.activeTowerIds)
    .filter((id) => !used.has(id))
    .map((id) => state.towers[id]);
  if (idleTowers.length !== 1)
    return myDmuP5NativeFail(data, 'trio', 'idle-tower-not-unique', idleTowers);
  assignments.idle = idleTowers[0];

  const ownId = myDmuP5NativeOwnActorId(data);
  const partyIds = myDmuNativeVfxPartyActorIds(data);
  const branch = state.buffs[ownId] ?? (partyIds.includes(ownId) ? 'idle' : undefined);
  const target = assignments[branch];
  if (target === undefined)
    return myDmuP5NativeFail(data, 'trio', 'local-branch-target-missing', {
      branch,
      assignments,
    });
  state.wave = wave;
  state.bases = nextBases;
  state.batch.finalized = true;
  state.currentBranch = branch;
  state.currentTarget = target;
  return myDmuP5NativeRenderTrioGuide(data, reason);
};

const myDmuP5NativeRenderTrioChoice = (data, matches) => {
  const state = myDmuP5NativeState(data).trio;
  const bossId = myDmuNormalizeActorId(matches.sourceId);
  const boundBossId = myDmuP5NativeState(data).repeater.bossActorId;
  const actionId = matches.id?.toString().toUpperCase();
  if (state.invalid || state.wave < 1 || state.wave > 3 || state.currentTarget === undefined ||
      !/^4[0-9A-F]{7}$/u.test(bossId ?? '') || bossId !== boundBossId ||
      !['C24E', 'C24F'].includes(actionId)) {
    return myDmuP5NativeFail(data, 'trio', 'choice-input-invalid', {
      wave: state.wave,
      bossId,
      boundBossId,
      actionId,
    });
  }
  const scope = `p5.trio.w${state.wave}`;
  const ownId = myDmuP5NativeOwnActorId(data);
  const target = state.currentTarget;
  const distance = Math.hypot(target.x - 100, target.z - 100);
  const guideRadius = actionId === 'C24E' ? 11 : 8;
  const choiceTarget = {
    x: 100 + (target.x - 100) / distance * guideRadius,
    z: 100 + (target.z - 100) / distance * guideRadius,
  };
  const rendered = myDmuNativeVfxReplaceScope(data, scope, (vfx) => {
    const base = {
      id: `${scope}.choice.${actionId.toLowerCase()}.${bossId}`,
      classification: 'danger',
      durationSeconds: 5,
      anchor: myDmuNativeVfxEntityAnchor(bossId),
      style: myDmuNativeVfxStyles.dangerAlt,
    };
    const danger = actionId === 'C24E'
      ? vfx.createCircle({ ...base, type: 'circle', radius: 10 })
      : vfx.createDonut({ ...base, type: 'donut', innerRadius: 10, outerRadius: 25 });
    const drawings = [danger];
    if (myDmuNativeVfxPersonalGuideEnabled(data)) {
      drawings.push(myDmuNativeVfxCreateArrow(vfx, {
        id: `${scope}.guide.${state.currentBranch}.${ownId}`,
        type: 'arrow',
        classification: 'guide',
        durationSeconds: 5,
        from: myDmuNativeVfxEntityAnchor(ownId),
        to: myDmuNativeVfxWorldAnchor(choiceTarget.x, choiceTarget.z),
        width: 0.08,
        headLength: 0.65,
        headWidth: 0.55,
        style: myDmuNativeVfxThinGuideStyle(),
      }));
    }
    return drawings;
  }, `${actionId}-wave-${state.wave}`);
  if (!rendered)
    return false;
  state.lastChoiceAction = actionId;
  state.lastChoiceBossId = bossId;
  return true;
};

const myDmuP5NativeResolveTrioChoice = (data, matches) => {
  const state = myDmuP5NativeState(data).trio;
  if (state.invalid || state.wave < 1 || state.wave > 3)
    return false;
  const actionId = matches.id?.toString().toUpperCase();
  if (!['C24E', 'C24F'].includes(actionId))
    return false;
  const scope = `p5.trio.w${state.wave}`;
  if (!myDmuNativeVfxPersonalGuideEnabled(data))
    return myDmuNativeVfxClearScope(data, scope, `${actionId}-resolved`);
  return myDmuP5NativeRenderTrioGuide(data, `${actionId}-resolved-keep-guide`);
};

const myDmuP5NativeGroundFireCount = (data) => {
  const value = Number(myDmuConfigValue(data, 'MyDMU_P5GroundFireCount', '3'));
  return Number.isInteger(value) && value >= 0 && value <= 7 ? value : undefined;
};

const myDmuP5NativeGroundFireGuideEnabled = (data) =>
  myDmuBooleanConfig(data, 'MyDMU_P5GroundFireGuideEnabled', true) &&
  myDmuNativeVfxPersonalGuideEnabled(data);

const myDmuP5NativeGroundClock = (data, options = {}) => {
  const replay = myDmuFl(data)?.getArrReplayClock?.();
  const clock = myDmuNativeVfxSyncClock(data);
  if (replay?.active === true && Number.isSafeInteger(replay.generation) &&
      Number.isSafeInteger(replay.replayMs)) {
    const generation = Number.isSafeInteger(Number(options.generation))
      ? Number(options.generation)
      : replay.generation;
    return {
      now: Number.isFinite(Number(options.replayMs)) ? Number(options.replayMs) : replay.replayMs,
      key: `arr:${generation}`,
      playbackRate: Number.isFinite(Number(options.playbackRate))
        ? Number(options.playbackRate)
        : Number(replay.playbackRate ?? 1),
    };
  }
  const timestamp = Date.parse(options.timestamp ?? '');
  return {
    now: Number.isFinite(timestamp) ? timestamp : clock.now,
    key: 'live',
    playbackRate: 1,
  };
};

const myDmuP5NativeResetGroundFire = (data, matches = {}) => {
  const previous = myDmuP5NativeState(data).groundFire;
  if (previous.invalid)
    return false;
  if (previous.renderTimer !== undefined)
    clearTimeout(previous.renderTimer);
  myDmuP5NativeClearMechanism(data, 'repeater', 'BB3B-enter-ground-fire');
  myDmuP5NativeState(data).repeater.activeScope = undefined;
  myDmuP5NativeClearMechanism(data, 'groundFire', 'ground-fire-reset');
  const clock = myDmuP5NativeGroundClock(data, matches);
  myDmuP5NativeState(data).groundFire = {
    invalid: false,
    armed: true,
    clockKey: clock.key,
    casts: [],
    castKeys: {},
    castGroups: [],
    occurrences: [],
    startedKeys: {},
    advanceKeys: {},
    advanceChain: Promise.resolve(),
    renderTimer: undefined,
    guide: undefined,
  };
  const state = myDmuP5NativeState(data).groundFire;
  if (myDmuP5NativeGroundFireGuideEnabled(data)) {
    const ownRole = myDmuP5NativeRoleForActorId(data, myDmuP5NativeOwnActorId(data));
    const guidePosition = myDmuP5NativeGroundFireGuidePositions[ownRole];
    if (guidePosition === undefined)
      return myDmuP5NativeFail(data, 'groundFire', 'local-role-missing-for-guide', {
        ownRole,
      });
    state.guide = {
      ...guidePosition,
      role: ownRole,
      seen: {},
      relations: [],
      points: [],
      hits: [],
      pointTriggers: [],
      currentPointIndex: undefined,
      initialDone: false,
      halfDone: false,
      done: false,
    };
  }
  if (myDmuP5NativeGroundFireCount(data) === undefined)
    return myDmuP5NativeFail(data, 'groundFire', 'invalid-ground-count-config', {
      value: myDmuConfigValue(data, 'MyDMU_P5GroundFireCount', '3'),
    });
  return true;
};

const myDmuP5NativeGroundFirePointInHit = (point, hit) => {
  const dx = point.x - hit.x;
  const dz = point.z - hit.z;
  return dx * dx + dz * dz < hit.radius * hit.radius;
};

const myDmuP5NativeUpdateGroundFirePointTriggers = (guide) => {
  let nextOrder;
  guide.pointTriggers = [];
  for (let index = guide.points.length - 1; index >= 0; index--) {
    let triggerOrder;
    for (const hit of guide.hits) {
      if ((nextOrder === undefined || hit.order < nextOrder) &&
          myDmuP5NativeGroundFirePointInHit(guide.points[index], hit) &&
          (triggerOrder === undefined || hit.order > triggerOrder))
        triggerOrder = hit.order;
    }
    guide.pointTriggers[index] = triggerOrder ?? 0;
    nextOrder = guide.pointTriggers[index];
  }
};

const myDmuP5NativeGroundFireTriggerResolved = (guide, pointIndex) => {
  const triggerOrder = guide.pointTriggers[pointIndex];
  if (triggerOrder === undefined)
    return false;
  if (triggerOrder === 0)
    return true;
  let found = false;
  for (const hit of guide.hits) {
    if (hit.order !== triggerOrder ||
        !myDmuP5NativeGroundFirePointInHit(guide.points[pointIndex], hit))
      continue;
    found = true;
    if (!hit.resolved)
      return false;
  }
  return found;
};

const myDmuP5NativeUpdateGroundFireCurrentPoint = (guide) => {
  let pointIndex;
  for (let index = 0; index < guide.points.length; index++) {
    if (!myDmuP5NativeGroundFireTriggerResolved(guide, index))
      break;
    pointIndex = index;
  }
  guide.currentPointIndex = pointIndex;
};

const myDmuP5NativeSetGroundFireGuideRoute = (guide, points) => {
  guide.points = points;
  myDmuP5NativeUpdateGroundFirePointTriggers(guide);
  myDmuP5NativeUpdateGroundFireCurrentPoint(guide);
};

const myDmuP5NativeAppendGroundFireGuideRoute = (guide, points) => {
  guide.points.push(...points);
  myDmuP5NativeUpdateGroundFirePointTriggers(guide);
  myDmuP5NativeUpdateGroundFireCurrentPoint(guide);
};

const myDmuP5NativeGroundFireDirectionFromPair = (left, right) => {
  if (left === 1 && right === 1)
    return 3;
  if (left === 1 && right === 2)
    return 0;
  if (left === 2 && right === 1)
    return 2;
  if (left === 2 && right === 2)
    return 1;
  return undefined;
};

const myDmuP5NativeGroundFireCardinalPoints = (x, z, direction, clockwise) => {
  if (direction === 0) {
    return [
      { x, z: z - 5 },
      clockwise ? { x: x + 5, z } : { x: x - 5, z },
      { x, z: z + 5 },
    ];
  }
  if (direction === 1) {
    return [
      { x: x - 5, z },
      clockwise ? { x, z: z - 5 } : { x, z: z + 5 },
      { x: x + 5, z },
    ];
  }
  if (direction === 2) {
    return [
      { x, z: z + 5 },
      clockwise ? { x: x - 5, z } : { x: x + 5, z },
      { x, z: z - 5 },
    ];
  }
  if (direction === 3) {
    return [
      { x: x + 5, z },
      clockwise ? { x, z: z + 5 } : { x, z: z - 5 },
      { x: x - 5, z },
    ];
  }
  return [];
};

const myDmuP5NativeGroundFireDiagonalPoint = (x, z, direction) => ({
  x: x + (direction === 0 || direction === 1 ? -2.5 : 2.5),
  z: z + (direction === 0 || direction === 3 ? -2.5 : 2.5),
});

const myDmuP5NativeTryBuildGroundFireRoute = (guide) => {
  const relations = guide.relations;
  const count = relations.length;
  const isRelation = (value) => value === 1 || value === 2;
  const buildFull = (direction, clockwise) => {
    if (direction === undefined || guide.done)
      return;
    guide.done = true;
    myDmuP5NativeSetGroundFireGuideRoute(
      guide,
      myDmuP5NativeGroundFireCardinalPoints(guide.x, guide.z, direction, clockwise),
    );
  };

  if (count > 0 && count <= 3 && isRelation(relations[count - 1]) && !guide.initialDone) {
    const relation = relations[count - 1];
    const direction = count === 2
      ? relation === 1 ? 2 : 0
      : relation === 1 ? 3 : 1;
    guide.initialDone = true;
    myDmuP5NativeSetGroundFireGuideRoute(guide, [
      myDmuP5NativeGroundFireDiagonalPoint(guide.x, guide.z, direction),
    ]);
  }

  if (count === 2) {
    if (isRelation(relations[0]) && isRelation(relations[1])) {
      buildFull(
        myDmuP5NativeGroundFireDirectionFromPair(relations[0], relations[1]),
        relations[0] === relations[1],
      );
    } else if (isRelation(relations[0]) && relations[1] === 0 && !guide.halfDone) {
      const direction = relations[0] === 1 ? 3 : 1;
      guide.halfDone = true;
      myDmuP5NativeSetGroundFireGuideRoute(guide, [
        myDmuP5NativeGroundFireDiagonalPoint(guide.x, guide.z, direction),
        myDmuP5NativeGroundFireDiagonalPoint(guide.x, guide.z, (direction + 2) % 4),
      ]);
    }
  } else if (count === 3 && relations[0] === 0 &&
      isRelation(relations[1]) && isRelation(relations[2])) {
    buildFull(
      myDmuP5NativeGroundFireDirectionFromPair(relations[2], relations[1]),
      relations[1] !== relations[2],
    );
  } else if (count === 4) {
    if (relations[0] === 0 && relations[1] === 0 &&
        isRelation(relations[2]) && isRelation(relations[3])) {
      buildFull(
        myDmuP5NativeGroundFireDirectionFromPair(relations[2], relations[3]),
        relations[2] === relations[3],
      );
    } else if (isRelation(relations[0]) && relations[1] === 0 &&
        isRelation(relations[3]) && !guide.done) {
      const points = myDmuP5NativeGroundFireCardinalPoints(
        guide.x,
        guide.z,
        myDmuP5NativeGroundFireDirectionFromPair(relations[0], relations[3]),
        relations[0] === relations[3],
      );
      guide.done = true;
      myDmuP5NativeAppendGroundFireGuideRoute(guide, [points[1], points[2]]);
    }
  }
};

const myDmuP5NativeRecordGroundFireGuideLine = (data, state, line) => {
  const guide = state.guide;
  if (guide === undefined || !myDmuP5NativeGroundFireGuideEnabled(data))
    return;
  if (guide.seen[line.ordinal])
    return;
  guide.seen[line.ordinal] = true;
  for (let step = 0; step < line.points.length; step++) {
    const point = line.points[step];
    guide.hits.push({
      lineOrdinal: line.ordinal,
      step,
      order: line.group * 10 + step,
      x: point.x,
      z: point.z,
      radius: line.radius,
      resolved: false,
    });
  }
  myDmuP5NativeUpdateGroundFirePointTriggers(guide);
  myDmuP5NativeUpdateGroundFireCurrentPoint(guide);

  const column = ((Math.floor((line.x - 70) / 5 + 0.5) % 7) + 7) % 7 + 1;
  if (column > 3)
    return;
  const candidateColumn = line.x < 100 ? guide.left : guide.right;
  const relation = ((column + 1 - candidateColumn) % 3 + 3) % 3;
  guide.relations.push(relation);
  myDmuP5NativeTryBuildGroundFireRoute(guide);
};

const myDmuP5NativeMarkGroundFireGuideResolved = (state, line, resolvedStep) => {
  const guide = state.guide;
  if (guide === undefined)
    return;
  for (const hit of guide.hits) {
    if (hit.lineOrdinal === line.ordinal && hit.step <= resolvedStep - 1)
      hit.resolved = true;
  }
  myDmuP5NativeUpdateGroundFirePointTriggers(guide);
  myDmuP5NativeUpdateGroundFireCurrentPoint(guide);
};

const myDmuP5NativeRecordGroundFireCast = (data, matches) => {
  const state = myDmuP5NativeState(data).groundFire;
  if (state.invalid)
    return false;
  if (!state.armed)
    return myDmuP5NativeFail(data, 'groundFire', 'cast-before-reset', matches);
  const actorId = myDmuNormalizeActorId(matches.sourceId);
  const x = myDmuNumber(matches.x);
  const z = myDmuNumber(matches.y ?? matches.z);
  const heading = myDmuNumber(matches.heading);
  const eventAt = myDmuP5NativeEventMilliseconds(data, matches);
  const occurrenceKey = `${eventAt}:${actorId}`;
  if (!/^4[0-9A-F]{7}$/u.test(actorId ?? '') ||
      ![x, z, heading].every(Number.isFinite))
    return myDmuP5NativeFail(data, 'groundFire', 'malformed-BB3C-cast', {
      actorId,
      x,
      z,
      heading,
    });
  if (state.castKeys[occurrenceKey])
    return myDmuP5NativeFail(data, 'groundFire', 'duplicate-cast-occurrence', {
      occurrenceKey,
    });
  if (state.casts.length >= 12)
    return myDmuP5NativeFail(data, 'groundFire', 'extra-cast-occurrence', { occurrenceKey });
  let group = state.castGroups[state.castGroups.length - 1];
  if (group === undefined || eventAt - group.lastAt > myDmuP5NativeGroundFireGroupWindowMs) {
    if (group !== undefined && group.entries.length !== 2)
      return myDmuP5NativeFail(data, 'groundFire', 'incomplete-cast-pair', group);
    if (state.castGroups.length >= 6)
      return myDmuP5NativeFail(data, 'groundFire', 'extra-cast-group', { eventAt });
    group = {
      ordinal: state.castGroups.length + 1,
      firstAt: eventAt,
      lastAt: eventAt,
      entries: [],
    };
    state.castGroups.push(group);
  } else {
    if (eventAt < group.lastAt)
      return myDmuP5NativeFail(data, 'groundFire', 'cast-time-regressed', {
        eventAt,
        lastAt: group.lastAt,
      });
    group.lastAt = eventAt;
  }
  if (group.entries.length >= 2)
    return myDmuP5NativeFail(data, 'groundFire', 'cast-pair-overflow', group);
  const ordinal = state.casts.length + 1;
  const points = Array.from({ length: 7 }, (_unused, index) => ({
    x: x + Math.sin(heading) * myDmuP5NativeGroundFireSpacing * index,
    z: z + Math.cos(heading) * myDmuP5NativeGroundFireSpacing * index,
  }));
  const record = {
    actorId,
    occurrenceKey,
    ordinal,
    group: group.ordinal,
    castAt: eventAt,
    x,
    z,
    heading,
    radius: 6,
    points,
    started: false,
    active: false,
    resolvedStep: 0,
  };
  state.castKeys[occurrenceKey] = true;
  state.casts.push(record);
  group.entries.push(ordinal);
  myDmuP5NativeRecordGroundFireGuideLine(data, state, record);
  if (group.entries.length !== 2)
    return true;
  return myDmuP5NativeRenderGroundFire(data, matches);
};

const myDmuP5NativeRenderGroundFire = (data, options = {}) => {
  const state = myDmuP5NativeState(data).groundFire;
  if (state.invalid || !state.armed)
    return false;
  const clock = myDmuP5NativeGroundClock(data, options);
  if (clock.playbackRate !== 1)
    return myDmuP5NativeFail(data, 'groundFire', 'unsupported-playback-rate', clock);
  if (state.clockKey === undefined)
    state.clockKey = clock.key;
  if (state.clockKey !== clock.key) {
    state.armed = false;
    state.occurrences = [];
    myDmuNativeVfxClearScope(data, 'p5.groundFire', 'clock-generation-changed');
    return false;
  }
  const count = myDmuP5NativeGroundFireCount(data);
  if (count === undefined)
    return myDmuP5NativeFail(data, 'groundFire', 'invalid-ground-count-config', undefined);
  const active = state.occurrences.filter((occurrence) => {
    const age = clock.now - occurrence.startedAt;
    return occurrence.active && age >= 0 && age < myDmuP5NativeGroundFireTtlMs;
  });
  return myDmuNativeVfxReplaceScope(data, 'p5.groundFire', (vfx) => {
    const drawings = [];
    for (const occurrence of active) {
      const age = clock.now - occurrence.startedAt;
      const startIndex = occurrence.resolvedStep;
      const endIndex = Math.min(7, startIndex + count);
      for (let index = startIndex; index < endIndex; index++) {
        const point = occurrence.points[index];
        const offset = Math.min(
          index - startIndex,
          myDmuP5NativeGroundFireStylesByOffset.length - 1,
        );
        drawings.push(vfx.createCircle({
          id: `p5.groundFire.o${occurrence.ordinal}.p${index}`,
          type: 'circle',
          classification: 'danger',
          durationSeconds: Math.max(0.5, (myDmuP5NativeGroundFireTtlMs - age) / 1000),
          anchor: myDmuNativeVfxWorldAnchor(point.x, point.z),
          radius: occurrence.radius,
          style: myDmuP5NativeGroundFireStylesByOffset[offset],
        }));
      }
    }
    const dangerCount = drawings.length;
    if (dangerCount > 20)
      throw new Error(`P5 地火危险图元 ${dangerCount} 超过机制硬上限20`);
    const guide = state.guide;
    const guidePoint = guide?.currentPointIndex === undefined
      ? undefined
      : guide.points[guide.currentPointIndex];
    const ownId = myDmuP5NativeOwnActorId(data);
    if (myDmuP5NativeGroundFireGuideEnabled(data) && guidePoint !== undefined &&
        /^1[0-9A-F]{7}$/u.test(ownId ?? '')) {
      drawings.push(myDmuNativeVfxCreateArrow(vfx, {
        id: `p5.groundFire.guide.${ownId}`,
        type: 'arrow',
        classification: 'guide',
        durationSeconds: 8,
        from: myDmuNativeVfxEntityAnchor(ownId),
        to: myDmuNativeVfxWorldAnchor(guidePoint.x, guidePoint.z),
        width: 0.08,
        headLength: 0.65,
        headWidth: 0.55,
        style: myDmuNativeVfxThinGuideStyle(),
      }));
    }
    if (drawings.length > 21)
      throw new Error(`P5 地火总图元 ${drawings.length} 超过机制硬上限21`);
    return drawings;
  }, `ground-fire-event-${clock.now}`);
};

const myDmuP5NativeStartGroundFireOccurrence = (data, matches) => {
  const state = myDmuP5NativeState(data).groundFire;
  if (state.invalid)
    return false;
  if (!state.armed)
    return myDmuP5NativeFail(data, 'groundFire', 'ability-before-reset', matches);
  const clock = myDmuP5NativeGroundClock(data, matches);
  if (clock.playbackRate !== 1 || state.clockKey !== clock.key)
    return myDmuP5NativeFail(data, 'groundFire', 'unsupported-clock-state', clock);
  const actorId = myDmuNormalizeActorId(matches.sourceId);
  const abilityAt = myDmuP5NativeEventMilliseconds(data, matches);
  const abilityKey = `${abilityAt}:${actorId}`;
  if (state.startedKeys[abilityKey])
    return myDmuP5NativeFail(data, 'groundFire', 'duplicate-ability-occurrence', { abilityKey });
  const pending = state.casts
    .filter((record) => record.actorId === actorId && !record.started && record.castAt <= abilityAt)
    .sort((left, right) => left.castAt - right.castAt);
  if (pending.length !== 1)
    return myDmuP5NativeFail(data, 'groundFire', 'missing-or-ambiguous-ability-pair', {
      actorId,
      abilityAt,
      pending: pending.map((record) => record.occurrenceKey),
    });
  const record = pending[0];
  record.started = true;
  record.active = true;
  record.startedAt = abilityAt;
  record.resolvedStep = 1;
  state.startedKeys[abilityKey] = true;
  state.occurrences.push(record);
  myDmuP5NativeMarkGroundFireGuideResolved(state, record, record.resolvedStep);
  const rendered = myDmuP5NativeRenderGroundFire(data, {
    replayMs: abilityAt,
    generation: Number(clock.key.split(':')[1]),
    playbackRate: clock.playbackRate,
    timestamp: matches.timestamp,
  });
  if (!rendered && myDmuP5NativeGroundFireCount(data) !== 0)
    return false;
  return true;
};

const myDmuP5NativeAdvanceGroundFire = (data, matches) => {
  const state = myDmuP5NativeState(data).groundFire;
  if (state.invalid)
    return false;
  if (!state.armed)
    return myDmuP5NativeFail(data, 'groundFire', 'BB3D-before-reset', matches);
  const actorId = myDmuNormalizeActorId(matches.sourceId);
  const eventAt = myDmuP5NativeEventMilliseconds(data, matches);
  if (!/^4[0-9A-F]{7}$/u.test(actorId ?? ''))
    return myDmuP5NativeFail(data, 'groundFire', 'malformed-BB3D-source', { actorId });
  const advanceKey = `${eventAt}:${actorId}`;
  if (state.advanceKeys[advanceKey])
    return myDmuP5NativeFail(data, 'groundFire', 'duplicate-BB3D-occurrence', { advanceKey });
  state.advanceKeys[advanceKey] = true;
  const query = myDmuQueryCombatants(data, [actorId], 'p5.groundFire.BB3D');
  const expectedState = state;
  state.advanceChain = (state.advanceChain ?? Promise.resolve())
    .catch(() => undefined)
    .then(async () => {
      let combatants;
      try {
        combatants = await query;
      } catch (error) {
        if (myDmuP5NativeState(data).groundFire !== expectedState || !expectedState.armed)
          return false;
        return myDmuP5NativeFail(data, 'groundFire', 'BB3D-combatant-query-failed', `${error}`);
      }
      if (myDmuP5NativeState(data).groundFire !== expectedState || !expectedState.armed)
        return false;
      if (!Array.isArray(combatants) || combatants.length !== 1)
        return myDmuP5NativeFail(data, 'groundFire', 'BB3D-combatant-query-not-exact', {
          actorId,
          count: combatants?.length,
        });
      const combatant = combatants[0];
      const returnedId = myDmuNormalizeActorId(combatant?.ID ?? combatant?.Id);
      const x = Number(combatant?.PosX);
      const z = Number(combatant?.PosY ?? combatant?.PosZ);
      if (returnedId !== actorId || ![x, z].every(Number.isFinite))
        return myDmuP5NativeFail(data, 'groundFire', 'BB3D-combatant-snapshot-invalid', {
          actorId,
          returnedId,
          x,
          z,
        });
      const candidates = expectedState.occurrences.map((line) => {
        const point = line.points[line.resolvedStep];
        if (!line.active || point === undefined)
          return undefined;
        const dx = point.x - x;
        const dz = point.z - z;
        const distanceSquared = dx * dx + dz * dz;
        return distanceSquared <= myDmuP5NativeGroundFireMatchDistanceSquared
          ? { line, distanceSquared }
          : undefined;
      }).filter(Boolean).sort((left, right) =>
        left.line.group - right.line.group ||
        left.distanceSquared - right.distanceSquared ||
        left.line.ordinal - right.line.ordinal);
      if (candidates.length === 0)
        return myDmuP5NativeFail(data, 'groundFire', 'BB3D-line-match-missing', {
          actorId,
          x,
          z,
        });
      const line = candidates[0].line;
      line.resolvedStep++;
      myDmuP5NativeMarkGroundFireGuideResolved(expectedState, line, line.resolvedStep);
      if (expectedState.renderTimer !== undefined)
        clearTimeout(expectedState.renderTimer);
      const renderMatches = { ...matches };
      expectedState.renderTimer = setTimeout(() => {
        expectedState.renderTimer = undefined;
        if (myDmuP5NativeState(data).groundFire !== expectedState || !expectedState.armed)
          return;
        myDmuP5NativeRenderGroundFire(data, renderMatches);
      }, 16);
      return true;
    });
  return state.advanceChain;
};

const myDmuP5NativeStartVortex = async (data, matches = {}) => {
  const state = myDmuP5NativeState(data).vortex;
  if (state.invalid)
    return false;
  const actionId = matches.id?.toString().toUpperCase();
  if (!['BB3E', 'BB3F'].includes(actionId))
    return myDmuP5NativeFail(data, 'vortex', 'unsupported-entry-action', { actionId });
  const expectedParty = myDmuNativeVfxPartyActorIds(data);
  const supplied = Array.isArray(matches.partyIds)
    ? matches.partyIds.map(myDmuNormalizeActorId)
    : expectedParty;
  const ids = [...new Set(supplied)];
  if (expectedParty.length !== 8 || ids.length !== 8 || supplied.length !== 8 ||
      ids.some((id) => !expectedParty.includes(id))) {
    return myDmuP5NativeFail(data, 'vortex', 'party-incomplete-or-duplicate', {
      expectedParty,
      supplied,
    });
  }
  const occurrence = `${actionId}:${myDmuP5NativeEventMilliseconds(data, matches)}`;
  const generation = (state.generation ?? 0) + 1;
  state.generation = generation;
  state.active = true;
  state.pending = true;
  state.entryAction = actionId;
  state.occurrence = occurrence;
  state.partyIds = [...ids];
  state.spreadTargetIds = {};
  state.visualResolved = false;
  let combatantIds;
  try {
    const combatants = await myDmuQueryCombatants(data, ids, 'p5.vortex');
    combatantIds = combatants
      .map((combatant) => myDmuNormalizeActorId(combatant?.ID ?? combatant?.Id));
  } catch (error) {
    if (myDmuP5NativeState(data).vortex !== state || state.generation !== generation ||
        !state.active || state.occurrence !== occurrence)
      return false;
    return myDmuP5NativeFail(data, 'vortex', 'party-query-failed', `${error}`);
  }
  if (myDmuP5NativeState(data).vortex !== state || state.generation !== generation ||
      !state.active || state.occurrence !== occurrence)
    return false;
  if (combatantIds.length !== 8 || new Set(combatantIds).size !== 8 ||
      ids.some((id) => !combatantIds.includes(id)))
    return myDmuP5NativeFail(data, 'vortex', 'party-member-despawned', combatantIds);

  state.pending = false;
  return myDmuNativeVfxReplaceScope(data, 'p5.vortex', (vfx) => ids.map((id) =>
    vfx.createCircle({
      id: `p5.vortex.spread.${id}`,
      type: 'circle',
      classification: 'danger',
      durationSeconds: 5.2,
      anchor: myDmuNativeVfxEntityAnchor(id),
      radius: 5,
      style: myDmuNativeVfxStyles.dangerAlt,
    })), `${actionId}-start`);
};

const myDmuP5NativeResolveVortex = (data, matches = {}) => {
  const state = myDmuP5NativeState(data).vortex;
  if (state.invalid)
    return false;
  const actionId = matches.id?.toString().toUpperCase();
  const resolvesEntry = actionId !== undefined && actionId === state.entryAction &&
    !state.visualResolved;
  if (resolvesEntry) {
    state.generation = (state.generation ?? 0) + 1;
    state.pending = false;
    state.visualResolved = true;
    const cleared = myDmuNativeVfxClearScope(data, 'p5.vortex', `${actionId}-resolve`);
    if (actionId !== 'BB3F')
      return cleared;
  }
  if (actionId !== 'BB3F')
    return false;
  if (!state.active || !Array.isArray(state.partyIds) || state.partyIds.length !== 8)
    return myDmuP5NativeFail(data, 'vortex', 'BB3F-before-BB3E-start', matches);
  const targets = Array.isArray(matches.targetIds)
    ? matches.targetIds.map(myDmuNormalizeActorId)
    : [myDmuNormalizeActorId(matches.targetId)].filter(Boolean);
  for (const targetId of targets) {
    if (!state.partyIds.includes(targetId))
      return myDmuP5NativeFail(data, 'vortex', 'BB3F-target-not-in-party', { targetId });
    state.spreadTargetIds[targetId] = true;
  }
  const completeSignal = targets.length === 8 || Object.keys(state.spreadTargetIds).length === 8;
  if (!completeSignal)
    return true;
  const seen = Object.keys(state.spreadTargetIds);
  if (seen.length !== 8 || state.partyIds.some((id) => !state.spreadTargetIds[id]))
    return myDmuP5NativeFail(data, 'vortex', 'BB3F-party-spread-incomplete', seen);
  state.active = false;
  state.occurrence = undefined;
  state.generation = (state.generation ?? 0) + 1;
  return myDmuNativeVfxClearScope(data, 'p5.vortex', 'BB3F-complete');
};

const myDmuP5NativeForsakenStart = (data) => {
  const value = Number(myDmuConfigValue(data, 'MyDMU_P5ForsakenStart', '1'));
  return [1, 2, 3, 4].includes(value) ? value : undefined;
};

const myDmuP5NativeForsakenPoint = (start, wave) => {
  const heading = -Math.PI / 4 + (start - 1) * Math.PI / 2 - (wave - 1) * Math.PI / 2;
  return {
    x: 100 + Math.sin(heading) * 9.5,
    z: 100 + Math.cos(heading) * 9.5,
  };
};

const myDmuP5NativeRenderForsaken = (data, reason) => {
  const state = myDmuP5NativeState(data).forsaken;
  const start = myDmuP5NativeForsakenStart(data);
  if (state.invalid || !state.active || state.wave < 1 || state.wave > 5)
    return false;
  if (start === undefined)
    return myDmuP5NativeFail(data, 'forsaken', 'invalid-start-config', {
      value: myDmuConfigValue(data, 'MyDMU_P5ForsakenStart', '1'),
    });
  if (!myDmuBooleanConfig(data, 'MyDMU_P5ForsakenGuideEnabled', true) ||
      !myDmuNativeVfxPersonalGuideEnabled(data)) {
    myDmuP5NativeClearMechanism(data, 'forsaken', `${reason}:guide-disabled`);
    return false;
  }
  const ownId = myDmuP5NativeOwnActorId(data);
  if (!/^1[0-9A-F]{7}$/u.test(ownId ?? ''))
    return myDmuP5NativeFail(data, 'forsaken', 'local-player-id-missing', undefined);
  const scope = `p5.forsaken.${state.wave}`;
  for (const other of myDmuP5NativeMechanismScopes('forsaken')) {
    if (other !== scope)
      myDmuNativeVfxClearScope(data, other, `promote-forsaken-wave-${state.wave}`);
  }
  const point = myDmuP5NativeForsakenPoint(start, state.wave);
  return myDmuNativeVfxReplaceScope(data, scope, (vfx) => [myDmuNativeVfxCreateArrow(vfx, {
    id: `${scope}.guide.${ownId}`,
    type: 'arrow',
    classification: 'guide',
    durationSeconds: 12,
    from: myDmuNativeVfxEntityAnchor(ownId),
    to: myDmuNativeVfxWorldAnchor(point.x, point.z),
    width: 0.08,
    headLength: 0.65,
    headWidth: 0.55,
    style: myDmuNativeVfxThinGuideStyle(),
  })], reason);
};

const myDmuP5NativeStartForsaken = (data, matches = {}) => {
  const previous = myDmuP5NativeState(data).forsaken;
  if (previous.invalid || previous.active)
    return previous.invalid
      ? false
      : myDmuP5NativeFail(data, 'forsaken', 'duplicate-start', matches);
  myDmuP5NativeClearMechanism(data, 'repeater', 'BB35-enter-forsaken');
  myDmuP5NativeState(data).repeater.activeScope = undefined;
  myDmuP5NativeClearMechanism(data, 'forsaken', 'forsaken-start');
  const start = myDmuP5NativeForsakenStart(data);
  if (start === undefined)
    return myDmuP5NativeFail(data, 'forsaken', 'invalid-start-config', undefined);
  myDmuP5NativeState(data).forsaken = {
    invalid: false,
    active: true,
    wave: 1,
    startedAt: myDmuP5NativeEventMilliseconds(data, matches),
    lastAt: myDmuP5NativeEventMilliseconds(data, matches),
    seenAdvances: {},
  };
  return myDmuP5NativeRenderForsaken(data, 'BB35-wave-1');
};

const myDmuP5NativeAdvanceForsaken = (data, matches) => {
  const state = myDmuP5NativeState(data).forsaken;
  if (state.invalid)
    return false;
  if (!state.active || state.wave < 1)
    return myDmuP5NativeFail(data, 'forsaken', 'advance-before-start', matches);
  const eventAt = myDmuP5NativeEventMilliseconds(data, matches);
  const sourceId = myDmuNormalizeActorId(matches.sourceId);
  const occurrence = `${eventAt}:${sourceId}`;
  if (state.seenAdvances[occurrence])
    return myDmuP5NativeFail(data, 'forsaken', 'duplicate-advance', { occurrence });
  if (state.wave >= 5)
    return myDmuP5NativeFail(data, 'forsaken', 'extra-advance', { occurrence });
  const elapsed = eventAt - state.lastAt;
  if (elapsed < 6000 || elapsed > 12000)
    return myDmuP5NativeFail(data, 'forsaken', 'missing-or-out-of-order-advance', {
      wave: state.wave,
      elapsed,
      occurrence,
    });
  state.seenAdvances[occurrence] = true;
  state.wave++;
  state.lastAt = eventAt;
  return myDmuP5NativeRenderForsaken(data, `BB38-wave-${state.wave}`);
};

const myDmuP5NativeClearForsaken = (data, reason = 'BB3A') => {
  const state = myDmuP5NativeState(data).forsaken;
  state.active = false;
  return myDmuP5NativeClearMechanism(data, 'forsaken', reason);
};

const myDmuRolePriority = (role, order = myDmuRoleOrder) => {
  const index = order.indexOf(role);
  return index < 0 ? 99 : index;
};

const myDmuRoleGroup = (role) => role?.startsWith('D') ? 'DPS' : 'TN';

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

  data.myDmuP1PoisonMarkerSignature = signature;
  myDmuMarkQueue(data, desired, '绝妖星 P1 5078锁链');
  return true;
};

const myDmuP1CombatantPosX = (combatants, sourceId) => {
  const id = Number.parseInt(sourceId, 16);
  if (!Number.isFinite(id))
    return undefined;
  return combatants.find((combatant) => combatant.ID === id)?.PosX;
};

const myDmuMarkActorKey = (actorId) => typeof actorId === 'string' ? actorId.toUpperCase() : `${actorId}`;

const myDmuNewMarkState = () => ({ markers: {}, actors: {} });

const myDmuEnsureMarkState = (data) => {
  data.myDmuMarkState ??= {};
  data.myDmuMarkState.markers ??= {};
  data.myDmuMarkState.actors ??= {};
  return data.myDmuMarkState;
};

const myDmuChangedMarks = (data, marks) => {
  const state = myDmuEnsureMarkState(data);
  const nextMarkers = { ...state.markers };
  const nextActors = { ...state.actors };
  const changed = [];
  for (const mark of marks) {
    const actorKey = myDmuMarkActorKey(mark.id);
    const currentMarkerActor = nextMarkers[mark.marker];
    const currentActorMarker = nextActors[actorKey];
    if (currentMarkerActor === actorKey && currentActorMarker === mark.marker)
      continue;
    changed.push(mark);
    if (currentActorMarker !== undefined && currentActorMarker !== mark.marker)
      delete nextMarkers[currentActorMarker];
    if (currentMarkerActor !== undefined && currentMarkerActor !== actorKey)
      delete nextActors[currentMarkerActor];
    nextMarkers[mark.marker] = actorKey;
    nextActors[actorKey] = mark.marker;
  }
  data.myDmuMarkState = { markers: nextMarkers, actors: nextActors };
  return changed;
};

const myDmuSendQueueActions = (data, queue, note) => {
  const fl = myDmuFl(data);
  if (fl?.doQueueActions !== undefined) {
    fl.doQueueActions(queue, note);
    return;
  }
  callOverlayHandler({
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

const myDmuMarkQueue = (data, items, note) => {
  if (!myDmuRoleOverlayConnected(data))
    return false;
  const marks = myDmuChangedMarks(data, items.filter(myDmuValidMarkItem));
  if (marks.length === 0)
    return false;

  const localOnly = myDmuMarkLocalOnly(data);
  const queue = marks.map((item) => ({
    c: 'mark',
    p: {
      ActorID: item.id,
      MarkType: item.marker,
      LocalOnly: localOnly,
    },
    d: 0,
  }));
  myDmuSendQueueActions(data, queue, note);
  return true;
};

const myDmuFastMarkQueue = (data, items, note) => {
  if (!myDmuRoleOverlayConnected(data))
    return false;
  const marks = myDmuChangedMarks(data, items.filter(myDmuValidMarkItem));
  if (marks.length === 0)
    return false;

  const localOnly = myDmuMarkLocalOnly(data);
  const queue = marks.map((item) => ({
    c: 'mark',
    p: {
      ActorID: item.id,
      MarkType: item.marker,
      LocalOnly: localOnly,
    },
    d: 0,
  }));
  myDmuSendQueueActions(data, queue, note);
  return true;
};

const myDmuForgetMarkState = (data, items) => {
  const state = myDmuEnsureMarkState(data);
  const nextMarkers = { ...state.markers };
  const nextActors = { ...state.actors };
  for (const item of items) {
    if (!myDmuValidMarkItem(item))
      continue;
    const actorKey = myDmuMarkActorKey(item.id);
    if (nextActors[actorKey] === item.marker)
      delete nextActors[actorKey];
    if (nextMarkers[item.marker] === actorKey)
      delete nextMarkers[item.marker];
  }
  data.myDmuMarkState = { markers: nextMarkers, actors: nextActors };
};

const myDmuClearMarkQueue = (data, items, note) => {
  const marks = items.filter(myDmuValidMarkItem);
  if (marks.length === 0)
    return;

  myDmuForgetMarkState(data, marks);
  const localOnly = myDmuMarkLocalOnly(data);
  const queue = marks.map((item) => ({
    c: 'mark',
    p: {
      ActorID: item.id,
      MarkType: item.marker,
      LocalOnly: localOnly,
    },
    d: 0,
  }));
  myDmuSendQueueActions(data, queue, note);
};

const myDmuClearMarks = (data) => {
  data.myDmuMarkState = myDmuNewMarkState();
  if (!myDmuAnyMarkEnabled(data))
    return;
  const fl = myDmuFl(data);
  if (fl?.clearMark !== undefined) {
    fl.clearMark(myDmuMarkLocalOnly(data));
    return;
  }
  callOverlayHandler({
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
  });
};

const myDmuScheduleClearMarks = (data, key, delaySeconds = 0.5, condition = () => true) => {
  data.myDmuClearMarkTimers ??= {};
  if (data.myDmuClearMarkTimers[key] !== undefined)
    clearTimeout(data.myDmuClearMarkTimers[key]);
  data.myDmuClearMarkTimers[key] = setTimeout(() => {
    delete data.myDmuClearMarkTimers?.[key];
    if (condition(data))
      myDmuClearMarks(data);
  }, delaySeconds * 1000);
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
  data.myDmuP1FireMarkerId = undefined;
  data.myDmuP1FireMarkerTargetIds = [];
  data.myDmuP1WaveCannonTargets = [];
  data.myDmuP1PlaceRock = false;
  data.myDmuP1FirstTethered = false;
  data.myDmuP1Graven2TetherCount = 1;
  data.myDmuP1Graven2SourceX = undefined;
  data.myDmuP1Arrow = [];
  data.myDmuP1Graven3Tethers = [];
  data.myDmuP1Combatants = [];
  data.myDmuP1BeamTargetIds = [];
  data.myDmuP1BeamPartyCombatants = [];
  data.myDmuP1BeamTowers = {};
  myDmuResetP1BeamOrderLatch(data);
  data.myDmuP1ArrowEffectsByActor = {};
  data.myDmuNativeVfxNpcBaseIdByActor = {};
  data.myDmuNativeVfxCombatantByActor = {};
};

const myDmuResetP2 = (data) => {
  if (data.myDmuP2Round8Timer !== undefined) {
    clearTimeout(data.myDmuP2Round8Timer);
    data.myDmuP2Round8Timer = undefined;
  }
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
  data.myDmuP2FuturePastFlip = false;
  data.myDmuP2AllThingsEndingCount = 0;
  data.myDmuP2AllThingsEndingCalloutCount = 0;
  data.myDmuP2LastKickId = undefined;
  data.myDmuP2FarNearTargetIds = [];
  data.myDmuP2Trine = {
    armed: false,
    wave: 0,
    resolvedWave: 0,
    lastOpenAt: undefined,
    actorsByWave: { 1: {}, 2: {}, 3: {} },
    waveByActor: {},
  };
  data.myDmuP2CombatantPositions = {};
  data.myDmuP2TowerRoundCount = 0;
  data.myDmuP2TowerCurrentRound = undefined;
  data.myDmuP2TowerLastAt = undefined;
  data.myDmuP2TowerRounds = {};
  data.myDmuP2TowerFallbackLogs = {};
  data.myDmuP2TowerDecisionLogs = {};
  data.myDmuNativeVfxNpcBaseIdByActor = {};
  data.myDmuNativeVfxCombatantByActor = {};
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

const myDmuNewP3VfxState = () => ({
  bosses: {
    kefkaId: undefined,
    exdeathId: undefined,
    chaosId: undefined,
  },
  elements: {
    objects: {},
    buffs: { fire: {}, water: {} },
    started: { fire: false, water: false },
    graceUntil: { fire: 0, water: 0 },
    exCasting: false,
    fireBuffOrderCaptured: false,
    fireBuffOrder: undefined,
  },
  blackhole: {
    wave: 0,
    guideRevision: 0,
    invalid: false,
    invalidReason: undefined,
    batchOpenedAt: undefined,
    lastWaveClosedAt: undefined,
    batch: {},
    waves: {
      1: { actors: {}, tethers: {} },
      2: { actors: {}, tethers: {} },
      3: { actors: {}, tethers: {} },
      4: { actors: {}, tethers: {} },
    },
    waveByActor: {},
  },
  tower: {
    targets: [],
    snapshots: [],
    bb0dCount: 0,
    baf0Count: 0,
    bb06Count: 0,
  },
});

const myDmuResetP3Vfx = (data) => {
  data.myDmuP3Vfx = myDmuNewP3VfxState();
  data.myDmuNativeVfxNpcBaseIdByActor = {};
  data.myDmuNativeVfxCombatantByActor = {};
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
  for (const timer of Object.values(data.myDmuP4?.markTimers ?? {}))
    clearTimeout(timer);
  if (data.myDmuP4 !== undefined)
    data.myDmuP4.markTimers = {};
};

const myDmuNewP4VfxState = () => ({
  truthInvalid: { ex: false, chaos: false },
  exdeath: { invalid: false, sources: {}, resolved: {} },
  elements: {
    short: { invalid: false },
    long: { invalid: false },
  },
  eyes: {
    short: { invalid: false },
    long: { invalid: false },
  },
  common: {
    invalid: false,
    wave: 0,
    lastAt: undefined,
    waves: {},
    sourceScopes: {},
    eye1Thunder: undefined,
    iceForLong: undefined,
    chaosThunder: undefined,
    chaosIce: undefined,
  },
  chaos1: { invalid: false, openedAt: undefined, completedAt: undefined, placements: {}, resolved: {} },
  chaos2: { invalid: false, openedAt: undefined, completedAt: undefined, placements: {}, resolved: {} },
});

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
    vfx: myDmuNewP4VfxState(),
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
    native: myDmuNewP5NativeState(),
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

const myDmuInitState = () => ({
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
  myDmuP1FireMarkerId: undefined,
  myDmuP1FireMarkerTargetIds: [],
  myDmuP1WaveCannonTargets: [],
  myDmuP1PlaceRock: false,
  myDmuP1FirstTethered: false,
  myDmuP1Graven2TetherCount: 1,
  myDmuP1Graven2SourceX: undefined,
  myDmuP1Arrow: [],
  myDmuP1Graven3Tethers: [],
  myDmuP1Combatants: [],
  myDmuP1BeamTargetIds: [],
  myDmuP1BeamPartyCombatants: [],
  myDmuP1BeamTowers: {},
  myDmuP1BeamOrderLatch: myDmuNewP1BeamOrderLatch(),
  myDmuP1ArrowEffectsByActor: {},
  myDmuNativeVfx: myDmuNewNativeVfxState('p1'),
  myDmuNativeVfxNpcBaseIdByActor: {},
  myDmuNativeVfxCombatantByActor: {},
  myDmuP5NativePendingBossTargets: {},
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
  myDmuP2FuturePastFlip: false,
  myDmuP2AllThingsEndingCount: 0,
  myDmuP2AllThingsEndingCalloutCount: 0,
  myDmuP2LastKickId: undefined,
  myDmuP2FarNearTargetIds: [],
  myDmuP2Trine: {
    armed: false,
    wave: 0,
    resolvedWave: 0,
    lastOpenAt: undefined,
    actorsByWave: { 1: {}, 2: {}, 3: {} },
    waveByActor: {},
  },
  myDmuP2CombatantPositions: {},
  myDmuP2TowerRoundCount: 0,
  myDmuP2TowerCurrentRound: undefined,
  myDmuP2TowerLastAt: undefined,
  myDmuP2TowerRounds: {},
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
  myDmuP3Vfx: myDmuNewP3VfxState(),
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
    vfx: myDmuNewP4VfxState(),
  },
});

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
  if (matches.targetId === undefined || !Number.isFinite(x) || !Number.isFinite(z))
    return false;
  data.myDmuP2CombatantPositions ??= {};
  data.myDmuP2CombatantPositions[myDmuP2ActorKey(matches.targetId)] = { x, z };
  return true;
};

const myDmuP2RememberCombatantPosition = async (data, targetId) => {
  if (targetId === undefined)
    return;

  const id = Number.parseInt(targetId, 16);
  if (!Number.isFinite(id))
    return;

  try {
    const combatants = await myDmuQueryCombatants(data, [id], 'p2.tower-position');
    const pos = myDmuP2CombatantPoint(combatants[0]);
    if (pos === undefined)
      return;
    data.myDmuP2CombatantPositions ??= {};
    data.myDmuP2CombatantPositions[myDmuP2ActorKey(targetId)] = pos;
  } catch (err) {
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
  console.log(`[String][P2TowerLR] round=${round} mode=${mode} sourceRound=${sourceRound} towers=${myDmuP2TowerPointSummary(data, sourceRound)}`);
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

  const now = myDmuNativeVfxEventMilliseconds(matches);
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

  if (current.points.length >= 2) {
    if (round === 8)
      myDmuRenderP2EndTowerGuide(data, 'round-8-map-effects');
    if (round === 1 && myDmuP2RoundReadyForMapRetry(data, 1))
      myDmuApplyP2Round(data, 1);
    const targetRound = round + 1;
    if (targetRound <= 8 && myDmuP2RoundReadyForMapRetry(data, targetRound)) {
      myDmuP2RecordPointSlots(data, targetRound);
      myDmuApplyP2Round(data, targetRound);
    }
  }
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
  if (myDmuNativeVfxAcceptLogicalEvent(data, 'p2.tower:BABE', 1000, matches) === undefined)
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
  const points = data.myDmuP2TowerRounds?.[round]?.points;
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
  (data.myDmuP2TowerRounds?.[round]?.points ?? [])
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

const myDmuP2TowerVfxReady = (data, round) => {
  if (myDmuP2Pair2222IdleOddMode(data) === undefined || myDmuP2OddStrategy(data) === undefined)
    return false;
  const sourceRound = Math.max(1, round - 1);
  const points = data.myDmuP2TowerRounds?.[sourceRound]?.points;
  if (!Array.isArray(points) || points.length < 2)
    return false;
  return myDmuP2Partition(data, round) !== undefined;
};

const myDmuRenderP2Tower = (data, round) => {
  if (!myDmuNativeVfxPhaseEnabled(data, 'p2'))
    return false;
  if (myDmuP2Pair2222IdleOddMode(data) === undefined || myDmuP2OddStrategy(data) === undefined) {
    let cleared = false;
    for (let index = 1; index <= 8; index++)
      cleared = myDmuNativeVfxClearScope(data, `p2.tower.r${index}`, 'invalid-p2-tower-strategy') || cleared;
    return cleared;
  }
  if (!myDmuP2TowerVfxReady(data, round))
    return false;
  for (let index = 1; index <= 8; index++) {
    if (index !== round)
      myDmuNativeVfxClearScope(data, `p2.tower.r${index}`, `replace-by-r${round}`);
  }
  return myDmuNativeVfxReplaceScope(
    data,
    `p2.tower.r${round}`,
    (vfx) => myDmuBuildP2TowerVfx(vfx, data, round),
    `round-${round}`,
  );
};

const myDmuApplyP2Round = (data, round) => {
  const rendered = myDmuRenderP2Tower(data, round);
  const endRendered = round === 8
    ? myDmuRenderP2EndTowerGuide(data, 'round-8-guide')
    : false;
  if (!myDmuMarkEnabled(data, 'MyDMU_P2TowerMarkV3'))
    return rendered || endRendered;
  const desired = myDmuP2DesiredMarkers(data, round);
  if (desired.length !== 8)
    return rendered || endRendered;

  const signature = desired.map((item) => `${item.id}:${item.marker}`).join('|');
  if (data.myDmuP2AppliedRoundSignatures?.[round] === signature)
    return true;

  myDmuFastMarkQueue(data, desired, `绝妖星 P2 八轮塔 ${round}`);
  data.myDmuP2AppliedRounds[round] = true;
  data.myDmuP2AppliedRoundSignatures[round] = signature;
  return true;
};

const myDmuScheduleP2Round8 = (data) => {
  if (!myDmuMarkEnabled(data, 'MyDMU_P2TowerMarkV3') &&
      !myDmuNativeVfxPhaseEnabled(data, 'p2'))
    return;
  myDmuNativeVfxScheduleClockTask(data, 'p2.tower.r8:scheduled-round', 600, () => {
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

  myDmuMarkQueue(data, desired, '绝妖星 P3 麻将');
  state.marked = true;
  state.markSignature = signature;
  return true;
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

  myDmuMarkQueue(data, desired, '绝妖星 P3 一二三目标');
  state.marked = true;
  return true;
};

const myDmuP4RecordTruth = (data, target, value, matches, source = 'fallback') => {
  const now = myDmuNativeVfxEventMilliseconds(matches);
  data.myDmuP4.truthEvents[target] ??= [];
  const duplicate = data.myDmuP4.truthEvents[target].findLast((event) =>
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
  const now = myDmuNativeVfxEventMilliseconds(matches);
  data.myDmuP4.buffs[targetId] ??= {};
  data.myDmuP4.buffRecords ??= [];
  const duplicate = data.myDmuP4.buffRecords.findLast((record) =>
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

const myDmuPartyMarkerLabel = (marker) => myDmuPartyMarkerLabels[marker] ?? marker;

const myDmuP4BuffChatKey = (prefix, rec) =>
  `${prefix}:${rec?.serial ?? ''}:${rec?.id ?? ''}:${rec?.buffId ?? ''}:${rec?.initialDuration ?? rec?.duration ?? ''}`;

const myDmuP4RecordExpiresAt = (rec) => {
  const firstSeenAt = rec?.firstSeenAt;
  const duration = rec?.initialDuration ?? rec?.duration;
  if (typeof firstSeenAt !== 'number' || duration === undefined)
    return undefined;
  return firstSeenAt + duration * 1000;
};

const myDmuP4RoundText = (length) => {
  if (length === 'short')
    return '第一轮';
  if (length === 'long')
    return '第二轮';
  return undefined;
};

const myDmuP4ClassifyForRecord = (data, rec) => {
  if (myDmuP4ElementBuffs.includes(rec?.buffId))
    return myDmuP4ClassifyLengths(myDmuP4RecordsFor(data, myDmuP4ElementBuffs));
  if (rec?.buffId === myDmuP4PetrifyBuff)
    return myDmuP4ClassifyLengths(myDmuP4RecordsFor(data, [myDmuP4PetrifyBuff]));
  return true;
};

const myDmuSendP4BuffChat = (data, key, text) => {
  if (data.myDmuPhase !== 'p4' || !myDmuBooleanConfig(data, 'MyDMU_P4BuffChat', true))
    return true;
  data.myDmuP4.buffChatSent ??= {};
  if (data.myDmuP4.buffChatSent[key])
    return true;
  if (!myDmuDoTextCommand(data, text))
    return true;
  data.myDmuP4.buffChatSent[key] = true;
  return true;
};

const myDmuQueueP4BuffChat = (data, key, text, delaySeconds = 0) => {
  if (data.myDmuPhase !== 'p4' || !myDmuBooleanConfig(data, 'MyDMU_P4BuffChat', true))
    return true;
  data.myDmuP4.buffChatSent ??= {};
  if (data.myDmuP4.buffChatSent[key])
    return true;
  if (delaySeconds <= 0)
    return myDmuSendP4BuffChat(data, key, text);
  data.myDmuP4.buffChatSent[key] = true;
  myDmuP4ScheduleTimer(data, `chat-${key}`, delaySeconds * 1000, () => {
    if (data.myDmuPhase !== 'p4' || !myDmuBooleanConfig(data, 'MyDMU_P4BuffChat', true))
      return;
    myDmuDoTextCommand(data, text);
  });
  return true;
};

const myDmuP4RoleListText = (records) => {
  const roles = [...records]
    .sort((a, b) => myDmuRolePriority(a.role) - myDmuRolePriority(b.role))
    .map((rec) => rec.role ?? rec.id ?? '?');
  return roles.length > 0 ? roles.join(',') : '无';
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

const myDmuTrySendP4LongAttack12Chat = (data) => {
  if (!myDmuMarkEnabled(data, 'MyDMU_P4BuffMarkV3'))
    return true;
  const targets = myDmuP4ElementSpreadTargets(data, 'long');
  if (targets.TN === undefined || targets.DPS === undefined)
    return false;
  const plan = [
    { rec: targets.TN, marker: 'attack1' },
    { rec: targets.DPS, marker: 'attack2' },
  ];
  const text = plan
    .map((item) => `${myDmuPartyMarkerLabel(item.marker)} ${item.rec.role ?? item.rec.id ?? '?'}`)
    .join('；');
  return myDmuSendP4BuffChat(data, 'p4-buff-long-attack12', `第二轮攻击12：${text}`);
};

const myDmuTrySendP4LongPetrifyChat = (data) => {
  if (!myDmuMarkEnabled(data, 'MyDMU_P4BuffMarkV3'))
    return true;
  const records = myDmuP4RecordsFor(data, [myDmuP4PetrifyBuff]);
  myDmuP4ClassifyLengths(records);
  const longRecords = records
    .filter((rec) => rec.length === 'long' && rec.truth !== undefined)
    .sort((a, b) => myDmuRolePriority(a.role) - myDmuRolePriority(b.role));
  if (longRecords.length < 2)
    return false;
  const petrifyLabel = longRecords[0].truth ? '真石化' : '假石化';
  return myDmuSendP4BuffChat(
    data,
    'p4-buff-long-petrify',
    `第二轮石化：${petrifyLabel} ${myDmuP4RoleListText(longRecords)}`,
  );
};

const myDmuP4OwnRecordsFor = (data, buffIds) =>
  myDmuP4RecordsFor(data, buffIds).filter((rec) => rec.name === data.me);

const myDmuP4ElementActionText = (rec) => {
  const side = myDmuP4ElementSide(rec);
  const round = myDmuP4RoundText(rec?.length);
  if (side === 'out' && round !== undefined)
    return `${round}分散`;
  if (side === 'in' && round !== undefined)
    return `${round}分摊`;
  return undefined;
};

const myDmuP4PetrifyActionText = (rec) => {
  const round = myDmuP4RoundText(rec?.length);
  if (round === undefined || rec?.truth === undefined)
    return undefined;
  return `${round}${rec.truth ? '真石化' : '假石化'}`;
};

const myDmuP4AccelerationActionText = (rec) => {
  if (rec?.truth === true)
    return '静';
  if (rec?.truth === false)
    return '动';
  return undefined;
};

const myDmuP4AccelerationGroupText = (records) => {
  const sorted = [...records]
    .filter((rec) => myDmuP4AccelerationActionText(rec) !== undefined)
    .sort((a, b) => myDmuRolePriority(a.role) - myDmuRolePriority(b.role));
  if (sorted.length === 0)
    return undefined;
  const staticRoles = sorted.filter((rec) => rec.truth === true).map((rec) => rec.role ?? rec.id ?? '?');
  const movingRoles = sorted.filter((rec) => rec.truth === false).map((rec) => rec.role ?? rec.id ?? '?');
  const staticText = staticRoles.length > 0 ? staticRoles.join(',') : '无';
  const movingText = movingRoles.length > 0 ? movingRoles.join(',') : '无';
  if (staticRoles.length > 0 && movingRoles.length === 0)
    return `静：${staticText}`;
  if (movingRoles.length > 0 && staticRoles.length === 0)
    return `动：${movingText}`;
  return `静：${staticText}；动：${movingText}`;
};

const myDmuP4AccelerationResolveRecords = (data, rec) => {
  const records = myDmuP4RecordsFor(data, [myDmuP4AccelerationBuff])
    .map((record) => {
      myDmuP4RefreshRecordTruth(data, record);
      return record;
    })
    .filter((record) => myDmuP4AccelerationActionText(record) !== undefined);
  const expiresAt = myDmuP4RecordExpiresAt(rec);
  if (typeof expiresAt !== 'number')
    return records.filter((record) => record === rec);
  const sameResolve = records.filter((record) => {
    const recordExpiresAt = myDmuP4RecordExpiresAt(record);
    return typeof recordExpiresAt === 'number' && Math.abs(recordExpiresAt - expiresAt) <= 1000;
  });
  return sameResolve.length > 0 ? sameResolve : records.filter((record) => record === rec);
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

const myDmuP4ActionText = (rec) => {
  if (myDmuP4ElementBuffs.includes(rec?.buffId))
    return myDmuP4ElementActionText(rec);
  if (rec?.buffId === myDmuP4PetrifyBuff)
    return myDmuP4PetrifyActionText(rec);
  if (rec?.buffId === myDmuP4AccelerationBuff)
    return myDmuP4AccelerationActionText(rec);
  if (myDmuP4ChaosBuffs.includes(rec?.buffId))
    return myDmuP4ChaosActionText(rec);
  return undefined;
};

const myDmuTrySendP4ElementChat = (data) => {
  myDmuP4ClassifyLengths(myDmuP4RecordsFor(data, myDmuP4ElementBuffs));
  const ownRecords = myDmuP4OwnRecordsFor(data, myDmuP4ElementBuffs);
  if (ownRecords.length === 0)
    return true;

  let ready = true;
  for (const rec of ownRecords) {
    myDmuP4RefreshRecordTruth(data, rec);
    const action = myDmuP4ElementActionText(rec);
    if (action === undefined) {
      ready = false;
      continue;
    }
    myDmuSendP4BuffChat(data, myDmuP4BuffChatKey('element', rec), `P4记忆：${action}`);
  }
  return ready;
};

const myDmuTrySendP4PetrifyChat = (data) => {
  myDmuP4ClassifyLengths(myDmuP4RecordsFor(data, [myDmuP4PetrifyBuff]));
  const ownRecords = myDmuP4OwnRecordsFor(data, [myDmuP4PetrifyBuff]);
  if (ownRecords.length === 0)
    return true;

  let ready = true;
  for (const rec of ownRecords) {
    myDmuP4RefreshRecordTruth(data, rec);
    const action = myDmuP4PetrifyActionText(rec);
    if (action === undefined) {
      ready = false;
      continue;
    }
    myDmuSendP4BuffChat(data, myDmuP4BuffChatKey('petrify', rec), `P4记忆：${action}`);
  }
  return ready;
};

const myDmuTrySendP4AccelerationChat = (data) => {
  const ownRecords = myDmuP4OwnRecordsFor(data, [myDmuP4AccelerationBuff]);
  if (ownRecords.length === 0)
    return true;

  let ready = true;
  for (const rec of ownRecords) {
    myDmuP4RefreshRecordTruth(data, rec);
    const action = myDmuP4AccelerationActionText(rec);
    if (action === undefined) {
      ready = false;
      continue;
    }
    myDmuSendP4BuffChat(data, myDmuP4BuffChatKey('accel', rec), `P4记忆：${action}`);
  }
  return ready;
};

const myDmuTrySendP4AccelerationGroupChat = (data) => {
  const records = myDmuP4RecordsFor(data, [myDmuP4AccelerationBuff])
    .filter((rec) => {
      myDmuP4RefreshRecordTruth(data, rec);
      return rec.truth !== undefined;
    })
    .sort((a, b) => {
      const seenDelta = (a.firstSeenAt ?? 0) - (b.firstSeenAt ?? 0);
      if (Math.abs(seenDelta) > 1000)
        return seenDelta;
      return myDmuRolePriority(a.role) - myDmuRolePriority(b.role);
    });
  if (records.length === 0)
    return true;

  const clusters = [];
  for (const rec of records) {
    let cluster = clusters.find((cluster) => Math.abs((rec.firstSeenAt ?? 0) - cluster.startedAt) <= 7000);
    if (cluster === undefined) {
      cluster = { startedAt: rec.firstSeenAt ?? 0, entries: [] };
      clusters.push(cluster);
    }
    cluster.entries.push(rec);
  }

  let ready = true;
  clusters.forEach((cluster, index) => {
    if (cluster.entries.length < 4) {
      ready = false;
      return;
    }
    const message = myDmuP4AccelerationGroupText(cluster.entries);
    if (message === undefined) {
      ready = false;
      return;
    }
    myDmuSendP4BuffChat(data, `p4-buff-accel-${index + 1}`, message);
  });
  return ready;
};

const myDmuTrySendP4ExecuteChat = (data, rec) => {
  if (rec === undefined)
    return false;
  myDmuP4RefreshRecordTruth(data, rec);
  myDmuP4ClassifyForRecord(data, rec);
  if (rec.buffId === myDmuP4AccelerationBuff) {
    const records = myDmuP4AccelerationResolveRecords(data, rec);
    const message = myDmuP4AccelerationGroupText(records);
    if (message === undefined)
      return false;
    const key = records.map((record) => myDmuP4BuffChatKey('exec-accel', record)).join('|');
    return myDmuSendP4BuffChat(data, `exec-accel:${key}`, `P4执行：${message}`);
  }
  const action = myDmuP4ActionText(rec);
  if (action === undefined)
    return false;
  return myDmuSendP4BuffChat(data, myDmuP4BuffChatKey('exec', rec), `P4执行：${action}`);
};

const myDmuTrySendP4ChaosChat = (data) => {
  const records = myDmuP4RecordsFor(data, myDmuP4ChaosBuffs);
  if (records.length === 0)
    return true;

  myDmuP4ClassifyLengths(records);
  let first;
  let second;
  for (const rec of records) {
    myDmuP4RefreshRecordTruth(data, rec);
    const action = myDmuP4ChaosActionText(rec);
    if (rec.length === 'short' && first === undefined)
      first = action;
    if (rec.length === 'long' && second === undefined)
      second = action;
  }
  if (first === undefined || second === undefined)
    return false;
  return myDmuSendP4BuffChat(data, 'p4-buff-chaos', `P4钢月：先${first} 后${second}`);
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

const myDmuP4OwnShortElementRecord = (data) => {
  myDmuP4ClassifyLengths(myDmuP4RecordsFor(data, myDmuP4ElementBuffs));
  return myDmuP4OwnRecordsFor(data, myDmuP4ElementBuffs)
    .find((rec) => {
      myDmuP4RefreshRecordTruth(data, rec);
      return rec.length === 'short' && myDmuP4ElementSide(rec) !== undefined;
    });
};

const myDmuP4OwnSpreadByLength = (data, length) => {
  const records = myDmuP4RoundRecords(data, myDmuP4ElementBuffs, length)
    .filter((rec) => {
      myDmuP4RefreshRecordTruth(data, rec);
      return myDmuP4ElementSide(rec) !== undefined;
    });
  const ownRecord = records.find((rec) => rec.name === data.me);
  const ownSide = myDmuP4ElementSide(ownRecord);
  if (ownSide === 'out')
    return true;
  if (ownSide === 'in')
    return false;

  const spreadGroups = new Set(records
    .filter((rec) => myDmuP4ElementSide(rec) === 'out')
    .map((rec) => rec.group)
    .filter((group) => group !== undefined));
  if (spreadGroups.has('TN') && spreadGroups.has('DPS'))
    return false;
  return undefined;
};

const myDmuP4OwnFirstAccelerationRecord = (data) =>
  myDmuP4OwnRecordsFor(data, [myDmuP4AccelerationBuff])
    .map((rec) => {
      myDmuP4RefreshRecordTruth(data, rec);
      return rec;
    })
    .filter((rec) => myDmuP4AccelerationActionText(rec) !== undefined)
    .sort((a, b) => (a.firstSeenAt ?? 0) - (b.firstSeenAt ?? 0))[0];

const myDmuP4OwnAccelerationRecordByIndex = (data, index) =>
  myDmuP4OwnRecordsFor(data, [myDmuP4AccelerationBuff])
    .map((rec) => {
      myDmuP4RefreshRecordTruth(data, rec);
      return rec;
    })
    .filter((rec) => myDmuP4AccelerationActionText(rec) !== undefined)
    .sort((a, b) => (a.firstSeenAt ?? 0) - (b.firstSeenAt ?? 0))[index];

const myDmuP4ShortPetrifyInfo = (data) => {
  const records = myDmuP4RecordsFor(data, [myDmuP4PetrifyBuff]);
  myDmuP4ClassifyLengths(records);
  const shortRecords = records
    .filter((rec) => {
      myDmuP4RefreshRecordTruth(data, rec);
      return rec.length === 'short' && rec.truth !== undefined;
    })
    .sort((a, b) => myDmuRolePriority(a.role) - myDmuRolePriority(b.role));
  if (shortRecords.length < 2)
    return undefined;
  const ownRecord = shortRecords.find((rec) => rec.name === data.me);
  return {
    isPetrify: ownRecord !== undefined,
    facePetrify: shortRecords[0]?.truth === false,
  };
};

const myDmuP4PetrifyInfoByLength = (data, length) => {
  const records = myDmuP4RecordsFor(data, [myDmuP4PetrifyBuff]);
  myDmuP4ClassifyLengths(records);
  const roundRecords = records
    .filter((rec) => {
      myDmuP4RefreshRecordTruth(data, rec);
      return rec.length === length && rec.truth !== undefined;
    })
    .sort((a, b) => myDmuRolePriority(a.role) - myDmuRolePriority(b.role));
  if (roundRecords.length < 2)
    return undefined;
  const ownRecord = roundRecords.find((rec) => rec.name === data.me);
  return {
    isPetrify: ownRecord !== undefined,
    facePetrify: roundRecords[0]?.truth === false,
  };
};

const myDmuP4SpreadStackText = (data, spread) => {
  const ownRole = myDmuGetRpByName(data, data.me);
  const support = myDmuRoleGroup(ownRole) === 'TN';
  return spread ?
    support ? '左西出去分散' : '右东出去分散' :
    support ? '上北三人分摊' : '下南三人分摊';
};

const myDmuP4MandarinDuckSecondText = (data, spread, accelAction) => {
  const spreadText = myDmuP4SpreadStackText(data, spread);
  const accelText = accelAction === '动' ? '稍后保持移动' :
    accelAction === '静' ? '稍后停手' :
      '照常输出';
  return `${spreadText}，${accelText}`;
};

const myDmuTrySendP4MandarinDuckChats = (data) => {
  if (data.myDmuPhase !== 'p4' || !myDmuBooleanConfig(data, 'MyDMU_P4BuffChat', true))
    return true;
  const st = data.myDmuP4.mandarinDuck ??= {};
  if (!st.seenAntilight)
    return true;
  if (st.sent)
    return true;
  if (st.goTruePurple === undefined || st.truePurpleLeft === undefined || data.myDmuP4.truth.ex === undefined)
    return false;

  const elementRec = myDmuP4OwnShortElementRecord(data);
  const elementSide = myDmuP4ElementSide(elementRec);
  if (elementSide === undefined)
    return false;
  const accelRec = myDmuP4OwnFirstAccelerationRecord(data);
  const accelAction = myDmuP4AccelerationActionText(accelRec);
  if (accelAction === undefined)
    return false;
  const petrify = myDmuP4ShortPetrifyInfo(data);
  if (petrify === undefined)
    return false;

  const goLeft = st.truePurpleLeft === st.goTruePurple;
  const rawPurple = data.myDmuP4.truth.ex === st.goTruePurple;
  const sideText = `鸳鸯锅：去${goLeft ? '左' : '右'}侧，${rawPurple ? '紫色' : '蓝色'}半场`;
  const secondText = `鸳鸯锅：${myDmuP4MandarinDuckSecondText(data, elementSide === 'out', accelAction)}`;
  const accelText = accelAction === '动' ? '鸳鸯锅：动动动' : '鸳鸯锅：停停停';
  const petrifyText = `鸳鸯锅：${petrify.isPetrify ?
    petrify.facePetrify ? '去人群前方' : '去人群后方' :
    '人群集合'}，${petrify.facePetrify ? '面对' : '背对'}石化`;

  st.sent = true;
  myDmuQueueP4BuffChat(data, 'p4-mandarin-duck-side', sideText);
  myDmuQueueP4BuffChat(data, 'p4-mandarin-duck-element', secondText, 5.4);
  myDmuQueueP4BuffChat(data, 'p4-mandarin-duck-accel', accelText, 11.9);
  myDmuQueueP4BuffChat(data, 'p4-mandarin-duck-petrify', petrifyText, 13.9);
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
    myDmuRetryAction(() => myDmuTrySendP4LateThunderChats(data), 12, 500);
    return true;
  }
  if (myDmuP4IceSpellIds.includes(id)) {
    if (st.iceSeen)
      return true;
    st.iceSeen = true;
    st.iceTrue = id === 'BA98';
    myDmuRetryAction(() => myDmuTrySendP4LateIceChats(data), 12, 500);
    return true;
  }
  return false;
};

const myDmuTrySendP4LateThunderChats = (data) => {
  if (data.myDmuPhase !== 'p4' || !myDmuBooleanConfig(data, 'MyDMU_P4BuffChat', true))
    return true;
  const st = data.myDmuP4.lateSpell ??= {};
  if (st.thunderTrue === undefined)
    return true;

  myDmuQueueP4BuffChat(
    data,
    'p4-late-thunder-safe',
    `雷直条：${st.thunderTrue ? '去空白区' : '去紫色区'}`,
  );

  const shortPetrify = myDmuP4PetrifyInfoByLength(data, 'short');
  if (shortPetrify === undefined)
    return false;
  if (shortPetrify.isPetrify)
    myDmuQueueP4BuffChat(
      data,
      'p4-late-thunder-petrify-face',
      `雷直条：${shortPetrify.facePetrify ? '面对' : '背对'}`,
      4.0,
    );

  const firstChaos = myDmuP4ChaosActionForLength(data, 'short');
  const spread = myDmuP4OwnSpreadByLength(data, 'long');
  if (firstChaos === undefined || spread === undefined)
    return false;

  const spreadText = spread ? '出去分散' : '三人分摊';
  myDmuQueueP4BuffChat(
    data,
    'p4-late-thunder-chaos',
    `雷直条：场中放${firstChaos}，稍后${spreadText}`,
    5.9,
  );
  myDmuQueueP4BuffChat(
    data,
    'p4-late-thunder-move',
    `雷直条：${firstChaos === '钢铁' ? '躲开钢铁，' : '留在原地，稍后'}${myDmuP4SpreadStackText(data, spread)}`,
    12.7,
  );
  return true;
};

const myDmuTrySendP4LateIceChats = (data) => {
  if (data.myDmuPhase !== 'p4' || !myDmuBooleanConfig(data, 'MyDMU_P4BuffChat', true))
    return true;
  const st = data.myDmuP4.lateSpell ??= {};
  if (st.iceTrue === undefined)
    return true;

  const accelRec = myDmuP4OwnAccelerationRecordByIndex(data, 1);
  const accelAction = myDmuP4AccelerationActionText(accelRec);
  const accelText = accelAction === '动' ? '动动动' :
    accelAction === '静' ? '停停停' :
      '正常输出';
  myDmuQueueP4BuffChat(
    data,
    'p4-late-ice-safe',
    `冰扇形：${st.iceTrue ? '空白区' : '紫色区'}，${accelText}`,
  );

  const longPetrify = myDmuP4PetrifyInfoByLength(data, 'long');
  if (longPetrify === undefined)
    return false;
  myDmuQueueP4BuffChat(
    data,
    'p4-late-ice-petrify',
    `冰扇形：${longPetrify.isPetrify ?
      longPetrify.facePetrify ? '去人群前方' : '去人群后方' :
      '人群集合'}，${longPetrify.facePetrify ? '面对' : '背对'}石化`,
    3.7,
  );
  return true;
};

const myDmuTrySendP4BuffChats = (data) => {
  if (data.myDmuPhase !== 'p4' || !myDmuBooleanConfig(data, 'MyDMU_P4BuffChat', true))
    return true;
  const elementReady = myDmuTrySendP4ElementChat(data);
  const petrifyReady = myDmuTrySendP4PetrifyChat(data);
  const accelerationReady = myDmuTrySendP4AccelerationChat(data);
  const accelerationGroupReady = myDmuTrySendP4AccelerationGroupChat(data);
  const chaosReady = myDmuTrySendP4ChaosChat(data);
  const longAttackReady = myDmuTrySendP4LongAttack12Chat(data);
  const longPetrifyReady = myDmuTrySendP4LongPetrifyChat(data);
  const mandarinReady = myDmuTrySendP4MandarinDuckChats(data);
  return elementReady && petrifyReady && accelerationReady && accelerationGroupReady &&
    chaosReady && longAttackReady && longPetrifyReady && mandarinReady;
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
  rel.sent = true;
  rel.message = message;
  return myDmuSendP4BuffChat(data, `p4-magic-release:${st.storeCount}:${source ?? ''}`, message);
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
  if (data.myDmuP4.markTimers[key] !== undefined)
    clearTimeout(data.myDmuP4.markTimers[key]);
  data.myDmuP4.markTimers[key] = setTimeout(() => {
    delete data.myDmuP4.markTimers?.[key];
    callback();
  }, Math.max(delayMs, 0));
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
    if (oldKind !== undefined && oldKind !== kind)
      myDmuP4DropKindAssignmentForActor(data, oldKind, actorKey);
    markers.push(item);
  }
  return { markers, skipped };
};

const myDmuP4SetKindMarkers = (data, kind, desired, note) => {
  if (!myDmuMarkEnabled(data, 'MyDMU_P4BuffMarkV3'))
    return false;
  if (desired.length === 0)
    return false;
  const { markers, skipped } = myDmuP4PickKindMarkers(data, kind, desired);
  if (markers.length === 0 && skipped.length === 0)
    return false;
  if (markers.length > 0)
    myDmuMarkQueue(data, markers, note);
  data.myDmuP4.markAppliedAt ??= {};
  data.myDmuP4.markAssignments[kind] = markers.map((item) => ({ ...item }));
  for (const item of markers) {
    const actorKey = myDmuMarkActorKey(item.id);
    data.myDmuP4.markActorKinds[actorKey] = kind;
    data.myDmuP4.markActorMarkers[actorKey] = item.marker;
  }
  data.myDmuP4.markAppliedAt[kind] = Date.now();
  return true;
};

const myDmuP4ClearKind = (data, kind, reason) => {
  if (!myDmuMarkConfigured(data, 'MyDMU_P4BuffMarkV3'))
    return false;
  myDmuP4EnsureMarkOwnership(data);
  const assignments = data.myDmuP4.markAssignments?.[kind] ?? [];
  const owned = assignments.filter((item) => {
    const actorKey = myDmuMarkActorKey(item.id);
    return data.myDmuP4.markActorKinds[actorKey] === kind &&
      data.myDmuP4.markActorMarkers[actorKey] === item.marker;
  });
  if (owned.length > 0)
    myDmuClearMarkQueue(data, owned, `绝妖星 P4 清除 ${kind} ${reason ?? ''}`);
  for (const item of owned) {
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
  myDmuRetryAction(() => myDmuProcessP4MarkTiming(data, `after-clear-${kind}`), 10, 250);
  return true;
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
  if (!myDmuP4SetKindMarkers(data, round, desired, `绝妖星 P4 元素 ${round}`))
    return false;
  data.myDmuP4.elementMarked[round] = true;
  myDmuP4ScheduleElementTransition(data, round, records);
  if (round === 'long') {
    myDmuTrySendP4LongAttack12Chat(data);
    myDmuTrySendP4LongPetrifyChat(data);
  }
  return true;
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
  if (!myDmuP4SetKindMarkers(data, kind, desired, `绝妖星 P4 石化 ${round}`))
    return false;
  data.myDmuP4.petrifyMarked[round] = true;
  myDmuP4ScheduleKindClear(data, kind, records, round === 'long' ? 3500 : 0);
  if (round === 'short')
    myDmuTrySendP4LongAttack12Chat(data);
  if (round === 'long')
    myDmuTrySendP4LongPetrifyChat(data);
  return true;
};

const myDmuP4TransitionElementToPetrify = (data, round, reason) => {
  if (!myDmuMarkConfigured(data, 'MyDMU_P4BuffMarkV3'))
    return false;
  if (round === undefined || round === 'unknown')
    return false;
  if (!data.myDmuP4.elementMarked[round] || data.myDmuP4.elementCleared[round])
    return false;

  const petrifyApplied = myDmuApplyP4PetrifyRound(data, round);
  const elementCleared = myDmuP4ClearKind(data, round, reason);
  if (!petrifyApplied)
    myDmuRetryAction(() => myDmuProcessP4MarkTiming(data, `after-transition-${round}`), 10, 250);
  return petrifyApplied || elementCleared;
};

function myDmuProcessP4MarkTiming(data, source = 'process') {
  if (data.myDmuPhase !== 'p4' || !myDmuMarkEnabled(data, 'MyDMU_P4BuffMarkV3'))
    return true;

  if (!data.myDmuP4.elementMarked.short && !data.myDmuP4.elementCleared.short)
    return myDmuApplyP4ElementRound(data, 'short');
  if (data.myDmuP4.elementCleared.short && !data.myDmuP4.petrifyMarked.short && !data.myDmuP4.petrifyCleared.short)
    return myDmuApplyP4PetrifyRound(data, 'short');
  if (data.myDmuP4.petrifyMarked.short)
    myDmuTrySendP4LongAttack12Chat(data);
  if (!data.myDmuP4.petrifyCleared.short)
    return true;

  if (!data.myDmuP4.elementMarked.long && !data.myDmuP4.elementCleared.long)
    return myDmuApplyP4ElementRound(data, 'long');
  if (data.myDmuP4.elementMarked.long)
    myDmuTrySendP4LongPetrifyChat(data);
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

const myDmuRefreshP4NativeVfxTruth = (data, target, reason) => {
  if (!myDmuNativeVfxPhaseEnabled(data, 'p4'))
    return false;
  if (target === 'ex') {
    myDmuRenderP4Exdeath(data, `${reason}:truth`);
    myDmuRenderP4Elements(data, 'short', `${reason}:truth`);
    myDmuRenderP4Elements(data, 'long', `${reason}:truth`);
    myDmuRenderP4Eyes(data, 'short', `${reason}:truth`);
    myDmuRenderP4Eyes(data, 'long', `${reason}:truth`);
  } else if (target === 'chaos') {
    for (const scope of ['p4.chaos1', 'p4.chaos2']) {
      const state = myDmuP4ChaosState(data, scope);
      if (state.completedAt !== undefined)
        myDmuFinalizeP4Chaos(data, scope, state.openedAt, `${reason}:truth-revalidate`);
    }
  }
  return true;
};

const myDmuEnsureP4BuffRecord = (data, matches) => {
  const effectId = matches.effectId?.toUpperCase();
  const duration = myDmuNumber(matches.duration);
  return myDmuP4RecordForEvent(data, matches.targetId, effectId, duration) ??
    myDmuP4CacheBuff(data, matches);
};

const myDmuP4NativeBuffTaskPrefix = (effectId, round) => {
  const normalizedEffectId = effectId?.toUpperCase();
  const kind = myDmuP4ElementBuffs.includes(normalizedEffectId) ? 'elements' : 'eyes';
  return `p4.buff-delay:${kind}:${round}:`;
};

const myDmuP4NativeBuffTaskKey = (effectId, targetId, round) =>
  `${myDmuP4NativeBuffTaskPrefix(effectId, round)}` +
  `${effectId?.toUpperCase()}:${myDmuP4VfxActorTag(targetId)}`;

const myDmuCancelP4NativeBuffRoundTasks = (data, effectId, round) => {
  const state = myDmuEnsureNativeVfxState(data);
  const prefix = myDmuP4NativeBuffTaskPrefix(effectId, round);
  for (const key of Object.keys(state.clockTasks)) {
    if (key.startsWith(prefix))
      myDmuNativeVfxCancelClockTask(state, key);
  }
};

const myDmuScheduleP4NativeBuff = (data, matches, remainingSeconds, render) => {
  const record = myDmuEnsureP4BuffRecord(data, matches);
  const round = myDmuP4VfxRound(record);
  const duration = myDmuNumber(matches.duration);
  if (record === undefined || round === undefined || duration === undefined)
    return false;
  const effectId = matches.effectId?.toUpperCase();
  const targetId = myDmuNormalizeActorId(matches.targetId);
  if (!/^1[0-9A-F]{7}$/u.test(targetId ?? '')) {
    const scopeRoot = myDmuP4ElementBuffs.includes(effectId) ? 'p4.elements' : 'p4.eyes';
    myDmuCancelP4NativeBuffRoundTasks(data, effectId, round);
    myDmuNativeVfxClearScope(data, `${scopeRoot}.${round}`, 'invalid-buff-task-target');
    myDmuActLog('Native VFX coverage gap', {
      scope: `${scopeRoot}.${round}`,
      reason: 'invalid-buff-task-target',
      targetId: matches.targetId,
      fallback: false,
    });
    return false;
  }
  const key = myDmuP4NativeBuffTaskKey(effectId, targetId, round);
  const delayMilliseconds = Math.max(duration - remainingSeconds, 0) * 1000;
  return myDmuNativeVfxScheduleClockTask(data, key, delayMilliseconds, () => {
    if (data.myDmuPhase !== 'p4' || !myDmuNativeVfxPhaseEnabled(data, 'p4') ||
        record.lostAt !== undefined || !(data.myDmuP4.buffRecords ?? []).includes(record))
      return false;
    return render(data, record, round);
  });
};

const myDmuCancelP4NativeBuffTask = (data, effectId, targetId, round) => {
  const state = myDmuEnsureNativeVfxState(data);
  const actorId = myDmuNormalizeActorId(targetId);
  if (!/^1[0-9A-F]{7}$/u.test(actorId ?? ''))
    return false;
  const rounds = round === undefined ? ['short', 'long'] : [round];
  for (const candidate of rounds)
    myDmuNativeVfxCancelClockTask(
      state,
      myDmuP4NativeBuffTaskKey(effectId, actorId, candidate),
    );
  return true;
};

const myDmuLoseP4NativeBuff = (data, matches) => {
  const effectId = matches.effectId?.toUpperCase();
  const record = myDmuP4RecordForEvent(
    data,
    matches.targetId,
    effectId,
    myDmuNumber(matches.duration),
  );
  const round = myDmuP4VfxRound(record);
  myDmuCancelP4NativeBuffTask(data, effectId, matches.targetId, round);
  if (record !== undefined)
    record.lostAt = myDmuNativeVfxEventMilliseconds(matches);
  if (myDmuP4ElementBuffs.includes(effectId) && round !== undefined)
    return myDmuNativeVfxClearScope(data, `p4.elements.${round}`, `${effectId}-lost-round-clear`);
  if (effectId === myDmuP4PetrifyBuff && round !== undefined)
    return myDmuNativeVfxClearScope(data, `p4.eyes.${round}`, `${effectId}-lost-round-clear`);
  if (effectId === myDmuP4AccelerationBuff && round !== undefined) {
    const actorId = myDmuNormalizeActorId(matches.targetId);
    return myDmuNativeVfxFilterScope(
      data,
      `p4.eyes.${round}`,
      (drawing) => !drawing.id.includes(`.accel.${myDmuP4VfxActorTag(actorId)}`),
      `${effectId}-${actorId}-exact-clear`,
    );
  }
  return false;
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
      run: async (data, matches) => {
        const nextPhase = myDmuPhaseStarts[matches.id];
        if (nextPhase === undefined)
          return;
        // BB40 also opens Repeater 3 inside P5; it is not a second phase transition.
        if (nextPhase === 'p5' && data.myDmuPhase === 'p5')
          return;
        if (data.myDmuPhase === 'p4' && nextPhase !== 'p4')
          myDmuCancelP4Timers(data);
        const previousPhase = data.myDmuPhase;
        // Establish the VFX epoch/queue fence before exposing the new phase, while
        // keeping the existing phase resets synchronous for cactbot consumers.
        const phaseTeardown = myDmuNativeVfxSwitchPhase(data, nextPhase, true);
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
          myDmuResetP3Vfx(data);
          myDmuP3RecordBossHeading(data, 'kefka', matches);
          data.myDmuP3FirewallTargetKind = undefined;
          myDmuClearMarks(data);
        } else if (data.myDmuPhase === 'p4') {
          myDmuResetP4(data);
          myDmuClearMarks(data);
        } else if (data.myDmuPhase === 'p5') {
          myDmuResetP5(data);
          const bossActorId = myDmuNormalizeActorId(matches.sourceId);
          if (/^4[0-9A-F]{7}$/u.test(bossActorId ?? ''))
            myDmuP5NativeState(data).repeater.bossActorId = bossActorId;
          myDmuClearMarks(data);
        }
        const cleared = await phaseTeardown;
        if (!cleared) {
          myDmuActLog('Native VFX phase root teardown 未完全成功', {
            previousPhase,
            nextPhase,
            fallback: false,
          });
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
        ((myDmuP1CalloutEnabled(data) && data.role === 'tank') ||
          myDmuNativeVfxPhaseEnabled(data, 'p1')),
      durationSeconds: 5,
      alertText: (data) => myDmuP1CalloutEnabled(data) && data.role === 'tank'
        ? myDmuCacheSpeech(data, 'p1ManaCharge', '死刑换T')
        : undefined,
      tts: null,
      soundVolume: 0,
      run: (data, matches) => {
        if (myDmuNativeVfxPhaseEnabled(data, 'p1')) {
          myDmuNativeVfxReplaceScope(
            data,
            'p1.death',
            (vfx) => myDmuBuildP1DeathVfx(vfx, matches),
            'C403-start',
          );
        }
        myDmuSpeakCached(data, 'p1ManaCharge');
      },
    },
    {
      id: '绝妖星 P1 恶狠狠毁荡绘图清理',
      type: 'Ability',
      netRegex: { id: 'C403', capture: false },
      condition: (data) => data.myDmuPhase === 'p1',
      run: (data) => myDmuNativeVfxClearScope(data, 'p1.death', 'C403-resolve'),
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
      preRun: (data, matches) => {
        myDmuP1RecordFakeHeadmarker(data, matches.id);
        myDmuNativeVfxScheduleClockTask(data, 'p1:fake-headmarker-reset', 5000, () => {
          data.myDmuP1Fake.fire = false;
          data.myDmuP1Fake.ice = false;
          return true;
        });
      },
    },
    {
      id: '绝妖星 P1 第一组连线',
      type: 'Tether',
      netRegex: { id: '002D', capture: true },
      condition: (data) => data.myDmuPhase === 'p1' && data.myDmuP1GravenCount === 1 &&
        (myDmuP1CalloutEnabled(data) || myDmuNativeVfxPhaseEnabled(data, 'p1')),
      preRun: (data, matches) => {
        myDmuP1RecordUniqueName(data.myDmuP1Tethers, matches.target);
        if (myDmuNativeVfxPhaseEnabled(data, 'p1')) {
          myDmuNativeVfxMergeScope(
            data,
            'p1.truefalse',
            (vfx) => myDmuBuildP1TetherVfx(vfx, data, matches, 'p1.truefalse'),
            'first-tether',
          );
        }
      },
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
        if (myDmuNativeVfxPhaseEnabled(data, 'p1')) {
          if (data.myDmuP1PoisonTargets.length === 0)
            myDmuNativeVfxClearScope(data, 'p1.poison', 'poison-resolved');
          else {
            const targetId = myDmuNormalizeActorId(matches.targetId);
            myDmuNativeVfxFilterScope(
              data,
              'p1.poison',
              (drawing) => !drawing.id.includes(targetId ?? 'invalid-target'),
              'poison-target-removed',
            );
          }
        }
        if (data.myDmuP1PoisonTargets.length === 0 && myDmuMarkConfigured(data, 'MyDMU_P1PoisonMarkV3'))
          myDmuScheduleClearMarks(data, 'p1Poison', 0.2, (data) =>
            data.myDmuP1PoisonTargets.length === 0 && myDmuMarkConfigured(data, 'MyDMU_P1PoisonMarkV3'));
      },
    },
    {
      id: '绝妖星 P1 5078锁链标点兜底',
      type: 'StartsUsing',
      netRegex: { id: ['BAA2', 'BAA3'], capture: false },
      condition: (data) => data.myDmuPhase === 'p1',
      suppressSeconds: 1,
      run: (data) => myDmuRetryAction(() => myDmuApplyP1PoisonMarkers(data, true), 6, 250),
    },
    {
      id: '绝妖星 P1 连环环陷阱原生预兆',
      type: 'GainsEffect',
      netRegex: { effectId: myDmuP1PoisonBuff, capture: true },
      condition: (data) => data.myDmuPhase === 'p1' &&
        myDmuNativeVfxPhaseEnabled(data, 'p1'),
      run: (data, matches) => {
        const event = myDmuNativeVfxAcceptLogicalEvent(data, 'p1.poison:gains', 1000, matches);
        if (event === undefined)
          return;
        const delay = Math.max((myDmuNumber(matches.duration) ?? 0) - 3.5, 0) * 1000;
        myDmuNativeVfxScheduleClockTask(
          data,
          `p1.poison:preview:${event.ordinal}`,
          delay,
          () => myDmuNativeVfxReplaceScope(
            data,
            'p1.poison',
            (vfx) => myDmuBuildP1PoisonVfx(vfx, data),
            'poison-expiry-preview',
          ),
        );
      },
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
      id: '绝妖星 P1 分摊分散头标原生绘图',
      type: 'HeadMarker',
      netRegex: { id: [myDmuP1Headmarkers.stack, myDmuP1Headmarkers.spread], capture: true },
      condition: (data) => data.myDmuPhase === 'p1' &&
        myDmuNativeVfxPhaseEnabled(data, 'p1'),
      run: (data, matches) => {
        data.myDmuP1FireMarkerId = matches.id;
        const targetId = myDmuNormalizeActorId(matches.targetId);
        if (/^1[0-9A-F]{7}$/u.test(targetId ?? '') &&
            !data.myDmuP1FireMarkerTargetIds.includes(targetId))
          data.myDmuP1FireMarkerTargetIds.push(targetId);
        const scope = myDmuP1IsGraven3(data) ? 'p1.fireThunder' : 'p1.truefalse';
        myDmuNativeVfxMergeScope(
          data,
          scope,
          (vfx) => myDmuBuildP1FireVfx(vfx, data, scope),
          'fire-headmarker',
        );
      },
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
        (myDmuP1CalloutEnabled(data) || myDmuNativeVfxPhaseEnabled(data, 'p1')),
      promise: async (data, matches) => {
        if (!myDmuNativeVfxPersonalGuideEnabled(data))
          return;
        if (data.myDmuP1BeamPartyCombatants.length === 8)
          return;
        const actorIds = myDmuNativeVfxPartyActorIds(data)
          .map((id) => Number.parseInt(id, 16))
          .filter((id) => Number.isInteger(id));
        try {
          matches.myDmuP1BeamPartyCombatants = await myDmuQueryCombatants(
            data,
            actorIds,
            'p1.beam-order',
          );
        } catch (error) {
          matches.myDmuP1BeamPartyCombatants = [];
          myDmuActLog('Native VFX coverage gap', {
            scope: 'p1.beamTower',
            reason: 'beam-party-query-failed',
            error: `${error}`,
            fallback: false,
          });
        }
      },
      preRun: (data, matches) => {
        myDmuP1MechanicBeamOrder(data);
        myDmuP1RecordUniqueName(data.myDmuP1WaveCannonTargets, matches.target);
        const targetId = myDmuNormalizeActorId(matches.targetId);
        if (/^1[0-9A-F]{7}$/u.test(targetId ?? '') && !data.myDmuP1BeamTargetIds.includes(targetId))
          data.myDmuP1BeamTargetIds.push(targetId);
        if (Array.isArray(matches.myDmuP1BeamPartyCombatants) &&
            matches.myDmuP1BeamPartyCombatants.length === 8)
          data.myDmuP1BeamPartyCombatants = matches.myDmuP1BeamPartyCombatants;
        if (myDmuNativeVfxPhaseEnabled(data, 'p1')) {
          myDmuNativeVfxMergeScope(
            data,
            'p1.beamTower',
            (vfx) => myDmuBuildP1BeamVfx(vfx, matches),
            'BAA8-target',
          );
          myDmuRenderP1BeamGuide(data, 'BAA8-guide');
        }
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
      id: '绝妖星 P1 波动炮塔绘图',
      type: 'StartsUsing',
      netRegex: { id: 'BAAA', capture: true },
      condition: (data) => data.myDmuPhase === 'p1' &&
        data.myDmuP1GravenCount === 1 && myDmuNativeVfxPhaseEnabled(data, 'p1'),
      promise: async (data, matches) => {
        if (!myDmuNativeVfxPersonalGuideEnabled(data))
          return;
        const sourceId = Number.parseInt(matches.sourceId, 16);
        if (!Number.isInteger(sourceId))
          return;
        try {
          matches.myDmuP1BeamTowerCombatant = (await myDmuQueryCombatants(
            data,
            [sourceId],
            'p1.beam-tower',
          ))[0];
        } catch (error) {
          myDmuActLog('Native VFX coverage gap', {
            scope: 'p1.beamTower',
            reason: 'beam-tower-query-failed',
            error: `${error}`,
            fallback: false,
          });
        }
      },
      run: (data, matches) => {
        const actorId = myDmuNormalizeActorId(matches.sourceId);
        const point = myDmuP1CombatantPoint(matches.myDmuP1BeamTowerCombatant);
        if (actorId !== undefined && point !== undefined)
          data.myDmuP1BeamTowers[actorId] = point;
        myDmuNativeVfxMergeScope(
          data,
          'p1.beamTower',
          (vfx) => myDmuBuildP1BeamTowerVfx(vfx, matches),
          'BAAA-start',
        );
        myDmuRenderP1BeamGuide(data, 'BAAA-guide');
      },
    },
    {
      id: '绝妖星 P1 波动炮塔绘图清理',
      type: 'Ability',
      netRegex: { id: 'BAAA', capture: true },
      condition: (data) => data.myDmuPhase === 'p1',
      run: (data, matches) => {
        const event = myDmuNativeVfxAcceptLogicalEvent(
          data,
          'p1.beamTower:BAAA-resolve',
          1000,
          matches,
        );
        if (event === undefined)
          return;
        myDmuNativeVfxScheduleClockTask(
          data,
          `p1.beamTower:BAAA-resolve:${event.ordinal}`,
          200,
          () => {
            myDmuNativeVfxClearScope(data, 'p1.beamTower', 'BAAA-resolve');
            data.myDmuP1BeamTargetIds = [];
            data.myDmuP1BeamPartyCombatants = [];
            data.myDmuP1BeamTowers = {};
            myDmuResetP1BeamOrderLatch(data);
            return true;
          },
        );
      },
    },
    {
      id: '绝妖星 P1 神像2 原生连线绘图',
      type: 'Tether',
      netRegex: { id: '002D', capture: true },
      condition: (data) => data.myDmuPhase === 'p1' &&
        data.myDmuP1GravenCount === 2 && myDmuNativeVfxPhaseEnabled(data, 'p1'),
      promise: async (data, matches) => {
        if (!myDmuNativeVfxPersonalGuideEnabled(data))
          return;
        const sourceId = Number.parseInt(matches.sourceId, 16);
        if (!Number.isInteger(sourceId))
          return;
        try {
          const combatant = (await myDmuQueryCombatants(data, [sourceId], 'p1.line23-source'))[0];
          matches.myDmuP1Line23SourceX = myDmuP1CombatantPoint(combatant)?.x;
        } catch (error) {
          myDmuActLog('Native VFX coverage gap', {
            scope: 'p1.graven2',
            reason: 'line23-source-query-failed',
            error: `${error}`,
            fallback: false,
          });
        }
      },
      run: (data, matches) => myDmuNativeVfxMergeScope(
        data,
        'p1.graven2',
        (vfx) => myDmuBuildP1Graven2TetherVfx(vfx, data, matches, matches.myDmuP1Line23SourceX),
        'graven2-tether',
      ),
    },
    {
      id: '绝妖星 P1 神像2 半场绘图',
      type: 'ActorControlExtra',
      netRegex: {
        category: '019D',
        param1: '10',
        param2: '20',
        param3: '0',
        param4: '0',
        capture: true,
      },
      condition: (data) => data.myDmuPhase === 'p1' &&
        data.myDmuP1GravenCount === 2 && myDmuNativeVfxPhaseEnabled(data, 'p1'),
      promise: async (data, matches) => {
        const actorId = matches.id ?? matches.param5 ?? matches.param6 ?? matches.sourceId;
        matches.myDmuNativeVfxActorId = myDmuNormalizeActorId(actorId);
        matches.myDmuNativeVfxVerified = await myDmuNativeVfxVerifyNpc(
          data,
          actorId,
          myDmuNativeVfxNpcBaseIds.p1HalfArena,
          'p1.graven2',
        );
      },
      run: (data, matches) => {
        if (matches.myDmuNativeVfxVerified !== true)
          return;
        const actorId = matches.myDmuNativeVfxActorId;
        const npcBaseId = data.myDmuNativeVfxNpcBaseIdByActor?.[actorId];
        myDmuNativeVfxMergeScope(
          data,
          'p1.graven2',
          (vfx) => myDmuBuildP1Graven2HalfVfx(vfx, actorId, npcBaseId),
          'graven2-half',
        );
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
          myDmuActLog('Native VFX coverage gap', {
            scope: 'p1.graven2',
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
        (myDmuNativeVfxPhaseEnabled(data, 'p1') ||
          (myDmuP1CalloutEnabled(data) && matches.target === data.me)),
      preRun: (data, matches) => {
        myDmuP1RecordArrowEffect(data, matches);
        if (myDmuNativeVfxPhaseEnabled(data, 'p1')) {
          myDmuNativeVfxMergeScope(
            data,
            'p1.graven3',
            (vfx) => [
              ...myDmuBuildP1Graven3ArrowVfx(vfx, matches),
              ...myDmuBuildP1TeleportRouteVfx(vfx, data, matches),
            ],
            'graven3-arrow',
          );
        }
        if (!myDmuP1CalloutEnabled(data) || matches.target !== data.me)
          return;
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
      id: '绝妖星 P1 神像3 箭头移除',
      type: 'LosesEffect',
      netRegex: { effectId: Object.keys(myDmuP1ArrowBuffs), capture: true },
      condition: (data) => data.myDmuPhase === 'p1' && myDmuP1IsGraven3(data),
      run: (data, matches) => {
        const actorId = myDmuNormalizeActorId(matches.targetId);
        const effectId = matches.effectId?.toUpperCase();
        if (actorId !== undefined && effectId !== undefined) {
          delete data.myDmuP1ArrowEffectsByActor?.[actorId]?.[effectId];
          if (Object.keys(data.myDmuP1ArrowEffectsByActor?.[actorId] ?? {}).length === 0)
            delete data.myDmuP1ArrowEffectsByActor?.[actorId];
        }
        myDmuNativeVfxFilterScope(
          data,
          'p1.graven3',
          (drawing) => !drawing.id.includes(`.arrow.${actorId}.${effectId?.toLowerCase()}`) &&
            !drawing.id.startsWith(`p1.graven3.teleport.${actorId}.`),
          `graven3-arrow-${effectId}-lost`,
        );
      },
    },
    {
      id: '绝妖星 P1 神像3 连线收集',
      type: 'Tether',
      netRegex: { id: '002D', capture: true },
      condition: (data) => data.myDmuPhase === 'p1' && myDmuP1IsGraven3(data) &&
        (myDmuP1CalloutEnabled(data) || myDmuNativeVfxPhaseEnabled(data, 'p1')),
      preRun: (data, matches) => {
        if (!data.myDmuP1Graven3Tethers.some((entry) => entry.target === matches.target))
          data.myDmuP1Graven3Tethers.push({ sourceId: matches.sourceId, target: matches.target });
        if (myDmuNativeVfxPhaseEnabled(data, 'p1')) {
          myDmuNativeVfxMergeScope(
            data,
            'p1.graven3',
            (vfx) => myDmuBuildP1TetherVfx(vfx, data, matches, 'p1.graven3'),
            'graven3-tether',
          );
        }
      },
    },
    {
      id: '绝妖星 P1 神像3 个人路线原生绘图',
      type: 'Tether',
      netRegex: { id: '002D', capture: true },
      condition: (data, matches) =>
        data.myDmuPhase === 'p1' && myDmuP1IsGraven3(data) && matches.target === data.me &&
        myDmuNativeVfxPersonalGuideEnabled(data),
      run: (data, matches) => {
        const targetId = myDmuNormalizeActorId(matches.targetId) ?? 'unknown';
        myDmuNativeVfxScheduleClockTask(
          data,
          `p1.graven3:personal-route:${targetId}`,
          3000,
          async () => {
            const fence = myDmuNativeVfxCaptureFence(data);
            const sourceIds = [...new Set(data.myDmuP1Graven3Tethers
              .map((entry) => myDmuNormalizeActorId(entry.sourceId))
              .filter((id) => /^4[0-9A-F]{7}$/u.test(id ?? '')))];
            let combatants = [];
            try {
              combatants = sourceIds.length === 0
                ? []
                : await myDmuQueryCombatants(data, sourceIds, 'p1.graven3-route');
            } catch (error) {
              myDmuActLog('Native VFX coverage gap', {
                scope: 'p1.graven3',
                reason: 'route-combatant-query-failed',
                error: `${error}`,
                fallback: false,
              });
            }
            if (!myDmuNativeVfxFenceCurrent(data, fence))
              return false;
            data.myDmuP1Combatants = combatants;
            const tether = data.myDmuP1Graven3Tethers.find((entry) => entry.target === data.me);
            const sourceX = tether === undefined
              ? undefined
              : myDmuP1CombatantPosX(data.myDmuP1Combatants, tether.sourceId);
            const role = myDmuGetRpByName(data, data.me);
            const adjustedSourceX = myDmuP1TeleportAdjustedSourceX(data, role, sourceX);
            const ownId = myDmuNormalizeActorId(myDmuGetHexIdByName(data, data.me));
            return myDmuNativeVfxMergeScope(
              data,
              'p1.graven3',
              (vfx) => myDmuBuildP1Graven3RouteVfx(vfx, data, ownId, adjustedSourceX),
              'graven3-personal-route',
            );
          },
        );
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
          myDmuActLog('Native VFX coverage gap', {
            scope: 'p1.graven3',
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
      id: '绝妖星 P1 真假机制原生绘图',
      type: 'StartsUsing',
      netRegex: { id: 'BA94', capture: true },
      condition: (data) => data.myDmuPhase === 'p1' &&
        myDmuNativeVfxPhaseEnabled(data, 'p1'),
      run: (data, matches) => {
        const scope = myDmuP1IsGraven3(data) ? 'p1.fireThunder' : 'p1.truefalse';
        myDmuNativeVfxReplaceScope(
          data,
          scope,
          (vfx) => myDmuBuildP1TruthPartyVfx(vfx, data, scope, matches),
          'BA94-start',
        );
      },
    },
    {
      id: '绝妖星 P1 真假机制原生绘图清理',
      type: 'Ability',
      netRegex: { id: 'BA94', capture: false },
      condition: (data) => data.myDmuPhase === 'p1',
      run: (data) => {
        myDmuNativeVfxClearScope(data, 'p1.truefalse', 'BA94-resolve');
        myDmuNativeVfxClearScope(data, 'p1.fireThunder', 'BA94-resolve');
        data.myDmuP1FireMarkerId = undefined;
        data.myDmuP1FireMarkerTargetIds = [];
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
        (myDmuBooleanConfig(data, 'MyDMU_P2ActionCallout', true) ||
          myDmuNativeVfxPhaseEnabled(data, 'p2')),
      preRun: (data) => {
        data.myDmuP2FuturePastCount++;
        data.myDmuP2FuturePastFlip = false;
      },
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
        (myDmuBooleanConfig(data, 'MyDMU_P2ActionCallout', true) ||
          myDmuNativeVfxPhaseEnabled(data, 'p2')),
      preRun: (data) => {
        data.myDmuP2FuturePastCount++;
        data.myDmuP2FuturePastFlip = true;
      },
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
      id: '绝妖星 P2 消灭之脚原生绘图',
      type: 'StartsUsing',
      netRegex: { id: ['BADC', 'BADD'], capture: true },
      condition: (data) => data.myDmuPhase === 'p2' &&
        myDmuNativeVfxPhaseEnabled(data, 'p2'),
      run: (data, matches) => myDmuNativeVfxMergeScope(
        data,
        'p2.futurePast',
        (vfx) => myDmuBuildP2FuturePastVfx(vfx, data, matches),
        `${matches.id}-start`,
      ),
    },
    {
      id: '绝妖星 P2 消灭之脚原生轮次',
      type: 'StartsUsing',
      netRegex: { id: ['BADC', 'BADD'], capture: true },
      condition: (data) => data.myDmuPhase === 'p2' &&
        myDmuNativeVfxPhaseEnabled(data, 'p2'),
      run: (data, matches) => {
        if (myDmuNativeVfxAcceptLogicalEvent(
          data,
          'p2.futurePast:all-things-start',
          1000,
          matches,
        ) === undefined)
          return;
        data.myDmuP2AllThingsEndingCount++;
        if (data.myDmuP2AllThingsEndingCount !== 4)
          return;
        const kickId = matches.id?.toUpperCase();
        if (!['BADC', 'BADD'].includes(kickId))
          return;
        data.myDmuP2LastKickId = kickId;
        myDmuRenderP2EndTowerGuide(data, `fourth-${kickId}`);
      },
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
      id: '绝妖星 P2 消灭之脚原生绘图清理',
      type: 'Ability',
      netRegex: { id: ['BADC', 'BADD'], capture: true },
      condition: (data) => data.myDmuPhase === 'p2',
      run: (data, matches) => {
        const event = myDmuNativeVfxAcceptLogicalEvent(
          data,
          'p2.futurePast:all-things-resolve',
          1000,
          matches,
        );
        if (event === undefined)
          return;
        myDmuNativeVfxScheduleClockTask(
          data,
          `p2.futurePast:all-things-resolve:${event.ordinal}`,
          200,
          () => myDmuNativeVfxClearScope(data, 'p2.futurePast', 'all-things-resolve'),
        );
      },
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
        (myDmuBooleanConfig(data, 'MyDMU_P2ActionCallout', true) ||
          myDmuNativeVfxPhaseEnabled(data, 'p2')),
      durationSeconds: 5,
      infoText: (data, matches) => myDmuBooleanConfig(data, 'MyDMU_P2ActionCallout', true)
        ? myDmuCacheSpeech(data, 'p2SingleWing', matches.id === 'BACD' ? '去右' : '去左')
        : undefined,
      tts: null,
      soundVolume: 0,
      run: (data, matches) => {
        if (myDmuNativeVfxPhaseEnabled(data, 'p2')) {
          myDmuNativeVfxReplaceScope(
            data,
            'p2.wings',
            (vfx) => myDmuBuildP2WingsVfx(vfx, matches),
            `${matches.id}-start`,
          );
        }
        myDmuSpeakCached(data, 'p2SingleWing');
      },
    },
    {
      id: '绝妖星 P2 单翼半场原生绘图清理',
      type: 'Ability',
      netRegex: { id: ['BACD', 'BACE'], capture: false },
      condition: (data) => data.myDmuPhase === 'p2',
      run: (data) => myDmuNativeVfxClearScope(data, 'p2.wings', 'single-wing-resolve'),
    },
    {
      id: '绝妖星 P2 双翼破坏',
      type: 'StartsUsing',
      netRegex: { id: 'C487', capture: false },
      condition: (data) => data.myDmuPhase === 'p2' &&
        (myDmuBooleanConfig(data, 'MyDMU_P2ActionCallout', true) ||
          myDmuNativeVfxPhaseEnabled(data, 'p2')),
      promise: async (data) => {
        data.myDmuP2FarNearTargetIds = await myDmuNativeVfxResolveFarNear(data);
      },
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
      run: (data) => {
        if (myDmuNativeVfxPhaseEnabled(data, 'p2') &&
            data.myDmuP2FarNearTargetIds.length === 2) {
          myDmuNativeVfxReplaceScope(
            data,
            'p2.farNear',
            (vfx) => myDmuBuildP2FarNearVfx(vfx, data.myDmuP2FarNearTargetIds),
            'C487-start',
          );
        }
        myDmuSpeakCached(data, 'p2WingsOfDestruction');
      },
    },
    {
      id: '绝妖星 P2 双翼破坏原生绘图清理',
      type: 'Ability',
      netRegex: { id: 'C487', capture: false },
      condition: (data) => data.myDmuPhase === 'p2',
      run: (data) => myDmuNativeVfxClearScope(data, 'p2.farNear', 'C487-resolve'),
    },
    {
      id: '绝妖星 P2 三连环准备',
      type: 'StartsUsing',
      netRegex: { id: 'BADF', capture: false },
      condition: (data) => data.myDmuPhase === 'p2' &&
        myDmuNativeVfxPhaseEnabled(data, 'p2'),
      run: (data) => {
        for (let wave = 1; wave <= 3; wave++)
          myDmuNativeVfxClearScope(data, `p2.trine.w${wave}`, 'BADF-reset');
        data.myDmuP2Trine = {
          armed: true,
          wave: 0,
          resolvedWave: 0,
          lastOpenAt: undefined,
          actorsByWave: { 1: {}, 2: {}, 3: {} },
          waveByActor: {},
        };
      },
    },
    {
      id: '绝妖星 P2 三连环原生绘图',
      type: 'ActorControlExtra',
      netRegex: {
        category: '019D',
        param1: '10',
        param2: '20',
        param3: '0',
        param4: '0',
        capture: true,
      },
      condition: (data) => data.myDmuPhase === 'p2' &&
        data.myDmuP2Trine?.armed === true && myDmuNativeVfxPhaseEnabled(data, 'p2'),
      promise: async (data, matches) => {
        const actorId = matches.id ?? matches.param5 ?? matches.param6 ?? matches.sourceId;
        matches.myDmuNativeVfxActorId = myDmuNormalizeActorId(actorId);
        matches.myDmuNativeVfxVerified = await myDmuNativeVfxVerifyNpc(
          data,
          actorId,
          myDmuNativeVfxNpcBaseIds.p2Trine,
          'p2.trine',
        );
      },
      run: (data, matches) => {
        if (matches.myDmuNativeVfxVerified !== true)
          return;
        myDmuRecordP2TrineActor(data, matches);
      },
    },
    {
      id: '绝妖星 P2 三连环对象关闭清理',
      type: 'ActorControlExtra',
      netRegex: {
        category: '019D',
        param1: '4',
        param2: '8',
        param3: '0',
        param4: '0',
        capture: true,
      },
      condition: (data) => data.myDmuPhase === 'p2' &&
        data.myDmuP2Trine?.armed === true,
      promise: async (data, matches) => {
        const actorId = matches.id ?? matches.param5 ?? matches.param6 ?? matches.sourceId;
        matches.myDmuNativeVfxVerified = await myDmuNativeVfxVerifyNpc(
          data,
          actorId,
          myDmuNativeVfxNpcBaseIds.p2Trine,
          'p2.trine.resolve',
        );
      },
      run: (data, matches) => {
        if (matches.myDmuNativeVfxVerified !== true)
          return;
        myDmuResolveP2TrineLogicalEvent(data, matches);
      },
    },
    {
      id: '绝妖星 P2 三连环波次清理',
      type: 'Ability',
      netRegex: { id: 'BAE0', capture: true },
      condition: (data) => data.myDmuPhase === 'p2' &&
        data.myDmuP2Trine?.armed === true,
      run: (data, matches) => myDmuResolveP2TrineLogicalEvent(data, matches),
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
      id: '绝妖星 P3 元素对象记录',
      type: 'CombatantMemory',
      netRegex: {
        change: 'Add',
        pair: [{ key: 'BNpcID', value: Object.keys(myDmuP3ElementObjectKinds) }],
        capture: true,
      },
      condition: (data) => data.myDmuPhase === 'p3',
      preRun: (data, matches) => myDmuRecordP3ElementObject(data, matches),
    },
    {
      id: '绝妖星 P3 水火VFX状态',
      type: 'GainsEffect',
      netRegex: { effectId: ['640', '641'], capture: true },
      condition: (data) => data.myDmuPhase === 'p3' && myDmuNativeVfxPhaseEnabled(data, 'p3'),
      preRun: (data, matches) => myDmuRecordP3ElementBuff(data, matches),
    },
    {
      id: '绝妖星 P3 水火VFX移除',
      type: 'LosesEffect',
      netRegex: { effectId: ['640', '641'], capture: true },
      condition: (data) => data.myDmuPhase === 'p3' && myDmuNativeVfxPhaseEnabled(data, 'p3'),
      run: (data, matches) => myDmuLoseP3ElementBuff(data, matches),
    },
    {
      id: '绝妖星 P3 元素大钢铁',
      type: 'StartsUsing',
      netRegex: { id: 'BB12', capture: true },
      condition: (data) => data.myDmuPhase === 'p3' && myDmuNativeVfxPhaseEnabled(data, 'p3'),
      run: (data, matches) => {
        myDmuP3RecordBossHeading(data, 'exdeath', matches);
        myDmuP3VfxState(data).elements.exCasting = true;
        myDmuNativeVfxReplaceScope(
          data,
          'p3.elements.bigCircle',
          (vfx) => myDmuBuildP3BigCircleVfx(vfx, matches),
          'BB12-start',
        );
        myDmuRenderP3ElementGuide(data, 'BB12-start');
      },
    },
    {
      id: '绝妖星 P3 元素大钢铁清理',
      type: 'Ability',
      netRegex: { id: 'BB12', capture: false },
      condition: (data) => data.myDmuPhase === 'p3',
      run: (data) => myDmuNativeVfxClearScope(data, 'p3.elements.bigCircle', 'BB12-resolve'),
    },
    {
      id: '绝妖星 P3 本色出演的我绘图',
      type: 'StartsUsing',
      netRegex: { id: 'BAEE', capture: true },
      condition: (data) => data.myDmuPhase === 'p3' && myDmuNativeVfxPhaseEnabled(data, 'p3'),
      run: (data, matches) => {
        myDmuP3RecordBossHeading(data, 'kefka', matches);
        myDmuNativeVfxReplaceScope(
          data,
          'p3.look',
          (vfx) => myDmuBuildP3LookVfx(vfx, matches),
          'BAEE-start',
        );
      },
    },
    {
      id: '绝妖星 P3 本色出演的我清理',
      type: 'Ability',
      netRegex: { id: 'BAEE', capture: false },
      condition: (data) => data.myDmuPhase === 'p3',
      run: (data) => myDmuNativeVfxClearScope(data, 'p3.look', 'BAEE-resolve'),
    },
    {
      id: '绝妖星 P3 诅咒赦令绘图',
      type: 'StartsUsing',
      netRegex: { id: 'BB01', capture: true },
      condition: (data) => data.myDmuPhase === 'p3' && myDmuNativeVfxPhaseEnabled(data, 'p3'),
      run: (data, matches) => {
        myDmuP3RecordBossHeading(data, 'chaos', matches);
        myDmuNativeVfxReplaceScope(
          data,
          'p3.edict',
          (vfx) => myDmuBuildP3EdictVfx(vfx, matches),
          'BB01-start',
        );
      },
    },
    {
      id: '绝妖星 P3 诅咒赦令清理',
      type: 'Ability',
      netRegex: { id: 'BB01', capture: false },
      condition: (data) => data.myDmuPhase === 'p3',
      run: (data) => myDmuNativeVfxClearScope(data, 'p3.edict', 'BB01-resolve'),
    },
    {
      id: '绝妖星 P3 本影暴碎绘图',
      type: 'StartsUsing',
      netRegex: { id: 'BB00', capture: true },
      condition: (data) => data.myDmuPhase === 'p3' && myDmuNativeVfxPhaseEnabled(data, 'p3'),
      run: async (data, matches) => await myDmuRenderP3Umbra(data, matches),
    },
    {
      id: '绝妖星 P3 本影暴碎清理',
      type: 'Ability',
      netRegex: { id: 'BB00', capture: false },
      condition: (data) => data.myDmuPhase === 'p3',
      run: (data) => myDmuNativeVfxClearScope(data, 'p3.umbra', 'BB00-resolve'),
    },
    {
      id: '绝妖星 P3 真空波绘图',
      type: 'StartsUsing',
      netRegex: { id: 'BB13', capture: true },
      condition: (data) => data.myDmuPhase === 'p3' && myDmuNativeVfxPhaseEnabled(data, 'p3'),
      run: async (data, matches) => await myDmuRenderP3Vacuum(data, matches),
    },
    {
      id: '绝妖星 P3 黑洞记录',
      type: 'AddedCombatant',
      netRegex: { npcBaseId: '19512', npcNameId: '8343', capture: true },
      condition: (data) => data.myDmuPhase === 'p3' && myDmuNativeVfxPhaseEnabled(data, 'p3'),
      preRun: (data, matches) => myDmuRecordP3Blackhole(data, matches),
    },
    {
      id: '绝妖星 P3 黑洞连线',
      type: 'Tether',
      netRegex: { id: '0054', capture: true },
      condition: (data) => data.myDmuPhase === 'p3' && myDmuNativeVfxPhaseEnabled(data, 'p3'),
      run: (data, matches) => myDmuRecordP3BlackholeTether(data, matches),
    },
    {
      id: '绝妖星 P3 场地对象精确移除',
      type: 'ActorControlExtra',
      netRegex: { category: '025F', capture: true },
      condition: (data) => data.myDmuPhase === 'p3',
      run: (data, matches) => myDmuRemoveP3Object(data, matches.id, '025F'),
    },
    {
      id: '绝妖星 P3 踩塔目标记录',
      type: 'HeadMarker',
      netRegex: { id: '00A1', capture: true },
      condition: (data) => data.myDmuPhase === 'p3' && myDmuNativeVfxPhaseEnabled(data, 'p3'),
      preRun: (data, matches) => myDmuRecordP3TowerMarker(data, matches),
    },
    {
      id: '绝妖星 P3 踩塔跺脚计数',
      type: 'StartsUsing',
      netRegex: { id: 'BB0D', capture: false },
      condition: (data) => data.myDmuPhase === 'p3' && myDmuNativeVfxPhaseEnabled(data, 'p3'),
      run: (data) => {
        const state = myDmuP3VfxState(data).tower;
        state.bb0dCount++;
        if (state.bb0dCount === 1 || state.bb0dCount === 9)
          myDmuRenderP3Tower(data, `BB0D-wave-${state.bb0dCount === 1 ? 1 : 2}`);
      },
    },
    {
      id: '绝妖星 P3 踩塔分摊快照',
      type: 'Ability',
      netRegex: { id: 'BB03', capture: true },
      condition: (data) => data.myDmuPhase === 'p3' && myDmuNativeVfxPhaseEnabled(data, 'p3'),
      run: async (data, matches) => await myDmuSnapshotP3Tower(data, matches),
    },
    {
      id: '绝妖星 P3 踩塔击退计数',
      type: 'Ability',
      netRegex: { id: 'BAF0', capture: false },
      condition: (data) => data.myDmuPhase === 'p3' && myDmuNativeVfxPhaseEnabled(data, 'p3'),
      run: (data) => {
        myDmuP3VfxState(data).tower.baf0Count++;
        myDmuRenderP3Tower(data, 'BAF0-resolve');
      },
    },
    {
      id: '绝妖星 P3 踩塔移动标签',
      type: 'StartsUsing',
      netRegex: { id: 'BB11', capture: false },
      condition: (data) => data.myDmuPhase === 'p3' && myDmuNativeVfxPhaseEnabled(data, 'p3'),
      run: (data) => {
        myDmuP3VfxState(data).tower.moveUntil = myDmuNativeVfxClock(data).now + 6000;
        myDmuRenderP3Tower(data, 'BB11-move');
      },
    },
    {
      id: '绝妖星 P3 踩塔最终清理',
      type: 'Ability',
      netRegex: { id: 'BB06', capture: false },
      condition: (data) => data.myDmuPhase === 'p3',
      run: (data) => {
        const state = myDmuP3VfxState(data).tower;
        state.bb06Count++;
        if (state.bb06Count >= 2)
          myDmuNativeVfxClearScope(data, 'p3.tower', 'BB06-final-resolve');
      },
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
        (myDmuBooleanConfig(data, 'MyDMU_P3ActionCallout', true) ||
          myDmuNativeVfxPersonalGuideEnabled(data)) &&
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
      run: (data) => {
        myDmuRenderP3ElementGuide(data, 'firewall-target');
        if (myDmuBooleanConfig(data, 'MyDMU_P3ActionCallout', true))
          myDmuSpeakCached(data, 'p3FirewallTarget');
      },
    },
    {
      id: '绝妖星 P3 防火墙移除',
      type: 'LosesEffect',
      netRegex: { effectId: Object.keys(myDmuP3FirewallEffects), capture: true },
      condition: (data, matches) => data.myDmuPhase === 'p3' && matches.target === data.me,
      run: (data) => {
        data.myDmuP3FirewallTargetKind = undefined;
        myDmuRenderP3ElementGuide(data, 'firewall-remove');
      },
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
        (myDmuBooleanConfig(data, 'MyDMU_P3ActionCallout', true) ||
          myDmuNativeVfxPhaseEnabled(data, 'p3')),
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
      run: (data, matches) => {
        if (myDmuNativeVfxPhaseEnabled(data, 'p3'))
          myDmuRenderP3Implosion(data, matches);
        if (myDmuBooleanConfig(data, 'MyDMU_P3ActionCallout', true))
          myDmuSpeakCached(data, 'p3LatitudeLongitude');
      },
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
        (myDmuBooleanConfig(data, 'MyDMU_P3ActionCallout', true) ||
          myDmuNativeVfxPhaseEnabled(data, 'p3')),
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
      run: async (data, matches) => {
        if (myDmuNativeVfxPhaseEnabled(data, 'p3'))
          await myDmuRenderP3Slap(data, matches);
        if (myDmuBooleanConfig(data, 'MyDMU_P3ActionCallout', true))
          myDmuSpeakCached(data, 'p3LoudSlap');
      },
    },
    {
      id: '绝妖星 P3 响亮亮耳光清理',
      type: 'Ability',
      netRegex: { id: ['BAE6', 'BAE7'], capture: false },
      condition: (data) => data.myDmuPhase === 'p3',
      run: (data) => myDmuNativeVfxClearScope(data, 'p3.slap', 'slap-resolve'),
    },
    {
      id: '绝妖星 P3 暴雷死刑',
      type: 'StartsUsing',
      netRegex: { id: 'BB09', capture: true },
      condition: (data) =>
        data.myDmuPhase === 'p3' &&
        ((data.role === 'tank' && myDmuBooleanConfig(data, 'MyDMU_P3ActionCallout', true)) ||
          myDmuNativeVfxPhaseEnabled(data, 'p3')),
      durationSeconds: 4,
      suppressSeconds: 1,
      alertText: (data) => data.role === 'tank' &&
        myDmuBooleanConfig(data, 'MyDMU_P3ActionCallout', true)
        ? myDmuCacheSpeech(data, 'p3ThunderTankbuster', '死刑')
        : undefined,
      tts: null,
      soundVolume: 0,
      run: async (data, matches) => {
        if (myDmuNativeVfxPhaseEnabled(data, 'p3'))
          await myDmuRenderP3Thunder(data, matches);
        if (data.role === 'tank' && myDmuBooleanConfig(data, 'MyDMU_P3ActionCallout', true))
          myDmuSpeakCached(data, 'p3ThunderTankbuster');
      },
    },
    {
      id: '绝妖星 P3 暴雷死刑清理',
      type: 'Ability',
      netRegex: { id: 'BB09', capture: false },
      condition: (data) => data.myDmuPhase === 'p3',
      run: (data) => myDmuNativeVfxClearScope(data, 'p3.thunder', 'BB09-resolve'),
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
        myDmuRenderP3Mahjong(data, 'headmarkers');
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
        myDmuRenderP3Mahjong(data, 'blast-lines');
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
          myDmuNativeVfxClearScope(data, 'p3.mahjong', 'BAE4-final-resolve');
          if (data.myDmuP3Mahjong.marked)
            myDmuScheduleClearMarks(data, 'p3Mahjong', 0.5, (data) => data.myDmuP3Mahjong.resolveCount >= 8);
          return;
        }
        myDmuRenderP3Mahjong(data, `BAE4-resolve-${data.myDmuP3Mahjong.resolveCount}`);
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
        myDmuRefreshP4NativeVfxTruth(data, truth.target, 'actor-control');
        myDmuRetryAction(() => myDmuTrySendP4BuffChats(data), 8, 500);
        myDmuRetryAction(() => myDmuProcessP4MarkTiming(data, 'truth-actor-control'), 12, 250);
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
        myDmuRefreshP4NativeVfxTruth(data, truth.target, 'status-list');
        myDmuRetryAction(() => myDmuTrySendP4BuffChats(data), 8, 500);
        myDmuRetryAction(() => myDmuProcessP4MarkTiming(data, 'truth-status'), 12, 250);
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
          myDmuRefreshP4NativeVfxTruth(data, truth.target, 'headmarker');
          myDmuRetryAction(() => myDmuTrySendP4BuffChats(data), 8, 500);
          myDmuRetryAction(() => myDmuProcessP4MarkTiming(data, 'truth-headmarker'), 12, 250);
        }
        myDmuP4MagicRecordReleaseMarker(data, matches, 'magic-headmarker');
      },
    },
    {
      id: '绝妖星 P4 原生艾克斯迪司射线记录',
      type: 'StartsUsing',
      netRegex: { id: Object.keys(myDmuP4ExdeathBeamIds), capture: true },
      condition: (data) =>
        data.myDmuPhase === 'p4' && myDmuNativeVfxPhaseEnabled(data, 'p4'),
      run: (data, matches) => myDmuP4RecordExdeathSource(data, matches),
    },
    {
      id: '绝妖星 P4 原生艾克斯迪司射线结算',
      type: 'Ability',
      netRegex: { id: Object.keys(myDmuP4ExdeathBeamIds), capture: true },
      condition: (data) =>
        data.myDmuPhase === 'p4' && myDmuNativeVfxPhaseEnabled(data, 'p4'),
      run: (data, matches) => myDmuResolveP4ExdeathSource(data, matches),
    },
    {
      id: '绝妖星 P4 原生元素阶段证据重试',
      type: 'StartsUsing',
      netRegex: { id: myDmuP4ElementStartIds, capture: true },
      condition: (data) =>
        data.myDmuPhase === 'p4' && myDmuNativeVfxPhaseEnabled(data, 'p4'),
      run: (data, matches) => {
        myDmuRenderP4Elements(data, 'short', `${matches.id}-stage-evidence`);
        myDmuRenderP4Elements(data, 'long', `${matches.id}-stage-evidence`);
      },
    },
    {
      id: '绝妖星 P4 原生通用魔法记录',
      type: 'StartsUsing',
      netRegex: { id: myDmuP4CommonSpellIds, capture: true },
      condition: (data) =>
        data.myDmuPhase === 'p4' && myDmuNativeVfxPhaseEnabled(data, 'p4'),
      run: (data, matches) => myDmuRecordP4CommonCast(data, matches),
    },
    {
      id: '绝妖星 P4 原生通用魔法结算',
      type: 'Ability',
      netRegex: { id: myDmuP4CommonSpellIds, capture: true },
      condition: (data) =>
        data.myDmuPhase === 'p4' && myDmuNativeVfxPhaseEnabled(data, 'p4'),
      run: (data, matches) => myDmuResolveP4CommonCast(data, matches),
    },
    {
      id: '绝妖星 P4 原生混沌落点记录',
      type: 'StartsUsing',
      netRegex: { id: Object.keys(myDmuP4ChaosPlacementIds), capture: true },
      condition: (data) =>
        data.myDmuPhase === 'p4' && myDmuNativeVfxPhaseEnabled(data, 'p4'),
      run: (data, matches) => myDmuRecordP4ChaosPlacement(data, matches),
    },
    {
      id: '绝妖星 P4 原生混沌落点结算',
      type: 'Ability',
      netRegex: { id: Object.keys(myDmuP4ChaosPlacementIds), capture: true },
      condition: (data) =>
        data.myDmuPhase === 'p4' && myDmuNativeVfxPhaseEnabled(data, 'p4'),
      run: (data, matches) => myDmuResolveP4ChaosPlacement(data, matches),
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
        myDmuRetryAction(() => myDmuTrySendP4MandarinDuckChats(data), 10, 500);
      },
    },
    {
      id: '绝妖星 P4 鸳鸯锅暗黑光',
      type: 'StartsUsing',
      netRegex: { id: myDmuP4WhiteAntilightId, capture: true },
      condition: (data) => data.myDmuPhase === 'p4',
      run: (data, matches) => {
        myDmuRecordP4MandarinDuckAntilight(data, matches);
        myDmuRetryAction(() => myDmuTrySendP4MandarinDuckChats(data), 12, 500);
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
        myDmuRetryAction(() => myDmuTrySendP4BuffChats(data), 8, 500);
        myDmuRetryAction(() => myDmuProcessP4MarkTiming(data, 'buff-cache'), 12, 250);
      },
    },
    {
      id: '绝妖星 P4 原生元素范围',
      type: 'GainsEffect',
      netRegex: { effectId: myDmuP4ElementBuffs, capture: true },
      condition: (data) =>
        data.myDmuPhase === 'p4' && myDmuNativeVfxPhaseEnabled(data, 'p4'),
      run: (data, matches) => myDmuScheduleP4NativeBuff(
        data,
        matches,
        9.5,
        (data, _record, round) => myDmuRenderP4Elements(
          data,
          round,
          `${matches.effectId}-${matches.targetId}-remaining-9.5`,
        ),
      ),
    },
    {
      id: '绝妖星 P4 原生元素范围清除',
      type: 'LosesEffect',
      netRegex: { effectId: myDmuP4ElementBuffs, capture: true },
      condition: (data) =>
        data.myDmuPhase === 'p4' && myDmuNativeVfxPhaseEnabled(data, 'p4'),
      run: (data, matches) => myDmuLoseP4NativeBuff(data, matches),
    },
    {
      id: '绝妖星 P4 原生石化眼标签',
      type: 'GainsEffect',
      netRegex: { effectId: myDmuP4PetrifyBuff, capture: true },
      condition: (data) =>
        data.myDmuPhase === 'p4' && myDmuNativeVfxPhaseEnabled(data, 'p4'),
      run: (data, matches) => myDmuScheduleP4NativeBuff(
        data,
        matches,
        14.5,
        (data, _record, round) => myDmuRenderP4Eyes(
          data,
          round,
          `${matches.effectId}-${matches.targetId}-remaining-14.5`,
        ),
      ),
    },
    {
      id: '绝妖星 P4 原生石化眼标签清除',
      type: 'LosesEffect',
      netRegex: { effectId: myDmuP4PetrifyBuff, capture: true },
      condition: (data) =>
        data.myDmuPhase === 'p4' && myDmuNativeVfxPhaseEnabled(data, 'p4'),
      run: (data, matches) => myDmuLoseP4NativeBuff(data, matches),
    },
    {
      id: '绝妖星 P4 原生加速度标签',
      type: 'GainsEffect',
      netRegex: { effectId: myDmuP4AccelerationBuff, capture: true },
      condition: (data) =>
        data.myDmuPhase === 'p4' && myDmuNativeVfxPhaseEnabled(data, 'p4'),
      run: (data, matches) => myDmuScheduleP4NativeBuff(
        data,
        matches,
        14.5,
        (data, record) => myDmuRenderP4AccelerationLabel(
          data,
          record,
          `${matches.effectId}-${matches.targetId}-remaining-14.5`,
        ),
      ),
    },
    {
      id: '绝妖星 P4 原生加速度标签清除',
      type: 'LosesEffect',
      netRegex: { effectId: myDmuP4AccelerationBuff, capture: true },
      condition: (data) =>
        data.myDmuPhase === 'p4' && myDmuNativeVfxPhaseEnabled(data, 'p4'),
      run: (data, matches) => myDmuLoseP4NativeBuff(data, matches),
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
        const effectId = matches.effectId.toUpperCase();
        const duration = myDmuNumber(matches.duration);
        myDmuRetryAction(() => {
          const rec = myDmuP4RecordForEvent(data, matches.targetId, effectId, duration);
          return myDmuTrySendP4ExecuteChat(data, rec);
        }, 8, 300);
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
      id: '绝妖星 P5 原生复读机目标',
      type: 'CombatantMemory',
      netRegex: {
        change: 'Change',
        pair: [{ key: 'TargetID', value: '1[0-9A-F]{7}' }],
        capture: true,
      },
      condition: (data) => myDmuNativeVfxPhaseEnabled(data, 'p5'),
      run: (data, matches) => myDmuP5NativeRecordBossTarget(data, {
        ...matches,
        sourceId: matches.id ?? matches.sourceId,
        targetId: matches.pairTargetID,
      }),
    },
    {
      id: '绝妖星 P5 原生复读机开始',
      type: 'StartsUsing',
      netRegex: { id: 'BB40', capture: true },
      condition: (data) => myDmuNativeVfxPhaseEnabled(data, 'p5'),
      run: (data, matches) => myDmuP5NativeEnterRepeater(data, matches),
    },
    {
      id: '绝妖星 P5 原生复读机无敌获得',
      type: 'GainsEffect',
      netRegex: { effectId: myDmuP5NativeInvulnerabilityLogEffects, capture: true },
      condition: (data) => data.myDmuPhase === 'p5' && myDmuNativeVfxPhaseEnabled(data, 'p5'),
      run: (data, matches) => myDmuP5NativeRecordInvulnerability(data, {
        ...matches,
        present: true,
      }),
    },
    {
      id: '绝妖星 P5 原生复读机无敌失去',
      type: 'LosesEffect',
      netRegex: { effectId: myDmuP5NativeInvulnerabilityLogEffects, capture: true },
      condition: (data) => data.myDmuPhase === 'p5' && myDmuNativeVfxPhaseEnabled(data, 'p5'),
      run: (data, matches) => myDmuP5NativeRecordInvulnerability(data, {
        ...matches,
        present: false,
      }),
    },
    {
      id: '绝妖星 P5 原生洪水开始',
      type: 'StartsUsing',
      netRegex: { id: 'C13F', capture: true },
      condition: (data) => data.myDmuPhase === 'p5' && myDmuNativeVfxPhaseEnabled(data, 'p5'),
      run: (data) => myDmuP5NativeResetFlood(data),
    },
    {
      id: '绝妖星 P5 原生洪水记录',
      type: 'StartsUsingExtra',
      netRegex: { id: 'C183', capture: true },
      condition: (data) => data.myDmuPhase === 'p5' && myDmuNativeVfxPhaseEnabled(data, 'p5'),
      run: (data, matches) => myDmuP5NativeRecordFlood(data, matches),
    },
    {
      id: '绝妖星 P5 原生洪水结算',
      type: 'Ability',
      netRegex: { id: 'BB4F', capture: true },
      condition: (data) => data.myDmuPhase === 'p5' && myDmuNativeVfxPhaseEnabled(data, 'p5'),
      run: (data, matches) => myDmuP5NativeResolveFlood(data, matches),
    },
    {
      id: '绝妖星 P5 原生交响曲开始',
      type: 'StartsUsing',
      netRegex: { id: 'BB50', capture: true },
      condition: (data) => data.myDmuPhase === 'p5' && myDmuNativeVfxPhaseEnabled(data, 'p5'),
      run: (data, matches) => myDmuP5NativeStartSymphony(data, matches),
    },
    {
      id: '绝妖星 P5 原生交响曲命中',
      type: 'Ability',
      netRegex: { id: 'BB54', capture: true },
      condition: (data) => data.myDmuPhase === 'p5' && myDmuNativeVfxPhaseEnabled(data, 'p5'),
      run: (data, matches) => myDmuP5NativeRecordSymphonyHit(data, matches),
    },
    {
      id: '绝妖星 P5 原生交响曲 Buff获得',
      type: 'GainsEffect',
      netRegex: { effectId: ['14E6', '14E7'], capture: true },
      condition: (data) => data.myDmuPhase === 'p5' && myDmuNativeVfxPhaseEnabled(data, 'p5'),
      run: (data, matches) => myDmuP5NativeRecordSymphonyBuff(data, matches),
    },
    {
      id: '绝妖星 P5 原生交响曲 Buff失去',
      type: 'LosesEffect',
      netRegex: { effectId: ['14E6', '14E7'], capture: true },
      condition: (data) => data.myDmuPhase === 'p5' && myDmuNativeVfxPhaseEnabled(data, 'p5'),
      run: (data, matches) => myDmuP5NativeLoseSymphonyBuff(data, {
        ...matches,
        present: false,
      }),
    },
    {
      id: '绝妖星 P5 原生三星重置',
      type: 'StartsUsing',
      netRegex: { id: 'BB42', capture: true },
      condition: (data) => data.myDmuPhase === 'p5' && myDmuNativeVfxPhaseEnabled(data, 'p5'),
      run: (data) => myDmuP5NativeResetTrio(data),
    },
    {
      id: '绝妖星 P5 原生三星塔记录',
      type: 'CombatantMemory',
      netRegex: {
        change: 'Add',
        pair: [{ key: 'BNpcID', value: Object.keys(myDmuP5NativeTrioTowerElements) }],
        capture: true,
      },
      condition: (data) => data.myDmuPhase === 'p5' && myDmuNativeVfxPhaseEnabled(data, 'p5'),
      run: (data, matches) => myDmuP5NativeRecordTrioTower(data, matches),
    },
    {
      id: '绝妖星 P5 原生三星状态',
      type: 'GainsEffect',
      netRegex: { effectId: Object.keys(myDmuP5NativeTrioElements), capture: true },
      condition: (data) => data.myDmuPhase === 'p5' && myDmuNativeVfxPhaseEnabled(data, 'p5'),
      run: (data, matches) => myDmuP5NativeRecordTrioBuff(data, matches),
    },
    {
      id: '绝妖星 P5 原生三星亮灭',
      type: 'ActorControlExtra',
      netRegex: { category: '019D', capture: true },
      condition: (data) => data.myDmuPhase === 'p5' && myDmuNativeVfxPhaseEnabled(data, 'p5'),
      run: (data, matches) => myDmuP5NativeRecordTrioTowerControl(data, matches),
    },
    {
      id: '绝妖星 P5 原生三星 灾祟开始',
      type: 'StartsUsing',
      netRegex: { id: ['C24E', 'C24F'], capture: true },
      condition: (data) => data.myDmuPhase === 'p5' && myDmuNativeVfxPhaseEnabled(data, 'p5'),
      run: (data, matches) => myDmuP5NativeRenderTrioChoice(data, matches),
    },
    {
      id: '绝妖星 P5 原生三星 灾祟结算',
      type: 'Ability',
      netRegex: { id: ['C24E', 'C24F'], capture: true },
      condition: (data) => data.myDmuPhase === 'p5' && myDmuNativeVfxPhaseEnabled(data, 'p5'),
      run: (data, matches) => myDmuP5NativeResolveTrioChoice(data, matches),
    },
    {
      id: '绝妖星 P5 原生地火开始',
      type: 'StartsUsing',
      netRegex: { id: 'BB3B', capture: true },
      condition: (data) => data.myDmuPhase === 'p5' && myDmuNativeVfxPhaseEnabled(data, 'p5'),
      run: (data, matches) => myDmuP5NativeResetGroundFire(data, matches),
    },
    {
      id: '绝妖星 P5 原生地火记录',
      type: 'StartsUsingExtra',
      netRegex: { id: 'BB3C', capture: true },
      condition: (data) => data.myDmuPhase === 'p5' && myDmuNativeVfxPhaseEnabled(data, 'p5'),
      run: (data, matches) => myDmuP5NativeRecordGroundFireCast(data, matches),
    },
    {
      id: '绝妖星 P5 原生地火启动',
      type: 'Ability',
      netRegex: { id: 'BB3C', capture: true },
      condition: (data) => data.myDmuPhase === 'p5' && myDmuNativeVfxPhaseEnabled(data, 'p5'),
      run: (data, matches) => myDmuP5NativeStartGroundFireOccurrence(data, matches),
    },
    {
      id: '绝妖星 P5 原生地火推进',
      type: 'Ability',
      netRegex: { id: 'BB3D', capture: true },
      condition: (data) => data.myDmuPhase === 'p5' && myDmuNativeVfxPhaseEnabled(data, 'p5'),
      run: (data, matches) => myDmuP5NativeAdvanceGroundFire(data, matches),
    },
    {
      id: '绝妖星 P5 原生旋涡开始',
      type: 'StartsUsing',
      netRegex: { id: ['BB3E', 'BB3F'], capture: true },
      condition: (data) => data.myDmuPhase === 'p5' && myDmuNativeVfxPhaseEnabled(data, 'p5'),
      run: (data, matches) => myDmuP5NativeStartVortex(data, matches),
    },
    {
      id: '绝妖星 P5 原生旋涡结算',
      type: 'Ability',
      netRegex: { id: ['BB3E', 'BB3F'], capture: true },
      condition: (data) => data.myDmuPhase === 'p5' && myDmuNativeVfxPhaseEnabled(data, 'p5'),
      run: (data, matches) => myDmuP5NativeResolveVortex(data, matches),
    },
    {
      id: '绝妖星 P5 原生遗弃开始',
      type: 'StartsUsing',
      netRegex: { id: 'BB35', capture: true },
      condition: (data) => data.myDmuPhase === 'p5' && myDmuNativeVfxPhaseEnabled(data, 'p5'),
      run: (data, matches) => myDmuP5NativeStartForsaken(data, matches),
    },
    {
      id: '绝妖星 P5 原生遗弃推进',
      type: 'StartsUsing',
      netRegex: { id: 'BB38', capture: true },
      condition: (data) => data.myDmuPhase === 'p5' && myDmuNativeVfxPhaseEnabled(data, 'p5'),
      run: (data, matches) => myDmuP5NativeAdvanceForsaken(data, matches),
    },
    {
      id: '绝妖星 P5 原生遗弃清理',
      type: 'StartsUsing',
      netRegex: { id: 'BB3A', capture: true },
      condition: (data) => data.myDmuPhase === 'p5' && myDmuNativeVfxPhaseEnabled(data, 'p5'),
      run: (data) => myDmuP5NativeClearForsaken(data, 'BB3A'),
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
      run: (data) => myDmuRetryAction(() => myDmuProcessP4MarkTiming(data, 'element-fallback'), 12, 250),
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
      run: (data) => myDmuRetryAction(() => myDmuProcessP4MarkTiming(data, 'petrify-fallback'), 12, 250),
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
