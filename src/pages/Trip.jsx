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

  // richiede il parametro tripId contenuto nell'url
  // quindi se l'url finisce con trip/3
  // allora tripId = 3
  const {tripId} = useParams()

  // chiedo dammi quel viaggio con id tripID
  const {data} = getTrip({
    variables: {
      id: tripId
    }
  })

  if(data) {
    //se il viaggio esiste allora mostra la dashboard
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
    // altrimenti reindirizzami a notFound
    return <Redirect to="/notFound"/>
  }
  
}