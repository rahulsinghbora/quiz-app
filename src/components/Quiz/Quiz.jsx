import React, { useState ,useRef} from 'react'
import './Quiz.css'
import data from '../../assets/data'

const Quiz = () => {
    
  let [index,setindex]=useState(0)
  let [question,setquestion]=useState(data[index])
  let [lock,setlock]=useState(false)
  let [score,setscore]=useState(0)
  let [result ,setresult]=useState(false)

    const option1=useRef(null)
    const option2=useRef(null)
    const option3=useRef(null)
    const option4=useRef(null)
    
    let option_array=[option1,option2,option3,option4]

    const checkans=(e,ans)=>{
         if(lock===false){
          if(question.ans===ans){
            e.target.classList.add("correct")
            setlock(true)
            setscore((prev)=>prev+1)
           }
           else{
            e.target.classList.add("wrong")
            setlock(true)
            option_array[question.ans-1].current.classList.add("correct")
           }
         }
    }

    let next=()=>{
      if(lock===true){
         if(index===data.length-1){
          setresult(true);
          return 0
         }

       setindex(++index)
        setquestion(data[index])
        setlock(false)
        option_array.map((option)=>{
          option.current.classList.remove("wrong");
          option.current.classList.remove("correct")
          return null;
        })
      }
    }
    const reset=()=>{
      setindex(0)
      setquestion(data[index])
      setscore(0)
      setlock(false)
      setresult(false)
    }

  return (<>
   <div className='container'>
    <h1>Quiz App</h1>
    <hr/>
    {result?<></>:<>
    <h2>{index+1}. {question.question}</h2>
    <ul>
      <li ref={option1} onClick={(e)=>checkans(e,1)}>{question.option1}</li>
      <li ref={option2} onClick={(e)=>checkans(e,2)}>{question.option2}</li>
      <li ref={option3} onClick={(e)=>checkans(e,3)}>{question.option3}</li>
      <li ref={option4} onClick={(e)=>checkans(e,4)}>{question.option4}</li>
    </ul>
    <button onClick={()=>next()}>next</button>
    <div className='index'>{index+1} of {data.length}</div>
    </>}
    {result?<><h2>your score is {score} out of {data.length} </h2>
    <button onClick={reset}>reset</button></>:<></>}
    
   </div>
  </>)
}

export default Quiz
