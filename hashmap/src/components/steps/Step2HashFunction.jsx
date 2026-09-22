import { useMemo, useState } from 'react';
import { BUCKET_COUNT, computeHash, createBuckets } from '../../lib/hashmap';
import { CITIZEN_PRESETS, STORY_STEPS } from '../../data/caseStudy';
import BucketWall from '../BucketWall';
import HashWorking from '../HashWorking';
import StepFooter from '../StepFooter';

const EMPTY_BUCKETS = createBuckets();

export default function Step2HashFunction({ onBack, onContinue }) {
  const story = STORY_STEPS[2];
  const [name, setName] = useState('Priya');

  const computation = useMemo(
    () => (name.trim() ? computeHash(name.trim(), BUCKET_COUNT) : null),
    [name]
  );

  return (
    <section className="step">
      <div className="story-act-card">
        <span className="story-act-badge">{story.badge}</span>
        <h2 className="story-act-title">{story.headline}</h2>

        <div className="character-speech-bubble">
          <div className="character-avatar">{story.character.avatar}</div>
          <div className="speech-content">
            <span className="character-name">{story.character.name}</span>
            <p className="character-dialogue">{story.dialogue}</p>
          </div>
        </div>

        <p className="story-narrative-text">{story.narrative}</p>
      </div>

      <div className="interactive-demo-box">
        <div className="button-row button-row--presets">
          <span className="preset-label">Pick citizen:</span>
          {CITIZEN_PRESETS.map((c) => (
            <button
              key={c.key}
              type="button"
              className="button button--chip"
              onClick={() => setName(c.key)}
            >
              {c.key}
            </button>
          ))}
        </div>

        <div className="field-row">
          <label htmlFor="citizen-name">Or type name:</label>
          <input
            id="citizen-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type a name..."
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

      <StepFooter onBack={onBack} onContinue={onContinue} continueLabel="Start Filing Kits →" />
    </section>
  );
}
