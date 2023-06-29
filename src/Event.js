const Event = ({ name, startTime, endTime}) => {
    return (
        <li>
            {`${name}: From ${startTime} to ${endTime}`}            
        </li>
    )
}

export default Event;