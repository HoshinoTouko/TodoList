/*
 * Created with Web Storm.
 * @File: ModalEdit.jsx
 * @Author: Hoshino Touko
 * @License: (C) Copyright 2014 - 2017, HoshinoTouko
 * @Contact: i@insky.jp
 * @Website: https://touko.moe/
 * @Create at: 2018/2/19 11:13
 * @Desc: 
 */
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import reqwest from "reqwest";

class ModalEdit extends React.Component {
    state = {
        content: '',
        expire: '',
        priority: '0',
        show: false,
    };

    clear = () => {
        this.setState({
            content: '',
            expire: '',
            priority: '0'
        })
    };
    handleContentChange = (e) => {
        this.setState({content: e.target.value});
    };
    handleExpireChange = (e) => {
        this.setState({expire: e.target.value});
    };
    handlePriorityChange = (e) => {
        this.setState({priority: e.target.value});
    };
    componentDidMount() {
        this.props.setRefresh(this.refreshData)
    };

    refreshData = () => {
        console.log('refresh data');
        this.setState({
            content: this.props.data.content,
            expire: this.props.data.expire,
            priority: this.props.data.priority,
        }, () => {
            this.props.onShow();
        });

    };

    render() {
        const submit = () => {
            reqwest({
                url: `http://127.0.0.1:8000/api/${this.props.id}`,
                method: 'put',
                data: {
                    content: this.state.content,
                    expire: this.state.expire,
                    priority: this.state.priority
                }
            }).then((data) => {
                this.props.onHide();
                this.props.fetch();
            });
        };
        return (
            <Modal
                {...this.props}
                bsSize="large"
                aria-labelledby="contained-modal-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">Edit a 'TODO'</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Text
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    type="text"
                                    placeholder="Text"
                                    value={this.state.content}
                                    onChange={this.handleContentChange}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Expire date
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    type="date"
                                    value={this.state.expire}
                                    onChange={this.handleExpireChange}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formControlsSelect">
                            <Col componentClass={ControlLabel} sm={2}>
                                Priority
                            </Col>
                            <Col sm={9}>
                                <FormControl
                                    componentClass="select"
                                    placeholder={this.state.priority}
                                    onChange={this.handlePriorityChange}
                                >
                                    <option
                                        value="-1"
                                        selected={this.state.priority === -1}
                                    >
                                        Unimportant
                                    </option>
                                    <option
                                        value="0"
                                        selected={this.state.priority === 0}
                                    >
                                        Normal
                                    </option>
                                    <option
                                        value="1"
                                        selected={this.state.priority === 1}
                                    >
                                        Important
                                    </option>
                                </FormControl>
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button
                                    onClick={submit}
                                    type="button"
                                >
                                    Submit
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ModalEdit;
