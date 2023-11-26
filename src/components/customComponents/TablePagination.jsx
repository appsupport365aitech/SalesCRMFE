import { TablePagination } from "@mui/material";
import { Stack } from "@mui/material";

export default function BasicTablePagination({
  dataLength,
  currentPage,
  handlePageChange,
  rowPerPage,
  handleRowPerPagChange,
}) {
  return (dataLength === currentPage * rowPerPage || !dataLength) ? null : (
    <Stack spacing={2}>
      <TablePagination
        component="div"
        count={dataLength}
        page={currentPage}
        onPageChange={handlePageChange}
        rowsPerPage={rowPerPage}
        onRowsPerPageChange={handleRowPerPagChange}
      />
    </Stack>
  );
}
