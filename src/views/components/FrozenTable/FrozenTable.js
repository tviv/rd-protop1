import React, { Component } from 'react';
import './style.css';


class FrozenTable extends Component {


  state = {colNumbers: 0};

  // componentDidMount() {
  //     console.dir(this.table2Ref);
  // }

  componentDidMount() {
    //console.dir(this.table2Ref);
    this.table2Ref = this.div2Ref.children[0];
    if (this.table2Ref.rows.length >= 2) { //head and at least one data row
      //this.table1Ref.width = this.table2Ref.offsetWidth;
      let cells2 = this.table2Ref.rows[0].cells;
      this.col1Width = this.table2Ref.rows[1].cells[0].offsetWidth; //todo for the furture will be array via props - what are cols frozen
      this.offsetLeft = this.col1Width;

      for(let i = 0; i < this.table2Ref.rows.length; ++i) {
        this.table2Ref.rows[i].cells[0].classList.add('frozen-col');
        this.table2Ref.rows[i].cells[0].classList.add('frozen-col-temp');
      }

      this.headerHeight = cells2[1].offsetHeight;
      //this.tableWidth = this.table2Ref.offsetWidth;
      //this.table2Ref.classList.add('hide-table-header');

      this.setState({colNumbers: cells2.length});
    }
  }

  componentDidUpdate() {
    //console.log('update');
    this.table2Ref = this.div2Ref.children[0];

    // if (this.state.tableWidth) {
    //   if (this.state.tableWidth != this.table2Ref.offsetWidth) {
    //     this.table1Ref.width = this.table2Ref.offsetWidth;
    //     // this.table1Ref.rows[0].cells[0].height = this.table1Ref.rows[0].cells[1].offsetHeight+2;
    //     //
    //     // let cells1 = this.table1Ref.rows[0].cells;
    //     // let cells2 = this.table2Ref.rows[0].cells;
    //     // for (let i = 1; i < cells2.length; ++i) {
    //     //   cells1[i].textContent = cells2[i].textContent;
    //     //   cells1[i].width = this.table2Ref.rows[1].cells[i].offsetWidth;
    //     // }
    //
    //     this.setState({tableWidth: this.table1Ref.width});
    //   }
    //
    //   return;
    // }

    if (this.state.colNumbers) {
      this.table1Ref.width = this.table2Ref.offsetWidth;
      let cells1 = this.table1Ref.rows[0].cells;
      let cells2 = this.table2Ref.rows[0].cells;
      //this.table1Ref.rows = this.table2Ref.rows;


      for (let i = 0; i < cells2.length; ++i) {
        //Object.assign(cells1[i], cells2[i]);
        cells1[i].textContent = cells2[i].textContent;
        cells1[i].width = this.table2Ref.rows[1].cells[i].offsetWidth;
      }

      for(let i = 0; i < this.table2Ref.rows.length; ++i) {
        this.table2Ref.rows[i].cells[0].width = this.col1Width;
      }

      for (let i = 0; i < cells1.length; ++i) {
        cells1[i].height = this.headerHeight;

      }
      cells1[0].height = this.headerHeight + 1; //todo remove hard code

      if (!this.state.scrollWidth)
        this.setState({scrollWidth: this.table2Ref.offsetWidth + this.offsetLeft});
    }
  }


  handleTableScroll = (e) => {
    this.div1Ref.scrollLeft = e.nativeEvent.target.scrollLeft ;
    this.divTopScrollRef.scrollLeft = e.nativeEvent.target.scrollLeft;
    this.div2Ref.scrollLeft = e.nativeEvent.target.scrollLeft;
  }


  getArray = () => {
    console.log(this.state.colNumbers);
    let res = Array(this.state.colNumbers);
    for(let i = 0; i < this.state.colNumbers; ++i) {
      res[i] = '';
    }
    return res;
  }

  render() {

    return (
      <div style={this.props.style}>
        <div className="sticky"  style={{zIndex:111}}>
          <div ref = {el=>this.divTopScrollRef=el} style={{overflowX: "auto"}} onScroll={this.handleTableScroll}>
            <div style={{height: 1, width:this.state.scrollWidth}}>
            </div>
          </div>
          <div style={{position:'relative'}}>

            <div ref = {el=>this.div1Ref=el} className="hide-scroll"  style={{overflowX: "auto", paddingLeft:this.offsetLeft}}>
              <table ref={el => this.table1Ref = el} className="table-bordered table-sm" style={{tablfeLayout: 'fixed'}}>
                <thead>
                <tr>
                  {this.getArray().map((item, index) =>
                    <th key={'c11_'+index} style={{...index === 0 ? {width: this.col1Width}: {}}} className={index === 0 ? "frozen-col" : ""}>{item}</th>
                  )}
                </tr>

                </thead>

                <tbody>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div style={{position:'relative'}}>

        <div id="tv-wrap-table-div" ref = {el=>this.div2Ref=el} style={{overflowX: "auto", paddingLeft:this.offsetLeft, overflowY:'hidden', marginTop:`-${this.headerHeight}px`}} onScroll={this.handleTableScroll}>
          {this.props.children}
        </div>
        </div>
      </div>
    );
  }
}


export default FrozenTable;
