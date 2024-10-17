export type MatersDialogProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  content: React.ReactNode;
  actions?: React.ReactNode;
};
