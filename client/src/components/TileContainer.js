import React from 'react';
import Tile from './Tile.js';


function TileContainer(props){

    return (
        props.contractMethodList.map((v, i) => (
            <div key={i}>
                <Tile contractMethod={v} />
            </div>
        )

          )
    )
}

export default TileContainer;