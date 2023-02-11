import {
  Paper,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TablePagination,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import useSWR from "swr";
import * as React from "react";

const columns = [
  { id: "Number", label: "No", minWidth: 100 },
  { id: "Symbol", label: "股票代號", minWidth: 100 },
  { id: "Company name", label: "公司名稱", minWidth: 100 },
  { id: "latest_date", label: "最後更新時間", minWidth: 100 },
  { id: "price_open", label: "open", minWidth: 100 },
  { id: "price_close", label: "close", minWidth: 100 },
  { id: "price_high", label: "high", minWidth: 100 },
  { id: "price_low", label: "low", minWidth: 100 },
];

export default function TwDataTable() {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
    "https://betit.online/tw_stock/get_all_symbol_OCHL",
    fetcher,
    {
      refreshInterval: 6000000,
    }
  );

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [BackdropOpen, setBackdropOpen] = React.useState(true);
  const handleBackdropClose = () => {
    setBackdropOpen(false);
  };
  const handleBackdropToggle = () => {
    setBackdropOpen(!open);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={BackdropOpen}
          onClick={handleBackdropClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );

  const rows = data["data"].map((item) => [
    item["symbol"],
    item["company name"],
    item["latest_date"],
    item["open"],
    item["high"],
    item["close"],
    item["low"],
  ]);
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((colum) => (
                <TableCell
                  key={colum.id}
                  align={colum.align}
                  style={{ minWidth: colum.minWidth }}
                >
                  {colum.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    hover
                    key={row[0]}
                    onClick={(e) => {
                      console.log(row[2]);
                    }}
                  >
                    <TableCell key={index} align="left">
                      <span>{index + 1}</span>
                    </TableCell>
                    {row.map((column, index) => {
                      if (index == 0) {
                        return (
                          <TableCell key={column} align="left">
                            <span>{column}</span>
                          </TableCell>
                        );
                      }
                      if (index == 1) {
                        return (
                          <TableCell key={column} align="left">
                            <span>{column}</span>
                          </TableCell>
                        );
                      }
                      if (index == 2) {
                        return (
                          <TableCell key={column} align="left">
                            <span>{column}</span>
                          </TableCell>
                        );
                      }  else if (index >= 3) {
                        return (
                          <TableCell key={column} align="left">
                            <span>{column}</span>
     
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
                rowsPerPageOptions={[25,50, 75, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
    </Paper>
  );
}
