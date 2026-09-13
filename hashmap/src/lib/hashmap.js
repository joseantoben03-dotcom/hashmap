// Core, dependency-free hashmap engine used to drive the tutorial's
// interactive visualizations. Deliberately simple (sum-of-char-codes)
// so the arithmetic is easy to show step by step.

export const BUCKET_COUNT = 7;

export function createBuckets(count = BUCKET_COUNT) {
  return Array.from({ length: count }, () => []);
}

export function computeHash(key, bucketCount = BUCKET_COUNT) {
  const charCodes = Array.from(key).map((ch) => ch.charCodeAt(0));
  const sum = charCodes.reduce((total, code) => total + code, 0);
  const index = bucketCount === 0 ? 0 : sum % bucketCount;
  return { key, charCodes, sum, index, bucketCount };
}

export function insertEntry(buckets, key, value, bucketCount = BUCKET_COUNT) {
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

export function deleteEntry(buckets, key, bucketCount = BUCKET_COUNT) {
  const { index } = computeHash(key, bucketCount);
  const next = buckets.map((bucket) => [...bucket]);
  next[index] = next[index].filter((entry) => entry.key !== key);
  return { buckets: next, index };
}

export function findEntry(buckets, key, bucketCount = BUCKET_COUNT) {
  const { index } = computeHash(key, bucketCount);
  const bucket = buckets[index];
  let probes = 0;
  let found;
  for (const entry of bucket) {
    probes += 1;
    if (entry.key === key) {
      found = entry;
      break;
    }
  }
  return { entry: found, index, probes };
}

export function totalEntries(buckets) {
  return buckets.reduce((total, bucket) => total + bucket.length, 0);
}

export function longestChain(buckets) {
  return buckets.reduce((max, bucket) => Math.max(max, bucket.length), 0);
}
