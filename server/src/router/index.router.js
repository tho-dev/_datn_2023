import example from "./example.router";
import product from "./product.router";
import brand from "./brand.router";
import category from "./category.router";
import demand from "./demand.router";
import user from "./user.router";
import upload from "./upload-image.router";
import cart from "./cart.router";
import post from "./post.router";
import order from "./order.router";
import insert from "./insert.router";
import collection from "./collection.router";
import general from "./general.router"
import notification from "./notification.router";

const routes = (app) => {
  app.use("/api", general)
  app.use("/api/example", example);
  app.use("/api/product", product);
  app.use("/api/category", category);
  app.use("/api/brand", brand);
  app.use("/api/demand", demand);
  app.use("/api/user", user);
  app.use("/api/image", upload);
  app.use("/api/cart", cart);
  app.use("/api/post", post);
  app.use("/api/order", order);
  app.use("/api/insert", insert);
  app.use("/api/collection", collection);
  app.use("/api/notification", notification);
};

export default routes;
