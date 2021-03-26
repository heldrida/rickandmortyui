import React, { useEffect } from 'react'

const EVENT_PUSH_STATE = 'onpushstate'

interface PushState {
  state?: {},
  title: string,
  url: string,
}
export const pushState: (props: PushState) => void = ({ state, title, url }) => {  
  document.dispatchEvent(new CustomEvent(EVENT_PUSH_STATE, {
    detail: {
      state,
      title,
      url
    }
  }))
  history.pushState(state, title, url)
}

const onPushState = (e: any) => {
  console.log("onPushState:", e);
}

interface RouterProps {
  children: JSX.Element,
}

export const Router = ({ children }: RouterProps) => {
  useEffect(() => {
    console.log('init onPushState listener')
    document.addEventListener(
      EVENT_PUSH_STATE,
      onPushState,
      false
    )
    return () => {
      console.log("removed onpushstate")
      document.removeEventListener(EVENT_PUSH_STATE, onPushState)
    }
  }, [])

  return (
    <>
      {children}
    </>
  )
}