export type Matter = {
  matterId: string;
  matterName: string;
  matterDate: string;
  matterCode: string;
};

export type MattersTableProps = {
  mattersLoading: boolean;
  mattersData: { results: Matter[] };
  page: number;
  totalResults: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onOpenDialog: (matterId: string) => void;
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortChange: (column: string) => void;
};
