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
      <div className="container">
        <SectionTitle>Contact Me</SectionTitle>
        
        <ContactContainer>
          <ContactInfo>
            <InfoTitle>Get in Touch</InfoTitle>
            <InfoText>
              Feel free to reach out to me for any project inquiries, collaboration 
              opportunities, or if you just want to say hello.
            </InfoText>
            
            <ContactDetails>
              <ContactItem>
                <ContactIcon>📧</ContactIcon>
                <ContactText>depaier@depaier.com</ContactText>
              </ContactItem>
              <ContactItem>
                <ContactIcon>📍</ContactIcon>
                <ContactText>Paju, South Korea</ContactText>
              </ContactItem>
            </ContactDetails>
            
            <SocialLinks>
              <SocialLink href="https://github.com/depaier" target="_blank" rel="noopener noreferrer">GitHub</SocialLink>
              <SocialLink href="https://www.threads.net/@depaier" target="_blank" rel="noopener noreferrer">Threads</SocialLink>
            </SocialLinks>
          </ContactInfo>
          
          <ContactForm onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Name</FormLabel>
              <FormInput 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                value={formData.name} 
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            {/* <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormInput 
                type="email" 
                name="email" 
                placeholder="Your Email" 
                value={formData.email} 
                onChange={handleChange}
                required
              />
            </FormGroup> */}
            
            <FormGroup>
              <FormLabel>Message</FormLabel>
              <FormTextarea 
                name="message" 
                placeholder="Your Message" 
                value={formData.message} 
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <SubmitButton 
              type="submit" 
              disabled={formStatus === 'submitting'}
            >
              {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
            </SubmitButton>
            
            {formStatus === 'success' && (
              <FormMessage success>Your message has been sent successfully!</FormMessage>
            )}
            
            {formStatus === 'error' && (
              <FormMessage>There was an error sending your message. Please try again.</FormMessage>
            )}
          </ContactForm>
        </ContactContainer>
      </div>
    </ContactSection>
  );
};

const ContactSection = styled.section`
  background-color: var(--secondary-background);
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

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

const InfoText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: var(--light-text-color);
  line-height: 1.7;
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