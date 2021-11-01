import React from 'react';
import Tile from './Tile.js';
import {FullMethodList} from './FullMethodList.js';
import {RoleDefinitions} from './Roles.js';



function TileContainer(props){


    // const contractMethodList = FullMethodList[props.role+props.stage];
    // console.log(contractMethodList);

    const contractMethodList = FullMethodList.filter((el) => {
        const roleList = RoleDefinitions[props.role+props.stage];
        return roleList.includes(el.name);
    });


    return (
        contractMethodList.map((v, i) => (
            <div key={i}>
                <Tile contractMethod={v} web3={props.web3} contract={props.contract} handleClick={props.handleClick}/>
            </div>
        )

          )
    )
}

export default TileContainer;