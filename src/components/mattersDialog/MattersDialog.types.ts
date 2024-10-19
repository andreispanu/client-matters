import { MattersData } from "../../pages/ClientDetailsPage/ClientDetailsPage.types";

export type MatersDialogProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  content: MattersData;
  actions?: React.ReactNode;
  contentLoading?: boolean;
  contentError?: string;
};
