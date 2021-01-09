import { IonImage } from '@/models/ion-image.interface';

interface PossibleCompound {
  name: string;
  information: { databaseId: string }[];
}

export interface Annotation {
  id: string;
  possibleCompounds: PossibleCompound[];
  ionImageIds: string[];
  ionImages: IonImage[];
}
