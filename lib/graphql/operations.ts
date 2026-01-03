import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      role
      name
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      employee {
        id
        email
        role
        name
      }
    }
  }
`;

export const LIST_EMPLOYEES_QUERY = gql`
  query ListEmployees {
    listEmployees {
      id
      email
      role
      name
      age
      class
      subjects
      attendance
      createdAt
      updatedAt
    }
  }
`;

export const ADD_EMPLOYEE_MUTATION = gql`
  mutation AddEmployee($input: AddEmployeeInput!) {
    addEmployee(input: $input) {
      id
      email
      role
      name
      age
      class
      subjects
      attendance
      createdAt
      updatedAt
    }
  }
`;

export const LIST_SHIPMENTS_QUERY = gql`
  query ListShipments($filter: ShipmentFilterInput, $pagination: PaginationInput, $sort: ShipmentSortInput) {
    listShipments(filter: $filter, pagination: $pagination, sort: $sort) {
      nodes {
        id
        reference
        status
        origin
        destination
        scheduledAt
        assignedTo {
          id
          name
          email
        }
        createdAt
        updatedAt
      }
      pageInfo {
        page
        pageSize
        totalCount
        hasNextPage
      }
    }
  }
`;

export const GET_SHIPMENT_QUERY = gql`
  query GetShipment($id: ID!) {
    shipment(id: $id) {
      id
      reference
      status
      origin
      destination
      scheduledAt
      assignedTo {
        id
        name
        email
      }
      createdAt
      updatedAt
    }
  }
`;

export const ADD_SHIPMENT_MUTATION = gql`
  mutation AddShipment($input: AddShipmentInput!) {
    addShipment(input: $input) {
      id
      reference
      status
      origin
      destination
      scheduledAt
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_SHIPMENT_MUTATION = gql`
  mutation UpdateShipment($id: ID!, $input: UpdateShipmentInput!) {
    updateShipment(id: $id, input: $input) {
      id
      reference
      status
      origin
      destination
      scheduledAt
      updatedAt
    }
  }
`;
