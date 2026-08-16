import {useContext} from 'react'
import {useNavigate} from 'react-router'
import Logo from '../Logo'
import EvaluationContext from '../../context/EvaluationContext'
import './index.css'

const Result = () => {
  const navigate = useNavigate()
  const {score, timeTakenInSeconds, isTimeUp, setScore, setTimeTakenInSeconds} =
    useContext(EvaluationContext)

  const onClickReAttempt = () => {
    setScore(0)
    setTimeTakenInSeconds(0)
    navigate('/assessment', {replace: true})
  }

  const minutes = Math.floor(timeTakenInSeconds / 60)
  const seconds = timeTakenInSeconds % 60
  const hours = Math.floor(minutes / 60)

  const formattedTimeTaken = `${String(hours).padStart(2, '0')}:${String(
    minutes % 60,
  ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  const renderTimeUpView = () => (
    <div className="result-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/exams-sr/time-up-img.png"
        alt="time up"
        className="result-image"
      />
      <h1 className="result-heading">Time is up!</h1>
      <p className="result-subtext">
        You did not complete the assessment within the time
      </p>
      <p className="score-label">Your score</p>
      <p className="score-value">{score}</p>
      <button
        className="reattempt-button"
        type="button"
        onClick={onClickReAttempt}
      >
        Reattempt
      </button>
    </div>
  )

  const renderSubmitView = () => (
    <div className="result-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/exams-sr/completed-img.png"
        alt="submit"
        className="result-image"
      />
      <h1 className="result-heading">Congrats! You completed the assessment</h1>
      <p className="time-taken-label">Time Taken</p>
      <p className="time-taken-value">{formattedTimeTaken}</p>
      <p className="score-label">Your score</p>
      <p className="score-value">{score}</p>
      <button
        className="reattempt-button"
        type="button"
        onClick={onClickReAttempt}
      >
        Reattempt
      </button>
    </div>
  )

  return (
    <div className="result-bg">
      <Logo />
      <div className="result-container">
        {isTimeUp ? renderTimeUpView() : renderSubmitView()}
      </div>
    </div>
  )
}

export default Result
