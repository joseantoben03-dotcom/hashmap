import { totalEntries } from '../../lib/hashmap';
import { STORY_STEPS } from '../../data/caseStudy';
import StepFooter from '../StepFooter';

const SOCIAL_EXAMPLES = [
  { service: 'UPI Payments (GPay/PhonePe)', whatItDoes: 'Instant bank account lookup by mobile number', speed: 'O(1) instant' },
  { service: 'Food Delivery (Swiggy/Zomato)', whatItDoes: 'Instant live order tracking among millions of deliveries', speed: 'O(1) instant' },
  { service: 'Aadhaar / National ID', whatItDoes: 'Preventing duplicate voter or ration registration in seconds', speed: 'O(1) instant' },
  { service: 'Instagram / WhatsApp', whatItDoes: 'Checking if a username is taken, loading contact chats', speed: 'O(1) instant' }
];

export default function Step6BigO({ buckets, onBack, onFinish, isFinished }) {
  const story = STORY_STEPS[6];
  const filed = totalEntries(buckets);

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

      <h4 className="section-subhead">Where Hashing Keeps Society Moving Every Second:</h4>
      <div className="social-grid">
        {SOCIAL_EXAMPLES.map((item) => (
          <div key={item.service} className="social-card">
            <span className="social-card__name">{item.service}</span>
            <span className="social-card__desc">{item.whatItDoes}</span>
            <span className="social-card__badge">{item.speed}</span>
          </div>
        ))}
      </div>

      <div className="story-insight">
        <strong>💡 The Social Insight:</strong> {story.insight}
      </div>

      <p className="step-note">
        {filed === 0
          ? 'You experienced the full journey of hashing and Python dictionaries.'
          : `Together with Dev, you organized and safeguarded ${filed} relief kit${filed === 1 ? '' : 's'} today.`}
      </p>

      <StepFooter
        onBack={onBack}
        onContinue={onFinish}
        continueLabel={isFinished ? 'Journey Complete ✓' : 'Finish Story'}
      />
    </section>
  );
}
