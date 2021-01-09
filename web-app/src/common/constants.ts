export const API_PATH = {
  DATASET: '/dataset',
  ANNOTATION_WITH_ID: '/annotation/with-id',
  ION_IMAGE_WITH_ID: '/ion-image/with-id',
};

export const DATASET_TYPES = {
  ACTION: {
    GET_DATASET: 'dataset_action_getDataset',
  },
  MUTATION: {
    SET_DATASET: 'dataset_mutation_setDataset',
  },
  GETTER: {
    DATASET_NAME: 'dataset_getter_datasetName',
    ANNOTATION_IDS: 'dataset_getter_annotationIds',
  },
};
export const ANNOTATION_TYPES = {
  ACTION: {
    GET_ANNOTATION: 'annotation_action_getAnnotation',
    GET_BULK_ANNOTATION: 'annotation_action_getBulkAnnotation',
    GET_ANNOTATION_IMAGES: 'annotation_action_getAnnotationImages',
  },
  MUTATION: {
    SET_ANNOTATION: 'annotation_mutation_setAnnotation',
    SET_ION_IMAGE: 'annotation_mutation_setIonImage',
  },
  GETTER: {
    ANNOTATIONS: 'annotation_getter_annotations',
  },
};
