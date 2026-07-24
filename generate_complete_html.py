import json

# Read the complete quiz data
with open(r'c:\Users\Hp\Paragon-rental-system\quiz_data_all_sections.json', 'r', encoding='utf-8') as f:
    quiz_data = json.load(f)

# Create HTML template
html_template = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KCNA Prep - Complete Quiz Revision</title>
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
            max-width: 950px;
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

        .quiz-container {
            display: grid;
            grid-template-columns: 1fr;
            gap: 15px;
        }

        .question-card {
            background: white;
            border-radius: 10px;
            padding: 20px;
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
            align-items: start;
            margin-bottom: 15px;
        }

        .question-number {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 0.8em;
            font-weight: bold;
        }

        .section-badge {
            display: inline-block;
            background: #ff9800;
            color: white;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 0.75em;
            font-weight: bold;
        }

        .question-text {
            font-size: 1.1em;
            color: #333;
            margin-bottom: 15px;
            font-weight: 500;
            line-height: 1.5;
        }

        .options-container {
            background: #f8f9fa;
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 12px;
        }

        .option {
            padding: 10px;
            margin-bottom: 8px;
            border-left: 3px solid #ddd;
            background: white;
            border-radius: 3px;
            transition: all 0.3s ease;
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
            font-size: 0.95em;
        }

        .answer-explanation {
            background: #e8f5e9;
            border-left: 4px solid #4caf50;
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 10px;
            display: none;
        }

        .answer-explanation.show {
            display: block;
        }

        .answer-label {
            font-weight: bold;
            color: #2e7d32;
            margin-bottom: 5px;
            font-size: 0.9em;
        }

        .answer-text {
            color: #1b5e20;
            margin-bottom: 8px;
            font-weight: 600;
        }

        .explanation-label {
            font-weight: bold;
            color: #2e7d32;
            margin-top: 8px;
            margin-bottom: 5px;
            font-size: 0.9em;
        }

        .explanation-text {
            color: #1b5e20;
            line-height: 1.5;
            font-size: 0.95em;
        }

        .toggle-btn {
            background: #667eea;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9em;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        .toggle-btn:hover {
            background: #764ba2;
        }

        .toggle-btn.active {
            background: #4caf50;
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

        @media (max-width: 768px) {
            .header h1 {
                font-size: 1.8em;
            }

            .section-tabs {
                justify-content: center;
            }

            .controls {
                flex-direction: column;
            }

            .controls button {
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📚 KCNA Prep - Complete Quiz Revision</h1>
            <p>All Sections & Questions with Answers & Explanations</p>
        </div>

        <div class="stats">
            <strong>📊 Total Questions: <span id="totalCount">0</span></strong>
            <strong>📖 Current Section: <span id="currentSection">All Sections</span></strong>
            <strong>✓ Visible: <span id="visibleCount">0</span></strong>
        </div>

        <div class="section-tabs" id="sectionTabs"></div>

        <div class="controls">
            <button class="show-all-btn" onclick="showAllAnswers()">Show All Answers</button>
            <button class="hide-all-btn" onclick="hideAllAnswers()">Hide All Answers</button>
        </div>

        <div class="quiz-container" id="quizContainer"></div>

        <div id="noResults" class="no-results" style="display:none;">
            No questions found for this section.
        </div>

        <footer>
            <p>KCNA Certification Exam Preparation Material</p>
            <p>400 Questions across 7 sections</p>
        </footer>
    </div>

    <script>
        // Quiz Data - All 400 questions from all sections
        const quizData = '''

# Add the quiz data as JSON
html_template += json.dumps(quiz_data, ensure_ascii=False, indent=12) + '''
        ;

        let currentSection = "All Sections";

        // Initialize
        function initializeQuiz() {
            // Create section tabs
            const sections = [...new Set(quizData.map(q => q.section))];
            const tabsContainer = document.getElementById('sectionTabs');
            
            // Add "All" button
            const allBtn = document.createElement('button');
            allBtn.className = 'section-btn active';
            allBtn.textContent = 'All Sections';
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
            document.getElementById('visibleCount').textContent = filteredQuestions.length;
            
            filteredQuestions.forEach(question => {
                const card = createQuestionCard(question);
                container.appendChild(card);
            });
        }

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
                <div class="question-header">
                    <div>
                        <span class="question-number">Q${question.id}</span>
                        <span class="section-badge">${question.section}</span>
                    </div>
                </div>
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

        function showAllAnswers() {
            const filteredQuestions = currentSection === 'All Sections' 
                ? quizData 
                : quizData.filter(q => q.section === currentSection);
            
            filteredQuestions.forEach(question => {
                const answerDiv = document.getElementById(`answer-${question.id}`);
                const button = document.querySelector(`#question-${question.id} .toggle-btn`);
                if (answerDiv && button) {
                    answerDiv.classList.add('show');
                    button.textContent = 'Hide Answer & Explanation';
                    button.classList.add('active');
                }
            });
        }

        function hideAllAnswers() {
            const filteredQuestions = currentSection === 'All Sections' 
                ? quizData 
                : quizData.filter(q => q.section === currentSection);
            
            filteredQuestions.forEach(question => {
                const answerDiv = document.getElementById(`answer-${question.id}`);
                const button = document.querySelector(`#question-${question.id} .toggle-btn`);
                if (answerDiv && button) {
                    answerDiv.classList.remove('show');
                    button.textContent = 'Show Answer & Explanation';
                    button.classList.remove('active');
                }
            });
        }

        document.addEventListener('DOMContentLoaded', initializeQuiz);
    </script>
</body>
</html>
'''

# Write the HTML file
output_file = r'c:\Users\Hp\Paragon-rental-system\KCNA_Quiz_Revision_Complete.html'
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(html_template)

print(f"✓ Complete HTML file created: {output_file}")
print(f"✓ Total questions: {len(quiz_data)}")
print(f"✓ File size: {len(html_template) / 1024:.1f} KB")
print(f"\nQuestions by Section:")
sections = {}
for q in quiz_data:
    section = q.get('section')
    sections[section] = sections.get(section, 0) + 1

for section, count in sorted(sections.items()):
    print(f"  • {section}: {count} questions")

print(f"\n✅ All questions extracted successfully!")
print(f"📂 Open the HTML file in your browser to start studying!")
