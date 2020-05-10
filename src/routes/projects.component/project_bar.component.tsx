import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { BaseButton, AnchorPoint } from '@kira/ui-std';
import { VStack, Separator, Shimmer } from '@kira/ui';
import { FlowState, use_application_state } from '@kira/application-state';
import { Icon } from '../../components/icon';
import { motion } from 'framer-motion';
import { Tooltip } from '../../components/tooltip';
import { Link } from 'react-router-dom';
import { Backend } from '../../backend/mod';

/**
 * change this
 */
export namespace ProjectBar {
  export interface Props {}

  const elements = {
    projectBar: styled.div`
      display: flex;
      justify-content: center;
      width: 75px;
      background: var(--base_2, #000000);
      padding: 20px 0;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    `,
    project: styled(BaseButton.h)<{ color?: string }>`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 44px;
      height: 44px;
      background: ${({ color }) => color ?? '#ffffff'};
      border-radius: 15px;
      flex-shrink: 0;
    `,
    popover: styled(motion.div)<{ x: number; y: number }>`
      pointer-events: all;
      position: absolute;
      top: ${({ y }) => y}px;
      left: ${({ x }) => x}px;
      transform-origin: 0 0;
    `,
    tooltip: styled.div`
      background-color: #333333;
      padding: 10px;
      border-radius: 6px;
      transform: translateY(-50%);
      box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05), 0 4px 10px rgba(0, 0, 0, 0.3);
      text-transform: capitalize;
      font-size: 0.75rem;
    `,
    popoverContent: styled(motion.ul)`
      background-color: #333333;
      border-radius: 6px;
      box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05), 0 4px 10px rgba(0, 0, 0, 0.3);
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      font-size: 0.75rem;
      line-height: 1.2;
      margin: 0;
      padding: 6px 0;
      position: absolute;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      z-index: 1;
    `,
    popoverItem: styled.li`
      color: #ffffff;
      cursor: default;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 4px 12px 4px 22px;
      position: relative;
      white-space: pre;

      &:hover {
        background-color: #09f;
        color: #fff;
        z-index: 2;
      }

      &.separator {
        background-color: #3e3e3e;
        height: 1px;
        margin: 6px 0;
        padding: 0;
      }
    `,
  };

  const ProjectButton: React.FC<{
    id: string;
    color?: string;
    className?: string;
    onClick: (attachTo: string) => void;
    onHover: (attachTo: string) => void;
  }> = function project_button({ children, id, color, className, onClick, onHover }) {
    return (
      <elements.project
        className={className}
        color={color ?? '#333333'}
        onClick={() => onClick(id)}
        onMouseEnter={() => onHover(id)}
        onMouseLeave={() => onHover('')}
        onFocus={() => onHover(id)}
        onBlur={() => onHover('')}
      >
        <AnchorPoint.h name={id} top='-x-' left='-x' />
        {children ?? null}
      </elements.project>
    );
  };

  export const h: React.FC<Props> = function bar() {
    const [show_popover, set_show_popover] = useState('');
    const [projects, projects_flow] = use_application_state(Backend.projectControllerService.loaded_projects);

    console.log(projects_flow);

    function handle_project_click(attach_to: string) {
      Backend.projectControllerService.loaded_projects.mutate(() => {
        return {
          selected_id: attach_to,
        };
      });
    }

    function handle_project_hover(attach_to: string) {
      set_show_popover(attach_to);
    }

    function handle_project_add_click() {
      // noop
    }

    return (
      <elements.projectBar>
        <Tooltip.h attachTo={show_popover} visible={show_popover !== ''} text={show_popover} />

        <VStack.h spacing={12} fluid={false}>
          <elements.project key={'home'} color='#333333'>
            <Icon.logo />
          </elements.project>

          <Separator.h padding={10} />

          {projects_flow === FlowState.ACCESSIBLE ? (
            <Fragment key={'vvvvvvv'}>
              {projects.entries.map(({ id }) => (
                <ProjectButton id={id} onClick={handle_project_click} onHover={handle_project_hover} key={'zzzz'}>
                  {id}
                </ProjectButton>
              ))}

              <elements.project
                color='#333333'
                onClick={() => handle_project_add_click()}
                onMouseEnter={() => handle_project_click('add')}
                onMouseLeave={() => handle_project_click('')}
                onFocus={() => handle_project_click('add')}
                onBlur={() => handle_project_click('')}
              >
                <AnchorPoint.h name={'add'} top='-x-' left='-x' />
                <Icon.eva_plus />
              </elements.project>
            </Fragment>
          ) : (
            <Fragment key={'xxxxxx'}>
              <Shimmer.h height={44} width={44} cornerRadius={15} />
              <Shimmer.h height={44} width={44} cornerRadius={15} opacity={0.7} />
            </Fragment>
          )}
        </VStack.h>

        <elements.project color='#333333'>
          <Icon.eva_person />
        </elements.project>

        <elements.popover
          x={500}
          y={500}
          onClick={() => {
            set_show_popover('');
          }}
        >
          <elements.popoverContent initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <elements.popoverItem>Add to x</elements.popoverItem>
            <elements.popoverItem>Add to y</elements.popoverItem>
            <elements.popoverItem>Add to z</elements.popoverItem>
            <elements.popoverItem className='separator' />
            <elements.popoverItem>Replace with ...</elements.popoverItem>
            <elements.popoverItem className='separator' />
            <Link to='/'>
              <elements.popoverItem>Remove</elements.popoverItem>
            </Link>
          </elements.popoverContent>
        </elements.popover>
      </elements.projectBar>
    );
  };
}
