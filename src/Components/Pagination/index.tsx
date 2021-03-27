import React, { useCallback,useState, useEffect } from 'react'
import { paginator } from '../../utils/pagination';
import { arrowDisableStyleHandler } from "../../utils/pagination";
import {  Query, Gender, Status } from '../../redux/slices/characterSlice'
import { useDisplayState, } from '../../Context/Display'
import { pushState, getRouteSearchQuery, useRouteChange } from '../../Components/Router'

enum PaginationActions {
  Expand = -1,
  Back = -2,
  Forward = -3
}

interface Pagination {
  filters: number,
  page: number,
  total: number,
  range: number,
}

export const Pagination = ({ filters, page, total, range, }: Pagination) => {
  const [currentIndex, setCurrentIndex] = useState<number>(page)
  const [pages, setPages] = useState<number[]>([])
  const [filterByName, setFilterByName] = useState<string | undefined>(undefined)
  const [filterByStatus, setFilterByStatus] = useState<Status | undefined>(undefined)
  const [filterByGender, setFilterByGender] = useState<Gender | undefined>(undefined)
  const display = useDisplayState()
  const routeChange = useRouteChange({})

  const defaultStyle = "align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-base text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:shadow-outline-gray dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
  const activeStyle = "align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-base text-white bg-green-400 border border-transparent active:bg-green-400 hover:bg-green-700 focus:shadow-outline-purple"

  const pageHandler = useCallback((idx: number) => {
    ((idx: number) => {
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

        try {
          const pages = paginator({
            total,
            range,
            currentIndex: Math.max(override, 1)
          })
          // Rehydate
          setPages(pages)
        } catch (err) {
          console.warn(err)
        }
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

      setCurrentIndex(idx)

      const search = getRouteSearchQuery({
        fallbackValue: []
      })

      pushState({
        state: {
          ...search,
          page: idx,
        },
        title: `Page ${idx}`,
        url: `/page/${idx}${window.location.search}`,
      })
    })(idx)
  }, [pages, page, total, range])

  useEffect(() => {
    try {
      const pages = paginator({
        total,
        range,
        currentIndex
      })
      // reposition only, in range of lookup numbers
      setCurrentIndex(page)
    } catch (err) {
      console.warn(err)
    }
  }, [page])

  useEffect(() => {
    console.log('Pagination: page change', {
      routeChange, page,
       total, currentIndex,
    })
    
    if (window.location.pathname === "/") {
      try {
        const pages = paginator({
          total,
          range,
          currentIndex,
        })
  
        // Rehydate
        setPages(pages)
      } catch (err) {
        console.warn(err)
      }
    }
  }, [page, total, currentIndex])

  useEffect(() => {
    try {
      const pages = paginator({
        total,
        range,
        currentIndex,
      })
      setPages(pages)
    } catch (err) {
      console.warn(err)
    }
  }, [total])

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
  }, [display])

  return (
    <div className="flex mt-2 justify-end">
      <nav aria-label="Page navigation">
        <ul className="inline-flex items-center">
          <li>
            <button onClick={() => pageHandler(PaginationActions.Back)} className={`align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent ${arrowDisableStyleHandler(currentIndex == 1)}`} disabled={currentIndex == 1} type="button" aria-label="Previous">
              <svg className="h-6 w-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
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
              <svg className="h-6 w-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}