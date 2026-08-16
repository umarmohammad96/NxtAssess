//  Write your code here
import Logo from '../Logo'
import {useNavigate} from 'react-router'
import Cookies from 'js-cookie'
import './index.css'

const Home = () => {
  const navigate = useNavigate()
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }

  const onSubmit = () => {
    navigate('/assessment', {replace: true})
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
              All the progress will be lost, if you reload during assessment
            </li>
          </ol>
          <button type="button" onClick={onSubmit}>
            Start Assessment
          </button>
        </div>
        <img
          src="https://www.figma.com/design/9v8qt3eNxyBQrqYBfoaUVJ/NXT-Assess?node-id=1-565&t=xqzVAscUCfE7vmdd-4"
          alt="image"
        />
      </div>
    </div>
  )
}

export default Home
