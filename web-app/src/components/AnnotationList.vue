<template>
  <div class="annotation-list">
    <div
      class="annotation-list__item annotation"
      v-for="(annotation, index) in annotationsWithCompoundName"
      :key="annotation.id"
      @click="() => selectAnnotation(annotation.id)"
    >
      <md-ripple class="annotation__ripple-container">
        <h3 class="annotation__compound-name">
          {{ annotation.compoundName }}
        </h3>
        <span class="annotation__index">#{{ index + 1 }}</span>
      </md-ripple>
    </div>
  </div>
</template>

<script lang="ts">
import { ANNOTATION_TYPES } from '@/common/constants';
import { Annotation } from '@/models/annotation.interface';

export default {
  name: 'AnnotationList',
  computed: {
    annotations(): Annotation[] {
      return this.$store.getters[ANNOTATION_TYPES.GETTER.ANNOTATIONS];
    },
    annotationsWithCompoundName(): {
      id: string;
      compoundName?: string;
    }[] {
      return (this.annotations ? Object.keys(this.annotations) : []).map(
        (annotationId: string) => {
          const annotation = this.annotations[annotationId];
          return {
            id: annotationId,
            compoundName: annotation.possibleCompounds[0]?.name,
          };
        }
      );
    },
  },
  methods: {
    selectAnnotation(selectedAnnotationId: string) {
      this.$emit(
        'onAnnotationSelection',
        this.annotations[selectedAnnotationId]
      );
    },
  },
};
</script>

<style scoped lang="scss">
@import 'src/assets/style/constants';
@import 'src/assets/style/elevation';
@import 'src/assets/style/colors';
@import 'src/assets/style/font';

.annotation-list {
  height: 100%;
  overflow-y: auto;
  min-width: 240px;
}

.annotation {
  &:not(:last-child) {
    margin-bottom: $spacing-m;
  }

  &:hover {
    background-color: accent-alpha(0.4);
  }

  @include elevation-2;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
}

.annotation__ripple-container {
  padding: $spacing-s $spacing-m;
}

.annotation__compound-name {
  font-weight: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}

.annotation__index {
  position: absolute;
  right: $spacing-s;
  bottom: $spacing-s;
  color: $gray-400;
  @include small-font;
}
</style>
