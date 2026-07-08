# Business Card Project Context

## 專案名稱

business-card

## 專案目標

這是一個 Vite + React + Tailwind CSS 製作的電子名片專案。

目標是讓電子名片取代實體名片。使用者可以透過 QR Code 或網址分享自己的名片頁面，其他人開啟後可以查看基本資料、公司資訊、聯絡方式、社群連結與服務項目。

未來希望支援加入手機聯絡人，也就是讓使用者可以把名片資料匯入手機通訊錄。

## 目前技術

前端：

* Vite
* React
* React Router
* Tailwind CSS
* JavaScript

後端 / 資料庫：

* Supabase
* Supabase Database
* Supabase Client

版本控制：

* Git
* GitHub

## 環境變數

目前 Supabase key 名稱已經調整完成。

前端使用 `.env` 管理 Supabase 連線資訊：

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

注意：

* `.env` 不可以上傳到 GitHub
* Supabase Secret key 不可以放在前端
* 前端只使用 Publishable key

## Supabase 連線

專案中已建立 Supabase client，使用 `VITE_SUPABASE_URL` 與 `VITE_SUPABASE_PUBLISHABLE_KEY` 連線。

概念如下：

```js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

## 目前資料方向

電子名片主要包含：

1. 名片基本資料

   * 名稱
   * 職稱
   * 公司名稱
   * 個人介紹
   * 大頭照或 Logo
   * 電話
   * Email
   * 地址
   * 網站
   * 名片網址 slug

2. 社群連結

   * LinkedIn
   * GitHub
   * 官方網站
   * 其他外部連結

3. 服務項目

   * 每張名片可以有多個服務項目
   * 服務項目可能包含標題、描述、排序

## 接下來要做的事情

優先順序建議：

1. 完成公開名片頁面
2. 完成 Supabase 資料讀取
3. 完成服務項目與社群連結顯示
4. 完成手機版 RWD
5. 完成 QR Code 分享
6. 完成加入手機聯絡人的 vCard 功能
7. 後續再考慮登入與後台編輯功能

## 給 Codex 的工作方式

請先閱讀這份 `PROJECT_CONTEXT.md`，再檢查目前專案結構。

目前不要重做整個專案，也不要一次大改所有檔案。請依照「接下來要做的事情」逐步協助修改。

協助的意思是回答我接下來可以改什麼及提供程式碼，你不需要改動任何東西，任何修改都是我改你不要動。

優先幫我確認：

1. 公開名片頁面目前缺什麼
2. Supabase 資料讀取是否正確
3. 服務項目與社群連結是否能正常顯示
4. 手機版畫面是否需要調整
5. QR Code 分享功能要怎麼加
6. vCard 加入手機聯絡人功能要怎麼加
