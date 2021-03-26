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
  fallbackValue?: string,
  name: string,
  pathname?: string,
}

export const getRouteValue = ({ fallbackValue, name, pathname = window.location.pathname }: GetRouteValue) => {
  const uri = pathname.split('/').filter(v => v)
  if (uri.length == 2 && uri[0] === name) {
    return uri[1]
  } else if (fallbackValue) {
    return fallbackValue
  } else {
    throw new Error(`GetRouteValue failure: invalid request named ${name}`);
  }
}

interface getRouteSearchQuery {
  search?: string,
}

export const getRouteSearchQuery = ({ search = window.location.search }: getRouteSearchQuery) => {
  const qs: Record<string, string> = search.replace('?', '')
   .split('&')
   .reduce((acc: Record<string, string>, curr: string) => {
     const keyVal = curr.split('=')
     if (keyVal.length == 2) acc[keyVal[0]] = decodeURI(keyVal[1])
      return acc
    }, {})

  if (Object.keys(qs).length > 0) {
    return qs
  } else {
    throw new Error(`GetRouteSearchQuery failure: invalid request!`);
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