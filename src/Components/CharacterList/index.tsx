import React, { useEffect, useState } from 'react';
import { Card } from "../Card";
import { Pagination } from '../Pagination'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchCharacters, Query } from '../../redux/slices/characterSlice'
import { Character } from '../../redux/slices/characterSlice'
import { Loader } from '../Loader'
import { useDisplayState } from '../../Context/Display'

export const CharacterList = () => {
  const {
    character: characterResults
  } = useAppSelector(state => state)
  const display = useDisplayState()
  const dispatch = useAppDispatch()

  const [list, setList] = useState<Character[]>([])

  useEffect(() => {
    console.log("characterlist:display.query", display.query)
    let query: Query;

    if (display.query) {
      query = {
        page: display.query.page
      }
    } else {
      query = {
        page: 1
      }
    }

    dispatch(fetchCharacters({
      query,
    }))
  }, [display])

  useEffect(() => {
    const { results, error } = characterResults;

    console.log(characterResults)

    // On error show API error in console
    if (error) {
      console.warn(error)
    }

    // Shallow validation
    if (Array.isArray(results)) {
      setList(results)
    }
  }, [characterResults])

  return (
    <>
      {
        characterResults.loading &&
        <Loader /> ||
        <>
          <div className="w-full px-4 m:px-0 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {
              list.map((props, idx) => <Card key={idx} {...props} />)
            }
          </div>
        </>
      }
      <>
        {
          list.length > 0 &&
          characterResults.info?.count &&
          characterResults.info?.pages > 1 &&          
          <div className="w-full pt-5 pb-5 pr-1">
            <Pagination total={characterResults.info?.pages} range={5} page={display.query?.page} />
          </div>
        }
      </>
    </>
  )
}