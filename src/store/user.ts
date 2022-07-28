import { defineStore, storeToRefs } from "pinia"
import { User } from "../types/states"
import db from "../firestore"
import { getAuth } from "firebase/auth"
import { markRaw } from "vue"

type UserState = {
  user: User | null
}
interface UserActions {
  getUser(): Promise<void>
  setUser(data: any): void
}

export const usersCollection = db.collection("users")

const useUserStore = defineStore<string, UserState, Record<any, never>, UserActions>("user", {
  state: () => {
    return {
      user: null,
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

          // this.user.id = id
          // this.user.name = userCollection.data().name
          // this.user.email = userCollection.data().email || userData.email
          // this.user.isAdmin = userCollection.data().isAdmin
          // this.user.registerDate = userCollection.data().registerDate
          // this.user.dob = userCollection.data().dob
          // this.user.jobtitle = userCollection.data().jobtitle
          // this.user.address = userCollection.data().address
          // this.user.zipcode = userCollection.data().zipcode
          // this.user.city = userCollection.data().city
          // this.user.country = userCollection.data().country
          // this.user.programsRegistered = userCollection.data().programsRegistered
        }
      } catch (err) {
        console.log(err)
      }
    },
    setUser(data: any): void {
      this.user = data
    },
  },
})

export const useUserState = () => storeToRefs(useUserStore())

export const useUserActions = () => useUserStore()

export const clearUserState = (): void => useUserStore().$reset()
