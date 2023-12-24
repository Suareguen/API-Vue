const OpenAI = require('openai')

const openai = new OpenAI({apiKey: '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'})

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