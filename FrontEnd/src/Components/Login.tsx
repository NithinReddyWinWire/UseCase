import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { InteractionStatus } from "@azure/msal-browser";

function Login() {
  const { instance, accounts, inProgress } = useMsal();

  const navigate = useNavigate();

  const syncStarted = useRef(false);

  useEffect(() => {
    if (accounts.length > 0) {
      if (inProgress !== InteractionStatus.None) {
        return;
      }

      if (syncStarted.current) {
        return;
      }

      syncStarted.current = true;

      const account = instance.getActiveAccount() ?? accounts[0];

      async function syncUser() {
        try {
          instance.setActiveAccount(account);

          // Get access token for your backend API
          const response = await instance.acquireTokenSilent({
            scopes: ["api://d9eeecea-f199-46e9-acc0-12cc6c3a0227/User"],
            account,
          });

          const accessToken = response.accessToken;

          // Sync user with backend database
          const apiResponse = await fetch("/apiAuth/User/Sync", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (!apiResponse.ok) {
            throw new Error(
              `User sync failed: ${apiResponse.status}`
            );
          }

          const user = await apiResponse.json();

          console.log("User synced:", user);

          // Go to Home only after successful sync
          navigate("/home", { replace: true });
        } catch (error) {
          console.error("User sync failed:", error);
          syncStarted.current = false;
        }
      }

      syncUser();

      return;
    }

    if (inProgress === InteractionStatus.None) {
      instance.loginRedirect(loginRequest);
    }
  }, [accounts, inProgress, instance, navigate]);

  return null;
}

export default Login;