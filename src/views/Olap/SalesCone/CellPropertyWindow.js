import React, { Component } from 'react';
import {
  Popover,
  PopoverHeader,
  PopoverBody,
  Button,
} from 'reactstrap';
import LoadingWrappedView from "../../components/LoadingWrappedView";


class CellPropertyWindow  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.property,
      addValues: null
    };

  }

  componentWillReceiveProps(props) {
    console.log("propsss ", props.option);
    if (props.isOpen) {
    props.property.serverValuesPromise.then((data) => {
      this.setState({addValues: data});
    });
  }
    this.setState({data: props.property, addValues:{}});
  }

  render () {
    let data = this.state.data;
    let addValues = this.state.addValues;

    return (
      <div>
        {data.cellId && this.props.isOpen && <Popover placement="top" isOpen={this.props.isOpen}
                                                 target={data.cellId} toggle={this.props.toggle}>
          <PopoverHeader>Свойства значения</PopoverHeader>
          <PopoverBody>
            <div>КУП: {data.КУП}</div>
            <div>Отклонение: {data['Отклонение %']}%</div>
            {addValues &&
            <div>
              <div><span>Цена продажи: </span><span>{addValues['Цена продажи']}</span></div>
              <div>Сумма продажи: {addValues['Сумма продажи']}</div>
              <div>Маржа: {addValues['Маржа %']}%</div>
              <div>Остаток: {addValues['Остаток']}</div>
            </div>
            }
            <hr/>

            <Button block color="link" onClick={data.onDynamicClick}>Динамика КУП</Button>
          </PopoverBody>
        </Popover>
        }
      </div>
    )
  }
}


export default CellPropertyWindow;
