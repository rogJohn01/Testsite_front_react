import { useState, useEffect , useContext } from 'react';
import axios from 'axios';
import './flashcard.scss'
import { wordContext } from '../../contexts/wordContext';
const moment = require('moment-timezone');

const Flash7 = () => {
  const [index, setIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [noCount , setNoCount ] = useState(0) ;
  const [testIndex , setTestIndex] = useState(0) ;

  const {contents , setContents} = useContext(wordContext) ; 
  const { deckData , setDeckdata} = useContext(wordContext) ;
  const {yesCount , setYesCount } = useContext(wordContext)

  const {testFinished , setTestFinished} = useContext(wordContext) 

  const getTestIndex = async () => {
    try {
        const url ='http://localhost:3006/testIndex';
        const response = await axios.get(url) ;
        const data = response.data[0].idx ;
        setTestIndex(data+1) ;
    } catch (error) {
        console.error("error fetching testIndex: ", error ) ;
    }
  }

  useEffect(()=>{
    getTestIndex() ;
  } , []) ;



  const sendData = ( correctState) => {

    let wordData = {

        wordId: contents[index].word_id ,
        isCorrect: correctState ,
        test_form: "test" ,
        testid: testIndex ,
        word_date :  moment().tz('Asia/Seoul').format() ,
        word_deck :  deckData
    }

    axios.post('http://localhost:3006/send_word_result/' , wordData).then(response => {
        console.log(response.data) ; 
    })
    .catch(error => {
        console.error("there is an error" , error) ; 
    })
  }

  const sendResult =()=>{
    var totalCount = contents.length ; 

    let resultData = {

        //test_id : testIndex ,
        yes_cards : yesCount,
        //no_cards : noCount ,
      total_cards : totalCount ,
      //test_result_per: ((yesCount / totalCount)*100).toFixed(2) ,
        test_date: moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss') ,
        test_deck : deckData ,

    }

      console.log('Sending resultData:', resultData);

    axios.post('http://localhost:3006/test_result_table' , resultData).then(response =>{
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
   
    if(index < contents.length - 1) {
        setIndex(index + 1);
    }else {
        setTestFinished(true) ;

        setIsActive(false); // reset the active state of the card

        setIndex(0);
        setNoCount(0) ;
        setTestIndex(testIndex+1) ;

        sendResult() ;

    }
  }

  const yesButton = () => {

      setYesCount( yesCount+1 )

      console.log("isActive: " , isActive)
    setIsActive(!isActive );

    sendData(true) ;
    console.log("yesCnt: " , yesCount)

      moveIndex() ;

  }
  
  const noButton = () => {

      setNoCount(noCount +1)

      console.log("isActive: " , isActive)
    setIsActive(!isActive);

    sendData(false ) ;

    console.log("noCnt: " , noCount)

      moveIndex() ;

  }
  // ...
  var frontContent = contents[index] ? contents[index].word_front : "";
  var backContent = contents[index]
    ? contents[index].word_front+"<br><br> <hr> <br>"+contents[index].word_back.split('Examples:')[0].slice(0,200)
    : "";
  // ...


  return (
    <div className="container2" onClick={handleClick}>
      
      <div className="quiz-container">
        <div className='card-container'>
          <p className='card-index'>
              {index+1}/{contents.length}
          </p>
        </div>
   
        <div className="quiz-header">
          <div className="word_form">
            {contents.length > 0 && (
              <div>
                  {isActive ?
                      <div dangerouslySetInnerHTML={{ __html: backContent }} />
                      : frontContent}
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

export default Flash7;
