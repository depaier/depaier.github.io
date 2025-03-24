import { useEffect } from 'react';
import styled from 'styled-components';
import { Project } from '../App';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  useEffect(() => {
    // Disable scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    // Re-enable scrolling when modal is closed
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  // Close modal when clicking escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [onClose]);
  
  // Close modal when clicking outside of content
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  
  return (
    <ModalOverlay onClick={handleBackdropClick}>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        
        <ModalHeader>
          <ProjectTitle>{project.title}</ProjectTitle>
        </ModalHeader>
        
        <ModalBody>
          <ProjectImage src={project.thumbnail} alt={project.title} />
          
          <ProjectDetails>
            <ProjectDescription>{project.details}</ProjectDescription>
            
            <TechnologiesSection>
              <SectionSubtitle>Technologies Used</SectionSubtitle>
              <TechList>
                {project.technologies.map((tech, index) => (
                  <TechTag key={index}>{tech}</TechTag>
                ))}
              </TechList>
            </TechnologiesSection>
            
            <ProjectLinks>
              {project.link && (
                <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer">
                  View Live
                </ProjectLink>
              )}
            </ProjectLinks>
          </ProjectDetails>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
  padding: 1rem;
  overflow: auto;
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.4s ease;
  
  @keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @media (max-width: 768px) {
    max-height: 95vh;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--text-color);
  cursor: pointer;
  z-index: 10;
  line-height: 1;
`;

const ModalHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--border-color);
`;

const ProjectTitle = styled.h2`
  font-size: 1.8rem;
  margin: 0;
`;

const ModalBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
`;

const ProjectDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-color);
`;

const TechnologiesSection = styled.div`
  margin-bottom: 1rem;
`;

const SectionSubtitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechTag = styled.span`
  background-color: var(--secondary-background);
  padding: 0.4rem 0.8rem;
  border-radius: 50px;
  font-size: 0.9rem;
  color: var(--light-text-color);
  font-weight: 500;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

interface ProjectLinkProps {
  secondary?: boolean;
}

const ProjectLink = styled.a<ProjectLinkProps>`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-align: center;
  
  background-color: ${props => props.secondary ? 'transparent' : 'var(--primary-color)'};
  color: ${props => props.secondary ? 'var(--primary-color)' : 'white'};
  border: ${props => props.secondary ? '1px solid var(--primary-color)' : 'none'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background-color: ${props => props.secondary ? 'rgba(0, 122, 255, 0.1)' : '#0062cc'};
  }
  
  @media (max-width: 576px) {
    width: 100%;
  }
`;

export default ProjectModal; 