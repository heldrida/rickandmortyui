import React from 'react'
import { useSetDisplay } from '../../Context/Display'
import { Button } from '../Button'

interface Props {
  name: string,
  specie: string,
  status: string,
}

export const Card: React.FC<Props> = ({ name, specie, status }) => {
  const setDisplay = useSetDisplay()

  const onDetails = () => {
    console.warn("TODO: pass details data")
    setDisplay({
      details: true,
      character: {
        id: 1,
        name: "foobar",
        status: "foobar",
        specie: "foobar",
        type: "foobar",
        gender: "foobar",
        origin: "foobar",
        created: "foobar",
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
      }
    })
  }

  return (
    <>
      <div className="rounded overflow-hidden shadow-lg">
        <img className="w-full" src="https://rickandmortyapi.com/api/character/avatar/1.jpeg" alt="Avatar" />
        <div className="px-6 py-4 pb-0">
          <p className="font-bold text-gray-700 text-base">
            {name}        
          </p>
          <p className="text-gray-700 text-base">
            {specie}
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