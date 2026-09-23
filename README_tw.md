<p align="right">
  🌐 <a href="./README.md"><b>EN</b></a> |
  <b>漢</b>
</p>

<div align="center">
  <h1>cf-workers-nav 個人導航頁</h1>
  <p>
    部署於 Cloudflare 上的輕量化導航頁
    <br />
    <i>⚡ 輕鬆打造屬於自己的瀏覽器起始頁</i>
  </p>
</div>

📋 輕鬆部署的個人導航頁 

> 一款部署於 Cloudflare 上的輕量化導航頁面。
> 整合書籤管理、圖標自動抓取、拖拽排序、私密鏈接保護等功能，Worker 單一文件設計，方便快速部署。

## ✨ 主要特色

*   **⚡️ Serverless 架構**：完全執行於 Cloudflare Workers 上，無需維護服務器。
*   **💾 KV 存儲空間**：數據安全存儲於 Cloudflare KV 中。
*   **🎨 簡潔 UI**：基於 Tailwind CSS（已預先編譯並內嵌於頁面，不依賴外部 CDN），響應式設計完美相容電腦與移動設備，並提供卡片視圖與 APP 視圖兩種顯示風格。
*   **🚀 輕量啟動**：頁面不執行任何外部腳本，網頁字體改為背景載入、不會擋住頁面，「Loading…」提示會在第一時間顯示。
*   **🌗 自動跟隨系統的深色模式**：電腦與手機都會自動採用設備目前的淺色/深色設置，系統切換時（例如定時日夜模式）頁面也會即時跟著切換。也可在「設置」菜單手動切換；手動選擇只有在開啟 **Remember Settings（記住設置）** 時才會跨次記住。
*   **🖱️ 拖拽排序**：支持電腦端鼠標拖拽與移動設備長按拖拽，輕鬆整理分類與卡片順序。
*   **🔒 私密保護**：支持設置「私密鏈接」，僅在管理員登錄後可見。登錄失敗有次數限制（錯誤 5 次，該 IP 鎖定 15 分鐘）。
*   **📂 數據管理**：支持在線新增/編輯/刪除鏈接，可導入 Chrome / Edge 的 HTML 書籤，並支持 JSON 格式數據導入/導出。每次保存都會自動備份舊數據（每 10 分鐘最多一份，保留最新 10 份）。
*   **🩺 一鍵檢測**（需登錄）：直接從瀏覽器檢查每個網站是否可連接及響應速度。
*   **🖼️ 清晰又省流量的圖標**：圖標會在邊緣節點縮放並重新編碼（支持時轉為 AVIF/WebP），並透過 `srcset` 提供，讓 Retina、4K、5K 屏幕拿到清晰的圖標，一般屏幕則不會多下載用不到的畫質。需要先在域名開啟 **Image Resizing**（見下方）。
*   **🔍 整合搜索**：內建多款搜索引擎（Google、Bing、DuckDuckGo）及站內快捷搜索。

## 界面預覽

### 瀏覽視圖
| 卡片視圖 | 移動設備視圖 |
|-|-|
| ![Desktop Preview](images/69bcc641f5194220aba98e128326ff9f.webp)| ![APP View](images/5a5b09901a3b4f81b104fc9f94983299.webp)|

### 編輯模式視圖
| 卡片視圖 | 移動設備視圖 |
|-|-|
| ![Edit Mode](images/439d9791b4024c2bb46faadf9e974cf4.webp)| ![APP View](images/83814f619d014d3f945eefdcf7adec2d.webp)|

## 部署方式

### 部署至 Cloudflare

<details>
<summary>點擊展開部署步驟</summary>

#### 部署步驟

