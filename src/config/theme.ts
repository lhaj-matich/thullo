import { extendTheme, ThemeConfig, ComponentStyleConfig, defineStyleConfig, Textarea } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
};

const MenuStyle: ComponentStyleConfig = {
  variants: {
    primary: {
      list: {
        padding: "2",
        borderRadius: "12px",
        border: "1px solid #E0E0E0",
        backgroundColor: "#fff",
        boxShadow: "0px 2px 8px rgba(220,220,220, 0.8)",
      },
      item: {
        color: "#4F4F4F",
        borderRadius: "12px",
        _hover: {
          bg: "#F2F2F2",
        },
        _focus: {
          bg: "#F3F3F3",
        },
      },
    },
    search: {
      list: {
        padding: "2",
        width: "400px",
        borderRadius: "12px",
        border: "1px solid #E0E0E0",
        backgroundColor: "#fff",
        boxShadow: "0px 2px 8px rgba(220,220,220, 0.8)",
      },
      item: {
        color: "#4F4F4F",
        borderRadius: "12px",
        _hover: {
          bg: "#F2F2F2",
        },
        _focus: {
          bg: "#F3F3F3",
        },
      },
    },
  },
};

const ModalStyle: ComponentStyleConfig = {
  variants: {
    primary: {
      closeButton: {
        bgColor: "primary",
        color: "#fff",
        zIndex: 4,
        _hover: {
          backgroundColor: "primaryLight",
        },
        _active: {
          backgroundColor: "#1264CE",
        },
      },
    },
  },
};

const FormLabelStyle: ComponentStyleConfig = {
  // style object for base or default style
  baseStyle: {
    color: "red",
  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    primary: {
      color: "#828282",
      paddingLeft: 1,
      marginTop: 4,
    },
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    size: "",
    variant: "",
    colorScheme: "",
  },
};

const EditableStyle: ComponentStyleConfig = {
  baseStyle: {},
  sizes: {},
  variants: {
    regular: {
      border: "none",
      outline: "none",
      _hover: {
        border: "none",
        outline: "none",
      },
      _focus: {
        outline: "1px solid #5497f0",
      },
    },
  },
};

const TextAreaStyle: ComponentStyleConfig = {
  variants: {
    generic: {
      resize: "none",
      padding: "5px",
      border: "2px solid #BDBDBD",
      borderRadius: "10px",
      boxShadow: "none",
      overflow: "auto",
      "&::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#E0E0E0",
        borderRadius: "8px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#555",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "#f1f1f1",
      },
      _focus: {
        boxShadow: "none"
      }
    }
  }
}

const ButtonStyle: ComponentStyleConfig = {
  // style object for base or default style
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    primary: {
      padding: "8px 14px",
      backgroundColor: "primary",
      borderRadius: "8px",
      color: "#fff",
      fontFamily: "Poppins",
      fontWeight: "500",
      _hover: {
        backgroundColor: "primaryLight",
      },

      _active: {
        backgroundColor: "#1264CE",
        color: "#fff",
      },
    },
    ghost: {
      padding: "8px 14px",
      backgroundColor: "transparent",
      color: "#828282",
      fontFamily: "Poppins",
      fontWeight: "500",
      fontSize: "sm",
      borderRadius: "8px",
      _hover: {
        backgroundColor: "gray.100",
      },
    },
    green: {
      padding: "8px 14px",
      backgroundColor: "#219653",
      borderRadius: "8px",
      color: "#fff",
      fontFamily: "Poppins",
      fontWeight: "500",
      _hover: {
        backgroundColor: "#28B867",
      },

      _active: {
        backgroundColor: "#166438",
        color: "#fff",
      },
    },
    outlinePrivate: {
      padding: "4px 14px",
      backgroundColor: "transparent",
      color: "#828282",
      border: "1px solid #828282",
      borderRadius: "12px",
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "normal",
      letterSpacing: "-0.35px",
      _hover: {
        backgroundColor: "#fff",
      },
    },
    outlineRed: {
      padding: "6px 18px",
      backgroundColor: "transparent",
      color: "#EB5757",
      fontFamily: "Poppins",
      fontWeight: "500",
      fontSize: "sm",
      borderRadius: "8px",
      letterSpacing: "-0.35px",
      border: "1px solid #EB5757",
      _hover: {
        backgroundColor: "#EB5757",
        color: "#fff",
      },
      _active: {
        backgroundColor: "#B71515",
        border: "1px solid #B71515",
        color: "#fff",
      },
    },
    menuButton: {
      padding: "3px 8px",
      color: "#333",
      borderRadius: "8px",
      fontFamily: "Poppins",
      fontWeight: "400",
    },
    private: {
      padding: "10px 14px",
      backgroundColor: "#F2F2F2",
      borderRadius: "8px",
      color: "#828282",
      fontFamily: "Poppins",
      fontWeight: "500",
      fontSize: "15px",
      letterSpacing: "-0.42px",
      _hover: {
        backgroundColor: "#D9D9D9",
      },

      _active: {
        backgroundColor: "#D1D1D1",
        color: "#828282",
      },
    },
    generic: {
      padding: "10px 14px",
      backgroundColor: "primary",
      borderRadius: "8px",
      color: "#fff",
      fontFamily: "Poppins",
      fontWeight: "500",
      letterSpacing: "-0.35px",
      marginTop: 2,
      _hover: {
        backgroundColor: "primaryLight",
      },

      _active: {
        backgroundColor: "primary",
        color: "#000",
      },
    },
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    size: "",
    variant: "primary",
    colorScheme: "",
  },
};

