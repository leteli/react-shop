import type { RootState } from '../index';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

type IDispatch = ThunkDispatch<RootState, any, AnyAction>;

export default IDispatch;
