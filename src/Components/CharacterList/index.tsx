import React from 'react';
import { Card } from "../Card";
import { Pagination } from '../Pagination'

export const CharacterList = () => {
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