import React, {useState} from 'react';
import Tile from './Tile.js';
import {contractMethodList} from './Client.js';
import {handleErrorMessage} from './utils.js';


function TileContainer(props){

    const [inputs, setInputs] = useState(Array(contractMethodList.length).fill(''));
    const [outputs, setOutputs] = useState(Array(contractMethodList.length).fill(''));

    const changeFunctions = function (i, v) {
        setInputs(Object.assign([...inputs], {[i]: v}))
    }

    const clickFunctions = async function(i) {
        let t;
        let err;
        t = await contractMethodList[i].functionDef([inputs[i]])
                .catch(e => {err = handleErrorMessage(e.message)});
        if (!t) {t = err};

        setInputs(Object.assign([...inputs], {[i]: ""}));
        setOutputs(Object.assign(Array(contractMethodList.length).fill(''), {[i]: t}));
    }


    return (
        inputs.map((v, i) => (
            <div key={i}>
            <Tile 
            title={contractMethodList[i].name} 
            button_text={contractMethodList[i].name}  
            isReadOnly={contractMethodList[i].noInputs} 
            placeHolder={contractMethodList[i].inputNames}
            setValue={v}
            setOutputValue={outputs[i]} 
            fun={e => clickFunctions(i)} 
            inputChange={e => changeFunctions(i, e.target.value)}
            />
          </div>
        )

          )
    )
}

export default TileContainer;