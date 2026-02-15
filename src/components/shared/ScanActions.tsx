import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Share2, Bookmark } from "lucide-react";
import Link from "next/link";

const ScanActions = ({setOpen}: any) => {
  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      <SignedIn>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-800 text-white cursor-pointer"
            onClick={() => {
              // TODO: hook into save scan logic
               // future: save scan to DB
              setOpen(false);
              console.log("Save scan");
            }}
          >
            <Bookmark className="h-4 w-4" />
            Save
          </Button>

          <Button
            variant="secondary"
            className="flex items-center gap-2 bg-rose-700 hover:bg-rose-800 text-white cursor-pointer"
            onClick={() => {
              // TODO: hook into share logic
              setOpen(false);
              console.log("Share scan");
            }}
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </SignedIn>

      <SignedOut>
        <p className="text-sm text-muted-foreground">
          <Link
            href="/sign-in"
            className="font-medium text-blue-600 hover:text-blue-700 underline underline-offset-4 cursor-pointer"
          >
            Sign in
          </Link>{" "}
          to save this scan
        </p>
      </SignedOut>
    </div>
  );
};

export default ScanActions;
