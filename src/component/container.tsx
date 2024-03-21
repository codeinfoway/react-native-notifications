import React, { ReactNode } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, Pressable, PressableProps } from "react-native"
import { mpStyle, vs } from '../utils/styleUtils';

interface Props {
    onPress?: () => void,
    height?: number,
    width?: number,
    mpContainer?: mpStyle,
    style?: StyleProp<ViewStyle>,
    children?: ReactNode,
}

const Container: React.FC<Props & PressableProps> = ({
    onPress,
    style,
    children,
    height,
    mpContainer,
    width,
    ...props
}) => {

    const styles = StyleSheet.create({
        containerStyle: {
            height: height && vs(height),
            width: width && vs(width),
            ...mpStyle({ ...mpContainer })
        }
    })

    if (onPress) {
        return (
            <Pressable
                onPress={onPress}
                style={[styles.containerStyle, style]}
                {...props}
            >
                {children}
            </Pressable>
        )
    }

    return (
        <View style={[styles.containerStyle, style]} >
            {children}
        </View>
    )
}

export default Container