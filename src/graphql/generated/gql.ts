/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation CreateBook($input: CreateBookInput) {\n  createBook(input: $input) {\n    bookId\n    day\n    time\n    sub\n    bookType\n    createdAt\n    updatedAt\n  }\n}": types.CreateBookDocument,
    "query GetBookBySub($input: GetBookBySubInput) {\n  getBookBySub(input: $input) {\n    bookId\n    day\n    time\n    sub\n    bookType\n    createdAt\n    updatedAt\n  }\n}": types.GetBookBySubDocument,
    "query User($input: GetUserInput) {\n  getUser(input: $input) {\n    sub\n    name\n    email\n    provider\n    userType\n    createdAt\n    updatedAt\n    deletedAt\n  }\n}": types.UserDocument,
    "mutation GoogleLogin($input: GoogleLoginInput) {\n  googleLogin(input: $input) {\n    sub\n    name\n    email\n    provider\n    userType\n    createdAt\n    updatedAt\n    deletedAt\n  }\n}": types.GoogleLoginDocument,
    "mutation GoogleLogout {\n  googleLogout\n}": types.GoogleLogoutDocument,
    "query GetAuthSubByCookie {\n  getAuthSubByCookie\n}": types.GetAuthSubByCookieDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateBook($input: CreateBookInput) {\n  createBook(input: $input) {\n    bookId\n    day\n    time\n    sub\n    bookType\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["mutation CreateBook($input: CreateBookInput) {\n  createBook(input: $input) {\n    bookId\n    day\n    time\n    sub\n    bookType\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetBookBySub($input: GetBookBySubInput) {\n  getBookBySub(input: $input) {\n    bookId\n    day\n    time\n    sub\n    bookType\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["query GetBookBySub($input: GetBookBySubInput) {\n  getBookBySub(input: $input) {\n    bookId\n    day\n    time\n    sub\n    bookType\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query User($input: GetUserInput) {\n  getUser(input: $input) {\n    sub\n    name\n    email\n    provider\n    userType\n    createdAt\n    updatedAt\n    deletedAt\n  }\n}"): (typeof documents)["query User($input: GetUserInput) {\n  getUser(input: $input) {\n    sub\n    name\n    email\n    provider\n    userType\n    createdAt\n    updatedAt\n    deletedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation GoogleLogin($input: GoogleLoginInput) {\n  googleLogin(input: $input) {\n    sub\n    name\n    email\n    provider\n    userType\n    createdAt\n    updatedAt\n    deletedAt\n  }\n}"): (typeof documents)["mutation GoogleLogin($input: GoogleLoginInput) {\n  googleLogin(input: $input) {\n    sub\n    name\n    email\n    provider\n    userType\n    createdAt\n    updatedAt\n    deletedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation GoogleLogout {\n  googleLogout\n}"): (typeof documents)["mutation GoogleLogout {\n  googleLogout\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAuthSubByCookie {\n  getAuthSubByCookie\n}"): (typeof documents)["query GetAuthSubByCookie {\n  getAuthSubByCookie\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;