import React from 'react'

import { MDBContainer, MDBRow, MDBCol, MDBBadge } from 'mdbreact'
import { MyCard } from './MyCard'
import { getQuestionByDate } from '../query'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export function Question(){

  const {tripId} = useParams()
  //SUBSCRIBE
  const date = useSelector(state => state.date)
  const day = date.day
  const month = date.month
  const year = date.year

  const {error,data} = getQuestionByDate({
    variables: {
      day: day,
      month: month,
      year: year,
      trip: tripId
    }
  });

  if(error){
    return <></>
  } else {
    return (
      <MyCard className="shadow">
        <MDBRow className="d-flex justify-content-between mx-3">
          <div>
            Question to travelers <p className="date">{`${day}/${month}/${year}`}</p>
          </div>
          <div className="BTNtext">
            Ask yours!
          </div>
        </MDBRow>
        <div className="scrollbar-primary">
          <QuestionList questions={data}/>
        </div>
      </MyCard>
    )
  }

  
}

function QuestionList(props){

  const questionList = props.questions

  if(questionList.length === 0){
    return <div>There aren't any question</div>
  } else {
    return questionList.map(function(e){
      return <SingleQuestionBlock 
        key={e.id} 
        question={e.question} 
        answer={e.answer} 
        questioner={e.questioner} 
        user={e.user}
        />
    })
  }
}


function SingleQuestionBlock(props){
  return(
    <MDBContainer fluid className="my-3">
        <hr/>
        <MDBRow>
            <MDBCol lg="8" >
              <SingleQuestion text={props.question} questioner={props.questioner}/>
            </MDBCol>
        </MDBRow>
        <MDBRow end className="mt-3">
            <MDBCol lg="8">
              <SingleAnswer user={props.user} text= {props.answer}/>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
  )
}

function SingleQuestion(props){
  return (
    <MyCard backgroundColor="#3B99D9" color="white" className="shadow-orange">
    <span> <MDBBadge pill color="default">{props.questioner}</MDBBadge>
    <p> {props.text}</p></span>
    </MyCard>
  )
}

function SingleAnswer(props){
  return (
    <MyCard backgroundColor="aliceblue" className="shadow-yellow">
      <MDBContainer>
          <MDBRow end>
          <p> Asnwered by {props.user} </p>
          </MDBRow>
          <MDBRow>
          <p> {props.text} </p>
          </MDBRow>
      </MDBContainer>
    </MyCard>
  )
}
