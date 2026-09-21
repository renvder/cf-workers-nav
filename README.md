<p align="right">
  🌐 <b>EN</b> |
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
* **🎨 Clean, Modern UI**: Built with Tailwind CSS (precompiled and embedded in the page, so no external CDN is needed), with a responsive layout for desktop and mobile, plus two display styles (Card view and APP view).
* **🚀 Light Startup**: No external scripts run on the page, web fonts load in the background without blocking it, and the "Loading…" indicator appears right away.
* **🌗 Dark Mode That Follows Your System**: Automatically matches your device's light/dark setting on desktop and mobile, and switches live when the system switches (e.g. scheduled day/night mode). You can also toggle it manually from the Settings menu; a manual choice is only remembered across visits if **Remember Settings** is turned on.
* **🖱️ Drag-and-Drop Reordering**: Rearrange categories and bookmark cards via mouse drag on desktop or long-press on mobile.
* **🔒 Password Protection**: Hide sensitive links behind an admin password—visible only when logged in. Failed logins are rate-limited (5 wrong attempts locks that IP for 15 minutes).
* **📂 Flexible Data Management**: Add, edit, or delete links directly on the page. Supports importing HTML bookmarks from Chrome/Edge, plus JSON import/export. Every save automatically keeps a backup of the previous data (at most one per 10 minutes, latest 10 kept).
* **🩺 One-Click Check** (login required): Check whether each site is reachable and how fast it responds, right from your browser.
* **🔍 Multi-Engine Search**: Search via Google, Bing, or DuckDuckGo, or perform instant quick searches across your saved bookmarks.

## Interface Preview

### Default View
| Card View | APP View |
|-|-|
| ![Desktop Preview](images/69bcc641f5194220aba98e128326ff9f.webp)| ![APP View](images/5a5b09901a3b4f81b104fc9f94983299.webp)|

### Edit Mode
| Card View | APP View |
|-|-|
| ![Edit Mode](images/439d9791b4024c2bb46faadf9e974cf4.webp)| ![APP View](images/83814f619d014d3f945eefdcf7adec2d.webp)|

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
   - Open your Worker's **Settings > Bindings** (in older dashboards: **Settings > Variables > KV Namespace Bindings**), add a KV binding with the variable name `CARD_ORDER`, and link it to the `CARD_ORDER` namespace created above.

4. **Configure Environment Variables**:
   - Go to your Worker's **Settings > Variables and Secrets** and add the variables listed in the table below.
   - Add `ADMIN_PASSWORD` and `JWT_SECRET` with the type **Secret** so their values are encrypted and hidden after saving. Other variables can use the type **Text**.
   - Click **Deploy** afterwards so the changes take effect.

5. **Add a Custom Domain** (Optional):
   - Under **Settings > Domains & Routes**, assign a custom domain or use the provided `*.workers.dev` subdomain.

<br/>

#### Environment Variables

> Variables marked with "Required" must be configured. Unset optional variables will fall back to their default values.

