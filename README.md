# Karaoke Wanwan — Inbound Landing Page

Multilingual landing page for Karaoke Wanwan targeting international visitors.
Built with **HTML / CSS / Vanilla JavaScript only** — no frameworks, no build tools.

**Supported languages:** English · 한국어 · 繁體中文 · 简体中文

---

## Project Structure

```
/
├── index.html                  # Top page
├── pages/
│   ├── menu.html               # Full menu page
│   ├── stores.html             # Store locations
│   ├── service.html            # Pricing & services
│   ├── ebo.html                # E-bo entertainment
│   ├── raibo.html              # Raibo live viewing
│   └── faq.html                # FAQ
├── assets/
│   ├── css/style.css           # Main stylesheet (CSS variables from tokens)
│   ├── js/
│   │   ├── components.js       # Shared header/footer injection
│   │   ├── i18n.js             # i18n translation engine
│   │   └── main.js             # UI interactions (menu, accordion, scroll)
│   ├── i18n/translations.json  # All language strings
│   ├── data/
│   │   ├── menu.json           # Menu item data
│   │   └── stores.json         # Store location data
│   └── img/                    # Local images (SVG placeholders)
├── design-tokens.json          # Design token definitions
├── .github/workflows/pages.yml # GitHub Pages deploy workflow
└── README.md
```

---

## Local Development

### Option A — Python HTTP server (recommended)

```bash
# Python 3
python -m http.server 8080

# Then open:
# http://localhost:8080
```

> **Important:** Open via HTTP server, not `file://`. The i18n module uses `fetch()` to load `translations.json`, which requires an HTTP context.

### Option B — Node.js

```bash
npx serve .
# or
npx http-server . -p 8080
```

### Option C — VS Code Live Server extension

Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension, right-click `index.html`, and select **Open with Live Server**.

### Language testing

Append `?lang=ko`, `?lang=zh-Hant`, or `?lang=zh-Hans` to any URL to test a specific language:

```
http://localhost:8080/?lang=ko
http://localhost:8080/pages/faq.html?lang=zh-Hant
```

---

## GitHub Pages Deployment

### Prerequisites

1. Push your repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, select **GitHub Actions**.

### Automatic deploy

The workflow at `.github/workflows/pages.yml` deploys automatically on every push to `main`.

```bash
git add .
git commit -m "feat: initial site"
git push origin main
```

GitHub Actions will deploy the site. The URL will be:

```
https://<your-username>.github.io/<repository-name>/
```

### Update canonical URLs

After deployment, replace the placeholder domain in each HTML file:

```bash
# Replace all occurrences (Linux/macOS)
find . -name "*.html" -exec sed -i \
  's|https://Wanwan-inbound.example.com|https://<your-username>.github.io/<repo-name>|g' {} \;
```

---

## AWS S3 + CloudFront Deployment

### Prerequisites

- AWS CLI installed and configured (`aws configure`)
- An S3 bucket with static website hosting enabled
- A CloudFront distribution pointing to the S3 bucket
- (Optional) A custom domain with ACM certificate for HTTPS

### Step 1 — Create S3 bucket

```bash
aws s3 mb s3://your-bucket-name --region ap-northeast-1

# Enable static website hosting
aws s3 website s3://your-bucket-name \
  --index-document index.html \
  --error-document index.html
```

### Step 2 — Set bucket policy (public read)

Create `bucket-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

Apply the policy:

```bash
aws s3api put-bucket-policy \
  --bucket your-bucket-name \
  --policy file://bucket-policy.json
```

### Step 3 — Upload files to S3

```bash
aws s3 sync . s3://your-bucket-name \
  --exclude ".git/*" \
  --exclude "*.md" \
  --exclude "spec/*" \
  --exclude ".github/*" \
  --delete
```

### Step 4 — Create CloudFront distribution

```bash
aws cloudfront create-distribution \
  --origin-domain-name your-bucket-name.s3-website-ap-northeast-1.amazonaws.com \
  --default-root-object index.html
```

Or use the AWS Console:

1. Go to **CloudFront → Create Distribution**
2. **Origin domain**: select your S3 bucket website endpoint
3. **Default root object**: `index.html`
4. **Price class**: All edge locations (or Price Class 200 for Asia/Europe)
5. **Alternate domain names**: add your custom domain (optional)
6. **SSL certificate**: use ACM certificate (optional)
7. Click **Create Distribution**

### Step 5 — Custom domain (optional)

1. In Route 53 (or your DNS provider), create a CNAME or A alias record pointing to your CloudFront domain (`xxxx.cloudfront.net`).
2. Add the custom domain to the CloudFront distribution's **Alternate domain names**.
3. Attach an ACM certificate for HTTPS.

### Step 6 — Invalidate cache after updates

```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

