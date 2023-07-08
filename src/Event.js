const Event = ({ id, name, startTime, endTime, information, setDisplayingEvent, clickedEvent, setClickedEvent }) => {
    const getVerticalPosition = () => {
        const minutes = ((startTime.getHours() * 60) + startTime.getMinutes());
        const res = ((minutes / 1440) * 80) + 10.5;

        return `${res}vh`;
    }

    const getHorizontalPosition = () => {
        const dayOfWeek = startTime.getDay();
        const offset = (12.5 * (1 + dayOfWeek)) + 0.25;
        return `${offset}%`;
    }

    const getSize = () => {
        const startTimeMinutes = ((startTime.getHours() * 60) + startTime.getMinutes());
        const endTimeMinutes = ((endTime.getHours() * 60) + endTime.getMinutes());
        const res = (((endTimeMinutes - startTimeMinutes) / 1440) * 80) - 1;
        return `${res}vh`;
    }

    const handleClick = () => {
        setDisplayingEvent(true);
        setClickedEvent({
            id: id,
            name: name,
            startTime: startTime,
            endTime: endTime,
            information: information
        });
    }

    return (
        <div className = "event" style = {{top: getVerticalPosition(), left: getHorizontalPosition(), height: getSize()}} onClick={() => handleClick()}>
            {`${name}`}            
        </div>
    )
}

export default Event;