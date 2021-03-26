import React, { useState } from 'react'
import { Episode } from '../../redux/slices/episodeSlice'

const desiredKeyValues = ['id', 'name', 'air_date', 'episode']

export const Episodes = ({ list }: { list: Episode[] }) => {
  const [activeTab, setActiveTab] = useState<number>(0)
  const activeStyle = "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
  const defaultStyle = "bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"

  const onTab = (idx: number) => {
    setActiveTab(idx)
  }

  return (
    <div>
      <ul className="flex border-b w-full">
        { 
          list.map((episode, idx) => (
            <li key={idx} className={`${idx === activeTab && '-mb-px'} mr-1`} onClick={() => onTab(idx)}>
              <span className={idx === activeTab ? activeStyle : defaultStyle}>{`Episode ${episode.id}`}</span>
            </li>
          ))
        }
      </ul>
      <div className="w-full pt-10 pb-10">
        {
          Object.keys(list[activeTab])
            .filter(key => desiredKeyValues.includes(key))
            .map(key => <p>{list[activeTab][key]}</p>)
        }
      </div>
    </div>
  )
}