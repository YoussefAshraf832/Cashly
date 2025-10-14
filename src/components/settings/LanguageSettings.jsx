import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const LanguageOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.lighter : "transparent"};
  border: 1px solid
    ${({ selected, theme }) =>
      selected ? theme.colors.primary : theme.colors.secondary};
  transition: all 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lighter};
  }
`;

const LanguageRadio = styled.input`
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
  border: 1px solid #c3e6cb;
`;

const LanguageSettings = () => {
  const [currentLanguage, setCurrentLanguage] = useState("ar");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const languages = [
    { value: "ar", label: "العربية" },
    { value: "en", label: "English" },
  ];

  return (
    <Container>
      <div>
        {languages.map((language) => (
          <LanguageOption
            key={language.value}
            selected={currentLanguage === language.value}
            onClick={() => handleLanguageChange(language.value)}
          >
            <LanguageRadio
              type="radio"
              name="language"
              value={language.value}
              checked={currentLanguage === language.value}
              onChange={() => {}}
            />
            {language.label}
          </LanguageOption>
        ))}
      </div>
      {showSuccess && <SuccessMessage>تم تغيير اللغة بنجاح</SuccessMessage>}
    </Container>
  );
};

export default LanguageSettings;
