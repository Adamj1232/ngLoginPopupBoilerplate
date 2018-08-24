export class Token {
    expiry: string; // "2018-07-12T16:45:19.566178Z";
    id: string; // "5b46341f802e520302d63cc4"
    metadata: any; // {};
    service: boolean; // false;
    token: string; // "12dfe13b31c4446b8af5eb92c5621cf2";
    user: string; // "admin";
    getUserToken() {
        return this.user + ' * ' + this.token;
    }
}
