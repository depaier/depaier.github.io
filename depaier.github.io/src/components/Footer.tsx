import styled from 'styled-components';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <div className="container">
        <FooterContent>
          <FooterLeft>
            <Logo>depaier</Logo>
            <FooterDescription>
              A portfolio showcasing my work and ideas.
            </FooterDescription>
          </FooterLeft>
          
          <FooterLinks>
            <FooterLinksGroup>
              <FooterLinksTitle>Navigation</FooterLinksTitle>
              <FooterLink onClick={() => window.scrollTo(0, 0)}>Home</FooterLink>
              <FooterLink onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>Projects</FooterLink>
              <FooterLink onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Contact</FooterLink>
            </FooterLinksGroup>
            
            <FooterLinksGroup>
              <FooterLinksTitle>Connect</FooterLinksTitle>
              <FooterExternalLink href="https://github.com/depaier" target="_blank" rel="noopener noreferrer">GitHub</FooterExternalLink>
              <FooterExternalLink href="https://www.threads.net/@depaier" target="_blank" rel="noopener noreferrer">Threads</FooterExternalLink>
            </FooterLinksGroup>
          </FooterLinks>
        </FooterContent>
        
        <FooterBottom>
          <Copyright>&copy; {currentYear} depaier. All rights reserved.</Copyright>
        </FooterBottom>
      </div>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #212529;
  color: #f8f9fa;
  padding-top: 4rem;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterLeft = styled.div`
  max-width: 400px;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const FooterDescription = styled.p`
  font-size: 0.95rem;
  color: #adb5bd;
  line-height: 1.6;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const FooterLinksGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FooterLinksTitle = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #f8f9fa;
`;

const FooterLink = styled.div`
  font-size: 0.95rem;
  color: #adb5bd;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const FooterExternalLink = styled.a`
  font-size: 0.95rem;
  color: #adb5bd;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const FooterBottom = styled.div`
  padding: 1.5rem 0;
  margin-top: 3rem;
  border-top: 1px solid #343a40;
  text-align: center;
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  color: #6c757d;
`;

export default Footer; 