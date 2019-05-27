import React, { Component } from "react";
import { Row, Col, PageHeader, Layout, Input, Button, List } from "antd";
import axios from "axios";
import "./App.css";

class Authors extends Component {
  state = {
    author: [],
    image: "",
    input: ""
  };

  handleChange = event => {
    this.setState({ input: event.target.value });
  };

  handleClick = event => {
    event.preventDefault();
    this.componentDidMount();
  };

  componentDidMount() {
    axios.get("/book?title=" + this.state.input).then(response => {
      const author = response.data.author;
      const image = response.data.image;
      console.log(author);
      this.setState({
        image: image
      });
      this.renderAuthorList(author);
    });
  }

  renderAuthorList = list => {
    console.log(list);
    const authors = [];
    for (let i = 0; i < list.length; i++) {
      authors.push({ name: list[i] });
    }
    const listItems = authors.map(author => (
      <List style={{ fontSize: "19px" }} key={author.name}>
        {author.name}
      </List>
    ));
    this.setState({
      author: listItems
    });
  };

  render() {
    const { Footer, Content } = Layout;

    return (
      <div>
        <PageHeader style={{ textAlign: "center" }} title="Author Searcher" />
        <Content>
          <Row style={{ marginBottom: 28 }} gutter={50}>
            <Col span={8} />
            <Col span={5}>
              <Input
                style={{ width: 300 }}
                value={this.state.input}
                onChange={this.handleChange}
                placeholder="book"
              />
            </Col>
            <Col span={1}>
              <Button onClick={this.handleClick}>Enter</Button>
            </Col>
          </Row>
          <Row>
            <Col span={6} />
            <Col style={{ textAlign: "center" }} span={12}>
              <img src={this.state.image} />
            </Col>
            <Col style={{ textAlign: "center" }} span={6} />
          </Row>
        </Content>
        <Footer style={{ background: "#ffffff", textAlign: "center" }}>
          <div style={{ fontSize: "16px" }}>Written by: </div>
          <div style={{ fontSize: "19px" }}>{this.state.author}</div>
        </Footer>
      </div>
    );
  }
}

export default Authors;
