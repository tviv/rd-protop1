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
//import 'react-dropdown-tree-select/dist/styles.css'
import DimensionSelect from '../../components/multiselect/DimensionSelect'
import model from "./salesConeModel";
import SalesConeFilter from "./SalesConeFilter";
import SalesConeTableContainer from "./SalesConeTableContainer";
import SalesConeTableView from "./SalesConeTableView";
import FrozenTable from "../../components/FrozenTable/FrozenTable";
import ColorTable from "../../components/ColorTable/ColorTable";

let colNums = 10;

let colNums2 = 10;
const data2 = {
  headerColumns: (() => {let res = []; for (let i = 0; i < colNums2; i++) { res.push({label: i.toString()})} return res;})(),
  rows: (() => {let res = []; for (let i = 0; i < 3; i++) { res.push([]); for (let j = 0; j < colNums2; j++)  { res[i].push({label: 'e' + j.toString()})}} return res;})()
}


class TestComponent extends Component{

  updated = 1;

  state = {
    expandedRows: [],


    data: {
      headerColumns: (() => {
        let res = [];
        for (let i = 0; i < colNums; i++) {
          res.push({label: i.toString()})
        }
        return res;
      })(),
      rows: (() => {
        let res = [];
        for (let i = 0; i < 300; i++) {
          res.push([]);
          for (let j = 0; j < colNums; j++) {
            res[i].push({label: (i*colNums + j).toString()})
          }
        }
        return res;
      })()
    }
}


  componentWillMount() {
    console.log("child will mount");
    // setTimeout(() => {
    //   this.updated = Date.now();
    //   this.setState({data: {
    //       headerColumns: (() => {let res = []; for (let i = 0; i < colNums; i++) { res.push({label: i.toString()})} return res;})(),
    //       rows: (() => {let res = []; for (let i = 0; i < 300; i++) { res.push([]); for (let j = 0; j < colNums; j++)  { res[i].push({label: (i*100 + j).toString()})}} return res;})()
    //     }
    //   });
    // }, 4500);

  }

  componentDidUpdate() {
    console.log("child did update")
    console.log(this.updated)
//    this.props.onCng(this.updated)
  }

  onExpand = (rowIndex) => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          resolve(data2);
        }, 5000);
      } catch (e) {
        reject(e)
      }
    });
  };


  handleExpand = (rowInd) =>{
    let newExpandedRows = [...this.state.expandedRows];
    let idxFound = newExpandedRows.findIndex((id)=>{
      return id === rowInd;
    });

    if(idxFound > -1){
      newExpandedRows.splice(idxFound, 1);
    }
    else{
      newExpandedRows.push(rowInd);
    }

    this.updated = Date.now();
    this.setState({expandedRows: [...newExpandedRows]});
    //this.props.onCng(this.state.expandedRows);
  }




  isExpanded = (rowInd)=>{
    const idx = this.state.expandedRows.find(
      (id)=>{
        return id === rowInd;
      }
    );

    return idx > -1;
  };

  getRows = (row, rowIndex)=>{

    let rows = [];

    const firstRow = (
      <tr key={rowIndex}>
        {/*<td >*/}
          {/*<button style = {{width: 70}}  onClick={()=>this.handleExpand(rowIndex)}>*/}
            {/*{this.isExpanded(rowIndex) ? "-" : "+"}*/}
          {/*</button>*/}
        {/*</td>*/}
        {row.map((col, index) =>
          <td key={`cell${rowIndex}_${index}`}>
            {col.label}
          </td>
        )}
      </tr>
    );



    rows.push(firstRow);

    if(this.isExpanded(rowIndex)){
      const detailRow = (
        data2.rows.map((row2, rowIndex2) =>
        <tr key={rowIndex*1000 + rowIndex2}>
          <td >
          </td>
          {row2.map((col, index) =>
            <td key={`cell${rowIndex}_${index}`}>
              {col.label}
            </td>
          )}
        </tr>
        )
    );
      rows.push(detailRow);
    }

    return rows;
  }

//      <div style={{overflowX: "auto"}}>


  render() {
    let data = this.state.data;

    return (
      <FrozenTable frozenCols={2}>
        <ColorTable data={this.state.data} onExpand={this.onExpand} {...this.props}  />
      </FrozenTable>
    )

    // return (
    //     <table className="table table-bordered table-sm">
    //       <thead>
    //       <tr>
    //         <td >
    //         </td>
    //         {data.headerColumns.map((item, index) =>
    //           <th key={index}>{item.label}</th>
    //         )}
    //       </tr>
    //       </thead>
    //
    //       <tbody>
    //       {data.rows.map((row, rowIndex) =>
    //         this.getRows(row, rowIndex)
    //       )}
    //       </tbody>
    //     </table>
    // )
  }
}

export default TestComponent;
