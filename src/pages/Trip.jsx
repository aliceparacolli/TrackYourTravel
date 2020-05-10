import React from 'react';
import { MDBCol, MDBRow } from 'mdbreact';

import { LeftSide} from '../components/Left_Side.jsx'
import { RightSide} from '../components/Right_Side.jsx'
import { Header} from '../components/Header.jsx'
import { Recap} from '../components/Recap.jsx'
import { Redirect } from 'react-router-dom';
import { getTrip } from '../query';
import { useParams } from 'react-router-dom';
import { Instagram } from '../components/Instagram.jsx';

export function Trip(){

  // it requires the parameter tripId contained in the URL
  // So if the URL ends with trip/3 :
  // tripId = 3
  const {tripId} = useParams()

  // It asks for the travel with id = tripID 
  const {data} = getTrip({
    variables: {
      id: tripId
    }
  })

  if(data) {
    //If the travel exists, the dashboard is shown 
    return (
      <>
        <Header/>
        <div className="container-lg mt-2">
          <Recap/>
          <Instagram/>
          <MDBRow className="mt-2" >
            <MDBCol md="6">
              <LeftSide/>
            </MDBCol>
            <MDBCol md="6">
              <RightSide/>
            </MDBCol>
          </MDBRow>
        </div>
      </>
    );
  } else {
    // otherwise it redirects to notFound
    return <Redirect to="/notFound"/>
  }
  
}
