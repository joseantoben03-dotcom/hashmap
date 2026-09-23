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
      count += 125;
      if (count >= 1000) {
        clearInterval(interval);
        setCheckedCount(1000);
        setSearching(false);
        setSearchDone(true);
      } else {
        setCheckedCount(count);
      }
    }, 35);
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
        <button
          type="button"
          className="btn-glow btn-glow--cyan"
          onClick={runListSearch}
          disabled={searching}
        >
          {searching ? 'Digging through messy pile…' : '▶ Dig Through Messy Pile (List Search)'}
        </button>

        {checkedCount > 0 && (
          <div className="scan-progress">
            <div className="scan-bar">
              <div
                className="scan-bar__fill"
                style={{ width: `${(checkedCount / 1000) * 100}%` }}
              />
            </div>
            <span className="scan-counter">
              Searched {checkedCount.toLocaleString()} / 1,000 lunchboxes
              {searchDone && ' — Took all lunchtime! (O(n) list scan)'}
            </span>
          </div>
        )}
      </div>

      <div className="shelf-section">
        <BucketWall buckets={EMPTY_BUCKETS} />
      </div>

      <StepFooter onContinue={onContinue} continueLabel="See the Magic Locker Rule →" />
    </section>
  );
}
