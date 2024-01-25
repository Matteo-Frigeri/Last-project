// CompanySearchResults.tsx
export interface JobData {
    _id: string;
  }
  export interface JobProps {
    data: JobData;
    showDetails: boolean;
  }
  export interface CompanySearchResultsState {
    jobs: JobData[];
  }
// Favorites.tsx
  export interface FavoriteItem {
    jobTitle: string;
    companyName: string;
  }
  