import { useState } from 'react';
import { createBuckets } from '../../lib/hashmap';
import { STORY_STEPS } from '../../data/caseStudy';
import BucketWall from '../BucketWall';
import StepFooter from '../StepFooter';

const EMPTY_BUCKETS = createBuckets();

export default function Step1Intro({ onContinue }) {
  const story = STORY_STEPS[1];
  const [searching, setSearching] = useState(false);
  const [checkedCount, setCheckedCount] = useState(0);
  const [searchDone, setSearchDone] = useState(false);

  function runListSearch() {
    setSearching(true);
    setSearchDone(false);
    setCheckedCount(0);

    let count = 0;
    const interval = setInterval(() => {
      count += 1250;
      if (count >= 10000) {
        clearInterval(interval);
        setCheckedCount(10000);
        setSearching(false);
        setSearchDone(true);
      } else {
        setCheckedCount(count);
      }
    }, 35);
  }

  return (
    <section className="step">
      <div className="story-card-minimal">
        <span className="story-badge">{story.badge}</span>
        <h2 className="story-headline">{story.headline}</h2>
        <p className="story-micro">{story.storyLine}</p>
      </div>

      <div className="interactive-demo-box">
        <div className="demo-box__actions">
          <button
            type="button"
            className="button button--primary"
            onClick={runListSearch}
            disabled={searching}
          >
            {searching ? 'Flipping binder pages…' : '▶ Test Scan (Sequential List Search)'}
          </button>
        </div>

        {checkedCount > 0 && (
          <div className="scan-progress">
            <div className="scan-bar">
              <div
                className="scan-bar__fill"
                style={{ width: `${(checkedCount / 10000) * 100}%` }}
              />
            </div>
            <span className="scan-counter">
              Scanned {checkedCount.toLocaleString()} / 10,000 items
              {searchDone && ' — Took 4 minutes! (O(n) linear search)'}
            </span>
          </div>
        )}
      </div>

      <div className="shelf-section">
        <div className="shelf-section__header">
          <span>7 Relief Shelves (Empty)</span>
        </div>
        <BucketWall buckets={EMPTY_BUCKETS} />
      </div>

      <StepFooter onContinue={onContinue} continueLabel="See the Coat-Check Trick →" />
    </section>
  );
}
