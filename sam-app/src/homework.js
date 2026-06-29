// ─────────────────────────────────────────────────────────────────────────────
// 課後作業資料（取材自 Deutsch perfekt PLUS 9/2020「Sommer am See」）
// 依等級拆解：A1（基礎詞彙／拼寫／搭配）與 A2（語法／克漏字／閱讀理解）
// 題型：mc=單選 / fill=填空 / match=連連看 / multi=多選
// 答案與課本 PDF 第 22–23 頁 Lösungen 完全對應
// ─────────────────────────────────────────────────────────────────────────────

export const HW_SOURCE = "Deutsch perfekt PLUS · 9/2020 · Sommer am See";

// 每份作業：{ id, level, emoji, title, zh, desc, exercises:[...] }
// 練習：
//   type:"mc"    → { q, zh, options:[...], answer, tip? }
//   type:"fill"  → { q, zh, answer (字串或字串陣列・可接受多種), hint?, tip? }
//   type:"match" → { left:[...], right:[...], pairs:{leftIdx:rightIdx}, zh? }
//   type:"multi" → { q, zh, options:[...], answers:[...], tip? }

export const HOMEWORK = [
  // ══════════════════════ A1 ══════════════════════
  {
    id: "hw-see-vocab",
    level: "A1",
    emoji: "🏖️",
    title: "夏天在湖邊 · 詞彙",
    zh: "Sommer am See",
    desc: "認識湖邊活動的高頻單字：游泳、躺草地、划船、曬太陽。",
    exercises: [
      {
        type: "mc",
        q: "Was passt NICHT? — im / Wasser / ___ schwimmen",
        zh: "哪個不能搭配「游泳」？",
        options: ["See", "Wasser", "Schilf"],
        answer: "Schilf",
        tip: "Schilf（蘆葦）是植物，不能在裡面游泳。",
      },
      {
        type: "mc",
        q: "Was passt NICHT? — auf der ___ liegen",
        zh: "哪個不能搭配「躺著」？",
        options: ["Decke", "Liegewiese", "Ente"],
        answer: "Ente",
        tip: "Ente 是鴨子，不能躺在上面。",
      },
      {
        type: "mc",
        q: "Was passt NICHT? — einen ___ anhaben",
        zh: "哪個不是可以「穿」的？",
        options: ["Ball", "Bikini", "Badeanzug"],
        answer: "Ball",
        tip: "Ball（球）不是衣物，不能 anhaben。",
      },
      {
        type: "mc",
        q: "Was passt NICHT? — auf dem ___ sitzen",
        zh: "哪個不能「坐在上面」？",
        options: ["Steg", "Liegestuhl", "See"],
        answer: "See",
        tip: "不能坐在湖（See）上面，要坐在棧橋或躺椅上。",
      },
      {
        type: "mc",
        q: "Was passt NICHT? — mit dem ___ fahren",
        zh: "哪個不能「搭乘／開」？",
        options: ["Ruderboot", "Tretboot", "Sand"],
        answer: "Sand",
        tip: "Sand（沙子）不能搭乘。",
      },
      {
        type: "fill",
        q: "Wir könnten zur ___ schwimmen!（我們可以游到那座小島）",
        zh: "填入「水上浮島」：Bade___",
        answer: ["Badeinsel"],
        hint: "Bade + Insel（島）",
        tip: "die Badeinsel = 湖中可游過去的浮台／小島。",
      },
      {
        type: "fill",
        q: "Wasser, Cola und Bier sind in der ___.（飲料在保冷箱裡）",
        zh: "填入「保冷箱」",
        answer: ["Kühlbox", "Kühltasche"],
        hint: "kühl（涼）+ Box",
        tip: "die Kühlbox / die Kühltasche 都可以，保冷用。",
      },
    ],
  },

  {
    id: "hw-see-gegenteil",
    level: "A1",
    emoji: "↔️",
    title: "反義詞 · Immer anders",
    zh: "形容詞與副詞的反義",
    desc: "湖邊情境下練習常用反義詞：濕↔乾、大↔小、快↔慢。",
    exercises: [
      { type: "fill", q: "Meine Badehose ist noch nass, deine ist schon ___.", zh: "濕的反義 = 乾", answer: ["trocken"], tip: "nass（濕）↔ trocken（乾）" },
      { type: "fill", q: "Mein Badetuch ist groß, dein Badetuch ist ___.", zh: "大的反義 = 小", answer: ["klein"], tip: "groß ↔ klein" },
      { type: "fill", q: "Meine Luftmatratze war teuer, deine war ___.", zh: "貴的反義 = 便宜", answer: ["billig", "günstig"], tip: "teuer ↔ billig / günstig" },
      { type: "fill", q: "Meine Cola ist warm, deine ist noch schön ___.", zh: "暖的反義 = 涼/冰", answer: ["kühl", "kalt"], tip: "warm ↔ kühl / kalt" },
      { type: "fill", q: "Du sprichst leise, ich spreche sehr ___.", zh: "小聲的反義 = 大聲", answer: ["laut"], tip: "leise ↔ laut" },
      { type: "fill", q: "Du fährst schnell, ich fahre ___.", zh: "快的反義 = 慢", answer: ["langsam"], tip: "schnell ↔ langsam" },
    ],
  },

  {
    id: "hw-see-match",
    level: "A1",
    emoji: "🔗",
    title: "水上活動 · 動詞搭配",
    zh: "Aktivitäten im Wasser",
    desc: "把動作和正確的動詞連起來：跳水、游泳、划船、玩球。",
    exercises: [
      {
        type: "match",
        zh: "把左邊的動作和右邊正確的動詞連起來",
        left: ["vom Steg in den See ___", "zur Badeinsel ___", "Wasserball ___", "mit dem Tretboot ___", "die Füße ins Wasser ___ lassen"],
        right: ["springen（跳）", "schwimmen（游）", "spielen（玩）", "fahren（划/開）", "hängen（垂/掛）"],
        pairs: { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4 },
      },
    ],
  },

  {
    id: "hw-orthografie",
    level: "A1",
    emoji: "✏️",
    title: "拼寫 · tot 還是tod？",
    zh: "Orthografie: Tod / tot",
    desc: "名詞 Tod 用 -d，形容詞 tot 用 -t。一起練清楚！",
    exercises: [
      { type: "fill", q: "Ich war ___müde und fiel ins Bett.（累到不行）", zh: "todmüde / totmüde？", answer: ["tod"], hint: "形容詞複合詞，前面是名詞 Tod-", tip: "todmüde 累壞了 → 用 -d（Tod- 作前綴）。" },
      { type: "fill", q: "Da liegt ein ___es Tier auf dem Radweg.", zh: "死掉的動物", answer: ["tot"], tip: "tot（死的）是形容詞 → 用 -t。totes Tier。" },
      { type: "fill", q: "Wir haben uns fast ___gelacht!（笑到不行）", zh: "totgelacht / todgelacht？", answer: ["tot"], tip: "totlachen 是動詞複合詞 → 用 -t。" },
      { type: "fill", q: "Deine Handtasche ist ___schick!（超時髦）", zh: "todschick / totschick？", answer: ["tod"], tip: "todschick → 用 -d（Tod- 強調程度）。" },
      { type: "fill", q: "Ein Autofahrer hat meine Katze ___gefahren.", zh: "撞死了", answer: ["tot"], tip: "totfahren 是動詞 → 用 -t。" },
    ],
  },

  // ══════════════════════ A2 ══════════════════════
  {
    id: "hw-badeinsel",
    level: "A2",
    emoji: "🏝️",
    title: "在浮島上 · 動詞填空",
    zh: "Auf der Badeinsel",
    desc: "用正確的動詞描述大家在浮島上做什麼：曬太陽、潛水、噴水、爬上去。",
    exercises: [
      { type: "fill", q: "Susi liegt auf der Badeinsel und ___ sich.", zh: "曬太陽（sonnen）", answer: ["sonnt"], tip: "sich sonnen → sie sonnt sich。" },
      { type: "fill", q: "Bernd ___ unter die Badeinsel und kommt anderswo hoch.", zh: "潛水（tauchen）", answer: ["taucht"], tip: "tauchen 潛入水中。" },
      { type: "fill", q: "Dann ___ er Susi nass und lacht.", zh: "噴濕（spritzen）", answer: ["spritzt"], tip: "spritzen 濺水／噴水。" },
      { type: "fill", q: "Danach ___ er auf die Badeinsel und legt sich hin.", zh: "爬上去（klettern）", answer: ["klettert"], tip: "klettern 攀爬。" },
      { type: "fill", q: "Bernd macht eine ___ ins Wasser.（屁股先跳水）", zh: "炸彈跳（口語）", answer: ["Arschbombe"], tip: "eine Arschbombe machen = 屁股先入水的跳水。" },
      { type: "fill", q: "Susi macht einen ___ ins Wasser.（頭先入水）", zh: "頭朝下跳水", answer: ["Kopfsprung"], tip: "der Kopfsprung = 頭先入水的跳水。" },
    ],
  },

  {
    id: "hw-zuviel-sonne",
    level: "A2",
    emoji: "☀️",
    title: "曬太多 · 選詞",
    zh: "Zu viel Sonne",
    desc: "Karla 在太陽下睡著了，後果是？選出正確的詞。",
    exercises: [
      { type: "mc", q: "Ich habe vergessen, mich mit ___ einzucremen!", zh: "塗防曬", options: ["Sonnencreme", "Sonnenschirm"], answer: "Sonnencreme", tip: "Sonnencreme 防曬乳；Sonnenschirm 是遮陽傘。" },
      { type: "mc", q: "Jetzt habe ich einen ___!", zh: "曬傷", options: ["Sonnenbrille", "Sonnenbrand"], answer: "Sonnenbrand", tip: "der Sonnenbrand 曬傷；die Sonnenbrille 太陽眼鏡。" },
      { type: "mc", q: "Meine ___ ist ganz rot!", zh: "皮膚紅了", options: ["Haut", "Liege"], answer: "Haut", tip: "die Haut 皮膚。" },
      { type: "mc", q: "Ich habe einen komischen ___ von meinem Bikini.", zh: "曬痕／印子", options: ["Muster", "Abdruck"], answer: "Abdruck", tip: "der Abdruck 印痕（曬出來的痕跡）。" },
      { type: "mc", q: "Ich muss sofort in den ___.", zh: "陰涼處", options: ["Auto", "Schatten"], answer: "Schatten", tip: "der Schatten 陰影／陰涼處。" },
    ],
  },

  {
    id: "hw-plusquamperfekt",
    level: "A2",
    emoji: "⏪",
    title: "過去完成式 · Plusquamperfekt",
    zh: "Grammatik: 過去之前的過去",
    desc: "Plusquamperfekt = hatte/war + 第二分詞，描述「比過去更早發生」的事。",
    exercises: [
      { type: "fill", q: "Partizip II von „einkaufen\"：", zh: "購物的第二分詞", answer: ["eingekauft"], tip: "ein·kaufen → eingekauft。" },
      { type: "fill", q: "Partizip II von „anrufen\"：", zh: "打電話的第二分詞", answer: ["angerufen"], tip: "an·rufen → angerufen。" },
      { type: "fill", q: "Partizip II von „bekommen\"：", zh: "得到的第二分詞", answer: ["bekommen"], tip: "bekommen 沒有 ge-（不可分前綴）。" },
      { type: "fill", q: "Meine Eltern ___ schon ihr Gepäck ins Haus ___.（hatten…bringen）", zh: "（先）把行李搬進屋（過去完成）", answer: ["hatten gebracht", "hatten … gebracht", "hatten...gebracht"], hint: "hatten + ge___t", tip: "hatten gebracht（搬運先於我到達）。" },
      { type: "fill", q: "Meine Schwester war gerade erst ___.（ankommen）", zh: "剛剛抵達（過去完成）", answer: ["angekommen"], tip: "war angekommen（ankommen 用 sein）。" },
      { type: "mc", q: "Nachdem Frau Schmied ihr Auto geparkt ___, ___ sie ins Büro.", zh: "停好車後她進辦公室", options: ["hatte … ging", "hat … geht", "war … ging"], answer: "hatte … ging", tip: "先發生用 Plusquamperfekt（hatte geparkt），後發生用 Präteritum（ging）。" },
    ],
  },

  {
    id: "hw-zeitarbeit",
    level: "A2",
    emoji: "💼",
    title: "派遣工作 · 克漏字",
    zh: "Zeitarbeit（仿 telc B1+ 題型）",
    desc: "在文章空格選出正確的詞，練習職場德語與連接詞。",
    exercises: [
      { type: "mc", q: "Manchmal ___ es Zeitarbeit, manche sagen Leiharbeit.", zh: "「叫做」用哪個動詞？", options: ["sagt", "heißt", "meint"], answer: "heißt", tip: "es heißt … = 它被稱為…。" },
      { type: "mc", q: "Egal, ___ es genannt wird …", zh: "「不管怎麼…」", options: ["wie", "wer", "ob"], answer: "wie", tip: "egal wie = 不管怎樣。" },
      { type: "mc", q: "Hilfsjobs ohne Aussicht auf ___.", zh: "沒有…的前景", options: ["Arbeit", "Geld", "Karriere"], answer: "Karriere", tip: "Aussicht auf Karriere = 升遷／職涯前景。" },
      { type: "mc", q: "Rund jeder zweite Zeitarbeitsjob ist eine einfache ___.", zh: "簡單的「工作活動」", options: ["Frist", "Tätigkeit", "Gelegenheit"], answer: "Tätigkeit", tip: "die Tätigkeit = 活動／工作內容。" },
      { type: "mc", q: "Die Einsätze beim Entleiher ___ oft zwei bis drei Monate.", zh: "「持續」用哪個？", options: ["haben", "machen", "dauern"], answer: "dauern", tip: "dauern = 持續（一段時間）。" },
      { type: "mc", q: "Akademiker verdienen ___ spezialisierte Fachleute oft mehr.", zh: "「作為…」", options: ["als", "für", "mit"], answer: "als", tip: "als = 作為／當作。" },
    ],
  },

  {
    id: "hw-signale",
    level: "A2",
    emoji: "💬",
    title: "對話訊號詞 · Im Gespräch",
    zh: "Interjektionen 感嘆／回應詞",
    desc: "口語中如何自然回應對方？選出最合適的訊號詞。",
    exercises: [
      { type: "mc", q: "— Mein Handy ist ins Wasser gefallen! — ___ Hoffentlich musst du kein neues kaufen!", zh: "表示同情／糟糕", options: ["Oh, oh!", "Ach so."], answer: "Oh, oh!", tip: "Oh, oh! 表示「糟了／不妙」。" },
      { type: "mc", q: "— Du musst drei Sekunden drücken. — ___ Jetzt habe ich es kapiert!", zh: "表示「懂了」", options: ["Aha.", "Na ja."], answer: "Aha.", tip: "Aha! = 原來如此／懂了。" },
      { type: "mc", q: "— Wollen wir kochen? — ___ gern!", zh: "表示同意（嗯）", options: ["Hm,", "Mhm,"], answer: "Mhm,", tip: "Mhm = 肯定的「嗯」（同意）。" },
      { type: "mc", q: "— Ich habe gelogen. Was mache ich nur? — ___ Ich weiß auch nicht …", zh: "表示為難", options: ["Tja …", "Aha."], answer: "Tja …", tip: "Tja … 表示「唉／這個嘛」（為難）。" },
      { type: "mc", q: "— Julia ruft mich heute an! — ___ Das glaube ich nicht.", zh: "表示懷疑", options: ["Oh, oh!", "Ach?!"], answer: "Ach?!", tip: "Ach?! 表示驚訝／懷疑。" },
      { type: "fill", q: "Ausdruck mit Zeit: „Kommt Zeit, kommt ___.\"", zh: "船到橋頭自然直", answer: ["Rat"], tip: "Kommt Zeit, kommt Rat = 時間到了辦法就有了。" },
      { type: "fill", q: "Die Zeit verging wie im ___.（時間過得飛快）", zh: "如…一般飛逝", answer: ["Flug"], tip: "wie im Flug = 像飛一樣（很快）。" },
    ],
  },

  {
    id: "hw-fernsehen",
    level: "A2",
    emoji: "📺",
    title: "fernsehen 還是 Fernsehen？",
    zh: "Keine Fehler mehr",
    desc: "der Fernseher（電視機）/ das Fernsehen（電視/節目）/ fernsehen（看電視・動詞）。",
    exercises: [
      { type: "fill", q: "Was kommt denn heute im ___?", zh: "電視上播什麼？", answer: ["Fernsehen"], tip: "im Fernsehen = 在電視（節目）上 → 名詞大寫。" },
      { type: "fill", q: "Oh nein, unser ___ ist kaputt!", zh: "我們的電視機壞了", answer: ["Fernseher"], tip: "der Fernseher = 電視機（會壞的那台機器）。" },
      { type: "mc", q: "Ich will heute Abend zu Hause bleiben und ___.", zh: "看電視（動詞）", options: ["fernsehen", "Fernsehen"], answer: "fernsehen", tip: "這裡是動詞「看電視」→ 小寫 fernsehen。" },
      { type: "mc", q: "Wir haben eine Sendung im ___ gesehen.", zh: "在電視上看了節目", options: ["fernsehen", "Fernsehen"], answer: "Fernsehen", tip: "im Fernsehen = 名詞 → 大寫。" },
      { type: "mc", q: "Mein Sohn will fast nie ___.", zh: "我兒子幾乎不看電視", options: ["fernsehen", "Fernsehen"], answer: "fernsehen", tip: "動詞 → 小寫 fernsehen。" },
    ],
  },

  {
    id: "hw-reduktionen",
    level: "A2",
    emoji: "🗯️",
    title: "口語縮讀 · Reduktionen",
    zh: "Deutsch im Alltag",
    desc: "德國人說話會把冠詞縮短：einem→’nem、eine→’ne、ist→is。",
    exercises: [
      { type: "fill", q: "Ich bin auf so ___ Platz.（einem 的口語縮讀）", zh: "einem 縮成？", answer: ["’nem", "'nem", "nem"], tip: "einem → ’nem。" },
      { type: "fill", q: "Hier ist ___ große Kirche.（eine 的口語縮讀）", zh: "eine 縮成？", answer: ["’ne", "'ne", "ne"], tip: "eine → ’ne。" },
      { type: "fill", q: "Das ___ das Rathaus?（ist 的口語縮讀）", zh: "ist 縮成？", answer: ["is"], tip: "ist → is。" },
      { type: "mc", q: "Ich hätte gern ___ Tasse Kaffee und ___ Tee.", zh: "一杯咖啡(陰)＋一杯茶(陽)", options: ["’ne … ’nen", "’nen … ’ne", "’ner … ’nen"], answer: "’ne … ’nen", tip: "eine Tasse→’ne；einen Tee→’nen。" },
    ],
  },

  {
    id: "hw-feiertage",
    level: "A2",
    emoji: "🎉",
    title: "節慶與假日 · Feste",
    zh: "Raten Sie mal!",
    desc: "認識德國重要節慶與紀念日的名稱。",
    exercises: [
      { type: "fill", q: "Kinder suchen Eier an ___.（找彩蛋的節日）", zh: "復活節", answer: ["Ostern"], tip: "Ostern 復活節。" },
      { type: "fill", q: "Die vier Wochen vor dem 24.12. heißen ___.", zh: "聖誕前四週", answer: ["Advent"], tip: "der Advent 將臨期。" },
      { type: "fill", q: "Der 31.12. ist ___.", zh: "跨年夜", answer: ["Silvester"], tip: "Silvester 除夕（12/31）。" },
      { type: "fill", q: "Der deutsche Nationalfeiertag ist der Tag der deutschen ___.", zh: "德國統一日", answer: ["Einheit"], tip: "Tag der deutschen Einheit（10/3）。" },
      { type: "fill", q: "Wenn ein Paar heiratet, feiert es ___.", zh: "婚禮", answer: ["Hochzeit"], tip: "die Hochzeit 婚禮。" },
      { type: "fill", q: "An diesem Tag im Mai werden alle Mütter gefeiert: der ___.", zh: "母親節", answer: ["Muttertag"], tip: "der Muttertag 母親節。" },
    ],
  },

  {
    id: "hw-geld",
    level: "A2",
    emoji: "💰",
    title: "和錢有關的慣用語 · Geld",
    zh: "Ausdrücke mit Geld",
    desc: "德語裡很多生動的金錢慣用語，學會讓你說話更道地。",
    exercises: [
      {
        type: "match",
        zh: "把慣用語和正確的意思連起來",
        left: ["zu Geld machen", "Geld zum Fenster hinauswerfen", "zu Geld kommen", "Geld wie Heu haben"],
        right: ["把…賣掉換錢", "亂花錢／浪費錢", "（突然）有錢了", "超級有錢"],
        pairs: { 0: 0, 1: 1, 2: 2, 3: 3 },
      },
      { type: "mc", q: "Mein Bruder ___, und kommt dann jeden Monat zu mir, weil er Geld braucht.", zh: "他亂花錢", options: ["hat Geld wie Heu", "wirft sein Geld zum Fenster hinaus", "ist zu Geld gekommen"], answer: "wirft sein Geld zum Fenster hinaus", tip: "亂花錢 → Geld zum Fenster hinauswerfen。" },
    ],
  },
];
