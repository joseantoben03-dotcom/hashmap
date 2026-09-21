import { useState } from 'react';
import { createBuckets } from '../../lib/hashmap';
import { STORY_STEPS } from '../../data/caseStudy';
import BucketWall from '../BucketWall';
import StepFooter from '../StepFooter';

const EMPTY_BUCKETS = createBuckets();

export default function Step1Intro({ onContinue }) {
  const story = STORY_STEPS[1];
  const [searching, setSearching] = useState(false);
  const [searchDone, setSearchDone] = useState(false);
  const [checkedCount, setCheckedCount] = useState(0);

  function simulateSlowSearch() {
    setSearching(true);
    setSearchDone(false);
    setCheckedCount(0);

    let count = 0;
    const interval = setInterval(() => {
      count += 850;
      if (count >= 10000) {
        clearInterval(interval);
        setCheckedCount(10000);
        setSearching(false);
        setSearchDone(true);
      } else {
        setCheckedCount(count);
      }
    }, 40);
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

      {/* Interactive Demonstration: Feel the difference */}
      <div className="simulation-card">
        <h4>Experience the Social Bottleneck:</h4>
        <p className="simulation-prompt">
          Try finding Mrs. Verma in the 10,000-person paper binder:
        </p>

        <div className="simulation-actions">
          <button
            type="button"
            className="button button--primary"
            onClick={simulateSlowSearch}
            disabled={searching}
          >
            {searching ? 'Flipping pages…' : 'Search 10,000 Names Sequentially'}
          </button>

          {checkedCount > 0 && (
            <span className="simulation-counter">
              Checked <strong>{checkedCount.toLocaleString()}</strong> of 10,000 pages…{' '}
              {searchDone && 'Found! (Took 4 whole minutes in real life)'}
            </span>
          )}
        </div>
      </div>

      <div className="story-insight">
        <strong>💡 The Social Insight:</strong> {story.insight}
      </div>

      <p className="shelf-intro-text">
        Here are the 7 empty relief shelves Dev just set up behind the desk. Let’s see how a simple
        social invention changes everything:
      </p>

      <BucketWall buckets={EMPTY_BUCKETS} />

      <StepFooter onContinue={onContinue} continueLabel="See the Coat-Check & PIN Code Trick →" />
    </section>
  );
}
