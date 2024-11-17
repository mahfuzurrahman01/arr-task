"use client"

import styled from "@emotion/styled"

export const SubmitButton = styled.button`
  background-color: ${(props) =>
    props?.packageId == 'free'
    && "var(--primary-color)"
    || props?.packageId == 'basic' && "var(--primary-color-basic)"
    || props?.packageId == "pro" && "var(--primary-color-pro)"
    || props?.packageId == "growth" && "var(--primary-color-growth)"
  };
  border-radius: 8px;
  box-sizing: border-box;
  color: #fff;
  display: block;
  font-weight: 400;
  line-height: 40px;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s;
  border: none;
  font-size: 16px;
  position: absolute;
  bottom: 20px;
  cursor: pointer;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
  &:hover {
    background-color: ${(props) =>
    props?.packageId == 'free'
    && "var(--primary-dark-color)" ||
    props?.packageId == 'basic'
    && "var(--primary-dark-color-basic)" ||
    props?.packageId == "pro" && "var(--primary-dark-color-pro)" ||
    props?.packageId == "growth" && "var(--primary-dark-color-growth)"};
  }
`
export const MostPopularBUtton = styled.button`
    background-color: var(--primary-color-pro);
    border-radius: 3px;
    color: #fff;
    display: inline-block;
    font-size: 12px;
    font-weight: 500;
    line-height: 1;
    padding: 6.5px 8px;
    position: absolute;
    right: 6px;
    top: 6px;
    border: none;
`
