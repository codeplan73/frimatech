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

const EditAction = ({ id }: { id: number }) => {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);

  const updateStatus = async (id: number) => {
    try {
      setPending(true);
      const response = await axios.patch(`/api/orders/${id}`);

      if (response.data || response.status == 200) {
        toast.success(response.data.message);
        router.refresh();
        router.push("/orders");
        <AlertDialogCancel>Cancel</AlertDialogCancel>;
      }
      setPending(false);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="p-2 rounded-md text-bgPrimary bg-textPrimary">
        Update
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure of updating delivery status for this order?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={() => updateStatus(id)} disabled={pending}>
            <span>Continue</span>
            {pending && <Spinner />}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditAction;
