import React, { Component } from 'react';
import axios from "../AxiosConfig.js";
import { connect } from 'react-redux';
import { logIn } from "../actions/index";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';

const sha1 = require("sha1");

const initialState = {
    username: "",
    password: ""
}

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
    }

    login = (e) => {
        e.preventDefault();

        let error = false;

        if (!this.state.username) {
            error = true;
        }

        if (!this.state.password) {
            error = true;
        }

        if (!error) {
            axios.post(`api/user/login`, {...this.state, password: sha1(this.state.password)})
                .then(res => {
                    if (res.data.status === 200) {
                        this.props.logIn(this.state.username);
                    } else {
                        alert(res.data.message);
                    }
                })
                .catch(errs => {
                    window.al(errs);
                });
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col sm="9" md="7" lg="5" className="mx-auto">
                        <Card className="my-5">
                            <Card.Header>
                                <h3 >Login</h3>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={this.login}>
                                    <Form.Group>
                                        <Form.Label>Usuário</Form.Label>
                                        <Form.Control type="text" placeholder="Usuário" autoFocus value={this.state.username} onChange={(e) => this.setState({ username: e.target.value } )} />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Senha</Form.Label>
                                        <Form.Control type="password" placeholder="Senha" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value } )} />
                                    </Form.Group>

                                    <Button variant="outline-success" type="submit">
                                        Login
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = store => ({
    state: store
});

export default connect(mapStateToProps, { logIn })(Login);
