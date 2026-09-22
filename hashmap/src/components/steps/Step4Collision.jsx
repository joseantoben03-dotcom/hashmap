import { useMemo, useState } from 'react';
import { computeHash, longestChain } from '../../lib/hashmap';
import { COLLISION_CITIZENS, STORY_STEPS } from '../../data/caseStudy';
import BucketWall from '../BucketWall';
import StepFooter from '../StepFooter';

export default function Step4Collision({ buckets, onInsert, onBack, onContinue }) {
  const story = STORY_STEPS[4];
  const [demoRun, setDemoRun] = useState(false);

  const collisionIndex = useMemo(() => computeHash('Amit').index, []);
  const maxChain = longestChain(buckets);

  function runDemo() {
    COLLISION_CITIZENS.forEach((c) => onInsert(c.key, c.value));
    setDemoRun(true);
  }

  return (
    <section className="step">
      <div className="story-card-minimal">
        <span className="story-badge">{story.badge}</span>
        <h2 className="story-headline">{story.headline}</h2>
        <p className="story-micro">{story.storyLine}</p>
      </div>

      <div className="interactive-demo-box">
        <button
          type="button"
          className="button button--primary"
          onClick={runDemo}
          disabled={demoRun}
        >
          {demoRun ? '✓ Roommates Stored on Shelf #1' : "▶ File Amit & Mita (Trigger Clash)"}
        </button>
      </div>

      <div className="shelf-section">
        <div className="shelf-section__header">
          <span>Relief Shelves (Max Roommates: {maxChain})</span>
        </div>
        <BucketWall
          buckets={buckets}
          highlightIndex={demoRun ? collisionIndex : null}
          highlightVariant="insert"
        />
      </div>

      <StepFooter
        onBack={onBack}
        onContinue={onContinue}
        continueLabel="Check Family Inquiries →"
      />
    </section>
  );
}
