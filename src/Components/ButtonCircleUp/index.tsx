import React, { useState, useEffect }  from 'react'
import debounce from 'lodash.debounce'

export const ButtonCircleUp: React.FC<{ menuOpen: boolean }> = ({menuOpen}) => {
  const [atBottom, setAtBottom] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)
  const scrollHandler = debounce(() => {
    const currentYPos = window.innerHeight + window.scrollY
    const targetYPos = document.body.scrollHeight
    const diff = 1 - (currentYPos / targetYPos)
    const isSM = innerWidth < 768
    setAtBottom(diff < 0.15)
    setShow(diff < 0.75)
  }, 300)

  useEffect(() => {
    window.addEventListener<any>('scroll', scrollHandler)
    return () => {
      window.removeEventListener<any>('scroll', scrollHandler)
    }
  }, [])

  return (
    <div
      onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      className={`${!menuOpen && show ? 'hover:scale-110 hover:opacity-80' : 'pointer-events-none opacity-0'} fixed ${atBottom ? '-translate-y-20' : '' } cursor-pointer translate-opacity translate-y-0 bottom-10 transform transition-all duration-300 right-5 md:right-10 shadow-md z-20 font-bold text-gray-700 rounded-full bg-yellow-200 flex items-center justify-center`}
      style={{ width: '4rem', height: '4rem', fontSize: '2rem' }}>
      <span className="pb-2">▲</span>
    </div>
  )
}