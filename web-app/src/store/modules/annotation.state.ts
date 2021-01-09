import HttpApi from '@/api/http-api';
import { ANNOTATION_TYPES, API_PATH } from '@/common/constants';
import colorizeImage from '@/common/util/colorizeImage';
import { Annotation } from '@/models/annotation.interface';
import { IonImage } from '@/models/ion-image.interface';

export interface AnnotationState {
  annotations: { [annotationId: string]: Annotation };
}

const state: AnnotationState = {
  annotations: {} as { [annotationId: string]: Annotation },
};

const getters = {
  [ANNOTATION_TYPES.GETTER.ANNOTATIONS]: ({ annotations }: AnnotationState) =>
    annotations,
};

const processIonImageData = async (data: IonImage, ionImageUrlBase: string) => {
  const ionImage: IonImage = { ...data, url: `${ionImageUrlBase}${data?.url}` };
  const { minIntensity, maxIntensity } = ionImage;
  const ionImageResponse = await fetch(ionImage.url);
  const ionImageBlob = await ionImageResponse.blob();
  const ionImageArrayBuffer = await ionImageBlob.arrayBuffer();
  ionImage.imageData = colorizeImage(
    ionImageArrayBuffer,
    minIntensity,
    maxIntensity
  );
  return ionImage;
};

const actions = {
  [ANNOTATION_TYPES.ACTION.GET_BULK_ANNOTATION]: async (
    { commit, dispatch, state }: { state: AnnotationState },
    annotationIds: string[]
  ) => {
    annotationIds.forEach((id: string) => {
      const { annotations } = state;
      if (!annotations[id]) {
        dispatch(ANNOTATION_TYPES.ACTION.GET_ANNOTATION, id);
      }
    });
  },
  [ANNOTATION_TYPES.ACTION.GET_ANNOTATION_IMAGES]: async (
    { commit, dispatch, state }: { state: AnnotationState },
    annotationId: string
  ) => {
    const annotation = state.annotations[annotationId];
    const ionImageUrlBase = 'https://metaspace2020.eu';

    if (annotation) {
      const ionImages: IonImage[] = annotation.ionImages;
      if (ionImages.length === 0) {
        const imagePromises = annotation.ionImageIds.map(async (ionImageId) => {
          const previousIonImage = annotation.ionImages.find(
            (ionImage: IonImage) => ionImage.id === ionImageId
          );

          if (!previousIonImage) {
            const { success, data } = await HttpApi.get<IonImage>({
              path: `${API_PATH.ION_IMAGE_WITH_ID}/${ionImageId}`,
            });

            const ionImage = await processIonImageData(
              data as IonImage,
              ionImageUrlBase
            );

            if (success) {
              ionImages.push(ionImage);
            }
          }
        });
        await Promise.all(imagePromises);
        commit(ANNOTATION_TYPES.MUTATION.SET_ION_IMAGE, {
          ionImages,
          annotationId,
        });
      }
    }
  },
  [ANNOTATION_TYPES.ACTION.GET_ANNOTATION]: async (
    { commit, state }: { state: AnnotationState },
    annotationId: string
  ) => {
    const { success, data } = await HttpApi.get<Annotation>({
      path: `${API_PATH.ANNOTATION_WITH_ID}/${annotationId}`,
    });

    commit(
      ANNOTATION_TYPES.MUTATION.SET_ANNOTATION,
      success ? data : undefined
    );
  },
};

const mutations = {
  [ANNOTATION_TYPES.MUTATION.SET_ANNOTATION]: (
    { annotations }: AnnotationState,
    annotation: Annotation
  ) => {
    state.annotations = {
      ...annotations,
      [annotation.id]: { ...annotation, ionImages: [] },
    };
  },
  [ANNOTATION_TYPES.MUTATION.SET_ION_IMAGE]: (
    { annotations }: AnnotationState,
    { annotationId, ionImages }: { annotationId: string; ionImages: IonImage[] }
  ) => {
    const annotation = annotations[annotationId];
    if (annotation) {
      annotation.ionImages = ionImages;
      state.annotations = {
        ...annotations,
        [annotation.id]: { ...annotation },
      };
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
