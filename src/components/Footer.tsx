import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLeft>
          <Logo>depaier</Logo>
          <FooterDescription>
            창의적으로 문제를 해결하는 1인 개발자 입니다.
          </FooterDescription>
        </FooterLeft>

        <FooterLinks>
          <FooterLinksGroup>
            <FooterLinksTitle>소셜</FooterLinksTitle>
            <FooterExternalLink
              href="https://www.instagram.com/depaier/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </FooterExternalLink>
            <FooterExternalLink
              href="https://www.threads.net/@depaier"
              target="_blank"
              rel="noopener noreferrer"
            >
              Threads
            </FooterExternalLink>
          </FooterLinksGroup>
        </FooterLinks>
      </FooterContent>

      <FooterBottom>
        <BusinessInfo>
          <BusinessText>상호명 : depaier | 대표자명 : 박진호</BusinessText>
          <BusinessText>사업자등록번호 : 813-11-02598</BusinessText>
          <BusinessText>
            통신판매업신고번호 : 제2025-경기파주-0997호
          </BusinessText>
          <Copyright>&copy; 2025. depaier All rights reserved.</Copyright>
        </BusinessInfo>
      </FooterBottom>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: var(--background-color);
  color: var(--text-color);
  padding: 4rem 0 2rem 0;
  padding-left: 85px;
  margin-top: 4rem;
  border-top: 1px solid var(--border-color);

  @media (max-width: 992px) {
    padding-left: 20px;
  }
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
  color: var(--light-text-color);
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
  font-size: 0.8rem;
  font-weight: 700;
  margin-top: 0.9rem;
`;

const FooterExternalLink = styled.a`
  font-size: 0.95rem;
  color: var(--light-text-color);
  text-decoration: none;
  transition: opacity 0.3s ease;

  &:hover {
    color: var(--light-text-color);
    opacity: 0.7;
  }

  &:visited {
    color: var(--light-text-color);
  }
`;

const FooterBottom = styled.div`
  padding: 1.5rem 0;
  margin-top: 3rem;
  text-align: left;
`;

const BusinessInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const BusinessText = styled.p`
  font-size: 0.8rem;
  color: var(--light-text-color);
  margin: 0;
`;

const Copyright = styled.p`
  font-size: 0.8rem;
  color: var(--light-text-color);
  margin: 0;
  margin-top: 1rem;
`;

export default Footer;
