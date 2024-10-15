import { Column, Table } from "@tanstack/react-table";
import React from "react";
import SearchBar from "./SearchBar";

/**
 * Determines if the search bar should be a single or a double for numbers
 * @param param0
 * @returns
 */
function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column?.id);

  //string to filter by
  const columnFilterValue = column.getFilterValue();

  /**
   * Gets only unique items from array
   * @param value
   * @param index
   * @param self
   * @returns
   */
  function findUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }

  const sortedUniqueValues = React.useMemo(() => {
    switch (typeof firstValue) {
      case "number":
        return [];
      case "string":
        //Need to add logic to handle arrays that are strings as well
        //get the unique values as objects
        const blocks = Array.from(
          column.getFacetedUniqueValues().keys()
        ).sort();
        let slicedStrings: string[] = [];
        //break object by comma
        blocks?.map((cluster: object) => {
          if (cluster) {
            let splitObject = Array.from(cluster?.toString().split(","));
            //push each part of object to array (pushing all at once wasn't working)
            splitObject?.map((subString) => {
              slicedStrings.push(subString);
            });
          }
        });
        return slicedStrings?.filter(findUnique).sort() ?? [];
      default:
        if (column.getFacetedUniqueValues().size > 0) {
          return (
            Array.from(column.getFacetedUniqueValues()?.keys())?.sort() ?? []
          );
        }
        return [];
    }
  }, [column.getFacetedUniqueValues()]);

  return typeof firstValue === "number" ? (
    <div>
      <div className="flex space-x-2">
        <SearchBar
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ""
          }`}
          className="w-24 border shadow rounded"
        />
        <SearchBar
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ""
          }`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <datalist id={column?.id + "list"}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => {
          return (
            <option
              value={value}
              key={value + sortedUniqueValues.indexOf(value)}
            />
          );
        })}
      </datalist>
      <SearchBar
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search`}
        className="w-36 border shadow rounded"
        list={column?.id + "list"}
      />
      <div className="h-1" />
    </>
  );
}

export default Filter;
