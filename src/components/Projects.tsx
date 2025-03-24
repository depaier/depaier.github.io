import styled from 'styled-components';
import { Project } from '../App';

interface ProjectsProps {
  onProjectClick: (project: Project) => void;
}

const Projects = ({ onProjectClick }: ProjectsProps) => {
  // Sample projects data - replace with your own
  const projects: Project[] = [
    {
      id: 1,
      title: 'miniFilm',
      description: 'A small film camera in my hand',
      thumbnail: '/miniFilm.png',
      details: 'A film camera app with a minimalist and film camera feel',
      technologies: ['SwiftUI', 'Swift', 'Xcode'],
      link: 'https://example.com/ecommerce',
    },
  ];

  return (
    <ProjectsSection id="projects">
      <div className="container">
        <SectionTitle>Projects</SectionTitle>
        
        <ProjectsGrid>
          {projects.map(project => (
            <ProjectCard key={project.id} onClick={() => onProjectClick(project)}>
              <ProjectImage src={project.thumbnail} alt={project.title} />
              <ProjectInfo>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <TechStack>
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <TechTag key={index}>{tech}</TechTag>
                  ))}
                  {project.technologies.length > 3 && (
                    <TechTag>+{project.technologies.length - 3}</TechTag>
                  )}
                </TechStack>
              </ProjectInfo>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </div>
    </ProjectsSection>
  );
};

const ProjectsSection = styled.section`
  background-color: var(--background-color);
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: var(--primary-color);
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    
    img {
      transform: scale(1.05);
    }
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const ProjectInfo = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
`;

const ProjectDescription = styled.p`
  font-size: 0.95rem;
  color: var(--light-text-color);
  margin-bottom: 1.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechTag = styled.span`
  background-color: var(--secondary-background);
  padding: 0.35rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  color: var(--light-text-color);
  font-weight: 500;
`;

export default Projects; 