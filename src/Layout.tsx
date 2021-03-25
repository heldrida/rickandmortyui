import React, { useState, useEffect }  from 'react'
import { useDisplayState, useSetDisplay } from './Context/Display';

const commonYOffset = "pt-20 md:pt-0"

interface LayoutProps {
  sidebar: React.ReactNode,
  content: React.ReactNode,
}

export const Layout: React.FC<LayoutProps> = ({ sidebar, content }) => {
  const display = useDisplayState()
  const setDisplay = useSetDisplay()
  const [transition, setTransition] = useState<boolean>(false)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const menuToggle = () => setMenuOpen(!menuOpen)

  useEffect(() => {
    function onWindowResize(e: UIEvent) {
      const el = e.target as Window
      if (!transition && el.innerWidth < 768) {
        setTransition(true)
      } else if (transition && el.innerWidth >= 768) {
        setTransition(false)
      }
    }
    window.addEventListener("resize", onWindowResize)
    return () => window.removeEventListener("resize", onWindowResize);
  }, [transition]);

  return (
    <div className="w-full">
      <div className="shadow-sm md:shadow-none bg-white w-full z-50 flex justify-center items-center h-14 md:h-12 fixed md:relative md:top-0">
        <div className="absolute inset-y-0 left-0 w-16 h-16 md:hidden" onClick={menuToggle}>
          menu
        </div>
        Logo
      </div>
      <div className="w-full max-w-screen-2xl mx-auto md:pt-5">
        <div className="md:flex">
          {
            !display.details &&
            <Main
              menuOpen={menuOpen}
              transition={transition}
              setMenuOpen={setMenuOpen}
              sidebar={sidebar}
              content={content}
            /> ||
            <Details
              setDisplay={setDisplay}
            />
          }
        </div>
      </div>
    </div>
  )
}

interface MainProps extends LayoutProps {
  menuOpen: boolean,
  setMenuOpen: any,
  transition: boolean,
}

const Main: React.FC<MainProps> = ({ menuOpen, transition, setMenuOpen, sidebar, content }) => (
  <>
    <div className={`${commonYOffset} bg-white z-20 ${transition ? 'transition-transform' : 'transition-none'} duration-300 md:transition-none bg-white fixed transform ${menuOpen ? 'translate-x-1/1 shadow-lg' : '-translate-x-full' } md:shadow-none md:-translate-x-0 flex-none h-full w-3/4 md:sticky md:top-10 md:w-80`}>
      {sidebar}
    </div>
    <div className={`${commonYOffset} z-10 min-w-0 w-full flex-none md:flex-auto max-h-full`}>
      <div className={`md:hidden fixed top-0 transition-opacity duration-300 z-10 w-full h-full pointer-events-none bg-black ${menuOpen ? 'bg-opacity-40 pointer-events-auto' : 'bg-opacity-0' }`} onClick={() => { setMenuOpen(false) }} />
      {content}
    </div>
  </>
)

interface DetailsProps {
  setDisplay: any,
}

const Details: React.FC<DetailsProps> = ({ setDisplay }) => (
  <>
    <p>{'DetailsComponent'}</p>
    <button onClick={() => setDisplay({ details: false })}>go back</button>
  </>
)