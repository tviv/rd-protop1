import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
//import Widget03 from '../../views/Widgets/Widget03'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import model from "./salesConeModel";

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')
const colorArray = ['#FF6633', '#FF33FF', '#00B3E6',
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 200));
  data3.push(65);
}

const mainChart = {
  labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  datasets: [
    {
      label: 'КУП',
      backgroundColor: 'transparent',
      borderColor: colorArray[0],
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1,
    },
    {
      label: 'М 101',
      backgroundColor: 'transparent',
      borderColor: colorArray[2],
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data2,
    },
  ],
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: true,
  legend: {
    display: true,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    // yAxes: [
    //   {
    //     ticks: {
    //       beginAtZero: true,
    //       maxTicksLimit: 5,
    //       stepSize: Math.ceil(250 / 5),
    //       max: 250,
    //     },
    //   }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

class CompaireShopConesChart extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      height:300,
      loading: true,
      error: '',
      filters: props.filters
    };


  }

  data = {};

  refreshData = (filter) => {
    this.data = {};
    this.setState({
      loading: true,
      error: null
    });

    model.getDynamicCUPData(filter).then((data) => {
      this.data = data;
      data.datasets.forEach((item, index)=>{
        console.dir(item);
          item.backgroundColor = 'transparent';
          item.borderColor = colorArray[index];
          item.pointHoverBackgroundColor = '#fff';
          item.borderWidth = index === 0 ? 4 : 2;
          item.pointRadius = index === 0 ? 4 : 2;
      });
      this.setState({
        loading: false,
      });
    })
      .catch((err) => {
        this.setState({
          error: err
        });
      });
  }

  componentWillReceiveProps(props) {
    //console.log(props.option);
    this.refreshData(props.option.dynamicCUPdataFilter);
  }

  updateDimensions(){
    //console.log("Height is:"+this.state.height);
    let height= 0;
    this.setState({height:height});
  }
  componentWillMount(){


    //this.updateDimensions.bind(this);
  }

  componentDidMount(){
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  render() {

    return (
      <div className="animated fadeIn" >
        <Row>
          <Col>
            {/*<Card>*/}
              {/*<CardBody>*/}
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">{this.props.option.goodName}</CardTitle>
                  </Col>
                  {/*<Col sm="7" className="d-none d-sm-inline-block">*/}
                    {/*<ButtonToolbar className="float-right" aria-label="Toolbar with button groups">*/}
                      {/*<ButtonGroup className="mr-3" aria-label="First group">*/}
                        {/*<Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.radioSelected === 1}>Day</Button>*/}
                        {/*<Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2)} active={this.state.radioSelected === 2}>Month</Button>*/}
                        {/*<Button color="outline-secondary" onClick={() => this.onRadioBtnClick(3)} active={this.state.radioSelected === 3}>Year</Button>*/}
                      {/*</ButtonGroup>*/}
                    {/*</ButtonToolbar>*/}
                  {/*</Col>*/}
                </Row>
                <div className="chart-wrapper"  >
                  <Line data={this.data} options={mainChartOpts} height={100} />
                </div>
              {/*</CardBody>*/}
            {/*</Card>*/}
          </Col>
        </Row>

      </div>
    );
  }
}

export default CompaireShopConesChart;
