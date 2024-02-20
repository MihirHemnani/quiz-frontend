import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Spinner} from './Spinner'

const LeaderBoard = () => {
    const [ toppers, setToppers ] = useState([])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API}` + 'api/leaderboard').then(res => {
            setToppers(res.data)
        }).catch((err) => {
        console.log("err")
        })
    }, [])

    if(toppers.length === 0) {
      return <Spinner />
    }

    return (
        <div className="result" style={{margin: "auto", height: "100%", overflowY:"scroll", scrollbarWidth: "none"}}>
          <div style={{textAlign: "center", marginTop: "1vh", marginBottom: "1vh"}}><span className="active-question-no">LeaderBoard</span></div>

          <table style={{margin: "auto", width: "100%",border: "solid", overflow:"scroll"}}>
            <thead style={{borderBottom: "solid"}}>
              <tr>
                <th style={{borderBottom: "dashed"}}><h2>Username</h2></th>
                <th style={{borderBottom: "dashed"}}><h2>College</h2></th>
                <th style={{borderBottom: "dashed"}}><h2>Score</h2></th>
              </tr>
            </thead>

            <tbody>
            {
              toppers.map((res, index) => (
                <tr id={index} key={index}>
                  <td>{res.username}</td>
                  <td>{res.college}</td>
                  <td>{res.score}</td>
                </tr>
              ))
            
            }
            </tbody>
          </table>

        </div>
    )
}

export default LeaderBoard