import {TextInputProps} from 'react-native';

export interface SearchInputRef {
  focus(): void;
}

export interface SearchInputProps extends TextInputProps {
  placeholderTx?: string;
  initialized?: boolean;
  clear?(): void;
  onBackPress?(): void;
  displayClear?: boolean;
  inProgress?: boolean;
}
