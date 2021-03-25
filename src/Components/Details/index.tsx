import React from 'react'
import { Button } from '../Button';

interface DetailsProps {
  goBackHandler: () => void
}

export const Details: React.FC<DetailsProps> = ({ goBackHandler }) => (
  <div className="md:flex w-full pt-20 px-4 md:pt-0 mx-auto max-w-screen-lg">
    <div className="md:w-1/6">
      <Button placeholder="Go back" callback={goBackHandler} />
    </div>
    <div className="md:w-5/6">
      w-3/4
    </div>
  </div>
)