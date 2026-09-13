# Hashmap: A Field Guide

An interactive, six-step tutorial that teaches how hashmaps work, using a
card-catalog metaphor: keys are filed into numbered drawers (buckets) by a
hash function, with visual demos of hashing, insertion, collisions/chaining,
lookup, and deletion. Progress is saved to an Express + MongoDB backend when
available, and falls back to the browser's local storage otherwise.

## Steps

1. **What is a hashmap?** - the drawer/pigeonhole analogy.
2. **The hash function** - type a key, watch the arithmetic (sum of char
   codes mod bucket count) pick a drawer live.
3. **Filing entries** - actually insert key/value pairs into the shared
   bucket wall that carries through the rest of the tutorial.
4. **Collisions & chaining** - force a guaranteed collision ("cat" / "act",
   anagrams) and see chaining resolve it.
5. **Lookup & delete** - search a key, see which cards get probed, then
   delete it.
6. **Complexity & recap** - average vs. worst-case Big-O for each operation.

## Running locally

### Backend (`../backend`)

```bash
cd ../backend
npm install
# fill in MONGODB_URI in .env with your own Atlas connection string
npm run dev
```

### Frontend (this folder)

```bash
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`). The app
works immediately even without the backend running - it just tracks
progress in `localStorage` and shows "Progress kept on this device" in the
sidebar until the backend is reachable.

## Environment variables

`.env` (already present):

```
VITE_API_BASE_URL=http://localhost:5000/api
```

Change this if your backend runs somewhere else.

## Project structure

```
src/
  lib/hashmap.ts            # pure hashing/insert/lookup/delete logic
  hooks/useProgress.ts       # progress state + backend sync + localStorage fallback
  data/steps.ts               # step metadata for the sidebar
  components/
    BucketWall.tsx             # the visual drawer wall
    HashWorking.tsx             # live "char codes -> sum -> mod" strip
    StepSidebar.tsx               # left-hand step navigation ("drawers")
    StepFooter.tsx                 # shared back/continue controls
    steps/                          # one component per tutorial step
```
