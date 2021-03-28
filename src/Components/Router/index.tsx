import React, { useEffect, useCallback, useState } from 'react'
import { fetchCharacters, Query } from '../../redux/slices/characterSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

const EVENT_PUSH_STATE = 'onpushstate'
const EVENT_POP_STATE = 'popstate'

interface PushState {
  state: Query,
  title: string,
  url: string,
}

export const defaultLocation = () => `${window.location.pathname}${window.location.search}`
export const pushStateUrl = (url: string) => `${url}${window.location.search}`
export const pushState: (props: PushState) => void = ({ state, title, url }) => {  
  // by default should
  // pushState({
  //   state: {
  //     ...search,
  //     page: 2,
  //   },
  //   title,
  //   url: `/page/${2}?${querySearchTerms(search)}`,
  // })

  document.dispatchEvent(new CustomEvent(EVENT_PUSH_STATE, {
    detail: {
      state: {
        ...state,
        title,
        url
      },
      title,
      url
    }
  }))
  console.log('pushState', { state, title, url })
  history.pushState(state, title, url)
}

interface GetRouteValue {
  fallbackValue?: any,
  name: string,
  pathname?: string,
  callback?: (param: any) => void
}

export const getRouteValue = ({ callback, fallbackValue, name, pathname = (() => window.location.pathname)() }: GetRouteValue) => {
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

export const getRouteSearchQuery = ({ fallbackValue, search = (() => window.location.search)() }: getRouteSearchQuery) => {
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

export const useRouteChange = ({ onPushState }: { onPushState?: (e: PushState) => void }) => {
  const [changed, setChanged] = useState<{ timestamp: Date }>({ timestamp: new Date() })

  const onPushHandler = (e: CustomEvent<PushState>) => {
    const data = e.detail
    if (typeof onPushState === 'function') onPushState(data)
    setChanged({
      timestamp: new Date()
    })
  }

  const onPopHandler = (e: PopStateEvent) => {
    const state: Query = e.state
    const data: PushState = {
      state: {
        page: getRouteValue({ name: 'page', pathname: window.location.pathname, fallbackValue: 1 })
      },
      title: '',
      url: pushStateUrl(window.location.pathname),
    }  
    if (typeof onPushState === 'function') onPushState(data)
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

  useEffect(() => {
    window.addEventListener(EVENT_POP_STATE, onPopHandler)
    return () => {
      document.removeEventListener<any>(EVENT_POP_STATE, onPopHandler)
    }
  }, [])

  return changed
}

// The Routes are provided in a human friendly manner
// e.g. used `:num` instead of a regex pattern
// we map each case to what the system understands
// by using the pathnameMatchReplacer handler
export const pathAttributesReplacers: Record<string, string> = {
  ':num': '([0-9].*)',
  // Format is `bruce-dot-lee_2-20`
  ':slug': '(.*)(?=.*\_)(.*)',
}
const isBasePath = (pathname: string) => pathname.split('/').filter(v => v).length == 0
export const exactPathnameMatch = (pathname: string, curr: string) =>  isBasePath(pathname) && pathname === curr || pathname.split('/').pop()?.match(`^${curr}$`) && true
export const pathnameMatchReplacer = (pathname: string) => Object.keys(pathAttributesReplacers).reduce((acc, curr) => exactPathnameMatch(pathname, curr) && pathname.replace(curr, pathAttributesReplacers[curr]) || acc, pathname)
export const urlMatchesHumanRoute = (humanRoute: string, url: string) => {
  if (isBasePath(url)) {
    return exactPathnameMatch(humanRoute, url)
  }
  let regex = ''
  const idx = humanRoute.split('/').findIndex(part => {
    if (pathAttributesReplacers[part]) {
      regex = pathAttributesReplacers[part]
      return true
    }
  })
  const matchPart = url.split('/')[idx]
  if (!matchPart) {
    return false
  }
  return exactPathnameMatch(matchPart, regex) && true  
}

// Our current use-case is simple
// its expected a base path as key,
// and the correspondent value immediately after
// we also just care about the path, no search query
export const extractRouteParams = (url: string) => url.split('?')[0].split('/').filter(v => v)

export type UrlParams = Record<string, string | {}>

type Routes = Record<string, Function>

interface RouterProps {
  children: JSX.Element,
  routes: Routes,
}

export const Router = ({ children, routes }: RouterProps) => {
  const onPushState = useCallback((state: PushState) => {
    const { url } = state
    const match: keyof typeof routes = Object.keys(routes).find(humanRoute => {
      if (url) {
        return urlMatchesHumanRoute(humanRoute, url)
      }
      return false
    }) || ''
    if (typeof routes[match] === 'function') {
      console.log('url.... > > >', url)
      const [key, value] = extractRouteParams(url)
      const search: Record<string, string> = getRouteSearchQuery({ search: url.split('?')[1], fallbackValue: [] })
      routes[match]({
        [key]: value,
        search,
      })
    }
  }, [])
  
  useRouteChange({ onPushState })

  return (
    <>
      {children}
    </>
  )
}