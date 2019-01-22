import React, { Component } from 'react';
import { Table } from 'reactstrap';
import DoubleScrollbar from 'react-double-scrollbar';
import model from "../Olap/SalesCone/salesConeModel";

class ColorTable extends Component {
    state = {
      cellId: null
    }


  handleCellClick = (e) => {
    let cellId = e.target.id;
    // this.setState({
    //   cellId: cellId
    // });
    if (this.props.onCellClick) {
      this.props.onCellClick(cellId);
    }
  }

  render () {

    return (
        <table className="table table-bordered table-sm">
          <thead>
          <tr>
            {this.props.data && this.props.data.headerColumns.filter(x=>!x.hidden).map((item, index) =>
              <th key={index}>{item.label}</th>
            )}
          </tr>
          </thead>

          <tbody>
          {this.props.data && this.props.data.rows.map((row, rowIndex) =>
            <tr key={rowIndex}>
              {row.filter(x=>!x.hidden).map((col, index)=>
                <td id={col.cellId} className={'cell-cone ' + (this.props.cellId === col.cellId ? 'focus' : '')} style={{'background':col.background, ...styles.tableCell,... index >= 1 ? styles.tableCellValue : {}}} key={index} onClick={this.handleCellClick} >
                  {col.label}
                </td>
              )}
            </tr>
          )}
          </tbody>
        </table>
    )

  }
}

const styles = {
  tableCell: {
    'whiteSpace': 'nowrap',
  },
  tableCellValue: {
    'textAlign': 'center'
  }

};

export default ColorTable;
