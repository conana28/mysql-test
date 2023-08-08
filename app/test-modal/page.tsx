"use client";

import { AlertModal } from "@/components/modals/alert-modal";
import { FormModal } from "@/components/modals/form-modal";
import { StoreModal } from "@/components/modals/store-modal";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Store } from "lucide-react";
import { useState } from "react";

const testModal = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onContinue = () => {
    console.log("first");
    setOpen(false);
  };

  return (
    <div className="p-4">
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onContinue}
        loading={loading}
      /> */}

      <FormModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onContinue}
        loading={loading}
        title="Add Bottle"
        bottles={[]}
      />
      <Button
        disabled={loading}
        variant="destructive"
        size="sm"
        onClick={() => setOpen(true)}
      >
        Alert Modal
      </Button>
      <Button
        disabled={loading}
        variant="destructive"
        size="sm"
        onClick={() => setOpen(true)}
      >
        Form Modal
      </Button>
    </div>
  );
};

export default testModal;
