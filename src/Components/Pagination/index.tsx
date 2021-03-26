import React, { useState, useEffect } from 'react'
import { paginator } from '../../utils/pagination';
import { arrowDisableStyleHandler } from "../../utils/pagination";
import { useAppDispatch } from '../../redux/hooks'
import { fetchCharacters, Query, Gender, Status } from '../../redux/slices/characterSlice'
import { useDisplayState } from '../../Context/Display'

enum PaginationActions {
  Expand = -1,
  Back = -2,
  Forward = -3
}

interface Pagination {
  total: number,
  range: number,
}

export const Pagination = ({ total, range, }: Pagination) => {
  const [currentIndex, setCurrentIndex] = useState<number>(1)
  const [pages, setPages] = useState<number[]>([])
  const [filterByName, setFilterByName] = useState<string | undefined>(undefined)
  const [filterByStatus, setFilterByStatus] = useState<Status | undefined>(undefined)
  const [filterByGender, setFilterByGender] = useState<Gender | undefined>(undefined)
  const dispatch = useAppDispatch()
  const display = useDisplayState()

  const defaultStyle = "align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:shadow-outline-gray dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
  const activeStyle = "align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-white bg-green-400 border border-transparent active:bg-green-400 hover:bg-green-700 focus:shadow-outline-purple"

  const pageHandler = (idx: number) => {
    const firstPageIdx = pages[0]
    const lastPageIdx = pages[range - 1]
    // When dots, offset the index and update numbers
    // in any case, makes a page request
    if (idx < 0) {
      if (idx == PaginationActions.Expand) {
        idx = lastPageIdx + 1
      } else if (idx == PaginationActions.Back) {
        idx = currentIndex - 1
      } else if (idx == PaginationActions.Forward) {
        idx = currentIndex + 1
      }
    }

    // Rehydate when out of boundaries
    if (idx < firstPageIdx || idx > lastPageIdx || idx === total) {
      let override;
      if (idx == total) {
        override = total - range
      } else if (idx < firstPageIdx) {
        override = firstPageIdx - range
      } else {
        override = lastPageIdx + 1
      }
      const pages = paginator({
        total,
        range,
        currentIndex: Math.max(override, 1)
      })
      // Rehydate
      setPages(pages)
    }

    let query: Query = {
      page: idx
    }

    if (filterByName) {
      query = {
        ...query,
        name: filterByName
      }
    }

    if (filterByGender) {
      query = {
        ...query,
        gender: filterByGender
      }
    }

    if (filterByStatus) {
      query = {
        ...query,
        status: filterByStatus,
      }
    }

    dispatch(fetchCharacters({ query }))
    setCurrentIndex(idx)
  }

  useEffect(() => {
    const pages = paginator({
      total,
      range,
      currentIndex,
    })
    setPages(pages)
  }, [])

  useEffect(() => {
    const { query } = display
    if (query?.name) {
      setFilterByName(query.name)
    }
    if (query?.gender) {
      setFilterByGender(query.gender)
    }
    if (query?.status) {
      setFilterByStatus(query.status)
    }
    console.log("on display query", query)
  }, [display])

  return (
    <div className="flex mt-2 justify-end">
      <nav aria-label="Page navigation">
        <ul className="inline-flex items-center">
          <li>
            <button onClick={() => pageHandler(PaginationActions.Back)} className={`align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent ${arrowDisableStyleHandler(currentIndex == 1)}`} disabled={currentIndex == 1} type="button" aria-label="Previous">
              <svg className="h-3 w-3" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"></path>
              </svg>
            </button>
          </li>
          {
            pages.map((pageNumber, idx) => {
              if (pageNumber == PaginationActions.Expand) {
                return (
                  <li key={idx}>
                    <span className="px-2 py-1 cursor-pointer" onClick={() => pageHandler(pageNumber)}>...</span>
                  </li>
                )
              } else {
                return (
                  <li key={idx}>
                    <span
                      className={pageNumber == currentIndex ? activeStyle : defaultStyle}
                      onClick={() => pageHandler(pageNumber)}>
                        {pageNumber}
                    </span>
                  </li>                  
                )
              }
            })
          }
          <li>
            <button onClick={() => pageHandler(PaginationActions.Forward)} className={`align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:shadow-outline-gray dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10 ${arrowDisableStyleHandler(currentIndex == total)}`} disabled={currentIndex == total}  type="button" aria-label="Next">
              <svg className="h-3 w-3" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}