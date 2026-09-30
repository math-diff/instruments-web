# 晶锋仪表外贸独立站：Google SEO 90 天执行计划

编制日期：2026-09-30。本文为执行基线，不是完成报告。代码、上线状态、账户配置及实际收件应分别验收；未取得 GSC/GA4 数据，不填入排名、访问量或询盘增长数字。

## 目标与边界

面向中东、东南亚的工业采购商，以厂家直接供货为业务定位，先建立压力仪表的英文采购页面与有效询盘链路。首批观察阿联酋、沙特、马来西亚、新加坡，每周投入半天至一天。90 天内不新增语言、不批量制作国家页、不承诺首页排名或固定订单量。没有当地办公室或库存证据，不宣传为当地供应商。

独立域名尚待企业选择并持有，GSC/GA4 账户及工程审核资料尚待提供。本阶段先交付可本地验收的页面、技术配置入口和文档；不得把代码存在视作生产配置完成。既有首页视觉重构不计入 SEO 成果。

## 13 周交付路线

| 周次 | 工作 | 交付与验收 | 负责人 |
| --- | --- | --- | --- |
| 1–2 | 选定正式域名、绑定 Vercel、搜索监测、测试询盘 | 对应路径重定向；DNS 验证 GSC；提交 sitemap；测试实际到达收件箱 | 企业、开发、销售 |
| 3–5 | 压力表专题与四个详情页 | `/en/pressure-gauges`；四型号可比较；未知参数明确待选型；询价带入型号和来源 | 开发、工程 |
| 6–8 | 内容与内链 | 升级一篇选型指南、新增连接及振动指南；工程审核后发布；指南—专题—产品互链 | 工程、编辑 |
| 9–10 | 企业可信度与行业曝光 | 工厂主体、实拍检验流程、真实出口资料；审查 10 个渠道，最多选择 3 个联系 | 企业、销售 |
| 11–13 | 数据复盘 | 比较最近与此前各 28 天；选定并完成优先级最高的 3 项页面调整 | 销售、开发 |

计划交付总量：1 个专题页、4 个产品详情升级、3 篇英文指南、1 份英文资料包、1 张周监测表。工程信息不足时保留草稿和资料缺口，不以竞品规格替代本厂参数。

## 技术实施要求

- 生产域名统一驱动 canonical、hreflang、sitemap、robots、分享 URL 和表单回跳。域名选择不改变产品及文章路径。旧 Vercel 域名和其他域名变体按原路径 301/308 到主域名，至少保留一年；不要全部跳首页。
- 站内英文链接统一 `/en/` 前缀；明确语言路径不被浏览器语言覆盖。每页自指 canonical；仅实际译文互设 hreflang。英文回退文章不伪装成完整翻译。
- 搜索参数页使用页面级 noindex，排除 sitemap；纯英文压力分类入口可以转向专题，带搜索词的请求保留搜索行为。核心文字与规格服务端输出，可通过普通链接到达。
- Organization、BreadcrumbList、Article 的信息必须与可见内容相符。没有真实报价、库存、评分时不制造 Product 富结果字段。
- 抽测首页、专题、详情、文章和联系页移动表现，处理图片尺寸、字体、布局位移和非首屏脚本。动画离屏暂停，正文独立于 WebGL。
- GA4 仅在配置真实 ID 且满足同意机制后启用；记录询价点击、资料下载、邮件点击、提交尝试。姓名、邮箱、需求正文与完整 URL 查询参数不进入分析工具。

## 页面与资料规范

专题面向 `pressure gauge manufacturer`、`industrial pressure gauges` 的采购意图，展示四个系列的差异、已知事实和需求提交步骤；竞争性搜索量与难度尚未验证。完整映射见 [关键词表](seo-keyword-map.md)。

产品页必须区分实拍样品与可订货规格。当前源码记录 JF-1541、JF-1545、JF-1543、JF-1542；它不是厂家签字确认的规格书。每款仍需确认量程选项、精度适用标准、表盘直径、安装姿态、接口标准、接液材料、温度、尺寸图、校准文件和认证覆盖。JF-1545 可见 316L 标记不能证明所有接液部件均为 316L。资料包只收录有来源的样品信息及询价表，不冒称认证数据表。

三篇指南草稿位于 `editorial-drafts/`，状态为待工程审核，不参与 sitemap。发布时使用真实审核人和实际更新时间；不把本文编制日写成技术批准日。原有选型文中的通用温度上限、强制量程比例、无来源售后统计等需经核实后替换。

企业页新增内容必须由企业提供：法律主体及品牌关系、可证明的工厂照片、检验流程、出口文件。MOQ、交期、可定制范围和回复时效不得推测。外部渠道见 [候选清单](seo-outreach-candidates.md)，未执行联系或付费。

## 衡量与发布验收

有效询盘 = 联系方式可用 + 产品属于可供范围 + 至少提供型号、数量、工况、项目需求之一；排除垃圾邮件和无关推销。前期以销售实际收件核对，提交尝试和 `?success=1` 不能计入有效询盘。

使用 [上线检查表](seo-launch-checklist.md) 和 [每周监测表](seo-weekly-monitoring.md) 记录证据。重点页面应返回 200、canonical 正确、无重定向循环、sitemap 只列规范可索引 URL。GSC 可以抓取不等于 Google 必须收录。

有足够真实用户数据时，移动端第 75 百分位目标为 LCP ≤ 2.5 秒、INP ≤ 200 毫秒、CLS ≤ 0.1；数据不足时只报告实验室结果。第 90 天报告交付量、未收录原因、非品牌查询、四国表现与真实询盘。低基数用绝对值，不夸大百分比。

## 职责及待提供资料

| 角色 | 下一步 |
| --- | --- |
| 企业负责人 | 域名及 DNS/Vercel 权限；法律主体；工厂、商业条款及真实出口信息 |
| 工程审核人 | 四型号签字规格、连接图、选型限制；三篇草稿逐项审核；真实姓名与批准日期 |
| 销售负责人 | 收件人确认、受控询盘测试、每周有效性和报价记录 |
| 开发/AI | 页面与技术实现、内容草稿、测试证据、监测和维护文档 |

## 参考

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [多语言网站](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- [域名迁移](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
- [Core Web Vitals](https://support.google.com/webmasters/answer/9205520?hl=en)
- [垃圾内容政策](https://developers.google.com/search/docs/essentials/spam-policies)
- [Product 富结果要求](https://developers.google.com/search/docs/appearance/structured-data/product-snippet)

行业页面研究可参考 [Kleev](https://kleevme.ae/pressure-gauges/)、[TPK](https://www.tpk.com.sg/product/analogue-pressure-gauge/)、[WIKA](https://www.wika.com/en-sg/213_53.WIKA)、[ATL](https://www.atl-my.com/)。这些是结构参考，不是已验证的 Google 排名、销量或供应能力证据。
