# Kritarth Hospitality Website - Ownership and Knowledge Transfer

Last updated: March 13, 2026

## 1) Project Summary
This is a static hospitality website for Kritarth Hospitality.

- Main landing page: `index.html`
- Property pages: `properties/`
- Global styles: `css/style.css`
- Property-specific styles: `css/takhat-villa.css`
- Global scripts: `js/main.js`
- Property-specific scripts: `js/takhat-villa.js`
- Media assets: `assets/`

There is currently one listed property page: Takhat Villa.

## 2) Official Accounts and Hosting

### GitHub
- Account: https://github.com/kritarthhospitality-owner
- Repository: https://github.com/kritarthhospitality-owner/kritarthhospitality-website

### Netlify
- Project URL: https://app.netlify.com/projects/kritarth-hospitality-website/overview
- Status note: Auto-publishing is currently OFF.
- Impact: New commits to GitHub do not deploy automatically to production until auto-publishing is turned ON.

## 3) Ownership Transfer Checklist
Complete these steps before handover is considered done.

1. Add the new developer to the GitHub repo with Write or Admin access.
2. Confirm the new developer can clone, push, and create pull requests.
3. Add the new developer to Netlify project access with deploy permissions.
4. Share ownership of domain/DNS (if custom domain is configured in Netlify).
5. Verify that the new developer can:
   - Trigger manual deploys.
   - See deploy logs.
   - Access Netlify form submissions.
6. Document where brand assets, logos, and source media are stored.
7. Confirm who approves production releases (client, manager, or developer).

## 4) Tech Stack
No framework build system is used.

- HTML5 (multi-page static site)
- CSS3 (custom styles, responsive layouts, animations)
- Vanilla JavaScript (DOM interactions, form validation, lightbox, navigation)
- Netlify static hosting
- Netlify Forms (reservation form submission)
- Google Fonts (Playfair Display, Poppins)
- Google Maps embed via iframe

## 5) Local Development and Release Flow

### Run locally
You can run this site with any static server.

Examples:
- VS Code Live Server extension
- Python simple server
- Node static server tools

No build step is required.

### Standard release process
1. Create a branch from main.
2. Make content/code changes.
3. Test locally (desktop and mobile).
4. Commit and push to GitHub.
5. Merge to main.
6. Deploy via Netlify (auto or manual depending on auto-publish setting).

## 6) Netlify Deployment Notes

### Current situation
- Auto-publishing from connected Git repo is OFF.
- Production will not update automatically after merge until this is turned ON.

### To enable auto-publishing
In Netlify project settings, enable automatic deploys for the connected branch (usually `main`).

Suggested verification after enabling:
1. Push a small non-breaking commit.
2. Confirm a new deploy starts automatically in Netlify.
3. Confirm the production URL serves the latest version.

### If keeping auto-publishing OFF
Use manual production deploys from Netlify dashboard after each approved merge.

## 7) Netlify Plan and Cost Guidance
Current plan: Free with 300 credits/month.

Given assumptions provided:
- 10,000 requests cost 3 credits.
- 1 form submission costs 1 credit.
- Current page view load is around 100-150 requests.

### Derived cost model
- Credits per request: 3 / 10000 = 0.0003 credits
- Credits per page visit (100 requests): 100 x 0.0003 = 0.03 credits
- Credits per page visit (150 requests): 150 x 0.0003 = 0.045 credits

### Approximate monthly capacity with 300 credits (traffic only)
- If 100 requests per visit: 300 / 0.03 = about 10,000 visits/month
- If 150 requests per visit: 300 / 0.045 = about 6,666 visits/month

### Include form submissions in planning
Each successful reservation submission consumes 1 additional credit.

Example:
- 7,000 visits/month at ~120 requests/visit:
  - Request credits: 7000 x (120 x 0.0003) = 252 credits
  - Remaining credits: 300 - 252 = 48 credits
  - This allows about 48 form submissions before crossing 300 credits

Decision guideline:
- Stay on free plan while monthly usage stays safely below 300 credits.
- Upgrade or evaluate alternate hosting once traffic + form activity consistently approaches the monthly limit or if predictable scale is expected.

## 8) How to Add a New Property (Developer Playbook)

Use Takhat Villa as the template for all new properties.

### Step 1: Prepare assets
1. Create a dedicated asset folder under `assets/` (example: `assets/new_property_name/`).
2. Add optimized images/videos with consistent naming.
3. Keep file names web-safe (lowercase, hyphen or underscore, no spaces).

### Step 2: Create property page
1. Copy `properties/takhat-villa.html` to a new file, for example `properties/new-property.html`.
2. Update:
   - `<title>` and meta description
   - Hero section text
   - Room/experience/dining/gallery content
   - All image/video paths to the new asset folder
   - Map embed location
3. Keep link paths relative (`../assets/...`, `../css/...`, `../js/...`).

### Step 3: Create property CSS/JS (recommended)
1. Copy `css/takhat-villa.css` to `css/new-property.css`.
2. Copy `js/takhat-villa.js` to `js/new-property.js`.
3. Update the HTML references in the new property page:
   - `<link rel="stylesheet" href="../css/new-property.css" />`
   - `<script src="../js/new-property.js"></script>`

Note: You may reuse existing files if design/behavior is identical, but separate CSS/JS keeps future maintenance easier.

### Step 4: Add property card on homepage
1. Open `index.html`.
2. In the `#properties` section, duplicate an existing `.property-card` block.
3. Update:
   - Card link to the new property page
   - Thumbnail image
   - Location, title, short description, and badge text
4. Confirm the card appears correctly in desktop and mobile layouts.

### Step 5: QA checklist before deploy
- Navigation links work.
- All media loads correctly (no 404 paths).
- No broken layout on mobile.
- Lighthouse-style basics: image size reasonable, text readable.
- Reservation section on homepage still submits correctly.

### Step 6: Deploy
- If auto-publish ON: merge to main and verify deploy.
- If auto-publish OFF: run manual production deploy from Netlify dashboard.

## 9) Reservation Form Notes
Reservation form is on `index.html` and uses Netlify Forms:
- `data-netlify="true"`
- hidden `form-name` field = `reservation`
- honeypot field `bot-field`

Form behavior and validation are handled in `js/main.js`.

If form name changes, update both:
- form attribute values in HTML
- related handling assumptions in JS and Netlify dashboard tracking

## 10) Suggested Operational Practices
1. Keep all content updates in GitHub commits (no ad-hoc production-only edits).
2. Use pull requests for all production changes.
3. Tag important releases in GitHub (for rollback checkpoints).
4. Review Netlify deploy logs after every release.
5. Check monthly Netlify credits at least once per week.

## 11) Quick Recovery (If a bad deployment goes live)
1. In Netlify deploy history, identify last known good deploy.
2. Publish previous deploy, or revert commit in GitHub and redeploy.
3. Verify critical pages:
   - Home page
   - Property pages
   - Reservation form
   - Contact links

## 12) Known Current Structure Snapshot
- Home page contains About, Properties, Reservation, Contact, and legal modals.
- One detailed property page exists: Takhat Villa.
- Site is static and does not depend on a backend server.

---
If this project grows to many properties, consider migrating to a lightweight CMS or data-driven static generation to reduce manual duplication and content update risk.
