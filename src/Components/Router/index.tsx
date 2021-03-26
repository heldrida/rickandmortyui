import React, { useEffect, useCallback, useState } from 'react'
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
  fallbackValue?: any,
  name: string,
  pathname?: string,
  callback?: (param: any) => void
}

export const getRouteValue = ({ callback, fallbackValue, name, pathname = window.location.pathname }: GetRouteValue) => {
  const uri = pathname.split('/').filter(v => v)
  if (uri.length == 2 && uri[0] === name) {
    if (typeof callback === 'function') {
      return callback(uri[1])
    }
    return uri[1]
  } else if (fallbackValue) {
    if (typeof callback === 'function') {
      return callback(fallbackValue)
    }
    return fallbackValue
  } else {
    throw new Error(`GetRouteValue failure: invalid request named ${name}`);
  }
}

interface getRouteSearchQuery {
  search?: string,
  fallbackValue?: any,
}

export const getRouteSearchQuery = ({ fallbackValue, search = window.location.search }: getRouteSearchQuery) => {
  const qs: Record<string, string> = search.replace('?', '')
   .split('&')
   .reduce((acc: Record<string, string>, curr: string) => {
     const keyVal = curr.split('=')
     if (keyVal.length == 2) acc[keyVal[0]] = decodeURI(keyVal[1])
      return acc
    }, {})

  if (Object.keys(qs).length > 0) {
    return qs
  } else if (fallbackValue) {
    return fallbackValue
  } else {
    throw new Error(`GetRouteSearchQuery failure: invalid request!`);
  }
}

export const useRouteChange = ({ onPushState }: { onPushState?: (e: CustomEvent<Query>) => void }) => {
  const [changed, setChanged] = useState<{ timestamp: Date }>({ timestamp: new Date() })

  const onPushHandler = (e: CustomEvent<Query>) => {
    if (typeof onPushState === 'function') onPushState(e)
    setChanged({
      timestamp: new Date()
    })
  }

  useEffect(() => {
    document.addEventListener<any>(
      EVENT_PUSH_STATE,
      onPushHandler,
      false
    )
    return () => {
      document.removeEventListener<any>(EVENT_PUSH_STATE, onPushHandler)
    }
  }, [])

  return changed
}

interface RouterProps {
  children: JSX.Element,
}

export const Router = ({ children }: RouterProps) => {
  const dispatch = useAppDispatch()
  const onPushState = useCallback((e: CustomEvent<Query>) => {
    const query: Query = e.detail.state
    dispatch(fetchCharacters({
      query
    }))
  }, [])  
  
  useRouteChange({ onPushState })

  return (
    <>
      {children}
    </>
  )
}