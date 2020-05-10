import React from 'react';
import styled from 'styled-components';
import { BaseButton } from '@kira/ui-std';
import { HStack } from '@kira/ui';
import { Icon } from '../../components/icon';

/**
 * change this
 */
export namespace ProjectHeader {
  export interface Props {}

  const elements = {
    projectHeader: styled.div`
      height: 55px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    `,
    item: styled(BaseButton.h)`
      width: 28px;
      height: 28px;
      overflow: hidden;
      background-color: #22242a;
      border-radius: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
    `,
  };

  export const h: React.FC<Props> = function user_header() {
    return (
      <elements.projectHeader>
        <HStack.h spacing={10} fluid={false}>
          <div>qwe</div>
        </HStack.h>

        <HStack.h spacing={10} fluid={false}>
          <elements.item>
            <Icon.eva_swap />
          </elements.item>
          <elements.item>
            <Icon.eva_trending />
          </elements.item>
          <elements.item>
            <Icon.eva_trending mirror='Vertical' />
          </elements.item>
          <elements.item>
            <Icon.eva_more />
          </elements.item>
        </HStack.h>
      </elements.projectHeader>
    );
  };
}
