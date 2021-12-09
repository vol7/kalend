export interface ButtonBaseProps {
  onClick?: any;
  text?: string;
  disabled?: boolean;
  className?: string;
  isDark: boolean;
  isLoading?: boolean;
  children?: any;
  style?: any;
  id?: string;
  propagation?: boolean;
  onClickFromParent?: any;
}
