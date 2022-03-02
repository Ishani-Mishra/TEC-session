import React, {useState, useEffect} from 'react'
import Item from "../items/Items"

import { Navigate, useNavigate } from 'react-router'

import { getUserDetails, getUserAds, updateAd } from '../../api/userApi'

import "./update.css"

export default function Update(props) {

    const {isLogout, setIsLogout} = props;
    const [ad, setAd] = useState("");
    const [title, setTitle] = useState("");
    const [userid, setUserid] = useState("");
    const [updateResponse, setUpdateResponse] = useState("");
    const [ads, setAds] = useState([]);
    const [updateAdid, setUpdateAdid] = useState("");

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
    async function updateAds(adid, ad, title){
        console.log("Updating....");
        console.log(adid);
        console.log(ad);
        console.log(title);
        setUpdateAdid(adid);
        setAd(ad);
        setTitle(title);
    }

    async function handleSubmit(event){
        event.preventDefault();

        const adDetails = {
            title,
            content: ad
        }

        try {
            const {data} = await updateAd(updateAdid, adDetails, localStorage.getItem("token"));
            setUpdateResponse(data);
            if(data.success) {
                setAd("");
                setTitle("");
                setUpdateAdid("");
            }
            history("/update")
        } catch(err) {
            setUpdateResponse({message: err});
        }
    }

    useEffect(() => {
        const fetchAds = async () => {
            const {data} = await getUserAds(userid, localStorage.getItem("token"));
            setAds(data.ads);
        };
        fetchAds(); 
    }, [userid, updateAdid])

  return (
    <div className="display-item">
    {
        ads && (
            ads.slice(0).reverse().map((ad, index) => {
                return (
                    <Item id={ad._id} title={ad.title} description={ad.content} agent={ad.author} update={true} updateAds={updateAds} />
                )
            })
        )
    }
    {
        (ads===undefined || ads.length===0) && (
            <div Style={'margin: 5rem auto; font-size: 50px'}>No Ads found!</div>
        )
    }
    {
       (updateAdid || updateAdid!=="") && (
            <div className="content" id="#compose-ad">
                <h1 className="heading-per-page">Compose</h1>
                <div className="ad-content">
                    <div className="main main-raised">
                        <div className="container ad">
                            <form onSubmit={handleSubmit} className="compose-area">
                            {
                                (!updateResponse.success) ?  <div className="err-msg">{updateResponse.message}</div> : <div className="success-msg">Ad Saved Successfully</div>
                            }
                                <input className="title" type="text" name="title" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)}/><br/>
                                <hr/>
                                <textarea className="text-area" type="text" cols="111" rows="10" name="blog" value={ad} placeholder="Use this area to compose your advertisement" onChange={(e) => setAd(e.target.value)}/><br/>
                                <hr Style={"margin-top:1rem"}/>
                                <div className="submit-btn">
                                    <button type="submit" className="button" onClick={handleSubmit}>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    </div>
  )
}


