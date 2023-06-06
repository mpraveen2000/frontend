import { useMutation, useQuery } from "@apollo/client";
import { Card, Table } from "antd";
import { DELETE_TAG, GET_ALL_TAGS } from "./query";
import { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { IMutation, IQuery, Tag } from "../../../graphql";
interface PropsType {
  onClickEdit: (editData: Tag) => void;
}
export const TagListInfo: React.FC<PropsType> = ({ onClickEdit }) => {
  const { data, loading } = useQuery<IQuery>(GET_ALL_TAGS, {
    fetchPolicy: "network-only",
  });

  const [deleteTag] = useMutation<IMutation>(DELETE_TAG);

  const onClickDelete = async (record: any) => {
    await deleteTag({
      variables: {
        deleteTagId: record?.id,
      },
      refetchQueries: ["GetAllTags"],
    });
  };
  const tagList = data?.getAllTags;
  const tableColumns: ColumnsType<Tag> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_, record) => <div>{record?.Name as string}</div>,
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => {
        return (
          <>
            <span
              style={{ marginRight: "10px" }}
              onClick={() => onClickEdit(record)}
            >
              <EditOutlined />
            </span>
            <span onClick={() => onClickDelete(record)}>
              <DeleteOutlined />
            </span>
          </>
        );
      },
    },
  ];

  return (
    <Card title={<b>Tag List</b>}>
      <Table
        columns={tableColumns}
        dataSource={tagList}
        loading={loading}
        rowKey="id"
      />
    </Card>
  );
};
