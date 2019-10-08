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

const ImageContainer = styled.div`
  position: relative;
  height: 201px;
`;

const GoodsImage = styled.img`
  display: inline-block;
  width: 100%;
  height: 100%;
`;

const SoldOutSoonBox = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 72px;
  height: 24px;
  background-color: #ee1d62;
  z-index: 10;
  font-size: 14px;
  font-weight: bold;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
`;

const ProgressBarContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
  height: 6px;
`;

const ProgressBackground = styled.div`
  height: 6px;
  background-image: linear-gradient(to right, #5ac3fc, #3d6afe);
  width: ${({ width }) => width}%;
`;

@observer
class GoodsCard extends Component {
  render() {
    const { goodsData } = this.props;
    return (
      <Container>
        <ImageContainer>
          {goodsData.soldOutSoon === "TRUE" ? (
            <SoldOutSoonBox>마감임박</SoldOutSoonBox>
          ) : (
            <></>
          )}
          <GoodsImage
            src={goodsData.url}
            alt={goodsData.title}
            title={goodsData.title}
          />
          <ProgressBarContainer>
            <ProgressBackground width={goodsData.rateOfReturn} />
          </ProgressBarContainer>
        </ImageContainer>
      </Container>
    );
  }
}

export default GoodsCard;
