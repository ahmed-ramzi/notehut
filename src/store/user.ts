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
interface UserActions {
  getUser(): Promise<void>
  setUser(data: any): void
  getAllUsers(): void
  setGroupToUser(groupId: string, userId: string): void
}

export const usersCollection = db.collection("users")

const useUserStore = defineStore<string, UserState, Record<any, never>, UserActions>("user", {
  state: () => {
    return {
      user: null,
      all_users: [],
    }
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
    setGroupToUser(groupId: string, userId: string): void {
      usersCollection.doc(userId).update({
        groups: arrayUnion(groupId),
      })
      this.user?.groups?.push(groupId)
    },
  },
})

export const useUserState = () => storeToRefs(useUserStore())

export const useUserActions = () => useUserStore()

export const clearUserState = (): void => useUserStore().$reset()
