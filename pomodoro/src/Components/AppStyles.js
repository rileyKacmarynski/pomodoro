import { ThemeProvider, createGlobalStyle, keyframes } from 'styled-components';

const theme = {
  primary: 'rgba(21, 25, 50, 1)',
  accent: 'rgba(246, 113, 115, 1)',
  bgPrimary: 'rgba(30, 33, 64, 1)',
  bgSecondary: 'rgba(42, 45, 82, 1)',
  textLight: 'rgba(255, 255, 255, .8)',
  textMedium: 'rgba(255, 255, 255, .65)',
  textDark: 'rgba(21, 25, 50, 1)',
  animationDuration: '1s'
}

// rgba(246, 113, 115, 1)
// blue: #71f2f7
// purple: #d881f7

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: ${props => props.theme.bgPrimary};
    color: ${props => props.theme.textLight};
  }
`;

export const fadeOpacity = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export default function AppStyles({children}){
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}