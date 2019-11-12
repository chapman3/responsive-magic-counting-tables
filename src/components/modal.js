import React, {Component} from 'react';

class Modal extends Component{
    constructor(props){
        super(props);
        this.state = {
            table : this.props.table
        }
    }

    handleChange = (event) => {
        this.setState({
            table: {
                ...this.state.table,
                [event.target.id]: event.target.value
            }
        });
    }

    handleDropdown = (event) => {
        if(event.target.value == "ltr-dn"){
            this.setState({
                table: {
                    ...this.state.table,
                    ltr: true,
                    up: false
                }
            })
        }
        if(event.target.value == "ltr-up"){
            this.setState({
                table: {
                    ...this.state.table,
                    ltr: true,
                    up: true
                }
            })
        }
        if(event.target.value == "rtl-dn"){
            this.setState({
                table: {
                    ...this.state.table,
                    ltr: false,
                    up: false
                }
            })
        }
        if(event.target.value == "rtl-up"){
            this.setState({
                table: {
                    ...this.state.table,
                    ltr: false,
                    up: true
                }
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.modalUpdate(this.state.table);
    }

    handleReset = (event) => {
        event.preventDefault();
        this.props.modalUpdate(null);
    }

    render(){
        return(
            <div>
                <h3>Table: {this.state.table.name}</h3>
                <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
                    <span>N = </span>
                    <input
                        type="text"
                        id="start"
                        value={this.state.table.start}
                        onChange={this.handleChange}
                        width="10px"
                    /><br/>
                    <span>X = </span>
                    <input
                        type="text"
                        id="step"
                        value={this.state.table.step}
                        onChange={this.handleChange}
                    /><br/>
                    <span>M = </span>
                    <input
                        type="text"
                        id="max"
                        value={this.state.table.max}
                        onChange={this.handleChange}
                    /><br/>
                    <span>W = </span>
                    <input
                        type="text"
                        id="width"
                        value={this.state.table.width}
                        onChange={this.handleChange}
                    /><br/>
                    <span>D = </span>
                    <select id="dropdown" defaultValue="ltr-dn" onChange={this.handleDropdown}>
                        <option id="default" value="ltr-dn" >ltr-dn</option>
                        <option id="default" value="ltr-up" >ltr-up</option>
                        <option id="default" value="rtl-dn" >rtl-dn</option>
                        <option id="default" value="rtl-up" >rtl-up</option>
                    </select><br/>
                    <button type="submit">Submit</button>
                    <button type="cancel">Cancel</button>
                </form>
            </div>
        )
    }
}
export default Modal;