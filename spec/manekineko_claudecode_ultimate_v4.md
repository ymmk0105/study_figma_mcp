
# ClaudeCode Ultimate Spec v4
Karaoke Manekineko Inbound Landing Page Generator
Target: Claude Code
Purpose: Generate a near-production multilingual inbound landing page with Figma MCP bidirectional workflow.

============================================================
1. PROJECT GOAL
============================================================

Generate a multilingual inbound landing page promoting
"Karaoke Manekineko" to international visitors.

Primary objective:
Increase inbound tourists visiting Karaoke Manekineko.

Target audience:
- Tourists currently visiting Japan
- Travelers planning Japan trips
- Anime / music / gaming fans

Target regions:
- North America
- Europe
- Korea
- Taiwan / Hong Kong
- Mainland China

Technical constraints:

- HTML only
- CSS only
- Vanilla JavaScript only
- No frameworks
- No build tools

Deployment targets:

- GitHub Pages
- AWS S3
- AWS CloudFront

============================================================
2. SUPPORTED LANGUAGES
============================================================

Languages:

en
ko
zh-Hant
zh-Hans

Implementation:

/assets/i18n/translations.json
/assets/js/i18n.js

HTML rule:

All text must use data-i18n attributes.

Example:

<h1 data-i18n="hero.title"></h1>

Language switcher required in header.

Persistence:
localStorage

URL override:

?lang=en
?lang=ko
?lang=zh-Hant
?lang=zh-Hans

============================================================
3. SITE STRUCTURE
============================================================

/
/pages/menu.html
/pages/stores.html
/pages/service.html
/pages/ebo.html
/pages/raibo.html
/pages/faq.html

Shared components:

Header
Footer
Navigation
Language Switcher

============================================================
4. TOP PAGE STRUCTURE
============================================================

Hero
About Manekineko
Recommended Menu
Recommended Stores
Plans
E-bo Introduction
Raibo Introduction
FAQ Preview
Call To Action
Footer

============================================================
5. COMPONENT ARCHITECTURE
============================================================

Reusable components:

Header
Hero
CardGrid
FeatureSection
MenuCard
StoreCard
PricingTable
FAQAccordion
CTASection
Footer

Accessibility requirements:

aria-label
aria-expanded
keyboard navigation
visible focus state

============================================================
6. DESIGN TOKENS
============================================================

Create design-tokens.json

Example structure:

{
  "colors": {
    "primary": "#E60012",
    "secondary": "#333333",
    "background": "#FFFFFF"
  },
  "spacing": {
    "section": "80px",
    "cardGap": "24px"
  },
  "font": {
    "heading": "system-ui",
    "body": "system-ui"
  }
}

Use CSS variables generated from tokens.

============================================================
7. IMAGE STRATEGY
============================================================

Use realistic temporary images.

Sources:

Unsplash
Pexels

Rules:

Download images locally.
Store in:

/assets/img/

Never hotlink images.

Each image must include:

width
height
alt text

Example:

<img
src="./assets/img/hero-karaoke.jpg"
width="1440"
height="720"
alt="International tourists enjoying karaoke in a Japanese karaoke room"
>

============================================================
8. TEMP IMAGE THEMES
============================================================

Hero

tourists singing karaoke in private room

Menu

karaage
fries
cocktails

Stores

karaoke building exterior
Tokyo nightlife

E-bo

gaming inside karaoke room

Raibo

watching concert on large screen

FAQ

karaoke microphone

============================================================
9. JAVASCRIPT FEATURES
============================================================

main.js must implement:

mobile menu toggle
FAQ accordion
smooth scroll
language switching
localStorage persistence

============================================================
10. CONTENT SOURCES
============================================================

E-bo content source:

https://www.karaokemanekineko.jp/service/e-bo/

Summarize:

- entertainment features
- gaming support
- sports streaming
- smartphone control

Raibo content source:

https://www.karaokemanekineko.jp/service/lv/

Summarize:

- live viewing experience
- watching concerts/events
- booking flow
- usage notes

Provide translations for all languages.

============================================================
11. DATA SCHEMA
============================================================

Create JSON data files:

/assets/data/menu.json
/assets/data/stores.json

Example menu schema:

{
  "items":[
    {
      "name":"Karaage",
      "price":"¥500",
      "image":"menu-karaage.jpg"
    }
  ]
}

Example store schema:

{
  "stores":[
    {
      "name":"Shibuya Store",
      "area":"Tokyo",
      "image":"store-shibuya.jpg"
    }
  ]
}

============================================================
12. SEO REQUIREMENTS
============================================================

Each page must include:

title
meta description
canonical
OpenGraph tags

Structured data:

Organization
FAQPage

Include hreflang tags for all supported languages.

============================================================
13. FIGMA MCP WORKFLOW
============================================================

Workflow:

1 ClaudeCode generates site
2 Start local server
3 Capture UI with Figma MCP
4 Designers edit layout in Figma
5 ClaudeCode reads updated design
6 Code updated

README must explain:

MCP connection
UI capture
design resync workflow

============================================================
14. GITHUB PAGES DEPLOYMENT
============================================================

Repository must include:

.github/workflows/pages.yml

Deploy automatically from main branch.

All paths must be relative.

============================================================
15. AWS PRODUCTION DEPLOYMENT
============================================================

Use:

Amazon S3
CloudFront

Requirements:

S3 static hosting
CloudFront distribution
Custom domain
HTTPS enabled

README must document deployment steps.

============================================================
16. ACCEPTANCE CRITERIA
============================================================

Project is complete when:

- site runs locally
- multilingual switching works
- responsive layout works
- images load correctly
- GitHub Pages deploy works
- Figma MCP workflow documented
- AWS deployment documented

============================================================
17. CLAUDE CODE EXECUTION PROMPT
============================================================

Create a production-ready multilingual landing page using this full specification.

Requirements:

HTML CSS JS only
Multi-page architecture
JSON translation system
Realistic images downloaded locally
Responsive layout
SEO metadata
GitHub Pages workflow
Full README documentation
