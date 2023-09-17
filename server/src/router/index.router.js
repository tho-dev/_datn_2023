import example from "./example.router";
import product from "./product.router";
import brand from "./brand.router";
import category from "./category.router";
import demand from "./demand.router";
import user from "./user.router";
import upload from "./uploadImage.router";

const routes = (app) => {
  app.use("/api/example", example);
  app.use("/api/product", product);
  app.use("/api/category", category);
  app.use("/api/brand", brand);
  app.use("/api/demand", demand);
  app.use("/api/user", user);
  app.use("/api/image", upload);
};

export default routes;
