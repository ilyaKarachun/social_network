import axios from "axios";


const setting = {
        withCredentials: true,
        headers: {
            "API-KEY": "fa5bdd5b-0321-4a1c-a2dc-de7f1d089f18"
        }
    }

    const instance = axios.create({
        baseURL: "https://social-network.samuraijs.com/api/1.0/",
        ...setting
    })

export const usersApi =  {

    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    getUserProfile(userId: number) {
        return instance.get(`profile/${userId}`)
    },
    authMe() {
        return instance.get(`/auth/me`)
    },
    followUser(userId: number) {
        return instance.post(`follow/${userId}`)
    },
    unfollowUser(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
}