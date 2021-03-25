import React  from 'react'
import { Layout } from './Layout'
import { CharacterList } from './Components/CharacterList'
import { Sidebar } from './Components/Sidebar'
import { DisplayProvider } from './Context/Display';

const App = () => {
  return (
    <DisplayProvider>
      <Layout
        sidebar={<Sidebar/>}
        content={<CharacterList/>}
      />
    </DisplayProvider>
  )
}

export default App