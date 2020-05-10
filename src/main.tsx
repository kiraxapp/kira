import React from 'react';
import ReactDOM from 'react-dom';
import { ResetCss } from '@kira/ui';
import { ApplicationContext } from './components/application_context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Development } from './routes/development.component';
import { GuardedRoute } from './components/guarded_route';

if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  const axe = require('react-axe');

  axe(React, ReactDOM, 1000);
}

function lazyLoadHome() {
  const LazyComponent = React.lazy(() => import('./routes/home.component').then((module) => ({ default: module['Home']['h'] })));

  return (
    <React.Suspense fallback={null}>
      <LazyComponent />
    </React.Suspense>
  );
}

function lazyLoadLogin() {
  const LazyComponent = React.lazy(() => import('./routes/login.component').then((module) => ({ default: module['Login']['h'] })));

  return (
    <React.Suspense fallback={null}>
      <LazyComponent />
    </React.Suspense>
  );
}

function lazyLoadProjects() {
  const LazyComponent = React.lazy(() =>
    import('./routes/projects.component/mod').then((module) => ({ default: module['Projects']['h'] })),
  );

  return (
    <React.Suspense fallback={null}>
      <LazyComponent />
    </React.Suspense>
  );
}

function lazyLoadKiraCore() {
  const LazyComponent = React.lazy(() => import('./routes/core.component').then((module) => ({ default: module['Core']['h'] })));

  return (
    <React.Suspense fallback={null}>
      <LazyComponent />
    </React.Suspense>
  );
}

function render() {
  ReactDOM.render(
    <ApplicationContext.provider
      config={{
        colors: {
          font: '#ffffff',
        },
      }}
    >
      <ResetCss.h />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={lazyLoadHome()} />
          <Route path='login/*' element={lazyLoadLogin()} />
          <Route path='core/*' element={lazyLoadKiraCore()} />
          <GuardedRoute.h guardedBy={GuardedRoute.GuardsEnum.Auth} redirectTo='/login'>
            <Route path='projects/*' element={lazyLoadProjects()} />
          </GuardedRoute.h>
          {process.env.NODE_ENV === 'development' && <Route path='development/*' element={<Development.h />} />}
        </Routes>
      </BrowserRouter>
    </ApplicationContext.provider>,
    document.getElementById('root'),
  );
}

render();
