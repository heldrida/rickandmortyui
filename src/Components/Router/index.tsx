import React, { useEffect, useCallback } from 'react'
import { fetchCharacters, Query } from '../../redux/slices/characterSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

const EVENT_PUSH_STATE = 'onpushstate'

interface PushState {
  state: Query,
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

interface GetRouteValue {
  name: string,
  pathname?: string,
}

export const getRouteValue = ({ name, pathname = window.location.pathname }: GetRouteValue) => {
  const uri = pathname.split('/').filter(v => v)
  if (uri.length == 2 && uri[0] === name) {
    return uri[1]
  } else {
    throw new Error(`GetRouteValue failure: invalid request named ${name}`);
  }
}

interface RouterProps {
  children: JSX.Element,
}

export const Router = ({ children }: RouterProps) => {
  const dispatch = useAppDispatch()

  // CustomEvent<Query>
  const onPushState = useCallback((e: any) => {
    const query: Query = e.detail
    console.log('onPushState', query)
    dispatch(fetchCharacters({
      query
    }))
  }, [])

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