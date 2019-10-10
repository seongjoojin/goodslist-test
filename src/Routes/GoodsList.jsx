import React, { Component } from "react";
import styled from "styled-components";
import { observable, action, computed, reaction } from "mobx";
import { observer, inject, disposeOnUnmount } from "mobx-react";

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
  justify-content: flex-start;
  margin-bottom: 36px;
  > li {
    width: 350px;
    margin-left: 25px;
    :first-child,
    :nth-child(3n + 1) {
      margin: 0;
    }
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

@inject("checklist")
@observer
class GoodsList extends Component {
  @observable listData = goodsListResult.list.sort(function(a, b) {
    return a.currentRate > b.currentRate
      ? -1
      : b.currentRate > a.currentRate
      ? 1
      : 0;
  });
  @observable sortedListData = null;
  @observable goodsListData = this.listData.slice(0, 5);
  @observable goodsTotal = goodsListResult.total;
  @observable currentPage = 1;
  @observable maxPage =
    goodsListResult.total % 5
      ? Math.ceil(goodsListResult.total / 5)
      : goodsListResult.total / 5;

  @action
  onAddList = () => {
    if (this.currentPage < this.maxPage) {
      let currentPageNumber = this.currentPage + 1;
      const sliceList = goodsListResult.list.slice(
        (currentPageNumber - 1) * 5,
        currentPageNumber * 5
      );
      this.goodsListData = this.goodsListData.concat(sliceList);
      this.currentPage = currentPageNumber;
    }
  };

  @computed get typedStatusFilterValue() {
    if (
      this.props.checklist.list.includes("대기중") ^
      this.props.checklist.list.includes("모집중")
    ) {
      return this.props.checklist.list.includes("대기중")
        ? "대기중"
        : this.props.checklist.list.includes("모집중")
        ? "모집중"
        : "";
    } else {
      return "";
    }
  }

  @computed get contractTypeFilterValue() {
    if (
      this.props.checklist.list.includes("부동산담보") ^
      this.props.checklist.list.includes("건축자금")
    ) {
      return this.props.checklist.list.includes("부동산담보")
        ? "부동산담보"
        : this.props.checklist.list.includes("모집중")
        ? "건축자금"
        : "";
    } else {
      return "";
    }
  }

  @disposeOnUnmount
  typedStatusFilter = reaction(
    () => this.typedStatusFilterValue,
    value => {
      if (value !== "" && this.contractTypeFilterValue === "") {
        this.sortedListData = this.listData.filter(
          item => item.typedStatus === value
        );
        this.goodsListData = this.sortedListData.splice(
          0,
          5 * this.currentPage
        );
      } else if (value !== "" && this.contractTypeFilterValue !== "") {
        this.sortedListData = this.listData.filter(
          item =>
            item.typedStatus === value &&
            item.contractType === this.contractTypeFilterValue
        );
        this.goodsListData = this.sortedListData.splice(
          0,
          5 * this.currentPage
        );
      } else if (value === "" && this.contractTypeFilterValue !== "") {
        this.sortedListData = this.listData.filter(
          item => item.contractType === this.contractTypeFilterValue
        );
        this.goodsListData = this.sortedListData.splice(
          0,
          5 * this.currentPage
        );
      } else {
        this.sortedListData = this.listData;
        this.goodsListData = this.sortedListData.splice(
          0,
          5 * this.currentPage
        );
      }
    }
  );

  @disposeOnUnmount
  contractTypeFilter = reaction(
    () => this.contractTypeFilterValue,
    value => {
      if (value !== "" && this.typedStatusFilterValue === "") {
        this.sortedListData = this.listData.filter(
          item => item.contractType === value
        );
        this.goodsListData = this.sortedListData.splice(
          0,
          5 * this.currentPage
        );
      } else if (value !== "" && this.typedStatusFilterValue !== "") {
        this.sortedListData = this.listData.filter(
          item =>
            item.contractType === value &&
            item.typedStatus === this.typedStatusFilterValue
        );
        this.goodsListData = this.sortedListData.splice(
          0,
          5 * this.currentPage
        );
      } else if (value === "" && this.typedStatusFilterValue !== "") {
        this.sortedListData = this.listData.filter(
          item => item.typedStatus === this.typedStatusFilterValue
        );
        this.goodsListData = this.sortedListData.splice(
          0,
          5 * this.currentPage
        );
      } else {
        this.sortedListData = this.listData;
        this.goodsListData = this.sortedListData.splice(
          0,
          5 * this.currentPage
        );
      }
    }
  );

  render() {
    return (
      <>
        <FilterBackground>
          <FilterContainer>
            <li>
              <FilterList
                title={"상품유형"}
                plainOptions={["건축자금", "부동산담보"]}
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
        <MoreViewButton onClick={this.onAddList} type="button">
          더보기 ({this.currentPage}/{this.maxPage})
        </MoreViewButton>
      </>
    );
  }
}

export default GoodsList;
