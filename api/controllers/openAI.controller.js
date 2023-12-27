const OpenAI = require('openai')
require('dotenv').config()

const openai = new OpenAI({apiKey: process.env.OPENAI_KEY})

async function getCorrection(req, res) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Please correct the following text: ${req.body.text}`
        },
      ],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
    });
  
    return res.json(completion.choices[0]);
  } catch (error) {
    return res.send(error)
  }
}

module.exports = { getCorrection }