### CI/CD with GitHub Actions for S3

Add the following secrets to your GitHub repository:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `S3_BUCKET`
- `CF_DISTRIBUTION_ID`

Then add `.github/workflows/s3-deploy.yml`:

```yaml
name: Deploy to S3

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}
      - run: |
          aws s3 sync . s3://${{ secrets.S3_BUCKET }} \
            --exclude ".git/*" --exclude "*.md" \
            --exclude "spec/*" --exclude ".github/*" \
            --delete
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CF_DISTRIBUTION_ID }} \
            --paths "/*"
```

---

## Figma MCP Workflow

### Overview

```
1. Claude Code generates the site
2. Start local server
3. Figma MCP captures the UI
4. Designers edit layout in Figma
5. Claude Code reads the updated Figma design
6. Code is updated to match
```

### Setup

1. Install [Figma MCP](https://github.com/GLips/Figma-Context-MCP) (or equivalent MCP server).
2. Configure your MCP client to connect to Figma.

### Step 1 — Start local server

```bash
python -m http.server 8080
```

### Step 2 — Capture UI with Figma MCP

In your Claude Code session with Figma MCP enabled:

```
Use the Figma MCP to capture a screenshot of http://localhost:8080
Import it as a frame named "Wanwan - Homepage"
```

Or use a browser plugin to export the live page as a Figma frame.

### Step 3 — Design in Figma

Designers can edit:
- Colors → update `design-tokens.json` and `assets/css/style.css` CSS variables
- Typography → update font declarations in `style.css`
- Spacing / layout → update grid and spacing variables
- Component structure → edit the relevant HTML in `pages/` or `components.js`

### Step 4 — Read updated design and sync code

In Claude Code:

```
Read the Figma frame "Wanwan - Homepage" and identify changes.
Update the CSS variables in assets/css/style.css to match the new design tokens.
```

Claude Code will:
1. Extract updated design tokens from the Figma file
2. Update `design-tokens.json` with new values
3. Update CSS custom properties in `style.css`
4. Adjust HTML structure if layout changed

### Design Token Mapping

| Figma Token        | CSS Variable            | File               |
|--------------------|-------------------------|--------------------|
| colors/primary     | --color-primary         | style.css          |
| colors/secondary   | --color-secondary       | style.css          |
| spacing/section    | --spacing-section       | style.css          |
| font/heading       | --font-heading          | style.css          |
| borderRadius/card  | --radius-card           | style.css          |

### Recommended MCP Tools

- **Figma Context MCP** — reads Figma design files and exports tokens
- **Browser MCP / Puppeteer MCP** — captures live page screenshots
- **Playwright MCP** — automated visual regression testing

---

## i18n System

Language is resolved in this priority order:

1. URL parameter: `?lang=ko`
2. localStorage: `Wanwan_lang`
3. Browser language preference
4. Default: `en`

To add a new language:

1. Add translations to `assets/i18n/translations.json`
2. Add the language code to `SUPPORTED_LANGS` in `assets/js/i18n.js`
3. Add a language switcher button in `assets/js/components.js`
4. Add `hreflang` tags to all HTML pages

---

## Replacing Placeholder Images

The `/assets/img/` directory contains SVG placeholder images.
Replace them with real photographs:

| File | Subject |
|------|---------|
| `hero-karaoke.svg` | Tourists singing karaoke in a private room |
| `menu-karaage.svg` | Karaage fried chicken on a plate |
| `menu-fries.svg` | Seasoned french fries |
| `menu-cocktails.svg` | Cocktails / lemon sour |
| `store-shibuya.svg` | Shibuya store exterior at night |
| `store-shinjuku.svg` | Shinjuku store exterior at night |
| `ebo-gaming.svg` | Gaming in a karaoke room |
| `raibo-concert.svg` | Watching a concert on large screen |
| `faq-microphone.svg` | Karaoke microphone |

Keep the same filenames, or update `src` attributes in the HTML files.

---

## License

For educational / prototype purposes. All Karaoke Wanwan trademarks belong to their respective owners.
