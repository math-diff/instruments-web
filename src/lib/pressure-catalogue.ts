import { locales, type Locale } from "./i18n-config";

// Observations recorded for the pictured samples, not a range of orderable options.
// Keep numbers here; translations may change labels, never the technical values.
export const pressureSamples = {
  "pressure-gauge": { range: "0–1.6 MPa", accuracy: "1.6", details: ["display", "pointer", "case", "blackCase"] },
  "stainless-pressure-gauge": { range: "0–2.5 MPa", accuracy: "1.6", details: ["marking", "connector316L", "connection", "flange"] },
  "capsule-pressure-gauge": { range: "0–10000 Pa", accuracy: "2.5", details: ["marking", "capsule", "connection", "sideThread"] },
  "ammonia-pressure-gauge": { range: "0–4 MPa / 0–580 psi", accuracy: "1.6", details: ["display", "dualScale", "connection", "bottom"] },
} as const;

export type PressureSlug = keyof typeof pressureSamples;
type Copy = {
  range: string; accuracy: string; display: string; case: string; marking: string; connection: string;
  pointer: string; blackCase: string; connector316L: string; flange: string; capsule: string;
  sideThread: string; dualScale: string; bottom: string;
  sample: string; confirm: string;
  summaries: Record<PressureSlug, string>;
};

