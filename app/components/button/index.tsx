import * as React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { ButtonProps } from './button.props';

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  const {
    text,
    isLoading,
    disabled,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    allowScale = true,
    ...rest
  } = props;

  const disabledStyle = React.useMemo(
    () => [
      {
        opacity: disabled ? 0.5 : 1,
      },
    ],
    [disabled],
  );


  return (
    <Pressable
      activeOpacity={0.5}
      disabled={disabled || isLoading}
      style={[
        disabledStyle,
        styleOverride
      ]}
      {...rest}>
      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        children || (
          <Text
            allowFontScaling={allowScale}
            style={textStyleOverride}
          >
            {text}
          </Text>
        )
      )}
    </Pressable>
  );
}
