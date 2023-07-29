import { useState, useEffect } from 'react';
import Calender from './Calender';
import AddEvent from './AddEvent';
import EventInfo from './EventInfo';
import Grid from './Grid';
import Days from './Days';
import EditEvent from './EditEvent';
import MonthHeader from './MonthHeader';

/*
TODO:
- Add animations for button click and hover
*/

function App() {
    const parseFromStorage = (arr) => {
        for(let i = 0; i < arr.length; i++){
            const startTimeStr = arr[i].startTime;
            const endTimeStr = arr[i].endTime;
            
            arr[i].startTime = new Date(startTimeStr);
            arr[i].endTime = new Date(endTimeStr);
        }
        return arr;
    }

    const initialEvents = JSON.parse(localStorage.getItem('eventList')) || [];

    const [events, setEvents] = useState(parseFromStorage(initialEvents));
    
    useEffect(() => {
        const processForStorage = () => {
            const result = [];
            for(let i = 0; i < events.length; i++){
                const startTimeStr = events[i].startTime.toString();
                const endTimeStr = events[i].endTime.toString();
                
                result.push({
                    id: events[i].id,
                    name: events[i].name,
                    startTime: startTimeStr,
                    endTime: endTimeStr,
                    information: events[i].information
                });
            }
            return result;
        }

        localStorage.setItem('eventList', JSON.stringify(processForStorage()));
    }, [events]);

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

    const [displayingEvent, setDisplayingEvent] = useState(false);
    const [displayingAddEvent, setDisplayingAddEvent] = useState(false);
    const [displayingError, setDisplayingError] = useState(false);
    const [displayingDeleteVerification, setDisplayingDeleteVerification] = useState(false);
    const [displayingEdit, setDisplayingEdit] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [clickedEvent, setClickedEvent] = useState({});
    const [weekStart, setWeekStart] = useState(getWeekStart());

    const dateComparator = (a, b) => {
        return a.startTime - b.startTime;
    }

    const prevWeek = () => {
        let date = new Date(weekStart);
        setWeekStart(date.setDate(date.getDate() - 7));
    }

    const nextWeek = () => {
        let date = new Date(weekStart);
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
        const eventCopy = [...events];
        return eventCopy.sort(dateComparator);
    }

    const isOverlapping = () => {
        const start = new Date(newStart);
        const end = new Date(newEnd);

        const sortedEvents = sortEvents();

        if(sortedEvents.length === 0 || sortedEvents[0].startTime - end >= 0 || start - sortedEvents[sortedEvents.length - 1].endTime >= 0) return false;

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
                newEvents.push(events[i]);
            }
        }
        setEvents(newEvents);
        setDisplayingEvent(false);
        setDisplayingDeleteVerification(false);
    }

    const openAddEvent = () => {
        setNewName('');
        setNewStart('');
        setNewEnd('');
        setNewInformation('');

        setDisplayingAddEvent(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(allFieldsFilled() && !validTime()){
            setErrorMessage("Your event can not end before it starts");
            setDisplayingError(true);
            return;
        }

        if(!allFieldsFilled()){
            setErrorMessage("Please fill all fields");
            setDisplayingError(true);
            return;
        } 

        const id = (events.length === 0 ? 1 : (events[events.length - 1].id + 1));

        if(allFieldsFilled() && isOverlapping()){
            setErrorMessage("This event overlaps with another");
            setDisplayingError(true);
            return;
        }

        const newEvent = {
            id: id,
            name: newName,
            startTime: new Date(newStart),
            endTime: new Date(newEnd),
            information: newInformation
        }
        const newEventList = [...events, newEvent];
        setEvents(newEventList);
        setDisplayingError(false);
        setDisplayingAddEvent(false);
    }

    const findEventById = (id) => {
        let x = 0;
        while(events[x].id !== id){
            x++;
        }
        return x;
    }

    const handleEdit = (e) => {
        e.preventDefault();

        if(allFieldsFilled() && !validTime()){
            setErrorMessage("Your event can not end before it starts");
            setDisplayingError(true);
            return;
        }

        if(!allFieldsFilled()){
            setErrorMessage("Please fill all fields");
            setDisplayingError(true);
            return;
        }

        const newEvent = {
            id: clickedEvent.id,
            name: newName,
            startTime: new Date(newStart),
            endTime: new Date(newEnd),
            information: newInformation
        }

        const index = findEventById(clickedEvent.id);
        const oldEvent = events[index];

        const arrCopy = [...events];
        arrCopy.splice(index, 1);

        const sortedEvents = arrCopy.sort(dateComparator);

        if(sortedEvents.length === 0 || sortedEvents[0].startTime - newEvent.endTime >= 0 || newEvent.startTime - sortedEvents[sortedEvents.length - 1].endTime >= 0){
            addNewEvent(arrCopy, newEvent);
            return;
        }

        for(let i = 1; i < sortedEvents.length; i++){
            if(newEvent.startTime - sortedEvents[i-1].endTime >= 0 && sortedEvents[i].startTime - newEvent.endTime >= 0){
                addNewEvent(arrCopy, newEvent);
                return;
            } 
        }

        arrCopy.push(oldEvent);
        setEvents(arrCopy);
        setErrorMessage("This event overlaps with another");
        setDisplayingError(true);
    }

    const addNewEvent = (arr, newEvent) => {
        arr.push(newEvent);
        setEvents(arr);

        setDisplayingEvent(false);
        setDisplayingError(false);
        setDisplayingEdit(false);
    }

    return (
        <div className = "App">
            {(displayingEvent) ? (
                (displayingEdit) ? (
                    <EditEvent
                        setDisplayingEdit={setDisplayingEdit}
                        newName = {newName}
                        setNewName = {setNewName}
                        newStart = {newStart}
                        setNewStart = {setNewStart}
                        newEnd = {newEnd}
                        setNewEnd = {setNewEnd}
                        newInformation = {newInformation}
                        setNewInformation = {setNewInformation}
                        handleEdit={handleEdit}
                        displayingError={displayingError}
                        setDisplayingError={setDisplayingError}
                        errorMessage={errorMessage}
                    />
                ) : (
                    <EventInfo
                        setDisplayingEvent = {setDisplayingEvent}
                        clickedEvent = {clickedEvent}
                        handleDelete = {handleDelete}
                        displayingDeleteVerification = {displayingDeleteVerification}
                        setDisplayingDeleteVerification = {setDisplayingDeleteVerification}
                        setDisplayingEdit = {setDisplayingEdit}
                        setNewName = {setNewName}
                        setNewStart = {setNewStart}
                        setNewEnd = {setNewEnd}
                        setNewInformation = {setNewInformation}
                    />
                )
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
                    <button onClick = {() => openAddEvent()} style = {{position: "absolute", left: "2%", top: "3vh", width: "6%"}} className = "home-button"><strong>Add Event</strong></button>
                    <button onClick = {() => prevWeek()} style = {{position: "absolute", left: "12.5%", top: "3vh"}} className = "home-button"><strong>Last Week</strong></button>
                    <MonthHeader weekStart = {weekStart}/>
                    <button onClick = {() => nextWeek()} style = {{position: "absolute", right: "0%", top: "3vh"}} className = "home-button"><strong>Next Week</strong></button>
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
