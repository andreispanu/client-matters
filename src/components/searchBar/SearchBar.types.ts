export type SearchBarProps = {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  onClearSearch: () => void;
  onErrorMessage?: string;
  suggestions?: string[];
  loading?: boolean;
};
