import React from 'react'

export default function Start (props) {
    
    return (
        <div className="start-container">
            <h1 className="start-title">Quizzical</h1>
            <h2 className="start-description">Solo Project 
            <span className="new-line">A lot of fun is about to happen.</span> 
            <span className="new-line">Amazing quiz games</span></h2>
            <button className="start-btn" onClick={() => props.startGame(1)}>Start quiz</button>
        </div>
    )
}