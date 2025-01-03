"use client";

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

const DeleteAction = ({ id }: { id: number }) => {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);

  const deleteBooking = async () => {
    try {
      setPending(true);
      // Assuming you have an API endpoint for deleting a booking
      const response = await axios.delete(`/api/orders/${id}`);

      console.log(response.data);

      if (response.data || response.status == 200) {
        toast.success(response.data.message);
        router.refresh();
        router.push("/orders");
        <AlertDialogCancel>Cancel</AlertDialogCancel>;
      }
      setPending(false);
      // Handle response as needed
    } catch (error) {
      console.error("Error deleting order:", error);
    } finally {
      router.refresh(); // Additional refresh
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="p-2 text-red-500 border border-red-500 rounded-md">
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure of deleting this product?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={() => deleteBooking()} disabled={pending}>
            <span>Continue</span>
            {pending && <Spinner />}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAction;
