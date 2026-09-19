import { useMemo, useState } from 'react';
import { computeHash, longestChain } from '../../lib/hashmap';
import { COLLISION_COURSES } from '../../data/caseStudy';
import BucketWall from '../BucketWall';
import StepFooter from '../StepFooter';

export default function Step4Collision({ buckets, onInsert, onBack, onContinue }) {
  const [demoRun, setDemoRun] = useState(false);

  const collisionIndex = useMemo(() => computeHash('CS101').index, []);
  const maxChain = longestChain(buckets);

  function runDemo() {
    COLLISION_COURSES.forEach((course) => onInsert(course.key, course.value));
    setDemoRun(true);
  }

  return (
    <section className="step">
      <div className="step-badge">Challenge • Slot Clashes</div>
      <h2>Collision Chaos & Chaining</h2>

      <p>
        What happens if two distinct course codes hash to the exact same memory slot? In computer science,
        this is called a <strong>Hash Collision</strong>.
      </p>

      <p>
        Because the set of possible course names is infinite but our memory table has only 7 slots,
        collisions are a mathematical certainty (by the Pigeonhole Principle), not a defect.
      </p>

      <div className="button-row">
        <button
          type="button"
          className="button button--primary"
          onClick={runDemo}
          disabled={demoRun}
        >
          {demoRun ? 'Clash Handled' : "Trigger Collision ('CS101' & 'CS011')"}
        </button>
      </div>

      {demoRun && (
        <div className="callout callout--warning">
          <strong>⚡ Collision Detected at Slot [{collisionIndex}]:</strong>
          <p>
            Both <code>"CS101"</code> and <code>"CS011"</code> sum to 296 (modulo 7 = {collisionIndex}).
            Our simulator resolves this using <strong>Separate Chaining</strong>: Slot [{collisionIndex}]
            holds a linked chain of cards so neither record is lost!
          </p>
        </div>
      )}

      <BucketWall
        buckets={buckets}
        highlightIndex={demoRun ? collisionIndex : null}
        highlightVariant="insert"
      />

      <div className="callout callout--note">
        <strong>🔍 How Python (CPython) Does It Under the Hood:</strong>
        <p>
          Unlike our educational visual model which uses separate chaining, real Python dictionaries use{' '}
          <strong>Open Addressing with Perturbation</strong>. All entries sit in one contiguous block of
          memory (great for CPU cache performance!). When a collision occurs, Python calculates a pseudo-random
          probe sequence to locate the next free index.
        </p>
      </div>

      <p className="step-note">
        {maxChain > 1
          ? `Longest collision chain in memory: ${maxChain} records in one slot.`
          : 'Trigger the demo above to observe how a collision is resolved in memory.'}
      </p>

      <StepFooter
        onBack={onBack}
        onContinue={onContinue}
        continueLabel="Query & Drop Courses →"
      />
    </section>
  );
}
