# CSC 317 — Team Project (Fall 2026)

Intro to Web Software Development · San Francisco State University
Section 02 (Mon/Wed 11:00–12:15, Hensill 543) · Section 03 (Mon/Wed 2:00–3:15, Hensill 301)
Instructor: Andrew T. Scott (ats@sfsu.edu)

This is the shared working repository for the course project, and it grows across
all four milestones: static HTML/CSS → JavaScript → Node/Express → polished app.

## Team

| Name | GitHub | Role | Timezone |
|---|---|---|---|
| Vaughn Scott | @eyeoverthink | _fill in_ | Pacific |
| _teammate_ | _username_ | _fill in_ | |
| _teammate_ | _username_ | _fill in_ | |
| _teammate_ | _username_ | _fill in_ | |

## Important: what belongs in this repository

The course runs graded work through **GitHub Classroom**, under the `ats-sfsu`
organisation. Your individual assignments live in their own Classroom repos
(for example `csc317-f26-assignment-2-eyeoverthink`) and are submitted from there.

This repository is for the **project/milestone work and team coordination**. Keep
it to that, so graded individual submissions are never confused with shared code.
If the instructor tells you the milestones are graded per-team repo instead, move
the work here and say so in the team meeting notes.

Check the current assignment's own instructions before using any assistance on it.
Several CSC 317 assignments are explicitly **individual and hand-coded** — for
example Assignment 2 states the site "must be coded by hand … No using HTML
generators, AI, templates, frameworks". Rules like that apply to that assignment's
code, and a repository scaffold does not override them.

## Stack

Node + Express serving a static `public/` directory on port 3000 — this matches the
skeleton the course provides, so milestone 3 (backend) drops in without rework.

## Run it locally

```bash
npm install
npm start
# open http://localhost:3000
```

## Layout

```
public/            the site itself (index.html is the entry page)
public/css/        stylesheets
public/images/     image assets
server.js          Express server, serves public/ on port 3000
docs/              team workflow, milestone plan, meeting notes
```

## Milestones

| # | Date | Deliverable |
|---|---|---|
| 1 | 9/30 | HTML/CSS static prototype — semantic, responsive, accessible |
| 2 | 10/21 | JavaScript interactivity — DOM, events, validation |
| 3 | 11/18 | Node/Express backend — routes, POST handling, persistence |
| 4 | 12/14 (Sec 03) · 12/16 (Sec 02) | Polished full-stack app |

See `docs/MILESTONES.md` for what each one needs.

## Working together

Read `docs/CONTRIBUTING.md` first. Short version: never commit to `main` directly,
branch per task, open a pull request, one reviewer merges. `main` stays
demo-able at all times — it is what you present from.

## Deploying

`main` deploys `public/` to GitHub Pages via `.github/workflows/pages.yml`.
Pages on a private repository requires a paid GitHub plan; if the action fails with
a plan error, either make the repository public or deploy from a teammate's account.
