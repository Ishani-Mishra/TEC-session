import React from 'react'
import P1 from "../../assets/batteries.jpg"
import "./items.css"

export default function Items(props) {
    const {title, description, agent, update, updateAds, del, delAds, id} = props;
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
                {
                    del && (
                        <button onClick={() => delAds(id)}>Delete Ad</button>
                    )
                }
                {
                    update && (
                        <button onClick={() => updateAds(id, description, title)}>Update Ad</button>
                    )
                }
            </div>
        </div>
    </>
  )
}            

