import React, {useState, useEffect} from 'react'
import Item from "../items/Items"

import { Navigate } from 'react-router'

import { getAllAds } from '../../api/userApi'

import "./display.css"

export default function Display(props) {

    const {isLogout, setIsLogout} = props;
    const [ads, setAds] = useState([]);

    const dummyTitle = 'Broken Phone';
    const dummyDetails = 'Smart Fingerprint Sensor with accept calls, Dismiss Alarm, take pictures features, High quality sound with DTS Stereo Sound Effect, Soplay 2.0-Produce custom music without Internet, Improved software experience with Super boost System Optimization, Face Unlock with Closed Eye Protection';
    useEffect(() => {
        const fetchAds = async () => {
            const {data} = await getAllAds();
            console.log(data);
            setAds(data.ads);
            console.log(ads);
        };
        fetchAds();
    }, [ads]);

  return (
    <div className="display-item">
    {
        ads && (
            ads.slice(0).reverse().map((ad, index) => {
                return (
                    <Item title={ad.title} description={ad.content} agent={ad.author} />
                )
            })
        )
    }
        <div className="item-single">
            <Item title={dummyTitle} description={dummyDetails}/>
        </div>

        <div className="item-single">
            <Item title={dummyTitle} description={dummyDetails}/>
        </div>

        <div className="item-single">
            <Item title={dummyTitle} description={dummyDetails}/>
        </div>
        <div className="item-single">
            <Item title={dummyTitle} description={dummyDetails}/>
        </div>
    </div>
  )
}


