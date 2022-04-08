
export class ActivitySearchDto {

    author: string
    data: {
            period: string,
            details: {
                    media: {
                        id: number,
                        name: string,
                        hex_color: string
                    },
                    relevance: {
                        id: number,
                        name: string
                    }
                }[]
        }[]

}
