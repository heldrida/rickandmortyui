import React from 'react'
import { Button } from '../Button';

interface DetailsProps {
  goBackHandler: () => void
}

export const Details: React.FC<DetailsProps> = ({ goBackHandler }) => (
  <>
    <p>{'DetailsComponent'}</p>
    <Button placeholder="Go back" callback={goBackHandler} />
  </>
)