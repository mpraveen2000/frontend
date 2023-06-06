import { gql } from "@apollo/client";

export const EMPLOYEE_TEST_TOTAL_COUNT = gql`
  query Query {
    getEmployeeTestCount
  }
`;
export const TOP_SKILLS_WITH_EMPLOYEE_COUNT = gql`
  query SkillWithEmployeeCount {
    skillWithEmployeeCount {
      id
      Name
      count
    }
  }
`;
export const TOP_TAGS_WITH_EMPLOYEE_COUNT = gql`
  query TagsWithEmployeeCount {
    tagsWithEmployeeCount {
      id
      Name
      count
    }
  }
`;