| Variable | Required | Description | Default |
|---|---|---|---|
| `ADMIN_PASSWORD` | ✅ Required | Admin login password (minimum **8 characters**; a long, unique password is recommended) | None |
| `JWT_SECRET` | ✅ Required | Secret key for signing login tokens. Must be a random string of **≥ 32 characters** (a password manager's generator works well) | None |
| `DEFAULT_USER` | ⬜ Optional | Data identifier. Your links are stored in KV under this name, so changing it later makes the page show a different (empty) dataset; the old data stays in KV under the old name | `testUser` |
| `ALLOWED_ORIGINS` | ⬜ Optional | Origins allowed to call the API from another domain (CORS), comma-separated. Only needed if you call the API from a different site | Empty (same-origin only) |
| `ICON_API` | ⬜ Optional | Third-party favicon API. The site URL is URL-encoded and appended to the end of this value, so it must end with the query parameter, e.g. `https://api.xinac.net/icon/?url=` | Built-in (xinac) |
| `PREFER_ICON_API` | ⬜ Optional | `true`: ask the favicon API first, then fall back to fetching from the site itself. `false`: never contact the third-party API and fetch icons directly from each site (**more private**, see below). Use exactly `true` or `false` in lowercase; any other value is treated as `false` | `true` |

#### 🔐 Privacy Tip: `PREFER_ICON_API`

With the default (`true`), the Worker sends **every link's URL to the favicon API** (xinac by default) to get its icon. This includes private links whenever they are displayed after login.

If you would rather not share your links with a third party, add `PREFER_ICON_API` = `false` under **Settings > Variables and Secrets** and click **Deploy**. Icons are then fetched straight from each website (`/favicon.ico`, then the icons declared in the page). The trade-off: a few sites may not provide a fetchable icon and will show the default icon instead.

> Icons that were already fetched stay cached for up to 7 days, so the change fully applies once old icons expire.

#### Upgrading from Older Versions

> - If your previous setup lacked `JWT_SECRET` or used a string shorter than 32 characters, you **must** update it to a random string of **≥ 32 characters**. Otherwise the Worker refuses to run and returns `Server is not configured` (HTTP 500) with the message `JWT_SECRET is not configured or not strong enough (needs ≥ 32 characters)`.
> - If your existing `ADMIN_PASSWORD` is shorter than 8 characters, update it to at least **8 characters**, otherwise the same error is returned.
> - Always click **Deploy** after modifying variables for changes to take effect.
> - Earlier versions saved the automatically detected theme in the browser, which stopped the page from following later system changes. The current version ignores that old value, so no manual clean-up is needed.

</details>

## 🛡️ Privacy & Security Notes

* **Favicon service**: see the `PREFER_ICON_API` tip above.
* **Third-party resources in the browser**: no third-party scripts run on the page (Tailwind CSS is embedded), so the login token cannot be exposed through a compromised CDN. The only external resource is Google Fonts (loaded in the background; if it is unreachable, system fonts are used). The admin login token is kept in the browser's `localStorage`, so on a shared or public computer, always use **Login / Logout** to sign out after editing. On your own personal device, staying logged in is fine.
* **Logout signs out every device**: logging out revokes all existing sessions (phone and computer alike). A logout request only takes effect when it carries a valid login token, so outsiders cannot force you to be signed out.
* **Private links** are filtered on the server: visitors who are not logged in never receive them.
* **Login protection**: 5 wrong passwords lock the visiting IP for 15 minutes. Login tokens last 2 hours and are renewed automatically through an HttpOnly cookie (up to 30 days).

## 🔧 Troubleshooting

**Safari on iOS 26 / 27 pauses for a few seconds when opening or refreshing the page**

In testing, this happens before the page itself is received (the Worker answers in a fraction of a second once the connection is established, and iOS 18 is not affected), so it is not caused by the page code. It appears to be related to how newer Safari versions set up connections to Cloudflare (HTTP/3 / 0-RTT). It does not affect functionality and only delays the first display. If it bothers you, you can optionally try turning off **0-RTT Connection Resumption** (and, if needed, **HTTP/3 (with QUIC)**) in your domain's Cloudflare settings. These switches apply to every site on that domain, and it may take a while for devices to pick up the change.

<details>
<summary>For developers: updating the embedded styles</summary>

The page's Tailwind CSS is precompiled and stored in the `<style id="tw-compiled">` block inside the HTML. If you add or change Tailwind utility classes in the page, that block must be regenerated, otherwise the new classes will have no styling.

1. Save the page's HTML to a file named `page.html`.
2. Use the `tailwind.config.js` from this repository (Tailwind CSS v3.4, `darkMode: 'class'`, with the theme's colors, fonts and shadows) and an `input.css` containing `@tailwind base; @tailwind components; @tailwind utilities;`.
3. Run `npx tailwindcss@3.4.17 -c tailwind.config.js -i input.css -o out.css --minify`.
4. Replace the contents of `<style id="tw-compiled">` with `out.css`. Because the HTML lives inside a JavaScript template literal in the Worker, every backslash in the CSS must be doubled (`\` → `\\`).

</details>

## 📝 Changelog

**2026-09-20**
* Performance: Tailwind CSS is now precompiled and embedded in the page instead of being loaded from `cdn.tailwindcss.com`; Google Fonts no longer blocks the page from starting; the login check no longer runs twice at startup; the "Loading…" indicator shows from the first paint; idle dialog overlays are fully hidden (`display: none`) instead of sitting invisibly on top of the page.
* Docs: added the iOS 26 / 27 Safari note and developer notes for regenerating the embedded styles.

**2026-09-19**
* Dark mode: the page now truly follows the system theme, including live switching. A manual choice is saved only when **Remember Settings** is on, and enabling that option now saves the theme actually in use. Added `color-scheme` / `theme-color` so native controls and the mobile browser bar match the theme.
* Security: `/api/logout` now requires a valid login token.
* Docs: added the privacy tip for `PREFER_ICON_API`; corrected the search engine list (DuckDuckGo instead of Baidu); corrected the `ALLOWED_ORIGINS` default (same-origin only, not unrestricted); clarified `JWT_SECRET`, `ICON_API` and `DEFAULT_USER`.

## 🙏 Acknowledgments

Special thanks to **[Cloudflare](https://www.cloudflare.com/)**, **[Tailwind CSS](https://tailwindcss.com/)**, **[hmhm2022](https://github.com/hmhm2022)**, and **[xinac](https://api.xinac.net/)**.
