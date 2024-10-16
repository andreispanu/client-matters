export type ReusableDialogProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  content: React.ReactNode;
  actions?: React.ReactNode;
};
