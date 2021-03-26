import React, { useCallback, useEffect, useState } from 'react'
import { fetchCharacters, Query, Gender, Status } from '../../redux/slices/characterSlice'
import { useAppDispatch } from '../../redux/hooks'
import { useSetDisplay, useDisplayState } from '../../Context/Display'
import { Button } from '../Button'
import { useDebounce } from '../../utils/hooks'
import { FILTER_DEBOUNCE_TIMEOUT_MS  } from '../../utils/constants';
import { getRouteValue, pushState } from '../Router';

const commonInputClass = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

interface InputFilterProps {
  callback: any,
  placeholder: string,
  value?: string,
}

const InputFilter: React.FC<InputFilterProps> = ({ callback, placeholder, value }) => (
  <input
    className={commonInputClass}
    type="text"
    placeholder={placeholder}
    onChange={callback}
    value={value} />
)

interface SelectFilterProps {
  callback: any,
  options: string[],
  placeholder: string,
  selected: string | undefined,
}

const SelectFilter: React.FC<SelectFilterProps> = ({ callback, options, placeholder, selected }) => (
  <div className="inline-block relative w-full">
    <select className={commonInputClass} value={selected || "default"} onChange={callback}>
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

export const Sidebar = () => {
  const dispatch = useAppDispatch()
  const setDisplay = useSetDisplay()
  // const display = useDisplayState()

  const [page, setPage] = useState<number>(1)
  const [filterByPage, setFilterByPage] = useState<number>(1)
  const [filterByName, setFilterByName] = useState<string | undefined>(undefined)
  const [filterByStatus, setFilterByStatus] = useState<string | undefined>(undefined)
  const [filterByGender, setFilterByGender] = useState<string | undefined>(undefined)
  const debouncedFilterByName = useDebounce(filterByName, FILTER_DEBOUNCE_TIMEOUT_MS);

  useEffect(() => {
    setPage(
      getRouteValue({ name: 'page', fallbackValue: 1, callback: parseInt })
    )
  }, [window.location.pathname])

  useEffect(() => {
    const filterObservers: Record<string, any> = {
      name: debouncedFilterByName,
      status: filterByStatus,
      gender: filterByGender,
    }
    const query = Object.keys(filterObservers)
      .filter(key => filterObservers[key])
      .reduce((acc, key) => {
        acc[key] = filterObservers[key]
        return acc
      }, { page: 1 } as Query);    

      // Only trigger when non-page filters available
      if (Object.keys(query).length > 1) {
        console.log("sidebar query", query)
        // dispatch(fetchCharacters({ query  }))
        // Update user display preferences
        // since required when paginating filtered by content
        // setDisplay({
        //   query
        // })

        pushState({
          state: query,
          title: `Page ${page}`,
          url: `/page/${page}?${Object.keys(filterObservers).filter(key => filterObservers[key]).map(key => `${key}=${filterObservers[key]}`).join('&')}`,
        })
      }
  }, [page, debouncedFilterByName, filterByGender, filterByStatus])

  const reset = () => [setFilterByGender, setFilterByName, setFilterByStatus].forEach(fn => fn(undefined))

  const hasAppliedFilters = useCallback(() => {
    return Object.values([filterByName, filterByStatus, filterByGender]).filter(val => val).length > 0
  }, [filterByName, filterByStatus, filterByGender, filterByPage])

  return (
    <div className="px-4 md:px-0">
      <div className="mb-8">
        <InputFilter value={filterByName || ""} placeholder="Filter by name" callback={(evt) => setFilterByName(evt.target.value)} />
      </div>
      <div className="mb-8">
        <SelectFilter options={Object.values(Status)} selected={filterByStatus} placeholder="Status" callback={(evt) => setFilterByStatus(evt.target.value)} />
      </div>
      <div className="mb-8">
        <SelectFilter options={Object.values(Gender)} selected={filterByGender} placeholder="Gender" callback={(evt) => setFilterByGender(evt.target.value)} />
      </div>
      {
        hasAppliedFilters() &&
        <Button placeholder="Clear" callback={reset} /> 
      }
    </div>
  )
}