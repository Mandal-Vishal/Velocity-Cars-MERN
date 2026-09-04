
import { AuthForm, AuthShell } from "@/components/site/auth/auth-form";
function LoginPage() {
  return <AuthShell><AuthForm mode="login" /></AuthShell>;
}
export {
  LoginPage as default
};
