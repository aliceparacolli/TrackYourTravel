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
  // dispatch crea un dispatcher che quando viene chiamato aggiorna lo stato globale memorizzato in redux
  // NOTA BENE: quando viene aggiornato uno stato redux tramite dispatch allora vengono re-renderizzati tutti i compomenenit
  // che hanno fatto il subscribe cioé che ne richiedono il valore usando useSelector
  const dispatch = useDispatch()

  function updateDate(value){
    // crea la data da passare al dispatcher in base a quelle selezionata nell'input
    // value è una stringa che rappresenta la data selezionata
    // e la stringa viene convertita in data usando la funzione moment
    // che una libreria esterna
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

