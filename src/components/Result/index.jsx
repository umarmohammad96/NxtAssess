import {useNavigate} from 'react-router'
import Logo from '../Logo'

const Result = () => {
  const navigate = useNavigate()

  const onClickReAttempt = () => {
    navigate('/assessment', {replace: true})
  }

  return (
    <div>
      <Logo />
      <div>
        <img
          src="https://www.figma.com/design/9v8qt3eNxyBQrqYBfoaUVJ/NXT-Assess?node-id=1-994&t=61OGIGFVGdbaDObU-4"
          alt="image"
        />
        <h1>Congrats! You completed the assessment</h1>
        <p>Time Taken: </p>
        <h1>Your Score: </h1>
        <button className="button" type="button" onClick={onClickReAttempt}>
          Reattempt
        </button>
      </div>
    </div>
  )
}

export default Result
