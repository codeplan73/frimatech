import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

const DeleteAction = ({ id }: { id: string }) => {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);

  const deletePost = async () => {
    try {
      setPending(true);
      // Assuming you have an API endpoint for deleting a booking
      const response = await axios.delete(`/api/blog/${id}`);

      console.log(response.data);

      if (response.data || response.status == 200) {
        toast.success(response.data.message);
        router.refresh();
        router.push("/blog");
        <AlertDialogCancel>Cancel</AlertDialogCancel>;
      }
      router.push("/blog");
      setPending(false);
      // Handle response as neededs
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-red-500 border border-red-500 rounded-md p-2">
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure of deleting this blog post?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={() => deletePost()} disabled={pending}>
            <span>Continue</span>
            {pending && <Spinner />}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAction;
