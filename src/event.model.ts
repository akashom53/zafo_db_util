import { Serializable } from "../utils/serializable"

export class EventModel extends Serializable {
    createdAt: number | Date
    tag: string
    group: string
    metaData: MetaData
    constructor(
        createdAt: number | Date,
        tag: string,
        group: string,
        metaData: MetaData
    ) {
        super()
        this.createdAt = createdAt
        this.tag = tag
        this.group = group
        this.metaData = metaData
    }

    dto() {
        return { createdAt: this.createdAt, tag: this.tag, group: this.group, metaData: this.metaData.serialize() }
    }

}
export class MetaData extends Serializable {
    page: string
    element: string
    priority: number
    constructor(page: string, element: string, priority?: number) {
        super()
        this.page = page
        this.element = element
        this.priority = priority
    }
}