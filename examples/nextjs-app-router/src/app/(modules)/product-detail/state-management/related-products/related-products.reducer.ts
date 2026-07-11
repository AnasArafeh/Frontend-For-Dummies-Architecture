'use client';

import { useContext } from 'react';
import { ContextCreator } from '@/state-management/context-creator';
import { RELATED_PRODUCTS_ACTION, type IRelatedProductsAction, type RelatedProductsState } from './related-products.models';
import { relatedProductsActions } from './related-products.actions';

const initialState: RelatedProductsState = {
  relatedProducts: [],
  loading: true,
  error: null
};

const setReducer = (state: RelatedProductsState, action: IRelatedProductsAction) => ({
  ...state,
  [action.payload.key]: action.payload.data
});

export function relatedProductsReducer(state: RelatedProductsState, action: IRelatedProductsAction): RelatedProductsState {
  return action.type === RELATED_PRODUCTS_ACTION ? setReducer(state, action) : state;
}

const { Context, Provider } = ContextCreator(relatedProductsReducer, relatedProductsActions, initialState);

export const RelatedProductsContext = Context;
export const RelatedProductsProvider = Provider;

export function useRelatedProducts() {
  return useContext(RelatedProductsContext);
}
