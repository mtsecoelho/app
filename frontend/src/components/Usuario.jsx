import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Autocomplete from "./Autocomplete";
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from '../AxiosConfig';
import { cpfMask, dateMask, celphoneMask, telephoneMask } from './masks';

const sha1 = require("sha1");

const initialUsuario = { id: "" , address: "", active: "true", birthDate: "", name: "", password: "", username: "", cpf: "", celphone: "", telephone: "", email: ""}

class Usuario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: initialUsuario
        }
    }

    new = () => {
        this.setState({
            usuario: initialUsuario
        })
    }

    save = () => {
        if(window.confirm("Salvar Usuario?")) {
            axios.post("api/user/save", {...this.state.usuario, password: this.state.usuario.password.length === 40 ? this.state.usuario.password : sha1(this.state.usuario.password)}).then(response => {
                window.al(response.data.message)
                if (response.data.status === 200) this.setState({usuario: initialUsuario}) 
            }).catch(errs => {
                window.al(errs);
            })
        }
    }

    delete = () => {
        if (window.confirm("Remover Usuario?")) {
            axios.post("api/user/delete", this.state.usuario).then(res => {
                this.setState({
                    usuario: initialUsuario
                })
                window.al(res.data)
            }).catch(errs => {
                window.al(errs);
            })
        }
    }

    selectUsuario = usuario => {
        console.log(usuario)
        this.setState({
            usuario: usuario ? usuario : initialUsuario
        })
    }

    render() {
        return (
<           Card>
                <Card.Header>
                    <Row>
                        <Col xs="12" sm="4">
                            <h3 className="text-xs-center text-sm-left">Usuário</h3>
                        </Col>
                        <Col xs="12" sm="4">
                            <Autocomplete
                                origin="api/user/list" 
                                properties={[["name","name","Nome do Usuario",true,true],["username","username","Login do Usuario",false,true]]}
                                callback={this.selectUsuario} 
                                className={"text-left"}
                            />
                        </Col>
                        <Col xs="12" sm="4">
                            <div className="text-xs-center text-sm-right">
                                <ButtonGroup>
                                    <Button variant="danger" onClick={this.delete}><FontAwesomeIcon icon="trash-alt" /></Button>
                                    <Button variant="primary" onClick={this.new}><FontAwesomeIcon icon="plus" /></Button>
                                    <Button variant="success" onClick={this.save}><FontAwesomeIcon icon="save" /></Button>
                                </ButtonGroup>
                            </div>
                        </Col>
                    </Row>
                </Card.Header>

                <Card.Body>
                    <Form onSubmit={e => {e.preventDefault(); this.save()}}>
                        <Form.Row>
                            <Col xs="12" sm="3">
                                <Form.Group>
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control autoFocus type="text" value={this.state.usuario.name || ""} onChange={e => this.setState({usuario: {...this.state.usuario, name: e.target.value}})}/>
                                </Form.Group>
                            </Col>
                            <Col xs="12" sm="3">
                                <Form.Group>
                                    <Form.Label>Endereço</Form.Label>
                                    <Form.Control type="text" value={this.state.usuario.address} onChange={e => this.setState({usuario: {...this.state.usuario, address: e.target.value}})}/>
                                </Form.Group>
                            </Col>
                            <Col xs="12" sm="3">
                                <Form.Group>
                                    <Form.Label>CPF</Form.Label>
                                    <Form.Control type="text" value={this.state.usuario.cpf} onChange={e => this.setState({usuario: {...this.state.usuario, cpf: cpfMask(e.target.value)}})}/>
                                </Form.Group>
                            </Col>
                            <Col xs="12" sm="3">
                                <Form.Group>
                                    <Form.Label>Data de Nascimento</Form.Label>
                                    <Form.Control type="text" value={this.state.usuario.birthDate} onChange={e => this.setState({usuario: {...this.state.usuario, birthDate: dateMask(e.target.value)}})}/>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        
                        <Form.Row>
                            <Col xs="12" sm="4">
                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" value={this.state.usuario.username} onChange={e => this.setState({usuario: {...this.state.usuario, username: e.target.value}})}/>
                                </Form.Group>
                            </Col>
                            <Col xs="12" sm="4">
                                <Form.Group>
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control type="password" value={this.state.usuario.password} onChange={e => this.setState({usuario: {...this.state.usuario, password: e.target.value}})}/>
                                </Form.Group>
                            </Col>
                            <Col xs="12" sm="4">
                                <Form.Group>
                                    <Form.Label>Ativo</Form.Label>
                                    <Form.Control as="select" value={this.state.usuario.active} onChange={e => this.setState({usuario: {...this.state.usuario, active: e.target.value}})} >
                                        <option value="true">Ativo</option>
                                        <option value="false">Inativo</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col xs="12" sm="4">
                                <Form.Group>
                                    <Form.Label>Celular</Form.Label>
                                    <Form.Control type="tel" value={this.state.usuario.celphone || ""} onChange={e => this.setState({usuario: {...this.state.usuario, celphone: celphoneMask(e.target.value)}})}/>
                                </Form.Group>
                            </Col>
                            <Col xs="12" sm="4">
                                <Form.Group>
                                    <Form.Label>Telefone</Form.Label>
                                    <Form.Control type="tel" value={this.state.usuario.telephone || ""} onChange={e => this.setState({usuario: {...this.state.usuario, telephone: telephoneMask(e.target.value)}})}/>
                                </Form.Group>
                            </Col>
                            <Col xs="12" sm="4">
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" value={this.state.usuario.email} onChange={e => this.setState({usuario: {...this.state.usuario, email: e.target.value}})}/>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <input type="submit" hidden />
                    </Form>
                </Card.Body>

                <Card.Footer>
                    <Row>
                        <Col xs="12" sm="4">
                        </Col>
                        <Col xs="12" sm="4">
                        </Col>
                        <Col xs="12" sm="4">
                            <div className="text-xs-center text-sm-right">
                                <ButtonGroup>
                                    <Button variant="danger" onClick={this.delete}><FontAwesomeIcon icon="trash-alt" /></Button>
                                    <Button variant="primary" onClick={this.new}><FontAwesomeIcon icon="plus" /></Button>
                                    <Button variant="success" onClick={this.save}><FontAwesomeIcon icon="save" /></Button>
                                </ButtonGroup>
                            </div>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        )
    }
}

export default Usuario;