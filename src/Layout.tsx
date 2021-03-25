import React from 'react'

interface Props {
  sidebar: React.ReactNode,
  content: React.ReactNode,
}

export const Layout: React.FC<Props> = ({ sidebar, content }) => {
  return (
    <div>
      <div>{sidebar}</div>
      <div>{content}</div>
    </div>
  )
}