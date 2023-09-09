import { useState, useEffect , useContext } from 'react';
import axios from 'axios';
import './drillFlashCard.scss'
import { wordContext } from '../../contexts/wordContext';
const moment = require('moment-timezone');

const DrillCard = () => {
    const [index, setIndex] = useState(0);
    const [showButton, setShowButton] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [noCount , setNoCount ] = useState(1) ; 
  const [drillIndex , setDrillIndex] = useState(0) ;


    const {drillContents , setDrillContents}= useContext(wordContext) ;
    const {drillDeckData , setDrillDeckData }= useContext(wordContext) ;
    const {drillYesCount , setDrillYesCount} = useContext(wordContext) ;

    const { drillFinished, setDrillFinished } = useContext(wordContext)
    const {testFinished , setTestFinished} = useContext(wordContext)

  const getDrillIndex = async () => {
    try {
        const url ='http://localhost:3006/drill/drill_index';
        const response = await axios.get(url) ; 
        const data = response.data[0].idx ; 
        setDrillIndex(data+1) ;
    } catch (error) {
        console.error("error fetching testIndex: ", error ) ; 
    }
  }

  useEffect(()=>{
    getDrillIndex() ;
  } , []) ;


    useEffect(() => {
        console.log('Drill Contents after API call:', drillContents);
    }, [drillContents]);

  const sendDrillWordData = ( correctState) => {

      let wordData = {

          wordId: drillContents[index].word_id ,
          isCorrect: correctState ,
          test_form: "drill" ,
          drillid: drillIndex ,
          word_date :  moment().tz('Asia/Seoul').format() ,
          word_deck :  drillDeckData
      }

      axios.post('http://localhost:3006/send_word_result/' , wordData).then(response => {
          console.log(response.data) ;
      })
          .catch(error => {
              console.error("there is an error" , error) ;
          })
  }


    const sendDrillResult =()=>{
    var totalCount = drillContents.length ;
    let resultData = {
      yes_cards : drillYesCount ,
      total_cards : totalCount ,
      drill_date:  moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss') ,
        drill_deck : drillDeckData ,

    }
    axios.post('http://localhost:3006/drill/drill_result_table' , resultData).then(response =>{
      console.log(response.data) ;
    })
    .catch(error => {
      console.log("there is an error" , error) ; 
    })
  }


  const handleClick = () => {
    console.log("box-clicked");
  
    if(!isActive) {
        setIsActive(!isActive); 
        console.log("isActive: " , isActive)
     
    }
    
  }
  const moveIndex = ()=> {
   
    if(index < drillContents.length - 1) {
        setIndex(index + 1);
    }else {
        setDrillFinished(true) ;

        setDrillIndex(0);
        setDrillYesCount(0) ;
        setNoCount(0) ;

        sendDrillResult() ;

    }
  }

  const yesButton = () => {
    
    console.log("isActive: " , isActive)
    moveIndex() ; 
    setIsActive(!isActive ); 
    const updatedYesCount = drillYesCount+1
    setDrillYesCount(updatedYesCount)
    sendDrillWordData(true) ;
    console.log("yesCnt: " , drillYesCount)
  }
  
  const noButton = () => {
    console.log("isActive: " , isActive)
    moveIndex() ; 
    setIsActive(!isActive); 

    setNoCount(noCount +1)
      sendDrillWordData(false) ;

    console.log("noCnt: " , noCount)

  }
    let frontContent = "";
    let backContent = "";

    try {
        if (drillContents && drillContents[index]) {
            frontContent = drillContents[index].word_front || "";

            const wordFront = drillContents[index].word_front || "";
            const wordBack = drillContents[index].word_back || "";
            const wordBackExample = wordBack.split('Examples:')[0] || "";

            backContent = `${wordFront}\n${wordBackExample.slice(0, 200)}`;
        }
    } catch (error) {
        console.error('Error while setting frontContent and backContent:', error);
    }
  // ...


  return (
    <div className="container2" onClick={handleClick}>
      
      <div className="quiz-container">
        <div className='card-container'>
          <p className='card-index'>
              {index+1}/{drillContents.length}
          </p>
        </div>
   
        <div className="quiz-header">
          <div className="word_form">
            {drillContents.length > 0 && (
              <div>
                {isActive ?  backContent : frontContent}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={`button-container ${isActive ? 'flex-display' : 'none-display'}`}>
 
          <button className="button" onClick={yesButton}> Yes</button>
          <button className="button" onClick={noButton}> No</button>
      </div>   
    </div>
  );
};

export default DrillCard ;
