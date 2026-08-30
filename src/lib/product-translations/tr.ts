import type { Locale } from "@/lib/i18n-config";

export type ProductOverride = Partial<{
  name: string;
  summary: string;
  description: string;
  highlights: string[];
  specs: [string, string][];
}>;

/** Per-slug Turkish overrides. Missing slugs/fields fall back to English. */
export const table: Record<string, ProductOverride> = {
  "pressure-gauge": {
    name: "Basınç göstergesi",
    summary: "Endüstriyel tesisatlarda proses basıncının yerel gösterimi için Bourdon tüp manometre.",
    description: "Bourdon tüpü proses basıncını esnek yer değiştirmeye dönüştürür; dişli mekanizma ibleyi çalıştırarak enerji gerektirmeyen yerel gösterim sağlar. Pompa, basınçlı hava, proses hatları ve sabit basınçlı tanklar için uygundur. Aralık, ortam uyumu, sıcaklık, bağlantı yönü ve titreşimi teyit edin; darbeli basınçta kısıtlayıcı veya sönümleyici kullanın.",
    highlights: ["0–60 MPa aralıklar", "±%1,6 FS doğruluk", "Radyal / aksiyel montaj"],
    specs: [["Aralık", "0–0,1 ila 0–60 MPa"], ["Doğruluk", "±%1,6 FS"], ["Bağlantı", "M20×1,5, radyal veya aksiyel"], ["Gövde", "φ100 / φ150 mm"]],
  },
  "stainless-pressure-gauge": {
    name: "Paslanmaz çelik basınç göstergesi",
    summary: "Korozif ortamlar ve ağır koşullar için tam paslanmaz manometre.",
    description: "Korozif ortamlar için tam paslanmaz (304/316L) gövde, titreşime karşı opsiyonel gliserin dolgusu. Kimya, petrokimya ve dış saha kurulumlarına uygundur. Sipariş öncesi ortam uyumunu, aralığı ve bağlantıyı teyit edin.",
    highlights: ["316L ıslak parçalar", "Opsiyonel gliserin dolgu", "100 MPa'ya kadar"],
    specs: [["Aralık", "0–0,1 ila 0–100 MPa"], ["Doğruluk", "±%1,6 FS"], ["Islak parçalar", "Paslanmaz 304 / 316L"], ["Bağlantı", "M20×1,5 veya özel"]],
  },
  "capsule-pressure-gauge": {
    name: "Kapsül manometre",
    summary: "Gazların düşük ve mikro basınç ölçümü için kapsül elemanlı manometre.",
    description: "Kapsül eleman, kPa mertebesindeki gaz basınçlarının güvenilir ölçümünü sağlar. Paslanmaz gövde, panel veya duvar montajı. Brülörler, fanlar ve gaz tesisatları için uygundur; ortam uyumu ve aralığı kontrol edin.",
    highlights: ["kPa aralıkları", "316L kapsül", "Panel / duvar montajı"],
    specs: [["Aralık", "0–2,5 ila 0–60 kPa, ±kPa"], ["Doğruluk", "±%1,6 FS"], ["Islak parçalar", "316L kapsül"], ["Bağlantı", "M20×1,5"]],
  },
  "ammonia-pressure-gauge": {
    name: "Amonyak manometresi",
    summary: "Amonyak ve soğutma tesisatlarına özel, güvenlik tabanlı paslanmaz manometre.",
    description: "Amonyak ve soğutma devreleri için tasarlanmıştır: paslanmaz ıslak parçalar ve güvenlik tabanı. Aralık ve bağlantı tesisata göre belirlenir; yalnızca amonyakla uyumlu ortamlarda kullanın.",
    highlights: ["Amonyak / soğutma", "Güvenlik tabanı", "Paslanmaz ıslak parçalar"],
    specs: [["Aralık", "0–1 ila 0–40 MPa, bileşik + vakum"], ["Doğruluk", "±%1,6 FS"], ["Islak parçalar", "Paslanmaz çelik"], ["Bağlantı", "M20×1,5"]],
  },
  "bimetal-thermometer": {
    name: "Bimetal termometre",
    summary: "Enerji gerektirmeyen yerel sıcaklık göstergesi için bimetal kadranlı termometre.",
    description: "Bimetal eleman, sıcaklığı kadrandaki ible dönüşüne çevirir — enerji gerektirmez. Aksiyel, radyal veya evrensel montaj; sap ve boyut siparişe göre. Boru hatları, tanklar ve makineler için uygundur; aralık, sap boyunu ve ortamı teyit edin.",
    highlights: ["-80 ila 500 °C", "Aksiyel / radyal / evrensel", "Enerji gerektirmez"],
    specs: [["Aralık", "-80 ila 500 °C"], ["Doğruluk", "±%1,5 FS"], ["Kadran", "φ60 / φ100 / φ150 mm"], ["Sap", "Ø6 / Ø10 mm, boyut siparişe göre"]],
  },
  "surface-thermistor": {
    name: "Yüzey tipi RTD",
    summary: "Rulman ve boru duvarı sıcaklık ölçümü için yüzey tipi Pt 100 sensör.",
    description: "Rulman, kılıf ve boru duvarlarına doğrudan temas için ön yüzlü Pt 100 eleman. 316L paslanmaz temas yüzeyi, kompakt yapı; su geçirmez glandlu silikon kablo. Yüzey sıcaklığı ve kablo boyunu teyit edin.",
    highlights: ["Pt 100 eleman", "Düz temas yüzeyi", "Kompakt tasarım"],
    specs: [["Eleman", "Pt 100, Sınıf B"], ["Aralık", "-50 ila 200 °C"], ["Temas yüzeyi", "316L paslanmaz çelik"], ["Kablo", "Silikon, su geçirmez gland"]],
  },
  "assembly-thermistor": {
    name: "Montaj tipi RTD",
    summary: "Boru hatları ve tanklar için koruyucu kuyulu platin RTD montajı.",
    description: "Proses sıcaklık ölçümü için çıkarılabilir koruyucu kuyu (304/316/316L) içinde Pt 100/PT1000 sensör. 2/3/4 telli bağlantı; A veya B sınıf versiyonlar. Koruyucu kuyu çapını ve boyunu prosese göre seçin.",
    highlights: ["Pt 100 / PT1000", "A veya B sınıfı", "Koruyucu kuyu 304 / 316 / 316L"],
    specs: [["Eleman", "Pt 100 / PT1000, A veya B sınıfı"], ["Aralık", "-200 ila 500 °C"], ["Koruyucu kuyu", "304 / 316 / 316L"], ["Bağlantı", "2 / 3 / 4 telli"]],
  },
  "explosion-proof-thermistor": {
    name: "Alev almaz RTD",
    summary: "Tehlikeli bölgelerde sıcaklık ölçümü için alev almaz başlıklı Pt 100 sensör.",
    description: "Tehlikeli bölgelerde kullanım için Ex d alev almaz bağlantı başlığı. Pt 100 eleman, paslanmaz koruyucu kuyu; Ex d IIC T6 uyumlu. Sipariş öncesi bölge sınıflandırmasını ve daldırma derinliğini kontrol edin.",
    highlights: ["Ex d IIC T6", "Alev almaz kafa", "Pt 100 eleman"],
    specs: [["Eleman", "Pt 100, Sınıf B"], ["Aralık", "-200 ila 450 °C"], ["Patlamaya dayanım", "Ex d IIC T6"], ["Koruyucu kuyu", "Paslanmaz çelik"]],
  },
  "integrated-thermistor": {
    name: "Entegre Ex RTD verici",
    summary: "Tehlikeli bölgelerde doğrudan 4–20 mA çıkış veren kafa montajlı vericili Pt 100 sensör.",
    description: "Sensöre entegre kafa vericisi: kompanzasyon kablosu olmadan 4–20 mA iki telli çıkış. Ex d IIC T6 alev almaz kafa, opsiyonel LCD ekran. Uzak ölçüm noktaları için ideal; aralık ve daldırma derinliğini teyit edin.",
    highlights: ["Entegre 4–20 mA verici", "Ex d IIC T6", "Opsiyonel LCD ekran"],
    specs: [["Eleman", "Pt 100, Sınıf B"], ["Aralık", "-200 ila 450 °C"], ["Çıkış", "4–20 mA, 2 tel"], ["Patlamaya dayanım", "Ex d IIC T6"]],
  },
  "wear-resistant-thermistor": {
    name: "Aşınmaya dayanıklı RTD",
    summary: "Santral kömür değirmenleri ve tozlu akışlar için aşınmaya dayanıklı zırhlı Pt 100 sensör.",
    description: "Santrallerin yüksek hızlı tozlu akışlarının (kömür öğütme) aşınmasına dayanan sert alaşım koruyucu uç. B sınıfı Pt 100 eleman; daldırma derinliğini ve boru çapını teyit edin.",
    highlights: ["Aşınmaya dayanıklı uç", "Santral kullanımı", "Tozlu akışa dayanıklı"],
    specs: [["Eleman", "Pt 100, Sınıf B"], ["Aralık", "0 ila 600 °C"], ["Uç", "Sert alaşım aşınmaya dayanıklı kapak"], ["Uygulama", "Kömür öğütme, tozlu hava"]],
  },
  "explosion-proof-thermocouple": {
    name: "Alev almaz termokupl",
    summary: "Ex bölgelerindeki yüksek sıcaklıklar için koruyucu kuyu ve alev almaz başlıklı termokupl.",
    description: "Dişli veya flanşlı koruyucu kuyu içinde K/N termokupl, Ex d IIC T6 alev almaz kafa, 1000 °C'ye kadar. Fırınlar, baca kanalları ve Ex bölge proses hatları için uygundur; kalibrasyon, daldırma boyu ve flanşı teyit edin.",
    highlights: ["K / N kalibrasyonları", "1000 °C'ye kadar", "Ex d IIC T6"],
    specs: [["Kalibrasyon", "K / N tipi"], ["Aralık", "0 ila 1000 °C"], ["Patlamaya dayanım", "Ex d IIC T6"], ["Montaj", "Dişli veya flanşlı koruyucu kuyu"]],
  },
  "power-plant-thermocouple": {
    name: "Santral termokuplü",
    summary: "Kazan, buhar hattı ve türbin ölçüm noktaları için güçlendirilmiş termokupl.",
    description: "Kazan, buhar hattı ve türbin ölçüm noktaları için su sıçramasına dayanıklı başlıklı güçlendirilmiş tasarım. 900 °C'ye kadar K/E tipleri, koruyucu kuyulu flanş montajı; daldırma boyu ve buhar koşullarını teyit edin.",
    highlights: ["Kazan / buhar", "Sıçramaya dayanıklı kafa", "900 °C'ye kadar"],
    specs: [["Kalibrasyon", "K / E tipi"], ["Aralık", "0 ila 900 °C"], ["Kafa", "Sıçramaya dayanıklı / hava koşullarına dayanıklı"], ["Montaj", "Flanş, koruyucu kuyu ile"]],
  },
  "petrochemical-thermocouple": {
    name: "Petrokimya termokuplü / Pt 100",
    summary: "Petrokimya üniteleri için flanşlı termokupl / Pt 100 ailesi.",
    description: "DN25–80 flanş bağlantılı, delikli veya kaynaklı 316L koruyucu kuyulu termokupl (K/E) ve Pt 100 sensörler — rafineri ve petrokimya tesisleri için tasarlandı. Hat bazında ortam, sıcaklık ve flanş standardını teyit edin.",
    highlights: ["K / E / PT100 seçenekleri", "DN25–80 flanşlar", "Rafineride kanıtlanmış tasarım"],
    specs: [["Kalibrasyon", "K / E tipi, Pt 100"], ["Aralık", "-200 ila 1000 °C"], ["Proses bağlantısı", "DN25–80 flanş"], ["Koruyucu kuyu", "316L"]],
  },
  "magnetic-level": {
    name: "Manyetik seviye göstergesi",
    summary: "Tanklarda yerel seviye gösterimi için manyetik by-pass seviye göstergesi.",
    description: "İki renkli flapları süren manyetik şamandıralı by-pass odası: 6 m'ye kadar doğrudan seviye okuma. Yan veya üst montaj, 304/316L/PP ıslak parçalar; opsiyonel 4–20 mA verici ve seviye şalterleri. Ortam yoğunluğunu ve eksen aralığını teyit edin.",
    highlights: ["0–6 m aralıklar", "±10 mm doğruluk", "Opsiyonel 4–20 mA"],
    specs: [["Aralık", "0,3 ila 6 m eksen arası"], ["Doğruluk", "±10 mm"], ["Islak parçalar", "304 / 316L / PP"], ["Montaj", "Yan veya üst"]],
  },
  "anticorrosive-magnetic-level": {
    name: "Korozif ortam seviye göstergesi",
    summary: "Güçlü asit, kostik ve korozif ortamlar için PTFE kaplı manyetik seviye göstergesi.",
    description: "Yoğun asit ve kostiğe dayanıklı PTFE/PP kaplı oda; flap göstergesi ile opsiyonel seviye şalterleri veya verici. Ortamın minimum yoğunluğunu (≥0,45 g/cm³) ve eksen aralığını teyit edin.",
    highlights: ["PTFE kaplı oda", "Güçlü asit / kostik", "Opsiyonel seviye şalterleri"],
    specs: [["Aralık", "0,3 ila 6 m"], ["Doğruluk", "±10 mm"], ["Kaplama", "PTFE / PP"], ["Ortam yoğunluğu", "≥0,45 g/cm³"]],
  },
  "insert-float-level": {
    name: "Şamandıralı seviye transmitteri",
    summary: "Tank ve kuyular için reed zincirli sokma tipi şamandıralı seviye transmitteri.",
    description: "Reed zincirli sokulabilir gövde: seviyeyle orantılı 4–20 mA çıkış, ±5 mm doğruluk, 10 m'ye kadar derinlik. 304/316L paslanmaz şamandıra; daldırma derinliğini, kuyu çapını ve ortam yoğunluğunu teyit edin.",
    highlights: ["0–10 m daldırma", "±5 mm doğruluk", "Reed 4–20 mA çıkış"],
    specs: [["Aralık", "0,5 ila 10 m"], ["Doğruluk", "±5 mm"], ["Çıkış", "4–20 mA, reed zincir"], ["Şamandıra", "304 / 316L paslanmaz"]],
  },
  "radar-level": {
    name: "Radar seviye ölçer",
    summary: "Buhar, köpük veya tozlu tanklar için temassız 26 GHz radar.",
    description: "Buhar, köpük ve tozdan etkilenmeyen temassız 26 GHz radar; 30 m'ye kadar ±3 mm doğruluk. PP/316L boynuz veya lens anten, 4–20 mA + HART çıkış. Ürünün dielektrik sabitini ve proses bağlantısını teyit edin.",
    highlights: ["±3 mm doğruluk", "26 GHz temassız", "4–20 mA + HART"],
    specs: [["Aralık", "0,3 ila 30 m"], ["Doğruluk", "±3 mm"], ["Anten", "PP / 316L boynuz veya lens"], ["Çıkış", "4–20 mA + HART"]],
  },
  "glass-level": {
    name: "Cam seviye göstergesi",
    summary: "Düşük basınçlı tank ve kazanlar için doğrudan okumalı cam tüplü seviye göstergesi.",
    description: "Kuvars/borosilikat cam tüp üzerinden seviyenin doğrudan görsel okunması; düşük basınçlı tank ve kazanlar için (≤0,6 MPa, ≤150 °C). Tahliye ve yıkama vanaları; işletme basıncını ve sıcaklığını teyit edin.",
    highlights: ["Doğrudan görsel okuma", "Kuvars cam tüp", "Basit bakım"],
    specs: [["Aralık", "0,3 ila 3 m"], ["Okuma", "Doğrudan görsel"], ["Tüp", "Kuvars / borosilikat cam"], ["Sınıf", "≤0,6 MPa, ≤150 °C"]],
  },
};
