#!/usr/bin/env node
import process from 'node:process';

const HELP = `
Usage:
  npm run audit -- https://example.com
  node scripts/audit-url.mjs https://example.com --json

This lightweight scanner extracts basic page signals and prints a conversion-audit skeleton.
It does not replace a full human/agent review. Shocking, yes: regex is not a strategist.
`;

const url = process.argv.find((arg) => /^https?:\/\//i.test(arg));
const jsonOnly = process.argv.includes('--json');

if (process.argv.includes('--help')) {
  console.log(HELP.trim());
  process.exit(0);
}

if (!url) {
  console.log(HELP.trim());
  process.exit(1);
}

function stripTags(input = '') {
  return input
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function matchAll(html, regex, mapper) {
  return [...html.matchAll(regex)].map(mapper).filter(Boolean);
}

function unique(list) {
  return [...new Set(list.map((x) => String(x).trim()).filter(Boolean))];
}

function firstText(html, tag) {
  const match = html.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\/${tag}>`, 'i'));
  return match ? stripTags(match[1]) : '';
}

function extract(html) {
  const title = firstText(html, 'title');
  const metaDescription = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i)?.[1]
    || html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i)?.[1]
    || '';

  const h1 = matchAll(html, /<h1[^>]*>([\s\S]*?)<\/h1>/gi, (m) => stripTags(m[1]));
  const h2 = matchAll(html, /<h2[^>]*>([\s\S]*?)<\/h2>/gi, (m) => stripTags(m[1]));
  const buttons = matchAll(html, /<button[^>]*>([\s\S]*?)<\/button>/gi, (m) => stripTags(m[1]));
  const links = matchAll(html, /<a[^>]*>([\s\S]*?)<\/a>/gi, (m) => stripTags(m[1]));
  const inputs = matchAll(html, /<(input|textarea|select)\b[^>]*>/gi, (m) => m[0]);
  const images = matchAll(html, /<img\b[^>]*>/gi, (m) => m[0]);
  const imgAlt = images.map((tag) => tag.match(/alt=["']([^"']*)["']/i)?.[1] || '').filter(Boolean);

  const ctaWords = /(book|demo|buy|start|get|request|try|contact|call|quote|pricing|audit|download|signup|sign up|subscribe|join|shop|checkout|whatsapp)/i;
  const ctas = unique([...buttons, ...links].filter((text) => ctaWords.test(text)));
  const proofWords = /(trusted|clients|customers|reviews|case study|testimonial|featured|press|used by|rated|logos|partners)/i;
  const pricingWords = /(pricing|price|plans|package|subscription|free|trial|₹|\$|usd|inr|month|annual|year)/i;
  const fullText = stripTags(html).slice(0, 50000);

  return {
    url,
    title,
    metaDescription,
    h1,
    h2: h2.slice(0, 20),
    ctas: ctas.slice(0, 30),
    formFieldCount: inputs.length,
    imageCount: images.length,
    imageAltSamples: imgAlt.slice(0, 20),
    signals: {
      hasProofLanguage: proofWords.test(fullText),
      hasPricingLanguage: pricingWords.test(fullText),
      hasMetaDescription: Boolean(metaDescription),
      hasOpenGraph: /property=["']og:/i.test(html),
      hasViewport: /name=["']viewport["']/i.test(html),
    },
    textSample: fullText.slice(0, 1200),
  };
}

function score(data) {
  const hasH1 = data.h1.length > 0;
  const h1Text = data.h1.join(' ');
  const hasSpecificCTA = data.ctas.some((cta) => /(book|request|try|get|start|buy|quote|demo|pricing|whatsapp)/i.test(cta));
  const hasBuyerishWords = /(for|teams|brands|founders|retailers|agencies|clinics|stores|businesses|customers|sales|marketing|ecommerce|saas)/i.test(h1Text + ' ' + data.textSample);

  return {
    clarity: Math.min(15, (hasH1 ? 6 : 0) + (hasBuyerishWords ? 5 : 0) + (hasSpecificCTA ? 4 : 0)),
    hero: Math.min(10, (hasH1 ? 4 : 0) + (data.imageCount > 0 ? 3 : 0) + (data.ctas.length > 0 ? 3 : 0)),
    cta: Math.min(10, data.ctas.length > 0 ? (hasSpecificCTA ? 8 : 5) : 0),
    proof: data.signals.hasProofLanguage ? 8 : 2,
    education: data.h2.length >= 4 ? 8 : Math.max(2, data.h2.length * 2),
    friction: data.formFieldCount <= 5 ? 8 : 5,
    mobile: data.signals.hasViewport ? 7 : 2,
    forms: data.formFieldCount === 0 ? 2 : (data.formFieldCount <= 5 ? 4 : 2),
    pricing: data.signals.hasPricingLanguage ? 4 : 1,
    visual: data.imageCount > 0 ? 4 : 1,
    technical: Math.min(5, (data.signals.hasMetaDescription ? 2 : 0) + (data.signals.hasOpenGraph ? 2 : 0) + (data.signals.hasViewport ? 1 : 0)),
  };
}

function markdown(data, scores) {
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const h1 = data.h1[0] || '[No H1 found]';
  const ctas = data.ctas.length ? data.ctas.map((x) => `- ${x}`).join('\n') : '- [No obvious CTA found]';
  const h2s = data.h2.length ? data.h2.map((x) => `- ${x}`).join('\n') : '- [No H2 sections found]';

  return `# Website Conversion Audit Skeleton\n\nURL: ${data.url}\n\n## Overall Heuristic Score\n\n**${total}/100**\n\nThis is an automated first-pass score. Use the agent skill rubric for the final review.\n\n## Extracted Page Signals\n\n**Title:** ${data.title || '[Missing]'}\n\n**Meta description:** ${data.metaDescription || '[Missing]'}\n\n**Primary H1:** ${h1}\n\n## Detected CTAs\n\n${ctas}\n\n## Detected Section Headings\n\n${h2s}\n\n## Scorecard\n\n| Category | Score |\n|---|---:|\n| 3-second clarity | ${scores.clarity}/15 |\n| Hero section | ${scores.hero}/10 |\n| CTA specificity | ${scores.cta}/10 |\n| Trust/proof | ${scores.proof}/15 |\n| Buyer education | ${scores.education}/10 |\n| Friction removal | ${scores.friction}/10 |\n| Mobile-first UX | ${scores.mobile}/10 |\n| Forms / lead capture | ${scores.forms}/5 |\n| Pricing / offer clarity | ${scores.pricing}/5 |\n| Visual explanation | ${scores.visual}/5 |\n| Technical basics | ${scores.technical}/5 |\n\n## Immediate Review Prompts for Agent\n\n1. Can a cold visitor understand the offer within 3 seconds?\n2. Is the H1 specific enough, or is it vague positioning?\n3. Are CTAs specific and action-oriented?\n4. Is proof visible early enough?\n5. Does the page answer buyer objections before asking for action?\n6. Are forms short and low-friction?\n7. Is pricing or offer direction clear enough?\n8. Do visuals explain the offer or merely decorate the page?\n\n## Raw Text Sample\n\n${data.textSample}\n`;
}

try {
  const res = await fetch(url, { headers: { 'user-agent': 'sharma-brands-auditing-skill/0.1' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const html = await res.text();
  const data = extract(html);
  const scores = score(data);
  if (jsonOnly) {
    console.log(JSON.stringify({ data, scores }, null, 2));
  } else {
    console.log(markdown(data, scores));
  }
} catch (err) {
  console.error(`Failed to audit URL: ${err.message}`);
  process.exit(1);
}
