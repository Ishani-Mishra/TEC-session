import React from 'react'
import P1 from "../../assets/batteries.jpg"
import "./items.css"

export default function Items(props) {
    const {title, description, agent} = props;
  return (
    <>
        <div className="main-display">
            <img alt="electronic-item" src={P1} className="pic"></img>
            <div className="item-info">
                <div className="heading">
                   {title}
                </div>
                <div className="desc">
                    {description}
                </div>
                <div className="agent">
                    {
                        agent && (
                            <div>Posted by: {agent}</div>
                        )
                    }
                    {
                        !agent && (
                            <div>Posted by: Unknown</div>
                        )
                    }
                   
                </div>
            </div>
        </div>
    </>
  )
}            

