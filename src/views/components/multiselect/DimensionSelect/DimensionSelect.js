import React, { Component } from 'react';
import DropdownTreeSelect from '../../../../outer/DropdownTreeSelect/index'
import 'react-dropdown-tree-select/dist/styles.css'
import './style.css'
import {getJsonFromOlapApi} from "../../../../api/response-handle";
import classnames from "classnames";
import PropTypes from "prop-types";

class DimensionSelect extends Component {
  static propTypes = {
    simpleSelect: PropTypes.bool,
    disableToUpLevel: PropTypes.number,
    reverse: PropTypes.bool,
    ungroupLevels: PropTypes.arrayOf(PropTypes.number)
  }

  static defaultProps = {
    disableToLevel: -1,
    ungroupLevels: []
  }

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


  setDefaultVaules (data, level = 0) {
    let res = false
    //if (!this.props.getSelectedValues) return;
    let selected = this.props.getSelectedValues(this.props.hierarchyName) || [];

    if (selected || this.props.disableToLevel !== DimensionSelect.defaultProps.disableToLevel) {
      data.forEach(x => {
        x.checked = selected.includes(x.value);
        if (x.checked) res = true;
        //x.isDefaultValue = x.checked //it break selecting
        //x.expanded = true
        if (level <= this.props.disableToLevel) x.uncheckable = true;
        this.mapValues.set(x.value, x);
        //x.originalEntity = x;
        if (x.children) {
          res = this.setDefaultVaules(x.children, level + 1)
          if (res) x.expanded = true;
        }
      })
    }
    return res;
  }

  ungroup(data, ungroupElement, destinationElement) {

    if (ungroupElement.children) {
      ungroupElement.children.forEach(x=>{
        destinationElement.push(x)
      })
    }

    const ungroupElementIndex = destinationElement.lastIndexOf(ungroupElement) //now for all our cases we can use it without recurse
    if (ungroupElementIndex > -1)
      destinationElement.splice(ungroupElementIndex, 1)

    return data
  }

  refreshData () {
    let restrictiion = {hierarchyName: this.props.hierarchyName};
    if (this.props.maxLevel) restrictiion.maxLevel = this.props.maxLevel;
    restrictiion.reverse = true
    getJsonFromOlapApi('/api/olap/dim', restrictiion).then((response) => {
      if (response.length > 0) response[0].expanded = true;
       this.setDefaultVaules(response);
       //this.props.forEach(x=>this.ungroup(response, response[x], response))
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
    return <DropdownTreeSelect ref={el=>this.myRef=el} simpleSelect={this.props.simpleSelect} keepTreeOnSearch = {true} showPartiallySelected = {true} noMatchesText = "нет соответствия" placeholderText={this.state.placeholderText} data={this.state.data}
                               onChange={this.handleChange} onAction={this.onAction} onNodeToggle={this.onNodeToggle} className={"dim-select " + this.tempUniqClassName}
                               forceCloseDropDown = {this.props.forceCloseDropDown} />
  }
}

export default DimensionSelect;
