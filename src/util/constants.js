const navigation = Object.freeze({
  expandedWidth: "271px",
  collapsedWidth: "56px",
  defaultState: false, // Expanded
});

const breakpoints = Object.freeze({
  xs: "600", //phone
  sm: "960", //tablet
  md: "1264", //laptop*
  lg: "1904", //desktop*
});

//* -16px on desktop for browser scrollbar

export { navigation, breakpoints };
