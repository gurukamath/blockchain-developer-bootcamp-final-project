import React from 'react';

function Tile(props){
    return (
            <div>
                <div className="input-group mb-3 tile">
                    <span className="input-group-text" id="basic-addon2">{props.title}</span>
                    <input type="text" className="form-control" placeholder={props.placeHolder} readOnly={props.isReadOnly} value={props.setValue} onChange={props.inputChange}/>
                    <span className="input-group-text" id="basic-addon2"><button type="button" className="btn btn-secondary" onClick={props.fun}>{props.button_text}</button></span>
                </div>
                <input type="text" className="output-display" readOnly value={props.setOutputValue}/>
            </div>
    )
}

export default Tile;