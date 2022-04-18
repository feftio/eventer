declare module "*.module.css";
declare module "*.module.sass";
declare module "*.module.scss";
declare module "*.png";
declare module "*.jpg";
declare module "*.svg";
declare module '@mui/material/styles' {
    interface Theme {
      status: {
        danger: string;
      };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
      status?: {
        danger?: string;
      };
    }
  }