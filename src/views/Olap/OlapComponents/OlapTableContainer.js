import React, { Component } from 'react';
import ColorTable from '../../components/ColorTable/ColorTable';
import {
    Col,
    Row,
} from 'reactstrap';
import ReactExport from 'react-data-export';
import FrozenTable from '../../components/FrozenTable/FrozenTable';
import ExcelDownloadButton from '../../components/ExcelDownloadButton';
import PropTypes from 'prop-types';

import { FETCH_ERROR } from 'ra-core';
import { connect } from 'react-redux';

const fetchError = error => ({
    type: FETCH_ERROR,
    error,
});


const EventTypes = { LOADING: 1, ERROR: 2, NO_DATA: 3, FILTER_ERROR: 4 };

class OlapTableContainer extends Component {
    static propTypes = {
        onRefresh: PropTypes.func,
        title: PropTypes.string.isRequired,
        model: PropTypes.object.isRequired,
        checkFilters: PropTypes.func,
        onExpand: PropTypes.func,
        frozenCols: PropTypes.number,
        downloadOptions: PropTypes.arrayOf(PropTypes.string),
    };

    static defaultProps = {
        onRefresh: () => {},
        checkFilters: () => undefined,
        downloadOptions: [],
    };

    constructor(props, model, addProps) {
        super(props);

        this.model = props.model;
        this.delayInterval = 0;
        this.addProps = addProps;

        this.state = {
            error: '',
            data: null, //{headerColumns:['dd dfdd', 'bbbb dd'], rows: [[{label: '343', cellId: '33', background: '#A6CAF0'}, {label: '22', cellId: '22'}]]},
        };
    }

    componentDidMount() {
        this.refreshData();
        this.delayInterval = 3000;
        //window.addEventListener("resize", this.handleResize); //todo temp
    }

    componentWillUnmount() {
        //window.removeEventListener("resize", this.handleResize);
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
            this.setState({ refresh: false });
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
            let filterErrorText = props.checkFilters(props.filters);
            return {
                data: null,
                filters: filterErrorText === undefined ? props.filters : null,
                filterErrorText: filterErrorText,
            };
        }
        return null;
    }

    // handleResize = () => { //todo move to FrozenTable
    //   this.setState({refresh: true});
    // }
    //
    refrCount = 0;
    refreshData() {
        this.refrCount++;
        if (this.timeout) clearTimeout(this.timeout);
        // if (this.reqId) {
        //   console.log(`cancel = ${this.reqId}`);
        //   this.reqId.cancel();
        //   this.reqId = null;
        // }
        this.timeout = setTimeout(() => {
            this.timeout = null;
            this.multiDataSet = null;
            if (!this.state.filters) return; //todo move into the filter block
            this.reqId = this.model
                .getMainData(this.props.filters)
                .then(data => {
                    this.model.data = data;
                    const cur = this.reqId && this.reqId.refrCount;
                    if (cur != this.refrCount) {
                        this.reqId = null;
                        return;
                    }
                    this.reqId = null;
                    this.state.data = data;
                    this.props.onRefresh();
                    //this.mRef.focus();
                    //this.multiDataSet = this.getDownloadData(data);
                    this.setState({
                        loading: false,
                    });
                })
                .catch(err => {
                    this.reqId = null;
                    this.props.onRefresh();
                    this.setState({
                        data: err.toString(),
                    });
                    this.props.fetchError(err);
                });
            if (this.reqId) this.reqId.refrCount = this.refrCount;
        }, this.delayInterval);
    }

    multiDataSet = [];
    getDownloadData(data) {
        if (this.state.downloadChoice >= 0) {
            this.setState({ downloadChoice: -1 });
        }
        return this.model.convertDataToExcelFormat(data);
    }

    getMessageBox = (eventType, t_text) => {
        let icn, text;
        switch (eventType) {
            case EventTypes.LOADING:
                icn = (
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                );
                text = <h6>Загрузка...</h6>;
                break;

            case EventTypes.ERROR:
                icn = <i className="fa fa-cogs text-danger fa-3x" />;
                text = (
                    <span className="text-danger">{`Ошибка: ${t_text}`}</span>
                );
                break;

            case EventTypes.NO_DATA:
                icn = <i className="fa fa-frown-o text-info fa-3x" />;
                text = <span className="text-info">Нет данных по запросу</span>;
                break;

            case EventTypes.FILTER_ERROR:
                icn = <i className="fa fa-frown-o text-danger fa-3x" />;
                text = (
                    <span className="text-danger">
                        {this.state.filterErrorText}
                    </span>
                );
                break;
        }

        let res = (
            <Row className="text-center" style={{ height: '400px' }}>
                <Col style={{ top: '25%' }}>
                    {icn}
                    <br /> {text}
                </Col>
            </Row>
        );

        return res;
    };

    onRequestToDownloadData = index => {
        return this.model.getExcelToDownload(index);
    };

    render() {
        let { downloadOptions } = this.props;

        if (this.state.refresh) {
            return this.getMessageBox(EventTypes.LOADING);
        } else if (!this.state.filters) {
            return this.getMessageBox(EventTypes.FILTER_ERROR);
        } else if (this.state.data === null) {
            return this.getMessageBox(EventTypes.LOADING);
        } else if (typeof this.state.data === 'string') {
            return this.getMessageBox(EventTypes.ERROR, this.state.data);
        } else if (
            (this.state.data.rows ? this.state.data.rows.length : 0) === 0
        ) {
            return this.getMessageBox(EventTypes.NO_DATA);
        } else
            return (
                <div>
                    <Row>
                        <Col ms="10">
                            <h5
                                style={{
                                    position: 'absolute',
                                    bottom: '0',
                                    marginBottom: '2px',
                                }}
                            >
                                {this.props.title}:
                            </h5>
                        </Col>
                        <Col ms="1">
                            <div className="float-right">
                                <ExcelDownloadButton
                                downloadOptions={downloadOptions}
                                getDownloadDataPromise={this.onRequestToDownloadData}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ paddingTop: 4 }}>
                            {/*<DoubleScrollbar >*/}
                            <FrozenTable frozenCols={this.props.frozenCols}>
                                <ColorTable
                                    data={this.state.data}
                                    valueColumnsOffset={3}
                                    {...this.props}
                                />
                            </FrozenTable>
                            {/*</DoubleScrollbar>*/}
                        </Col>
                    </Row>
                </div>
            );
    }
}

export default connect(
    undefined,
    { fetchError }
)(OlapTableContainer);
