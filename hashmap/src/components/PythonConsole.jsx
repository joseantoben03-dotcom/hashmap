import { useEffect, useState } from 'react';
import { PYTHON_GENTLE_LESSONS } from '../data/caseStudy';

export default function PythonConsole({ stepId }) {
  const lesson = PYTHON_GENTLE_LESSONS[stepId] || PYTHON_GENTLE_LESSONS[1];

  const [activeTab, setActiveTab] = useState('code'); // 'code' | 'check'
  const [code, setCode] = useState(lesson.snippet);
  const [terminalOutput, setTerminalOutput] = useState(lesson.output);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    setCode(lesson.snippet);
    setTerminalOutput(lesson.output);
    setSelectedOption(null);
    setQuizSubmitted(false);
  }, [stepId, lesson]);

  function handleRun() {
    setIsRunning(true);
    setTerminalOutput('Running in Python 3.12...\n');

    setTimeout(() => {
      setIsRunning(false);
      setTerminalOutput(lesson.output);
    }, 150);
  }

  function handleReset() {
    setCode(lesson.snippet);
    setTerminalOutput(lesson.output);
  }

  return (
    <aside className="python-console" aria-label="Gentle Python Companion">
      <div className="python-console__header">
        <div className="python-console__badge">
          <span className="python-icon">🐍</span>
          <span className="python-console__filename">volunteer_hub.py</span>
        </div>
        <span className="python-console__tag">{lesson.concept}</span>
      </div>

      <div className="python-console__nav">
        <button
          type="button"
          className={`python-console__tab${activeTab === 'code' ? ' python-console__tab--active' : ''}`}
          onClick={() => setActiveTab('code')}
        >
          Try in Python
        </button>
        <button
          type="button"
          className={`python-console__tab${activeTab === 'check' ? ' python-console__tab--active' : ''}`}
          onClick={() => setActiveTab('check')}
        >
          Quick Check {quizSubmitted && selectedOption === lesson.challenge.correctIndex ? '✓' : ''}
        </button>
      </div>

      <div className="python-console__body">
        {activeTab === 'code' && (
          <div className="python-console__pane">
            <div className="code-editor-header">
              <span className="code-editor-title">Python Snippet (Editable)</span>
              <div className="code-editor-actions">
                <button type="button" className="btn-small" onClick={handleReset}>
                  Reset
                </button>
                <button
                  type="button"
                  className="btn-small btn-small--run"
                  onClick={handleRun}
                  disabled={isRunning}
                >
                  {isRunning ? 'Running…' : '▶ Run Code'}
                </button>
              </div>
            </div>

            <textarea
              className="python-code-editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              rows={8}
            />

            <div className="python-terminal">
              <div className="python-terminal__header">
                <span>Output Console</span>
              </div>
              <pre className="python-terminal__output">{terminalOutput}</pre>
            </div>

            <div className="mini-insight">
              <strong>Takeaway:</strong> {lesson.oneLinerNote}
            </div>
          </div>
        )}

        {activeTab === 'check' && (
          <div className="python-console__pane python-console__quiz">
            <h3>Quick Check</h3>
            <p className="quiz-question">{lesson.challenge.question}</p>

            <div className="quiz-options">
              {lesson.challenge.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === lesson.challenge.correctIndex;
                let optClass = 'quiz-option';
                if (quizSubmitted) {
                  if (isCorrect) optClass += ' quiz-option--correct';
                  else if (isSelected) optClass += ' quiz-option--wrong';
                } else if (isSelected) {
                  optClass += ' quiz-option--selected';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    className={optClass}
                    onClick={() => {
                      setSelectedOption(idx);
                      setQuizSubmitted(true);
                    }}
                  >
                    <span className="quiz-option__letter">{String.fromCharCode(65 + idx)}</span>
                    <span className="quiz-option__text">{opt}</span>
                  </button>
                );
              })}
            </div>

            {quizSubmitted && (
              <div
                className={`quiz-feedback ${
                  selectedOption === lesson.challenge.correctIndex
                    ? 'quiz-feedback--success'
                    : 'quiz-feedback--error'
                }`}
              >
                {selectedOption === lesson.challenge.correctIndex ? (
                  <>
                    <strong>✓ Exactly right!</strong> {lesson.challenge.feedback}
                  </>
                ) : (
                  <>
                    <strong>✕ Not quite:</strong> Give it another try!
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
