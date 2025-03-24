import styled from 'styled-components';

const Hero = () => {
  return (
    <HeroSection>
      <div className="container">
        <HeroContainer>
          <HeroContent>
            <HeroHeading>
              <span>Hello, I'm</span>
              <h1>depaier</h1>
            </HeroHeading>
            
            <HeroDescription>
              I create products with my own ideas.
            </HeroDescription>
            
            <HeroActions>
              <PrimaryButton onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                View Projects
              </PrimaryButton>
              <SecondaryButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Contact Me
              </SecondaryButton>
            </HeroActions>
          </HeroContent>
          
          <ProfileImageContainer>
            <ProfileImage src="/profile.png" alt="Profile" />
          </ProfileImageContainer>
        </HeroContainer>
      </div>
    </HeroSection>
  );
};

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: var(--header-height);
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
`;

const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  
  @media (max-width: 992px) {
    flex-direction: column-reverse;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  max-width: 600px;
  
  @media (max-width: 992px) {
    max-width: 100%;
  }
`;

const ProfileImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 992px) {
    margin-bottom: 2rem;
  }
`;

const ProfileImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
  
  @media (max-width: 576px) {
    width: 200px;
    height: 200px;
  }
`;

const HeroHeading = styled.div`
  margin-bottom: 2rem;
  
  span {
    font-size: 1.2rem;
    color: var(--primary-color);
    display: block;
    margin-bottom: 0.5rem;
  }
  
  h1 {
    font-size: 4rem;
    margin: 0;
    line-height: 1.2;
    
    @media (max-width: 768px) {
      font-size: 3rem;
    }
  }
  
  h2 {
    font-size: 2rem;
    font-weight: 400;
    margin-top: 0.5rem;
    color: var(--light-text-color);
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;

const HeroDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  max-width: 600px;
  color: var(--light-text-color);
  
  @media (max-width: 992px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: var(--primary-color);
  color: white;
  border: none;
  
  &:hover {
    background-color: #004761;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 122, 255, 0.3);
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  
  &:hover {
    background-color: rgba(0, 122, 255, 0.1);
    transform: translateY(-2px);
  }
`;

export default Hero; 