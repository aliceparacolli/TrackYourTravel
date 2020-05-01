import React from 'react';
import { Link } from 'react-router-dom';

export function NotFound(){
  return (
    <div className="start-page">
      <div className="start-page-container">
        <h1>Trip not Found</h1>
        <Link to="/">Go back</Link>
      </div>
    </div>
  )
}