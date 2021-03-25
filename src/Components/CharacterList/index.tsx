import React from 'react';
import { Card } from "../Card";

export const CharacterList = () => {
  return (
    <div className="px-4 m:px-0 grid gap-4 grid-cols-1 lg:grid-cols-3">
      {
        [...Array.from({ length: 12 })].map(_ => <Card />)
      }
    </div>
  )
}