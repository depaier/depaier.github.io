import { useState } from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
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
  
  const openProjectModal = (project: Project) => {
    setSelectedProject(project)
  }
  
  const closeProjectModal = () => {
    setSelectedProject(null)
  }

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <MainContent>
          <Hero />
          <Projects onProjectClick={openProjectModal} />
          <Contact />
        </MainContent>
        <Footer />
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
