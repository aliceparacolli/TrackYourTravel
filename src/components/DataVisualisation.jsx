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

  //useState è una funzione che mi permette di creare uno stato
  // 1. un componente può contenere più di 1 stato
  // 2. il nome dello stato e il nome della funzione che mi modifica lo stato è a discrezione del programmatore
  // per esempio io avrei potuto scrivere:
  // const [alice,setAlice] = useState()
  // alice: è il nome della variabile (contentitore) che contiene il mio stato
  // setAlice: è la funzione che mi permette di modificare lo stato e quindi il contenuto di alice
  const [stat,setStat] = useState()

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
          //una mappa su tutte le statistiche
          // nel nostro caso un array di 5 elementi
          props.statistic.map(
            // per ogni e contiene:
            // - name: nome della statistica
            // - day: valore giornaliero
            // - tot: valore totale
            e => {
              return <tr key={e.name}>
                <td>
                  <MDBBtn
                    color="warning"
                    rounded
                    size="sm"
                    className="w-100"
                    onClick={function(){
                      //aggiorna lo stato del componente
                      //mette dentro lo stato che ho chiamato "stat" e.name
                      //che è uguale al nome della statistica contenuta in e
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
