import React, { Component } from 'react';
import DropdownTreeSelect from '../../../outer/DropdownTreeSelect'
//import 'react-dropdown-tree-select/dist/styles.css'
import './style.css'
import {getJsonFromOlapApi} from "../../../api/response-handle";
import classnames from "classnames";

class DimensionSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      placeholderText: '...',
      hideSearch: false
    }
  }

  tempUniqClassName = '_' + Math.random().toString(36).substr(2, 9); //for outside event
  mapValues = new Map();

  // shouldComponentUpdate() {
  //   return this.state.data.length == 0;
  // }


  componentDidMount () {
    this._defaultClassName = this.myRef.node.className;
    this.refreshData();
    this.setHiddenOfSearch(this.props.getSelectedValues(this.props.hierarchyName) && true)
  }

  // componentWillUpdate() {
  //   if (this.state.data)
  //     this.tree = this.myRef.state.tree;
  // }

    componentDidUpdate() {
    // if (this.tree) {
    //
    // } this.myRef.state.tree = this.tree;


  }

  setHiddenOfSearch(value) {
    if (!this.props.alwaysSearch)
      this.myRef.node.className=classnames({'hide-search':value}, this._defaultClassName);
  }


  setDefaultVaules (data) {
    //if (!this.props.getSelectedValues) return;
    let selected = this.props.getSelectedValues(this.props.hierarchyName) || [];

    if (selected) {
      data.forEach(x => {
        x.checked = selected.includes(x.value);
        this.mapValues.set(x.value, x);
        //x.originalEntity = x;
        if (x.children) {
          this.setDefaultVaules(x.children)
        }
      })
    }
  }

  refreshData () {
    let restrictiion = {hierarchyName: this.props.hierarchyName};
    if (this.props.maxLevel) restrictiion.maxLevel = this.props.maxLevel;
    getJsonFromOlapApi('/api/olap/dim2', restrictiion).then((response) => {
      if (response.length > 0) response[0].expanded = true;
       this.setDefaultVaules(response);
        this.setState({
          placeholderText: 'Выберите или введите...',
          data: response
        });
    }).catch((e)=> {
      this.setState({
        placeholderText: 'Ошибка загрузки',
        data: []
      });
    });
  }

   handleChange = (currentNode, selectedNodes) => {
      //console.log('handleChange::', currentNode, selectedNodes)
     this.mapValues.get(currentNode.value).checked = currentNode.checked;
      if (this.props.onChange) {
        this.props.onChange(this.props.hierarchyName, selectedNodes.map(x=>x.value));
      }
     this.setHiddenOfSearch(selectedNodes.length > 0);
  };


  render () {
    return <DropdownTreeSelect ref={el=>this.myRef=el} keepTreeOnSearch = {true} showPartiallySelected = {true} noMatchesText = "нет соответствия" placeholderText={this.state.placeholderText} data={this.state.data}
                               onChange={this.handleChange} onAction={this.onAction} onNodeToggle={this.onNodeToggle} className={"dim-select " + this.tempUniqClassName}
                               forceCloseDropDown = {this.props.forceCloseDropDown} />
  }
}

export default DimensionSelect;
