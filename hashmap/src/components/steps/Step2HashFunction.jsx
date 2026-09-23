import { useMemo, useState } from 'react';
import { BUCKET_COUNT, computeHash, createBuckets } from '../../lib/hashmap';
import { LUNCHBOX_PRESETS, STORY_STEPS } from '../../data/caseStudy';
import BucketWall from '../BucketWall';
import HashWorking from '../HashWorking';
import StepFooter from '../StepFooter';

const EMPTY_BUCKETS = createBuckets();

export default function Step2HashFunction({ onBack, onContinue }) {
  const story = STORY_STEPS[2];
  const [name, setName] = useState('Timmy');

  const computation = useMemo(
    () => (name.trim() ? computeHash(name.trim(), BUCKET_COUNT) : null),
    [name]
  );

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
          <span className="preset-label">Pick Student:</span>
          {LUNCHBOX_PRESETS.map((student) => (
            <button
              key={student.key}
              type="button"
              className="btn-chip"
              onClick={() => setName(student.key)}
            >
              {student.key}
            </button>
          ))}
        </div>

        <div className="field-row">
          <label htmlFor="student-name">Or type name:</label>
          <input
            id="student-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Timmy"
            maxLength={20}
          />
        </div>

        <HashWorking computation={computation} />
      </div>

      <div className="shelf-section">
        <BucketWall
          buckets={EMPTY_BUCKETS}
          highlightIndex={computation?.index ?? null}
          highlightVariant="compute"
        />
      </div>

      <StepFooter onBack={onBack} onContinue={onContinue} continueLabel="Open Locker & File Lunch →" />
    </section>
  );
}
