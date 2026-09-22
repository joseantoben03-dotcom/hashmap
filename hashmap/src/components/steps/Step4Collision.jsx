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
    COLLISION_CITIZENS.forEach((c) => onInsert(c.key, c.value));
    setDemoRun(true);
  }

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
        <button
          type="button"
          className="button button--primary"
          onClick={runDemo}
          disabled={demoRun}
        >
          {demoRun ? '✓ Accommodated Both as Roommates' : "▶ File Amit & Mita (Trigger Clash)"}
        </button>
      </div>

      <div className="shelf-section">
        <div className="shelf-section__header">
          <span>Relief Shelves (Max Roommates: {maxChain})</span>
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
        continueLabel="Check Family Inquiries →"
      />
    </section>
  );
}
