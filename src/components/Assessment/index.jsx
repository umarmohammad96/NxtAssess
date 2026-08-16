import Logo from '../Logo'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router'
import Cookies from 'js-cookie'
import './index.css'

const Assessment = () => {
  const [currentQuestionIndex, setNextQuestionIndex] = useState(0)
  const [questionData, setQuestionData] = useState([])
  const [marks, setMarks] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [unAnswered, setUnAnswered] = useState(0)
  const [selectedOption, setSelectedOption] = useState('')
  const [timerLeft, setTimerLeft] = useState(600)

  const navigate = useNavigate()

  useEffect(() => {
    const getResponse = async () => {
      const jwtToken = Cookies.get('jwt_token')
      const questionApiUrl = 'https://apis.ccbp.in/assess/questions'

      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }

      const response = await fetch(questionApiUrl, options)
      const data = await response.json()

      if (response.ok) {
        setQuestionData(data.questions)
        setUnAnswered(data.questions.length)
      }
    }

    getResponse()
  }, [])

  useEffect(() => {
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
  }, [])

  const onClickLogout = () => {
    navigate('/login', {replace: true})
  }

  const currentQuestion = questionData[currentQuestionIndex]
  const optionsArray = currentQuestion?.options || []
  const type = currentQuestion?.options_type

  const minutes = Math.floor(timerLeft / 60)
  const seconds = timerLeft % 60

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
    seconds,
  ).padStart(2, '0')}`

  const onSelectOption = item => {
    setSelectedOption(item.id)
  }

  const onSelectDropdownOption = event => {
    setSelectedOption(event.target.value)
  }

  const onClickNext = () => {
    if (selectedOption === '') {
      alert('Please select an option')
      return
    }

    const selectedAnswer = optionsArray.find(item => item.id === selectedOption)

    if (selectedAnswer?.is_correct === 'true') {
      setMarks(prev => prev + 1)
    }

    setAnswered(prev => prev + 1)
    setUnAnswered(prev => prev - 1)

    if (currentQuestionIndex < questionData.length - 1) {
      setNextQuestionIndex(prev => prev + 1)
      setSelectedOption('')
    } else {
      const finalMarks = marks + (selectedAnswer?.is_correct === 'true' ? 1 : 0)

      console.log('Final Marks:', finalMarks)
    }
  }

  const onSubmitTest = () => {
    navigate('/result', {replace: true})
  }

  const renderOptionButtons = () => {
    if (type === 'DEFAULT') {
      return (
        <div className="options-container">
          {optionsArray.map(item => (
            <button
              type="button"
              key={item.id}
              className={
                selectedOption === item.id
                  ? 'option-button selected'
                  : 'option-button'
              }
              onClick={() => onSelectOption(item)}
            >
              {item.text}
            </button>
          ))}
        </div>
      )
    }

    if (type === 'IMAGE') {
      return (
        <div className="image-options-container">
          {optionsArray.map(item => (
            <button
              type="button"
              key={item.id}
              className={
                selectedOption === item.id
                  ? 'image-option selected'
                  : 'image-option'
              }
              onClick={() => onSelectOption(item)}
            >
              <img src={item.image_url} alt={item.text} />
            </button>
          ))}
        </div>
      )
    }

    if (type === 'SINGLE_SELECT') {
      return (
        <select
          name="options"
          value={selectedOption}
          onChange={onSelectDropdownOption}
          className="options-select"
        >
          {optionsArray.map(item => (
            <option value={item.id} key={item.id}>
              {item.text}
            </option>
          ))}
        </select>
      )
    }

    return null
  }

  return (
    <div className="page">
      <div className="nav">
        <Logo />

        <button type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>

      <div className="assess">
        <div className="question-section">
          <h1>
            {currentQuestionIndex + 1}.{currentQuestion?.question_text}
          </h1>

          <hr />

          {renderOptionButtons()}

          <button type="button" className="next-button" onClick={onClickNext}>
            Next Question
          </button>
        </div>

        <div className="question-summary">
          <h1 className="timer-heading">
            Time Left
            <span className="timer">{formattedTime}</span>
          </h1>

          <div className="answer-summary">
            <span className="answered">{answered}</span>
            <span>Answered Questions</span>

            <span className="unanswered">{unAnswered}</span>
            <span>Unanswered Questions</span>
          </div>

          <hr />

          <h1 className="questions-heading">
            Questions({questionData.length})
          </h1>

          <div className="box-container">
            {questionData.map((question, index) => (
              <div
                key={question.id}
                className={
                  index === currentQuestionIndex
                    ? 'question-box current'
                    : 'question-box'
                }
              >
                {index + 1}
              </div>
            ))}
          </div>

          <button
            type="button"
            className="submit-button"
            onClick={onSubmitTest}
          >
            Submit Test
          </button>
        </div>
      </div>
    </div>
  )
}

export default Assessment
