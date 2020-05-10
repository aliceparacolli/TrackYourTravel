orimport React from 'react';
import { useParams } from 'react-router-dom';
import { getTrip } from '../query';

export function Instagram (){

  const {tripId} = useParams()
  const {data} = getTrip({
    variables: {
      id: tripId
    }
  })

  // In order to correctly visualise the widget elfsight 
  // the script of elfsight  needs to be inserted in the <head> tag
  // contained in the file index.html in "public" 
  // <script src="https://apps.elfsight.com/p/platform.js" defer></script>

  if(data && data.instagram){
    return <div className={data.instagram}/>
  } else {
    return <></>
  }
  
}
