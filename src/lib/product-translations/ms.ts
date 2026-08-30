import type { Locale } from "@/lib/i18n-config";

export type ProductOverride = Partial<{
  name: string;
  summary: string;
  description: string;
  highlights: string[];
  specs: [string, string][];
}>;

/** Per-slug Malay overrides. Missing slugs/fields fall back to English. */
export const table: Record<string, ProductOverride> = {
  "pressure-gauge": {
    name: "Tolok tekanan",
    summary: "Tolok tekanan tiub Bourdon untuk pembacaan tempatan tekanan proses.",
    description: "Tiub Bourdon menukar tekanan proses kepada anjakan kenyal; mekanisme gear menggerakkan penunjuk untuk pembacaan tempatan tanpa bekalan kuasa. Sesuai untuk pam, udara termampat, talian proses dan vessel tekanan stabil. Sahkan julat, keserasian media, suhu, orientasi sambungan dan getaran; sediakan penyekat atau pelindam jika ada denyutan.",
    highlights: ["Julat 0–60 MPa", "Ketepatan ±1.6% FS", "Pemasangan radial / paksi"],
    specs: [["Julat", "0–0.1 hingga 0–60 MPa"], ["Ketepatan", "±1.6% FS"], ["Sambungan", "M20×1.5, radial atau paksi"], ["Kepingan", "φ100 / φ150 mm"]],
  },
  "stainless-pressure-gauge": {
    name: "Tolok tekanan tahan karat",
    summary: "Tolok tekanan sepenuhnya tahan karat untuk media kakisan dan persekitaran sukar.",
    description: "Pembinaan sepenuhnya tahan karat (304/316L) untuk media korosif, dengan pilihan isian gliserin menentang getaran. Sesuai untuk industri kimia, petrokimia dan pemasangan luar. Sahkan keserasian media, julat dan sambungan sebelum pesanan.",
    highlights: ["Bahagian basah 316L", "Pilihan isian gliserin", "Hingga 100 MPa"],
    specs: [["Julat", "0–0.1 hingga 0–100 MPa"], ["Ketepatan", "±1.6% FS"], ["Bahagian basah", "Stainless 304 / 316L"], ["Sambungan", "M20×1.5 atau tersuai"]],
  },
  "capsule-pressure-gauge": {
    name: "Tolok tekanan kapsul",
    summary: "Tolok elemen kapsul untuk pengukuran tekanan rendah dan mikro tekanan gas.",
    description: "Elemen kapsul membolehkan pengukuran tekanan gas rendah julat kPa dengan boleh dipercayai. Kepingan tahan karat, pemasangan panel atau dinding. Sesuai untuk pembakar, kipas dan instalasi gas; semak keserasian media dan julat.",
    highlights: ["Julat kPa", "Kapsul 316L", "Pemasangan panel / dinding"],
    specs: [["Julat", "0–2.5 hingga 0–60 kPa, ±kPa"], ["Ketepatan", "±1.6% FS"], ["Bahagian basah", "Kapsul 316L"], ["Sambungan", "M20×1.5"]],
  },
  "ammonia-pressure-gauge": {
    name: "Tolok tekanan ammonia",
    summary: "Tolok tahan karat khusus untuk ammonia dan sistem penyejukan, dengan belakang keselamatan.",
    description: "Direka untuk litar ammonia dan penyejukan: bahagian basah tahan karat dan belakang keselamatan. Julat dan sambungan ditentukan mengikut pemasangan; gunakan hanya dengan media serasi ammonia.",
    highlights: ["Ammonia / penyejukan", "Belakang keselamatan", "Bahagian basah tahan karat"],
    specs: [["Julat", "0–1 hingga 0–40 MPa, kompaun + vakum"], ["Ketepatan", "±1.6% FS"], ["Bahagian basah", "Keluli tahan karat"], ["Sambungan", "M20×1.5"]],
  },
  "bimetal-thermometer": {
    name: "Termometer bimetal",
    summary: "Termometer bimetal dial untuk pembacaan suhu tempatan tanpa bekalan kuasa.",
    description: "Elemen bimetal menukar suhu kepada putaran penunjuk pada dial tanpa bekalan kuasa. Pemasangan paksi, radial atau universal; batang dan panjang mengikut pesanan. Sesuai untuk saluran paip, tangki dan mesin; sahkan julat, panjang batang dan media.",
    highlights: ["-80 hingga 500 °C", "Paksi / radial / universal", "Tanpa bekalan kuasa"],
    specs: [["Julat", "-80 hingga 500 °C"], ["Ketepatan", "±1.5% FS"], ["Dial", "φ60 / φ100 / φ150 mm"], ["Batang", "Ø6 / Ø10 mm, panjang mengikut pesanan"]],
  },
  "surface-thermistor": {
    name: "Sensor RTD permukaan",
    summary: "Sensor Pt 100 permukaan untuk pengukuran suhu bearing dan dinding paip.",
    description: "Elemen Pt 100 kemasan depan untuk sentuhan langsung pada bearing, jaket dan dinding paip. Muka sentuh inox 316L, reka bentuk padat; kabel silikon dengan gland kalis air. Sahkan suhu permukaan dan panjang kabel.",
    highlights: ["Elemen Pt 100", "Muka sentuhan rata", "Reka bentuk padat"],
    specs: [["Elemen", "Pt 100, Kelas B"], ["Julat", "-50 hingga 200 °C"], ["Muka sentuh", "Keluli tahan karat 316L"], ["Kabel", "Silikon, gland kalis air"]],
  },
  "assembly-thermistor": {
    name: "RTD terakit",
    summary: "Termometer rintangan platinum dengan thermowell untuk paip dan tangki.",
    description: "Sondda Pt 100/PT1000 dalam thermowell boleh tanggal (304/316/316L) untuk pengukuran suhu proses. Pendawaian 2/3/4 wayar; versi kelas A atau B. Pilih diameter dan panjang thermowell mengikut proses.",
    highlights: ["Pt 100 / PT1000", "Kelas A / B", "Thermowell 304 / 316 / 316L"],
    specs: [["Elemen", "Pt 100 / PT1000, Kelas A atau B"], ["Julat", "-200 hingga 500 °C"], ["Thermowell", "304 / 316 / 316L"], ["Pendawaian", "2 / 3 / 4 wayar"]],
  },
  "explosion-proof-thermistor": {
    name: "RTD tahan letupan",
    summary: "Sondda Pt 100 dengan kepala tahan letupan untuk pengukuran suhu kawasan berbahaya.",
    description: "Kepala sambungan tahan letupan Ex d untuk penggunaan di kawasan berisiko. Elemen Pt 100, thermowell keluli tahan karat; mematuhi Ex d IIC T6. Semak klasifikasi zon dan kedalaman rendaman sebelum pesanan.",
    highlights: ["Ex d IIC T6", "Kepala tahan letupan", "Elemen Pt 100"],
    specs: [["Elemen", "Pt 100, Kelas B"], ["Julat", "-200 hingga 450 °C"], ["Tahan letupan", "Ex d IIC T6"], ["Thermowell", "Keluli tahan karat"]],
  },
  "integrated-thermistor": {
    name: "Penghantar suhu Ex terintegrasi",
    summary: "Sondda Pt 100 dengan penghantar kepala terintegrasi, output 4–20 mA terus di kawasan berbahaya.",
    description: "Penghantar kepala terintegrasi dalam sondda: output 4–20 mA dua wayar tanpa wayar pampasan. Kepala tahan letupan Ex d IIC T6, paparan LCD pilihan. Sesuai untuk titik ukuran yang jauh; sahkan julat dan kedalaman rendaman.",
    highlights: ["Penghantar 4–20 mA terintegrasi", "Ex d IIC T6", "Paparan LCD pilihan"],
    specs: [["Elemen", "Pt 100, Kelas B"], ["Julat", "-200 hingga 450 °C"], ["Output", "4–20 mA, 2 wayar"], ["Tahan letupan", "Ex d IIC T6"]],
  },
  "wear-resistant-thermistor": {
    name: "RTD tahan haus",
    summary: "Sondda Pt 100 berperisai dengan hujung tahan haus untuk kilang arang dan aliran berdebu.",
    description: "Hujun aloi keras menahan penghakisan aliran berdebu berkelajuan tinggi di loji kuasa (pengilangan arang). Elemen Pt 100 Kelas B; sahkan kedalaman rendaman dan diameter paip.",
    highlights: ["Hujung tahan haus", "Penggunaan loji kuasa", "Menahan aliran berdebu"],
    specs: [["Elemen", "Pt 100, Kelas B"], ["Julat", "0 hingga 600 °C"], ["Hujung", "Topi tahan haus aloi keras"], ["Aplikasi", "Pengilangan arang, udara berdebu"]],
  },
  "explosion-proof-thermocouple": {
    name: "Termokopel tahan letupan",
    summary: "Termokopel dengan thermowell dan kepala tahan letupan untuk suhu tinggi kawasan berbahaya.",
    description: "Termokopel K/N dalam thermowell berulir atau berflens, kepala tahan letupan Ex d IIC T6, hingga 1000 °C. Sesuai untuk tanur, salur asap dan talian proses kawasan berbahaya; sahkan kalibrasi, kedalaman rendaman dan flens.",
    highlights: ["Kalibrasi jenis K / N", "Hingga 1000 °C", "Ex d IIC T6"],
    specs: [["Kalibrasi", "Jenis K / N"], ["Julat", "0 hingga 1000 °C"], ["Tahan letupan", "Ex d IIC T6"], ["Pemasangan", "Thermowell berulir atau berflens"]],
  },
  "power-plant-thermocouple": {
    name: "Termokopel loji kuasa",
    summary: "Termokopel diperkukuh untuk titik ukuran dandang, talian wap dan turbin.",
    description: "Reka bentuk diperkukuh dengan kepala kalis percikan untuk titik ukuran dandang, talian wap dan turbin. Jenis K/E hingga 900 °C, pemasangan flens dengan thermowell; sahkan kedalaman rendaman dan keadaan wap.",
    highlights: ["Dandang / wap", "Kepala kalis percikan", "Hingga 900 °C"],
    specs: [["Kalibrasi", "Jenis K / E"], ["Julat", "0 hingga 900 °C"], ["Kepala", "Kalis percikan / kalis cuaca"], ["Pemasangan", "Flens, dengan thermowell"]],
  },
  "petrochemical-thermocouple": {
    name: "Termokopel / Pt 100 petrokimia",
    summary: "Keluarga termokopel dan sensor Pt 100 berflens untuk unit petrokimia.",
    description: "Termokopel (K/E) dan sensor Pt 100 dengan flens DN25–80, thermowell 316L ditebuk atau dikimpal — direka untuk loji penapisan dan petrokimia. Sahkan media, suhu dan standard flens mengikut talian.",
    highlights: ["Pilihan K / E / PT100", "Flens DN25–80", "Reka bentuk terbukti kilang penapisan"],
    specs: [["Kalibrasi", "Jenis K / E, PT100"], ["Julat", "-200 hingga 1000 °C"], ["Sambungan proses", "Flens DN25–80"], ["Thermowell", "316L"]],
  },
  "magnetic-level": {
    name: "Pengukur aras magnetik",
    summary: "Pengukur aras bypass dengan flap magnetik untuk bacaan tempatan pada tangki.",
    description: "Rongga bypass dengan pelampung magnetik yang menggerakkan flap dua warna: bacaan aras langsung hingga 6 m. Pemasangan sisi atau atas, bahagian basah 304/316L/PP; penghantar 4–20 mA dan suis pilihan. Sahkan ketumpatan media dan jarak antara pusat.",
    highlights: ["Julat 0–6 m", "Ketepatan ±10 mm", "4–20 mA pilihan"],
    specs: [["Julat", "0.3 hingga 6 m antara pusat"], ["Ketepatan", "±10 mm"], ["Bahagian basah", "304 / 316L / PP"], ["Pemasangan", "Sisi atau atas"]],
  },
  "anticorrosive-magnetic-level": {
    name: "Pengukur aras magnetik anti-kakisan",
    summary: "Pengukur aras magnetik berlapik PTFE untuk asid kuat, alkali dan media kakisan.",
    description: "Rongga berlapik PTFE/PP tahan asid dan alkali pekat, dengan indikasi flap dan suis atau penghantar pilihan. Sahkan ketumpatan minimum media (≥0.45 g/cm³) dan jarak antara pusat.",
    highlights: ["Rongga berlapik PTFE", "Asid / alkali kuat", "Suis aras pilihan"],
    specs: [["Julat", "0.3 hingga 6 m"], ["Ketepatan", "±10 mm"], ["Pelapik", "PTFE / PP"], ["Ketumpatan media", "≥0.45 g/cm³"]],
  },
  "insert-float-level": {
    name: "Pengukur aras apung sisip",
    summary: "Penghantar aras apung sisip dengan rantaian reed untuk tangki dan telaga.",
    description: "Batang sisip dengan rantaian reed: output 4–20 mA berkadar dengan aras, ketepatan ±5 mm, kedalaman hingga 10 m. Pelampung tahan karat 304/316L; sahkan kedalaman sisipan, diameter telaga dan ketumpatan media.",
    highlights: ["Kedalaman 0–10 m", "Ketepatan ±5 mm", "Output reed 4–20 mA"],
    specs: [["Julat", "0.5 hingga 10 m"], ["Ketepatan", "±5 mm"], ["Output", "4–20 mA, rantaian reed"], ["Pelampung", "Keluli tahan karat 304 / 316L"]],
  },
  "radar-level": {
    name: "Pengukur aras radar",
    summary: "Radar tanpa sentuh 26 GHz untuk tangki dengan wap, buih atau debu.",
    description: "Radar tanpa sentuh 26 GHz tidak terjejas oleh wap, buih dan debu; ketepatan ±3 mm hingga 30 m. Antena horn atau kanta PP/316L, output 4–20 mA + HART. Sahkan pemalar dielektrik produk dan sambungan proses.",
    highlights: ["Ketepatan ±3 mm", "26 GHz tanpa sentuh", "4–20 mA + HART"],
    specs: [["Julat", "0.3 hingga 30 m"], ["Ketepatan", "±3 mm"], ["Antena", "Horn atau kanta PP / 316L"], ["Output", "4–20 mA + HART"]],
  },
  "glass-level": {
    name: "Pengukur aras tiub kaca",
    summary: "Pengukur aras tiub kaca bacaan langsung untuk tangki dan dandang tekanan rendah.",
    description: "Bacaan visual langsung aras melalui tiub kaca kuarza/borosilikat, untuk tangki dan dandang tekanan rendah (≤0.6 MPa, ≤150 °C). Injap salur dan pembilasan; sahkan tekanan dan suhu operasi.",
    highlights: ["Bacaan visual langsung", "Tiub kaca kuarza", "Penyelenggaraan mudah"],
    specs: [["Julat", "0.3 hingga 3 m"], ["Bacaan", "Visual langsung"], ["Tiub", "Kaca kuarza / borosilikat"], ["Kadar", "≤0.6 MPa, ≤150 °C"]],
  },
};
