import React from 'react';
import {
  Text,
  Pressable,
  StyleProp,
  ViewStyle,
  TextStyle,
  PressableProps,
} from 'react-native';
import {fs, mpStyle, vs} from '../utils/styleUtils';
import {COLORS} from '../utils/colors';

interface Props {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  mpBtn?: mpStyle;
  height?: number;
  radius?: number;
  textSize?: number;
  labelStyle?: StyleProp<TextStyle>;
  mpLabel?: mpStyle;
  textColor?: string;
  leftIcon?: () => void;
  rightIcon?: () => void;
}

const Button: React.FC<Props & PressableProps> = ({
  title,
  onPress,
  style,
  mpBtn,
  height,
  radius,
  textSize,
  labelStyle,
  mpLabel,
  textColor,
  leftIcon,
  rightIcon,
  ...restProps
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          height,
          ...mpStyle({...mpBtn}),
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: radius,
          backgroundColor: COLORS.secondary,
          flexDirection: 'row',
        },
        style,
      ]}
      {...restProps}>
      <>
        {leftIcon ? leftIcon() : null}
        <Text
          style={[
            {
              color: textColor,
              fontSize: textSize,
              ...mpStyle({...mpLabel}),
              fontFamily: 'poppins-regular',
            },
            labelStyle,
          ]}>
          {title}
        </Text>
        {rightIcon ? rightIcon() : null}
      </>
    </Pressable>
  );
};

Button.defaultProps = {
  radius: 10,
  height: vs(55),
  textColor: COLORS.white,
  textSize: fs(15),
};

export default Button;
