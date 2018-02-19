/*
 * Created with Web Storm.
 * @File: Content.jsx
 * @Author: Hoshino Touko
 * @License: (C) Copyright 2014 - 2017, HoshinoTouko
 * @Contact: i@insky.jp
 * @Website: https://touko.moe/
 * @Create at: 2018/2/17 12:39
 * @Desc: 
 */
import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import AppHeader from "../Component/AppHeader";
import MainList from "../Component/MainList";

class Content extends React.Component {
    render() {
        return (
            <Grid>
                <Row id='header'>
                    <Col
                        md={3} sm={12}
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        <AppHeader/>
                    </Col>

                </Row>
                <MainList/>
            </Grid>
        )
    }
}

export default Content;
