import { useMemo, useState } from 'react';
import { BUCKET_COUNT, computeHash, createBuckets } from '../../lib/hashmap';
import BucketWall from '../BucketWall';
import HashWorking from '../HashWorking';
import StepFooter from '../StepFooter';

const EMPTY_BUCKETS = createBuckets();
const SAMPLE_CODES = ['CS101', 'EE201', 'ME205', 'MA101', 'HS301'];

export default function Step2HashFunction({ onBack, onContinue }) {
  const [key, setKey] = useState('CS101');
  const [tried, setTried] = useState(true);

  const computation = useMemo(
    () => (key.trim() ? computeHash(key.trim(), BUCKET_COUNT) : null),
    [key]
  );

  return (
    <section className="step">
      <div className="step-badge">Component 1 • The Dispatcher</div>
      <h2>The Hash Function & Memory Addressing</h2>

      <p>
        In the IIT Ropar registry, how does Python instantly know which memory drawer holds{' '}
        <code>"CS101"</code> without searching? It uses a <strong>hash function</strong>.
      </p>

      <p>
        A hash function converts arbitrary data into a deterministic integer. In our simulation, it sums the
        ASCII character values of the course code and computes the modulo over the table size (
        <code>sum % {BUCKET_COUNT}</code>) to find the exact memory slot:
      </p>

      <div className="field-row">
        <label htmlFor="hash-key">Course Code</label>
        <input
          id="hash-key"
          type="text"
          value={key}
          onChange={(event) => {
            setKey(event.target.value);
            if (event.target.value.trim()) setTried(true);
          }}
          placeholder="e.g. CS101, EE201"
          maxLength={24}
        />
      </div>

      <div className="button-row button-row--presets">
        <span className="preset-label">Sample Courses:</span>
        {SAMPLE_CODES.map((code) => (
          <button
            key={code}
            type="button"
            className="button button--chip"
            onClick={() => {
              setKey(code);
              setTried(true);
            }}
          >
            {code}
          </button>
        ))}
      </div>

      <HashWorking computation={computation} />

      <BucketWall
        buckets={EMPTY_BUCKETS}
        highlightIndex={computation?.index ?? null}
        highlightVariant="compute"
      />

      <div className="callout callout--note">
        <strong>⚠️ Crucial Python Rule: Immutability</strong>
        <p>
          In Python, dictionary keys <em>must</em> be hashable, which requires them to be{' '}
          <strong>immutable</strong> (like strings, numbers, and tuples). If keys could be modified,
          their hash would change, leaving them lost in the wrong memory slot forever!
        </p>
      </div>

      <StepFooter
        onBack={onBack}
        onContinue={onContinue}
        continueLabel="Enroll Courses Into Memory →"
        hint={tried ? undefined : 'Test at least one course code to see the slot calculation.'}
      />
    </section>
  );
}
