import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function FirebaseSetupNotice() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Alert className="max-w-2xl" variant="destructive">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle className="text-lg font-semibold">Firebase Configuration Error</AlertTitle>
        <AlertDescription className="mt-2 space-y-2">
          <p>
            The Firebase Realtime Database URL must point to the root of your database (not including a child path).
          </p>
          <p className="font-mono text-sm bg-background/50 p-2 rounded">
            Correct format: https://your-project-default-rtdb.firebaseio.com
          </p>
          <p className="mt-4">
            Please update your <strong>VITE_FIREBASE_DATABASE_URL</strong> secret with the correct root URL format, then refresh the page.
          </p>
          <p className="text-sm mt-4">
            To find your database URL:
          </p>
          <ol className="list-decimal list-inside text-sm space-y-1">
            <li>Go to Firebase Console</li>
            <li>Select your project</li>
            <li>Navigate to Realtime Database</li>
            <li>Copy the URL shown at the top (should end with .firebaseio.com)</li>
          </ol>
        </AlertDescription>
      </Alert>
    </div>
  );
}
