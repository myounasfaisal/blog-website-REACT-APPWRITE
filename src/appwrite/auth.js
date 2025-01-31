import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            console.log("Account Created:", userAccount);
            return userAccount; // Return userAccount instead of calling login
        } catch (error) {
            console.error("Create Account Error:", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            console.log("Login Request Data:", { email, password });
    
            // Ensure it calls the correct API: `/sessions`
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log("Session Created Successfully:", session);
    
            return session;
        } catch (error) {
            console.error("Login Error:", error);
            throw error;
        }
    }
    
    

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            console.log("Fetched User Data:", user);
            return user;
        } catch (error) {
            console.error("Appwrite Service :: getCurrentUser :: Error", error);
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            console.log("User logged out successfully");
        } catch (error) {
            console.error("Appwrite Service :: Logout :: Error", error);
        }
    }
}

const authService = new AuthService();

export default authService;
