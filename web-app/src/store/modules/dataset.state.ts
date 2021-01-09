import { Dataset } from '@/models/dataset.interface';
import HttpApi from '@/api/http-api';
import { ANNOTATION_TYPES, API_PATH, DATASET_TYPES } from '@/common/constants';

export interface DatasetState {
  dataset?: Dataset;
}

const state: DatasetState = {
  dataset: undefined,
};

const getters = {
  [DATASET_TYPES.GETTER.DATASET_NAME]: ({ dataset }: DatasetState) =>
    dataset?.name,
  [DATASET_TYPES.GETTER.ANNOTATION_IDS]: ({ dataset }: DatasetState) =>
    dataset?.annotationIds,
};

const actions = {
  [DATASET_TYPES.ACTION.GET_DATASET]: async ({ commit, dispatch }) => {
    const { success, data } = await HttpApi.get<Dataset>({
      path: API_PATH.DATASET,
    });

    if (success) {
      dispatch(
        ANNOTATION_TYPES.ACTION.GET_BULK_ANNOTATION,
        data?.annotationIds.slice(0, 10)
      );
    }

    commit(DATASET_TYPES.MUTATION.SET_DATASET, success ? data : undefined);
  },
};

const mutations = {
  [DATASET_TYPES.MUTATION.SET_DATASET]: (
    state: DatasetState,
    dataset: Dataset
  ) => {
    state.dataset = dataset;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
