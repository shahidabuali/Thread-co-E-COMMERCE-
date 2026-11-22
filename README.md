<a id="top"></a>
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=transparent&fontColor=9c4d78&fontSize=54&height=90&width=1200&text=THREAD%20CO.%20%E2%80%94%20Fashion%20Forward" alt="THREAD CO. — Fashion Forward" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Caveat&weight=600&size=26&pause=1000&color=9c4d78&center=true&vCenter=true&width=900&height=44&lines=A%20fashion%20store%20built%20from%20scratch.;Vanilla%20HTML%2C%20CSS%20%26%20JavaScript;Click%20a%20button%20below%20to%20explore%20%E2%86%93" alt="Typing headline" />
</p>

<p align="center">
  <a href="https://thread-co-e-commerce-rose.vercel.app"><img src="https://img.shields.io/badge/Live%20Demo-Visit%20Site-5f0f40?style=for-the-badge&logo=vercel&logoColor=white" alt="Live demo" /></a>
  <a href="https://github.com/shahidabuali/Thread-co-E-COMMERCE-"><img src="https://img.shields.io/badge/View%20Source-GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="View source" /></a>
  <a href="https://github.dev/shahidabuali/Thread-co-E-COMMERCE-"><img src="https://img.shields.io/badge/Open%20in-VS%20Code-007ACC?style=for-the-badge&logo=vscodium&logoColor=white" alt="Open in VS Code" /></a>
  <a href="https://github.com/shahidabuali/Thread-co-E-COMMERCE-/issues/new"><img src="https://img.shields.io/badge/Report%20Issue-GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="Report an issue" /></a>
  <a href="https://shahidas-portfolio.vercel.app/"><img src="https://img.shields.io/badge/Portfolio-Visit-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Portfolio" /></a>
  <a href="https://www.linkedin.com/in/shahidabuali/"><img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

## 📑 Contents

[The pitch](#pitch) · [Take the tour](#tour) · [Features](#features) · [Page flow](#flow) · [Run locally](#run) · [Author](#author)

<a id="pitch"></a>
## 🧵 The pitch

A complete fashion e-commerce **front-end** — storefront, product pages, cart, wishlist, blog, auth and an admin dashboard — built with plain HTML, CSS and JavaScript during my early practice days. No frameworks, no build step: just the browser doing the work.

<a id="tour"></a>
## 🗺️ Take the tour

| Page | What to look for |
| --- | --- |
| [index.html](index.html) | Animated hero, rotating headline, count-up stats, category grid, product cards |
| [shop.html](shop.html) | Search, category filters, sorting, skeleton loading cards |
| [product.html](product.html) | Colour/size pickers, quantity, add to cart, wishlist |
| [cart.html](cart.html) | Quantity updates, totals, promo code `THREAD20` |
| [wishlist.html](wishlist.html) | Saved items, move to cart |
| [auth.html](auth.html) / [dashboard.html](dashboard.html) | Demo sign-in and account area |
| [admin.html](admin.html) / [blog.html](blog.html) | Admin panel and blog layout |
| [emailservice.js](emailservice.js) | Email helper used by the demo flows |

<a id="features"></a>
<details>
<summary>✨ Interaction checklist — click to expand</summary>

- [x] Dark / light theme toggle, saved to `localStorage`
- [x] Animated SVG "dressing" figure that adds jacket → shoes → accessories in a loop
- [x] Hero headline that cycles through *Bold Story / True Self / Daily Mood*
- [x] Count-up counters, scroll reveals and skeleton placeholders
- [x] 12 products across 5 categories, with ratings, badges and low-stock warnings
- [x] Cart and wishlist persisted in `localStorage` (`tc_cart`, `tc_wishlist`, `tc_user`, `tc_theme`)
- [x] Toast notifications for add-to-cart, wishlist and newsletter actions
- [x] Newsletter signup and a promo-code banner

</details>

<a id="flow"></a>
<details>
<summary>🏗️ How the pages connect — click to view the diagram</summary>

```mermaid
flowchart LR
    A[Home] --> B[Shop]
    B --> C[Product detail]
    C --> D[Cart]
    C --> E[Wishlist]
    E --> D
    D --> F[Auth / Dashboard]
    B --> G[Blog]
    A --> H[Admin]
```

</details>

<a id="run"></a>
<details>
<summary>▶️ Run it locally — click for commands</summary>

```bash
# simplest: double-click index.html
# or serve it locally:
python -m http.server 8000
# then open http://localhost:8000/index.html
```

Everything is demo data inside `index.html` — no database or payment gateway is connected.

</details>

<p align="center">
  <img src="https://img.shields.io/github/last-commit/shahidabuali/Thread-co-E-COMMERCE-?style=flat-square" alt="Last commit" />
  <img src="https://img.shields.io/github/stars/shahidabuali/Thread-co-E-COMMERCE-?style=flat-square" alt="Stars" />
  <img src="https://img.shields.io/github/license/shahidabuali/Thread-co-E-COMMERCE-?style=flat-square" alt="License" />
</p>

<a id="author"></a>
<p align="center">Built with patience and a lot of practice by <a href="https://github.com/shahidabuali">Shahida Bu Ali</a> · <a href="https://shahidas-portfolio.vercel.app/">Portfolio</a> · <a href="https://www.linkedin.com/in/shahidabuali/">LinkedIn</a></p>

<p align="center"><a href="#top">↑ Back to top</a></p>
