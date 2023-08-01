import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Icon from '@mui/material/Icon';
import { FaTablet , FaRegLaughWink} from 'react-icons/fa';

const columns2 = [
  { id: 'test_id', label: 'Test-id', minWidth: 100 ,  },
  { id: 'test_deck', label: 'Test-deck', minWidth: 100 },

  { id: 'test_result', label: 'Test_result', minWidth: 100 },
  { id: 'test_result_per', label: 'Test_result_per', minWidth: 100  },
  {id: 'test_date', label: 'Test_date' , minWidth:100} ,
  {id: 'view_link', label: 'view_detail' , minWidth:100} ,

]


export default function ResultTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [content , setContent] = useState([]);

  const fetchTableResult = async () => {
    try {
      const url = 'http://localhost:3006/resultTable';
      const response = await axios.get(url);
      const data = response.data;
      setContent(data);
      console.log(data);
    } catch(error) {
      console.error("Error fetching table results", error);
    }
  }

  // Fetch table result when component mounts
  useEffect(() => {
    fetchTableResult();
  }, []);




  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const headerStyle = {
    padding: '26px' , 
    borderBottom: '1px solid black' ,
    textAlign: 'center'
  }
  const TableContainerStyle = {
    padding : '20px' ,
    justifyContent: 'top',
    alignItems: 'top'

  }

  return (

    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <header style={headerStyle}>
        Records 
      </header>
      <TableContainer style={TableContainerStyle} sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns2.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{  backgroundColor: 'lightgreen',minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {content
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.test_id}>
                    {columns2.map((column) => {
                      let value = row[column.id];
                      if(column.id ==='test_result_per'){
                        value += ' %' ;
                      }
                      return (
                        <TableCell key={column.id}align={column.center ? 'center' : 'inherit'}>
                          {column.id ==='view_link' ? 
                          <>
                           <a href={`http://localhost:3007/ReviewTable/${row.test_id}`} target="_blank" rel="noopener noreferrer">

                              Review 
                              <FaRegLaughWink/> 

                            </a>
                          </>:
                          column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                      
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={content.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>

  );
}
