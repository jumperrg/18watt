import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background:
      radial-gradient(ellipse at 15% 20%, rgba(255, 245, 150, 0.55) 0%, transparent 55%),
      radial-gradient(ellipse at 85% 10%, rgba(255, 182, 210, 0.5) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 80%, rgba(140, 230, 245, 0.5) 0%, transparent 55%),
      radial-gradient(ellipse at 30% 75%, rgba(255, 200, 180, 0.35) 0%, transparent 50%),
      #f5f0eb;
    color: ${({ theme }) => theme.text};
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
    position: relative;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: 0.45;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 200px 200px;
  }

  body > * {
    position: relative;
    z-index: 1;
  }`;
