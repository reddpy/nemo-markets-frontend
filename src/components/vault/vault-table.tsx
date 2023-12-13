"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { useCallback, useState } from "react";
import DeleteAssetModel from "./delete-asset-modal";

import { CgMoreO } from "react-icons/cg";
let USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

const VaultTable = ({ assets, mutateFunc, successToast, errorToast }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  let list = useAsyncList({
    async load() {
      setIsLoading(false);
      return {
        items: assets,
      };
    },

    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  const renderCell = useCallback((portfolio_item, columnKey) => {
    const cellValue = portfolio_item[columnKey];
    switch (columnKey) {
      case "asking_price":
        let dollar_val = USDollar.format(cellValue);
        return <p className="font-semibold">{dollar_val}</p>;
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="text-nemo-blue"
                  isIconOnly
                  size="lg"
                  variant="light"
                >
                  <CgMoreO size={20} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setSelectedData(portfolio_item);
                    setShowDelete(true);
                  }}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      {showDelete && (
        <DeleteAssetModel
          opened={showDelete}
          openChanged={setShowDelete}
          asset_obj={selectedData}
          mutateFunc={mutateFunc}
          deleteToastFunc={successToast}
          errorToastFunc={errorToast}
        />
      )}
      <Table
        aria-label="Example table with client side sorting"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        className="xl:max-h-[500px] lg:max-h-[275px] md:max-h-[250px]"
        isHeaderSticky
        classNames={{
          wrapper:
            "scrollbar-thin scrollbar-thumb-nemo-blue scrollbar-track-gray-100",
        }}
      >
        <TableHeader>
          <TableColumn key="name" allowsSorting>
            Asset Name
          </TableColumn>
          <TableColumn key="category" allowsSorting>
            Asset Category
          </TableColumn>
          <TableColumn key="stage" allowsSorting>
            Asset Stage
          </TableColumn>
          <TableColumn key="description" allowsSorting>
            Description
          </TableColumn>
          <TableColumn key="asking_price" allowsSorting>
            Price
          </TableColumn>
          <TableColumn key="actions">Actions</TableColumn>
        </TableHeader>
        <TableBody
          items={list.items}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default VaultTable;
