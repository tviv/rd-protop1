import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    ButtonDropdown,
} from 'reactstrap';
import ReactExport from 'react-data-export';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

interface Props {
    downloadOptions: Array<String>;
    getDownloadDataPromise: (Number) => Promise<any>;
}

class ExcelDownloadButton extends Component<Props> {
    static defaultProps = {
        downloadOptions: [],
    };

    state = {
        dwnlFileMenu: false,
        downloadChoice: -1,
        isLoading: false,
        data: null,
    };

    onDownloadClick = itemIndex => {
        //this.setState({ downloadChoice: itemIndex });
        this.setState({ isLoading: true });
        this.props
            .getDownloadDataPromise(itemIndex)
            .then(data => {
                this.setState({
                    isLoading: false,
                    data: data,
                });
            })
            .catch(e => {
                this.setState({
                    isLoading: false,
                    data: null,
                });
            });
    };

    getDownloadDataff = () => {};

    render() {
        const { downloadOptions } = this.props;
        const { isLoading, data } = this.state;
        this.state.data = null;

        const innerContent = !isLoading ? (
            <i className="icon-cloud-download" />
        ) : (
            <i className="spinner-border spinner-border-sm mr-1" />
        );

        let defaultBlock = (
            <Button
                color="primary"
                disabled={isLoading}
                onClick={() => this.onDownloadClick(0)}
            >
                {innerContent}
            </Button>
        );

        let optionsBlock = (
            <ButtonDropdown
                id="dwnlFileMenu"
                isOpen={this.state.dwnlFileMenu}
                toggle={() => {
                    this.setState({
                        dwnlFileMenu: !this.state.dwnlFileMenu,
                    });
                }}
            >
                <DropdownToggle caret color="primary" disabled={isLoading}>
                    {innerContent}
                </DropdownToggle>
                <DropdownMenu right>
                    {downloadOptions.map((item, index) => (
                        <DropdownItem
                            key = {index}
                            onClick={() => this.onDownloadClick(index)}
                        >
                            {item}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </ButtonDropdown>
        );

        return (
            <div>
                {downloadOptions.length ? optionsBlock : defaultBlock}

                {data && (
                    <ExcelFile hideElement={true}>
                        <ExcelSheet dataSet={data} name="Sheet 1" />
                    </ExcelFile>
                )}
            </div>
        );
    }
}

export default ExcelDownloadButton;