1. **登錄 [Cloudflare](https://www.cloudflare.com)** 並創建 Worker：
   - 複製倉庫中 `workers.js` 的代碼，貼入 Worker 編輯器中，點擊部署。

2. **創建 KV 存儲空間**：
   - 在 Cloudflare 控制台的 **Workers & Pages > KV** 中創建名為 `CARD_ORDER` 的 KV 命名空間，用於保存數據。

3. **綁定 KV 命名空間**：
   - 在 Worker 的 **設置 > 綁定**（舊版控制台為 **設置 > 變數 > KV 命名空間綁定**）新增 KV 綁定，變數名稱填寫 `CARD_ORDER`，並綁定至上一步創建的 `CARD_ORDER` 命名空間。

4. **設置環境變數 / 參數**：
   - 到 Worker 的 **設置 > 變數和機密**，依下方表格新增各項變數。
   - `ADMIN_PASSWORD` 與 `JWT_SECRET` 請選擇類型 **機密（Secret）**，保存後內容會加密並隱藏；其他變數使用類型 **文字（Text）** 即可。
   - 設置完成後務必點擊 **部署**，變更才會生效。

5. **新增自訂域名**（選填）：
   - 若需使用自訂域名，可在 Worker 的 **設置 > 域名與路由** 中新增自訂域名，或直接使用 `*.workers.dev` 子域名。

6. **開啟 Image Resizing**（建議設置，讓圖標清晰又不佔帶寬）：
   - 在 Cloudflare 控制台開啟你域名的 **Speed（速度）** 標籤頁，開啟 **Image Resizing**。免費方案每月有 5000 次圖片轉換額度，個人導航頁完全用不到這麼多。沒開啟也不影響使用，圖標只是會維持原始（未縮放）的尺寸。

<br/>

#### 環境變數說明

> 表中標註了「必填」與「選填」；未設置選填項目時將使用默認值。

| 變數名稱 | 必填 | 說明 | 默認值 |
|---|---|---|---|
| `ADMIN_PASSWORD` | ✅ 必填 | 管理員登錄密碼，長度至少 **8 個字符**（建議使用長且獨一無二的密碼） | 無 |
| `JWT_SECRET` | ✅ 必填 | 用於簽署登錄 Token 的密鑰，必須是 **≥32 個字符** 的隨機字符串（可用密碼管理器產生） | 無 |
| `DEFAULT_USER` | ⬜ 選填 | 數據識別名稱。你的鏈接會以此名稱存放在 KV 中，之後若更改，頁面會改讀另一份（空白的）數據，舊數據仍留在 KV 的舊名稱下 | `testUser` |
| `ALLOWED_ORIGINS` | ⬜ 選填 | 允許從其他域名呼叫 API (CORS) 的來源，多個來源請用半形逗號分隔。只有需要從其他網站呼叫 API 時才需設置 | 空白（僅限同源） |
| `ICON_API` | ⬜ 選填 | 第三方圖標 API。網站網址會經 URL 編碼後直接接在此值後面，因此值必須以查詢參數結尾，例如 `https://api.xinac.net/icon/?url=` | 已內建 xinac |
| `PREFER_ICON_API` | ⬜ 選填 | `true`：優先向圖標 API 取得圖標，失敗再改由網站本身取得。`false`：完全不連接第三方 API，直接從各網站取得圖標（**較保護隱私**，見下方說明）。請填小寫的 `true` 或 `false`，其他值一律視為 `false` | `true` |

#### 🔐 隱私建議：`PREFER_ICON_API`

默認（`true`）時，Worker 會把**每個鏈接的網址傳給圖標 API**（默認為 xinac）以取得圖標，登錄後顯示的私密鏈接也包含在內。

若不想把鏈接交給第三方，請在 **設置 > 變數和機密** 新增 `PREFER_ICON_API` = `false` 並點擊 **部署**。之後圖標會直接從各網站取得（先試 `/favicon.ico`，再讀取網頁中宣告的圖標）。代價是：少數網站無法取得圖標時，會顯示默認圖標。

> 已取得的圖標最多會快取 7 天，因此需等舊圖標過期後，變更才會完全生效。

#### 舊版本升級提醒

> - 舊版本若**未設置 `JWT_SECRET`**，或設置的 `JWT_SECRET` **少於 32 個字符**，必須重新設置一個 **≥32 個字符** 的隨機字符串，否則 Worker 會拒絕執行，並返回 `Server is not configured`（HTTP 500），消息為 `JWT_SECRET is not configured or not strong enough (needs ≥ 32 characters)`。
> - 舊版本若 **`ADMIN_PASSWORD` 少於 8 個字符**，請一併更新為**至少 8 個字符**的新密碼，否則同樣會出現上述錯誤。
> - 修改變數後需點擊 **部署**，設置才會生效。
> - 舊版本會把自動檢測到的主題存進瀏覽器，導致頁面之後不再跟隨系統變化。新版會忽略這個舊值，不需要手動清除。

</details>

## 🛡️ 隱私與安全說明

* **圖標服務**：請見上方 `PREFER_ICON_API` 隱私建議。
* **瀏覽器載入的第三方資源**：頁面不執行任何第三方腳本（Tailwind CSS 已內嵌），因此登錄 Token 不會因為 CDN 被入侵而洩露。唯一的外部資源是 Google Fonts（在背景載入，無法連接時會改用系統字體）。管理員登錄 Token 存放在瀏覽器的 `localStorage`，因此在共享或公用電腦上編輯後，務必使用 **Login / Logout** 登出；在自己的個人設備上則可保持登錄。
* **登出會讓所有設備一起登出**：登出會撤銷所有現有登錄狀態（手機、電腦都會掉線）。登出請求必須帶有效的登錄 Token 才會生效，外人無法強制讓你被登出。
* **私密鏈接**由服務器端過濾：未登錄的訪客根本不會收到這些數據。
* **登錄保護**：密碼錯誤 5 次會鎖定該來源 IP 15 分鐘。登錄 Token 有效期 2 小時，並透過 HttpOnly Cookie 自動續期（最長 30 天）。

<details>
<summary>開發者說明：更新內嵌樣式</summary>

頁面的 Tailwind CSS 已預先編譯，存放在 HTML 內的 `<style id="tw-compiled">` 區塊。如果你在頁面中新增或修改了 Tailwind 樣式類別，必須重新產生這個區塊，否則新的類別不會有任何樣式。

1. 將頁面的 HTML 存成名為 `page.html` 的文件。
2. 使用倉庫中的 `tailwind.config.js`（Tailwind CSS v3.4、`darkMode: 'class'`，內含主題的顏色、字體與陰影設置），以及內容為 `@tailwind base; @tailwind components; @tailwind utilities;` 的 `input.css`。
3. 執行 `npx tailwindcss@3.4.17 -c tailwind.config.js -i input.css -o out.css --minify`。
4. 用 `out.css` 的內容取代 `<style id="tw-compiled">` 裡的內容。因為 HTML 位於 Worker 的 JavaScript 模板字符串中，CSS 裡的每個反斜線都必須加倍（`\` → `\\`）。

</details>

## 📝 更新紀錄

**2026-09-23**
* 圖標：`/api/icon` 新增 `w` 尺寸參數，透過 Cloudflare 的 Image Resizing 在邊緣節點縮放並重新編碼圖標（瀏覽器支持時轉為 AVIF/WebP），不同尺寸與格式各自快取。頁面改用 `srcset` 依 1x/2x/3x 請求圖標，讓 Retina/4K/5K 屏幕拿到清晰畫面，一般屏幕不會多下載用不到的畫質。鏈接自訂的圖標網址現在也會經過代理（先前會完全繞過代理，直接載入原始文件，且沒有快取）。

**2026-09-20**
* 性能：Tailwind CSS 改為預先編譯並內嵌於頁面，不再從 `cdn.tailwindcss.com` 載入；Google Fonts 不再阻擋頁面啟動；啟動時不再重複驗證登錄；「Loading…」提示從第一次繪製就顯示；閒置的對話框遮罩改為完全隱藏（`display: none`），不再隱形地蓋在頁面上。

**2026-09-19**
* 深色模式：頁面現在能真正跟隨系統主題，包含即時切換。手動選擇只有在開啟 **Remember Settings** 時才會保存，且開啟該選項時會保存目前實際使用的主題。新增 `color-scheme` / `theme-color`，讓原生控制項與手機瀏覽器網址列配合主題顏色。
* 安全性：`/api/logout` 現在必須帶有效的登錄 Token。
* 文件：新增 `PREFER_ICON_API` 隱私建議；修正搜索引擎清單（實際為 DuckDuckGo，而非百度）；修正 `ALLOWED_ORIGINS` 默認值（僅限同源，而非不限制）；補充 `JWT_SECRET`、`ICON_API`、`DEFAULT_USER` 的說明。

## 🙏 致謝

特別感謝 **[Cloudflare](https://www.cloudflare.com/)**、**[Tailwind CSS](https://tailwindcss.com/)**、**[hmhm2022](https://github.com/hmhm2022)**、**[xinac](https://api.xinac.net/)**。
