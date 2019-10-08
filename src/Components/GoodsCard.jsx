import React, { Component } from "react";
import styled from "styled-components";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

const Container = styled.div`
  width: 350px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 1px -1px rgba(0, 0, 0, 0.12),
    0 1px 1px 0 rgba(0, 0, 0, 0.14);
  background-color: #fff;
`;

@observer
class GoodsCard extends Component {
  render() {
    return <Container>GoodsCard</Container>;
  }
}

export default GoodsCard;
