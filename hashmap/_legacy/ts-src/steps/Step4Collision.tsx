import { useMemo, useState } from 'react';
import { computeHash, longestChain, type Buckets } from '../../lib/hashmap';
import BucketWall from '../BucketWall';
import StepFooter from '../StepFooter';

interface Step4CollisionProps {
  buckets: Buckets;
  onInsert: (key: string, value: string) => number;
  onBack: () => void;
  onContinue: () => void;
}

// "cat" and "act" are anagrams, so their character codes sum to the same
// total no matter the order - guaranteeing they land in the same drawer
// under a sum-of-char-codes hash, regardless of bucket count.
const COLLIDING_PAIR: [string, string][] = [
  ['cat', '🐱'],
  ['act', '🎭']
];

export default function Step4Collision({ buckets, onInsert, onBack, onContinue }: Step4CollisionProps) {
  const [demoRun, setDemoRun] = useState(false);

  const collisionIndex = useMemo(() => computeHash('cat').index, []);
  const maxChain = longestChain(buckets);

  function runDemo() {
    COLLIDING_PAIR.forEach(([k, v]) => onInsert(k, v));
    setDemoRun(true);
  }

  return (
    <section className="step">
      <h2>Collisions & chaining</h2>
      <p>
        Two different keys can land in the same drawer - a <strong>collision</strong>. With only{' '}
        {'7'} drawers and an unlimited number of possible keys, this is inevitable, not a bug.
      </p>
      <p>
        The usual fix is <strong>chaining</strong>: instead of one card per drawer, each drawer holds a
        small stack. Filing never fails - it just adds to the stack in that drawer.
      </p>

      <div className="button-row">
        <button type="button" className="button button--primary" onClick={runDemo} disabled={demoRun}>
          {demoRun ? 'Collision filed' : "File 'cat' and 'act' to force a collision"}
        </button>
      </div>

      {demoRun && (
        <p className="step-note">
          "cat" and "act" use the exact same letters, so they add up to the same character-code total -
          they're guaranteed to land in drawer {collisionIndex} together, no matter how the wall is
          sized.
        </p>
      )}

      <BucketWall buckets={buckets} highlightIndex={demoRun ? collisionIndex : null} highlightVariant="insert" />

      <p className="step-note">
        {maxChain > 1
          ? `Longest chain on the wall right now: ${maxChain} entries in one drawer.`
          : 'No drawer has more than one entry yet - run the demo above.'}
      </p>

      <StepFooter onBack={onBack} onContinue={onContinue} continueLabel="How do we find things again?" />
    </section>
  );
}
