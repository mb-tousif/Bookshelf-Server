import { SortOrder } from "mongoose";

type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
}

type IReturn = {
  page: number;
  limit: number;
  skip: number;
  sortBy?: string;
  sortOrder?: SortOrder;
}

export const paginationHandler = (options: IOptions): IReturn => {
  const { page=1, limit =10 } = options;
  const skip= (page - 1) * limit;
  const sortBy= options.sortBy || "price"
  const sortOrder= options.sortOrder || "desc"
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder
  };
};