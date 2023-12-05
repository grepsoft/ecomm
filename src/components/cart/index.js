import {
  Avatar,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { useUIContext } from "../../context/ui";
import { ProductImage } from "../../styles/product";
import { Colors } from "../../styles/theme";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

export default function Cart() {
  const { cart, setCart, setShowCart, showCart } = useUIContext();
  
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const handleRemoveFromCart = (item) => {
      setCart(
        cart.filter(c => c.id !== item.id)
      );
  }

  const cartContent = cart.map((item) => (
    <Box key={item._id} sx={{mt: 4}}>
      <Box
        display={"flex"}
        sx={{ pt: 2, pb: 2 }}
        alignItems="start"
        justifyContent={"space-between"}
      >
        <Avatar src={item.thumb} sx={{ width: 96, height: 96, mr: 2 }} />
        <Box display="flex" flexDirection={"column"}>
          <Typography variant="h6">{item.name}</Typography>
          {!matches && (
            <Typography variant="subtitle2">{item.description}</Typography>
          )}
        </Box>
        <Typography variant="body1" justifyContent={"end"}>
          ${item.price}
        </Typography>
      </Box>
      {matches && (
        <Typography variant="subtitle2">{item.description}</Typography>
      )}
      <Button onClick={() => handleRemoveFromCart(item)}>Remove</Button>
      <Divider variant="inset" />
    </Box>
  ));

  return (
    <Drawer
      open={showCart}
      anchor="right"
      onClose={() => setShowCart(false)}
      PaperProps={{
        sx: {
          width: matches ? "100%" : 500,
          background: Colors.light_gray,
          borderRadius: 0,
        },
      }}
    >
      {cart.length > 0 ? (
        <Box
          sx={{
            p: 4,
          }}
          display="flex"
          justifyContent={"center"}
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h3" color={Colors.black}>
            Your Cart
          </Typography>
          <Typography variant="body1" color={Colors.muted}>
            {" "}
            Torem ipsum dolor sit amet, consectetur adipisicing elitsed do
            eiusmo tempor incididunt ut labore et dolore magna
          </Typography>
          <Paper
            elevation={0}
            sx={{
              mt: 2,
              width: "90%",
              padding: 4,
              background: Colors.white,
            }}
          >
            {cartContent}
          </Paper>
          <Button sx={{ mt: 4 }} variant="contained">
            Proceed to payment
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            p: 4,
          }}
          display="flex"
          justifyContent={"center"}
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant={matches ? "h5" : "h3"} color={Colors.black}>
            Your cart is empty!
          </Typography>
        </Box>
      )}
      <Button onClick={() => setShowCart(false)}>Close</Button>
    </Drawer>
  );
}
