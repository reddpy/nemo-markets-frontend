"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
} from "@/components/ui/form";

import { create_ip } from "@/components/vault/actions";

const assetSchema = z.object({
  asset_name: z.string().min(5, "too short"),
  asset_category: z.string(),
  asset_stage: z.string(),
  asset_description: z.string().min(5, "too short"),
  asset_price: z.coerce.number().positive().int(),
});

const AddIP = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof assetSchema>>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      asset_name: "",
      asset_category: "",
      asset_stage: "",
      asset_description: "",
      asset_price: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof assetSchema>) => {
    let response = await create_ip(values);

    if (response) {
      router.push("/vault?success");
    } else {
      console.log("error!");
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <SelectItem value="BrandAsset">Brand Asset</SelectItem>
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

          <Link href={"/vault"}>
            <Button color="danger" variant="ghost">
              Cancel
            </Button>
          </Link>

          <Button
            variant="shadow"
            className="bg-nemo-blue text-white"
            type="submit"
          >
            Add to portfolio
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddIP;
