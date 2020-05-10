import React from 'react';
import { MDBProgress } from 'mdbreact';
import { MDBDatePicker } from 'mdbreact';
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdbreact'
import { MyCard } from  './MyCard'
import moment from 'moment'
import { getRecapByDate } from '../query';
import { useSelector, useDispatch } from 'react-redux';
import { dateActions } from '../reducers/date.reducers';
import { useParams } from 'react-router-dom';




export function Recap (){

  //SUBSCRIBE
  const date = useSelector((state) => state.date)
  const {tripId} = useParams();
  // dispatch creates a dispatcher and when it is called it updates the global state memorised  in redux
  // When a redux state is updated through dispatch all the components who subscribed
  //(requiring its value using useSelector)are re-rendered 
  const dispatch = useDispatch()

  function updateDate(value){
    // It creates the date to give to the dispatcher depending on what it is selected on the imput
    // value is a string that represent the selected date
    // and the string is converted to a date by usinf the function moment (external library)
    const m = moment(value)

    // viene chiamato qua il dispatcher
    dispatch({
      type: dateActions.CHANGE_DATE,
      payload: {
        day: m.date(),
        month: m.month()+1,
        year: m.year()
      }
    })
  }

  const {error,data} = getRecapByDate({
    variables: {
      day: date.day,
      month: date.month,
      year: date.year,
      trip: tripId
    }
  })

  return (
    <MyCard className="shadow">
      <MDBContainer>
        <MDBRow className="py-4">
          <MDBCol md="3" className="text-center">
            {/* quando cambia il valore della data selezionata */}
            <MDBDatePicker getValue={updateDate}/>
          </MDBCol>
          <MDBCol md="6" className="vl px-5">
            <p>
              {
                error ? "" : data.desc
              }
            </p>
          </MDBCol>
          <MDBCol md="3">
            {
              error ? <></> : <InfoAboutDay restDay={data.restDay} meansOfTransports={data.meansOfTransports} />
            }
          </MDBCol>
        </MDBRow>
        <MDBRow className="py-4">
          {
            error ? <></> : <Progress day={data.page} total={data.total}/>
          }
        </MDBRow>
      </MDBContainer>
    </MyCard> 

  )

}

function InfoAboutDay(props){
  return (
    <div className="d-flex flex-column">
      <p className="BTNrecup d-flex justify-content-center">
        {props.restDay ? "Rest day" : "Active day"}
      </p>
      <p className="BTNrecup d-flex justify-content-around">
        {
          props.meansOfTransports.map(function(e,i){
            return <MDBIcon key={i} icon={e}/>
          })
        }
      </p>
    </div>
  )
}

function Progress(props){

  const percentage = ( props.day / props.total) * 100

  return (
    <>
      <p>{`Day ${props.day} of ${props.total}`}</p>
      <MDBProgress className="my-2" material value={percentage} color="info" />
    </>
  )
}

