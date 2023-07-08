import { AiOutlineClose } from 'react-icons/ai';
import ErrorMessage from './ErrorMessage';
import EventForm from './EventForm';

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
                            <EventForm
                                newName = {newName}
                                setNewName = {setNewName}
                                newStart = {newStart}
                                setNewStart = {setNewStart}
                                newEnd = {newEnd}
                                setNewEnd = {setNewEnd}
                                newInformation = {newInformation}
                                setNewInformation = {setNewInformation}
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