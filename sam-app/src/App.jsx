import { useState, useRef, useEffect, useMemo } from "react";

// ─── COLOUR TOKENS ────────────────────────────────────────────────────────────
const C = {
  purple: "#7C3AED", pink: "#FF6B9D", blue: "#3B82F6",
  green: "#10B981", amber: "#F59E0B", red: "#EF4444",
  soft: "#F5F0FF", white: "#ffffff",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const DAILY_QUOTES = [
  { de: "Aller Anfang ist schwer.", zh: "萬事起頭難。", note: "德國諺語・學語言最難就是開始，你已經跨出來了！" },
  { de: "Übung macht den Meister.", zh: "熟能生巧。", note: "每天練一點，你會越來越強。" },
  { de: "Wer rastet, der rostet.", zh: "不進則退。", note: "今天也來學一句德語吧！" },
  { de: "Schritt für Schritt.", zh: "一步一步來。", note: "不急，穩穩前進就好。" },
  { de: "Morgenstund hat Gold im Mund.", zh: "早起的鳥兒有蟲吃。", note: "早晨是學習的黃金時間。" },
  { de: "Ohne Fleiß kein Preis.", zh: "沒有付出就沒有收穫。", note: "你的努力一定會有回報。" },
  { de: "Gut Ding will Weile haben.", zh: "好事多磨。", note: "學德語是場馬拉松，慢慢來。" },
  { de: "Wer Deutsch lernt, gewinnt eine neue Welt.", zh: "學德語，贏得一個新世界。", note: "語言是通往新文化的鑰匙。" },
  { de: "Jeden Tag ein bisschen besser.", zh: "每天進步一點點。", note: "累積的力量很驚人！" },
  { de: "Fehler sind die besten Lehrer.", zh: "錯誤是最好的老師。", note: "答錯沒關係，那是進步的開始。" },
  { de: "Du schaffst das!", zh: "你做得到！", note: "相信自己，你比想像中更厲害。" },
  { de: "Heute ist ein guter Tag zum Lernen.", zh: "今天是學習的好日子。", note: "打開 app 的你，已經很棒了。" },
  { de: "Lernen ist wie Schwimmen gegen den Strom.", zh: "學習如逆水行舟。", note: "停下來就會後退，繼續加油！" },
  { de: "Wer fragt, ist ein Narr für eine Minute. Wer nicht fragt, bleibt ein Narr.", zh: "問問題只笨一時，不問則笨一世。", note: "上課多發問，老師最愛！" },
  { de: "Kleine Schritte führen zum Ziel.", zh: "小步也能到達目標。", note: "Goethe-Zertifikat 就在前方！" },
];


// 長篇聽力（仿 A2 真實題型：聽一整段，回答多題）。全原創，不抄任何教材。
const LISTENING_LONG = [
  {
    id: "ll1", level: "A2.1", title: "電話留言：取消約會", emoji: "📞",
    source: "仿歌德 A2 聽力・原創長篇（參考真實題型結構）",
    intro: "你會聽到一段電話留言。請聽完整段，再回答下面 3 題。",
    tts: "Hallo Markus, hier ist Lena. Ich rufe an, weil wir uns ja morgen um sechs im Café treffen wollten. Leider muss ich absagen, denn ich habe morgen doch einen Termin beim Arzt. Können wir vielleicht auf Freitag verschieben? Am Freitag hätte ich ab vier Uhr Zeit. Und noch etwas: Bring bitte das Buch mit, das ich dir letzte Woche geliehen habe. Ich brauche es für die Uni. Ruf mich einfach kurz zurück. Bis dann, tschüss!",
    ttsZh: "哈囉 Markus，我是 Lena。我打來是因為我們本來明天六點要在咖啡廳見面。可惜我得取消，因為我明天臨時有醫生的預約。我們可以改到週五嗎？週五我四點以後有空。還有一件事：請把上週借你的那本書帶來，我大學要用。回我個電話就好。再見，掰掰！",
    questions: [
      { q: "Warum sagt Lena das Treffen ab?", qZh: "Lena 為什麼取消約會？", options: ["Sie ist krank", "Sie hat einen Arzttermin", "Sie hat keine Zeit am Wochenende", "Sie hat das Café vergessen"], answer: "Sie hat einen Arzttermin", trap: "陷阱:她說 doch einen Termin beim Arzt(臨時有醫生預約),不是自己生病" },
      { q: "Wann möchte Lena sich neu treffen?", qZh: "Lena 想改到何時？", options: ["Morgen um sechs", "Freitag ab vier", "Freitag um sechs", "Donnerstag"], answer: "Freitag ab vier", trap: "陷阱:六點是原本明天的時間;新時間是週五四點以後(ab vier)" },
      { q: "Was soll Markus mitbringen?", qZh: "Markus 該帶什麼？", options: ["Ein Geschenk", "Das geliehene Buch", "Kaffee", "Ihren Laptop"], answer: "Das geliehene Buch", trap: "陷阱:是『上週借他的那本書』,不是其他東西" },
    ]
  },
  {
    id: "ll2", level: "A2.1", title: "廣播通知：火車誤點", emoji: "🚉",
    source: "仿歌德 A2 聽力・原創長篇（參考真實題型結構）",
    intro: "你會聽到車站的廣播。請聽完整段，再回答下面 3 題。",
    tts: "Sehr geehrte Fahrgäste, wir informieren Sie über eine Änderung. Der Zug nach München, Abfahrt eigentlich um vierzehn Uhr zwanzig, hat heute leider Verspätung. Der Zug fährt nicht von Gleis drei, sondern von Gleis sieben ab. Die neue Abfahrtszeit ist vierzehn Uhr fünfzig. Der Grund ist ein technisches Problem. Reisende mit Anschlusszügen wenden Sie sich bitte an den Informationsschalter in der Halle. Wir danken für Ihr Verständnis.",
    ttsZh: "各位旅客您好，我們通知您一項變更。原訂十四點二十分發車、開往慕尼黑的列車，今天很抱歉誤點。列車不從三號月台發車，而是改從七號月台。新的發車時間是十四點五十分。原因是技術問題。需要轉乘的旅客請洽大廳的服務台。感謝您的諒解。",
    questions: [
      { q: "Wohin fährt der Zug?", qZh: "列車開往哪裡？", options: ["Berlin", "München", "Hamburg", "Köln"], answer: "München", trap: "直接資訊,但要在長段落中抓到" },
      { q: "Von welchem Gleis fährt der Zug jetzt ab?", qZh: "列車現在從幾號月台發車？", options: ["Gleis 3", "Gleis 7", "Gleis 14", "Gleis 50"], answer: "Gleis 7", trap: "陷阱:nicht von Gleis drei, sondern Gleis sieben(三號被否定,改七號)" },
      { q: "Wann fährt der Zug jetzt ab?", qZh: "列車現在幾點發車？", options: ["14:20", "14:50", "15:00", "14:15"], answer: "14:50", trap: "陷阱:14:20是原訂(eigentlich),新時間14:50" },
    ]
  },
  {
    id: "ll3", level: "A2.2", title: "對話：週末計畫", emoji: "🗓️",
    source: "仿歌德 A2 聽力・原創長篇（參考真實題型結構）",
    intro: "你會聽到 Tom 和 Anna 的對話。請聽完整段，再回答下面 4 題。",
    tts: "Tom: Anna, hast du am Wochenende schon etwas vor? Anna: Eigentlich wollte ich am Samstag wandern gehen, aber das Wetter soll schlecht werden. Tom: Ja, ich habe auch gehört, dass es regnen soll. Wollen wir stattdessen ins Museum gehen? Anna: Gute Idee! Aber nicht am Samstag, da muss ich arbeiten. Geht es bei dir am Sonntag? Tom: Sonntag passt mir gut. Treffen wir uns um elf? Anna: Elf ist mir ein bisschen früh. Sagen wir lieber halb eins, dann können wir danach zusammen Mittag essen. Tom: Perfekt, dann bis Sonntag um halb eins!",
    ttsZh: "Tom：Anna，你週末有計畫了嗎？Anna：我本來想週六去健行，但天氣好像會變差。Tom：對，我也聽說會下雨。我們改去博物館好嗎？Anna：好主意！但別週六，我那天要上班。你週日可以嗎？Tom：週日我可以。我們十一點見？Anna：十一點對我有點早。不如說十二點半，這樣之後我們可以一起吃午餐。Tom：完美，那週日十二點半見！",
    questions: [
      { q: "Was wollte Anna ursprünglich am Samstag machen?", qZh: "Anna 原本週六想做什麼？", options: ["Ins Museum gehen", "Wandern gehen", "Arbeiten", "Mittag essen"], answer: "Wandern gehen", trap: "陷阱:eigentlich wollte ich wandern(原本想健行),但因天氣放棄" },
      { q: "Warum gehen sie nicht wandern?", qZh: "他們為什麼不去健行？", options: ["Anna muss arbeiten", "Das Wetter wird schlecht", "Tom hat keine Zeit", "Es ist zu teuer"], answer: "Das Wetter wird schlecht", trap: "陷阱:健行取消是因為天氣(soll schlecht werden),週六上班是『不能週六去博物館』的原因" },
      { q: "An welchem Tag treffen sie sich?", qZh: "他們哪天見面？", options: ["Samstag", "Sonntag", "Freitag", "Montag"], answer: "Sonntag", trap: "陷阱:Samstag Anna要上班,改週日" },
      { q: "Um wie viel Uhr treffen sie sich?", qZh: "他們幾點見面？", options: ["11:00", "12:30", "13:00", "11:30"], answer: "12:30", trap: "陷阱:11點被嫌太早,改 halb eins(12:30)" },
    ]
  },
];

const LISTENING_TOPICS = [
  {
    id: "lt1", level: "A1.1", topic: "數字陷阱 Zahlen", emoji: "🔢",
    source: "仿歌德 A1/A2 聽力題型・參考 Goethe-Zertifikat Hören",
    exercises: [
      { id: "l1", prompt: "Hören Sie genau.", promptZh: "請仔細聽（注意更正）。", tts: "Meine Nummer ist drei sieben zwei... nein, Entschuldigung, drei sieben neun zwei acht.", question: "Wie lautet die richtige Nummer?", questionZh: "正確號碼是？", options: ["37298", "37928", "37289", "32798"], answer: "37928", trap: "更正陷阱：說話者先說錯再用 nein 更正,正解是更正後的" },
      { id: "l2", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Das kostet nicht fünfzig, sondern fünfzehn Euro.", question: "Wie viel kostet das?", questionZh: "價格多少？", options: ["€ 50", "€ 15", "€ 55", "€ 5"], answer: "€ 15", trap: "nicht...sondern：先說50被否定,正解15(易混淆音)" },
      { id: "l3", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Ich bin nicht zwanzig, ich bin schon zweiundzwanzig.", question: "Wie alt ist sie?", questionZh: "她幾歲？", options: ["20", "22", "12", "30"], answer: "22", trap: "nicht...schon：20被否定,正解22" },
      { id: "l3b", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Wir wohnen in Hausnummer achtundvierzig, nicht vierundachtzig.", question: "Welche Hausnummer?", questionZh: "門牌幾號？", options: ["84", "48", "44", "88"], answer: "48", trap: "數字倒裝+否定：48 vs 84 易混,且84被否定" },
      { id: "l3c", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Der Zug fährt nicht um drei, sondern um halb vier.", question: "Wann fährt der Zug?", questionZh: "火車幾點開？", options: ["3:00", "3:30", "4:00", "4:30"], answer: "3:30", trap: "nicht...sondern + halb vier=3:30(非4:30)" },
      { id: "l3d", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Ich möchte keine sechs, sondern sieben Brötchen.", question: "Wie viele Brötchen?", questionZh: "要幾個麵包？", options: ["6", "7", "16", "17"], answer: "7", trap: "kein...sondern：6被否定,正解7" },
      { id: "l3e", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Das Büro ist nicht im vierten, sondern im vierzehnten Stock.", question: "In welchem Stock?", questionZh: "在幾樓？", options: ["4.", "14.", "40.", "1."], answer: "14.", trap: "vier vs vierzehn 易混 + 否定" },
    ]
  },
  {
    id: "lt2", level: "A1.1", topic: "時間陷阱 Tage & Zeit", emoji: "📅",
    source: "仿歌德 A1/A2 聽力題型・參考 Goethe-Zertifikat Hören",
    exercises: [
      { id: "l4", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Der Kurs ist nicht am Montag, sondern am Mittwoch.", question: "Wann ist der Kurs?", questionZh: "課程哪天？", options: ["Montag", "Mittwoch", "Dienstag", "Donnerstag"], answer: "Mittwoch", trap: "nicht...sondern：Montag被否定" },
      { id: "l5", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Eigentlich wollte ich am Freitag kommen, aber jetzt komme ich erst am Samstag.", question: "Wann kommt die Person?", questionZh: "他何時來？", options: ["Freitag", "Samstag", "Donnerstag", "Sonntag"], answer: "Samstag", trap: "eigentlich...aber：原本週五,改成週六" },
      { id: "l6", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Das Geschäft ist nicht am Samstag, sondern am Sonntag geschlossen.", question: "Wann ist geschlossen?", questionZh: "哪天關門？", options: ["Samstag", "Sonntag", "Montag", "Freitag"], answer: "Sonntag", trap: "nicht...sondern：Samstag被否定" },
      { id: "l6b", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Mein Geburtstag ist nicht am dritten, sondern am dreizehnten Mai.", question: "Wann hat sie Geburtstag?", questionZh: "生日哪天？", options: ["3. Mai", "13. Mai", "30. Mai", "3. März"], answer: "13. Mai", trap: "drei vs dreizehn 易混 + 否定" },
      { id: "l6c", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Wir treffen uns nicht am Vormittag, sondern am Abend.", question: "Wann treffen sie sich?", questionZh: "何時見面？", options: ["Vormittag", "Abend", "Mittag", "Nachmittag"], answer: "Abend", trap: "nicht...sondern：上午被否定" },
      { id: "l6d", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Der Termin ist nicht am Donnerstag, der ist schon vorbei. Er ist am nächsten Dienstag.", question: "Wann ist der Termin?", questionZh: "預約哪天？", options: ["Donnerstag", "Dienstag", "Mittwoch", "Freitag"], answer: "Dienstag", trap: "否定+時間：週四已過,正解下週二" },
    ]
  },
  {
    id: "lt3", level: "A1.2", topic: "購物陷阱 Einkauf & Essen", emoji: "🛒",
    source: "仿歌德 A1/A2 聽力題型・參考 Goethe-Zertifikat Hören",
    exercises: [
      { id: "l11", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Ich nehme keinen Kaffee, lieber einen Tee. Und ein Stück Kuchen, bitte.", question: "Was bestellt die Person?", questionZh: "他點什麼？", options: ["Kaffee & Kuchen", "Tee & Kuchen", "Tee & Brot", "Kaffee & Eis"], answer: "Tee & Kuchen", trap: "kein...lieber：咖啡被否定,改點茶" },
      { id: "l12", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Die Äpfel kosten nicht zwei, sondern drei Euro pro Kilo.", question: "Wie viel kostet ein Kilo?", questionZh: "一公斤多少？", options: ["€2", "€3", "€1", "€13"], answer: "€3", trap: "nicht...sondern：2歐被否定,正解3歐" },
      { id: "l13", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Wir haben schon Milch und Eier. Wir brauchen nur noch Butter.", question: "Was muss die Person noch kaufen?", questionZh: "還要買什麼？", options: ["Milch", "Eier", "Butter", "alles"], answer: "Butter", trap: "schon...nur noch：牛奶蛋已有,只缺奶油" },
      { id: "l14", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Früher habe ich kein Gemüse gegessen, aber jetzt esse ich sehr gern Gemüse.", question: "Was isst die Person jetzt gern?", questionZh: "他現在愛吃什麼？", options: ["kein Gemüse", "Gemüse 蔬菜", "nur Fleisch", "Obst"], answer: "Gemüse 蔬菜", trap: "früher kein...aber jetzt：過去不吃,現在愛吃" },
      { id: "l15", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Eine Flasche Wasser, bitte. — Mit Kohlensäure? — Nein, ohne, bitte.", question: "Welches Wasser?", questionZh: "哪種水？", options: ["mit Kohlensäure", "ohne Kohlensäure", "warm", "mit Zitrone"], answer: "ohne Kohlensäure", trap: "問句+Nein：對『有氣泡嗎』回答 Nein,所以要無氣泡" },
      { id: "l16", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Der Supermarkt hat heute nicht bis zweiundzwanzig Uhr offen, sondern nur bis zwanzig Uhr.", question: "Bis wann hat er offen?", questionZh: "開到幾點？", options: ["22:00", "20:00", "18:00", "21:00"], answer: "20:00", trap: "nicht...sondern nur：22點被否定,只到20點" },
    ]
  },
  {
    id: "lt4", level: "A2.1", topic: "約定陷阱 Verabredung", emoji: "🤝",
    source: "仿歌德 A1/A2 聽力題型・參考 Goethe-Zertifikat Hören",
    exercises: [
      { id: "l21", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Wollen wir ins Kino gehen? — Lieber nicht ins Kino, ich war gestern schon. Gehen wir lieber essen.", question: "Was machen sie?", questionZh: "他們做什麼？", options: ["ins Kino 看電影", "essen gehen 去吃飯", "zu Hause bleiben", "spazieren"], answer: "essen gehen 去吃飯", trap: "lieber nicht...lieber：電影被婉拒,改去吃飯" },
      { id: "l22", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Treffen wir uns um acht? — Acht ist mir zu früh. Sagen wir lieber neun.", question: "Wann treffen sie sich?", questionZh: "幾點見？", options: ["8 Uhr", "9 Uhr", "7 Uhr", "10 Uhr"], answer: "9 Uhr", trap: "zu früh...lieber：8點太早,改9點" },
      { id: "l23", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Kommst du mit dem Auto? — Nein, das Auto ist kaputt. Ich nehme die Bahn.", question: "Wie kommt die Person?", questionZh: "他怎麼來？", options: ["mit dem Auto", "mit der Bahn 搭火車", "mit dem Bus", "zu Fuß"], answer: "mit der Bahn 搭火車", trap: "Nein...kaputt：汽車壞了被否定,改搭火車" },
      { id: "l24", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Ich wollte dich anrufen, aber ich hatte keine Zeit. Deshalb schreibe ich dir jetzt eine E-Mail.", question: "Was macht die Person?", questionZh: "他做什麼？", options: ["anrufen 打電話", "E-Mail schreiben 寫郵件", "SMS senden", "besuchen"], answer: "E-Mail schreiben 寫郵件", trap: "wollte...aber...deshalb：想打電話但沒空,改寫郵件" },
      { id: "l25", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Treffen wir uns im Café? — Das Café ist heute zu. Komm doch einfach zu mir nach Hause.", question: "Wo treffen sie sich?", questionZh: "在哪見面？", options: ["im Café 咖啡廳", "zu Hause 家裡", "im Restaurant", "im Park"], answer: "zu Hause 家裡", trap: "zu(關門)：咖啡廳關門,改去家裡" },
    ]
  },
  {
    id: "lt5", level: "A2.1", topic: "天氣與計畫 Wetter & Plan", emoji: "🌦️",
    source: "仿歌德 A1/A2 聽力題型・參考 Goethe-Zertifikat Hören",
    exercises: [
      { id: "l31", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Eigentlich wollten wir schwimmen gehen, aber es regnet. Deshalb bleiben wir zu Hause.", question: "Was machen sie?", questionZh: "他們做什麼？", options: ["schwimmen 游泳", "zu Hause bleiben 待在家", "spazieren", "ins Schwimmbad"], answer: "zu Hause bleiben 待在家", trap: "eigentlich...aber...deshalb：想游泳但下雨,留家" },
      { id: "l32", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Morgen soll es nicht regnen, sondern sonnig werden.", question: "Wie wird das Wetter morgen?", questionZh: "明天天氣？", options: ["Regen 雨", "sonnig 晴", "Schnee", "Wind"], answer: "sonnig 晴", trap: "nicht...sondern：下雨被否定,正解晴天" },
      { id: "l33", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Im Sommer fahren wir dieses Jahr nicht ans Meer, sondern in die Berge.", question: "Wohin fahren sie?", questionZh: "他們去哪？", options: ["ans Meer 海邊", "in die Berge 山上", "in eine Stadt", "ins Ausland"], answer: "in die Berge 山上", trap: "nicht...sondern：海邊被否定,改去山上" },
      { id: "l34", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Vielleicht komme ich am Wochenende, aber ich bin noch nicht sicher.", question: "Kommt die Person sicher?", questionZh: "他確定會來嗎？", options: ["Ja, sicher 確定", "Nein, noch unsicher 還不確定", "Nein, kommt nicht", "kommt Montag"], answer: "Nein, noch unsicher 還不確定", trap: "vielleicht...nicht sicher：只是『也許』,並不確定" },
      { id: "l35", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Wenn das Wetter schön ist, machen wir ein Picknick. Wenn nicht, gehen wir ins Museum.", question: "Was machen sie bei Regen?", questionZh: "下雨他們做什麼？", options: ["Picknick 野餐", "ins Museum 博物館", "zu Hause", "schwimmen"], answer: "ins Museum 博物館", trap: "wenn...wenn nicht：晴天野餐,下雨(wenn nicht)去博物館" },
    ]
  },
  {
    id: "lt6", level: "A2.2", topic: "通知與廣播 Durchsage", emoji: "📢",
    source: "仿歌德 A1/A2 聽力題型・參考 Goethe-Zertifikat Hören",
    exercises: [
      { id: "l41", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Der Zug nach Hamburg fährt heute nicht von Gleis drei, sondern von Gleis fünf.", question: "Von welchem Gleis fährt der Zug?", questionZh: "火車從幾號月台開？", options: ["Gleis 3", "Gleis 5", "Gleis 4", "Gleis 8"], answer: "Gleis 5", trap: "nicht...sondern：3號被否定,改5號月台" },
      { id: "l42", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Der Zug hat etwa zehn Minuten Verspätung. Wir bitten um Entschuldigung.", question: "Was ist mit dem Zug?", questionZh: "火車怎麼了？", options: ["pünktlich 準時", "10 Min Verspätung 誤點", "fällt aus 取消", "fährt früher"], answer: "10 Min Verspätung 誤點", trap: "Verspätung：誤點10分,非取消(陷阱選項)" },
      { id: "l43", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Liebe Kunden, unser Geschäft schließt heute nicht um zwanzig, sondern bereits um achtzehn Uhr.", question: "Wann schließt das Geschäft?", questionZh: "店幾點關？", options: ["20:00", "18:00", "19:00", "22:00"], answer: "18:00", trap: "nicht...sondern bereits：20點被否定,提早18點" },
      { id: "l44", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Die Konferenz findet nicht im Raum hundertzwei, sondern im Raum zweihundertzwei statt.", question: "In welchem Raum?", questionZh: "在哪個房間？", options: ["102", "202", "122", "220"], answer: "202", trap: "102 vs 202 易混 + 否定" },
      { id: "l45", prompt: "Hören Sie genau.", promptZh: "請仔細聽。", tts: "Achtung: Wegen Reparatur ist der Aufzug heute leider nicht in Betrieb. Bitte nehmen Sie die Treppe.", question: "Was sollen die Leute tun?", questionZh: "大家該怎麼做？", options: ["Aufzug nehmen 搭電梯", "Treppe nehmen 走樓梯", "warten", "draußen bleiben"], answer: "Treppe nehmen 走樓梯", trap: "nicht in Betrieb：電梯故障被否定,改走樓梯" },
    ]
  },
];

const READING_TEXTS = [
  {
    id: "r1", level: "A1.1", type: "短訊息", emoji: "📱", title: "朋友的訊息",
    source: "仿歌德 A1 題型・參考 Goethe-Zertifikat A1 Lesen Teil 2",
    text: `Hallo Lisa,\n\nich komme heute NICHT um 19 Uhr, sondern erst um 20 Uhr. Kannst du bitte KEIN Brot kaufen? Ich bringe selbst welches mit. Aber wir brauchen noch Käse. Meine Schwester kommt doch nicht mit, sie ist krank.\n\nLiebe Grüße,\nMax`,
    questions: [
      { q: "Wann kommt Max?", zh: "Max 幾點到？", options: ["um 19 Uhr", "um 20 Uhr 二十點", "um 18 Uhr", "um 21 Uhr"], answer: "um 20 Uhr 二十點", trap: "否定+轉折 nicht...sondern：文章先說19點再否定，真正時間是20點" },
      { q: "Was soll Lisa kaufen?", zh: "Lisa 該買什麼？", options: ["Brot 麵包", "Käse 起司", "Brot und Käse", "nichts 什麼都不買"], answer: "Käse 起司", trap: "kein 陷阱：麵包說 kein(不要買)，只要買 Käse" },
      { q: "Kommt die Schwester von Max mit?", zh: "Max 的姐妹會來嗎？", options: ["Ja, sie kommt 會來", "Nein, sie ist krank 不會,她生病", "Ja, aber später", "Das steht nicht im Text"], answer: "Nein, sie ist krank 不會,她生病", trap: "doch nicht 陷阱：原本要來但『doch nicht』表示最後不來" },
    ]
  },
  {
    id: "r2", level: "A1.1", type: "告示", emoji: "📋", title: "語言課程公告",
    source: "仿歌德 A1 題型・參考 Goethe-Zertifikat A1 Lesen Teil 1",
    text: `SPRACHSCHULE BERLIN\n\nDeutschkurs für Anfänger\n\nDer Kurs ist NICHT am Montag, sondern am Dienstag und Donnerstag.\nZeit: 18:00 – 20:00 Uhr\nKosten: nicht mehr 150, jetzt nur 120 Euro pro Monat\n\nKeine Anmeldung per Telefon! Bitte nur per E-Mail anmelden.`,
    questions: [
      { q: "An welchen Tagen ist der Kurs?", zh: "課程在哪幾天？", options: ["Montag", "Dienstag und Donnerstag 二四", "Montag und Mittwoch", "jeden Tag"], answer: "Dienstag und Donnerstag 二四", trap: "nicht...sondern：先提 Montag 再否定,正解是二四" },
      { q: "Wie viel kostet der Kurs?", zh: "課程多少錢？", options: ["150 Euro", "120 Euro 一百二", "100 Euro", "130 Euro"], answer: "120 Euro 一百二", trap: "數字陷阱：150 是舊價,jetzt nur 120 才是現價" },
      { q: "Wie kann man sich anmelden?", zh: "如何報名？", options: ["per Telefon 打電話", "per E-Mail 寄郵件", "persönlich 親自", "per Post 郵寄"], answer: "per E-Mail 寄郵件", trap: "kein 陷阱：電話報名被否定(Keine...Telefon),只能 E-Mail" },
    ]
  },
  {
    id: "r6", level: "A1.2", type: "個人簡介", emoji: "🙋", title: "自我介紹",
    source: "仿歌德 A1 題型・參考 Goethe-Zertifikat A1 Lesen Teil 3",
    text: `Hallo! Ich bin Anna. Ich komme nicht aus Deutschland, sondern aus Österreich. Früher habe ich in Wien gewohnt, aber jetzt wohne ich in München. Ich arbeite nicht mehr als Lehrerin, jetzt bin ich Krankenschwester. In der Freizeit schwimme ich nicht gern, aber ich lese sehr viel. Ich möchte bald Spanisch lernen, aber im Moment habe ich keine Zeit.`,
    questions: [
      { q: "Woher kommt Anna?", zh: "Anna 來自哪？", options: ["aus Deutschland", "aus Österreich 奧地利", "aus München", "aus Spanien"], answer: "aus Österreich 奧地利", trap: "nicht...sondern：Deutschland 被否定,正解 Österreich" },
      { q: "Wo wohnt Anna jetzt?", zh: "Anna 現在住哪？", options: ["in Wien", "in München 慕尼黑", "in Österreich", "in Spanien"], answer: "in München 慕尼黑", trap: "früher...aber jetzt：Wien 是過去,München 是現在" },
      { q: "Was ist Anna von Beruf?", zh: "Anna 職業？", options: ["Lehrerin 老師", "Krankenschwester 護士", "Studentin", "Ärztin"], answer: "Krankenschwester 護士", trap: "nicht mehr...jetzt：老師是過去,現在是護士" },
      { q: "Was macht Anna gern?", zh: "Anna 喜歡做什麼？", options: ["schwimmen 游泳", "lesen 閱讀", "Spanisch lernen", "Sport machen"], answer: "lesen 閱讀", trap: "nicht gern...aber：游泳被否定,真正喜歡閱讀" },
    ]
  },
  {
    id: "r7", level: "A1.2", type: "電子郵件", emoji: "📧", title: "生日邀請",
    source: "仿歌德 A1 題型・參考 Goethe-Zertifikat A1 Lesen Teil 2",
    text: `Liebe Sarah,\n\nmeine Party ist nicht am Samstag, sondern am Sonntag. Sie beginnt nicht um 18 Uhr, sondern schon um 16 Uhr. Bring bitte keinen Kuchen mit, ich habe genug. Aber Getränke wären super. Wenn es regnet, feiern wir trotzdem – dann einfach drinnen.\n\nLiebe Grüße,\nAnna`,
    questions: [
      { q: "Wann ist die Party?", zh: "派對哪天？", options: ["am Samstag", "am Sonntag 週日", "am Freitag", "am Montag"], answer: "am Sonntag 週日", trap: "nicht...sondern：Samstag 被否定,正解 Sonntag" },
      { q: "Um wie viel Uhr beginnt sie?", zh: "幾點開始？", options: ["um 18 Uhr", "um 16 Uhr 十六點", "um 17 Uhr", "um 20 Uhr"], answer: "um 16 Uhr 十六點", trap: "nicht...sondern schon：18點被否定,提早到16點" },
      { q: "Was soll Sarah mitbringen?", zh: "Sarah 帶什麼？", options: ["Kuchen 蛋糕", "Getränke 飲料", "nichts", "Essen"], answer: "Getränke 飲料", trap: "kein...aber：蛋糕被否定(keinen Kuchen),要帶飲料" },
      { q: "Was passiert, wenn es regnet?", zh: "下雨怎麼辦？", options: ["Party fällt aus 取消", "Sie feiern drinnen 室內慶祝", "Party wird verschoben", "Sie gehen ins Restaurant"], answer: "Sie feiern drinnen 室內慶祝", trap: "trotzdem 陷阱：即使下雨『仍然』慶祝,改室內" },
    ]
  },
  {
    id: "r3", level: "A2.1", type: "電子郵件", emoji: "📨", title: "工作請假信",
    source: "仿歌德 A2 題型・參考 Goethe-Zertifikat A2 Lesen Teil 2",
    text: `Sehr geehrte Frau Berg,\n\nich kann diese Woche leider nicht kommen. Es ist nicht meine Erkältung von letzter Woche – die ist vorbei. Diesmal ist es mein Rücken. Der Arzt sagt, ich soll mich ausruhen und auf KEINEN Fall schwere Sachen heben. Sport ist aber erlaubt, sogar gut.\n\nIch arbeite trotzdem von zu Hause: Die wichtigen E-Mails beantworte ich, aber an Meetings nehme ich nicht teil.\n\nMit freundlichen Grüßen,\nThomas Klein`,
    questions: [
      { q: "Warum fehlt Thomas diese Woche?", zh: "Thomas 為何請假？", options: ["Erkältung 感冒", "Rückenschmerzen 背痛", "Kopfschmerzen", "Urlaub"], answer: "Rückenschmerzen 背痛", trap: "近義+否定：感冒是上週(vorbei),這次是背痛(diesmal)" },
      { q: "Was darf Thomas NICHT tun?", zh: "Thomas 不可做什麼？", options: ["Sport machen 運動", "schwere Sachen heben 提重物", "E-Mails schreiben", "sich ausruhen"], answer: "schwere Sachen heben 提重物", trap: "auf keinen Fall：重物被禁,但運動反而被允許(陷阱選項)" },
      { q: "Darf Thomas Sport machen?", zh: "Thomas 能運動嗎？", options: ["Nein, verboten 不行", "Ja, sogar gut 可以,甚至有益", "Nur wenig", "Nur mit Arzt"], answer: "Ja, sogar gut 可以,甚至有益", trap: "aber...sogar：和『提重物』相反,運動被允許還有益" },
      { q: "Was macht Thomas von zu Hause?", zh: "Thomas 在家做什麼？", options: ["an Meetings teilnehmen 參加會議", "E-Mails beantworten 回郵件", "gar nichts", "telefonieren"], answer: "E-Mails beantworten 回郵件", trap: "aber...nicht：回郵件可,但會議不參加(陷阱選項)" },
    ]
  },
  {
    id: "r4", level: "A2.1", type: "廣告", emoji: "🏋️", title: "健身中心廣告",
    source: "仿歌德 A2 題型・參考 Goethe-Zertifikat A2 Lesen Teil 1",
    text: `SPORT-CENTER FIT & FUN\n\nWir haben KEIN Schwimmbad mehr – das ist seit letztem Jahr geschlossen. Aber unser neuer Yoga-Raum ist super!\n\nÖffnungszeiten: werktags bis 22 Uhr, am Wochenende NUR bis 18 Uhr.\n\nDie Mitgliedschaft kostet normalerweise 40 Euro, aber für Studenten nur 30 Euro. Die Probestunde ist NICHT kostenlos, sie kostet 5 Euro.`,
    questions: [
      { q: "Was gibt es im Center?", zh: "中心有什麼？", options: ["ein Schwimmbad 游泳池", "einen Yoga-Raum 瑜珈室", "ein Tennisfeld", "eine Sauna"], answer: "einen Yoga-Raum 瑜珈室", trap: "kein...aber：游泳池已關(kein),但有新瑜珈室" },
      { q: "Wann schließt das Center am Wochenende?", zh: "週末幾點關？", options: ["um 22 Uhr", "um 18 Uhr 十八點", "um 20 Uhr", "um 16 Uhr"], answer: "um 18 Uhr 十八點", trap: "對比陷阱：平日22點,但週末『nur bis 18』" },
      { q: "Was zahlt ein Student?", zh: "學生付多少？", options: ["40 Euro", "30 Euro 三十歐", "35 Euro", "kostenlos"], answer: "30 Euro 三十歐", trap: "對比+數字：一般40,但學生『nur 30』" },
      { q: "Ist die Probestunde kostenlos?", zh: "體驗課免費嗎？", options: ["Ja, kostenlos 免費", "Nein, 5 Euro 不,五歐", "Ja, für Studenten", "Nein, 10 Euro"], answer: "Nein, 5 Euro 不,五歐", trap: "nicht kostenlos：『不免費』,要5歐,易看成免費" },
    ]
  },
  {
    id: "r9", level: "A2.2", type: "短文", emoji: "📰", title: "週末出遊",
    source: "仿歌德 A2 題型・參考 Goethe-Zertifikat A2 Lesen Teil 3",
    text: `Eigentlich wollten wir letztes Wochenende ans Meer fahren, aber das Wetter war schlecht. Deshalb sind wir doch in die Berge gefahren. Mein Mann wollte wandern, aber die Kinder waren zu müde. Also haben wir nur einen kurzen Spaziergang gemacht und sind früh ins Hotel zurück.\n\nDas Essen im Hotel war nicht billig, aber sehr lecker. Nächstes Mal wollen wir nicht wieder ins Hotel, sondern lieber zelten – wenn das Wetter besser ist.`,
    questions: [
      { q: "Wohin sind sie gefahren?", zh: "他們去了哪？", options: ["ans Meer 海邊", "in die Berge 山上", "ins Ausland", "in eine Stadt"], answer: "in die Berge 山上", trap: "eigentlich...aber...doch：本想去海邊,因天氣改去山上" },
      { q: "Warum sind sie nicht gewandert?", zh: "為何沒健行？", options: ["schlechtes Wetter 天氣差", "Kinder waren müde 孩子累了", "keine Zeit", "Mann war krank"], answer: "Kinder waren müde 孩子累了", trap: "aber 陷阱：爸爸想健行,但孩子太累(天氣是改地點的原因,非此題)" },
      { q: "Wie war das Essen?", zh: "食物如何？", options: ["billig und schlecht", "teuer aber lecker 貴但好吃", "billig und lecker", "teuer und schlecht"], answer: "teuer aber lecker 貴但好吃", trap: "nicht billig=貴,aber lecker：雙重資訊要都抓對" },
      { q: "Was wollen sie nächstes Mal?", zh: "下次想做什麼？", options: ["wieder ins Hotel 再住飯店", "zelten 露營", "ans Meer fahren", "zu Hause bleiben"], answer: "zelten 露營", trap: "nicht...sondern：飯店被否定,下次想露營" },
    ]
  },
  {
    id: "r10", level: "A2.2", type: "短文", emoji: "🏙️", title: "搬到新城市",
    source: "仿歌德 A2 題型・參考 Goethe-Zertifikat A2 Lesen Teil 3",
    text: `Als ich vor einem Jahr nach Hamburg zog, war ich zuerst gar nicht glücklich. Die Stadt war mir zu groß und ich kannte niemanden. Ich wollte fast wieder zurück in mein Dorf. Aber dann lernte ich nette Leute kennen und fand einen guten Job.\n\nHeute möchte ich auf keinen Fall mehr weg. Was mir am Anfang nicht gefiel – der Lärm, die vielen Menschen –, das mag ich jetzt sogar. Nur das Wetter in Hamburg finde ich immer noch schlecht.`,
    questions: [
      { q: "Wie fühlte sich die Person am Anfang?", zh: "剛開始感覺如何？", options: ["glücklich 開心", "nicht glücklich 不開心", "müde", "krank"], answer: "nicht glücklich 不開心", trap: "zuerst...gar nicht：一開始『完全不』開心,後面才轉變" },
      { q: "Was wollte die Person zuerst tun?", zh: "起初想做什麼？", options: ["in Hamburg bleiben", "zurück ins Dorf 回村莊", "in eine andere Stadt", "ins Ausland"], answer: "zurück ins Dorf 回村莊", trap: "wollte fast...aber：差點想回村,但後來改觀" },
      { q: "Wie findet die Person Hamburg heute?", zh: "現在覺得漢堡如何？", options: ["will weg 想離開", "will bleiben 想留下", "egal", "noch unsicher"], answer: "will bleiben 想留下", trap: "auf keinen Fall mehr weg=絕不離開=想留,雙重否定陷阱" },
      { q: "Was gefällt der Person immer noch NICHT?", zh: "至今仍不喜歡什麼？", options: ["der Lärm 吵鬧", "die Menschen 人多", "das Wetter 天氣", "der Job"], answer: "das Wetter 天氣", trap: "sogar...nur：吵鬧人多現在反而喜歡,只有天氣仍不喜歡" },
    ]
  },
];

const WRITING_PROMPTS = [
  { id: "w1", level: "A1.1", emoji: "👋", title: "自我介紹", source: "仿歌德 A1/A2 寫作題型・參考 Goethe-Zertifikat Schreiben", prompt: "Stellen Sie sich vor. Schreiben Sie über: Name, Alter, Herkunft, Beruf oder Studium.", promptZh: "介紹自己：姓名、年齡、來自哪裡、職業或學生。", hints: ["Ich heiße ...", "Ich bin ... Jahre alt.", "Ich komme aus ...", "Ich bin Student/in. / Ich arbeite als ..."], minWords: 30, example: "Ich heiße Wang Mei. Ich bin 22 Jahre alt. Ich komme aus Taiwan, aus Taipei. Ich bin Studentin. Ich lerne Deutsch, weil ich nach Deutschland reisen möchte." },
  { id: "w2", level: "A1.2", emoji: "📧", title: "請假訊息", source: "仿歌德 A1/A2 寫作題型・參考 Goethe-Zertifikat Schreiben", prompt: "Sie können heute nicht zum Kurs kommen. Schreiben Sie eine Nachricht an Ihre Lehrerin. Erklären Sie den Grund.", promptZh: "今天不能上課，寫訊息給老師說明原因。", hints: ["Liebe/r Frau/Herr ...,", "Ich kann heute leider nicht kommen.", "Ich bin krank. / Ich habe einen Termin.", "Mit freundlichen Grüßen, ..."], minWords: 25, example: "Liebe Frau Schmidt,\n\nIch kann heute leider nicht zum Kurs kommen. Ich bin krank und habe Fieber. Ich komme am Mittwoch wieder.\n\nMit freundlichen Grüßen,\nWang Mei" },
  { id: "w5", level: "A1.2", emoji: "🎂", title: "生日邀請", source: "仿歌德 A1/A2 寫作題型・參考 Goethe-Zertifikat Schreiben", prompt: "Sie haben Geburtstag. Schreiben Sie eine Einladung an einen Freund: Wann, wo, was soll er mitbringen?", promptZh: "你生日，寫邀請給朋友：何時、何地、帶什麼。", hints: ["Ich habe am ... Geburtstag.", "Die Party ist um ... Uhr.", "bei mir zu Hause / im Restaurant", "Bitte bring ... mit."], minWords: 25, example: "Lieber Tom,\n\nich habe am Samstag Geburtstag und mache eine Party. Sie ist um 18 Uhr bei mir zu Hause. Bitte bring etwas zu trinken mit. Ich freue mich auf dich!\n\nLiebe Grüße,\nAnna" },
  { id: "w6", level: "A1.1", emoji: "🛒", title: "購物清單訊息", source: "仿歌德 A1/A2 寫作題型・參考 Goethe-Zertifikat Schreiben", prompt: "Schreiben Sie Ihrem Mitbewohner eine Nachricht. Bitten Sie ihn, drei Dinge einzukaufen.", promptZh: "寫訊息給室友，請他買三樣東西。", hints: ["Kannst du bitte einkaufen?", "Wir brauchen ...", "Danke!"], minWords: 20, example: "Hallo Max,\n\nkannst du bitte einkaufen gehen? Wir brauchen Milch, Brot und Eier. Das Geld liegt auf dem Tisch. Danke dir!\n\nBis später,\nLisa" },
  { id: "w3", level: "A2.1", emoji: "🍕", title: "描述喜歡的食物", source: "仿歌德 A1/A2 寫作題型・參考 Goethe-Zertifikat Schreiben", prompt: "Beschreiben Sie Ihr Lieblingsessen. Was ist es? Warum mögen Sie es? Wann essen Sie es? (mind. 40 Wörter)", promptZh: "描述你最喜歡的食物：是什麼、為何喜歡、何時吃。（至少40字）", hints: ["Mein Lieblingsessen ist ...", "Es schmeckt ...", "Ich esse es gern, weil ...", "Ich esse es oft ..."], minWords: 40, example: "Mein Lieblingsessen ist Sushi. Es schmeckt frisch und lecker. Ich esse es gern, weil es gesund ist und nicht so schwer. Ich esse Sushi oft am Wochenende mit meiner Familie. In Taiwan gibt es viele gute Sushi-Restaurants." },
  { id: "w4", level: "A2.1", emoji: "🏙️", title: "介紹你的城市", source: "仿歌德 A1/A2 寫作題型・參考 Goethe-Zertifikat Schreiben", prompt: "Beschreiben Sie Ihre Stadt. Wie heißt sie? Was ist besonders? Was mögen Sie dort? (mind. 40 Wörter)", promptZh: "介紹你的城市：名稱、特色、喜歡的地方。（至少40字）", hints: ["Ich wohne in ...", "Die Stadt ist ... / hat ...", "Ich mag ... besonders.", "Man kann dort ... machen."], minWords: 40, example: "Ich wohne in Taipei, der Hauptstadt von Taiwan. Die Stadt ist sehr groß und modern. Es gibt viele Restaurants und Parks. Ich mag den Shilin Nachtmarkt besonders. Man kann dort viele leckere Sachen essen." },
  { id: "w7", level: "A2.2", emoji: "🏖️", title: "描述上次假期", source: "仿歌德 A1/A2 寫作題型・參考 Goethe-Zertifikat Schreiben", prompt: "Schreiben Sie über Ihren letzten Urlaub. Wohin sind Sie gefahren? Was haben Sie gemacht? (mind. 40 Wörter)", promptZh: "寫上次的假期：去了哪、做了什麼。（至少40字，用過去式）", hints: ["Letzten Sommer war ich in ...", "Ich bin ... gefahren.", "Ich habe ... gemacht.", "Das Wetter war ..."], minWords: 40, example: "Letzten Sommer war ich in Japan. Ich bin mit dem Flugzeug nach Tokio geflogen. Dort habe ich viele Tempel besucht und gutes Essen gegessen. Das Wetter war warm und sonnig. Der Urlaub hat mir sehr gut gefallen." },
  { id: "w8", level: "A2.2", emoji: "💼", title: "回覆邀請", source: "仿歌德 A1/A2 寫作題型・參考 Goethe-Zertifikat Schreiben", prompt: "Ein Freund hat Sie zum Essen eingeladen. Antworten Sie: Sagen Sie zu oder ab und nennen Sie einen Grund. (mind. 30 Wörter)", promptZh: "朋友邀你吃飯，回覆接受或婉拒並說明理由。（至少30字）", hints: ["Vielen Dank für die Einladung!", "Ich komme gern. / Leider kann ich nicht.", "weil ...", "Vielleicht ein anderes Mal?"], minWords: 30, example: "Lieber Paul,\n\nvielen Dank für deine Einladung zum Essen! Leider kann ich am Freitag nicht kommen, weil ich arbeiten muss. Können wir uns am Samstag treffen? Ich freue mich darauf.\n\nLiebe Grüße,\nMei" },
];

const SPEAKING_PROMPTS = [
  { id: "s1", level: "A1.1", emoji: "👤", title: "自我介紹", source: "仿歌德 A1/A2 口說題型・參考 Goethe-Zertifikat Sprechen", prompt: "Stellen Sie sich bitte vor.", promptZh: "請做自我介紹。", guide: "Name・Alter・Herkunft・Beruf", guideZh: "姓名・年齡・來自哪・職業", example: "Hallo! Ich heiße [名字]. Ich bin [年齡] Jahre alt. Ich komme aus Taiwan. Ich bin Student/in und ich lerne Deutsch.", tips: ["說話清楚、不要太快", "用 Ich heiße... 開頭", "可加 Ich lerne gern Deutsch！"] },
  { id: "s2", level: "A1.2", emoji: "👨‍👩‍👧", title: "介紹家人", source: "仿歌德 A1/A2 口說題型・參考 Goethe-Zertifikat Sprechen", prompt: "Stellen Sie Ihre Familie vor.", promptZh: "介紹你的家人。", guide: "Wer? Name? Alter? Beruf?", guideZh: "有誰・名字・幾歲・工作", example: "Meine Familie ist klein. Ich habe eine Mutter, einen Vater und eine Schwester. Meine Mutter heißt [名字] und arbeitet als Lehrerin. Mein Vater ist 50 Jahre alt.", tips: ["mein（陽）/ meine（陰）", "Sie ist ... Jahre alt."] },
  { id: "s5", level: "A1.2", emoji: "🏠", title: "我的住處", source: "仿歌德 A1/A2 口說題型・參考 Goethe-Zertifikat Sprechen", prompt: "Beschreiben Sie, wo Sie wohnen.", promptZh: "描述你住的地方。", guide: "Stadt? Haus/Wohnung? Zimmer?", guideZh: "城市・公寓或房子・幾個房間", example: "Ich wohne in [城市]. Ich habe eine Wohnung mit zwei Zimmern. Mein Zimmer ist klein, aber gemütlich. Ich wohne gern hier, weil es ruhig ist.", tips: ["Ich wohne in...", "Es gibt ein/eine..."] },
  { id: "s6", level: "A1.1", emoji: "⏰", title: "我的一天", source: "仿歌德 A1/A2 口說題型・參考 Goethe-Zertifikat Sprechen", prompt: "Erzählen Sie über Ihren typischen Tag.", promptZh: "描述你平常的一天。", guide: "Aufstehen? Arbeit/Schule? Abend?", guideZh: "起床・上班上學・晚上", example: "Ich stehe um sieben Uhr auf. Dann frühstücke ich und fahre zur Arbeit. Am Abend koche ich und sehe fern. Um elf Uhr gehe ich ins Bett.", tips: ["時間用 um ... Uhr", "動詞放第二位"] },
  { id: "s3", level: "A2.1", emoji: "🍜", title: "最喜歡的食物", source: "仿歌德 A1/A2 口說題型・參考 Goethe-Zertifikat Sprechen", prompt: "Was ist Ihr Lieblingsessen? Stellen Sie es vor.", promptZh: "你最喜歡的食物？介紹它。", guide: "Name? Geschmack? Warum? Wo?", guideZh: "名稱・味道・原因・哪裡吃", example: "Mein Lieblingsessen ist [食物]. Es schmeckt sehr lecker. Ich esse es gern, weil es gesund ist. Man kann es in Taiwan überall kaufen.", tips: ["Es schmeckt...", "Ich esse es gern, weil..."] },
  { id: "s4", level: "A2.1", emoji: "🎯", title: "我的計畫", source: "仿歌德 A1/A2 口說題型・參考 Goethe-Zertifikat Sprechen", prompt: "Was machen Sie am Wochenende? Oder: Warum lernen Sie Deutsch?", promptZh: "週末計畫？或為何學德語？", guide: "Was? Mit wem? Wo? Warum?", guideZh: "做什麼・跟誰・哪裡・為何", example: "Am Wochenende möchte ich [活動] machen. Ich gehe mit [人] nach [地點]. Ich lerne Deutsch, weil ich [原因].", tips: ["Ich möchte... / Ich will...", "weil, und, aber"] },
  { id: "s7", level: "A2.2", emoji: "🌦️", title: "天氣與季節", source: "仿歌德 A1/A2 口說題型・參考 Goethe-Zertifikat Sprechen", prompt: "Sprechen Sie über das Wetter und Ihre Lieblingsjahreszeit.", promptZh: "談天氣與你最喜歡的季節。", guide: "Wetter heute? Jahreszeit? Warum?", guideZh: "今天天氣・哪個季節・原因", example: "Heute ist es sonnig und warm. Meine Lieblingsjahreszeit ist der Frühling, weil die Blumen blühen und es nicht zu heiß ist. Im Winter ist es mir zu kalt.", tips: ["Es ist sonnig/kalt/warm", "Meine Lieblingsjahreszeit ist..."] },
  { id: "s8", level: "A2.2", emoji: "🛍️", title: "購物經驗", source: "仿歌德 A1/A2 口說題型・參考 Goethe-Zertifikat Sprechen", prompt: "Erzählen Sie über Ihren letzten Einkauf.", promptZh: "描述你最近一次購物。", guide: "Wo? Was gekauft? Wie viel?", guideZh: "哪裡・買什麼・多少錢", example: "Gestern war ich im Supermarkt. Ich habe Obst, Gemüse und Brot gekauft. Es hat ungefähr zwanzig Euro gekostet. Danach bin ich nach Hause gegangen.", tips: ["過去式：Ich habe ... gekauft", "Ich bin ... gegangen"] },
];

const VOCAB = [
  // ===== Person & Familie =====
  { de: "der Name", zh: "名字", topic: "Person 個人", level: "A1", ex: "Mein Name ist Anna." },
  { de: "der Vorname", zh: "名", topic: "Person 個人", level: "A1", ex: "Ihr Vorname ist Eva." },
  { de: "die Adresse", zh: "地址", topic: "Person 個人", level: "A1", ex: "Wie ist deine Adresse?" },
  { de: "das Alter", zh: "年齡", topic: "Person 個人", level: "A1", ex: "Alter: 25 Jahre." },
  { de: "geboren", zh: "出生", topic: "Person 個人", level: "A2", ex: "Ich bin in Taipei geboren." },
  { de: "ledig", zh: "單身", topic: "Person 個人", level: "A2", ex: "Sind Sie ledig oder verheiratet?" },
  { de: "verheiratet", zh: "已婚", topic: "Person 個人", level: "A2", ex: "Meine Schwester ist verheiratet." },
  { de: "der Mann", zh: "男人", topic: "Person 個人", level: "A1", ex: "Der Mann ist groß." },
  { de: "die Frau", zh: "女人", topic: "Person 個人", level: "A1", ex: "Die Frau liest ein Buch." },
  { de: "der Vater", zh: "爸爸", topic: "Familie 家庭", level: "A1", ex: "Mein Vater arbeitet viel." },
  { de: "die Mutter", zh: "媽媽", topic: "Familie 家庭", level: "A1", ex: "Meine Mutter kocht gern." },
  { de: "der Sohn", zh: "兒子", topic: "Familie 家庭", level: "A1", ex: "Ihr Sohn ist fünf Jahre alt." },
  { de: "die Tochter", zh: "女兒", topic: "Familie 家庭", level: "A1", ex: "Meine Tochter geht zur Schule." },
  { de: "der Bruder", zh: "兄弟", topic: "Familie 家庭", level: "A1", ex: "Mein Bruder spielt Fußball." },
  { de: "die Schwester", zh: "姐妹", topic: "Familie 家庭", level: "A1", ex: "Meine Schwester ist jünger." },
  { de: "das Kind", zh: "小孩", topic: "Familie 家庭", level: "A1", ex: "Das Kind schläft." },
  { de: "die Eltern", zh: "父母", topic: "Familie 家庭", level: "A1", ex: "Meine Eltern wohnen in Berlin." },
  { de: "die Großmutter", zh: "祖母", topic: "Familie 家庭", level: "A2", ex: "Meine Großmutter ist 80." },
  { de: "der Großvater", zh: "祖父", topic: "Familie 家庭", level: "A2", ex: "Mein Großvater erzählt gern." },
  { de: "die Geschwister", zh: "兄弟姐妹", topic: "Familie 家庭", level: "A2", ex: "Hast du Geschwister?" },
  { de: "der Freund", zh: "朋友(男)", topic: "Person 個人", level: "A1", ex: "Er ist mein bester Freund." },
  { de: "die Freundin", zh: "朋友(女)", topic: "Person 個人", level: "A1", ex: "Meine Freundin heißt Lisa." },
  { de: "der Nachbar", zh: "鄰居", topic: "Person 個人", level: "A2", ex: "Mein Nachbar ist sehr nett." },
  { de: "der Kollege", zh: "同事", topic: "Person 個人", level: "A2", ex: "Meine Kollegin hilft mir." },
  { de: "die Leute", zh: "人們", topic: "Person 個人", level: "A2", ex: "Hier sind viele Leute." },

  // ===== Essen & Trinken =====
  { de: "das Brot", zh: "麵包", topic: "Essen 食物", level: "A1", ex: "Ich esse Brot zum Frühstück." },
  { de: "das Brötchen", zh: "小圓麵包", topic: "Essen 食物", level: "A1", ex: "Möchtest du ein Brötchen?" },
  { de: "die Butter", zh: "奶油", topic: "Essen 食物", level: "A1", ex: "Brot mit Butter, bitte." },
  { de: "das Ei", zh: "蛋", topic: "Essen 食物", level: "A1", ex: "Ich möchte ein Ei." },
  { de: "der Käse", zh: "起司", topic: "Essen 食物", level: "A1", ex: "Der Käse schmeckt gut." },
  { de: "das Fleisch", zh: "肉", topic: "Essen 食物", level: "A1", ex: "Ich esse kein Fleisch." },
  { de: "der Fisch", zh: "魚", topic: "Essen 食物", level: "A1", ex: "Fisch mag ich gern." },
  { de: "der Apfel", zh: "蘋果", topic: "Essen 食物", level: "A1", ex: "Ein Kilo Äpfel, bitte." },
  { de: "die Banane", zh: "香蕉", topic: "Essen 食物", level: "A1", ex: "Bananen sind gesund." },
  { de: "das Obst", zh: "水果", topic: "Essen 食物", level: "A2", ex: "Obst kaufe ich auf dem Markt." },
  { de: "das Gemüse", zh: "蔬菜", topic: "Essen 食物", level: "A2", ex: "Iss mehr Gemüse!" },
  { de: "die Kartoffel", zh: "馬鈴薯", topic: "Essen 食物", level: "A2", ex: "Wir kochen Kartoffeln." },
  { de: "der Reis", zh: "米飯", topic: "Essen 食物", level: "A2", ex: "Ich esse gern Reis." },
  { de: "die Suppe", zh: "湯", topic: "Essen 食物", level: "A2", ex: "Die Suppe ist heiß." },
  { de: "der Salat", zh: "沙拉", topic: "Essen 食物", level: "A2", ex: "Möchten Sie einen Salat?" },
  { de: "der Zucker", zh: "糖", topic: "Essen 食物", level: "A2", ex: "Tee ohne Zucker, bitte." },
  { de: "das Salz", zh: "鹽", topic: "Essen 食物", level: "A2", ex: "Gib mir bitte das Salz." },
  { de: "das Wasser", zh: "水", topic: "Trinken 飲料", level: "A1", ex: "Ein Glas Wasser, bitte." },
  { de: "der Kaffee", zh: "咖啡", topic: "Trinken 飲料", level: "A1", ex: "Ich trinke gern Kaffee." },
  { de: "der Tee", zh: "茶", topic: "Trinken 飲料", level: "A1", ex: "Möchtest du Tee?" },
  { de: "die Milch", zh: "牛奶", topic: "Trinken 飲料", level: "A1", ex: "Die Milch ist im Kühlschrank." },
  { de: "der Saft", zh: "果汁", topic: "Trinken 飲料", level: "A1", ex: "Einen Apfelsaft, bitte." },
  { de: "das Bier", zh: "啤酒", topic: "Trinken 飲料", level: "A1", ex: "Noch ein Bier, bitte." },
  { de: "der Wein", zh: "葡萄酒", topic: "Trinken 飲料", level: "A1", ex: "Ich möchte keinen Wein." },
  { de: "essen", zh: "吃", topic: "Essen 食物", level: "A1", ex: "Wir essen zusammen." },
  { de: "trinken", zh: "喝", topic: "Trinken 飲料", level: "A1", ex: "Was möchten Sie trinken?" },
  { de: "kochen", zh: "煮", topic: "Essen 食物", level: "A2", ex: "Er kann gut kochen." },
  { de: "schmecken", zh: "嚐起來", topic: "Essen 食物", level: "A2", ex: "Schmeckt dir die Suppe?" },
  { de: "das Frühstück", zh: "早餐", topic: "Essen 食物", level: "A2", ex: "Das Frühstück ist fertig." },
  { de: "das Mittagessen", zh: "午餐", topic: "Essen 食物", level: "A2", ex: "Um zwölf gibt es Mittagessen." },
  { de: "das Abendessen", zh: "晚餐", topic: "Essen 食物", level: "A2", ex: "Zum Abendessen esse ich Salat." },

  // ===== Zeit =====
  { de: "die Zeit", zh: "時間", topic: "Zeit 時間", level: "A1", ex: "Ich habe keine Zeit." },
  { de: "die Uhr", zh: "鐘/點", topic: "Zeit 時間", level: "A1", ex: "Es ist vier Uhr." },
  { de: "die Stunde", zh: "小時", topic: "Zeit 時間", level: "A1", ex: "Ich warte eine Stunde." },
  { de: "die Minute", zh: "分鐘", topic: "Zeit 時間", level: "A1", ex: "Der Bus kommt in fünf Minuten." },
  { de: "der Tag", zh: "天", topic: "Zeit 時間", level: "A1", ex: "Schönen Tag noch!" },
  { de: "die Woche", zh: "週", topic: "Zeit 時間", level: "A1", ex: "Nächste Woche fahre ich weg." },
  { de: "der Monat", zh: "月", topic: "Zeit 時間", level: "A1", ex: "Im nächsten Monat habe ich Urlaub." },
  { de: "das Jahr", zh: "年", topic: "Zeit 時間", level: "A1", ex: "Ein gutes neues Jahr!" },
  { de: "heute", zh: "今天", topic: "Zeit 時間", level: "A1", ex: "Heute ist Montag." },
  { de: "morgen", zh: "明天", topic: "Zeit 時間", level: "A1", ex: "Morgen habe ich frei." },
  { de: "gestern", zh: "昨天", topic: "Zeit 時間", level: "A1", ex: "Gestern war ich krank." },
  { de: "jetzt", zh: "現在", topic: "Zeit 時間", level: "A1", ex: "Jetzt machen wir Pause." },
  { de: "der Morgen", zh: "早晨", topic: "Zeit 時間", level: "A1", ex: "Guten Morgen!" },
  { de: "der Vormittag", zh: "上午", topic: "Zeit 時間", level: "A2", ex: "Am Vormittag arbeite ich." },
  { de: "der Mittag", zh: "中午", topic: "Zeit 時間", level: "A2", ex: "Am Mittag essen wir." },
  { de: "der Nachmittag", zh: "下午", topic: "Zeit 時間", level: "A2", ex: "Am Nachmittag gehe ich einkaufen." },
  { de: "der Abend", zh: "晚上", topic: "Zeit 時間", level: "A1", ex: "Guten Abend!" },
  { de: "die Nacht", zh: "夜晚", topic: "Zeit 時間", level: "A1", ex: "Gute Nacht!" },
  { de: "früh", zh: "早", topic: "Zeit 時間", level: "A2", ex: "Ich stehe früh auf." },
  { de: "spät", zh: "晚/遲", topic: "Zeit 時間", level: "A2", ex: "Es ist schon spät." },
  { de: "immer", zh: "總是", topic: "Zeit 時間", level: "A1", ex: "Er kommt immer zu spät." },
  { de: "oft", zh: "經常", topic: "Zeit 時間", level: "A1", ex: "Ich gehe oft ins Kino." },
  { de: "manchmal", zh: "有時", topic: "Zeit 時間", level: "A2", ex: "Manchmal koche ich." },
  { de: "nie", zh: "從不", topic: "Zeit 時間", level: "A2", ex: "Er ist nie pünktlich." },
  { de: "bald", zh: "很快", topic: "Zeit 時間", level: "A2", ex: "Ich komme bald." },

  // ===== Wochentage & Monate =====
  { de: "der Montag", zh: "星期一", topic: "Tage 星期", level: "A1", ex: "Am Montag beginnt der Kurs." },
  { de: "der Dienstag", zh: "星期二", topic: "Tage 星期", level: "A1", ex: "Dienstag habe ich Zeit." },
  { de: "der Mittwoch", zh: "星期三", topic: "Tage 星期", level: "A1", ex: "Mittwoch gehe ich zum Arzt." },
  { de: "der Donnerstag", zh: "星期四", topic: "Tage 星期", level: "A1", ex: "Donnerstag ist Markt." },
  { de: "der Freitag", zh: "星期五", topic: "Tage 星期", level: "A1", ex: "Am Freitag feiern wir." },
  { de: "der Samstag", zh: "星期六", topic: "Tage 星期", level: "A1", ex: "Samstag schlafe ich lange." },
  { de: "der Sonntag", zh: "星期日", topic: "Tage 星期", level: "A1", ex: "Sonntag ist Ruhetag." },
  { de: "das Wochenende", zh: "週末", topic: "Tage 星期", level: "A1", ex: "Schönes Wochenende!" },
  { de: "der Januar", zh: "一月", topic: "Monate 月份", level: "A1", ex: "Im Januar ist es kalt." },
  { de: "der Juli", zh: "七月", topic: "Monate 月份", level: "A1", ex: "Im Juli fahren wir ans Meer." },
  { de: "der Dezember", zh: "十二月", topic: "Monate 月份", level: "A1", ex: "Im Dezember ist Weihnachten." },

  // ===== Jahreszeiten & Wetter =====
  { de: "der Frühling", zh: "春天", topic: "Wetter 天氣", level: "A2", ex: "Im Frühling blühen die Blumen." },
  { de: "der Sommer", zh: "夏天", topic: "Wetter 天氣", level: "A1", ex: "Der Sommer ist heiß." },
  { de: "der Herbst", zh: "秋天", topic: "Wetter 天氣", level: "A2", ex: "Im Herbst regnet es oft." },
  { de: "der Winter", zh: "冬天", topic: "Wetter 天氣", level: "A1", ex: "Im Winter schneit es." },
  { de: "das Wetter", zh: "天氣", topic: "Wetter 天氣", level: "A1", ex: "Wie ist das Wetter heute?" },
  { de: "die Sonne", zh: "太陽", topic: "Wetter 天氣", level: "A1", ex: "Die Sonne scheint." },
  { de: "der Regen", zh: "雨", topic: "Wetter 天氣", level: "A1", ex: "Bei Regen bleibe ich zu Hause." },
  { de: "der Schnee", zh: "雪", topic: "Wetter 天氣", level: "A2", ex: "Der Schnee ist weiß." },
  { de: "der Wind", zh: "風", topic: "Wetter 天氣", level: "A2", ex: "Der Wind ist kalt." },
  { de: "warm", zh: "溫暖", topic: "Wetter 天氣", level: "A1", ex: "Heute ist es warm." },
  { de: "kalt", zh: "冷", topic: "Wetter 天氣", level: "A1", ex: "Mir ist kalt." },
  { de: "heiß", zh: "熱", topic: "Wetter 天氣", level: "A1", ex: "Der Kaffee ist heiß." },
  { de: "regnen", zh: "下雨", topic: "Wetter 天氣", level: "A2", ex: "Es regnet heute." },
  { de: "scheinen", zh: "照耀", topic: "Wetter 天氣", level: "A2", ex: "Die Sonne scheint." },

  // ===== Wohnen =====
  { de: "das Haus", zh: "房子", topic: "Wohnen 居住", level: "A1", ex: "Das Haus ist groß." },
  { de: "die Wohnung", zh: "公寓", topic: "Wohnen 居住", level: "A1", ex: "Meine Wohnung ist klein." },
  { de: "das Zimmer", zh: "房間", topic: "Wohnen 居住", level: "A1", ex: "Das Zimmer ist hell." },
  { de: "die Küche", zh: "廚房", topic: "Wohnen 居住", level: "A1", ex: "Die Küche ist neu." },
  { de: "das Bad", zh: "浴室", topic: "Wohnen 居住", level: "A1", ex: "Wo ist das Bad?" },
  { de: "das Schlafzimmer", zh: "臥室", topic: "Wohnen 居住", level: "A2", ex: "Das Schlafzimmer ist ruhig." },
  { de: "das Wohnzimmer", zh: "客廳", topic: "Wohnen 居住", level: "A2", ex: "Wir sitzen im Wohnzimmer." },
  { de: "der Tisch", zh: "桌子", topic: "Wohnen 居住", level: "A1", ex: "Das Essen ist auf dem Tisch." },
  { de: "der Stuhl", zh: "椅子", topic: "Wohnen 居住", level: "A1", ex: "Ist der Stuhl frei?" },
  { de: "das Bett", zh: "床", topic: "Wohnen 居住", level: "A1", ex: "Ich liege im Bett." },
  { de: "der Schrank", zh: "櫃子", topic: "Wohnen 居住", level: "A2", ex: "Die Gläser sind im Schrank." },
  { de: "die Lampe", zh: "燈", topic: "Wohnen 居住", level: "A2", ex: "Mach die Lampe an!" },
  { de: "die Tür", zh: "門", topic: "Wohnen 居住", level: "A1", ex: "Mach bitte die Tür zu." },
  { de: "das Fenster", zh: "窗戶", topic: "Wohnen 居住", level: "A1", ex: "Öffne das Fenster!" },
  { de: "der Garten", zh: "花園", topic: "Wohnen 居住", level: "A2", ex: "Wir haben einen Garten." },
  { de: "der Balkon", zh: "陽台", topic: "Wohnen 居住", level: "A2", ex: "Die Wohnung hat einen Balkon." },
  { de: "die Miete", zh: "房租", topic: "Wohnen 居住", level: "A2", ex: "Die Miete ist hoch." },
  { de: "wohnen", zh: "居住", topic: "Wohnen 居住", level: "A1", ex: "Ich wohne in Taipei." },
  { de: "umziehen", zh: "搬家", topic: "Wohnen 居住", level: "A2", ex: "Wir ziehen nächsten Monat um." },
  { de: "die Möbel", zh: "家具", topic: "Wohnen 居住", level: "A2", ex: "Die Möbel sind neu." },

  // ===== Reisen & Verkehr =====
  { de: "der Urlaub", zh: "假期", topic: "Reisen 旅行", level: "A1", ex: "Ich nehme im Juli Urlaub." },
  { de: "die Reise", zh: "旅行", topic: "Reisen 旅行", level: "A1", ex: "Gute Reise!" },
  { de: "reisen", zh: "旅行", topic: "Reisen 旅行", level: "A1", ex: "Ich reise gern." },
  { de: "das Hotel", zh: "飯店", topic: "Reisen 旅行", level: "A1", ex: "Wir wohnen im Hotel." },
  { de: "das Meer", zh: "海", topic: "Reisen 旅行", level: "A1", ex: "Wir fahren ans Meer." },
  { de: "der Strand", zh: "海灘", topic: "Reisen 旅行", level: "A2", ex: "Am Strand ist es schön." },
  { de: "der Berg", zh: "山", topic: "Reisen 旅行", level: "A1", ex: "Wir wandern in den Bergen." },
  { de: "der Koffer", zh: "行李箱", topic: "Reisen 旅行", level: "A2", ex: "Mein Koffer ist schwer." },
  { de: "der Pass", zh: "護照", topic: "Reisen 旅行", level: "A2", ex: "Ich brauche meinen Pass." },
  { de: "buchen", zh: "預訂", topic: "Reisen 旅行", level: "A2", ex: "Ich buche ein Zimmer." },
  { de: "übernachten", zh: "過夜", topic: "Reisen 旅行", level: "A2", ex: "Wir übernachten im Hotel." },
  { de: "das Auto", zh: "汽車", topic: "Verkehr 交通", level: "A1", ex: "Er fährt mit dem Auto." },
  { de: "der Bus", zh: "公車", topic: "Verkehr 交通", level: "A1", ex: "Der Bus kommt gleich." },
  { de: "der Zug", zh: "火車", topic: "Verkehr 交通", level: "A1", ex: "Der Zug fährt um acht." },
  { de: "das Fahrrad", zh: "腳踏車", topic: "Verkehr 交通", level: "A1", ex: "Ich fahre mit dem Fahrrad." },
  { de: "das Flugzeug", zh: "飛機", topic: "Verkehr 交通", level: "A1", ex: "Das Flugzeug ist spät." },
  { de: "der Bahnhof", zh: "火車站", topic: "Verkehr 交通", level: "A1", ex: "Wo ist der Bahnhof?" },
  { de: "der Flughafen", zh: "機場", topic: "Verkehr 交通", level: "A2", ex: "Ich fahre zum Flughafen." },
  { de: "die Fahrkarte", zh: "車票", topic: "Verkehr 交通", level: "A2", ex: "Ihre Fahrkarte, bitte." },
  { de: "die Haltestelle", zh: "車站(公車)", topic: "Verkehr 交通", level: "A2", ex: "An der Haltestelle aussteigen." },
  { de: "fahren", zh: "開/搭", topic: "Verkehr 交通", level: "A1", ex: "Wir fahren nach Berlin." },
  { de: "fliegen", zh: "飛", topic: "Verkehr 交通", level: "A2", ex: "Ich fliege nach Spanien." },
  { de: "abfahren", zh: "出發", topic: "Verkehr 交通", level: "A2", ex: "Der Zug fährt jetzt ab." },
  { de: "ankommen", zh: "抵達", topic: "Verkehr 交通", level: "A2", ex: "Wann kommt der Zug an?" },
  { de: "umsteigen", zh: "轉乘", topic: "Verkehr 交通", level: "A2", ex: "Sie müssen in Köln umsteigen." },
  { de: "die Straße", zh: "街道", topic: "Verkehr 交通", level: "A1", ex: "Die Straße ist lang." },
  { de: "links", zh: "左邊", topic: "Verkehr 交通", level: "A1", ex: "Gehen Sie nach links." },
  { de: "rechts", zh: "右邊", topic: "Verkehr 交通", level: "A1", ex: "Das Café ist rechts." },
  { de: "geradeaus", zh: "直走", topic: "Verkehr 交通", level: "A2", ex: "Gehen Sie geradeaus." },

  // ===== Arbeit & Schule =====
  { de: "die Arbeit", zh: "工作", topic: "Arbeit 工作", level: "A1", ex: "Ich suche Arbeit." },
  { de: "arbeiten", zh: "工作", topic: "Arbeit 工作", level: "A1", ex: "Wo arbeiten Sie?" },
  { de: "der Beruf", zh: "職業", topic: "Arbeit 工作", level: "A1", ex: "Was sind Sie von Beruf?" },
  { de: "das Büro", zh: "辦公室", topic: "Arbeit 工作", level: "A1", ex: "Ich arbeite im Büro." },
  { de: "die Firma", zh: "公司", topic: "Arbeit 工作", level: "A2", ex: "Er arbeitet bei einer Firma." },
  { de: "der Chef", zh: "老闆", topic: "Arbeit 工作", level: "A2", ex: "Wir haben einen neuen Chef." },
  { de: "verdienen", zh: "賺錢", topic: "Arbeit 工作", level: "A2", ex: "Ich verdiene genug." },
  { de: "der Termin", zh: "預約", topic: "Arbeit 工作", level: "A2", ex: "Ich habe einen Termin." },
  { de: "die Pause", zh: "休息", topic: "Arbeit 工作", level: "A2", ex: "Wir machen eine Pause." },
  { de: "das Praktikum", zh: "實習", topic: "Arbeit 工作", level: "A2", ex: "Ich mache ein Praktikum." },
  { de: "die Schule", zh: "學校", topic: "Schule 學校", level: "A1", ex: "Ich gehe in die Schule." },
  { de: "lernen", zh: "學習", topic: "Schule 學校", level: "A1", ex: "Ich lerne Deutsch." },
  { de: "der Lehrer", zh: "老師", topic: "Schule 學校", level: "A1", ex: "Unser Lehrer ist nett." },
  { de: "der Schüler", zh: "學生", topic: "Schule 學校", level: "A2", ex: "Die Schüler lernen viel." },
  { de: "der Student", zh: "大學生", topic: "Schule 學校", level: "A1", ex: "Ich bin Studentin." },
  { de: "studieren", zh: "讀大學", topic: "Schule 學校", level: "A2", ex: "Ich studiere in Mainz." },
  { de: "die Prüfung", zh: "考試", topic: "Schule 學校", level: "A2", ex: "Die Prüfung ist am Montag." },
  { de: "die Hausaufgabe", zh: "作業", topic: "Schule 學校", level: "A2", ex: "Mach deine Hausaufgaben!" },
  { de: "die Universität", zh: "大學", topic: "Schule 學校", level: "A2", ex: "Er studiert an der Universität." },
  { de: "das Zeugnis", zh: "成績單", topic: "Schule 學校", level: "A2", ex: "Ich bekomme mein Zeugnis." },

  // ===== Einkaufen =====
  { de: "kaufen", zh: "買", topic: "Einkaufen 購物", level: "A1", ex: "Ich kaufe ein Auto." },
  { de: "einkaufen", zh: "購物", topic: "Einkaufen 購物", level: "A2", ex: "Ich gehe einkaufen." },
  { de: "verkaufen", zh: "賣", topic: "Einkaufen 購物", level: "A2", ex: "Er verkauft sein Auto." },
  { de: "das Geschäft", zh: "商店", topic: "Einkaufen 購物", level: "A1", ex: "Das Geschäft ist zu." },
  { de: "der Supermarkt", zh: "超市", topic: "Einkaufen 購物", level: "A1", ex: "Ich kaufe im Supermarkt ein." },
  { de: "der Markt", zh: "市場", topic: "Einkaufen 購物", level: "A1", ex: "Samstags ist Markt." },
  { de: "das Geld", zh: "錢", topic: "Einkaufen 購物", level: "A1", ex: "Hast du Geld dabei?" },
  { de: "der Euro", zh: "歐元", topic: "Einkaufen 購物", level: "A1", ex: "Das kostet zehn Euro." },
  { de: "kosten", zh: "花費", topic: "Einkaufen 購物", level: "A1", ex: "Wie viel kostet das?" },
  { de: "bezahlen", zh: "付款", topic: "Einkaufen 購物", level: "A2", ex: "Wo kann ich bezahlen?" },
  { de: "der Preis", zh: "價格", topic: "Einkaufen 購物", level: "A2", ex: "Der Preis ist hoch." },
  { de: "billig", zh: "便宜", topic: "Einkaufen 購物", level: "A1", ex: "Die Jacke ist billig." },
  { de: "teuer", zh: "貴", topic: "Einkaufen 購物", level: "A1", ex: "Das ist mir zu teuer." },
  { de: "günstig", zh: "划算", topic: "Einkaufen 購物", level: "A2", ex: "Das Angebot ist günstig." },
  { de: "die Kasse", zh: "收銀台", topic: "Einkaufen 購物", level: "A2", ex: "Bitte an der Kasse zahlen." },
  { de: "die Rechnung", zh: "帳單", topic: "Einkaufen 購物", level: "A2", ex: "Die Rechnung, bitte." },

  // ===== Kleidung =====
  { de: "die Kleidung", zh: "衣服", topic: "Kleidung 服裝", level: "A2", ex: "Wo finde ich Kleidung?" },
  { de: "die Hose", zh: "褲子", topic: "Kleidung 服裝", level: "A2", ex: "Die Hose ist zu lang." },
  { de: "das Hemd", zh: "襯衫", topic: "Kleidung 服裝", level: "A2", ex: "Er trägt ein weißes Hemd." },
  { de: "die Jacke", zh: "外套", topic: "Kleidung 服裝", level: "A2", ex: "Zieh die Jacke an!" },
  { de: "das Kleid", zh: "洋裝", topic: "Kleidung 服裝", level: "A2", ex: "Das Kleid ist schön." },
  { de: "der Schuh", zh: "鞋子", topic: "Kleidung 服裝", level: "A1", ex: "Die Schuhe sind neu." },
  { de: "tragen", zh: "穿/帶", topic: "Kleidung 服裝", level: "A2", ex: "Sie trägt ein Kleid." },

  // ===== Körper & Gesundheit =====
  { de: "der Kopf", zh: "頭", topic: "Körper 身體", level: "A1", ex: "Mein Kopf tut weh." },
  { de: "die Hand", zh: "手", topic: "Körper 身體", level: "A1", ex: "Wasch dir die Hände!" },
  { de: "der Arm", zh: "手臂", topic: "Körper 身體", level: "A2", ex: "Mein Arm tut weh." },
  { de: "das Bein", zh: "腿", topic: "Körper 身體", level: "A2", ex: "Mein Bein tut weh." },
  { de: "der Fuß", zh: "腳", topic: "Körper 身體", level: "A1", ex: "Ich gehe zu Fuß." },
  { de: "das Auge", zh: "眼睛", topic: "Körper 身體", level: "A1", ex: "Er hat blaue Augen." },
  { de: "der Bauch", zh: "肚子", topic: "Körper 身體", level: "A2", ex: "Mein Bauch tut weh." },
  { de: "der Arzt", zh: "醫生", topic: "Körper 身體", level: "A1", ex: "Ich gehe zum Arzt." },
  { de: "krank", zh: "生病", topic: "Körper 身體", level: "A1", ex: "Ich bin krank." },
  { de: "gesund", zh: "健康", topic: "Körper 身體", level: "A2", ex: "Obst ist gesund." },
  { de: "das Krankenhaus", zh: "醫院", topic: "Körper 身體", level: "A1", ex: "Er ist im Krankenhaus." },
  { de: "die Apotheke", zh: "藥局", topic: "Körper 身體", level: "A2", ex: "Das gibt es in der Apotheke." },
  { de: "das Medikament", zh: "藥", topic: "Körper 身體", level: "A2", ex: "Nimm das Medikament!" },
  { de: "das Fieber", zh: "發燒", topic: "Körper 身體", level: "A2", ex: "Sie hat Fieber." },
  { de: "die Schmerzen", zh: "疼痛", topic: "Körper 身體", level: "A2", ex: "Ich habe Schmerzen." },
  { de: "müde", zh: "疲倦", topic: "Körper 身體", level: "A2", ex: "Ich bin sehr müde." },

  // ===== Freizeit =====
  { de: "die Freizeit", zh: "休閒", topic: "Freizeit 休閒", level: "A1", ex: "In der Freizeit lese ich." },
  { de: "das Hobby", zh: "嗜好", topic: "Freizeit 休閒", level: "A1", ex: "Mein Hobby ist Schwimmen." },
  { de: "spielen", zh: "玩", topic: "Freizeit 休閒", level: "A1", ex: "Die Kinder spielen draußen." },
  { de: "lesen", zh: "閱讀", topic: "Freizeit 休閒", level: "A1", ex: "Ich lese ein Buch." },
  { de: "schwimmen", zh: "游泳", topic: "Freizeit 休閒", level: "A1", ex: "Ich schwimme jeden Tag." },
  { de: "tanzen", zh: "跳舞", topic: "Freizeit 休閒", level: "A2", ex: "Tanzen Sie gern?" },
  { de: "singen", zh: "唱歌", topic: "Freizeit 休閒", level: "A2", ex: "Wir singen ein Lied." },
  { de: "wandern", zh: "健行", topic: "Freizeit 休閒", level: "A2", ex: "Wir gehen oft wandern." },
  { de: "die Musik", zh: "音樂", topic: "Freizeit 休閒", level: "A1", ex: "Ich höre gern Musik." },
  { de: "der Film", zh: "電影", topic: "Freizeit 休閒", level: "A1", ex: "Der Film ist gut." },
  { de: "das Kino", zh: "電影院", topic: "Freizeit 休閒", level: "A1", ex: "Gehen wir ins Kino?" },
  { de: "das Buch", zh: "書", topic: "Freizeit 休閒", level: "A1", ex: "Das Buch ist interessant." },
  { de: "der Sport", zh: "運動", topic: "Freizeit 休閒", level: "A1", ex: "Ich mache viel Sport." },
  { de: "der Fußball", zh: "足球", topic: "Freizeit 休閒", level: "A1", ex: "Spielst du Fußball?" },
  { de: "die Party", zh: "派對", topic: "Freizeit 休閒", level: "A2", ex: "Wir machen eine Party." },
  { de: "fernsehen", zh: "看電視", topic: "Freizeit 休閒", level: "A2", ex: "Abends sehe ich fern." },

  // ===== Verben =====
  { de: "sein", zh: "是", topic: "Verben 動詞", level: "A1", ex: "Ich bin müde." },
  { de: "haben", zh: "有", topic: "Verben 動詞", level: "A1", ex: "Hast du Zeit?" },
  { de: "machen", zh: "做", topic: "Verben 動詞", level: "A1", ex: "Was machst du?" },
  { de: "gehen", zh: "走/去", topic: "Verben 動詞", level: "A1", ex: "Ich gehe nach Hause." },
  { de: "kommen", zh: "來", topic: "Verben 動詞", level: "A1", ex: "Woher kommst du?" },
  { de: "sehen", zh: "看", topic: "Verben 動詞", level: "A1", ex: "Ich sehe dich nicht." },
  { de: "sprechen", zh: "說", topic: "Verben 動詞", level: "A1", ex: "Sprechen Sie Deutsch?" },
  { de: "sagen", zh: "說/告訴", topic: "Verben 動詞", level: "A1", ex: "Was hast du gesagt?" },
  { de: "geben", zh: "給", topic: "Verben 動詞", level: "A1", ex: "Gib mir das Buch." },
  { de: "nehmen", zh: "拿", topic: "Verben 動詞", level: "A1", ex: "Ich nehme den Bus." },
  { de: "finden", zh: "找/覺得", topic: "Verben 動詞", level: "A1", ex: "Ich finde das gut." },
  { de: "wissen", zh: "知道", topic: "Verben 動詞", level: "A1", ex: "Ich weiß es nicht." },
  { de: "denken", zh: "想", topic: "Verben 動詞", level: "A2", ex: "Ich denke, du hast recht." },
  { de: "brauchen", zh: "需要", topic: "Verben 動詞", level: "A1", ex: "Ich brauche Hilfe." },
  { de: "schreiben", zh: "寫", topic: "Verben 動詞", level: "A1", ex: "Ich schreibe einen Brief." },
  { de: "warten", zh: "等", topic: "Verben 動詞", level: "A2", ex: "Bitte warten Sie kurz." },
  { de: "helfen", zh: "幫助", topic: "Verben 動詞", level: "A2", ex: "Können Sie mir helfen?" },
  { de: "bringen", zh: "帶來", topic: "Verben 動詞", level: "A2", ex: "Bring mir einen Kaffee." },
  { de: "verstehen", zh: "理解", topic: "Verben 動詞", level: "A1", ex: "Ich verstehe das nicht." },
  { de: "bekommen", zh: "得到", topic: "Verben 動詞", level: "A2", ex: "Ich bekomme einen Brief." },
  { de: "bleiben", zh: "停留", topic: "Verben 動詞", level: "A2", ex: "Ich bleibe zu Hause." },
  { de: "öffnen", zh: "打開", topic: "Verben 動詞", level: "A2", ex: "Öffnen Sie die Tür." },
  { de: "schließen", zh: "關閉", topic: "Verben 動詞", level: "A2", ex: "Die Bank schließt um vier." },
  { de: "anfangen", zh: "開始", topic: "Verben 動詞", level: "A2", ex: "Der Kurs fängt an." },
  { de: "aufhören", zh: "停止", topic: "Verben 動詞", level: "A2", ex: "Hör auf zu reden!" },
  { de: "treffen", zh: "遇見", topic: "Verben 動詞", level: "A2", ex: "Wir treffen uns um acht." },
  { de: "besuchen", zh: "拜訪", topic: "Verben 動詞", level: "A2", ex: "Ich besuche meine Oma." },
  { de: "einladen", zh: "邀請", topic: "Verben 動詞", level: "A2", ex: "Ich lade dich ein." },
  { de: "anrufen", zh: "打電話", topic: "Verben 動詞", level: "A2", ex: "Ruf mich später an." },
  { de: "aufstehen", zh: "起床", topic: "Verben 動詞", level: "A2", ex: "Ich stehe um sieben auf." },
  { de: "vergessen", zh: "忘記", topic: "Verben 動詞", level: "A2", ex: "Vergiss das nicht!" },
  { de: "erklären", zh: "解釋", topic: "Verben 動詞", level: "A2", ex: "Kannst du das erklären?" },
  { de: "erzählen", zh: "敘述", topic: "Verben 動詞", level: "A2", ex: "Erzähl mir davon!" },
  { de: "wiederholen", zh: "重複", topic: "Verben 動詞", level: "A2", ex: "Bitte wiederholen Sie." },
  { de: "benutzen", zh: "使用", topic: "Verben 動詞", level: "A2", ex: "Darf ich das benutzen?" },
  { de: "versuchen", zh: "嘗試", topic: "Verben 動詞", level: "A2", ex: "Ich versuche es." },

  // ===== Adjektive =====
  { de: "gut", zh: "好", topic: "Adjektive 形容詞", level: "A1", ex: "Das finde ich gut." },
  { de: "schlecht", zh: "壞", topic: "Adjektive 形容詞", level: "A1", ex: "Das Wetter ist schlecht." },
  { de: "groß", zh: "大", topic: "Adjektive 形容詞", level: "A1", ex: "Das Haus ist groß." },
  { de: "klein", zh: "小", topic: "Adjektive 形容詞", level: "A1", ex: "Die Wohnung ist klein." },
  { de: "neu", zh: "新", topic: "Adjektive 形容詞", level: "A1", ex: "Ich habe ein neues Auto." },
  { de: "alt", zh: "舊/老", topic: "Adjektive 形容詞", level: "A1", ex: "Wie alt bist du?" },
  { de: "schön", zh: "美", topic: "Adjektive 形容詞", level: "A1", ex: "Das Bild ist schön." },
  { de: "jung", zh: "年輕", topic: "Adjektive 形容詞", level: "A1", ex: "Sie ist noch jung." },
  { de: "lang", zh: "長", topic: "Adjektive 形容詞", level: "A1", ex: "Die Straße ist lang." },
  { de: "kurz", zh: "短", topic: "Adjektive 形容詞", level: "A1", ex: "Er hat kurze Haare." },
  { de: "schnell", zh: "快", topic: "Adjektive 形容詞", level: "A1", ex: "Das Auto ist schnell." },
  { de: "langsam", zh: "慢", topic: "Adjektive 形容詞", level: "A1", ex: "Sprich bitte langsam." },
  { de: "richtig", zh: "正確", topic: "Adjektive 形容詞", level: "A2", ex: "Das ist richtig." },
  { de: "falsch", zh: "錯", topic: "Adjektive 形容詞", level: "A2", ex: "Die Antwort ist falsch." },
  { de: "wichtig", zh: "重要", topic: "Adjektive 形容詞", level: "A2", ex: "Das ist sehr wichtig." },
  { de: "einfach", zh: "簡單", topic: "Adjektive 形容詞", level: "A2", ex: "Die Prüfung ist einfach." },
  { de: "schwer", zh: "難/重", topic: "Adjektive 形容詞", level: "A2", ex: "Der Koffer ist schwer." },
  { de: "schwierig", zh: "困難", topic: "Adjektive 形容詞", level: "A2", ex: "Das ist schwierig." },
  { de: "interessant", zh: "有趣", topic: "Adjektive 形容詞", level: "A2", ex: "Das Buch ist interessant." },
  { de: "glücklich", zh: "快樂", topic: "Adjektive 形容詞", level: "A2", ex: "Ich bin sehr glücklich." },
  { de: "freundlich", zh: "友善", topic: "Adjektive 形容詞", level: "A2", ex: "Er ist sehr freundlich." },
  { de: "nett", zh: "親切", topic: "Adjektive 形容詞", level: "A1", ex: "Das ist nett von dir." },
  { de: "müde", zh: "累", topic: "Adjektive 形容詞", level: "A1", ex: "Ich bin müde." },
  { de: "fertig", zh: "完成", topic: "Adjektive 形容詞", level: "A2", ex: "Das Essen ist fertig." },

  // ===== Farben & Zahlen =====
  { de: "rot", zh: "紅色", topic: "Farben 顏色", level: "A1", ex: "Der Apfel ist rot." },
  { de: "blau", zh: "藍色", topic: "Farben 顏色", level: "A1", ex: "Der Himmel ist blau." },
  { de: "grün", zh: "綠色", topic: "Farben 顏色", level: "A1", ex: "Das Gras ist grün." },
  { de: "gelb", zh: "黃色", topic: "Farben 顏色", level: "A1", ex: "Die Banane ist gelb." },
  { de: "schwarz", zh: "黑色", topic: "Farben 顏色", level: "A1", ex: "Die Katze ist schwarz." },
  { de: "weiß", zh: "白色", topic: "Farben 顏色", level: "A1", ex: "Der Schnee ist weiß." },
  { de: "braun", zh: "棕色", topic: "Farben 顏色", level: "A1", ex: "Das Brot ist braun." },
  { de: "eins", zh: "一", topic: "Zahlen 數字", level: "A1", ex: "Eins, zwei, drei." },
  { de: "zehn", zh: "十", topic: "Zahlen 數字", level: "A1", ex: "Ich habe zehn Euro." },
  { de: "hundert", zh: "一百", topic: "Zahlen 數字", level: "A1", ex: "Das kostet hundert Euro." },
  { de: "tausend", zh: "一千", topic: "Zahlen 數字", level: "A2", ex: "Zweitausend Menschen kamen." },

  // ===== Kommunikation & Alltag =====
  { de: "die Sprache", zh: "語言", topic: "Alltag 日常", level: "A1", ex: "Welche Sprachen sprichst du?" },
  { de: "das Telefon", zh: "電話", topic: "Alltag 日常", level: "A1", ex: "Hast du Telefon?" },
  { de: "das Handy", zh: "手機", topic: "Alltag 日常", level: "A1", ex: "Mein Handy ist kaputt." },
  { de: "der Computer", zh: "電腦", topic: "Alltag 日常", level: "A1", ex: "Der Computer ist neu." },
  { de: "das Internet", zh: "網路", topic: "Alltag 日常", level: "A2", ex: "Das findest du im Internet." },
  { de: "die E-Mail", zh: "電子郵件", topic: "Alltag 日常", level: "A1", ex: "Ich schreibe eine E-Mail." },
  { de: "der Brief", zh: "信", topic: "Alltag 日常", level: "A2", ex: "Ich bekomme einen Brief." },
  { de: "die Post", zh: "郵局", topic: "Alltag 日常", level: "A1", ex: "Wo ist die Post?" },
  { de: "die Frage", zh: "問題", topic: "Alltag 日常", level: "A1", ex: "Ich habe eine Frage." },
  { de: "die Antwort", zh: "回答", topic: "Alltag 日常", level: "A1", ex: "Das ist die richtige Antwort." },
  { de: "das Problem", zh: "難題", topic: "Alltag 日常", level: "A2", ex: "Kein Problem!" },
  { de: "die Idee", zh: "點子", topic: "Alltag 日常", level: "A2", ex: "Das ist eine gute Idee." },
  { de: "danke", zh: "謝謝", topic: "Alltag 日常", level: "A1", ex: "Vielen Dank!" },
  { de: "bitte", zh: "請/不客氣", topic: "Alltag 日常", level: "A1", ex: "Einen Kaffee, bitte." },
  { de: "ja", zh: "是", topic: "Alltag 日常", level: "A1", ex: "Ja, gern." },
  { de: "nein", zh: "不", topic: "Alltag 日常", level: "A1", ex: "Nein, danke." },
  { de: "gern", zh: "樂意", topic: "Alltag 日常", level: "A1", ex: "Ich helfe dir gern." },
  { de: "vielleicht", zh: "也許", topic: "Alltag 日常", level: "A2", ex: "Vielleicht komme ich." },
  { de: "zusammen", zh: "一起", topic: "Alltag 日常", level: "A2", ex: "Wir essen zusammen." },
  { de: "die Bank", zh: "銀行", topic: "Alltag 日常", level: "A1", ex: "Die Bank ist zu." },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

// 級別系統（四級）
const LEVELS = ["A1.1", "A1.2", "A2.1", "A2.2"];
const LEVEL_LABELS = {
  "A1.1": "A1.1 入門", "A1.2": "A1.2 基礎",
  "A2.1": "A2.1 進階", "A2.2": "A2.2 高階",
};
const LEVEL_COLORS = {
  "A1.1": "#34D399", "A1.2": "#3B82F6",
  "A2.1": "#F59E0B", "A2.2": "#EF4444",
};

// AI 出題：呼叫 Anthropic API（部署後 + 填入金鑰才會運作）
async function generateQuestions({ aiKey, module, level, count = 5 }) {
  if (!aiKey) throw new Error("尚未設定 AI 金鑰。部署後在設定中填入即可使用。");

  const moduleSpec = {
    listening: `聽力選擇題。每題需要：tts（一句德語，給語音朗讀，符合${level}難度，務必加入歌德式陷阱：否定nicht/kein、轉折aber/sondern、更正nein...、eigentlich...aber 等，讓答案不能只靠關鍵詞猜）、question（德語問題）、questionZh（中文翻譯）、options（4個德語選項，干擾項要看起來都合理，包含被否定的錯誤資訊）、answer（正確選項，需與options其中之一完全相同）、trap（中文說明這題的陷阱類型）。`,
    reading: `閱讀理解。需要：text（一段德語短文，${level}難度，歌德題型如訊息/郵件/告示，務必使用否定nicht/kein、轉折aber/sondern、eigentlich...aber、nicht mehr...jetzt 等讓題目有陷阱）、questions（3題，每題有q德語問題、zh中文、options四選項（干擾項要包含文中被否定或對比的錯誤資訊）、answer答案、trap中文陷阱說明）。`,
    writing: `寫作題目。需要：prompt（德語寫作指示）、promptZh（中文）、hints（4個德語提示句）、minWords（最少字數）、example（範例答案）。`,
    speaking: `口說題目。需要：prompt（德語口說指示）、promptZh（中文）、guide（德語提示關鍵詞）、guideZh（中文）、example（德語範例答案）、tips（2-3個中文小技巧）。`,
    grammar: `文法選擇/填空練習。每題需要：q（德語句子，挖空用 ___ 表示）、options（3個德語選項）、answer（正確選項，需與options其一完全相同）、hint（中文解題提示）。主題：${level}級別的文法重點。`,
  };

  const sys = `你是德語檢定出題專家，精通歌德學院 A1/A2 題型。請嚴格依照要求生成 JSON，只輸出 JSON 陣列，不要任何其他文字、不要 markdown 標記。`;
  const userMsg = `請生成 ${module === "reading" ? count <= 3 ? 1 : 2 : count} 個「${level}」級別的德語${
    { listening: "聽力", reading: "閱讀", writing: "寫作", speaking: "口說", grammar: "文法" }[module]
  }題目。\n格式：${moduleSpec[module]}\n難度嚴格符合 ${level}（A1.1最簡單，A2.2最難）。只回傳 JSON 陣列。`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": aiKey, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      system: sys,
      messages: [{ role: "user", content: userMsg }],
    }),
  });
  if (!res.ok) throw new Error("AI 出題失敗，請確認金鑰是否正確（需 Anthropic API 金鑰）。");
  const data = await res.json();
  let txt = data.content.map(c => c.text || "").join("").trim();
  txt = txt.replace(/```json/g, "").replace(/```/g, "").trim();
  return JSON.parse(txt);
}

function LevelFilter({ current, onChange }) {
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
      <button onClick={() => onChange("all")} style={{
        background: current === "all" ? "#7C3AED" : "#fff", color: current === "all" ? "#fff" : "#7C3AED",
        border: "2px solid #7C3AED", borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer"
      }}>全部</button>
      {LEVELS.map(lv => (
        <button key={lv} onClick={() => onChange(lv)} style={{
          background: current === lv ? LEVEL_COLORS[lv] : "#fff",
          color: current === lv ? "#fff" : LEVEL_COLORS[lv],
          border: `2px solid ${LEVEL_COLORS[lv]}`, borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer"
        }}>{lv}</button>
      ))}
    </div>
  );
}

function AiGenerateButton({ aiKey, module, level, onResult, onSetAiKey }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const gen = async () => {
    setLoading(true); setErr("");
    try {
      const lv = level === "all" ? "A1.1" : level;
      const items = await generateQuestions({ aiKey, module, level: lv, count: 5 });
      onResult(items);
    } catch (e) {
      setErr(e.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ marginBottom: 14 }}>
      <button onClick={gen} disabled={loading} style={{
        width: "100%", background: loading ? "#C4B5FD" : "linear-gradient(135deg, #7C3AED, #FF6B9D)",
        color: "#fff", border: "none", borderRadius: 14, padding: "12px", fontSize: 14, fontWeight: 800,
        cursor: loading ? "default" : "pointer", boxShadow: "0 4px 14px #7C3AED44"
      }}>
        {loading ? "✨ 生成中⋯ (請稍候)" : "✨ 生成新題目"}
      </button>
      {err && <div style={{ fontSize: 12, color: "#EF4444", marginTop: 6, lineHeight: 1.5 }}>⚠️ {err}</div>}
    </div>
  );
}

// Google Cloud TTS — 傳入 apiKey 時用高品質語音，否則 fallback 到瀏覽器 TTS
// 嘗試挑一個德語語音（手機 Safari 常需要明確指定，否則用錯發音）
function pickGermanVoice() {
  const voices = window.speechSynthesis.getVoices() || [];
  // 優先找 de-DE，其次任何 de 開頭
  return voices.find(v => v.lang === "de-DE")
    || voices.find(v => v.lang && v.lang.toLowerCase().startsWith("de"))
    || null;
}

function speakBrowser(text) {
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE";
    u.rate = 0.85;
    const v = pickGermanVoice();
    if (v) u.voice = v;
    // 手機有時語音清單還沒載入，等一下再唸
    if (!v && window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        const v2 = pickGermanVoice();
        if (v2) u.voice = v2;
        window.speechSynthesis.speak(u);
        window.speechSynthesis.onvoiceschanged = null;
      };
      return;
    }
    window.speechSynthesis.speak(u);
  } catch (e) {
    // 靜默失敗
  }
}

async function speakGoogle(text, apiKey) {
  if (!apiKey) {
    speakBrowser(text);
    return;
  }
  const res = await fetch(
    `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: { text },
        voice: { languageCode: "de-DE", name: "de-DE-Neural2-B", ssmlGender: "MALE" },
        audioConfig: { audioEncoding: "MP3", speakingRate: 0.9, pitch: 0 },
      }),
    }
  );
  if (!res.ok) throw new Error("Google TTS 失敗，請確認 API 金鑰是否正確");
  const { audioContent } = await res.json();
  const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
  audio.play();
  return audio;
}

function speak(text) {
  speakBrowser(text);
}

// ─── API KEY CONTEXT ──────────────────────────────────────────────────────────

function ApiKeyBanner({ apiKey, onSet }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(apiKey || "");

  if (!editing && apiKey) return (
    <div style={{ background: "#D1FAE5", border: "1.5px solid #10B981", borderRadius: 10, padding: "8px 14px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: 13, color: "#065F46", fontWeight: 700 }}>✅ Google TTS 已啟用（高品質德語語音）</span>
      <button onClick={() => setEditing(true)} style={{ background: "none", border: "none", color: "#10B981", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>更換</button>
    </div>
  );

  return (
    <div style={{ background: "#EFF6FF", border: "1.5px solid #3B82F6", borderRadius: 12, padding: 14, marginBottom: 14 }}>
      <div style={{ fontWeight: 700, color: "#1E3A5F", marginBottom: 6, fontSize: 13 }}>🔑 輸入 Google Cloud TTS API 金鑰</div>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={val} onChange={e => setVal(e.target.value)} placeholder="AIzaSy..."
          style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "1.5px solid #3B82F6", fontSize: 13, outline: "none" }} />
        <button onClick={() => { onSet(val.trim()); setEditing(false); }}
          style={{ background: C.blue, color: "#fff", border: "none", borderRadius: 8, padding: "8px 14px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          確認
        </button>
      </div>
      <div style={{ fontSize: 11, color: "#6B7280", marginTop: 6 }}>
        沒有金鑰？仍可使用瀏覽器 TTS（電腦較準，手機可能發音不準）。建議聽力用電腦，或填入 Google 金鑰獲得高品質語音。
        <a href="https://console.cloud.google.com" target="_blank" rel="noreferrer" style={{ color: C.blue, marginLeft: 4 }}>取得金鑰 →</a>
      </div>
    </div>
  );
}

function btnStyle(color, outline = false) {
  return {
    background: outline ? "transparent" : color,
    color: outline ? color : "#fff",
    border: `2px solid ${color}`,
    borderRadius: 12, padding: "10px 20px",
    fontSize: 14, fontWeight: 800, cursor: "pointer",
    boxShadow: outline ? "none" : `0 3px 10px ${color}44`,
    transition: "all 0.2s",
  };
}

function Card({ children, color = C.purple, style = {} }) {
  return (
    <div style={{ background: "#fff", borderRadius: 18, padding: 20, border: `2px solid ${color}33`, boxShadow: `0 4px 16px ${color}15`, marginBottom: 14, ...style }}>
      {children}
    </div>
  );
}

function Badge({ text, color }) {
  return <span style={{ background: color + "22", color, border: `1.5px solid ${color}`, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>{text}</span>;
}

function SourceBadge({ text }) {
  return (
    <div style={{
      display: "inline-block", background: "linear-gradient(135deg, #FEF3C7, #FDE68A)",
      color: "#92400E", border: "2px solid #F59E0B", borderRadius: 10,
      padding: "6px 12px", fontSize: 13, fontWeight: 800, marginBottom: 10, lineHeight: 1.4
    }}>
      📌 {text}
    </div>
  );
}

function DailyQuote() {
  // 依當天日期選一句（每天固定一句，隔天換）
  const dayIndex = Math.floor(Date.now() / 86400000) % DAILY_QUOTES.length;
  const [i, setI] = useState(dayIndex);
  const q = DAILY_QUOTES[i];
  return (
    <div style={{
      background: "linear-gradient(135deg, #A78BFA, #F0ABFC)", borderRadius: 20,
      padding: "16px 18px", marginBottom: 18, color: "#fff", boxShadow: "0 6px 20px #A78BFA55"
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.9, marginBottom: 6 }}>🌅 每日一句德語</div>
      <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 4, lineHeight: 1.4 }}>{q.de}</div>
      <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.95 }}>{q.zh}</div>
      {q.note && <div style={{ fontSize: 12, opacity: 0.85, marginTop: 8, lineHeight: 1.5 }}>💬 {q.note}</div>}
      <button onClick={() => setI((i + 1) % DAILY_QUOTES.length)}
        style={{ marginTop: 10, background: "#ffffff33", border: "none", borderRadius: 20, padding: "5px 14px", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
        🔄 換一句
      </button>
    </div>
  );
}

function ProgressBar({ value, color }) {
  return (
    <div style={{ background: "#EDE9FE", borderRadius: 99, height: 8, overflow: "hidden", margin: "8px 0" }}>
      <div style={{ width: `${value}%`, background: color, height: "100%", borderRadius: 99, transition: "width 0.5s" }} />
    </div>
  );
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────

const DEMO_USERS = [
  { id: "s001", role: "student", name: "王小明", username: "ming", pass: "1234" },
  { id: "s002", role: "student", name: "陳雅婷", username: "ting", pass: "1234" },
  { id: "t001", role: "teacher", name: "老師 (您)", username: "teacher", pass: "admin" },
];

function LoginPage({ onLogin, users, onRegister }) {
  const [mode, setMode] = useState("login"); // login | register
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [nick, setNick] = useState("");
  const [err, setErr] = useState("");

  const login = () => {
    const user = users.find(u => u.username === username.trim() && u.pass === pass);
    if (user) onLogin(user);
    else setErr("帳號或密碼錯誤，請再試一次。");
  };

  const register = () => {
    setErr("");
    if (!username.trim()) return setErr("請輸入用戶名。");
    if (username.trim().length < 3) return setErr("用戶名至少 3 個字。");
    if (users.find(u => u.username === username.trim())) return setErr("這個用戶名已被使用，換一個吧。");
    if (pass.length < 4) return setErr("密碼至少 4 個字。");
    if (pass !== pass2) return setErr("兩次輸入的密碼不一樣。");
    const newUser = {
      id: "u" + Date.now(), role: "student",
      name: nick.trim() || username.trim(), username: username.trim(), pass,
    };
    onRegister(newUser);
    onLogin(newUser);
  };

  const inputStyle = { display: "block", width: "100%", marginTop: 6, padding: "10px 14px", borderRadius: 10, border: "2px solid #E9D5FF", fontSize: 14, outline: "none", boxSizing: "border-box" };

  return (
    <div style={{ minHeight: "100vh", background: C.soft, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ fontSize: 60, marginBottom: 8 }}>🇩🇪</div>
      <h1 style={{ fontWeight: 900, color: C.purple, fontSize: 24, margin: "0 0 4px" }}>Sam 德語小屋</h1>
      <p style={{ color: "#9CA3AF", fontSize: 13, marginBottom: 24 }}>德語檢定練習平台</p>

      <div style={{ background: "#fff", borderRadius: 24, padding: 28, width: "100%", maxWidth: 360, boxShadow: "0 8px 30px #7C3AED22" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {[["login", "登入"], ["register", "註冊"]].map(([m, label]) => (
            <button key={m} onClick={() => { setMode(m); setErr(""); }} style={{
              flex: 1, background: mode === m ? C.purple : "#F5F0FF", color: mode === m ? "#fff" : C.purple,
              border: "none", borderRadius: 10, padding: "10px", fontWeight: 800, fontSize: 14, cursor: "pointer"
            }}>{label}</button>
          ))}
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: C.purple }}>用戶名</label>
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="輸入用戶名" style={inputStyle} />
        </div>

        {mode === "register" && (
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: C.purple }}>暱稱（顯示名稱，可留空）</label>
            <input value={nick} onChange={e => setNick(e.target.value)} placeholder="例如：小明" style={inputStyle} />
          </div>
        )}

        <div style={{ marginBottom: mode === "register" ? 14 : 18 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: C.purple }}>密碼</label>
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••" style={inputStyle} />
        </div>

        {mode === "register" && (
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: C.purple }}>再次輸入密碼</label>
            <input type="password" value={pass2} onChange={e => setPass2(e.target.value)} placeholder="••••" style={inputStyle} />
          </div>
        )}

        {err && <div style={{ color: C.red, fontSize: 13, marginBottom: 12 }}>⚠️ {err}</div>}

        <button onClick={mode === "login" ? login : register} style={{ ...btnStyle(C.purple), width: "100%", padding: "13px", fontSize: 15 }}>
          {mode === "login" ? "登入" : "註冊並登入"}
        </button>

        {mode === "register" && (
          <div style={{ marginTop: 16, fontSize: 11, color: "#9CA3AF", lineHeight: 1.6, textAlign: "center" }}>
            註冊即可開始練習。未來正式上線後，<br />將支援 Google 一鍵註冊與資料永久保存。
          </div>
        )}
      </div>
    </div>
  );
}

// ─── LISTENING MODULE ─────────────────────────────────────────────────────────

function ListeningModule({ apiKey, onSetApiKey, aiKey, onSetAiKey }) {
  const [topic, setTopic] = useState(null);
  const [longP, setLongP] = useState(null);
  const [longAns, setLongAns] = useState({});
  const [longDone, setLongDone] = useState(false);
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [played, setPlayed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ttsErr, setTtsErr] = useState("");
  const [level, setLevel] = useState("all");
  const [aiTopics, setAiTopics] = useState([]);
  const audioRef = useRef(null);

  const playTTS = async (text) => {
    setPlaying(true);
    setTtsErr("");
    // stop any previous audio
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    try {
      if (apiKey) {
        const audio = await speakGoogle(text, apiKey);
        audioRef.current = audio;
        audio.onended = () => { setPlaying(false); setPlayed(true); };
      } else {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "de-DE"; u.rate = 0.82;
        const v = pickGermanVoice();
        if (v) u.voice = v;
        u.onend = () => { setPlaying(false); setPlayed(true); };
        const doSpeak = () => window.speechSynthesis.speak(u);
        if (!v && window.speechSynthesis.getVoices().length === 0) {
          window.speechSynthesis.onvoiceschanged = () => {
            const v2 = pickGermanVoice();
            if (v2) u.voice = v2;
            doSpeak();
            window.speechSynthesis.onvoiceschanged = null;
          };
        } else {
          doSpeak();
        }
        // 保險：若 3 秒內沒觸發 onend（手機偶發），解除 loading
        setTimeout(() => setPlaying(false), Math.max(3000, text.length * 90));
      }
    } catch (e) {
      setTtsErr(e.message);
      setPlaying(false);
    }
  };

  // 長篇聽力播放頁
  if (longP) {
    const allAnswered = longP.questions.every((_, i) => longAns[i]);
    const correct = longP.questions.filter((qq, i) => longAns[i] === qq.answer).length;
    return (
      <div>
        <button onClick={() => { setLongP(null); setLongAns({}); setLongDone(false); }} style={{ background: "none", border: "none", color: C.purple, cursor: "pointer", fontWeight: 700, marginBottom: 10 }}>← 返回</button>
        <h2 style={{ fontWeight: 800, color: C.purple, fontSize: 18 }}>{longP.emoji} {longP.title}</h2>
        <SourceBadge text={longP.source} />
        <p style={{ color: "#6B7280", fontSize: 13, margin: "8px 0 14px" }}>{longP.intro}</p>

        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <button onClick={() => playTTS(longP.tts)} disabled={playing}
            style={{ background: playing ? "#C4B5FD" : `linear-gradient(135deg, ${C.purple}, ${C.pink})`, color: "#fff", border: "none", borderRadius: 16, padding: "14px 28px", fontSize: 16, fontWeight: 800, cursor: playing ? "default" : "pointer", boxShadow: "0 4px 16px #7C3AED44" }}>
            {playing ? "🔊 播放中…" : "▶️ 播放整段聽力"}
          </button>
          {ttsErr && <div style={{ color: "#DC2626", fontSize: 12, marginTop: 8 }}>{ttsErr}</div>}
        </div>

        {longP.questions.map((qq, i) => {
          const chosen = longAns[i];
          return (
            <Card key={i} color={C.blue}>
              <div style={{ fontWeight: 800, color: "#1E3A5F", fontSize: 14, marginBottom: 2 }}>{i + 1}. {qq.q}</div>
              <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 10 }}>{qq.qZh}</div>
              <div style={{ display: "grid", gap: 8 }}>
                {qq.options.map(opt => {
                  const isChosen = chosen === opt;
                  const showResult = longDone;
                  const isCorrect = opt === qq.answer;
                  let bg = "#fff", border = "#E5E7EB", color = "#374151";
                  if (showResult && isCorrect) { bg = "#F0FDF4"; border = "#86EFAC"; color = "#166534"; }
                  else if (showResult && isChosen && !isCorrect) { bg = "#FEF2F2"; border = "#FCA5A5"; color = "#DC2626"; }
                  else if (isChosen) { bg = "#EDE9FE"; border = C.purple; color = C.purple; }
                  return (
                    <button key={opt} disabled={longDone} onClick={() => setLongAns(s => ({ ...s, [i]: opt }))}
                      style={{ background: bg, border: `1.5px solid ${border}`, color, borderRadius: 10, padding: "10px 12px", fontSize: 14, fontWeight: 700, cursor: longDone ? "default" : "pointer", textAlign: "left" }}>
                      {opt}{showResult && isCorrect ? " ✓" : ""}
                    </button>
                  );
                })}
              </div>
              {longDone && qq.trap && (
                <div style={{ marginTop: 8, background: "#FEF3C7", border: "1.5px solid #F59E0B", borderRadius: 10, padding: "8px 12px", fontSize: 12, color: "#92400E", lineHeight: 1.6 }}>
                  ⚠️ <b>陷阱解析：</b>{qq.trap}
                </div>
              )}
            </Card>
          );
        })}

        {!longDone ? (
          <button onClick={() => setLongDone(true)} disabled={!allAnswered}
            style={{ ...btnStyle(allAnswered ? C.blue : "#C4B5FD"), width: "100%", marginTop: 8 }}>
            {allAnswered ? "提交作答 ✓" : "請先回答所有題目"}
          </button>
        ) : (
          <div>
            <div style={{ background: "#EEF2FF", border: "1.5px solid #818CF8", borderRadius: 12, padding: 14, marginTop: 10 }}>
              <div style={{ fontWeight: 800, color: "#4F46E5", fontSize: 16, marginBottom: 6 }}>答對 {correct}/{longP.questions.length} 題</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#4F46E5", marginBottom: 4 }}>📝 聽力原文</div>
              <div style={{ fontSize: 14, color: "#1F2937", lineHeight: 1.7 }}>{longP.tts}</div>
              {longP.ttsZh && <div style={{ fontSize: 13, color: "#6B7280", marginTop: 6, lineHeight: 1.7 }}>{longP.ttsZh}</div>}
              <button onClick={() => playTTS(longP.tts)} disabled={playing} style={{ marginTop: 8, background: "#fff", border: "1.5px solid #818CF8", borderRadius: 8, padding: "5px 14px", fontSize: 12, fontWeight: 700, color: "#4F46E5", cursor: "pointer" }}>🔊 再聽一次</button>
            </div>
            <button onClick={() => { setLongP(null); setLongAns({}); setLongDone(false); }} style={{ ...btnStyle(C.purple, true), width: "100%", marginTop: 10 }}>← 返回聽力列表</button>
          </div>
        )}
      </div>
    );
  }

  if (!topic) {
    const baseTopics = LISTENING_TOPICS.filter(t => level === "all" || t.level === level);
    const allTopics = [...aiTopics, ...baseTopics];
    return (
    <div>
      <h2 style={{ fontWeight: 800, color: C.purple, fontSize: 20, marginBottom: 4 }}>🎧 聽力練習</h2>
      <ApiKeyBanner apiKey={apiKey} onSet={onSetApiKey} />
      <LevelFilter current={level} onChange={setLevel} />
      <AiGenerateButton aiKey={aiKey} module="listening" level={level} onResult={items => {
        const newTopic = {
          id: "ai-" + Date.now(), level: level === "all" ? "A1.1" : level,
          topic: "✨ AI 新題組", emoji: "🆕",
    source: "仿歌德 A1/A2 聽力題型・參考 Goethe-Zertifikat Hören",
          exercises: items.map((it, i) => ({ id: "ai-l-" + Date.now() + "-" + i, prompt: "Hören Sie und wählen Sie die richtige Antwort.", promptZh: "請聽，選出正確答案。", ...it })),
        };
        setAiTopics(prev => [newTopic, ...prev]);
      }} />
      <p style={{ color: "#7C3AED", fontSize: 13, marginBottom: 18 }}>選擇主題開始練習</p>

      {/* 長篇聽力（仿真題型：聽一整段，答多題）*/}
      <div style={{ fontWeight: 800, color: C.purple, fontSize: 15, margin: "4px 0 10px" }}>📻 長篇聽力（仿 A2 真實題型）</div>
      {LISTENING_LONG.filter(t => level === "all" || t.level === level).map(t => (
        <Card key={t.id} color={C.purple}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 32 }}>{t.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, color: C.purple, fontSize: 15 }}>{t.title}</div>
              <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                <Badge text={t.level} color={LEVEL_COLORS[t.level] || C.purple} />
                <Badge text={`整段 + ${t.questions.length} 題`} color="#6B7280" />
              </div>
            </div>
            <button onClick={() => { setLongP(t); setLongAns({}); setLongDone(false); setPlayed(false); }} style={btnStyle(C.purple)}>開始</button>
          </div>
        </Card>
      ))}

      <div style={{ fontWeight: 800, color: C.blue, fontSize: 15, margin: "18px 0 10px" }}>🎯 單句陷阱題</div>
      {allTopics.map(t => (
        <Card key={t.id} color={C.blue}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 32 }}>{t.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, color: "#1E3A5F", fontSize: 15 }}>{t.topic}</div>
              <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                <Badge text={t.level} color={LEVEL_COLORS[t.level] || C.blue} />
                <Badge text={`${t.exercises.length} 題`} color="#6B7280" />
              </div>
            </div>
            <button onClick={() => { setTopic(t); setIdx(0); setChosen(null); setScore(0); setDone(false); setPlayed(false); }}
              style={btnStyle(C.blue)}>開始</button>
          </div>
        </Card>
      ))}
    </div>
    );
  }

  const ex = topic.exercises;
  const q = ex[idx];

  if (done) {
    const pct = Math.round(score / ex.length * 100);
    return (
      <div style={{ textAlign: "center", padding: 24 }}>
        <div style={{ fontSize: 56 }}>{pct >= 80 ? "🏆" : pct >= 60 ? "😊" : "💪"}</div>
        <h2 style={{ color: C.purple, fontWeight: 800, fontSize: 22 }}>{pct >= 80 ? "聽得很好！" : pct >= 60 ? "不錯！" : "繼續練習！"}</h2>
        <div style={{ fontSize: 44, fontWeight: 900, color: C.blue, margin: "12px 0" }}>{score}/{ex.length}</div>
        <ProgressBar value={pct} color={C.blue} />
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20, flexWrap: "wrap" }}>
          <button onClick={() => { setIdx(0); setChosen(null); setScore(0); setDone(false); setPlayed(false); }} style={btnStyle(C.blue)}>🔄 重新練習</button>
          <button onClick={() => setTopic(null)} style={btnStyle(C.purple, true)}>← 返回</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => setTopic(null)} style={{ background: "none", border: "none", color: C.purple, cursor: "pointer", fontWeight: 700, marginBottom: 10 }}>← 返回</button>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontWeight: 800, color: C.purple, fontSize: 18 }}>{topic.emoji} {topic.topic}</h2>
        <span style={{ color: C.blue, fontWeight: 700 }}>{idx + 1}/{ex.length}</span>
      </div>
      <ProgressBar value={(idx / ex.length) * 100} color={C.blue} />
      {topic.source && <SourceBadge text={topic.source} />}

      <Card color={C.blue} style={{ textAlign: "center", marginTop: 16 }}>
        <div style={{ fontSize: 14, color: "#374151", marginBottom: 2, fontWeight: 700 }}>{q.prompt}</div>
        <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 12 }}>{q.promptZh}</div>
        <button onClick={() => playTTS(q.tts)} disabled={playing}
          style={{ ...btnStyle(playing ? "#9CA3AF" : C.blue), fontSize: 16, padding: "14px 28px", marginBottom: 8 }}>
          {playing ? "⏳ 播放中..." : played ? "🔊 再聽一次" : "▶️ 播放音檔"}
        </button>
        {!played && <div style={{ fontSize: 12, color: "#9CA3AF" }}>請先播放音檔再作答</div>}
        {ttsErr && <div style={{ fontSize: 12, color: C.red, marginTop: 8 }}>⚠️ {ttsErr}</div>}
      </Card>

      {played && (
        <Card color={C.blue}>
          <div style={{ fontWeight: 800, color: "#1E3A5F", marginBottom: 2, fontSize: 15 }}>{q.question}</div>
          <div style={{ fontWeight: 500, color: "#9CA3AF", marginBottom: 14, fontSize: 12 }}>{q.questionZh}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {q.options.map(opt => {
              let bg = "#fff", border = "2px solid #DBEAFE", col = "#374151";
              if (chosen) {
                if (opt === q.answer) { bg = "#D1FAE5"; border = "2px solid #10B981"; col = "#065F46"; }
                else if (opt === chosen) { bg = "#FEE2E2"; border = "2px solid #EF4444"; col = "#991B1B"; }
              }
              return (
                <button key={opt} disabled={!!chosen} onClick={() => { setChosen(opt); if (opt === q.answer) setScore(s => s + 1); }}
                  style={{ background: bg, border, color: col, borderRadius: 12, padding: "13px 10px", fontSize: 14, fontWeight: 700, cursor: chosen ? "default" : "pointer" }}>
                  {opt}
                </button>
              );
            })}
          </div>
          {chosen && (
            <div style={{ textAlign: "center", marginTop: 14 }}>
              <div style={{ fontSize: 18, marginBottom: 10 }}>{chosen === q.answer ? "🎉 正確！" : `❌ 正確答案：${q.answer}`}</div>
              <div style={{ textAlign: "left", background: "#EEF2FF", border: "1.5px solid #818CF8", borderRadius: 10, padding: "10px 12px", marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#4F46E5", marginBottom: 4 }}>📝 聽力原文</div>
                <div style={{ fontSize: 14, color: "#1F2937", lineHeight: 1.6 }}>{q.tts}</div>
                {q.ttsZh && <div style={{ fontSize: 13, color: "#6B7280", marginTop: 4, lineHeight: 1.6 }}>{q.ttsZh}</div>}
                <button onClick={() => playTTS(q.tts)} disabled={playing}
                  style={{ marginTop: 8, background: "#fff", border: "1.5px solid #818CF8", borderRadius: 8, padding: "4px 12px", fontSize: 12, fontWeight: 700, color: "#4F46E5", cursor: "pointer" }}>
                  🔊 再聽一次
                </button>
              </div>
              {q.trap && (
                <div style={{ textAlign: "left", background: "#FEF3C7", border: "1.5px solid #F59E0B", borderRadius: 10, padding: "8px 12px", fontSize: 12, color: "#92400E", lineHeight: 1.6, marginBottom: 12 }}>
                  ⚠️ <b>陷阱解析：</b>{q.trap}
                </div>
              )}
              <button onClick={() => { setChosen(null); setPlayed(false); if (idx + 1 >= ex.length) setDone(true); else setIdx(i => i + 1); }}
                style={btnStyle(C.blue)}>{idx + 1 >= ex.length ? "查看結果 🏆" : "下一題 →"}</button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

// ─── READING MODULE ───────────────────────────────────────────────────────────

function ReadingModule({ aiKey, onSetAiKey }) {
  const [text, setText] = useState(null);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [level, setLevel] = useState("all");
  const [aiTexts, setAiTexts] = useState([]);

  if (!text) {
    const baseTexts = READING_TEXTS.filter(t => level === "all" || t.level === level);
    const allTexts = [...aiTexts, ...baseTexts];
    return (
    <div>
      <h2 style={{ fontWeight: 800, color: C.purple, fontSize: 20, marginBottom: 4 }}>📖 閱讀測驗</h2>
      <LevelFilter current={level} onChange={setLevel} />
      <AiGenerateButton aiKey={aiKey} module="reading" level={level} onResult={items => {
        const arr = Array.isArray(items) ? items : [items];
        const newTexts = arr.map((it, i) => ({
          id: "ai-r-" + Date.now() + "-" + i, level: level === "all" ? "A1.1" : level,
          type: "AI 短文", emoji: "🆕", title: "✨ AI 新閱讀",
          text: it.text, questions: it.questions || [],
        }));
        setAiTexts(prev => [...newTexts, ...prev]);
      }} />
      <p style={{ color: "#7C3AED", fontSize: 13, marginBottom: 18 }}>歌德題型・短文閱讀</p>
      {allTexts.map(t => (
        <Card key={t.id} color={C.green}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 32 }}>{t.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, color: "#064E3B", fontSize: 15 }}>{t.title}</div>
              <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                <Badge text={t.level} color={LEVEL_COLORS[t.level] || C.green} />
                <Badge text={t.type} color="#6B7280" />
                <Badge text={`${t.questions.length} 題`} color="#6B7280" />
              </div>
            </div>
            <button onClick={() => { setText(t); setQIdx(0); setAnswers({}); setSubmitted(false); }}
              style={btnStyle(C.green)}>開始</button>
          </div>
        </Card>
      ))}
    </div>
    );
  }

  const allAnswered = text.questions.every((_, i) => answers[i] !== undefined);
  const score = submitted ? text.questions.filter((q, i) => answers[i] === q.answer).length : 0;

  return (
    <div>
      <button onClick={() => setText(null)} style={{ background: "none", border: "none", color: C.purple, cursor: "pointer", fontWeight: 700, marginBottom: 10 }}>← 返回</button>
      <h2 style={{ fontWeight: 800, color: C.purple, fontSize: 18, marginBottom: 4 }}>{text.emoji} {text.title}</h2>
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}><Badge text={text.level} color={C.green} /><Badge text={text.type} color="#6B7280" /></div>

      <Card color={C.green}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.green, marginBottom: 4 }}>📄 閱讀材料</div>
        {text.source && <SourceBadge text={text.source} />}
        <div style={{ background: "#F0FDF4", borderRadius: 10, padding: 14, fontSize: 14, lineHeight: 1.8, whiteSpace: "pre-line", color: "#1F2937", fontFamily: "monospace" }}>
          {text.text}
        </div>
      </Card>

      <div style={{ fontWeight: 800, color: C.purple, marginBottom: 10 }}>作答題目</div>
      {text.questions.map((q, i) => (
        <Card key={i} color={submitted ? (answers[i] === q.answer ? C.green : C.red) : C.green}>
          <div style={{ fontWeight: 700, color: "#1F2937", marginBottom: 2 }}>{i + 1}. {q.q}</div>
          <div style={{ fontWeight: 500, color: "#9CA3AF", marginBottom: 10, fontSize: 12 }}>{q.zh}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {q.options.map(opt => {
              let bg = "#fff", border = "2px solid #D1FAE5", col = "#374151";
              if (answers[i] === opt && !submitted) { bg = "#D1FAE5"; border = `2px solid ${C.green}`; }
              if (submitted) {
                if (opt === q.answer) { bg = "#D1FAE5"; border = `2px solid ${C.green}`; col = "#065F46"; }
                else if (opt === answers[i] && opt !== q.answer) { bg = "#FEE2E2"; border = `2px solid ${C.red}`; col = "#991B1B"; }
              }
              return (
                <button key={opt} disabled={submitted}
                  onClick={() => setAnswers(a => ({ ...a, [i]: opt }))}
                  style={{ background: bg, border, color: col, borderRadius: 10, padding: "10px 8px", fontSize: 13, fontWeight: 600, cursor: submitted ? "default" : "pointer" }}>
                  {opt}
                </button>
              );
            })}
          </div>
          {submitted && q.trap && (
            <div style={{ marginTop: 10, background: "#FEF3C7", border: "1.5px solid #F59E0B", borderRadius: 10, padding: "8px 12px", fontSize: 12, color: "#92400E", lineHeight: 1.6 }}>
              ⚠️ <b>陷阱解析：</b>{q.trap}
            </div>
          )}
        </Card>
      ))}

      {!submitted ? (
        <button onClick={() => setSubmitted(true)} disabled={!allAnswered}
          style={{ ...btnStyle(allAnswered ? C.green : "#9CA3AF"), width: "100%", padding: 14, fontSize: 15 }}>
          {allAnswered ? "提交答案 ✓" : `請完成所有題目（${Object.keys(answers).length}/${text.questions.length}）`}
        </button>
      ) : (
        <Card color={C.green} style={{ textAlign: "center" }}>
          <div style={{ fontSize: 40 }}>{score === text.questions.length ? "🏆" : "📊"}</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: C.green }}>{score}/{text.questions.length} 正確</div>
          <button onClick={() => setText(null)} style={{ ...btnStyle(C.green), marginTop: 12 }}>← 選擇其他文章</button>
        </Card>
      )}
    </div>
  );
}

// ─── WRITING MODULE ───────────────────────────────────────────────────────────

function WritingModule({ user, submissions, onSubmit, aiKey, onSetAiKey }) {
  const [prompt, setPrompt] = useState(null);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [level, setLevel] = useState("all");
  const [aiPrompts, setAiPrompts] = useState([]);

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  const mySubmission = prompt ? submissions.find(s => s.promptId === prompt.id && s.studentId === user.id) : null;

  if (!prompt) {
    const basePrompts = WRITING_PROMPTS.filter(p => level === "all" || p.level === level);
    const allPrompts = [...aiPrompts, ...basePrompts];
    return (
    <div>
      <h2 style={{ fontWeight: 800, color: C.purple, fontSize: 20, marginBottom: 4 }}>✍️ 寫作練習</h2>
      <LevelFilter current={level} onChange={setLevel} />
      <AiGenerateButton aiKey={aiKey} module="writing" level={level} onResult={items => {
        const arr = Array.isArray(items) ? items : [items];
        const newPrompts = arr.map((it, i) => ({
          id: "ai-w-" + Date.now() + "-" + i, level: level === "all" ? "A1.1" : level,
          emoji: "🆕", title: "✨ AI 新題", hints: it.hints || [], minWords: it.minWords || 30,
          prompt: it.prompt, promptZh: it.promptZh, example: it.example || "",
        }));
        setAiPrompts(prev => [...newPrompts, ...prev]);
      }} />
      <p style={{ color: "#7C3AED", fontSize: 13, marginBottom: 18 }}>完成後老師會批改並給分</p>
      {allPrompts.map(p => {
        const sub = submissions.find(s => s.promptId === p.id && s.studentId === user.id);
        return (
          <Card key={p.id} color={C.amber}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span style={{ fontSize: 30 }}>{p.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, color: "#78350F", fontSize: 15 }}>{p.title}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                  <Badge text={p.level} color={LEVEL_COLORS[p.level] || C.amber} />
                  <Badge text={`最少 ${p.minWords} 字`} color="#6B7280" />
                  {sub && <Badge text={sub.grade ? `${sub.grade}分 ✓` : "待批改"} color={sub.grade ? C.green : "#9CA3AF"} />}
                </div>
              </div>
              <button onClick={() => { setPrompt(p); setText(sub ? sub.text : ""); setSubmitted(!!sub); }}
                style={btnStyle(C.amber)}>{sub ? "查看" : "作答"}</button>
            </div>
          </Card>
        );
      })}
    </div>
    );
  }

  return (
    <div>
      <button onClick={() => setPrompt(null)} style={{ background: "none", border: "none", color: C.purple, cursor: "pointer", fontWeight: 700, marginBottom: 10 }}>← 返回</button>
      <h2 style={{ fontWeight: 800, color: C.purple, fontSize: 18, marginBottom: 4 }}>{prompt.emoji} {prompt.title}</h2>
      <Badge text={prompt.level} color={C.amber} />

      <Card color={C.amber} style={{ marginTop: 14 }}>
        <div style={{ fontWeight: 700, color: "#78350F", marginBottom: 4 }}>📝 題目</div>
        {prompt.source && <SourceBadge text={prompt.source} />}
        <div style={{ color: "#374151", fontSize: 14, lineHeight: 1.7, fontWeight: 700 }}>{prompt.prompt}</div>
        <div style={{ color: "#9CA3AF", fontSize: 12, lineHeight: 1.6, marginTop: 4 }}>{prompt.promptZh}</div>
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.amber, marginBottom: 6 }}>💡 提示詞</div>
          {prompt.hints.map((h, i) => <div key={i} style={{ fontSize: 13, color: "#6B7280", fontFamily: "monospace", margin: "2px 0" }}>{h}</div>)}
        </div>
      </Card>

      <div style={{ fontWeight: 700, color: C.purple, marginBottom: 6, fontSize: 14 }}>
        你的答案 <span style={{ color: wordCount >= prompt.minWords ? C.green : C.amber }}>（{wordCount} 字）</span>
      </div>
      <textarea value={text} onChange={e => setText(e.target.value)} disabled={submitted || !!mySubmission}
        placeholder="在這裡用德文作答..."
        style={{ width: "100%", minHeight: 160, padding: 14, borderRadius: 14, border: `2px solid ${C.amber}`, fontSize: 14, lineHeight: 1.7, resize: "vertical", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />

      {!mySubmission && (
        <button onClick={() => { onSubmit({ promptId: prompt.id, studentId: user.id, studentName: user.name, title: prompt.title, text, grade: null, feedback: "" }); setSubmitted(true); }}
          disabled={wordCount < prompt.minWords}
          style={{ ...btnStyle(wordCount >= prompt.minWords ? C.amber : "#9CA3AF"), width: "100%", padding: 13, fontSize: 15, marginTop: 10 }}>
          {wordCount >= prompt.minWords ? "提交作業 ✓" : `還需要 ${prompt.minWords - wordCount} 個字`}
        </button>
      )}

      {mySubmission && (
        <Card color={mySubmission.grade ? C.green : "#9CA3AF"} style={{ marginTop: 12 }}>
          {mySubmission.grade ? (
            <>
              <div style={{ fontWeight: 800, color: C.green, fontSize: 16 }}>✅ 已批改</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: C.green }}>{mySubmission.grade} 分</div>
              {mySubmission.feedback && <div style={{ color: "#374151", fontSize: 14, marginTop: 8 }}>{mySubmission.feedback}</div>}
            </>
          ) : (
            <div style={{ color: "#6B7280", fontWeight: 700 }}>⏳ 已提交，等待老師批改</div>
          )}
        </Card>
      )}

      <Card color="#EDE9FE" style={{ marginTop: 14 }}>
        <div style={{ fontWeight: 700, color: C.purple, marginBottom: 8, fontSize: 13 }}>📌 參考答案</div>
        <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, whiteSpace: "pre-line", fontStyle: "italic" }}>{prompt.example}</div>
      </Card>
    </div>
  );
}

// ─── SPEAKING MODULE ──────────────────────────────────────────────────────────

function SpeakingModule({ apiKey, aiKey, onSetAiKey }) {
  const [prompt, setPrompt] = useState(null);
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [level, setLevel] = useState("all");
  const [aiPrompts, setAiPrompts] = useState([]);
  const mediaRef = useRef(null);
  const chunksRef = useRef([]);

  const [recErr, setRecErr] = useState("");

  const startRecording = async () => {
    setRecErr("");
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setRecErr("此預覽環境不支援錄音。部署成網站後即可正常使用麥克風。");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = e => chunksRef.current.push(e.data);
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioURL(URL.createObjectURL(blob));
        stream.getTracks().forEach(t => t.stop());
      };
      mr.start();
      mediaRef.current = mr;
      setRecording(true);
    } catch (e) {
      if (e.name === "NotAllowedError") setRecErr("請允許麥克風存取權限後再試一次。");
      else setRecErr("無法啟動錄音。請在已部署的網站上使用，或檢查麥克風權限。");
    }
  };

  const stopRecording = () => {
    mediaRef.current?.stop();
    setRecording(false);
  };

  if (!prompt) {
    const basePrompts = SPEAKING_PROMPTS.filter(p => level === "all" || p.level === level);
    const allPrompts = [...aiPrompts, ...basePrompts];
    return (
    <div>
      <h2 style={{ fontWeight: 800, color: C.purple, fontSize: 20, marginBottom: 4 }}>🎤 口說練習</h2>
      <LevelFilter current={level} onChange={setLevel} />
      <AiGenerateButton aiKey={aiKey} module="speaking" level={level} onResult={items => {
        const arr = Array.isArray(items) ? items : [items];
        const newPrompts = arr.map((it, i) => ({
          id: "ai-s-" + Date.now() + "-" + i, level: level === "all" ? "A1.1" : level,
          emoji: "🆕", title: "✨ AI 新題", prompt: it.prompt, promptZh: it.promptZh,
          guide: it.guide || "", guideZh: it.guideZh || "", example: it.example || "", tips: it.tips || [],
        }));
        setAiPrompts(prev => [...newPrompts, ...prev]);
      }} />
      <p style={{ color: "#7C3AED", fontSize: 13, marginBottom: 18 }}>錄音後可回放，並對照參考答案</p>
      {allPrompts.map(p => (
        <Card key={p.id} color={C.pink}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 30 }}>{p.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, color: "#831843", fontSize: 15 }}>{p.title}</div>
              <div style={{ color: "#6B7280", fontSize: 12, marginTop: 3 }}>{p.guide}</div>
              <div style={{ color: "#C4B5D4", fontSize: 11 }}>{p.guideZh}</div>
              <Badge text={p.level} color={LEVEL_COLORS[p.level] || C.pink} />
            </div>
            <button onClick={() => { setPrompt(p); setAudioURL(null); setShowAnswer(false); }}
              style={btnStyle(C.pink)}>開始</button>
          </div>
        </Card>
      ))}
    </div>
    );
  }

  return (
    <div>
      <button onClick={() => { setPrompt(null); setAudioURL(null); setRecording(false); }} style={{ background: "none", border: "none", color: C.purple, cursor: "pointer", fontWeight: 700, marginBottom: 10 }}>← 返回</button>
      <h2 style={{ fontWeight: 800, color: C.purple, fontSize: 18, marginBottom: 4 }}>{prompt.emoji} {prompt.title}</h2>
      <Badge text={prompt.level} color={C.pink} />

      <Card color={C.pink} style={{ marginTop: 14, textAlign: "center" }}>
        <div style={{ fontWeight: 800, color: "#831843", fontSize: 16, marginBottom: 6 }}>🎯 口說題目</div>
        {prompt.source && <SourceBadge text={prompt.source} />}
        <div style={{ fontSize: 18, color: "#374151", fontWeight: 700, marginBottom: 2 }}>{prompt.prompt}</div>
        <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 8 }}>{prompt.promptZh}</div>
        <div style={{ fontSize: 12, color: "#9CA3AF" }}>{prompt.guide}<br />{prompt.guideZh}</div>
      </Card>

      <Card color={C.pink}>
        <div style={{ fontWeight: 700, color: "#831843", marginBottom: 12 }}>💡 準備提示</div>
        {prompt.tips.map((t, i) => (
          <div key={i} style={{ fontSize: 13, color: "#374151", margin: "4px 0", display: "flex", gap: 8 }}>
            <span>•</span><span>{t}</span>
          </div>
        ))}
      </Card>

      <Card color={C.pink} style={{ textAlign: "center" }}>
        <div style={{ fontWeight: 700, color: "#831843", marginBottom: 16 }}>🎙️ 錄音區</div>
        <button
          onClick={recording ? stopRecording : startRecording}
          style={{
            width: 80, height: 80, borderRadius: "50%",
            background: recording ? C.red : C.pink,
            border: "none", cursor: "pointer", fontSize: 32,
            boxShadow: recording ? `0 0 0 8px ${C.red}33` : `0 4px 20px ${C.pink}44`,
            transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px"
          }}>
          {recording ? "⏹" : "🎙️"}
        </button>
        <div style={{ fontSize: 13, color: recording ? C.red : "#9CA3AF", fontWeight: 700 }}>
          {recording ? "錄音中⋯ 點擊停止" : "點擊開始錄音"}
        </div>
        {recErr && <div style={{ fontSize: 12, color: C.red, marginTop: 8, lineHeight: 1.5 }}>⚠️ {recErr}</div>}

        {audioURL && !recording && (
          <div style={{ marginTop: 16 }}>
            <div style={{ fontWeight: 700, color: C.green, marginBottom: 8 }}>✅ 錄音完成，可以回放！</div>
            <audio controls src={audioURL} style={{ width: "100%", borderRadius: 8 }} />
            <button onClick={() => { setAudioURL(null); }} style={{ ...btnStyle(C.pink, true), marginTop: 10, fontSize: 13 }}>🔄 重新錄音</button>
          </div>
        )}
      </Card>

      <button onClick={() => setShowAnswer(!showAnswer)}
        style={{ ...btnStyle(showAnswer ? C.purple : C.purple, !showAnswer), width: "100%", padding: 13, fontSize: 14, marginBottom: 10 }}>
        {showAnswer ? "▲ 隱藏參考答案" : "▼ 查看參考答案"}
      </button>

      {showAnswer && (
        <Card color={C.purple}>
          <div style={{ fontWeight: 700, color: C.purple, marginBottom: 10 }}>📌 參考答案範本</div>
          <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.9, whiteSpace: "pre-line", fontStyle: "italic", background: C.soft, borderRadius: 10, padding: 12 }}>
            {prompt.example}
          </div>
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => speakGoogle(prompt.example, apiKey)} style={{ ...btnStyle(C.purple, true), fontSize: 13 }}>🔊 聽參考答案</button>
            <span style={{ fontSize: 12, color: "#9CA3AF" }}>（德語TTS朗讀）</span>
          </div>
        </Card>
      )}
    </div>
  );
}

// ─── TEACHER PANEL ────────────────────────────────────────────────────────────

function TeacherPanel({ submissions, onGrade }) {
  const [selected, setSelected] = useState(null);
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");

  const pending = submissions.filter(s => !s.grade);
  const graded = submissions.filter(s => s.grade);

  if (selected) {
    return (
      <div>
        <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: C.purple, cursor: "pointer", fontWeight: 700, marginBottom: 10 }}>← 返回</button>
        <h2 style={{ fontWeight: 800, color: C.purple, fontSize: 18, marginBottom: 4 }}>批改作業</h2>
        <Card color={C.amber}>
          <div style={{ fontSize: 13, color: "#9CA3AF" }}>{selected.studentName} · {selected.title}</div>
          <div style={{ marginTop: 10, background: "#FFFBEB", borderRadius: 10, padding: 14, fontSize: 14, lineHeight: 1.8, color: "#374151", whiteSpace: "pre-wrap" }}>{selected.text}</div>
        </Card>
        <Card color={C.green}>
          <div style={{ fontWeight: 700, color: C.green, marginBottom: 10 }}>給分與評語</div>
          <div style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: C.purple }}>分數（0-100）</label>
            <input type="number" value={grade} onChange={e => setGrade(e.target.value)} min="0" max="100"
              style={{ display: "block", width: "100%", marginTop: 6, padding: "10px 14px", borderRadius: 10, border: `2px solid ${C.green}`, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: C.purple }}>評語（可選）</label>
            <textarea value={feedback} onChange={e => setFeedback(e.target.value)}
              placeholder="寫下對學員的建議..."
              style={{ display: "block", width: "100%", marginTop: 6, padding: "10px 14px", borderRadius: 10, border: `2px solid ${C.green}`, fontSize: 14, outline: "none", minHeight: 80, resize: "vertical", boxSizing: "border-box" }} />
          </div>
          <button onClick={() => { onGrade(selected, grade, feedback); setSelected(null); setGrade(""); setFeedback(""); }}
            disabled={!grade}
            style={{ ...btnStyle(grade ? C.green : "#9CA3AF"), width: "100%", padding: 13 }}>
            確認批改 ✓
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ fontWeight: 800, color: C.purple, fontSize: 20, marginBottom: 4 }}>👩‍🏫 老師後台</h2>
      <p style={{ color: "#7C3AED", fontSize: 13, marginBottom: 18 }}>批改學員寫作作業</p>

      {pending.length > 0 && (
        <>
          <div style={{ fontWeight: 800, color: C.red, marginBottom: 10 }}>⏳ 待批改（{pending.length}）</div>
          {pending.map((s, i) => (
            <Card key={i} color={C.amber}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700, color: "#78350F" }}>{s.studentName}</div>
                  <div style={{ fontSize: 13, color: "#9CA3AF" }}>{s.title}</div>
                  <div style={{ fontSize: 12, color: "#374151", marginTop: 4, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.text}</div>
                </div>
                <button onClick={() => { setSelected(s); setGrade(s.grade || ""); setFeedback(s.feedback || ""); }}
                  style={btnStyle(C.amber)}>批改</button>
              </div>
            </Card>
          ))}
        </>
      )}

      {graded.length > 0 && (
        <>
          <div style={{ fontWeight: 800, color: C.green, margin: "16px 0 10px" }}>✅ 已批改（{graded.length}）</div>
          {graded.map((s, i) => (
            <Card key={i} color={C.green}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700, color: "#064E3B" }}>{s.studentName}</div>
                  <div style={{ fontSize: 13, color: "#9CA3AF" }}>{s.title}</div>
                </div>
                <div style={{ fontSize: 22, fontWeight: 900, color: C.green }}>{s.grade}分</div>
              </div>
            </Card>
          ))}
        </>
      )}

      {submissions.length === 0 && (
        <Card color="#9CA3AF" style={{ textAlign: "center", color: "#9CA3AF", padding: 40 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>📭</div>
          <div>還沒有學員提交作業</div>
        </Card>
      )}
    </div>
  );
}

// ─── VOCAB MODULE ─────────────────────────────────────────────────────────────

function VocabModule({ myWords = [], onAddWord, onDeleteWord }) {
  const [sortMode, setSortMode] = useState("topic"); // topic | alpha | mine
  const [level, setLevel] = useState("all"); // all | A1 | A2
  const [openTopic, setOpenTopic] = useState(null);
  const [flashMode, setFlashMode] = useState(false);
  const [flashList, setFlashList] = useState([]);
  const [flashIdx, setFlashIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [hideZh, setHideZh] = useState(false);
  const [newDe, setNewDe] = useState("");
  const [newZh, setNewZh] = useState("");
  const [newEx, setNewEx] = useState("");

  const filtered = VOCAB.filter(w => level === "all" || w.level === level);

  const startFlash = (list) => {
    setFlashList(list); setFlashIdx(0); setFlipped(false); setFlashMode(true);
  };

  const addWord = () => {
    if (!newDe.trim() || !newZh.trim()) return;
    onAddWord && onAddWord({ de: newDe.trim(), zh: newZh.trim(), ex: newEx.trim(), topic: "我的生詞", level: "我的" });
    setNewDe(""); setNewZh(""); setNewEx("");
  };

  // Flashcard mode
  if (flashMode) {
    const w = flashList[flashIdx];
    if (!w) {
      return (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>📭</div>
          <div style={{ color: "#9CA3AF", fontSize: 14, marginBottom: 16 }}>這裡還沒有單字可以背</div>
          <button onClick={() => setFlashMode(false)} style={btnStyle(C.purple)}>← 返回單字表</button>
        </div>
      );
    }
    return (
      <div>
        <button onClick={() => setFlashMode(false)} style={{ background: "none", border: "none", color: C.purple, cursor: "pointer", fontWeight: 700, marginBottom: 10 }}>← 返回單字表</button>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <h2 style={{ fontWeight: 800, color: C.purple, fontSize: 18 }}>📇 單字卡</h2>
          <span style={{ color: C.purple, fontWeight: 700 }}>{flashIdx + 1}/{flashList.length}</span>
        </div>
        <ProgressBar value={(flashIdx / flashList.length) * 100} color={C.purple} />

        <div onClick={() => setFlipped(!flipped)} style={{
          background: flipped ? "linear-gradient(135deg,#EDE9FE,#fff)" : "#fff",
          border: `3px solid ${LEVEL_COLORS[w.level + ".1"] || C.purple}`, borderRadius: 24,
          padding: 44, textAlign: "center", cursor: "pointer", margin: "20px 0", minHeight: 180,
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          boxShadow: "0 8px 30px #7C3AED22"
        }}>
          {!flipped ? (
            <>
              <div style={{ fontSize: 34, fontWeight: 900, color: C.purple, marginBottom: 8 }}>{w.de}</div>
              <Badge text={w.level} color={w.level === "A1" ? C.green : C.amber} />
              <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 12 }}>點擊看中文 👆</div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 28, fontWeight: 800, color: C.pink, marginBottom: 6 }}>{w.zh}</div>
              <div style={{ fontSize: 15, color: "#6B7280" }}>{w.de}</div>
              {w.ex && <div style={{ fontSize: 14, color: "#7C3AED", marginTop: 10, fontStyle: "italic" }}>{w.ex}</div>}
              <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 8 }}>{w.topic}</div>
            </>
          )}
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button onClick={() => { setFlipped(false); setFlashIdx(i => Math.max(0, i - 1)); }} style={btnStyle(C.purple, true)}>← 上一個</button>
          <button onClick={() => { setFlipped(false); setFlashIdx(i => Math.min(flashList.length - 1, i + 1)); }} style={btnStyle(C.purple)}>下一個 →</button>
        </div>
      </div>
    );
  }

  // Topics grouping
  const topics = {};
  filtered.forEach(w => { (topics[w.topic] = topics[w.topic] || []).push(w); });
  const topicNames = Object.keys(topics).sort();

  // Alpha sort
  const alphaList = [...filtered].sort((a, b) => {
    const clean = s => s.replace(/^(der|die|das)\s+/, "").toLowerCase();
    return clean(a.de).localeCompare(clean(b.de), "de");
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <h2 style={{ fontWeight: 800, color: C.purple, fontSize: 20 }}>📒 必背單字</h2>
        <button onClick={() => startFlash(filtered)} style={{ ...btnStyle(C.pink), fontSize: 13, padding: "8px 14px" }}>📇 卡片模式</button>
      </div>
      <p style={{ color: "#7C3AED", fontSize: 13, marginBottom: 14 }}>A1 + A2 高頻單字・{filtered.length} 個</p>

      {/* Sort toggle */}
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        {[["topic", "📂 主題"], ["alpha", "🔤 字母"], ["mine", `⭐ 生詞本${myWords.length ? ` (${myWords.length})` : ""}`]].map(([m, label]) => (
          <button key={m} onClick={() => setSortMode(m)} style={{
            flex: 1, background: sortMode === m ? C.purple : "#fff", color: sortMode === m ? "#fff" : C.purple,
            border: `2px solid ${C.purple}`, borderRadius: 10, padding: "8px 4px", fontWeight: 700, fontSize: 12, cursor: "pointer"
          }}>{label}</button>
        ))}
      </div>

      {/* Level filter */}
      {sortMode !== "mine" && (
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {[["all", "全部"], ["A1", "A1"], ["A2", "A2"]].map(([lv, label]) => (
          <button key={lv} onClick={() => setLevel(lv)} style={{
            background: level === lv ? (lv === "A1" ? C.green : lv === "A2" ? C.amber : C.purple) : "#fff",
            color: level === lv ? "#fff" : "#6B7280", border: "2px solid #E5E7EB",
            borderRadius: 20, padding: "5px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer"
          }}>{label}</button>
        ))}
        <button onClick={() => setHideZh(!hideZh)} style={{
          marginLeft: "auto", background: hideZh ? C.purple : "#fff", color: hideZh ? "#fff" : C.purple,
          border: `2px solid ${C.purple}`, borderRadius: 20, padding: "5px 12px", fontWeight: 700, fontSize: 12, cursor: "pointer"
        }}>{hideZh ? "顯示中文" : "遮中文"}</button>
      </div>
      )}

      {/* My words view */}
      {sortMode === "mine" && (
        <div>
          <Card color={C.pink}>
            <div style={{ fontWeight: 800, color: C.pink, fontSize: 14, marginBottom: 10 }}>➕ 新增生詞</div>
            <input value={newDe} onChange={e => setNewDe(e.target.value)} placeholder="德語單字（例：der Hund）"
              style={{ display: "block", width: "100%", marginBottom: 8, padding: "10px 12px", borderRadius: 10, border: "2px solid #FBCFE8", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
            <input value={newZh} onChange={e => setNewZh(e.target.value)} placeholder="中文意思（例：狗）"
              style={{ display: "block", width: "100%", marginBottom: 8, padding: "10px 12px", borderRadius: 10, border: "2px solid #FBCFE8", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
            <input value={newEx} onChange={e => setNewEx(e.target.value)} placeholder="例句（選填）"
              style={{ display: "block", width: "100%", marginBottom: 10, padding: "10px 12px", borderRadius: 10, border: "2px solid #FBCFE8", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
            <button onClick={addWord} disabled={!newDe.trim() || !newZh.trim()}
              style={{ ...btnStyle(newDe.trim() && newZh.trim() ? C.pink : "#D1D5DB"), width: "100%", padding: 12 }}>加入我的生詞本 ⭐</button>
          </Card>

          {myWords.length === 0 ? (
            <div style={{ textAlign: "center", color: "#9CA3AF", padding: "30px 0", fontSize: 14 }}>
              還沒有生詞 📝<br />把上課遇到的新單字加進來吧！
            </div>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "14px 0 8px" }}>
                <span style={{ fontWeight: 800, color: C.purple, fontSize: 15 }}>⭐ 我的生詞（{myWords.length}）</span>
                <button onClick={() => startFlash(myWords)} style={{ ...btnStyle(C.pink), fontSize: 12, padding: "6px 12px" }}>📇 背生詞</button>
              </div>
              <div style={{ background: "#fff", borderRadius: 14, padding: 10, border: "1px solid #F0EBF8" }}>
                {myWords.map((w, i) => (
                  <div key={i} style={{ padding: "9px 10px", borderBottom: i < myWords.length - 1 ? "1px solid #F5F0FF" : "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontWeight: 700, color: "#1F2937", fontSize: 14 }}>{w.de}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ color: hideZh ? "transparent" : "#7C3AED", fontSize: 14, background: hideZh ? "#F0EBF8" : "none", borderRadius: 4 }}>{w.zh}</span>
                        <button onClick={() => onDeleteWord && onDeleteWord(i)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", fontSize: 16 }}>🗑️</button>
                      </div>
                    </div>
                    {w.ex && <div style={{ fontSize: 12, color: "#9CA3AF", fontStyle: "italic", marginTop: 2 }}>{w.ex}</div>}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Topic view */}
      {sortMode === "topic" && topicNames.map(tn => (
        <div key={tn} style={{ marginBottom: 10 }}>
          <button onClick={() => setOpenTopic(openTopic === tn ? null : tn)} style={{
            width: "100%", background: "#fff", border: "2px solid #E9D5FF", borderRadius: 14,
            padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center",
            cursor: "pointer", fontWeight: 800, color: C.purple, fontSize: 15
          }}>
            <span>{tn}</span>
            <span style={{ fontSize: 13, color: "#9CA3AF" }}>{topics[tn].length} 個 {openTopic === tn ? "▲" : "▼"}</span>
          </button>
          {openTopic === tn && (
            <div style={{ background: "#fff", borderRadius: 12, padding: 8, marginTop: 4, border: "1px solid #F0EBF8" }}>
              {topics[tn].map((w, i) => (
                <div key={i} style={{ padding: "8px 10px", borderBottom: i < topics[tn].length - 1 ? "1px solid #F5F0FF" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontWeight: 700, color: "#1F2937", fontSize: 14 }}>{w.de}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: hideZh ? "transparent" : "#7C3AED", fontSize: 14, background: hideZh ? "#F0EBF8" : "none", borderRadius: 4, minWidth: 40, textAlign: "right" }}>{w.zh}</span>
                      <Badge text={w.level} color={w.level === "A1" ? C.green : C.amber} />
                    </div>
                  </div>
                  {w.ex && <div style={{ fontSize: 12, color: "#9CA3AF", fontStyle: "italic", marginTop: 2 }}>{w.ex}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Alpha view */}
      {sortMode === "alpha" && (
        <div style={{ background: "#fff", borderRadius: 14, padding: 10, border: "1px solid #F0EBF8" }}>
          {alphaList.map((w, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 10px", borderBottom: i < alphaList.length - 1 ? "1px solid #F5F0FF" : "none" }}>
              <div style={{ fontWeight: 700, color: "#1F2937", fontSize: 14 }}>{w.de}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: hideZh ? "transparent" : "#7C3AED", fontSize: 14, background: hideZh ? "#F0EBF8" : "none", borderRadius: 4, minWidth: 40, textAlign: "right" }}>{w.zh}</span>
                <Badge text={w.level} color={w.level === "A1" ? C.green : C.amber} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── GRAMMAR MODULE ───────────────────────────────────────────────────────────

// 語法角色配色（像螢光筆標重點）
const ROLE_COLORS = {
  verb:   { bg: "#FECACA", text: "#991B1B", label: "動詞" },        // 紅
  subject:{ bg: "#BFDBFE", text: "#1E40AF", label: "主語" },        // 藍
  modal:  { bg: "#FEF08A", text: "#854D0E", label: "情態動詞" },     // 黃
  object: { bg: "#BBF7D0", text: "#166534", label: "受詞/賓語" },    // 綠
  conj:   { bg: "#E9D5FF", text: "#6B21A8", label: "連接詞" },       // 紫
  article:{ bg: "#FBCFE8", text: "#9D174D", label: "冠詞" },         // 粉
  prep:   { bg: "#FED7AA", text: "#9A3412", label: "介詞" },         // 橘
  partizip:{ bg: "#A5F3FC", text: "#155E75", label: "過去分詞" },    // 青
};

// 高亮句子：tokens 為 [{t:"文字", r:"角色"}...]，r 可省略（普通字）
function HiSentence({ tokens, size = 16 }) {
  return (
    <div style={{ fontSize: size, lineHeight: 2, margin: "4px 0" }}>
      {tokens.map((tk, i) => {
        if (!tk.r) return <span key={i}>{tk.t} </span>;
        const c = ROLE_COLORS[tk.r];
        return (
          <span key={i} style={{ background: c.bg, color: c.text, borderRadius: 6, padding: "2px 6px", fontWeight: 700, margin: "0 1px", borderBottom: `2px solid ${c.text}` }}>
            {tk.t}
          </span>
        );
      })}
      <span> </span>
    </div>
  );
}

function RoleLegend({ roles }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "8px 0 12px" }}>
      {roles.map(r => {
        const c = ROLE_COLORS[r];
        return (
          <span key={r} style={{ background: c.bg, color: c.text, borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>
            {c.label}
          </span>
        );
      })}
    </div>
  );
}

const GRAMMAR_LESSONS = [
  {
    id: "g1", level: "A1.1", emoji: "🎀", title: "冠詞：der / die / das / ein",
    color: "#FF6B9D",
    intro: "德語每個名詞都有「性別」，冠詞要跟著變。這是德語最基礎、也最多人卡關的地方——把這張卡記熟，後面所有格位變化都好懂！",
    blocks: [
      { type: "card", title: "定冠詞 vs 不定冠詞（記憶卡）", subtitle: "定冠詞=「那個」特指；不定冠詞=「一個」泛指", headers: ["性別", "定冠詞 the", "不定冠詞 a", "例子"], rows: [
        ["陽性 m", "der", "ein", "der/ein Mann 男人"],
        ["陰性 f", "die", "eine", "die/eine Frau 女人"],
        ["中性 n", "das", "ein", "das/ein Kind 小孩"],
        ["複數 pl", "die", "—", "die Kinder 孩子們"],
      ], foot: "注意：陽性和中性的不定冠詞都是 ein，只有陰性多一個 e → eine。複數沒有不定冠詞！" },
      { type: "tip", text: "🧠 記憶口訣：背單字時「冠詞+名詞」一起背，例如不要只記 Tisch，要記 der Tisch（桌子）。性別沒有邏輯，只能連著記！" },
      { type: "hi", roles: ["article", "subject"], title: "看冠詞配名詞", sentences: [
        [{t:"Der",r:"article"},{t:"Mann",r:"subject"},{t:"ist groß."}],
        [{t:"Die",r:"article"},{t:"Frau",r:"subject"},{t:"liest."}],
        [{t:"Das",r:"article"},{t:"Kind",r:"subject"},{t:"spielt."}],
      ]},
      { type: "examTip", points: [
        { skill: "閱讀", text: "看到冠詞就能判斷名詞性別，幫你看懂句子結構。" },
        { skill: "聽力", text: "聽到 der/die/das 能快速抓到主角是誰。" },
        { skill: "寫作", text: "寫錯冠詞是最常見扣分點，名詞一定連冠詞寫。" },
        { skill: "口說", text: "說名詞前先想冠詞，養成 der Tisch 的習慣。" },
      ]},
    ],
    quiz: [
      // 前3題：基礎
      { q: "___ Mutter kocht gern.", options: ["Der", "Die", "Das"], answer: "Die", hint: "Mutter 陰性 → die" },
      { q: "___ Kind schläft.", options: ["Der", "Die", "Das"], answer: "Das", hint: "Kind 中性 → das" },
      { q: "___ Vater arbeitet.", options: ["Der", "Die", "Das"], answer: "Der", hint: "Vater 陽性 → der" },
      // 後面：應用（一段話、考試情境）
      { q: "【閱讀情境】Im Zimmer steht ein Tisch. ___ Tisch ist neu.（第二句指「那張」桌子，用哪個冠詞？）", options: ["Ein", "Der", "Das"], answer: "Der", hint: "Tisch陽性,且第二次提到=特指→der。考試常考『第一次ein,第二次der』" },
      { q: "【寫作情境】要寫「我有一隻狗」，Hund 是陽性，該用？Ich habe ___ Hund.", options: ["ein", "eine", "einen"], answer: "einen", hint: "陽性受詞(第四格)ein→einen!這是A1高頻考點" },
    ],
    trans: [
      { zh: "在我的房間裡有一張桌子，那張桌子是新的。", scene: "歌德寫作常考：描述房間／住處", de: "In meinem Zimmer steht ein Tisch. Der Tisch ist neu.", note: "第一次提到用 ein(泛指),第二次用 der(特指)。考試描述住處必考這個『ein→der』轉換" },
      { zh: "我想買一台新電腦，但這台電腦太貴了。", scene: "歌德口說／寫作：購物、表達需求", de: "Ich möchte einen neuen Computer kaufen, aber der Computer ist zu teuer.", note: "Computer陽性,第四格ein→einen;möchte+原形kaufen放句尾;第二句der特指" },
      { zh: "這個小孩沒有自己的房間。", scene: "歌德寫作：家庭、居住情況", de: "Das Kind hat kein eigenes Zimmer.", note: "Kind中性→das;否定名詞用kein;Zimmer中性→kein(不變)" },
    ]
  },
  {
    id: "g1b", level: "A1.1", emoji: "👨‍👩‍👧", title: "物主代詞：我的、你的、他的",
    color: "#A855F7",
    intro: "「我的書、你的車、他的狗」——這些 mein/dein/sein 就是物主代詞。它跟著後面名詞的性別變化，規則其實跟 ein 一模一樣！",
    blocks: [
      { type: "card", title: "物主代詞記憶卡", subtitle: "誰擁有 → 用哪個字", headers: ["人稱", "物主代詞", "例子"], rows: [
        ["ich 我", "mein 我的", "mein Buch 我的書"],
        ["du 你", "dein 你的", "dein Auto 你的車"],
        ["er 他", "sein 他的", "sein Hund 他的狗"],
        ["sie 她", "ihr 她的", "ihr Kind 她的孩子"],
        ["wir 我們", "unser 我們的", "unser Haus 我們的家"],
        ["ihr 你們", "euer 你們的", "euer Lehrer 你們的老師"],
        ["sie/Sie 他們/您", "ihr / Ihr 他們的/您的", "Ihr Name 您的名字"],
      ], foot: "重點：詞尾變化跟 ein 一樣！陰性和複數後面加 -e（meine Mutter 我的媽媽），陽性中性不加（mein Vater）。" },
      { type: "card", title: "詞尾怎麼變（跟 ein 一樣）", headers: ["後面名詞", "mein 變化", "例子"], rows: [
        ["陽性 m", "mein", "mein Vater 我爸"],
        ["陰性 f", "meine", "meine Mutter 我媽"],
        ["中性 n", "mein", "mein Kind 我的孩子"],
        ["複數 pl", "meine", "meine Eltern 我父母"],
      ], foot: "陰性、複數 → 加 e。其他人稱(dein, sein, ihr...)全部照這規則變！" },
      { type: "hi", roles: ["article", "subject"], title: "例句（物主代詞當冠詞用）", sentences: [
        [{t:"Mein",r:"article"},{t:"Vater",r:"subject"},{t:"ist Arzt."}],
        [{t:"Meine",r:"article"},{t:"Mutter",r:"subject"},{t:"kocht gern."}],
        [{t:"Sein",r:"article"},{t:"Hund",r:"subject"},{t:"ist klein."}],
      ]},
      { type: "examTip", points: [
        { skill: "閱讀", text: "看到 mein/dein 就知道在講「誰的東西」，幫你理解人物關係。" },
        { skill: "聽力", text: "聽自我介紹、家庭話題常出現 meine Familie, mein Bruder。" },
        { skill: "寫作", text: "寫家庭、介紹自己一定用到，詞尾 -e 別漏（meine Schwester）。" },
        { skill: "口說", text: "介紹「我的工作 mein Job、我的城市 meine Stadt」超常用。" },
      ]},
    ],
    quiz: [
      { q: "___ Vater ist Arzt.（我的爸爸，Vater陽性）", options: ["Mein", "Meine", "Meiner"], answer: "Mein", hint: "陽性不加e → mein" },
      { q: "___ Mutter kocht gern.（我的媽媽，Mutter陰性）", options: ["Mein", "Meine", "Meines"], answer: "Meine", hint: "陰性加e → meine" },
      { q: "Wie ist ___ Name?（您的名字，禮貌）", options: ["dein", "Ihr", "sein"], answer: "Ihr", hint: "禮貌『您的』用大寫 Ihr" },
      { q: "【情境】介紹朋友的姐姐：Das ist Tom. ___ Schwester heißt Anna.（他的姐姐）", options: ["Seine", "Ihre", "Deine"], answer: "Seine", hint: "Tom是男生→他的=sein,Schwester陰性→seine。考試常考sein/ihr分辨" },
      { q: "【寫作】「我們的房子很大」Unser Haus ist groß. 若改成「我們的家庭」Familie陰性，該用？", options: ["Unser", "Unsere", "Unseres"], answer: "Unsere", hint: "Familie陰性→加e→unsere" },
    ],
    trans: [
      { zh: "我想向你介紹我的家庭：我爸爸是醫生，我媽媽是老師。", scene: "歌德口說 Teil 1：自我介紹／家庭", de: "Ich möchte dir meine Familie vorstellen: Mein Vater ist Arzt und meine Mutter ist Lehrerin.", note: "Familie陰性→meine;Vater陽性→mein;Mutter陰性→meine。介紹家庭必考" },
      { zh: "他的姐姐住在柏林，她的工作很有趣。", scene: "歌德寫作：描述他人", de: "Seine Schwester wohnt in Berlin und ihre Arbeit ist sehr interessant.", note: "他的=sein(Schwester陰性→seine);她的=ihr(Arbeit陰性→ihre)。sein/ihr分辨是高頻考點" },
      { zh: "您可以給我您的電話號碼嗎？", scene: "歌德口說／寫作：禮貌請求", de: "Können Sie mir Ihre Telefonnummer geben?", note: "禮貌『您的』大寫Ihr;Nummer陰性→Ihre;mir第三格(給我)" },
    ]
  },
  {
    id: "g1c", level: "A1.2", emoji: "🔄", title: "人稱代詞四格變化",
    color: "#0EA5E9",
    intro: "「我 ich、我（受詞）mich、給我 mir」——人稱代詞在不同「格」會變身。這是德語核心難點，但只要記住這張表，聽說讀寫都通！",
    blocks: [
      { type: "card", title: "人稱代詞變化總表（超重要記憶卡）", subtitle: "主格=誰做動作｜第四格=直接受詞｜第三格=給誰", headers: ["主格 (誰)", "第四格 (把誰)", "第三格 (給誰)"], rows: [
        ["ich 我", "mich 我", "mir 給我"],
        ["du 你", "dich 你", "dir 給你"],
        ["er 他", "ihn 他", "ihm 給他"],
        ["sie 她", "sie 她", "ihr 給她"],
        ["es 它", "es 它", "ihm 給它"],
        ["wir 我們", "uns 我們", "uns 給我們"],
        ["ihr 你們", "euch 你們", "euch 給你們"],
        ["sie/Sie 他們/您", "sie/Sie", "ihnen/Ihnen"],
      ], foot: "口訣:第四格『把/看/愛』誰(Ich liebe dich我愛你)。第三格『給/幫/謝』誰(Ich helfe dir我幫你)。" },
      { type: "hi", roles: ["subject", "verb", "object"], title: "主格 vs 第四格", sentences: [
        [{t:"Ich",r:"subject"},{t:"liebe",r:"verb"},{t:"dich",r:"object"},{t:"."}],
        [{t:"Er",r:"subject"},{t:"sieht",r:"verb"},{t:"mich",r:"object"},{t:"."}],
      ]},
      { type: "hi", roles: ["subject", "verb", "object"], title: "第三格（給誰／幫誰）", sentences: [
        [{t:"Ich",r:"subject"},{t:"helfe",r:"verb"},{t:"dir",r:"object"},{t:"."}],
        [{t:"Sie",r:"subject"},{t:"gibt",r:"verb"},{t:"mir",r:"object"},{t:"das Buch."}],
      ]},
      { type: "tip", text: "🧠 怎麼判斷用第幾格？看動詞！liebe/sehe/habe(愛/看/有)→第四格(mich,dich)。helfe/danke/gebe(幫/謝/給)→第三格(mir,dir)。" },
      { type: "examTip", points: [
        { skill: "閱讀", text: "代詞指代誰？mich=我、ihn=他，看懂才知道在講誰。" },
        { skill: "聽力", text: "對話常說 Kannst du mir helfen?（你能幫我嗎）要聽懂 mir。" },
        { skill: "寫作", text: "寫信常用 Ich danke dir（謝謝你）、Schreib mir（寫信給我）。" },
        { skill: "口說", text: "Ich liebe dich, Hilf mir!——日常超高頻，一定要會。" },
      ]},
    ],
    quiz: [
      { q: "Ich liebe ___.（我愛你）", options: ["du", "dich", "dir"], answer: "dich", hint: "lieben接第四格,你=dich" },
      { q: "Er sieht ___.（他看見我）", options: ["ich", "mich", "mir"], answer: "mich", hint: "sehen接第四格,我=mich" },
      { q: "Kannst du ___ helfen?（你能幫我嗎）", options: ["mich", "mir", "ich"], answer: "mir", hint: "helfen接第三格,給我=mir" },
      { q: "【聽力情境】服務生問 Was kann ich für ___ tun?（我能為您做什麼，禮貌）", options: ["Sie", "Ihnen", "euch"], answer: "Sie", hint: "für+第四格,您=Sie。für ist第四格介詞" },
      { q: "【寫作情境】寫「我給他一本書」Ich gebe ___ ein Buch.（給他）", options: ["ihn", "ihm", "er"], answer: "ihm", hint: "geben給誰=第三格,給他=ihm。考試常考ihn(四格)vs ihm(三格)" },
    ],
    trans: [
      { zh: "我想邀請你來我的生日派對。", scene: "歌德寫作 A2：寫邀請信最常考！", de: "Ich möchte dich zu meiner Geburtstagsparty einladen.", note: "möchte+原形;邀請『誰』=第四格dich;einladen可分動詞跟情態動詞連用時『不拆開』放句尾。寫邀請信必背句型!" },
      { zh: "你能幫我一個忙嗎？我之後會謝謝你。", scene: "歌德口說／寫作：請求幫助", de: "Kannst du mir helfen? Ich danke dir später.", note: "helfen接第三格→mir;danken接第三格→dir。helfen/danken都是第三格動詞,考試易錯" },
      { zh: "服務生問：我能為您做什麼嗎？", scene: "歌德聽力／口說：餐廳、商店情境", de: "Der Kellner fragt: Was kann ich für Sie tun?", note: "für是第四格介詞→您=Sie;kann+原形tun放句尾。服務情境高頻句" },
    ]
  },
  {
    id: "g2", level: "A1.1", emoji: "⚡", title: "現在式動詞變位（含不規則・可分動詞）",
    color: "#EF4444",
    intro: "德語動詞會跟著主語變詞尾，而且動詞永遠在第二位！這課還要教你考試最容易錯的『不規則變音』和『可分動詞』——這兩個是 A1-A2 必考重點。",
    blocks: [
      { type: "card", title: "規則動詞變位（記憶卡）", subtitle: "以 wohnen(住)、spielen(玩) 為例", headers: ["人稱", "詞尾", "wohnen"], rows: [
        ["ich 我", "-e", "wohne"],
        ["du 你", "-st", "wohnst"],
        ["er/sie/es 他/她/它", "-t", "wohnt"],
        ["wir 我們", "-en", "wohnen"],
        ["ihr 你們", "-t", "wohnt"],
        ["sie/Sie 他們/您", "-en", "wohnen"],
      ], foot: "規則動詞:去掉原形的-en,加上對應詞尾即可。" },
      { type: "card", title: "⚠️ 不規則動詞：du / er 會變音", subtitle: "考試最愛考！只有 du 和 er/sie/es 變，其他不變", headers: ["變化", "原形", "er 形（變了！）"], rows: [
        ["e → i", "sprechen 說", "spricht"],
        ["e → i", "essen 吃", "isst"],
        ["e → ie", "sehen 看", "sieht"],
        ["e → ie", "lesen 讀", "liest"],
        ["a → ä", "fahren 開車", "fährt"],
        ["a → ä", "schlafen 睡", "schläft"],
        ["a → ä", "lassen 讓", "lässt"],
      ], foot: "口訣:e變i/ie(說吃看讀),a變ä(開睡讓)。只在du(du sprichst)和er(er spricht)變,wir/ihr/sie不變!" },
      { type: "card", title: "🔗 可分動詞（分離動詞）", subtitle: "前綴會『分家』跑到句尾！", headers: ["原形", "拆開後", "例句"], rows: [
        ["aufstehen 起床", "stehe...auf", "Ich stehe um 7 auf."],
        ["einkaufen 購物", "kaufe...ein", "Ich kaufe ein."],
        ["einladen 邀請", "lade...ein", "Ich lade dich ein."],
        ["anrufen 打電話", "rufe...an", "Ich rufe dich an."],
        ["fernsehen 看電視", "sehe...fern", "Ich sehe fern."],
      ], foot: "現在式:前綴(auf/ein/an...)要拆下來丟到句尾!動詞本體在第二位,前綴在最後。" },
      { type: "hi", roles: ["subject", "verb"], title: "可分動詞:本體第二位,前綴句尾", sentences: [
        [{t:"Ich",r:"subject"},{t:"stehe",r:"verb"},{t:"um sieben Uhr"},{t:"auf",r:"verb"},{t:"."}],
        [{t:"Ich",r:"subject"},{t:"lade",r:"verb"},{t:"dich"},{t:"ein",r:"verb"},{t:"."}],
      ]},
      { type: "tip", text: "🧠 重點區分:可分動詞在『現在式』要拆開(Ich rufe dich an);但跟『情態動詞』連用時不拆,放句尾原形(Ich möchte dich anrufen);『現在完成時』ge加中間(angerufen)。這三種狀況考試都考!" },
      { type: "examTip", points: [
        { skill: "閱讀", text: "看到句尾孤零零的 auf/ein/an，要回頭找前面的動詞本體，它們是一組。" },
        { skill: "聽力", text: "聽到 Ich stehe...（停頓）...auf，別漏掉句尾的前綴，意思才完整。" },
        { skill: "寫作", text: "寫日常作息(aufstehen, einkaufen)必用可分動詞，前綴別忘記丟句尾。" },
        { skill: "口說", text: "描述一天:Ich stehe um 7 auf, dann kaufe ich ein...前綴位置要對。" },
      ]},
    ],
    quiz: [
      { q: "Ich ___ (wohnen) in Berlin.", options: ["wohne", "wohnst", "wohnt"], answer: "wohne", hint: "ich + -e" },
      { q: "Du ___ (spielen) gut.", options: ["spiele", "spielst", "spielt"], answer: "spielst", hint: "du + -st" },
      { q: "Er ___ (kommen) aus China.", options: ["komme", "kommst", "kommt"], answer: "kommt", hint: "er + -t" },
      { q: "【不規則】Er ___ (sprechen) drei Sprachen.（他說三種語言）", options: ["sprecht", "spricht", "sprechst"], answer: "spricht", hint: "sprechen是e→i不規則,er spricht。考試高頻!" },
      { q: "【不規則】___ du gern Bücher? (lesen 讀)", options: ["Lest", "Liest", "Liesst"], answer: "Liest", hint: "lesen是e→ie,du liest" },
      { q: "【可分動詞】描述作息:Ich ___ jeden Tag um 7 Uhr ___.（aufstehen 起床）", options: ["stehe...auf", "aufstehe", "stehe auf...nichts"], answer: "stehe...auf", hint: "可分動詞現在式要拆:stehe放第二位,auf丟句尾" },
    ],
    trans: [
      { zh: "他每天讀很多書，也說兩種語言。", scene: "歌德寫作：描述某人能力／習慣", de: "Er liest jeden Tag viele Bücher und spricht auch zwei Sprachen.", note: "lesen→liest(e→ie),sprechen→spricht(e→i)。兩個都是不規則,er形變音" },
      { zh: "我每天七點起床，然後去購物。", scene: "歌德口說／寫作：描述一天作息", de: "Ich stehe jeden Tag um sieben Uhr auf, dann kaufe ich ein.", note: "aufstehen→stehe...auf;einkaufen→kaufe...ein。可分動詞前綴丟句尾!作息題必考" },
      { zh: "你今晚想看電視嗎？", scene: "歌德口說：邀約、休閒", de: "Möchtest du heute Abend fernsehen?", note: "fernsehen跟情態動詞möchte連用時『不拆開』,原形放句尾。對比現在式 Ich sehe fern(要拆)" },
    ]
  },
  {
    id: "g3", level: "A1.1", emoji: "🌟", title: "sein 和 haben",
    color: "#F59E0B",
    intro: "最重要的兩個不規則動詞，一定要背熟！",
    blocks: [
      { type: "table", headers: ["人稱", "sein 是", "haben 有"], rows: [
        ["ich", "bin", "habe"],
        ["du", "bist", "hast"],
        ["er/sie/es", "ist", "hat"],
        ["wir", "sind", "haben"],
        ["ihr", "seid", "habt"],
        ["sie/Sie", "sind", "haben"],
      ]},
      { type: "hi", roles: ["subject", "verb"], title: "例句", sentences: [
        [{t:"Ich",r:"subject"},{t:"bin",r:"verb"},{t:"müde."}],
        [{t:"Sie",r:"subject"},{t:"hat",r:"verb"},{t:"einen Hund."}],
      ]},
      { type: "tip", text: "🎨 紅色標出 sein/haben 的變化形。這兩個動詞很常用，多念幾次就記住了！" },
    ],
    quiz: [
      { q: "Ich ___ Student.", options: ["bin", "bist", "ist"], answer: "bin", hint: "ich + sein" },
      { q: "Du ___ Zeit.", options: ["habe", "hast", "hat"], answer: "hast", hint: "du + haben" },
      { q: "Wir ___ glücklich.", options: ["bin", "seid", "sind"], answer: "sind", hint: "wir + sein" },
    ]
  },
  {
    id: "g4", level: "A1.2", emoji: "💪", title: "情態動詞",
    color: "#FACC15",
    intro: "情態動詞（können, müssen...）放第二位，真正的動詞變成原形跑到句尾！",
    blocks: [
      { type: "table", headers: ["情態動詞", "意思", "ich 形"], rows: [
        ["können", "能/會", "kann"],
        ["müssen", "必須", "muss"],
        ["wollen", "想要", "will"],
        ["möchten", "想要(禮貌)", "möchte"],
        ["dürfen", "可以(許可)", "darf"],
        ["sollen", "應該", "soll"],
      ]},
      { type: "hi", roles: ["subject", "modal", "verb"], title: "情態動詞第二位，原形動詞句尾", sentences: [
        [{t:"Ich",r:"subject"},{t:"kann",r:"modal"},{t:"Deutsch"},{t:"sprechen",r:"verb"},{t:"."}],
        [{t:"Du",r:"subject"},{t:"musst",r:"modal"},{t:"jetzt"},{t:"gehen",r:"verb"},{t:"."}],
        [{t:"Wir",r:"subject"},{t:"wollen",r:"modal"},{t:"Pizza"},{t:"essen",r:"verb"},{t:"."}],
      ]},
      { type: "tip", text: "🎨 黃色 = 情態動詞（第二位），紅色 = 原形動詞（句尾）。這是德語的『框架結構』：情態動詞和主動詞像把句子框起來！" },
    ],
    quiz: [
      { q: "Ich ___ Deutsch sprechen.", options: ["kann", "kannst", "können"], answer: "kann", hint: "ich + können" },
      { q: "Du musst jetzt ___.", options: ["gehst", "gehen", "geht"], answer: "gehen", hint: "句尾用原形" },
      { q: "Wir ___ ins Kino gehen.", options: ["will", "willst", "wollen"], answer: "wollen", hint: "wir + wollen" },
    ]
  },
  {
    id: "g5", level: "A1.2", emoji: "🎯", title: "第四格 Akkusativ",
    color: "#10B981",
    intro: "第四格是動作的直接受詞。主要變化在陽性冠詞上！",
    blocks: [
      { type: "table", headers: ["性別", "第一格(主格)", "第四格(賓格)"], rows: [
        ["陽性", "der / ein", "den / einen ⚠️"],
        ["陰性", "die / eine", "die / eine (不變)"],
        ["中性", "das / ein", "das / ein (不變)"],
        ["複數", "die", "die (不變)"],
      ]},
      { type: "hi", roles: ["subject", "verb", "object"], title: "誰做動作=主語，被作用=受詞", sentences: [
        [{t:"Ich",r:"subject"},{t:"sehe",r:"verb"},{t:"den Mann",r:"object"},{t:"."}],
        [{t:"Sie",r:"subject"},{t:"kauft",r:"verb"},{t:"einen Apfel",r:"object"},{t:"."}],
      ]},
      { type: "tip", text: "🎨 藍=主語，紅=動詞，綠=第四格受詞。只有陽性會變：der→den, ein→einen！" },
    ],
    quiz: [
      { q: "Ich sehe ___ Mann.", options: ["der", "den", "dem"], answer: "den", hint: "陽性第四格 der→den" },
      { q: "Sie kauft ___ Apfel.", options: ["ein", "einen", "einem"], answer: "einen", hint: "陽性第四格 ein→einen" },
      { q: "Wir haben ___ Idee.", options: ["eine", "einen", "ein"], answer: "eine", hint: "陰性不變" },
    ]
  },
  {
    id: "g6", level: "A1.2", emoji: "🚫", title: "否定 nicht 和 kein",
    color: "#6366F1",
    intro: "nicht 否定動詞/形容詞；kein 否定名詞。",
    blocks: [
      { type: "table", headers: ["用法", "例子"], rows: [
        ["nicht 否定動詞", "Ich schlafe nicht."],
        ["nicht 否定形容詞", "Das ist nicht gut."],
        ["kein 否定名詞", "Ich habe kein Geld."],
        ["kein (陽性四格)", "Ich habe keinen Hund."],
      ]},
      { type: "hi", roles: ["verb", "object"], title: "kein 配名詞", sentences: [
        [{t:"Ich"},{t:"trinke",r:"verb"},{t:"keinen Kaffee",r:"object"},{t:"."}],
        [{t:"Sie"},{t:"hat",r:"verb"},{t:"keine Zeit",r:"object"},{t:"."}],
      ]},
      { type: "tip", text: "🎨 紅=動詞，綠=被否定的名詞。有名詞用 kein，其他用 nicht！" },
    ],
    quiz: [
      { q: "Ich habe ___ Geld.", options: ["nicht", "kein", "keine"], answer: "kein", hint: "Geld 中性名詞" },
      { q: "Das ist ___ gut.", options: ["nicht", "kein", "keine"], answer: "nicht", hint: "否定形容詞" },
      { q: "Er trinkt ___ Bier.", options: ["nicht", "kein", "keinen"], answer: "kein", hint: "Bier 中性名詞" },
    ]
  },
  {
    id: "g7", level: "A2.1", emoji: "🔗", title: "並列句連接詞",
    color: "#F59E0B",
    intro: "und, aber, oder, denn 連接兩個句子，不改變語序（動詞還是第二位）。",
    blocks: [
      { type: "table", headers: ["連接詞", "意思"], rows: [
        ["und", "和"],
        ["aber", "但是"],
        ["oder", "或者"],
        ["denn", "因為"],
      ]},
      { type: "hi", roles: ["conj", "subject", "verb"], title: "連接詞後語序不變", sentences: [
        [{t:"Ich"},{t:"lerne",r:"verb"},{t:"Deutsch"},{t:"und",r:"conj"},{t:"ich",r:"subject"},{t:"höre",r:"verb"},{t:"Musik."}],
        [{t:"Er"},{t:"kommt",r:"verb"},{t:"aber",r:"conj"},{t:"sie",r:"subject"},{t:"bleibt",r:"verb"},{t:"."}],
      ]},
      { type: "tip", text: "🎨 紫=連接詞，藍=主語，紅=動詞。重點：連接詞後面，動詞還是排第二位（正常語序）！" },
    ],
    quiz: [
      { q: "Ich bin müde, ___ ich arbeite weiter.", options: ["und", "aber", "denn"], answer: "aber", hint: "對比關係用 aber" },
      { q: "Trinkst du Tee ___ Kaffee?", options: ["und", "oder", "aber"], answer: "oder", hint: "選擇用 oder" },
      { q: "Er bleibt zu Hause, ___ er ist krank.", options: ["und", "oder", "denn"], answer: "denn", hint: "原因用 denn" },
    ]
  },
  {
    id: "g8", level: "A2.1", emoji: "📐", title: "介詞",
    color: "#F97316",
    intro: "介詞表示位置、方向、時間。常見介詞要記搭配。",
    blocks: [
      { type: "table", headers: ["介詞", "意思", "例子"], rows: [
        ["in", "在...裡", "in der Schule"],
        ["auf", "在...上", "auf dem Tisch"],
        ["mit", "和/用", "mit dem Bus"],
        ["für", "為了", "für dich"],
        ["zu", "到", "zum Bahnhof"],
        ["von", "從/的", "von Berlin"],
      ]},
      { type: "hi", roles: ["prep", "object"], title: "介詞 + 名詞", sentences: [
        [{t:"Ich fahre"},{t:"mit",r:"prep"},{t:"dem Bus",r:"object"},{t:"."}],
        [{t:"Das Buch liegt"},{t:"auf",r:"prep"},{t:"dem Tisch",r:"object"},{t:"."}],
      ]},
      { type: "tip", text: "🎨 橘=介詞，綠=後面的名詞。介詞會影響名詞的格（第三格/第四格），先記常見搭配！" },
    ],
    quiz: [
      { q: "Ich fahre ___ dem Bus.", options: ["mit", "für", "zu"], answer: "mit", hint: "搭乘交通工具用 mit" },
      { q: "Das Geschenk ist ___ dich.", options: ["mit", "für", "von"], answer: "für", hint: "為了某人用 für" },
      { q: "Wir gehen ___ Bahnhof.", options: ["in", "auf", "zum"], answer: "zum", hint: "到某地 zu+dem=zum" },
    ]
  },
  {
    id: "g9", level: "A2.1", emoji: "🧩", title: "從句 weil / dass",
    color: "#10B981",
    intro: "weil(因為), dass(那) 引導從句——動詞要跑到句尾！",
    blocks: [
      { type: "hi", roles: ["conj", "subject", "verb"], title: "從句動詞在句尾", sentences: [
        [{t:"Ich bleibe zu Hause,"},{t:"weil",r:"conj"},{t:"ich",r:"subject"},{t:"krank"},{t:"bin",r:"verb"},{t:"."}],
        [{t:"Ich glaube,"},{t:"dass",r:"conj"},{t:"er",r:"subject"},{t:"heute"},{t:"kommt",r:"verb"},{t:"."}],
      ]},
      { type: "table", headers: ["主句", "從句(動詞句尾)"], rows: [
        ["Ich bleibe zu Hause,", "weil ich krank bin."],
        ["Sie sagt,", "dass sie müde ist."],
      ]},
      { type: "tip", text: "🎨 紫=從句連接詞，藍=主語，紅=動詞。重點：weil/dass 後面，動詞被『踢』到句子最後面！跟並列句完全不同。" },
    ],
    quiz: [
      { q: "Ich lerne, ___ ich eine Prüfung habe.", options: ["und", "weil", "aber"], answer: "weil", hint: "原因用 weil" },
      { q: "Ich bleibe zu Hause, weil ich krank ___.", options: ["bin", "ist", "sind"], answer: "bin", hint: "ich + sein,動詞句尾" },
      { q: "Er sagt, ___ er kommt.", options: ["weil", "dass", "denn"], answer: "dass", hint: "引述用 dass" },
    ]
  },
  {
    id: "g10", level: "A2.2", emoji: "⏰", title: "完成式 Perfekt (過去)",
    color: "#06B6D4",
    intro: "說過去發生的事，用 haben/sein + 過去分詞。過去分詞放句尾！",
    blocks: [
      { type: "table", headers: ["原形", "過去分詞", "助動詞"], rows: [
        ["machen", "gemacht", "haben"],
        ["spielen", "gespielt", "haben"],
        ["gehen", "gegangen", "sein"],
        ["fahren", "gefahren", "sein"],
        ["essen", "gegessen", "haben"],
      ]},
      { type: "hi", roles: ["subject", "verb", "partizip"], title: "助動詞第二位,分詞句尾", sentences: [
        [{t:"Ich",r:"subject"},{t:"habe",r:"verb"},{t:"Fußball"},{t:"gespielt",r:"partizip"},{t:"."}],
        [{t:"Sie",r:"subject"},{t:"ist",r:"verb"},{t:"nach Berlin"},{t:"gefahren",r:"partizip"},{t:"."}],
      ]},
      { type: "tip", text: "🎨 紅=助動詞(haben/sein,第二位),青=過去分詞(句尾)。移動類動詞(gehen,fahren)用 sein,其他多用 haben！" },
    ],
    quiz: [
      { q: "Ich ___ Fußball gespielt.", options: ["habe", "bin", "hat"], answer: "habe", hint: "spielen 用 haben" },
      { q: "Sie ist nach Berlin ___.", options: ["gefahrt", "gefahren", "fahren"], answer: "gefahren", hint: "fahren 的分詞" },
      { q: "Wir ___ nach Hause gegangen.", options: ["haben", "sind", "ist"], answer: "sind", hint: "gehen 用 sein" },
    ]
  },
  {
    id: "g11", level: "A2.2", emoji: "🌧️", title: "從句 wenn (當/如果)",
    color: "#3B82F6",
    intro: "wenn 表示『當...時』或『如果...』，動詞一樣跑句尾！",
    blocks: [
      { type: "hi", roles: ["conj", "subject", "verb"], title: "wenn 從句", sentences: [
        [{t:"Wenn",r:"conj"},{t:"es",r:"subject"},{t:"regnet",r:"verb"},{t:", bleibe ich zu Hause."}],
        [{t:"Ich freue mich,"},{t:"wenn",r:"conj"},{t:"du",r:"subject"},{t:"kommst",r:"verb"},{t:"."}],
      ]},
      { type: "tip", text: "🎨 紫=wenn,藍=主語,紅=動詞(句尾)。wenn 在句首時,主句動詞緊跟逗號後（動詞碰動詞）！" },
    ],
    quiz: [
      { q: "___ es regnet, bleibe ich zu Hause.", options: ["Weil", "Wenn", "Dass"], answer: "Wenn", hint: "條件用 wenn" },
      { q: "Wenn ich Zeit ___, komme ich.", options: ["habe", "hat", "haben"], answer: "habe", hint: "動詞句尾,ich+haben" },
      { q: "Ich freue mich, wenn du ___.", options: ["kommst", "kommt", "kommen"], answer: "kommst", hint: "du+kommen,句尾" },
    ]
  },
{
    id: "g12", level: "A2.1", emoji: "🎁", title: "第三格 Dativ",
    color: "#14B8A6",
    intro: "第三格是『間接受詞』——給誰、向誰。常跟 geben, helfen, danken 等動詞一起出現。",
    blocks: [
      { type: "table", headers: ["性別", "第一格", "第三格 Dativ"], rows: [
        ["陽性", "der / ein", "dem / einem ⚠️"],
        ["陰性", "die / eine", "der / einer ⚠️"],
        ["中性", "das / ein", "dem / einem ⚠️"],
        ["複數", "die", "den + n ⚠️"],
      ]},
      { type: "hi", roles: ["subject", "verb", "object"], title: "給『誰』用第三格", sentences: [
        [{t:"Ich",r:"subject"},{t:"gebe",r:"verb"},{t:"dem Mann",r:"object"},{t:"das Buch."}],
        [{t:"Sie",r:"subject"},{t:"hilft",r:"verb"},{t:"der Frau",r:"object"},{t:"."}],
      ]},
      { type: "tip", text: "🎨 綠=第三格(給誰)。記口訣：der→dem, die→der, das→dem。helfen, danken, gefallen 這些動詞後面一定接第三格！" },
    ],
    quiz: [
      { q: "Ich gebe ___ Mann das Buch.", options: ["der", "den", "dem"], answer: "dem", hint: "陽性第三格 der→dem" },
      { q: "Ich helfe ___ Frau.", options: ["die", "der", "den"], answer: "der", hint: "陰性第三格 die→der,helfen接Dativ" },
      { q: "Das Auto gehört ___ Kind.", options: ["das", "dem", "den"], answer: "dem", hint: "中性第三格 das→dem" },
    ]
  },
  {
    id: "g13", level: "A2.2", emoji: "🌈", title: "形容詞詞尾變化（三大表）",
    color: "#F472B6",
    intro: "形容詞放名詞前面時，詞尾會跟著「冠詞種類 + 性別 + 格」變化。這是德語最複雜的語法之一，但只要記住這三張表，連 A1 文章裡的 ein gutes Buch 你都秒懂！橫看性別、直看格位。",
    blocks: [
      { type: "card", title: "表1：定冠詞後（der/die/das/die）", subtitle: "例：der gut__ Mann。橫=性別，直=格", headers: ["格 ＼ 性", "陽 m", "陰 f", "中 n", "複 pl"], rows: [
        ["第一格 N", "-e", "-e", "-e", "-en"],
        ["第二格 G", "-en", "-en", "-en", "-en"],
        ["第三格 D", "-en", "-en", "-en", "-en"],
        ["第四格 A", "-en", "-e", "-e", "-en"],
      ], foot: "口訣:只有『上面一排(第一格)』和『陰性中性的第四格』是 -e,其餘全部 -en。先記這個就贏一半!" },
      { type: "card", title: "表2：不定冠詞後（ein/eine/ein）", subtitle: "例：ein gut__ Mann（這就是學生看不懂 ein gutes Buch 的原因！）", headers: ["格 ＼ 性", "陽 m", "陰 f", "中 n", "複 pl*"], rows: [
        ["第一格 N", "-er", "-e", "-es", "-en"],
        ["第二格 G", "-en", "-en", "-en", "-en"],
        ["第三格 D", "-en", "-en", "-en", "-en"],
        ["第四格 A", "-en", "-e", "-es", "-en"],
      ], foot: "重點:陽性主格-er(ein guter Mann),中性-es(ein gutes Buch ←就是這個!)。因為ein看不出性別,形容詞要『補』出來。*複數無不定冠詞,用kein/mein時同此欄。" },
      { type: "card", title: "表3：無冠詞 / welch-（強變化）", subtitle: "例：guter Wein（沒冠詞時，形容詞自己扛起冠詞的活）", headers: ["格 ＼ 性", "陽 m", "陰 f", "中 n", "複 pl"], rows: [
        ["第一格 N", "-er", "-e", "-es", "-e"],
        ["第二格 G", "-en", "-er", "-en", "-er"],
        ["第三格 D", "-em", "-er", "-em", "-en"],
        ["第四格 A", "-en", "-e", "-es", "-e"],
      ], foot: "沒冠詞時,形容詞詞尾幾乎=定冠詞的樣子(der→-er, das→-es, dem→-em)。welcher/dieser 這類後面則跟『表1』一樣用-e/-en。" },
      { type: "hi", roles: ["article", "object"], title: "三種情況對照", sentences: [
        [{t:"der",r:"article"},{t:"gute Wein",r:"object"},{t:"(定冠詞→-e)"}],
        [{t:"ein",r:"article"},{t:"guter Wein",r:"object"},{t:"(不定冠詞→-er)"}],
        [{t:"guter Wein",r:"object"},{t:"(無冠詞→-er)"}],
      ]},
      { type: "tip", text: "🧠 超級口訣:①有定冠詞→形容詞輕鬆,大多-e/-en ②有ein→形容詞要『補』性別(-er陽/-es中) ③沒冠詞→形容詞模仿定冠詞(-er/-es/-em)。背的順序:先表1,再表2,表3最後。" },
      { type: "examTip", points: [
        { skill: "閱讀", text: "ein gutes Buch、das große Haus——A1/A2 文章到處是，懂詞尾才讀得順。" },
        { skill: "聽力", text: "詞尾常很輕，但能幫你判斷性別和格，聽描述題很有用。" },
        { skill: "寫作", text: "A2/B1 寫作加形容詞讓句子更豐富(ein schönes Wochenende),詞尾錯就扣分。" },
        { skill: "口說", text: "描述東西 ein interessanter Film、eine gute Idee，詞尾對了才地道。" },
      ]},
    ],
    quiz: [
      { q: "der neu___ Lehrer（定冠詞+陽性第一格）", options: ["-e", "-en", "-er"], answer: "-e", hint: "表1,第一格→-e" },
      { q: "das klein___ Kind（定冠詞+中性第一格）", options: ["-e", "-es", "-en"], answer: "-e", hint: "表1,定冠詞後第一格都-e" },
      { q: "ein gut___ Buch（不定冠詞+中性第一格）", options: ["-e", "-es", "-er"], answer: "-es", hint: "表2!ein看不出中性,形容詞補-es。這就是學生最困惑的!" },
      { q: "【閱讀情境】Ich habe einen ___ Tag.（一個美好的一天,schön,不定冠詞陽性第四格）", options: ["schöner", "schönen", "schönes"], answer: "schönen", hint: "表2,不定冠詞陽性第四格→-en。einen schönen Tag!" },
      { q: "【寫作情境】祝福語 Ich wünsche dir ein ___ Wochenende!（美好的週末,schön,中性第四格）", options: ["schöner", "schönes", "schönen"], answer: "schönes", hint: "表2,中性第四格→-es。ein schönes Wochenende是高頻祝福語!" },
    ],
    trans: [
      { zh: "祝你有個美好的週末！", scene: "歌德寫作：信件結尾祝福語（超高頻）", de: "Ich wünsche dir ein schönes Wochenende!", note: "Wochenende中性,不定冠詞第四格→schönes(表2,-es)。寫信結尾必備!" },
      { zh: "我昨天看了一部很有趣的電影。", scene: "歌德寫作：描述經歷", de: "Gestern habe ich einen interessanten Film gesehen.", note: "Film陽性,不定冠詞第四格→interessanten(表2,-en);完成式habe...gesehen" },
      { zh: "那位新老師非常友善。", scene: "歌德口說／寫作：描述人物", de: "Der neue Lehrer ist sehr freundlich.", note: "定冠詞陽性第一格→neue(表1,-e)" },
    ]
  },
  {
    id: "g14", level: "A2.1", emoji: "📊", title: "比較級與最高級",
    color: "#FB923C",
    intro: "比較兩樣東西用比較級，三者以上最厲害的用最高級。",
    blocks: [
      { type: "table", headers: ["原級", "比較級", "最高級"], rows: [
        ["klein 小", "kleiner", "am kleinsten"],
        ["schön 美", "schöner", "am schönsten"],
        ["gut 好", "besser ⚠️", "am besten ⚠️"],
        ["groß 大", "größer ⚠️", "am größten ⚠️"],
        ["gern 喜歡", "lieber ⚠️", "am liebsten ⚠️"],
      ]},
      { type: "hi", roles: ["subject", "object"], title: "比較用 als,一樣用 wie", sentences: [
        [{t:"Anna",r:"subject"},{t:"ist größer"},{t:"als Tom",r:"object"},{t:"."}],
        [{t:"Tom",r:"subject"},{t:"ist so groß"},{t:"wie Lisa",r:"object"},{t:"."}],
      ]},
      { type: "tip", text: "🎨 比較級 + als(比),原級 + wie(和...一樣)。注意不規則:gut→besser→am besten,記熟這幾個!" },
    ],
    quiz: [
      { q: "Anna ist ___ als Tom. (groß)", options: ["größer", "großer", "am größten"], answer: "größer", hint: "比較級,groß變音→größer" },
      { q: "Das ist das ___ Auto. (gut, 最高級)", options: ["beste", "guteste", "bessere"], answer: "beste", hint: "gut最高級不規則=beste" },
      { q: "Tom ist so groß ___ Lisa.", options: ["als", "wie", "als wie"], answer: "wie", hint: "一樣...用 wie" },
    ]
  },
  {
    id: "g15", level: "A2.2", emoji: "🕰️", title: "從句 als (過去的當時)",
    color: "#8B5CF6",
    intro: "als 表示過去『當...的時候』（一次性的過去事件）。注意：過去常態用 wenn，過去一次用 als。",
    blocks: [
      { type: "hi", roles: ["conj", "subject", "verb"], title: "als 從句,動詞句尾", sentences: [
        [{t:"Als",r:"conj"},{t:"ich",r:"subject"},{t:"klein"},{t:"war",r:"verb"},{t:", wohnte ich in Taipei."}],
        [{t:"Ich war glücklich,"},{t:"als",r:"conj"},{t:"ich",r:"subject"},{t:"die Prüfung"},{t:"bestand",r:"verb"},{t:"."}],
      ]},
      { type: "table", headers: ["用法", "例子"], rows: [
        ["als 過去一次", "Als ich jung war..."],
        ["wenn 現在/重複", "Wenn ich Zeit habe..."],
      ]},
      { type: "tip", text: "🎨 紫=als,藍=主語,紅=動詞(句尾)。口訣:過去『一次』用 als,現在或『每次』用 wenn。這是 A2 高頻考點!" },
    ],
    quiz: [
      { q: "___ ich klein war, spielte ich viel. (過去一次)", options: ["Wenn", "Als", "Dass"], answer: "Als", hint: "過去一次性用 als" },
      { q: "Als ich nach Hause ___, war es spät.", options: ["komme", "kam", "kommen"], answer: "kam", hint: "過去式+句尾,kommen→kam" },
      { q: "Immer ___ es regnet, bleibe ich zu Hause. (重複)", options: ["als", "wenn", "dass"], answer: "wenn", hint: "重複/現在用 wenn" },
    ]
  },
  {
    id: "g16", level: "A2.2", emoji: "❓", title: "從句 ob 與間接問句",
    color: "#06B6D4",
    intro: "ob = 是否（yes/no 問題變間接）。疑問詞(wann, wo...)也能引導間接問句，動詞都跑句尾。",
    blocks: [
      { type: "hi", roles: ["conj", "subject", "verb"], title: "間接問句動詞句尾", sentences: [
        [{t:"Ich weiß nicht,"},{t:"ob",r:"conj"},{t:"er",r:"subject"},{t:"heute"},{t:"kommt",r:"verb"},{t:"."}],
        [{t:"Weißt du,"},{t:"wann",r:"conj"},{t:"der Zug",r:"subject"},{t:"fährt",r:"verb"},{t:"?"}],
      ]},
      { type: "table", headers: ["直接問句", "間接問句(動詞句尾)"], rows: [
        ["Kommt er?", "Ich frage, ob er kommt."],
        ["Wann fährt er?", "Ich weiß, wann er fährt."],
      ]},
      { type: "tip", text: "🎨 紫=ob/疑問詞,藍=主語,紅=動詞(句尾)。沒有疑問詞的 yes/no 問句→用 ob。有 wann/wo/wer→直接拿來當連接詞!" },
    ],
    quiz: [
      { q: "Ich weiß nicht, ___ er kommt.", options: ["ob", "wenn", "dass"], answer: "ob", hint: "是否(yes/no)用 ob" },
      { q: "Weißt du, wann der Zug ___?", options: ["fährt", "fahren", "gefahren"], answer: "fährt", hint: "間接問句動詞句尾" },
      { q: "Ich frage, ___ das Geschäft offen ist.", options: ["ob", "was", "wer"], answer: "ob", hint: "是否開門=ob" },
    ]
  },
  {
    id: "g17", level: "A2.2", emoji: "➡️", title: "連接副詞 deshalb / trotzdem",
    color: "#EF4444",
    intro: "deshalb(因此)、trotzdem(儘管如此)放句首時，動詞緊跟在後(第二位)——和 weil 不同！",
    blocks: [
      { type: "table", headers: ["連接副詞", "意思"], rows: [
        ["deshalb / deswegen", "因此、所以"],
        ["trotzdem", "儘管如此"],
        ["dann", "然後"],
        ["danach", "之後"],
      ]},
      { type: "hi", roles: ["conj", "verb", "subject"], title: "副詞句首,動詞第二位", sentences: [
        [{t:"Es regnet."},{t:"Deshalb",r:"conj"},{t:"bleibe",r:"verb"},{t:"ich",r:"subject"},{t:"zu Hause."}],
        [{t:"Es regnet."},{t:"Trotzdem",r:"conj"},{t:"gehe",r:"verb"},{t:"ich",r:"subject"},{t:"raus."}],
      ]},
      { type: "tip", text: "🎨 紫=連接副詞,紅=動詞,藍=主語。重點:deshalb/trotzdem 後面是『動詞→主語』(動詞第二位),不像 weil 把動詞踢到句尾!" },
    ],
    quiz: [
      { q: "Es ist kalt. Deshalb ___ ich eine Jacke.", options: ["ich trage", "trage ich", "ich getragen"], answer: "trage ich", hint: "deshalb後動詞第二位:動詞+主語" },
      { q: "Ich bin müde. Trotzdem ___ ich weiter.", options: ["arbeite ich", "ich arbeite", "arbeiten"], answer: "arbeite ich", hint: "trotzdem後動詞第二位" },
      { q: "Welches Wort heißt『因此』?", options: ["trotzdem", "deshalb", "obwohl"], answer: "deshalb", hint: "deshalb=因此" },
    ]
  },
];


// ─── GRAMMAR MODULE UI ────────────────────────────────────────────────────────

function GrammarModule({ aiKey }) {
  const [lesson, setLesson] = useState(null);
  const [level, setLevel] = useState("all");
  const [quizAns, setQuizAns] = useState({});
  const [aiQuiz, setAiQuiz] = useState([]);
  const [transShow, setTransShow] = useState({});
  const [transInput, setTransInput] = useState({});

  if (!lesson) {
    const filtered = GRAMMAR_LESSONS.filter(g => level === "all" || g.level === level);
    return (
      <div>
        <h2 style={{ fontWeight: 800, color: C.purple, fontSize: 20, marginBottom: 4 }}>📐 必考文法</h2>
        <p style={{ color: "#7C3AED", fontSize: 13, marginBottom: 12 }}>彩色標重點・每課附小練習</p>
        <LevelFilter current={level} onChange={setLevel} />
        {filtered.map(g => (
          <Card key={g.id} color={g.color}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 32 }}>{g.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, color: "#1F2937", fontSize: 15 }}>{g.title}</div>
                <Badge text={g.level} color={LEVEL_COLORS[g.level] || g.color} />
              </div>
              <button onClick={() => { setLesson(g); setQuizAns({}); setAiQuiz([]); setTransShow({}); setTransInput({}); }} style={btnStyle(g.color)}>學習</button>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  const g = lesson;
  return (
    <div>
      <button onClick={() => setLesson(null)} style={{ background: "none", border: "none", color: C.purple, cursor: "pointer", fontWeight: 700, marginBottom: 10 }}>← 返回文法列表</button>
      <h2 style={{ fontWeight: 800, color: "#1F2937", fontSize: 20, marginBottom: 4 }}>{g.emoji} {g.title}</h2>
      <Badge text={g.level} color={LEVEL_COLORS[g.level] || g.color} />

      <Card color={g.color} style={{ marginTop: 14 }}>
        <div style={{ color: "#374151", fontSize: 14, lineHeight: 1.7 }}>{g.intro}</div>
      </Card>

      {g.blocks.map((b, bi) => {
        if (b.type === "table") return (
          <Card key={bi} color={g.color}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead><tr>{b.headers.map((h, j) => (
                  <th key={j} style={{ background: g.color + "22", color: "#1F2937", fontWeight: 800, padding: "8px 10px", textAlign: "left", border: `1px solid ${g.color}33` }}>{h}</th>
                ))}</tr></thead>
                <tbody>{b.rows.map((row, ri) => (
                  <tr key={ri} style={{ background: ri % 2 ? "#fff" : "#fafafa" }}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{ padding: "8px 10px", border: `1px solid ${g.color}22`, color: "#374151" }}>{cell}</td>
                    ))}
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </Card>
        );
        if (b.type === "hi") return (
          <Card key={bi} color={g.color}>
            {b.title && <div style={{ fontWeight: 800, color: g.color, fontSize: 14, marginBottom: 6 }}>✏️ {b.title}</div>}
            <RoleLegend roles={b.roles} />
            {b.sentences.map((toks, si) => <HiSentence key={si} tokens={toks} />)}
          </Card>
        );
        if (b.type === "tip") return (
          <div key={bi} style={{ background: "linear-gradient(135deg, #FEF3C7, #FCE7F3)", borderRadius: 14, padding: 14, margin: "0 0 14px", border: "2px dashed #F9A8D4" }}>
            <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.7 }}>{b.text}</div>
          </div>
        );
        if (b.type === "card") return (
          <div key={bi} style={{ background: "linear-gradient(135deg, #EDE9FE, #FAE8FF)", borderRadius: 18, padding: "18px 16px", margin: "0 0 14px", border: `2px solid ${g.color}55`, boxShadow: `0 4px 16px ${g.color}22` }}>
            <div style={{ fontWeight: 900, color: g.color, fontSize: 15, marginBottom: 4 }}>🃏 {b.title}</div>
            {b.subtitle && <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 10 }}>{b.subtitle}</div>}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead><tr>{b.headers.map((h, j) => (
                  <th key={j} style={{ background: g.color, color: "#fff", fontWeight: 800, padding: "10px 8px", textAlign: "center", border: `1px solid ${g.color}` }}>{h}</th>
                ))}</tr></thead>
                <tbody>{b.rows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{ padding: "10px 8px", border: `1px solid ${g.color}44`, color: ci === 0 ? g.color : "#1F2937", fontWeight: ci === 0 ? 800 : 700, textAlign: "center", background: ci === 0 ? `${g.color}11` : "#fff", fontSize: ci === 0 ? 13 : 16 }}>{cell}</td>
                    ))}
                  </tr>
                ))}</tbody>
              </table>
            </div>
            {b.foot && <div style={{ fontSize: 12, color: "#6B21A8", marginTop: 10, lineHeight: 1.6, fontWeight: 600 }}>💡 {b.foot}</div>}
          </div>
        );
        if (b.type === "examTip") return (
          <div key={bi} style={{ background: "#FEF2F2", borderRadius: 14, padding: 16, margin: "0 0 14px", border: "2px solid #FCA5A5" }}>
            <div style={{ fontWeight: 900, color: "#DC2626", fontSize: 14, marginBottom: 8 }}>🎯 這個文法考試怎麼考？</div>
            {b.points.map((p, pi) => (
              <div key={pi} style={{ fontSize: 13, color: "#374151", lineHeight: 1.7, marginBottom: 6, display: "flex", gap: 6 }}>
                <span>{["📖","🎧","✍️","🗣️"][pi % 4]}</span>
                <span><b style={{ color: "#DC2626" }}>{p.skill}：</b>{p.text}</span>
              </div>
            ))}
          </div>
        );
        return null;
      })}

      {/* 翻譯練習 */}
      {g.trans && g.trans.length > 0 && (
        <div style={{ marginTop: 14 }}>
          <div style={{ fontWeight: 800, color: C.purple, fontSize: 16, margin: "8px 0 4px" }}>🔁 翻譯練習（學會用出來）</div>
          <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 10 }}>先自己在框裡寫德語，寫完再對照參考答案。動手寫才會進步！</div>
          {g.trans.map((t, ti) => {
            const shown = transShow[ti];
            return (
              <Card key={ti} color={g.color}>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 4 }}>中文 → 德語</div>
                <div style={{ fontWeight: 700, color: "#1F2937", fontSize: 15, marginBottom: 4 }}>{t.zh}</div>
                {t.scene && <div style={{ fontSize: 12, color: "#A855F7", marginBottom: 8 }}>📌 {t.scene}</div>}
                <textarea
                  value={transInput[ti] || ""}
                  onChange={e => setTransInput(s => ({ ...s, [ti]: e.target.value }))}
                  placeholder="在這裡寫下你的德語翻譯..."
                  rows={2}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${g.color}55`, fontSize: 14, outline: "none", boxSizing: "border-box", resize: "vertical", marginBottom: 8, fontFamily: "inherit" }}
                />
                {shown ? (
                  <div style={{ background: "#F0FDF4", border: "1.5px solid #86EFAC", borderRadius: 10, padding: "10px 12px" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#15803D", marginBottom: 4 }}>✅ 參考答案</div>
                    <div style={{ fontSize: 15, color: "#166534", fontWeight: 700 }}>{t.de}</div>
                    {t.note && <div style={{ fontSize: 12, color: "#6B7280", marginTop: 6, lineHeight: 1.6 }}>💡 {t.note}</div>}
                  </div>
                ) : (
                  <button onClick={() => setTransShow(s => ({ ...s, [ti]: true }))} style={btnStyle(g.color)}>對照參考答案</button>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* Quiz */}
      <div style={{ fontWeight: 800, color: C.purple, fontSize: 16, margin: "18px 0 10px" }}>📝 小練習</div>
      <AiGenerateButton aiKey={aiKey} module="grammar" level={g.level} onResult={items => {
        const arr = Array.isArray(items) ? items : [items];
        setAiQuiz(prev => [...prev, ...arr]);
      }} />
      {[...g.quiz, ...aiQuiz].map((q, qi) => {
        const chosen = quizAns[qi];
        const isAi = qi >= g.quiz.length;
        return (
          <Card key={qi} color={g.color}>
            <div style={{ fontWeight: 700, color: "#1F2937", marginBottom: 10 }}>
              {qi + 1}. {q.q} {isAi && <span style={{ fontSize: 11, color: "#A78BFA" }}>✨ AI</span>}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {q.options.map(opt => {
                let bg = "#fff", border = "2px solid #E5E7EB", col = "#374151";
                if (chosen) {
                  if (opt === q.answer) { bg = "#D1FAE5"; border = "2px solid #10B981"; col = "#065F46"; }
                  else if (opt === chosen) { bg = "#FEE2E2"; border = "2px solid #EF4444"; col = "#991B1B"; }
                }
                return (
                  <button key={opt} disabled={!!chosen} onClick={() => setQuizAns(a => ({ ...a, [qi]: opt }))}
                    style={{ background: bg, border, color: col, borderRadius: 10, padding: "10px 16px", fontSize: 14, fontWeight: 700, cursor: chosen ? "default" : "pointer" }}>
                    {opt}
                  </button>
                );
              })}
            </div>
            {chosen && (
              <div style={{ marginTop: 10, fontSize: 13 }}>
                {chosen === q.answer
                  ? <span style={{ color: "#10B981", fontWeight: 700 }}>🎉 正確！</span>
                  : <span style={{ color: "#EF4444", fontWeight: 700 }}>❌ 正確答案：{q.answer}</span>}
                {q.hint && <span style={{ color: "#9CA3AF", marginLeft: 8 }}>💡 {q.hint}</span>}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}

// ─── HOME SCREEN ──────────────────────────────────────────────────────────────

function HomeScreen({ onPick, user, myWords = [], onSpeakWord }) {
  return (
    <div>
      {/* 三張橫幅卡片 */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 16, marginBottom: 28 }}>
        {/* Sam 寄語 */}
        <div style={{ background: "linear-gradient(135deg, #2D2A45, #1F1D2E)", borderRadius: 18, padding: "26px 24px", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 12 }}>Sam 老師寄語：</div>
          <div style={{ fontSize: 15, lineHeight: 1.8, opacity: 0.92 }}>
            學語言，從來不是天分問題。只要方法對、練習夠，每個人都能說一口好德語。你已經跨出第一步了，剩下的，我們一起走。🌱
          </div>
        </div>
        {/* 學習指南 */}
        <button onClick={() => onPick("guide")} style={{ background: "linear-gradient(135deg, #5EEAD4, #2DD4BF)", borderRadius: 18, padding: "22px 20px", color: "#fff", textAlign: "left", cursor: "pointer", border: "none", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 150 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 6 }}>學習指南</div>
            <div style={{ fontSize: 13, opacity: 0.95, lineHeight: 1.5 }}>新手必看<br />學習攻略</div>
          </div>
          <div style={{ fontSize: 26 }}>🧭</div>
        </button>
        {/* 零基礎3分鐘 */}
        <button onClick={() => onPick("threemin")} style={{ background: "linear-gradient(135deg, #93C5FD, #60A5FA)", borderRadius: 18, padding: "22px 20px", color: "#fff", textAlign: "left", cursor: "pointer", border: "none", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 150 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 6 }}>零基礎 3 分鐘</div>
            <div style={{ fontSize: 13, opacity: 0.95, lineHeight: 1.5 }}>每日 3 分鐘<br />輕鬆學德語</div>
          </div>
          <div style={{ fontSize: 26 }}>⏰</div>
        </button>
      </div>

      {/* 每日一句 */}
      <DailyQuote />

      {/* 2026 新版歌德考試課程 */}
      <div style={{ marginTop: 24, marginBottom: 8 }}>
        <div style={{ fontSize: 20, fontWeight: 900, color: "#1F2937" }}>2026 歌德檢定・聽說讀寫</div>
        <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 2 }}>四大題型，點進去開始練習</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
        {[
          { id: "speak", zh: "口說", en: "Sprechen", emoji: "🎤", bg: "linear-gradient(135deg, #C084FC, #A855F7)" },
          { id: "write", zh: "寫作", en: "Schreiben", emoji: "✍️", bg: "linear-gradient(135deg, #F472B6, #EC4899)" },
          { id: "read", zh: "閱讀", en: "Lesen", emoji: "📖", bg: "linear-gradient(135deg, #FBBF24, #F59E0B)" },
          { id: "listen", zh: "聽力", en: "Hören", emoji: "🎧", bg: "linear-gradient(135deg, #34D399, #10B981)" },
        ].map(c => (
          <button key={c.id} onClick={() => onPick(c.id)} style={{ background: c.bg, borderRadius: 16, padding: "20px 16px", color: "#fff", textAlign: "left", cursor: "pointer", border: "none", minHeight: 130, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ fontSize: 32 }}>{c.emoji}</div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 900 }}>{c.zh}</div>
              <div style={{ fontSize: 12, opacity: 0.9 }}>{c.en}</div>
            </div>
          </button>
        ))}
      </div>

      {/* 系統課程：單字文法 */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 20, fontWeight: 900, color: "#1F2937" }}>系統課程・打好基礎</div>
        <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 2 }}>單字和文法是地基，地基穩了，聽說讀寫自然輕鬆</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
        {[
          { id: "vocab", zh: "必背單字", desc: "A1+A2 高頻字・個人生詞本", emoji: "📒", bg: "linear-gradient(135deg, #818CF8, #6366F1)" },
          { id: "grammar", zh: "必考文法", desc: "19 課彩色記憶卡・考試應用", emoji: "📐", bg: "linear-gradient(135deg, #A78BFA, #8B5CF6)" },
        ].map(c => (
          <button key={c.id} onClick={() => onPick(c.id)} style={{ background: c.bg, borderRadius: 16, padding: "22px 20px", color: "#fff", textAlign: "left", cursor: "pointer", border: "none", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 38 }}>{c.emoji}</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 900 }}>{c.zh}</div>
              <div style={{ fontSize: 12, opacity: 0.92, marginTop: 2 }}>{c.desc}</div>
            </div>
          </button>
        ))}
      </div>

      {/* VIP / 付費課程（佔位） */}
      <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 20, fontWeight: 900, color: "#1F2937" }}>VIP 精修課程</div>
        <span style={{ fontSize: 13, color: "#C4B5FD", fontWeight: 700 }}>敬請期待 ›</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
        {["寫作高分模板", "閱讀長難句精析", "口說流利訓練營", "聽力陷阱破解"].map((t, i) => (
          <div key={i} style={{ background: "#F9FAFB", borderRadius: 14, padding: "20px 14px", border: "2px dashed #E5E7EB", textAlign: "center", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, right: 0, background: "linear-gradient(135deg, #FB923C, #F59E0B)", color: "#fff", fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: "0 14px 0 10px" }}>VIP</div>
            <div style={{ fontSize: 24, marginBottom: 8, opacity: 0.5 }}>🔒</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#6B7280" }}>{t}</div>
            <div style={{ fontSize: 11, color: "#C4B5FD", marginTop: 4 }}>敬請期待</div>
          </div>
        ))}
      </div>

      {/* 底部鼓勵 */}
      <div style={{ background: "linear-gradient(135deg, #EDE9FE, #FCE7F3)", borderRadius: 16, padding: "16px 18px", textAlign: "center" }}>
        <span style={{ fontSize: 15, fontWeight: 800, color: "#7C3AED" }}>🚀 堅持學習，你的德語一定會越來越好！💜</span>
      </div>
    </div>
  );
}

// 頂部橫向導航（門戶式，像 PTE 首頁）
const TOP_NAV = [
  { id: "home", label: "首頁" },
  { id: "system", label: "系統課程" },
  { id: "exam", label: "檢定課程" },
  { id: "community", label: "社區" },
  { id: "ausbildung", label: "Ausbildung" },
  { id: "business", label: "商業德語" },
  { id: "appinfo", label: "App" },
];

function TopNav({ tab, setTab, user, onLogin, onLogout, aiKey, onSetAiKey }) {
  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #EEE", position: "sticky", top: 0, zIndex: 20 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", gap: 8 }}>
        {/* Logo */}
        <button onClick={() => setTab("home")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", marginRight: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 12, background: "linear-gradient(135deg, #7C3AED, #EC4899)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, position: "relative" }}>
            🇩🇪<span style={{ position: "absolute", top: -4, right: -4, fontSize: 12 }}>⭐</span>
          </div>
          <span style={{ fontWeight: 900, fontSize: 16, color: "#1F2937", whiteSpace: "nowrap" }}>Sam 德語小屋</span>
        </button>

        {/* 橫向菜單 */}
        <div style={{ display: "flex", gap: 4, flex: 1, overflowX: "auto" }}>
          {TOP_NAV.map(t => {
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                background: "none", border: "none", cursor: "pointer", padding: "8px 12px", borderRadius: 8,
                color: active ? "#7C3AED" : "#4B5563", fontWeight: active ? 800 : 600, fontSize: 14.5, whiteSpace: "nowrap",
                borderBottom: active ? "2px solid #7C3AED" : "2px solid transparent",
              }}>{t.label}</button>
            );
          })}
        </div>

        {/* 右側 */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {user ? (
            <>
              <button onClick={() => { const k = window.prompt("輸入 AI 金鑰（Anthropic，用於生成題目／批改）：", aiKey || ""); if (k !== null) onSetAiKey(k.trim()); }}
                style={{ background: aiKey ? "#EDE9FE" : "#F3F4F6", border: "none", borderRadius: 20, padding: "6px 12px", color: aiKey ? "#7C3AED" : "#6B7280", fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
                {aiKey ? "✨ AI已啟用" : "⚙️ AI設定"}
              </button>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#4B5563", whiteSpace: "nowrap" }}>{user?.name}</span>
              <button onClick={onLogout} style={{ background: "none", border: "1px solid #E5E7EB", borderRadius: 20, padding: "5px 14px", color: "#6B7280", fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}>登出</button>
            </>
          ) : (
            <>
              <button onClick={onLogin} style={{ background: "none", border: "none", color: "#4B5563", fontSize: 14, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>登入</button>
              <button onClick={onLogin} style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)", border: "none", borderRadius: 20, padding: "7px 18px", color: "#fff", fontSize: 14, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}>註冊</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// 新手攻略（學習指南）
function GuideScreen() {
  const [sec, setSec] = useState("use");
  const MENU = [
    { id: "use", label: "各級別證書的用途", emoji: "🎯" },
    { id: "compare", label: "主流考試對比", emoji: "🆚" },
    { id: "structure", label: "歌德 A1／A2 題型結構", emoji: "📋" },
    { id: "speak", label: "口說・寫作評分", emoji: "🗣️" },
    { id: "report", label: "成績單分析", emoji: "📊" },
    { id: "howto", label: "如何使用本網站", emoji: "🧭" },
  ];
  const th = { background: "#7C3AED", color: "#fff", padding: "12px 12px", fontSize: 15, fontWeight: 800, textAlign: "left", border: "1px solid #7C3AED" };
  const td = { padding: "12px 12px", fontSize: 15, color: "#374151", border: "1px solid #E9D5FF", verticalAlign: "top", lineHeight: 1.6 };
  const tdH = { ...td, fontWeight: 800, color: "#7C3AED", background: "#F5F3FF", whiteSpace: "nowrap" };
  const h3 = { color: "#7C3AED", fontWeight: 900, fontSize: 22, marginBottom: 10 };
  const h4 = { color: "#EC4899", fontWeight: 800, fontSize: 18, marginTop: 22, marginBottom: 8 };
  const p = { fontSize: 16, color: "#374151", lineHeight: 1.9 };
  const li = { fontSize: 16, color: "#374151", lineHeight: 2 };

  return (
    <div>
      <div style={{ fontSize: 26, fontWeight: 900, color: "#1F2937", marginBottom: 4 }}>🧭 新手攻略</div>
      <div style={{ fontSize: 16, color: "#9CA3AF", marginBottom: 22 }}>零基礎也能看懂的德語檢定完整指南</div>

      <div style={{ display: "flex", gap: 28, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ width: 230, minWidth: 200, display: "flex", flexDirection: "column", gap: 8, position: "sticky", top: 80 }}>
          {MENU.map(m => {
            const active = sec === m.id;
            return (
              <button key={m.id} onClick={() => setSec(m.id)} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 14,
                background: active ? "linear-gradient(135deg, #EDE9FE, #FCE7F3)" : "#fff",
                border: active ? "2px solid #C4B5FD" : "1.5px solid #F0F0F0", cursor: "pointer", textAlign: "left",
                color: active ? "#7C3AED" : "#4B5563", fontWeight: active ? 800 : 600, fontSize: 16,
              }}>
                <span style={{ fontSize: 22 }}>{m.emoji}</span>{m.label}
              </button>
            );
          })}
        </div>

        <div style={{ flex: 1, minWidth: 320, maxWidth: 760 }}>
          {sec === "use" && (
            <div>
              <h3 style={h3}>🎯 各級別證書能用來做什麼？</h3>
              <p style={{ ...p, marginBottom: 14 }}>德語證書是打開德語區大門的鑰匙。<b>不同級別，用途不同</b>，看清楚你需要哪一級：</p>
              <div style={{ overflowX: "auto" }}>
                <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 580 }}>
                  <thead><tr><th style={th}>級別</th><th style={th}>這張證書能用來做什麼</th></tr></thead>
                  <tbody>
                    <tr><td style={tdH}>A1</td><td style={td}>申請<b>配偶／家庭團聚簽證</b>（赴德與配偶團聚的基本語言證明）；證明你有基礎德語</td></tr>
                    <tr><td style={tdH}>A2</td><td style={td}>移民德國的<b>基礎語言門檻</b>；日常生活溝通；部分職業培訓的前置要求</td></tr>
                    <tr><td style={tdH}>B1</td><td style={td}><b>移民、入籍</b>常見門檻；申請<b>職業培訓 Ausbildung</b>；很多工作的最低語言要求；面試的敲門磚</td></tr>
                    <tr><td style={tdH}>B2</td><td style={td}>多數<b>Ausbildung、護理／技術工作</b>要求；部分大學預科；職場溝通</td></tr>
                    <tr><td style={tdH}>C1</td><td style={td}><b>德國大學入學</b>常見要求；專業／管理職工作</td></tr>
                    <tr><td style={tdH}>C2</td><td style={td}>最高級別，<b>德國、奧地利、瑞士大學</b>都認可，可<b>免 TestDaF／DSH</b></td></tr>
                  </tbody>
                </table>
              </div>
              <div style={{ background: "#F0FDF4", border: "1.5px solid #86EFAC", borderRadius: 14, padding: 18, margin: "18px 0" }}>
                <div style={{ fontWeight: 800, color: "#15803D", fontSize: 18, marginBottom: 6 }}>✨ 兩大優勢</div>
                <div style={{ fontSize: 16, color: "#166534", lineHeight: 1.9 }}>
                  ① <b>終身有效</b>：不像托福雅思只有 2 年效期，歌德證書<b>永久有效</b>，考一次受用終身。<br />
                  ② <b>德奧瑞通用</b>：不只德國，去<b>奧地利、瑞士</b>等德語區留學、工作、生活都認可。
                </div>
              </div>
              <p style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.6 }}>※ 各機構、簽證的確切語言要求請以官方規定為準，可能因類別與年份調整。</p>
            </div>
          )}

          {sec === "compare" && (
            <div>
              <h3 style={h3}>🆚 主流德語考試對比</h3>
              <p style={{ ...p, marginBottom: 14 }}>這些考試都受<b>德國教育部門認可</b>，但用途、地區、評分方式不同：</p>
              <div style={{ overflowX: "auto" }}>
                <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 600 }}>
                  <thead><tr>
                    <th style={th}>考試</th><th style={th}>級別</th><th style={th}>主要用途</th><th style={th}>口說評分</th><th style={th}>特點</th>
                  </tr></thead>
                  <tbody>
                    <tr><td style={tdH}>Goethe 歌德</td><td style={td}>A1–C2</td><td style={td}>留學、移民、工作、簽證</td><td style={td}>真人考官</td><td style={td}>全球認可度最高，終身有效；德奧瑞通用</td></tr>
                    <tr><td style={tdH}>TestDaF</td><td style={td}>B2–C1</td><td style={td}>德國大學入學</td><td style={td}>真人考官</td><td style={td}>專為留學設計，學術德語為主</td></tr>
                    <tr><td style={tdH}>telc</td><td style={td}>A1–C2</td><td style={td}>工作、移民、部分留學</td><td style={td}>真人考官</td><td style={td}>歐洲常見；<b>亞洲部分地區較難找到考點</b></td></tr>
                    <tr><td style={tdH}>DSH</td><td style={td}>B2–C2</td><td style={td}>德國大學入學</td><td style={td}>真人考官</td><td style={td}>德國各大學自辦，通常需在德國當地考</td></tr>
                  </tbody>
                </table>
              </div>
              <div style={{ background: "#FEF3C7", border: "1.5px solid #F59E0B", borderRadius: 14, padding: 16, marginTop: 16 }}>
                <div style={{ fontSize: 16, color: "#92400E", lineHeight: 1.8 }}>
                  📍 <b>亞洲地區：</b>telc 在亞洲部分地區較難找到考點，<b>歌德（Goethe）是亞洲最主流、最方便報考的選擇</b>。目標德國大學也可考 TestDaF；DSH 通常要到德國當地考。
                </div>
              </div>
            </div>
          )}

          {sec === "structure" && (
            <div>
              <h3 style={h3}>📋 歌德題型結構（A1 與 A2 分開看）</h3>
              <p style={{ ...p, marginBottom: 10 }}>A1 和 A2 的考試結構<b>不一樣</b>。下面分開列出每個部分有幾個 Teil、每個 Teil 考什麼。</p>

              <div style={{ background: "#EDE9FE", borderRadius: 12, padding: "8px 14px", fontWeight: 900, color: "#7C3AED", fontSize: 18, marginTop: 18 }}>🟢 歌德 A1（Start Deutsch 1）</div>
              <h4 style={h4}>🎧 聽力 Hören（約 20 分鐘・3 個 Teil）</h4>
              <ul style={{ ...li, paddingLeft: 22 }}>
                <li><b>Teil 1</b>：聽簡短日常對話／廣播，選正確答案（問時間、地點、數字）</li>
                <li><b>Teil 2</b>：聽公共場所的廣播通知，判斷對錯</li>
                <li><b>Teil 3</b>：聽電話留言／簡短訊息，選答案</li>
              </ul>
              <h4 style={h4}>📖 閱讀 Lesen（3 個 Teil）</h4>
              <ul style={{ ...li, paddingLeft: 22 }}>
                <li><b>Teil 1</b>：讀短郵件／便條，判斷對錯</li>
                <li><b>Teil 2</b>：讀廣告／告示，配對需求</li>
                <li><b>Teil 3</b>：讀告示牌／標語，理解資訊</li>
              </ul>
              <h4 style={h4}>✍️ 寫作 Schreiben（2 個 Teil）</h4>
              <ul style={{ ...li, paddingLeft: 22 }}>
                <li><b>Teil 1</b>：填寫簡單表格資料</li>
                <li><b>Teil 2</b>：寫一則簡短訊息（如寫便條給朋友）</li>
              </ul>
              <h4 style={h4}>🗣️ 口說 Sprechen（3 個 Teil・真人考官）</h4>
              <ul style={{ ...li, paddingLeft: 22 }}>
                <li><b>Teil 1</b>：自我介紹（姓名、年齡、國家、住哪、語言、職業、興趣）</li>
                <li><b>Teil 2</b>：就某主題（如「購物」「交通」）用關鍵詞互相提問、回答</li>
                <li><b>Teil 3</b>：看圖提出請求並回應（如借東西、請對方做某事）</li>
              </ul>

              <div style={{ background: "#FCE7F3", borderRadius: 12, padding: "8px 14px", fontWeight: 900, color: "#BE185D", fontSize: 18, marginTop: 24 }}>🔵 歌德 A2（比 A1 更難、Teil 更多）</div>
              <h4 style={h4}>🎧 聽力 Hören（約 30 分鐘・4 個 Teil）</h4>
              <ul style={{ ...li, paddingLeft: 22 }}>
                <li><b>Teil 1</b>：聽 5 段簡短文本，每段聽兩次，選 a/b/c</li>
                <li><b>Teil 2</b>：聽一段對話，配對圖片</li>
                <li><b>Teil 3</b>：聽 5 段簡短對話，選正確答案</li>
                <li><b>Teil 4</b>：聽一段訪談，判斷 Ja／Nein（是／否）</li>
              </ul>
              <h4 style={h4}>📖 閱讀 Lesen（約 30 分鐘・4 個 Teil）</h4>
              <ul style={{ ...li, paddingLeft: 22 }}>
                <li><b>Teil 1</b>：讀報紙短文，選 a/b/c</li>
                <li><b>Teil 2</b>：讀資訊／告示（如商場樓層），找對應資訊</li>
                <li><b>Teil 3</b>：讀一封私人郵件，理解細節</li>
                <li><b>Teil 4</b>：6 個人找東西，配對 6 則廣告（注意有干擾、有一題無解）</li>
              </ul>
              <h4 style={h4}>✍️ 寫作 Schreiben（約 30 分鐘・2 個 Teil）</h4>
              <ul style={{ ...li, paddingLeft: 22 }}>
                <li><b>Teil 1</b>：寫<b>私人訊息</b>（聯絡感情，如寫給朋友）</li>
                <li><b>Teil 2</b>：寫<b>半正式訊息</b>（處理事情，如向某機構說明、請求）。<b>可在試卷打草稿</b></li>
              </ul>
              <h4 style={h4}>🗣️ 口說 Sprechen（約 15 分鐘・3 個 Teil・見下一頁詳解）</h4>
              <p style={{ ...p }}>A2 口說考什麼、怎麼評分、怎麼舉例，請看左側「<b>口說評分</b>」。</p>
              <p style={{ fontSize: 13, color: "#9CA3AF", marginTop: 12, lineHeight: 1.6 }}>※ Teil 數量、時間、題數以歌德官方公告為準，此處供整體理解。</p>
            </div>
          )}

          {sec === "speak" && (
            <div>
              <h3 style={h3}>🗣️ 歌德口說考什麼？怎麼評分？</h3>
              <p style={{ ...p, marginBottom: 8 }}>以<b>歌德 A2 口說</b>為例（約 15 分鐘，兩人一組，真人考官）。共 3 個 Teil：</p>

              <h4 style={h4}>Teil 1：就個人提問與回答</h4>
              <p style={p}>拿到寫著關鍵詞的卡片（如 <b>Beruf?（職業）、Wohnort?（住哪）、Hobby?（興趣）、Geburtstag?（生日）</b>），你和搭檔<b>互相提問、回答</b>。</p>
              <div style={{ background: "#F5F3FF", borderRadius: 10, padding: 12, fontSize: 15, color: "#5B21B6", lineHeight: 1.8 }}>
                💬 <b>舉例：</b>卡片是「Hobby?」→ 你問：<b>„Was sind deine Hobbys?"</b>　對方答：<b>„Ich spiele gern Fußball und höre Musik."</b>
              </div>

              <h4 style={h4}>Teil 2：談自己和生活</h4>
              <p style={p}>根據一張引導卡片（如主題「Wochenende 週末」「Geld 用錢」），<b>講一段關於自己生活的話</b>，考官可能追問。</p>
              <div style={{ background: "#F5F3FF", borderRadius: 10, padding: 12, fontSize: 15, color: "#5B21B6", lineHeight: 1.8 }}>
                💬 <b>舉例：</b>主題「Mein Wochenende」→ <b>„Am Wochenende stehe ich spät auf. Samstags gehe ich einkaufen und treffe Freunde. Sonntags koche ich gern."</b>
              </div>

              <h4 style={h4}>Teil 3：共同規劃一件事</h4>
              <p style={p}>和搭檔<b>一起商量、安排</b>一個日常情境（如一起買生日禮物、約騎車），要提出建議、回應對方、達成共識。</p>
              <div style={{ background: "#F5F3FF", borderRadius: 10, padding: 12, fontSize: 15, color: "#5B21B6", lineHeight: 1.8 }}>
                💬 <b>舉例：</b>一起約時間 → <b>„Wann hast du Zeit? Ich kann am Mittwoch."</b>　對方：<b>„Mittwoch passt mir nicht, geht es am Freitag?"</b>
              </div>

              <h4 style={h4}>📐 評分標準（歌德官方兩大塊）</h4>
              <div style={{ overflowX: "auto" }}>
                <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 560 }}>
                  <thead><tr><th style={th}>維度</th><th style={th}>考官看什麼</th></tr></thead>
                  <tbody>
                    <tr><td style={tdH}>① 完成任務</td><td style={td}>有沒有把題目要求說清楚；用詞、篇幅是否恰當（話太少、跑題會扣分）</td></tr>
                    <tr><td style={tdH}>② 形式正確<br />＋發音</td><td style={td}>語法、用詞錯誤是否多到<b>影響理解</b>；發音是否清楚、聽得懂</td></tr>
                  </tbody>
                </table>
              </div>

              <h4 style={h4}>📊 語法的「寬度與深度」——舉例給你看</h4>
              <div style={{ overflowX: "auto" }}>
                <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 600 }}>
                  <thead><tr><th style={th}>級別</th><th style={th}>該用的句型</th><th style={th}>例句</th></tr></thead>
                  <tbody>
                    <tr><td style={tdH}>A1</td><td style={td}>簡單句</td><td style={td}>„Ich spiele Fußball."（我踢足球）</td></tr>
                    <tr><td style={tdH}>A2</td><td style={td}>簡單句 + 並列句<br/>(und/aber/oder) + 開始用 weil</td><td style={td}>„Ich spiele Fußball und ich höre gern Musik."<br/>„Ich bleibe zu Hause, weil es regnet."（因為下雨）</td></tr>
                    <tr><td style={tdH}>B1</td><td style={td}>穩定使用複合句<br/>(weil/dass/wenn)</td><td style={td}>„Ich glaube, dass Deutsch wichtig ist."<br/>„Wenn ich Zeit habe, lerne ich Deutsch."</td></tr>
                    <tr><td style={tdH}>B2+</td><td style={td}>多樣複合句、被動、<br/>關係從句</td><td style={td}>„Das ist der Kurs, den ich empfehlen würde."</td></tr>
                  </tbody>
                </table>
              </div>
              <div style={{ background: "#FEF2F2", border: "2px solid #FCA5A5", borderRadius: 14, padding: 16, marginTop: 18 }}>
                <div style={{ fontWeight: 900, color: "#DC2626", fontSize: 17, marginBottom: 6 }}>⚠️ 重要警告：不要背模板！</div>
                <div style={{ fontSize: 16, color: "#991B1B", lineHeight: 1.9 }}>
                  考官每天聽幾十個考生，<b>一聽就知道你在背模板</b>。一旦被聽出是模板，會直接給<b>很低的分數</b>。要練的是<b>真正會用句型自由表達</b>，而不是死背幾段話。
                </div>
              </div>
              <div style={{ background: "linear-gradient(135deg, #EDE9FE, #FCE7F3)", borderRadius: 14, padding: 16, marginTop: 14 }}>
                <div style={{ fontSize: 16, color: "#5B21B6", lineHeight: 1.9 }}>
                  🤖 <b>本網站怎麼幫你：</b>你可以和網站的 <b>AI 對話</b>反覆練口說，模擬真實問答；<b>未來將支援自動測評</b>，指出你說的句子裡的<b>語法、發音問題</b>，讓你練到能自由表達、不靠模板。
                </div>
              </div>

              {/* 寫作評分標準 */}
              <h3 style={{ ...h3, marginTop: 32 }}>✍️ 歌德寫作評分標準</h3>
              <p style={{ ...p, marginBottom: 8 }}>以<b>歌德 A2 寫作</b>為例（約 30 分鐘，2 個 Teil：寫私人訊息 + 半正式訊息）。考官按這幾個維度評分：</p>
              <div style={{ overflowX: "auto" }}>
                <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 560 }}>
                  <thead><tr><th style={th}>維度</th><th style={th}>考官看什麼</th></tr></thead>
                  <tbody>
                    <tr><td style={tdH}>① 完成任務<br/>Erfüllung</td><td style={td}>有沒有把題目<b>要求的每個要點</b>都寫到；<b>字數是否達標</b>（A2 約需 ~50 詞，太少直接扣很重）</td></tr>
                    <tr><td style={tdH}>② 語言功能<br/>Sprachfunktion</td><td style={td}>該<b>邀請、道歉、提建議、請求</b>等有沒有表達到位（如「我想邀請你…」要寫清楚）</td></tr>
                    <tr><td style={tdH}>③ 語域<br/>Register</td><td style={td}>對象不同，<b>正式／非正式要用對</b>：寫朋友用 du，寫機構／陌生人用 Sie</td></tr>
                    <tr><td style={tdH}>④ 連貫性<br/>Kohärenz</td><td style={td}>句子之間有沒有<b>連接詞銜接</b>（und, aber, weil, deshalb…），讀起來通順不跳</td></tr>
                    <tr><td style={tdH}>⑤ 詞彙<br/>Wortschatz</td><td style={td}>用詞是否準確、夠用，<b>有沒有重複用同一個詞</b></td></tr>
                    <tr><td style={tdH}>⑥ 語法結構<br/>Strukturen</td><td style={td}>句型、語法錯誤是否<b>多到影響理解</b>（冠詞、詞尾、動詞位置等）</td></tr>
                  </tbody>
                </table>
              </div>
              <div style={{ background: "#FEF3C7", border: "1.5px solid #F59E0B", borderRadius: 14, padding: 16, marginTop: 16 }}>
                <div style={{ fontSize: 16, color: "#92400E", lineHeight: 1.9 }}>
                  📝 <b>寫作三大常見失分點：</b><br/>
                  ① <b>漏要點</b>：題目給了 3-4 個必寫點，漏一個就扣分 → 動筆前先圈出所有要點。<br/>
                  ② <b>du / Sie 用錯</b>：寫朋友卻用 Sie，或寫機構卻用 du → 語域錯。<br/>
                  ③ <b>字數不夠</b>：寫太少直接重扣 → 每個要點都展開 1-2 句。
                </div>
              </div>
              <div style={{ background: "linear-gradient(135deg, #EDE9FE, #FCE7F3)", borderRadius: 14, padding: 16, marginTop: 14 }}>
                <div style={{ fontSize: 16, color: "#5B21B6", lineHeight: 1.9 }}>
                  💜 <b>本網站怎麼幫你：</b>寫作這種需要人評的部分，由 <b>Sam 老師親自批改</b>，逐句指出漏要點、語域、語法問題，比自己埋頭寫進步快得多。
                </div>
              </div>
            </div>
          )}

          {sec === "report" && (
            <div>
              <h3 style={h3}>📊 歌德成績單怎麼看？</h3>
              <p style={{ ...p, marginBottom: 14 }}>成績單列出<b>四項技能各自的分數</b>與總成績。看懂它，才知道哪一項要加強——也才知道<b>該用本網站的哪個功能去補</b>。</p>
              <div style={{ border: "2px solid #E9D5FF", borderRadius: 16, overflow: "hidden", maxWidth: 540 }}>
                <div style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)", color: "#fff", padding: "16px 20px" }}>
                  <div style={{ fontWeight: 900, fontSize: 18 }}>Goethe-Zertifikat A2</div>
                  <div style={{ fontSize: 13, opacity: 0.9 }}>成績單範例（示意）</div>
                </div>
                <div style={{ padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                    <div>
                      <div style={{ fontSize: 14, color: "#6B7280" }}>考生 / 範例</div>
                      <div style={{ fontWeight: 800, color: "#1F2937", fontSize: 18 }}>學員範例</div>
                    </div>
                    <div style={{ textAlign: "center", background: "#F5F3FF", borderRadius: 14, padding: "10px 20px", border: "2px solid #C4B5FD" }}>
                      <div style={{ fontSize: 12, color: "#7C3AED", fontWeight: 700 }}>總成績</div>
                      <div style={{ fontSize: 32, fontWeight: 900, color: "#7C3AED" }}>82</div>
                      <div style={{ fontSize: 11, color: "#9CA3AF" }}>滿分 100</div>
                    </div>
                  </div>
                  {[["🎧 聽力 Hören", 22, 25, "#34D399", "在本網站刷題"], ["📖 閱讀 Lesen", 20, 25, "#FBBF24", "在本網站刷題"], ["✍️ 寫作 Schreiben", 18, 25, "#F472B6", "真人老師＋AI"], ["🗣️ 口說 Sprechen", 22, 25, "#C084FC", "真人老師＋AI"]].map(([label, val, max, color, how], i) => (
                    <div key={i} style={{ marginBottom: 14 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, color: "#374151", fontWeight: 600, marginBottom: 4 }}>
                        <span>{label}</span><span>{val}/{max} ・ <span style={{ color: "#7C3AED", fontWeight: 700 }}>{how}</span></span>
                      </div>
                      <div style={{ background: "#F3F4F6", borderRadius: 99, height: 10 }}>
                        <div style={{ width: `${val / max * 100}%`, background: color, height: "100%", borderRadius: 99 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "#EEF2FF", border: "1.5px solid #818CF8", borderRadius: 14, padding: 16, marginTop: 16 }}>
                <div style={{ fontSize: 16, color: "#3730A3", lineHeight: 1.9 }}>
                  💡 <b>怎麼補弱項（搭配本網站）：</b><br />
                  🎧 聽力、📖 閱讀 → <b>在本網站大量刷題</b>（含陷阱題、長篇聽力、原文對照）<br />
                  🗣️ 口說、✍️ 寫作 → <b>真人老師一對一 ＋ AI 練習</b>，達到 <b>1+1&gt;2</b> 的效果
                </div>
              </div>

              <h4 style={h4}>📌 額外提供（持續更新）</h4>
              <ul style={{ ...li, paddingLeft: 22 }}>
                <li><b>常考話題總結</b>：歸納各級別高頻主題，練到考場不慌</li>
                <li><b>高分句總結</b>：整理地道、加分的表達句型</li>
              </ul>
              <div style={{ background: "#FEF2F2", border: "2px solid #FCA5A5", borderRadius: 14, padding: 16, marginTop: 12 }}>
                <div style={{ fontSize: 16, color: "#991B1B", lineHeight: 1.9 }}>
                  ⚠️ <b>但切記：高分句是用來「學會表達」，不是「背模板」。</b>考官能聽出模板，會直接給很低分。要把句型內化成自己的話。
                </div>
              </div>
              <p style={{ fontSize: 13, color: "#9CA3AF", marginTop: 10 }}>※ 示意成績單，配分以歌德官方為準；A1/A2 通常需達滿分 60% 且四部分都參加才通過。</p>
            </div>
          )}

          {sec === "howto" && (
            <div>
              <h3 style={h3}>🧭 如何使用本網站？</h3>
              <p style={{ ...p, marginBottom: 18 }}>很多人備考的痛點是：<b>不知道自己弱在哪、不知道該練什麼、找資料花太多時間</b>。本網站就是來解決這三件事的——<b>先診斷，再對症下藥。</b></p>

              {/* 步驟 1 自測 */}
              <div style={{ background: "linear-gradient(135deg, #34D399, #10B981)", borderRadius: 16, padding: 22, color: "#fff", marginBottom: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 800, opacity: 0.9, marginBottom: 4 }}>STEP 1</div>
                <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 8 }}>🎯 先自測，找出你的弱點</div>
                <div style={{ fontSize: 16, lineHeight: 1.9 }}>
                  花幾分鐘做<b>能力自測</b>，從<b>聽、說、讀、寫四個部分</b>幫你<b>精準定位弱點</b>，並估出你目前大概的級別。不用再憑感覺瞎練——<b>先知道自己缺什麼，才知道該補什麼。</b>
                </div>
              </div>

              {/* 步驟 2 針對性刷題 */}
              <div style={{ background: "linear-gradient(135deg, #EC4899, #DB2777)", borderRadius: 16, padding: 22, color: "#fff", marginBottom: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 800, opacity: 0.9, marginBottom: 4 }}>STEP 2</div>
                <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 8 }}>📚 針對弱點，精準刷題</div>
                <div style={{ fontSize: 16, lineHeight: 1.9 }}>
                  知道弱點後，到「<b>檢定課程</b>」針對性刷題：<b>聽說讀寫四大題型</b>仿真練習，含歌德陷阱題、長篇聽力、原文對照、AI 對話模擬真實場景。<b>哪裡弱練哪裡，效率最高。</b>
                </div>
              </div>

              {/* 常考話題總結 */}
              <div style={{ background: "linear-gradient(135deg, #F59E0B, #FBBF24)", borderRadius: 16, padding: 22, color: "#fff", marginBottom: 16 }}>
                <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 8 }}>📌 常考話題總結，幫你省時間</div>
                <div style={{ fontSize: 16, lineHeight: 1.9 }}>
                  我們<b>歸納整理了各級別的常考話題</b>（家庭、購物、旅行、工作、健康…）和<b>高分句型</b>，涵蓋口說、寫作、閱讀、聽力。<b>你不用自己花幾十小時去翻資料找重點——我們幫你總結好了，直接練。</b>
                </div>
              </div>

              {/* 還在學教材 */}
              <div style={{ background: "linear-gradient(135deg, #818CF8, #6366F1)", borderRadius: 16, padding: 22, color: "#fff", marginBottom: 16 }}>
                <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>📖 還是零基礎、在學教材？</div>
                <div style={{ fontSize: 16, lineHeight: 1.9 }}>先到「<b>系統課程</b>」：<b>必背單字</b>（A1+A2 高頻字、生詞本）和<b>必考文法</b>（19 課彩色記憶卡、考試應用、翻譯練習），把地基打穩，再去刷題。</div>
              </div>

              {/* 1+1>2 */}
              <div style={{ background: "linear-gradient(135deg, #EDE9FE, #FCE7F3)", borderRadius: 16, padding: 22 }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#7C3AED", marginBottom: 8 }}>💜 1 + 1 &gt; 2</div>
                <div style={{ fontSize: 16, color: "#5B21B6", lineHeight: 1.9 }}>聽力、閱讀你<b>在網站自主刷題</b>；口說、寫作這種需要人評的部分，由 <b>Sam 老師親自批改 + AI 練習</b>。<b>網站精準練習 + 老師專業指導 = 效果加倍。</b></div>
              </div>

              {/* 學習路徑流程圖 */}
              <h3 style={{ ...h3, marginTop: 32 }}>🗺️ 你的學習路徑（一步步跟著走）</h3>
              {[
                { n: "1", t: "入學測試", d: "聽說讀寫四項自測，定位你的起點與弱項", c: "#34D399" },
                { n: "2", t: "練習陪伴", d: "每日作業批改 ＋ 針對弱項刷題，天天有進度", c: "#60A5FA" },
                { n: "3", t: "定期檢測 ＋ 調整", d: "階段模考，看進步、找新弱點，隨時調整方向", c: "#A78BFA" },
                { n: "4", t: "結合課堂・有效輸出", d: "把課上學的，用口說寫作真正說出來、寫出來", c: "#EC4899" },
                { n: "🎯", t: "通過檢定", d: "穩紮穩打，一次考過！", c: "#F59E0B" },
              ].map((s, i, arr) => (
                <div key={i}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, background: "#fff", border: `2px solid ${s.c}`, borderRadius: 16, padding: "16px 18px" }}>
                    <div style={{ minWidth: 44, width: 44, height: 44, borderRadius: "50%", background: s.c, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900 }}>{s.n}</div>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 900, color: "#1F2937" }}>{s.t}</div>
                      <div style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.6, marginTop: 2 }}>{s.d}</div>
                    </div>
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ textAlign: "center", color: "#C4B5FD", fontSize: 26, lineHeight: 1, margin: "4px 0" }}>↓</div>
                  )}
                </div>
              ))}

              <p style={{ fontSize: 14, color: "#9CA3AF", marginTop: 16, lineHeight: 1.7 }}>📌 報考時間、費用、考點等資訊，請直接登入<b>歌德官方網站（goethe.de）</b>查詢最新公告。</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

const TABS = [
  { id: "home", label: "首頁", emoji: "🏠" },
  { id: "vocab", label: "單字", emoji: "📒" },
  { id: "grammar", label: "文法", emoji: "📐" },
  { id: "listen", label: "聽力", emoji: "🎧" },
  { id: "read", label: "閱讀", emoji: "📖" },
  { id: "write", label: "寫作", emoji: "✍️" },
  { id: "speak", label: "口說", emoji: "🎤" },
];

// 側邊欄分組結構（電腦版）
const NAV_GROUPS = [
  { type: "item", id: "home", label: "首頁", emoji: "🏠" },
  { type: "group", label: "系統學習", emoji: "📚", children: [
    { id: "vocab", label: "單字", emoji: "📒" },
    { id: "grammar", label: "文法", emoji: "📐" },
  ]},
  { type: "group", label: "檢定必備", emoji: "🎯", children: [
    { id: "listen", label: "聽力", emoji: "🎧" },
    { id: "read", label: "閱讀", emoji: "📖" },
    { id: "write", label: "寫作", emoji: "✍️" },
    { id: "speak", label: "口說", emoji: "🎤" },
  ]},
  { type: "item", id: "review", label: "複習・錯題本", emoji: "🔁" },
  { type: "item", id: "stats", label: "學習統計", emoji: "📊" },
  { type: "item", id: "settings", label: "設定", emoji: "⚙️" },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("home");
  const [apiKey, setApiKey] = useState("AIzaSyAxe2GRARpByqXtk-r2HdIzXTz7Ng2JSWk");
  const [aiKey, setAiKey] = useState("");
  const [users, setUsers] = useState(DEMO_USERS);
  const [myWords, setMyWords] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [loginNudge, setLoginNudge] = useState(false);
  const [submissions, setSubmissions] = useState([
    { promptId: "w1", studentId: "s002", studentName: "陳雅婷", title: "自我介紹", text: "Ich heiße Chen Yating. Ich bin 19 Jahre alt. Ich komme aus Taichung, Taiwan. Ich bin Studentin und ich lerne Deutsch.", grade: null, feedback: "" }
  ]);

  const updateNickname = (newName) => {
    setUser(prev => ({ ...prev, name: newName }));
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, name: newName } : u));
  };
  const addWord = (w) => setMyWords(prev => [...prev, w]);
  const deleteWord = (idx) => setMyWords(prev => prev.filter((_, i) => i !== idx));
  const addSubmission = (sub) => setSubmissions(prev => [...prev, sub]);
  const gradeSubmission = (sub, grade, feedback) => {
    setSubmissions(prev => prev.map(s =>
      s.promptId === sub.promptId && s.studentId === sub.studentId ? { ...s, grade, feedback } : s
    ));
  };

  // 受保護的內容頁籤（未登入點擊會被攔截）
  const PROTECTED = ["vocab", "grammar", "listen", "read", "write", "speak", "exam", "system", "review", "stats", "guide", "threemin"];

  // 切換頁籤：未登入且點受保護內容 → 提示登入
  const go = (target) => {
    if (!user && PROTECTED.includes(target)) {
      setLoginNudge(true);
      setShowLogin(true);
      return;
    }
    setLoginNudge(false);
    setTab(target);
  };

  // 老師批改台
  if (user && user.role === "teacher") {
    return (
      <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: C.soft, minHeight: "100vh" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontWeight: 900, fontSize: 20, color: C.purple }}>👩‍🏫 老師批改台</div>
            <button onClick={() => setUser(null)} style={{ background: "none", border: "none", color: "#9CA3AF", cursor: "pointer" }}>登出</button>
          </div>
          <TeacherPanel submissions={submissions} onGrade={gradeSubmission} />
        </div>
      </div>
    );
  }

  // 登入彈窗
  if (showLogin) {
    return (
      <div>
        {loginNudge && (
          <div style={{ background: "#FEE2E2", color: "#DC2626", textAlign: "center", padding: "12px", fontWeight: 800, fontSize: 15 }}>
            ⚠️ 請先完成登錄獲取免費內容哦～
          </div>
        )}
        <LoginPage
          onLogin={(u) => { setUser(u); setShowLogin(false); setLoginNudge(false); }}
          users={users}
          onRegister={(u) => setUsers(prev => [...prev, u])}
        />
        <div style={{ textAlign: "center", paddingBottom: 24 }}>
          <button onClick={() => { setShowLogin(false); setLoginNudge(false); }} style={{ background: "none", border: "none", color: "#9CA3AF", fontSize: 13, cursor: "pointer" }}>← 先逛逛首頁</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: C.soft, minHeight: "100vh" }}>
      <TopNav
        tab={tab} setTab={go} user={user}
        onLogin={() => { setLoginNudge(false); setShowLogin(true); }}
        onLogout={() => { setUser(null); setTab("home"); }}
        aiKey={aiKey} onSetAiKey={setAiKey}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 24px 60px", boxSizing: "border-box" }}>
        {tab === "home" && <HomeScreen onPick={go} user={user} myWords={myWords} onSpeakWord={(t) => speak(t)} />}
        {tab === "vocab" && <VocabModule myWords={myWords} onAddWord={addWord} onDeleteWord={deleteWord} />}
        {tab === "grammar" && <GrammarModule aiKey={aiKey} />}
        {tab === "listen" && <ListeningModule apiKey={apiKey} onSetApiKey={setApiKey} aiKey={aiKey} onSetAiKey={setAiKey} />}
        {tab === "read" && <ReadingModule aiKey={aiKey} onSetAiKey={setAiKey} />}
        {tab === "write" && <WritingModule user={user} submissions={submissions} onSubmit={addSubmission} aiKey={aiKey} onSetAiKey={setAiKey} />}
        {tab === "speak" && <SpeakingModule apiKey={apiKey} aiKey={aiKey} onSetAiKey={setAiKey} />}
        {tab === "exam" && <ExamHub onPick={go} />}
        {tab === "system" && <SystemHub onPick={go} />}
        {tab === "review" && <SimpleScreen emoji="🔁" title="複習・錯題本" desc="這裡會收集你做錯的單字和題目，下次優先複習。功能開發中，敬請期待！" />}
        {tab === "stats" && <SimpleScreen emoji="📊" title="學習統計" desc="這裡會顯示你的學習進度、連續天數、累積單字量。資料庫接通後即可記錄，敬請期待！" />}
        {tab === "settings" && <SettingsScreen apiKey={apiKey} onSetApiKey={setApiKey} aiKey={aiKey} onSetAiKey={setAiKey} />}
        {tab === "guide" && <GuideScreen />}
        {tab === "threemin" && <SimpleScreen emoji="⏰" title="零基礎 3 分鐘" desc="每日 3 分鐘，輕鬆學一句德語、一個發音技巧。內容整理中，敬請期待！" />}
        {tab === "community" && <SimpleScreen emoji="💬" title="社區" desc="未來這裡可以和其他同學交流、分享學習心得、提問。敬請期待！" />}
        {tab === "ausbildung" && <SimpleScreen emoji="🎓" title="Ausbildung 職業培訓" desc="德國職業培訓（Ausbildung）相關德語與資訊。敬請期待！" />}
        {tab === "business" && <SimpleScreen emoji="💼" title="商業德語" desc="商務場景、職場溝通、商業書信德語。敬請期待！" />}
        {tab === "appinfo" && <SimpleScreen emoji="📱" title="App" desc="未來推出手機 App，隨時隨地學德語。敬請期待！" />}
      </div>

      {/* 課程諮詢浮動按鈕（之後接 Line） */}
      <button onClick={() => alert("課程諮詢即將開放，敬請期待！未來這裡會連到 Sam 老師的 Line。")}
        style={{ position: "fixed", bottom: 24, right: 24, background: "linear-gradient(135deg, #7C3AED, #EC4899)", color: "#fff", border: "none", borderRadius: 30, padding: "12px 20px", fontWeight: 800, fontSize: 14, cursor: "pointer", boxShadow: "0 6px 20px #7C3AED66", zIndex: 30 }}>
        💬 課程諮詢
      </button>
    </div>
  );
}

// 檢定課程中心
function ExamHub({ onPick }) {
  const cards = [
    { id: "listen", zh: "聽力 Hören", desc: "歌德陷阱題・語音朗讀・原文對照", emoji: "🎧", bg: "linear-gradient(135deg, #34D399, #10B981)" },
    { id: "read", zh: "閱讀 Lesen", desc: "分級短文・干擾選項・陷阱解析", emoji: "📖", bg: "linear-gradient(135deg, #FBBF24, #F59E0B)" },
    { id: "write", zh: "寫作 Schreiben", desc: "命題作文・老師批改", emoji: "✍️", bg: "linear-gradient(135deg, #F472B6, #EC4899)" },
    { id: "speak", zh: "口說 Sprechen", desc: "錄音練習・範例答案", emoji: "🎤", bg: "linear-gradient(135deg, #C084FC, #A855F7)" },
  ];
  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 900, color: "#1F2937", marginBottom: 4 }}>🎯 檢定課程</div>
      <div style={{ fontSize: 14, color: "#9CA3AF", marginBottom: 20 }}>歌德 A1-A2 聽說讀寫，仿真題型實戰演練</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {cards.map(c => (
          <button key={c.id} onClick={() => onPick(c.id)} style={{ background: c.bg, borderRadius: 18, padding: "28px 24px", color: "#fff", textAlign: "left", cursor: "pointer", border: "none", display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ fontSize: 44 }}>{c.emoji}</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900 }}>{c.zh}</div>
              <div style={{ fontSize: 13, opacity: 0.92, marginTop: 4 }}>{c.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// 系統課程中心
function SystemHub({ onPick }) {
  const cards = [
    { id: "vocab", zh: "必背單字", desc: "A1+A2 高頻字 321 個・個人生詞本・卡片模式", emoji: "📒", bg: "linear-gradient(135deg, #818CF8, #6366F1)" },
    { id: "grammar", zh: "必考文法", desc: "19 課彩色記憶卡・考試應用・翻譯練習", emoji: "📐", bg: "linear-gradient(135deg, #A78BFA, #8B5CF6)" },
  ];
  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 900, color: "#1F2937", marginBottom: 4 }}>📚 系統課程</div>
      <div style={{ fontSize: 14, color: "#9CA3AF", marginBottom: 20 }}>單字和文法是地基，地基穩了，聽說讀寫自然輕鬆</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {cards.map(c => (
          <button key={c.id} onClick={() => onPick(c.id)} style={{ background: c.bg, borderRadius: 18, padding: "28px 24px", color: "#fff", textAlign: "left", cursor: "pointer", border: "none", display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ fontSize: 44 }}>{c.emoji}</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900 }}>{c.zh}</div>
              <div style={{ fontSize: 13, opacity: 0.92, marginTop: 4 }}>{c.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// 簡單佔位頁
function SimpleScreen({ emoji, title, desc }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <div style={{ fontSize: 48, marginBottom: 14 }}>{emoji}</div>
      <div style={{ fontWeight: 900, fontSize: 20, color: "#1F2937", marginBottom: 8 }}>{title}</div>
      <div style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 1.7, maxWidth: 400, margin: "0 auto" }}>{desc}</div>
    </div>
  );
}

// 設定頁
function SettingsScreen({ apiKey, onSetApiKey, aiKey, onSetAiKey }) {
  return (
    <div style={{ maxWidth: 560 }}>
      <Card color={C.purple}>
        <div style={{ fontWeight: 800, color: C.purple, fontSize: 15, marginBottom: 8 }}>🔊 Google 語音金鑰</div>
        <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 10, lineHeight: 1.6 }}>填入後，聽力朗讀會使用高品質德語語音（手機也準）。不填則用瀏覽器免費語音。</div>
        <button onClick={() => { const k = window.prompt("輸入 Google Cloud TTS 金鑰：", apiKey || ""); if (k !== null) onSetApiKey(k.trim()); }} style={btnStyle(C.purple)}>{apiKey ? "✅ 已設定（點此修改）" : "設定金鑰"}</button>
      </Card>
      <Card color={C.pink}>
        <div style={{ fontWeight: 800, color: C.pink, fontSize: 15, marginBottom: 8 }}>✨ AI 金鑰（Anthropic）</div>
        <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 10, lineHeight: 1.6 }}>填入後，可使用 AI 生成新題目、翻譯批改等功能。不填則用現成題庫（免費）。</div>
        <button onClick={() => { const k = window.prompt("輸入 Anthropic API 金鑰：", aiKey || ""); if (k !== null) onSetAiKey(k.trim()); }} style={btnStyle(C.pink)}>{aiKey ? "✅ 已設定（點此修改）" : "設定金鑰"}</button>
      </Card>
    </div>
  );
}
