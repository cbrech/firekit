'use strict'
import * as firestoreClient from './clients/firestore-client'
import { makeModel } from './model-creators/make-model'
import { makeStateModel } from './model-creators/make-state-model'
import { useModel } from './hooks/use-model'
import { useModelCollection } from './hooks/use-model-collection'

import {
  AsyncList,
  ListError,
  ListLoading,
  ListContent
} from './components/async-list'

import {
  AsyncView,
  ViewContent,
  ViewError,
  ViewLoading
} from './components/async-view'

import {
  AsyncForm,
  FormActions,
  FormContent,
  FormError,
  FormLoadError,
  FormLoading,
  FormDeleteSuccess
} from './components/async-form'

export {
  firestoreClient,
  makeModel,
  makeStateModel,
  useModel,
  useModelCollection,

  /* AsyncForm */
  AsyncForm,
  FormActions,
  FormContent,
  FormError,
  FormLoadError,
  FormLoading,
  FormDeleteSuccess,

  /* AsyncView */
  AsyncView,
  ViewContent,
  ViewError,
  ViewLoading,

  /* AsyncList */
  AsyncList,
  ListError,
  ListLoading,
  ListContent
}

