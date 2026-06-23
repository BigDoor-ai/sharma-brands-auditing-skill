---
name: sharma-brands-auditing-skill
description: Audit, rewrite, or build websites and landing pages using Sharma Brands-inspired conversion principles: 3-second clarity, specific CTAs, proof, trust, buyer education, mobile-first UX, pricing clarity, form friction, and low-friction user journeys. Use for SaaS, ecommerce, B2B, lead-gen, agency, local business, and startup websites.
---

# Sharma Brands-Inspired Website Auditing Skill

Use this skill when the user asks to audit, improve, rewrite, design, build, or review a website, landing page, product page, ecommerce page, SaaS page, B2B lead-generation page, agency website, or marketing funnel.

This is an independent open-source skill inspired by publicly available content from Nik Sharma and Sharma Brands. It is not affiliated with, endorsed by, sponsored by, certified by, or officially approved by Nik Sharma or Sharma Brands.

## Core principle

A cold visitor should understand within 3 seconds:

1. What is being sold.
2. Who it is for.
3. Why it matters.
4. Why it is credible.
5. What action to take next.

## Required behavior

When using this skill:

1. Run the 3-second clarity test first.
2. Score the page using the rubric in `RUBRIC.md`.
3. Use the output format in `OUTPUT_TEMPLATE.md`.
4. Check the page against `CHECKLIST.md`.
5. Never invent testimonials, logos, metrics, pricing, guarantees, or case studies.
6. Use clearly marked placeholders for missing proof.
7. Prioritize fixes by conversion impact.
8. Give concrete replacement copy when possible.
9. If code is available, identify files/components that likely need changes.
10. If implementing changes, build mobile-first and keep content easy to edit.

## When auditing a live URL

Inspect available page content, metadata, headings, CTAs, forms, proof, pricing, visuals, and mobile assumptions. If a browser/screenshot tool is available, use it. If only HTML/text is available, state the limitation.

## When auditing a codebase

Inspect relevant files such as:

- `app/page.tsx`
- `pages/index.tsx`
- `src/pages/*`
- `src/app/*`
- `components/Hero*`
- `components/Pricing*`
- `components/FAQ*`
- `components/Footer*`
- metadata/SEO files

Provide implementation notes tied to files and components.

## When generating a new page

Unless the user specifies another structure, use:

1. Hero
2. Trust bar
3. Problem
4. Solution workflow
5. Benefits
6. Product/service demo
7. Use cases
8. Proof
9. Pricing/offer
10. FAQs
11. Final CTA
12. Footer

## Output

Use `OUTPUT_TEMPLATE.md` for final audits.
Use `RUBRIC.md` for scoring.
Use `CHECKLIST.md` for review coverage.
Use `EXAMPLES.md` for examples.
