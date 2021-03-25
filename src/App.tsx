import React  from 'react'
import { Layout } from './Layout'
import { CharacterList } from './Components/CharacterList'
import { Sidebar } from './Components/Sidebar'

const App = () => {
  return (
    <Layout
      sidebar={<Sidebar/>}
      content={<CharacterList/>}
    />
  )
}

export default App