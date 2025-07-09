import { useState, useEffect } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  useEffect(() => {
    // Initialize EmailJS with public key
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'depaier7@gmail.com'
        }
      );
      
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setFormStatus('error');
      
      // Reset error status after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }
  };
  
  return (
    <ContactSection id="contact">
      <ContactContent>
        <SectionTitle>연락하기</SectionTitle>
        
        <ContactContainer>
          <ContactInfo>
            <InfoTitle>Get in Touch</InfoTitle>
            <InfoText>
              프로젝트 문의, 협업 기회 또는 인사말이 있으시면 언제든지 연락해 주세요.
            </InfoText>
            
            <ContactDetails>
              <ContactItem>
                <ContactIcon>📧</ContactIcon>
                <ContactText>depaier7@gmail.com</ContactText>
              </ContactItem>
              <ContactItem>
                <ContactIcon>📍</ContactIcon>
                <ContactText>파주, 대한민국</ContactText>
              </ContactItem>
            </ContactDetails>
            
            <SocialLinks>
              <SocialLink href="https://github.com/depaier" target="_blank" rel="noopener noreferrer">GitHub</SocialLink>
              <SocialLink href="https://www.threads.net/@depaier" target="_blank" rel="noopener noreferrer">Threads</SocialLink>
            </SocialLinks>
          </ContactInfo>
          
          <ContactForm onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>이름</FormLabel>
              <FormInput 
                type="text" 
                name="name" 
                placeholder="당신의 이름" 
                value={formData.name} 
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>메시지</FormLabel>
              <FormTextarea 
                name="message" 
                placeholder="메시지를 입력해주세요" 
                value={formData.message} 
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <SubmitButton 
              type="submit" 
              disabled={formStatus === 'submitting'}
            >
              {formStatus === 'submitting' ? '전송 중...' : '메시지 보내기'}
            </SubmitButton>
            
            {formStatus === 'success' && (
              <FormMessage success>메시지가 성공적으로 전송되었습니다!</FormMessage>
            )}
            
            {formStatus === 'error' && (
              <FormMessage>메시지 전송에 실패했습니다. 다시 시도해주세요.</FormMessage>
            )}
          </ContactForm>
        </ContactContainer>
      </ContactContent>
    </ContactSection>
  );
};

const ContactSection = styled.section`
  background-color: var(--background-color);
  padding: 60px 0;
  
  @media (max-width: 992px) {
    padding: 40px 0;
  }
`;

const ContactContent = styled.div`
  padding: 0 60px;
  max-width: 800px;
  width: 100%;
  
  @media (max-width: 992px) {
    padding: 0 20px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 40px;
  text-align: left;
`;

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--text-color);
  font-weight: 500;
`;

const InfoText = styled.p`
  font-size: 14px;
  margin-bottom: 1.5rem;
  color: var(--light-text-color);
  line-height: 1.5;
`;

const ContactDetails = styled.div`
  margin-bottom: 2rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const ContactIcon = styled.span`
  font-size: 1.5rem;
  margin-right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 122, 255, 0.1);
  border-radius: 50%;
  color: var(--primary-color);
`;

const ContactText = styled.span`
  font-size: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

const SocialLink = styled.a`
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const FormInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
  background-color: var(--secondary-background);
  color: var(--text-color);
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.1);
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  min-height: 150px;
  font-family: var(--font-sans);
  background-color: var(--secondary-background);
  color: var(--text-color);

  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.1);
  }
`;

const SubmitButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 4px;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background-color: #0062cc;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 122, 255, 0.3);
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

interface FormMessageProps {
  success?: boolean;
}

const FormMessage = styled.div<FormMessageProps>`
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  text-align: center;
  background-color: ${props => props.success ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)'};
  color: ${props => props.success ? '#28a745' : '#dc3545'};
`;

export default Contact; 