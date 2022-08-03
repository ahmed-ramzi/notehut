import { defineStore, storeToRefs } from "pinia"
import db from "@/firestore"
import { GroupDetail } from "@/types/states"
import { useUserActions, useUserState } from "./user"
import { markRaw } from "vue"
import { sharedNotesCollection } from "./notesList"

export const groupsCollection = db.collection("groups")

type GroupState = {
  groups: GroupDetail[] | null
}

interface GroupActions {
  getUserGroups(): void
  setGroup(group: GroupDetail): void
  createGroup(group: GroupDetail): Promise<void>
}

type GroupGetters = {
  groupsCount(state: GroupState): number
}

const useGroupStore = defineStore<string, GroupState, GroupGetters, GroupActions>("groups", {
  state: () => {
    return {
      groups: [],
    }
  },
  getters: {
    groupsCount(state: GroupState): number {
      return state.groups?.length || 0
    },
  },
  actions: {
    async getUserGroups(): Promise<void> {
      const { user } = useUserState()

      let all = [] as any[]

      await groupsCollection.get().then((groups) => {
        const tempDoc = [] as GroupDetail[]
        groups.forEach((doc) => {
          tempDoc.push(doc.data() as GroupDetail)
        })

        all = tempDoc
      })

      user.value?.groups?.forEach((groupID: string) => {
        const group = all.find((item: GroupDetail) => item.id === groupID) as GroupDetail
        if (group) {
          this.groups?.push(group)
        }
      })
    },

    setGroup(group: GroupDetail): void {
      this.groups?.push(group)
    },
    async createGroup(groupData: GroupDetail): Promise<void> {
      const { setGroupToUser } = useUserActions()

      if (Object.keys(groupData).length !== 0) {
        await groupsCollection.doc(groupData.id).set(markRaw(groupData))

        groupData.members.forEach((member) => {
          setGroupToUser(groupData.id, member.id)
        })

        await sharedNotesCollection.doc(groupData.id).set({
          notes: [],
        })
        this.setGroup(groupData)
      }
    },
  },
})

export const useGroupsState = () => storeToRefs(useGroupStore())
export const useGroupsGetters = () => storeToRefs(useGroupStore())
export const useGroupsActions = () => useGroupStore()
export const clearGroupsState = (): void => useGroupStore().$reset()
