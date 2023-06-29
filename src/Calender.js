import Event from './Event'

const Calender = ({ events }) => {
    return (
        <ul>
            {events.map((event) => (
                <Event
                    key = {event.id}
                    name = {event.name}
                    startTime = {event.startTime}
                    endTime = {event.endTime}                   
                />
            ))}
        </ul>
    )
}

export default Calender;