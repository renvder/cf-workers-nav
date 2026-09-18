<p align="right">
  🌐 <b></b>
  <b>EN</b></a> | 
  <a href="./README_tw.md"><b>漢</b></a>
</p>

<div align="center">
  <h1>cf-workers-nav</h1>
  <p>
    A lightweight startpage hosted on Cloudflare Workers
    <br />
    <i>⚡ Easily build your personalized browser startpage</i>
  </p>
</div>

📋 Easy-to-deploy Personal Startpage

> A lightweight browser startpage powered by Cloudflare Workers.
> Features bookmark management, automatic favicon fetching, drag-and-drop reordering, and password-protected private links—all in a single Worker file for effortless setup.

## ✨ Features

* **⚡️ Serverless Architecture**: Runs entirely on Cloudflare Workers with zero server setup or maintenance.
* **💾 Cloudflare KV Storage**: Reliable, persistent key-value storage for all your links and settings.
* **🎨 Clean, Modern UI**: Built with Tailwind CSS. Includes automatic/manual dark mode toggle and a responsive layout for desktop and mobile.
* **🖱️ Drag-and-Drop Reordering**: Rearrange categories and bookmark cards via mouse drag on desktop or long-press on mobile.
* **🔒 Password Protection**: Hide sensitive links behind an admin password—visible only when logged in.
* **📂 Flexible Data Management**: Add, edit, or delete links directly on the page. Supports importing HTML bookmarks from Chrome/Edge, plus JSON import/export with automatic backups.
* **🔍 Multi-Engine Search**: Search via Google, Bing, Baidu, or perform instant quick searches across your saved bookmarks.

## Interface Preview

### Default View
| Card View | APP View |
|-|-|
| ![Desktop Preview](images/69bcc641f5194220aba98e128326ff9f.webp)| ![APP View](https://github.com/user-attachments/assets/7ea6df52-e9da-4922-9f79-40bc40cf6f5e)|

### Edit Mode
| Card View | APP View |
|-|-|
| ![Edit Mode](https://github.com/user-attachments/assets/a49974cd-ed41-47c8-816e-177318b14895)| ![APP View](https://github.com/user-attachments/assets/3ef5bf17-67b5-43ea-9295-2404cb4cd5b9)|

## Deployment

### Deploying to Cloudflare

<details>
<summary>Click to expand setup guide</summary>

#### Setup Steps

1. **Log in to [Cloudflare](https://www.cloudflare.com)** and create a new Worker:
   - Copy the code from `workers.js` in this repository, paste it into the Worker editor, and click **Save and Deploy**.

2. **Create a KV Namespace**:
   - Go to **Workers & Pages > KV** in the Cloudflare dashboard and create a namespace named `CARD_ORDER`.

3. **Bind the KV Namespace**:
   - Navigate to your Worker's **Settings > Variables**. Under **KV Namespace Bindings**, add a binding named `CARD_ORDER` and link it to the `CARD_ORDER` namespace created above.

4. **Configure Environment Variables**:
   - Set up the required and optional environment variables listed in the table below.

5. **Add a Custom Domain** (Optional):
   - Under **Settings > Domains & Routes**, assign a custom domain or use the provided `*.workers.dev` subdomain.

<br/>

#### Environment Variables

> Variables marked with "Required" must be configured. Unset optional variables will fall back to their default values.

| Variable | Required | Description | Default |
|---|---|---|---|
| `ADMIN_PASSWORD` | ✅ Required | Admin login password (minimum **8 characters**) | None |
| `JWT_SECRET` | ✅ Required | Secret key for JWT encryption. Must be a random string of **≥ 32 characters** | None |
| `DEFAULT_USER` | ⬜ Optional | Default user identifier | `testUser` |
| `ALLOWED_ORIGINS` | ⬜ Optional | Allowed CORS origins (comma-separated for multiple origins) | Empty (unrestricted) |
| `ICON_API` | ⬜ Optional | Custom favicon API endpoint | Built-in (xinac) |
| `PREFER_ICON_API` | ⬜ Optional | Prioritize the custom favicon API over standard fetching | `true` |

> **Important Notice for Upgrading from Older Versions:**
> - If your previous setup lacked `JWT_SECRET` or used a string shorter than 32 characters, you **must** update it to a random string of **≥ 32 characters**. Otherwise, the Worker will fail initialization due to validation rules (`JWT_SECRET missing or too weak`).
> - If your existing `ADMIN_PASSWORD` is shorter than 8 characters, please update it to at least **8 characters** to avoid validation errors.
> - Always click **Save and Deploy** after modifying environment variables for changes to take effect.

</details>

## 🙏 Acknowledgments

Special thanks to **[Cloudflare](https://www.cloudflare.com/)**, **[Tailwind CSS](https://tailwindcss.com/)**, **[hmhm2022](https://github.com/hmhm2022)**, and **[xinac](https://api.xinac.net/)**.
