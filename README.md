# Sharma Brands-Inspired Website Auditing Skill

**Inspired by what Nik Sharma publicly teaches. Built for founders and agents who want clearer, higher-converting websites.**

An open-source skill for **Codex, Claude Code, Cursor, Aider, OpenCode, Gemini CLI, and other coding agents** to audit websites and landing pages for conversion clarity, trust, proof, CTA quality, buyer education, mobile-first UX, and low-friction journeys.

> **Disclaimer:** This is an independent open-source project inspired by publicly available content from Nik Sharma and Sharma Brands. It is not affiliated with, endorsed by, sponsored by, certified by, or officially approved by Nik Sharma or Sharma Brands.

## What it checks

This skill helps coding agents review whether a cold visitor can understand your offer within 3 seconds, trust it, and take the next step without confusion.

It audits:

- 3-second clarity
- Hero section quality
- CTA specificity
- Trust and proof
- Buyer education
- Mobile-first UX
- Form and lead-capture friction
- Pricing and offer clarity
- Visual explanation
- Technical basics
- Missing objections and FAQs

## Who this is for

Use it if you are building or auditing:

- SaaS landing pages
- DTC/ecommerce product pages
- B2B lead-generation websites
- Agency websites
- Local business websites
- Startup homepages
- Waitlist pages
- Campaign-specific landing pages

## Works with

- Claude Code via `.claude/skills/sharma-brands-auditing-skill/SKILL.md`
- Codex via `AGENTS.md`
- Any agent that can read Markdown instructions
- Optional Node.js helper script for basic URL extraction

## Quick start: Claude Code

Install globally:

```bash
mkdir -p ~/.claude/skills/sharma-brands-auditing-skill
cp .claude/skills/sharma-brands-auditing-skill/* ~/.claude/skills/sharma-brands-auditing-skill/
```

Use it:

```text
/sharma-brands-auditing-skill Audit https://example.com for conversion friction.
```

Or inside a project repo, keep this folder committed:

```text
.claude/skills/sharma-brands-auditing-skill/SKILL.md
```

## Quick start: Codex

Use project-specific instructions:

```bash
cp AGENTS.md ./AGENTS.md
codex "Audit this website codebase using the Sharma Brands-inspired website auditing skill."
```

Or append to global Codex instructions:

```bash
mkdir -p ~/.codex
cat AGENTS.md >> ~/.codex/AGENTS.md
```

## Quick start: any coding agent

Paste this prompt:

```text
Use the Sharma Brands-inspired website auditing framework from AGENTS.md.
Audit this website/page/codebase for 3-second clarity, hero quality, CTA quality, trust/proof, buyer education, mobile UX, forms, pricing clarity, visual explanation, and conversion friction.
Do not invent testimonials, logos, metrics, pricing, guarantees, or case studies. Use placeholders where proof is missing.
```

## Optional URL scan script

This repo includes a lightweight Node.js script that extracts basic page data from a URL and produces a rough audit skeleton.

```bash
npm install
npm run audit -- https://example.com
```

The script is intentionally simple. The real value is the agent rubric and review framework, not pretending a regex scraper can replace a conversion expert. Humanity does keep trying, though.

## Scoring rubric

| Category | Points |
|---|---:|
| 3-second clarity | 15 |
| Hero section | 10 |
| CTA specificity | 10 |
| Trust/proof | 15 |
| Buyer education | 10 |
| Friction removal | 10 |
| Mobile-first UX | 10 |
| Forms / lead capture | 5 |
| Pricing / offer clarity | 5 |
| Visual explanation | 5 |
| Technical basics | 5 |
| **Total** | **100** |

## Standard audit output

Every audit should produce:

1. Overall score
2. Executive summary
3. 3-second clarity test
4. Hero review
5. CTA review
6. Trust/proof review
7. Friction points
8. Mobile-first review
9. Buyer objections not answered
10. Suggested page structure
11. Priority fixes
12. Suggested replacement copy
13. Implementation notes for coding agents

See [`OUTPUT_TEMPLATE.md`](.claude/skills/sharma-brands-auditing-skill/OUTPUT_TEMPLATE.md).

## Core principle

A good website is not judged by whether it looks impressive in a screenshot.

It is judged by whether a cold visitor understands the offer, trusts it, and can take the next step without confusion.

## License

MIT. Use it, fork it, improve it, ship better websites.
