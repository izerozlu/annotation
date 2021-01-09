import FileSystem from "fs";

import Koa from "koa";
import Router, { IRouterContext } from "koa-router";
import IAnnotation from "models/annotation.interface";

const ANNOTATIONS_PATH = `${__dirname}/../../data/annotations.json`;

const annotations: IAnnotation[] = JSON.parse(
  FileSystem.readFileSync(ANNOTATIONS_PATH, "utf8")
);
const router = new Router({ prefix: "/api/annotation" });

router.get("/with-id/:id", (context: IRouterContext, next: Koa.Next) => {
  const { id: annotationId } = context.params;
  const annotation = annotations.find(
    (annotation: IAnnotation) => annotation.id === annotationId
  );

  context.body = annotation;

  next();
});

export default router;
