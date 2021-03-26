import React, { useCallback } from 'react'
import { useContextCreator } from "./";
import { Character, Query } from '../redux/slices/characterSlice';

interface DisplayMode {
  character?: Character,
  details?: boolean,
  query?: Query,
}

interface DispatchDisplayMode {
  (action: React.SetStateAction<DisplayMode>): void
}

interface DisplayProvider {
  children: React.ReactNode
}

const DisplayContext = React.createContext<DisplayMode>({ details: false })
const DisplayDispatchContext = React.createContext<DispatchDisplayMode | undefined>(undefined)

export const DisplayProvider = (props: DisplayProvider): React.ReactElement => {
  const [display, setDisplay] = React.useState<DisplayMode>({ details: false })

  return (
    <DisplayContext.Provider value={display}>
      <DisplayDispatchContext.Provider value={setDisplay}>
        {props.children}
      </DisplayDispatchContext.Provider>
    </ DisplayContext.Provider>
  )
}

export const useSetDisplay = () => {
  const setDisplay: DispatchDisplayMode = useContextCreator('DisplayDispatch', DisplayDispatchContext)
  const cb = useCallback((display) => {
    return setDisplay && setDisplay(display)
  }, [setDisplay])
  return cb
}

export const useDisplayState = (): DisplayMode => useContextCreator('Display', DisplayContext)