const InputStyle: ComponentStyleConfig = {
  // style object for base or default style
  baseStyle: {},
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    outline: {
      field: {
        borderColor: "blue.500",
        borderWidth: "0",
        backgroundColor: ".100",
        boxShadow: "0px 2px 8px rgba(220,220,220, 0.8)",
        padding: "8px 14px",
        marginBottom: "3px",
        borderRadius: "8px",
        "&::placeholder": {
          color: "#BDBDBD",
          fontFamily: "Poppins",
        },
      },
    },
  },

  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    size: "",
    variant: "",
    colorScheme: "",
    focusBorderColor: "primary",
  },
};

const TextStyle: ComponentStyleConfig = {
  variants: {
    generic: {
      fontSize: "15px",
      fontFamily: "Poppins",
      fontWeight: 400,
      letterSpacing: "-0.42px",
    },
    paragraph: {
      color: "#000",
      fontFamily: "Noto Sans",
      fontSize: "14px",
      fontWeight: 400,
      lightHeight: "normal",
      letterSpacing: "-0.49px"
    }
  },
};

const HeadingStyle: ComponentStyleConfig = {
  baseStyle: {},
  sizes: {},
  variants: {
    cardTitle: {
      color: "#000",
      fontFamily: "Noto Sans",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",
      letterSpacing: "-0.56px",
      padding: "5px",
    },
    listTitle: {
      color: "#333",
      fontFamily: "Poppins",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: "normal",
      letterSpacing: "-0.49px",
    },
    HeaderTitle: {
      color: "#333",
      fontFamily: "Poppins",
      fontSize: "18px",
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: "normal",
      letterSpacing: "-0.63px",
    },
    generic: {
      fontSize: "19px",
      fontFamily: "Poppins",
      fontWeight: 600,
      letterSpacing: "-0.42px",
    },
  },
};

const AvatarStyle = defineStyleConfig({
  baseStyle: {
    width: "32px",
    height: "32px",
    borderRadius: "lg",
    fontSize: "12px",
    objectFit: "cover",
  },
  sizes: {},
  variants: {
    clickable: {
      cursor: "pointer",
      _hover: {
        opacity: 0.8,
      },
      _active: {
        outline: "2px solid #5497f0",
      },
    },
  },
});

const HStackStyle = defineStyleConfig({
  variants: {
    ListItemButton: {
      borderBottom: "1px solid #f2f2f2",
      padding: "5px",
      marginY: "5px",
      borderRadius: "8px",
      justifyContent: "space-between",
      "&:hover": {
        backgroundColor: "#F5F5F5",
        cursor: "pointer",
      },
    },
    ListItemButtonGhost: {
      padding: "5px",
      borderRadius: "8px",
      "&:hover": {
        backgroundColor: "#F5F5F5",
        cursor: "pointer",
      },
    },
  },
});

const EditablePreviewStyle: ComponentStyleConfig = {
  variants: {
    generic: {
      overflow: "auto",
      "&::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#E0E0E0",
        borderRadius: "8px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#555",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "#f1f1f1",
      },
    }
  }
}

const BoxStyle = defineStyleConfig({
  // style object for base or default style
  baseStyle: {},
  sizes: {},
  variants: {
    searchContainer: {
      zIndex: 4,
      padding: "10px",
      paddingBottom: "0px",
      width: "400px",
      borderRadius: "12px",
      bgColor: "#fff",
      border: "1px solid #E0E0E0",
      position: "absolute",
      boxShadow: "0px 2px 8px rgba(220,220,220, 0.8)",
    },
    usersList: {
      padding: "10px",
      paddingBottom: "0px",
      borderRadius: "12px",
      bgColor: "#fff",
      border: "1px solid #E0E0E0",
      boxShadow: "0px 2px 8px rgba(220,220,220, 0.8)",
      overflow: "auto",
      "&::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#E0E0E0",
        borderRadius: "8px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#555",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "#f1f1f1",
      },
    },
    ListContainer: {
      padding: "5px",
      overflow: "auto",
      maxHeight: "400px",
      "&::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#E0E0E0",
        borderRadius: "8px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#555",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "#f1f1f1",
      },
    },
    searchButton: {
      "&:hover": {
        backgroundColor: "red",
      },
    },
    genericCard: {
      width: "330px",
      padding: "10px",
      paddingBottom: "0px",
      borderRadius: 20,
      bgColor: "#fff",
      boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.05)",
      _hover: {
        cursor: "pointer",
      },
    },
    placeHolder: {
      width: "90%",
      height: "70vh",
      borderRadius: "lg",
      bg: "gray.100",
      mx: "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
});

const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        bg: "#F8F9FD",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#E0E0E0",
          borderRadius: "8px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#555",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#f1f1f1",
        },
        //#4F4F4F
      },
    },
  },
  colors: {
    gray: {
      100: "#F2F2F2",
      700: "#828282",
      600: "#4F4F4F",
    },
    primary: "#2F80ED",
    primaryLight: "#5497f0",
    grayDark: "#4F4F4F",
    grayLight: "#828282",
  },
  components: {
    Input: InputStyle,
    Button: ButtonStyle,
    Editable: EditableStyle,
    FormLabel: FormLabelStyle,
    Heading: HeadingStyle,
    AvatarStyle: AvatarStyle,
    BoxStyle: BoxStyle,
    Text: TextStyle,
    Link: {
      baseStyle: {
        fontFamily: "Poppins",
      },
    },
    Menu: MenuStyle,
    HStack: HStackStyle,
    Modal: ModalStyle,
    Textarea: TextAreaStyle,
    EditablePreview: EditablePreviewStyle,
  },
});

export default theme;
