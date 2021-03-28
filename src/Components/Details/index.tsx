import React, { useEffect, useState, useCallback } from 'react'
import { Button } from '../Button';
import { useDisplayState } from '../../Context/Display';
import { Episodes } from '../Episodes';
import { fetchEpisodes, Episode } from '../../redux/slices/episodeSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Loader } from '../Loader'
import { Query, Character, CharacterOrigin } from '../../redux/slices/characterSlice';
import { formatDate } from '../../utils/date'

interface DetailsProps {
  details: Character,
  goBackHandler: (params: Query) => void
}

interface DataRowProps {
  idx: keyof Character,
  data: Character,
  classNames?: {
    wrapper: string[],
    textId: string[],
  }
}
const valPick = ({ idx, data }: DataRowProps) => {
  try {
    let val: Partial<number | string | string[] | CharacterOrigin> = ''
    if (idx === 'created') {
      val = formatDate(data[idx])
    } else if (idx !== 'origin') {
      val = data[idx]
    } else {
      val = data[idx].name
    }
    return val || 'n/a'
  } catch (err) {
    console.warn(err)
    return ""
  }
}

export const DataRow = ({ idx, data, classNames }: DataRowProps) => (
  <div className={`${classNames?.wrapper.join(' ')} w-full flex flex-row`}>
    <div className={`leading-7 font-semibold w-20 ${classNames?.textId}`}>{idx}</div>
    <div className="w-50">{valPick({idx, data})}</div>
  </div>
)

export const Details: React.FC<DetailsProps> = ({ details, goBackHandler }) => {
  const {
    episode: episodeResults,
  } = useAppSelector(state => state)
  // const display = useDisplayState()
  const dispatch = useAppDispatch()
  const [list, setList] = useState<Episode[]>([])
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | undefined>(undefined)

  // useEffect(() => {
  //   console.log("details:display:::", display)
  //   if (Array.isArray(display.character?.episode)) {
  //     const endpoints = display.character?.episode.slice(0, 5)
  //     if (endpoints) {
  //       dispatch(fetchEpisodes(endpoints))
  //     }
  //   }
  // }, [display]);

  useEffect(() => {
    if (details && Array.isArray(details.episode)) {
      const endpoints = details.episode.slice(0, 5)
      if (endpoints) {
        dispatch(fetchEpisodes(endpoints))
      }
    }
  }, [details])

  useEffect(() => {
    const { results } = episodeResults;

    if (Array.isArray(results) && results.length > 0) {
      setList(results)
      // Set default state
      setSelectedEpisode(results[0])
    }
  }, [episodeResults])

  // const callback = useCallback(() => {
  //   if (display.query) {
  //     console.log("details callback:display.query", display.query)
  //     goBackHandler(display.query)
  //   }
  // }, [display])

  useEffect(() => {
    console.log('Details:details', details)
  }, [details])

  const callback = () => goBackHandler({})

  return (
    <>
      {
        details &&
        <div className="md:flex w-full pt-20 px-4 md:pt-0 mx-auto max-w-screen-lg">
          <div className="md:w-1/6">
            <Button placeholder="Go back" callback={callback} />
          </div>
          <div className="md:w-5/6">
            <>
              <div className="md:flex pt-10 md:pt-0">
                <div className="md:w-1/3">
                  <img className={"rounded-lg"} src={details.image} alt={details.name} />
                </div>
                <div className="flex flex-col pt-5 md:pt-0">
                  {
                    Object.keys(details)
                      .filter(v => !["image", "location", "episode", "url"].includes(v))
                      .map(key => {
                        return (
                          <DataRow key={key} idx={key} data={details} classNames={{ wrapper: ['md:pl-10'], textId: ['text-green-600']}} />
                        )
                      })
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
          </div>
        </div>
      }
    </>
  )
}