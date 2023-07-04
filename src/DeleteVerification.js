const DeleteVerification = ({handleDelete, setDisplayDeleteVerification}) => {
    return (
        <div style = {{width: "90%", height: "10vh", backgroundColor: "red", position: "absolute", top: "67vh", left: "5%", borderRadius: "15px", boxShadow: "0px 0px 3px black"}}>
            <div style = {{position: "absolute", left: "2%", width: "100%", color: "white"}}>
                <p>Are you sure you want to delete this event?</p>
                <button onClick = {() => handleDelete()} style = {{position: "absolute", width: "46%", height: "3.5vh", backgroundColor: "white", borderRadius: "10px"}}>Yes</button>
                <button onClick = {() => setDisplayDeleteVerification(false)} style = {{position: "absolute", width: "46%", height: "3.5vh", left: "50%", backgroundColor: "white", borderRadius: "10px"}}>No</button>
            </div>
        </div>
    )
}

export default DeleteVerification;