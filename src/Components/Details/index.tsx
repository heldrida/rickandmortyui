import React, { useEffect, useState } from 'react'
import { Button } from '../Button';
import { useDisplayState } from '../../Context/Display';
import { Episodes } from '../Episodes';
import { fetchEpisodes, Episode } from '../../redux/slices/episodeSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Loader } from '../Loader'

interface DetailsProps {
  goBackHandler: () => void
}

export const Details: React.FC<DetailsProps> = ({ goBackHandler }) => {
  const {
    episode: episodeResults,
  } = useAppSelector(state => state)
  const display = useDisplayState()
  const dispatch = useAppDispatch()
  const [list, setList] = useState<Episode[]>([])
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | undefined>(undefined)

  useEffect(() => {
    if (Array.isArray(display.character?.episode)) {
      const endpoints = display.character?.episode.slice(0, 5)
      if (endpoints) {
        dispatch(fetchEpisodes(endpoints))
      }
    }
  }, [display]);

  useEffect(() => {
    const { results } = episodeResults;

    if (Array.isArray(results) && results.length > 0) {
      setList(results)
      // Set default state
      setSelectedEpisode(results[0])
    }
  }, [episodeResults])

  return (
    <>
      <div className="md:flex w-full pt-20 px-4 md:pt-0 mx-auto max-w-screen-lg">
        <div className="md:w-1/6">
          <Button placeholder="Go back" callback={goBackHandler} />
        </div>
        <div className="md:w-5/6">
          {
            display?.character &&
            <>
              <div className="md:flex pt-10 md:pt-0">
                <div className="md:w-1/3">
                  <img src={display.character.image} alt={display.character.name} />
                </div>
                <div className="md:w-2/3 pt-5 md:pt-0 md:pl-10">
                  {
                    display?.character &&
                    Object.keys(display.character)
                      .filter(key => key !== "image")
                      .map((key, idx) => display.character && <p key={idx}>{key === "origin" && display.character[key].hasOwnProperty('name') ? display.character[key].name : display.character[key]}</p>)
                  }
                </div>
              </div>
              {
                <div className="w-full pt-10">
                  {                    
                    episodeResults.loading &&
                    <Loader />
                  }
                  {
                    !episodeResults.loading &&
                    list.length > 0 &&
                    <Episodes list={list} />
                  }
                </div>
              }
            </>
          }
        </div>
      </div>
    </>
  )
}