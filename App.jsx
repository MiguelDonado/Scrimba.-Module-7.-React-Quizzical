import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import he from 'he'
import Start from './components/Start'
import Question from './components/Question'
import topImage from './images/top.png';
import bottomImage from './images/bottom.png'

export default function App() {
    // 0 = not started (false) // 1 = on course (true) // 2 = over (true)
    const [phaseGame, setPhaseGame] = React.useState(0)
    const [questions, setQuestions] = React.useState([])
    
    const stylesImgs = {
        width: phaseGame ? "130px" : "170px"
    }
    
    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }
    
    function completeQuestions (questionsArray) {
        const finalQuestions = questionsArray.map(question => {
            const allAnswers = [...question.incorrect_answers, question.correct_answer]
            const resultado = shuffleArray(allAnswers)
            const allAnswersOrdered = resultado.map(item => he.decode(item))
            return (
                {
                    ...question,
                    question: he.decode(question.question), 
                    id: uuidv4(),
                    choice: '',
                    answersOrdered: allAnswersOrdered
                     }
             )
        })
        return finalQuestions
    }
    
    React.useEffect(() =>{
        phaseGame === 1 && fetch('https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple')
            .then(response => response.json())
            .then(data => setQuestions(completeQuestions(data.results)))
            .catch(error => console.error('Error fetching data:', error))
        },[phaseGame])
        
    function handleResponse(event, id) {
        const { value } = event.target
        setQuestions(prevQuestions => {
            return prevQuestions.map(item => {
                return (
                    item.id === id ?
                    {...item, choice: value } :
                    item
                ) 
            })
        })
    }
    
    const responses = questions.map(item => item.choice)
    
    function getRightAnswers() {
        const rightArray = questions.map(item => {
            return item.choice === item.correct_answer
        })
        return rightArray.filter(Boolean).length
    }
    
    function determineBottomArea() {
        if (phaseGame === 1 && questions.length > 0){
                return (
                    <div className="bottom-container">
                        <button
                            className="game-btn"
                            onClick={() => setPhaseGame(2)}
                            disabled={!responses.every(Boolean)}>
                            Check answer
                        </button>
                    </div> 
            )    
        }else if (phaseGame === 2){
                return(
                    <div className="bottom-container">
                        <h3>You score {getRightAnswers()}/5 correct answers</h3>
                        <button
                            className="game-btn"
                            onClick={() => {
                                setQuestions([]) 
                                setPhaseGame(1)
                                }}>
                            Play again
                        </button>
                    </div> 
                )        
        }else {
            return ''
        }
    } 
    
    const questionElements = questions.map(item => {
        return <Question key={item.id} handleResponse={handleResponse} phase={phaseGame} item={item}/>
    })
    return (
        <div className="app-container">
            <img src={topImage} className="image-top" style={stylesImgs}/>        
            <div className={!phaseGame ? '' : 'questions-container'}>
                {!phaseGame ? <Start startGame={setPhaseGame}/> : questionElements}
            </div>
            {determineBottomArea()}
            <img src={bottomImage} className="image-bottom" style={stylesImgs}/>     
        </div>
            
    )
}