import { AiOutlineClose } from 'react-icons/ai';
import EventForm from './EventForm';

const EditEvent = ({ 
    setDisplayingEdit,
    newName, 
    setNewName, 
    newStart, 
    setNewStart, 
    newEnd, 
    setNewEnd, 
    newInformation, 
    setNewInformation,
    handleEdit 
}) => {

    return (
        <div>
            <div className='widget-outer'> </div>
            <div className='widget-inner'> 
                <div className='exit-button' onClick = {() => setDisplayingEdit(false)}>
                    <AiOutlineClose/>    
                </div>
                <div id='form-contents'>
                    <form className='addForm' onSubmit = {(e) => handleEdit(e)}>
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
                        <button type = 'submit' id='form-submit-button'>Edit Event</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditEvent