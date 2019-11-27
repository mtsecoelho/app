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
import { cpfMask, dateMask } from './masks';

const sha1 = require("sha1");

const initialUsuario = { id: "" , address: "", active: "Inactive", birthDate: "", name: "", password: "", username: "", cpf: ""}

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
            axios.post("api/user/save", {...this.state.usuario, password: this.state.usuario.password.length === 40 ? this.state.usuario.password : sha1(this.state.usuario.password)}).then(() => {
                alert("Usuário Salvo")
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
                alert(res.data)
            }).catch(errs => {
                window.al(errs);
            })
        }
    }

    selectUsuario = usuario => {
        this.setState({
            usuario: usuario ? usuario : initialUsuario
        })
    }

    render() {
        return (
<           Card>
                <Card.Header>
                    <Row>
                        <Col>
                            <h3 className="float-left">Usuario</h3>
                        </Col>
                        <Col>
                            <Autocomplete
                                origin="api/user/list" 
                                properties={[["name","name","Nome do Usuario",true,true],["username","username","Login do Usuario",true,true]]}
                                callback={this.selectUsuario} 
                            />
                        </Col>
                        <Col>
                            <div className="float-right">
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
                            <Form.Group as={Col}>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control autoFocus type="text" value={this.state.usuario.name} onChange={e => this.setState({usuario: {...this.state.usuario, name: e.target.value}})}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Data de Nascimento</Form.Label>
                                <Form.Control type="text" value={this.state.usuario.birthDate} onChange={e => this.setState({usuario: {...this.state.usuario, birthDate: dateMask(e.target.value)}})}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Endereço</Form.Label>
                                <Form.Control type="text" value={this.state.usuario.address} onChange={e => this.setState({usuario: {...this.state.usuario, address: e.target.value}})}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>CPF</Form.Label>
                                <Form.Control type="text" value={this.state.usuario.cpf} onChange={e => this.setState({usuario: {...this.state.usuario, cpf: cpfMask(e.target.value)}})}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" value={this.state.usuario.username} onChange={e => this.setState({usuario: {...this.state.usuario, username: e.target.value}})}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Senha</Form.Label>
                                <Form.Control type="password" value={this.state.usuario.password} onChange={e => this.setState({usuario: {...this.state.usuario, password: e.target.value}})}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Ativo</Form.Label>
                                <Form.Control as="select" value={this.state.usuario.active} onChange={e => this.setState({usuario: {...this.state.usuario, active: e.target.value}})} >
                                    <option value="Active">Ativo</option>
                                    <option value="Inactive">Inativo</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <input type="submit" hidden />
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}

export default Usuario;