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
  TableSortLabel,
  Box,
  Grid,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import useSWR from "swr";
import * as React from "react";
import CandleChartDialog from "@/components/CandleChartDialog"

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "stock_id",
    numeric: false,
    disablePadding: true,
    label: "股票代號",
    minWidth: 100,
  },
  {
    id: "change_price",
    numeric: false,
    disablePadding: true,
    label: "變動價格",
    minWidth: 100,
  },
  {
    id: "date",
    numeric: false,
    disablePadding: true,
    label: "最後更新時間",
    minWidth: 100,
  },
  {
    id: "open",
    numeric: true,
    disablePadding: true,
    label: "open",
    minWidth: 100,
  },
  {
    id: "close",
    numeric: true,
    disablePadding: true,
    label: "close",
    minWidth: 100,
  },
  {
    id: "high",
    numeric: true,
    disablePadding: true,
    label: "high",
    minWidth: 100,
  },
  {
    id: "low",
    numeric: true,
    disablePadding: true,
    label: "low",
    minWidth: 100,
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "normal" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function createData(
  stock_id,
  change_price,
  change_rate,
  date,
  open,
  high,
  close,
  low
) {
  return {
    stock_id,
    change_price,
    change_rate,
    date,
    open,
    high,
    close,
    low,
  };
}

export default function TwDataTable() {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
    "https://betit.online/redis_tw",
    fetcher,
    {
      refreshInterval: 10000,
    }
  );

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [BackdropOpen, setBackdropOpen] = React.useState(true);
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("change_price");
  const [candleChartOpen, setCandleChartOpen] = React.useState(false);
  const [symbol,setSymbol] = React.useState("")
  const [candleChartData,setCandleChartData] = React.useState(false);
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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleRowClick = (event, name) => {
    setSymbol(name)
    handleGetData(name)
    handleCandleChartOpen()
  };
  const handleCandleChartClose = () => {
    setCandleChartOpen(false);
  };
  const handleCandleChartOpen = () => {
    setCandleChartOpen(true);
  };
  const handleGetData=async (symbol)=>{
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    let symbolData=await fetch(`https://www.betit.online/tw_stock/get_symbol_OHCL?symbol=${symbol}`, requestOptions)
      .then(response => response.json())
      .then(result => result)
      .catch(error => console.log('error', error));
      
    
  }


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
    const rows = data.map((item) =>
    createData(
      item["stock_id"],
      item["change_price"],
      item["change_rate"],
      item["date"],
      item["open"],
      item["high"],
      item["close"],
      item["low"]
    )
  );
  return (
    <>
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      key={page * rowsPerPage + index + 1}
                      tabIndex={-1}
                      onClick={(event) =>
                        handleRowClick(event, row["stock_id"])
                      }
                    >
                      <TableCell
                        key={`${page * rowsPerPage + index + 1}-2`}
                        align="left"
                      >
                        <span>{row["stock_id"]}</span>
                      </TableCell>
                      <TableCell
                        key={`${page * rowsPerPage + index + 1}-3`}
                        align="left"
                      >
                        <span
                          style={
                            row["change_price"] > 0
                              ? { color: "red" }
                              : { color: "green" }
                          }
                        >
                          {row["change_price"]}({row["change_rate"]}%)
                        </span>
                      </TableCell>
                      <TableCell
                        key={`${page * rowsPerPage + index + 1}-4`}
                        align="left"
                      >
                        <span>{row["date"]}</span>
                      </TableCell>
                      <TableCell
                        key={`${page * rowsPerPage + index + 1}-5`}
                        align="left"
                      >
                        <span>{row["open"]}</span>
                      </TableCell>
                      <TableCell
                        key={`${page * rowsPerPage + index + 1}-6`}
                        align="left"
                      >
                        <span>{row["high"]}</span>
                      </TableCell>
                      <TableCell
                        key={`${page * rowsPerPage + index + 1}-7`}
                        align="left"
                      >
                        <span>{row["close"]}</span>
                      </TableCell>
                      <TableCell
                        key={`${page * rowsPerPage + index + 1}-8`}
                        align="left"
                      >
                        <span>{row["low"]}</span>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[25, 50, 75, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
    <CandleChartDialog open={candleChartOpen} close={handleCandleChartClose} symbol={symbol} data={candleChartData}/>
    </>
  );
}
