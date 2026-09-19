import { useEffect, useState } from 'react';
import { PYTHON_STEP_CONTENT } from '../data/caseStudy';

export default function PythonConsole({ stepId }) {
  const stepContent = PYTHON_STEP_CONTENT[stepId] || PYTHON_STEP_CONTENT[1];

  const [activeTab, setActiveTab] = useState('code'); // 'code' | 'explain' | 'quiz'
  const [userCode, setUserCode] = useState(stepContent.pythonCode);
  const [output, setOutput] = useState(stepContent.sampleOutput);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Sync state when step changes
  useEffect(() => {
    setUserCode(stepContent.pythonCode);
    setOutput(stepContent.sampleOutput);
    setSelectedOption(null);
    setQuizSubmitted(false);
  }, [stepId, stepContent]);

  function handleRun() {
    setIsRunning(true);
    setOutput('Executing in Python 3.12 runtime...\n');

    setTimeout(() => {
      setIsRunning(false);
      // If code was customized or kept default, generate appropriate realistic Python output
      if (userCode.includes('unhashable') || userCode.includes('bad_dict')) {
        setOutput(
          `Traceback (most recent call last):\n  File "campus_registry.py", line 12, in <module>\nTypeError: unhashable type: 'list'`
        );
      } else if (userCode.includes('KeyError') || userCode.includes('CS999')) {
        setOutput(
          `Traceback (most recent call last):\n  File "campus_registry.py", line 4, in <module>\nKeyError: 'CS999'`
        );
      } else {
        setOutput(stepContent.sampleOutput);
      }
    }, 280);
  }

  function handleReset() {
    setUserCode(stepContent.pythonCode);
    setOutput(stepContent.sampleOutput);
  }

  return (
    <aside className="python-console" aria-label="Interactive Python Console">
      <div className="python-console__header">
        <div className="python-console__badge">
          <span className="python-icon">🐍</span>
          <span className="python-console__filename">campus_registry.py</span>
        </div>
        <span className="python-console__tag">{stepContent.tag}</span>
      </div>

      <div className="python-console__nav">
        <button
          type="button"
          className={`python-console__tab${activeTab === 'code' ? ' python-console__tab--active' : ''}`}
          onClick={() => setActiveTab('code')}
        >
          Interactive Code
        </button>
        <button
          type="button"
          className={`python-console__tab${activeTab === 'explain' ? ' python-console__tab--active' : ''}`}
          onClick={() => setActiveTab('explain')}
        >
          Under The Hood
        </button>
        <button
          type="button"
          className={`python-console__tab${activeTab === 'quiz' ? ' python-console__tab--active' : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          Quick Challenge {quizSubmitted && selectedOption === stepContent.challenge.correctIndex ? '✓' : ''}
        </button>
      </div>

      <div className="python-console__body">
        {activeTab === 'code' && (
          <div className="python-console__pane">
            <div className="code-editor-header">
              <span className="code-editor-title">Python Code (Editable)</span>
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
                  {isRunning ? 'Running…' : '▶ Run Python'}
                </button>
              </div>
            </div>

            <textarea
              className="python-code-editor"
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              spellCheck={false}
              rows={11}
            />

            <div className="python-terminal">
              <div className="python-terminal__header">
                <span>Terminal Output (Python 3.12)</span>
              </div>
              <pre className="python-terminal__output">{output}</pre>
            </div>
          </div>
        )}

        {activeTab === 'explain' && (
          <div className="python-console__pane python-console__explanation">
            <h3>{stepContent.title}</h3>
            <div className="explanation-text">
              {stepContent.explanation.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            <div className="callout callout--tip">
              <strong>💡 Python Pro-Tip:</strong> In Python, the dictionary implementation is so fast and
              optimized that the entire language runtime (modules, class attributes, global variables) is
              internally driven by hash tables!
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="python-console__pane python-console__quiz">
            <h3>Concept Check</h3>
            <p className="quiz-question">{stepContent.challenge.question}</p>

            <div className="quiz-options">
              {stepContent.challenge.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === stepContent.challenge.correctIndex;
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
                  selectedOption === stepContent.challenge.correctIndex
                    ? 'quiz-feedback--success'
                    : 'quiz-feedback--error'
                }`}
              >
                {selectedOption === stepContent.challenge.correctIndex ? (
                  <>
                    <strong>✓ Excellent!</strong> {stepContent.challenge.feedback}
                  </>
                ) : (
                  <>
                    <strong>✕ Not quite.</strong> Review the code snippet in the "Interactive Code" tab and try again!
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
