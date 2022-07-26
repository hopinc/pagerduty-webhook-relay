import Route from 'route-parser';

import { Base } from './methods/base';
import { Token } from './middlewares/Token';

import { RouteDefinition } from './types/Routes';

export const routes: RouteDefinition[] = [{ route: new Route('/'), method: 'POST', handler: Base, middlewares: [Token] }];
