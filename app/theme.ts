interface ThemeToken {
  light: {
    background: string;
    textColor: string;
    borderColor: string;
    primaryColor: string;
    lighterBackground: string;
  };
  dark: {
    background: string;
    textColor: string;
  };
}

export const token: ThemeToken = {
  light: {
    background: "#FFF2E9",
    textColor: "#070707",
    borderColor: "#070707",
    primaryColor: "#FFD913",
    lighterBackground: "#363636",
  },
  dark: {
    background: "#FFF2E9",
    textColor: "#070707",
  },
};
