import  {useState , useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';




const columns = [
    { field: 'drill_id', headerName: 'test-id', minWidth: 200 , },
    { field: 'word_front', headerName: 'word',  minWidth: 200 , },
    { field: 'iscorrect', headerName: 'status',  minWidth: 200 ,
        valueFormatter: (params) => params.value === 1 ? 'O' : 'X', },
    { field: 'testdate', headerName: 'word-test-date', minWidth: 180 , }
]

export default function Review_Drilltable({ match }){
    const [reviewContent , setReviewContent ] = useState([])

    var drillId = parseInt(match.params.drill_id)

    const fetchReviewTable = async (drillId) => {
        try {
            const url = `${process.env.REACT_APP_API_URL}:3006/record/drill_reviews/${drillId}`;
            const response = await axios.get(url) ;

            const data = response.data.map((item, index) => ({
                ...item,
                id: index // This will ensure each row has a unique id
            }));
            setReviewContent(data)
        }catch(error){
            console.error("Error fetching drill review table" , error)
        }
    }

    useEffect(() => {
        fetchReviewTable(drillId);
    } , [drillId])

    return (
        <div style={{ height: 'auto', width: '100%' }}>
            <DataGrid
                rows={reviewContent}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    )
}
