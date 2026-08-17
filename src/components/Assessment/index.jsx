import {useState, useEffect, useContext, useCallback} from 'react'
import {useNavigate} from 'react-router'
import Cookies from 'js-cookie'
import Logo from '../Logo'
import EvaluationContext from '../../context/EvaluationContext'
import Failure from '../Failure'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const TOTAL_TIME = 600 // 10 minutes, in seconds

const formatTime = totalSeconds => {
  const safeSeconds = Math.max(0, totalSeconds)
  const hrs = Math.floor(safeSeconds / 3600)
  const mins = Math.floor((safeSeconds % 3600) / 60)
  const secs = safeSeconds % 60
  const pad = num => String(num).padStart(2, '0')
  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`
}

const Assessment = () => {
  const [questions, setQuestions] = useState([])
  const [total, setTotal] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timerLeft, setTimerLeft] = useState(TOTAL_TIME)
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const navigate = useNavigate()
  const {setScore, setTimeTakenInSeconds, setIsTimeUp} =
    useContext(EvaluationContext)

  const getQuestions = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const questionsApiUrl = 'https://apis.ccbp.in/assess/questions'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(questionsApiUrl, options)
      const data = await response.json()

      if (response.ok) {
        setQuestions(data.questions)
        setTotal(data.total)
        setCurrentQuestionIndex(0)
        setAnswers({})
        setTimerLeft(TOTAL_TIME)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch {
      setApiStatus(apiStatusConstants.failure)
    }
  }, [])

  useEffect(() => {
    getQuestions()
  }, [getQuestions])

  const currentQuestion = questions[currentQuestionIndex]

  // Auto-select the first option whenever a SINGLE_SELECT question is
  // opened for the first time (question not yet answered).
  useEffect(() => {
    if (apiStatus !== apiStatusConstants.success) {
      return
    }

    const question = questions[currentQuestionIndex]
    if (!question || question.options_type !== 'SINGLE_SELECT') {
      return
    }

    const firstOptionId = question.options?.[0]?.id
    if (firstOptionId === undefined) {
      return
    }

    setAnswers(prev => {
      if (prev[question.id] !== undefined) {
        return prev
      }
      return {...prev, [question.id]: firstOptionId}
    })
  }, [currentQuestionIndex, questions, apiStatus])

  const calculateScore = useCallback(
    () =>
      questions.reduce((scoreAcc, question) => {
        const selectedId = answers[question.id]
        if (selectedId === undefined) {
          return scoreAcc
        }
        const selectedOption = question.options.find(
          option => option.id === selectedId,
        )
        return selectedOption?.is_correct === 'true' ? scoreAcc + 1 : scoreAcc
      }, 0),
    [questions, answers],
  )

  const submitAssessment = useCallback(
    isTimeUp => {
      setScore(calculateScore())
      setTimeTakenInSeconds(TOTAL_TIME - timerLeft)
      setIsTimeUp(isTimeUp)
      navigate('/results', {replace: true})
    },
    [
      calculateScore,
      timerLeft,
      navigate,
      setScore,
      setTimeTakenInSeconds,
      setIsTimeUp,
    ],
  )

  useEffect(() => {
    if (apiStatus !== apiStatusConstants.success) {
      return undefined
    }

    const timerId = setInterval(() => {
      setTimerLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerId)
          return 0
        }

        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timerId)
  }, [apiStatus])

  useEffect(() => {
    if (apiStatus === apiStatusConstants.success && timerLeft === 0) {
      submitAssessment(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerLeft, apiStatus])

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }

  const onClickRetry = () => {
    getQuestions()
  }

  const optionsArray = currentQuestion?.options || []
  const type = currentQuestion?.options_type

  const answeredCount = Object.keys(answers).length
  const unAnsweredCount = total - answeredCount

  const onSelectOption = optionId => {
    if (!currentQuestion) {
      return
    }
    setAnswers(prev => ({...prev, [currentQuestion.id]: optionId}))
  }

  const onSelectDropdownOption = event => {
    onSelectOption(event.target.value)
  }

  const onClickQuestionNumber = index => {
    setCurrentQuestionIndex(index)
  }

  const onClickNext = () => {
    setCurrentQuestionIndex(prev => Math.min(prev + 1, questions.length - 1))
  }

  const onSubmitTest = () => {
    submitAssessment(false)
  }

  const renderQuestionNumbers = () => (
    <ul className='box-container question-numbers-list'>
      {questions.map((question, index) => (
        <li key={question.id} className='question-number-item'>
          <button
            type='button'
            className={
              index === currentQuestionIndex
                ? 'question-box current'
                : 'question-box'
            }
            onClick={() => onClickQuestionNumber(index)}
          >
            {index + 1}
          </button>
        </li>
      ))}
    </ul>
  )

  const renderOptions = () => {
    if (type === 'DEFAULT') {
      return (
        <ul className='options-container options-list'>
          {optionsArray.map(item => (
            <li key={item.id} className='option-item'>
              <button
                type='button'
                className={
                  answers[currentQuestion.id] === item.id
                    ? 'option-button selected'
                    : 'option-button'
                }
                onClick={() => onSelectOption(item.id)}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      )
    }

    if (type === 'IMAGE') {
      return (
        <ul className='image-options-container options-list'>
          {optionsArray.map(item => (
            <li key={item.id} className='option-item'>
              <button
                type='button'
                className={
                  answers[currentQuestion.id] === item.id
                    ? 'image-option selected'
                    : 'image-option'
                }
                onClick={() => onSelectOption(item.id)}
              >
                <img src={item.image_url} alt={item.text} />
              </button>
            </li>
          ))}
        </ul>
      )
    }

    if (type === 'SINGLE_SELECT') {
      const selectedValue =
        answers[currentQuestion.id] ?? optionsArray[0]?.id ?? ''

      return (
        <>
          <p className='single-select-note'>
            First option is selected by default
          </p>
          <select
            name='options'
            value={selectedValue}
            onChange={onSelectDropdownOption}
            className='options-select'
          >
            {optionsArray.map(item => (
              <option value={item.id} key={item.id}>
                {item.text}
              </option>
            ))}
          </select>
        </>
      )
    }

    return null
  }

  const renderLoader = () => (
    <div className='page'>
      <div className='nav'>
        <Logo />
        <button type='button' onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <div className='loader-container' data-testid='loader'>
        <div className='loader' />
      </div>
    </div>
  )

  const renderAssessmentContent = () => (
    <div className='assess'>
      <div className='question-section'>
        <p className='question-text'>{currentQuestion?.question_text}</p>

        <hr />

        {renderOptions()}

        {currentQuestionIndex < questions.length - 1 && (
          <button type='button' className='next-button' onClick={onClickNext}>
            Next Question
          </button>
        )}
      </div>

      <div className='question-summary'>
        <p className='timer-label'>Time Left</p>
        <p className='timer-value'>{formatTime(timerLeft)}</p>

        <div className='answer-summary'>
          <p className='answered-count'>{answeredCount}</p>
          <p className='answer-summary-label'>Answered Questions</p>

          <p className='unanswered-count'>{unAnsweredCount}</p>
          <p className='answer-summary-label'>Unanswered Questions</p>
        </div>

        <hr />

        <h1 className='questions-heading'>Questions ({total})</h1>

        {renderQuestionNumbers()}

        <button type='button' className='submit-button' onClick={onSubmitTest}>
          Submit Assessment
        </button>
      </div>
    </div>
  )

  if (apiStatus === apiStatusConstants.failure) {
    return <Failure onRetry={onClickRetry} onLogout={onClickLogout} />
  }

  if (apiStatus !== apiStatusConstants.success) {
    return renderLoader()
  }

  return (
    <div className='page'>
      <div className='nav'>
        <Logo />

        <button type='button' onClick={onClickLogout}>
          Logout
        </button>
      </div>

      {renderAssessmentContent()}
    </div>
  )
}

export default Assessment
