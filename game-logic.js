// ============================================================
//  game-logic.js - 海贼王猜角色小游戏 完整游戏逻辑
// ============================================================

// ===== 角色数据库 =====
const CHARS_EASY = [
  {name:'波特卡斯·D·艾斯',img:'简单/简单难度-波特卡斯·D·艾斯-9.png'},
  {name:'波雅汉库克',img:'简单/简单难度-波雅汉库克-7.png'},
  {name:'布鲁克',img:'简单/简单难度-布鲁克-26.png'},
  {name:'大和',img:'简单/简单难度-大和-11.png'},
  {name:'冯·克雷',img:'简单/简单难度-冯·克雷、本萨姆、Mr.2-22.png'},
  {name:'弗兰奇',img:'简单/简单难度-弗兰奇-28.png'},
  {name:'哥尔·D·罗杰',img:'简单/简单难度-哥尔・D・罗杰-29.png'},
  {name:'光月御田',img:'简单/简单难度-光月御田-24.png'},
  {name:'加洛特',img:'简单/简单难度-加洛特-8.png'},
  {name:'卡塔库栗',img:'简单/简单难度-卡塔库栗-14.png'},
  {name:'罗罗诺亚·索隆',img:'简单/简单难度-罗罗诺亚·索隆-2.png'},
  {name:'马尔科',img:'简单/简单难度-马尔科-19.png'},
  {name:'蒙奇·D·路飞',img:'简单/简单难度-蒙奇·D·路飞-1.png'},
  {name:'娜美',img:'简单/简单难度-娜美-3.png'},
  {name:'奈菲尔塔利·薇薇',img:'简单/简单难度-奈菲尔塔利·薇薇-21.png'},
  {name:'妮可·罗宾',img:'简单/简单难度-妮可·罗宾-6.png'},
  {name:'佩罗娜',img:'简单/简单难度-佩罗娜-25.png'},
  {name:'乔拉可尔·米霍克',img:'简单/简单难度-乔拉可尔・米霍克（鹰眼）-30.png'},
  {name:'萨博',img:'简单/简单难度-萨博-10.png'},
  {name:'沙·克洛克达尔',img:'简单/简单难度-沙·克洛克达尔-17.png'},
  {name:'甚平',img:'简单/简单难度-甚平-18.png'},
  {name:'斯摩格',img:'简单/简单难度-斯摩格-27.png'},
  {name:'唐吉坷德·罗西南迪',img:'简单/简单难度-唐吉坷德·罗西南迪-13.png'},
  {name:'堂吉诃德·多弗朗明哥',img:'简单/简单难度-堂吉诃德·多弗朗明哥-20.png'},
  {name:'特拉法尔加·罗',img:'简单/简单难度-特拉法尔加・D・瓦铁尔・罗-5.png'},
  {name:'托尼托尼乔巴',img:'简单/简单难度-托尼托尼乔巴-16.png'},
  {name:'文斯莫克·山治',img:'简单/简单难度-文斯莫克·山治-4.png'},
  {name:'乌索普',img:'简单/简单难度-乌索普-15.png'},
  {name:'香克斯',img:'简单/简单难度-香克斯-编号12.png'},
  {name:'尤塔斯基·基德',img:'简单/简单难度-尤塔斯基·基德-23.png'}
];
const CHARS_MEDIUM = [
  {name:'baby5',img:'中等/中等难度-baby5-93.png'},
  {name:'艾尼路',img:'中等/中等难度-艾尼路-34.png'},
  {name:'艾斯巴古',img:'中等/中等难度-艾斯巴古-95.png'},
  {name:'爱德华·纽盖特',img:'中等/中等难度-爱德华·纽盖特（白胡子）-31.png'},
  {name:'伊万科夫',img:'中等/中等难度-安布里奥・伊万科夫-83.png'},
  {name:'奥伦布斯',img:'中等/中等难度-奥伦布斯-82.png'},
  {name:'巴尔托罗米奥',img:'中等/中等难度-巴尔托罗米奥-72.png'},
  {name:'巴索罗缪·大熊',img:'中等/中等难度-巴索罗缪・大熊-61.png'},
  {name:'巴兹尔·霍金斯',img:'中等/中等难度-巴兹尔・霍金斯-47.png'},
  {name:'白星',img:'中等/中等难度-白星-52.png'},
  {name:'贝波',img:'中等/中等难度-贝波-58.png'},
  {name:'贝尔梅尔',img:'中等/中等难度-贝尔梅尔-85.png'},
  {name:'本·贝克曼',img:'中等/中等难度-本・贝克曼-50.png'},
  {name:'比斯塔',img:'中等/中等难度-比斯塔-91.png'},
  {name:'波鲁萨利诺',img:'中等/中等难度-波鲁萨利诺（黄猿）-40.png'},
  {name:'传次郎',img:'中等/中等难度-传次郎-86.png'},
  {name:'达斯琪',img:'中等/中等难度-达斯琪-70.png'},
  {name:'迪埃斯·德雷克',img:'中等/中等难度-迪埃斯・德雷克-45.png'},
  {name:'盖蒙',img:'中等/中等难度-盖蒙-75.png'},
  {name:'光月日和',img:'中等/中等难度-光月日和-53.png'},
  {name:'何松',img:'中等/中等难度-何松-92.png'},
  {name:'基拉',img:'中等/中等难度-基拉-46.png'},
  {name:'锦卫门',img:'中等/中等难度-锦卫门-55.png'},
  {name:'居鲁士',img:'中等/中等难度-居鲁士-96.png'},
  {name:'菊之丞',img:'中等/中等难度-菊之丞-73.png'},
  {name:'卡古',img:'中等/中等难度-卡古-81.png'},
  {name:'卡利·达旦',img:'中等/中等难度-卡利・达旦-98.png'},
  {name:'卡文迪许',img:'中等/中等难度-卡文迪许-59.png'},
  {name:'凯多',img:'中等/中等难度-凯多-37.png'},
  {name:'凯撒·库朗',img:'中等/中等难度-凯撒·库朗-66.png'},
  {name:'克比',img:'中等/中等难度-克比-51.png'},
  {name:'克尔拉',img:'中等/中等难度-克尔拉-49.png'},
  {name:'库赞',img:'中等/中等难度-库赞 (青雉)-35.png'},
  {name:'蕾贝卡',img:'中等/中等难度-蕾贝卡-76.png'},
  {name:'罗布·路奇',img:'中等/中等难度-罗布・路奇-44.png'},
  {name:'洛克斯·D·吉贝克',img:'中等/中等难度-洛克斯·D·吉贝克-67.png'},
  {name:'马歇尔·D·蒂奇',img:'中等/中等难度-马歇尔・D・蒂奇（黑胡子）-36.png'},
  {name:'玛格丽特',img:'中等/中等难度-玛格丽特-87.png'},
  {name:'玛琪诺',img:'中等/中等难度-玛琪诺-99.png'},
  {name:'猫蝮蛇',img:'中等/中等难度-猫蝮蛇-56.png'},
  {name:'蒙奇·D·卡普',img:'中等/中等难度-蒙奇・D・卡普-43.png'},
  {name:'蒙奇·D·龙',img:'中等/中等难度-蒙奇・D・龙-42.png'},
  {name:'摩根斯',img:'中等/中等难度-摩根斯-84.png'},
  {name:'莫奈',img:'中等/中等难度-莫奈-80.png'},
  {name:'那缪尔',img:'中等/中等难度-那缪尔-78.png'},
  {name:'佩德罗',img:'中等/中等难度-佩德罗-57.png'},
  {name:'乔艾莉·波妮',img:'中等/中等难度-乔艾莉・波妮-48.png'},
  {name:'润媞',img:'中等/中等难度-润媞-65.png'},
  {name:'萨卡斯基',img:'中等/中等难度-萨卡斯基（赤犬）-39.png'},
  {name:'塞尼奥尔·皮克',img:'中等/中等难度-塞尼奥尔・皮克-79.png'},
  {name:'瓦帕',img:'中等/中等难度-瓦帕-88.png'},
  {name:'文斯莫克·蕾玖',img:'中等/中等难度-文斯莫克・蕾玖-71.png'},
  {name:'文斯莫克·尼治',img:'中等/中等难度-文斯莫克・尼治-97.png'},
  {name:'文斯莫克·伊治',img:'中等/中等难度-文斯莫克・伊治-100.png'},
  {name:'乌鲁基',img:'中等/中等难度-乌鲁基-77.png'},
  {name:'乌普·史拉普',img:'中等/中等难度-乌普・史拉普-69.png'},
  {name:'西尔巴兹·雷利',img:'中等/中等难度-西尔巴兹・雷利-32.png'},
  {name:'夏洛特·布琳',img:'中等/中等难度-夏洛特·布琳-64.png'},
  {name:'夏洛特·克力架',img:'中等/中等难度-夏洛特·克力架-63.png'},
  {name:'夏洛特·芙兰佩',img:'中等/中等难度-夏洛特・芙兰佩-94.png'},
  {name:'夏洛特·玲玲',img:'中等/中等难度-夏洛特・玲玲（大妈）-38.png'},
  {name:'夏洛特·蒙多尔',img:'中等/中等难度-夏洛特・蒙多尔-89.png'},
  {name:'夏洛特·佩罗斯佩罗',img:'中等/中等难度-夏洛特・佩罗斯佩罗-62.png'},
  {name:'小丑巴基',img:'中等/中等难度-小丑巴基-33.png'},
  {name:'小玉',img:'中等/中等难度-小玉-54.png'},
  {name:'一笑',img:'中等/中等难度-一笑（藤虎）-41.png'},
  {name:'以藏',img:'中等/中等难度-以藏-74.png'},
  {name:'月光·莫利亚',img:'中等/中等难度-月光·莫利亚-60.png'},
  {name:'战国',img:'中等/中等难度-战国-68.png'},
  {name:'哲夫',img:'中等/中等难度-哲夫-90.png'}
];
const CHARS_HARD = [
  {name:'Dr·古蕾娃',img:'高级1/高级难度-Dr·古蕾娃-108.png'},
  {name:'T·彭恩',img:'高级1/高级难度-T·彭恩-140.png'},
  {name:'阿金',img:'高级2/高级难度-阿金-101.png'},
  {name:'阿龙',img:'高级2/高级难度-阿龙-119.png'},
  {name:'巴斯克·乔特',img:'高级1/高级难度-巴斯克・乔特-156.png'},
  {name:'贝拉米',img:'高级2/高级难度-贝拉米-106.png'},
  {name:'贝洛·贝蒂',img:'高级2/高级难度-贝洛・贝蒂-110.png'},
  {name:'波克慕斯',img:'高级2/高级难度-波克慕斯-160.png'},
  {name:'波特卡斯·D·露玖',img:'高级2/高级难度-波特卡斯・D・露玖-151.png'},
  {name:'波雅·桑达索尼亚',img:'高级2/高级难度-波雅・桑达索尼亚-134.png'},
  {name:'布洛基',img:'高级1/高级难度-布洛基-158.png'},
  {name:'查尔罗斯圣',img:'高级2/高级难度-查尔罗斯圣-148.png'},
  {name:'达兹·波尼斯',img:'高级2/高级难度-达兹・波尼斯-105.png'},
  {name:'德林杰',img:'高级1/高级难度-德林杰-104.png'},
  {name:'东利',img:'高级1/高级难度-东利-159.png'},
  {name:'费舍·泰格',img:'高级2/高级难度-费舍・泰格-129.png'},
  {name:'福克西',img:'高级2/高级难度-福克西-113.png'},
  {name:'古伊娜',img:'高级1/高级难度-古伊娜-126.png'},
  {name:'光月时',img:'高级1/高级难度-光月时（天月时）-138.png'},
  {name:'光月桃之助',img:'高级1/高级难度-光月桃之助-145.png'},
  {name:'哈古瓦尔·D·萨乌罗',img:'高级1/高级难度-哈古瓦尔・D・萨乌罗-128.png'},
  {name:'汉尼拔',img:'高级2/高级难度-汉尼拔-103.png'},
  {name:'黑色玛利亚',img:'高级2/高级难度-黑色玛利亚-135.png'},
  {name:'加布拉',img:'高级1/高级难度-加布拉-116.png'},
  {name:'贾巴',img:'高级2/高级难度-贾巴-142.png'},
  {name:'杰克',img:'高级2/高级难度-杰克-147.png'},
  {name:'卡莉法',img:'高级1/高级难度-卡莉法-102.png'},
  {name:'卡彭·贝基',img:'高级1/高级难度-卡彭・贝基-130.png'},
  {name:'卡塔丽娜·戴彭',img:'高级1/高级难度-卡塔丽娜・戴彭-155.png'},
  {name:'柯妮丝',img:'高级2/高级难度-柯妮丝-118.png'},
  {name:'克里克',img:'高级1/高级难度-克里克-131.png'},
  {name:'寇沙',img:'高级1/高级难度-寇沙-146.png'},
  {name:'奎因',img:'高级1/高级难度-奎因-121.png'},
  {name:'拉奇·鲁',img:'高级1/高级难度-拉奇・鲁-139.png'},
  {name:'雷欧',img:'高级2/高级难度-雷欧-117.png'},
  {name:'麦哲伦',img:'高级2/高级难度-麦哲伦-107.png'},
  {name:'蔓雪莉',img:'高级2/高级难度-蔓雪莉-144.png'},
  {name:'诺琪高',img:'高级2/高级难度-诺琪高-122.png'},
  {name:'佩吉万',img:'高级1/高级难度-佩吉万-109.png'},
  {name:'萨奇',img:'高级2/高级难度-萨奇-127.png'},
  {name:'砂糖',img:'高级2/高级难度-砂糖-112.png'},
  {name:'圣胡安·恶狼',img:'高级1/高级难度-圣胡安・恶狼-157.png'},
  {name:'霜月耕四郎',img:'高级2/高级难度-霜月耕四郎-152.png'},
  {name:'霜月康家',img:'高级2/高级难度-霜月康家-124.png'},
  {name:'霜月龙马',img:'高级2/高级难度-霜月龙马-115.png'},
  {name:'斯库拉奇曼·阿普',img:'高级1/高级难度-斯库拉奇曼・阿普-136.png'},
  {name:'斯潘达姆',img:'高级2/高级难度-斯潘达姆-132.png'},
  {name:'斯图西',img:'高级1/高级难度-斯图西-137.png'},
  {name:'汤姆',img:'高级2/高级难度-汤姆-125.png'},
  {name:'缇娜',img:'高级2/高级难度-缇娜（日奈）-123.png'},
  {name:'维奥拉',img:'高级2/高级难度-维奥拉（紫罗兰）-111.png'},
  {name:'维尔戈',img:'高级2/高级难度-维尔戈-150.png'},
  {name:'文斯莫克·勇治',img:'高级1/高级难度-文斯莫克・勇治-120.png'},
  {name:'夏莉',img:'高级1/高级难度-夏莉149.png'},
  {name:'夏洛特·布蕾',img:'高级1/高级难度-夏洛特・布蕾-161.png'},
  {name:'夏洛特·大福',img:'高级1/高级难度-夏洛特・大福-153.png'},
  {name:'夏洛特·欧文',img:'高级1/高级难度-夏洛特・欧文-154.png'},
  {name:'夏洛特·斯慕吉',img:'高级1/高级难度-夏洛特・斯慕吉-141.png'},
  {name:'夏琪',img:'高级1/高级难度-夏琪（夏克雅克）-133.png'},
  {name:'亚尔丽塔',img:'高级1/高级难度-亚尔丽塔-114.png'},
  {name:'乙姬',img:'高级1/高级难度-乙姬-143.png'}
];

