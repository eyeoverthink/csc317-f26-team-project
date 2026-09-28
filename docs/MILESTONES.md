# Milestone plan

One project, four milestones. `main` stays demo-able at every point, because
`main` is what gets presented.

## Milestone 1 — 9/30 — HTML/CSS static prototype

- Multi-page: home, about, contact, plus whatever else the site needs.
- Semantic HTML5 only. No JavaScript yet.
- Navigation consistent and working from every page to every other page.
- Layout with CSS Grid, components with Flexbox.
- Responsive at three breakpoints.
- One accessible form (labelled inputs, logical tab order).
- WCAG-AA basics: labels, alt text, contrast, keyboard reachable.
- Deployed (GitHub Pages) so it can be demoed from a URL.

## Milestone 2 — 10/21 — JavaScript interactivity

- DOM manipulation and event handling.
- Form validation client-side.
- Content that updates without a page reload.
- Still front-end only.

## Milestone 3 — 11/18 — Node/Express backend

- Express routes and middleware.
- Serve the pages from the server.
- Handle form POSTs.
- Persist data (JSON file or simple DB).
- At least one full round trip: form → server → stored → displayed.

## Milestone 4 — 12/14–16 — Final

- Everything integrated and polished.
- Accessibility gaps closed.
- Code cleaned, README written.
- Deployed, documented, end-to-end working.

## Design ahead

Build milestone 1's forms and lists with milestone 3 in mind. What a form collects
in HTML is what the server will later store — if those two line up, milestone 3 is
wiring rather than rewriting.
