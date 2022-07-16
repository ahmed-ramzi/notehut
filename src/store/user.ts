import { defineStore, storeToRefs } from "pinia"
import { User } from "../types/states"
import db from "../firestore"
import { getAuth } from "firebase/auth"
import { markRaw } from "vue"

type UserState = {
  user: User | null
  all_users: any[]
}
interface UserActions {
  getUser(): Promise<void>
  setUser(data: any): void
  getAllUsers(): void
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
    getAllUsers(): void {
      const data = usersCollection
      data.get().then((querySnapshot) => {
        const tempDoc = [] as any[]
        querySnapshot.forEach((doc) => {
          tempDoc.push({ id: doc.id, ...doc.data() })
        })
        this.all_users = tempDoc
      })
    },
    setUser(data: any): void {
      this.user = data
    },
  },
})

export const useUserState = () => storeToRefs(useUserStore())

export const useUserActions = () => useUserStore()

export const clearUserState = (): void => useUserStore().$reset()
