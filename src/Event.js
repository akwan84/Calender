const Event = ({ name, startTime, endTime, information, setDisplayingEvent, clickedEvent, setClickedEvent}) => {
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
            name: name,
            startTime: startTime,
            endTime: endTime,
            information: information
        });
    }

    return (
        <div style = {{
            position:"absolute", 
            top: getVerticalPosition(), 
            left: getHorizontalPosition(),
            height: getSize(), 
            color: "white", 
            backgroundColor: "#30b1fc",
            width: "12%",
            borderRadius: "10px",
            border: "1px solid",
            boxShadow: "0px 0px 5px black",
            textAlign: "center"
            }}
            onClick={() => handleClick()}
        >
            {`${name}`}            
        </div>
    )
}

export default Event;