import { useUIContext } from "../context/ui";

function useCart(product) {
  const { cart, setCart } = useUIContext();

  const addToCart = () => {
    cart.findIndex((c) => c._id === product._id) >= 0
      ? setCart(cart.filter((c) => c._id !== product._id))
      : setCart((c) => [...c, product]);
  };

  const addToCartText =
    cart.findIndex((c) => c._id === product._id) >= 0
      ? "Remove from cart"
      : "Add to cart";

  return { addToCart, addToCartText };
}

export default useCart;
