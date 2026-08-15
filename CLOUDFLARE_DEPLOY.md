# 海贼王猜角色小游戏 - Cloudflare Pages 部署指引

## 前置准备

你需要：
- 一个 Cloudflare 账号（免费注册）
- 你的 GitHub 账号已有仓库 `2532704425-a11y/onepiece`（已就绪）

---

## 第一步：注册 Cloudflare 账号

1. 打开 **https://dash.cloudflare.com/sign-up**
2. 输入邮箱和密码，点击 **Create Account**
3. 验证邮箱（去邮箱点确认链接）

---

## 第二步：创建 Cloudflare Pages 项目

1. 登录后进入 Cloudflare 控制台：**https://dash.cloudflare.com**

2. 左侧菜单点击 **Workers & Pages**

3. 点击 **Create** 按钮

4. 选择 **Pages** 标签页

5. 点击 **Connect to Git**

6. 选择 **GitHub**，授权 Cloudflare 访问你的 GitHub 账号

7. 在仓库列表中找到 **onepiece**，点击选中

8. 点击 **Begin setup**

---

## 第三步：配置构建设置

在配置页面，按以下设置：

| 配置项 | 填写内容 |
|--------|---------|
| **Project name** | `onepiece`（或任意你喜欢的名字，会影响域名） |
| **Production branch** | `main` |
| **Framework preset** | 选 **None** |
| **Build command** | **留空**（不需要构建） |
| **Build output directory** | **留空**（或填 `/`，表示项目根目录就是输出） |

⚠️ **重要**：Build command 和 Build output directory 都不要填任何东西！这是纯静态项目，不需要构建步骤。

然后点击 **Save and Deploy**

### 配置 AI 与联网搜索密钥（必须）

部署完成后，进入 **Workers & Pages → 你的项目 → Settings → Variables and Secrets**，添加以下
**Production secret**（不要写入代码或提交到 Git）：

| 变量名 | 值 | 用途 |
|--------|----|------|
| `BOCHA_API_KEY` | 博查开放平台创建的 API Key | 联网检索角色资料，并通过博查万象调用 `deepseek-v4-flash` 裁判模型 |

保存后重新部署。前端只会调用 `/api/chat`，博查密钥只在 Cloudflare 服务端使用。

---

## 第四步：等待部署完成

- Cloudflare 会自动拉取 GitHub 代码并部署
- 通常 1-2 分钟完成
- 部署成功后会显示一个访问链接，格式类似：
  ```
  https://onepiece.pages.dev
  ```
  （如果 `onepiece` 被占用，可能是 `onepiece-xxx.pages.dev`）

---

## 第五步：测试访问

1. 点击部署成功页面上的链接，或直接在浏览器输入你的 `.pages.dev` 域名
2. 应该能看到游戏的难度选择界面
3. 选一个难度开始游戏，在聊天框输入问题测试 AI 裁判是否正常工作
4. **在国内不需要翻墙即可访问**

---

## 后续更新

每次你把代码推送到 GitHub 的 `main` 分支，Cloudflare Pages 会**自动重新部署**，无需手动操作。

---

## 项目结构说明（供参考）

```
onepiece/
├── index.html          ← 主页面
├── style.css           ← 样式
├── game-logic.js       ← 游戏逻辑（安全调用 /api/chat）
├── prompt.js           ← AI提示词
├── .env.example        ← 本地环境变量模板（不含真实密钥）
├── vercel.json         ← Vercel配置（Cloudflare忽略）
├── api/chat.js         ← Vercel serverless函数（Cloudflare忽略）
├── functions/          ← ★ Cloudflare Pages Functions
│   └── api/
│       └── chat.js     ← ★ Cloudflare用的API代理函数
├── 简单/               ← 30张角色图片
├── 中等/               ← 70张角色图片
├── 高级1/              ← 31张角色图片
├── 高级2/              ← 30张角色图片
└── UI/                 ← 26个UI素材
```

Cloudflare Pages 会自动识别 `functions/` 目录，将 `functions/api/chat.js` 映射为 `/api/chat` 端点。

---

## 常见问题

### Q: 部署后 AI 裁判不回复？
检查浏览器控制台（F12 → Console）是否有报错。最常见原因是 Cloudflare 的 Functions 没有正确识别。确认 Build output directory 留空或填 `/`。

### Q: 图片加载不出来？
中文文件夹名在 URL 中会被编码，Cloudflare Pages 默认支持。如果有问题，检查浏览器 Network 面板看 404 的具体路径。

### Q: 免费额度够用吗？
Cloudflare Pages 免费版：
- 每月 500 次构建
- Functions 每天 100,000 次请求
- 带宽无限制
个人游戏完全够用。

### Q: 能绑定自己的域名吗？
可以。在 Cloudflare Pages 项目设置 → Custom domains 中添加。需要域名的 DNS 托管在 Cloudflare（免费）。
