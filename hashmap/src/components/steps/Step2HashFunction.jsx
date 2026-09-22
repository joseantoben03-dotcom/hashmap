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
  const [tried, setTried] = useState(true);

  const computation = useMemo(
    () => (name.trim() ? computeHash(name.trim(), BUCKET_COUNT) : null),
    [name]
  );

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
        <div className="field-row">
          <label htmlFor="citizen-name">Arriving Citizen</label>
          <input
            id="citizen-name"
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (event.target.value.trim()) setTried(true);
            }}
            placeholder="Type a name..."
            maxLength={20}
          />
        </div>

        <div className="button-row button-row--presets">
          <span className="preset-label">Pick citizen:</span>
          {CITIZEN_PRESETS.slice(0, 5).map((citizen) => (
            <button
              key={citizen.key}
              type="button"
              className="button button--chip"
              onClick={() => {
                setName(citizen.key);
                setTried(true);
              }}
            >
              {citizen.key}
            </button>
          ))}
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

      <StepFooter
        onBack={onBack}
        onContinue={onContinue}
        continueLabel="Start Handing Out Relief Kits →"
        hint={tried ? undefined : 'Pick or type a name to see their calculated shelf.'}
      />
    </section>
  );
}
