export interface TableProps {
  title?: string;
  //type can be an array of objects or url that returns an array of objects
  data: TableRow[] | string;
  columns?: TableColumn[];
  loading?: boolean;
  onRowClick?: (row: TableRow) => void;
  onRowDoubleClick?: (row: TableRow) => void;
  onRowContextMenu?: (row: TableRow) => void;
  onRowMouseEnter?: (row: TableRow) => void;
  onRowMouseLeave?: (row: TableRow) => void;
  onRowMouseOver?: (row: TableRow) => void;
  onRowMouseOut?: (row: TableRow) => void;
  onRowMouseMove?: (row: TableRow) => void;
  onRowExpand?: (row: TableRow) => void;
  onRowCollapse?: (row: TableRow) => void;
  /**
   *
   */
  onColumnClick?: (column: TableColumn) => void;
  onColumnDoubleClick?: (column: TableColumn) => void;
  /**
   *
   */
  onActionClick?: (action: TableAction) => void;
  /**
   * This is the component that you want to show to the user when the row is expanded
   * @param TableRow the row that is being expanded
   */
  onRowExpandComponent?: (row: TableRow) => React.ReactElement<TableRow>;
  actionOptions?: ActionOptions;
  actionColumn?: boolean;
  columnSort?: boolean;
  config: {[key:string]: any};
  rowExpand?: boolean;
}

export interface ActionOptions {
  edit: boolean;
  delete: boolean;
  add: boolean;
  view: boolean;
  custom: (row: TableRow) => void;
  export: boolean;
}

export interface TableColumn {
  title: string;
  field: string;
  type?:
    | "text"
    | "number"
    | "date"
    | "datetime"
    | "time"
    | "checkbox"
    | "select"
    | "action";
  format?: string;
  width?: string;
  align?: "left" | "center" | "right";
  sortable?: boolean | Array<string>;
  editable?: boolean;
  options?: any[];
  custom?: (row: any) => any;
  render?: (row: any) => any;
}

export interface TableRow {
  id: string | number;
  [key: string]: any;
}

export interface TableAction {
  title: string;
  icon: string;
  onClick: (row: TableRow) => void;
}
