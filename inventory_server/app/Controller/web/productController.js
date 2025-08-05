

const getAllProducts = (req,res) => {
        res.status(200).json(
            [
                {
                name:"pineapple",
                description: "heres the pineapple"
                }
                ,
                {
                name:"mangoo",
                description: "heres the mangoo"
                }
            ]
        )
}  

module.exports={getAllProducts}