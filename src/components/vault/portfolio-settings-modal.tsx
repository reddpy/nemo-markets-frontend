"use client";

import { Switch } from "../ui/switch";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Button as ShadBtn } from "../ui/button";

import { CiSettings } from "react-icons/ci";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { update_listing_status } from "./actions";

const settingSchema = z.object({
  portfolio_id: z.number(),
  market_listing: z.boolean(),
});

const PortfolioSettingsModal = ({ mutation, portfolio_data }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const number_of_assets: number = portfolio_data.asset_count;

  const form = useForm<z.infer<typeof settingSchema>>({
    resolver: zodResolver(settingSchema),
    defaultValues: {
      portfolio_id: portfolio_data.id,
      market_listing: portfolio_data.listed,
    },
  });

  const onSubmit = async (values: z.infer<typeof settingSchema>) => {
    const response = await update_listing_status(values);
    if (response) {
      form.reset();
      mutation("/get/portfolio");
    } else {
      console.log("error!");
    }
  };

  return (
    <>
      <ShadBtn
        onClick={onOpen}
        size="icon"
        className="bg-nemo-blue hover:text-nemo-blue
        hover:border-nemo-blue horver:border-solid rounded-3xl
        text-white hover:border hover:bg-white"
      >
        <CiSettings size={20} />
      </ShadBtn>
      <Modal
        placement="top"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        className="min-w-[35%]"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Portfolio Settings
          </ModalHeader>
          <ModalBody>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="market_listing"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Marketplace Listing
                        </FormLabel>
                        <FormDescription>
                          List your portfolio on the Nemo Marketplace to be
                          viewed. <br />
                          {number_of_assets == 0 && (
                            <span className="text-red-500">
                              cannot list on marketplace becuase you have no
                              assets in your vault.
                            </span>
                          )}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={number_of_assets === 0 ? true : false}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <ModalFooter>
                  <Button
                    variant="shadow"
                    color="danger"
                    onPress={() => {
                      form.clearErrors();
                      form.reset();
                      onClose();
                    }}
                  >
                    Cancel
                  </Button>
                  {form.formState.isSubmitting ? (
                    <Button
                      className="bg-nemo-blue text-white"
                      type="submit"
                      disabled
                    >
                      Save Changes
                    </Button>
                  ) : (
                    <Button
                      className="bg-nemo-blue text-white"
                      type="submit"
                      isDisabled={
                        !form.formState.isDirty || number_of_assets == 0
                      }
                    >
                      Save Changes
                    </Button>
                  )}
                </ModalFooter>
              </form>
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PortfolioSettingsModal;
