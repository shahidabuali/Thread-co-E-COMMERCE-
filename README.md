<a id="top"></a>
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=transparent&fontColor=61DAFB&fontSize=52&height=90&width=1200&text=Image%20Captioner%20%E2%80%94%20AI%20in%20one%20click" alt="Image Captioner" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Caveat&weight=600&size=26&pause=1000&color=61DAFB&center=true&vCenter=true&width=900&height=44&lines=Upload%20an%20image.%20Get%20a%20caption.;Free%2C%20no%20login%2C%20no%20storage.;Three%20styles%3A%20plain%2C%20alt%20text%2C%20social." alt="Typing headline" />
</p>

<p align="center">
  <a href="https://github.com/shahidabuali/Ai-Image-TO-Captions"><img src="https://img.shields.io/badge/View%20Source-GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="View source" /></a>
  <a href="https://github.dev/shahidabuali/Ai-Image-TO-Captions"><img src="https://img.shields.io/badge/Open%20in-VS%20Code-007ACC?style=for-the-badge&logo=vscodium&logoColor=white" alt="Open in VS Code" /></a>
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fshahidabuali%2FAi-Image-TO-Captions"><img src="https://img.shields.io/badge/Deploy%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Deploy on Vercel" /></a>
  <a href="https://github.com/shahidabuali/Ai-Image-TO-Captions/issues/new"><img src="https://img.shields.io/badge/Report%20Issue-GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="Report an issue" /></a>
  <a href="https://shahidas-portfolio.vercel.app/"><img src="https://img.shields.io/badge/Portfolio-Visit-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Portfolio" /></a>
  <a href="https://www.linkedin.com/in/shahidabuali/"><img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini" />
  <img src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=black" alt="Supabase" />
</p>

## 📑 Contents

[The pitch](#pitch) · [Caption styles](#styles) · [Privacy notes](#privacy) · [Request flow](#flow) · [Project map](#map) · [Run locally](#run) · [Author](#author)

<a id="pitch"></a>
## ⚡ The pitch

Drop in a photo and get an instant AI-written caption. No account, no upload history, no paywall. Pick the style you need and click **Generate caption**.

<a id="styles"></a>
## 🎛️ Three caption styles

| Style | What it writes |
| --- | --- |
| **plain** | One accurate sentence describing the image |
| **alt** | Concise alt text for screen readers, under 20 words |
| **caption** | A short, casual social-media caption without hashtags |

<a id="privacy"></a>
<details>
<summary>🔒 Privacy & free-tier notes — click to expand</summary>

- JPG, PNG and WEBP images are supported. The image is converted to base64 in the browser and sent straight to Gemini — **the app never saves it**.
- The API runs on Gemini's free tier, so a busy day can temporarily exhaust the quota. If generation fails, try again in a few minutes.
- The optional waitlist writes an email to a Supabase `waitlist` table using a **publishable** key (safe for the browser). Secret keys stay server-side.

</details>

<a id="flow"></a>
<details>
<summary>🏗️ The request flow — click to view the diagram</summary>

```mermaid
sequenceDiagram
    participant U as User
    participant B as Browser (React)
    participant A as /api/caption (Vercel)
    participant G as Gemini
    U->>B: Choose image + caption style
    B->>B: Convert image to base64
    B->>A: POST { image, mimeType, prompt }
    A->>G: generateContent (API key stays hidden)
    G-->>A: Generated text
    A-->>B: { caption }
    B-->>U: Show caption
```

</details>

<a id="map"></a>
<details>
<summary>🧩 Project map — click to expand</summary>

```
src/
  pages/     Home, About, Contact, Waitlist, ThankYou, NotFound
  components/ Nav, Breadcrumbs, CookieConsent
  supabaseClient.js
  App.jsx    routes + dark/light theme
api/
  caption.js Gemini proxy (POST only)
```

Extra polish: React Router pages, React Helmet SEO tags, breadcrumbs, cookie consent, collapsible FAQs and a custom 404 page.

</details>

<a id="run"></a>
<details>
<summary>▶️ Run it locally — click for commands</summary>

```bash
npm install
npm run dev
# npm run build  → production bundle
```

Add `GEMINI_API_KEY` in Vercel project settings (or `.env.local` when using `vercel dev`). It is read only inside `api/caption.js` — never expose it with a `VITE_` prefix.

For the optional waitlist, copy `.env.example` to `.env.local` and add your own `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. No real keys are stored in this repo; the waitlist simply shows a friendly message when they are missing.

</details>

<p align="center">
  <img src="https://img.shields.io/github/last-commit/shahidabuali/Ai-Image-TO-Captions?style=flat-square" alt="Last commit" />
  <img src="https://img.shields.io/github/stars/shahidabuali/Ai-Image-TO-Captions?style=flat-square" alt="Stars" />
  <img src="https://img.shields.io/github/license/shahidabuali/Ai-Image-TO-Captions?style=flat-square" alt="License" />
</p>

<a id="author"></a>
<p align="center">Built by <a href="https://github.com/shahidabuali">Shahida Bu Ali</a> · <a href="https://shahidas-portfolio.vercel.app/">Portfolio</a> · <a href="https://www.linkedin.com/in/shahidabuali/">LinkedIn</a></p>

<p align="center"><a href="#top">↑ Back to top</a></p>
