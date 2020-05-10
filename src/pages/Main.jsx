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
    // Let's imagine thar tripId is "3"
    // then it is put on the chronology /trip/3
    // it follows that we are redirected to that URL
    history.push(`/trip/${tripId}`)
  }

  //It is used(called) each time that the value changes inside the imput
  function inputChangeHandler(e){
    // e.target.value is the value of the current imput
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
