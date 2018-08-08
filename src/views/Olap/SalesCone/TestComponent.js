import React, { Component } from 'react';
import {Button} from "reactstrap";



function TestComponent ({config}) {
  return (
    <div>
      3. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
      officia deserunt mollit anim id est laborum.
      <Button onClick={() => { config.showDynamicCUP({
        "goodFilter": "[Товары].[Товары].&[135639]",
        "dateFilter": "2018-06-17",
        "shopFilter": "[Подразделения].[Подразделение].&[218]" });
      }}>Go</Button>

    </div>
  )
}

export default TestComponent;
