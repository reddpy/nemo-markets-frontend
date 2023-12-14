"use client";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import AddAssetModal from "@/components/vault/add-asset-modal";
import UploadFilesForm from "@/components/vault/upload-files";
import VaultTable from "@/components/vault/vault-table";
import useSWR from "swr";

async function get_portfolio() {
  const response = await fetch(`http://localhost:4000/portfolio/algofi`);
  const portfolio_data = await response.json();
  return portfolio_data;
}

const fetcher = () => get_portfolio();

const Vault = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    "/get/portfolio",
    fetcher,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  );
  console.log("refreshing for some reason");

  const { toast } = useToast();
  const successToast = (
    ip_name: string,
    ip_category: string,
    ip_stage: string,
    action: "Added" | "Deleted" | "Edited"
  ) => {
    toast({
      title: `Success: IP ${action}`,
      description: `${ip_name} - ${ip_category} - ${ip_stage}`,
    });
  };

  const errorToast = (
    ip_name: string,
    ip_category: string,
    ip_stage: string,
    action: "add" | "delete" | "edit"
  ) => {
    toast({
      title: `Error: Unable to ${action} IP`,
      description: `${ip_name} - ${ip_category} = ${ip_stage}`,
    });
  };

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  if (isValidating) return <div>VALIDATING...</div>;

  return (
    <>
      <div className="flex flex-col">
        <div className="flex w-full shadow-xl rounded-lg border border-solid border-nemo-blue p-2 mb-2 justify-end">
          <AddAssetModal
            mutation={mutate}
            successToastFunc={successToast}
            errorToastFunc={errorToast}
          />
          <Toaster />
        </div>
        <VaultTable
          assets={data.assets}
          mutateFunc={mutate}
          successToast={successToast}
          errorToast={errorToast}
        />
      </div>
      <UploadFilesForm />
    </>
  );
};

export default Vault;
