import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  // Strict mode checks are run in development mode only
  <React.StrictMode>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
      {'Hello tailwindcss'}
    </button>
  </React.StrictMode>,
  document.getElementById('root')
)