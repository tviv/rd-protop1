import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Col,
    Row,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import model from './salesConeModel';
import LoadingWrappedView from '../../components/LoadingWrappedView';

const colorArray = [
    '#00E680',
    '#E666FF',
    '#3366E6',
    '#00B3E6',
    '#E6B333',
    '#3366E6',
    '#999966',
    '#99FF99',
    '#B34D4D',
    '#80B300',
    '#809900',
    '#E6B3B3',
    '#6680B3',
    '#66991A',
    '#FF99E6',
    '#CCFF1A',
    '#FF1A66',
    '#E6331A',
    '#33FFCC',
    '#66994D',
    '#B366CC',
    '#4D8000',
    '#B33300',
    '#CC80CC',
    '#66664D',
    '#991AFF',
    '#E666FF',
    '#4DB3FF',
    '#1AB399',
    '#E666B3',
    '#33991A',
    '#CC9999',
    '#B3B31A',
    '#00E680',
    '#4D8066',
    '#809980',
    '#E6FF80',
    '#1AFF33',
    '#999933',
    '#FF3380',
    '#CCCC00',
    '#66E64D',
    '#4D80CC',
    '#9900B3',
    '#E64D66',
    '#4DB380',
    '#FF4D4D',
    '#99E6E6',
    '#6666FF',
    '#E6FF80',
    '#1AFF33',
    '#999933',
    '#FF3380',
    '#CCCC00',
    '#66E64D',
    '#4D80CC',
    '#9900B3',
    '#E64D66',
    '#4DB380',
    '#FF4D4D',
    '#99E6E6',
    '#6666FF',
];
// Main Chart

//Random Numbers
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const mainChartOpts = {
    tooltips: {
        enabled: false,
        custom: CustomTooltips,
        intersect: true,
        mode: 'index',
        position: 'nearest',
        callbacks: {
            labelColor: function(tooltipItem, chart) {
                return {
                    backgroundColor:
                        chart.data.datasets[tooltipItem.datasetIndex]
                            .borderColor,
                };
            },
        },
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
            },
        ],
        yAxes: [
            {
                id: 'yLeft',
                type: 'linear',
                position: 'left',
            },
            {
                id: 'yRight',
                type: 'linear',
                position: 'right',
                scaleLabel: {
                    labelString: 'Дни',
                    display: true,
                },
                gridLines: {
                    drawOnChartArea: false,
                },
                ticks: {
                    max: 7,
                    min: 0
                }
            }
        ]
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
            height: 300,
            loading: true,
            error: '',
            filters: props.filters,
        };
    }

    data = {};

    refreshData = filter => {
        this.data = {};
        this.setState({
            loading: true,
            error: null,
        });

        model
            .getDynamicCUPData(filter)
            .then(data => {
                this.data = data;
                data.datasets.forEach((item, index) => {
                    console.dir(item);
                    item.backgroundColor = 'transparent';
                    item.borderColor = colorArray[index];
                    item.pointHoverBackgroundColor = '#fff';
                    item.borderWidth = index === 1 ? 5 : 2;
                    item.pointRadius = index === 1 ? 4 : 2;
                    item.type = 'line';
                    item.order = index;

                    if (index === 0) { //Day without sales
                        item.type = 'bar';
                        item.backgroundColor = '#f0453b22';
                        item.borderWidth = 0;
                        item.yAxisID ='yRight';
                        item.categoryPercentage = 0.5;

                    }
                });
                this.setState({
                    loading: false,
                });
            })
            .catch(err => {
                this.setState({
                    error: err,
                });
            });
    };

    componentWillReceiveProps(props) {
        //console.log(props.option);
        props.option && props.option != this.props.option && this.refreshData(props.option.dynamicCUPdataFilter);
    }

    updateDimensions() {
        //console.log("Height is:"+this.state.height);
        let height = 0;
        this.setState({ height: height });
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions.bind(this));
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
        return this.props.option && (
                (
                    <div className="animated fadeIn">
                        <Row>
                            <div className="ml-3">
                                <strong>{this.props.option.goodName}</strong>
                            </div>
                        </Row>
                            <Row>
                                <Col className="chart-wrapper">
                                    <LoadingWrappedView loading={this.state.loading}>
                                        <Bar
                                            data={this.data}
                                            options={mainChartOpts}
                                            height={100}
                                        />
                                    </LoadingWrappedView>
                                </Col>
                            </Row>
                    </div>
                )
        )
    }
}

export default CompaireShopConesChart;
