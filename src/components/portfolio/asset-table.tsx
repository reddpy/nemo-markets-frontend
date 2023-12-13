import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { useState, useCallback } from "react";
import AssetDetailModal from "./asset-detail-modal";

let USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

const AssetTable = ({ assets }) => {
  const [isLoading, setIsLoading] = useState(true);

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
      case "view_details":
        return <AssetDetailModal {...portfolio_item} />;
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      aria-label="Example table with client side sorting"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      className="xl:max-h-[500px] lg:max-h-[275px] md:max-h-[200px]"
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
        <TableColumn key="view_details">{""}</TableColumn>
      </TableHeader>
      <TableBody
        items={list.items}
        isLoading={isLoading}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default AssetTable;
