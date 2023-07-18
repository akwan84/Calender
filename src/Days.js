const Days = ({ weekStart }) => {
    let date = new Date(weekStart);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const res = [];
    for(let i = 0; i < 7; i++){
        res.push(
            <div style = {{left: `${12.5 * (1 + i)}%`, key: {i}}} className="week-day">
                <strong>{date.getDate()} <br/> {daysOfWeek[i]}</strong>
            </div>
        );
        date.setDate(date.getDate() + 1);
    }

    return (
        <div>{res}</div> 
    )
}

export default Days;