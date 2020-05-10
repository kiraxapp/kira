import { use_service } from '@kira/instantiation';
import React, { Fragment } from 'react';
import { Navigate } from 'react-router';
import { AuthService } from '../backend/services/auth_service';
/**
 * change this
 */
export namespace GuardedRoute {
  export interface Props {
    redirectTo: string;
    guardedBy: GuardsEnum;
    children: React.ReactNode;
  }

  export enum GuardsEnum {
    Auth,
  }

  export const h: React.FC<Props> = function __kira__guarded_route({ redirectTo, guardedBy, children }) {
    const authService = use_service(AuthService);

    switch (guardedBy) {
      case GuardsEnum.Auth:
        if (authService.is_authenticated()) break;

        return <Navigate to={redirectTo} />;
      default:
        throw new Error(`noop for "${guardedBy}"`);
    }

    return <Fragment>{children}</Fragment>;
  };
}
