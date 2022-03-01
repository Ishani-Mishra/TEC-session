import React, {useState, useEffect} from 'react'
import Item from "../items/Items"

import { Navigate, useNavigate } from 'react-router'

import { getUserDetails, getUserAds, deleteAd } from '../../api/userApi'

import "./delete.css"

export default function Delete(props) {

    const {isLogout, setIsLogout} = props;
    const [userid, setUserid] = useState("");
    const [delAd, setDelAd] = useState("");
    const [ads, setAds] = useState([]);

    const history = useNavigate();

    const fun = async() => {
        if(!isLogout){
            const token = localStorage.getItem("token");
            const {data} = await getUserDetails(token);
            if(data.success){
                const currentUser= data.user[0];
                setUserid(currentUser._id);
            } else {
                return <Navigate to="/" />
            }
        } else {
            return <Navigate to="/" />
        }
    }

    fun();
    console.log(ads);
    async function deleteAds(adid){
        console.log("Deleting....");
        console.log(adid);
        setDelAd(adid);
        const {data} = await deleteAd(adid, localStorage.getItem("token"));
        history("/delete");
    }

    useEffect(() => {
        const fetchAds = async () => {
            const {data} = await getUserAds(userid, localStorage.getItem("token"));
            setAds(data.ads);
        };
        fetchAds(); 
    }, [userid, delAd])

  return (
    <div className="display-item">
    {
        ads && (
            ads.slice(0).reverse().map((ad, index) => {
                return (
                    <Item id={ad._id} title={ad.title} description={ad.content} agent={ad.author} del={true} delAds={deleteAds}/>
                )
            })
        )
    }
    {
        (ads===undefined || ads.length===0) && (
            <div Style={'margin: 5rem auto; font-size: 50px'}>No Ads found!</div>
        )
    }
    </div>
  )
}


