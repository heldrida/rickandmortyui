import React, { useEffect } from 'react'
import { Button } from '../Button';
import { useDisplayState } from '../../Context/Display';

interface DetailsProps {
  goBackHandler: () => void
}


export const Details: React.FC<DetailsProps> = ({ goBackHandler }) => {
  const display = useDisplayState()

  useEffect(() => {
    console.log("display", display)
  }, [display])

  return (
    <div className="md:flex w-full pt-20 px-4 md:pt-0 mx-auto max-w-screen-lg">
      <div className="md:w-1/6">
        <Button placeholder="Go back" callback={goBackHandler} />
      </div>
      <div className="md:w-5/6">
        {
          display?.character &&
          <div className="md:flex pt-10">
            <div className="md:w-1/3">
              <img src={display.character.image} alt={display.character.name} />
            </div>
            <div className="md:w-2/3 pt-5 md:pt-0 md:pl-10">
              {
                display?.character &&
                Object.keys(display.character)
                  .filter(key => key !== "image")
                  .map(key => display.character && <p>{display.character[key]}</p>)
              }
            </div>
          </div>
        }
      </div>
    </div>
  )
}