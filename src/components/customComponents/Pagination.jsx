import Pagination from "@mui/material/Pagination/Pagination.js";
import Stack from "@mui/material/Stack/Stack.js";

export default function BasicPagination({
  totalPages,
  currentPage,
  handlePageChange,
  paginationClass
}) {
  return (
    <Stack spacing={2} className="pagination_container">
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        defaultPage={1}
        className={paginationClass}
      />
    </Stack>
  );
}
