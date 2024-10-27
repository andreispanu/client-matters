export interface ClientDetail {
  clientId: string;
  inception: string;
  matterCount: number;
  name?: string;
}

export interface ClientData {
  filter: string;
  index: number;
  offset: number;
  orderBy: string;
  result: ClientDetail[];
  returnedResults: number;
  searchError: string | null;
  searcOrder: string;
  totalResults: number;
}

export type SearchDropdownBarProps = {
  searchTerm: string;
  onSearch: () => void;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
  suggestions: ClientDetail[];
  loading: boolean;
  onChange?: (value: string | null) => void;
};
