import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { connect } from 'react-redux';
import axios from "../AxiosConfig.js";
import { read_cookie, delete_cookie } from 'sfcookies';
import { logIn, logOut } from "../actions/index";
import { Route } from "react-router-dom";

import Login from './Login';
import Usuario from "./Usuario";

class Home extends Component {
    constructor(props) {
        super(props)

        axios.interceptors.response.use(
            response => { return response; }, 
            error => {
                if (!error.response) {
                    return Promise.reject("Servidor desconectado!")
                } else if (error.response.data.status === 403) {
                    this.props.logOut();
                    return Promise.reject("Acesso negado!");
                } else if (error.response.data.status === 401) {
                    return Promise.reject("Acesso não autorizado!");
                }
                
                return Promise.reject(error.response.data)
            }
        )
  
        axios.interceptors.request.use(
            request => {
                return request;
            },
            error => {
                return Promise.reject(error.request.data);
            }
        )
    }

    logout = () => {
        if (read_cookie("api-token")) {
            delete_cookie("api-token");
    
            axios.post(`api/user/logout`).then(() => {
                this.props.logOut()
            }).catch(err => {
                console.log(err);
            });
        }
    }
  
    componentDidMount() {  
        axios.get("api/user/login",{}).then(response => {
            if (response.data.status === 200) {
                this.props.logIn(response.data.data)
            }
        })
    }

    render() {
        return (
            <div className="App">
            {this.props.user.isLoggedIn ?
                <div>
                    <Navbar bg="dark" variant="dark" expand="md">
                        <LinkContainer to="/">
                            <Navbar.Brand><FontAwesomeIcon icon="car-alt"/> App</Navbar.Brand>
                        </LinkContainer>
                        
                        <Navbar.Toggle aria-controls="navbar-app" />

                        <Navbar.Collapse id="navbar-app">
                            {
                                this.props.user.data.forms && this.props.user.data.forms.usuario ?
                                <Nav className="mr-auto">
                                    <LinkContainer to="/usuario">
                                        <Nav.Link>Usuário</Nav.Link>
                                    </LinkContainer>
                                </Nav>
                                :
                                (null)
                            }

                            <Nav>
                                <NavDropdown title={this.props.user.data.username} alignRight>
                                    <NavDropdown.Item onClick={this.logout}><FontAwesomeIcon icon="sign-out-alt"/>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>

                    <Container fluid className="mt-3">
                        <Route path="/usuario" render={(props) => this.props.user.data.forms && this.props.user.data.forms.usuario ? <Usuario {...props} permissions={this.props.user.data.forms.usuario} />  : "" } />
                    </Container>  
                </div>
                :
                <Login></Login>
                }
            </div> 
        )
    }
}

const mapStateToProps = store => ({
  user: store.user
})

export default connect(mapStateToProps, {logIn, logOut})(Home);