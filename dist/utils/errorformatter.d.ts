import type { GraphQLFormattedError } from 'graphql';
export declare function formatApolloError(formattedError: GraphQLFormattedError, error: any): GraphQLFormattedError | {
    message: any;
    locations: readonly import("graphql").SourceLocation[] | undefined;
    path: readonly (string | number)[] | undefined;
    extensions: {
        code: string;
        statusCode: any;
    };
};
//# sourceMappingURL=errorformatter.d.ts.map