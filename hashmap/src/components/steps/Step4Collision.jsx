import { useMemo, useState } from 'react';
import { computeHash, longestChain } from '../../lib/hashmap';
import { COLLISION_PRESETS, STORY_STEPS } from '../../data/caseStudy';
import BucketWall from '../BucketWall';
import StepFooter from '../StepFooter';

export default function Step4Collision({ buckets, onInsert, onBack, onContinue }) {
  const story = STORY_STEPS[4];
  const [demoRun, setDemoRun] = useState(false);

  const collisionIndex = useMemo(() => computeHash('Timmy').index, []);
  const maxChain = longestChain(buckets);

  function runDemo() {
    COLLISION_PRESETS.forEach((item) => onInsert(item.key, item.value));
    setDemoRun(true);
  }

  return (
    <section className="step">
      <div className="story-card-modern">
        <span className="story-badge-neon">{story.badge}</span>
        <h2 className="story-title-modern">{story.title}</h2>
        <p className="story-headline-modern">{story.headline}</p>
        <p className="story-text-simple">{story.storyLine}</p>
      </div>

      <div className="interactive-card">
        <button
          type="button"
          className="btn-glow btn-glow--purple"
          onClick={runDemo}
          disabled={demoRun}
        >
          {demoRun ? '✓ Timmy & Tina Accommodated as Roommates' : "▶ Drop Timmy & Tina's Lunch (Trigger Clash)"}
        </button>

        {demoRun && (
          <div className="status-banner status-banner--info">
            <strong>Roommates in Locker #{collisionIndex}:</strong> Both Timmy (Pizza) and Tina (Tacos) share Locker #{collisionIndex}. Both lunchboxes are kept completely safe!
          </div>
        )}
      </div>

      <div className="shelf-section">
        <div className="shelf-section__header">
          <span>Magic Lockers (Max Roommates per Locker: {maxChain})</span>
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
        continueLabel="Check Missing Lunchboxes →"
      />
    </section>
  );
}
