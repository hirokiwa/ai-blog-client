export const BLOGS_PER_PAGE = 10;
const PAGINATION_WINDOW_SIZE = 7;

export const getPageHref = (pageNumber: number) => (
  pageNumber === 1 ? '/posts' : `/posts?page=${pageNumber}`
);

export const normalizePage = (page?: string | string[]) => {
  const pageValue = Array.isArray(page) ? page[0] : page;
  const pageNumber = Number(pageValue ?? '1');
  return Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;
};

export const getPaginationItems = (currentPage: number, totalPages: number) => {
  if (totalPages <= PAGINATION_WINDOW_SIZE) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const siblingCount = 1;
  const left = Math.max(2, currentPage - siblingCount);
  const right = Math.min(totalPages - 1, currentPage + siblingCount);
  const middleItems = Array.from(
    { length: right - left + 1 },
    (_, index) => left + index
  );
  const leadingEllipsis = left > 2 ? [`ellipsis-start-${currentPage}`] : [];
  const trailingEllipsis = right < totalPages - 1 ? [`ellipsis-end-${currentPage}`] : [];

  return [1, ...leadingEllipsis, ...middleItems, ...trailingEllipsis, totalPages];
};
