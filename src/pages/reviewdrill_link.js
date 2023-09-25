import  {useState , useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';




const columns = [
    { field: 'test_id', headerName: 'test-id', minWidth: 200 , },
    { field: 'word_front', headerName: 'word',  minWidth: 200 , },
    { field: 'iscorrect', headerName: 'status',  minWidth: 200 ,
        valueFormatter: (params) => params.value === 1 ? 'O' : 'X', },
    { field: 'testdate', headerName: 'word-test-date', minWidth: 180 , }
]

export default function Review_table({ match }){
    const [reviewContent , setReviewContent ] = useState([])

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
