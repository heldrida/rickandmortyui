import React, { useEffect, useState } from 'react';
import { Card } from "../Card";
import { Pagination } from '../Pagination'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchCharacters } from '../../redux/slices/characterSlice'
import { Character } from '../../redux/slices/characterSlice'

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
    const { info, results, error } = characterResults;

    console.log(results)

    // On error show API error in console
    if (error) {
      console.warn(error)
    }

    // Shallow validation
    if (Array.isArray(results)) {
      setList(results)
    }

    // Update pagination
    // and the loading status
    console.log("info", info)
  }, [characterResults])

  return (
    <>
      <div className="w-full px-4 m:px-0 grid gap-4 grid-cols-1 lg:grid-cols-3">
        {
          list.map((props, idx) => <Card key={idx} {...props} />)
        }
      </div>
        {
          characterResults.info?.count &&
          <div className="w-full pt-5 pb-5 pr-1">
            <Pagination total={characterResults.info?.count} range={5} />
          </div>
        }
    </>
  )
}