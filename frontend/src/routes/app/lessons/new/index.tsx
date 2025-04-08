import { AppContent } from "@/components/AppContent";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, X } from "lucide-react";

export const Route = createFileRoute("/app/lessons/new/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppContent
      title="Create New Lesson Plan"
      className="flex justify-center items-center flex-col flex-1 w-full"
    >
      <Textarea
        className="min-h-30 max-h-[calc(100vh-12rem)] resize-none w-full"
        placeholder="Type your essay here."
      />
      <div className="flex justify-between pt-2">
        <Button variant="outline">
          <X /> Clear Text
        </Button>
        <Button>
          <Plus /> Create Lesson
        </Button>
      </div>
    </AppContent>
  );
}
