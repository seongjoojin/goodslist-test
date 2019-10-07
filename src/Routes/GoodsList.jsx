import React, { Component } from "react";
import styled from "styled-components";
import { Checkbox } from "antd";
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

const CheckboxGroup = Checkbox.Group;

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

const FilterTitle = styled.strong`
  font-size: 14px;
  font-weight: bold;
  color: #222;
  display: inline-block;
  width: 120px;
`;

const GrayLine = styled.span`
  display: inline-block;
  width: 1px;
  height: 16px;
  background-color: #e1e1e1;
  margin: 0 40px;
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

@observer
class GoodsList extends Component {
  @observable typeCheckedList = [];
  @observable typeIndeterminate = false;
  @observable typeCheckAll = false;
  @observable typePlainOptions = ["건축자금", "부동산 담보"];
  @observable statusCheckedList = [];
  @observable statusIndeterminate = false;
  @observable statusCheckAll = false;
  @observable statusPlainOptions = ["대기중", "모집중"];

  @action
  onTypeChange = value => {
      this.typeCheckedList = value;
      this.typeIndeterminate =
        !!value.length &&
        value.length < this.typePlainOptions.length;
      this.typeCheckAll =
        value.length === this.typePlainOptions.length;
  };

  @action
  onTypeCheckAllChange = e => {
    this.typeCheckedList = e.target.checked ? this.typePlainOptions : [];
    this.typeIndeterminate = false;
    this.typeCheckAll = e.target.checked;
  };

  @action
  onStatusChange = value => {
    this.statusCheckedList = value;
    this.statusIndeterminate = !!value.length &&
      value.length < this.statusPlainOptions.length;
    this.statusCheckAll = value.length === this.statusPlainOptions.length;
  };

  @action
  onStatusCheckAllChange = e => {
    this.statusCheckedList = e.target.checked ? this.statusPlainOptions : [];
    this.statusIndeterminate = false;
    this.statusCheckAll = e.target.checked;
  };
  render() {
    return (
      <>
        <FilterBackground>
          <FilterContainer>
            <li>
              <FilterTitle>상품유형</FilterTitle>
              <Checkbox
                indeterminate={this.typeIndeterminate}
                onChange={this.onTypeCheckAllChange}
                checked={this.typeCheckAll}
              >
                전체
              </Checkbox>
              <GrayLine />
              <CheckboxGroup
                options={this.typePlainOptions}
                value={this.typeCheckedList}
                onChange={this.onTypeChange}
              />
            </li>
            <li>
              <FilterTitle>채권상태</FilterTitle>
              <Checkbox
                indeterminate={this.statusIndeterminate}
                onChange={this.onStatusCheckAllChange}
                checked={this.statusCheckAll}
              >
                전체
              </Checkbox>
              <GrayLine />
              <CheckboxGroup
                options={this.statusPlainOptions}
                value={this.statusCheckedList}
                onChange={this.onStatusChange}
              />
            </li>
          </FilterContainer>
        </FilterBackground>
        <ListContainer>
          <ResultText>총 <span>1,666</span>건의 상품이 검색되었습니다.</ResultText>
        </ListContainer>
      </>
    );
  }
}

export default GoodsList;
