<instructions>
This file will be automatically added to your context.
It serves multiple purposes:
1. Storing frequently used tools so you can use them without searching each time
2. Recording the user's code style preferences (naming conventions, preferred libraries, etc.)
3. Maintaining useful information about the codebase structure and organization
4. Remembering tricky quirks from this codebase

When you spend time searching for certain configuration files, tricky code coupled dependencies, or other codebase information, add that to this CODER.md file so you can remember it for next time.
Keep entries sorted in DESC order (newest first) so recent knowledge stays in prompt context if the file is truncated.
</instructions>

<coder>

## Project: Internee.pk Landing Page

### Stack
- React 18 + TypeScript + Vite + Tailwind CSS 3
- Font: Outfit (woff2 from internee.pk CDN)
- No animation library – using CSS keyframes + IntersectionObserver

### Key Patterns
- `src/components/ScrollReveal.tsx` – reusable scroll-reveal wrapper (direction, delay props)
- `src/hooks/useScrollReveal.ts` – raw hook version
- Tailwind custom keyframes: `fade-in`, `slide-up` defined in `tailwind.config.js`
- Section IDs for nav scroll: `#hero`, `#internships`, `#career-launch`, `#how-it-works`, `#ai-career`, `#task-portal`, `#mock-interview`

### Navbar
- State: `mobileOpen` (drawer toggle), `scrolled` (shadow)
- Mobile drawer slides in from right on `translate-x-full` -> `translate-x-0`
- Hamburger animates to x via span transforms
- `NavbarLogo` / `DesktopMenu` / `NavbarActions` accept props from parent `Navbar`

### Sections opacity-0 issue (FIXED)
- Original code had `opacity-0` wrapper divs on most sections – all removed in App.tsx

### Image assets base URL
- `https://c.animaapp.com/mn6zjopx2BPW1k/assets/` – all icon/image assets

</coder>