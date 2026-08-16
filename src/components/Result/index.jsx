import {useContext} from 'react'
import {useNavigate} from 'react-router'
import Cookies from 'js-cookie'
import Logo from '../Logo'
import EvaluationContext from '../../context/EvaluationContext'
import './index.css'

const formatTime = totalSeconds => {
  const safeSeconds = Math.max(0, totalSeconds)
  const hrs = Math.floor(safeSeconds / 3600)
  const mins = Math.floor((safeSeconds % 3600) / 60)
  const secs = safeSeconds % 60
  const pad = num => String(num).padStart(2, '0')
  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`
}

const Result = () => {
  const navigate = useNavigate()
  const {
    score,
    timeTakenInSeconds,
    isTimeUp,
    setScore,
    setTimeTakenInSeconds,
    setIsTimeUp,
  } = useContext(EvaluationContext)

  const onClickReAttempt = () => {
    setScore(0)
    setTimeTakenInSeconds(0)
    setIsTimeUp(false)
    navigate('/assessment', {replace: true})
  }

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }

  const formattedTimeTaken = formatTime(timeTakenInSeconds)

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
      <div className="nav">
        <Logo />
        <button type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <div className="result-container">
        {isTimeUp ? renderTimeUpView() : renderSubmitView()}
      </div>
    </div>
  )
}

export default Result
