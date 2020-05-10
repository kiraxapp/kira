import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ProjectBar } from './project_bar.component';
import { ProjectNav } from './project_nav.component';

/**
 * change this
 */
export namespace ProjectAside {
  export interface Props {}

  const elements = {
    aside: styled.div`
      display: flex;
      background: var(--base, #09090c);
    `,
  };

  export const h: React.FC<Props> = function aside() {
    useEffect(() => {
      return () => {};
    }, []);

    return (
      <elements.aside>
        <ProjectBar.h />
        <ProjectNav.h />
      </elements.aside>
    );
  };
}
