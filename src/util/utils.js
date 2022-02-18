import {
  navigation as navigationConstants,
  breakpoints,
} from "@/util/constants";

const {
  defaultState,
  expandedWidth: expandedShift,
  collapsedWidth: collapsedShift,
} = navigationConstants;

const { xs: phone, sm: tablet, md: laptop, lg: desktop } = breakpoints;

function calcViewportShift() {
  if (document.documentElement.clientWidth <= phone) return 0;
  return defaultState ? expandedShift : collapsedShift;
}

function findDeviceType() {
  const width = document.documentElement.clientWidth;

  if (width > desktop) return "ultra-wide";
  if (width > laptop && width <= desktop) return "desktop";
  if (width > tablet && width <= laptop) return "laptop";
  if (width > phone && width <= tablet) return "tablet";
  if (width <= phone) return "phone";

  return "phone";
}

export { calcViewportShift, findDeviceType };
