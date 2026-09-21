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
        <label htmlFor="citizen-input">Citizen Name</label>
        <input
          id="citizen-input"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Aarav"
          maxLength={20}
        />
      </div>
      <div className="field-row">
        <label htmlFor="kit-input">Relief Kit / Item</label>
        <input
          id="kit-input"
          type="text"
          value={kit}
          onChange={(event) => setKit(event.target.value)}
          placeholder="e.g. Ration Kit A"
          maxLength={28}
        />
      </div>

      <HashWorking computation={preview} emptyHint="Enter a name and kit to see which shelf it belongs on." />

      <div className="button-row">
        <button
          type="button"
          className="button button--primary"
          onClick={() => fileKit(name, kit)}
          disabled={!name.trim() || !kit.trim()}
        >
          File Kit to Shelf
        </button>

        <span className="preset-label">Quick Register:</span>
        {CITIZEN_PRESETS.slice(0, 4).map((citizen) => (
          <button
            key={citizen.key}
            type="button"
            className="button button--ghost"
            onClick={() => fileKit(citizen.key, citizen.value)}
          >
            + {citizen.key} ({citizen.category})
          </button>
        ))}
      </div>

      <BucketWall buckets={buckets} highlightIndex={lastIndex} highlightVariant="insert" />

      <div className="story-insight">
        <strong>💡 The Social Insight:</strong> {story.insight}
      </div>

      <p className="step-note">
        {filed === 0
          ? 'The shelves are currently empty.'
          : `${filed} relief kit${filed === 1 ? '' : 's'} assigned to families with zero searching.`}
      </p>

      <StepFooter
        onBack={onBack}
        onContinue={onContinue}
        continueLabel="What If Two People Get the Same Shelf? →"
        hint={filed < 2 ? 'Assign at least two relief kits to see how shelves fill in.' : undefined}
      />
    </section>
  );
}
