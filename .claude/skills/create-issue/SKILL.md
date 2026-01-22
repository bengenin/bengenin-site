---
name: create-issue
description: Capture a bug/feature/improvement fast during development. Output a complete issue with title, TL;DR, current vs expected, files, risks, and labels.
argument-hint: "[quick note about the bug/feature]"
disable-model-invocation: true
---

You are helping me capture an issue fast while I keep coding. I am mid-flow.

Your goal: produce a complete issue with:
- Title
- TL;DR
- Current state vs expected outcome
- Up to 3 most relevant files to touch (after quick repo scan)
- Risks/notes (only if real)
- Labels: type (bug/feature/improvement), priority (low/normal/high), effort (S/M/L)

Rules:
- Ask at most 2-3 targeted questions in ONE message if needed.
- Skip questions if type/priority is obvious from my description.
- If helpful, quickly scan the repo to identify likely files/routes/components. Keep it to max 3 files.
- Keep the whole exchange under 2 minutes. Be brief.
- Bullet points over paragraphs.
- Default: priority=normal, effort=medium.

Output format (final answer):
## Title
## TL;DR
## Current state
## Expected outcome
## Scope
## Files to touch (max 3)
## Risks/notes
## Labels

My note: $ARGUMENTS
