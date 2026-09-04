import { pick, type L10n } from "@/lib/products";

export type Tier = {
  id: "essential" | "standard" | "premium";
  priceFrom: L10n<string>;
  tagline: L10n<string>;
  features: L10n<string[]>;
  highlighted?: boolean;
};

export const tiers: Tier[] = [
  {
    id: "essential",
    priceFrom: { en: "$120", zh: "¥880" },
    tagline: {
      en: "For general-purpose monitoring where basic accuracy is enough.",
      zh: "适用于对精度要求一般的常规监测场景。",
    },
    features: {
      en: [
        "Pressure gauges & basic transmitters",
        "±0.5% accuracy",
        "4–20 mA output",
        "IP65 housing",
        "Standard wetted materials",
      ],
      zh: [
        "压力表与基础变送器",
        "±0.5% 精度",
        "4–20 mA 输出",
        "IP65 外壳",
        "标准接液材质",
      ],
    },
  },
  {
    id: "standard",
    priceFrom: { en: "$320", zh: "¥2,300" },
    tagline: {
      en: "The workhorse for most process plants — smart, certified, connected.",
      zh: "多数流程工厂的主力选择 — 智能、认证、联网。",
    },
    features: {
      en: [
        "Smart transmitters (pressure/flow/temp/level)",
        "±0.1% accuracy",
        "HART 7 communication",
        "Ex i hazardous-area certification",
        "316L wetted parts",
        "IP67 housing",
      ],
      zh: [
        "智能变送器(压力/流量/温度/液位)",
        "±0.1% 精度",
        "HART 7 通讯",
        "Ex i 防爆认证",
        "316L 接液部件",
        "IP67 外壳",
      ],
    },
    highlighted: true,
  },
  {
    id: "premium",
    priceFrom: { en: "$980", zh: "¥6,900" },
    tagline: {
      en: "High-accuracy, high-temperature and advanced-protocol instruments.",
      zh: "高精度、高温及高级协议仪表。",
    },
    features: {
      en: [
        "Radar / Coriolis / FMCW instruments",
        "±0.05% accuracy",
        "Modbus RTU + HART",
        "Ex d + Ex i dual certification",
        "High-temp (-40 to 350 °C+)",
        "IP68 / submersible options",
        "Calibration certificate included",
      ],
      zh: [
        "雷达 / 科氏力 / FMCW 仪表",
        "±0.05% 精度",
        "Modbus RTU + HART",
        "Ex d + Ex i 双重防爆认证",
        "高温(-40 至 350 °C+)",
        "IP68 / 潜水式可选",
        "含校准证书",
      ],
    },
  },
];
