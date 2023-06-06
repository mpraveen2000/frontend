import { gql } from "@apollo/client";

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployeeTest($createEmployee: EmployeeTestDto!) {
    createEmployeeTest(createEmployee: $createEmployee) {
      id
      age
      doj
      dob
      Phone
      Name
      Email
      skills {
        Name
        id
      }
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query GetEmployeeTest($getEmployeeTestId: String!) {
    getEmployeeTest(id: $getEmployeeTestId) {
      id
      doj
      skills {
        id
        Name
      }
      age
      dob
      Phone
      Name
      Email
    }
  }
`;

export const GET_ALL_EMPLOYEE = gql`
  query GetAllEmployeeTest($filter: FilterBySkill) {
    getAllEmployeeTest(filter: $filter) {
      id
      Name
      doj
      dob
      age
      Phone
      Email
      skills {
        id
        Name
      }
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployeeTest(
    $updateEmployeeTestId: String!
    $updateEmployee: EmployeeTestDto!
  ) {
    updateEmployeeTest(
      id: $updateEmployeeTestId
      updateEmployee: $updateEmployee
    ) {
      id
      Phone
      Name
      Email
      doj
      dob
      skills {
        Name
      }
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteSkillTest($deleteSkillTestId: String!) {
    deleteSkillTest(id: $deleteSkillTestId) {
      id
      Name
      tags {
        id
        Name
      }
    }
  }
`;
