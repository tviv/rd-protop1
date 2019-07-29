import React, { Component } from 'react';
import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
    Form,
} from 'reactstrap';
import { connect } from 'react-redux';
import { userLogin } from 'ra-core';

class Login extends Component {
    state = {
        username: '',
        password: '',
    };

    submit = e => {
        e.preventDefault();
        // gather your data/credentials here
        const credentials = { username: this.state.username, password: this.state.password };

        // Dispatch the userLogin action (injected by connect)
        this.props.userLogin(credentials);
    };

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };

    render() {
        return (
            <Form
                className="app flex-row align-items-center"
                onSubmit={this.submit}
            >
                <Container>
                    <Row className="justify-content-center">
                        <Col md="4">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <h1>Login</h1>
                                        <p className="text-muted">
                                            Введите учетные данные
                                        </p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                id="username"
                                                type="text"
                                                placeholder="Логин"
                                                onChange={this.handleChange}
                                            />
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="Пароль"
                                                onChange={this.handleChange}
                                            />
                                        </InputGroup>
                                        <Row>
                                            <Col xs="6" />
                                            <Col xs="6" className="text-right">
                                                <Button
                                                    color="primary"
                                                    className="px-4"
                                                    type="submit"
                                                >
                                                    Войти
                                                </Button>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </Form>
        );
    }
}

export default connect(
    undefined,
    { userLogin }
)(Login);
