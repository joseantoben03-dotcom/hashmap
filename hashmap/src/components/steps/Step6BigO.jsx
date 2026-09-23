import { totalEntries } from '../../lib/hashmap';
import { STORY_STEPS } from '../../data/caseStudy';
import StepFooter from '../StepFooter';

const REAL_WORLD_CARDS = [
  { game: 'Roblox', desc: 'Loads your player profile & skin instantly from player ID' },
  { game: 'YouTube', desc: 'Finds & plays video in 0.001s using video ID string' },
  { game: 'Fortnite', desc: 'Checks V-Bucks balance instantly without searching millions of accounts' },
  { game: 'Google Pay', desc: 'Connects mobile # to bank account for 1-second payments' }
];

export default function Step6BigO({ buckets, onBack, onFinish, isFinished }) {
  const story = STORY_STEPS[6];
  const filed = totalEntries(buckets);

  return (
    <section className="step">
      <div className="story-card-modern">
        <span className="story-badge-neon">{story.badge}</span>
        <h2 className="story-title-modern">{story.title}</h2>
        <p className="story-headline-modern">{story.headline}</p>
        <p className="story-text-simple">{story.storyLine}</p>
      </div>

      <div className="interactive-card">
        <div className="social-grid">
          {REAL_WORLD_CARDS.map((item) => (
            <div key={item.game} className="social-card">
              <span className="social-card__name">{item.game}</span>
              <span className="social-card__desc">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="step-note">
        {filed === 0
          ? 'You completed the Magic Locker story!'
          : `All ${filed} lunchbox${filed === 1 ? '' : 'es'} were grabbed in 1 second flat! Zero waiting!` }
      </p>

      <StepFooter
        onBack={onBack}
        onContinue={onFinish}
        continueLabel={isFinished ? 'Story Complete ✓' : 'Finish Story'}
      />
    </section>
  );
}
