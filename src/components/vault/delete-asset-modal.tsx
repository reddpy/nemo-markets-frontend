"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormLabel } from "../ui/form";
import { Label } from "../ui/label";
import { delete_ip } from "./actions";

const certifiedSchema = z.object({
  is_certified: z.boolean(),
});

const DeleteAssetModel = ({
  opened,
  openChanged,
  asset_obj,
  mutateFunc,
  deleteToastFunc,
  errorToastFunc,
  asset_count,
  listing_status,
}) => {
  const form = useForm<z.infer<typeof certifiedSchema>>({
    resolver: zodResolver(certifiedSchema),
    defaultValues: {},
  });

  const certified_watch = form.watch("is_certified");
  const onSubmit = async () => {
    const response = await delete_ip(asset_obj);
    if (response) {
      form.reset();
      deleteToastFunc(
        asset_obj.name,
        asset_obj.category,
        asset_obj.stage,
        "Deleted",
      );
      mutateFunc("/get/portfolio");
    } else {
      errorToastFunc(
        asset_obj.name,
        asset_obj.category,
        asset_obj.stage,
        "delete",
      );
    }
  };

  return (
    <>
      <Modal isOpen={opened} onOpenChange={openChanged} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are You Sure?
              </ModalHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <ModalBody>
                    <Label className="font-bold">Name: </Label>
                    <p>{asset_obj.name}</p>
                    <Label className="font-bold">Category: </Label>
                    <p>{asset_obj.category}</p>
                    <Label className="font-bold">Stage: </Label>
                    <p>{asset_obj.stage}</p>

                    <Label className="font-bold">Description: </Label>
                    <p>{asset_obj.description}</p>
                    <hr />
                    <FormField
                      control={form.control}
                      name="is_certified"
                      render={({ field }) => (
                        <>
                          <div className="flex flex-row">
                            <FormControl>
                              <Checkbox
                                className="mt-1"
                                id="certified"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="ml-4" htmlFor="certified">
                              Checking this box certifies you want to remove
                              this IP from your vault
                              {asset_count == 1 && listing_status && (
                                <>
                                  <br />
                                  <br />
                                  <span className="font-bold text-red-500">
                                    Note: your portfolio will be unlisted from
                                    the marketplace since your vault will be
                                    empty.
                                  </span>
                                </>
                              )}
                            </FormLabel>
                          </div>
                        </>
                      )}
                    />
                  </ModalBody>
                  <ModalFooter className="mt-5">
                    <Button color="primary" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      type="submit"
                      variant="shadow"
                      color="danger"
                      disabled={form.formState.isSubmitting}
                      disableAnimation={true}
                      isDisabled={!certified_watch}
                    >
                      Delete
                    </Button>
                  </ModalFooter>
                </form>
              </Form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteAssetModel;
