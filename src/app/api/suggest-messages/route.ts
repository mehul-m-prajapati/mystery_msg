import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export async function POST(req: Request) {

    try {
        const prompt = "Create a list of three open-ended and engaging questions formatted as a single string.\
        Each question should be separated by '||'. These questions are for an anonymous social messaging platform,\
        like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing\
        instead on universal themes that encourage friendly interaction. For example, your output should be\
        structured like this: 'What is a hobby you have recently started?||If you could have dinner with any historical\
            figure, who would it be?||What is a simple thing that makes you happy?'. Ensure the questions are intriguing, \
            foster curiosity, and contribute to a positive and welcoming conversational environment.";

        const resp = await openai.chat.completions.create({
            model: 'gemini-2.0-flash',
            messages: [
                {
                    role: 'user',
                    content: prompt
                },
            ],
            temperature: 0.7,
            max_tokens: 100000
        });

        // content is the ans given by gemini after prompt
        const content = resp.choices[0].message.content;

        return Response.json(
            { message: content, success: true },
            { status: 200 }
        );
    }
    catch (error) {
        console.error('An unexpected error occurred:', error);
        return Response.json(
            { message: error, success: false },
            { status: 500 }
        );
    }
}
