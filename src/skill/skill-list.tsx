import { useMutation, useQuery } from "@apollo/client";
import { Card, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { IMutation, IQuery, Skill, Tag } from "../../../graphql";
import { DELETE_SKILL, GET_ALL_SKILLS } from "./query";
interface PropsType {
  onClickEdit: (editData: Skill) => void;
}
export const SkillListInfo: React.FC<PropsType> = ({ onClickEdit }) => {
  const { data, loading } = useQuery<IQuery>(GET_ALL_SKILLS, {
    fetchPolicy: "network-only",
  });

  const [deleteSkill] = useMutation<IMutation>(DELETE_SKILL);

  const onClickDelete = async (record: any) => {
    await deleteSkill({
      variables: {
        deleteSkillTestId: record?.id,
      },
      refetchQueries: ["GetAllSkillTest"],
    });
  };
  const skillList = data?.getAllSkillTest;
  const tableColumns: ColumnsType<Skill> = [
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
    <Card title={<b>Skill List</b>}>
      <Table
        columns={tableColumns}
        dataSource={skillList}
        loading={loading}
        rowKey="id"
      />
    </Card>
  );
};
