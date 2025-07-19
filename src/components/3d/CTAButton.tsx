import React from 'react';

interface CTAButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const CTAButton: React.FC<CTAButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'primary', 
  disabled = false,
  type = 'button'
}) => {
  const baseClasses = 'cta-button';
  const variantClasses = variant === 'primary' ? 'cta-button-primary' : 'cta-button-secondary';
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CTAButton;