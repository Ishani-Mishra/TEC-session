import React from 'react'
import P1 from "../../assets/batteries.jpg"
import "./items.css"

export default function Items() {
  return (
    <>
        <div className="main-display">
            <img alt="electronic-item" src={P1} className="pic"></img>
            <div className="item-info">
                <div className="heading">
                    Broken Phone
                </div>
                <div className="desc">
                    Smart Fingerprint Sensor with accept calls, Dismiss Alarm, take pictures features, High quality sound with DTS Stereo Sound Effect, Soplay 2.0-Produce custom music without Internet, Improved software experience with Super boost System Optimization, Face Unlock with Closed Eye Protection
                </div>
            </div>
        </div>
    </>
  )
}
            

