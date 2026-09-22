import { totalEntries } from '../../lib/hashmap';
import { STORY_STEPS } from '../../data/caseStudy';
import StepFooter from '../StepFooter';

const SOCIAL_EXAMPLES = [
  { service: 'UPI Payments (GPay/PhonePe)', whatItDoes: 'Finds bank account from phone # in 0.001s', speed: 'O(1) Instant' },
  { service: 'Food Delivery (Swiggy/Zomato)', whatItDoes: 'Tracks 1,000,000 live orders by order ID', speed: 'O(1) Instant' },
  { service: 'Aadhaar / National ID', whatItDoes: 'Verifies citizen token without duplicate scans', speed: 'O(1) Instant' },
  { service: 'Instagram / WhatsApp', whatItDoes: 'Checks if username is free & opens chat', speed: 'O(1) Instant' }
];

export default function Step6BigO({ buckets, onBack, onFinish, isFinished }) {
  const story = STORY_STEPS[6];
  const filed = totalEntries(buckets);

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
        <div className="social-grid">
          {SOCIAL_EXAMPLES.map((item) => (
            <div key={item.service} className="social-card">
              <span className="social-card__name">{item.service}</span>
              <span className="social-card__desc">{item.whatItDoes}</span>
              <span className="social-card__badge">{item.speed}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="step-note">
        {filed === 0
          ? 'You experienced how hashing and Python dictionaries run modern society.'
          : `Together with Dev, you organized and safeguarded ${filed} relief kit${filed === 1 ? '' : 's'} today.`}
      </p>

      <StepFooter
        onBack={onBack}
        onContinue={onFinish}
        continueLabel={isFinished ? 'Story Complete ✓' : 'Finish Story'}
      />
    </section>
  );
}
