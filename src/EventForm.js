const EventForm = ({ newName, setNewName, newStart, setNewStart, newEnd, setNewEnd, newInformation, setNewInformation }) => {
    return (
        <div>
            <h2>Event Name</h2>
            <input
                id = 'name'
                type = 'text'
                placeholder = 'Event Name'
                value = {newName}
                onChange = {(e) => setNewName(e.target.value)}
                className='event-input'
            />
            <br/>
            <h2>Event Start</h2>
            <input
                id = 'startTime'
                type = 'datetime-local'
                value = {newStart}
                onChange = {(e) => setNewStart(e.target.value)}
                className='event-input'
            />
            <br/>
            <h2>Event End</h2>
            <input
                id = 'endTime'
                type = 'datetime-local'
                value = {newEnd}
                onChange = {(e) => setNewEnd(e.target.value)}
                className='event-input'
            />
            <br/>
            <h2> Information </h2>
            <textarea
                id = 'information'
                value = {newInformation}
                onChange = {(e) => setNewInformation(e.target.value)}
            />
        </div>
    )
}

export default EventForm