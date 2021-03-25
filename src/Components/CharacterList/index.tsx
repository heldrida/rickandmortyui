import React, { useEffect, useState } from 'react';
import { Card } from "../Card";
import { Pagination } from '../Pagination'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchCharacters } from '../../redux/slices/characterSlice'
import { Character } from '../../redux/slices/characterSlice'
import loaderImg from '../../images/loader.svg';

export const CharacterList = () => {
  const {
    character: characterResults
  } = useAppSelector(state => state)
  
  const dispatch = useAppDispatch()

  const [list, setList] = useState<Character[]>([])

  useEffect(() => {
    dispatch(fetchCharacters())
  }, [])

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
        <div className="flex w-full h-full justify-center align-center">
          <img className="animate-spin h-20 w-20 opacity-10" src={loaderImg} />
        </div> ||
        <>
          <div className="w-full px-4 m:px-0 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {
              list.map((props, idx) => <Card key={idx} {...props} />)
            }
          </div>
          <>
            {
              characterResults.info?.count &&
              <div className="w-full pt-5 pb-5 pr-1">
                <Pagination total={characterResults.info?.count} range={5} />
              </div>
            }
          </>
        </>
      }
    </>
  )
}