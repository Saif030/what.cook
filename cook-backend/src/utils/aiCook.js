import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
})

const aiCook = async (prompt) => {
    try{
        const response = await openai.responses.create({
            model: "nvidia/nemotron-3.5-super-vl-120b-a12b",
            input: prompt,
            max_output_tokens: 16384,
            top_p: 1,
            temperature: 1,
            stream: false
        });

        return response.output_text;
    }catch(error){
        console.error('AI Cook Error:', error);
        throw error;
    }
}

export default aiCook;

