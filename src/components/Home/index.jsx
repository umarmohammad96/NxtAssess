import {Link, useNavigate} from 'react-router'
import Cookies from 'js-cookie'
import Logo from '../Logo'
import './index.css'

const Home = () => {
  const navigate = useNavigate()
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }

  return (
    <div className="page">
      <div className="nav">
        <Logo />
        <button type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <div className="body">
        <div className="card">
          <h1>Instructions</h1>
          <ol>
            <li>
              <span>Total Questions:</span> 10
            </li>
            <li>
              <span>Types of Questions:</span> MCQs
            </li>
            <li>
              <span>Duration:</span> 10 Mins
            </li>
            <li>
              <span>Marking Scheme:</span> Every Correct response, get 1 mark
            </li>
            <li>
              All the progress will be lost, if you reload during the assessment
            </li>
          </ol>
          <Link to="/assessment" replace>
            <button type="button">Start Assessment</button>
          </Link>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/exams-sr/home-img.png"
          alt="assessment"
        />
      </div>
    </div>
  )
}

export default Home
