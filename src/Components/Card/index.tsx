import React, { useCallback } from 'react'
import { Button } from '../Button'
import { Character } from '../../redux/slices/characterSlice';
import { pushState, pushStateUrl } from '../Router'

interface CardProps extends Character {
  page: number,
  order: number
}

export const Card: React.FC<CardProps> = ({
  page,
  order,
  id,
  name,
  status,
  species,
  image,
}) => {
  const onDetails = useCallback(() => {
    pushState({
      state: {
        page,
        order,
      },
      title: `Details for ${name}`,
      url: pushStateUrl(`/details/${name.split(' ').join('-').toLowerCase()}_${page}-${id}`),
    })
  }, [id])

  return (
    <>
      <div className="transition-all transform ease-in md:hover:scale-105 md:opacity-90 hover:opacity-100 duration-400 rounded overflow-hidden shadow-lg">
        <img className="w-full cursor-pointer" src={image} alt="Avatar" onClick={onDetails} />
        <div className="px-6 py-4 pb-0">
          <p className="font-bold text-gray-700 text-base">
            {name}        
          </p>
          <p className="text-gray-700 text-base">
            {species}
          </p>
          <p className="text-gray-700 text-base">
            {status}
          </p>
        </div>
        <div className="text-center p-6">
          <Button
            callback={onDetails}
            placeholder={'Details'}
          />
        </div>
      </div>
    </>
  )
}