// ===== 游戏配置 =====
const CONFIG = {
  easy:   {label:'简单模式', cols:4, total:16, pick:{easy:8,medium:8,hard:0}},
  medium: {label:'中等模式', cols:5, total:25, pick:{easy:5,medium:15,hard:5}},
  hard:   {label:'高级模式', cols:8, total:48, pick:{easy:12,medium:12,hard:24}}
};

// ===== 游戏状态 =====
let state = {
  difficulty: null,
  answer: null,
  chars: [],
  guessesLeft: 3,
  hideEliminated: false,
  chatHistory: [],
  gameOver: false,
  questionCount: 0,   // 提问次数
  startTime: null,     // 游戏开始时间
  timerInterval: null  // 计时器定时器
};

// ===== API配置（智谱AI GLM-4-Flash） =====
// 优先使用本地代理(避免CORS)，降级直连
const API_CONFIG = {
  proxyUrl: 'http://localhost:3456/api/chat',
  directUrl: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
  key: '48563eab875b43b1b3330ddbab1d7a7b.CEWi3il7NttkY7RL',
  model: 'glm-4-flash',
  useProxy: true  // 默认使用代理
};

function getApiUrl() {
  return API_CONFIG.useProxy ? API_CONFIG.proxyUrl : API_CONFIG.directUrl;
}

