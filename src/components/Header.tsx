import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };
  
  return (
    <HeaderContainer isScrolled={isScrolled}>
      <div className="container">
        <NavbarContent>
          <Logo onClick={() => window.scrollTo(0, 0)}>depaier</Logo>
          
          <DesktopMenu>
            <MenuItem onClick={() => scrollToSection('apps')}>앱</MenuItem>
            <MenuItem onClick={() => scrollToSection('templates')}>템플릿</MenuItem>
            <MenuItem onClick={() => scrollToSection('contact')}>연락하기</MenuItem>
          </DesktopMenu>
          
          <MobileMenuToggle onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </MobileMenuToggle>
        </NavbarContent>
      </div>
      
      <MobileMenu isOpen={isMobileMenuOpen}>
        <MenuItem onClick={() => scrollToSection('apps')}>앱</MenuItem>
        <MenuItem onClick={() => scrollToSection('templates')}>템플릿</MenuItem>
        <MenuItem onClick={() => scrollToSection('contact')}>연락하기</MenuItem>
      </MobileMenu>
    </HeaderContainer>
  );
};

interface HeaderContainerProps {
  isScrolled: boolean;
}

const HeaderContainer = styled.header<HeaderContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  z-index: 1000;
  transition: all 0.3s ease;
  background-color: ${props => props.isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent'};
  backdrop-filter: ${props => props.isScrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${props => props.isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
`;

const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--header-height);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
`;

const DesktopMenu = styled.nav`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuItem = styled.div`
  cursor: pointer;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: var(--primary-color);
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu = styled.nav<MobileMenuProps>`
  position: fixed;
  top: var(--header-height);
  left: 0;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-100%)'};
  opacity: ${props => props.isOpen ? 1 : 0};
  transition: all 0.3s ease;
  z-index: 999;
  
  ${MenuItem} {
    padding: 1rem 2rem;
    
    &:after {
      display: none;
    }
    
    &:hover {
      background-color: var(--secondary-background);
    }
  }
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileMenuToggle = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 20px;
  cursor: pointer;
  
  span {
    display: block;
    height: 2px;
    background-color: var(--text-color);
    transform-origin: center;
    transition: all 0.3s ease;
  }
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

export default Header; 