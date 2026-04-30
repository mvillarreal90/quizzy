# 🎯 Quizzy – React Quiz App

A simple and interactive quiz application built with React. It fetches trivia questions from an external API, allows users to select answers, and displays their final score.

---

## 🚀 Features

- Fetches 5 random quiz questions from Trivia API
- Multiple-choice answers (shuffled each game)
- Select and lock answers
- Score calculation after submission
- Visual feedback for correct and incorrect answers
- Restart and play again functionality

---

## 🛠️ Tech Stack

- **React** (Hooks: `useState`)
- **JavaScript**
- **CSS**
- **html-entities** (for decoding API text)
- **clsx** (for conditional classNames)

---

## 🌐 API Used

- [Open Trivia Database](https://opentdb.com/)
- Endpoint:
  `https://opentdb.com/api.php?amount=5`

---

## 🧠 How It Works

1. User clicks **Start Quiz**
2. App fetches 5 questions from the API
3. Answers are shuffled and displayed
4. User selects one answer per question
5. Clicking **Check Answers**:
   - Locks selections
   - Highlights correct and incorrect answers
   - Displays final score

6. User can restart with **Play Again**
