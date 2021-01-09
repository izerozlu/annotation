<template>
  <div class="selected-annotation" v-if="selectedAnnotation">
    <div class="selected-annotation__possible-compounds possible-compounds">
      <h4 class="possible-compounds__title">Possible Compounds</h4>
      <div class="possible-compounds__list">
        <span
          class="possible-compounds__compound"
          v-for="compound in possibleCompounds"
        >
          {{ compound }}
        </span>
      </div>
    </div>

    <div class="ion-images-wrapper">
      <h4 class="ion-images__title">Ion Images</h4>
      <div
        class="selected-annotation__images ion-images"
        v-if="selectedAnnotation"
      >
        <div
          class="ion-images__image ion-image"
          v-for="ionImage in selectedAnnotation.ionImages"
          :key="ionImage.id"
          @click="
            () => {
              selectedIonImage = ionImage;
              isDialogActive = true;
            }
          "
        >
          <img
            class="ion-image__image"
            :height="ionImage.imageData.height"
            :width="ionImage.imageData.width"
            :src="generateImage(ionImage.imageData)"
          />
          <div class="ion-image__information-container">
            <div class="ion-image__information ion-image__mz">
              <p class="information__label">M/Z</p>
              <p class="information__value">{{ ionImage.mz }}</p>
            </div>
            <div class="ion-image__information ion-image__maximum-intensity">
              <p class="information__label">Maximum Intensity</p>
              <p class="information__value">{{ ionImage.maxIntensity }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <md-dialog :md-active.sync="isDialogActive">
      <div
        v-if="selectedIonImage"
        class="ion-images__image ion-image ion-image--dialog"
        :key="selectedIonImage.id"
      >
        <img
          class="ion-image__image"
          :height="selectedIonImage.imageData.height"
          :width="selectedIonImage.imageData.width"
          :src="generateImage(selectedIonImage.imageData)"
        />
        <div class="ion-image__information-container">
          <div class="ion-image__information ion-image__mz">
            <p class="information__label">M/Z</p>
            <p class="information__value">{{ selectedIonImage.mz }}</p>
          </div>
          <div class="ion-image__information ion-image__maximum-intensity">
            <p class="information__label">Maximum Intensity</p>
            <p class="information__value">
              {{ selectedIonImage.maxIntensity }}
            </p>
          </div>
        </div>
      </div>
    </md-dialog>
  </div>
</template>

<script lang="ts">
import { Annotation } from '@/models/annotation.interface';
import { ANNOTATION_TYPES } from '@/common/constants';

export default {
  name: 'SelectedAnnotation',
  props: {
    selectedAnnotation: Object,
    isDialogActive: Boolean,
    selectedIonImage: Object,
  },
  methods: {
    generateImage(imageData: ImageData) {
      const { height, width } = imageData;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').putImageData(imageData, 0, 0);

      return canvas.toDataURL('image/png');
    },
  },
  computed: {
    possibleCompounds() {
      return this.selectedAnnotation?.possibleCompounds.map(
        (compound: { name: string }) => compound.name
      );
    },
  },
  watch: {
    selectedAnnotation(newAnnotation: Annotation, oldAnnotation: Annotation) {
      if (!oldAnnotation || newAnnotation.id !== oldAnnotation.id) {
        this.$store.dispatch(
          ANNOTATION_TYPES.ACTION.GET_ANNOTATION_IMAGES,
          this.selectedAnnotation?.id
        );
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import 'src/assets/style/constants';
@import 'src/assets/style/font';
@import 'src/assets/style/elevation';
@import 'src/assets/style/colors';

.selected-annotation {
  padding: $spacing-m;
  overflow-y: auto;
}

.possible-compounds {
  display: flex;
  flex-direction: column;
  margin-bottom: $spacing-l;
}

.possible-compounds__title,
.ion-images__title {
  margin: 0 0 $spacing-s 0;
  @include medium-font;
}

.possible-compounds__list {
  display: flex;
  flex-wrap: wrap;
}

.possible-compounds__compound {
  &:not(:last-child) {
    margin-right: $spacing-xs;
  }

  padding: $spacing-xs;
  border: 1px solid $gray-400;
  border-radius: 4px;
  margin-bottom: $spacing-xs;
}

.ion-images {
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
}

.ion-image {
  &:hover:not(&--dialog) {
    cursor: pointer;
    background: accent-alpha(0.4);
    @include elevation-4;
  }

  display: flex;
  justify-content: space-between;
  width: max-content;
  padding: $spacing-s;
  margin-right: $spacing-m;
  margin-bottom: $spacing-m;
  border-radius: 6px;
  border: 1px solid $gray-500;
}

.ion-image__information-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
}

.ion-image__information {
  display: flex;
}

.information__divider {
  display: block;
  height: 16px;
  width: 1px;
  background-color: $gray-500;
  margin: 0 $spacing-xs;
}

.information__label {
  font-weight: bold;
  margin-right: $spacing-xs;
  @include small-font;
}

.information__value {
  @include small-font;
}

.ion-image__image {
  height: 100%;
  margin-right: $spacing-l;
  border-radius: 4px;
}

.ion-image--dialog {
  background: white;
  margin: 0;
  flex-direction: column;
  width: 40vh;
  min-width: 320px;

  .ion-image__image {
    height: 60vh;
    width: auto;
    order: 2;
    margin: 0;
  }

  .information__label {
    margin-top: 0;
  }

  .information__value {
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>
