import {ViewStyle, TextStyle, TouchableOpacityProps} from 'react-native';

export interface ButtonProps extends TouchableOpacityProps {
  text?: string;

  allowScale?: boolean;

  isLoading?: boolean;

  disabled?: boolean;

  style?: ViewStyle | ViewStyle[];

  textStyle?: TextStyle | TextStyle[];

  children?: React.ReactNode;
}
