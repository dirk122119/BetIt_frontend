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
  Chip
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import useSWR from "swr";
import * as React from "react";
import { jaJP } from "@mui/x-date-pickers";

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
    id: "market",
    numeric: false,
    disablePadding: true,
    label: "選擇市場",
    minWidth: 100,
  },
  {
    id: "symbol",
    numeric: false,
    disablePadding: true,
    label: "標的",
    minWidth: 100,
  },
  {
    id: "date",
    numeric: false,
    disablePadding: true,
    label: "時間",
    minWidth: 100,
  },
  {
    id: "price",
    numeric: true,
    disablePadding: true,
    label: "打賭價格",
    minWidth: 100,
  },
  {
    id: "isFinish",
    numeric: true,
    disablePadding: true,
    label: "狀態",
    minWidth: 100,
  },
  {
    id: "isReach",
    numeric: true,
    disablePadding: true,
    label: "是否達標",
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

function createData(market, symbol, date, price, direct, isFinish, isReach) {
  return {
    market,
    symbol,
    date,
    price,
    direct,
    isFinish,
    isReach,
  };
}

export default function UserBetTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [BackdropOpen, setBackdropOpen] = React.useState(true);
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("open");

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
  const rows = props.games.map(game =>
    createData(
      game["game_market"],
      game["game_symbol"],
      game["game_date"],
      game["game_price"],
      game["game_direct"],
      game["game_isFinish"],
      game["game_isReach"]
    )
  );
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
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
                    >
                   
                      <TableCell
                        key={`${page * rowsPerPage + index + 1}-2`}
                        align="left"
                      >
                        <span>{row["market"]}</span>
                      </TableCell>
                      <TableCell
                        key={`${page * rowsPerPage + index + 1}-4`}
                        align="left"
                      >
                        <span>{row["symbol"]}</span>
                      </TableCell>
                      <TableCell
                        key={`${page * rowsPerPage + index + 1}-5`}
                        align="left"
                      >
                        <span>{row["date"]}</span>
                      </TableCell>
                      <TableCell
                        key={`${page * rowsPerPage + index + 1}-6`}
                        align="left"
                      >
                        <span>{row["price"]} {row["market"]==="tw_stuck"?"NTD":"USD"} {row["direct"]==="up"?"以上":"以下"}</span>
                      </TableCell>
                      <TableCell
                        key={`${page * rowsPerPage + index + 1}-8`}
                        align="left"
                      >
                        <Chip label={row["isFinish"]?"結束":"進行中"} sx={row["isFinish"]?{backgroundColor:"grey",color:"white"}:{backgroundColor:"green",color:"white"}} />
                      </TableCell>
                      <TableCell
                        key={`${page * rowsPerPage + index + 1}-9`}
                        align="left"
                      >
                      {row["isFinish"] &&(
                        <Chip label={row["isReach"]?"win":"lose"} sx={row["isReach"]?{backgroundColor:"red",color:"white"}:{backgroundColor:"green",color:"white"}} />
                        )
                      }
                      {!row["isFinish"] &&(
                        <Chip label="進行中" color="primary" />
                       )
                      }
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
