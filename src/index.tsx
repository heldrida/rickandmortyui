import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  // Strict mode checks are run in development mode only
  <React.StrictMode>
    <p>{'Hello world!'}</p>
  </React.StrictMode>,
  document.getElementById('root')
)
