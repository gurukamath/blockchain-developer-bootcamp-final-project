import React, {useState} from 'react';
import Tile from './Tile.js';
import {contractMethodList} from './Client.js';


function TileContainer(props){

    const [inputs, setInputs] = useState(Array(contractMethodList.length).fill(''));

    const changeFunctions = function (i, v) {
        setInputs(Object.assign([...inputs], {[i]: v}))
    }

    const clickFunctions = async function(i) {
        const t = await contractMethodList[i].functionDef([inputs[i]]);
        setInputs(Object.assign([...inputs], {[i]: t}))
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
            fun={e => clickFunctions(i)} 
            inputChange={e => changeFunctions(i, e.target.value)}
            />
          </div>
        )

          )
    )
}

export default TileContainer;