import React from 'react'
import { useSetDisplay } from '../../Context/Display'
import { Button } from '../Button'
import { Character } from '../../redux/slices/characterSlice';

export const Card: React.FC<Character> = ({
  id,
  name,
  status,
  species,
  type,
  gender,
  origin,
  created,
  image,
  episode,
}) => {
  const setDisplay = useSetDisplay()

  const onDetails = () => {
    setDisplay({
      details: true,
      character: {
        id,
        name,
        status,
        species,
        type,
        gender,
        origin,
        created,
        image,
      }
    })
  }

  return (
    <>
      <div className="rounded overflow-hidden shadow-lg">
        <img className="w-full" src={image} alt="Avatar" />
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