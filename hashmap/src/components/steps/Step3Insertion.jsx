import { useState } from 'react';
import { BUCKET_COUNT, totalEntries } from '../../lib/hashmap';
import { CITIZEN_PRESETS, STORY_STEPS } from '../../data/caseStudy';
import BucketWall from '../BucketWall';
import StepFooter from '../StepFooter';

export default function Step3Insertion({ buckets, onInsert, onBack, onContinue }) {
  const story = STORY_STEPS[3];
  const [lastIndex, setLastIndex] = useState(null);

  const filed = totalEntries(buckets);

  function fileKit(n, k) {
    if (!n.trim() || !k.trim()) return;
    const index = onInsert(n.trim(), k.trim());
    setLastIndex(index);
  }

  return (
    <section className="step">
      <div className="story-card-minimal">
        <span className="story-badge">{story.badge}</span>
        <h2 className="story-headline">{story.headline}</h2>
        <p className="story-micro">{story.storyLine}</p>
      </div>

      <div className="interactive-demo-box">
        <div className="button-row button-row--presets">
          <span className="preset-label">1-Click File Kit:</span>
          {CITIZEN_PRESETS.map((c) => (
            <button
              key={c.key}
              type="button"
              className="button button--ghost"
              onClick={() => fileKit(c.key, c.value)}
            >
              + {c.key} ({c.value})
            </button>
          ))}
        </div>
      </div>

      <div className="shelf-section">
        <div className="shelf-section__header">
          <span>Relief Shelves ({filed} kit{filed === 1 ? '' : 's'} filed)</span>
        </div>
        <BucketWall buckets={buckets} highlightIndex={lastIndex} highlightVariant="insert" />
      </div>

      <StepFooter
        onBack={onBack}
        onContinue={onContinue}
        continueLabel="What If Two People Get the Same Shelf? →"
        hint={filed < 2 ? 'File at least 2 kits to see shelves fill in.' : undefined}
      />
    </section>
  );
}
