export type Client = {
  clientId: string;
  name: string;
  inception: string;
  matterCount: number;
};

export type ReusableTableProps = {
  data: Client[];
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortByName: () => void;
  onSortByDate: () => void;
  page: number;
  rowsPerPage: number;
  totalResults: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRowClick: (clientId: string) => void;
  isLoading?: boolean;
  displayedFrom: number;
  displayedTo: number;
};