const copy: Record<Locale, Copy> = {
  en: {
    range: "Photo range", accuracy: "Accuracy class", display: "Display", case: "Case", marking: "Visible marking", connection: "Process connection",
    pointer: "White dial with black mechanical pointer", blackCase: "Black circular case", connector316L: "316L on lower connector", flange: "Flange assembly shown in photo", capsule: "Stainless steel capsule pressure gauge", sideThread: "Side threaded connection", dualScale: "MPa / psi dual-scale pointer dial", bottom: "Bottom connection assembly shown in photo",
    sample: "These values describe the photographed catalogue sample.", confirm: "Confirm the ordered range, accuracy standard, wetted materials, seals, connection dimensions, temperature and overload limits before ordering.",
    summaries: {
      "pressure-gauge": "Bourdon-tube mechanical gauge for local pressure indication on industrial equipment and piping.",
      "stainless-pressure-gauge": "Pressure gauge with a stainless case and the flange assembly shown in the photograph; wetted materials require confirmation.",
      "capsule-pressure-gauge": "Capsule-element gauge for local indication of low gas pressures; confirm gas compatibility and overload limits.",
      "ammonia-pressure-gauge": "Mechanical gauge for ammonia-system enquiries, with MPa / psi scales; confirm refrigerant and wetted-material compatibility.",
    },
  },
  zh: {
    range: "实拍量程", accuracy: "精度等级", display: "显示方式", case: "表壳", marking: "可见标识", connection: "过程连接",
    pointer: "白色表盘、黑色机械指针", blackCase: "黑色圆形表壳", connector316L: "下部连接件标注 316L", flange: "实拍为法兰组件", capsule: "不锈钢膜盒压力表", sideThread: "侧向螺纹接口", dualScale: "MPa / psi 双刻度指针表盘", bottom: "实拍为下部连接组件",
    sample: "这些数值描述的是产品目录中的实拍样品。", confirm: "订货前需确认量程、精度适用标准、接液材质、密封、接口尺寸、工作温度及过载限制。",
    summaries: {
      "pressure-gauge": "用于工业设备和管道现场压力指示的波登管式机械压力表。",
      "stainless-pressure-gauge": "采用不锈钢表壳，实拍配有法兰组件的压力表；接液材质需另行确认。",
      "capsule-pressure-gauge": "用于低压气体现场指示的膜盒压力表；需确认气体相容性与过载限制。",
      "ammonia-pressure-gauge": "用于氨系统选型询价、具有 MPa / psi 双刻度的机械压力表；需确认制冷剂及接液材质相容性。",
    },
  },
  fr: {
    range: "Plage photographiée", accuracy: "Classe de précision", display: "Affichage", case: "Boîtier", marking: "Marquage visible", connection: "Raccordement au procédé",
    pointer: "Cadran blanc à aiguille mécanique noire", blackCase: "Boîtier circulaire noir", connector316L: "316L sur le raccord inférieur", flange: "Ensemble à bride visible sur la photo", capsule: "Manomètre à capsule en acier inoxydable", sideThread: "Raccord fileté latéral", dualScale: "Cadran à aiguille, double échelle MPa / psi", bottom: "Raccord inférieur visible sur la photo",
    sample: "Ces valeurs décrivent l'échantillon photographié du catalogue.", confirm: "Confirmer avant commande la plage, la norme de précision, les matériaux mouillés, les joints, les dimensions du raccord et les limites de température et de surcharge.",
    summaries: {
      "pressure-gauge": "Manomètre mécanique à tube de Bourdon pour l'indication locale sur équipements et conduites industriels.",
      "stainless-pressure-gauge": "Manomètre à boîtier inox avec l'ensemble à bride photographié ; les matériaux mouillés sont à confirmer.",
      "capsule-pressure-gauge": "Manomètre à capsule pour les faibles pressions de gaz ; compatibilité et surcharge à confirmer.",
      "ammonia-pressure-gauge": "Manomètre mécanique à double échelle MPa / psi pour les demandes liées à l'ammoniac ; compatibilité du fluide et des matériaux à confirmer.",
    },
  },
  de: {
    range: "Fotografierter Messbereich", accuracy: "Genauigkeitsklasse", display: "Anzeige", case: "Gehäuse", marking: "Sichtbare Kennzeichnung", connection: "Prozessanschluss",
    pointer: "Weißes Zifferblatt mit schwarzem mechanischem Zeiger", blackCase: "Schwarzes Rundgehäuse", connector316L: "316L am unteren Anschluss", flange: "Flanschbaugruppe auf dem Foto", capsule: "Kapselfedermanometer aus Edelstahl", sideThread: "Seitlicher Gewindeanschluss", dualScale: "Zeigeranzeige mit MPa / psi-Doppelskala", bottom: "Unterer Anschluss auf dem Foto",
    sample: "Diese Werte beschreiben das fotografierte Katalogmuster.", confirm: "Messbereich, Genauigkeitsnorm, medienberührte Werkstoffe, Dichtungen, Anschlussmaße sowie Temperatur- und Überlastgrenzen vor Bestellung bestätigen.",
    summaries: {
      "pressure-gauge": "Mechanisches Rohrfedermanometer zur örtlichen Druckanzeige an Industrieanlagen und Rohrleitungen.",
      "stainless-pressure-gauge": "Manometer mit Edelstahlgehäuse und fotografierter Flanschbaugruppe; medienberührte Werkstoffe sind zu bestätigen.",
      "capsule-pressure-gauge": "Kapselfedermanometer für niedrige Gasdrücke; Medienverträglichkeit und Überlastgrenzen bestätigen.",
      "ammonia-pressure-gauge": "Mechanisches Manometer mit MPa / psi-Skala für Ammoniak-Anfragen; Kältemittel- und Werkstoffverträglichkeit bestätigen.",
    },
  },
  it: {
    range: "Campo fotografato", accuracy: "Classe di precisione", display: "Indicazione", case: "Cassa", marking: "Marcatura visibile", connection: "Attacco al processo",
    pointer: "Quadrante bianco con lancetta meccanica nera", blackCase: "Cassa circolare nera", connector316L: "316L sul raccordo inferiore", flange: "Gruppo flangiato nella fotografia", capsule: "Manometro a capsula in acciaio inox", sideThread: "Attacco filettato laterale", dualScale: "Quadrante a lancetta con doppia scala MPa / psi", bottom: "Attacco inferiore nella fotografia",
    sample: "Questi valori descrivono il campione fotografato nel catalogo.", confirm: "Confermare prima dell'ordine campo, norma di precisione, materiali a contatto, guarnizioni, dimensioni dell'attacco e limiti di temperatura e sovraccarico.",
    summaries: {
      "pressure-gauge": "Manometro meccanico a tubo Bourdon per l'indicazione locale su impianti e tubazioni industriali.",
      "stainless-pressure-gauge": "Manometro con cassa inox e gruppo flangiato fotografato; materiali a contatto da confermare.",
      "capsule-pressure-gauge": "Manometro a capsula per basse pressioni di gas; compatibilità e limiti di sovraccarico da confermare.",
      "ammonia-pressure-gauge": "Manometro meccanico a doppia scala MPa / psi per richieste relative all'ammoniaca; compatibilità del refrigerante e dei materiali da confermare.",
    },
  },
  ru: {
    range: "Диапазон на фотографии", accuracy: "Класс точности", display: "Индикация", case: "Корпус", marking: "Видимая маркировка", connection: "Присоединение к процессу",
    pointer: "Белый циферблат с чёрной механической стрелкой", blackCase: "Чёрный круглый корпус", connector316L: "316L на нижнем соединителе", flange: "Фланцевый узел на фотографии", capsule: "Капсульный манометр из нержавеющей стали", sideThread: "Боковое резьбовое присоединение", dualScale: "Стрелочный циферблат с двойной шкалой MPa / psi", bottom: "Нижний соединительный узел на фотографии",
    sample: "Эти значения описывают сфотографированный образец каталога.", confirm: "До заказа подтвердите диапазон, стандарт точности, контактирующие со средой материалы, уплотнения, размеры соединения, пределы температуры и перегрузки.",
    summaries: {
      "pressure-gauge": "Механический манометр с трубкой Бурдона для местной индикации давления на промышленном оборудовании и трубопроводах.",
      "stainless-pressure-gauge": "Манометр с нержавеющим корпусом и фланцевым узлом на фото; материалы, контактирующие со средой, требуют подтверждения.",
      "capsule-pressure-gauge": "Капсульный манометр для низких давлений газа; совместимость и перегрузку необходимо подтвердить.",
      "ammonia-pressure-gauge": "Механический манометр со шкалами MPa / psi для запросов по аммиачным системам; подтвердите совместимость хладагента и материалов.",
    },
  },
  ar: {
    range: "النطاق في الصورة", accuracy: "فئة الدقة", display: "العرض", case: "الغلاف", marking: "العلامة الظاهرة", connection: "وصلة العملية",
    pointer: "قرص أبيض بمؤشر ميكانيكي أسود", blackCase: "غلاف دائري أسود", connector316L: "علامة 316L على الوصلة السفلية", flange: "مجموعة شفة ظاهرة في الصورة", capsule: "مقياس ضغط كبسولي من الفولاذ المقاوم للصدأ", sideThread: "وصلة ملولبة جانبية", dualScale: "قرص بمؤشر وتدريج مزدوج MPa / psi", bottom: "مجموعة الوصلة السفلية الظاهرة في الصورة",
    sample: "تصف هذه القيم العينة المصورة في الكتالوج.", confirm: "يجب تأكيد النطاق ومعيار الدقة والمواد الملامسة للوسط والأختام وأبعاد الوصلة وحدود الحرارة والحمل الزائد قبل الطلب.",
    summaries: {
      "pressure-gauge": "مقياس ضغط ميكانيكي بأنبوب بوردون للقراءة المحلية على المعدات والأنابيب الصناعية.",
      "stainless-pressure-gauge": "مقياس ضغط بغلاف مقاوم للصدأ ومجموعة الشفة المصورة؛ يجب تأكيد المواد الملامسة للوسط.",
      "capsule-pressure-gauge": "مقياس كبسولي لضغوط الغاز المنخفضة؛ يجب تأكيد توافق الغاز وحدود الحمل الزائد.",
      "ammonia-pressure-gauge": "مقياس ميكانيكي بتدريج MPa / psi للاستفسارات عن أنظمة الأمونيا؛ يجب تأكيد توافق وسيط التبريد والمواد.",
    },
  },
  hi: {
    range: "फ़ोटो में माप सीमा", accuracy: "सटीकता वर्ग", display: "प्रदर्शन", case: "आवरण", marking: "दिखाई देने वाला चिह्न", connection: "प्रक्रिया कनेक्शन",
    pointer: "काले यांत्रिक सूचक वाला सफेद डायल", blackCase: "काला गोल आवरण", connector316L: "निचले कनेक्टर पर 316L", flange: "फ़ोटो में दिखी फ्लैंज असेंबली", capsule: "स्टेनलेस स्टील कैप्सूल प्रेशर गेज", sideThread: "पार्श्व थ्रेडेड कनेक्शन", dualScale: "MPa / psi दोहरे पैमाने वाला सूचक डायल", bottom: "फ़ोटो में दिखी निचली कनेक्शन असेंबली",
    sample: "ये मान कैटलॉग में दिखाए गए फ़ोटो नमूने के हैं।", confirm: "ऑर्डर से पहले सीमा, सटीकता मानक, माध्यम के संपर्क में आने वाली सामग्री, सील, कनेक्शन आयाम तथा तापमान और ओवरलोड सीमाओं की पुष्टि करें।",
    summaries: {
      "pressure-gauge": "औद्योगिक उपकरणों और पाइपों पर स्थानीय दबाव संकेत के लिए बोरडॉन ट्यूब वाला यांत्रिक गेज।",
      "stainless-pressure-gauge": "स्टेनलेस आवरण और फ़ोटो में दिखी फ्लैंज असेंबली वाला गेज; माध्यम-संपर्क सामग्री की पुष्टि आवश्यक है।",
      "capsule-pressure-gauge": "कम गैस दबाव के स्थानीय संकेत के लिए कैप्सूल गेज; गैस अनुकूलता और ओवरलोड सीमाएँ पुष्टि करें।",
      "ammonia-pressure-gauge": "अमोनिया सिस्टम की पूछताछ के लिए MPa / psi पैमाने वाला यांत्रिक गेज; रेफ्रिजरेंट और सामग्री की अनुकूलता पुष्टि करें।",
    },
  },
  sk: {
    range: "Rozsah na fotografii", accuracy: "Trieda presnosti", display: "Zobrazenie", case: "Puzdro", marking: "Viditeľné označenie", connection: "Procesné pripojenie",
    pointer: "Biely ciferník s čiernou mechanickou ručičkou", blackCase: "Čierne kruhové puzdro", connector316L: "316L na spodnej prípojke", flange: "Prírubová zostava na fotografii", capsule: "Kapsulový tlakomer z nehrdzavejúcej ocele", sideThread: "Bočné závitové pripojenie", dualScale: "Ručičkový ciferník s dvojitou stupnicou MPa / psi", bottom: "Spodná prípojka na fotografii",
    sample: "Tieto hodnoty opisujú fotografovanú katalógovú vzorku.", confirm: "Pred objednaním potvrďte rozsah, normu presnosti, zmáčané materiály, tesnenia, rozmery pripojenia a teplotné a preťažovacie limity.",
    summaries: {
      "pressure-gauge": "Mechanický tlakomer s Bourdonovou trubicou na miestne meranie v priemyselných zariadeniach a potrubiach.",
      "stainless-pressure-gauge": "Tlakomer s nehrdzavejúcim puzdrom a fotografovanou prírubovou zostavou; zmáčané materiály treba potvrdiť.",
      "capsule-pressure-gauge": "Kapsulový tlakomer na nízke tlaky plynu; potvrďte kompatibilitu a limity preťaženia.",
      "ammonia-pressure-gauge": "Mechanický tlakomer so stupnicami MPa / psi pre dopyty k amoniakovým systémom; potvrďte kompatibilitu chladiva a materiálov.",
    },
  },
  ms: {
    range: "Julat dalam foto", accuracy: "Kelas ketepatan", display: "Paparan", case: "Perumah", marking: "Tanda yang kelihatan", connection: "Sambungan proses",
    pointer: "Dail putih dengan penunjuk mekanikal hitam", blackCase: "Perumah bulat hitam", connector316L: "316L pada penyambung bawah", flange: "Pemasangan bebibir dalam foto", capsule: "Tolok tekanan kapsul keluli tahan karat", sideThread: "Sambungan berulir sisi", dualScale: "Dail penunjuk dua skala MPa / psi", bottom: "Pemasangan sambungan bawah dalam foto",
    sample: "Nilai ini menerangkan sampel katalog yang difoto.", confirm: "Sahkan julat, piawaian ketepatan, bahan bersentuhan bendalir, pengedap, dimensi sambungan serta had suhu dan beban lampau sebelum pesanan.",
    summaries: {
      "pressure-gauge": "Tolok mekanikal tiub Bourdon untuk petunjuk tekanan setempat pada peralatan dan paip industri.",
      "stainless-pressure-gauge": "Tolok dengan perumah tahan karat dan pemasangan bebibir dalam foto; bahan bersentuhan bendalir perlu disahkan.",
      "capsule-pressure-gauge": "Tolok kapsul untuk tekanan gas rendah; sahkan keserasian gas dan had beban lampau.",
      "ammonia-pressure-gauge": "Tolok mekanikal skala MPa / psi untuk pertanyaan sistem ammonia; sahkan keserasian bahan pendingin dan bahan binaan.",
    },
  },
  sv: {
    range: "Fotograferat mätområde", accuracy: "Noggrannhetsklass", display: "Visning", case: "Hus", marking: "Synlig märkning", connection: "Processanslutning",
    pointer: "Vit urtavla med svart mekanisk visare", blackCase: "Svart runt hus", connector316L: "316L på den nedre anslutningen", flange: "Flänsenhet på fotografiet", capsule: "Kapselmanometer i rostfritt stål", sideThread: "Gängad sidoanslutning", dualScale: "Visartavla med dubbla skalor MPa / psi", bottom: "Nedre anslutningsenhet på fotografiet",
    sample: "Värdena beskriver det fotograferade katalogexemplaret.", confirm: "Bekräfta mätområde, noggrannhetsstandard, medieberörda material, tätningar, anslutningsmått samt temperatur- och överlastgränser före beställning.",
    summaries: {
      "pressure-gauge": "Mekanisk bourdonrörsmanometer för lokal tryckvisning på industriutrustning och rörledningar.",
      "stainless-pressure-gauge": "Manometer med rostfritt hus och fotograferad flänsenhet; medieberörda material måste bekräftas.",
      "capsule-pressure-gauge": "Kapselmanometer för låga gastryck; bekräfta gaskompatibilitet och överlastgränser.",
      "ammonia-pressure-gauge": "Mekanisk manometer med MPa / psi-skalor för ammoniakförfrågningar; bekräfta köldmediets och materialens kompatibilitet.",
    },
  },
  tr: {
    range: "Fotoğraftaki ölçüm aralığı", accuracy: "Doğruluk sınıfı", display: "Gösterge", case: "Gövde", marking: "Görünür işaret", connection: "Proses bağlantısı",
    pointer: "Siyah mekanik ibreli beyaz kadran", blackCase: "Siyah yuvarlak gövde", connector316L: "Alt bağlantıda 316L işareti", flange: "Fotoğraftaki flanş grubu", capsule: "Paslanmaz çelik kapsül manometre", sideThread: "Yandan dişli bağlantı", dualScale: "MPa / psi çift ölçekli ibreli kadran", bottom: "Fotoğraftaki alt bağlantı grubu",
    sample: "Bu değerler fotoğraflanan katalog numunesini tanımlar.", confirm: "Siparişten önce aralığı, doğruluk standardını, akışkanla temas eden malzemeleri, contaları, bağlantı ölçülerini, sıcaklık ve aşırı yük sınırlarını doğrulayın.",
    summaries: {
      "pressure-gauge": "Endüstriyel ekipman ve borularda yerel basınç göstergesi için Bourdon tüplü mekanik manometre.",
      "stainless-pressure-gauge": "Paslanmaz gövdeli ve fotoğraftaki flanş grubuna sahip manometre; akışkanla temas eden malzemeler doğrulanmalıdır.",
      "capsule-pressure-gauge": "Düşük gaz basınçları için kapsül manometre; gaz uyumluluğunu ve aşırı yük sınırlarını doğrulayın.",
      "ammonia-pressure-gauge": "Amonyak sistemi talepleri için MPa / psi ölçekli mekanik manometre; soğutucu ve malzeme uyumluluğunu doğrulayın.",
    },
  },
};

export function isPressureSample(slug: string): slug is PressureSlug {
  return Object.hasOwn(pressureSamples, slug);
}

export function pressureCatalogue(slug: PressureSlug, locale: Locale) {
  const fact = pressureSamples[slug];
  const text = copy[locale];
  const [label1, value1, label2, value2] = fact.details;
  const specs: [string, string][] = [
    [text.range, fact.range], [text.accuracy, fact.accuracy],
    [text[label1], text[value1]], [text[label2], text[value2]],
  ];
  return {
    summary: text.summaries[slug],
    description: `${text.summaries[slug]} ${text.sample} ${text.range}: ${fact.range}; ${text.accuracy}: ${fact.accuracy}. ${text.confirm}`,
    highlights: specs.slice(0, 3).map(([label, value]) => `${label}: ${value}`),
    specs,
  };
}

export const pressureLocales = locales;
