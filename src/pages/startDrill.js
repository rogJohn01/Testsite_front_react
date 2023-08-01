
import FormDrillTest from "../components/FormDrillTest"




export default function StartDrill(){



    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh' // This can be set to the height you want your content centered in
    };


    return (
        <div style={containerStyle}>
             <FormDrillTest/> 

        </div>
    )

}