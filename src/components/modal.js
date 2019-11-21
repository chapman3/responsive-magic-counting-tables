import React, {Component} from 'react';
import './modal.css';

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
            <div className="modal">
                <div className="modal-contents">
                    <h3>Table: {this.state.table.name}</h3>
                    <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
                        <span>Start</span>
                        <input
                            type="text"
                            id="start"
                            value={this.state.table.start}
                            onChange={this.handleChange}
                            width="10px"
                        /><br/>
                        <span>Step</span>
                        <input
                            type="text"
                            id="step"
                            value={this.state.table.step}
                            onChange={this.handleChange}
                        /><br/>
                        <span>Max</span>
                        <input
                            type="text"
                            id="max"
                            value={this.state.table.max}
                            onChange={this.handleChange}
                        /><br/>
                        <span>Width</span>
                        <input
                            type="text"
                            id="width"
                            value={this.state.table.width}
                            onChange={this.handleChange}
                        /><br/>
                        <span>Direction</span>
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
            </div>
        )
    }
}
export default Modal;