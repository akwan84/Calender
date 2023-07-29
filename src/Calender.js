import Event from './Event'

const Calender = ({ events, setDisplayingEvent, setClickedEvent }) => {
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
                setClickedEvent = {setClickedEvent}
            />
        ))
    )
}

export default Calender;