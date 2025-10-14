import { useState } from "react";
import styled from "styled-components";
import LanguageSettings from "./LanguageSettings";
import PasswordSettings from "./PasswordSettings";
import CreateUserSettings from "./CreateUserSettings";
import UserRoleSettings from "./UserRoleSettings";
import UserPasswordSettings from "./UserPasswordSettings";
import AllUsersSection from "./AllUsersSection";
import BranchManagement from "./BranchManagement";
import { useLoginContext } from "../../context/LoginContext";
import { useOutsideClick } from "../../hooks/useOutSideClick";

const SettingsContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  grid-area: settings;
  overflow-y: auto;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
`;

const PageTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
`;

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const AccordionItem = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  overflow: hidden;
  transition: all ${({ theme }) => theme.transition};
`;

const AccordionHeader = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme, isOpen }) =>
    isOpen ? theme.colors.primary : theme.colors.lighter};
  color: ${({ theme, isOpen }) => (isOpen ? "white" : theme.colors.primary)};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  transition: all ${({ theme }) => theme.transition};
  border: none;

  &:hover {
    background-color: ${({ theme, isOpen }) =>
      isOpen ? theme.colors.surface : theme.colors.secondary};
  }
`;

const AccordionIcon = styled.span`
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform ${({ theme }) => theme.transition};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const AccordionContent = styled.div`
  max-height: ${({ isOpen }) => (isOpen ? "1000px" : "0")};
  overflow: hidden;
  transition: max-height ${({ theme }) => theme.transition};
`;

const Settings = () => {
  const [openSection, setOpenSection] = useState(null);
  const { userLogin } = useLoginContext();

  // استخدام الهوك لإغلاق السكشن عند الضغط خارجها
  const accordionRef = useOutsideClick(() => {
    setOpenSection(null);
  });

  const toggleSection = (sectionName) => {
    setOpenSection(openSection === sectionName ? null : sectionName);
  };

  const sections = [
    // {
    //   name: "language",
    //   title: "تغيير اللغة",
    //   component: LanguageSettings,
    //   roles: ["all"],
    // },
    {
      name: "createUser",
      title: "إنشاء مستخدم جديد",
      component: CreateUserSettings,
      roles: ["owner", "manager", "admin"],
    },
    {
      name: "userRole",
      title: "تغيير صلاحيات المستخدم",
      component: UserRoleSettings,
      roles: ["owner", "manager", "admin"],
    },
    {
      name: "password",
      title: "تغيير كلمة المرور",
      component: PasswordSettings,
      roles: ["all"],
    },
    {
      name: "userPassword",
      title: "تغيير كلمة مرور المستخدمين",
      component: UserPasswordSettings,
      roles: ["owner", "manager", "admin"],
    },
    {
      name: "AllUser",
      title: "جميع المستخدمين",
      component: AllUsersSection,
      roles: ["owner", "manager", "admin", "supervisor"],
    },
    {
      name: "branchManagement",
      title: "إدارة الفروع",
      component: BranchManagement,
      roles: ["owner", "admin"],
    },
  ];

  return (
    <SettingsContainer>
      <PageHeader>
        <PageTitle>الإعدادات</PageTitle>
      </PageHeader>

      {/* إضافة الـ ref على الحاوية الرئيسية */}
      <AccordionContainer ref={accordionRef}>
        {sections?.map(({ name, title, component: Component, roles }) => {
          if (roles?.includes("all") || roles?.includes(userLogin?.user?.role))
            return (
              <AccordionItem key={name}>
                <AccordionHeader
                  isOpen={openSection === name}
                  onClick={() => toggleSection(name)}
                >
                  {title}
                  <AccordionIcon isOpen={openSection === name}>▼</AccordionIcon>
                </AccordionHeader>
                <AccordionContent isOpen={openSection === name}>
                  <Component />
                </AccordionContent>
              </AccordionItem>
            );
        })}
      </AccordionContainer>
    </SettingsContainer>
  );
};

export default Settings;
