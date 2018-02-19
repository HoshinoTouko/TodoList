/*
 * Created with Web Storm.
 * @File: AppAddButton.jsx
 * @Author: Hoshino Touko
 * @License: (C) Copyright 2014 - 2017, HoshinoTouko
 * @Contact: i@insky.jp
 * @Website: https://touko.moe/
 * @Create at: 2018/2/17 23:12
 * @Desc: 
 */
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import ModalAdd from "./ModalAdd";

class AppAddButton extends React.Component{
    state = {
        addModalShow: false
    };

    render(){
        return(
            <div>
                <Button
                    bsStyle="success"
                    onClick={() => {this.setState({addModalShow: true}); console.log('Click add');}}
                >
                    Add
                </Button>
                <ModalAdd
                    show={this.state.addModalShow}
                    onHide={() => {this.setState({ addModalShow: false });}}
                    fetch={this.props.fetch}
                />
            </div>
        )
    }
}

export default AppAddButton;
