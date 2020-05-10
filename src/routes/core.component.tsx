import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Text, Article, HSpacing } from '@kira/ui';
import { Timer } from '@kira/std';
import { Icon } from '../components/icon';
import { Link } from 'react-router-dom';

/**
 * change this
 */
export namespace Core {
  export interface Props {}

  const shared_transition = 'cubic-bezier(0.73, 0.32, 0.32, 1)';
  const delay_before_initial_animation = 500;
  const shared_animation_length = 1000;
  const idle_animation_length = 5000;

  const elements = {
    intro: styled.div`
      display: flex;
      align-items: center;
      font-size: max(400px, 20vw);
      flex-direction: column;
      width: 100%;
      padding-bottom: 100px;

      h1 {
        font-weight: 600;
      }
    `,
    content: styled.div`
      display: flex;
      margin: 0 auto;
      width: 100%;
      max-width: 1024px;
      align-items: center;
      flex-direction: column;
    `,
    background: styled.div`
      min-height: 100vh;
      padding-top: 60px;
      width: 100%;
      background: var(--main, #000);
      display: flex;
      flex-direction: column;
    `,
    section: styled.section<{ background?: string }>`
      ${({ background }) => background && `background: ${background};`}
      min-height: 90vh;
      width: 100%;
    `,
    title: styled.div`
      display: flex;
      flex-direction: column;
      transform: scale(0.9) translateY(-50px);
      transition: ${shared_animation_length}ms ${shared_transition};
      opacity: 0;

      .delayed {
        transform: translateY(50px);
        transition: ${shared_animation_length}ms cubic-bezier(0.08, 1.2, 0.38, 1) 580ms;
        opacity: 0;
      }

      &.revile {
        transform: scale(1) translateY(0);
        opacity: 1;

        .delayed {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `,
    logo: styled.div<{ extra_float_amount: boolean }>`
      display: flex;
      transform: scale(0.6) rotateX(40deg);
      transition: 900ms ${shared_transition};
      opacity: 0;

      #logo_core_top {
        transform: translateY(150px);
        transition: transform ${shared_animation_length}ms ${shared_transition};
      }

      #logo_core_middle {
        opacity: 0;
        transform: translateY(72px);
        transition: transform ${shared_animation_length}ms ${shared_transition} 20ms;
      }

      #logo_core_bottom {
        transform: translateY(-1px);
        opacity: 0;
        transition: transform ${shared_animation_length}ms ${shared_transition};
      }

      &.revile {
        transform: scale(1) rotateX(0);
        opacity: 1;

        #logo_core_top {
          transform: translateY(0px);
        }

        #logo_core_middle {
          opacity: 1;
          transform: translateY(0px);
        }

        #logo_core_bottom {
          transform: translateY(0px);
          opacity: 1;
        }
      }

      &.idle {
        #logo_core_middle {
          transform: translateY(${({ extra_float_amount: extraFloatAmount }) => (extraFloatAmount ? -10 : 0)}px);
          transition: ${idle_animation_length}ms ${shared_transition};
        }

        #logo_core_bottom {
          transform: translateY(${({ extra_float_amount: extraFloatAmount }) => (extraFloatAmount ? -25 : 0)}px);
          transition: ${idle_animation_length}ms ${shared_transition};
        }
      }
    `,
  };

  const Section: React.FC<{ background?: string }> = ({ children, background }) => {
    return (
      <elements.section background={background}>
        <elements.content>{children}</elements.content>
      </elements.section>
    );
  };

  export const h: React.FC<Props> = function core() {
    const [revile, set_revile] = useState(false);
    const [idle_transition, set_idle_transition] = useState(false);
    const [float_value, set_float_value] = useState(false);

    useEffect(() => {
      document.title = 'Kira Core';

      const timer = new Timer();

      timer.wait(() => {
        set_revile(true);
      }, delay_before_initial_animation);

      timer.wait(() => {
        set_idle_transition(true);

        let alternate_value = float_value;

        timer.repeat(
          () => {
            alternate_value = !alternate_value;

            set_float_value(alternate_value);
          },
          idle_animation_length,
          true,
        );
      }, delay_before_initial_animation + shared_animation_length - 100);

      return () => {
        timer.flush();
      };
    }, []);

    return (
      <elements.background>
        <Section>
          <elements.intro>
            <elements.logo
              className={`${revile ? 'revile' : undefined} ${idle_transition ? 'idle' : undefined}`}
              extra_float_amount={float_value}
            >
              <Icon.logo_core />
            </elements.logo>
            <elements.title className={revile ? 'revile' : undefined}>
              <Article.h center>
                <Text.h1>Kira Core</Text.h1>
                <Text.h2 className='delayed'>
                  <Link to='/api'>
                    Go to api documentation
                    <HSpacing.h px={10} />
                    <Icon.eva_arrow_forward center />
                  </Link>
                </Text.h2>
              </Article.h>
            </elements.title>
          </elements.intro>
        </Section>
        <Section background='#141317'>
          <Article.h>
            <Text.h3>WIP</Text.h3>
            <Text.h4>everything is still in development</Text.h4>
          </Article.h>
        </Section>
      </elements.background>
    );
  };
}
