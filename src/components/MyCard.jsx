import React from 'react';

export function MyCard(props){

  return  (
    <div
      className={"mycard p-3 " + (props.className ?? "")}
      style={{
        backgroundColor: (props.backgroundColor ?? "white"),
        color: (props.color ?? "black"),
        fontSize: (props.fontSize ?? "inherit")
      }}
    >
      {props.children}
    </div>
  )
}
