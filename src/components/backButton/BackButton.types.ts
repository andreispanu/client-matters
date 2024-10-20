export type BackButtonProps = {
  linkDetails: string;
  label: string;
  action?: (action: React.KeyboardEvent | React.MouseEvent) => void;
};
