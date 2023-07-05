import { AiOutlineClose } from 'react-icons/ai';
import DeleteVerification from './DeleteVerification';

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const EventInfo = ({ setDisplayingEvent, clickedEvent , handleDelete, displayDeleteVerification, setDisplayDeleteVerification }) => {
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
        setDisplayDeleteVerification(false);
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
                <button onClick = {() => setDisplayDeleteVerification(true)} style = {{left: "5%"}} className='event-info-button'>Delete Event</button>
                <button style = {{left: "55%"}} className='event-info-button'>Edit Event</button>
                {(displayDeleteVerification) ? (
                    <DeleteVerification
                        handleDelete = {handleDelete}
                        setDisplayDeleteVerification = {setDisplayDeleteVerification}
                    />
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    )
}

export default EventInfo;