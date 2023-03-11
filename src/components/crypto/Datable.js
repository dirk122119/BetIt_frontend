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
  { id: "rank", label: "排名", minWidth: 100 },
  { id: "name", label: "貨幣名稱", minWidth: 100 },
  { id: "current_price", label: "目前價格", minWidth: 100 },
  { id: "price_change_1h", label: "1小時變化", minWidth: 100 },
  { id: "price_change_24h", label: "24小時變化", minWidth: 100 },
  { id: "price_change_7d", label: "7天變化", minWidth: 100 },
];

export default function DataTable() {
    const fetcher = (url) => fetch(url).then(r => r.json());
    const { data, error, isLoading } = useSWR('https://www.betit.online/crypto/top250_market_now', fetcher,{
        refreshInterval: 600000
      })
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
        
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (error) return <div>failed to load</div>;
    if (!data) return  <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={BackdropOpen}
          onClick={handleBackdropClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>;

    const rows = data.map((coin) => [coin.market_cap_rank,coin.image, coin.name, coin.current_price, coin.price_change_percentage_1h_in_currency, coin.price_change_percentage_24h_in_currency, coin.price_change_percentage_7d_in_currency]);
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((colum) => (<TableCell key={colum.id} align={colum.align} style={{ minWidth: colum.minWidth }}>
                                {colum.label}
                            </TableCell>))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover key={row[0]} onClick={(e)=>{console.log(row[2])}}>
                                    {row.map((column, index) => {
                                        if (index==0) {
                                            return (<TableCell key={column} align="left">
                                                <span>{column}</span>
                                            </TableCell>)
                                        }
                                        if (index ==2) {
                                            return (<TableCell key={column} align="left">
                                                <img src={row[index-1]} style={{verticalAlign:"middle",width:"30px",height:"30px",borderRadius:"50%",marginRight:"20px"}}/>
                                                <span>{column}</span>
                                            </TableCell>)
                                        }
                                        else if (index ==3){
                                            return (
                                                <TableCell key={column} align="left">
                                                    <span>{column}</span> <span>usd</span>
                                                </TableCell>
                                            )
                                        }
                                        else if (index > 3 && column > 0) {
                                            return (
                                                <TableCell key={column} align="left">
                                                    <span style={{ color: "green" }}>{column}</span> <span style={{color:"black"}}>%</span>
                                                </TableCell>
                                            )
                                        }
                                        else if (index > 3 && column < 0) {
                                            return (
                                                <TableCell key={column} align="left">
                                                    <span style={{ color: "red" }}>{column}</span> <span style={{color:"black"}}>%</span>
                                                </TableCell>
                                            )
                                        }


                                    })}
                                </TableRow>
                            )
                        })}

                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[25, 50, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}