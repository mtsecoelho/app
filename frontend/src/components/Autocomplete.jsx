import React, { Component } from 'react';
import axios from '../AxiosConfig';
import debounce from 'debounce';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';

/*
Parametros ->
properties (array de arrays) conteudo de cada array: 0 = campo de busca, 1 = campo de exibição, 2 = placeholder, 3 = exibir na seleção?, 4 = usar como filtro/exibir no menu?
size
direction
value
*/ 

class Autocomplete extends Component {
    constructor(props) {
        super(props)

        this.getDataDebounced = debounce(this.getDataDebounced, 500)
    }

    componentDidMount() {
        this.setState({
            data: this.props.data || [],
            placeholder: this.props.properties[0][2] || "",
            className: `autocomplete-${new Date().getTime()} ${this.props.className}`,
            search: {
                page: 0, 
                size: this.props.size || 10, 
                direction: this.props.direction || "ASC", 
                value: this.props.value || "",
                property: this.props.properties[0][0]
            }
        })
    }

    handleClick = e => {
        if (!e.target.className.includes(this.state.className)) this.fade();
    }

    componentDidUpdate(props) {
        if (props.value !== this.props.value) {
            this.setState({
                search: {...this.state.search, value: props.value}
            })
        }
    }

    getData = () => {
        if (this.state.search.value) {
            axios.post(this.props.origin, this.state.search).then(response => {
                document.addEventListener('mousedown', this.handleClick, false)

                this.setState({
                    data: response.data.data.content
                })
            }).catch(errs => {
                window.al(errs)
            });
        } else {
            if(this.props.callback) this.props.callback(null)

            this.setState({
                data: []
            })
        }
    }

    getDataDebounced = () => {
        this.getData();
    }

    setValue = e => {
        this.setState({
            search: {...this.state.search, value: e.target.value}
        }) //, () => this.getDataDebounced()
    }

    prependClick = i => {
        this.setState({
            search: {...this.state.search, property: this.props.properties[i][0], value: ""},
            placeholder: this.props.properties[i][2]
        })
    }

    getMenu = () => {
        var menu = this.props.properties.filter(el => { return el[4] })

        if (menu.length > 1) {
            return (
                <DropdownButton as={InputGroup.Prepend} drop={this.props.dropdownDirection || "down"} variant="outline-secondary" title={<FontAwesomeIcon icon="filter"/>}>
                    {
                        menu.map((e,i) => {
                            return <Dropdown.Item key={i} onClick={() => this.prependClick(i)}>{e[2]}</Dropdown.Item>
                        })
                    }
                </DropdownButton>
            )   
        }
    }

    getSelection = () => {
        return (
            this.state.data.length > 0 ?
            <DropdownButton alignRight show as={InputGroup.Append} drop={this.props.dropdownDirection || "down"} variant="outline-secondary" title={<FontAwesomeIcon icon="search"/>}>
            {
                this.state.data.map((e,i) => {
                    return <Dropdown.Item className={this.state.className} onClick={() => this.selectClick(e)} key={i}>{this.getLine(e,"S")}</Dropdown.Item>
                })
            }
            </DropdownButton>
            :
            <InputGroup.Append><Button variant="outline-secondary" onClick={() => this.getData()} ><FontAwesomeIcon icon="search"/></Button></InputGroup.Append>
        )
    }

    getLine = (el,t) => {
        var line = [], spread = 0, f = t === "S" ? 3 : 4

        this.props.properties.forEach(e => {
            if (e[f]) { 
                if (e[1].includes(".")) {
                    spread = line.push(el) - 1
                    
                    e[1].split(".").forEach(e => {
                        line[spread] = line[spread][e]
                    })
                } else {
                    line.push(el[e[1]])
                }

            }
        })

        return line.join(" - ")
    }

    selectClick = e => {
        if(this.props.callback) this.props.callback(e)

        this.fade(e[this.state.search.property])
    }

    fade = (value) => {
        document.removeEventListener('mousedown', this.handleClick, false)
        
        this.setState({
            search: {...this.state.search, value: this.props.value ? value : ""},
            data: []
        })
    }

    render() {
        return (
            this.state ?
            <Form.Group>
                <InputGroup className={this.state.className} >
                    { this.getMenu() }
                    <FormControl
                        className={this.state.className}
                        placeholder={this.state.placeholder} 
                        value={this.state.search.value}
                        onChange={this.setValue} />
                    { this.getSelection() }
                </InputGroup>                
            </Form.Group>
            :
            (null)
        )
    }
}

export default Autocomplete