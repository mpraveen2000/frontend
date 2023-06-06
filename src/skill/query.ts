import { gql } from "@apollo/client";

export const CREATE_SKILL = gql`
  mutation CreateSkillTest($createSkillTest: SkillTestDto!) {
    createSkillTest(createSkillTest: $createSkillTest) {
      Name
    }
  }
`;
export const GET_SKILL = gql`
  query GetSkillTest($getSkillTestId: String!) {
    getSkillTest(id: $getSkillTestId) {
      Name
      id
    }
  }
`;
export const GET_ALL_SKILLS = gql`
  query GetAllSkillTest {
    getAllSkillTest {
      id
      Name
      tags {
        id
        Name
      }
    }
  }
`;
export const UPDATE_SKILLS = gql`
  mutation UpdateSkillTest(
    $updateSkillTestId: String!
    $updateSkill: SkillTestDto!
  ) {
    updateSkillTest(id: $updateSkillTestId, updateSkill: $updateSkill) {
      Name
      tags {
        id
        Name
      }
    }
  }
`;
export const DELETE_SKILL = gql`
  mutation DeleteSkillTest($deleteSkillTestId: String!) {
    deleteSkillTest(id: $deleteSkillTestId) {
      id
      Name
    }
  }
`;
