import React, { useState } from 'react';
import styled from 'styled-components';
import { VStack, HStack, Input } from '@kira/ui';

/**
 * change this
 */
export namespace Development {
  export interface Props {}

  const elements = {
    development: styled.div`
      height: 100%;
      min-height: 100vh;
      width: 100%;
      background-color: #000;
    `,
    el: styled.div`
      background-color: red;
    `,
  };

  export const h: React.FC = function development() {
    const [state, setState] = useState(0);

    function handle_click() {
      setState(state + 1);
    }

    return (
      <elements.development>
        <button onClick={handle_click}>plus aasdasdsd asdone!</button> <div>{state}</div>
        <HStack.h fluid={false}>
          <VStack.h spacing={10} fluid>
            <HStack.h spacing={10}>
              <Input.h type='text' />
              <Input.h type='text' />
            </HStack.h>
            <elements.el>element</elements.el>
            <elements.el>element</elements.el>
            <elements.el>element</elements.el>
          </VStack.h>
          <VStack.h fluid>
            <elements.el>element</elements.el>
          </VStack.h>
        </HStack.h>
      </elements.development>
    );
  };
}
