import React, { useCallback, useEffect, useState } from 'react'
import { Query, Gender, Status } from '../../redux/slices/characterSlice'
import { Button } from '../Button'
import { pushState } from '../Router';
import { querySearchTerms } from '../../utils/url'
import { getKeys } from '../../utils/object'
import { FILTER_DEBOUNCE_TIMEOUT_MS } from '../../utils/constants';
import { useDebounce } from '../../utils/hooks'

const commonInputClass = `
  shadow
  appearance-none
  border
  rounded
  w-full
  py-2
  px-3
  text-gray-700
  leading-tight
  focus:outline-none
  focus:shadow-outline
`

interface InputFilterProps {
  callback: any,
  name: string,
  placeholder: string,
  value?: string,
}

const InputFilter: React.FC<InputFilterProps> = ({ callback, name, placeholder, value }) => (
  <input
    className={commonInputClass}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => callback(name, e.target.value)}
    name={name}
    placeholder={placeholder}
    type="text"
    value={value} />
)

interface SelectFilterProps {
  callback: any,
  name: string,
  options: string[],
  placeholder: string,
  selected: string | undefined,
}

const SelectFilter: React.FC<SelectFilterProps> = ({ name, callback, options, placeholder, selected }) => (
  <div className="inline-block relative w-full">
    <select
      className={`${commonInputClass} cursor-pointer`}
      value={selected || "default"}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => callback(name, e.target.value)}>
      <option value="default" disabled>{placeholder}</option>
      {
        options.map((val, idx) => <option key={idx} value={val}>{val}</option>)
      }
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
    </div>
  </div>
)

type Filter = Partial<Query>

// Defaults
const initialFilterState: Filter = {
  gender: undefined,
  name: undefined,
  status: undefined,
}
let title = 'Root'
let url = '/'
let state = { page: 1 }


export const Sidebar = () => {
  const page = 1
  const [filter, setFilter] = useState<Filter>(initialFilterState)
  const debouncedFilter = useDebounce(filter, FILTER_DEBOUNCE_TIMEOUT_MS)

  useEffect(() => {
    const keys = getKeys(filter)
    const query = keys
      .filter(key => filter[key])
      .reduce((acc: Query, key) => {
        if (acc && filter && key && filter[key]) {
          acc[key] = filter[key]
        }
        return acc
      }, { page } as Query);    

    // Only trigger when non-page filters available
    // otherwise, request default
    if (Object.keys(query).length > 1) {
      state = query
      title = `Page ${page}`
      url = `/page/${page}?${querySearchTerms(filter)}`
    }

    pushState({
      state,
      title,
      url,
    })
  }, [debouncedFilter])

  // Helpers
  const hasAppliedFilters = useCallback(() =>
    Object.values(filter).filter(val => val).length > 0,
  [filter])
  
  const setFilterHandler = useCallback((name: string, value: string) => {
    const data = {
      ...filter,
      [name]: value,
    }
    setFilter(data)
  }, [filter])

  const reset = () => {
    setFilter(initialFilterState)
  }

  return (
    <div className="px-4 md:px-0">
      <div className="mb-8">
        <InputFilter
          name="name"
          value={filter.name || ""}
          placeholder="Filter by name"
          callback={setFilterHandler} />
      </div>
      <div className="mb-8">
        <SelectFilter
          name="status"
          options={Object.values(Status)}
          selected={filter.status}
          placeholder="Status"
          callback={setFilterHandler} />
      </div>
      <div className="mb-8">
        <SelectFilter
          name="gender"
          options={Object.values(Gender)}
          selected={filter.gender}
          placeholder="Gender"
          callback={setFilterHandler} />
      </div>
      {
        hasAppliedFilters() &&
        <Button placeholder="Clear" callback={reset} /> 
      }
    </div>
  )
}