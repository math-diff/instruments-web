# SEO 实施状态与下一步

记录日期：2026-09-30。这里区分本地实现、验证、生产上线及外部业务结果。**不是“90 天计划已全部完成”，也不是部署成功报告。**

## 本地已实现/已提供

| 交付 | 当前内容 | 仍需验证 |
| --- | --- | --- |
| 站点地址集中配置 | `NEXT_PUBLIC_SITE_URL` 严格 HTTPS origin 校验；本机旧 localhost 值改为当前 Vercel 地址 | 实际生产环境变量、构建及 canonical |
| 迁移准备 | `SITE_REDIRECT_HOSTS` 支持逗号分隔主机；canonical 改域名后默认旧 Vercel 主机才跳转 | 企业域名、DNS/TLS、跨主机路径和查询参数检查 |
| GSC 验证入口 | 可选 `GOOGLE_SITE_VERIFICATION` HTML token | 真实 token/账号；Domain 属性仍需 DNS TXT |
| 页面与可发现性 | 英文压力专题、四产品补充采购确认信息、明确英文路径、搜索 noindex、结构化数据 | 构建、HTTP 和浏览器检查；生产上线另行记录 |
| 型号询价 | 从产品 slug 派生 `product_slug`、`product_model`、`product_name`、`source_page`，选择相应分类 | 四型号有效预选和非法参数检查；实际投递 |
| 回跳语义 | `submitted=1` 仅作提示；旧 `success=1` 不证明发送 | 页面测试与销售收件核对 |
| GA4 代码入口 | 可选 `NEXT_PUBLIC_GA_MEASUREMENT_ID`；同意前不加载 GA；移除原自动加载 Vercel Analytics | 真实 ID、隐私审核、网络与 DebugView 验收 |
| 分析事件 | `quote_click`、`download_click`、`email_click`、`form_submit_attempt`；不发送 `generate_lead` | 不泄露姓名、邮箱、正文、原始查询字符串；拒绝/撤销行为 |
| 内容与运营文档 | 90 天计划、关键词表、周报模板、上线清单、10 个官方渠道候选、3 篇英文草稿 | 企业/工程审核；草稿尚未发布 |
| HTTP 冒烟脚本 | `node scripts/seo-smoke.mjs`，只读 HTTP，不提交表单 | 根任务集成后运行并记录结果 |

上述“实现”不代表服务账号已连接或线上已生效。英文资料包已生成：[5 页待审核 PDF](../artifacts/seo/pressure-product-pack-draft.pdf)，全部页面已渲染核查，未放入 public 或网页下载入口。现有首页视觉修改仍是此前的独立本地工作，不计入 SEO 交付。

运行本地生产服务器后执行 `npm run test:seo` 可复跑全部离线与 HTTP 检查。未来发布经过工程批准的新文章时，同步更新 `src/lib/analytics.ts` 的文章路径白名单。

## 外部条件尚待完成

1. **企业域名与账号**：选择、购买并持有域名；Vercel/DNS 权限；真实 GSC token、GA4 ID 和适用隐私配置。当前未取得这些账号数据，不能报告验证成功。
2. **工程事实**：四型号签字规格、温度/材料/连接/尺寸、校准文件、认证覆盖；三篇草稿的真实审核人及批准日期。没有这些证据，不发布虚构规格或把竞品范围用于本厂产品。
3. **销售确认**：正确收件方、受控测试授权及实际收件证明；暂未证明询盘送达，不以成功 URL 代替邮件证据。
4. **真实业务资料**：法律主体、制造检验照片、出口能力、MOQ、交期和实际联系方式。未知内容保持待确认。
5. **时间与数据**：GSC 收录、完整 28 天窗口、有效询盘及第 90 天复盘只能在实际发生后填报；当前没有排名增长或询盘增长结论。
6. **外部渠道**：10 家候选仅完成官方网页研究，未联系、未注册、未付费。负责人择最多 3 家审核后推进。

## 最终本地验收记录（2026-09-30）

