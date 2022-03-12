import React from "react";
import { Content } from "antd/lib/layout/layout";
import { Card, Col, Row } from "antd";
import { Button } from "antd";
import { text } from "stream/consumers";
import { LinkedinFilled, GithubFilled } from "@ant-design/icons";

const { Meta } = Card;

const About = () => {
  return (
    <Content className="site-layout-background">
      <h1 style={{ textAlign: "center", fontSize: "28px", fontWeight: "bold" }}>
        Our amazing team
      </h1>
      <p style={{ textAlign: "center", fontSize: "17px" }}>
        We are a bunch of computer science students making projects that will
        have real life impact!
      </p>
      <p style={{ textAlign: "center" }}>
        <a href="https://languagebuddy.netlify.app/" target="_blank">
          <Button
            style={{ textAlign: "center" }}
            type="primary"
            shape="round"
            size={"large"}
          >
            See other projects{" "}
          </Button>
        </a>
      </p>
      <br></br>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card
              hoverable
              cover={
                <img
                  alt="Shubham Thorat"
                  src="https://res.cloudinary.com/dsrpn6k2o/image/upload/v1647105420/Photo/Shubham_Thorat_eiswdx.jpg"
                />
              }
              title="Shubham Thorat"
              style={{ textAlign: "center", fontSize: "20px" }}
              bordered={false}
            >
              <a
                href="https://www.linkedin.com/in/shubham-thorat-8985151a9/"
                target="_blank"
              >
                {" "}
                <LinkedinFilled
                  style={{
                    color: "#0e76a8",
                    fontSize: "25px",
                    paddingRight: "20px",
                  }}
                />{" "}
              </a>
              <a href="https://github.com/shubham-thorat" target="_blank">
                <GithubFilled style={{ color: "#171515", fontSize: "25px" }} />{" "}
              </a>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              cover={
                <img
                  alt="Anubhab Ray"
                  src="https://res.cloudinary.com/dsrpn6k2o/image/upload/v1647105051/Photo/Anubhab_Ray_gyyk6o.jpg"
                />
              }
              title="Anubhab Ray"
              style={{ textAlign: "center", fontSize: "20px" }}
              bordered={false}
            >
              {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
              <a
                href="https://www.linkedin.com/mwlite/in/anubhab-ray"
                target="_blank"
              >
                <LinkedinFilled
                  style={{
                    color: "#0e76a8",
                    fontSize: "25px",
                    paddingRight: "20px",
                  }}
                />
              </a>
              <a href="https://github.com/rayanubhab" target="_blank">
                <GithubFilled style={{ color: "#171515", fontSize: "25px" }} />{" "}
              </a>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              cover={
                <img
                  alt="Kartikeya Singh"
                  src="https://res.cloudinary.com/dsrpn6k2o/image/upload/v1647105420/Photo/Kartikeya_Singh_huug61.jpg"
                />
              }
              title="Kartikeya Singh"
              style={{ textAlign: "center", fontSize: "20px" }}
              bordered={false}
            >
              {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
              <a
                href="https://www.linkedin.com/in/kartikeya-singh-"
                target="_blank"
              >
                <LinkedinFilled
                  style={{
                    color: "#0e76a8",
                    fontSize: "25px",
                    paddingRight: "20px",
                  }}
                />
              </a>
              <a href="https://github.com/Sygamar" target="_blank">
                <GithubFilled style={{ color: "#171515", fontSize: "25px" }} />{" "}
              </a>
            </Card>
          </Col>
        </Row>
      </div>
      ,
    </Content>
  );
};

export default About;
