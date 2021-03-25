import React, { useCallback, useContext } from 'react'

interface DisplayMode {
  details: boolean,
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
