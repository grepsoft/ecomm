import { Badge, Divider, ListItemButton, ListItemIcon, Box, Typography } from "@mui/material";
import { ActionIconsContainerDesktop, ActionIconsContainerMobile, MyList } from "../../styles/appbar";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Colors } from "../../styles/theme";
import { useUIContext } from "../../context/ui";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useUser } from "../../context/ui/User";

export default function Actions({ matches, onLogin, onLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { cart, setShowCart } = useUIContext();
  
  const {user} = useUser();
  const Component = matches ? ActionIconsContainerMobile : ActionIconsContainerDesktop;

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  return (
    <Component>
      <MyList type="row">
        <ListItemButton
          sx={{
            justifyContent: "center",
          }}
        >
          <ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "center",
              color: matches && Colors.secondary,
            }}
          >
            <Badge badgeContent={cart && cart.length} color="secondary">
              <ShoppingCartIcon onClick={() => setShowCart(true)}/>
            </Badge>
          </ListItemIcon>
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
        <ListItemButton
          sx={{
            justifyContent: "center",
          }}
        >
          <ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "center",
              color: matches && Colors.secondary,
            }}
          >
            <FavoriteIcon />
          </ListItemIcon>
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
        <ListItemButton
          sx={{
            justifyContent: "center",
          }}

          onClick={handleProfileClick}
        >
          <ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "center",
              color: matches && Colors.secondary,
            }}
          >
            <Box display="flex" flexDirection="column">
              <PersonIcon/>
              {user && <Typography variant="caption">{user.displayName}</Typography>}
            </Box>
          </ListItemIcon>
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
      </MyList>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={anchorEl !== null}
        onClose={() => setAnchorEl(null)}
      >
        {!user && <MenuItem onClick={onLogin}>Login</MenuItem>}
        {user && <MenuItem onClick={onLogout}>Logout</MenuItem>}
      </Menu>
    </Component>
  );
}
