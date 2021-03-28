import React, { useEffect, useState } from 'react'
import { Layout } from './Layout'
import { CharacterList } from './Components/CharacterList'
import { Sidebar } from './Components/Sidebar'
import {
  pushStateUrl,
  defaultLocation,
  getRouteValue,
  getRouteSearchQuery,
  Router,
  pushState,
  UrlParams } from './Components/Router'
import {
  generateCharacterQuery,
  fetchCharacter,
  fetchCharacters,
  Query
} from './redux/slices/characterSlice'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { Details } from './Components/Details'

const App = () => {
  const [page, setPage] = useState<number>(-1)
  const dispatch = useAppDispatch()
  const details = useAppSelector(state => state.character.result)
  const pageHandler = (urlParams: UrlParams) => {
    const page = (urlParams.page as number)
    const { search } = urlParams
    let state = ({ page } as Query)
    state = generateCharacterQuery(page, search)
    dispatch(fetchCharacters({
      query: state
    }))
  }
  const detailsHandler = (urlParams: UrlParams) => {
    const slug = urlParams.details
    const parts = typeof slug === 'string' && slug.split('_')[1].split('-')

    if (parts && parts.length === 2) {
      const page = parseInt(parts[0])
      const characterId = parseInt(parts[1])
      setPage(page)
      const search = getRouteSearchQuery({
        fallbackValue: []
      })
      if (characterId && characterId > -1) {
        dispatch(fetchCharacter({
          characterId,
        }))
      }
    }
  }

  // Designate the role for each route
  // as a friendly pathname + callback handler
  // the usecase is a basic relation between
  // base route and value `/key/value` e.g. `/page/1`
  const routes = {
    '/': pageHandler,
    '/page/:num': pageHandler,
    '/details/:slug': detailsHandler,
  }
  useEffect(() => {
    // Fresh request default routine
    let title = 'Home'
    let url = defaultLocation()
    let page = getRouteValue({
      name: 'page',
      fallbackValue: 1,
    })

    pushState({
      state: {
        page,
      },
      title,
      url,
    })
  }, [])

  const goBackHandler = () => {
    pushState({
      state: {
        page,
      },
      title: `Page ${page}`,
      url: pushStateUrl(`/page/${page}`)
    })
  }

  return (
    <Router routes={routes}>
      <>
        <Layout
          sidebar={<Sidebar/>}
          content={<CharacterList/>}
          details={
            details &&
            <Details
              details={details}
              goBackHandler={goBackHandler}
            />
          }
        />
      </>
    </Router>
  )
}

export default App