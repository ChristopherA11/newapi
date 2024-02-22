const mockResponse = {
    data:{
            results:[
                {
                    name:"puma"
                },
                {
                    name: "levis"
                },
                {
                    name: "otto"
                }
            ]
    }
}

export default {
    get:jest.fn().mockResolvedValue(mockResponse)
}