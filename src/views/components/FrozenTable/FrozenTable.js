import React, { Component,  } from 'react';
import './style.css';
import PropTypes from 'prop-types';

import TestComponent from "../../Olap/SalesCone/TestComponent";


class FrozenTable extends Component {

  static propTypes = {
    frozenCols: PropTypes.number
  };

  static defaultProps = {
    frozenCols: 1
  };

  state = {colNumbers: 0};
  offsetLeft = 0;
  headRowsNumber = 0;
  // componentDidMount() {
  //     console.dir(this.table2Ref);
  // }

  componentDidMount() {
    console.dir(this.table2Ref);
    this.table2Ref = this.table2Ref || this.div2Ref.children[0];
    if (this.table2Ref.rows && this.table2Ref.rows.length >= 2) { //head and at least one data row

      this.headRowsNumber = this.table2Ref.getElementsByTagName('thead')[0].rows.length;
      //this.table1Ref.width = this.table2Ref.offsetWidth;
      let cells2 = this.table2Ref.rows[0].cells;
      if (this.state.colNumbers !== cells2.length || true) {
        console.log('frozen did')

        this.setFrozenFeatures(true);

        this.headerHeight = cells2[this.props.frozenCols].offsetHeight;
        //this.tableWidth = this.table2Ref.offsetWidth;
        //this.table2Ref.classList.add('hide-table-header');

        // if (this.state.colNumbers != cells2.length) {
        this.setState({colNumbers: cells2.length});
        // }
      }
    }


    window.addEventListener("resize", this.handleResize);
  }

  initIfNeeded() {
    // if (this.state.colNumbers != this.table2Ref.rows[0].cells.length) {
    //   this.state.scrollWidth = undefined
    //   this.componentDidMount()
    // }
  }


  componentWillReceiveProps(nextProps) {
  }

  componentDidUpdate() {
    this.initIfNeeded();
    if (!this.table2Ref.rows[0] || !this.table2Ref.rows[0].cells[0]) return;

    //copy thead
    let mainTableThead = this.table2Ref.getElementsByTagName('thead');
    this.table1Ref.getElementsByTagName('thead')[0].innerHTML = mainTableThead[0].innerHTML;


    if (!this.table1Ref.rows[0] ) return;
    //this.table2Ref = this.table2Ref || this.div2Ref.children[0];

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

    const parentWidth = this.table2Ref.parentElement.clientWidth;
    const tableWidth = this.table2Ref.offsetWidth + this.offsetLeft
    console.log(`parent width: ${parentWidth}`);
    console.log(`table width: ${tableWidth}`);

    //remove fixing if table is fitted to given range
    if (tableWidth <= parentWidth) {
      this.setFrozenFeatures(false)
    }


    if (this.state.colNumbers) {
      console.log('froze did updated')
      this.table1Ref.width = this.table2Ref.offsetWidth + 1; //todo
      let cells1 = this.table1Ref.rows[0].cells;
      let cells2 = this.table2Ref.rows[0].cells;
      //this.table1Ref.rows = this.table2Ref.rows;


      this.table1Ref.style.setProperty('display', 'block');


      for (let j = 0; j < cells2.length; ++j) {
        //Object.assign(cells1[i], cells2[i]);
        try {
//          cells1[j].textContent = cells2[j].textContent; //todo copy not only text

          if (j < this.props.frozenCols) {
//            cells1[j].style.cssText = this.table2Ref.rows[0].cells[j].style.cssText;
            cells1[j].height = `${this.headerHeight + 3}px`; //todo remove hard code
            cells1[j].width = `${this.table2Ref.rows[1].cells[j].offsetWidth}px`;
          } else {
            cells1[j].width = `${this.table2Ref.rows[1].cells[j].offsetWidth}px`;
//            cells1[j].height = `${this.headerHeight}px`;
          }
        } catch (e) {
          console.log(e);
        }
      }

      if (this.state.scrollWidth === undefined)
        this.setState({scrollWidth: this.table2Ref.offsetWidth + this.offsetLeft});
    }
  }


