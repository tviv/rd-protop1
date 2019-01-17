import React, { Component } from 'react';
import {
  Popover,
  PopoverHeader,
  PopoverBody,
  Button,
} from 'reactstrap';
import LoadingWrappedView from "../../components/LoadingWrappedView";


class CellPropertyWindow  extends Component {
    state = {
      data: this.props.property,
      addValues: null
    };


  componentWillReceiveProps(props) {
    //console.log("propsss ", props.option);
    if (props.isOpen) {
    props.property.serverValuesPromise.then((data) => {
      this.setState({addValues: data});
    })
      .catch((err) => {
        this.setState({addValues: err});
      });
  }
    this.setState({data: props.property, addValues:{}});
  }

  render () {
      let {data, addValues} = this.state;
      return (
        <div>
          {data.cellId && this.props.isOpen && <Popover placement="top" isOpen={this.props.isOpen}
                                                        target={data.cellId} toggle={this.props.toggle}>
            <PopoverHeader>Свойства значения</PopoverHeader>
            {typeof addValues === 'string' ? <div className="text-danger">Ошибка: {addValues}</div> :
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
            }
          </Popover>
          }
        </div>
      )
  }
}


export default CellPropertyWindow;
