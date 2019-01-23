import React, { Component } from 'react';
import ColorTable from "../../../views/components/ColorTable";
import {getJsonFromOlapApi} from "../../../api/response-handle";
import model from "./salesConeModel";
import DoubleScrollbar from 'react-double-scrollbar';
import {
  FormGroup,
  Label,
  Input,
  Popover,
  PopoverHeader,
  PopoverBody,
  Button,
  Collapse,
  Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap';
import ReactExport from 'react-data-export';
import FrozenTable from "../../components/FrozenTable/FrozenTable";
import PropTypes from "prop-types";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const EventTypes = {LOADING: 1, ERROR:2, NO_DATA:3, FILTER_ERROR:4};

class SalesConeTableContainer extends Component {
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
        filters: SalesConeTableContainer.checkFilters(props.filters) ? props.filters : null,
      };
    }
    return null;
  }

  handleResize = () => { //todo move to FrozenTable
    this.setState({refresh: true});
  }

  //todo move to filter block
  static checkFilters (filters) {
    let vals = (new Map(filters.filterArray)).get('[Товары].[Товары]');
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
        text = <span className="text-danger">Нет ограничения по сегменту/категории</span>;
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
        <Row>
          <Col ms="10"><h5 style={{position:"absolute", bottom:"0", marginBottom:"2px"}}>Данные по КУП за три полных недели:</h5></Col>
          <Col ms="1" >
            <ExcelFile element={<Button color="primary" className="float-right" filename = "Воронка продаж" ><i className="icon-cloud-download"></i></Button>}>
              <ExcelSheet dataSet={this.multiDataSet} name="Organization"/>
            </ExcelFile>
          </Col>
        </Row>
          <Row>
            <Col className="cccdouble-scroll" style={{paddingTop:4}}>
        {/*<DoubleScrollbar >*/}
              <FrozenTable>
                <ColorTable data={this.state.data} {...this.props}  />
              </FrozenTable>;
        {/*</DoubleScrollbar>*/}
            </Col>
          </Row>
        </div>
      )
    }
}

export default SalesConeTableContainer;