// ===== 页面切换 =====
function showPage(id) {
  document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
  document.getElementById(id).classList.add('active');
}

// ===== 工具函数 =====
function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}

function pickRandom(arr, n) {
  return shuffle(arr).slice(0, Math.min(n, arr.length));
}

// ===== 核心：开始游戏 =====
function startGame(difficulty) {
  var cfg = CONFIG[difficulty];
  if (!cfg) return;

  state.difficulty = difficulty;
  state.guessesLeft = 3;
  state.hideEliminated = false;
  state.chatHistory = [];
  state.gameOver = false;
  state.questionCount = 0;

  // 停止之前的计时器
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
  // 启动计时器
  state.startTime = Date.now();
  updateTimerDisplay();
  state.timerInterval = setInterval(updateTimerDisplay, 1000);
  // 重置提问次数显示
  updateQuestionCount();

  // 按比例抽取角色
  var picked = [].concat(
    pickRandom(CHARS_EASY, cfg.pick.easy),
    pickRandom(CHARS_MEDIUM, cfg.pick.medium),
    pickRandom(CHARS_HARD, cfg.pick.hard)
  );
  state.chars = shuffle(picked).map(function(c) { return {name:c.name, img:c.img, eliminated:false}; });

  // 随机选谜底
  state.answer = state.chars[Math.floor(Math.random() * state.chars.length)];

  // 渲染
  renderGrid();
  renderGuessDots();
  document.getElementById('topbar-diff-label').textContent = cfg.label;

  // 清空聊天
  var chatEl = document.getElementById('chat-messages');
  chatEl.innerHTML = '<div class="chat-welcome"><b>' +
    String.fromCodePoint(0x1F3F4) + String.fromCodePoint(0x200D) + String.fromCodePoint(0x2620) + String.fromCodePoint(0xFE0F) +
    ' 欢迎来到海贼王猜角色游戏！</b><br><br>' +
    '<b style="color:#ffd54f;">' + String.fromCodePoint(0x1F3AF) + ' 游戏规则</b><br>' +
    '棋盘上的角色中有一个是谜底，你需要通过提问来缩小范围并猜出谜底。<br>' +
    '你共有 <span class="warn">3次</span> 猜测机会，用完则挑战失败。<br><br>' +
    '<b style="color:#ffd54f;">' + String.fromCodePoint(0x1F4AC) + ' 提问方式</b><br>' +
    '在下方输入框中输入关于谜底角色的特征问题，AI只会回答「是」「否」或「不确定」。<br>' +
    '例如："这个角色是男性吗？""他是四皇吗？"<br><br>' +
    '<b style="color:#ffd54f;">' + String.fromCodePoint(0x1F5B1) + String.fromCodePoint(0xFE0F) + ' 操作说明</b><br>' +
    String.fromCodePoint(0x1F449) + ' <b>单击</b>角色卡片 → 快速排除（翻转+变灰+红叉）<br>' +
    String.fromCodePoint(0x1F449) + ' <b>长按</b>角色卡片（0.5秒） → 直接锁定为猜测对象（消耗1次机会）<br>' +
    String.fromCodePoint(0x1F449) + ' <b>单击已排除</b>的角色 → 取消排除<br>' +
    String.fromCodePoint(0x1F449) + ' 顶栏<b>设置按钮</b> → 显示/隐藏已排除角色<br>' +
    '</div>';

  // 切换页面
  showPage('page-game');

  // 手机端：默认显示角色网格tab
  if (window.innerWidth <= 500) {
    switchTab('grid');
  }

  // 触摸设备：重新绑定长按事件
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    initTouchHandlers();
  }
}

