import Event from './Event'

const Calender = ({ events, setDisplayingEvent, clickedEvent, setClickedEvent }) => {
    return (
        events.map((event) => (
            <Event
                key = {event.id}
                id = {event.id}
                name = {event.name}
                startTime = {event.startTime}
                endTime = {event.endTime}
                information = {event.information}
                setDisplayingEvent = {setDisplayingEvent}
                clickedEvent = {clickedEvent}
                setClickedEvent = {setClickedEvent}
            />
        ))
    )
}

export default Calender;