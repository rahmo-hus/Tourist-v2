import React from 'react'
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab"

function UploadBox(props) {
    return (
        <div>
            <label htmlFor="upload-photo">
                <br/>
                <input
                    style={{display: "none"}}
                    id="upload-photo"
                    name="upload-photo"
                    type="files"
                    onChange={props.handleFileChange}
                />
                <Fab color="primary" size="small" component="span" aria-label="add">
                    <AddIcon/>
                </Fab>
                <br/>
                <br/>
            </label>
        </div>
    );
}

export default UploadBox



