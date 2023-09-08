
import { useState, useEffect , useContext } from 'react';
import { wordContext } from '../../contexts/wordContext';
import Button from '@mui/material/Button';
import "./modal.scss"


const drillModalWindow =() =>{

    const {contents , setContents} = useContext(wordContext) ;
    const {yesCount , setYesCount } = useContext(wordContext)
    const {testFinished , setTestFinished} = useContext(wordContext)
    const {ready , setReady} = useContext(wordContext)


    var res = String(yesCount)+" / "+String(contents.length)
    var res_percentage = (yesCount/contents.length*100).toFixed(0)+"%"



    const newTestButton=()=>{
        console.log("take new test")
        setTestFinished(false)
        setReady(false)
        setYesCount(0) ;


    }

    const TestDrillButton=()=>{
        console.log("take the drill test")

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
                <Button variant="contained" color="primary" className='modal_button' onClick={TestDrillButton}>
                    Take Drill Test
                </Button>

            </div>

        </div>
    )
}

export default drillModalWindow