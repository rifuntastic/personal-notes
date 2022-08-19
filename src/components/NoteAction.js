import React from "react";

function NoteAction() {
    return (
        <div className="note-item_action">
            <button className="note-item__delete-button">Delete</button>
            <button className="note-item__archive-button">Arsipkan</button>
        </div>
    );
}

export default NoteAction;
