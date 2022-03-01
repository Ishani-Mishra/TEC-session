import React from 'react'
import Item from "../items/Items"
import "./display.css"

export default function Display() {
  return (
    <div className="display-item">
        <div className="item-single">
            <Item />
        </div>
        <div className="item-single">
            <Item />
        </div>        
        <div className="item-single">
            <Item />
        </div>        
        <div className="item-single">
            <Item />
        </div>        
        <div className="item-single">
            <Item />
        </div>        
        <div className="item-single">
            <Item />
        </div>
        <div className="item-single">
            <Item />
        </div>
        <div className="item-single">
            <Item />
        </div>
    </div>
  )
}


