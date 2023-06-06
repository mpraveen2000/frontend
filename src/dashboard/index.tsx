import { Card, Descriptions } from "antd";
import {
  EMPLOYEE_TEST_TOTAL_COUNT,
  TOP_SKILLS_WITH_EMPLOYEE_COUNT,
  TOP_TAGS_WITH_EMPLOYEE_COUNT,
} from "./query";
import { IQuery } from "../../../graphql";
import { useQuery } from "@apollo/client";

export const Dashboard = () => {
  const { loading, data } = useQuery<IQuery>(EMPLOYEE_TEST_TOTAL_COUNT);

  const { data: topSkillsWithCount } = useQuery<IQuery>(
    TOP_SKILLS_WITH_EMPLOYEE_COUNT
  );

  const { data: topTagsWithCount } = useQuery<IQuery>(
    TOP_TAGS_WITH_EMPLOYEE_COUNT
  );

  const employeeTestCount = data?.getEmployeeTestCount;
  const topSkillsWithEmployeeCount = topSkillsWithCount?.skillWithEmployeeCount;
  const topTagsWithEmployeeCount = topTagsWithCount?.tagsWithEmployeeCount;

  return (
    <>
      <Card title="Dashboard" style={{ marginBottom: "10px" }}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Employee Count">
            {employeeTestCount}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card title="Top Skills With Employee Count">
        <Descriptions bordered column={1}>
          {topSkillsWithEmployeeCount?.map((skill) => (
            <>
              <Descriptions.Item label={skill?.Name}>
                {skill?.count || "--"}
              </Descriptions.Item>
            </>
          ))}
        </Descriptions>
      </Card>

      <Card title="Top Tags With Employee Count">
        <Descriptions bordered column={1}>
          {topTagsWithEmployeeCount?.map((tag) => (
            <>
              <Descriptions.Item label={tag?.Name}>
                {tag?.count || "--"}
              </Descriptions.Item>
            </>
          ))}
        </Descriptions>
      </Card>
    </>
  );
};
