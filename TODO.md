# TODO

## Navigation, portrait and introductory sequence
- [x] Build a fixed, centered glassmorphism navigation pill with brand “PHOENIX '26”, status “16 y/o dev • 11th PCM • Available” and soft green indicator, links Home, About, Work, Badges, Contact, and a “Say Hello” button that scrolls to Contact. Keep the navbar at `z-50` with high backdrop blur and a smooth Sun/Moon theme switch. Add subtle magnetic cursor tracking and active scale (`scale-95`, 100ms) to “Say Hello”, “View Full Google Skills Profile”, and “Copy Email Address”.
- [x] Set `scroll-margin-top: 140px` (`scroll-mt-36`) and matching page scroll padding on major sections/headings `#about`, `#work`, `#badges`, and `#contact`, so the fixed navbar does not clip titles.
- [x] Build the centered “PORTFOLIO '26” title with playful letter heights and balanced kerning; do not stretch it to 100vw. Place Phoenix's authentic transparent portrait as foreground (z-10) over the background text (z-0); remove the yellow/tan circle behind the portrait and apply the bottom mask `linear-gradient(to bottom, black 80%, transparent 100%)` for a smooth lower-chest fade without a hard rectangular edge.
- [x] Add a hanging lanyard identity badge with Phoenix's small photo, name, “11th Grade PCM • Android Dev”, and “Visakhapatnam, India”.
- [x] Add an approximately 1.2-second charcoal intro curtain on first visit. Animate a monospace percentage from 00% to 100% with the label “// INITIALIZING PHOENIX OS”; wipe the overlay upward. Stagger the wordmark from scale .95 to 1, fade/lift the portrait, and drop the lanyard badge with a subtle bounce. Store a `sessionStorage` flag so the curtain plays once per visit, and add a small accessible Replay icon in the footer.

## About and profile specifications
- [x] Present heading “Hi, I'm Phoenix” and the exact bio: “I'm a 16-year-old self-taught developer from India currently in 11th grade studying Physics, Chemistry, and Math (PCM). When I'm not preparing for exams, I build lightweight Android apps in Kotlin and local-first web tools. I’ve also trained on the Saraswati Veena for 10 years, which taught me discipline and precision.”
- [x] Show metadata: Education — 11th Grade PCM Track (CBSE); Core Stack — Kotlin, Jetpack Compose, Skia 2D, Material 3, Android Studio; Web & Systems — TypeScript, WebAssembly, FFmpeg.wasm, React; Cloud — Google Cloud Platform, Terraform, BigQuery.
- [x] Reveal headings with a staggered line transition when they enter the viewport.

## Five-project showcase
- [x] Create five horizontal columns on desktop and vertically stacked cards on mobile, with huge outlined numbers “01 02 03 04 05” and accent colors sky blue #2563EB/#3B82F6, sand #C2A676/#D4B270, sage #4A6B53/#5B7A62, rust #C24134/#B9382B, and periwinkle #5B6FB5/#6879BC. Each colored card has a device mockup at top and giant white numeral at the base; no giant blocks of text or multiple buttons inside cards.
- [x] Project 1: Android smartphone mockup; “Material UI 3 Wallpaper Studio”; “Procedural geometric wallpapers on-device via Skia & Compose. No internet needed.”; GitHub (`https://github.com/phoenixdevellopment75-web`) and Get APK (v2.0.0) links.
- [x] Project 2: browser window mockup; “Classmates Hub”; “Alumni memory vault and class directory built for my 10th-grade batch.”; Explore Repo (`https://github.com/phoenixdevellopment75-web`).
- [x] Project 3: dual device/browser mockup; “In-Browser File Converter”; “100% private media converter running locally via WebAssembly and FFmpeg.wasm.”; Launch Tool (`https://phoenixdevellopment75-web.github.io/`).
- [x] Project 4: laptop mockup showing dark timer; “Focus Clock”; “Minimal Pomodoro timer with pleasant synthesized Web Audio frequencies.”; View Repo (`https://github.com/phoenixdevellopment75-web`).
- [x] Project 5: stacked Google Cloud certification cards; “Google Cloud Credentials”; “7 verified hands-on challenge badges across BigQuery, Terraform, and AI agents.”; Inspect Badges (`#badges`).
- [x] Set work heading to “Things I've Built” and subtext to “Real tools running on real devices. No clones, no fake demo wrappers.” On hover, each project card lifts 8px, shows a 1px cursor-following border glow, and scales its large numeral slightly.

## Verified credentials and theme
- [x] Add heading “Verified Cloud Credentials” and subtext “7 verified skill badges earned through hands-on architecture labs on Google Cloud.” Add filter tabs All Badges (7), AI & Agents (3), Cloud (2), DevSecOps (1), Foundational (1).
- [x] Show each badge title, issue date, tag pills, and verified external link: Orchestrate Multi-Agent Workflows with Gemini Enterprise (Aug 1, 2026); Build Your First Agent with Agent Development Kit (ADK) (Aug 1, 2026); Create Your First Gemini Enterprise Application (Aug 1, 2026); Build a Data Warehouse with BigQuery (Jul 31, 2026); Build Infrastructure with Terraform on Google Cloud (Jul 24, 2026); Arcade Base Camp July 2026 (Jul 24, 2026); Secure Software Delivery (Jul 23, 2026). Include “View Full Google Skills Profile” to Phoenix's public profile.
- [x] On badge-row hover, highlight the row and smoothly slide the external-link icon outward.
- [x] Implement light and dark themes with 250ms transitions across sections, cards, and footer. Light: background #F7F4EE, cards/containers #EFEBE3, headings #111111, body #4B5563, borders #E2DDD4. Dark: background #0C0C0E, cards/containers #161619, headings #F3F4F6, body #9CA3AF, borders #27272A.

## Contact and footer
- [x] Add “Connect & Collaborate” and social channels GitHub `https://github.com/phoenixdevellopment75-web`, Instagram `@phoenix_veena`, and Telegram `@phoenixEditz75`.
- [x] “Copy Email Address” is magnetic and changes to “Copied! ✓” for 2.5 seconds when copying Phoenix's contact email (phoenixdevellopment75@gmail.com).
- [x] Set contact subtext to “Building an Android app, want to team up on an open-source tool, or talk tech? Reach out below.”
- [x] Footer left: “© 2026 Phoenix • 16-year-old Android & Web Developer • 11th Grade PCM • Licensed under Apache-2.0”; center shortcuts Home, About, Work, Badges, Contact; right smooth-scroll “Back to Top ↑”. Add a small Replay intro icon control.

## Revised human copy and technical constraints
- [x] Hero copy: “Hey, I'm Phoenix. 16-year-old self-taught developer from India. When I'm not studying 11th grade PCM, I build fast Android apps in Kotlin and local web tools. Saraswati Veena player for 10 years.”
- [x] Use Vite, React, and Tailwind CSS. Keep the clean editorial aesthetic, zero generic purple SaaS gradients, zero AI-slop text, and no harmonic string oscillator canvas or stretched viewport fonts.
- [x] Keep the website responsive, preserve the five-column project layout on desktop and stacked cards on mobile, respect reduced-motion preferences, and use `target="_blank"` plus `rel="noopener noreferrer"` on all external links.
