import conf from '../../conf/conf';
import { Client,Account,ID } from "appwrite";
import toast from 'react-hot-toast';

export class AuthService {

    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            userAccount = await this.account.create(ID.unique(), email, password, name );
            if (userAccount) {
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
    }

    async logout() {

        try {
            await this.account.deleteSessions();
            toast.success('Logout Successfully')
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
            toast.error(error.message)
        }
    }

}

const authService = new AuthService();

export default authService