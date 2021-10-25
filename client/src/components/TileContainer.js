import React from 'react';
import Tile from './Tile.js';
import {contractMethodList} from './Client.js';


function TileContainer(props){

    // console.log(contractMethodList);

    return (
        contractMethodList.map((v, i) => (
            <div key={i}>
                <Tile contractMethod={v} />
            </div>
        )

          )
    )
}

export default TileContainer;