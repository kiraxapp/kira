import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Backend } from '../../backend/mod';
import { ProjectAside } from './project_aside.component';
import { ProjectContextualizedContent } from './project_contextualized_content.component';

/**
 * change this
 */
export namespace Projects {
  interface Props {}

  const elements = {
    application: styled.div`
      flex: 1;
      display: flex;
      flex-direction: row;
      overflow: hidden;
    `,
  };

  export const h: React.FC<Props> = function projects() {
    useEffect(() => {
      document.title = 'project';

      return Backend.projectControllerService.fetch_entires();
    }, []);

    return (
      <elements.application>
        <ProjectAside.h />
        <ProjectContextualizedContent.h />
      </elements.application>
    );
  };
}
