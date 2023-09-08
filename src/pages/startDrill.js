
import FormDrill from "../components/DrillForm/FormDrill"

import { wordContext } from '../contexts/wordContext';
import drillModalWindow from "../components/Common/drillModal";
import drillCard from "../components/DrillCard/drillFlashCard";
import { useContext } from 'react';
import DrillCard from "../components/DrillCard/drillFlashCard";


export default function StartDrill(){

    const {readyDrill , setReadyDrill} = useContext(wordContext)
    const {drillFinished , setDrillFinished } = useContext(wordContext)

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh' // This can be set to the height you want your content centered in
    };


    return (
        <div style={containerStyle}>
            {!readyDrill && <FormDrill/>}
            {readyDrill && !drillFinished && <DrillCard/>}
            {drillFinished && <drillModalWindow/>}

        </div>
    )

}