import React, { Component } from "react";
import styled from "styled-components";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

import FilterList from "../components/FilterList";
import GoodsCard from "../components/GoodsCard";
import goodsListResult from "../api/goodsListResult";

const FilterBackground = styled.div`
  height: 200px;
  background-color: #f7f7f7;
  padding: 52px 0;
`;

const FilterContainer = styled.ul`
  background-color: #fff;
  width: 1100px;
  margin: 0 auto;

  > li {
    box-shadow: inset 0 -1px 0 0 #e1e1e1;
    padding: 14px 0 14px 40px;
  }
`;

const ListContainer = styled.div`
  width: 1100px;
  margin: 60px auto;
`;

const ResultText = styled.p`
  margin-bottom: 24px;
  font-size: 16px;
  font-weight: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #222;
  span {
    display: inline-block;
    color: #3d6afe;
  }
`;

const GoodsListContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 36px;
  > li {
    width: 350px;
  }
`;

const MoreViewButton = styled.button`
  display: block;
  width: 350px;
  height: 40px;
  border-radius: 4px;
  border: solid 1px #ccc;
  background-color: #fff;
  font-weight: bold;
  line-height: 40px;
  letter-spacing: normal;
  text-align: center;
  color: #666;
  margin: 0 auto 60px;
`;

@observer
class GoodsList extends Component {
  @observable goodsListData = goodsListResult.list;
  @observable goodsTotal = goodsListResult.total;
  render() {
    return (
      <>
        <FilterBackground>
          <FilterContainer>
            <li>
              <FilterList
                title={"상품유형"}
                plainOptions={["건축자금", "부동산 담보"]}
              />
            </li>
            <li>
              <FilterList
                title={"채권상태"}
                plainOptions={["대기중", "모집중"]}
              />
            </li>
          </FilterContainer>
        </FilterBackground>
        <ListContainer>
          <ResultText>
            총 <span>{this.goodsTotal}</span>건의 상품이 검색되었습니다.
          </ResultText>
          <GoodsListContainer>
            {this.goodsListData.map(goodsData => (
              <li key={goodsData.id}>
                <GoodsCard goodsData={goodsData} />
              </li>
            ))}
          </GoodsListContainer>
        </ListContainer>
        <MoreViewButton type="button">더보기 (1/83)</MoreViewButton>
      </>
    );
  }
}

export default GoodsList;
