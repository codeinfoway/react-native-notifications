import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { SIZES,FONTS } from "../utils/constants";
import { COLORS } from "../utils/colors";

const Header = ({
  title,
  subtitle,
  leftIcon,
  leftPress,
  RightComponent,
  titleStyle = {}
}) => {
  return (
    <View style={{
      overflow: "hidden",
      paddingBottom: SIZES.radius,
    }}>
      <View
        style={{
          width: SIZES.width,
          height:
            Platform.OS === "ios" ? SIZES.height * 0.07 : SIZES.height * 0.08,
          backgroundColor: COLORS.white,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: SIZES.radius2,
          borderBottomLeftRadius: SIZES.radius2,
          borderBottomRightRadius: SIZES.radius2,
          shadowColor: COLORS.black,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.7,
          shadowRadius: 4,
          elevation: 15,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {leftIcon && (
            <TouchableOpacity
              style={{ marginRight: SIZES.radius }}
              onPress={leftPress}
            >
              <Feather
                name={leftIcon}
                size={Platform.OS == "ios" ? 25 : 28}
                color={COLORS.secondary}
              />
            </TouchableOpacity>
          )}
          <View style={{ display: 'flex', justifyContent: "space-between" }}>
            <Text
              style={[{
                fontFamily: "poppins-medium",
                fontSize: Platform.OS == "ios" ? 20 : 18,
                color: COLORS.secondary,
              }, titleStyle]
              }
            >
              {title}
            </Text>
            {subtitle && (
              <Text
                style={{
                  ...FONTS.caption,
                  color: COLORS.gray2,
                }}
              >
                {subtitle}
              </Text>
            )}
          </View>
        </View>

        <View>{RightComponent}</View>
      </View>
    </View>
  );
};

export default Header;
