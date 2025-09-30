import { SignupForm } from "../SignupForm";

export default function SignupFormExample() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <SignupForm onSwitchToLogin={() => console.log("Switch to login")} />
    </div>
  );
}
