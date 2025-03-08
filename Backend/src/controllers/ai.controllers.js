const aiService = require('../services/ai.services')

module.exports.getReview = async(req, res)=>{

    const code = req.body.code

    // console.log(prompt);
    

    if(!code){
        return res.status(400).send('Prompt is required')
    }

    try {

        const response = await aiService(code);
        // console.log(response);
        
        return res.status(200).send(response)
        
    } catch (error) {
        return res.status(500).json({message : "No response"})
    }

}