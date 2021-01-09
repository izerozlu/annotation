<template>
  <div class="application">
    <md-toolbar class="application__toolbar">
      <h3 class="md-title">
        Dataset
        <small
          ><i>{{ datasetName }}</i></small
        >
      </h3>
      <p class="application__toolbar-count">
        Annotations in this dataset: {{ annotationCount }}
      </p>
    </md-toolbar>

    <div class="application__content">
      <AnnotationList @onAnnotationSelection="handleAnnotationSelection" />
      <SelectedAnnotation :selected-annotation="selectedAnnotation" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { DATASET_TYPES } from '@/common/constants';
import AnnotationList from '@/components/AnnotationList.vue';
import SelectedAnnotation from '@/components/SelectedAnnotation.vue';
import { Annotation } from '@/models/annotation.interface';

export default Vue.extend({
  name: 'App',
  components: { SelectedAnnotation, AnnotationList },
  data() {
    return {
      selectedAnnotation: undefined as Annotation,
    };
  },
  mounted() {
    this.$store.dispatch(DATASET_TYPES.ACTION.GET_DATASET);
  },
  computed: {
    datasetName() {
      return this.$store.getters[DATASET_TYPES.GETTER.DATASET_NAME];
    },
    annotationCount() {
      return this.$store.getters[DATASET_TYPES.GETTER.ANNOTATION_IDS].length;
    },
  },
  methods: {
    handleAnnotationSelection(selectedAnnotation: Annotation) {
      this.selectedAnnotation = selectedAnnotation;
    },
  },
});
</script>

<style lang="scss">
@import 'src/assets/style/constants';

.application {
  display: flex;
  flex-direction: column;

  width: 100vw;
  height: 100vh;
}

.application__content {
  display: flex;
  flex: 1;
  padding: $spacing-m;
  overflow: auto;
}

.annotation-list {
  flex-basis: 20%;
  flex-shrink: 0;
}

.selected-annotation {
  flex: 1;
  max-width: 80%;
}

.application__toolbar {
  display: flex;
  justify-content: space-between;
}
</style>
