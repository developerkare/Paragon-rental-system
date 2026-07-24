import json

# Read the complete quiz data
with open(r'c:\Users\Hp\Paragon-rental-system\quiz_data_all_sections.json', 'r', encoding='utf-8') as f:
    quiz_data = json.load(f)

# Create enhanced HTML template with interactive features
html_template = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KCNA Prep - Interactive Quiz</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1000px;
            margin: 0 auto;
        }

        .header {
            text-align: center;
            color: white;
            margin-bottom: 30px;
        }

        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }

        .header p {
            font-size: 1.1em;
            opacity: 0.9;
        }

        .stats {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            text-align: center;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            gap: 15px;
        }

        .stats strong {
            font-size: 1em;
        }

        .section-tabs {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 20px;
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            max-height: 200px;
            overflow-y: auto;
        }

        .section-btn {
            padding: 10px 20px;
            border: 2px solid #ddd;
            background: white;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            color: #333;
            font-size: 0.9em;
            white-space: nowrap;
        }

        .section-btn:hover {
            border-color: #667eea;
            color: #667eea;
        }

        .section-btn.active {
            background: #667eea;
            color: white;
            border-color: #667eea;
        }

        .controls {
            text-align: center;
            margin-bottom: 20px;
            display: flex;
            justify-content: center;
            gap: 10px;
            flex-wrap: wrap;
        }

        .controls button {
            padding: 10px 20px;
            font-size: 0.95em;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .reset-btn {
            background: #ff9800;
            color: white;
        }

        .reset-btn:hover {
            background: #e68900;
        }

        .results-btn {
            background: #2196F3;
            color: white;
        }

        .results-btn:hover {
            background: #0b7dda;
        }

        .results-panel {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            display: none;
        }

        .results-panel.show {
            display: block;
        }

        .results-panel h2 {
            color: #333;
            margin-bottom: 20px;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
        }

        .results-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }

        .result-card {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid #667eea;
        }

        .result-card.passed {
            border-left-color: #4caf50;
            background: #f1f8e9;
        }

        .result-card.failed {
            border-left-color: #f44336;
            background: #ffebee;
        }

        .result-label {
            font-size: 0.85em;
            color: #666;
            margin-bottom: 5px;
        }

        .result-value {
            font-size: 1.5em;
            font-weight: bold;
            color: #333;
        }

        .result-card.passed .result-value {
            color: #2e7d32;
        }

        .result-card.failed .result-value {
            color: #c62828;
        }

        .quiz-container {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
        }

        .question-card {
            background: white;
            border-radius: 10px;
            padding: 25px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .question-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .question-card.hidden {
            display: none;
        }

        .question-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            flex-wrap: wrap;
            gap: 10px;
        }

        .question-number {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 5px 12px;
            border-radius: 4px;
            font-size: 0.85em;
            font-weight: bold;
        }

        .section-badge {
            display: inline-block;
            background: #ff9800;
            color: white;
            padding: 5px 12px;
            border-radius: 4px;
            font-size: 0.8em;
            font-weight: bold;
        }

        .answer-status {
            display: inline-block;
            padding: 5px 12px;
            border-radius: 4px;
            font-size: 0.8em;
            font-weight: bold;
            color: white;
        }

        .answer-status.correct {
            background: #4caf50;
        }

        .answer-status.incorrect {
            background: #f44336;
        }

        .answer-status.unanswered {
            background: #9e9e9e;
        }

        .question-text {
            font-size: 1.15em;
            color: #333;
            margin-bottom: 20px;
            font-weight: 500;
            line-height: 1.6;
        }

        .options-container {
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px;
            margin-bottom: 20px;
        }

        .option {
            padding: 15px;
            border: 2px solid #ddd;
            background: white;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: flex-start;
            gap: 12px;
        }

        .option:hover:not(.disabled) {
            border-color: #667eea;
            background: #f0f4ff;
            transform: translateX(5px);
        }

        .option.selected {
            border-color: #667eea;
            background: #f0f4ff;
            border-width: 2px;
        }

        .option.selected.correct {
            border-color: #4caf50;
            background: #e8f5e9;
        }

        .option.selected.incorrect {
            border-color: #f44336;
            background: #ffebee;
        }

        .option.correct-answer {
            border-color: #4caf50;
            background: #e8f5e9;
        }

        .option.disabled {
            cursor: not-allowed;
            opacity: 0.7;
        }

        .option-label {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 35px;
            height: 35px;
            background: #667eea;
            color: white;
            border-radius: 50%;
            font-weight: bold;
            flex-shrink: 0;
            font-size: 0.9em;
        }

        .option.selected .option-label {
            background: #667eea;
        }

        .option.selected.correct .option-label {
            background: #4caf50;
        }

        .option.selected.incorrect .option-label {
            background: #f44336;
        }

        .option.correct-answer .option-label {
            background: #4caf50;
        }

        .option-text {
            color: #333;
            font-size: 0.95em;
            line-height: 1.4;
            flex: 1;
        }

        .feedback-section {
            margin-top: 20px;
            padding: 15px;
            border-radius: 6px;
            display: none;
        }

        .feedback-section.show {
            display: block;
        }

        .feedback-section.correct {
            background: #e8f5e9;
            border-left: 4px solid #4caf50;
        }

        .feedback-section.incorrect {
            background: #ffebee;
            border-left: 4px solid #f44336;
        }

        .feedback-label {
            font-weight: bold;
            margin-bottom: 8px;
            font-size: 0.95em;
        }

        .feedback-section.correct .feedback-label {
            color: #2e7d32;
        }

        .feedback-section.incorrect .feedback-label {
            color: #c62828;
        }

        .correct-answer-text {
            color: #2e7d32;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .explanation-text {
            color: #333;
            line-height: 1.6;
            margin-top: 10px;
            font-size: 0.95em;
        }

        .explanation-label {
            font-weight: bold;
            color: #333;
            margin-top: 10px;
            margin-bottom: 5px;
            font-size: 0.9em;
        }

        footer {
            text-align: center;
            color: white;
            margin-top: 40px;
            opacity: 0.8;
        }

        .no-results {
            text-align: center;
            color: white;
            padding: 40px;
            font-size: 1.2em;
        }

        .progress-bar {
            width: 100%;
            height: 8px;
            background: #ddd;
            border-radius: 4px;
            margin-top: 5px;
            overflow: hidden;
        }

        .progress-fill {
            height: 100%;
            background: #4caf50;
            transition: width 0.3s ease;
        }

        @media (max-width: 768px) {
            .header h1 {
                font-size: 1.8em;
            }

            .results-grid {
                grid-template-columns: 1fr;
            }

            .option {
                padding: 12px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📚 KCNA Prep - Interactive Quiz</h1>
            <p>Answer Questions & Get Instant Feedback</p>
        </div>

        <div class="stats">
            <strong>📊 Total: <span id="totalCount">0</span></strong>
            <strong>📖 Section: <span id="currentSection">All Sections</span></strong>
            <strong>✓ Answered: <span id="answeredCount">0</span></strong>
            <strong>⏰ Correct: <span id="correctCount">0</span></strong>
        </div>

        <div class="results-panel" id="resultsPanel">
            <h2>📊 Quiz Results by Section</h2>
            <div class="results-grid" id="resultsGrid"></div>
        </div>

        <div class="section-tabs" id="sectionTabs"></div>

        <div class="controls">
            <button class="results-btn" onclick="toggleResults()">📈 Show Results</button>
            <button class="reset-btn" onclick="resetQuiz()">🔄 Reset Quiz</button>
        </div>

        <div class="quiz-container" id="quizContainer"></div>

        <div id="noResults" class="no-results" style="display:none;">
            No questions found for this section.
        </div>

        <footer>
            <p>KCNA Certification Exam Preparation - Interactive Quiz Mode</p>
            <p>400 Questions across 7 sections | Select your answer to get instant feedback</p>
        </footer>
    </div>

    <script>
        // Quiz Data - All 400 questions
        const quizData = '''

# Add the quiz data as JSON
html_template += json.dumps(quiz_data, ensure_ascii=False, indent=12) + '''
        ;

        // Track user answers
        const userAnswers = {};
        let currentSection = "All Sections";

        // Initialize
        function initializeQuiz() {
            // Create section tabs
            const sections = [...new Set(quizData.map(q => q.section))].sort();
            const tabsContainer = document.getElementById('sectionTabs');
            
            // Add "All" button
            const allBtn = document.createElement('button');
            allBtn.className = 'section-btn active';
            allBtn.textContent = '📋 All Sections';
            allBtn.onclick = () => filterSection('All Sections', allBtn);
            tabsContainer.appendChild(allBtn);
            
            // Add individual section buttons
            sections.forEach(section => {
                const btn = document.createElement('button');
                btn.className = 'section-btn';
                btn.textContent = section;
                btn.onclick = () => filterSection(section, btn);
                tabsContainer.appendChild(btn);
            });

            renderQuestions();
            document.getElementById('totalCount').textContent = quizData.length;
            updateStats();
        }

        function filterSection(section, button) {
            currentSection = section;
            
            // Update active button
            document.querySelectorAll('.section-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            
            document.getElementById('currentSection').textContent = section;
            renderQuestions();
        }

        function renderQuestions() {
            const container = document.getElementById('quizContainer');
            const noResults = document.getElementById('noResults');
            container.innerHTML = '';
            
            const filteredQuestions = currentSection === 'All Sections' 
                ? quizData 
                : quizData.filter(q => q.section === currentSection);
            
            if (filteredQuestions.length === 0) {
                noResults.style.display = 'block';
                return;
            }
            
            noResults.style.display = 'none';
            
            filteredQuestions.forEach(question => {
                const card = createQuestionCard(question);
                container.appendChild(card);
            });
        }

        function createQuestionCard(question) {
            const card = document.createElement('div');
            card.className = 'question-card';
            card.id = `question-${question.id}`;

            const selectedAnswer = userAnswers[question.id];
            const isAnswered = selectedAnswer !== undefined;
            const isCorrect = isAnswered && selectedAnswer === question.correctAnswer;

            let statusHTML = '';
            if (isAnswered) {
                if (isCorrect) {
                    statusHTML = '<span class="answer-status correct">✓ Correct</span>';
                } else {
                    statusHTML = '<span class="answer-status incorrect">✗ Incorrect</span>';
                }
            } else {
                statusHTML = '<span class="answer-status unanswered">⊙ Not Answered</span>';
            }

            const optionsHTML = question.options
                .map(option => {
                    let optionClass = 'option';
                    if (isAnswered) {
                        optionClass += ' disabled';
                        if (option.label === selectedAnswer) {
                            optionClass += isCorrect ? ' selected correct' : ' selected incorrect';
                        }
                        if (option.label === question.correctAnswer) {
                            optionClass += ' correct-answer';
                        }
                    }
                    
                    return `
                        <div class="${optionClass}" onclick="selectAnswer(${question.id}, '${option.label}')">
                            <div class="option-label">${option.label}</div>
                            <div class="option-text">${option.text}</div>
                        </div>
                    `;
                })
                .join('');

            const feedbackClass = isAnswered ? (isCorrect ? 'correct' : 'incorrect') : '';
            const feedbackDisplay = isAnswered ? 'show' : '';
            
            const correctAnswerLabel = question.options.find(o => o.label === question.correctAnswer);

            card.innerHTML = `
                <div class="question-header">
                    <div>
                        <span class="question-number">Q${question.id}</span>
                        <span class="section-badge">${question.section}</span>
                    </div>
                    ${statusHTML}
                </div>
                <div class="question-text">${question.question}</div>
                <div class="options-container">
                    ${optionsHTML}
                </div>
                <div class="feedback-section ${feedbackClass} ${feedbackDisplay}" id="feedback-${question.id}">
                    <div class="feedback-label">${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</div>
                    <div class="correct-answer-text">Correct Answer: <strong>${question.correctAnswer}. ${correctAnswerLabel.text}</strong></div>
                    <div class="explanation-label">📖 Explanation:</div>
                    <div class="explanation-text">${question.explanation}</div>
                </div>
            `;

            return card;
        }

        function selectAnswer(questionId, answerLabel) {
            const question = quizData.find(q => q.id === questionId);
            
            // Only allow answering if not already answered
            if (userAnswers[questionId] !== undefined) return;
            
            userAnswers[questionId] = answerLabel;
            updateStats();
            renderQuestions();
        }

        function updateStats() {
            const answered = Object.keys(userAnswers).length;
            const correct = Object.keys(userAnswers).filter(qId => {
                const q = quizData.find(x => x.id == qId);
                return userAnswers[qId] === q.correctAnswer;
            }).length;
            
            document.getElementById('answeredCount').textContent = answered;
            document.getElementById('correctCount').textContent = correct;
        }

        function toggleResults() {
            const panel = document.getElementById('resultsPanel');
            panel.classList.toggle('show');
            
            if (panel.classList.contains('show')) {
                generateResults();
            }
        }

        function generateResults() {
            const sections = [...new Set(quizData.map(q => q.section))].sort();
            const resultsGrid = document.getElementById('resultsGrid');
            resultsGrid.innerHTML = '';

            let totalCorrect = 0;
            let totalAnswered = 0;

            sections.forEach(section => {
                const sectionQuestions = quizData.filter(q => q.section === section);
                const answered = sectionQuestions.filter(q => userAnswers[q.id] !== undefined).length;
                const correct = sectionQuestions.filter(q => {
                    if (userAnswers[q.id] === undefined) return false;
                    return userAnswers[q.id] === q.correctAnswer;
                }).length;

                totalCorrect += correct;
                totalAnswered += answered;

                const percentage = answered > 0 ? Math.round((correct / answered) * 100) : 0;
                const isPassed = percentage >= 70;

                const card = document.createElement('div');
                card.className = `result-card ${isPassed && answered > 0 ? 'passed' : 'failed'}`;
                card.innerHTML = `
                    <div class="result-label">${section}</div>
                    <div class="result-value">${correct}/${answered}</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percentage}%"></div>
                    </div>
                    <div class="result-label" style="margin-top: 8px;">${percentage}%</div>
                `;
                resultsGrid.appendChild(card);
            });

            // Overall score
            const overallCard = document.createElement('div');
            const overallPercentage = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
            const isOverallPassed = overallPercentage >= 70;
            overallCard.className = `result-card ${isOverallPassed && totalAnswered > 0 ? 'passed' : 'failed'}`;
            overallCard.innerHTML = `
                <div class="result-label">📊 Overall Score</div>
                <div class="result-value">${totalCorrect}/${totalAnswered}</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${overallPercentage}%"></div>
                </div>
                <div class="result-label" style="margin-top: 8px;">${overallPercentage}%</div>
            `;
            resultsGrid.appendChild(overallCard);
        }

        function resetQuiz() {
            if (confirm('Are you sure you want to reset all answers? This cannot be undone.')) {
                // Clear all answers
                for (let key in userAnswers) {
                    delete userAnswers[key];
                }
                updateStats();
                renderQuestions();
                
                // Hide results panel
                const panel = document.getElementById('resultsPanel');
                panel.classList.remove('show');
            }
        }

        document.addEventListener('DOMContentLoaded', initializeQuiz);
    </script>
</body>
</html>
'''

# Write the HTML file
output_file = r'c:\Users\Hp\Paragon-rental-system\KCNA_Interactive_Quiz.html'
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(html_template)

print(f"✅ Interactive Quiz created: {output_file}")
print(f"✓ Total questions: {len(quiz_data)}")
print(f"✓ File size: {len(html_template) / 1024:.1f} KB")
print(f"\nFeatures:")
print(f"  • Click on options to select answers")
print(f"  • Instant feedback with explanations")
print(f"  • Color-coded results (green=correct, red=wrong)")
print(f"  • Section-wise score tracking")
print(f"  • Overall performance metrics")
print(f"  • Reset quiz option")
