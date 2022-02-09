const navigation = Object.freeze({
  expandedWidth: "271px",
  expandedWidthMobile: "100%",
  collapsedWidth: "56px",
  collapsedWidthMobile: "0px",
  defaultState: false, // Expanded
});

const breakpoints = Object.freeze({
  xs: "600", //phone
  sm: "768", //tablet
  md: "1024", //laptop*
  lg: "1440", //desktop*
});

// * -16px on desktop for browser scrollbar

export { navigation, breakpoints };
