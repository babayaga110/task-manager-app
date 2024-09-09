import * as React from "react";
import { Assessment } from "@mui/icons-material";
import { Box, Button, Container, Link } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { useAlert } from "../../useContext/AlertContext";

export default function Header() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const { showAlert } = useAlert();
  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      navigate("/");
      localStorage.clear();
      showAlert("Success", "Logout successful", "success", "info");
    } catch (error) {
      showAlert("Error", error.message, "danger", "error");
    }
  };
  return (
    <Box
      sx={{
        boxShadow: "sm",
        backgroundColor: "primary.500",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Link
          component="button"
          sx={{ color: "#fff", fontSize: 30 }}
          onClick={() => navigate("/")}
        >
          <Assessment color="inherit" fontSize="inherit" />
        </Link>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {!auth?.currentUser ? (
            <>
              <Button
                sx={{
                  backgroundColor: "#fff",
                  color: "primary.500",
                  "&:hover": {
                    backgroundColor: "primary.500",
                    color: "white",
                  },
                }}
                onClick={() => navigate("/")}
              >
                Login
              </Button>
              <Button
                sx={{
                  color: "#fff",
                  border: "1px solid transparent",
                  "&:hover": {
                    backgroundColor: "primary.500",
                    color: "white",
                  },
                }}
                onClick={() => navigate("/signup")}
              >
                Signup
              </Button>
            </>
          ) : (
            <Button color="danger" onClick={handleLogout} loading={loading}>
              Logout
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
}
