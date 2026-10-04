import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { InteractionStatus } from "@azure/msal-browser";

function Login() {
  const { instance, accounts, inProgress } = useMsal();

  const navigate = useNavigate();

  useEffect(() => {
    if (accounts.length > 0) {
      instance.setActiveAccount(accounts[0]);
      navigate("/home", { replace: true });
      return;
    }

    if (inProgress === InteractionStatus.None) {
      instance.loginRedirect(loginRequest);
    }
  }, [accounts, inProgress, instance, navigate]);

  return null;
}

export default Login;