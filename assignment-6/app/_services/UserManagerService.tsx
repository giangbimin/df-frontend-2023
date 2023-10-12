import {
  LoginResponseType,
  LogoutResponseType,
  RegisterResponseType,
  RegisterUserType,
  UserType,
} from '../_types';

class UserManagerService {
  private usersKey: string;
  private sessionKey: string;
  private db: Storage | undefined;

  constructor() {
    this.usersKey = 'users';
    this.sessionKey = 'session';
    if (typeof window !== 'undefined') {
      this.db = localStorage;
    }
  }

  private getUser(): UserType | undefined {
    if (!this.db) return undefined;
    const user = this.db.getItem(this.usersKey);
    return user ? JSON.parse(user) : undefined;
  }

  private createUser(user: UserType): UserType {
    if (!this.db) return user;
    this.db.setItem(this.usersKey, JSON.stringify(user));
    return user;
  }

  private checkUser(user: UserType): boolean {
    if (!this.db) return false;
    const curUser = this.getUser();
    if (curUser === undefined) return false;
    return user.email === curUser.email && user.password === curUser.password;
  }

  private createSession(user: UserType): boolean {
    if (!this.db) return false;
    this.db.setItem(this.sessionKey, JSON.stringify(user));
    return true;
  }

  private clearSession(): boolean {
    if (!this.db) return false;
    this.db.removeItem(this.sessionKey);
    return true;
  }

  public async currentUser(): Promise<UserType | undefined> {
    if (!this.db) return undefined;
    const user = this.db.getItem(this.sessionKey);
    return user ? JSON.parse(user) : undefined;
  }

  public async signUp(user: RegisterUserType): Promise<RegisterResponseType> {
    const saveUser: UserType = user;
    if (!this.db)
      return { status: false, message: 'Client Error', data: saveUser };
    if (
      user.email === '' ||
      user.password === '' ||
      user.passwordConfirmation === ''
    ) {
      return { status: false, message: 'Invalid Data', data: saveUser };
    }
    try {
      this.createUser(saveUser);
      return {
        status: true,
        message: `Success create user ${saveUser.email}`,
        data: saveUser,
      };
    } catch (error) {
      return { status: false, message: error, data: saveUser };
    }
  }

  public async signIn(user: UserType): Promise<LoginResponseType> {
    if (!this.db) return { status: false, message: 'Client Error', data: user };
    if (user.email === '' || user.password === '')
      return { status: false, message: 'Invalid Data', data: user };
    try {
      const status = this.checkUser(user);
      if (status) {
        this.createSession(user);
        return {
          status: true,
          message: `signIn Success ${user.email}`,
          data: user,
        };
      }
      return {
        status: false,
        message: 'Invalid email or password',
        data: user,
      };
    } catch (error) {
      return { status: false, message: error, data: user };
    }
  }

  public async signOut(): Promise<LogoutResponseType> {
    const currentUser = this.currentUser();
    if (currentUser === undefined)
      return { status: false, message: 'Client Error' };
    try {
      const status = this.clearSession();
      if (status) return { status: true, message: 'Logout Success' };
      return { status: false, message: 'Logout False' };
    } catch (error) {
      return { status: false, message: error };
    }
  }
}

const instance = new UserManagerService();
export default instance;
