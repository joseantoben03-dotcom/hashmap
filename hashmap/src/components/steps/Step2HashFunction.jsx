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

      <div className="field-row">
        <label htmlFor="citizen-name">Citizen Name</label>
        <input
          id="citizen-name"
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            if (event.target.value.trim()) setTried(true);
          }}
          placeholder="e.g. Priya, Aarav"
          maxLength={20}
        />
      </div>

      <div className="button-row button-row--presets">
        <span className="preset-label">Try arriving citizens:</span>
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

      <BucketWall
        buckets={EMPTY_BUCKETS}
        highlightIndex={computation?.index ?? null}
        highlightVariant="compute"
      />

      <div className="story-insight">
        <strong>💡 The Social Insight:</strong> {story.insight}
      </div>

      <StepFooter
        onBack={onBack}
        onContinue={onContinue}
        continueLabel="Start Handing Out Relief Kits →"
        hint={tried ? undefined : 'Type a name or pick one above to see their shelf.'}
      />
    </section>
  );
}
