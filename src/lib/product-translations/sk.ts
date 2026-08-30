import type { Locale } from "@/lib/i18n-config";

export type ProductOverride = Partial<{
  name: string;
  summary: string;
  description: string;
  highlights: string[];
  specs: [string, string][];
}>;

/** Per-slug Slovak overrides. Missing slugs/fields fall back to English. */
export const table: Record<string, ProductOverride> = {
  "pressure-gauge": {
    name: "Manometer",
    summary: "Bourdonov tlakomer na lokálne ukazovanie tlaku procesných médií.",
    description: "Bourdonova rúra premieňa tlak procesu na pružnú výchylku; prevodový mechanizmus poháňa ručičku na lokálne ukazovanie bez vonkajšieho napájania. Vhodné pre čerpadlá, stlačený vzduch, procesné potrubia a nádoby so stabilným tlakom. Potvrďte rozsah, kompatibilitu média, teplotu, orientáciu prípojky a vibrácie; pri pulzáciách predvidzte dusič alebo tlmič.",
    highlights: ["Rozsahy 0–60 MPa", "Presnosť ±1,6 % FS", "Radiálne / axiálne usporiadanie"],
    specs: [["Rozsah", "0–0,1 až 0–60 MPa"], ["Presnosť", "±1,6 % FS"], ["Prípojka", "M20×1,5, radiálne alebo axiálne"], ["Kryt", "φ100 / φ150 mm"]],
  },
  "stainless-pressure-gauge": {
    name: "Nerezový manometer",
    summary: "Celonerezový manometer pre korozívne médiá a náročné prostredie.",
    description: "Celonerezové vyhotovenie (304/316L) odolné voči korózii, s voliteľným glycerínovým plnením proti vibráciám. Vhodné pre chemický, petrochemický priemysel a vonkajšie inštalácie. Pred objednaním potvrďte kompatibilitu média, rozsah a prípojku.",
    highlights: ["Diely v kontakte s médiom 316L", "Glycerínové plnenie ako možnosť", "Do 100 MPa"],
    specs: [["Rozsah", "0–0,1 až 0–100 MPa"], ["Presnosť", "±1,6 % FS"], ["Diely v kontakte s médiom", "Nerez 304 / 316L"], ["Prípojka", "M20×1,5 alebo na mieru"]],
  },
  "capsule-pressure-gauge": {
    name: "Manometer s kapsovým prvkom",
    summary: "Manometer s kapsovým prvkom na meranie nízkeho a mikrotlaku plynov.",
    description: "Kapsový prvok umožňuje spoľahlivé meranie malých tlakov plynov v oblasti kPa. Nerezové prevedenie, panelová alebo stenová montáž. Vhodné pre horáky, ventilátory a plynové inštalácie; skontrolujte kompatibilitu média a rozsah.",
    highlights: ["Rozsahy v kPa", "Kapsa 316L", "Panelová / stenová montáž"],
    specs: [["Rozsah", "0–2,5 až 0–60 kPa, ±kPa"], ["Presnosť", "±1,6 % FS"], ["Diely v kontakte s médiom", "Kapsa 316L"], ["Prípojka", "M20×1,5"]],
  },
  "ammonia-pressure-gauge": {
    name: "Manometer na amoniak",
    summary: "Nerezový manometer pre amoniakové a chladiace inštalácie, s poistným dnom.",
    description: "Navrhnutý pre amoniakové a chladiace okruhy: diely v kontakte s médiom z nerezovej ocele a poistné dno. Rozsah a prípojku prispôsobte inštalácii; používajte iba s médiami kompatibilnými s amoniakom.",
    highlights: ["Amoniak / chladenie", "Poistné dno", "Nerezové diely v kontakte"],
    specs: [["Rozsah", "0–1 až 0–40 MPa, pretlakové + vákuum"], ["Presnosť", "±1,6 % FS"], ["Diely v kontakte s médiom", "Nerezová oceľ"], ["Prípojka", "M20×1,5"]],
  },
  "bimetal-thermometer": {
    name: "Bimetalový teplomer",
    summary: "Bimetalový teplomer s ciferníkom na lokálne ukazovanie teploty bez napájania.",
    description: "Bimetalový prvok premieňa teplotu na otáčanie ručičky na ciferníku bez vonkajšieho napájania. Axialná, radiálna alebo univerzálna montáž; hriadeľ a dĺžka podľa objednávky. Vhodné pre potrubia, nádoby a stroje; potvrďte rozsah, dĺžku hriadeľa a médium.",
    highlights: ["-80 až 500 °C", "Axialný / radiálny / univerzálny", "Bez napájania"],
    specs: [["Rozsah", "-80 až 500 °C"], ["Presnosť", "±1,5 % FS"], ["Ciferník", "φ60 / φ100 / φ150 mm"], ["Hriadeľ", "Ø6 / Ø10 mm, dĺžka na mieru"]],
  },
  "surface-thermistor": {
    name: "Povrchový odporový snímač",
    summary: "Pt 100 povrchová sonda na meranie teploty ložísk a stien potrubí.",
    description: "Prvok Pt 100 v prednom vyhotovení na priamy kontakt s ložiskami, plášťmi a stenami potrubí. Podložná plocha z nerezovej ocele 316L, kompaktné prevedenie; silikónový kábel s tesniacou priechodkou. Potvrďte teplotu povrchu a dĺžku kábla.",
    highlights: ["Prvok Pt 100", "Plochá kontaktná plocha", "Kompaktné prevedenie"],
    specs: [["Prvok", "Pt 100, trieda B"], ["Rozsah", "-50 až 200 °C"], ["Kontaktná plocha", "Nerez 316L"], ["Kábel", "Silikón, tesniaca priechodka"]],
  },
  "assembly-thermistor": {
    name: "Zostavný odporový snímač",
    summary: "Platinový odporový teplomer s ochrannou objímkou pre potrubia a nádoby.",
    description: "Sonda Pt 100/PT1000 v výmennej ochrannej objímke (304/316/316L) na meranie teploty procesu. Zapojenie 2/3/4 vodiče; trieda A alebo B. Priemer a dĺžku objímky zvoľte podľa procesu.",
    highlights: ["Pt 100 / PT1000", "Trieda A / B", "Objímka 304 / 316 / 316L"],
    specs: [["Prvok", "Pt 100 / PT1000, trieda A alebo B"], ["Rozsah", "-200 až 500 °C"], ["Ochranná objímka", "304 / 316 / 316L"], ["Zapojenie", "2 / 3 / 4 vodiče"]],
  },
  "explosion-proof-thermistor": {
    name: "Tlakovotesný odporový snímač",
    summary: "Pt 100 s tlakovotesnou hlavicou na meranie teploty v ex-oblastiach.",
    description: "Tlakovotesná prípojná hlavica Ex d na použitie v nebezpečných oblastiach. Prvok Pt 100, ochranná objímka z nerezovej ocele; vyhovuje Ex d IIC T6. Pred objednaním skontrolujte klasifikáciu zóny a hĺbku ponorenia.",
    highlights: ["Ex d IIC T6", "Tlakovotesná hlavica", "Prvok Pt 100"],
    specs: [["Prvok", "Pt 100, trieda B"], ["Rozsah", "-200 až 450 °C"], ["Výbuchoodolnosť", "Ex d IIC T6"], ["Ochranná objímka", "Nerezová oceľ"]],
  },
  "integrated-thermistor": {
    name: "Snímač teploty s integrovaným prevodníkom (Ex)",
    summary: "Pt 100 s integrovaným prevodníkom v hlavici, priamy výstup 4–20 mA v ex-oblasti.",
    description: "Prevodník integrovaný priamo v hlave sondy: výstup 4–20 mA na dva vodiče bez kompenzačných vedení. Tlakovotesná hlavica Ex d IIC T6, voliteľný LCD displej. Ideálne pre vzdialené meracie miesta; potvrďte rozsah a hĺbku ponorenia.",
    highlights: ["Integrovaný prevodník 4–20 mA", "Ex d IIC T6", "Voliteľný LCD displej"],
    specs: [["Prvok", "Pt 100, trieda B"], ["Rozsah", "-200 až 450 °C"], ["Výstup", "4–20 mA, 2 vodiče"], ["Výbuchoodolnosť", "Ex d IIC T6"]],
  },
  "wear-resistant-thermistor": {
    name: "Oteruvzdorný odporový snímač",
    summary: "Pt 100 s oteruvzdornou špičkou pre uhelné mlyny a prašné toky.",
    description: "Špička z tvrdej zliatiny odolá abrazívnemu opotrebovaniu prašných rýchlych tokov v elektrárňach (mletie uhlia). Prvok Pt 100 trieda B; potvrďte hĺbku ponorenia a priemer potrubia.",
    highlights: ["Oteruvzdorná špička", "Pre elektrárne", "Odolá prašným tokom"],
    specs: [["Prvok", "Pt 100, trieda B"], ["Rozsah", "0 až 600 °C"], ["Špička", "Tvrdozliatinová krytka"], ["Aplikácia", "Mletie uhlia, vzduch s prachom"]],
  },
  "explosion-proof-thermocouple": {
    name: "Tlakovotesný termočlánok",
    summary: "Termočlánok s ochrannou objímkou a tlakovotesnou hlavicou pre vysoké teploty v ex-oblastiach.",
    description: "Termočlánok K/N v závitovej alebo prírubovej ochrannej objímke, tlakovotesná hlavica Ex d IIC T6, do 1000 °C. Vhodný pre pece, dymovody a procesné potrubia v nebezpečných zónach; potvrďte kalibráciu, hĺbku ponorenia a prírubu.",
    highlights: ["Kalibrácie typ K / N", "Do 1000 °C", "Ex d IIC T6"],
    specs: [["Kalibrácia", "Typ K / N"], ["Rozsah", "0 až 1000 °C"], ["Výbuchoodolnosť", "Ex d IIC T6"], ["Montáž", "Závitová alebo prírubová objímka"]],
  },
  "power-plant-thermocouple": {
    name: "Termočlánok pre elektrárne",
    summary: "Zosilnený termočlánok pre meracie miesta kotlov, parovodov a turbín.",
    description: "Zosilnené prevedenie s hlavou odolnou voči postreku pre meracie miesta kotlov, parovodov a turbín. Typy K/E do 900 °C, prírubová montáž s ochrannou objímkou; potvrďte hĺbku ponorenia a parné podmienky.",
    highlights: ["Kotol / para", "Hlavica odolná voči postreku", "Do 900 °C"],
    specs: [["Kalibrácia", "Typ K / E"], ["Rozsah", "0 až 900 °C"], ["Hlavica", "Odolná voči postreku / poveternostná"], ["Montáž", "Príruba, s ochrannou objímkou"]],
  },
  "petrochemical-thermocouple": {
    name: "Termočlánok / Pt 100 pre petrochémiu",
    summary: "Rodina termočlánkov a Pt 100 snímačov s prírubovým pripojením pre petrochemické závody.",
    description: "Termočlánky (K/E) a snímače Pt 100 s prírubou DN25–80, ochranné objímky 316L vŕtané alebo zvárané — navrhnuté pre rafinérie a petrochémiu. Potvrďte médium, teplotu a štandard príruby podľa potrubia.",
    highlights: ["Možnosti K / E / PT100", "Príruby DN25–80", "Overené prevedenie pre rafinérie"],
    specs: [["Kalibrácia", "Typ K / E, PT100"], ["Rozsah", "-200 až 1000 °C"], ["Procesná prípojka", "Príruba DN25–80"], ["Ochranná objímka", "316L"]],
  },
  "magnetic-level": {
    name: "Magnetický hladinomer",
    summary: "Byposový hladinomer s magnetickými klapkami na lokálne ukazovanie hladiny v nádržiach.",
    description: "Byposová komora s magnetickým plavákom poháňajúcim dvojfarebné klapky: priame čítanie hladiny do 6 m. Bočná alebo horná montáž, diely v kontakte s médiom 304/316L/PP; voliteľný prevodník 4–20 mA a hladinové spínače. Potvrďte hustotu média a rozostup osí.",
    highlights: ["Rozsahy 0–6 m", "Presnosť ±10 mm", "Voliteľný 4–20 mA"],
    specs: [["Rozsah", "0,3 až 6 m medzi osami"], ["Presnosť", "±10 mm"], ["Diely v kontakte s médiom", "304 / 316L / PP"], ["Montáž", "Bočná alebo horná"]],
  },
  "anticorrosive-magnetic-level": {
    name: "Korózii vzdorný magnetický hladinomer",
    summary: "Magnetický hladinomer s PTFE výstelkou pre silné kyseliny, zásady a korozívne média.",
    description: "Komora s výstelkou PTFE/PP odolná voči koncentrovaným kyselinám a zásadám, s klapkovým ukazom a voliteľnými spínačmi alebo prevodníkom. Potvrďte minimálnu hustotu média (≥0,45 g/cm³) a rozostup osí.",
    highlights: ["Komora s výstelkou PTFE", "Silné kyseliny / zásady", "Voliteľné hladinové spínače"],
    specs: [["Rozsah", "0,3 až 6 m"], ["Presnosť", "±10 mm"], ["Výstelka", "PTFE / PP"], ["Hustota média", "≥0,45 g/cm³"]],
  },
  "insert-float-level": {
    name: "Zapúšťací plavákový hladinomer",
    summary: "Plavákový prevodník s reed reťazou pre nádrže a studne.",
    description: "Zapúšťacia sonda s reed reťazou: výstup 4–20 mA úmerný hladine, presnosť ±5 mm, hĺbka do 10 m. Plavák z nerezovej ocele 304/316L; potvrďte hĺbku zapustenia, priemer studne a hustotu média.",
    highlights: ["Hĺbka 0–10 m", "Presnosť ±5 mm", "Reed výstup 4–20 mA"],
    specs: [["Rozsah", "0,5 až 10 m"], ["Presnosť", "±5 mm"], ["Výstup", "4–20 mA, reed reťaz"], ["Plavák", "Nerez 304 / 316L"]],
  },
  "radar-level": {
    name: "Radarový hladinomer",
    summary: "Bezkontaktný 26 GHz radar pre nádrže s parami, penou alebo prachom.",
    description: "Bezkontaktný 26 GHz radar necitlivý na pary, penu a prach; presnosť ±3 mm do 30 m. Rohová alebo šošovková anténa PP/316L, výstup 4–20 mA + HART. Potvrďte dielektrickú konštantu produktu a procesnú prípojku.",
    highlights: ["Presnosť ±3 mm", "26 GHz bezkontaktný", "4–20 mA + HART"],
    specs: [["Rozsah", "0,3 až 30 m"], ["Presnosť", "±3 mm"], ["Anténa", "Roh alebo šošovka PP / 316L"], ["Výstup", "4–20 mA + HART"]],
  },
  "glass-level": {
    name: "Hladinomer so sklenenou rúrou",
    summary: "Hladinomer s priamym optickým čítaním pre nízkotlakové nádrže a kotly.",
    description: "Priame vizuálne čítanie hladiny cez kremíkovú/borosilikátovú sklenenú rúru, pre nízkotlakové nádrže a kotly (≤0,6 MPa, ≤150 °C). Uzatváracie a vypúšťacie ventily; potvrďte prevádzkový tlak a teplotu.",
    highlights: ["Priame vizuálne čítanie", "Kremíková rúra", "Jednoduchá údržba"],
    specs: [["Rozsah", "0,3 až 3 m"], ["Čítanie", "Priame vizuálne"], ["Rúra", "Kremeň / borosilikátové sklo"], ["Zaťaženie", "≤0,6 MPa, ≤150 °C"]],
  },
};
