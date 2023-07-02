const Grid = () => {
    const times = ['1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM', '12:00 AM']
    const getVerticalPos = (x) => {
        const res = (x * (10/3)) + 10;
        return `${res}vh`
    }

    const getHorizontalPos = (x) => {
        const res = x * 12.5;
        return `${res}%`;
    }

    const renderItems = () => {
        const elements = [];
        let key = 0;

        for(let i = 0; i < 24; i++){
            for(let j = 0; j < 8; j++){
                if(j !== 0){
                    elements.push(
                        <div style = {{
                            width: "12.5%", 
                            height: "3.33vh", 
                            border: "1px solid", 
                            position: "absolute", 
                            top: getVerticalPos(i), 
                            left: getHorizontalPos(j), 
                            color: "lightgray"}}
                            key = {key++}
                        >

                        </div>);
                }else{
                    elements.push(
                        <div style = {{
                            width: "12.5%", 
                            height: "3.33vh", 
                            position: "absolute", 
                            top: getVerticalPos(i), 
                            left: getHorizontalPos(j), 
                            textAlign:"right", 
                            marginTop: "2.5vh", 
                            fontSize: "1.2vh"}}
                            key = {key++}
                        >
                            {times[i]}
                        </div>
                    );
                }
            }
        }
        elements.push(
            <div style = {{
                width: "12.5%", 
                height: "3.33vh", 
                position: "absolute", 
                top: "6.66vh", 
                left: "0%", 
                textAlign:"right", 
                marginTop: "2.5vh", 
                fontSize: "1.2vh"}}
                key = {key++}
            >
                12:00 AM
            </div>
        );
        return elements;
    }    
    return <div>{renderItems()}</div>;
}

export default Grid