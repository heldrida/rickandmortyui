import React, { useEffect, useState } from 'react'
import { fetchCharacters, Query } from '../../redux/slices/characterSlice'
import { useAppDispatch } from '../../redux/hooks'

const commonInputClass = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

interface InputFilterProps {
  callback: any,
  placeholder: string,
}

const InputFilter: React.FC<InputFilterProps> = ({ callback, placeholder }) => (
  <input
    className={commonInputClass}
    type="text"
    placeholder={placeholder}
    onChange={callback} />
)

interface SelectFilterProps {
  callback: any,
  placeholder: string,
  selected: string | undefined,
}

const SelectFilter: React.FC<SelectFilterProps> = ({ callback, placeholder, selected }) => (
  <div className="inline-block relative w-full">
    <select className={commonInputClass} value={selected || "default"} onChange={callback}>
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
  const dispatch = useAppDispatch()

  const [filterByPage, setFilterByPage] = useState<number>(1)
  const [filterByName, setFilterByName] = useState<string | undefined>(undefined)
  const [filterByStatus, setFilterByStatus] = useState<string | undefined>(undefined)
  const [filterByGender, setFilterByGender] = useState<string | undefined>(undefined)

  useEffect(() => {
    const filterObservers: Record<string, any> = {
      page: filterByPage,
      name: filterByName,
      status: filterByStatus,
      gender: filterByGender,
    }
    const query = Object.keys(filterObservers)
      .filter(key => filterObservers[key])
      .reduce((acc, key) => {
        acc[key] = filterObservers[key]
        return acc
      }, { page: filterByPage } as Query);    
    dispatch(fetchCharacters({ query  }))
  }, [filterByPage, filterByName, filterByGender, filterByStatus])

  return (
    <div className="px-4 md:px-0">
      <div className="mb-8">
        <InputFilter placeholder="Filter by name" callback={(evt) => setFilterByName(evt.target.value)} />
      </div>
      <div className="mb-8">
        <SelectFilter selected={filterByStatus} placeholder="Status" callback={(evt) => setFilterByStatus(evt.target.value)} />
      </div>
      <div className="mb-8">
        <SelectFilter selected={filterByGender} placeholder="Gender" callback={(evt) => setFilterByGender(evt.target.value)} />
      </div>
    </div>
  )
}