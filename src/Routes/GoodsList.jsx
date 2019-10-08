import React, { Component } from "react";
import styled from "styled-components";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

import FilterList from "../Components/FilterList";

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

@observer
class GoodsList extends Component {
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
            총 <span>1,666</span>건의 상품이 검색되었습니다.
          </ResultText>
        </ListContainer>
      </>
    );
  }
}

export default GoodsList;
