const AddEvent = ({newName, setNewName, newStart, setNewStart, newEnd, setNewEnd, handleSubmit}) => {
    return(
        <form className='addForm' onSubmit = {(e) => handleSubmit(e)}>
            <input
                id = 'name'
                type = 'text'
                placeholder = 'Event Name'
                value = {newName}
                onChange = {(e) => setNewName(e.target.value)}
            />
            <input
                id = 'startTime'
                type = 'time'
                placeholder = 'Start Time'
                value = {newStart}
                onChange = {(e) => setNewStart(e.target.value)}
            />
            <input
                id = 'endTime'
                type = 'time'
                placeholder = 'End Time'
                value = {newEnd}
                onChange = {(e) => setNewEnd(e.target.value)}
            />
            <button type = 'submit'>Add Event</button>
        </form>
    )
}

export default AddEvent;