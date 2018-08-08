import React, { Component } from 'react';
import {
  Popover,
  PopoverHeader,
  PopoverBody,
  Button,
} from 'reactstrap';
import LoadingWrappedView from "../../components/LoadingWrappedView";


function CellPropertyWindow (props) {
  let data = props.property;
  return (
    <div>
      {data.cellId && <Popover placement="top" isOpen={props.isOpen}
                               target={data.cellId} toggle={props.toggle}>
        <PopoverHeader>Свойства значения</PopoverHeader>
        <PopoverBody>
          <div>КУП: {data.КУП}</div>
          {/*<div>Маржа: 23.4%</div>*/}

          <hr/>

          <Button block color="link" onClick={data.onDynamicClick}>Динамика КУП</Button>
        </PopoverBody>
      </Popover>
      }
      </div>
  )
}


export default CellPropertyWindow;
