import React, { Component } from "react";
import styled from "styled-components";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";

import Checkbox from "./Checkbox";

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
  vertical-align: middle;
`;

const CheckboxGroup = styled.ul`
  display: inline-block;
  > li {
    display: inline-block;
    margin-left: 32px;
    :first-child {
      margin: 0;
    }
  }
`;

@inject("checklist")
@observer
class FilterList extends Component {
  @observable checkboxes = this.props.plainOptions.reduce(
    (options, option) => ({
      ...options,
      [option]: true
    }),
    {}
  );
  @observable checkAll = true;

  @action
  onChange = e => {
    this.checkboxes = {
      ...this.checkboxes,
      [e.target.name]: e.target.checked
    };
    this.checkAll = !Object.values(this.checkboxes).includes(false);
  };

  @action
  onCheckAllChange = e => {
    e.target.name.split(",").forEach(item => {
      this.checkboxes = { ...this.checkboxes, [item]: e.target.checked };
    });
    this.checkAll = e.target.checked;
  };

  render() {
    const { title, plainOptions } = this.props;
    return (
      <>
        <FilterTitle>{title}</FilterTitle>
        <Checkbox
          id={title}
          label="전체"
          name={plainOptions}
          isSelected={this.checkAll}
          onCheckboxChange={this.onCheckAllChange}
        />
        <GrayLine />
        <CheckboxGroup>
          {plainOptions.map(item => (
            <li key={item}>
              <Checkbox
                id={item}
                label={item}
                name={item}
                isSelected={this.checkboxes[item]}
                onCheckboxChange={this.onChange}
              />
            </li>
          ))}
        </CheckboxGroup>
      </>
    );
  }
}

export default FilterList;
