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
    id: "rank",
    numeric: false,
    disablePadding: true,
    label: "排名",
    minWidth: 100,
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "貨幣名稱",
    minWidth: 100,
  },
  {
    id: "last_updated",
    numeric: true,
    disablePadding: true,
    label: "更新時間",
    minWidth: 100,
  },
  {
    id: "current_price",
    numeric: true,
    disablePadding: true,
    label: "目前價格",
    minWidth: 100,
  },
  {
    id: "price_change_1h",
    numeric: true,
    disablePadding: true,
    label: "1小時價格變化",
    minWidth: 100,
  },
  {
    id: "price_change_24h",
    numeric: true,
    disablePadding: true,
    label: "24小時價格變化",
    minWidth: 100,
  },
  {
    id: "price_change_7d",
    numeric: true,
    disablePadding: true,
    label: "7天價格變化",
    minWidth: 100,
  },
  {
    id: "market_cap",
    numeric: true,
    disablePadding: true,
    label: "market_cap",
    minWidth: 100,
  },
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      console.log("EnhancedTableHead")
      console.log(event)
      console.log(property)
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
    rank,
    name,
    id,
    last_updated,
    current_price,
    price_change_1h,
    price_change_24h,
    price_change_7d,
    market_cap,
    image
  ) {
    return {
        rank,
        name,
        id,
        last_updated,
        current_price,
        price_change_1h,
        price_change_24h,
        price_change_7d,
        market_cap,
        image
    };
  }

  export default function UsDataTable() {
    const fetcher = (url) => fetch(url).then((r) => r.json());
    const { data, error, isLoading } = useSWR(
      "https://betit.online/redis_crypto",
      fetcher,
      {
        refreshInterval: 10000,
      }
    );
  
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [BackdropOpen, setBackdropOpen] = React.useState(true);
    const [order, setOrder] = React.useState("desc");
    const [orderBy, setOrderBy] = React.useState("open");
    const [symbol,setSymbol] = React.useState("")
    const [company,setCompany] = React.useState("")
    const [candleChartOpen, setCandleChartOpen] = React.useState(false);
    const [candleChartData,setCandleChartData] = React.useState("");


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
    const handleRowClick = (event, id,name) => {
      setSymbol(id)
      handleGetData(id,name)
      handleCandleChartOpen()
    };
    const handleCandleChartClose = () => {
      setCandleChartOpen(false);
    };
    const handleCandleChartOpen = () => {
      setCandleChartOpen(true);
    };
    const handleGetData=async (id,name)=>{
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      let symbolData=await fetch(`https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=30`, requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log('error', error));
        setCompany(name)
        setCandleChartData(symbolData)
      
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
  
    const rows = data['data'].map((item) =>
      createData(
        item["market_cap_rank"],
        item["name"],
        item["id"],
        item["last_updated"],
        item["current_price"],
        item["price_change_percentage_1h_in_currency"],
        item["price_change_percentage_24h_in_currency"],
        item["price_change_percentage_7d_in_currency"],
        item["market_cap"],
        item["image"]
      )
    );
    console.log(rows)
    return (
      <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            {/* <Table stickyHeader aria-label="sticky table"> */}
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
                        onClick={(event) =>
                        handleRowClick(event, row["id"],row["name"])
                      }
                      >
                     
                        <TableCell
                          key={`${page * rowsPerPage + index + 1}-2`}
                          align="left"
                        >
                          <span>{row["rank"]}</span>
                        </TableCell>
                        <TableCell
                          key={`${page * rowsPerPage + index + 1}-4`}
                          align="left"
                        >
                         <img src={row["image"]} style={{verticalAlign:"middle",width:"30px",height:"30px",borderRadius:"50%",marginRight:"20px"}}/>
                          <span>{row["name"]}({row["id"]})</span>
                        </TableCell>
                        <TableCell
                          key={`${page * rowsPerPage + index + 1}-5`}
                          align="left"
                        >
                          <span>{row["last_updated"]}</span>
                        </TableCell>
                        <TableCell
                          key={`${page * rowsPerPage + index + 1}-6`}
                          align="left"
                        >
                          <span>{row["current_price"]} USD</span>
                        </TableCell>
                        <TableCell
                          key={`${page * rowsPerPage + index + 1}-7`}
                          align="left"
                        >
                        {row["price_change_1h"] &&(
                          <span style={row["price_change_1h"]>0?{color:"green"}:{color:"red"}}>{row["price_change_1h"].toFixed(2)}%</span>
                        )}
                        {!row["price_change_1h"] &&(
                          <span>0%</span>
                        )}
                        </TableCell>
                        <TableCell
                          key={`${page * rowsPerPage + index + 1}-8`}
                          align="left"
                        >
                        {row["price_change_24h"] &&(
                          <span style={row["price_change_24h"]>0?{color:"green"}:{color:"red"}}>{row["price_change_24h"].toFixed(2)}%</span>
                        )}
                        {!row["price_change_24h"] &&(
                          <span>0%</span>
                        )}
                        </TableCell>
                        <TableCell
                          key={`${page * rowsPerPage + index + 1}-9`}
                          align="left"
                        >
                        {row["price_change_7d"] &&(
                          <span style={row["price_change_7d"]>0?{color:"green"}:{color:"red"}}>{row["price_change_7d"].toFixed(2)}%</span>
                          )}
                          {!row["price_change_7d"] &&(
                          <span>0%</span>
                        )}
                        </TableCell>
                        <TableCell
                          key={`${page * rowsPerPage + index + 1}-10`}
                          align="left"
                        >
                          <span>{row["market_cap"]}</span>
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
      <CandleChartDialog open={candleChartOpen} close={handleCandleChartClose} name={company} symbol={symbol} data={candleChartData} market={"crypto"}/>
      </>
    );
  }
  