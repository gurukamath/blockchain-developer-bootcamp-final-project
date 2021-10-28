import React from 'react';
import Tile from './Tile.js';
import {FullMethodList} from './FullMethodList.js';



function TileContainer(props){

    const contractMethodList = FullMethodList;

    return (
        contractMethodList.map((v, i) => (
            <div key={i}>
                <Tile contractMethod={v} web3={props.web3} contract={props.contract}/>
            </div>
        )

          )
    )
}

export default TileContainer;