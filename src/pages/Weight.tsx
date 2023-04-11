import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { WeightType } from "../types/weight";

const editRecord = (record: WeightType) => {
  console.log("editRecord", record);
};

const deleteRecord = (record: WeightType) => {
  console.log("deleteRecord", record);
};

const columns: ColumnsType<WeightType> = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (_, { date }) => <span>{new Date(date).toLocaleDateString()}</span>,
  },
  {
    title: "Weight",
    dataIndex: "weight",
    key: "weight",
  },
  {
    title: "Workout Tags",
    key: "workoutTags",
    dataIndex: "workoutTags",
    render: (_, { workoutTags }) => (
      <>
        {workoutTags.map((tag) => (
          <Tag key={tag}>{tag.toUpperCase()}</Tag>
        ))}
      </>
    ),
  },
  {
    title: "",
    width: "30px",
    key: "action",
    render: (_, record) => <EditTwoTone onClick={() => editRecord(record)} />,
  },
];

const data: WeightType[] = [
  {
    key: "1",
    date: "2021-01-01",
    weight: 100,
    workoutTags: ["Chest", "Back"],
  },
  {
    key: "2",
    date: "2021-01-02",
    weight: 101,
    workoutTags: ["Legs", "Arms"],
  },
  {
    key: "3",
    date: "2021-01-03",
    weight: 102,
    workoutTags: ["Shoulders"],
  },
];

export default function Weight() {
  return (
    <>
      <h3>Weight Tracker</h3>
      <Table columns={columns} dataSource={data} />
    </>
  );
}
