import { AiOutlineClose } from 'react-icons/ai';
import ErrorMessage from './ErrorMessage';

const AddEvent = ({
    newName, 
    setNewName, 
    newStart, 
    setNewStart, 
    newEnd, 
    setNewEnd, 
    newInformation, 
    setNewInformation, 
    handleSubmit, 
    setDisplayingAddEvent, 
    displayingError, 
    setDisplayingError,
    errorMessage
}) => {
    const closeWindow = () => {
        setDisplayingAddEvent(false);
        setDisplayingError(false);
    }

    return(
        <div>
            <div>
                <div style = {{width: "100%", height: "100vh", backgroundColor:"white"}} onClick = {() => closeWindow()}> </div>        
                <div style = {{position:"absolute", left: "25%", top:"10vh", width: "50%", height: "80vh", backgroundColor: "#30b1fc", borderRadius: "30px", boxShadow: "0px 0px 5px black",}}>
                    <button style = {{position: "absolute", left: "30px", top: "30px"}} onClick = {() => closeWindow()}>
                        <AiOutlineClose/>    
                    </button>
                    <div style = {{position: "absolute", left: "30px", top: "60px", color: "white", width: "95%"}}>
                        <form className='addForm' onSubmit = {(e) => handleSubmit(e)}>
                            <h2>Event Name</h2>
                            <input
                                id = 'name'
                                type = 'text'
                                placeholder = 'Event Name'
                                value = {newName}
                                onChange = {(e) => setNewName(e.target.value)}
                                style = {{width: "97%", height: "3vh", fontSize: "2.5vh"}}
                            />
                            <br/>
                            <h2>Event Start</h2>
                            <input
                                id = 'startTime'
                                type = 'datetime-local'
                                value = {newStart}
                                onChange = {(e) => setNewStart(e.target.value)}
                                style = {{width: "97%", height: "3vh", fontSize: "2.5vh"}}
                            />
                            <br/>
                            <h2>Event End</h2>
                            <input
                                id = 'endTime'
                                type = 'datetime-local'
                                value = {newEnd}
                                onChange = {(e) => setNewEnd(e.target.value)}
                                style = {{width: "97%", height: "3vh", fontSize: "2.5vh"}}
                            />
                            <br/>
                            <h2> Information </h2>
                            <textarea
                                id = 'information'
                                value = {newInformation}
                                onChange = {(e) => setNewInformation(e.target.value)}
                                style = {{resize: "none", width: "97%", height: "15vh"}}
                            />
                            <br/>
                            <br/>
                            <button type = 'submit' style = {{width: "30%", height: "5vh", position: "absolute", left: "35%", fontSize: "3vh"}}>Add Event</button>
                        </form>
                    </div>
                    {
                        (displayingError ? (
                            <ErrorMessage
                                message = {errorMessage}
                            />
                        ): (
                            <div></div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default AddEvent;