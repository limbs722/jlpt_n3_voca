#!/usr/bin/env node
/**
 * Seed Supabase with the bundled JLPT N3 vocabulary.
 *
 * Usage (run from project root):
 *   NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed-supabase.mjs
 *
 * Uses the service role key (server-only) because it bypasses RLS and lets you
 * upsert all words in one go. Do NOT expose this key in the browser.
 */

import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.');
  process.exit(1);
}

// The seed data is bundled as TypeScript source. We dynamic-import it after
// transpiling via the tsx loader so this script is "npm run"-able without
// a build step. Fallback: read the TS file with regex if tsx is unavailable.
let SEED_WORDS;
try {
  // tsx hook lets us import .ts files
  await import('tsx/esm');
  ({ SEED_WORDS } = await import('../src/shared/config/seed-data/words.ts'));
} catch {
  console.error('tsx loader failed — run with: npx tsx scripts/seed-supabase.mjs');
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

const upsertWord = async (word) => {
  const { examples, ...row } = word;
  const { error } = await supabase.from('words').upsert(row, { onConflict: 'id' });
  if (error) throw error;

  if (examples && examples.length > 0) {
    // replace examples for this word
    await supabase.from('examples').delete().eq('word_id', word.id);
    const { error: exErr } = await supabase.from('examples').insert(
      examples.map((e) => ({
        word_id: word.id,
        sentence_jp: e.sentence_jp,
        sentence_ko: e.sentence_ko,
      })),
    );
    if (exErr) throw exErr;
  }
};

let ok = 0;
let fail = 0;
for (const word of SEED_WORDS) {
  try {
    await upsertWord(word);
    ok += 1;
    if (ok % 25 === 0) console.log(`  ${ok} words seeded...`);
  } catch (e) {
    fail += 1;
    console.error('failed:', word.id, word.kanji ?? word.reading, e.message);
  }
}

console.log(`\nDone. seeded=${ok} failed=${fail} total=${SEED_WORDS.length}`);
process.exit(fail > 0 ? 1 : 0);
