import React from "react";
import styled from "styled-components";

const CheckboxContainer = styled.div`
  display: inline-block;

  input[type="checkbox"] {
    display: none;
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  input[type="checkbox"] + label:before {
    content: " ";
    display: inline-block;
    width: 16px;
    height: 16px;
    margin: -2px 8px 0 0;
    text-align: center;
    vertical-align: middle;
    background: #fff;
    border: 1px solid #ccc;
    line-height: 1;
  }

  input[type="checkbox"] + label:active:before,
  input[type="checkbox"]:checked + label:active:before {
    color: #3d6afe;
    font-weight: bold;
    font-size: 14px;
  }

  input[type="checkbox"]:checked + label:before {
    content: "\\2713";
    color: #3d6afe;
    font-weight: bold;
    font-size: 14px;
    text-shadow: 1px 1px white;
  }

  label {
    display: inline-block;
    font-size: 14px;
    font-weight: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #222;
  }
`;

const Checkbox = ({ id, name, label, isSelected, onCheckboxChange }) => (
  <CheckboxContainer>
    <input id={id} type="checkbox" checked={isSelected} name={name} onChange={onCheckboxChange} />
    <label htmlFor={id}>{label}</label>
  </CheckboxContainer>
);

export default Checkbox;
