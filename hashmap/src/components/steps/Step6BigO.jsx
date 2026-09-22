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
          ? 'You completed the story of hashing and Python dictionaries.'
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
