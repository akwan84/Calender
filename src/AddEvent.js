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
                <div className='widget-outer' onClick = {() => closeWindow()}> </div>
                <div className='widget-inner'>
                    <div className='exit-button' onClick = {() => closeWindow()}>
                        <AiOutlineClose/>    
                    </div>
                    <div id='form-contents'>
                        <form className='addForm' onSubmit = {(e) => handleSubmit(e)}>
                            <h2>Event Name</h2>
                            <input
                                id = 'name'
                                type = 'text'
                                placeholder = 'Event Name'
                                value = {newName}
                                onChange = {(e) => setNewName(e.target.value)}
                                className='event-input'
                            />
                            <br/>
                            <h2>Event Start</h2>
                            <input
                                id = 'startTime'
                                type = 'datetime-local'
                                value = {newStart}
                                onChange = {(e) => setNewStart(e.target.value)}
                                className='event-input'
                            />
                            <br/>
                            <h2>Event End</h2>
                            <input
                                id = 'endTime'
                                type = 'datetime-local'
                                value = {newEnd}
                                onChange = {(e) => setNewEnd(e.target.value)}
                                className='event-input'
                            />
                            <br/>
                            <h2> Information </h2>
                            <textarea
                                id = 'information'
                                value = {newInformation}
                                onChange = {(e) => setNewInformation(e.target.value)}
                            />
                            <br/>
                            <br/>
                            <button type = 'submit' id='form-submit-button'>Add Event</button>
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