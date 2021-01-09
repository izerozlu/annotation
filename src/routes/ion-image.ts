import FileSystem from "fs";

import Koa from "koa";
import Router, { IRouterContext } from "koa-router";
import IIonImage from "models/ion-image.interface";

const ION_IMAGES_PATH = `${__dirname}/../../data/ionImages.json`;

const ionImages: IIonImage[] = JSON.parse(
  FileSystem.readFileSync(ION_IMAGES_PATH, "utf8")
);
const router = new Router({ prefix: "/api/ion-image" });

router.get("/with-id/:id", (context: IRouterContext, next: Koa.Next) => {
  const { id: ionImageId } = context.params;
  const ionImage = ionImages.find(
    (ionImage: IIonImage) => ionImage.id === ionImageId
  );

  context.body = ionImage;
  next();
});

export default router;
