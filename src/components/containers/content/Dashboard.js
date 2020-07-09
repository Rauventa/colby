import React, {Component} from 'react';
import {Statistic, Row, Col, Progress, Timeline} from "antd";
import { LikeOutlined } from '@ant-design/icons';

class Dashboard extends Component {
    render() {
        return (
            <div className={'Dashboard container-fluid'}>
                <div className="row">
                    <div className="col-xl-6 Dashboard__stats">
                        <p>Total: </p>
                        <Progress percent={60} status="active" />
                        <Progress type="circle" percent={8} format={percent => `${percent} Users`} />
                        <Progress type="circle" percent={100} format={() => 'Start'} />
                        <Row gutter={16}>
                            <Col span={12}>
                                <Statistic title="Feedback" value={12} prefix={<LikeOutlined />} />
                            </Col>
                            <Col span={12}>
                                <Statistic title="Connected" value={8} suffix="/ 30" />
                            </Col>
                        </Row>
                    </div>
                    <div className="col-xl-6">
                        <Timeline>
                            <Timeline.Item color="green">Create COLBY</Timeline.Item>
                            <Timeline.Item color="green">
                                <p>Start services</p>
                                <p>Catalog added</p>
                                <p>Cart added</p>
                                <p>User login/reg added</p>
                                <p>All info sorted</p>
                            </Timeline.Item>
                            <Timeline.Item color="red">
                                <p>Landing</p>
                            </Timeline.Item>
                            <Timeline.Item>
                                <p>Developer testing</p>
                                <p>Pre MVP version</p>
                                <p>Team Lead testing</p>
                            </Timeline.Item>
                            <Timeline.Item color="gray">
                                <p>Get a mark</p>
                                <p>Push into portfolio</p>
                                <p>Smile)</p>
                            </Timeline.Item>
                        </Timeline>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;