import React, {useState , useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";




const columns = [
    { field: 'test_id', headerName: 'test-id', minWidth: 200 , },
    { field: 'word_front', headerName: 'word',  minWidth: 200 , },
    { field: 'iscorrect', headerName: 'status',  minWidth: 200 ,
    valueFormatter: (params) => params.value === 1 ? 'O' : 'X', },
    { field: 'testdate', headerName: 'word-test-date', minWidth: 180 , }
]

export default function Review_table({ match }){
    const [reviewContent , setReviewContent ] = useState([])
    const [open, setOpen] = useState(false);
    const [maxWidth, setMaxWidth] = useState('md');



    var testId = parseInt(match.params.test_id)

    const fetchReviewTable = async (testId) => {
        try {
            const url = `http://localhost:3006/record/test_reviews/${testId}`;
            const response = await axios.get(url) ; 

            const data = response.data.map((item, index) => ({
                ...item,
                id: index // This will ensure each row has a unique id
              }));
            setReviewContent(data) 
        }catch(error){
            console.error("Error fetching review table" , error)
        }
    }

    useEffect(() => {
        fetchReviewTable(testId);
    } , [testId])


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleMaxWidthChange = (event) => {
        setMaxWidth(event.target.value);
    };



    return (
        <div style={{ height: 'auto', width: '100%' }}>
        <DataGrid
          rows={reviewContent}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
        <Fab
            color="primary"
            aria-label="add"
            style={{
                position: 'fixed',
                bottom: '70px',
                right: '20px'
            }}
            onClick={handleClickOpen}
        >
            <AddIcon />
        </Fab>
            <Dialog open={open} onClose={handleClose} maxWidth={maxWidth}>
                <DialogTitle>Retake the test by drilling</DialogTitle>
                <DialogContent>
                    <div>
                        <Typography variant="h6"></Typography>
                    </div>
                    <div>

                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Drill-all
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Drill-wrongs
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}
