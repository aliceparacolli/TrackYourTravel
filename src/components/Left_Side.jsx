import React from 'react';

import { MDBContainer, MDBRow } from 'mdbreact'
import {Map} from './Map.jsx'
import {DataVisualisation} from './DataVisualisation.jsx'

export function LeftSide () {
  return  (
    <MDBContainer fluid>

      <MDBRow className="mt-2">
          <Map/>
      </MDBRow>

      <MDBRow className="mt-2">
          <DataVisualisation/>
      </MDBRow>

    </MDBContainer>
  )
}
