import React from 'react';

import { MDBContainer, MDBRow } from 'mdbreact'
import {Ask} from './Ask.jsx'
import {Event} from './Event.jsx'
import {Question} from './Question.jsx'


export function RightSide (){
  return   (
  <MDBContainer fluid>

    <MDBRow className="mt-2" >
      <Ask/>
    </MDBRow>

    <MDBRow className="mt-2" >
      <Question/>
    </MDBRow>

    <MDBRow className="mt-2" >
      <Event/>
    </MDBRow>

  </MDBContainer>
)

}
