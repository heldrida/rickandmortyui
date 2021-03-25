import React, { useEffect } from 'react';
import { Card } from "../Card";
import { Pagination } from '../Pagination'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchCharacters } from '../../redux/slices/characterSlice'

export const CharacterList = () => {
  const {
    character: characterResults
  } = useAppSelector(state => state)
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log("[debug] dispatch characters!")
    dispatch(fetchCharacters())
  }, [])

  useEffect(() => {
    console.log("[debug] characterResults!", characterResults)
  }, [characterResults])

  return (
    <>
      <div className="w-full px-4 m:px-0 grid gap-4 grid-cols-1 lg:grid-cols-3">
        {
          [...Array.from({ length: 12 })].map((val, idx) => <Card key={idx} name="foobar" specie="lorem" status="daria" />)
        }
      </div>
      <div className="w-full pt-5 pb-5 pr-1">
        <Pagination total={100} range={5} />
      </div>
    </>
  )
}