export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    chatRooms1?: IChatRoom[];
    chatRooms2?: IChatRoom[];
    messages?: IChat[];
    receivedMessages?: IChat[];
}
export interface IChatRoom {
    id: string;
    userOneId: string;
    userTwoId: string;
    userOne?: IUser;
    userTwo?: IUser;
    chats?: IChat[];
}
export interface IChat {
    id: string;
    message: string;
    createdAt: Date;
    roomId: string;
    senderId: string;
    receiverId: string;
    room?: IChatRoom;
    sender?: IUser;
    receiver?: IUser;
}
export interface SignupInput {
    name: string;
    email: string;
    password: string;
}
export interface LoginInput {
    email: string;
    password: string;
}
export interface ChatRoomInput {
    userOneId: string;
    userTwoId: string;
}
export interface ChatInput {
    roomId: string;
    senderId?: string;
    receiverId?: string;
    message: string;
}
//# sourceMappingURL=types.d.ts.map