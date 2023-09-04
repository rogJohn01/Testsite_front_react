

import logo from '../assets/images/home_entrance.jpg'

export default function Home(){

    const imgeStyle = {
        height : 'auto'  ,
        width: '100%' 
    }
    const imgContainer = {
        display: 'flex' , 
        alignItem: 'center' ,
        justifyContent: 'center'
    }


    return(
        <div style={imgContainer}>
            <img src={logo} alt="Logo" style={imgeStyle} />

        </div>

    )
}
