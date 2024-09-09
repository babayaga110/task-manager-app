import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "../routes/routes";
import Loading from "../components/Loading/Loading";

export default function Not_Found() {
  const [loading, setLoading] = React.useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    setLoading(true);
    if (routes.some((route) => route.path === location.pathname)) {
      setLoading(false);
      navigate("/");
    }
  }, []);
  return <div>{loading ? <Loading /> : <h1>Not Found</h1>}</div>;
}
