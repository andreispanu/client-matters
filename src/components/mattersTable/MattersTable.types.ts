export type Matter = {
  matterId: string;
  matterName: string;
  matterDate: string;
};

export type MattersTableProps = {
  mattersLoading: boolean;
  mattersData: { results: Matter[] } | undefined;
  onOpenDialog: (matter: Matter) => void;
};
