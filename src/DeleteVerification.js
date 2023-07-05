const DeleteVerification = ({handleDelete, setDisplayDeleteVerification}) => {
    return (
        <div id="delete-verification-box">
            <div id="delete-verification-contents">
                <p>Are you sure you want to delete this event?</p>
                <button onClick = {() => handleDelete()} className="delete-verification-button">Yes</button>
                <button onClick = {() => setDisplayDeleteVerification(false)} style = {{left: "50%"}} className="delete-verification-button">No</button>
            </div>
        </div>
    )
}

export default DeleteVerification;