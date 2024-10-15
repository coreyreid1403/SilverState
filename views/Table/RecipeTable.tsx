import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  FilterFn,
  ColumnDef,
  flexRender,
  Table,
} from "@tanstack/react-table";

import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import { Recipe } from "../../models/LumiMeals/Recipes/Recipe";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import DropdownView from "../dropdowns/DropdownView";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import { Constants } from "../../util/LumiMeals/Constants";
import Toggle from "../Toggle";
import { Diets, RecipeCatagories, UserToggles } from "../../models/LumiMeals/enums";
import styles from "../../styles/views/Table/RecipeTable.module.css";
import GlobalVariables from "../../util/LumiMeals/GlobalVariables";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

function RecipeTable(props: any) {
  //if we have set up data or not
  const dataFetchedRef = useRef(false);
  const globals = GlobalVariables.getInstance();
  //#region States
  const [zeroVisible, setZeroVisible] = useState(true);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  let allData = getData();
  const [data, setData] = useState<any>(getData());
  const [userId, setUserId] = useState("");
  //#endregion

  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    console.log("Fuzzy filter");
    // Rank the item
    // if (!row || !columnId || !value){
    //   return;
    // }
      const itemRank = rankItem(row.getValue(columnId), value);
    // Store the itemRank info
    addMeta({
      itemRank,
    });

    // Return if the item should be filtered in/out
    return itemRank.passed;
  };

  // const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  //   let dir = 0;
  //   console.log("Fuzzy Sort");
  //   // Only sort by rank if the column has ranking information
  //   if (rowA.columnFiltersMeta[columnId]) {
  //     dir = compareItems(
  //       rowA.columnFiltersMeta[columnId]?.itemRank!,
  //       rowB.columnFiltersMeta[columnId]?.itemRank!
  //     );
  //   }

  //   // Provide an alphanumeric fallback for when the item ranks are equal
  //   return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
  // };

  /**
   * Convert bool to yes or no
   * @param input bool
   * @returns
   */
  function boolConverter(input: boolean): string {
    return input ? "yes" : "no";
  }

  /**
   * checks to see if all passed in titles are visible
   * @param table
   * @param titles
   * @returns
   */
  function areAllVisible(table: Table<any>, titles: string[]): boolean {
    let arr = titles?.map((title) => {
      return table?.getColumn(title)?.getIsVisible();
    });
    return arr.every((v) => v === true);
  }

  /**
   * toggles visibility on multiple titles
   * @param e
   * @param editTableBasicTitles
   */
  function changeVisibilityOnGroupSlider(table: Table<any>, titles: string[]) {
    let toggle = !table?.getColumn(titles[0])?.getIsVisible();
    if (!areAllVisible(table, titles)) {
      toggle = true;
    }
    
    titles?.map((title) => {
      table?.getColumn(title)?.toggleVisibility(toggle);
    });

    //save all to user 
    // TODO: Can make work later if we want.
    // titles.map(async (title) => await addToggleClick(title, !toggle));
  }

  /**
   * toggles visibility on 0% frequency
   * @param isFirstRun if its teh initial run
   */
  function zeroVisibility(isFirstRun = false) {
    if (isFirstRun) {
      addToggleClick("ShowZero", zeroVisible);
    }
    setZeroVisible(!zeroVisible);
    filterZeroVisibility();
  }

  /**
   * filters recipes based on 0% property
   */
  async function filterZeroVisibility() {
    let data = await allData;
    if (!zeroVisible) {
      setData(data);
    } else {
      setData(data?.filter((recipe: Recipe) => recipe.frequency > 0));
    }
  }

  /**
   * Gets the users toggle
   */
  async function getUserToggle() {
    const user = await globals?.getUser();
    if (user) {
      setUserId(user.userId);
      return user.UserToggles;
    }
    return 1 as UserToggles;
  }

  /**
   * Processes toggle clicks for storage
   * @param name: toggles name
   */
  async function addToggleClick(name: string, isCurrentlyToggled: boolean) {
    const noSpace: unknown = name.replace(/\s/g, "");
    const asEnum = noSpace as UserToggles;
    const enumNumber = parseInt(UserToggles[asEnum]);
    const toggle = await getUserToggle();
    const preToggle = toggle;
    if (enumNumber) {
      if (isCurrentlyToggled) {
        saveToggle(toggle + enumNumber);
      } else {
        saveToggle(toggle - enumNumber);
      }
    }
  }

  /**
   * Opens or closes advanced toggle options
   * @returns
   */
  function toggleAdvancedToggleOptions() {
    const advancedToggles = document.getElementById(
      styles.advancedToggleOptions
    );
    if (advancedToggles) {
      if (
        advancedToggles.style.display === "none" ||
        advancedToggles.style.display === ""
      ) {
        advancedToggles.style.display = "block";
      } else {
        advancedToggles.style.display = "none";
      }
    }
  }

  /**
   * Code to run on close
   * @returns
   */
  async function saveToggle(toggleToSave: number) {
    const user = await globals?.getUser();
    if (user) {
      user.UserToggles = toggleToSave;
      globals?.setUser(user).then((user) => console.log("Saved User Toggles"));
    }
  }

  /**
   * Sets user selected toggles
   * @returns
   */
  async function setUserSavedToggles(table: Table<any>) {
    let user = await globals?.getUser();
    if (user) {
      const toggleFlag = user.UserToggles ?? 1;
      let toBeHidden: string[] = [];
      if (!!(toggleFlag & UserToggles.ShowZero)) {
        zeroVisibility(true);
      }
      if (!!(toggleFlag & UserToggles.Name)) {
        toBeHidden.push("Name");
      }
      if (!!(toggleFlag & UserToggles.Pack)) {
        toBeHidden.push("Pack");
      }
      if (!!(toggleFlag & UserToggles.Creator)) {
        toBeHidden.push("Creator");
      }
      if (!!(toggleFlag & UserToggles.Ingredients)) {
        toBeHidden.push("Ingredients");
      }
      if (!!(toggleFlag & UserToggles.ServingSize)) {
        toBeHidden.push("Serving Size");
      }
      if (!!(toggleFlag & UserToggles.Diets)) {
        toBeHidden.push("Diets");
      }
      if (!!(toggleFlag & UserToggles.Expense)) {
        toBeHidden.push("Expense");
      }
      if (!!(toggleFlag & UserToggles.PrepTime)) {
        toBeHidden.push("Prep Time");
      }
      if (!!(toggleFlag & UserToggles.CookTime)) {
        toBeHidden.push("Cook Time");
      }
      if (!!(toggleFlag & UserToggles.Catagories)) {
        toBeHidden.push("Catagories");
      }
      if (!!(toggleFlag & UserToggles.RelatedRecipes)) {
        toBeHidden.push("Related Recipes");
      }
      if (!!(toggleFlag & UserToggles.Steps)) {
        toBeHidden.push("Steps");
      }
      if (!!(toggleFlag & UserToggles.Complexity)) {
        toBeHidden.push("Complexity");
      }
      if (!!(toggleFlag & UserToggles.Frequency)) {
        toBeHidden.push("Frequency");
      }
      if (!!(toggleFlag & UserToggles.AdditionalVegetables)) {
        toBeHidden.push("Additional Vegetables");
      }
      if (!!(toggleFlag & UserToggles.SideNeeded)) {
        toBeHidden.push("Side Needed");
      }
      if (!!(toggleFlag & UserToggles.AlcoholPairing)) {
        toBeHidden.push("Alcohol Pairing");
      }
      if (!!(toggleFlag & UserToggles.PairingVegetables)) {
        toBeHidden.push("Pairing Vegetables");
      }
      if (!!(toggleFlag & UserToggles.Creator)) {
        toBeHidden.push("Creator");
      }
      if (!!(toggleFlag & UserToggles.Recipe)) {
        toBeHidden.push("Recipe");
      }
      if (!!(toggleFlag & UserToggles.Edit)) {
        toBeHidden.push("Edit");
      }
      if (toBeHidden?.length > 0) {
        changeVisibilityOnGroupSlider(table, toBeHidden);
      }
    }
  }

  //#region ColumnsDefined
  const columnsPreFilter = useMemo<ColumnDef<Recipe, any>[]>(
    () => [
      {
        header: "Basic",
        footer: (props) => props.column?.id,
        columns: [
          {
            accessorFn: (recipe) => recipe?.name,
            id: "Name",
            cell: (info) => info?.getValue(),
            header: () => <span>Name</span>,
          },
          {
            accessorFn: (recipe) => recipe?.diets?.toString(),
            id: "Diets",
            cell: (info) => {
              let diets = info
                ?.getValue()
                ?.split(",")
                ?.map((subString: string) => {
                  return subString as Diets;
                });
              return <DropdownView items={diets} />;
            },
            header: () => <span>Diets</span>,
          },
          {
            accessorFn: (recipe) => recipe?.category?.toString(),
            id: "Catagories",
            cell: (info) => {
              let catagories = info
                ?.getValue()
                ?.split(",")
                ?.map((subString: string) => {
                  return subString as RecipeCatagories;
                });
              return <DropdownView items={catagories} />;
            },
            header: () => <span>Catagories</span>,
          },
          {
            accessorFn: (recipe) => recipe?.expense,
            id: "Expense",
            cell: (info) =>
              info?.getValue() != "NotSelected" ? info?.getValue() : "",
            header: () => <span>Expense</span>,
          },
          {
            accessorFn: (recipe) => recipe?.prep_time,
            id: "Prep Time",
            cell: (info) => info?.getValue() + "min",
            header: () => <span>Prep Time</span>,
          },
          {
            accessorFn: (recipe) => recipe?.cook_time,
            id: "Cook Time",
            cell: (info) => info?.getValue() + "min",
            header: () => <span>Cook Time</span>,
          },
        ],
      },
      {
        header: "Advanced",
        visibility: false,
        columns: [
          {
            accessorFn: (recipe) => recipe?.serving_size,
            id: "Serving Size",
            cell: (info) => info?.getValue(),
            header: () => <span>Serving Size</span>,
            // filterFn: 'fuzzy',
            // sortingFn: fuzzySort,
          },
          {
            accessorFn: (recipe) => recipe?.frequency,
            id: "Frequency",
            cell: (info) => info?.getValue() + "%",
            header: () => <span>Frequency</span>,
          },
          {
            accessorFn: (recipe) => recipe?.complexity,
            id: "Complexity",
            cell: (info) =>
              info?.getValue() != "NotSelected" ? info?.getValue() : "",
            header: () => <span>Complexity</span>,
          },
          {
            accessorFn: (recipe) =>
              recipe.ingredients?.map((recipe) => recipe?.ingredient?.name),
            id: "Ingredients",
            cell: (info) => <DropdownView items={info?.getValue()} />,
            header: () => <span>Ingredients</span>,
          },
          {
            accessorFn: (recipe) => recipe?.related_recipes,
            id: "Related Recipes",
            cell: (info) => <DropdownView items={info?.getValue()} />,
            header: () => <span>Related Recipes</span>,
          },
          {
            accessorFn: (recipe) => recipe?.steps,
            id: "Steps",
            cell: (info) => <DropdownView items={info?.getValue()} />,
            header: () => <span>Steps</span>,
          },
          {
            accessorFn: (recipe) => recipe?.pairing_vegetables,
            id: "Pairing Vegetables",
            cell: (info) => <DropdownView items={[info?.getValue()]} />,
            header: () => <span>Pairing Vegetables</span>,
          },
          {
            accessorFn: (recipe) => boolConverter(recipe?.additional_vegetable),
            id: "Additional Vegetables",
            cell: (info) => info?.getValue(),
            header: () => <span>Additional Vegetables</span>,
          },
          {
            accessorFn: (recipe) => boolConverter(recipe?.additional_vegetable),
            id: "Side Needed",
            cell: (info) => info?.getValue(),
            header: () => <span>Side Needed</span>,
          },
          {
            accessorFn: (recipe) => recipe?.alcohol_pairing,
            id: "Alcohol Pairing",
            cell: (info) => <DropdownView items={info?.getValue()} />,
            header: () => <span>Alcohol Pairing</span>,
          },
        ],
      },
      {
        header: "Creator Info",
        columns: [
          {
            accessorFn: (recipe) => recipe?.creator,
            id: "Creator",
            cell: (info) => info?.getValue(),
            header: () => <span>Creator</span>,
          },
          {
            accessorFn: (recipe) => recipe?.pack,
            id: "Pack",
            cell: (info) => info?.getValue(),
            header: () => <span>Pack</span>,
          },
        ],
      },
      {
        header: "Links",
        columns: [
          {
            accessorFn: (recipe) => recipe?.id,
            id: "Recipe",
            cell: (recipe) => (
              <Button variant="outline-secondary">
                <Link
                  href={{
                    pathname: `/${userId ?? 'undefined'}/recipe`,
                    query: "recipeId=" + recipe?.getValue(),
                  }}
                >
                  Recipe
                </Link>
              </Button>
            ),
            header: () => <span>Recipe</span>,
          },
          {
            accessorFn: (recipe) => recipe?.id,
            id: "Edit",
            cell: (recipe) => (
              <Button variant="outline-secondary">
                <Link
                  href={{
                    pathname: `/${userId ?? 'undefined'}/addRecipe`,
                    query: "recipeId=" + recipe?.getValue(),
                  }}
                >
                  Edit Recipe
                </Link>
              </Button>
            ),
            header: () => <span>Edit</span>,
          },
        ],
      },
    ],
    []
  );

  const [columns] = useState<typeof columnsPreFilter>(() => [
    ...columnsPreFilter,
  ]);
  //#endregion

  const rerender = useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnVisibility,
      columnFilters,
      globalFilter,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  async function getData() {
    let recipes: Recipe[] = await props.recipes;
    //pop off if null or not a recipe
    let filteredRecipes: Recipe[] = recipes?.filter((recipe) => {
      if (recipe) {
        return recipe;
      }
      else{
        console.error("Error, recipe was null: " + recipes.indexOf(recipe));
      }
    });
    return filteredRecipes ?? [];
  }

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === "fullName") {
      if (table.getState().sorting[0]?.id !== "fullName") {
        table.setSorting([{ id: "fullName", desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    const fetchData = async () => {
      setData(await getData());
    };
    fetchData();
    setUserSavedToggles(table);
  }, []);

  //#region return
  return (
    <div className="p-2">
      <div className="inline-block border border-black shadow rounded">
        {/* /Div for basic visibility*/}
        <Toggle
          id={"basicToggle"}
          title={"Basic"}
          onSwitchClick={() =>
            changeVisibilityOnGroupSlider(table, Constants.editTableBasicTitles)
          }
          checked={areAllVisible(table, Constants.editTableBasicTitles)}
        />

        {/* /Div for advanced visibility*/}
        <Toggle
          id={"advancedToggle"}
          title={"Advanced"}
          onSwitchClick={() =>
            changeVisibilityOnGroupSlider(
              table,
              Constants.editTableAdvancedTitles
            )
          }
          checked={areAllVisible(table, Constants.editTableAdvancedTitles)}
        />

        {/* Hidden toggles button*/}
        <button onClick={() => toggleAdvancedToggleOptions()}>
          *Advanced Toggles*
        </button>
        <div id={styles.advancedToggleOptions}>
          {/* /Div for all visibility*/}
          <button onClick={() => table.resetColumnVisibility()}>
            Show All
          </button>
          {/* /Div for all 0% visibility*/}
          <Toggle
            id={"ShowZero"}
            key={"0Freq"}
            title={"Show 0% frequency"}
            onSwitchClick={zeroVisibility}
            checked={zeroVisible}
          />
          {/* /Div for individual visibility*/}
          {table.getAllLeafColumns()?.map((column) => {
            return (
              // <div id="columnToggles">
              <Toggle
                id={column?.id}
                key={column?.id}
                title={column?.id}
                onSwitchClick={(e) => {
                  //this returns a method... so call it. so dumb
                  column.getToggleVisibilityHandler()(e);
                  addToggleClick(column?.id, column.getIsVisible());
                }}
                checked={column.getIsVisible()}
              />
              // </div>
            );
          })}
        </div>
      </div>
      <div className="h-4" />

      <div>
        <SearchBar
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          className="p-2 font-lg shadow border border-block"
          placeholder="Search all columns..."
        />
      </div>
      <div className="h-2" />
      <div className={styles.scrollingDiv}>
        <table>
          <thead>
            {table.getHeaderGroups()?.map((headerGroup) => (
              <tr key={headerGroup?.id}>
                {headerGroup.headers?.map((header) => {
                  return (
                    <th key={header?.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: " 🔼",
                              desc: " 🔽",
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows?.map((row) => {
              return (
                <tr key={row?.id}>
                  {row.getVisibleCells()?.map((cell) => {
                    return (
                      <td key={cell?.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
            pattern="\d*"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
  //#endregion
}

export default RecipeTable;

RecipeTable.propTypes = {
  recipes: PropTypes.any.isRequired,
  showFrequencyZero: PropTypes.bool.isRequired,
};
