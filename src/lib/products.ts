export type Category = "pressure" | "flow" | "temperature" | "level";

export type Product = {
  slug: string;
  category: Category;
  model: string;
  name: { en: string; zh: string };
  summary: { en: string; zh: string };
  highlights: { en: string[]; zh: string[] };
  specs: { en: [string, string][]; zh: [string, string][] };
};

export const categories: Category[] = [
  "pressure",
  "flow",
  "temperature",
  "level",
];

export const products: Product[] = [
  {
    slug: "dw-pressure-transmitter-3051",
    category: "pressure",
    model: "DW-3051",
    name: {
      en: "Smart Pressure Transmitter",
      zh: "智能压力变送器",
    },
    summary: {
      en: "Capacitive smart transmitter with 0.075% accuracy and HART communication.",
      zh: "电容式智能变送器,精度 0.075%,支持 HART 通讯。",
    },
    highlights: {
      en: ["0.075% accuracy", "HART 7 / 6", "Range up to 40 MPa", "IP67 / Ex i"],
      zh: ["精度 0.075%", "HART 7 / 6", "量程至 40 MPa", "IP67 / Ex i"],
    },
    specs: {
      en: [
        ["Accuracy", "±0.075% of span"],
        ["Range", "0–40 MPa"],
        ["Output", "4–20 mA + HART"],
        ["Wetted parts", "316L stainless steel"],
        ["Housing", "IP67, aluminium"],
        ["Hazardous area", "Ex ia IIC T4"],
        ["Operating temp", "-40 to 85 °C"],
        ["Protocol", "HART 7"],
      ],
      zh: [
        ["精度", "±0.075% 量程"],
        ["量程", "0–40 MPa"],
        ["输出", "4–20 mA + HART"],
        ["接液部件", "316L 不锈钢"],
        ["外壳", "IP67,铝合金"],
        ["防爆等级", "Ex ia IIC T4"],
        ["工作温度", "-40 至 85 °C"],
        ["协议", "HART 7"],
      ],
    },
  },
  {
    slug: "dw-pressure-gauge-100",
    category: "pressure",
    model: "DW-PG100",
    name: {
      en: "Stainless Pressure Gauge",
      zh: "不锈钢压力表",
    },
    summary: {
      en: "General-purpose bourdon pressure gauge with all-stainless case.",
      zh: "通用型 Bourdon 压力表,全不锈钢外壳。",
    },
    highlights: {
      en: ["0–60 MPa", "2.5% accuracy", "Glycerin filled", "316L wetted"],
      zh: ["0–60 MPa", "2.5% 精度", "充液", "316L 接液"],
    },
    specs: {
      en: [
        ["Accuracy", "±2.5% of span"],
        ["Range", "0–60 MPa"],
        ["Dial", "100 mm"],
        ["Wetted parts", "316L"],
        ["Filling", "Glycerin"],
        ["Connection", "G1/2, M20×1.5"],
        ["Operating temp", "-20 to 60 °C"],
      ],
      zh: [
        ["精度", "±2.5% 量程"],
        ["量程", "0–60 MPa"],
        ["表盘", "100 mm"],
        ["接液部件", "316L"],
        ["填充", "甘油"],
        ["接口", "G1/2, M20×1.5"],
        ["工作温度", "-20 至 60 °C"],
      ],
    },
  },
  {
    slug: "dw-electromagnetic-flowmeter-300",
    category: "flow",
    model: "DW-EMF300",
    name: {
      en: "Electromagnetic Flowmeter",
      zh: "电磁流量计",
    },
    summary: {
      en: "Wafer electromagnetic flowmeter for conductive liquids, 0.2% accuracy.",
      zh: "对夹式电磁流量计,适用于导电液体,精度 0.2%。",
    },
    highlights: {
      en: ["0.2% accuracy", "DN3–DN600", "Pulse / 4–20mA", "IP68 sensor"],
      zh: ["精度 0.2%", "DN3–DN600", "脉冲 / 4–20mA", "IP68 传感器"],
    },
    specs: {
      en: [
        ["Accuracy", "±0.2% of rate"],
        ["Diameter", "DN3 – DN600"],
        ["Lining", "PTFE / Rubber"],
        ["Electrode", "316L / Hastelloy"],
        ["Output", "4–20 mA, Pulse, RS485"],
        ["Protocol", "Modbus RTU"],
        ["Protection", "IP68 (sensor)"],
      ],
      zh: [
        ["精度", "±0.2% 流速"],
        ["口径", "DN3 – DN600"],
        ["衬里", "PTFE / 橡胶"],
        ["电极", "316L / 哈氏合金"],
        ["输出", "4–20 mA, 脉冲, RS485"],
        ["协议", "Modbus RTU"],
        ["防护", "IP68(传感器)"],
      ],
    },
  },
  {
    slug: "dw-vortex-flowmeter-200",
    category: "flow",
    model: "DW-VF200",
    name: {
      en: "Vortex Flowmeter",
      zh: "涡街流量计",
    },
    summary: {
      en: "Vortex shedding flowmeter for steam, gas and liquid measurement.",
      zh: "涡街流量计,适用于蒸汽、气体与液体测量。",
    },
    highlights: {
      en: ["Steam & gas", "DN15–DN300", "Temp to 350°C", "HART option"],
      zh: ["蒸汽与气体", "DN15–DN300", "耐温 350°C", "可选 HART"],
    },
    specs: {
      en: [
        ["Accuracy", "±1.0% of rate (liquid)"],
        ["Diameter", "DN15 – DN300"],
        ["Media", "Steam, gas, liquid"],
        ["Temp range", "-40 to 350 °C"],
        ["Output", "4–20 mA, Pulse"],
        ["Protocol", "HART (optional)"],
        ["Pressure rating", "PN1.6 – PN4.0"],
      ],
      zh: [
        ["精度", "±1.0% 流速(液体)"],
        ["口径", "DN15 – DN300"],
        ["介质", "蒸汽、气体、液体"],
        ["温度范围", "-40 至 350 °C"],
        ["输出", "4–20 mA, 脉冲"],
        ["协议", "HART(可选)"],
        ["耐压等级", "PN1.6 – PN4.0"],
      ],
    },
  },
  {
    slug: "dw-rtd-temperature-transmitter",
    category: "temperature",
    model: "DW-TT200",
    name: {
      en: "RTD Temperature Transmitter",
      zh: "热电阻温度变送器",
    },
    summary: {
      en: "Pt100 head-mounted transmitter with 4–20 mA output and HART.",
      zh: "Pt100 表头安装变送器,4–20 mA 输出,支持 HART。",
    },
    highlights: {
      en: ["Pt100 sensor", "-200 to 600°C", "Head-mounted", "HART 7"],
      zh: ["Pt100 传感器", "-200 至 600°C", "表头安装", "HART 7"],
    },
    specs: {
      en: [
        ["Sensor", "Pt100 (RTD)"],
        ["Range", "-200 to 600 °C"],
        ["Accuracy", "±0.2 °C"],
        ["Output", "4–20 mA + HART"],
        ["Mounting", "Head-mounted (DIN)"],
        ["Housing", "IP66"],
        ["Protocol", "HART 7"],
      ],
      zh: [
        ["传感器", "Pt100(热电阻)"],
        ["量程", "-200 至 600 °C"],
        ["精度", "±0.2 °C"],
        ["输出", "4–20 mA + HART"],
        ["安装", "表头安装(DIN)"],
        ["外壳", "IP66"],
        ["协议", "HART 7"],
      ],
    },
  },
  {
    slug: "dw-thermocouple-assembly",
    category: "temperature",
    model: "DW-TC100",
    name: {
      en: "Thermocouple Assembly",
      zh: "热电偶组件",
    },
    summary: {
      en: "K-type thermocouple assembly with thermowell for high-temp processes.",
      zh: "K 型热电偶组件,带保护套管,适用于高温过程。",
    },
    highlights: {
      en: ["Type K", "to 1100°C", "Thermowell", "316L sheath"],
      zh: ["K 型", "至 1100°C", "保护套管", "316L 套管"],
    },
    specs: {
      en: [
        ["Type", "K (NiCr-NiAl)"],
        ["Range", "0 to 1100 °C"],
        ["Sheath", "316L / Inconel"],
        ["Thermowell", "Included"],
        ["Connection", "M20×1.5"],
        ["Housing", "IP65"],
      ],
      zh: [
        ["类型", "K 型(NiCr-NiAl)"],
        ["量程", "0 至 1100 °C"],
        ["套管", "316L / Inconel"],
        ["保护套管", "包含"],
        ["接口", "M20×1.5"],
        ["外壳", "IP65"],
      ],
    },
  },
  {
    slug: "dw-radar-level-transmitter",
    category: "level",
    model: "DW-RLD80",
    name: {
      en: "Radar Level Transmitter",
      zh: "雷达液位变送器",
    },
    summary: {
      en: "Non-contact 80 GHz FMCW radar for tanks and silos up to 80 m.",
      zh: "非接触式 80 GHz FMCW 雷达,适用 80 米以内储罐与料仓。",
    },
    highlights: {
      en: ["80 GHz FMCW", "Range 80 m", "±2 mm accuracy", "HART / Modbus"],
      zh: ["80 GHz FMCW", "量程 80 m", "±2 mm 精度", "HART / Modbus"],
    },
    specs: {
      en: [
        ["Technology", "80 GHz FMCW"],
        ["Range", "0–80 m"],
        ["Accuracy", "±2 mm"],
        ["Output", "4–20 mA + HART"],
        ["Protocol", "Modbus RTU"],
        ["Process temp", "-40 to 150 °C"],
        ["Pressure", "-0.1 to 2.0 MPa"],
        ["Antenna", "PTFE horn"],
      ],
      zh: [
        ["技术", "80 GHz FMCW"],
        ["量程", "0–80 m"],
        ["精度", "±2 mm"],
        ["输出", "4–20 mA + HART"],
        ["协议", "Modbus RTU"],
        ["过程温度", "-40 至 150 °C"],
        ["压力", "-0.1 至 2.0 MPa"],
        ["天线", "PTFE 喇叭"],
      ],
    },
  },
  {
    slug: "dw-ultrasonic-level-transmitter",
    category: "level",
    model: "DW-ULD20",
    name: {
      en: "Ultrasonic Level Transmitter",
      zh: "超声波液位变送器",
    },
    summary: {
      en: "Compact ultrasonic level transmitter for water and light liquids.",
      zh: "紧凑型超声波液位变送器,适用于水及轻质液体。",
    },
    highlights: {
      en: ["Range 20 m", "±0.25% accuracy", "IP66", "4–20 mA"],
      zh: ["量程 20 m", "±0.25% 精度", "IP66", "4–20 mA"],
    },
    specs: {
      en: [
        ["Range", "0–20 m"],
        ["Accuracy", "±0.25% of span"],
        ["Output", "4–20 mA"],
        ["Protocol", "Modbus RTU (opt)"],
        ["Housing", "IP66 / IP67"],
        ["Process temp", "-20 to 80 °C"],
        ["Display", "LCD optional"],
      ],
      zh: [
        ["量程", "0–20 m"],
        ["精度", "±0.25% 量程"],
        ["输出", "4–20 mA"],
        ["协议", "Modbus RTU(可选)"],
        ["外壳", "IP66 / IP67"],
        ["过程温度", "-20 至 80 °C"],
        ["显示", "可选 LCD"],
      ],
    },
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(category: Category) {
  return products.filter((p) => p.category === category);
}
