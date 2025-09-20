import type { LoginInput, SignupInput } from '../types.js';
export declare const authResolvers: {
    Mutation: {
        signup: (_: any, args: {
            input: SignupInput;
        }) => Promise<{
            token: string;
            user: {
                id: string;
                email: string;
                name: string;
                password: string;
                createdAt: Date;
                updatedAt: Date;
            };
        }>;
        login: (_: any, args: {
            input: LoginInput;
        }) => Promise<{
            token: string;
            user: {
                id: string;
                email: string;
                name: string;
                password: string;
                createdAt: Date;
                updatedAt: Date;
            };
        }>;
    };
};
//# sourceMappingURL=auth.resolver.d.ts.map