| 检查 | 当前记录 | 证据/限制 |
| --- | --- | --- |
| smoke 脚本语法 | `node --check scripts/seo-smoke.mjs` 通过 | 不等于运行时检查通过 |
| 域名配置单元检查 | 37 项断言通过 | 离线 VM 检查 HTTPS origin、主机过滤及永久跳转；无 DNS 改动 |
| 分析数据净化检查 | 76 项断言通过 | 搜索来源仅保留已知 Google/Bing 域名；未知路径、产品、查询与个人信息被过滤 |
| 修改文件 lint | 通过 | 包含新增代码和测试；见 artifacts/seo/changed-files-lint.log |
| 全项目 lint | 仍有 12 个既有错误 | 原始 WebGL 包 11 项、CertLightbox 1 项；见 artifacts/seo/lint-result.log |
| 生产构建 | 最终构建通过，425 个预渲染条目 | artifacts/seo/build-result.log；不等于线上部署 |
| 13 组 HTTP 冒烟 | 全部通过 | artifacts/seo/test-result.log；包含真实 ISO 文章日期、有效来源与非法参数检查 |
| 浏览器布局 | 桌面专题、820px/390px 联系页检查通过，无横向溢出 | 未配置 GA 时，DOM 中 Google/Vercel Analytics 脚本均为 0 |
| GA4 真实接收与同意后行为 | 待真实 ID 后验收 | 当前仅完成代码、净化测试和未配置状态核验，未访问 GA 后台 |
| 性能指标 | 未取得 LCP/INP/CLS 实验室或真实用户报告 | 移除了全站地图预加载；无 CWV 通过或排名提升结论 |
| 生产发布、域名迁移 | 未在本文确认 | 不自动推定已上线 |
| Web3Forms 实际收件 | 待销售确认 | 匿名测试编号和到达时间 |

## 现有英文压力选型文章：事实审核清单

审查对象：`src/content/blog/en/selecting-pressure-gauge.mdx`。本次仅记录审核问题，未修改该原文。替代草稿位于 [selecting-pressure-gauge.md](editorial-drafts/selecting-pressure-gauge.md)，待工程批准。

| 现有说法 | 问题/可能误读 | 发布前处理 |
| --- | --- | --- |
| 所有正常压力应在量程的 1/3–2/3，示例选型称为“correct” | 各型号尺寸与负荷限制不同，比例不能单独证明工况适配 | 引用具体型号允许稳态/波动/短时负载；示例改为待确认 |
| 精度级别越高一定更贵、更敏感；工况与精度等级固定对应 | 缺少产品级证据，读者可能忽略真实误差预算与标准 | 删除绝对化结论，说明应用误差要求及参考条件 |
| 316L 适用于“mildly corrosive media” | “轻腐蚀”没有明确成分、浓度和温度定义 | 根据完整接液材料和实际介质评估，不泛化兼容性 |
| 售后统计证明前三大原因不是制造缺陷 | 未提供真实统计来源、样本与时间范围 | 删除统计归因，改成一般需要排查的因素 |
| 蒸汽高于约 60°C 直接损坏机芯 | 将个别温度限制变成通用边界；不同结构限制不同 | 使用目标型号介质/环境允许温度，隔热方案由工程确认 |
| 用液充表替代脉动防护 | 液充阻尼不能证明脉动/超压适配 | 区分振动、压力脉动、超压及响应要求 |
| lower-back 与 radial 混用，表盘尺寸/IP 等泛称标准 | 连接方向命名不清，范围不代表本厂可供配置 | 使用确认图纸、标准和型号数据 |
| 所有相关用途均强制检定 | 法域、设备用途、法规和项目要求各异 | 指向具体市场适用要求，避免跨国概括 |

该审核不是最终工程裁定。来源包括已读取的原文、产品数据、[WIKA 配置数据表](https://www.wika.com/media/Data-sheets/Pressure/Pressure-gauges/ds_pm0202_en_co.pdf) 与 [Swagelok 连接识别指南](https://www.swagelok.com/downloads/webcatalogs/EN/ms-13-77.pdf)。外部资料仅解释原理或举例，不证明 Jingfeng 产品合规或可供能力。
