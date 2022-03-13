import React from "react";
import { Content } from "antd/lib/layout/layout";
import { Card, Col, Row } from "antd";
import { Button } from "antd";
import { text } from "stream/consumers";
import { LinkedinFilled, GithubFilled } from "@ant-design/icons";
import Shubham from "../../assets/shubham.jpeg";
import Anubhab from "../../assets/anubhab.jpeg";

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
                  alt="example"
                  src={Shubham}
                  style={{
                    height: "20rem",
                  }}
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
                  alt="example"
                  src={Anubhab}
                  style={{
                    height: "20rem",
                  }}
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
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  style={{
                    height: "20rem",
                  }}
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
