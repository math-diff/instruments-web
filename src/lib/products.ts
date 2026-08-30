import type { Locale } from "@/lib/i18n-config";
import { table as frT } from "./product-translations/fr";
import { table as deT } from "./product-translations/de";
import { table as itT } from "./product-translations/it";
import { table as ruT } from "./product-translations/ru";
import { table as arT } from "./product-translations/ar";
import { table as hiT } from "./product-translations/hi";
import { table as skT } from "./product-translations/sk";
import { table as msT } from "./product-translations/ms";
import { table as svT } from "./product-translations/sv";
import { table as trT } from "./product-translations/tr";

export type Category = "pressure" | "temperature" | "level";

/** localized value: English required, other locales fall back via pick() */
export type L10n<T> = { en: T } & Partial<Record<Locale, T>>;

export function pick<T>(l10n: L10n<T>, locale: Locale): T {
  return l10n[locale] ?? l10n.en;
}

export type Product = {
  slug: string;
  category: Category;
  model: string;
  image: string;
  name: L10n<string>;
  summary: L10n<string>;
  description: L10n<string>;
  highlights: L10n<string[]>;
  specs: L10n<[string, string][]>;
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
      en: "Bourdon-tube mechanical gauge for local monitoring of gauge pressure on industrial piping, equipment and pressure vessels.",
      zh: "用于工业管道、设备及压力容器现场表压监测的波登管式机械压力表。",
    },
    description: {
      en: "This gauge uses a Bourdon-tube sensing element to convert process pressure into elastic displacement; a geared movement then drives the pointer to provide local indication without external power. The photographed sample has a 0–1.6 MPa range and accuracy class 1.6, and is suited to pumps, compressed-air systems, general process lines and pressure vessels operating under relatively stable pressure. Final selection should confirm the operating range, process-medium compatibility, temperature, connection orientation and ambient vibration; pressure pulsation or shock may require a restrictor, snubber or other protective accessory.",
      zh: "该仪表采用波登管弹性元件将介质压力转换为管端位移，再经齿轮传动机构驱动指针，实现无需外部供电的就地压力指示。实拍样品量程为 0–1.6 MPa、精度等级 1.6，适用于泵组、压缩空气系统、一般工艺管线及压力容器等压力相对稳定的工况。实际选型应综合确认工作量程、介质相容性、工作温度、接口方向和环境振动；存在压力脉动或冲击时，应配置节流、缓冲或其他防护附件。",
    },
    highlights: {
      en: ["Photo sample: 0–1.6 MPa", "Accuracy class 1.6", "Mechanical pointer display"],
      zh: ["实拍量程 0–1.6 MPa", "精度等级 1.6", "机械指针显示"],
    },
    specs: {
      en: [
        ["Photo range", "0–1.6 MPa"],
        ["Accuracy class", "1.6"],
        ["Display", "White dial with black mechanical pointer"],
        ["Case", "Black circular case"],
      ],
      zh: [
        ["实拍量程", "0–1.6 MPa"],
        ["精度等级", "1.6"],
        ["显示方式", "白色表盘、黑色机械指针"],
        ["表壳", "黑色圆形表壳"],
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
      en: "All-stainless pressure gauge for local measurement in corrosive, humid and cleanliness-sensitive process environments.",
      zh: "面向腐蚀性介质、高湿及清洁度要求较高工况的全不锈钢压力表。",
    },
    description: {
      en: "The gauge combines a mechanical pressure-sensing movement with a stainless-steel case and process assembly to improve resistance to humid and corrosive environments. The photographed sample has a 0–2.5 MPa range, accuracy class 1.6 and a lower flange assembly visibly marked 316L, making it suitable for local monitoring on chemical-service equipment, utility systems, vessels and process piping where a robust connection is required. The final specification must confirm wetted-material compatibility, flange standard and pressure rating, operating temperature and sealing arrangement; the visible 316L marking should not be treated as confirmation that every wetted component uses the same alloy.",
      zh: "该仪表采用机械式压力敏感元件，并配置不锈钢表壳及过程连接组件，以提升在潮湿和腐蚀性环境中的耐受能力。实拍样品量程为 0–2.5 MPa、精度等级 1.6，下部法兰组件可见 316L 标识，适用于化工设备、公用工程、容器和工艺管线的现场压力监测。最终选型需确认接液材质与介质的相容性、法兰标准及压力等级、工作温度和密封形式；图片中的 316L 标识不应视为全部接液部件均采用同一材料的依据。",
    },
    highlights: {
      en: ["Photo sample: 0–2.5 MPa", "Accuracy class 1.6", "316L-marked flange assembly"],
      zh: ["实拍量程 0–2.5 MPa", "精度等级 1.6", "法兰组件标注 316L"],
    },
    specs: {
      en: [
        ["Photo range", "0–2.5 MPa"],
        ["Accuracy class", "1.6"],
        ["Visible marking", "316L on lower connector"],
        ["Process connection", "Flange assembly shown in photo"],
      ],
      zh: [
        ["实拍量程", "0–2.5 MPa"],
        ["精度等级", "1.6"],
        ["可见标识", "下部连接件标注 316L"],
        ["过程连接", "实拍为法兰组件"],
      ],
    },
  },
  {
    slug: "capsule-pressure-gauge",
    category: "pressure",
    model: "JF-1543",
    image: "/products/capsule-pressure-gauge-repaired.png",
    name: { en: "Capsule Pressure Gauge", zh: "不锈钢膜盒压力表" },
    summary: {
      en: "Capsule-element pressure gauge for local indication of low and very low gas pressures in ventilation, dust-collection and process applications.",
      zh: "用于微压与低压气体现场指示的膜盒式压力表，适用于通风、除尘及低压工艺管线。",
    },
    description: {
      en: "The instrument uses an elastic capsule element to sense small pressure variations. A mechanical movement converts capsule displacement into local pointer indication on a large-diameter Pa-scale dial. The photographed sample has a 0–10,000 Pa range, accuracy class 2.5 and a side-entry threaded process connection, making it suitable for micro-pressure monitoring in HVAC and ventilation systems, dust collection, furnace draft and other low-pressure gas lines. Final selection should confirm process-medium compatibility, operating temperature, mounting orientation and connection specification; pulsating pressure, mechanical vibration or special media may require appropriate damping, isolation or protective accessories.",
      zh: "该仪表采用膜盒式弹性元件感受微小压力变化，经机械传动机构驱动指针，在大直径 Pa 刻度表盘上实现就地指示。实拍样品量程为 0–10000 Pa、精度等级 2.5，并采用侧向螺纹过程连接，适用于通风空调、除尘系统、炉膛风压及低压气体管线等需要监测微压变化的场合。实际选型应根据介质兼容性、工作温度、安装方向和接口规格进行确认；存在压力脉动、机械振动或特殊介质时，应配置相应的缓冲、隔离或防护措施。",
    },
    highlights: {
      en: ["Photo sample: 0–10,000 Pa", "Accuracy class 2.5", "Side threaded connection"],
      zh: ["实拍量程 0–10000 Pa", "精度等级 2.5", "侧向螺纹接口"],
    },
    specs: {
      en: [
        ["Photo range", "0–10,000 Pa"],
        ["Accuracy class", "2.5"],
        ["Instrument marking", "Stainless steel capsule pressure gauge"],
        ["Process connection", "Side threaded connection"],
      ],
      zh: [
        ["实拍量程", "0–10000 Pa"],
        ["精度等级", "2.5"],
        ["表盘标识", "不锈钢膜盒压力表"],
        ["过程连接", "侧向螺纹接口"],
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
      en: "Mechanical pressure gauge for ammonia refrigeration and related gas systems, with MPa / psi dual-scale local indication.",
      zh: "用于氨制冷及相关气体系统、采用 MPa / psi 双刻度现场指示的机械压力表。",
    },
    description: {
      en: "This gauge uses an elastic pressure element and mechanical movement to provide direct local indication without external power. The photographed sample has a 0–4 MPa / 0–580 psi dual scale, accuracy class 1.6, a stainless circular case and a bottom process connection, supporting pressure monitoring on refrigeration compressors, condensers, receivers and ammonia piping. Ammonia service imposes specific compatibility requirements on wetted materials and seals, so the final order must confirm the specified refrigerant, pressure range, operating temperature, connection size and vibration conditions.",
      zh: "该仪表通过弹性压力元件和机械传动机构直接指示系统压力，无需外部供电。实拍样品采用 0–4 MPa / 0–580 psi 双刻度、精度等级 1.6、不锈钢圆形表壳及下部过程接口，可用于制冷压缩机、冷凝器、储液设备和氨管线的现场压力监测。氨介质对接液材质和密封件的相容性有专门要求，订货时应明确制冷剂类型、压力范围、工作温度、接口规格及现场振动条件。",
    },
    highlights: {
      en: ["Photo sample: 0–4 MPa", "Dual scale: 0–580 psi", "Accuracy class 1.6"],
      zh: ["实拍量程 0–4 MPa", "双刻度 0–580 psi", "精度等级 1.6"],
    },
    specs: {
      en: [
        ["Photo range", "0–4 MPa / 0–580 psi"],
        ["Accuracy class", "1.6"],
        ["Display", "MPa / psi dual-scale pointer dial"],
        ["Process connection", "Bottom connection assembly shown in photo"],
      ],
      zh: [
        ["实拍量程", "0–4 MPa / 0–580 psi"],
        ["精度等级", "1.6"],
        ["显示方式", "MPa / psi 双刻度指针表盘"],
        ["过程连接", "实拍为下部连接组件"],
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
    description: {
      en: "The product photo shows a large dial, long stainless sensing stem and threaded process connection arranged for clear local temperature indication. The bimetal sensing mechanism works without external power and is well suited to tanks, pipelines and equipment where operators need a simple, durable on-site reading.",
      zh: "实拍产品由大表盘、不锈钢长探杆和螺纹过程接口组成，结构直观，便于在设备附近读取温度。双金属感温机构无需外部供电，适合储罐、管道和机组等需要稳定现场指示的测温点。",
    },
    highlights: {
      en: ["Photo sample: 0–500 °C", "Local pointer display", "Probe with threaded mounting"],
      zh: ["实拍量程 0–500 °C", "现场指针显示", "探杆配螺纹安装"],
    },
    specs: {
      en: [
        ["Photo range", "0–500 °C"],
        ["Display", "Circular analogue pointer dial"],
        ["Probe", "Straight metal insertion stem"],
        ["Visible structure", "Threaded connection with auxiliary terminal head"],
      ],
      zh: [
        ["实拍量程", "0–500 °C"],
        ["显示方式", "圆形机械指针表盘"],
        ["探杆", "直形金属插入探杆"],
        ["可见结构", "螺纹连接并带辅助接线盒"],
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
      en: "Surface-contact RTD with a compact probe, metal-braided lead and three terminal wires.",
      zh: "端面接触式热电阻，实拍采用紧凑探头、金属编织引线和三线端子。",
    },
    description: {
      en: "The photographed surface RTD uses a compact metal probe, flexible metal-braided lead and three terminal wires, making it easy to route in confined equipment spaces. It is intended for contact measurement on bearing housings, machinery and pipe surfaces; the exact element, temperature range and lead length should be confirmed from the product label or order specification.",
      zh: "实拍端面热电阻采用紧凑型金属探头、柔性金属编织引线和三线端子，便于在狭小设备空间内布线安装。产品用于轴承座、机械部件和管壁等表面的接触测温，具体感温元件、温度范围和引线长度应以产品标签或订货规格为准。",
    },
    highlights: {
      en: ["Three visible terminal wires", "Metal-braided flexible lead", "Spring-loaded threaded probe"],
      zh: ["实拍三线端子", "金属编织柔性引线", "弹簧压紧螺纹探头"],
    },
    specs: {
      en: [
        ["Visible wiring", "Three terminal wires"],
        ["Lead protection", "Flexible metal-braided sheath"],
        ["Probe", "Cylindrical metal probe"],
        ["Mounting", "Threaded, spring-loaded compression structure"],
      ],
      zh: [
        ["可见接线", "三线端子"],
        ["引线防护", "柔性金属编织护套"],
        ["探头", "圆柱形金属探头"],
        ["安装结构", "螺纹连接、弹簧压紧"],
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
    description: {
      en: "The photographed assembly integrates a field junction head, straight stainless protective tube and threaded process connection in one serviceable package. It can be inserted directly into pipelines or vessels for continuous temperature measurement, with element, insertion length, wiring and sheath material selected to match the installation.",
      zh: "实拍产品将现场接线盒、不锈钢直形保护管和螺纹过程接口集成为一体，结构完整且便于安装维护。可直接插入管道或容器进行连续测温，并可按测点要求选择感温元件、插入深度、接线方式和保护管材质。",
    },
    highlights: {
      en: ["Field junction head", "Threaded process connection", "Straight protective sheath"],
      zh: ["现场接线盒", "螺纹过程接口", "直形保护套管"],
    },
    specs: {
      en: [
        ["Head", "Grey field junction head with blue cover"],
        ["Process connection", "External threaded fitting"],
        ["Probe", "Straight metal protective sheath"],
        ["Cable entry", "Single lower cable gland"],
      ],
      zh: [
        ["接线盒", "灰色现场表头、蓝色上盖"],
        ["过程连接", "外螺纹连接件"],
        ["探杆", "直形金属保护套管"],
        ["进线口", "下部单进线口"],
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
    description: {
      en: "The photographed version pairs a heavy-duty metal junction head with a flange-mounted probe for secure installation on process equipment. Its flameproof enclosure protects the electrical termination in hazardous areas, while the stainless sensing assembly supports stable temperature measurement in chemical, petrochemical and other industrial plants.",
      zh: "实拍样品采用重型金属防爆接线盒和法兰式探杆结构，可牢固安装在过程设备上。隔爆外壳为危险区域内的接线端提供防护，不锈钢测温组件适用于化工、石化等工业装置的连续温度测量。",
    },
    highlights: {
      en: ["Four-bolt flange mounting", "Heavy-duty metal junction head", "Long straight probe"],
      zh: ["四孔法兰安装", "重型金属接线盒", "长直形探杆"],
    },
    specs: {
      en: [
        ["Process connection", "Four-bolt flange shown in photo"],
        ["Head", "Metal enclosure with single cable entry"],
        ["Probe", "Long straight probe with blue protective sleeve"],
        ["Numerical rating", "Not legible in the current photo"],
      ],
      zh: [
        ["过程连接", "实拍为四孔法兰"],
        ["接线盒", "金属外壳、单进线口"],
        ["探杆", "长直形探杆，带蓝色保护套"],
        ["数值参数", "当前图片无法辨识"],
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
    description: {
      en: "The compact photographed unit combines a probe, explosion-proof head and local display window, reducing the number of separate field components. The built-in transmitter converts the RTD signal to a standard 4–20 mA output for direct connection to a PLC or DCS while retaining convenient on-site indication.",
      zh: "实拍产品将测温探杆、防爆表头和现场显示窗口集成在同一结构中，可减少现场分立部件和接线工作。内置变送模块把热电阻信号转换为标准 4–20 mA 输出，既便于接入 PLC 或 DCS，也方便就地查看温度。",
    },
    highlights: {
      en: ["Integrated local LCD", "Blue circular field head", "Threaded insertion probe"],
      zh: ["一体化现场 LCD", "蓝色圆形表头", "螺纹插入式探杆"],
    },
    specs: {
      en: [
        ["Display", "Local LCD window"],
        ["Head", "Integrated blue circular enclosure"],
        ["Process connection", "Threaded compression fitting"],
        ["Probe", "Straight metal insertion probe"],
      ],
      zh: [
        ["显示", "现场 LCD 窗口"],
        ["表头", "蓝色圆形一体化外壳"],
        ["过程连接", "螺纹压紧连接件"],
        ["探杆", "直形金属插入探杆"],
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
    description: {
      en: "The photographed sensor uses an extended metal probe and reinforced measuring end to place the sensing element deep into abrasive process flows. Its wear-resistant construction is designed for coal milling, powder transport and other dust-laden, high-velocity duties where an ordinary sheath would experience rapid erosion.",
      zh: "实拍产品采用加长金属探杆和强化测温端，可将感温元件深入含颗粒的工艺介质中。耐磨结构面向磨煤、粉料输送和高速含尘气流等冲刷明显的工况，可降低普通保护管快速磨损带来的维护频率。",
    },
    highlights: {
      en: ["Extended straight probe", "Metal junction head", "Visible mounting stop plate"],
      zh: ["加长直形探杆", "金属接线盒", "可见安装挡板"],
    },
    specs: {
      en: [
        ["Head", "Angled metal junction head"],
        ["Probe", "Long straight metal probe"],
        ["Mounting", "Stop plate visible near probe root"],
        ["Numerical rating", "Not legible in the current photo"],
      ],
      zh: [
        ["接线盒", "斜置金属接线盒"],
        ["探杆", "长直形金属探杆"],
        ["安装结构", "探杆根部可见挡板"],
        ["数值参数", "当前图片无法辨识"],
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
    description: {
      en: "The photographed thermocouple combines a metal flameproof junction head, threaded process connection and long protective sheath in a robust field assembly. It is intended for higher-temperature measurement in hazardous process areas, with calibration type, insertion length and thermowell connection selected for the equipment and medium.",
      zh: "实拍热电偶由金属隔爆接线盒、螺纹过程接口和长保护套管组成，现场结构坚固。适用于危险工艺区域的中高温测量，可根据设备和介质选择分度号、插入深度以及保护套管连接形式。",
    },
    highlights: {
      en: ["Metal field junction head", "Threaded process connection", "Straight protective sheath"],
      zh: ["金属现场接线盒", "螺纹过程接口", "直形保护套管"],
    },
    specs: {
      en: [
        ["Head", "Grey metal enclosure with single cable entry"],
        ["Process connection", "External threaded fitting"],
        ["Probe", "Straight metal protective sheath"],
        ["Numerical rating", "Not legible in the current photo"],
      ],
      zh: [
        ["接线盒", "灰色金属外壳、单进线口"],
        ["过程连接", "外螺纹连接件"],
        ["探杆", "直形金属保护套管"],
        ["数值参数", "当前图片无法辨识"],
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
    description: {
      en: "The product family photo shows multiple probe, connector and lead-wire configurations for the varied temperature points found across a power plant. Reinforced sheaths and application-specific mounting options support measurement at boilers, steam lines, mills and turbine auxiliaries, with the final structure matched to pressure, velocity and maintenance access.",
      zh: "实拍系列展示了多种探杆、连接件和引线结构，可覆盖电站内差异较大的测温点。强化保护套管与针对性的安装形式适用于锅炉、蒸汽管道、磨煤系统及汽机辅机，最终结构可按压力、流速和检修空间进行选型。",
    },
    highlights: {
      en: ["Multiple photographed configurations", "Rigid probes and flexible leads", "Threaded process fittings"],
      zh: ["实拍多种结构", "刚性探杆与柔性引线", "螺纹过程连接件"],
    },
    specs: {
      en: [
        ["Product forms", "Rigid insertion probes and flexible lead sensors"],
        ["Process connection", "Threaded fittings shown in photo"],
        ["Termination", "Junction heads or terminal lugs"],
        ["Numerical rating", "Not legible in the current photo"],
      ],
      zh: [
        ["产品形式", "刚性插入探杆与柔性引线传感器"],
        ["过程连接", "实拍可见螺纹连接件"],
        ["接线形式", "接线盒或端子引出"],
        ["数值参数", "当前图片无法辨识"],
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
    description: {
      en: "The photographed series presents several insertion lengths and connection arrangements, reflecting the wide range of vessels, reactors and pipelines used in petrochemical plants. Thermocouple or RTD elements can be paired with suitable thermowells and process connections to balance response time, corrosion resistance and mechanical strength at each measuring point.",
      zh: "实拍系列包含不同插入长度和连接结构，适配石化装置中多样化的管道、容器与反应设备。可根据测点温度、介质腐蚀性和机械载荷选择热电偶或热电阻元件，并配置相应的保护套管和过程接口。",
    },
    highlights: {
      en: ["Five photographed assemblies", "Multiple insertion lengths", "Metal junction heads"],
      zh: ["实拍五种组件", "多种插入长度", "金属接线盒"],
    },
    specs: {
      en: [
        ["Photo set", "Five probe assemblies"],
        ["Head", "Metal angled junction heads"],
        ["Process connection", "Threaded fittings shown in photo"],
        ["Probe", "Straight metal probes in different lengths"],
      ],
      zh: [
        ["实拍系列", "五支探杆组件"],
        ["接线盒", "斜置金属接线盒"],
        ["过程连接", "实拍可见螺纹连接件"],
        ["探杆", "不同长度的直形金属探杆"],
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
    description: {
      en: "The photographed gauge uses a long, high-contrast indicator scale mounted beside the bypass chamber, allowing operators to confirm tank level without opening the vessel. The fully mechanical local display remains readable without power, while optional switches or a 4–20 mA transmitter can add remote alarm and monitoring functions.",
      zh: "实拍产品在旁路测量筒外侧配置长条形高对比度标尺，操作人员无需开启容器即可确认液位。现场翻板指示无需供电即可读数，并可选配报警开关或 4–20 mA 远传模块，实现就地与远程监测结合。",
    },
    highlights: {
      en: ["Photo scale: 0–60", "Direct local indication", "Visible handwheel valve"],
      zh: ["实拍标尺 0–60", "现场直读指示", "可见手轮阀组件"],
    },
    specs: {
      en: [
        ["Photo scale", "0–60; unit is not legible in the photo"],
        ["Indicator", "Long dual-sided local scale"],
        ["Chamber", "Metal bypass measuring chamber"],
        ["Visible accessories", "Handwheel valve and process nozzles"],
      ],
      zh: [
        ["实拍标尺", "0–60，图片中单位无法辨识"],
        ["指示器", "长条形双侧现场标尺"],
        ["测量筒", "金属旁路测量筒"],
        ["可见附件", "手轮阀和过程接管"],
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
    description: {
      en: "The photographed anti-corrosion assembly features a protected measuring chamber, local indicator, auxiliary switch modules and an isolation valve in a compact side-mounted layout. PTFE- or PP-lined wetted construction separates corrosive media from the metal body, making the gauge suitable for acid, alkali and chemical-storage applications.",
      zh: "实拍防腐型产品将防护测量筒、现场指示器、辅助开关模块和隔离阀组合在紧凑的侧装结构中。PTFE 或 PP 衬里可使腐蚀介质与金属本体隔离，适用于酸、碱及化学品储罐的液位指示与报警。",
    },
    highlights: {
      en: ["Black protected chamber", "Two auxiliary switch modules", "Red isolation handwheel"],
      zh: ["黑色防护测量筒", "两个辅助开关模块", "红色隔离手轮"],
    },
    specs: {
      en: [
        ["Chamber", "Black protected cylindrical chamber"],
        ["Indicator", "Local indicator mounted at one end"],
        ["Auxiliary devices", "Two switch modules shown in photo"],
        ["Valve", "Red isolation handwheel assembly"],
      ],
      zh: [
        ["测量筒", "黑色防护圆筒结构"],
        ["指示器", "端部安装现场指示器"],
        ["辅助装置", "实拍带两个开关模块"],
        ["阀门", "红色隔离手轮组件"],
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
    description: {
      en: "The photographed transmitter combines a straight guide stem, stainless floats and a sealed terminal head for top insertion into a tank. As the liquid level changes, the float follows the surface and drives the internal reed-chain signal, providing a simple continuous 4–20 mA output for water tanks, sumps and process vessels.",
      zh: "实拍产品由直形导杆、不锈钢浮球和密封接线表头组成，可从储罐顶部插入安装。液位变化时浮球沿导杆移动并驱动内部干簧管链，输出连续的 4–20 mA 信号，适用于水箱、集水池和一般过程容器。",
    },
    highlights: {
      en: ["Two stainless floats", "Straight guide stem", "Sealed terminal head"],
      zh: ["两个不锈钢浮球", "直形导杆", "密封接线表头"],
    },
    specs: {
      en: [
        ["Float arrangement", "Two spherical metal floats"],
        ["Guide stem", "Straight segmented metal stem"],
        ["Head", "Sealed field terminal enclosure"],
        ["Mounting", "Top-insertion structure shown in photo"],
      ],
      zh: [
        ["浮球结构", "两个球形金属浮球"],
        ["导杆", "直形分段金属导杆"],
        ["表头", "密封现场接线外壳"],
        ["安装形式", "实拍为顶部插入结构"],
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
    description: {
      en: "The photographed radar meter integrates a sealed electronic housing, flange connection and large non-metallic antenna for direct mounting on the tank roof. Its non-contact measurement avoids moving parts and direct immersion, supporting continuous level monitoring where vapour, foam, dust or changing process conditions make contact instruments difficult to maintain.",
      zh: "实拍雷达液位计由密封电子表头、法兰接口和大尺寸非金属天线组成，可直接安装在储罐顶部。非接触测量无需运动部件，也不与介质直接接触，适合蒸汽、泡沫、粉尘或工况变化较明显的连续液位监测场景。",
    },
    highlights: {
      en: ["Flange-mounted assembly", "Large non-metallic antenna", "Sealed yellow / black housing"],
      zh: ["法兰安装组件", "大尺寸非金属天线", "黄黑色密封表头"],
    },
    specs: {
      en: [
        ["Housing", "Yellow electronics body with black cover"],
        ["Process connection", "Metal flange shown in photo"],
        ["Antenna", "Large white non-metallic antenna"],
        ["Cable entries", "Two visible connection ports"],
      ],
      zh: [
        ["表头", "黄色电子仓、黑色上盖"],
        ["过程连接", "实拍为金属法兰"],
        ["天线", "大尺寸白色非金属天线"],
        ["接口", "可见两个接线端口"],
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
    description: {
      en: "The product photo shows both glass-tube and protected glass-plate arrangements, each providing a direct visual indication of the liquid column. The simple mechanical design is easy to inspect and maintain on low-pressure tanks and utility equipment, with isolation valves allowing the gauge to be shut off for servicing.",
      zh: "实拍图展示了玻璃管式和带防护框架的玻璃板式结构，均可通过液柱位置直接观察容器内液位。机械结构简单，便于在低压储罐和公用工程设备上巡检维护，并可通过上下隔离阀在检修时切断介质。",
    },
    highlights: {
      en: ["Tube and plate examples", "Direct visual reading", "Flanged isolation valves"],
      zh: ["实拍管式与板式结构", "现场直读", "法兰隔离阀组件"],
    },
    specs: {
      en: [
        ["Photo examples", "Glass-tube and protected glass-plate structures"],
        ["Reading", "Direct observation of the liquid column"],
        ["Connections", "Upper and lower flanged process connections"],
        ["Valves", "Isolation handwheels / levers shown in photo"],
      ],
      zh: [
        ["实拍样式", "玻璃管式与带防护框架的玻璃板式"],
        ["读数方式", "直接观察液柱位置"],
        ["过程连接", "上下法兰连接"],
        ["阀门", "实拍可见隔离手轮 / 操作杆"],
      ],
    },
  },
];

/**
 * Per-locale product content overrides (name / summary / description /
 * highlights / specs). Applied once at module load; fields without a
 * translation fall back to English via pick().
 */
export type ProductOverride = Partial<{
  name: string;
  summary: string;
  description: string;
  highlights: string[];
  specs: [string, string][];
}>;

const translationTables: Partial<Record<Locale, Record<string, ProductOverride>>> = {
  fr: frT,
  de: deT,
  it: itT,
  ru: ruT,
  ar: arT,
  hi: hiT,
  sk: skT,
  ms: msT,
  sv: svT,
  tr: trT,
};

for (const [localeKey, table] of Object.entries(translationTables)) {
  const loc = localeKey as Locale;
  for (const product of products) {
    const t = table[product.slug];
    if (!t) continue;
    if (t.name) product.name[loc] = t.name;
    if (t.summary) product.summary[loc] = t.summary;
    if (t.description) product.description[loc] = t.description;
    if (t.highlights) product.highlights[loc] = t.highlights;
    if (t.specs) product.specs[loc] = t.specs;
  }
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(category: Category) {
  return products.filter((p) => p.category === category);
}
