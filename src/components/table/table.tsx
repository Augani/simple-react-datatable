//create react component
import * as React from "react";
import { TableProps, TableColumn, TableRow } from "./type";
import { setHeader, getData, sortData } from "./helpers";
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from "@heroicons/react/24/solid";

const Table = (props: TableProps) => {
  const {
    title,
    data,
    columns = [],
    columnSort = false,
    config,
    onRowClick,
    rowExpand = false,
    onRowExpandComponent,
  } = props;
  const [dataToShow, setDataToShow] = React.useState<Array<TableRow>>([]);
  const [allData, setAllData] = React.useState<Array<TableRow>>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = React.useState<number>(10);
  const [search, setSearch] = React.useState<string>("");
  const [selectedColumn, setSelectedColumn] = React.useState<string>("");
  const [searchResults, setSearchResults] = React.useState<Array<TableRow>>([]);
  const [refresh, setRefresh] = React.useState<boolean>(false);
  const [secondaryColumns, setSecondaryColumns] = React.useState<
    Array<TableColumn>
  >([]);
  const [rowsToExpand, setRowsToExpand] = React.useState<Array<any>>([]);

  const rowClick = function (row: TableRow) {
    if (onRowClick) {
      onRowClick(row);
    }
    if (rowExpand && rowsToExpand.indexOf(row.id) === -1) {
      setRowsToExpand([...rowsToExpand, row.id]);
    }else if (rowExpand){
      setRowsToExpand(rowsToExpand.filter(id => id !== row.id));
    }
  };

  const goToNext = () => {
    setCurrentPage(currentPage + 1);
  };

  React.useEffect(() => {
    if (searchResults.length > 0) {
      setDataToShow(
        searchResults.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      );
      return;
    }
    let y = allData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    setDataToShow(y);
  }, [currentPage]);

  React.useEffect(() => {
    let y = allData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    setDataToShow(y);
  }, [refresh]);

  const goToPrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const clearSearchData = () => {
    setSearch("");
  };

  const onSearchChange = (search: string) => {
    if (!search) {
      setSearchResults([]);
      setSelectedColumn("");
      if (currentPage != 1) {
        setCurrentPage(1);
      } else {
        setRefresh(!refresh);
      }
      return;
    }
    if (selectedColumn) {
      let filteredData = allData.filter((item) =>
        item[selectedColumn].toString().includes(search)
      );
      setSearchResults(filteredData);
    } else {
      let filteredData = allData.filter((item) => {
        for (let key in item) {
          if (item[key].toString().includes(search)) return true;
        }
        return false;
      });
      setSearchResults(filteredData);
    }
    setSearch(search);
    setCurrentPage(1);
  };

  React.useEffect(() => {
    if (search) {
      setDataToShow(searchResults.slice(0, itemsPerPage));
    }
  }, [searchResults]);

  React.useEffect(() => {
    setDataToShow(allData.slice(0, itemsPerPage));
  }, [secondaryColumns]);

  React.useEffect(() => {
    onSearchChange(search);
  }, [search]);

  React.useEffect(() => {
    getData(data, config)
      .then((data) => {
        setAllData(data);
        if (columns.length == 0 && data.length > 0) {
          let heads = Object.keys(data[0]);
          let columndata: TableColumn[] = heads.map((head) => {
            return {
              title: setHeader(head),
              field: head,
              sortable: columnSort,
            };
          });
          setSecondaryColumns(columndata);
        }
      })
      .catch(() => {
        setAllData([]);
      });
  }, [data]);

  console.log(dataToShow);
  return (
    <div className="s-data-table">
      <div className="s-data-table_header">
        <h5>{title}</h5>
        {/* search input for table */}
        <div>
          <input
            type="text"
            value={search}
            placeholder="Search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          {search && (
            <XMarkIcon onClick={clearSearchData} className="s-datatable-icon" />
          )}
        </div>
      </div>
      <table>
        <thead className="s-data-table_head">
          <tr>
            {secondaryColumns &&
              secondaryColumns.length > 0 &&
              secondaryColumns.map((column, index) => {
                return (
                  <th
                    style={{
                      width: column.width
                        ? column.width
                        : (1 / secondaryColumns.length) * 100 + "%",
                    }}
                    className={`${
                      selectedColumn == column.field
                        ? "s-data-table_head-selected"
                        : ""
                    }`}
                    key={index}
                    onClick={() => {
                      setSelectedColumn(column.field);
                    }}
                  >
                    <div>
                      <span>{column.title}</span>
                      <span>
                        {column.sortable && (
                          <ChevronDownIcon className="s-datatable-icon" />
                        )}
                      </span>
                    </div>
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody>
          {dataToShow &&
            dataToShow.length > 0 &&
            dataToShow.map((item: TableRow, index) => {
              return (
                <>
                  <tr
                    style={{ cursor: onRowClick ? "pointer" : "" }}
                    onClick={() => rowClick(item)}
                    key={item.id}
                  >
                    {secondaryColumns.map((column, index) => {
                      return <td key={index}>{item[column.field]}</td>;
                    })}
                  </tr>
                  {rowExpand &&
                    rowsToExpand.length > 0 &&
                    rowsToExpand.indexOf(item.id) > -1 &&
                    onRowExpandComponent && (
                      <tr>
                        <td colSpan={secondaryColumns.length}>
                          <div key={index}>{onRowExpandComponent(item)}</div>
                        </td>
                      </tr>
                    )}
                </>
              );
            })}
          {dataToShow &&
            dataToShow.length === 0 && (
              <tr>
                <td colSpan={columns.length}>No data found</td>
              </tr>
            )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={columns.length}>
              <div className="s-datatable-foot_summary">
                <span>
                  {dataToShow.length * currentPage} of {allData.length}
                </span>
              </div>
              <div className="s-datable-foot_pagination">
                {/* hide previous button when on first page */}
                {currentPage > 1 && (
                  <button onClick={goToPrevious}>Previous</button>
                )}
                {/* hide next button when on last page */}
                {currentPage < Math.ceil(allData.length / itemsPerPage) && (
                  <button onClick={goToNext}>Next</button>
                )}
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
