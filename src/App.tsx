import { useState } from 'react'
import styled from 'styled-components'
import Hero from './components/Hero'
import ProjectModal from './components/ProjectModal'
import GlobalStyle from './styles/GlobalStyle'

// Define the project type
export interface Project {
  id: number
  title: string
  description: string
  thumbnail: string
  details: string
  technologies: string[]
  link?: string
  github?: string
}

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  
  const closeProjectModal = () => {
    setSelectedProject(null)
  }

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <MainContent>
          <Hero />
        </MainContent>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeProjectModal} />
        )}
      </AppContainer>
    </>
  )
}

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const MainContent = styled.main`
  flex: 1;
`

export default App
