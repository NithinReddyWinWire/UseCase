import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

import App from "./App.tsx";
import { msalConfig } from "./authConfig.ts";
import "./index.css";

const msalInstance = new PublicClientApplication(msalConfig);

async function main() {
  await msalInstance.initialize();

  const response = await msalInstance.handleRedirectPromise();
  console.log("redirect responce:",response);
  console.log("Current Urel:",window.location.href)

 

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </StrictMode>
  );
}

main().catch((error) => {
  console.error("MSAL initialization failed:", error);
});