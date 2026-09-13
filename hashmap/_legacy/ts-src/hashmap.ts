// Core, dependency-free hashmap engine used to drive the tutorial's
// interactive visualizations. Deliberately simple (sum-of-char-codes)
// so the arithmetic is easy to show step by step.

export interface HashEntry {
  key: string;
  value: string;
}

export type Buckets = HashEntry[][];

export const BUCKET_COUNT = 7;

export function createBuckets(count: number = BUCKET_COUNT): Buckets {
  return Array.from({ length: count }, () => []);
}

export interface HashComputation {
  key: string;
  charCodes: number[];
  sum: number;
  index: number;
  bucketCount: number;
}

export function computeHash(key: string, bucketCount: number = BUCKET_COUNT): HashComputation {
  const charCodes = Array.from(key).map((ch) => ch.charCodeAt(0));
  const sum = charCodes.reduce((total, code) => total + code, 0);
  const index = bucketCount === 0 ? 0 : sum % bucketCount;
  return { key, charCodes, sum, index, bucketCount };
}

export function insertEntry(
  buckets: Buckets,
  key: string,
  value: string,
  bucketCount: number = BUCKET_COUNT
): { buckets: Buckets; index: number } {
  const { index } = computeHash(key, bucketCount);
  const next = buckets.map((bucket) => [...bucket]);
  const existingIdx = next[index].findIndex((entry) => entry.key === key);
  if (existingIdx >= 0) {
    next[index][existingIdx] = { key, value };
  } else {
    next[index].push({ key, value });
  }
  return { buckets: next, index };
}

export function deleteEntry(
  buckets: Buckets,
  key: string,
  bucketCount: number = BUCKET_COUNT
): { buckets: Buckets; index: number } {
  const { index } = computeHash(key, bucketCount);
  const next = buckets.map((bucket) => [...bucket]);
  next[index] = next[index].filter((entry) => entry.key !== key);
  return { buckets: next, index };
}

export interface LookupResult {
  entry: HashEntry | undefined;
  index: number;
  probes: number;
}

export function findEntry(buckets: Buckets, key: string, bucketCount: number = BUCKET_COUNT): LookupResult {
  const { index } = computeHash(key, bucketCount);
  const bucket = buckets[index];
  let probes = 0;
  let found: HashEntry | undefined;
  for (const entry of bucket) {
    probes += 1;
    if (entry.key === key) {
      found = entry;
      break;
    }
  }
  return { entry: found, index, probes };
}

export function totalEntries(buckets: Buckets): number {
  return buckets.reduce((total, bucket) => total + bucket.length, 0);
}

export function longestChain(buckets: Buckets): number {
  return buckets.reduce((max, bucket) => Math.max(max, bucket.length), 0);
}
