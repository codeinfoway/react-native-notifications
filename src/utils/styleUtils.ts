import { DefaultTheme } from "@react-navigation/native";
import { Dimensions, PixelRatio } from "react-native";
import { COLORS } from "./colors";

const { fontScale, width, height } = Dimensions.get("screen");

export const screenWidth = width;
export const screenHeight = height;

/// for responsive fontSize

export function fs(size: number) {
  return size / PixelRatio.roundToNearestPixel(fontScale);
}

// for responsive vertical scale
export const vs = (size: number) => height * (size / height);

// for responsive horizontal scale
export const hs = (size: number) => width * (size / width);

// mpStyle for scale the horizontal and vertical margin and padding.

export interface mpStyle {
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  mh?: number;
  mv?: number;
  m?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  pv?: number;
  ph?: number;
  p?: number;
}

export const mpStyle = (mpStyle: mpStyle) => {
  const { m, mt, mb, ml, mr, mh, mv, p, pt, pb, pl, pr, ph, pv } = mpStyle;
  return {
    marginTop: mt,
    marginHorizontal: mh,
    marginLeft: ml,
    marginBottom: mb,
    marginRight: mr,
    margin: m,
    paddingTop: pt,
    paddingLeft: pl,
    paddingBottom: pb,
    paddingRight: pr,
    padding: p,
    paddingVertical: pv,
    marginVertical: mv,
    paddingHorizontal: ph,
  };
};

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.white,
  },
};

export const shadows = {
  elevation: 3,
  shadowOffset: { width: 0.5, height: 0.5 },
  shadowOpacity: 0.5,
  shadowRadius: 2,
};
