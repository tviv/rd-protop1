import React, { Component } from 'react';
import { Popover, PopoverHeader, PopoverBody, Button } from 'reactstrap';
import LoadingWrappedView from '../../components/LoadingWrappedView';

class CellPropertyWindow extends Component {
    state = {
        data: this.props.property,
        addValues: null,
    };

    componentWillReceiveProps(props) {
        //console.log("propsss ", props.option);
        if (props.isOpen) {
            props.property.serverValuesPromise
                .then(data => {
                    this.setState({ addValues: data });
                })
                .catch(err => {
                    this.setState({ addValues: err });
                });
        }
        this.setState({ data: props.property, addValues: null });
    }

    render() {
        let { data, addValues } = this.state;
        const { cellId, isOpen } = this.props;
        return (
            <div>
                {cellId && isOpen && (
                    <Popover
                        placement="left"
                        isOpen={isOpen}
                        target={cellId}
                        toggle={this.props.toggle}
                        trigger="legacy" delay={0}
                    >
                        <PopoverHeader>Свойства значения</PopoverHeader>
                        {typeof addValues === 'string' ? (
                            <div className="text-danger">
                                Ошибка: {addValues}
                            </div>
                        ) : (
                            <PopoverBody>
                                <div>КУП: {data.КУП}</div>
                                <div>Отклонение: {data['Отклонение %']}%</div>
                                {addValues && (
                                    <div>
                                        <div>
                                            <span>Цена продажи: </span>
                                            <span>
                                                {addValues['Цена продажи']}
                                            </span>
                                        </div>
                                        <div>
                                            Сумма продажи:{' '}
                                            {addValues['Сумма продажи']}
                                        </div>
                                        <div>
                                            Маржа: {addValues['Маржа %']}%
                                        </div>
                                        <div>
                                            Маржа план: {addValues['Плановый УВМ']}
                                        </div>
                                        <div>
                                            Остаток: {addValues['Остаток']}
                                        </div>
                                        <div>
                                            Оборачиваемость: {addValues['Оборачиваемость']}
                                        </div>
                                        <div>
                                            Сумма списания: {addValues['Сумма списания']}
                                        </div>
                                        <div>
                                            Списание к ТО: {addValues['Доля списания к ТО']}
                                        </div>
                                    </div>
                                )}
                                <hr />

                                <Button
                                    block
                                    color="link"
                                    onClick={data.onDynamicClick}
                                >
                                    Динамика КУП
                                </Button>
                            </PopoverBody>
                        )}
                    </Popover>
                )}
            </div>
        );
    }
}

export default CellPropertyWindow;
