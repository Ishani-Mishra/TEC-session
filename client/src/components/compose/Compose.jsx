import React, {useState} from 'react';

import { composeAd } from '../../api/userApi';

import './compose.css';

function Compose(props){

    const [ad, setAd] = useState("");
    const [title, setTitle] = useState("");

    const [composeResponse, setComposeResponse] = useState("");

    async function handleSubmit(event){
        event.preventDefault();

        const adDetails = {
            title,
            content: ad
        };
        console.log(adDetails);

        try {
            const {data} = await composeAd(adDetails, localStorage.getItem("token"));
            console.log(data);
            setComposeResponse(data);
            if(data.success){
                setAd("");
                setTitle("");
            }

        } catch(err) {
            console.log("inside catch");
            setComposeResponse({message: err})
        }

    }


    return (
        <div className="content" id="#compose-ad">
        <h1 className="heading-per-page">Compose</h1>
            <div className="ad-content">
                <div className="main main-raised">
                    <div className="container ad">
                        {/* <h1 className="title">Compose</h1> */}
                        <form onSubmit={handleSubmit} className="compose-area">
                        {
                            (!composeResponse.success) ?  <div className="err-msg">{composeResponse.message}</div> : <div className="success-msg">Ad Saved Successfully</div>
                        }
                            <input className="title" type="text" name="title" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)}/><br/>
                            <hr/>
                            <textarea className="text-area" type="text" cols="111" rows="10" name="blog" value={ad} placeholder="Use this area to compose your advertisement" onChange={(e) => setAd(e.target.value)}/><br/>
                            <hr Style={"margin-top:1rem"}/>
                            <div className="submit-btn">
                                <button type="submit" onClick={handleSubmit}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Compose;
