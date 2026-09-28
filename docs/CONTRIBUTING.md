# How we work

## Branches

Never commit to `main` directly. One branch per task:

```bash
git checkout main && git pull
git checkout -b your-name/short-task-name
```

Prefix with your name so it is obvious who owns it and who to ask. Examples:
`vaughn/contact-form`, `alex/responsive-nav`, `sam/images`.

## Commits

Small and described. Start with what changed, in the imperative:

```
Add contact form fields and labels
Fix nav overlap at 480px
```

If Git complains about line endings on Windows, set it once:

```bash
git config --global core.autocrlf input
```

## Pull requests

Open a PR as soon as the branch is pushed, even if it is still a draft. Put a
short description of what changed and how to check it. Then ask one teammate to
review — do not merge your own PR.

Review means: pull the branch, run it, click through it. Approve, or leave a
comment saying what to change.

## Keeping main presentable

`main` is what you demo from. Merge only working code. If something half-finished
has to land, guard it or leave it on your branch.

## Before a milestone

1. Merge everything that is done.
2. Pull `main` fresh and run it: `npm install && npm start`.
3. Fix anything broken.
4. Tag it so there is a record of what was presented:

```bash
git tag -a milestone-1 -m "Milestone 1 as presented"
git push origin milestone-1
```

## Meetings

Keep notes in `docs/MEETINGS.md` — date, who was there, what was decided, who is
doing what next. It takes a minute and it settles every "I thought you were doing
that" later. Use the issue form for tasks so work is visible to everyone.
