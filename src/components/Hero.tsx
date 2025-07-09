import styled from 'styled-components';
import Footer from './Footer';

const Hero = () => {
  return (
    <HeroSection>
      <LeftSection>
        <ProfileImageContainer>
          <ProfileImage src="/profile.png" alt="Profile" />
        </ProfileImageContainer>
      </LeftSection>
      
      <RightSection>
        <ScrollableContent>
          <ContentContainer>
            <Username>디파이어 I depaier</Username>
            <MainTitle>
              <LargeText>나</LargeText>로
              <br />
              살아가기 위해<EmojiIcon>💡</EmojiIcon>
            </MainTitle>
            
            <IntroGroup>
              <IntroLabel>저는</IntroLabel>
              <IntroText>"진정한 나로 살아가기 위한"이라는 주제를 가지고 여러가지 콘텐츠나 제품을 만듭니다.</IntroText>
            </IntroGroup>
            
            <SnsSection>
              <SnsTitle>SNS</SnsTitle>
              <SnsIcons>
                <SnsIcon onClick={() => window.open('https://www.instagram.com/depaier/', '_blank')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
	                  <g fill="none" stroke="#747474" stroke-width="1.5">
		                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 16a4 4 0 1 0 0-8a4 4 0 0 0 0 8" />
		                  <path d="M3 16V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5Z" />
		                  <path stroke-linecap="round" stroke-linejoin="round" d="m17.5 6.51l.01-.011" />
	                  </g>
                  </svg>
                </SnsIcon>
                <SnsIcon onClick={() => window.open('https://www.threads.net/@depaier', '_blank')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
	                  <path fill="#747474" d="M186.42 123.65a64 64 0 0 0-11.13-6.72c-4-29.89-24-39.31-33.1-42.07c-19.78-6-42.51 1.19-52.85 16.7a8 8 0 0 0 13.32 8.88c6.37-9.56 22-14.16 34.89-10.27c9.95 3 16.82 10.3 20.15 21a81 81 0 0 0-15.29-1.43c-13.92 0-26.95 3.59-36.67 10.1C94.3 127.57 88 139 88 152c0 20.58 15.86 35.52 37.71 35.52a48 48 0 0 0 34.35-14.81c6.44-6.7 14-18.36 15.61-37.1c.38.26.74.53 1.1.8C186.88 144.05 192 154.68 192 168c0 19.36-20.34 48-64 48c-26.73 0-45.48-8.65-57.34-26.44C60.93 175 56 154.26 56 128s4.93-47 14.66-61.56C82.52 48.65 101.27 40 128 40c32.93 0 54 13.25 64.53 40.52a8 8 0 1 0 14.93-5.75C194.68 41.56 167.2 24 128 24c-32 0-55.81 11.29-70.66 33.56C45.83 74.83 40 98.52 40 128s5.83 53.17 17.34 70.44C72.19 220.71 96 232 128 232c30.07 0 48.9-11.48 59.4-21.1C200.3 199.08 208 183 208 168c0-18.34-7.46-33.68-21.58-44.35m-37.89 38a31.94 31.94 0 0 1-22.82 9.9c-10.81 0-21.71-6-21.71-19.52c0-12.63 12-26.21 38.41-26.21a64 64 0 0 1 17.59 2.42c0 14.08-4 25.62-11.47 33.38Z" />
                  </svg>
                </SnsIcon>
              </SnsIcons>
            </SnsSection>
            
            <AppsSection>
              <SectionTitle>앱</SectionTitle>
              <AppsGrid>
                <AppCard onClick={() => window.open('https://apps.apple.com/kr/app/minifilm-%EC%9E%91%EC%9D%80-%ED%95%84%EB%A6%84-%EC%B9%B4%EB%A9%94%EB%9D%BC/id6742413203', '_blank')}>
                  <AppIcon>
                    <img src="miniFilm_logo.png" alt="logo" height="20" width="20"/>
                  </AppIcon>
                  <AppName>miniFilm</AppName>
                </AppCard>
                <AppCard>
                  <AppIcon>
                    <img src="melater_logo.png" alt="logo" height="20" width="20"/>
                  </AppIcon>
                  <AppName>Melater - 준비중</AppName>
                </AppCard>
          
              </AppsGrid>
            </AppsSection>
            
            <TemplatesSection>
              <SectionTitle>템플릿</SectionTitle>
              <TemplatesGrid>
                <TemplateCard>
                  <TemplateIcon>💡</TemplateIcon>
                  <TemplateName>why? - 준비중</TemplateName>
                </TemplateCard>
                
              </TemplatesGrid>
            </TemplatesSection>
          </ContentContainer>
          <Footer />
        </ScrollableContent>
      </RightSection>
    </HeroSection>
  );
};

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  padding: 0;
  background: var(--background-color);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  
  @media (max-width: 992px) {
    position: relative;
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }
`;

const LeftSection = styled.div`
  width: 45%;
  background: var(--dark-background);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1;
  
  @media (max-width: 992px) {
    position: relative;
    width: 100%;
    min-height: 40vh;
    height: 40vh;
    order: 1;
  }
`;

const RightSection = styled.div`
  width: 55%;
  background: var(--background-color);
  margin-left: 45%;
  
  @media (max-width: 992px) {
    width: 100%;
    margin-left: 0;
    order: 2;
  }
`;

const ScrollableContent = styled.div`
  height: 100vh;
  overflow-y: auto;
  padding: 85px 0;
  
  @media (max-width: 992px) {
    height: auto;
    overflow-y: visible;
    padding: 60px 0 40px 0;
  }
`;

const ProfileImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const ProfileImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 50%;
  transform: scale(0.8);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(0.85);
  }
  
  @media (max-width: 1200px) {
    transform: scale(0.7);
    
    &:hover {
      transform: scale(0.75);
    }
  }
  
  @media (max-width: 992px) {
    width: 250px;
    height: 250px;
    transform: scale(0.8);
    
    &:hover {
      transform: scale(0.85);
    }
  }
  
  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    transform: scale(0.9);
    
    &:hover {
      transform: scale(0.95);
    }
  }
`;

const ContentContainer = styled.div`
  max-width: 800px;
  padding-left: 85px;
  min-height: 100vh;
  
  @media (max-width: 992px) {
    padding-left: 20px;
    max-width: 100%;
    min-height: 100vh;
  }
`;

const Username = styled.div`
  font-size: 16px;
  color: var(--light-text-color);
  margin-bottom: 8px;
  font-weight: 400;
`;

const MainTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 85px;
  
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const LargeText = styled.span`
  font-size: 72px;
  
  @media (max-width: 768px) {
    font-size: 54px;
  }
`;

const EmojiIcon = styled.span`
  background: none !important;
  -webkit-background-clip: unset !important;
  -webkit-text-fill-color: unset !important;
  color: initial !important;
  background-clip: unset !important;
`;

const IntroGroup = styled.div`
  margin-bottom: 85px;
`;

const IntroLabel = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 24px;
`;

const IntroText = styled.p`
  font-size: 14px;
  color: var(--light-text-color);
  line-height: 1.2;
  max-width: 497px;
`;

const SnsSection = styled.div`
  margin-bottom: 85px;
`;

const SnsTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 24px;
`;

const SnsIcons = styled.div`
  display: flex;
  gap: 20px;
`;

const SnsIcon = styled.div`
  width: 22px;
  height: 22px;
  color: var(--text-color);
  cursor: pointer;
  
  &:hover {
    opacity: 0.7;
  }
`;

const AppsSection = styled.div`
  margin-bottom: 85px;
`;

const TemplatesSection = styled.div`
  margin-bottom: 85px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 24px;
`;

const AppsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 250px);
  grid-template-rows: repeat(1, 56px);
  gap: 20px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 520px;
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    max-width: 250px;
  }
`;

const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 250px);
  grid-template-rows: repeat(1, 56px);
  gap: 20px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 520px;
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    max-width: 250px;
  }
`;

const AppCard = styled.div`
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const TemplateCard = styled.div`
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const AppIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 2px;
  background: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

const TemplateIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

const AppName = styled.span`
  font-size: 14px;
  color: var(--text-color);
  font-weight: 400;
`;

const TemplateName = styled.span`
  font-size: 14px;
  color: var(--text-color);
  font-weight: 400;
`;

export default Hero; 