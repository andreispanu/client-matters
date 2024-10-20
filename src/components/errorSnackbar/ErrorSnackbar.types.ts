export type ErrorSnackbarProps = {
  open: boolean;
  message: string;
  onClose: () => void;
  autoHideDuration?: number;
};
