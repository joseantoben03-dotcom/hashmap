import { createBuckets } from '../../lib/hashmap';
import BucketWall from '../BucketWall';
import StepFooter from '../StepFooter';

const EMPTY_BUCKETS = createBuckets();

export default function Step1Intro({ onContinue }) {
  return (
    <section className="step">
      <div className="step-badge">Engineering Case Study • IIT Ropar</div>
      <h2>The Course Registry Bottleneck</h2>

      <p>
        Imagine you are on the engineering team for the <strong>IIT Ropar Academic Portal</strong>.
        During course registration week, thousands of students query course prerequisites and seat
        availability simultaneously.
      </p>

      <div className="case-callout">
        <h4>🚨 The Production Issue:</h4>
        <p>
          Originally, course records were kept in a standard Python <code>list</code>. Looking up a course
          like <code>"CS101"</code> required scanning one item after another from the start—an{' '}
          <strong>O(n) linear scan</strong>. As the course catalog grew, the portal crashed under peak load.
        </p>
      </div>

      <p>
        To solve this, we are upgrading the system to use a <strong>Hash Map</strong>—the core data
        structure that powers <strong>Python Dictionaries (<code>dict</code>)</strong>.
      </p>

      <p>
        Instead of scanning through every course sequentially, a hash table uses direct memory addressing:
        every piece of data has a <strong>Key</strong> (e.g. <code>"CS101"</code>) and a{' '}
        <strong>Value</strong> (e.g. course title & credits). A <strong>hash function</strong> instantly
        calculates the exact memory slot index, achieving <strong>O(1) constant-time access</strong>!
      </p>

      <p>Here is our initial memory allocation: 7 clean memory slots ready for course registration.</p>
      <BucketWall buckets={EMPTY_BUCKETS} />

      <StepFooter onContinue={onContinue} continueLabel="Inspect the Hash Function →" />
    </section>
  );
}
