import React, { useState, useEffect } from 'react';
import './App.css';

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']

const getRandomColor = () => {
  const color = new Array(6)
    .fill('')
    .map(() => digits[Math.floor(Math.random() * digits.length)])
    .join('')

  return `#${color}`
}

enum Results {
  correct,
  wrong
}

const App: React.FC = () => {
  const [color, setColor] = useState('')
  const [answers, setAnswers] = useState<string[]>([])
  const [isCorrect, setIsCorrect] = useState<Results | undefined>(undefined)
  const [answersCount, setAnswersCount] = useState(0)

  const generateColor = () => {
    const actualColor = getRandomColor()
    setColor(actualColor)
    setAnswers([actualColor, getRandomColor(), getRandomColor()].sort(() => 0.5 - Math.random()))
  }

  useEffect(() => {
    generateColor()
  }, [])

  const handleClickAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const answer = e.currentTarget.innerText
    if (answer === color) {
      setIsCorrect(Results.correct)
      generateColor()
      setAnswersCount(prev => prev + 1)
    } else {
      setIsCorrect(Results.wrong)
      setAnswersCount(0)
    }
  }

  const refreshGame = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    generateColor()
    setIsCorrect(undefined)
    setAnswersCount(0)
  }

  return (
    <div className="App">
      <h1>Guess the color!!! <span>if you can</span></h1>
      <div className="box" style={{ backgroundColor: color }}></div>
      <div className='counter'>
        <p>Corrects: {answersCount}</p>
        <button onClick={refreshGame}>Refresh</button>
      </div>
      <div className='buttons'>
        {
          answers.map(answer => (
            <button onClick={handleClickAnswer} key={answer}>{answer}</button>
          ))
        }
      </div>
      <div className='alerts'>
        {
          isCorrect === Results.correct && <p className='correct'>Cool it's correct!!!</p>
        }
        {
          isCorrect === Results.wrong && <p className='wrong'>Ops! thats incorrect</p>
        }
      </div>
      <footer>{new Date().getFullYear()} Andrés Florez. All Rights Reserved.</footer>
    </div>
  );
}

export default App;
