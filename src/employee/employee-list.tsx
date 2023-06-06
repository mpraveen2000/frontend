import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Card,
  Checkbox,
  Collapse,
  Popconfirm,
  Radio,
  Table,
} from "antd";
import { ColumnsType } from "antd/es/table";
import {
  EditOutlined,
  DeleteOutlined,
  FilterOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import { EmployeeTest, IMutation, IQuery, Skill, Tag } from "../../../graphql";
import { DELETE_EMPLOYEE, GET_ALL_EMPLOYEE } from "./query";
import { DateTime } from "luxon";
import { GET_ALL_SKILLS } from "../skill/query";
import { useState } from "react";

interface PropsType {
  onClickEdit: (editData: EmployeeTest) => void;
}

export const EmployeeListInfo: React.FC<PropsType> = ({ onClickEdit }) => {
  const [popConfirmVisible, setPopConfirmVisible] = useState<boolean>(false);
  const [selectSkill, setSelectSkill] = useState<string[]>([]);
  const [showDeleteButton, setShowDeleteButton] = useState<boolean>(false);
  const [skill, setSkill] = useState<string>("");

  const { data: skillsData } = useQuery<IQuery>(GET_ALL_SKILLS, {
    fetchPolicy: "network-only",
  });
  const { data, loading } = useQuery<IQuery>(GET_ALL_EMPLOYEE, {
    fetchPolicy: "network-only",
    variables: {
      filter: {
        skillId: skill || null,
      },
    },
  });

  const skillData = skillsData?.getAllSkillTest;
  const [deleteEmployee] = useMutation<IMutation>(DELETE_EMPLOYEE);

  const onClickDelete = async (record: any) => {
    await deleteEmployee({
      variables: {
        deleteEmployeeId: record?.id,
      },
      refetchQueries: ["getAllEmployeeTest"],
    });
  };

  const employeeList = data?.getAllEmployeeTest;

  const tableColumns: ColumnsType<EmployeeTest> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_, record) => <div>{record?.Name as string}</div>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (_, record) => <div>{(record?.Phone as string) || "--"}</div>,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (_, record) => <div>{(record?.Email as string) || "--"}</div>,
    },
    {
      title: "DOB",
      dataIndex: "dob",
      render: (_, record) => (
        <div>
          {DateTime.fromISO(record?.dob).toFormat("dd-MM-yyyy") || "--"}
        </div>
      ),
    },
    {
      title: "DOJ",
      dataIndex: "doj",
      render: (_, record) => (
        <div>
          {DateTime.fromISO(record?.doj).toFormat("dd-MM-yyyy") || "--"}
        </div>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      render: (_, record) => <div>{record?.age as number}</div>,
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
    <>
      <Popconfirm
        icon={null}
        visible={popConfirmVisible}
        placement="bottom"
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        title={
          <>
            <Collapse
              ghost={true}
              expandIconPosition="right"
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 270 : 90} />
              )}
              accordion={true}
              defaultActiveKey={["1"]}
            >
              <Collapse.Panel header={<b>By Skill</b>} key={1}>
                <Card>
                  <Radio.Group
                    onChange={(e) => setSelectSkill(e.target.value)}
                    value={selectSkill}
                  >
                    {skillData?.map((data) => (
                      <Radio value={data?.id} key={data?.id}>
                        {data?.Name}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Card>
              </Collapse.Panel>
            </Collapse>

            <Button
              type="primary"
              onClick={() => {
                setPopConfirmVisible(false);
                setShowDeleteButton(false);
                setSkill(selectSkill as any);
              }}
              block
            >
              <span style={{ color: "white" }}>APPLY</span>
            </Button>
          </>
        }
        onCancel={() => {
          setShowDeleteButton(false);
        }}
        onOpenChange={(visible) => {
          if (visible) {
            setPopConfirmVisible(true);
            setShowDeleteButton(true);
          } else {
            setPopConfirmVisible(false);
            setShowDeleteButton(false);
          }
        }}
      >
        <Button
          type="primary"
          style={{ width: "100px", marginBottom: "10px" }}
          block
        >
          Filter
        </Button>
      </Popconfirm>
      <Card title={<b>Employee List</b>}>
        <Table
          columns={tableColumns}
          dataSource={employeeList}
          loading={loading}
          rowKey="id"
        />
      </Card>
    </>
  );
};
