import React from 'react'
import loaderImg from '../../images/loader.svg'

export const Loader = () => (
  <div className="flex w-full h-full justify-center align-center">
    <img className="animate-spin h-20 w-20 opacity-10" src={loaderImg} />
  </div>
)