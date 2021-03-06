import React, { useCallback,useState, useEffect } from 'react'
import { paginator } from '../../utils/pagination';
import { arrowDisableStyleHandler } from "../../utils/pagination";
import { useRouteChange } from '../../Components/Router'


// Long styles
const defaultStyle = `
  align-bottom
  inline-flex
  items-center
  justify-center
  cursor-pointer
  leading-5
  transition-colors
  duration-150
  font-medium
  focus:outline-none
  px-3
  py-1
  rounded-md
  text-base
  text-gray-600
  dark:text-gray-400
  focus:outline-none
  border
  border-transparent
  active:bg-transparent
  hover:bg-gray-100
  focus:shadow-outline-gray
  dark:hover:bg-gray-500
  dark:hover:text-gray-300
  dark:hover:bg-opacity-10
`
const activeStyle = `
  align-bottom
  inline-flex
  items-center
  justify-center
  cursor-pointer
  leading-5
  transition-colors
  duration-150
  font-medium
  focus:outline-none
  px-3 py-1
  rounded-md
  text-base
  text-white
  bg-green-400
  border
  border-transparent
  active:bg-green-400
  hover:bg-green-700
  focus:shadow-outline-purple
`

const buttonBackCn = (currentIndex: number) => `
  align-bottom
  inline-flex
  items-center
  justify-center
  cursor-pointer
  leading-5
  transition-colors
  duration-150
  font-medium
  focus:outline-none
  p-2
  rounded-md
  text-gray-600
  dark:text-gray-400
  focus:outline-none
  border
  border-transparent
  ${arrowDisableStyleHandler(currentIndex == 1)}
`

const buttonForwardCn = (currentIndex: number, total: number) => `
  align-bottom
  inline-flex
  items-center
  justify-center
  cursor-pointer
  leading-5
  transition-colors
  duration-150
  font-medium
  focus:outline-none
  p-2
  rounded-md
  text-gray-600
  dark:text-gray-400
  focus:outline-none
  border
  border-transparent
  active:bg-transparent
  hover:bg-gray-100
  focus:shadow-outline-gray
  dark:hover:bg-gray-500
  dark:hover:text-gray-300
  dark:hover:bg-opacity-10
  ${arrowDisableStyleHandler(currentIndex == total)}
`

enum PaginationActions {
  Expand = -1,
  Back = -2,
  Forward = -3
}

interface Pagination {
  page: number,
  total: number,
  range: number,
  onIndexChange: ({ idx }: { idx : number }) => void,
}

export const Pagination = ({ page, total, range, onIndexChange, }: Pagination) => {
  const [currentIndex, setCurrentIndex] = useState<number>(page)
  const [pages, setPages] = useState<number[]>([])
  const routeChange = useRouteChange({})

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

      setCurrentIndex(idx)

      onIndexChange({
        idx
      })
    })(idx)
  }, [pages, page, total, range, onIndexChange])

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
  }, [routeChange, page, total, currentIndex])

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

  return (
    <div className="flex mt-2 justify-end">
      <nav aria-label="Page navigation">
        <ul className="inline-flex items-center">
          <li>
            <button onClick={() => pageHandler(PaginationActions.Back)}
                    className={buttonBackCn(currentIndex)} disabled={currentIndex == 1} type="button" aria-label="Previous">
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
            <button onClick={() => pageHandler(PaginationActions.Forward)}
                    className={buttonForwardCn(currentIndex, total)}
                    disabled={currentIndex == total}
                    type="button"
                    aria-label="Next">
              <svg className="h-6 w-6"
                   aria-hidden="true"
                   fill="currentColor"
                   viewBox="0 0 20 20">
                    <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                          fillRule="evenodd"></path>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}