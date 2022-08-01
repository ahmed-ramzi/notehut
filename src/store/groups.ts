import { defineStore, storeToRefs } from "pinia"
// import { arrayRemove, arrayUnion } from "firebase/firestore"
import db from "@/firestore"
import { GroupDetail } from "@/types/states"
import { useUserActions, useUserState } from "./user"
import { markRaw } from "vue"

export const groupsCollection = db.collection("groups")

type GroupState = {
  groups: GroupDetail[] | null
}

interface GroupActions {
  getUserGroups(): void
  setGroup(group: GroupDetail): void
  createGroup(group: GroupDetail): void
}

const useGroupStore = defineStore<string, GroupState, Record<never, never>, GroupActions>("groups", {
  state: () => {
    return {
      groups: [],
    }
  },
  actions: {
    async getUserGroups(): Promise<void> {
      const { user } = useUserState()

      let all = [] as any[]

      await groupsCollection.get().then((groups) => {
        const tempDoc = [] as any[]
        groups.forEach((doc) => {
          tempDoc.push({ id: doc.id, ...doc.data() })
        })
        all = tempDoc
      })

      console.log(all)
      user.value?.groups?.forEach((groupID: string) => {
        const group = all.find((item: GroupDetail) => item.id === groupID) as GroupDetail
        this.groups?.push(group)
      })
    },

    setGroup(group: GroupDetail): void {
      this.groups?.push(group)
    },
    createGroup(groupData: GroupDetail): void {
      const { setGroupToUser } = useUserActions()

      if (Object.keys(groupData).length !== 0) {
        groupsCollection.doc(groupData.id).set(markRaw(groupData))

        groupData.members.forEach((member) => {
          setGroupToUser(groupData.id, member.id)
        })
        this.setGroup(groupData)
      }
    },
  },
})

export const useGroupsState = () => storeToRefs(useGroupStore())
export const useGroupsActions = () => useGroupStore()
export const clearGroupsState = (): void => useGroupStore().$reset()
