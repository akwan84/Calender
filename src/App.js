import { useState } from 'react';
import Calender from './Calender';
import AddEvent from './AddEvent';
import EventInfo from './EventInfo';
import Grid from './Grid';
import Days from './Days';

/*
TODO:
- Make events deletable (add a verification notice)
- Make events editable
- Display month of the corresponding week
- Modify the way events display when too widget is too thin
- Use local storage to store events
- Styling, and move CSS into CSS files
*/

function App() {
    const [events, setEvents] = useState([
        {
            id: 1,
            name: "My Event",
            startTime: new Date('July 3, 2023 16:00:00'),
            endTime: new Date('July 3, 2023 18:00:00'),
            information: "Something cool"
        },
        {
            id: 3,
            name: "My Event 3",
            startTime: new Date('July 9, 2023 12:00:00'),
            endTime: new Date('July 9, 2023 16:00:00'),
            information: "Please come"
        },
        {
            id: 2,
            name: "My Event 2",
            startTime: new Date('July 3, 2023 12:00:00'),
            endTime: new Date('July 3, 2023 16:00:00'),
            information: "Something cool's about to happen"
        }
    ]); 

    const getWeekStart = () => {
        let date = new Date();
        while(date.getDay() !== 0){
            date.setDate(date.getDate() - 1);
        }
        return date;
    }

    const [newName, setNewName] = useState('');
    const [newStart, setNewStart] = useState('');
    const [newEnd, setNewEnd] = useState('');
    const [newInformation, setNewInformation] = useState('');
    const [isBadTime, setIsBadTime] = useState(false);
    const [displayingEvent, setDisplayingEvent] = useState(false);
    const [displayingAddEvent, setDisplayingAddEvent] = useState(false);
    const [displayingError, setDisplayingError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [clickedEvent, setClickedEvent] = useState({});
    const [weekStart, setWeekStart] = useState(getWeekStart());

    const prevWeek = () => {
        let date = new Date(weekStart);
        console.log(date);
        setWeekStart(date.setDate(date.getDate() - 7));
    }

    const nextWeek = () => {
        let date = new Date(weekStart);
        console.log(date);
        setWeekStart(date.setDate(date.getDate() + 7));
    }

    const inWeek = (date) => {
        const mpd = 24 * 60 * 60 * 1000;
        const diff = Math.round((date - weekStart) / mpd);
        return diff >= 0 && diff < 7;
    }

    const getEventsInWeek = () => {
        const res = [];
        for(let i = 0; i < events.length; i++){
            if(inWeek(events[i].startTime)){
                res.push(events[i]);
            }
        }
        return res;
    }

    const validTime = () => {
        const start = new Date(newStart);
        const end = new Date(newEnd);

        return end - start > 0;
    } 

    const sortEvents = () => {
        const comparator = (a, b) => {
            return a.startTime - b.startTime;
        }
        const eventCopy = [...events];
        return eventCopy.sort(comparator);
    }

    const isOverlapping = () => {
        const start = new Date(newStart);
        const end = new Date(newEnd);
        const sortedEvents = sortEvents();

        if(sortedEvents[0].startTime - end > 0 || start - sortedEvents[sortedEvents.length - 1].endTime > 0) return false;

        for(let i = 1; i < sortedEvents.length; i++){
            if(start - sortedEvents[i-1].endTime >= 0 && sortedEvents[i].startTime - end >= 0) return false;
        }
        return true;
    }

    const allFieldsFilled = () => {
        return newName && newStart && newEnd;
    }

    const handleDelete = () => {
        const newEvents = [];
        for(let i = 0; i < events.length; i++){
            if(events[i].id !== clickedEvent.id){
                console.log(events[i]);
                newEvents.push(events[i]);
            }
        }
        setEvents(newEvents);
        setDisplayingEvent(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(allFieldsFilled() && !validTime()){
            setErrorMessage("Your event can not end before it starts");
            setDisplayingError(true);
            return;
        }

        if(allFieldsFilled() && isOverlapping()){
            setErrorMessage("This event overlaps with another");
            setDisplayingError(true);
            return;
        }

        if(!allFieldsFilled()){
            setErrorMessage("Please fill all fields");
            setDisplayingError(true);
            return;
        } 

        const id = (events.length === 0 ? 1 : (events[events.length - 1].id + 1));
        const newEvent = {
            id: id,
            name: newName,
            startTime: new Date(newStart),
            endTime: new Date(newEnd),
            information: newInformation
        }
        const newEventList = [...events, newEvent];
        setEvents(newEventList);
        setDisplayingAddEvent(false);
    }

    return (
        <div className = "App">
            {(displayingEvent) ? (
                <EventInfo
                    setDisplayingEvent = {setDisplayingEvent}
                    clickedEvent = {clickedEvent}
                    handleDelete = {handleDelete}
                />
            ) : (displayingAddEvent)? (
                <AddEvent
                    newName = {newName}
                    setNewName = {setNewName}
                    newStart = {newStart}
                    setNewStart = {setNewStart}
                    newEnd = {newEnd}
                    setNewEnd = {setNewEnd}
                    newInformation = {newInformation}
                    setNewInformation = {setNewInformation}
                    handleSubmit = {handleSubmit}
                    setDisplayingAddEvent= {setDisplayingAddEvent}
                    displayingError = {displayingError}
                    setDisplayingError = {setDisplayingError}
                    errorMessage = {errorMessage}
                />
            ) : (
                <div>
                    <button onClick = {() => prevWeek()} style = {{position: "absolute", left: "12.5%", top: "4vh"}}>Last Week</button>
                    <button onClick = {() => setDisplayingAddEvent(true)} style = {{position: "absolute", left: "47%", top: "4vh", width: "6%"}}>Add Event</button>
                    <button onClick = {() => nextWeek()} style = {{position: "absolute", right: "0%", top: "4vh"}}>Next Week</button>
                    <Days
                        weekStart = {weekStart}
                    />
                    <Grid/>
                    <Calender 
                        events = {getEventsInWeek()}
                        setDisplayingEvent = {setDisplayingEvent}
                        clickedEvent = {clickedEvent}
                        setClickedEvent = {setClickedEvent}
                    />
                </div>
            )}
        </div>
    );
}

export default App;
