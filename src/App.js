import { useState } from 'react';
import Calender from './Calender';
import AddEvent from './AddEvent';

function App() {
    const [events, setEvents] = useState([
        {
            id: 1,
            name: "My Event",
            startTime: "16:00",
            endTime: "18:00"
        },
        {
            id: 2,
            name:"My Event 2",
            startTime: "15:00",
            endTime: "17:00"
        }
    ]);

    const [newName, setNewName] = useState('');
    const [newStart, setNewStart] = useState('');
    const [newEnd, setNewEnd] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!newName || !newStart || !newEnd) return;

        const id = (events.length === 0 ? 1 : events[events.length - 1] + 1);
        const newEvent = {
            id: id,
            name: newName,
            startTime: newStart,
            endTime: newEnd
        }
        const newEventList = [...events, newEvent];
        setEvents(newEventList);
    }

    const compareTimes = (a, b) => {
        const aHour = parseInt(a.substring(0, 2));
        const bHour = parseInt(b.substring(0, 2));
        const aMin = parseInt(a.substring(3, 5));
        const bMin = parseInt(b.substring(3, 5));

        return (aHour === bHour) ? (aMin - bMin) : (aHour - bHour);
    }


    const sortEvents = () => {
        const comparator = (a, b) => {
            return compareTimes(a.startTime, b.startTime)
        }

        console.log(events.sort(comparator));
        return events.sort(comparator);
    }

    return (
        <div className = "App">
            <AddEvent
                newName = {newName}
                setNewName = {setNewName}
                newStart = {newStart}
                setNewStart = {setNewStart}
                newEnd = {newEnd}
                setNewEnd = {setNewEnd}
                handleSubmit = {handleSubmit}
            />
            <Calender 
                events = {sortEvents()}
                setEvents = {setEvents}
            />
        </div>
    );
}

export default App;
