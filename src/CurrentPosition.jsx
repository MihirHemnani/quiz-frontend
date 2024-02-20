import React, { useEffect, useState } from 'react'
import axios from 'axios'
import LeaderBoard from './LeaderBoard'
import { decrypt } from './EncryptDecrypt'
import {Spinner} from './Spinner'

const CurrentPosition = () => {

    const [ currank, setCurrRank ] = useState(0)
    const storedData = localStorage.getItem(`${import.meta.env.VITE_KEY}`)
    const user = decrypt(storedData, `${import.meta.env.VITE_ENCRYPTION_KEY}`)
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
            setCurrRank(res.data.rank)
        }).catch((err) => {
            console.log(err)
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
                        Total Questions: <span>60</span>
                    </p>
                    <p>
                        Your Score: <span>{user.currentQuestion}</span>
                    </p>
                    <p>
                        Current Rank: <span>{currank}</span>
                    </p>
                </div>
            }
            
            <div style={{textAlign: "center"}}><button onClick={() => showLeaderBoard()}>{!leaderboard ? "Leader Board" : "Current Rank"}</button></div>
        </>
    )
}

export default CurrentPosition