// ===== 渲染角色网格 =====
function renderGrid() {
  var grid = document.getElementById('char-grid');
  grid.className = 'char-grid ' + state.difficulty;
  grid.innerHTML = '';

  state.chars.forEach(function(c, i) {
    var card = document.createElement('div');
    card.className = 'char-card';
    if (c.eliminated) card.className += ' eliminated';
    if (c.eliminated && state.hideEliminated) card.className += ' hidden';
    card.innerHTML = '<div class="card-inner">' +
      '<div class="card-front"><img src="' + c.img + '" alt="' + c.name + '"><div class="char-name">' + c.name + '</div></div>' +
      '<div class="card-back"><div class="x-mark">' + String.fromCodePoint(0x2716) + '</div><div class="elim-name">' + c.name + '</div></div>' +
      '</div>';
    card.setAttribute('data-index', i);
    // 鼠标事件：单击排除 / 长按猜测
    bindMouseLongPress(card, i);
    grid.appendChild(card);
  });
}

// ===== 鼠标端长按支持（PC） =====
var mouseLongPressTimer = null;
var mouseLongPressTriggered = false;
var MOUSE_LONG_PRESS_MS = 500;

function bindMouseLongPress(card, index) {
  card.addEventListener('mousedown', function(e) {
    if (e.button !== 0) return; // 仅左键
    if (state.gameOver) return;
    var c = state.chars[index];
    if (c.eliminated) return; // 已排除的不触发长按

    mouseLongPressTriggered = false;
    // 添加蓄力特效
    card.classList.add('charging');
    mouseLongPressTimer = setTimeout(function() {
      mouseLongPressTriggered = true;
      card.classList.remove('charging');
      // 长按 = 猜测
      triggerGuessEffect(card, c, index);
    }, MOUSE_LONG_PRESS_MS);
  });

  card.addEventListener('mouseup', function() {
    if (mouseLongPressTimer) { clearTimeout(mouseLongPressTimer); mouseLongPressTimer = null; }
    card.classList.remove('charging');
  });

  card.addEventListener('mouseleave', function() {
    if (mouseLongPressTimer) { clearTimeout(mouseLongPressTimer); mouseLongPressTimer = null; }
    card.classList.remove('charging');
  });

  card.addEventListener('click', function(e) {
    if (mouseLongPressTriggered) {
      mouseLongPressTriggered = false;
      e.preventDefault();
      return;
    }
    onCardClick(index);
  });
}

