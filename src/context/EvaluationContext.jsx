import React from 'react'

const EvaluationContext = React.createContext({
  score: 0,
  timeTakenInSeconds: 0,
  isTimeUp: false,
  setScore: () => {},
  setTimeTakenInSeconds: () => {},
  setIsTimeUp: () => {},
})

export default EvaluationContext
