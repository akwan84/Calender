import { AiOutlineClose } from 'react-icons/ai';
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const EventInfo = ({ setDisplayingEvent, clickedEvent }) => {
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

    return (
        <div>
            <div style = {{width: "100%", height: "100vh", backgroundColor:"white"}} onClick = {() => setDisplayingEvent(false)}> </div>        
            <div style = {{position:"absolute", left: "25%", top:"10vh", width: "50%", height: "80vh", backgroundColor: "#30b1fc", borderRadius: "30px", boxShadow: "0px 0px 10px black",}}>
                <div style = {{position: "absolute", left: "95%", top: "4%", color: "red", borderColor: "3px solid"}} onClick = {() => setDisplayingEvent(false)}>
                    <AiOutlineClose/>    
                </div>
                <div style = {{position: "absolute", top: "4vh", left: "5%", color:"white"}}>
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
            </div>
        </div>
    )
}

export default EventInfo;