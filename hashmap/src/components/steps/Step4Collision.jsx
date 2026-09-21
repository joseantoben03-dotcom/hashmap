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
    COLLISION_CITIZENS.forEach((citizen) => onInsert(citizen.key, citizen.value));
    setDemoRun(true);
  }

  return (
    <section className="step">
      <div className="story-badge">{story.badge}</div>
      <h2 className="story-headline">{story.headline}</h2>

      <div className="story-vignette">
        {story.story.map((paragraph, idx) => (
          <p key={idx} className="story-text">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="story-quote">
        <span className="story-quote__mark">“</span>
        <div className="story-quote__content">
          <p className="story-quote__text">{story.quote.text}</p>
          <span className="story-quote__speaker">— {story.quote.speaker}</span>
        </div>
      </div>

      <div className="button-row">
        <button
          type="button"
          className="button button--primary"
          onClick={runDemo}
          disabled={demoRun}
        >
          {demoRun ? 'Amit & Mita Accommodated' : "Amit & Mita Arrive (Trigger Clash)"}
        </button>
      </div>

      {demoRun && (
        <div className="callout callout--tip">
          <strong>Roommates on Shelf #{collisionIndex}:</strong> Both <strong>Amit</strong> and{' '}
          <strong>Mita</strong> share the same letters, calculating to Shelf #{collisionIndex}. Dev
          politely stacks both boxes side-by-side. Neither family is turned away!
        </div>
      )}

      <BucketWall
        buckets={buckets}
        highlightIndex={demoRun ? collisionIndex : null}
        highlightVariant="insert"
      />

      <div className="story-insight">
        <strong>💡 The Social Insight:</strong> {story.insight}
      </div>

      <p className="step-note">
        {maxChain > 1
          ? `Busiest shelf right now: ${maxChain} boxes sharing a single shelf.`
          : 'Click the button above to see what happens when two citizens calculate to the exact same shelf.'}
      </p>

      <StepFooter
        onBack={onBack}
        onContinue={onContinue}
        continueLabel="When Someone Inquires About Family →"
      />
    </section>
  );
}
