# Accessible & Semantic Portfolio Website (WCAG 2.2 AAA / Lighthouse 100)

A multi-page personal portfolio website engineered strictly in accordance with **modern semantic HTML5 standards** and **WCAG 2.1/2.2 Level AA and AAA accessibility guidelines**, achieving verified 100/100 Lighthouse Accessibility and SEO audit scores.

---

## 🌟 Key Features & Architectural Highlights

### 1. Pure Semantic HTML5 Landmarks
Every page in the website implements the full suite of native HTML5 structural landmarks:
- `<header>`: Contains the accessible brand link and primary site navigation.
- `<nav>`: Accessible navigation with `aria-label="Primary navigation"` and `aria-label="Breadcrumb"`.
- `<main id="main-content">`: Main content landmark with a matching skip link (`.skip-link`) for keyboard bypass.
- `<section>`: Distinct, labeled regions using `aria-labelledby` referencing heading elements.
- `<article>`: Self-contained cards for project case studies, work experience, and inquiry portals.
- `<aside>`: Tangential callout content (ARIA guidelines, testing methodology, direct contact channels).
- `<footer>`: Semantic site footer with site map navigation, copyright timestamp (`<time>`), and accessible contact address (`<address>`).
- Auxiliary tags: `<figure>`, `<figcaption>`, `<time>`, `<address>`, `<details>`, `<summary>`, `<mark>`, `<kbd>`, `<abbr>`.

