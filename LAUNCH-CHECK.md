# Launch check: Dad Strength (2026-10-26)

Checked as a first-time visitor on a phone (iPhone 13 emulation in Chromium, plus Lighthouse mobile with its default slow-4G and 4x CPU throttling).

**Which site this covers.** This repo is no longer the site. Its `vercel.json` sends every path on forging-fathers.com to https://www.dadstrength.tech/ (308). The live site is the Next.js app at www.dadstrength.tech, and its code is in `Broughsef87/dad-strength-app`, not here. That repo wasn't open to this session, so every fix below for www.dadstrength.tech has to be made there. This PR only changes the README and adds this file.

## Results at a glance

| Check | Result |
|---|---|
| Page speed (Lighthouse mobile, `/`) | **Performance 60**. LCP 4.6 s, Total Blocking Time 1,070 ms, TTI 4.8 s. Accessibility 100, Best Practices 100, SEO 100 |
| Page speed (`/programs`) | **Did not paint in Lighthouse, two runs in a row (NO_FCP)**. See P0 below |
| Broken links | None. 20 links on 5 pages all return 200. In-page anchors exist (`#how`, `#coach`, `#sign-in`, `/programs#hybrid-power`, `#dad-built`, `#hybrid-dad`). `#auth-sign-up` and `#auth-forgot-password` are JS form switches, and they work |
| CTAs go to live pages | Yes. "claim a founding spot" goes to `#sign-in`, "see the programs" and "read the programs" go to `/programs` (200), the footer links work, and the cross-link to romansxiimen.com returns 200 |
| Sign-up (dry run) | Works up to the network. Requests were captured and blocked, so nothing was sent. Email sign-up POSTs `{email, password}` to Supabase `/auth/v1/signup` with `redirect_to=/dashboard`. Google goes Supabase → Google, and the Google screen loads with no OAuth error. Supabase public settings: email and Google on, sign-up open, `mailer_autoconfirm: true` (no confirmation email) |
| Email capture | **There isn't one.** The only way to leave an email is to create an account |
| Meta tags | Home and `/programs` are complete (title, description, canonical, OG, Twitter). `/terms`, `/privacy` and `/disclaimer` have no canonical, and their `og:url` and `og:title` are the home page's |
| Open Graph image | Loads (200, 26 KB) but is **1500×500 (3:1)**. Shares look best at 1200×630. iMessage, WhatsApp, LinkedIn and Facebook crop a 3:1 image, and it shows only the logo, not what the app does |
| robots.txt / sitemap | Both fine. Private app routes are disallowed, and the 5 public pages are in the sitemap |
| Mobile layout | No sideways scroll on any page |
| Contact email | `dad.strength@the-forge-agency.com`. That domain has Google MX records, so mail is delivered |
| forging-fathers.com | Works, but with two hops: `forging-fathers.com` 307 → `www.forging-fathers.com` 308 → `www.dadstrength.tech/`. The first hop is a Vercel domain setting. Pointing the apex domain straight at the redirect saves one round trip |

## P0: fix before sending traffic

1. **Every page is invisible until JavaScript runs.** The server HTML wraps the whole page in `<div style="opacity:0;transform:translateY(6px)">`, a page-transition fade, which stays invisible until React hydrates. On a mid-range phone that means 4–5 s of blank dark screen (LCP 4.6 s, 1.07 s of main-thread blocking, mostly in chunk `2089-*.js`). On `/programs`, Lighthouse saw nothing paint at all in two runs. Fix in `dad-strength-app`: drop the fade on first load (start the wrapper at `opacity:1` in the server render and animate only on client-side route changes), or switch to a CSS-only fade that doesn't wait for hydration.
2. **The Google sign-in screen says "to continue to zfjkbnckueqkqxsldeyk.supabase.co".** The visitor sees this at the moment they commit, and an unfamiliar domain there reads like phishing. Fix: a Supabase custom domain (for example `auth.dadstrength.tech`) or Google OAuth brand verification, so the consent screen shows "Dad Strength".
3. **Run one real sign-up yourself.** No test mode was available. Supabase is live and auto-confirms, so a test account would be a real production user and might count against the 20 spots. Before launch, sign up once with email and once with Google on your phone. Confirm both reach `/dashboard` and onboarding, then delete the test users in Supabase.

## P1: safe, small fixes (in `dad-strength-app`)

- `/terms`, `/privacy`, `/disclaimer`: add a canonical, and their own `og:url` and `og:title`. Each currently tells share previews it is the home page.
- Sign-up and sign-in inputs have no `required` attribute, so an empty form still POSTs to Supabase and shows the raw server error. Add `required` and `minLength` to the inputs, and show the password rule before submit.
- When the request fails (network down, ad-blocker), the error box shows the raw browser text "Failed to fetch". Replace it with a human message.
- OG image: make a 1200×630 card with the headline and the session screenshot. The current 1500×500 logo banner gets cropped. Set `og:image:width`/`height` to match.
- Email sign-ups are auto-confirmed and get no email at all. A mistyped address makes an account nobody can recover. Turn on confirmation or send a welcome email.

## The 5 changes most likely to get a first-time visitor to sign up

1. **Make the page show up instantly (P0 #1).** Most first visits come from a phone tap on a social link. A blank screen for 4+ seconds loses many of them before they read a word, and nothing below the fold matters until this is fixed.
2. **Make "claim a founding spot" land on a sign-up form, not a sign-in form.** Today the big green button scrolls about 6,000 px to a card whose form is headed "sign in" with a "sign in with Google" button. The link to create an account is small grey text under the form. A new visitor reads "sign in" as "this is for people who already have an account." Default that card to sign-up ("claim your spot", "continue with Google", "create a password"), with "already have an account? sign in" as the secondary link.
3. **Show the consent screen as Dad Strength (P0 #2).** Google sign-in is the path the copy recommends ("sign in with google to claim a spot"), and its last step currently shows a Supabase project ID. Fixing it removes the biggest moment of doubt in the only sign-up path you promote.
4. **Make the "20 founding spots" number real and live** ("7 of 20 left"), shown next to the hero button. A fixed "20" reads as decoration, while a falling count gives a reason to act tonight instead of "later." Only do this if the number is true. Count it from Supabase.
5. **Add an email-only option for dads who aren't ready to make an account**, such as "not ready? get week 1 of Dad Built by email" or "save my spot, email me when the app is open." Many visitors, especially the ones coming over from Romans XII, won't create a password on their phone at 9 pm. Right now they leave with nothing, and you can't follow up.

## How this was tested

- Crawl: Playwright with the iPhone 13 profile. It visited every same-origin page linked from `/`, checked every link with a GET, and checked anchor targets in the DOM.
- Sign-up dry run: clicked "claim a founding spot", then "sign up", submitted empty and then with `launch-check@example.com`. Every non-GET request to Supabase was recorded and aborted, so nothing reached production.
- Speed: Lighthouse 13.5.0, mobile preset, on `/` and `/programs`.
- Supabase: read the public `/auth/v1/settings` with the anon key that ships in the page's JavaScript (read-only).
