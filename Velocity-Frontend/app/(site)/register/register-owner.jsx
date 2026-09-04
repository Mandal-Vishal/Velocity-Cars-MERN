
import { AuthForm, AuthShell } from "@/components/site/auth/auth-form";
function RegisterOwner() {
  return <AuthShell><AuthForm mode="register" role = 'owner' /></AuthShell>;
}
export {
  RegisterOwner as default
};