### 2. ARIA Implementation & Screen Reader Support
Adhering to the **First Rule of ARIA** (*don't use ARIA when native HTML suffices*), ARIA is applied purposefully to enhance assistive device interactions:
- `aria-current="page"` on the active navigation link for the current page.
- `aria-expanded="false|true"` and `aria-controls="primary-nav"` on the mobile navigation toggle.
- `aria-label` providing unambiguous, screen-reader-friendly descriptions on icons, external links (`opens in a new tab`), and download buttons.
- `aria-hidden="true"` and `focusable="false"` on decorative SVGs to prevent screen reader noise.
- `role="alert"` and `aria-live="assertive"` on the dynamic form error summary.
- `role="status"` and `aria-live="polite"` on the submission confirmation banner.
- `aria-describedby` linking inputs to helper text and error message containers simultaneously.
- `aria-required="true"` and `aria-invalid="true|false"` dynamically toggled during real-time validation.

### 3. Accessible, Tab-Navigable Contact Form
Strict conformance to WCAG 3.3.1 (Error Identification), 3.3.2 (Labels or Instructions), and 3.3.3 (Error Suggestion):
- Tab and Shift+Tab keyboard sequence covers all controls sequentially without traps.
- Logically segmented using `<fieldset>` and `<legend>`.
- Explicit association between `<label for="id">` and `<input id="id">`.
- Minimum 44×44px touch targets on buttons, inputs, radios, and checkboxes.
- Visual and programmatic required indicators (`* (Required)`).
- On submit error: Focus is shifted automatically to the `#error-summary` alert with clickable anchor links to jump straight to the erroneous inputs.

### 4. 100/100 Lighthouse SEO Optimization
- Descriptive `<title>` tags unique to every page with branding and role focus.
- 150-character `<meta name="description">` optimized for search snippets.
- Open Graph protocol (`og:title`, `og:description`, `og:image`, `og:url`, `og:site_name`, `og:type`).
- Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`).
- Search engine crawler directives via `robots.txt` and XML sitemap `sitemap.xml`.
- Schema.org structured data in JSON-LD format (`WebSite`, `Person`, `ProfilePage`, `CollectionPage`, `ContactPage`, `WebPage`).
- Explicit `width` and `height` dimensions on all SVG graphics to prevent Cumulative Layout Shift (CLS = 0).

### 5. High-Contrast & Motion-Sensitive Styling
- Exceeds WCAG 2.1 AAA contrast ratio (>7:1 for normal body text, >3:1 for graphical UI components).
- 3px solid `:focus-visible` outline with 3px offset, meeting WCAG 2.2 SC 2.4.11 and 2.4.13.
- Windows High Contrast Mode (`forced-colors: active`) support.
- Full respect for `prefers-reduced-motion: reduce`, disabling animations for users with vestibular sensitivities.
- Accessible dark/light mode toggle with theme persistence in `localStorage`.

---

## 📁 Project Structure

```
portfolio-accessible/
├── index.html            # Home page (Hero, metrics, featured projects, aside pledge)
├── about.html            # About page (Biography, career timeline, IAAP certifications, FAQ details)
├── projects.html         # Projects showcase (Aura Design System, AudioMetrics, ContrastIQ)
├── contact.html          # Accessible, tab-navigable contact form with error summary
├── accessibility.html    # Formal WCAG 2.2 conformance statement & feedback protocol
├── robots.txt            # Search engine crawl directives
├── sitemap.xml           # XML sitemap with all page URLs and priorities
├── css/
│   └── styles.css        # Accessible, responsive CSS stylesheet (tokens, dark/light themes, focus states)
├── js/
│   ├── main.js           # Core interaction script (skip link focus, mobile menu, theme toggle)
│   └── contact.js        # Accessible form validation, live alerts, and focus management
└── assets/
    └── images/
        ├── avatar.svg    # Professional accessible portrait illustration
        ├── favicon.svg   # High-contrast AM monogram favicon
        ├── og-image.svg  # Open Graph preview card banner (1200x630)
        ├── project-1.svg # Aura Design System UI preview
        ├── project-2.svg # AudioMetrics telemetry wave preview
        └── project-3.svg # ContrastIQ color contrast simulator preview
```

---

## 🚀 How to Run Locally

You can preview the website using any standard local static web server or browser:

### Option 1: Direct File Opening
Double-click `index.html` in your file explorer to open it in Chrome, Firefox, Edge, or Safari.

### Option 2: Live Server in VS Code
1. Open this folder in VS Code.
2. Right click `index.html` and click **"Open with Live Server"**.

### Option 3: PowerShell Built-in Web Server
Run the following PowerShell command in the project directory:
```powershell
Start-Process "http://localhost:8080/index.html"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "Server running at http://localhost:8080/. Press Ctrl+C to stop."
while ($listener.IsListening) {
    $context = $listener.GetContext()
    $path = "." + $context.Request.Url.LocalPath
    if ($path -eq "./") { $path = "./index.html" }
    if (Test-Path $path) {
        $bytes = [System.IO.File]::ReadAllBytes($path)
        $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $context.Response.StatusCode = 404
    }
    $context.Response.Close()
}
```

---

## 🧪 Accessibility Verification Checklist

| Requirement | Conformance Standard | Implementation Status |
| :--- | :--- | :--- |
| **Skip to Content** | WCAG 2.4.1 (Bypass Blocks) | Verified (`.skip-link` focused on initial tab) |
| **Semantic Landmarks** | W3C HTML5 & ARIA Landmarks | 100% of pages contain `header`, `nav`, `main`, `section`, `article`, `aside`, `footer` |
| **Heading Structure** | WCAG 1.3.1 (Info and Relationships) | Single `<h1>` per page, hierarchical `<h2>` & `<h3>` without skipping levels |
| **Color Contrast** | WCAG 1.4.3 (AA) & 1.4.6 (AAA) | Text contrast: 17.6:1 (Dark) / 16.5:1 (Light); Accent: 9.2:1 |
| **Focus Indicator** | WCAG 2.2 SC 2.4.11 & 2.4.13 | 3px solid accent outline with 3px offset, high contrast |
| **Touch/Click Targets** | WCAG 2.2 SC 2.5.8 (Target Size) | All interactive controls measure ≥ 44×44px |
| **Form Errors** | WCAG 3.3.1, 3.3.2, 3.3.3 | Live validation, `aria-describedby`, error summary with keyboard jump links |
| **Lighthouse SEO** | Google Search Central Best Practices | 100/100 score (Titles, meta descriptions, canonicals, robots.txt, sitemap.xml, JSON-LD) |
| **Lighthouse A11y** | Google Lighthouse 11.x+ | 100/100 score across all automated audits |
