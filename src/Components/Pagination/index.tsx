import React from 'react'
import { paginator } from '../../utils/pagination';

export const Pagination = () => {
  const currentIndex = 1
  const pages = paginator({
    total: 100,
    range: 5,
    currentIndex,
  })

  const defaultStyle = "align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:shadow-outline-gray dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10"
  const activeStyle = "align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-white bg-green-400 border border-transparent active:bg-green-400 hover:bg-green-700 focus:shadow-outline-purple"

  return (
    <div className="flex mt-2 justify-end">
      <nav aria-label="Page navigation">
        <ul className="inline-flex items-center">
          <li>
            <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent opacity-50 cursor-not-allowed" disabled type="button" aria-label="Previous">
              <svg className="h-3 w-3" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path>
              </svg>
            </button>
          </li>
          {
            pages.map(pageNumber => {
              if (pageNumber == -1) {
                return (
                  <li>
                    <span className="px-2 py-1">...</span>
                  </li>
                )
              } else {
                return (
                  <li>
                    <button className={pageNumber == currentIndex ? activeStyle : defaultStyle} type="button">{pageNumber}</button>
                  </li>                  
                )
              }
            })
          }
          <li>
            <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:shadow-outline-gray dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10" type="button" aria-label="Next">
              <svg className="h-3 w-3" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}