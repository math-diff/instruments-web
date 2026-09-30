# 域名、搜索监测与询盘上线检查表

状态均为待验收，勾选须附真实证据；2026-09-30 建立。凭据不写入本文件、不提交 Git。生产部署与 DNS 由账户所有者执行或提供授权访问。

## 域名与 Vercel

- [ ] 企业选定并持有长期域名；确认续费与 DNS 管理人。
- [ ] 在 Vercel 项目添加正式域名，按其实际提示设置 DNS，等待 TLS 有效。
- [ ] 生产环境 `NEXT_PUBLIC_SITE_URL` 使用正式 HTTPS origin（无凭据、路径、查询参数和尾部斜线）；集中配置严格校验 HTTPS，改动后重新部署。本机旧 localhost 配置已改为当前 `https://jf-international.vercel.app`，这不代表新域名已购买或绑定。
- [ ] 在 Vercel 为旧 `jf-international.vercel.app` 和其他域名变体配置永久跳转到主域名，保留路径与查询参数；至少保持一年。预览域名不作为公开索引站点。
- [ ] 应用层 `SITE_REDIRECT_HOSTS` 可填逗号分隔的旧主机名（不带协议或路径）。仅 canonical 改为其他域名后，默认旧 Vercel 主机才自动跳转；可与 Vercel 配置择一管理，检查组合后无循环。不要添加正式主域名或通配符。
- [ ] 分别检查旧首页、`/en/products/pressure-gauge`、`/zh/contact` 和含查询参数 URL；无循环、无全跳首页。
- [ ] 检查新站 HTML canonical、hreflang、分享 URL、sitemap、robots 及表单回跳全部使用主域名。

## Google Search Console

- [ ] 使用企业控制的 Google 账号创建 Domain 属性，复制真实 TXT 值到 DNS 并验证。
- [ ] 旧 Vercel 地址使用可验证的 URL-prefix 属性；不是自有 DNS 时不尝试验证整个 vercel.app。
- [ ] 若使用 URL-prefix HTML 验证，可设置 `GOOGLE_SITE_VERIFICATION` 为 Google 提供的真实 token 并重新部署；这是可选配置，不能替代 Domain 属性的 DNS 验证。
- [ ] 提交新站 `/sitemap.xml`；URL Inspection 检查首页、专题、产品、文章。记录可抓取/已收录/未收录原因，不等同处理。
- [ ] 若旧属性及迁移类型满足 Google Change of Address 条件，再按界面执行；此工具不能替代永久跳转。
- [ ] 观察四个目标国家、非品牌查询与核心页；没有数据时记录未取得，不写 0 或排名承诺。

## GA4 与隐私

- [ ] 企业创建 GA4 Web 数据流并提供真实 `G-...` Measurement ID；设置可选环境变量 `NEXT_PUBLIC_GA_MEASUREMENT_ID`，不把占位 ID 当成已安装。当前无真实 ID。
- [ ] 启用前关闭 GA4 Web 数据流的全部 Enhanced Measurement 自动事件。代码只发送手动白名单事件，避免远端自动配置重新收集查询参数、表单信息或出站链接。
- [ ] 核对网站隐私文案、数据用途、供应商及适用同意机制；拒绝与撤销后不发送新的分析事件。
- [ ] 在浏览器网络面板确认同意前不请求 GA；同意后只发送白名单事件和必要字段。
- [ ] 在 DebugView/实时报告逐一确认 `quote_click`、`download_click`、`email_click`、`form_submit_attempt`。未同意前不加载 GA 脚本，原先自动加载的 Vercel Analytics 已移除；核对生产部署是否包含此变更。
- [ ] 用含模拟邮箱/正文的查询参数做测试，确认分析 URL、事件字段不包含个人信息或原始查询字符串。
- [ ] 不将 `?success=1`、按钮点击或提交尝试标成已核实 lead。真实有效询盘先由销售汇总。
- [ ] 实现不发送 `generate_lead`；不要在 GA4 管理界面将上述尝试事件误定义为已核实询盘。

## Web3Forms 实际收件

- [ ] 企业确认正确的 Web3Forms 项目、真实 access key、允许域名与收件邮箱；核对当前套餐/反垃圾设置。
- [ ] 使用企业认可的测试邮箱发送一次标明“TEST — no quotation required”的测试询盘；不向第三方发送营销邮件。
- [ ] 从指定产品进入表单，确认型号、名称、来源页面自动带入，填写正常必填字段后原生提交。
- [ ] 检查合法产品的隐藏字段 `product_slug`、`product_model`、`product_name`、`source_page` 和所选分类一致；无效产品参数不得注入这些字段。
- [ ] 销售确认收件箱或垃圾箱实际到达，并核对上述字段、回复地址、时间与附件/文本情况；记录匿名测试编号。
- [ ] 验证缺少必填、无效邮箱、提供方报错、直接访问 success URL 等情形；这些均不可计为有效询盘。
- [ ] 回跳 `?submitted=1` 只显示提交返回的提示，不确认投递。直接访问旧 `?success=1` 也不能显示发送成功。
- [ ] 将测试数据从业务统计剔除。未取得收件方确认前，状态为“提交已测、投递未证实”或“未测试”。

## 内容与发布

- [ ] 四型号的未知材质、接口、温度、尺寸和校准信息由工程补齐；照片不证明系列全部选项。
- [ ] 三篇 `editorial-drafts` 经真实审核人批准后才迁入 MDX，填写实际发布时间/更新时间；加入普通链接与 sitemap。
- [ ] 英文资料包明确为样品信息/询价参考，审核前不称认证规格书；网页保留重要参数。
- [ ] `npm run lint`、`npm run build` 完成；若有历史错误，记录具体输出与范围，不能写全通过。
- [ ] 发布后回测生产 URL、移动菜单、型号询价、下载、canonical、JSON-LD、跳转与分析同意。

## 回退

保存部署版本与环境变量改动记录（不记录秘密值）。新域名 TLS、循环或整站错误时先恢复已验证的 Vercel 部署/域名设置并复测原路径；内容错误只回退相应内容。不在未经核实的状态下删除旧域名。
