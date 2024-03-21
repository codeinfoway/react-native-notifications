import React from "react";
import {} from "react";
import { Text, StyleProp, TextStyle, TextProps } from "react-native";
import { COLORS } from "../utils/colors";
import { fs, mpStyle } from "../utils/styleUtils";

interface Props {
  onPress?: () => void;
  style?: StyleProp<TextStyle>;
  size?: number;
  mpLabel?: mpStyle;
  color?: string;
  fontFamily?: string;
}

const Label: React.FC<Props & TextProps> = ({
  style,
  children,
  size,
  mpLabel,
  onPress,
  color,
  fontFamily,
  ...restProps
}) => {
  return (
    <Text
      style={[
        {
          fontSize: size,
          color,
          fontFamily,
          ...mpStyle({ ...mpLabel }),
        },
        style,
      ]}
      {...restProps}
      onPress={onPress}
    >
      {children}
    </Text>
  );
};

Label.defaultProps = {
  color: COLORS.black,
  fontFamily: 'poppins-regular',
  size: fs(15),
};

export default Label;
