import { authResolvers } from './auth.resolver.js';
import { chatResolvers } from './chat.resolver.js';
import { userResolvers } from './user.resolver.js';
export const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...chatResolvers.Query,
    },
    Mutation: {
        ...authResolvers.Mutation,
        ...chatResolvers.Mutation,
    },
    Subscription: {
        ...chatResolvers.Subscription,
    },
    User: {
        ...userResolvers.User,
    },
    ChatRoom: {
        ...userResolvers.ChatRoom,
    },
    Chat: {
        ...userResolvers.Chat,
    },
};
//# sourceMappingURL=resolver.js.map