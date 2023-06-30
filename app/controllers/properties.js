
const propertiesService = require("../services/properties")

const listProperties = async (req, res) => {
    try {

        const properties =  await propertiesService.list()
        // const product = await getProduct(id)
        res.json({
            properties
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
const addProperties = async (req, res) => {
    try {
        const { body } = req
        const property = await propertiesService.create(body)
        // const product = await getProduct(id)
        res.json({
            property
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
    const editProperties = async (req, res) => {
        try {
            const { body,id } = req
            const property = await propertiesService.edit(id,body)
            // const product = await getProduct(id)
            res.json({
                property
            })
        }
        catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    }
     
module.exports = {
    listProperties,
    editProperties,
    addProperties
    
  

}