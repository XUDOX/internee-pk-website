<instructions>
## 🚨 MANDATORY: CHANGELOG TRACKING 🚨

You MUST maintain this file to track your work across messages. This is NON-NEGOTIABLE.

---

## INSTRUCTIONS

- **MAX 5 lines** per entry - be concise but informative
- **Include file paths** of key files modified or discovered
- **Note patterns/conventions** found in the codebase
- **Sort entries by date** in DESCENDING order (most recent first)
- If this file gets corrupted, messy, or unsorted -> re-create it.
- CRITICAL: Updating this file at the END of EVERY response is MANDATORY.
- CRITICAL: Keep this file under 300 lines. You are allowed to summarize, change the format, delete entries, etc., in order to keep it under the limit.

</instructions>

<changelog>

## 2026-03-26 - Full Interactivity, Animations & Responsiveness Pass

- **Fixed:** Removed `opacity-0` from all section wrappers in `src/App.tsx` - sections were invisible
- **Added:** `src/components/ScrollReveal.tsx` - IntersectionObserver-based scroll reveal with direction/delay support
- **Added:** `src/hooks/useScrollReveal.ts` - reusable scroll hook
- **Navbar:** Full mobile drawer with animated hamburger, smooth-scroll anchors, Resources dropdown, scroll-shadow
- **Hero:** Staggered slide-up entrance animations on load
- **Partners:** Hover grayscale-to-color transition on logos
- **Internships:** Scroll-reveal cards, image zoom on hover, card lift on hover
- **TaskPortal/MockInterview:** Scroll reveals, hover border highlight on dark cards
- **HowItWorks:** Steps animate in with staggered delays, sticky left column preserved
- **Testimonials:** Fully functional slider with 4 testimonials, prev/next controls, dot indicators
- **Footer newsletter:** Client-side validation with success/error states
- **All CTAs/buttons:** hover + active:scale-95 press feedback, transition-all duration-200
- **Footer links:** Internal smooth-scroll, hover:text-white transitions
- **tailwind.config.js:** Added `fade-in`, `slide-up`, `marquee` keyframe animations

</changelog>