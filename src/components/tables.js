import React, { Component } from 'react';
import Modal from './modal'
import './tables.css';

class Tables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: this.props.table.start,
            step: this.props.table.step,
            max: this.props.table.max,
            width: this.props.table.width,
            ltr: this.props.table.ltr,
            up: this.props.table.up,
            name: this.props.table.name,
            array: [],
            tableArray: null,
            ready: false,
            modal: false,
        }
    }

    async componentDidMount() {
        await this.generateArray();
        await this.getTable();
        await this.setState({
            ready: true
        })
    }

    getTable = () => {
        let tableArray = this.buildTable()
        this.setState({
            tableArray: tableArray
        });
    }

    buildTable = () => {
        let ltr = this.state.ltr;
        let up = this.state.up;
        let rows = Math.ceil(this.state.array.length / 5);
        let tableArray = [];
        let array = this.state.array;
        let i = 0;
        while (i < rows){
            tableArray.push([]);
            i++;
        }
        i = 0;
        let y = null;
        let d = null;
        if(this.state.up){
            y = rows-1;
            d = -1;
        } else {
            y = 0;
            d = 1
        }
        while (i < rows){
            if (this.state.ltr) {
                tableArray = this.fillRowLTR(tableArray, array, y);
                this.state.ltr = false;
            }
            else {
                tableArray = this.fillRowRTL(tableArray, array, y);
                this.state.ltr = true;
            }
            y += d;
            i++;
        }
        this.state.ltr = ltr;
        this.state.up = up;
        return tableArray;
    }

    fillRowLTR = (tableArray, array, y) => {
        for(let i=0; i<5; i++){
            let element = array.shift()
            tableArray[y][i] = element;
        }
        return tableArray;
    }

    fillRowRTL = (tableArray, array, y) => {
        for(let i=4; i>=0; i--){
            let element = array.shift()
            tableArray[y][i] = element;
            }            
        return tableArray;
    }

    generateArray = async () => {
        let curr = this.state.start;
        let step = this.state.step;
        let max = this.state.max;
        let array = [];
        while(curr <= max){
            array.push(curr);
            curr += step;
        }
        while(array.length % 5 != 0){
            array.push(null);
        }
        this.setState({
            array:array
        });
    }

    updateTables = async (response) => {
        await this.setState({
            start: parseInt(response.start),
            step: parseInt(response.step),
            max: parseInt(response.max),
            width: parseInt(response.width),
            ltr: response.ltr,
            up: response.up,
            modal:false,
        });
        await this.generateArray();
        await this.getTable();
    }

    modalUpdate = (response) => {
        if(response){
            this.updateTables(response);
        }
        else{
            this.setState({
                modal:false
            })
        }
    }

    render() {
        if(this.state.ready){
            const elements = [];
            for(const row of this.state.tableArray){
                const rowElements = []
                for(const element of row){
                    rowElements.push(<div className='table-element'>{element}</div>)
                }
                elements.push(<div className='table-row'>{rowElements}</div>);
            }
            return(
                <>
                    <div className={`table-container ${this.state.name}`} style={{width: `${this.state.width}%`}}>
                        {elements}
                        <button onClick={() => this.setState({ modal: true })}>Configure</button>    
                    </div>
                    
                    {this.state.modal &&
                        <Modal modalUpdate={this.modalUpdate} table={this.state}/>
                    }
                </>


            )
        } else {
            return(<div></div>)            
        }

    }
}

export default Tables;