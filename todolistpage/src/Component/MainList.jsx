/*
 * Created with Web Storm.
 * @File: MainList.jsx
 * @Author: Hoshino Touko
 * @License: (C) Copyright 2014 - 2017, HoshinoTouko
 * @Contact: i@insky.jp
 * @Website: https://touko.moe/
 * @Create at: 2018/2/17 15:47
 * @Desc: 
 */
import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import reqwest from 'reqwest';

import MdDone from 'react-icons/lib/md/done';
import MdClear from 'react-icons/lib/md/clear';
import MdModeEdit from 'react-icons/lib/md/mode-edit';
import MdDelete from 'react-icons/lib/md/delete';
import AppAddButton from "./AppAddButton";
import Col from "react-bootstrap/es/Col";
import Row from "react-bootstrap/es/Row";
import ModalEdit from "./ModalEdit";


class MainList extends React.Component {
    state = {
        data: [],
        editId: 0,
        editData: {},
        editRefresh: () => {
        },
        editShow: false,
        url: 'http://127.0.0.1:8000/api/all/id/',
    };

    fetch = () => {
        reqwest({
            url: this.state.url,
            method: 'get',
        }).then((data) => {
            // let data = JSON.parse(strData);
            console.log(data);
            this.setState({
                data: data
            });
        });
    };

    editTodoListById = (id, data) => {
        this.setState({
            editId: id,
            editData: data,
        }, () => {
            this.state.editRefresh();
        });
    };

    componentDidMount() {
        this.fetch();
    };

    render() {
        const changeUrl = (url) => {
            this.setState({
                url: url,
            }, () => {
                this.fetch();
            })
        };

        return (
            <Row id='main-content'>
                <Col
                    msm={12}
                    style={{
                        textAlign: 'right',
                        marginTop: '50px'
                    }}
                >
                    <AppAddButton
                        fetch={this.fetch}
                    />
                </Col>
                <Col
                    sm={12}
                    style={{
                        marginTop: '20px'
                    }}
                >
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>
                                <p
                                    onClick={() => {
                                        changeUrl('http://127.0.0.1:8000/api/all/id/')
                                    }}
                                >
                                    Text
                                </p>
                            </th>
                            <th><p>Status</p></th>
                            <th><p>Create</p></th>
                            <th>
                                <p
                                    onClick={() => {
                                        changeUrl('http://127.0.0.1:8000/api/all/exp/')
                                    }}
                                >
                                    Expire
                                </p>
                            </th>
                            <th>
                                <p
                                    onClick={() => {
                                        changeUrl('http://127.0.0.1:8000/api/all/pri/')
                                    }}
                                >
                                    Priority
                                </p>
                            </th>
                            <th><p>Operation</p></th>
                        </tr>
                        </thead>
                        <TbodyList
                            data={this.state.data}
                            fetch={this.fetch}
                            editTodoListById={this.editTodoListById}
                        />
                    </Table>
                </Col>
                <Col sm={12}>
                    <ModalEdit
                        show={this.state.editShow}
                        onShow={() => {
                            this.setState({editShow: true});
                        }}
                        id={this.state.editId}
                        data={this.state.editData}
                        setRefresh={func => this.setState({editRefresh: func})}
                        onHide={() => {
                            this.setState({editShow: false});
                        }}
                        fetch={this.fetch}
                    />
                </Col>
            </Row>
        )
    }
}

class TbodyList extends React.Component {

    deleteById = (id) => {
        reqwest({
            url: `http://127.0.0.1:8000/api/${id}/`,
            method: 'delete',
        }).then((data) => {
            this.props.fetch();
        });
    };

    changeStatus = (id, dt, status) => {
        dt.status = status;
        reqwest({
            url: `http://127.0.0.1:8000/api/${id}/`,
            method: 'put',
            data: dt
        }).then((data) => {
            this.props.fetch();
        });
    };

    render() {
        const data = this.props.data;
        const dataElements = [];
        for (let dt of data) {
            const rStatus = dt.status === 1 ? 0 : 1;
            dataElements.push(
                <tr key={dt.id}>
                    <th>{dt.content}</th>
                    <th>
                        {dt.status === 1 ? 'Finish' : 'Not finish'}
                    </th>
                    <th>{dt.create}</th>
                    <th>{dt.expire }</th>
                    <th>
                        {
                            dt.priority === -1  &&  'Unimportant'   ||
                            dt.priority === 0   &&  'Normal'        ||
                            dt.priority === 1   &&  'Important'
                        }
                    </th>
                    <th style={{fontSize: 'large'}}>
                        <a onClick={() => {
                            this.changeStatus(dt.id, dt, rStatus)
                        }}>
                            {rStatus === 1 ? <MdDone/> : <MdClear/>}
                        </a>{' '}

                        <a onClick={() => {
                            this.props.editTodoListById(dt.id, dt)
                        }}>
                            <MdModeEdit/>
                        </a>{' '}

                        <a onClick={() => {
                            this.deleteById(dt.id)
                        }}>
                            <MdDelete/>
                        </a>
                    </th>
                </tr>
            )
        }
        return (
            <tbody>{dataElements}</tbody>
        )
    }

}

export default MainList;
