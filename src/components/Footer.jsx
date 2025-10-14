import styled from "styled-components";

const StlyedFooter = styled.footer`
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.lighter};
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: ${({ theme }) => theme.transition};
`;

const DesignerLink = styled.a`
  color: ${({ theme }) => theme.colors.lighter};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-decoration: none;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: underline;
  }
`;

function Footer() {
  return (
    <StlyedFooter>
      &copy; {2025} Cashier System. All Rights Reserved. Design by{" "}
      <DesignerLink
        href="https://www.facebook.com/youssef.ashraf.775436/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Youssef
      </DesignerLink>
    </StlyedFooter>
  );
}

export default Footer;
