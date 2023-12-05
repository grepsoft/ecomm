import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import AppbarDesktop from "./appbarDesktop";
import AppbarMobile from "./appbarMobile";
import useDialogModal from "../../hooks/useDialogModal";
import Login from "../login";
import { firebasedb } from "../../services/firebase/db";

export default function Appbar() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [LoginDialog, showLoginDialog] = useDialogModal(Login)

  const handleLogin = () =>{
    showLoginDialog();
  }

  const handleLogout = async () =>{
    await firebasedb.logout();
  }

  return (
    <>
    <LoginDialog />
      {matches ? <AppbarMobile onLoginClick={handleLogin}  onLogoutClick={handleLogout} matches={matches}/> : 
      <AppbarDesktop onLoginClick={handleLogin} onLogoutClick={handleLogout} matches={matches}/>}
    </>
  );
}
