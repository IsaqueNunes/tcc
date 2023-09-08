import { useNavigation } from "@react-navigation/native";
import React, { ReactNode } from "react";
import { Omit, StyleProp, Text, TouchableOpacityProps, ViewStyle } from "react-native";
import { TouchableOpacity } from 'react-native';

import { styles } from "./styles";

type TouchablePropsWithoutDefaultStyle = Omit<TouchableOpacityProps, 'style'>

interface ButtonProps extends TouchablePropsWithoutDefaultStyle {
  style?: StyleProp<ViewStyle>,
  children: ReactNode
}

export default function Button({ style, children, ...props }: ButtonProps) {

  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} {...props}>
      {children}
    </TouchableOpacity>
  )
}
