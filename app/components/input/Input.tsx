import React from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View
} from 'react-native';
import { color } from '../../theme/color';
import { spacing } from '../../theme/spacing';


export type InputProps = TextInputProps & {
  imageSource?: any,
  imageStyle?: StyleProp<ImageStyle>
  error?: boolean,
  errorText?: string
}

const Input = (props: InputProps): JSX.Element => {
  const { placeholder, imageSource, imageStyle, error, errorText, ...rest } = props;

  return (
    <>
      <View style={[styles.container, { borderColor: error ? color.danger : color.border }]}>
        <TextInput
          underlineColorAndroid={'transparent'}
          textAlign={'left'}
          placeholder={placeholder ? placeholder : undefined}
          style={styles.input}
          {...rest} />
        <Image source={imageSource} style={imageStyle} />
      </View>
      {error && <Text style={styles.error}>
        {errorText}
      </Text>}
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: spacing.radius,
    paddingVertical: spacing.tiny,
    flexDirection: "row-reverse",
    justifyContent: "flex-end"
  },
  input: {
    color: color.text,
    fontSize: 14,
  },

  error: {
    color: color.danger,
    fontSize: 12,
    paddingVertical: spacing.small,
    textAlign: "center"
  }
})