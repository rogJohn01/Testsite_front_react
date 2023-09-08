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
  const [testIndex , setTestIndex] = useState(0) ; 


    const {drillContents , setDrillContents}= useContext(wordContext) ;
    const {drillDeckData , setDrillDeckData }= useContext(wordContext) ;
    const {drillYesCount , setDrillYesCount} = useContext(wordContext) ;


    const {testFinished , setTestFinished} = useContext(wordContext)

  const getDrillIndex = async () => {
    try {
        const url ='http://localhost:3006/drill/drill_index';
        const response = await axios.get(url) ; 
        const data = response.data[0].idx ; 
        setTestIndex(data+1) ; 
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
        testid: testIndex , 
        word: drillContents[index].front ,
        isCorrect: correctState ,
        time :  moment().tz('Asia/Seoul').format() 
    }
    axios.post('http://localhost:3006/tests3/' , wordData).then(response => {
        console.log(response.data) ; 
    })
    .catch(error => {
        console.error("there is an error" , error) ; 
    })
  }

  const sendDrillResult =()=>{
    var totalCount = drillContents.length ;
    let resultData = {
      test_id : testIndex , 
      test_deck : drillDeckData ,
      yes_cards : drillYesCount ,
      total_cards : totalCount ,
      //test_result_per: ((yesCount / totalCount)*100).toFixed(2) ,
      test_date:  moment().tz('Asia/Seoul').format() 
    }
    axios.post('http://localhost:3006/resultTable' , resultData).then(response =>{
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
        sendDrillResult() ;
        setTestFinished(true) ; 
        setIndex(0);
        setDrillYesCount(1) ;
        setNoCount(1) ; 
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
