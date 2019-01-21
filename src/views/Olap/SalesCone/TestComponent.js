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

let colNums = 100;
const data = {
  headerColumns: (() => {let res = []; for (let i = 0; i < colNums; i++) { res.push(i.toString())} return res;})(),
  rows: (() => {let res = []; for (let i = 0; i < 300; i++) { res.push([]); for (let j = 0; j < colNums; j++)  { res[i].push(j.toString())}} return res;})()
}

class TestComponent extends Component{
  componentDidUpdate() {
    console.log(this.myRef);
  }



render() {
  return (
    <div style={{overflowX: "auto"}}>
      <Table ref={el => this.myRef = el} bordered className="table-sm">
        <thead>
        <tr>
          {data.headerColumns.map((item, index) =>
            <th key={index}>{item}</th>
          )}
        </tr>
        </thead>

        <tbody>
        {data.rows.map((row, rowIndex) =>
          <tr key={rowIndex}>
            {row.map((col, index) =>
              <td key={`cell${rowIndex}_${index}`}>
                {col}
              </td>
            )}
          </tr>
        )}
        </tbody>
      </Table>
    </div>

  )
}
}

export default TestComponent;
