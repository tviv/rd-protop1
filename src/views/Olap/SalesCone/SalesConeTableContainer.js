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

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class SalesConeTableContainer extends Component {
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
    if (this.state.data === null) {
      this.refreshData();
    }
    console.log(this.state);
    if (this.mRef) console.log(this.mRef);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.filters !== state.filters) {
      return {
        data: null,
        filters: props.filters,
      };
    }
    return null;
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
      this.reqId = model.getData(this.props.filters).then((data) => {
        this.reqId = null;
        this.multiDataSet = this.getDownloadData(data);
        this.setState({
          loading: false,
          data: data,
        });

      })
        .catch((err) => {
          this.reqId = null;
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



  render () {
    if (this.state.data === null) {
     return <div  style={{minHeight:'400px'}}>Загрузка...</div>
    } else if (typeof this.state.data === 'string') {
      return <div  style={{minHeight:'400px'}} className="text-danger">Ошибка: {this.state.data}</div>;
    } else if ((this.state.data.rows ? this.state.data.rows.length : 0) === 0) {
      return <div style={{minHeight:'400px'}} className="text-info">Нет данных по запросу</div>;
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
            <Col className="double-scroll">
        <DoubleScrollbar >
          <ColorTable data={this.state.data} {...this.props} ref = {el=>this.mRef=el}/>
        </DoubleScrollbar>
            </Col>
          </Row>
        </div>
      )
    }
}

export default SalesConeTableContainer;
