import React from 'react';
import { MDBRow } from 'mdbreact'
import {MyCard} from  './MyCard'
import { getEventsByDate } from '../query';
import { useSelector } from 'react-redux'
import moment from 'moment';
import { useParams } from 'react-router-dom';


export function Event (){

  const {tripId} = useParams()
  //SUBSCRIBE
  const date = useSelector(state => state.date)
  const day = date.day
  const month = date.month
  const year = date.year

  const {error,data} = getEventsByDate({
    variables : {
      day: day,
      month: month,
      year: year,
      trip: tripId
    }
  })


  if(error){
    return <></>
  } else {
    return (
      <MyCard className="shadow" backgroundColor="#F19B2C">
        <p style={{color:"white"}}>Today events</p>
        <div className="scrollbar-primary">
          <MyCard backgroundColor="#F19B2C">
            <MDBRow className="pb-1">
              <EventList events={data}/>
            </MDBRow>
          </MyCard>
        </div>
      </MyCard>
    )
  }
}

function EventList(props){

  const eventList = props.events


  if(eventList.length === 0){
    return <div>There aren't events</div>
  } else {
    return eventList.map(e => 
      <SingleEvent 
        key={e.id} 
        eventDate={e.date} 
        eventName={e.eventName} 
        addressTime={e.addressTime}
      />
  )

  }

  
}

function SingleEvent(props){

  const date = moment(props.eventDate)

  return(
    <>
      <div className="event-date shadow">
        <h3 className="dayEvent">{date.format("DD")}</h3>
        <h3 className="monthEvent">{date.format("MM/YY")}</h3>
      </div>

      <div className="event-description">
        <p className= "event-name">{props.eventName}</p>
        <p className= "event-address"> {props.addressTime}</p>
      </div>
    </>
  )
}
