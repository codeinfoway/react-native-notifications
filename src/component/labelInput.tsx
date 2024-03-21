import React from "react";
import { Platform, TextInputProps, TextStyle, View } from "react-native";
import { TextInput, StyleProp, ViewStyle } from "react-native";
import { fs, mpStyle, vs } from "../utils/styleUtils";
import { COLORS } from "../utils/colors";
import Container from "./container";
import Label from "./label";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface Props {
  placeholder?: string;
  onPress?: () => void;
  inputHeight?: number;
  leftIcon?: React.Component;
  rightIcon?: React.Component;
  mpInput?: mpStyle;
  mpContainer?: mpStyle;
  textSize?: number;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle | TextStyle>;
  onBlur?: () => void;
  editable?: boolean;
  touched?: boolean;
  errors?: string;
  mpInputContainer?: mpStyle;
  inputRef?: any;
  inputContainerStyle?: StyleProp<ViewStyle>;
  label: string;
}

const LabelInput: React.FC<Props & TextInputProps> = ({
  onPress,
  inputHeight,
  textSize,
  leftIcon,
  rightIcon,
  mpInput,
  mpContainer,
  containerStyle,
  inputStyle,
  touched,
  errors,
  mpInputContainer,
  inputRef,
  inputContainerStyle,
  label,
  ...restProps
}) => {
  return (
    <View
      style={[
        {
          ...mpStyle({ ...mpContainer }),
        },
        inputContainerStyle,
      ]}
    >
      {label && (
        <Label size={16} fontFamily={'poppins-semiBold'} color={COLORS.secondary}>
          {label}
        </Label>
      )}
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            ...mpStyle({ ...mpInputContainer }),
            borderBottomWidth: 0.5,
            borderBottomColor: COLORS.darkGray,
          },
          containerStyle,
        ]}
      >
        <>
          {leftIcon && leftIcon}
          <TextInput
            style={[
              {
                flex: 1,
                ...mpStyle({ ...mpInput }),
                fontSize: textSize,
                fontFamily: 'poppins-regular',
                paddingVertical: Platform.OS == "ios" ? 5 : 0,
                color: COLORS.secondary,
                left: Platform.OS == "ios" ? 0 : -4,
              },
              inputStyle,
            ]}
            {...restProps}
            ref={inputRef}
          />
          {rightIcon && rightIcon}
        </>
      </View>
      {touched && errors && (
        <Container mpContainer={{ mt: 5 }} style={{flexDirection:'row',alignItems:'center'}}>
          <MaterialIcons name="error-outline" color={COLORS.red} size={15}/>
          <Label
            size={13}
            style={{
              color: COLORS.red,
              fontFamily: 'poppins-medium',
              marginLeft:3
            }}
          >
            {errors}
          </Label>
        </Container>
      )}
    </View>
  );
};

LabelInput.defaultProps = {
  inputHeight: vs(55),
  textSize: fs(16),
};

export default LabelInput;
