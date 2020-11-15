
// const src = document.querySelector('#img')
const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progress-text')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progress-bar-full')

let currentImage = []
let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

// var img = new Image(100,100)
// img.src = "img/wastetime.jpg"
// var src = document.getElementById("img")

//
// var img2 = new Image(100,100)
// img2.src = "img/wastetime2.jpg"
// var src = document.querySelector("img")
// src.appendChild(img2)

let questions = [

  {
    question: 'How many players are allowed on the field at a time for each team?',
    choice1: '9',
    choice2: '12',
    choice3: '10',
    choice4: '11',
    answer: 4,
  },
  {
    question: 'Which position guards the wide receiver?',
    choice1: 'Safety',
    choice2: 'Cornerback',
    choice3: 'Quarterback',
    choice4: 'Lineman',
    answer: 2,
  },
  {
    question: 'If the ball is caught on the sideline, how many steps must touch in bounds in the NFL?',
    choice1: '1',
    choice2: '2',
    choice3: '3',
    choice4: '4',
    answer: 2,
  },
  {
    question: 'What choice does a team have after scoring a touchdown?',
    choice1: 'Extra Point Kick',
    choice2: 'Two Point Conversion',
    choice3: 'Field Goal',
    choice4: 'Either A or B',
    answer: 4,
  },
  {
    question: 'How many points is a field goal worth?',
    choice1: '1',
    choice2: '2',
    choice3: '3',
    choice4: '4',
    answer: 3,
  },
  {
    question: 'When does a 2 minute warning occur?',
    choice1: 'At the end of each quarter',
    choice2: 'At the end of the 2nd quarter',
    choice3: 'At the end of the 4th quarter',
    choice4: 'Both B and C',
    answer: 4,
  },
  {
    question: 'How many games does each team play before the playoffs?',
    choice1: '10',
    choice2: '16',
    choice3: '20',
    choice4: '17',
    answer: 2,
  },
  {
    question: 'How many teams make up each division in the NFL?',
    choice1: '2',
    choice2: '4',
    choice3: '8',
    choice4: '16',
    answer: 2,
  },
  {
    question: 'How many teams make up each conference?',
    choice1: '2',
    choice2: '4',
    choice3: '8',
    choice4: '16',
    answer: 4,
  },
  {
    question: 'Which is the only football team that only has their logo on the right side of their helmet?',
    choice1: 'Steelers',
    choice2: 'Bears',
    choice3: 'Browns',
    choice4: 'Buccaneers',
    answer: 1,
  }
  //10 questions
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestions()

}

getNewQuestions = () => {
  if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('end.html')
  }

  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`


  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

  // img.innerText = currentQuestion.img

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })


  availableQuestions.splice(questionsIndex, 1)

  acceptingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if(classToApply === 'correct') {
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestions()
    }, 1000)
  })
})

incrementScore = num => {
  score +=num
  scoreText.innerText = score
}

startGame()
