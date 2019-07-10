'use strict'

import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane, Button } from 'reactstrap';
import ColorTable from "../../../views/components/ColorTable";
import FrozenTable from "../../components/FrozenTable/FrozenTable";

import model from "./dailyRevenueModel";
import SalesConeTableContainer from "../SalesCone/SalesConeTableContainer";
import PropTypes from "prop-types";

const EventTypes = {LOADING: 1, ERROR:2, NO_DATA:3, FILTER_ERROR:4};

class DailyRevenueTableContainer extends Component {
  static propTypes = {
    onRefresh: PropTypes.func,
  }

  static defaultProps = {
    onRefresh: () => {}
  }

  constructor(props) {
    super(props);

    this.delayInterval = 0;

    this.state = {
      error: '',
      data: null //{headerColumns:['dd dfdd', 'bbbb dd'], rows: [[{label: '343', cellId: '33', background: '#A6CAF0'}, {label: '22', cellId: '22'}]]},
    }
  }


  componentDidMount () {
    this.refreshData();
    this.delayInterval = 3000;
    window.addEventListener("resize", this.handleResize); //todo temp
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  // componentWillReceiveProps(props) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props.filters !== prevProps.filters) {
  //   //if (!this.props.filters.applied) {
  //     this.setState ({data:null});
  //     this.refreshData();
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.refresh) {
      this.setState({refresh: false});
      return;
    }
    if (this.state.data === null) {
      this.refreshData();
    }
    //console.log(this.state);
    //if (this.refs.table) {console.log(this.refs.table); this.refs.table.focus();}
  }

  static getDerivedStateFromProps(props, state) {
    if (props.filters !== state.filters) {
      return {
        data: null,
        filters: DailyRevenueTableContainer.checkFilters(props.filters) ? props.filters : null,
      };
    }
    return null;
  }

  handleResize = () => { //todo move to FrozenTable
    this.setState({refresh: true});
  }

  //todo move to filter block
  static checkFilters (filters) {
    let vals = (new Map(filters.filterArray)).get('[Даты].[Месяцы]');
    return (vals && vals.length > 0 && !vals.includes('0'));

  }

  refreshData () {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(()=> {
      this.timeout = null;
      this.multiDataSet = null;
      if (this.reqId) {
        this.reqId.cancel;
        this.reqId = null;
      }
      if (!this.state.filters) return; //todo move into the filter block
      this.reqId = model.getData(this.props.filters).then((data) => {
        this.reqId = null;
        this.props.onRefresh();
        //this.mRef.focus();
        this.multiDataSet = this.getDownloadData(data);
        this.setState({
          loading: false,
          data: data,
        });

      })
        .catch((err) => {
          this.reqId = null;
          this.props.onRefresh();
          this.setState({
            data: err
          });
        });
    }, this.delayInterval);
  }

  multiDataSet = [];
  getDownloadData(data) {
    return model.convertDataToExcelFormat(data);

  };


  getMessageBox = (eventType, t_text) => {
    let icn, text;
    switch (eventType) {
      case EventTypes.LOADING:
        icn =
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>;
        text = <h6>Загрузка...</h6>;
        break;

      case EventTypes.ERROR:
        icn = <i className="fa fa-cogs text-danger fa-3x" />
        text = <span className="text-danger">{`Ошибка: ${t_text}`}</span>;
        break;

      case EventTypes.NO_DATA:
        icn = <i className="fa fa-frown-o text-info fa-3x" />
        text = <span className="text-info">Нет данных по запросу</span>;
        break;

      case EventTypes.FILTER_ERROR:
        icn = <i className="fa fa-frown-o text-danger fa-3x" />
        text = <span className="text-danger">Нет ограничения по дате</span>;
        break;
    }

    let res =
      <Row className="text-center" style={{height:'400px'}}>
        <Col style={{top:'25%'}}>
          {icn}<br /> {text}
        </Col>
      </Row>;

    return res;
  }


  render () {

    if (this.state.refresh) {
      return this.getMessageBox(EventTypes.LOADING);
    } else if (!this.state.filters) {
      return this.getMessageBox(EventTypes.FILTER_ERROR);
    } else if (this.state.data === null) {
      return this.getMessageBox(EventTypes.LOADING);
    } else if (typeof this.state.data === 'string') {
      return this.getMessageBox(EventTypes.ERROR, this.state.data);
    } else if ((this.state.data.rows ? this.state.data.rows.length : 0) === 0) {
      return this.getMessageBox(EventTypes.NO_DATA);
    } else
      return (
        <div>
          {/*<Row>*/}
            <FrozenTable>
              <ColorTable data={this.state.data} {...this.props}  />
            </FrozenTable>
          {/*</Row>*/}
        </div>
      )
  }
}


export default DailyRevenueTableContainer;