// ===== 卡片单击：快速排除 / 取消排除 =====
function onCardClick(index) {
  if (state.gameOver) return;
  var c = state.chars[index];
  if (c.eliminated) {
    // 已排除的角色，单击取消排除
    c.eliminated = false;
  } else {
    // 未排除：直接排除
    c.eliminated = true;
    // 检查是否排除了谜底角色 → 直接判定失败
    if (c.name === state.answer.name) {
      state.gameOver = true;
      renderGrid();
      addChat('ai', '你把谜底角色排除了！挑战失败。谜底是【' + state.answer.name + '】');
      setTimeout(function() { showResult(false); }, 1200);
      return;
    }
  }
  renderGrid();
}

// ===== 长按触发猜测（带特效，直接进行猜测，不弹确认框） =====
function triggerGuessEffect(card, c, index) {
  // 播放金色光晕 + 缩放弹出特效，结束后直接执行猜测
  card.classList.add('guess-trigger');
  setTimeout(function() {
    card.classList.remove('guess-trigger');
    doGuess(index);
  }, 400);
}

function showConfirm(c, index) {
  var old = document.querySelector('.confirm-overlay');
  if (old) old.remove();

  var overlay = document.createElement('div');
  overlay.className = 'confirm-overlay';
  overlay.innerHTML =
    '<div class="confirm-box">' +
    '<img class="char-preview" src="' + c.img + '" alt="' + c.name + '">' +
    '<div class="confirm-name">' + c.name + '</div>' +
    '<p>你要对这个角色做什么？</p>' +
    '<div class="confirm-btns">' +
    '<button onclick="doEliminate(' + index + ')">排除</button>' +
    '<button onclick="doGuess(' + index + ')">猜测 (剩' + state.guessesLeft + '次)</button>' +
    '<button class="cancel" onclick="closeConfirm()">取消</button>' +
    '</div></div>';
  document.body.appendChild(overlay);
}

function closeConfirm() {
  var el = document.querySelector('.confirm-overlay');
  if (el) el.remove();
}

function doEliminate(index) {
  closeConfirm();
  state.chars[index].eliminated = true;
  renderGrid();
}

