import { useState } from "react";
import {
  Product,
  ProductActionButton,
  ProductActionsWrapper,
  ProductActionsWrapperChat,
  ProductAddToCart,
  ProductAddToCartChat,
  ProductFavButton,
  ProductImage,
} from "../../styles/product";
import { Stack, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import useDialogModal from "../../hooks/useDialogModal";
import ProductDetail from "../productdetail";
import { useUIContext } from "../../context/ui";
import useCart from "../../hooks/useCart";
import ProductMeta from "../products/ProductMeta";

export default function SingleProductChat({ width, product, matches }) {
  const [ProductDetailDialog, showProductDetailDialog, closeProductDialog] =
    useDialogModal(ProductDetail);
  // NEW: add to cart
  const { addToCart, addToCartText } = useCart(product);

  const [showOptions, setShowOptions] = useState(false);

  const { cart, setCart } = useUIContext();

  const handleMouseEnter = () => {
    setShowOptions(true);
  };
  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  return (
    <>
      <Product onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <ProductImage width={width} src={product.thumb} />

        <ProductAddToCartChat
          onClick={addToCart}
          show={true}
          variant="contained"
        >
          {addToCartText}
          {/* {cart.findIndex((c) => c.id === product.id) ? "Add to cart" : "Remove from cart"} */}
        </ProductAddToCartChat>


      </Product>
      <ProductActionsWrapperChat show={true}>
          <Stack direction={matches ? "row" : "column"}>
            <ProductFavButton isfav={0}>
              <FavoriteIcon />
            </ProductFavButton>
            <ProductActionButton>
              <ShareIcon color="primary" />
            </ProductActionButton>
            <ProductActionButton onClick={() => showProductDetailDialog()}>
              <FitScreenIcon color="primary" />
            </ProductActionButton>
          </Stack>
        </ProductActionsWrapperChat>
      <Typography textTransform="capitalize" lineHeight={2}>
        {product.name}
      </Typography>
      <Typography variant={matches ? "caption" : "subtitle2"}>
        $ {product.price}
      </Typography>
      <ProductDetailDialog product={product} />
    </>
  );
}
