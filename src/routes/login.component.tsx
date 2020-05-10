import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Routes, Route, useNavigate } from 'react-router';
import { Text, HStack, VStack, Button, Input, Article } from '@kira/ui';
import { use_form, form_control } from '@kira/ui-std';
import { SvgWave } from '../components/svg_wave';
import { Icon } from '../components/icon';
import { Timer } from '@kira/std';
import { use_service } from '@kira/instantiation';
import { AuthService } from '../backend/services/auth_service';

/**
 * change this
 */
export namespace Login {
  export interface Props {}

  const elements = {
    main: styled.div`
      flex: 1;
      display: flex;
      flex-direction: row;
      overflow: hidden;
      background: var(--base, #09090c);
      padding: 18% 10% 0;
      align-items: flex-start;
    `,
    form: styled.form`
      display: contents;
    `,
    formWrapper: styled.div`
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 400px;
    `,
  };

  const Content: React.FC = function login_content({ children }) {
    return (
      <elements.main>
        <elements.formWrapper>
          <Article.h center>
            <Text.body>
              <Icon.logo />
            </Text.body>
            <Text.h2>Welcome to Kira</Text.h2>
            {children}
          </Article.h>
        </elements.formWrapper>
      </elements.main>
    );
  };

  /** Form handling when a users is login in */
  const Login_form: React.FC = function login_login_form() {
    const navigate = useNavigate();
    const [loading, set_loading] = useState(false);
    const authService = use_service(AuthService);
    const { forward, set } = use_form({
      email: form_control(''),
      password: form_control(''),
    });

    const handle_submit = forward(() => {
      set_loading(true);

      // Fakes login for now
      Timer.wait(() => {
        authService.request_sign_in();
        navigate('/projects');
      }, 200);

      /*         System.use_bridge(Identity.Bridge).sign_in(
        {
          email: body.email as string,
          password: body.password as string,
        },
        ({ success }) => {
          if (success) {
            navigate('/');
          } else {
            set_loading(false);
          }
        },
      ); */
    });

    return (
      <Fragment>
        <Text.h4>
          Don't have an account? <Link to='/login/sign-up'>Sign up</Link>
        </Text.h4>
        <elements.form onSubmit={handle_submit} autoComplete='off' noValidate>
          <VStack.h spacing={10}>
            <HStack.h spacing={10}>
              <Input.h type='email' name='email' ref={set} fluid placeholder={'email'} />
              <Input.h type='password' name='password' ref={set} fluid placeholder={'password'} />
            </HStack.h>

            <Button.h type='submit' fluid>
              send
            </Button.h>
          </VStack.h>
        </elements.form>
        {loading && <div>loading</div>}
      </Fragment>
    );
  };

  /** Form handling when a users is signing up */
  const Sign_up_form: React.FC = function login_sign_up_form() {
    const [loading, set_loading] = useState(false);
    const { forward, set } = use_form({
      email: form_control(''),
      password: form_control(''),
      username: form_control(''),
    });

    const handle_submit = forward(async (body) => {
      set_loading(true);

      console.log(body);

      /*         try {
        await Api.client.post('/users', {
          user: body,
        });
      } catch (error) {
        console.error(error);
      } finally {
        set_loading(false);
      } */
    });

    return (
      <Fragment>
        <Text.h4>
          Already have an account? <Link to='/login'>Sign in</Link>
        </Text.h4>
        <elements.form onSubmit={handle_submit} autoComplete='off' noValidate>
          <VStack.h spacing={10}>
            <HStack.h spacing={10}>
              <Input.h type='text' name='username' ref={set} fluid placeholder={'username'} />
              <Input.h type='password' name='password' ref={set} fluid placeholder={'password'} />
            </HStack.h>

            <Input.h type='email' name='email' ref={set} fluid placeholder={'email'} />

            <Button.h type='submit' fluid>
              send
            </Button.h>
          </VStack.h>
          {loading && <div>loading</div>}
        </elements.form>
      </Fragment>
    );
  };

  export const h: React.FC<Props> = function login() {
    useEffect(() => {
      document.title = 'login';
    }, []);

    return (
      <Fragment>
        <Content>
          <Routes>
            <Route path='/' element={<Login_form />} />
            <Route path='sign-up' element={<Sign_up_form />} />
            <Route element={<div>nooo</div>} />
          </Routes>
        </Content>

        <SvgWave.h />
      </Fragment>
    );
  };
}
