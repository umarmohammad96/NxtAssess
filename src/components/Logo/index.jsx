import {Link} from 'react-router'
import './index.css'

const Logo = () => {
  return (
    <Link to="/" className="logo-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-assess-logo-img.png"
        alt="website logo"
        className="logo-image"
      />
    </Link>
  )
}

export default Logo
