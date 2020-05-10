import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Text, HStack, Button, Article } from '@kira/ui';
import { useViewportScroll } from 'framer-motion';
import { Icon } from '../components/icon';

/**
 * change this
 */
export namespace Home {
  export interface Props {}

  const elements = {
    background: styled.div`
      min-height: 100vh;
      padding-top: 60px;
      width: 100%;
      background: var(--main, #0b0b0e);
      display: flex;
      flex-direction: column;
    `,
    header: styled.header<{ showBorder: boolean }>`
      position: fixed;
      backdrop-filter: blur(5px);
      height: 60px;
      width: 100%;
      align-items: center;
      display: flex;
      padding: 0 15px;
      border-bottom: 1px solid transparent;
      transition: border-color 600ms ease;
      background: rgba(0, 0, 0, 0.85);

      ${({ showBorder }) => showBorder && 'border-color: rgba(255, 255, 255, 0.1);'}

      & .corner {
        width: 100px;
        display: flex;
        flex-shrink: 0;

        &:last-of-type {
          justify-content: flex-end;
        }
      }

      & .inner {
        display: flex;
        margin: 0 auto;
        width: 100%;
        max-width: 1024px;
        align-items: center;
      }

      & .nav {
        flex: 1;
        display: flex;
        justify-content: center;
      }

      & .inner {
        margin: 0 auto;
        width: 100%;
        max-width: 1024px;
      }

      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        opacity: 0.1;
        background: #0b0b0e;
        pointer-events: none;
      }
    `,
    main: styled.main`
      flex: 1;
      display: flex;
      flex-direction: column;
    `,
    section: styled.section<{ background: string; color: string; padding: number }>`
      display: flex;
      padding: ${({ padding }) => padding}px 25px 30px;
      flex-direction: column;
      min-height: 90vh;
      width: 100%;
      background-color: ${({ background }) => background};
      color: ${({ color }) => color};

      & .inner {
        max-width: 1024px;
        margin: 0 auto;
        width: 100%;
      }
    `,
    footer: styled.footer`
      height: 400px;
      padding: 25px 15px;
      flex-shrink: 0;
      background: #000000;
    `,
  };

  const Section: React.FC<{ background: string; color: string; padding?: number }> = function home_section({
    background,
    color,
    padding,
    children,
  }) {
    return (
      <elements.section background={background} color={color} padding={padding ?? 30}>
        <div className='inner'>{children}</div>
      </elements.section>
    );
  };

  const Header: React.FC = function home_header() {
    const { scrollYProgress } = useViewportScroll();
    const [show_border, set_show_border] = useState(false);

    useEffect(() => {
      scrollYProgress.onChange((value) => {
        if (value > 0.05) {
          set_show_border(true);
        } else {
          set_show_border(false);
        }
      });
    }, []);

    return (
      <elements.header showBorder={show_border}>
        <div className='inner'>
          <div className='corner'>
            <Icon.logo />
          </div>
          <nav className='nav'>
            <div>
              <HStack.h spacing={80}>
                <a>demo</a>
                <a>developers</a>
                <a>company</a>
                <a>Pricing</a>
              </HStack.h>
            </div>
          </nav>
          <div className='corner'>
            <Button.h>sign in</Button.h>
          </div>
        </div>
      </elements.header>
    );
  };

  export const h: React.FC<Props> = function home() {
    useEffect(() => {
      document.title = 'home';
    }, []);

    return (
      <Fragment>
        <Header />
        <elements.background>
          <elements.main role='main'>
            <Section background='#000' color='#fff' padding={60}>
              <Article.h center>
                <Text.custom size={15}>
                  <Icon.logo_text />
                </Text.custom>
                <Text.h1_plus>ipsum condimentum posuere</Text.h1_plus>
              </Article.h>
            </Section>
            <Section background='#0b0b0e' color='#fff'>
              <Article.h>
                <Text.h1>Lorem ipsum</Text.h1>
                <Text.body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pulvinar non lacus at maximus. Ut vel risus lacus.
                  Mauris vitae libero elementum, auctor elit et.
                  <br />
                  <br />
                  Donec hendrerit tellus est, in eleifend nulla faucibus vitae. Maecenas lacinia lorem vel arcu dapibus tempus. Vivamus
                  blandit dictum enim.
                </Text.body>
              </Article.h>
            </Section>

            <Section background='#000' color='#fff'>
              <Article.h>
                <Text.h4>metus quis</Text.h4>
                <Text.body>
                  Nunc nec mi id ipsum condimentum posuere eget posuere felis. Suspendisse potenti. Suspendisse quis pretium purus, nec
                  mattis elit. Phasellus tellus metus, commodo
                  <br />
                  <br />
                  Sed mi magna, semper non interdum vel, consectetur eget urna. Fusce non consequat felis. Nam malesuada lectus vitae
                  euismod efficitur. Nullam consequat
                </Text.body>
              </Article.h>
            </Section>
          </elements.main>
          <elements.footer>footer</elements.footer>
        </elements.background>
      </Fragment>
    );
  };
}
