export type Category = "pressure" | "temperature" | "level";

export type Product = {
  slug: string;
  category: Category;
  model: string;
  image: string;
  name: { en: string; zh: string };
  summary: { en: string; zh: string };
  highlights: { en: string[]; zh: string[] };
  specs: { en: [string, string][]; zh: [string, string][] };
};

export const categories: Category[] = [
  "pressure",
  "temperature",
  "level",
];

export const products: Product[] = [
  {
    slug: "pressure-gauge",
    category: "pressure",
    model: "JF-1541",
    image: "/products/pressure-gauge.jpg",
    name: { en: "Pressure Gauge", zh: "压力表" },
    summary: {
      en: "General-purpose Bourdon tube pressure gauge for local process pressure indication.",
      zh: "通用波登管压力表,用于现场过程压力指示。",
    },
    highlights: {
      en: ["0–60 MPa ranges", "±1.6% FS accuracy", "Radial / axial mount"],
      zh: ["量程 0–60 MPa", "精度 ±1.6% FS", "径向 / 轴向安装"],
    },
    specs: {
      en: [
        ["Range", "0–0.1 to 0–60 MPa"],
        ["Accuracy", "±1.6% FS"],
        ["Connection", "M20×1.5, radial or axial"],
        ["Case", "φ100 / φ150 mm"],
      ],
      zh: [
        ["量程", "0–0.1 至 0–60 MPa"],
        ["精度", "±1.6% FS"],
        ["接口", "M20×1.5,径向 / 轴向"],
        ["表壳", "φ100 / φ150 mm"],
      ],
    },
  },
  {
    slug: "stainless-pressure-gauge",
    category: "pressure",
    model: "JF-1545",
    image: "/products/stainless-pressure-gauge.jpg",
    name: { en: "Stainless Steel Pressure Gauge", zh: "不锈钢压力表" },
    summary: {
      en: "All-stainless pressure gauge for corrosive media and harsh environments.",
      zh: "全不锈钢压力表,适用于腐蚀性介质与恶劣环境。",
    },
    highlights: {
      en: ["316L wetted parts", "Glycerine filling optional", "Up to 100 MPa"],
      zh: ["316L 接液部件", "可选甘油阻尼", "量程至 100 MPa"],
    },
    specs: {
      en: [
        ["Range", "0–0.1 to 0–100 MPa"],
        ["Accuracy", "±1.6% FS"],
        ["Wetted parts", "304 / 316L stainless steel"],
        ["Connection", "M20×1.5 or custom"],
      ],
      zh: [
        ["量程", "0–0.1 至 0–100 MPa"],
        ["精度", "±1.6% FS"],
        ["接液材质", "304 / 316L 不锈钢"],
        ["接口", "M20×1.5 或定制"],
      ],
    },
  },
  {
    slug: "capsule-pressure-gauge",
    category: "pressure",
    model: "JF-1543",
    image: "/products/capsule-pressure-gauge.jpg",
    name: { en: "Capsule Pressure Gauge", zh: "不锈钢膜盒压力表" },
    summary: {
      en: "Capsule element gauge for low pressure and micro-pressure measurement of gases.",
      zh: "膜盒式压力表,适用于气体微压与低压测量。",
    },
    highlights: {
      en: ["kPa-level low ranges", "316L capsule", "Panel / surface mount"],
      zh: ["kPa 级微压量程", "316L 膜盒", "盘装 / 壁装"],
    },
    specs: {
      en: [
        ["Range", "0–2.5 to 0–60 kPa, ±kPa"],
        ["Accuracy", "±1.6% FS"],
        ["Wetted parts", "316L stainless steel capsule"],
        ["Connection", "M20×1.5"],
      ],
      zh: [
        ["量程", "0–2.5 至 0–60 kPa、±kPa"],
        ["精度", "±1.6% FS"],
        ["接液材质", "316L 不锈钢膜盒"],
        ["接口", "M20×1.5"],
      ],
    },
  },
  {
    slug: "ammonia-pressure-gauge",
    category: "pressure",
    model: "JF-1542",
    image: "/products/ammonia-pressure-gauge.jpg",
    name: { en: "Ammonia Pressure Gauge", zh: "不锈钢氨用压力表" },
    summary: {
      en: "Stainless gauge dedicated to ammonia and refrigeration systems, with safety blow-out back.",
      zh: "氨液与制冷系统专用不锈钢压力表,表盘带安全泄压孔。",
    },
    highlights: {
      en: ["Ammonia / refrigeration duty", "Safety blow-out back", "Stainless wetted parts"],
      zh: ["氨 / 制冷专用", "安全泄压表背", "不锈钢接液"],
    },
    specs: {
      en: [
        ["Range", "0–1 to 0–40 MPa, vacuum compound"],
        ["Accuracy", "±1.6% FS"],
        ["Wetted parts", "Stainless steel"],
        ["Connection", "M20×1.5"],
      ],
      zh: [
        ["量程", "0–1 至 0–40 MPa、压力真空"],
        ["精度", "±1.6% FS"],
        ["接液材质", "不锈钢"],
        ["接口", "M20×1.5"],
      ],
    },
  },
  {
    slug: "bimetal-thermometer",
    category: "temperature",
    model: "JF-1550",
    image: "/products/bimetal-thermometer.jpg",
    name: { en: "Bimetal Thermometer", zh: "双金属温度计" },
    summary: {
      en: "Local bimetallic dial thermometer for industrial temperature indication without power supply.",
      zh: "现场双金属刻度温度计,无需供电即可指示工业温度。",
    },
    highlights: {
      en: ["-80 to 500 °C", "Axial / radial / universal", "No power required"],
      zh: ["-80 至 500 °C", "轴向 / 径向 / 万向型", "无需供电"],
    },
    specs: {
      en: [
        ["Range", "-80 to 500 °C"],
        ["Accuracy", "±1.5% FS"],
        ["Dial", "φ60 / φ100 / φ150 mm"],
        ["Stem", "Ø6 / Ø10 mm, length to order"],
      ],
      zh: [
        ["量程", "-80 至 500 °C"],
        ["精度", "±1.5% FS"],
        ["表盘", "φ60 / φ100 / φ150 mm"],
        ["探杆", "Ø6 / Ø10 mm,长度可定制"],
      ],
    },
  },
  {
    slug: "surface-thermistor",
    category: "temperature",
    model: "JF-1553",
    image: "/products/surface-thermistor.jpg",
    name: { en: "Surface RTD", zh: "端面热电阻" },
    summary: {
      en: "Surface-mounted platinum RTD for bearing and pipe wall temperature measurement.",
      zh: "端面贴片式铂热电阻,用于轴承与管壁温度测量。",
    },
    highlights: {
      en: ["PT100 sensing element", "Flat contact surface", "Compact design"],
      zh: ["PT100 感温元件", "平面接触端面", "结构紧凑"],
    },
    specs: {
      en: [
        ["Element", "PT100, Class B"],
        ["Range", "-50 to 200 °C"],
        ["Contact face", "316L stainless steel"],
        ["Lead", "Silicone-insulated, waterproof gland"],
      ],
      zh: [
        ["感温元件", "PT100,B 级"],
        ["量程", "-50 至 200 °C"],
        ["端面材质", "316L 不锈钢"],
        ["引线", "硅橡胶护套,防水接头"],
      ],
    },
  },
  {
    slug: "assembly-thermistor",
    category: "temperature",
    model: "JF-1533",
    image: "/products/assembly-thermistor.jpg",
    name: { en: "RTD Assembly", zh: "热电阻" },
    summary: {
      en: "Industrial platinum RTD assembly with protective thermowell for pipelines and vessels.",
      zh: "工业铂热电阻成套组件,带保护管,适用于管道与容器测温。",
    },
    highlights: {
      en: ["PT100 / PT1000", "Class A / B options", "304 / 316 / 316L thermowell"],
      zh: ["PT100 / PT1000", "A 级 / B 级可选", "304 / 316 / 316L 保护管"],
    },
    specs: {
      en: [
        ["Element", "PT100 / PT1000, Class A or B"],
        ["Range", "-200 to 500 °C"],
        ["Thermowell", "304 / 316 / 316L"],
        ["Wiring", "2 / 3 / 4-wire"],
      ],
      zh: [
        ["感温元件", "PT100 / PT1000,A 级或 B 级"],
        ["量程", "-200 至 500 °C"],
        ["保护管", "304 / 316 / 316L"],
        ["接线方式", "二 / 三 / 四线制"],
      ],
    },
  },
  {
    slug: "explosion-proof-thermistor",
    category: "temperature",
    model: "JF-1465",
    image: "/products/explosion-proof-thermistor.jpg",
    name: { en: "Explosion-proof RTD", zh: "防爆热电阻" },
    summary: {
      en: "Flameproof RTD with explosion-proof junction box for hazardous area temperature measurement.",
      zh: "隔爆接线盒铂热电阻,适用于危险区域温度测量。",
    },
    highlights: {
      en: ["Ex d IIC T6", "Flameproof junction box", "PT100 element"],
      zh: ["Ex d IIC T6", "隔爆接线盒", "PT100 感温元件"],
    },
    specs: {
      en: [
        ["Element", "PT100, Class B"],
        ["Range", "-200 to 450 °C"],
        ["Explosion proof", "Ex d IIC T6"],
        ["Thermowell", "Stainless steel"],
      ],
      zh: [
        ["感温元件", "PT100,B 级"],
        ["量程", "-200 至 450 °C"],
        ["防爆等级", "Ex d IIC T6"],
        ["保护管", "不锈钢"],
      ],
    },
  },
  {
    slug: "integrated-thermistor",
    category: "temperature",
    model: "JF-973",
    image: "/products/integrated-thermistor.jpg",
    name: { en: "Integrated Explosion-proof RTD Transmitter", zh: "一体化防爆热电阻" },
    summary: {
      en: "RTD with integrated head-mounted transmitter, outputting 4–20 mA directly in hazardous areas.",
      zh: "热电阻与表头一体化变送,危险区域直接输出 4–20 mA。",
    },
    highlights: {
      en: ["Integrated 4–20 mA transmitter", "Ex d IIC T6", "Optional LCD display"],
      zh: ["一体化 4–20 mA 变送", "Ex d IIC T6", "可选 LCD 显示"],
    },
    specs: {
      en: [
        ["Element", "PT100, Class B"],
        ["Range", "-200 to 450 °C"],
        ["Output", "4–20 mA, 2-wire"],
        ["Explosion proof", "Ex d IIC T6"],
      ],
      zh: [
        ["感温元件", "PT100,B 级"],
        ["量程", "-200 至 450 °C"],
        ["输出", "4–20 mA,二线制"],
        ["防爆等级", "Ex d IIC T6"],
      ],
    },
  },
  {
    slug: "wear-resistant-thermistor",
    category: "temperature",
    model: "JF-960",
    image: "/products/wear-resistant-thermistor.jpg",
    name: { en: "Wear-resistant RTD", zh: "耐磨热电阻" },
    summary: {
      en: "Armoured wear-resistant RTD for coal pulverising and dusty high-velocity flows in power plants.",
      zh: "耐磨铠装热电阻,适用于电厂制粉等含粉尘高速流动介质。",
    },
    highlights: {
      en: ["Wear-resistant tip", "Power plant duty", "Withstands dust-laden flows"],
      zh: ["耐磨测温端", "电站工况专用", "耐高速粉尘冲刷"],
    },
    specs: {
      en: [
        ["Element", "PT100, Class B"],
        ["Range", "0 to 600 °C"],
        ["Tip", "Hard-alloy wear-resistant cap"],
        ["Application", "Coal milling, dust-laden air"],
      ],
      zh: [
        ["感温元件", "PT100,B 级"],
        ["量程", "0 至 600 °C"],
        ["测温端", "硬质合金耐磨头"],
        ["应用", "磨煤机、含尘气体"],
      ],
    },
  },
  {
    slug: "explosion-proof-thermocouple",
    category: "temperature",
    model: "JF-1534",
    image: "/products/explosion-proof-thermocouple.jpg",
    name: { en: "Explosion-proof Thermocouple", zh: "防爆热套热电偶" },
    summary: {
      en: "Thermowell-mounted flameproof thermocouple for high-temperature duties in hazardous plants.",
      zh: "带保护套管的隔爆热电偶,适用于危险场所高温测量。",
    },
    highlights: {
      en: ["K / N type calibrations", "Up to 1000 °C", "Ex d IIC T6"],
      zh: ["K / N 分度", "耐温至 1000 °C", "Ex d IIC T6"],
    },
    specs: {
      en: [
        ["Calibration", "K / N type"],
        ["Range", "0 to 1000 °C"],
        ["Explosion proof", "Ex d IIC T6"],
        ["Mounting", "Threaded or flanged thermowell"],
      ],
      zh: [
        ["分度号", "K / N 型"],
        ["量程", "0 至 1000 °C"],
        ["防爆等级", "Ex d IIC T6"],
        ["安装", "螺纹 / 法兰保护套"],
      ],
    },
  },
  {
    slug: "power-plant-thermocouple",
    category: "temperature",
    model: "JF-996",
    image: "/products/power-plant-thermocouple.jpg",
    name: { en: "Power Plant Thermocouple", zh: "电站专用热电偶" },
    summary: {
      en: "Heavy-duty thermocouple designed for boiler, steam line and turbine temperature points.",
      zh: "电站重载热电偶,专用于锅炉、蒸汽管道与汽机测温点。",
    },
    highlights: {
      en: ["Boiler / steam duty", "Anti-splash junction box", "Up to 900 °C"],
      zh: ["锅炉 / 蒸汽工况", "防喷溅接线盒", "耐温至 900 °C"],
    },
    specs: {
      en: [
        ["Calibration", "K / E type"],
        ["Range", "0 to 900 °C"],
        ["Junction box", "Splash-proof / weather-proof"],
        ["Mounting", "Flanged, with thermowell"],
      ],
      zh: [
        ["分度号", "K / E 型"],
        ["量程", "0 至 900 °C"],
        ["接线盒", "防喷溅 / 防水"],
        ["安装", "法兰 + 保护套"],
      ],
    },
  },
  {
    slug: "petrochemical-thermocouple",
    category: "temperature",
    model: "JF-975",
    image: "/products/petrochemical-thermocouple.jpg",
    name: { en: "Petrochemical Thermocouple & RTD", zh: "石油化工热电偶-热电阻" },
    summary: {
      en: "Flange-mounted thermocouple / RTD family engineered for petrochemical process units.",
      zh: "法兰安装热电偶 / 热电阻系列,面向石油化工装置测温。",
    },
    highlights: {
      en: ["K / E / PT100 options", "DN25–80 flanges", "Refinery-proven design"],
      zh: ["K / E / PT100 可选", "DN25–80 法兰", "炼化装置成熟方案"],
    },
    specs: {
      en: [
        ["Calibration", "K / E type, PT100"],
        ["Range", "-200 to 1000 °C"],
        ["Process connection", "DN25–80 flange"],
        ["Thermowell", "316L"],
      ],
      zh: [
        ["分度号", "K / E 型、PT100"],
        ["量程", "-200 至 1000 °C"],
        ["过程接口", "DN25–80 法兰"],
        ["保护套", "316L"],
      ],
    },
  },
  {
    slug: "magnetic-level",
    category: "level",
    model: "JF-1551",
    image: "/products/magnetic-level.jpg",
    name: { en: "Magnetic Level Gauge", zh: "磁翻板液位计" },
    summary: {
      en: "Bypass magnetic flip level gauge giving a clear local indication for tanks and drums.",
      zh: "旁路管磁翻板液位计,为储罐与容器提供清晰的现场液位指示。",
    },
    highlights: {
      en: ["0–6 m ranges", "±10 mm accuracy", "4–20 mA optional"],
      zh: ["量程 0–6 m", "精度 ±10 mm", "可选 4–20 mA 输出"],
    },
    specs: {
      en: [
        ["Range", "0.3 to 6 m, centre distance"],
        ["Accuracy", "±10 mm"],
        ["Wetted parts", "304 / 316L / PP"],
        ["Mounting", "Side or top"],
      ],
      zh: [
        ["量程", "中心距 0.3 至 6 m"],
        ["精度", "±10 mm"],
        ["接液材质", "304 / 316L / PP"],
        ["安装", "侧装 / 顶装"],
      ],
    },
  },
  {
    slug: "anticorrosive-magnetic-level",
    category: "level",
    model: "JF-1552",
    image: "/products/anticorrosive-magnetic-level.jpg",
    name: { en: "Anti-corrosion Magnetic Level Gauge", zh: "防腐磁翻板液位计" },
    summary: {
      en: "PTFE-lined magnetic level gauge for strong acids, alkalis and corrosive media.",
      zh: "衬四氟磁翻板液位计,适用于强酸强碱等腐蚀介质。",
    },
    highlights: {
      en: ["PTFE-lined chamber", "Strong acid / alkali duty", "Alarm switches optional"],
      zh: ["衬四氟测量室", "强酸强碱工况", "可选报警开关"],
    },
    specs: {
      en: [
        ["Range", "0.3 to 6 m"],
        ["Accuracy", "±10 mm"],
        ["Lining", "PTFE / PP"],
        ["Medium density", "≥0.45 g/cm³"],
      ],
      zh: [
        ["量程", "0.3 至 6 m"],
        ["精度", "±10 mm"],
        ["衬里", "PTFE / PP"],
        ["介质密度", "≥0.45 g/cm³"],
      ],
    },
  },
  {
    slug: "insert-float-level",
    category: "level",
    model: "JF-1555",
    image: "/products/insert-float-level.jpg",
    name: { en: "Insertion Float Level Gauge", zh: "插入式浮球液位计" },
    summary: {
      en: "Insertion float level transmitter with reed-chain output for water tanks and wells.",
      zh: "插入式浮球液位变送器,干簧管链输出,适用于水箱与水井。",
    },
    highlights: {
      en: ["0–10 m insertion depth", "±5 mm accuracy", "4–20 mA reed output"],
      zh: ["插入深度 0–10 m", "精度 ±5 mm", "干簧管 4–20 mA 输出"],
    },
    specs: {
      en: [
        ["Range", "0.5 to 10 m"],
        ["Accuracy", "±5 mm"],
        ["Output", "4–20 mA, reed chain"],
        ["Float", "304 / 316L stainless steel"],
      ],
      zh: [
        ["量程", "0.5 至 10 m"],
        ["精度", "±5 mm"],
        ["输出", "4–20 mA,干簧管链"],
        ["浮球", "304 / 316L 不锈钢"],
      ],
    },
  },
  {
    slug: "radar-level",
    category: "level",
    model: "JF-1540",
    image: "/products/radar-level.jpg",
    name: { en: "Radar Level Meter", zh: "雷达液位计" },
    summary: {
      en: "26 GHz non-contact radar level meter for tanks with vapour, foam or dust.",
      zh: "26 GHz 非接触雷达液位计,适用于含蒸汽、泡沫或粉尘的储罐。",
    },
    highlights: {
      en: ["±3 mm accuracy", "Non-contact 26 GHz", "4–20 mA + HART"],
      zh: ["精度 ±3 mm", "26 GHz 非接触", "4–20 mA + HART"],
    },
    specs: {
      en: [
        ["Range", "0.3 to 30 m"],
        ["Accuracy", "±3 mm"],
        ["Antenna", "PP / 316L horn or lens"],
        ["Output", "4–20 mA + HART"],
      ],
      zh: [
        ["量程", "0.3 至 30 m"],
        ["精度", "±3 mm"],
        ["天线", "PP / 316L 喇叭 / 透镜"],
        ["输出", "4–20 mA + HART"],
      ],
    },
  },
  {
    slug: "glass-level",
    category: "level",
    model: "JF-841",
    image: "/products/glass-level.jpg",
    name: { en: "Glass Tube Level Gauge", zh: "玻璃管液位计" },
    summary: {
      en: "Direct-reading glass tube level gauge for low-pressure tanks and boilers.",
      zh: "直读式玻璃管液位计,适用于低压储罐与锅炉。",
    },
    highlights: {
      en: ["Direct visual reading", "Quartz glass tube", "Simple maintenance"],
      zh: ["直读式现场指示", "石英玻璃管", "维护简单"],
    },
    specs: {
      en: [
        ["Range", "0.3 to 3 m"],
        ["Reading", "Direct visual"],
        ["Tube", "Quartz / borosilicate glass"],
        ["Rating", "≤0.6 MPa, ≤150 °C"],
      ],
      zh: [
        ["量程", "0.3 至 3 m"],
        ["读数", "现场直读"],
        ["玻璃管", "石英 / 高硼硅"],
        ["压力等级", "≤0.6 MPa,≤150 °C"],
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
