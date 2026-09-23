import { useState } from 'react';
import { BUCKET_COUNT, totalEntries } from '../../lib/hashmap';
import { LUNCHBOX_PRESETS, STORY_STEPS } from '../../data/caseStudy';
import BucketWall from '../BucketWall';
import StepFooter from '../StepFooter';

export default function Step3Insertion({ buckets, onInsert, onBack, onContinue }) {
  const story = STORY_STEPS[3];
  const [lastIndex, setLastIndex] = useState(null);

  const filed = totalEntries(buckets);

  function fileLunch(n, k) {
    if (!n.trim() || !k.trim()) return;
    const index = onInsert(n.trim(), k.trim());
    setLastIndex(index);
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
        <div className="button-row button-row--presets">
          <span className="preset-label">1-Click Drop Lunchbox into Locker:</span>
          {LUNCHBOX_PRESETS.map((item) => (
            <button
              key={item.key}
              type="button"
              className="btn-chip btn-chip--ghost"
              onClick={() => fileLunch(item.key, item.value)}
            >
              + {item.key} ({item.value})
            </button>
          ))}
        </div>
      </div>

      <div className="shelf-section">
        <div className="shelf-section__header">
          <span>Magic Lockers ({filed} lunchbox{filed === 1 ? '' : 'es'} filed in 0.0001s)</span>
        </div>
        <BucketWall buckets={buckets} highlightIndex={lastIndex} highlightVariant="insert" />
      </div>

      <StepFooter
        onBack={onBack}
        onContinue={onContinue}
        continueLabel="What If Two Kids Use the Same Locker? →"
        hint={filed < 2 ? 'Drop at least 2 lunchboxes to see the lockers fill in.' : undefined}
      />
    </section>
  );
}
