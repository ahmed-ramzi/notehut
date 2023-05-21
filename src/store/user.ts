import { defineStore, storeToRefs } from "pinia"
import { User } from "../types/states"
import db from "../firestore"
import { getAuth } from "firebase/auth"
import { markRaw } from "vue"
import { arrayUnion } from "firebase/firestore"

type UserState = {
  user: User | null
  all_users: User[]
}
type UserGetters = {
  hasAvatar(state: UserState): boolean
}
interface UserActions {
  getUser(): Promise<void>
  setUser(data: any): void
  getAllUsers(): void
  setAvatar(avatar: string): void
  setGroupToUser(groupId: string, userId: string): void
}

export const usersCollection = db.collection("users")

const useUserStore = defineStore<string, UserState, UserGetters, UserActions>("user", {
  state: () => {
    return {
      user: null,
      all_users: [],
    }
  },
  getters: {
    hasAvatar(state: UserState): boolean {
      if (state.user?.avatar) {
        if (!Object.keys(state.user).includes("avatar")) return false
      }
      return state.user?.avatar ? true : false
    },
  },
  actions: {
    async getUser(): Promise<void> {
      try {
        const id = getAuth().currentUser?.uid
        if (id) {
          const userCollection = await usersCollection.doc(id).get()
          const data = userCollection.data() as User
          this.user = markRaw(data)
        }
      } catch (err) {
        console.log(err)
      }
    },
    async getAllUsers(): Promise<void> {
      const data = usersCollection
      await data.get().then((users) => {
        const tempDoc = [] as User[]
        users.forEach((doc) => {
          tempDoc.push(doc.data() as User)
        })
        this.all_users = tempDoc
      })
    },
    setUser(data: any): void {
      this.user = data
    },
    setAvatar(avatar: string): void {
      if (this.user?.avatar) {
        this.user.avatar = avatar
      }
      usersCollection.doc(this.user?.id).update({
        avatar: avatar,
      })
    },
    setGroupToUser(groupId: string, userId: string): void {
      usersCollection.doc(userId).update({
        groups: arrayUnion(groupId),
      })
      this.user?.groups?.push(groupId)
    },
  },
})

export const useUserState = () => storeToRefs(useUserStore())

export const useUserGetters = () => storeToRefs(useUserStore())

export const useUserActions = () => useUserStore()

export const clearUserState = (): void => useUserStore().$reset()
