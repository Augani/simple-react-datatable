import React from "react";
import { Story } from "@storybook/react";
import {SDatatable} from "../components/table";
import {TableProps} from "../components/table/type";


export default {
  title: "Datatable with sources",
  component: SDatatable,
};

const Template: Story<TableProps> = args => <SDatatable {...args} />;

export const Array = Template.bind({});
Array.args = {
    title: "Data Table",
    data: 'https://jsonplaceholder.typicode.com/posts',
    columnSort: true,
    onRowClick: (row) => {
      console.log(row)
    },
    rowExpand: true,
    onRowExpandComponent: (row) => {
      return <div>{row.id}
        <div>{row.body}</div>
      </div>
    }
};