function doGuess(index) {
  closeConfirm();
  if (state.guessesLeft <= 0 || state.gameOver) return;

  var c = state.chars[index];
  state.guessesLeft--;
  renderGuessDots();

  if (c.name === state.answer.name) {
    state.gameOver = true;
    addChat('user', '我猜是：' + c.name);
    addChat('ai', '恭喜你猜对了！谜底正是【' + state.answer.name + '】！' + String.fromCodePoint(0x1F389));
    setTimeout(function() { showResult(true); }, 1200);
  } else {
    addChat('user', '我猜是：' + c.name);
    addChat('ai', '不对，继续加油！');
    c.eliminated = true;
    renderGrid();
    if (state.guessesLeft <= 0) {
      state.gameOver = true;
      addChat('ai', '很遗憾，机会用完了。谜底是【' + state.answer.name + '】');
      setTimeout(function() { showResult(false); }, 1200);
    }
  }
}

// ===== 猜测点数渲染 =====
function renderGuessDots() {
  var container = document.getElementById('guess-dots');
  container.innerHTML = '';
  for (var i = 0; i < 3; i++) {
    var dot = document.createElement('div');
    dot.className = 'guess-dot' + (i >= state.guessesLeft ? ' used' : '');
    container.appendChild(dot);
  }
}

// ===== 计时器与提问计数 =====
function formatTime(ms) {
  var totalSec = Math.floor(ms / 1000);
  var min = Math.floor(totalSec / 60);
  var sec = totalSec % 60;
  return (min < 10 ? '0' : '') + min + ':' + (sec < 10 ? '0' : '') + sec;
}

function updateTimerDisplay() {
  if (!state.startTime) return;
  var el = document.getElementById('game-timer');
  if (el) el.textContent = formatTime(Date.now() - state.startTime);
}

function updateQuestionCount() {
  var el = document.getElementById('question-count');
  if (el) el.textContent = state.questionCount;
}

// ===== 结果页面 =====
function showResult(win) {
  var img = document.getElementById('result-img');
  var text = document.getElementById('result-text');
  var answer = document.getElementById('result-answer');

  // 停止计时器
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }

  if (win) {
    img.src = 'UI/ed98e7765c53c5124815a3e105d95cc9.png';
    text.textContent = String.fromCodePoint(0x1F389) + ' 恭喜通关！';
    text.className = 'result-text win';
  } else {
    img.src = 'UI/9c2da25347345bffc1518e0b059d003cfaec2e2845b7429666b5cf1a779abc83.png';
    text.textContent = String.fromCodePoint(0x1F62D) + ' 挑战失败';
    text.className = 'result-text lose';
  }
  answer.textContent = '谜底角色：' + state.answer.name;

  // 设置谜底角色图片
  var charImg = document.getElementById('result-char-img');
  if (charImg) charImg.src = state.answer.img;

  // 展示统计数据
  document.getElementById('result-time').textContent = formatTime(Date.now() - state.startTime);
  document.getElementById('result-questions').textContent = state.questionCount;

  showPage('page-result');
}

// ===== 聊天功能 =====
function addChat(role, content) {
  var chatEl = document.getElementById('chat-messages');
  var div = document.createElement('div');
  div.className = 'chat-msg ' + role;
  div.textContent = content;
  chatEl.appendChild(div);
  chatEl.scrollTop = chatEl.scrollHeight;
}

function showTyping() {
  var chatEl = document.getElementById('chat-messages');
  var div = document.createElement('div');
  div.className = 'chat-msg ai typing-indicator';
  div.id = 'typing-indicator';
  div.innerHTML = '<span></span><span></span><span></span>';
  chatEl.appendChild(div);
  chatEl.scrollTop = chatEl.scrollHeight;
}

function hideTyping() {
  var el = document.getElementById('typing-indicator');
  if (el) el.remove();
}

function sendMessage() {
  if (state.gameOver) return;
  var input = document.getElementById('chat-input');
  var msg = input.value.trim();
  if (!msg) return;

  input.value = '';
  addChat('user', msg);

  // === 聊天猜测判定：检测玩家是否在猜某个角色 ===
  var guessTarget = detectGuessFromChat(msg);
  if (guessTarget) {
    // 这是一次猜测，消耗猜测次数
    if (state.guessesLeft <= 0) {
      addChat('ai', '猜测次数已用完，无法再猜测了。');
      return;
    }
    state.guessesLeft--;
    renderGuessDots();

    if (guessTarget.name === state.answer.name) {
      // 猜对了！
      state.gameOver = true;
      addChat('ai', '恭喜你猜对了！谜底正是【' + state.answer.name + '】！' + String.fromCodePoint(0x1F389));
      // 排除对应卡片上标记
      guessTarget.eliminated = false;
      setTimeout(function() { showResult(true); }, 1200);
      return;
    } else {
      // 猜错了
      guessTarget.eliminated = true;
      renderGrid();
      if (state.guessesLeft <= 0) {
        state.gameOver = true;
        addChat('ai', '不对。很遗憾，机会用完了。谜底是【' + state.answer.name + '】');
        setTimeout(function() { showResult(false); }, 1200);
        return;
      }
      // 猜错但还有机会，继续发给AI回复
    }
  }

  // 计数提问次数
  state.questionCount++;
  updateQuestionCount();

  // 构建AI请求
  var charNames = state.chars.map(function(c) { return c.name; }).join('、');
  var systemPrompt = buildSystemPrompt(state.answer.name, charNames, null);
  var userPrompt = buildUserPrompt(msg);

  state.chatHistory.push({role:'user', content:userPrompt});

  showTyping();

  if (!API_CONFIG.key) {
    hideTyping();
    addChat('ai', '尚未配置API密钥');
    return;
  }

  // 构建请求体：通过tools参数启用web_search联网搜索
  var messages = [{role:'system', content: systemPrompt}].concat(state.chatHistory);

  var chatBody = {
    model: API_CONFIG.model,
    messages: messages,
    max_tokens: 150,
    temperature: 0.3,
    tools: [{
      type: 'web_search',
      web_search: {
        enable: true,
        search_query: state.answer.name + ' 海贼王 ' + msg
      }
    }]
  };

  fetch(getApiUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + API_CONFIG.key
    },
    body: JSON.stringify(chatBody)
  })
  .then(function(resp) { return resp.json(); })
  .then(function(data) {
    hideTyping();

    if (data.error) {
      // API返回错误，降级为不联网搜索重试
      console.warn('API error with web_search, retrying without:', data.error);
      retryWithoutSearch(systemPrompt);
      return;
    }

    var reply = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || '回复异常';
    // 清理可能的思考过程标记
    reply = reply.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
    if (!reply) reply = '回复异常';
    state.chatHistory.push({role:'assistant', content:reply});
    addChat('ai', reply);
    checkWin(reply);
  })
  .catch(function(err) {
    console.warn('Request failed, retrying without web_search:', err);
    retryWithoutSearch(systemPrompt);
  });
}

