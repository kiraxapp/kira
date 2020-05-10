import React from 'react';
import styled from 'styled-components';
import { Text, VStack, Article, Shimmer } from '@kira/ui';
import { FlowState, use_application_state } from '@kira/application-state';
import { Backend } from '../../backend/mod';

/**
 * change this
 */
export namespace ProjectNav {
  export interface Props {}

  const elements = {
    nav: styled.div`
      padding: 25px 20px 0;
      width: 300px;
    `,
  };

  const Skeleton: React.FC = () => {
    return (
      <Article.h>
        <Text.h4>
          <Shimmer.h width={100} height={32} />
        </Text.h4>
        <VStack.h spacing={20}>
          <Shimmer.h width={180} height={10} opacity={0.9} />
          <Shimmer.h width={150} height={10} opacity={0.8} />
          <Shimmer.h width={170} height={10} opacity={0.7} />
          <Shimmer.h width={130} height={10} opacity={0.6} />
          <Shimmer.h width={190} height={10} opacity={0.5} />
          <Shimmer.h width={110} height={10} opacity={0.4} />
          <Shimmer.h width={170} height={10} opacity={0.3} />
          <Shimmer.h width={130} height={10} opacity={0.2} />
          <Shimmer.h width={170} height={10} opacity={0.1} />
        </VStack.h>
      </Article.h>
    );
  };

  export const h: React.FC<Props> = function nav() {
    const [projects, projects_action] = use_application_state(Backend.projectControllerService.loaded_projects);

    return (
      <elements.nav role='navigation'>
        {projects_action === FlowState.ACCESSIBLE ? (
          <Article.h>
            <Text.h3>{projects.entries.find((project) => project.id === projects.selected_id)?.name}</Text.h3>
            <VStack.h spacing={20}></VStack.h>
          </Article.h>
        ) : (
          <Skeleton />
        )}
      </elements.nav>
    );
  };
}
