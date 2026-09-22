import { useState } from 'react';
import { BUCKET_COUNT, computeHash, totalEntries } from '../../lib/hashmap';
import { CITIZEN_PRESETS, STORY_STEPS } from '../../data/caseStudy';
import BucketWall from '../BucketWall';
import HashWorking from '../HashWorking';
import StepFooter from '../StepFooter';

export default function Step3Insertion({ buckets, onInsert, onBack, onContinue }) {
  const story = STORY_STEPS[3];
  const [name, setName] = useState('');
  const [kit, setKit] = useState('');
  const [lastIndex, setLastIndex] = useState(null);

  const filed = totalEntries(buckets);
  const preview = name.trim() ? computeHash(name.trim(), BUCKET_COUNT) : null;

  function fileKit(n, k) {
    if (!n.trim() || !k.trim()) return;
    const index = onInsert(n.trim(), k.trim());
    setLastIndex(index);
    setName('');
    setKit('');
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
        <div className="button-row button-row--presets">
          <span className="preset-label">1-Click Enroll Citizens:</span>
          {CITIZEN_PRESETS.map((citizen) => (
            <button
              key={citizen.key}
              type="button"
              className="button button--ghost"
              onClick={() => fileKit(citizen.key, citizen.value)}
            >
              + {citizen.key} ({citizen.value})
            </button>
          ))}
        </div>

        <div className="field-row-group">
          <div className="field-row">
            <label htmlFor="citizen-input">Name</label>
            <input
              id="citizen-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ananya"
              maxLength={20}
            />
          </div>
          <div className="field-row">
            <label htmlFor="kit-input">Relief Kit</label>
            <input
              id="kit-input"
              type="text"
              value={kit}
              onChange={(e) => setKit(e.target.value)}
              placeholder="e.g. Water Pack"
              maxLength={24}
            />
          </div>
          <button
            type="button"
            className="button button--primary"
            onClick={() => fileKit(name, kit)}
            disabled={!name.trim() || !kit.trim()}
          >
            File to Shelf
          </button>
        </div>

        {name.trim() && <HashWorking computation={preview} />}
      </div>

      <div className="shelf-section">
        <div className="shelf-section__header">
          <span>Relief Shelves ({filed} kit{filed === 1 ? '' : 's'} filed in 0.0001s)</span>
        </div>
        <BucketWall buckets={buckets} highlightIndex={lastIndex} highlightVariant="insert" />
      </div>

      <StepFooter
        onBack={onBack}
        onContinue={onContinue}
        continueLabel="What If Two People Get the Same Shelf? →"
        hint={filed < 2 ? 'Enroll at least 2 citizens to see the shelves fill in.' : undefined}
      />
    </section>
  );
}
