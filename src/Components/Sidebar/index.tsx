import React from 'react'

interface InputFilterProps {
  placeholder: string,
}

const InputFilter: React.FC<InputFilterProps> = ({ placeholder }) => (
  <input
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    type="text"
    placeholder={placeholder} />
)

export const Sidebar = () => {
  return (
    <div className="px-4">
      <div className="mb-8">
        <InputFilter placeholder="Filter by name" />
      </div>
    </div>
  )
}