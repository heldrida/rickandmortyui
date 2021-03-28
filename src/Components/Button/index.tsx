import React from 'react'

interface ButtonProps {
  placeholder: string,
  callback?: () => void,
}

export const Button: React.FC<ButtonProps> = ({ placeholder, callback }) => (
  <button
    className="transition-all duration-300 bg-green-400 hover:bg-green-300 text-white font-bold py-2 px-4 rounded"
    onClick={callback}
  >
    {placeholder}
  </button>
)