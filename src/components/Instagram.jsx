import React from 'react';
import { useParams } from 'react-router-dom';
import { getTrip } from '../query';

export function Instagram (){

  const {tripId} = useParams()
  const {data} = getTrip({
    variables: {
      id: tripId
    }
  })

  // per poter visualizzare correttamente il widget elfsight deve essere
  // inserito lo scritp di elfsight e per farlo lo dobbiamo mettere 
  // all'interno del tag <head> contentuto nel file index.html contenuto in public 
  // <script src="https://apps.elfsight.com/p/platform.js" defer></script>

  if(data && data.instagram){
    return <div className={data.instagram}/>
  } else {
    return <></>
  }
  
}
