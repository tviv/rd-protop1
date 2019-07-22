import React, { Component } from 'react';
import DimensionSelect from '../../components/multiselect/DimensionSelect/DimensionSelect'
import {
  FormGroup,
  Label,
  Input,
  Popover,
  PopoverHeader,
  PopoverBody,
  Button,
  Collapse,
   Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { AppSwitch } from '@coreui/react'

class FilterContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false
    };
  }

  toggleHide = () => {
    this.setState({ collapse: !this.state.collapse });
  }


  render() {
    return  (
      <div  style = {{position:"relative", zIndex: 300}}>
        <div>
          <div className="card-header-actions">
            <a className="card-header-action btn btn-minimize" data-target="#collapseFilter" onClick={this.toggleHide}><i className={!this.state.collapse ? "icon-arrow-up" : "icon-arrow-down"}></i></a>
          </div>
        </div>
        <Row>
          <Col>
        <Collapse isOpen={!this.state.collapse} id="collapseFilter">
          {this.props.children}
        </Collapse>
          </Col>
        </Row>
      </div>
    )
  }
}

export default FilterContainer;
