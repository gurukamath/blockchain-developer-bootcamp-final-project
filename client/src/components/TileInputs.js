import React from 'react';

function TileInputs(props) {

    return (
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon3">{"Input Name: " + props.input.name}</span>
                <input type="text" className="form-control" id="basic-url" placeholder={props.input.type} value={props.setValue} onChange={props.inputChange}/>
            </div>
        )

}

export default TileInputs;