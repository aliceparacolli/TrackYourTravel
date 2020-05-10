import React, { useState } from 'react';
import { MDBContainer, MDBBtn, MDBRow } from 'mdbreact'
import {MyCard} from  './MyCard'
import { Line } from "react-chartjs-2";
import { getStasticsByDate, getStatisticsByKey } from '../query';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

export function DataVisualisation(){

  //SUBSCRIBE
  const date = useSelector(state => state.date)
  const {tripId} = useParams();
  const day = date.day
  const month = date.month
  const year = date.year

  const {error,data} = getStasticsByDate({
    variables: {
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
      <MyCard className="shadow">
        <MDBRow center><div>{`Total kilometers since the beginning of the travel: ${data.kmsincebeginning}km`}</div></MDBRow>
        <hr/>
        <Statistic statistic={data.statistic}/>
      </MyCard>
    )
  }
}

function Statistic(props){

  //useState is a funcition that allows me to create a state
  // 1. a single component can have muliple states
  // 2. the name of the state and the name of the function that modifies the state, are choosen by me 
  const [stat,setStat] = useState()
  // stat: is the name of the variable that contains my state
  // setStat: is the function that allows me to modify the state and Stat's content

  const {tripId} = useParams();

  const {data} = getStatisticsByKey({
    variables: {
      trip: tripId
    }
  },stat)

  return(
    <div className="table-responsive">
    <table className="text-center">
      <thead>
        <tr>
          <th></th>
          <th><p>Daily statistic</p></th>
          <th><p>Global average</p></th>
        </tr>
      </thead>
      <tbody>
        {
          //map function on all te statistics
          //in this case it is an array of 5 elements
          props.statistic.map(
            // per ogni e contiene:
            // - name: nome of statistic
            // - day: daily value
            // - tot: total value
            e => {
              return <tr key={e.name}>
                <td>
                  <MDBBtn
                    color="warning"
                    rounded
                    size="sm"
                    className="w-100"
                    onClick={function(){
                      //It updates the state of the component
                      //It places inside the state that I named "stat" e.name
                      //That is the same name of the statistic contained in e
                      setStat(e.name)
                    }}
                  >
                    {e.name}
                  </MDBBtn>
                </td>
                <td>{e.day}</td>
                <td>{e.tot}</td>
              </tr>
            }
          )
        }
      </tbody>
    </table>
    {
      data ?
        <Charts
          data={data.map(e => e.stat)}
          title={stat}
          labels={data.map(e => `${e.day}/${e.month}`)}
        /> : <></>
    }
    </div>
  );
}

function Charts(props) {
  const state = {
    dataLine: {
      labels: props.labels,
      datasets: [
        {
          label: props.title,
          fill: true,
          lineTension: 0.3,
          backgroundColor: "transparent",
          borderColor: "#007bff",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "#ffc107",
          pointBackgroundColor: "#ffc107",
          pointBorderWidth: 3,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#ffc107",
          pointHoverBorderColor: "#ffc107)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: props.data
        }
      ]
    }
  };

  return (
    <MDBContainer>
      <Line data={state.dataLine} options={{ responsive: true }} />
    </MDBContainer>
  );
}
