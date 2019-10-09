import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

const Container = styled.div`
  position: relative;
  width: 350px;
  height: 414px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 1px -1px rgba(0, 0, 0, 0.12),
    0 1px 1px 0 rgba(0, 0, 0, 0.14);
  background-color: #fff;
  margin-bottom: 24px;
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
  line-height: 24px;
  background-color: #ee1d62;
  z-index: 10;
  font-size: 14px;
  font-weight: bold;
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
  background: #e1e1e1;
`;

const ProgressBackground = styled.div`
  height: 6px;
  background-image: linear-gradient(to right, #5ac3fc, #3d6afe);
  width: ${({ width }) => width}%;
`;

const PercentContainer = styled.div`
  position: absolute;
  bottom: 11px;
  width: 74px;
  padding: 0 6px;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
  height: 24px;
  line-height: 24px;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 2px 1px -1px rgba(0, 0, 0, 0.2),
    0 1px 1px 0 rgba(0, 0, 0, 0.2);
  background-color: #3d6afe;
  left: ${props =>
    props.percent > 50
      ? `calc(${props.percent}% - 74px)`
      : `${props.percent}%`};
  :after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: ${props => (props.percent > 50 ? "62px" : "0")};
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px;
    border-color: ${props =>
      props.percent > 50
        ? "transparent #3d6afe transparent transparent"
        : "transparent transparent transparent #3d6afe"};
  }
`;

const InformationContainer = styled.div`
  padding: 16px;
  position: relative;
`;

const ContractTypeText = styled.p`
  margin-bottom: 4px;
  width: 64px;
  height: 24px;
  border-radius: 5px;
  background-color: #f7f7f7;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  line-height: 24px;
  letter-spacing: normal;
  color: #666;
  text-align: center;
`;

const InformationBox = styled.ul`
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  > li {
    font-size: 20px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: rgba(0, 0, 0, 0.87);
    padding-left: 16px;
    margin-left: 16px;
    position: relative;
    :first-child {
      padding: 0;
      margin: 0;
      font-size: 30px;
      color: #3d6afe;
    }
    :after {
      content: "";
      display: block;
      width: 1px;
      height: 14px;
      background-color: rgba(0, 0, 0, 0.6);
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -7px;
    }
    :first-child:after {
      display: none;
    }
  }
`;

const DetailText = styled.p`
  font-size: 16px;
  font-weight: normal;
  line-height: normal;
  letter-spacing: normal;
  color: rgba(0, 0, 0, 0.87);
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  display: flex;
  justify-content: space-between;
  button,
  a {
    display: block;
    border-width: 1px;
    border-style: solid;
    width: 155px;
    height: 40px;
    padding: 0;
    border-radius: 4px;
    line-height: 40px;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: normal;
    text-align: center;
  }
`;

const GoodsDetailButton = styled(Link)`
  border-color: #3d6afe;
  color: #3d6afe;
`;

const FundButton = styled.button`
  border-color: transparent;
  background-color: #3d6afe;
  color: #fff;
  :hover {
    background-color: #1450fe;
  }
`;

const ComingSoonButton = styled.button`
  background-color: #a8a8a8;
  color: #fff;
`;

@observer
class GoodsCard extends Component {
  render() {
    const { goodsData } = this.props;
    return (
      <Container>
        <ImageContainer>
          {goodsData.soldOutSoon === "TRUE" && (
            <SoldOutSoonBox>마감임박</SoldOutSoonBox>
          )}
          <GoodsImage
            src={goodsData.url}
            alt={goodsData.title}
            title={goodsData.title}
          />
          <ProgressBarContainer>
            {goodsData.typedStatus === "모집중" && (
              <PercentContainer percent={goodsData.currentRate}>
                {goodsData.currentRate}% 달성
              </PercentContainer>
            )}
            {goodsData.typedStatus === "모집중" && (
              <ProgressBackground width={goodsData.currentRate} />
            )}
          </ProgressBarContainer>
        </ImageContainer>
        <InformationContainer>
          <ContractTypeText>{goodsData.contractType}</ContractTypeText>
          <InformationBox>
            <li>{goodsData.rateOfReturn}%</li>
            <li>{goodsData.loanPeriod}개</li>
            <li>{goodsData.grade}</li>
            <li>{goodsData.targetAmount / 100000000}억</li>
          </InformationBox>
          <DetailText>{goodsData.title}</DetailText>
        </InformationContainer>
        <ButtonContainer>
          <GoodsDetailButton to={`/products/${goodsData.id}`}>
            상세보기
          </GoodsDetailButton>
          {goodsData.typedStatus === "모집중" ? (
            <FundButton type="button">바로투자</FundButton>
          ) : (
            <ComingSoonButton type="button" disabled>
              오픈예정
            </ComingSoonButton>
          )}
        </ButtonContainer>
      </Container>
    );
  }
}

export default GoodsCard;
