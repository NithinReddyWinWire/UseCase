import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const { instance ,accounts } = useMsal();

  const navigate  = useNavigate();

  useEffect(()=>{
    if(accounts.length>0){
      navigate("/home");
    }
  },[accounts,navigate]);

      const handleLogin = async () => {
        try {
          await instance.loginRedirect(loginRequest);
        } catch (error) {
          console.error("Login failed:", error);
        }
      };

  return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 ">
      <div className="w-full max-w-md">
        
        {/* Logo / Brand */}
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            WinReview
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Performance, feedback, and growth — all in one place.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Welcome back
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to continue to your workspace.
            </p>
          </div>

          {/* Microsoft Button */}
          <button
            onClick={handleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:border-gray-400"
          >
            {/* Microsoft logo */}
            <div className="grid grid-cols-2 gap-[2px]">
              <span className="h-2.5 w-2.5 bg-[#f25022]" />
              <span className="h-2.5 w-2.5 bg-[#7fba00]" />
              <span className="h-2.5 w-2.5 bg-[#00a4ef]" />
              <span className="h-2.5 w-2.5 bg-[#ffb900]" />
            </div>

            Sign in with Microsoft
          </button>

          <p className="mt-6 text-center text-xs leading-5 text-gray-400">
            Use your company Microsoft account to sign in.
          </p>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-400">
          © 2026 WinWire
        </p>
      </div>
    </div>
  );
}

export default Login;