import React, { Component } from "react";
import Header from "./Header";
import NoteInput from "./NoteInput";
import NoteList from "./NoteList";
import { getInitialData } from "../utils/index";

export class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: getInitialData(),
            searchKeyword: "",
        };

        this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
        this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this);
        this.onArchivedNoteHandler = this.onArchivedNoteHandler.bind(this);
        this.onSearchChangeEventHandler =
            this.onSearchChangeEventHandler.bind(this);
    }

    onAddNoteHandler({ title, body }) {
        this.setState((prevState) => {
            return {
                notes: [
                    ...prevState.notes,
                    {
                        id: +new Date(),
                        title,
                        body,
                        createdAt: new Date(),
                        archived: false,
                    },
                ],
            };
        });
    }

    onDeleteNoteHandler(id) {
        const notes = this.state.notes.filter((note) => note.id !== id);
        this.setState({ notes });
    }

    onArchivedNoteHandler(id) {
        const archivedNotes = this.state.notes.map((note) =>
            note.id === id ? { ...note, archived: !note.archived } : note
        );
        this.setState({ notes: archivedNotes });
    }

    onSearchChangeEventHandler(event) {
        this.setState(() => {
            return {
                searchKeyword: event.target.value,
            };
        });
    }

    render() {
        const notes = this.state.notes.filter((note) =>
            note.title
                .toLocaleLowerCase()
                .includes(this.state.searchKeyword.toLocaleLowerCase())
        );

        const activeNotes = notes.filter((note) => {
            return note.archived === false;
        });

        const archivedNotes = notes.filter((note) => {
            return note.archived === true;
        });

        return (
            <div>
                <Header onSearch={this.onSearchChangeEventHandler} />
                <div className="note-app__body">
                    <NoteInput addNote={this.onAddNoteHandler} />
                    <h2>Catatan Aktif</h2>
                    <NoteList
                        notes={activeNotes}
                        onDelete={this.onDeleteNoteHandler}
                        onArchive={this.onArchivedNoteHandler}
                    />
                    <h2>Arsip</h2>
                    <NoteList
                        notes={archivedNotes}
                        onDelete={this.onDeleteNoteHandler}
                        onArchive={this.onArchivedNoteHandler}
                    />
                </div>
            </div>
        );
    }
}

export default App;
