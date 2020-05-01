import React from 'react';
import { MDBCol, MDBRow, MDBContainer } from 'mdbreact'
import {MyCard} from  './MyCard'
import { getAskByDate } from '../query'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';



export function Ask (){

  const {tripId} = useParams()
  //SUBSCRIBE
  const date = useSelector(state => state.date)
  const day = date.day
  const month = date.month
  const year = date.year

  const {error,data} = getAskByDate({
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
            Asked by travellers
            <p className="date">{`${day}/${month}/${year}`}</p>
          </div>
        </MDBRow>
        <div className="scrollbar-primary">
          <AskList asks={data}/>
        </div>
      </MyCard>
  )
  }


}

function AskList(props){

  const askList = props.asks

  if(askList.length === 0){
    return <div>There aren't any question</div>
  } else {
    return askList.map(function(e){
      return <SingleAskBlock
        key={e.id}
        question={e.question}
        options={e.options}
      
        />
    })
  }
}

function SingleAskBlock(props){

    return (
       <MDBContainer className="mt-2">
          <hr/>
          <MDBRow className="d-flex justify-content-start m-0">
            <p>{props.question}</p>
          </MDBRow>
          <OptionList>
            {props.options.map(
              e => <Option key={e.id} text={e.text}/>
            )}
          </OptionList>
      </MDBContainer>
    )
}



function OptionList(props){
  return (
    <MDBRow> {props.children} </MDBRow>
  )
}

function Option(props){
  return(
    <MDBCol xs="1" className="mycardAsk d-flex justify-content-center m-1">
      <span>{props.text}</span>
    </MDBCol>
  )
}