  handleResize = () => {
    this.setState({winWidth: window.innerWidth});
    //this.setState({scrollWidth: undefined});
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  setFrozenFeatures(enabled) {
    this.offsetLeft = 0;
    if (enabled) {
      //set frozen cols
      for (let j= 0; j < this.props.frozenCols; ++j) {
        let colWidth = this.table2Ref.rows[1].cells[j].offsetWidth;
        // if (this.table1Ref.rows[0] && this.table1Ref.rows[0].cells[0])
        //   this.table1Ref.rows[0].cells[j].classList.add('frozen-col');
        for(let i = 0; i < this.table2Ref.rows.length; ++i) {
          let cell = this.table2Ref.rows[i].cells[j];
          cell.classList.add('frozen-col');

          if (i >= this.headRowsNumber)
            cell.classList.add('frozen-col-temp');
          cell.style.setProperty('width', `${colWidth}px`);
          cell.style.setProperty('left', `${this.offsetLeft}px`);
        }
        this.offsetLeft += colWidth;
      }

    } else {
      //remove frozen cols
      console.log('remove all')
      for (let j= 0; j < this.props.frozenCols; ++j) {
        if (this.table1Ref.rows[0] && this.table1Ref.rows[0].cells[0])
          this.table1Ref.rows[0].cells[j].classList.remove('frozen-col');
        for (let i = 0; i < this.table2Ref.rows.length; ++i) {
          let cell = this.table2Ref.rows[i].cells[j];
          cell.classList.remove('frozen-col')
          cell.classList.remove('frozen-col-temp');
          cell.style.removeProperty('width');
          cell.style.removeProperty('left');
        }
      }
    }
  }

  setFrozenFeature(cell, enabled) {

  }

  handleTableScroll = (e) => {
    this.div1Ref.scrollLeft = e.nativeEvent.target.scrollLeft ;
    this.divTopScrollRef.scrollLeft = e.nativeEvent.target.scrollLeft;
    this.div2Ref.scrollLeft = e.nativeEvent.target.scrollLeft;
  }


  getArray = () => {
    //console.log(this.state.colNumbers);
    let res = Array(this.state.colNumbers);
    for(let i = 0; i < this.state.colNumbers; ++i) {
      res[i] = '';
    }
    return res;
  }

  tempHandle = (chStateEl) => {
    if (this.state.chStateEl !== chStateEl) {
      this.setFrozenFeatures(false);
      console.log('frozen updated')
      this.setState({chStateEl: chStateEl})
      this.componentDidMount()
      //this.table2Ref = this.div2Ref.children[0];
      this.state.scrollWidth = undefined
    }

  };

  chProps = {onCng: this.tempHandle};

  render() {
    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { onCng: this.tempHandle })
    );

    return (
      <div style={this.props.style}>
        <div className="sticky"  style={{zIndex:111}}>
          <div style={{position:'relative'}}>

            <div ref = {el=>this.div1Ref=el} style={{overflowX: "hidden", paddingLeft:this.offsetLeft}}>
              <table ref={el => this.table1Ref = el} className="table-bordered table-sm" style={{tableLayout: 'fixed'}}>
                <thead>
                {/*<tr >*/}
                  {/*{this.getArray().map((item, index) =>*/}
                    {/*<th key={'c11_'+index} >{item}</th>*/}
                  {/*)}*/}
                {/*</tr>*/}

                </thead>

                <tbody>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div style={{position:'relative'}}>

          <div className="hide-scroll" ref = {el=>this.div2Ref=el} style={{overflowX: "auto", paddingLeft:this.offsetLeft, overflowY:'hidden', marginTop:`-${this.headerHeight}px`}} onScroll={this.handleTableScroll}>
            {childrenWithProps}
          </div>
          <div ref = {el=>this.divTopScrollRef=el} style={{overflowX: "auto", position:'sticky', bottom:0}} onScroll={this.handleTableScroll}>
            <div style={{height: 1, width:this.state.scrollWidth}}></div>
          </div>
        </div>
      </div>
    )
  }


}

export default FrozenTable;
