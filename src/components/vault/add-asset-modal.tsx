"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import { IoIosAddCircleOutline } from "react-icons/io";
import * as z from "zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

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

import { create_ip } from "./actions";

const assetSchema = z.object({
  asset_name: z.string().min(5, "too short"),
  asset_category: z.string(),
  asset_stage: z.string(),
  asset_description: z.string().min(5, "too short"),
  asset_price: z.coerce.number().positive().int(),
});

const AddAssetModal = ({ mutation, successToastFunc, errorToastFunc }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const form = useForm<z.infer<typeof assetSchema>>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      asset_name: undefined,
      asset_category: undefined,
      asset_stage: undefined,
      asset_description: undefined,
      asset_price: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof assetSchema>) => {
    const response = await create_ip(values);
    if (response) {
      form.reset();
      successToastFunc(
        values.asset_name,
        values.asset_category,
        values.asset_stage,
        "Added"
      );
      mutation("/get/portfolio");
    } else {
      errorToastFunc(
        values.asset_name,
        values.asset_category,
        values.asset_stage,
        "add"
      );
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        className="rounded-md text-white min-w-[15%] ml-2 mr-2 bg-nemo-blue hover:bg-white hover:text-nemo-blue hover:border-nemo-blue hover:border horver:border-solid"
      >
        <IoIosAddCircleOutline size={25} />
        <span className="ml-2">Add New IP</span>
      </Button>
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
            Add Intellectual Property
          </ModalHeader>
          <ModalBody>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="asset_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Asset Name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the name of your Asset
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="asset_category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an Asset Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Software">Software</SelectItem>
                          <SelectItem value="Brand Asset">
                            Brand Asset
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>This is the asset type</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="asset_stage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stage</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an Asset Stage" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Live">Live</SelectItem>
                          <SelectItem value="Prototype">Prototype</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        This is the current status of the asset
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="asset_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asset Price</FormLabel>
                      <FormControl>
                        <Input placeholder="Asset Price" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the price of your Asset
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="asset_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asset Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Asset Description" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the description of your Asset
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <ModalFooter>
                  <Button
                    color="danger"
                    variant="ghost"
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
                      variant="shadow"
                      className="bg-nemo-blue text-white"
                      type="submit"
                      disabled
                    >
                      Add to portfolio
                    </Button>
                  ) : (
                    <Button
                      variant="shadow"
                      className="bg-nemo-blue text-white"
                      type="submit"
                    >
                      Add to portfolio
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

export default AddAssetModal;
