
import { useState, useEffect , useContext } from 'react';
import { wordContext } from '../wordContext';
import Button from '@mui/material/Button';
import "./modal.scss"


const ModalWindow =() =>{
    
    const {contents , setContents} = useContext(wordContext) ; 
    const {yesCount , setYesCount } = useContext(wordContext)
    const {testFinished , setTestFinished} = useContext(wordContext) 
    const {ready , setReady} = useContext(wordContext)
    
    var yesCount2 = yesCount+1 

    var res = String(yesCount2)+" / "+String(contents.length)
    var res_percentage = (yesCount2/contents.length*100).toFixed(0)+"%"



    const newTestButton=()=>{
        console.log("take new test")
        setTestFinished(false)
        setReady(false)
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

export default ModalWindow 