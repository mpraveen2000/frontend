import { useState } from "react";
import { Button, Card, Drawer } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Skill } from "../../../graphql";
import { CreateSkill } from "./modify-skill";
import { SkillListInfo } from "./skill-list";

const Skills: React.FC = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const toggleDrawerVisible = () => setIsDrawerVisible((prev) => !prev);
  const [editData, setEditData] = useState<Skill | null>();
  const onClickCreate = () => {
    setEditData(null);
    toggleDrawerVisible();
  };
  const onClickEdit = (editData: Skill) => {
    setEditData(editData);
    toggleDrawerVisible();
  };
  const extraButton = (
    <Button
      type="primary"
      icon={<PlusCircleOutlined />}
      onClick={onClickCreate}
      block
    >
      Create
    </Button>
  );

  return (
    <>
      <Card title="Skills" extra={extraButton}>
        <SkillListInfo onClickEdit={onClickEdit} />
      </Card>
      <Drawer
        title={editData ? "Update Skill" : "Create a new Skill"}
        onClose={toggleDrawerVisible}
        visible={isDrawerVisible}
        destroyOnClose={true}
        footer={
          <div style={{ textAlign: "right" }}>
            <Button onClick={toggleDrawerVisible} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" onClick={toggleDrawerVisible}>
              {editData ? "Update" : "Create"}
            </Button>
          </div>
        }
      >
        <CreateSkill
          toggleDrawerVisible={toggleDrawerVisible}
          editData={editData}
        />
      </Drawer>
    </>
  );
};

export default Skills;
