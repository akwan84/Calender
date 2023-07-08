import { AiOutlineClose } from 'react-icons/ai';
import DeleteVerification from './DeleteVerification';

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const EventInfo = ({ setDisplayingEvent, clickedEvent , handleDelete, displayingDeleteVerification, setDisplayingDeleteVerification, setDisplayingEdit, setNewName, setNewStart, setNewEnd, setNewInformation }) => {
    const formatTime = (date) => {
        const formatMinutes = () => {
            if(date.getMinutes() < 10){
                return `0${date.getMinutes()}`
            }
            return `${date.getMinutes()}`
        }

        if(date.getHours() === 0){
            return `12:${formatMinutes()} AM`;
        }

        if(date.getHours() === 12){
            return `12:${formatMinutes()} PM`;
        }

        if(date.getHours() > 12){
            return `${date.getHours() - 12}:${formatMinutes()} PM`;
        }

        return `${date.getHours()}:${formatMinutes()} AM`;
    }

    const closeWindow = () => {
        setDisplayingEvent(false);
        setDisplayingDeleteVerification(false);
    }

    const displayEdit = () => {
        const start = new Date(clickedEvent.startTime);
        start.setHours(start.getHours() - (start.getTimezoneOffset() / 60));

        const end = new Date(clickedEvent.endTime);
        end.setHours(end.getHours() - (end.getTimezoneOffset() / 60));

        setNewName(clickedEvent.name);
        setNewStart(start.toISOString().slice(0, 16));
        setNewEnd(end.toISOString().slice(0, 16));
        setNewInformation(clickedEvent.information);

        setDisplayingEdit(true);
    }

    return (
        <div>
            <div className = "widget-outer" onClick = {() => closeWindow()}> </div>        
            <div className = "widget-inner">
                <div className = "exit-button" onClick = {() => closeWindow()}>
                    <AiOutlineClose/>    
                </div>
                <div id='event-info-contents'>
                    <h1>{clickedEvent.name}</h1>
                    <h2>Date</h2>
                    <p>{`${days[clickedEvent.startTime.getDay()]}, ${months[clickedEvent.startTime.getMonth()]} ${clickedEvent.startTime.getDate()}, ${clickedEvent.startTime.getFullYear()}`}</p>
                    <h2>Start Time</h2>
                    <p>{formatTime(clickedEvent.startTime)}</p>
                    <h2>End Time</h2>
                    <p>{formatTime(clickedEvent.endTime)}</p>
                    <h2>Information</h2>
                    <p>{clickedEvent.information}</p>
                </div>
                <button onClick = {() => setDisplayingDeleteVerification(true)} style = {{left: "5%"}} className='event-info-button'>Delete Event</button>
                <button onClick = {() => displayEdit()} style = {{left: "55%"}} className='event-info-button'>Edit Event</button>
                {(displayingDeleteVerification) ? (
                    <DeleteVerification
                        handleDelete = {handleDelete}
                        setDisplayingDeleteVerification = {setDisplayingDeleteVerification}
                    />
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    )
}

export default EventInfo;