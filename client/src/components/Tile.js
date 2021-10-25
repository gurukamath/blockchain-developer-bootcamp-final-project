import React, {useState} from 'react';
import TileInputs from './TileInputs.js';
import {handleErrorMessage} from './utils.js';

function Tile(props){

    const _method = props.contractMethod;
    const inputsList = _method.inputNames;

    const [inputs, setInputs] = useState(Array(inputsList.length).fill(''));
    const [output, setOutput] = useState('');

    const changeFunctions = function (i, v) {
        setInputs(Object.assign([...inputs], {[i]: v}))
    }

    const clickFunctions = async function() {
        let t;
        let err;
        t = await _method.functionDef(inputs)
                .catch(e => {err = handleErrorMessage(e.message)});
        if (!t) {t = err};

        setInputs(Array(inputsList.length).fill(''));
        setOutput(t);
    }

    const tileInputList = inputs.map((v,i) => {
                            return(
                                <div key={i}>
                                    <TileInputs 
                                        input={inputsList[i]}
                                        setValue={v} 
                                        inputChange={e => changeFunctions(i, e.target.value)}/>  
                                </div>
                            )})


    return (
            <div>
                <div className="mb-3 tile">
                    <span className="input-group-text" id="basic-addon2">{"Function Name: " + _method.name}</span>
                    {tileInputList}     
                </div>
                <input type="text" className="output-display" readOnly value={output}/>
                <span className="input-group-text" id="button-addon">
                    <button type="button" className="btn btn-secondary" onClick={e => clickFunctions()} >Call Function</button>
                </span>
            </div>
    )
}

export default Tile;