import { createSlice } from '@reduxjs/toolkit'
import {IUser} from "../../../models/IUser";

export interface AuthState {
    isAuth: boolean;
    user: IUser;
    isLoading: boolean;
    error: string;
}

const initialState: AuthState = {
    isAuth: false,
    error: '',
    isLoading: false,
    user: {} as IUser
}

const authSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setIsAuth(state, action) {
            state.isAuth = action.payload
        },
        setUser(state, action) {
            state.user = action.payload
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        },
        // login: {
        //     reducer(state, action: PayloadAction<Post>) {
        //         state.user = action.payload
        //     },
        //     prepare(username: string, password: string) {
        //         try {
        //             setIsLoading(state, true)
        //             setTimeout(async () => {
        //                 const response = await UserService.getUsers()
        //                 const mockUser = response.data.find(user => user.username === username && user.password === password);
        //                 if (mockUser) {
        //                     localStorage.setItem('auth', 'true');
        //                     localStorage.setItem('username', mockUser.username);
        //                     this.setUser(state, mockUser)
        //                     this.setIsAuth(state, true)
        //                 } else {
        //                     this.setError(state, 'Некорректный логин или пароль')
        //                 }
        //                 this.setIsLoading(state, false)
        //             }, 1000)
        //             return {
        //                 payload: {username, password}
        //             }
        //         } catch (e) {
        //             this.setError(state, 'Произошла ошибка при логине')
        //         }
        //     }
        //
        // }
    }
})
export const { setIsAuth, setUser, setError } = authSlice.actions
// Export the slice reducer as the default export
export default authSlice.reducer