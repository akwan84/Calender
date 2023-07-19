const MonthHeader = ({ weekStart }) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const asDate = new Date(weekStart);
    return (
        <div id = "month">{months[asDate.getMonth()]}</div>
    )
}

export default MonthHeader;