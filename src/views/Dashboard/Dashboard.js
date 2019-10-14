import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Badge,
    Button,
    ButtonDropdown,
    ButtonGroup,
    ButtonToolbar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Progress,
    Row,
    Table,
    Container,
    Jumbotron,
} from 'reactstrap';
//import Widget03 from '../../views/Widgets/Widget03'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { Link } from 'react-router-dom';
import Widget02 from '../../Widgets/Widget02';
import ActualityWidget from "../Olap/Actuality/ActualityWidget";

const brandPrimary = getStyle('--primary');
const brandSuccess = getStyle('--success');
const brandInfo = getStyle('--info');
const brandWarning = getStyle('--warning');
const brandDanger = getStyle('--danger');

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

        this.state = {
            dropdownOpen: false,
            radioSelected: 2,
        };
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
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6" lg="3">
                        <ActualityWidget />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <Jumbotron>
                                    <h1 className="display-3">
                                        Воронка продаж
                                    </h1>
                                    <p className="lead">
                                        Отчет показывает уровень приобретения
                                        товаров по магазинам и сети в целом,
                                        выраженный в виде количества условных
                                        покупателей в неделю.
                                    </p>
                                    <hr className="my-2" />
                                    <p>
                                        Отчет используется коммерческим
                                        департаментом.
                                    </p>
                                    <p className="lead">
                                        <Link
                                            to="/olap/sales-cone"
                                            className="btn btn-primary"
                                        >
                                            Открыть
                                        </Link>
                                    </p>
                                </Jumbotron>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <CardBody>
                                <Jumbotron>
                                    <h1 className="display-3">
                                        Ежедневная выручка
                                    </h1>
                                    <p className="lead">
                                        В отчете собранны все основные
                                        показатели по сети и магазинам,
                                        необходимые для ежедневного анализа
                                        дейтельности компании.
                                    </p>
                                    <hr className="my-2" />
                                    <p>
                                        Отчет предназначен для служб,
                                        ответственных за выполнение основных
                                        показателей по магазинам.
                                    </p>
                                    <p className="lead">
                                        <Link
                                            to="/olap/daily-revenue"
                                            className="btn btn-primary"
                                        >
                                            Открыть
                                        </Link>
                                    </p>
                                </Jumbotron>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Dashboard;
