export type Matter = {
  matterId: string;
  matterName: string;
  matterDate: string;
};

export type MattersTableProps = {
  mattersLoading: boolean;
  mattersData: { results: Matter[] };
  page: number;
  rowsPerPage: number;
  totalResults: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenDialog: (matter: Matter) => void;
};
