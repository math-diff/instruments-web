import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { pageAlternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "zh" ? "隐私说明" : "Privacy notice",
    alternates: pageAlternates(locale === "zh" ? "zh" : "en", "/privacy", ["en", "zh"]),
    ...(locale !== "en" && locale !== "zh" ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function PrivacyPage({ params }: Props) {
  const zh = (await params).locale === "zh";
  const sections = zh ? [
    ["询价与邮件", "联系表单通过 Web3Forms 提交你填写的联系信息、公司信息、产品选择和需求，以邮件方式转交业务收件人，用于处理询价及后续沟通。请勿填写与询价无关的敏感信息。点击邮件链接会打开你的邮件应用；只有你发送邮件后，收件人才会收到该邮件。"],
    ["可选的 Google Analytics", "只有网站配置了 Google Analytics 且你选择允许统计后，才会加载 Google 的统计脚本。我们配置的事件包括页面浏览、询价点击、资料下载点击、邮件链接点击和表单提交尝试。提交尝试不代表邮件投递成功，也不代表有效询盘。"],
    ["统计范围", "统计事件使用已知页面路径及有效产品标识，不包含表单正文、姓名、邮箱、查询参数或完整来源网址。为了解获客来源，仅保留已知搜索引擎的来源域名，不包含来源页面路径或搜索词。Google 的脚本和网络请求仍可能处理 IP 地址、浏览器信息及 Cookie 等技术数据；统计服务可能涉及跨境处理。广告个性化和 Google Signals 在本网站配置中关闭。"],
    ["偏好与撤回", "我们将你的允许或拒绝选择保存在浏览器本地存储中。如果存储不可用，选择仅在当前会话中有效。配置统计功能时，页面下方提供“隐私偏好”入口，可随时拒绝后续统计。撤回后我们停止事件监听，并尝试清除当前域名可访问的 Google Analytics Cookie；这不会删除此前已发送到 Google 的数据。"],
    ["网站托管与地图", "网站由 Vercel 托管，提供服务所需的网络请求可能产生技术日志。联系页的嵌入式地图会自动向 OpenFreeMap 请求地图样式、瓦片和字体等资源；备用地图使用 OpenStreetMap 嵌入页面。这些请求可能向地图服务提供方传送 IP 地址、浏览器信息等技术数据，并不需要先点击地图链接。地图加载独立于 Google Analytics 统计同意设置。访问 OpenStreetMap 外部链接后适用该网站的隐私规则。本网站未启用自动 Vercel Analytics 访问统计。"],
    ["联系与处理请求", "如需询问或更正你通过询价提供的信息，请通过联系页列出的业务邮箱联系，并说明相关询价。我们会根据实际记录和适用要求处理。请勿在请求中发送不必要的身份证明或其他敏感资料。"],
  ] : [
    ["Enquiries and email", "The contact form submits your contact details, company information, product selection and requirements through Web3Forms for email delivery to our business recipient. We use the enquiry to respond and discuss your requirements. Please do not include sensitive information unrelated to your enquiry. Email links open your email application; the recipient receives a message only when you send it."],
    ["Optional Google Analytics", "Google Analytics loads only when it is configured for this website and you choose to allow analytics. Our configured events cover page views, enquiry clicks, download clicks, email-link clicks and form submission attempts. An attempt does not confirm email delivery or a qualified enquiry."],
    ["Analytics scope", "Our events use known page paths and valid product identifiers. They exclude form contents, names, email addresses, URL query parameters and full referrer URLs. For acquisition measurement, we retain only known search-engine origins, without referring paths or search queries. Google scripts and network requests may still process technical data such as IP addresses, browser information and cookies, potentially across borders. Our configuration disables advertising personalization and Google Signals."],
    ["Preferences and withdrawal", "We store your acceptance or rejection in browser local storage. If storage is unavailable, the choice applies only to the current session. When analytics is configured, use Privacy preferences at the bottom of the page to reject future analytics at any time. Withdrawal stops our event listeners and attempts to remove accessible Google Analytics cookies on the current domain. It does not delete data already sent to Google."],
    ["Hosting and maps", "Vercel hosts the website, and network requests needed to serve it may produce technical logs. The contact page's embedded map automatically requests map styles, tiles and fonts from OpenFreeMap; its fallback uses an embedded OpenStreetMap page. These requests may disclose technical information such as your IP address and browser information to the map providers without first clicking a map link. Map loading is independent of your Google Analytics consent preference. External OpenStreetMap links lead to a website with its own privacy practices. Automatic Vercel Analytics tracking is not enabled on this website."],
    ["Questions and requests", "To ask about or correct information provided in an enquiry, contact the business email listed on our contact page and identify the relevant enquiry. We will consider the request against the records available and applicable requirements. Please do not send unnecessary identity documents or sensitive information."],
  ];
  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-brand">{zh ? "隐私说明" : "Privacy notice"}</h1>
        <p className="mt-4 text-sm text-ink-soft">{zh ? "更新日期：2026 年 9 月 30 日" : "Updated: 30 September 2026"}</p>
        <p className="mt-6 leading-8 text-ink-soft">{zh ? "本说明介绍安徽晶锋仪表有限公司网站的询价处理与可选访问统计。" : "This notice describes enquiry handling and optional analytics on the Anhui Jingfeng Instrument Co., Ltd. website."}</p>
        {sections.map(([title, body]) => <section key={title} className="mt-9"><h2 className="text-xl font-bold text-brand">{title}</h2><p className="mt-3 leading-8 text-ink-soft">{body}</p></section>)}
        <div className="mt-10 flex flex-wrap gap-6 text-link underline underline-offset-4">
          <Link href={`/${zh ? "zh" : "en"}/contact`}>{zh ? "联系我们" : "Contact us"}</Link>
          <a href="https://web3forms.com/privacy">Web3Forms privacy</a>
          <a href="https://policies.google.com/privacy">Google privacy</a>
        </div>
      </div>
    </Container>
  );
}
