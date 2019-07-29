import React, { Component } from 'react';
import { FormGroup, Row, Col } from 'reactstrap';
import model from './salesConeModel';
import SalesConeFilter from './SalesConeFilter';
import SalesConeTableContainer from './SalesConeTableContainer';
import CellPropertyWindow from './CellPropertyWindow';

class SalesConeTableView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filters: model.filters,
            cellId: null,
        };
    }

    defaultValues = new Map(model.filters.filterArray);

    handleChangeFilter = filterMap => {
        if (filterMap) {
            model.filters.filterArray =
                filterMap instanceof Map
                    ? Array.from(filterMap.entries())
                    : filterMap;
        }
        this.setState({
            filters: Object.assign({}, model.filters), //to recognise that child component table must be update
            stopFilterSelection: false,
        });
    };

    handleCellClick = cellId => {
        if (model.getCellById(cellId).x < 2) return; //todo temp decision, because absolute position brakes down
        this.setState({
            popoverOpen:
                this.state.cellId === cellId ? !this.state.popoverOpen : true,
            cellId: cellId,
        });
    };

    onDynamicClick = e => {
        this.setState({
            popoverOpen: false,
        });
        let option = model.getDataCellPropertyById(this.state.cellId);

        this.props.config.showDynamicCUP(option);
    };

    handlePopupWindowToggle = () => {
        this.setState({
            popoverOpen: false,
        });
    };

    handleRefreshTable = () => {
        this.setState({ stopFilterSelection: true });
    };

    render() {
        return (
            <div>
                <Row>
                    <Col xs="12" lg="12">
                        <FormGroup>
                            <SalesConeFilter
                                onChange={this.handleChangeFilter}
                                defaultValues={this.defaultValues}
                                style={{ position: 'relative', zIndex: 300 }}
                                stopFilterSelection={
                                    this.state.stopFilterSelection
                                }
                            />
                            <SalesConeTableContainer
                                filters={this.state.filters}
                                onCellClick={this.handleCellClick}
                                cellId={this.state.cellId}
                                onRefresh={this.handleRefreshTable}
                            />
                            <CellPropertyWindow
                                property={{
                                    cellId: this.state.cellId,
                                    ...model.getDataCellPropertyById(
                                        this.state.cellId
                                    ),
                                    onDynamicClick: this.onDynamicClick,
                                }}
                                isOpen={this.state.popoverOpen}
                                toggle={this.handlePopupWindowToggle}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row />
            </div>
        );
    }
}

export default SalesConeTableView;
