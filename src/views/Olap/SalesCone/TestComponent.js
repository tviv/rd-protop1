import React, { Component } from 'react';
import {
  FormGroup,
  Label,
  Input,
  Popover,
  PopoverHeader,
  PopoverBody,
  Button,

  Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'
import DimensionSelect from '../../components/multiselect/DimensionSelect'
import model from "./salesConeModel";
import SalesConeFilter from "./SalesConeFilter";
import SalesConeTableContainer from "./SalesConeTableContainer";
import SalesConeTableView from "./SalesConeTableView";
import SalesConeTable from "./SalesConeTable";

function TestComponent ({config}) {
  // return (
  //   <div>
  //     3. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
  //     et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  //     aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
  //     dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
  //     officia deserunt mollit anim id est laborum.
  //     <Button onClick={() => { config.showDynamicCUP({
  //       "goodFilter": "[Товары].[Товары].&[135639]",
  //       "dateFilter": "2018-06-17",
  //       "shopFilter": "[Подразделения].[Подразделение].&[218]" });
  //     }}>Go</Button>
  //
  //   </div>
  // )

  const data = {
    label: 'search me',
    value: 'searchme',
    children: [
      {
        label: 'search me too',
        value: 'searchmetoo',
        children: [
          {
            label: 'No one can get me',
            value: 'anonymous'
          }
        ]
      }
    ]
  }


  return (
    <div>
    <Row>
      <Col xs="12" lg="12">
        <FormGroup>
          <SalesConeTable config = {config} />
        </FormGroup>
      </Col>
    </Row>
      <Row>
      </Row>
    </div>

  )
}

export default TestComponent;
