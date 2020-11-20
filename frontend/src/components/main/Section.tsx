import React from "react";

import styled from "styled-components";

const Container = styled.div`
  position: relative;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Title = styled.div`
  font-size: 30px;
  padding: 5px 0px;
  margin-bottom: 20px;
`;

export interface SectionComponentProps {
  title?: string;
  children?: React.ReactNode;
}

const SectionComponent: React.FC<SectionComponentProps> = ({
  title,
  children,
}) => {
  return (
    <Container>
      <Title>{title}</Title>
      {children}
    </Container>
  );
};

export default SectionComponent;
