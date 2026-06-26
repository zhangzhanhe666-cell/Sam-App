# Sam 德語小屋 — 部署教學 🚀

這是完整的網站專案，照下面步驟就能上線，讓學生用真網址測試（聽力音檔、麥克風、AI 出題全部能用）。

---

## 你需要準備
- 一台 Mac（你已經有了）
- 一個免費 GitHub 帳號（存程式碼）
- 一個免費 Vercel 帳號（部署網站）
- 大約 20 分鐘

---

## 第一步：本機先跑起來看看（選做，但建議）

1. 打開「終端機」(Terminal)。在 Mac 上按 `Cmd + 空白鍵`，輸入 Terminal，按 Enter。

2. 確認有裝 Node.js。輸入：
   ```
   node -v
   ```
   - 如果出現版本號（例如 v20.x.x）→ 很好，跳到第 3 步。
   - 如果說「command not found」→ 先去 https://nodejs.org 下載「LTS」版安裝，再回來。

3. 進入專案資料夾（把 sam-app 資料夾拖進終端機可自動帶路徑）：
   ```
   cd /你的路徑/sam-app
   ```

4. 安裝套件並啟動：
   ```
   npm install
   npm run dev
   ```

5. 終端機會顯示一個網址（通常是 http://localhost:5173）。
   用瀏覽器打開它——這就是你的 app！

   ⚠️ 注意：在 localhost 測試時，麥克風和 Google 語音可能仍受限。要 100% 正常，需完成下面的線上部署（HTTPS 網址）。

---

## 第二步：上傳到 GitHub

1. 去 https://github.com 註冊/登入。

2. 點右上角「+」→「New repository」。
   - Repository name 填：`sam-german-haus`
   - 選 Private（私人）或 Public（公開）都可以
   - 不要勾任何 README/gitignore
   - 按「Create repository」

3. 回到終端機，在 sam-app 資料夾裡依序輸入（把 `你的帳號` 換成你的 GitHub 帳號名）：
   ```
   git init
   git add .
   git commit -m "first version"
   git branch -M main
   git remote add origin https://github.com/你的帳號/sam-german-haus.git
   git push -u origin main
   ```
   （第一次 push 會要你登入 GitHub，照指示做即可。）

---

## 第三步：用 Vercel 部署（拿到網址）

1. 去 https://vercel.com，用 GitHub 帳號登入（一鍵）。

2. 點「Add New...」→「Project」。

3. 找到剛剛的 `sam-german-haus`，按「Import」。

4. Vercel 會自動偵測這是 Vite 專案，**什麼都不用改**，直接按「Deploy」。

5. 等約 1 分鐘，出現 🎉 畫面，給你一個網址，例如：
   `https://sam-german-haus.vercel.app`

6. 打開那個網址——**這就是你的正式網站！** 把它傳給學生就能用了。

---

## 部署後，這些功能就能用了 ✅

- 🎤 **麥克風**（口說錄音）→ 瀏覽器會問「允許使用麥克風」，按允許即可
- ✨ **AI 出題**（六個模組）→ 點右上角「⚙️ AI設定」，貼上 Anthropic 金鑰
- 🔊 **聽力語音**（Google TTS）→ 在聽力頁貼上你的 Google 金鑰

> 提醒：金鑰目前是「貼一次、這次有效」。之後要永久保存帳號、進度、AI 內容，需要再接資料庫（Supabase），那是下一階段。

---

## 之後要改內容怎麼辦？

改好 App.jsx 後，在終端機輸入：
```
git add .
git commit -m "更新內容"
git push
```
Vercel 會自動重新部署，網址不變，幾十秒後就更新了。超方便！

---

有任何一步卡住，把終端機的訊息或畫面截圖給我，我幫你看。加油，快上線了！🌱
