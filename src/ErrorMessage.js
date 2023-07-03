const ErrorMessage = ({message}) => {
    return (
        <div style = {{width: "80%", height: "8vh", backgroundColor:"#ed5247", position: "absolute", top: "70vh", left: "10%", borderRadius: "10px", boxShadow: "0px 0px 3px black", color: "white"}}>
            <p style = {{fontSize: "3vh", marginTop: "2.5vh", textAlign: "center"}}>{message}</p>
        </div>
    );
}

export default ErrorMessage;