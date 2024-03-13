import React from 'react'
import { v4 as uuidv4 } from 'uuid'


export default function Question (props) {
    function styleAnswersAfterChecking (element) {
        if (props.phase !==2){
            return {}
        }
        
        if (element === props.item.choice){
            if (element === props.item.correct_answer){
                return {
                    backgroundColor: "#94D7A2",
                    borderColor: "#94D7A2", 
                    cursor: "not-allowed"
                }
            }else {
                return {
                    backgroundColor: "#F8BCBC",
                    borderColor: "#F8BCBC", 
                    color: "#9EA6D1",
                    cursor: "not-allowed"
                }
            }
        }else {
            if (element === props.item.correct_answer) {
                return {
                    backgroundColor: "#94D7A2",
                    borderColor: "#94D7A2", 
                    cursor: "not-allowed",
                }
            }else {
                return {
                    backgroundColor: "#F5F7FB",
                    borderColor: "#9EA6D1",
                    color: "#9EA6D1",
                    cursor: "not-allowed"
                }
            }
        }        
    }

    const answersElements = props.item.answersOrdered.map(item=>{
        const concatenatedValue = `${props.item.id}-${item}`
        return (
            <form key={uuidv4()}>
                <input
                className="answer-input"
                type="radio"
                id={concatenatedValue}
                value={item}
                checked={props.item.choice === item}
                onChange={props.phase === 1 ? (event) => props.handleResponse(event, props.item.id) : (() => '')}
                />
                <label style={styleAnswersAfterChecking(item)} className="answer-label" htmlFor={concatenatedValue}>{item}</label>
            </form>
        )
        })
    return (
        <div className="question-container">
            <h1 className="question-question">{props.item.question}</h1>
            <div className="question-answers-container">
                {answersElements}    
            </div>
        </div>      
    )
}
