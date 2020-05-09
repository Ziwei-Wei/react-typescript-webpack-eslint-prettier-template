import * as React from "react";
import styled from "styled-components";

const Example = styled.div`
  /* all declarations will be prefixed */
  padding: 2em 1em;
  background: papayawhip;
  /* pseudo selectors work as well */
  &:hover {
    background: palevioletred;
  }
  /* media queries are no problem */
  @media (max-width: 600px) {
    background: tomato;
    /* nested rules work as expected */
    &:hover {
      background: yellow;
    }
  }
  > p {
    /* descendant-selectors work as well, but are more of an escape hatch */
    text-decoration: underline;
  }
  /* Contextual selectors work as well */
  html.test & {
    display: none;
  }
`;

interface HelloProps {
  compiler: string;
  framework: string;
}

const Hello: React.StatelessComponent<HelloProps> = (props: HelloProps) => (
  <Example>
    <p>
      Hello! from {props.compiler} and {props.framework}!
    </p>
  </Example>
);

export default Hello;
