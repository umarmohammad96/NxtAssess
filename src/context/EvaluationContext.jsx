import React from 'react'

const EvaluationContext = React.createContext({
  score: 0,
  timeTakenInSeconds: 0,
  setScore: () => {},
  setTimeTakenInSeconds: () => {},
})

export default EvaluationContext
