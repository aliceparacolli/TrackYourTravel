import React from 'react';
import { getMapByDate } from '../query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export function Map (){

  const {tripId} = useParams()
  //SUBSCRIBE
  const date = useSelector(state => state.date)
  const day = date.day
  const month = date.month
  const year = date.year

  const {error,data} = getMapByDate({
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
    return <iframe src={data.link} title="Maps"/>
  }
}
