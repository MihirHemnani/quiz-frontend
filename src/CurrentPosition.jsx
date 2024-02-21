import React, { useEffect, useState } from 'react'
import axios from 'axios'
import LeaderBoard from './LeaderBoard'
import { decrypt } from './EncryptDecrypt'
import {Spinner} from './Spinner'

const CurrentPosition = (props) => {

    const [ currank, setCurrRank ] = useState(0)
    const storedData = localStorage.getItem(`${import.meta.env.VITE_KEY}`) || null
    const user = decrypt(storedData, `${import.meta.env.VITE_ENCRYPTION_KEY}`) || null
    const [leaderboard, setLeaderBoard] = useState(false);

    const showLeaderBoard =  () => {
        setLeaderBoard(!leaderboard)
    }

    useEffect(() => {
        axios.post(`${import.meta.env.VITE_API}` + 'api/currentposition',
            {
                email: user.email
            }
        ).then(res => {
            // console.log(res.data.rank)
            if(res.data.msg) {
                setCurrRank(res.data.rank)
            } else {
                localStorage.removeItem(`${import.meta.env.VITE_KEY}`);
                window.location.reload()
            }
        }).catch((err) => {
            console.log("err")
        })
    }, [])

    if(currank === 0) {
        return <Spinner />
    }

    return (
        <>
        {
            leaderboard 
            ? 
                <LeaderBoard />
            :

                <div className="result">
                    <div style={{textAlign: "center", marginTop: "1vh", marginBottom: "1vh"}}><span className="active-question-no">Result</span></div>
                    
                    <p>
                        Total Questions: <span>{props.props - 1}</span>
                    </p>
                    <p>
                        Current Rank: <span>{currank}</span>
                    </p>
                    <p>
                        Username: <span>{user.username}</span>
                    </p>
                    <p>
                        Email ID: <span>{user.email}</span>
                    </p>
                </div>
            }
            
            <div style={{textAlign: "center"}}><button onClick={() => showLeaderBoard()}>{!leaderboard ? "Leader Board" : "Current Rank"}</button></div>
        </>
    )
}

export default CurrentPosition