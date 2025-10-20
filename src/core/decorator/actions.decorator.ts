import { SetMetadata } from '@nestjs/common';
import { ACCION } from '../enum';

export const ACTION_KEY = 'actions';
export const Actions = (...actions: ACCION[]) => SetMetadata(ACTION_KEY, actions);
