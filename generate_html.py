import json

# Read the quiz data
with open(r'c:\Users\Hp\Paragon-rental-system\quiz_data.json', 'r', encoding='utf-8') as f:
    quiz_data = json.load(f)

# Create HTML template with all quiz data
html_template = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KCNA Prep - Quiz Revision Guide</title>
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
            max-width: 900px;
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

        .quiz-container {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
        }

        .question-card {
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .question-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }

        .question-number {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.85em;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .question-text {
            font-size: 1.2em;
            color: #333;
            margin-bottom: 20px;
            font-weight: 500;
        }

        .options-container {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }

        .option {
            padding: 12px;
            margin-bottom: 10px;
            border-left: 4px solid #ddd;
            background: white;
            border-radius: 4px;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .option:last-child {
            margin-bottom: 0;
        }

        .option:hover {
            background: #f0f0f0;
            border-left-color: #667eea;
        }

        .option-label {
            font-weight: bold;
            color: #667eea;
            margin-right: 8px;
        }

        .option-text {
            color: #555;
        }

        .answer-explanation {
            background: #e8f5e9;
            border-left: 4px solid #4caf50;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
            display: none;
        }

        .answer-explanation.show {
            display: block;
        }

        .answer-label {
            font-weight: bold;
            color: #2e7d32;
            margin-bottom: 8px;
            font-size: 0.95em;
        }

        .answer-text {
            color: #1b5e20;
            margin-bottom: 10px;
            font-weight: 500;
        }

        .explanation-label {
            font-weight: bold;
            color: #2e7d32;
            margin-top: 10px;
            margin-bottom: 5px;
            font-size: 0.95em;
        }

        .explanation-text {
            color: #1b5e20;
            line-height: 1.6;
        }

        .toggle-btn {
            background: #667eea;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.95em;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        .toggle-btn:hover {
            background: #764ba2;
            transform: scale(1.05);
        }

        .toggle-btn.active {
            background: #4caf50;
        }

        .controls {
            text-align: center;
            margin-bottom: 30px;
        }

        .controls button {
            margin: 0 10px;
            padding: 12px 25px;
            font-size: 1em;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .show-all-btn {
            background: #4caf50;
            color: white;
        }

        .show-all-btn:hover {
            background: #45a049;
        }

        .hide-all-btn {
            background: #f44336;
            color: white;
        }

        .hide-all-btn:hover {
            background: #da190b;
        }

        .stats {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            text-align: center;
            margin-bottom: 20px;
        }

        .stats strong {
            font-size: 1.1em;
        }

        footer {
            text-align: center;
            color: white;
            margin-top: 40px;
            opacity: 0.8;
            font-size: 0.9em;
        }

        @media (max-width: 768px) {
            .header h1 {
                font-size: 1.8em;
            }

            .question-text {
                font-size: 1.05em;
            }

            .controls button {
                padding: 10px 15px;
                font-size: 0.9em;
                margin: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📚 KCNA Prep - Quiz Revision Guide</h1>
            <p>Study Questions with Answers & Explanations</p>
        </div>

        <div class="stats">
            <strong>Total Questions: <span id="totalQuestions">0</span></strong>
        </div>

        <div class="controls">
            <button class="show-all-btn" onclick="showAllAnswers()">Show All Answers</button>
            <button class="hide-all-btn" onclick="hideAllAnswers()">Hide All Answers</button>
        </div>

        <div class="quiz-container" id="quizContainer"></div>

        <footer>
            <p>KCNA Prep Materials - Study and Revision Tool</p>
        </footer>
    </div>

    <script>
        // Quiz Data - KCNA Prep Questions ('''+ str(len(quiz_data)) +''' questions)
        const quizData = '''

# Add the quiz data as JSON
html_template += json.dumps(quiz_data, ensure_ascii=False, indent=12) + '''
        ;

        // Initialize Quiz
        function initializeQuiz() {
            const container = document.getElementById('quizContainer');
            container.innerHTML = '';

            quizData.forEach(question => {
                const questionCard = createQuestionCard(question);
                container.appendChild(questionCard);
            });

            document.getElementById('totalQuestions').textContent = quizData.length;
        }

        // Create Question Card
        function createQuestionCard(question) {
            const card = document.createElement('div');
            card.className = 'question-card';
            card.id = `question-${question.id}`;

            const optionsHTML = question.options
                .map(option => `
                    <div class="option">
                        <span class="option-label">${option.label}.</span>
                        <span class="option-text">${option.text}</span>
                    </div>
                `)
                .join('');

            card.innerHTML = `
                <span class="question-number">Question ${question.id}</span>
                <div class="question-text">${question.question}</div>
                <div class="options-container">
                    ${optionsHTML}
                </div>
                <div class="answer-explanation" id="answer-${question.id}">
                    <div class="answer-label">✓ Correct Answer:</div>
                    <div class="answer-text">${question.correctAnswer}</div>
                    <div class="explanation-label">📖 Explanation:</div>
                    <div class="explanation-text">${question.explanation}</div>
                </div>
                <button class="toggle-btn" onclick="toggleAnswer(${question.id})">Show Answer & Explanation</button>
            `;

            return card;
        }

        // Toggle Answer Visibility
        function toggleAnswer(questionId) {
            const answerDiv = document.getElementById(`answer-${questionId}`);
            const button = event.target;

            answerDiv.classList.toggle('show');
            
            if (answerDiv.classList.contains('show')) {
                button.textContent = 'Hide Answer & Explanation';
                button.classList.add('active');
            } else {
                button.textContent = 'Show Answer & Explanation';
                button.classList.remove('active');
            }
        }

        // Show All Answers
        function showAllAnswers() {
            quizData.forEach(question => {
                const answerDiv = document.getElementById(`answer-${question.id}`);
                const button = document.querySelector(`#question-${question.id} .toggle-btn`);
                answerDiv.classList.add('show');
                button.textContent = 'Hide Answer & Explanation';
                button.classList.add('active');
            });
        }

        // Hide All Answers
        function hideAllAnswers() {
            quizData.forEach(question => {
                const answerDiv = document.getElementById(`answer-${question.id}`);
                const button = document.querySelector(`#question-${question.id} .toggle-btn`);
                answerDiv.classList.remove('show');
                button.textContent = 'Show Answer & Explanation';
                button.classList.remove('active');
            });
        }

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', initializeQuiz);
    </script>
</body>
</html>
'''

# Write the HTML file
output_file = r'c:\Users\Hp\Paragon-rental-system\KCNA_Quiz_Revision.html'
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(html_template)

print(f"✓ HTML file created: {output_file}")
print(f"✓ Total questions: {len(quiz_data)}")
print(f"✓ File size: {len(html_template) / 1024:.1f} KB")
print(f"\nYou can now open the HTML file in your browser to study!")
