import React from 'react'

interface Props {
  sidebar: React.ReactNode,
  content: React.ReactNode,
}

export const Layout: React.FC<Props> = ({ sidebar, content }) => {
  return (
    <div className="w-full">
      <div className="bg-gray-200 w-full z-50 flex justify-center items-center h-10 md:h-12 fixed md:relative md:sticky md:top-0">
        <div className="absolute inset-y-0 left-0 w-16 h-16 md:hidden">
          menu
        </div>
        Logo
      </div>
      <div className="w-full max-w-screen-2xl mx-auto pt-10">
        <div className="md:flex">
          <div className="z-20 bg-white fixed transform md:shadow-none md:-translate-x-0 flex-none h-full w-3/4 md:sticky md:top-0 md:w-80">
            {sidebar}
          </div>
          <div className="z-10 min-w-0 w-full flex-none md:flex-auto max-h-full">
            {content}
          </div>
        </div>
      </div>
    </div>
  )
}