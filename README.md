# Loyalty Group Corporate Platform

A high-performance, fully responsive, multi-page corporate ecosystem designed and developed for **Loyalty Group**. This platform serves as the digital hub for the organization's core operating arms: its micro-finance lending assets and its ethical healthcare procurement and logistics operations.

The entire project is built natively using lightweight, vanilla web technologies optimized for maximum loading speed, accessibility, and modern UI/UX consistency.

---

## 🚀 Key Features

* **Dual-Division Architecture:** Dedicated, content-optimized layouts showcasing both the **Micro Finance** and **Health Care** service pipelines.
* **Persistent Native Dark Mode:** A lightweight, client-side theme engine that checks user system preferences and preserves theme selection across multiple pages using `localStorage`.
* **Performance Optimized:** Fast, asset-light architecture utilizing lazy-loading, asynchronous image decoding, and hardware-accelerated CSS transitions for sub-second page loads.
* **Semantic SEO Ready:** Fully structured with dynamic meta layouts, canonical links, Open Graph sharing protocols, and crawler-ready `robots.txt` and `sitemap.xml` configurations.
* **Fluid Responsive Typography:** Tailored typography rules built with relative scaling (`rem`) to guarantee readability on any viewport size, from mobile displays to large desktop monitors.

---

## 🛠️ Tech Stack

* **Structure:** Semantic HTML5
* **Styling:** Modern CSS3 (utilizing CSS Custom Properties/Variables and Flexbox/Grid layouts)
* **Interactivity & Theme Engine:** Native JavaScript (ES6 Code-Isolation Wrapper)

---

## 📂 Project Structure

```text
├── assets/
│   ├── css/
│   │   └── style.css       # Core stylesheet, typography variables, & theme overrides
│   ├── js/
│   │   └── main.js        # Core engine, active state links, & dark mode controller
│   └── images/
│       ├── ceo-image.jpeg  # Optimized executive leadership portrait
│       └── [logos].jpeg    # Optimized division branding wordmarks
├── index.html              # Corporate Home Hub
├── finance.html            # Micro Finance Division Interface
├── health.html             # Health Care Division Interface
├── about.html              # Our Journey & Executive Leadership Profile
├── contact.html            # Corporate Inquiry Desk & Communications Center
├── README.md               # Repository documentation and project overview
├── robots.txt              # Search engine crawler instructions
└── sitemap.xml             # Search engine architectural index map