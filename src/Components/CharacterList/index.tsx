import React, { useEffect, useState } from 'react';
import { Card } from "../Card";
import { Pagination } from '../Pagination'
import { useAppSelector } from '../../redux/hooks'
import { Character } from '../../redux/slices/characterSlice'
import { Loader } from '../Loader'
import { getRouteValue } from '../../Components/Router'
import noResultsImg from '../../images/no-results.png'
import {
  pushState,
  getRouteSearchQuery } from '../../Components/Router'

const quotes = [
  "Sometimes science is more art than science, Morty. Lot of people don’t get that",
  "Let’s get this dumb universe rollin’!",
  "Stay scientific, Jerry.",
  "Life is effort and I’ll stop when I die!",
  "Don’t deify the people who leave you",
  "The world is full of idiots who don’t understand what’s important! And they’ll try to tear us apart, Morty!",
  "Think for yourselves. Don’t be sheep.",
  "Be good, Morty. Be better than me.",
  "It’s a new machine. It detects stuff all the way up your butt",
  "Weddings are basically funerals with cake.",
]

const failedSearchQuote = () => quotes[Math.floor(Math.random() * quotes.length - 1) + 1 ]

export const CharacterList = () => {
  const {
    character: characterResults
  } = useAppSelector(state => state)
  // const display = useDisplayState()

  const [list, setList] = useState<Character[]>([])
  const [page, setPage] = useState<number>(1)
  const [showError, setShowError] = useState<boolean>(false)

  useEffect(() => {
    const { results, error } = characterResults;

    // On error show API error in console
    if (error) {
      console.warn(error)
      setShowError(true)
    }

    // Shallow validation
    if (Array.isArray(results)) {
      setList(results)
      // The uri returns a string
      setPage(
        getRouteValue({ name: 'page', fallbackValue: 1, callback: parseInt })
      )
    }
  }, [characterResults])

  // Passes to Pagination
  // keep the business logic outside
  type OnIndexRequestHandler = ({ idx }: { idx: number }) => void 
  const onIndexRequestHandler: OnIndexRequestHandler = ({idx}) => {
    const search = getRouteSearchQuery({
      fallbackValue: []
    })
    pushState({
      state: {
        ...search,
        page: idx,
      },
      title: `Page ${idx}`,
      url: `/page/${idx}${window.location.search}`,
    })
  }

  return (
    <>
      {
        characterResults.loading &&
        <Loader /> ||
        <>
          {
            list.length > 0 &&
            <div className="w-full px-0 m:px-0 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {
                list.map((props, idx) => <Card key={idx} {...props} page={page} order={idx} />)
              }
            </div> || <>
              {
                !characterResults.loading &&
                showError &&
                <div className="w-full text-center flex justify-center flex-col items-center">
                  <p className="w-3/4 text-gray-500 font-extrabold pb-5">{failedSearchQuote()}</p>
                  <img className="w-3/4 max-w-screen-md" src={noResultsImg} alt={failedSearchQuote()} />
                </div>
              }
            </>
          }
        </>
      }
      <>
        {
          list.length > 0 &&
          characterResults.info?.count &&
          characterResults.info?.pages > 1 && 
          <div className="w-full pt-5 pb-5 pr-1">
            <Pagination
              onIndexChange={onIndexRequestHandler}
              total={characterResults.info?.pages}
              range={5}
              page={page} />
          </div>
        }
      </>
    </>
  )
}