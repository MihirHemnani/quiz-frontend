import React, { useEffect, useState } from 'react'
import axios from 'axios'
import URL from './URL'
import LeaderBoard from './LeaderBoard'

const CurrentPosition = () => {

    const [ currrank, setCurrRank ] = useState(0)
    const user = JSON.parse(localStorage.getItem('quizUser'))
    const [leaderboard, setLeaderBoard] = useState(false);

    const showLeaderBoard =  () => {
        setLeaderBoard(!leaderboard)
    }

    useEffect(() => {
        axios.post(URL + 'api/currentposition',
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

    return (
        <>
        {
            leaderboard 
            ? 
                <LeaderBoard />
            :

                <div className="result">
                    <h3>Result</h3>
                    <p>
                        Total Questions: <span>60</span>
                    </p>
                    <p>
                        Your Score: <span>{user.currentQuestion}</span>
                    </p>
                    <p>
                        Current Rank: <span>{currrank}</span>
                    </p>
                </div>
            }
            
            <div style={{textAlign: "center"}}><button onClick={() => showLeaderBoard()}>{!leaderboard ? "Leader Board" : "Current Rank"}</button></div>
        </>
    )
}

export default CurrentPosition