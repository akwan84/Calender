const Days = ({ weekStart }) => {
    let date = new Date(weekStart);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const res = [];
    for(let i = 0; i < 7; i++){
        res.push(
            <div style = {{
                width: "12.5%", 
                height: "3.33vh",
                fontSize: "1.4vh",  
                position: "absolute", 
                top: "6.66vh", 
                left: `${12.5 * (1 + i)}%`,
                textAlign: "center",
                key: {i}
            }}
            >
                {date.getDate()} <br/> {daysOfWeek[i]}
            </div>
        );
        date.setDate(date.getDate() + 1);
    }

    return (
        <div>{res}</div> 
    )
}

export default Days;