import { totalEntries } from '../../lib/hashmap';
import { STORY_STEPS } from '../../data/caseStudy';
import StepFooter from '../StepFooter';

const SOCIAL_EXAMPLES = [
  { service: 'UPI Payments (GPay/PhonePe)', desc: 'Mobile # -> Bank account (0.001s)' },
  { service: 'Food Delivery (Swiggy/Zomato)', desc: 'Order ID -> Live tracker' },
  { service: 'Aadhaar ID System', desc: 'Citizen Token -> Voter registry' },
  { service: 'Instagram & WhatsApp', desc: 'Username -> Chat history' }
];

export default function Step6BigO({ buckets, onBack, onFinish, isFinished }) {
  const story = STORY_STEPS[6];
  const filed = totalEntries(buckets);

  return (
    <section className="step">
      <div className="story-card-minimal">
        <span className="story-badge">{story.badge}</span>
        <h2 className="story-headline">{story.headline}</h2>
        <p className="story-micro">{story.storyLine}</p>
      </div>

      <div className="interactive-demo-box">
        <div className="social-grid">
          {SOCIAL_EXAMPLES.map((item) => (
            <div key={item.service} className="social-card">
              <span className="social-card__name">{item.service}</span>
              <span className="social-card__desc">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="step-note">
        {filed === 0
          ? 'You completed the journey of hashing and Python dictionaries.'
          : `Together with Dev, you organized ${filed} relief kit${filed === 1 ? '' : 's'} with zero waiting in line.`}
      </p>

      <StepFooter
        onBack={onBack}
        onContinue={onFinish}
        continueLabel={isFinished ? 'Story Complete ✓' : 'Finish Story'}
      />
    </section>
  );
}
