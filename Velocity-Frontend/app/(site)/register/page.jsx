
import { AuthForm, AuthShell } from "@/components/site/auth/auth-form";
function RegisterPage() {
  return <AuthShell><AuthForm mode="register" role = 'renter' /></AuthShell>;
}
export {
  RegisterPage as default
};
