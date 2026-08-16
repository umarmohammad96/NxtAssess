import Logo from '../Logo'
import './index.css'

const Failure = ({onRetry, onLogout}) => (
  <div className="page">
    <div className="nav">
      <Logo />
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
    <div className="failure-body">
      <div className="failure-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/exams-sr/failure-img.png"
          alt="failure view"
          className="failure-image"
        />
        <h1 className="failure-heading">Oops! Something went wrong</h1>
        <p className="failure-text">We are having some trouble</p>
        <button type="button" className="retry-button" onClick={onRetry}>
          Retry
        </button>
      </div>
    </div>
  </div>
)

export default Failure