// 降级重试：不带联网搜索
function retryWithoutSearch(systemPrompt) {
  var messages = [{role:'system', content: systemPrompt}].concat(state.chatHistory);

  fetch(getApiUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + API_CONFIG.key
    },
    body: JSON.stringify({
      model: API_CONFIG.model,
      messages: messages,
      max_tokens: 150,
      temperature: 0.3
    })
  })
  .then(function(resp) { return resp.json(); })
  .then(function(data) {
    hideTyping();
    var reply = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || '回复异常';
    reply = reply.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
    if (!reply) reply = '回复异常';
    state.chatHistory.push({role:'assistant', content:reply});
    addChat('ai', reply);
    checkWin(reply);
  })
  .catch(function(err) {
    hideTyping();
    addChat('ai', '网络请求失败：' + err.message);
  });
}

// 检查是否猜对（兜底：仅在前端未拦截时生效）
function checkWin(reply) {
  if (state.gameOver) return; // 已在前端判定过，跳过
  if (reply.indexOf('恭喜你猜对了') >= 0) {
    state.gameOver = true;
    setTimeout(function() { showResult(true); }, 1200);
  }
}

// ===== 聊天猜测检测：判断玩家消息是否在猜某个角色 =====
function detectGuessFromChat(msg) {
  // 猜测关键词模式：包含"是...吗"、"是不是"、"对吗"、"对不对"等疑问句式 + 角色名
  var guessPatterns = /是.*吗|是不是|对吗|对不对|我猜是|我猜/;
  if (!guessPatterns.test(msg)) return null;

  // 遍历当前角色列表，查找消息中是否包含某个角色名
  var matched = null;
  for (var i = 0; i < state.chars.length; i++) {
    var c = state.chars[i];
    if (c.eliminated) continue; // 已排除的不算
    // 检查完整名或常用简称
    var names = getCharNameVariants(c.name);
    for (var j = 0; j < names.length; j++) {
      if (msg.indexOf(names[j]) >= 0) {
        matched = c;
        break;
      }
    }
    if (matched) break;
  }
  return matched;
}

// 获取角色名的各种变体（处理别名/简称）
function getCharNameVariants(fullName) {
  var variants = [fullName];
  // 处理"·"分隔的名字，取最后一段作为简称
  if (fullName.indexOf('·') >= 0) {
    var parts = fullName.split('·');
    variants.push(parts[parts.length - 1]); // 最后一段，如"路飞"、"索隆"
    if (parts.length > 2) {
      // 如"蒙奇·D·路飞"，也加入"路飞"
      variants.push(parts[parts.length - 1]);
    }
  }
  // 常见别名映射
  var aliases = {
    '蒙奇·D·路飞': ['路飞', '草帽'],
    '罗罗诺亚·索隆': ['索隆'],
    '文斯莫克·山治': ['山治'],
    '特拉法尔加·罗': ['罗', '特拉法尔加'],
    '波特卡斯·D·艾斯': ['艾斯'],
    '哥尔·D·罗杰': ['罗杰'],
    '蒙奇·D·卡普': ['卡普'],
    '蒙奇·D·龙': ['龙'],
    '马歇尔·D·蒂奇': ['黑胡子', '蒂奇'],
    '乔拉可尔·米霍克': ['鹰眼', '米霍克'],
    '唐吉坷德·罗西南迪': ['罗西南迪', '柯拉松'],
    '堂吉诃德·多弗朗明哥': ['多弗朗明哥', '明哥'],
    '沙·克洛克达尔': ['克洛克达尔', '老沙'],
    '波雅汉库克': ['汉库克', '女帝'],
    '尤塔斯基·基德': ['基德'],
    '爱德华·纽盖特': ['白胡子', '纽盖特'],
    '波鲁萨利诺': ['黄猿'],
    '凯撒·库朗': ['凯撒'],
    '巴索罗缪·大熊': ['大熊'],
    '巴兹尔·霍金斯': ['霍金斯'],
    '迪埃斯·德雷克': ['德雷克'],
    '罗布·路奇': ['路奇'],
    '洛克斯·D·吉贝克': ['洛克斯'],
    '卡利·达旦': ['达旦'],
    '奈菲尔塔利·薇薇': ['薇薇'],
    '妮可·罗宾': ['罗宾'],
    '托尼托尼乔巴': ['乔巴'],
    '香克斯': ['红发']
  };
  if (aliases[fullName]) {
    variants = variants.concat(aliases[fullName]);
  }
  return variants;
}

