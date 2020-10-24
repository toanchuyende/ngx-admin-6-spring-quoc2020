export class AgileMessageUser {
  id: string;
  username: string;
  email: string;
}
export class AgileMessage {
  user: AgileMessageUser;
  message: string;
  conversationId: string;

  constructor() {
    this.user = new AgileMessageUser();
  }
}
