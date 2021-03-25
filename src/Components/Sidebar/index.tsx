import React from 'react'

const commonInputClass = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

interface InputFilterProps {
  placeholder: string,
}

const InputFilter: React.FC<InputFilterProps> = ({ placeholder }) => (
  <input
    className={commonInputClass}
    type="text"
    placeholder={placeholder} />
)

interface SelectFilterProps {
  placeholder: string,
}

const SelectFilter: React.FC<SelectFilterProps> = ({ placeholder }) => (
  <div className="inline-block relative w-full">
    <select className={commonInputClass} value={"default"} >
      <option value="default" disabled>{placeholder}</option>
      <option>Option 1</option>
      <option>Option 2</option>
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
    </div>
  </div>
)

export const Sidebar = () => {
  return (
    <div className="px-4">
      <div className="mb-8">
        <InputFilter placeholder="Filter by name" />
      </div>
      <div className="mb-8">
        <SelectFilter placeholder="Status" />
      </div>
      <div className="mb-8">
        <SelectFilter placeholder="Gender" />
      </div>
    </div>
  )
}