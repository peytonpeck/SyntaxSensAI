import { LoginForm } from "@/components/LoginForm";
import { UnauthenticatedLayout } from "@/components/landing/UnauthenticatedLayout";
import { createFileRoute } from "@tanstack/react-router";
import syntaxSensaiLogo from "../assets/syntaxsensailogo.png";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  return (
    <UnauthenticatedLayout>
      <div className="w-full max-w-sm">
        <div className="flex justify-center w-full mb-10">
          <img src={syntaxSensaiLogo} className="w-60" />
        </div>
        <LoginForm />
      </div>
    </UnauthenticatedLayout>
  );
}