// ===== 控制按钮 =====
function backToMenu() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
  showPage('page-menu');
}

function restartGame() {
  if (state.difficulty) {
    startGame(state.difficulty);
  }
}

function toggleEliminated() {
  state.hideEliminated = !state.hideEliminated;
  renderGrid();
}

// ===== 手机端 Tab 切换（角色/聊天） =====
function switchTab(tab) {
  var gameLeft = document.querySelector('.game-left');
  var gameRight = document.querySelector('.game-right');
  var tabGrid = document.getElementById('tab-grid');
  var tabChat = document.getElementById('tab-chat');
  if (!gameLeft || !gameRight || !tabGrid || !tabChat) return;

  if (tab === 'grid') {
    gameLeft.classList.remove('tab-hidden');
    gameRight.classList.add('tab-hidden');
    tabGrid.classList.add('active');
    tabChat.classList.remove('active');
  } else {
    gameLeft.classList.add('tab-hidden');
    gameRight.classList.remove('tab-hidden');
    tabGrid.classList.remove('active');
    tabChat.classList.add('active');
    // 切到聊天时自动滚到底部
    var chatEl = document.getElementById('chat-messages');
    if (chatEl) chatEl.scrollTop = chatEl.scrollHeight;
  }
}

// ===== 移动端长按猜测（新规则：长按=猜测，单击=排除） =====
var longPressTimer = null;
var longPressTriggered = false;
var LONG_PRESS_MS = 500;

function initTouchHandlers() {
  var grid = document.getElementById('char-grid');
  if (!grid) return;

  grid.addEventListener('touchstart', function(e) {
    var card = e.target.closest('.char-card');
    if (!card) return;
    var index = parseInt(card.getAttribute('data-index'));
    if (isNaN(index)) return;
    if (state.gameOver) return;
    if (state.chars[index].eliminated) return; // 已排除不触发长按

    longPressTriggered = false;
    card.classList.add('charging');
    longPressTimer = setTimeout(function() {
      longPressTriggered = true;
      card.classList.remove('charging');
      // 长按 = 猜测（带特效）
      triggerGuessEffect(card, state.chars[index], index);
    }, LONG_PRESS_MS);
  }, {passive: true});

  grid.addEventListener('touchend', function(e) {
    var card = e.target.closest('.char-card');
    if (card) card.classList.remove('charging');
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
    // 如果长按已触发，阻止后续click
    if (longPressTriggered) {
      e.preventDefault();
      longPressTriggered = false;
    }
  });

  grid.addEventListener('touchmove', function(e) {
    var card = e.target.closest('.char-card');
    if (card) card.classList.remove('charging');
    // 手指移动取消长按
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
  }, {passive: true});
}

// ===== 窗口尺寸变化时自动处理 tab 状态 =====
function handleResize() {
  var w = window.innerWidth;
  var gameLeft = document.querySelector('.game-left');
  var gameRight = document.querySelector('.game-right');
  if (!gameLeft || !gameRight) return;

  if (w > 500) {
    // 非手机模式：移除 tab-hidden，确保两面板都显示
    gameLeft.classList.remove('tab-hidden');
    gameRight.classList.remove('tab-hidden');
  } else {
    // 手机模式：检查当前激活的 tab
    var tabGrid = document.getElementById('tab-grid');
    if (tabGrid && tabGrid.classList.contains('active')) {
      gameLeft.classList.remove('tab-hidden');
      gameRight.classList.add('tab-hidden');
    } else {
      gameLeft.classList.add('tab-hidden');
      gameRight.classList.remove('tab-hidden');
    }
  }
}

window.addEventListener('resize', handleResize);

// ===== 启动时检测代理可用性 =====
(function checkProxy() {
  fetch(API_CONFIG.proxyUrl, {method: 'OPTIONS'})
  .then(function() {
    API_CONFIG.useProxy = true;
    console.log('Proxy server detected, using proxy mode');
  })
  .catch(function() {
    API_CONFIG.useProxy = false;
    console.warn('Proxy server not available, using direct mode (may have CORS issues)');
    console.warn('Start proxy: node proxy-server.js');
  });
})();

// ===== 页面加载完成后初始化触摸 =====
document.addEventListener('DOMContentLoaded', function() {
  // 检测是否触摸设备
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    initTouchHandlers();
    console.log('Touch device detected, long-press enabled');
  }
});
