import {FaGraduationCap} from 'react-icons/fa'
import './index.css'

const Logo = () => {
  return (
    <div className="logo-container">
      <div className="logo-icon-container">
        <FaGraduationCap className="logo-icon" />
        <span className="logo-line logo-line-one"></span>
        <span className="logo-line logo-line-two"></span>
        <span className="logo-line logo-line-three"></span>
      </div>

      <h1 className="heading">
        <span className="nxt-text">NXT</span>
        <span className="assess-text">Assess</span>
      </h1>
    </div>
  )
}

export default Logo