import { Dimensions, Platform } from "react-native";
const { width, height } = Dimensions.get("window");

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  radius2: 16,
  padding: 24,

  // font sizes
  largeTitle: 40,
  mediumTitle: 32,
  title: 16,
  h1: 32,
  h2: 24,
  h3: 18,
  h4: 16,
  h5: 12,
  body1: 32,
  body2: 24,
  body3: 18,
  body4: 15,
  body5: 13,

  heading: 15,
  caption: 13,

  // app dimensions
  width,
  height,

  // BottomSheet content height
  bottom_sheet_list_height:
    (Platform.OS == "ios" ? height * 0.28 : height * 0.3) * 0.22,
};

export const FONTS = {
  largeTitle: { fontFamily: "poppins-black", fontSize: SIZES.largeTitle },
  mediumTitle: {
    fontFamily: "poppins-semibold",
    fontSize: SIZES.mediumTitle,
  },
  title: {
    fontFamily: "poppins-medium",
    fontSize: SIZES.title,
  },
  heading: {
    fontSize: SIZES.body2,
    fontFamily: "poppins-semibold",
    lineHeight: 32,
  },
  h1: {
    fontFamily: "poppins-bold",
    fontSize: SIZES.h1,
    lineHeight: 36,
  },
  h2: {
    fontFamily: "poppins-bold",
    fontSize: SIZES.h2,
    lineHeight: 30,
  },
  h3: {
    fontFamily: "poppins-semibold",
    fontSize: SIZES.h3,
    lineHeight: 24,
  },
  h4: {
    fontFamily: "poppins-medium",
    fontSize: SIZES.h4,
    lineHeight: 20,
  },
  h5: {
    fontFamily: "poppins-medium",
    fontSize: SIZES.h5,
    lineHeight: 15,
  },
  body1: {
    fontFamily: "poppins-regular",
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: "poppins-regular",
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: "poppins-regular",
    fontSize: SIZES.body3,
    lineHeight: 24,
  },
  body4: {
    fontFamily: "poppins-light",
    fontSize: SIZES.body4,
    lineHeight: 20,
  },
  body5: {
    fontFamily: "poppins-light",
    fontSize: SIZES.body5,
    lineHeight: 16,
  },
  subHeading: {
    fontFamily: "poppins-regular",
    fontSize: SIZES.heading,
    lineHeight: 18,
  },
  caption: {
    fontFamily: "poppins-light",
    fontSize: SIZES.caption,
    lineHeight: 12,
  },
  width,
  height,
};

const appTheme = { SIZES, FONTS };

export default appTheme;
