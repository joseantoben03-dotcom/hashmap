import { useMemo, useState } from 'react';
import { BUCKET_COUNT, computeHash, createBuckets } from '../../lib/hashmap';
import BucketWall from '../BucketWall';
import HashWorking from '../HashWorking';
import StepFooter from '../StepFooter';

interface Step2HashFunctionProps {
  onBack: () => void;
  onContinue: () => void;
}

const EMPTY_BUCKETS = createBuckets();

export default function Step2HashFunction({ onBack, onContinue }: Step2HashFunctionProps) {
  const [key, setKey] = useState('');
  const [tried, setTried] = useState(false);

  const computation = useMemo(() => (key.trim() ? computeHash(key.trim(), BUCKET_COUNT) : null), [key]);

  return (
    <section className="step">
      <h2>The hash function</h2>
      <p>
        Our wall has {BUCKET_COUNT} drawers, numbered 0 to {BUCKET_COUNT - 1}. To pick a drawer for a
        key, we'll use a small rule: add up the character codes of every letter in the key, then take
        the remainder after dividing by {BUCKET_COUNT}.
      </p>
      <p>Try typing a key below and watch the arithmetic work itself out.</p>

      <div className="field-row">
        <label htmlFor="hash-key">Key</label>
        <input
          id="hash-key"
          type="text"
          value={key}
          onChange={(event) => {
            setKey(event.target.value);
            if (event.target.value.trim()) setTried(true);
          }}
          placeholder="e.g. apple"
          maxLength={24}
        />
      </div>

      <HashWorking computation={computation} />

      <BucketWall buckets={EMPTY_BUCKETS} highlightIndex={computation?.index ?? null} highlightVariant="compute" />

      <p className="step-note">
        Real hashmaps use denser math (bit-shuffling, multiplication by large primes) so keys spread out
        more evenly — but the idea is identical: turn a key into a number, then into a drawer index.
      </p>

      <StepFooter
        onBack={onBack}
        onContinue={onContinue}
        continueLabel="Now let's actually file something"
        hint={tried ? undefined : 'Try at least one key before moving on.'}
      />
    </section>
  );
}
