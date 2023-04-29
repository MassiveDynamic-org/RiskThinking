import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, TextField,makeStyles  } from '@material-ui/core';
import { Business, LocationOn, Report, BusinessCenter, Today } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { RiskItem } from "@/types/data";
interface RiskDataTableProps {
  assets: RiskItem[];
} 
const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: 440,
    },
    textField : {
      marginLeft: '10px',
      marginBottom: 16
    }
  });
 
const AssetTable = ({ assets }:RiskDataTableProps) => {
    const columns = [
      { id: 'name', label: 'Asset Name', icon: <Business /> },
      { id: 'lat', label: 'Latitude', icon: <LocationOn /> },
      { id: 'long', label: 'Longitude', icon: <LocationOn /> },
      { id: 'category', label: 'Business Category', icon: <BusinessCenter /> },
      { id: 'riskRating', label: 'Risk Rating', icon: <Report /> },
      { id: 'riskFactors', label: 'Risk Factors', icon: <Report /> },
      { id: 'year', label: 'Year', icon: <Today /> },
    ];
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filter, setFilter] = useState("");
    const [mounted, setMounted] = useState(false);
    let colId:number = 0;

    useEffect(() => {
      setMounted(true);
    }, []);

    const handleChangePage = (event:React.MouseEvent<HTMLButtonElement> | null, newPage:number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      if(event != null){
        setRowsPerPage(+event.target.value);
        setPage(0);
      }
    };
    const handleFilterChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      if(event != null){
        setFilter(event.target.value);
        setPage(0);
      }
    };
      
    const filteredData = assets.filter(
        (item) =>
          item["Asset_Name"].toLowerCase().includes(filter.toLowerCase()) ||
          item["Business_Category"].toLowerCase().includes(filter.toLowerCase()) ||
          item["Risk_Rating"]
    );      
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, assets.length - page * rowsPerPage);

    return (
    <div style={{ height: '100%', width: '100%' }}>
    <h2 className="text-2xl ">Risk Data</h2>
    {mounted && (
    <Paper className={classes.root}>
      <TextField
        label="Filter"
        variant="outlined"
        size='small'
        margin="normal"
        value={filter}
        onChange={handleFilterChange}
        classes={{root:classes.textField}}
      />            
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  {column.icon} {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((asset) => {
                colId++;
                return (
              <TableRow key={colId}>
                <TableCell>{asset.Asset_Name}</TableCell>
                <TableCell>{asset.Lat}</TableCell>
                <TableCell>{asset.Long}</TableCell>
                <TableCell>{asset.Business_Category}</TableCell>
                <TableCell>{asset.Risk_Rating}</TableCell>
                <TableCell>{asset.Risk_Factors}</TableCell>
                <TableCell>{asset.Year}</TableCell>
              </TableRow>
            );
            })}
            {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={7} />
                </TableRow>
            )}            
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={assets.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />        

      </Paper>
    )}
    </div>
    );
  };
  
  export default AssetTable;
  