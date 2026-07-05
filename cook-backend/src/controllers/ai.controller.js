import aiCook from '../utils/aiCook.js';

function cleanAndParseJSON(rawResponse) {
  try {
    // Remove all control characters except for valid whitespace
    let cleaned = rawResponse.replace(/[\x00-\x1F\x7F]/g, function(char) {
      // Keep tab, newline, and carriage return
      if (char === '\t' || char === '\n' || char === '\r') {
        return char;
      }
      // Replace other control characters with space
      return ' ';
    });
    
    // Additional cleaning: remove extra whitespace that might break JSON
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Parse error:", error.message);
    console.log("Error position:", error.message.match(/position (\d+)/)?.[1]);
    return null;
  }
}

const aiCookController = async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ success: false, error: 'Prompt is required' });
        }
        const aiPrompt = `
You are a helpful cooking assistant.  
Given a list of ingredients, suggest **one** dish that uses all of them.  
Provide step‑by‑step cooking instructions, an estimated total calorie count, and a clean list of the ingredients used.  

Return **only** a JSON object with the following keys (in this exact order):
{
  "prompt": "<the exact user request>",
  "aiResponse": ["<detailed cooking step 1>", "<detailed cooking step 2>", "..."],
  "dish_name": "<name of the dish>",
  "calories": <total calories as an integer>,
  "protein": <protein content as an integer>,
  "carbs": <carb content as an integer>,
  "fat": <fat content as an integer>,
  "time_require":<total time required to cook the dish. example 'X minutes'>,
  "ingredients": ["<ingredient 1>", "<ingredient 2>", "..."],
  "category" : <category> can be one of these tags(vegan, vegetarian,keto,gluten-free,seafood)
}
        ${prompt}`;

        const response = await aiCook(aiPrompt);
        if (!response) {
            return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }

        const parsedResponse = cleanAndParseJSON(response);

        res.status(200).json({ success: true, response: parsedResponse });

    } catch (error) {
        console.error('AI Cook Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
}

export default aiCookController;