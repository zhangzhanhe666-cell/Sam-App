// ─────────────────────────────────────────────────────────────────────────────
// 課外閱讀（取材自 Deutsch perfekt 雜誌正刊文章：9/2020 + 8/2020）
// 每篇 = 一段改寫精簡的德語短文 + 閱讀理解題（依等級 A1/A2 拆解）
// 內容根據雜誌真實文章改寫精簡，問題自行設計，答案皆可在短文中找到
// 結構與 HOMEWORK 相同，可直接餵給 HomeworkRunner：
//   { id, level, emoji, title, zh, desc, passage, passageZh?, passageTitle?, exercises:[...] }
// 註：A2 篇章原文取自雜誌 MITTEL/SCHWER，已精簡改寫；標註「A2 以上同樣適用」，
//     B1/B2 學員可當作快速複習與聽力跟讀材料。
// ─────────────────────────────────────────────────────────────────────────────

export const READING_SOURCE = "Deutsch perfekt · 9/2020 + 8/2020（雜誌正刊）";

export const READINGS = [
  // ══════════════════════ A1（LEICHT）══════════════════════
  {
    id: "rd-palmen",
    level: "A1",
    emoji: "🌴",
    title: "棕櫚樹變成問題",
    zh: "Die Palmen sind ein Problem",
    desc: "瑞士提契諾州的棕櫚樹太多，反而成了生態問題。讀短文回答問題。",
    passageTitle: "Tessin: Die Palmen sind jetzt ein Problem",
    passage:
      "Die Chinesische Hanfpalme fühlt sich im Tessin in der Südschweiz sehr wohl. " +
      "In manchen Wäldern stehen rund 90 Prozent Hanfpalmen. Das ist ein Problem für die Natur, " +
      "denn es gibt dann weniger andere Pflanzen und Tiere. " +
      "Ein schottischer Gärtner hat die Palme 1843 nach Europa gebracht. " +
      "Heute steht sie in vielen Tessiner Gärten und produziert pro Jahr 10000 Samen. " +
      "Vögel transportieren die Samen dann in die Wälder. " +
      "Deshalb sollen die Gartenbesitzer die Blüten abschneiden, sagen die Behörden. " +
      "Aber die meisten Gartenfreunde finden das nicht so gut.",
    passageZh: "中國棕櫚在瑞士南部提契諾長得太好，佔了森林九成，威脅其他動植物。1843 年由蘇格蘭園丁帶進歐洲，現在每年產一萬顆種子，鳥把種子帶進森林。當局要求園主剪掉花，但園主大多不願意。",
    exercises: [
      { type: "mc", q: "Wo ist das Problem mit den Palmen?", zh: "棕櫚樹問題在哪裡？", options: ["im Tessin", "in Berlin", "in England"], answer: "im Tessin", tip: "文中說 im Tessin in der Südschweiz。" },
      { type: "mc", q: "Wer hat die Palme nach Europa gebracht?", zh: "誰把棕櫚帶進歐洲？", options: ["ein Gärtner", "ein Lehrer", "ein Vogel"], answer: "ein Gärtner", tip: "ein schottischer Gärtner（蘇格蘭園丁）。" },
      { type: "mc", q: "Wie viele Samen produziert eine Palme pro Jahr?", zh: "一棵棕櫚一年產多少種子？", options: ["10000", "1843", "90"], answer: "10000", tip: "pro Jahr 10000 Samen。" },
      { type: "fill", q: "Wer transportiert die Samen in die Wälder? — Die ___.", zh: "誰把種子帶進森林？", answer: ["Vögel", "Vogel"], tip: "Vögel transportieren die Samen。" },
      { type: "mc", q: "Was sollen die Gartenbesitzer machen?", zh: "園主該做什麼？", options: ["die Blüten abschneiden", "mehr Palmen pflanzen", "nichts machen"], answer: "die Blüten abschneiden", tip: "die Blüten abschneiden = 剪掉花。" },
    ],
  },

  {
    id: "rd-luchs",
    level: "A1",
    emoji: "🐱",
    title: "山貓回來了",
    zh: "Wildtiere: Wieder akzeptiert",
    desc: "德國哈茨山的山貓曾經消失，現在又回來了，而且大家喜歡牠。",
    passageTitle: "Wildtiere: Wieder akzeptiert",
    passage:
      "Der Luchs hat Angst vor Menschen. Beim Spazieren sieht ihn fast nie jemand. " +
      "In Deutschland hat man das Tier früher intensiv gejagt. " +
      "Am 17. März 1818 ist der letzte wilde Luchs im Harz gestorben. " +
      "Im Jahr 2000 haben Experten versucht, die Luchse wieder in die Bergregion zu bringen. " +
      "Sie haben drei Tiere ausgewildert. Das hat gut funktioniert: " +
      "Jetzt leben mindestens 55 Exemplare im Harz. Und die Menschen dort akzeptieren das. " +
      "Für sie sind die Luchse schon wie Maskottchen.",
    passageZh: "山貓怕人，散步時幾乎看不到。德國以前大量獵捕，1818 年最後一隻野生山貓在哈茨山死去。2000 年專家野放三隻，成效很好，現在至少有 55 隻，當地人把山貓當成吉祥物。",
    exercises: [
      { type: "mc", q: "Wovor hat der Luchs Angst?", zh: "山貓怕什麼？", options: ["vor Menschen", "vor Wasser", "vor Vögeln"], answer: "vor Menschen", tip: "Angst vor Menschen。" },
      { type: "mc", q: "Wann ist der letzte wilde Luchs im Harz gestorben?", zh: "最後一隻野生山貓何時死的？", options: ["1818", "2000", "1843"], answer: "1818", tip: "Am 17. März 1818。" },
      { type: "mc", q: "Wie viele Tiere haben die Experten ausgewildert?", zh: "專家野放了幾隻？", options: ["drei", "55", "zehn"], answer: "drei", tip: "Sie haben drei Tiere ausgewildert。" },
      { type: "fill", q: "Heute leben mindestens ___ Luchse im Harz.", zh: "現在哈茨山至少有幾隻山貓？", answer: ["55", "fünfundfünfzig"], tip: "mindestens 55 Exemplare。" },
      { type: "mc", q: "Wie finden die Menschen die Luchse heute?", zh: "現在人們怎麼看山貓？", options: ["wie Maskottchen", "gefährlich", "langweilig"], answer: "wie Maskottchen", tip: "schon wie Maskottchen（像吉祥物）。" },
    ],
  },

  {
    id: "rd-postkarte",
    level: "A1",
    emoji: "📮",
    title: "為什麼還寄明信片？",
    zh: "3 Fragen: Postkarten",
    desc: "出版社老闆談：在 WhatsApp 時代，為什麼人們還寄明信片？",
    passageTitle: "Es ist etwas Spezielles",
    passage:
      "Letztes Jahr hat der Verlag zwölf Millionen Postkarten verkauft. " +
      "Eine Postkarte zu bekommen, ist etwas Spezielles. " +
      "Sie ist heute oft die einzige handgeschriebene Nachricht im Briefkasten. " +
      "Die populärsten Motive sind immer Bilder von der See. " +
      "Acht von zehn verkauften Postkarten haben mehrere Bilder. " +
      "Aber eigentlich finden die meisten Leute: Eine Karte mit nur einem Bild ist schöner. " +
      "In der Corona-Krise gab es weniger Touristen. Deshalb konnte der Verlag fast keine Postkarten verkaufen.",
    passageZh: "去年出版社賣了一千兩百萬張明信片。收到明信片很特別，常是信箱裡唯一手寫的訊息。最受歡迎的圖案是海，十張裡有八張是多圖的，但其實多數人覺得單圖比較美。疫情遊客少，幾乎賣不出去。",
    exercises: [
      { type: "fill", q: "Letztes Jahr hat der Verlag ___ Millionen Postkarten verkauft.", zh: "去年賣了幾百萬張？", answer: ["zwölf", "12"], tip: "zwölf Millionen。" },
      { type: "mc", q: "Welche Motive sind am populärsten?", zh: "最受歡迎的圖案是？", options: ["Bilder von der See", "Bilder von Bergen", "Bilder von Städten"], answer: "Bilder von der See", tip: "immer Motive von der See。" },
      { type: "mc", q: "Welche Karte finden die meisten Leute schöner?", zh: "多數人覺得哪種比較美？", options: ["mit einem Bild", "mit mehreren Bildern", "ohne Bild"], answer: "mit einem Bild", tip: "eine Karte mit nur einem Bild ist schöner。" },
      { type: "mc", q: "Warum verkaufte der Verlag in der Corona-Krise wenig?", zh: "疫情期間為何賣得少？", options: ["weniger Touristen", "zu teuer", "keine Briefmarken"], answer: "weniger Touristen", tip: "weniger Touristen → 遊客少。" },
    ],
  },

  // ══════════════════════ A2（MITTEL / SCHWER 改寫）══════════════════════
  {
    id: "rd-tuer",
    level: "A2",
    emoji: "🚪",
    title: "一扇好門",
    zh: "Eine gute Tür",
    desc: "2019 年哈勒猶太會堂攻擊事件中，一扇木門救了裡面的人。讀短文回答（仿歌德 B1 閱讀）。",
    passageTitle: "Eine gute Tür (Reportage, gekürzt)",
    passage:
      "Im Oktober 2019 versuchte ein rechter Extremist, in die Synagoge von Halle zu kommen. " +
      "An diesem Tag war Jom Kippur, der wichtigste jüdische Feiertag, und viele Menschen waren drinnen. " +
      "Aber eine sechs Zentimeter dicke Tür aus Eichenholz blockierte seinen Weg. " +
      "Er schoss dreimal auf die Tür, doch sie öffnete sich nicht. " +
      "Gebaut hat die Tür der Tischler Thomas Thiele aus Dessau im Jahr 2010. " +
      "Damals war die Sicherheit gar nicht so wichtig – wichtiger war das Aussehen. " +
      "Von einem Attentäter redete niemand. Heute sagen manche Leute: Thiele ist ein Held. " +
      "Er selbst sagt aber nur: „Das ist keine Wundertür. Das ist eine stabile, gute Holztür.\"",
    passageZh: "2019 年 10 月，一名極右份子想闖進哈勒猶太會堂。那天是猶太最重要的節日贖罪日，裡面很多人。但一扇六公分厚的橡木門擋住了他，他朝門開了三槍門也沒開。這門是 2010 年木匠 Thomas Thiele 做的，當時重點是外觀而非安全，沒人想到攻擊者。現在有人稱他英雄，但他只說：這不是神奇的門，只是一扇穩固的好木門。",
    exercises: [
      { type: "mc", q: "Wann passierte der Angriff auf die Synagoge?", zh: "攻擊發生在何時？", options: ["im Oktober 2019", "im Jahr 2010", "im April"], answer: "im Oktober 2019", tip: "Im Oktober 2019。注意 2010 是「做門」的年份，是干擾項。" },
      { type: "mc", q: "Welcher Feiertag war an diesem Tag?", zh: "那天是什麼節日？", options: ["Jom Kippur", "Ostern", "Weihnachten"], answer: "Jom Kippur", tip: "Jom Kippur, der wichtigste jüdische Feiertag。" },
      { type: "mc", q: "Woraus ist die Tür gemacht?", zh: "門是什麼做的？", options: ["aus Eichenholz", "aus Metall", "aus Plastik"], answer: "aus Eichenholz", tip: "eine Tür aus Eichenholz（橡木）。" },
      { type: "mc", q: "Was war beim Bau der Tür 2010 am wichtigsten?", zh: "2010 年做門時最重要的是？", options: ["das Aussehen", "die Sicherheit", "der Preis"], answer: "das Aussehen", tip: "陷阱題！wichtiger war das Aussehen，安全當時反而不重要。" },
      { type: "mc", q: "Wie nennt Thiele selbst seine Tür?", zh: "Thiele 自己怎麼形容這門？", options: ["eine stabile, gute Holztür", "eine Wundertür", "eine Metalltür"], answer: "eine stabile, gute Holztür", tip: "他說「這不是神奇的門」，只是穩固的好木門。" },
      { type: "fill", q: "Der Tischler Thomas Thiele kommt aus ___.", zh: "木匠來自哪座城市？", answer: ["Dessau"], tip: "Thomas Thiele aus Dessau。" },
    ],
  },

  {
    id: "rd-briefmarke",
    level: "A2",
    emoji: "🕊️",
    title: "彩色郵票的先驅",
    zh: "Die Farb-Pioniere",
    desc: "175 年前，巴塞爾發行了全世界第一張彩色郵票「巴塞爾鴿」。",
    passageTitle: "Die Farb-Pioniere (gekürzt)",
    passage:
      "Am 1. Juli 1845 gab es in Basel zum ersten Mal die Briefmarke Basler Taube. " +
      "Sie zeigt eine weiße Taube auf rotem und blauem Hintergrund mit schwarzer Schrift. " +
      "Diese Farben sind eine kleine Sensation: Die Basler Taube ist die erste farbige Briefmarke der Welt. " +
      "Designt hat sie der Baseler Architekt Melchior Berri. " +
      "Erst fünf Jahre davor, 1840, ist die Briefmarke in England erfunden worden. " +
      "Die One Penny Black war die erste offizielle Briefmarke der Welt. " +
      "Mit der Briefmarke zahlt nun der Absender das Porto – nicht mehr der Empfänger wie früher.",
    passageZh: "1845 年 7 月 1 日，巴塞爾首次發行「巴塞爾鴿」郵票：白鴿配紅藍底、黑字。這些顏色是小轟動——它是全世界第一張彩色郵票，由建築師 Melchior Berri 設計。五年前的 1840 年，英國發明了郵票，「黑便士」是世界第一張官方郵票。有了郵票，改由寄件人付郵資，不再像以前由收件人付。",
    exercises: [
      { type: "mc", q: "Was ist die Basler Taube?", zh: "「巴塞爾鴿」是什麼？", options: ["die erste farbige Briefmarke", "die erste Briefmarke der Welt", "ein Vogel"], answer: "die erste farbige Briefmarke", tip: "陷阱！它是第一張「彩色」郵票；第一張「官方」郵票是英國的 One Penny Black。" },
      { type: "mc", q: "Wer hat die Basler Taube designt?", zh: "誰設計的？", options: ["Melchior Berri", "ein Engländer", "die Schweizer Post"], answer: "Melchior Berri", tip: "der Architekt Melchior Berri。" },
      { type: "mc", q: "Wo wurde die Briefmarke erfunden?", zh: "郵票在哪裡發明的？", options: ["in England", "in Basel", "in der Schweiz"], answer: "in England", tip: "1840 in England erfunden。" },
      { type: "fill", q: "Wie heißt die erste offizielle Briefmarke der Welt? — One ___ Black", zh: "世界第一張官方郵票叫？", answer: ["Penny"], tip: "One Penny Black。" },
      { type: "mc", q: "Wer zahlt mit der Briefmarke das Porto?", zh: "有了郵票誰付郵資？", options: ["der Absender", "der Empfänger", "die Post"], answer: "der Absender", tip: "陷阱！現在是寄件人(Absender)付，以前才是收件人(Empfänger)。" },
    ],
  },

  {
    id: "rd-kenia",
    level: "A2",
    emoji: "🌍",
    title: "肯亞學德語",
    zh: "Kenia lernt Deutsch",
    desc: "越來越多肯亞人學德語，因為德國作為留學與研究地越來越有吸引力。",
    passageTitle: "Deutsch global: Kenia lernt",
    passage:
      "Weltweit lernen 15,45 Millionen Menschen Deutsch als Fremdsprache. " +
      "Die meisten Deutschlernenden leben in Europa – nämlich 73 Prozent. " +
      "Aber auch in Kenia interessieren sich immer mehr Menschen für die Sprache. " +
      "Vor fünf Jahren haben dort fast 6000 Menschen Deutsch gelernt, heute sind es 13045. " +
      "Die Zahlen haben sich also mehr als verdoppelt. " +
      "Der Grund: Deutschland wird als Studien- und Wissenschaftsstandort für Kenianer immer interessanter. " +
      "Ein großes Problem bleibt aber: In dem Land fehlen Lehrer.",
    passageZh: "全球有 1545 萬人學德語，七成三在歐洲。但肯亞也越來越多人學：五年前約 6000 人，現在 13045 人，翻了一倍多。原因是德國作為留學與研究地越來越吸引肯亞人。但問題是：當地缺德語老師。",
    exercises: [
      { type: "mc", q: "Wo leben die meisten Deutschlernenden?", zh: "最多德語學習者住哪裡？", options: ["in Europa", "in Afrika", "in Asien"], answer: "in Europa", tip: "73 Prozent in Europa。" },
      { type: "mc", q: "Wie haben sich die Zahlen in Kenia verändert?", zh: "肯亞的人數怎麼變？", options: ["mehr als verdoppelt", "halbiert", "gleich geblieben"], answer: "mehr als verdoppelt", tip: "von ~6000 auf 13045 → 翻倍多。" },
      { type: "fill", q: "Heute lernen in Kenia ___ Menschen Deutsch.", zh: "現在肯亞有多少人學德語？", answer: ["13045"], tip: "heute sind es 13045。" },
      { type: "mc", q: "Warum lernen Kenianer Deutsch?", zh: "肯亞人為何學德語？", options: ["Deutschland als Studien- und Wissenschaftsstandort", "weil es leicht ist", "wegen des Wetters"], answer: "Deutschland als Studien- und Wissenschaftsstandort", tip: "德國作為留學/研究地有吸引力。" },
      { type: "mc", q: "Welches Problem gibt es in Kenia?", zh: "肯亞有什麼問題？", options: ["Es fehlen Lehrer", "Es gibt keine Schulen", "Niemand will lernen"], answer: "Es fehlen Lehrer", tip: "In dem Land fehlen Lehrer。" },
    ],
  },

  {
    id: "rd-strandkorb",
    level: "A2",
    emoji: "🏖️",
    title: "沙灘上的明星：沙灘椅",
    zh: "Die Stars vom Strand",
    desc: "沙灘椅幾乎只有德國有。它怎麼來的、為什麼這麼受歡迎？",
    passageTitle: "Strandkörbe: Die Stars vom Strand (gekürzt)",
    passage:
      "Strandkörbe gibt es fast nur in Deutschland, aber dort an fast allen Stränden. " +
      "Den ersten Strandkorb baute der Korbmacher Wilhelm Bartelmann 1882 in Rostock. " +
      "Eine ältere Dame mit Rheuma wollte ans Meer, aber sicher vor dem Wind sitzen. " +
      "Deshalb baute Bartelmann für sie einen speziellen Stuhl aus Weide. " +
      "Erst lachten die Leute über den Stuhl, dann bestellten sie selbst einen. " +
      "Heute ist der Strandkorb ein starkes Symbol für die Nord- und Ostsee. " +
      "Chef Dirk Mund erklärt: Man mietet nicht nur Schutz vor Wind und Sonne, " +
      "sondern ein Stück Privatsphäre. Die teuersten Modelle kosten bis zu 10000 Euro.",
    passageZh: "沙灘椅幾乎只有德國有，但德國海灘到處都是。第一張是 1882 年編籃師 Bartelmann 在羅斯托克做的：一位有風濕的老太太想去海邊又要擋風，他就用柳條做了特別的椅子。一開始大家笑，後來自己也訂。如今它是北海/波羅的海的象徵。老闆 Mund 說：租的不只是擋風遮陽，更是一塊私人空間。最貴的要價一萬歐元。",
    exercises: [
      { type: "mc", q: "Wo gibt es Strandkörbe fast nur?", zh: "沙灘椅幾乎只有哪裡有？", options: ["in Deutschland", "in England", "in Italien"], answer: "in Deutschland", tip: "fast nur in Deutschland。" },
      { type: "fill", q: "Den ersten Strandkorb baute man im Jahr ___.", zh: "第一張沙灘椅哪年做的？", answer: ["1882"], tip: "1882 in Rostock。" },
      { type: "mc", q: "Warum wollte die Dame einen speziellen Stuhl?", zh: "老太太為何要特別的椅子？", options: ["sicher vor dem Wind sitzen", "besser schlafen", "mehr Sonne bekommen"], answer: "sicher vor dem Wind sitzen", tip: "她想擋風（vor dem Wind）。" },
      { type: "mc", q: "Wie reagierten die Leute zuerst auf den Stuhl?", zh: "人們一開始的反應？", options: ["Sie lachten", "Sie kauften sofort", "Sie waren ärgerlich"], answer: "Sie lachten", tip: "Erst lachten die Leute。" },
      { type: "mc", q: "Was mietet man laut Dirk Mund wirklich?", zh: "Mund 說租的其實是？", options: ["ein Stück Privatsphäre", "nur einen Stuhl", "ein Boot"], answer: "ein Stück Privatsphäre", tip: "ein Stück Privatsphäre（私人空間）。" },
      { type: "fill", q: "Die teuersten Modelle kosten bis zu ___ Euro.", zh: "最貴的多少歐元？", answer: ["10000", "zehntausend"], tip: "bis zu 10000 Euro。" },
    ],
  },

  {
    id: "rd-neologismen",
    level: "A2",
    emoji: "🦠",
    title: "你會說「Corona 語」嗎？",
    zh: "Sprechen Sie Corona?",
    desc: "疫情帶來許多新詞。語言學家解釋哪些詞會留下、哪些會消失。",
    passageTitle: "Neologismen: Sprechen Sie Corona? (gekürzt)",
    passage:
      "Die Corona-Krise hat viele neue Wörter gebracht. " +
      "Das Institut für Deutsche Sprache in Mannheim sammelt diese Neologismen. " +
      "Annette Klosa-Kückelhaus sagt: „Wir finden fast jeden Tag neue Wörter.\" " +
      "Ein Beispiel ist die Corona-Frisur: ein Haarschnitt, der während der geschlossenen " +
      "Friseurläden zu lang geworden ist. Ein anderes Wort sind die Corona-Kilos – " +
      "also das Körpergewicht, das man durch zu wenig Bewegung zugenommen hat. " +
      "Diese beiden Wörter bleiben aber wahrscheinlich nicht. " +
      "Denn die Friseure haben bald wieder geöffnet, und ein paar Kilos sind auch schnell wieder weg.",
    passageZh: "疫情帶來許多新詞。曼海姆的德語研究所收集這些新詞，研究員說「我們幾乎每天找到新詞」。例如 Corona-Frisur（理髮店關門期間變太長的髮型）、Corona-Kilos（因少運動而增加的體重）。但這兩個詞大概留不住，因為理髮店很快又開了，幾公斤也很快又掉了。",
    exercises: [
      { type: "mc", q: "Was sammelt das Institut in Mannheim?", zh: "曼海姆研究所收集什麼？", options: ["Neologismen", "Briefmarken", "Bücher"], answer: "Neologismen", tip: "Neologismen = 新詞。" },
      { type: "mc", q: "Was bedeutet „Corona-Frisur\"?", zh: "Corona-Frisur 是什麼意思？", options: ["ein zu lang gewordener Haarschnitt", "eine neue Maske", "ein Virus"], answer: "ein zu lang gewordener Haarschnitt", tip: "理髮店關門→頭髮變太長。" },
      { type: "mc", q: "Wodurch entstehen die „Corona-Kilos\"?", zh: "Corona-Kilos 怎麼來的？", options: ["durch zu wenig Bewegung", "durch zu viel Sport", "durch Friseurbesuche"], answer: "durch zu wenig Bewegung", tip: "少運動 → 增重。" },
      { type: "mc", q: "Bleiben diese beiden Wörter wahrscheinlich?", zh: "這兩個詞大概會留下嗎？", options: ["Nein", "Ja", "Der Text sagt nichts dazu"], answer: "Nein", tip: "陷阱！文中說 bleiben aber wahrscheinlich nicht（大概留不住）。" },
    ],
  },

  // ══════════════════════ 8/2020 新增 · A1（LEICHT）══════════════════════
  {
    id: "rd-brieftraeger",
    level: "A1",
    emoji: "📬",
    title: "郵差怎麼稱呼？",
    zh: "Atlas: Briefträger",
    desc: "同一個職業，德語區有好幾種說法。讀短文，認識德國日常語言地圖。",
    src: "Deutsch perfekt · 8/2020",
    passageTitle: "Wo spricht man wie? Briefträger",
    passage:
      "Seine Aufgabe ist klar: Er bringt den Menschen die Post. " +
      "Dafür fährt er mit dem Fahrrad, mit dem Auto oder geht zu Fuß. " +
      "Für sehr viele Deutsche heißt er Briefträger. " +
      "Auch in Österreich und der Schweiz ist das die häufigste Variante. " +
      "Aber es gibt noch ein anderes Wort: Viele Deutsche bekommen ihre Post vom Postboten. " +
      "Ein Bote ist eine Person, die etwas für jemand anderen transportiert. " +
      "Im Nordwesten und in Bayern ist Postbote sogar populärer als Briefträger. " +
      "Es ist also egal: Fast jeder versteht beide Wörter.",
    passageZh: "郵差的工作很清楚：把信送到每個人手上，靠腳踏車、汽車或走路。多數德國人叫他 Briefträger，奧地利和瑞士也最常這樣說。但還有一個詞：很多德國人說 Postbote（Bote 是替別人運送東西的人）。在西北部和巴伐利亞，Postbote 甚至比 Briefträger 更常用。其實怎麼說都行，幾乎每個人兩個詞都懂。",
    exercises: [
      { type: "mc", q: "Was ist die Aufgabe vom Briefträger?", zh: "郵差的工作是什麼？", options: ["die Post bringen", "Brot backen", "Autos reparieren"], answer: "die Post bringen", tip: "Er bringt den Menschen die Post。" },
      { type: "mc", q: "Welches Wort benutzen die meisten Deutschen?", zh: "多數德國人用哪個詞？", options: ["Briefträger", "Postler", "Pöstler"], answer: "Briefträger", tip: "Für sehr viele Deutsche heißt er Briefträger。" },
      { type: "fill", q: "Viele Deutsche bekommen ihre Post auch vom ___.", zh: "很多德國人的信來自？", answer: ["Postboten", "Postbote"], tip: "vom Postboten。" },
      { type: "mc", q: "Was ist ein „Bote\"?", zh: "Bote 是什麼？", options: ["eine Person, die etwas transportiert", "ein Tier", "ein Auto"], answer: "eine Person, die etwas transportiert", tip: "Bote = 替人運送東西的人。" },
      { type: "mc", q: "Wo ist „Postbote\" populärer?", zh: "哪裡更常說 Postbote？", options: ["im Nordwesten und in Bayern", "nur in der Schweiz", "nur in Berlin"], answer: "im Nordwesten und in Bayern", tip: "Im Nordwesten und in Bayern populärer。" },
    ],
  },

  {
    id: "rd-bienen",
    level: "A1",
    emoji: "🐝",
    title: "別怕蜜蜂！",
    zh: "3 Fragen: Bienen",
    desc: "捕蜂人說：蜜蜂其實很溫和。讀短文，學動物與自然的字。",
    src: "Deutsch perfekt · 8/2020",
    passageTitle: "Keine Angst haben (Interview, gekürzt)",
    passage:
      "Arezki Keddam ist Schwarmfänger. Wenn ein Bienenschwarm an einem Haus ist, kann man ihn anrufen. " +
      "Viele Menschen haben Angst vor Bienen, weil sie stechen können. " +
      "Aber Keddam sagt: Bienen sind sehr friedlich, wenn man sie nicht stört. " +
      "Er nimmt die Bienen mit einem Korb und gibt ihnen ein neues Zuhause. " +
      "Wenn er Glück hat, ist die Königin im Korb. Dann kommen die anderen Bienen automatisch. " +
      "Den Kindern sagt er immer: Habt keine Angst vor Bienen!",
    passageZh: "Arezki Keddam 是捕蜂人。房子旁有蜂群時可以打電話找他。很多人怕蜜蜂，因為會螫人。但他說：只要不打擾，蜜蜂其實很溫和。他用一個籃子把蜜蜂帶走，給牠們新家。運氣好的話蜂后在籃子裡，其他蜜蜂就會自動跟過來。他總是對小朋友說：別怕蜜蜂！",
    exercises: [
      { type: "mc", q: "Was ist Herr Keddams Beruf?", zh: "Keddam 的職業是？", options: ["Schwarmfänger", "Lehrer", "Bäcker"], answer: "Schwarmfänger", tip: "Schwarmfänger = 捕蜂人。" },
      { type: "mc", q: "Warum haben viele Menschen Angst vor Bienen?", zh: "為什麼很多人怕蜜蜂？", options: ["weil sie stechen können", "weil sie groß sind", "weil sie laut sind"], answer: "weil sie stechen können", tip: "weil sie stechen können（會螫人）。" },
      { type: "mc", q: "Wie sind Bienen laut Keddam?", zh: "Keddam 說蜜蜂怎麼樣？", options: ["sehr friedlich", "sehr gefährlich", "immer böse"], answer: "sehr friedlich", tip: "sehr friedlich, wenn man sie nicht stört。" },
      { type: "fill", q: "Keddam nimmt die Bienen mit einem ___.", zh: "他用什麼把蜜蜂帶走？", answer: ["Korb"], tip: "mit einem Korb。" },
      { type: "mc", q: "Was sagt er den Kindern?", zh: "他對孩子說什麼？", options: ["Habt keine Angst vor Bienen", "Lauft weg", "Fasst die Bienen an"], answer: "Habt keine Angst vor Bienen", tip: "Habt keine Angst vor Bienen!" },
    ],
  },

  {
    id: "rd-warteliste",
    level: "A1",
    emoji: "⏳",
    title: "虛擬排隊，省時間",
    zh: "Start-up: Virtuell warten",
    desc: "一個新創團隊做了「線上候位」App，讓你不用在門口等。讀短文認識日常科技用語。",
    src: "Deutsch perfekt · 8/2020",
    passageTitle: "Virtuell warten – und Zeit sparen (gekürzt)",
    passage:
      "Vor einem vollen Restaurant warten – das macht niemandem Spaß. " +
      "Das Start-up Atodo aus Flensburg hat eine Lösung gefunden: eine digitale Warteliste. " +
      "Ein Gast trägt sich vor Ort ein und kann dann zum Beispiel einkaufen gehen. " +
      "Wenn ein Tisch frei wird, bekommt er automatisch eine Nachricht auf sein Handy. " +
      "Eine App braucht man dafür nicht: Alles funktioniert über den Browser. " +
      "In der Corona-Krise hatte das Team eine zweite Idee: Auch Patienten in Arztpraxen " +
      "müssen so nicht mehr im Wartezimmer warten. Das reduziert das Risiko einer Ansteckung.",
    passageZh: "在客滿的餐廳門口等，沒人喜歡。Flensburg 的新創 Atodo 想到辦法：線上候位。客人在現場登記，就能先去逛街；有空桌時手機自動收到通知。不用下載 App，瀏覽器就能用。疫情期間團隊又想到第二個用途：診所病人也不必擠在候診室，降低感染風險。",
    exercises: [
      { type: "mc", q: "Was macht niemandem Spaß?", zh: "什麼事沒人喜歡？", options: ["vor einem vollen Restaurant warten", "einkaufen gehen", "Musik hören"], answer: "vor einem vollen Restaurant warten", tip: "vor einem vollen Restaurant warten。" },
      { type: "fill", q: "Das Start-up Atodo kommt aus ___.", zh: "Atodo 來自哪座城市？", answer: ["Flensburg"], tip: "Atodo aus Flensburg。" },
      { type: "mc", q: "Wie bekommt der Gast die Nachricht?", zh: "客人怎麼收到通知？", options: ["auf sein Handy", "per Brief", "vom Kellner persönlich"], answer: "auf sein Handy", tip: "eine Nachricht auf sein Handy。" },
      { type: "mc", q: "Braucht man eine App?", zh: "需要下載 App 嗎？", options: ["Nein, nur den Browser", "Ja, eine spezielle App", "Ja, zwei Apps"], answer: "Nein, nur den Browser", tip: "Alles funktioniert über den Browser。" },
      { type: "mc", q: "Was war die zweite Idee in der Corona-Krise?", zh: "疫情期間的第二個點子？", options: ["Patienten müssen nicht im Wartezimmer warten", "Restaurants schließen", "mehr Tische kaufen"], answer: "Patienten müssen nicht im Wartezimmer warten", tip: "Patienten in Arztpraxen → 不必在候診室等。" },
    ],
  },

  // ══════════════════════ 8/2020 新增 · A2（MITTEL / SCHWER 改寫）══════════════════════
  {
    id: "rd-tuffi",
    level: "A2",
    emoji: "🐘",
    title: "大象跳出懸吊列車",
    zh: "Geschichte: Tuffi",
    desc: "1950 年，一頭小象在伍珀塔爾從懸吊列車跳進河裡。改寫自雜誌 MITTEL 文章。",
    note: "A2 以上同樣適用：原文為雜誌 MITTEL 難度，B1/B2 學員可當作聽力跟讀與快速複習。",
    src: "Deutsch perfekt · 8/2020",
    passageTitle: "Tuffi will raus (gekürzt)",
    passage:
      "Tuffi ist eine kleine Elefantenkuh und gehört dem Zirkus Althoff. " +
      "Sie ist der Star jeder Marketingaktion. Am 21. Juli 1950 soll sie etwas ganz Spezielles machen: " +
      "Tuffi fährt mit der berühmten Schwebebahn in Wuppertal – das ist eine Bahn, die an Schienen hängt. " +
      "Im Waggon sind viele Menschen und Journalisten. Aber nach wenigen Sekunden bekommt Tuffi Panik. " +
      "Sie läuft gegen die Wand, das Fenster zerbricht – und der Elefant fällt zehn Meter nach unten in den Fluss. " +
      "Tuffi hat großes Glück: Sie landet im Schlamm und ist nur am Hinterteil ein bisschen verletzt. " +
      "Noch am selben Abend tritt sie wieder im Zirkus auf. Bis heute ist Tuffi ein Symbol der Stadt Wuppertal.",
    passageZh: "Tuffi 是一頭小母象，屬於 Althoff 馬戲團，是每場行銷活動的明星。1950 年 7 月 21 日她要做件很特別的事：搭伍珀塔爾著名的「懸吊列車」（掛在軌道上的車廂）。車廂裡擠滿了人和記者。但幾秒後 Tuffi 嚇壞了，撞向牆壁、撞破窗戶，從十公尺高摔進河裡。牠運氣很好，落在爛泥裡，只有屁股輕傷。當天晚上就又上台表演。至今 Tuffi 仍是伍珀塔爾的城市象徵。",
    exercises: [
      { type: "mc", q: "Was für ein Tier ist Tuffi?", zh: "Tuffi 是什麼動物？", options: ["eine Elefantenkuh", "ein Hund", "ein Vogel"], answer: "eine Elefantenkuh", tip: "eine kleine Elefantenkuh。" },
      { type: "mc", q: "Womit soll Tuffi fahren?", zh: "Tuffi 要搭什麼？", options: ["mit der Schwebebahn", "mit dem Bus", "mit dem Schiff"], answer: "mit der Schwebebahn", tip: "mit der berühmten Schwebebahn in Wuppertal。" },
      { type: "fill", q: "Tuffi fällt ___ Meter nach unten in den Fluss.", zh: "Tuffi 摔下幾公尺？", answer: ["zehn", "10"], tip: "zehn Meter nach unten。" },
      { type: "mc", q: "Warum ist Tuffi nicht schwer verletzt?", zh: "為什麼 Tuffi 沒重傷？", options: ["Sie landet im Schlamm", "Sie kann fliegen", "Das Wasser ist tief"], answer: "Sie landet im Schlamm", tip: "Sie landet im Schlamm（落在爛泥裡）。" },
      { type: "mc", q: "Was ist Tuffi bis heute?", zh: "Tuffi 至今是什麼？", options: ["ein Symbol der Stadt Wuppertal", "ein Zootier in Berlin", "vergessen"], answer: "ein Symbol der Stadt Wuppertal", tip: "ein Symbol der Stadt Wuppertal。" },
    ],
  },

  {
    id: "rd-kaese",
    level: "A2",
    emoji: "🧀",
    title: "世界級的起司職人",
    zh: "Essen: Was für ein Käse!",
    desc: "瑞士 Willi Schmid 用生乳做起司，賣到全世界頂級餐廳。改寫自雜誌 SCHWER 文章。",
    note: "A2 以上同樣適用：原文為雜誌 SCHWER 難度，B1/B2 學員可當作聽力跟讀與生詞擴充。",
    src: "Deutsch perfekt · 8/2020",
    passageTitle: "Was für ein Käse! (gekürzt)",
    passage:
      "Willi Schmid lebt in der Schweizer Region Toggenburg und macht Käse. " +
      "Aber nicht irgendeinen Käse: Manche finden, er ist der beste Käser der Schweiz. " +
      "Seinen Käse kann man auf allen Kontinenten essen – in den besten Hotels und Restaurants der Welt. " +
      "Schmid benutzt nur Rohmilch und macht alles von Hand. " +
      "Sein Arbeitstag beginnt um fünf Uhr in der Früh. " +
      "Er kennt jede Wiese und jede Kuh im Tal, denn die Milch ist das Wichtigste. " +
      "„Meine Emotionen soll man im Käse schmecken\", sagt er. " +
      "Im Jahr macht er 100 Tonnen Käse – und probiert immer wieder neue Sorten.",
    passageZh: "Willi Schmid 住在瑞士 Toggenburg 地區，做起司。但不是普通起司：有人認為他是全瑞士最厲害的起司師。他的起司在各大洲都吃得到——世界最好的飯店和餐廳。他只用生乳、全程手工，工作日清晨五點開始。他熟悉山谷裡每片草地、每頭牛，因為牛奶最關鍵。他說：「我的情感要能在起司裡嚐得到。」一年做 100 噸起司，還不斷嘗試新口味。",
    exercises: [
      { type: "mc", q: "Wo lebt Willi Schmid?", zh: "Willi Schmid 住哪裡？", options: ["im Toggenburg", "in Berlin", "in Wien"], answer: "im Toggenburg", tip: "in der Schweizer Region Toggenburg。" },
      { type: "mc", q: "Welche Milch benutzt er?", zh: "他用哪種牛奶？", options: ["nur Rohmilch", "pasteurisierte Milch", "Pulvermilch"], answer: "nur Rohmilch", tip: "Schmid benutzt nur Rohmilch。" },
      { type: "fill", q: "Sein Arbeitstag beginnt um ___ Uhr in der Früh.", zh: "他幾點開始工作？", answer: ["fünf", "5"], tip: "um fünf Uhr in der Früh。" },
      { type: "mc", q: "Was ist für guten Käse das Wichtigste?", zh: "好起司最關鍵的是？", options: ["die Milch", "die Maschine", "der Preis"], answer: "die Milch", tip: "die Milch ist das Wichtigste。" },
      { type: "fill", q: "Im Jahr macht Schmid ___ Tonnen Käse.", zh: "他一年做幾噸起司？", answer: ["100", "hundert"], tip: "100 Tonnen Käse im Jahr。" },
    ],
  },

  {
    id: "rd-vollpension",
    level: "A2",
    emoji: "👵",
    title: "奶奶做的最好吃",
    zh: "Café Vollpension",
    desc: "維也納一家咖啡館請阿嬤們用家傳食譜烘焙，還對抗老年貧窮。改寫自雜誌 LEICHT/MITTEL 文章。",
    note: "A2 以上同樣適用：可當作 B1 口說「描述一個地方／社會議題」的素材與跟讀練習。",
    src: "Deutsch perfekt · 8/2020",
    passageTitle: "Oma macht den Besten (gekürzt)",
    passage:
      "Im Café Vollpension in Wien backen Seniorinnen und Senioren mit alten Familienrezepten. " +
      "Die Hälfte des Teams hat schon das Rentenalter erreicht. " +
      "Das Café hat einen sozialen Zweck: Es bringt verschiedene Generationen zusammen " +
      "und tut etwas gegen Altersarmut. Deshalb der Name Vollpension – " +
      "in Österreich heißt die oft niedrige Rente Pension. " +
      "Wegen Corona musste das Café eine Pause machen. " +
      "Durch eine Crowdfunding-Aktion konnte es 80000 Euro sammeln. " +
      "So bekamen auch in dieser Zeit viele Senioren ihr Geld. " +
      "Seit Juni ist das Café wieder offen – als „Halbpension\" mit der Hälfte der Tische.",
    passageZh: "維也納的 Vollpension 咖啡館，由長者用家傳食譜烘焙，團隊有一半已到退休年齡。咖啡館有社會目的：把不同世代聚在一起，並對抗老年貧窮。名字 Vollpension（全膳宿）就是雙關——奧地利把常常偏低的退休金叫 Pension。疫情期間咖啡館被迫暫停，靠群眾募資募到八萬歐元，讓長者在這段期間仍有收入。六月起重新營業，改名「Halbpension（半膳宿）」，桌數減半。",
    exercises: [
      { type: "mc", q: "Wer backt im Café Vollpension?", zh: "誰在 Vollpension 烘焙？", options: ["Seniorinnen und Senioren", "Kinder", "Roboter"], answer: "Seniorinnen und Senioren", tip: "Seniorinnen und Senioren mit Familienrezepten。" },
      { type: "mc", q: "Was tut das Café gegen ein Problem?", zh: "咖啡館對抗什麼問題？", options: ["Altersarmut", "Verkehr", "Klimawandel"], answer: "Altersarmut", tip: "etwas gegen Altersarmut tun。" },
      { type: "fill", q: "Durch Crowdfunding sammelte das Café ___ Euro.", zh: "募資募到多少歐元？", answer: ["80000", "achtzigtausend"], tip: "80000 Euro。" },
      { type: "mc", q: "Was bedeutet „Pension\" in Österreich?", zh: "在奧地利 Pension 指什麼？", options: ["die Rente", "ein Hotel", "ein Auto"], answer: "die Rente", tip: "in Österreich = die (oft niedrige) Rente。" },
      { type: "mc", q: "Wie heißt das Café seit Juni?", zh: "六月起咖啡館叫什麼？", options: ["Halbpension", "Vollpension Plus", "Neupension"], answer: "Halbpension", tip: "als „Halbpension\" mit der Hälfte der Tische。" },
    ],
  },
];
