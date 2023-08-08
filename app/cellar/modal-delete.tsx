import React, { useState } from "react";

import { Button } from "@/components/ui/button";

import { Modal } from "@/components/ui/modal";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useGlobalContext } from "@/context/store";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  bId: number;
}

export const DeleteBottleModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  title,
  bId,
}) => {
  const { userId, setUserId } = useGlobalContext();

  const handleDelete = async () => {
    console.log("Delete...");
    try {
      await axios.delete(`/api/bottle/${bId}`);
      toast({
        description: "Bottle Deleted.",
      });
    } catch (error) {
      console.error(error);
    }

    setUserId(!userId);
    onClose();
  };

  return (
    <Modal
      title="Delete Bottle"
      description={`${title} (${bId})`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 flex items-center justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};
