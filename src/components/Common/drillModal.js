
import { useState, useEffect , useContext } from 'react';
import { wordContext } from '../../contexts/wordContext';
import Button from '@mui/material/Button';
import "./modal.scss"


const DrillModalWindow =() =>{

    const {drillContents , setDrillContents}= useContext(wordContext) ;
    const {drillYesCount , setDrillYesCount} = useContext(wordContext) ;
    const {testFinished , setTestFinished} = useContext(wordContext)
    const {ready , setReady} = useContext(wordContext)


    const {readyDrill , setReadyDrill} = useContext(wordContext)
    const {drillFinished , setDrillFinished } = useContext(wordContext)


    var res = String(drillYesCount)+" / "+String(drillContents.length)
    var res_percentage = (drillYesCount/drillContents.length*100).toFixed(0)+"%"



    const newDrillButton=()=>{
        console.log("take new test")

        setDrillFinished(false)
        setReadyDrill(false)
        setDrillYesCount(0) ;
    }

    const TestDrillButton=()=>{
        console.log("take the drill test")

    }
    const studyTheWrongsButton=()=>{

        // redirect to the modal!
        console.log("take different drill")
        setTestFinished(false)
        setReady(false)
        setDrillYesCount(0) ;


    }

    return (
        <div className="modal-content">
            <h2>
                Drill results
            </h2>
            <p className='card-index'>

                {res}
            </p>
            <p>
                {res_percentage}
            </p>
            <div className='modal_button_container'>
                <Button variant="contained" color="primary" className='modal_button' onClick={newDrillButton}>
                    Take new Drill
                </Button>
                <Button variant="contained" color="primary" className='modal_button' onClick={studyTheWrongsButton}>
                    Take Different Drill
                </Button>

            </div>

        </div>
    )
}

export default DrillModalWindow