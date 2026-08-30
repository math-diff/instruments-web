export type CertStatus = "valid" | "expired" | "industry" | "company" | "cable";

export type Certificate = {
  file: string;
  title: { en: string; zh: string };
  status: CertStatus;
  statusLabel: { en: string; zh: string };
};

const labels: Record<CertStatus, { en: string; zh: string }> = {
  valid: { en: "Active", zh: "现行证书" },
  expired: { en: "Expired", zh: "历史证书 · 已到期" },
  industry: { en: "Industry role", zh: "行业背书" },
  company: { en: "Company", zh: "企业证明" },
  cable: { en: "Cables only", zh: "仅覆盖电缆" },
};

export const certificates: Certificate[] = [
  {
    file: "/certs/cert-01.jpg",
    title: {
      en: "Pattern Approval — Diaphragm & Capsule Pressure Gauges",
      zh: "计量器具型式批准证书(隔膜和膜盒压力表)",
    },
    status: "valid",
    statusLabel: labels.valid,
  },
  {
    file: "/certs/cert-02.jpg",
    title: {
      en: "Pattern Approval — General Pressure Gauges & Transmitters",
      zh: "计量器具型式批准证书(一般压力表和压力变送器)",
    },
    status: "valid",
    statusLabel: labels.valid,
  },
  {
    file: "/certs/cert-03.jpg",
    title: {
      en: "SIL Functional Safety Certification (Pressure Gauges)",
      zh: "SIL 功能安全认证(压力表)",
    },
    status: "expired",
    statusLabel: labels.expired,
  },
  {
    file: "/certs/cert-04.jpg",
    title: {
      en: "SIL Functional Safety Certification (Level Gauges)",
      zh: "SIL 功能安全认证(液位计)",
    },
    status: "expired",
    statusLabel: labels.expired,
  },
  {
    file: "/certs/cert-05.jpg",
    title: {
      en: "SIL Functional Safety Certification (Temperature Transmitter)",
      zh: "SIL 功能安全认证(一体化温度变送器)",
    },
    status: "expired",
    statusLabel: labels.expired,
  },
  {
    file: "/certs/cert-06.jpg",
    title: {
      en: "Member, National TC on Industrial Process Measurement & Automation",
      zh: "全国工业和过程测量控制和自动化标委会成员单位",
    },
    status: "industry",
    statusLabel: labels.industry,
  },
  {
    file: "/certs/cert-07.jpg",
    title: {
      en: "National “Little Giant” Specialized SME (2024)",
      zh: "国家级专精特新“小巨人”企业(2024)",
    },
    status: "industry",
    statusLabel: labels.industry,
  },
  {
    file: "/certs/cert-08.jpg",
    title: {
      en: "Jingfeng Group Business License (registered 2023-11-23)",
      zh: "晶锋集团营业执照(登记日期 2023-11-23)",
    },
    status: "company",
    statusLabel: labels.company,
  },
  {
    file: "/certs/cert-09.jpg",
    title: {
      en: "Power Cable LVD ECM Certificate (valid to 2028-03)",
      zh: "电力电缆 LVD ECM 证书(至 2028-03-05)",
    },
    status: "cable",
    statusLabel: labels.cable,
  },
  {
    file: "/certs/cert-10.jpg",
    title: {
      en: "Control Cable LVD ECM Certificate (valid to 2028-03)",
      zh: "控制电缆 LVD ECM 证书(至 2028-03-05)",
    },
    status: "cable",
    statusLabel: labels.cable,
  },
];
