import './index.css'

const NotFound = () => (
  <div className="not-found-bg">
    <div className="not-found-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/exams-sr/not-found-img.png"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-text">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)

export default NotFound
