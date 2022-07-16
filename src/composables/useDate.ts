import moment from "moment"
import { Timestamp } from "@/types/states"

export const dateFormat = "LLL"
export default {
  shortDate(): Timestamp {
    return moment().format(dateFormat)
  },

  displayDate(date: Timestamp): Timestamp {
    return moment(date, dateFormat).fromNow()
  },
}
