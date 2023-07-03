const ErrorMessage = ({message}) => {
    return (
        <div style = {{width: "80%", height: "8vh", backgroundColor:"#ed5247", position: "absolute", top: "70vh", left: "10%", borderRadius: "10px", boxShadow: "0px 0px 3px black", color: "white"}}>
            {message}
        </div>
    );
}

export default ErrorMessage;