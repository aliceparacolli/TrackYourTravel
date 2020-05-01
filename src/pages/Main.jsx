import React, { useState } from 'react';
import { MDBIcon } from 'mdbreact';
import { useHistory } from 'react-router-dom';

export function Main(){
  return (
    <div className="start-page">
      <div className="start-page-container">
        <h1>Track your travel</h1>
        <p>Insert trip ID</p>
        <TripInput/>
      </div>
    </div>
  )
}

function TripInput(){

  const [tripId,setTripId] = useState()  
  const history = useHistory()

  function goToTrip(){    
    // immaginiamo che tripId sia uguale a "3"
    // allora viene messo sulla cronologia /trip/3
    // ne consegue che veniamo reinderizzato a quell'URL
    history.push(`/trip/${tripId}`)
  }

  //viene chiamata ogni volta che cambia il valore dentro input
  function inputChangeHandler(e){
    // e.target.value è il valore dell'input corrente
    setTripId(e.target.value)
  }

  function isValid(){
    return typeof(tripId) === "string" && tripId.length > 0
  }

  return (
      <div className="d-flex flex-row">
        <input
          type="text"
          onChange={inputChangeHandler}
        />
        {
          isValid()
          ? 
            <button onClick={goToTrip}>
              <MDBIcon icon="plane-departure"/>
            </button>
          :
          <></>
        }
      </div>
  )
}