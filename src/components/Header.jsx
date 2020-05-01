import React from 'react';



import { MDBCol} from 'mdbreact'
import { useParams } from 'react-router-dom';
import { getTrip } from '../query';

export function Header (){


  const {tripId} = useParams()

  const {data} = getTrip({
    variables: {
      id: tripId
    }
  })

  return (
      <div className="header-heigth">
        <div className="header-overlay header-heigth">
          <div className="header-container">
            <div className="header-row">
              <h1 className="header-title">{data.title}</h1>
            </div>
            <div className="header-row">
              <p className="header-subtitle">
              From 17th April 2020 till 21th Aprill 2020
              </p>
            </div>
            <div className="header-row">
              <p className="header-subtitle">
                {data.desc}
              </p>
            </div>
            <div className="header-row">
              <UserList users={data.users}/>
            </div>
          </div>
          </div>
        <img src={data.imgUrl} className="header-img" alt="background-img"/>
      </div>
  )
}

const usersColors =[
  "#2F81B7",
  "#D15519",
  "#F0C330",
  "#23A085"
]


function UserList(props){

  if(props.users.length === 0){
    return <p>No users</p>
  } else {
    return props.users.map(function(e,i){
      const backgroundColor = usersColors[i % usersColors.length]
      return <UserCircle key={e.id} username={e.username} backgroundColor={backgroundColor}/>
    })
  }
}

function UserCircle(props){
  return(
    <MDBCol xs="1" className="user-circle d-flex justify-content-center mx-1" style={{backgroundColor:(props.backgroundColor)}}>
      <span>{props.username}</span>
    </MDBCol>
  )
}
