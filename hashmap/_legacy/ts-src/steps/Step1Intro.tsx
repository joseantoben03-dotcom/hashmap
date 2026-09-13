import { createBuckets } from '../../lib/hashmap';
import BucketWall from '../BucketWall';
import StepFooter from '../StepFooter';

interface Step1IntroProps {
  onContinue: () => void;
}

const EMPTY_BUCKETS = createBuckets();

export default function Step1Intro({ onContinue }: Step1IntroProps) {
  return (
    <section className="step">
      <h2>What is a hashmap?</h2>
      <p>
        Picture a wall of numbered drawers, like a library card catalog or the pigeonholes in an old
        post office. Every drawer has a number. When a letter arrives, the clerk doesn't search the
        whole wall — a simple rule tells them exactly which drawer to open.
      </p>
      <p>
        A hashmap works the same way. Each piece of data has a <strong>key</strong> (the name on the
        envelope) and a <strong>value</strong> (what's inside). A <strong>hash function</strong> turns
        the key into a drawer number, so storing and finding things takes roughly the same amount of
        time whether the wall has 7 drawers or 7 million.
      </p>
      <p>Here's the wall you'll be filing all through this tutorial — empty for now.</p>
      <BucketWall buckets={EMPTY_BUCKETS} />
      <StepFooter onContinue={onContinue} continueLabel="Show me the hash function" />
    </section>
  );
}
