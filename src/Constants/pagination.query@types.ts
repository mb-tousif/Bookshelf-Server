export const paginationFields = [ "page", "limit", "sortBy", "sortOrder", "searchTerm" ];

// Users Constants
export type TSearchedBook = {
    searchTerm?: string;
  };
  
export const bookSearchFields = [ "title", "author", "genre" ];
export const bookFilterFields = [ "searchTerm", "genre", "publicationYear"]

export interface IPagination {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    searchTerm?: string;
}

export interface IQueryResponse<T> {
    meta: {
        page: number;
        limit: number;
        total: number;
    },
    data: T| null;
}