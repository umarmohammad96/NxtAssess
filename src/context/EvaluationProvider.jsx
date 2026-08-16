import {useState} from 'react'
import EvaluationContext from './EvaluationContext'

const EvaluationProvider = ({children}) => {
  const [score, setScore] = useState(0)
  const [timeTakenInSeconds, setTimeTakenInSeconds] = useState(0)
  const [isTimeUp, setIsTimeUp] = useState(false)

  return (
    <EvaluationContext.Provider
      value={{
        score,
        setScore,
        timeTakenInSeconds,
        setTimeTakenInSeconds,
        isTimeUp,
        setIsTimeUp,
      }}
    >
      {children}
    </EvaluationContext.Provider>
  )
}

export default EvaluationProvider
