import { gql } from 'graphql-tag';

export const typeDefs = gql`
  scalar DateTime

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    chatRooms1: [ChatRoom!]!
    chatRooms2: [ChatRoom!]!
    messages: [Chat!]!
    receivedMessages: [Chat!]!
  }

  type ChatRoom {
    id: ID!
    userOne: User!
    userTwo: User!
    createdAt: DateTime!
    updatedAt: DateTime!
    chats: [Chat!]!
  }

  type Chat {
    id: ID!
    message: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    room: ChatRoom!
    sender: User!
    receiver: User!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input SignupInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input ChatRoomInput {
    userOneId: ID!
    userTwoId: ID!
  }

  input ChatInput {
    roomId: ID!
    senderId: ID
    receiverId: ID
    message: String!
  }

  type Query {
    me: User
    users: [User!]!
    chatRooms(
      skip: Int
      limit: Int
      sortBy: String
      sortOrder: String
    ): [ChatRoom!]!
    chats(
      roomId: ID!
      skip: Int
      limit: Int
      sortBy: String
      sortOrder: String
    ): [Chat!]!
  }

  type Subscription {
    messageAdded(roomId: ID!): Chat!
  }

  type Mutation {
    signup(input: SignupInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    createChatRoom(input: ChatRoomInput!): ChatRoom!
    sendMessage(input: ChatInput): Chat!
  }
`;
