import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from 'react-bootstrap/Form';

class Datatable extends Component {    
    componentWillMount() {
        this.updateState(this.props);
    }

    componentDidUpdate(props) {
        if (this.props !== props)
            this.updateState(this.props);
    }

    updateState = props => {
        this.setState({
            page: props.page,
            data: props.data,
            totalPages: props.totalPages
        })
    }

    changePage = (page) => {
        if (page) {
            page = parseInt(page);

            if (page >= 0 && page <= this.state.totalPages - 1) {
                this.props.changePage(page);
            }
        } else {
            this.props.changePage(page);
        }
    }

    inicio = () => {
        if(this.state.page > 0) {
            this.props.changePage(0);
        }
    }

    anterior = () => {
        if (this.state.page - 1 >= 0) {
            this.props.changePage(this.state.page - 1)
        }
    }

    proximo = () =>  {
        if (this.state.page < this.state.totalPages - 1) {
            this.props.changePage(this.state.page + 1)
        }
    }

    ultimo = () =>  {
        if (this.state.page < this.state.totalPages - 1) {
            this.props.changePage(this.state.totalPages - 1)
        }
    }

    selectData(item) {
        if(this.props.setSelection) this.props.setSelection(item);
    }

    edit = (item) => {
        this.props.edit(item);
    }

    delete = (item) => {
        this.props.delete(item);
    }

    render() {  
        var value = "";

        return (
            this.state.data && this.state.data.length > 0 ?
            <div>
                <Table size="sm" striped bordered hover responsive>
                    <thead>
                        <tr>
                            {
                                this.props.headers.map((header, i) => { 
                                    return (
                                        <th key={i} onClick={() => { if ( header.length > 1 ) header[1](this.props.fields[i]) }} >{header[0]}</th>
                                    )
                                })
                            }
                            {
                                this.props.edit || this.props.delete ? <th>#</th> : (null)
                            }
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.data.map((item,i) => {
                            return (
                                <tr key={i} onClick={() => this.selectData(item)} className={this.props.validateLine ? this.props.validateLine(item): ""}>
                                    {
                                    this.props.fields.map((key,i2) => {
                                        value = item;
                                        
                                        key.split('.').forEach(k => {
                                            value = value[k]
                                        });

                                        return ( <td key={i2}>{ typeof(value) === 'boolean' ? value.toString() : value }</td> )
                                    })
                                    }
                                   
                                        {
                                            this.props.delete || this.props.edit ?
                                            <td className="text-center"> 
                                                <ButtonGroup>
                                                {
                                                    this.props.edit ? <Button onClick={(e) => this.edit(item)}><FontAwesomeIcon icon="pencil-alt" /></Button> : (null)
                                                }
                                                {
                                                    this.props.delete ? <Button variant="danger" onClick={(e) => this.delete(item)}><FontAwesomeIcon icon="trash-alt" /></Button> : (null)
                                                }
                                                </ButtonGroup>
                                            </td>
                                            :
                                            (null)
                                        }
                                       
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
                
                {
                this.props.changePage ? 
                <div className="text-center pb-2">
                    <button type="button" className="btn btn-default btn-md" title="Inicio" onClick={this.inicio}>
                        <FontAwesomeIcon icon="angle-double-left" />
                    </button>
                    <button type="button" className="btn btn-default btn-md" title="Anterior" onClick={this.anterior} style={{marginLeft: 5, marginRight: 5}}>
                        <FontAwesomeIcon icon="angle-left" />
                    </button>

                    <input type="text" className="btn" value={this.state.page} onClick={(e) => e.target.value = ""} onChange={(e) => this.changePage(e.target.value)} style={{width: 100}} />

                    <button type="button" className="btn btn-default btn-md" title="Proximo" onClick={this.proximo} style={{marginLeft: 5, marginRight: 5}}>
                        <FontAwesomeIcon icon="angle-right" />
                    </button>
                    <button type="button" className="btn btn-default btn-md" title="Ultimo" onClick={this.ultimo}>
                        <FontAwesomeIcon icon="angle-double-right" />
                    </button>
                </div>
                :
                (null)
                }
            </div> 
            :
            <Form.Text>{this.props.message ? this.props.message : "Nenhum dado encontrado"}</Form.Text>
        )
    }
}

export default Datatable;
