"use client";

import styled from "styled-components";

export const Loading = () => {
  return (
    <Content className="loading">
      <BarComponent className="loading-bar" />
      <p>A gerar os pares...</p>
    </Content>
  );
};

const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  row-gap: 8px;
  opacity: 0;

  p {
    color: black;
    font-family: var(--font-josefin);
    text-align: center;
  }
`;

const BarComponent = styled.div`
  position: relative;
  width: 200px;
  height: 20px;
  border: 2px solid black;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transform-origin: left center;
    transform: scaleX(0);
    height: 100%;
    background: black;
    transition: transform 4000ms ease-in-out 800ms;
  }
`;
