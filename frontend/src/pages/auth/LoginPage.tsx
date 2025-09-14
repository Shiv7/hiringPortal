import { useState } from "react";
import { loginUser } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield, Briefcase, MessageSquare } from "lucide-react";

interface LoginProps {
  onLoginSuccess?: (userType: string, userData: any) => void;
  setIsLoginView?: (isLogin: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, setIsLoginView }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowMessage(false);
    console.log("Logging in with:", { username, password });

    try {
      const response = await loginUser(username, password);
      console.log("Login response:", response);

      // Check if the response indicates an error (resCode 400, 401, etc.)
      if (response.resCode && response.resCode >= 400) {
        // Show the API error message
        setMessage(response.resMsg || "Login failed. Please try again.");
        setShowMessage(true);
        setIsLoading(false);
        return;
      }

      // Check if response.res is null (which indicates an error)
      if (!response.res) {
        setMessage(response.resMsg || "Invalid response from server. Please try again.");
        setShowMessage(true);
        setIsLoading(false);
        return;
      }

      const { token, user } = response.res;

      if (!user || !user.userType) {
        setMessage("Invalid user data received. Please try again.");
        setShowMessage(true);
        setIsLoading(false);
        return;
      }

      // Enhanced user data storage with component access information
      const enhancedUserData = {
        ...user,
        // Store component access information if available in API response
        components: (user as any).components || (user as any).accessLevel || (user as any).permissions || [],
        // Store additional user metadata
        loginTime: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        // Store any additional fields from API response
        ...(user.role && { role: user.role }),
        ...((user as any).department && { department: (user as any).department }),
        ...((user as any).companyId && { companyId: (user as any).companyId }),
        ...((user as any).teamId && { teamId: (user as any).teamId }),
        ...((user as any).accessLevel && { accessLevel: (user as any).accessLevel }),
        ...((user as any).permissions && { permissions: (user as any).permissions }),
        ...((user as any).features && { features: (user as any).features }),
        ...((user as any).modules && { modules: (user as any).modules })
      };

      console.log("Enhanced user data for storage:", enhancedUserData);

      // Store authentication and user data
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userType", user.userType);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(enhancedUserData));
      localStorage.setItem("userId", user.username);
      
      // Store component access information separately for easy access
      if (enhancedUserData.components && enhancedUserData.components.length > 0) {
        localStorage.setItem("userComponents", JSON.stringify(enhancedUserData.components));
      }
      
      if (enhancedUserData.permissions && enhancedUserData.permissions.length > 0) {
        localStorage.setItem("userPermissions", JSON.stringify(enhancedUserData.permissions));
      }

      if (rememberMe) {
        localStorage.setItem("rememberedUsername", username);
      } else {
        localStorage.removeItem("rememberedUsername");
      }
      
      // Pass enhanced user data to parent component
      if (onLoginSuccess) {
        onLoginSuccess(user.userType, enhancedUserData);
      } else {
        // Fallback navigation if no callback provided
        navigate('/worker/dashboard');
      }

    } catch (error: any) {
      console.error("Login error:", error);
      
      // Extract the specific error message from the API response
      let errorMessage = "Login failed. Please try again.";
      
      if (error?.response?.data?.resMsg) {
        // API returned an error with resMsg
        errorMessage = error.response.data.resMsg;
      } else if (error?.resMsg) {
        // Direct API error response
        errorMessage = error.resMsg;
      } else if (error?.message) {
        // Standard error message
        errorMessage = error.message;
      }
      
      setMessage(errorMessage);
      setShowMessage(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div 
          className="w-full h-full opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>
      
      <div className="relative w-full max-w-md">
        {/* Main Login Card */}
        <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
          {/* Decorative gradient overlay */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full -translate-y-16 translate-x-16"></div>
          
          {/* Header Section */}
          <div className="text-center mb-8 relative z-10">
            <div className="mb-6">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-600 font-medium">
              Sign in to continue managing your workforce
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 bg-slate-50/50 text-slate-900 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 font-medium"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border-2 border-slate-200 bg-slate-50/50 text-slate-900 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm font-medium text-slate-600">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/forgot-password");
                }}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>SIGN IN</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </button>

            {/* Error Message */}
            {showMessage && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium flex items-center space-x-2">
                <Shield className="w-4 h-4 flex-shrink-0" />
                <span>{message}</span>
              </div>
            )}

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500 font-medium">or</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-slate-600 font-medium">
                Don't have an account yet?{" "}
                <button
                type="button"
                  className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/sign-up");
                  }}
                >
                  Start free trial
                </button>
              </p>
            </div>
          </form>

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-slate-500">
            <Shield className="w-4 h-4" />
            <span className="font-medium">Secured with enterprise-grade encryption</span>
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white/80 text-sm font-medium">All systems operational</span>
          </div>
        </div>
      </div>

      {/* Feedback Button */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2">
        <button className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105">
          <div className="flex flex-col items-center space-y-1">
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs font-medium">Feedback</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Login;