import { LoginForm } from "../LoginForm";

export default function LoginFormExample() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <LoginForm onSwitchToSignup={() => console.log("Switch to signup")} />
    </div>
  );
}
