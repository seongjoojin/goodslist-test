import React, { Component } from "react";
import styled from "styled-components";
import { Checkbox } from "antd";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

const CheckboxGroup = Checkbox.Group;

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

@observer
class FilterList extends Component {
  @observable checkedList = this.props.plainOptions;
  @observable indeterminate = false;
  @observable checkAll = true;

  @action
  onChange = value => {
    this.checkedList = value;
    this.indeterminate =
      !!value.length && value.length < this.props.plainOptions.length;
    this.checkAll = value.length === this.props.plainOptions.length;
  };

  @action
  onCheckAllChange = e => {
    this.checkedList = e.target.checked ? this.props.plainOptions : [];
    this.indeterminate = false;
    this.checkAll = e.target.checked;
  };

  render() {
    const { title, plainOptions } = this.props;
    return (
      <>
        <FilterTitle>{title}</FilterTitle>
        <Checkbox
          indeterminate={this.indeterminate}
          onChange={this.onCheckAllChange}
          checked={this.checkAll}
        >
          전체
        </Checkbox>
        <GrayLine />
        <CheckboxGroup
          options={plainOptions}
          value={this.checkedList}
          onChange={this.onChange}
        />
      </>
    );
  }
}

export default FilterList;
