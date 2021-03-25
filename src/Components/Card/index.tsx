import React from 'react'
import { useSetDisplay } from '../../Context/Display'

interface Props {
  name: string,
  specie: string,
  status: string,
}

export const Card: React.FC<Props> = ({ name, specie, status }) => {
  const setDisplay = useSetDisplay()

  const onDetails = () => {
    console.warn("TODO: pass details data")
    setDisplay({ details: true })
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
          <button
            className="bg-green-400 hover:bg-green-300 text-white font-bold py-2 px-4 rounded"
            onClick={onDetails}
          >
            Details
          </button>
        </div>
      </div>
    </>
  )
}