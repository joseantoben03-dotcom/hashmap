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
      <div className="story-header">
        <span className="story-badge">{story.badge}</span>
        <h2 className="story-headline">{story.headline}</h2>
      </div>

      <div className="story-card">
        <p className="story-micro">{story.microStory}</p>
        <div className="story-quote-inline">
          <span className="quote-speaker">{story.quote.speaker}:</span> “{story.quote.text}”
        </div>
      </div>

      <div className="interactive-demo-box">
        <div className="button-row">
          <button
            type="button"
            className="button button--primary"
            onClick={runDemo}
            disabled={demoRun}
          >
            {demoRun ? '✓ Roommates Filed on Shelf #1' : "▶ File Amit & Mita (Trigger Anagram Clash)"}
          </button>
        </div>

        {demoRun && (
          <div className="status-banner status-banner--info">
            <strong>Roommates on Shelf #{collisionIndex}:</strong> Amit and Mita share the same letters (A-M-I-T), hashing to Shelf #{collisionIndex}. Both are safely stored side-by-side!
          </div>
        )}
      </div>

      <div className="shelf-section">
        <div className="shelf-section__header">
          <span>Relief Shelves (Busiest Shelf: {maxChain} items)</span>
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
        continueLabel="When Someone Inquires About Family →"
      />
    </section>
  );
}
