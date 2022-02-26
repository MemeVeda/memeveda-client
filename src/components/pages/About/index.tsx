import React from "react";
import { Content } from "antd/lib/layout/layout";
import { Card, Col, Row } from 'antd';

const About = () => {
  return (
    <Content className="site-layout-background">
     <div className="site-card-wrapper">
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
    </Row>
  </div>,
 
  </Content>
  )
};

export default About;
