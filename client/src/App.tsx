import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "~/routes";
import { useAppDispatch, useAppSelector } from "./redux/hook/hook";
import { v4 as uuidv4 } from "uuid";
import { useCreateCartMutation } from "./redux/api/cart";
import { addCart } from "./redux/slices/cartSlice";
import { useEffect } from "react";

function App() {
  const [createCart] = useCreateCartMutation();
  const dispatch = useAppDispatch();
  const cart_id = useAppSelector((state) => state.persistedReducer.cart.carts);
  const isLogin = useAppSelector(
    (state) => state.persistedReducer.global.isLogin
  );
  useEffect(() => {
    if (!cart_id) {
      console.log("abc");
      const data = {
        cart_id: uuidv4(),
        product: {},
      };
      createCart(data)
        .unwrap()
        .then(({ data }) => {
          dispatch(addCart(data.cart_id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [cart_id]);
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;
