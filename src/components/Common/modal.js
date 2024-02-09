
import { useState, useEffect , useContext } from 'react';
import { wordContext } from '../../contexts/wordContext';
import Button from '@mui/material/Button';
import "./modal.scss"
import { useHistory } from 'react-router-dom';
import axios from "axios";
import {fetchTheTestWrong} from "./modalUtilie";

const ModalWindow =() =>{
    const history = useHistory();

    const {contents , setContents} = useContext(wordContext) ;
    const {yesCount , setYesCount } = useContext(wordContext)
    const {testFinished , setTestFinished} = useContext(wordContext)
    const {ready , setReady} = useContext(wordContext)
    const { deckData , setDeckdata} = useContext(wordContext) ;




    const {readyDrill , setReadyDrill} = useContext(wordContext)
    const {drillContents , setDrillContents}= useContext(wordContext) ;
    const {testIndex , setTestIndex} = useContext(wordContext) ;
    const {drillIndex , setDrillIndex} = useContext(wordContext)
    const {drillDeckData , setDrillDeckData }= useContext(wordContext) ;


    var res = String(yesCount)+" / "+String(contents.length)
    var res_percentage = (yesCount/contents.length*100).toFixed(0)+"%"


    const getDrillIndex = async () => {
        try {
            const url =`${process.env.REACT_APP_API_URL}:3006/drill/drill_index` ;
            const response = await axios.get(url) ;
            const data = response.data[0].idx ;
            setDrillIndex(data+1) ;
        } catch (error) {
            console.error("error fetching testIndex: ", error ) ;
        }
    }


    const newTestButton=()=>{
        console.log("take new test")
        setTestFinished(false)
        setReady(false)
        setYesCount(0) ;


    }

    const TestDrillButton=()=>{
        console.log("take the drill test")
        fetchTheTestWrong(testIndex, setDrillContents, drillContents); // <-- Pass required arguments
        getDrillIndex()
        setDrillDeckData(deckData)
        setReadyDrill(true) ;
        history.push('/TakeDrill');
        setTestFinished(false)
        setReady(false)
        setYesCount(0) ;
    }


    return (
        <div className="modal-content">
            <h2>
                Test results 
            </h2>
            <p className='card-index'>

                {res}
            </p>
            <p>
                {res_percentage}
            </p>

            <div className='modal_button_container'>

                <Button variant="contained" color="primary" className='modal_button' onClick={newTestButton}>
                    Take new Test
                </Button>
                {yesCount !== contents.length && (
                    <Button variant="contained" color="primary" className='modal_button' onClick={TestDrillButton}>
                        Take Drill Test
                    </Button>

                )}


            </div>

        </div>
    )
}

export default ModalWindow 