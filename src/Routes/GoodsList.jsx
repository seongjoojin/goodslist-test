import React, { Component } from "react";
import styled from "styled-components";
import { Checkbox } from "antd";

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

class GoodsList extends Component {
  state = {
    typeCheckedList: [],
    typeIndeterminate: false,
    typeCheckAll: false,
    typePlainOptions: ["건축자금", "부동산 담보"],
    statusCheckedList: [],
    statusIndeterminate: false,
    statusCheckAll: false,
    statusPlainOptions: ["대기중", "모집중"]
  };

  onTypeChange = typeCheckedList => {
    this.setState({
      typeCheckedList,
      typeIndeterminate:
        !!typeCheckedList.length &&
        typeCheckedList.length < this.state.typePlainOptions.length,
      typeCheckAll:
        typeCheckedList.length === this.state.typePlainOptions.length
    });
  };

  onTypeCheckAllChange = e => {
    this.setState({
      typeCheckedList: e.target.checked ? this.state.typePlainOptions : [],
      typeIndeterminate: false,
      typeCheckAll: e.target.checked
    });
  };

  onStatusChange = statusCheckedList => {
    this.setState({
      statusCheckedList,
      statusIndeterminate:
        !!statusCheckedList.length &&
        statusCheckedList.length < this.state.statusPlainOptions.length,
      statusCheckAll:
        statusCheckedList.length === this.state.statusPlainOptions.length
    });
  };

  onStatusCheckAllChange = e => {
    this.setState({
      statusCheckedList: e.target.checked ? this.state.statusPlainOptions : [],
      statusIndeterminate: false,
      statusCheckAll: e.target.checked
    });
  };
  render() {
    return (
      <>
        <FilterBackground>
          <FilterContainer>
            <li>
              <FilterTitle>상품유형</FilterTitle>
              <Checkbox
                indeterminate={this.state.typeIndeterminate}
                onChange={this.onTypeCheckAllChange}
                checked={this.state.typeCheckAll}
              >
                전체
              </Checkbox>
              <GrayLine />
              <CheckboxGroup
                options={this.state.typePlainOptions}
                value={this.state.typeCheckedList}
                onChange={this.onTypeChange}
              />
            </li>
            <li>
              <FilterTitle>채권상태</FilterTitle>
              <Checkbox
                indeterminate={this.state.statusIndeterminate}
                onChange={this.onStatusCheckAllChange}
                checked={this.state.statusCheckAll}
              >
                전체
              </Checkbox>
              <GrayLine />
              <CheckboxGroup
                options={this.state.statusPlainOptions}
                value={this.state.statusCheckedList}
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
