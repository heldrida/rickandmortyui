import React, { useState } from 'react'

interface Episode {
  id: number,
  name: string,
  air_date: string,
  episode: string,  
}

const mockEpisodes: Episode[] = [{
  id: 1,
  name: "foobar 1",
  air_date: "December, 1, 1998",
  episode: "SE0101"
}, {
  id: 2,
  name: "foobar 2",
  air_date: "December, 2, 1998",
  episode: "SE0102"
}, {
  id: 3,
  name: "foobar 3",
  air_date: "December, 3, 1998",
  episode: "SE0103"
}, {
  id: 4,
  name: "foobar 4",
  air_date: "December, 4, 1998",
  episode: "SE0104"
}, {
  id: 5,
  name: "foobar 5",
  air_date: "December, 5, 1998",
  episode: "SE0105"
}]

export const Episodes = () => {
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
          mockEpisodes.map((episode, idx) => (
            <li key={idx} className={`${idx === activeTab && '-mb-px'} mr-1`} onClick={() => onTab(idx)}>
              <span className={idx === activeTab ? activeStyle : defaultStyle}>Tab</span>
            </li>
          ))
        }
      </ul>
      <div className="w-full pt-10">
        {
          Object.values(mockEpisodes[activeTab]).map(val => <p>{val}</p>)
        }
      </div>
    </div>
  )
}