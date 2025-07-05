

// export async function fetchWeatherResponseStream(message, threadId, onChunk) {
//   const response = await fetch('https://brief-thousands-sunset-9fcb1c78-485f-4967-ac04-2759a8fa1462.mastra.cloud/api/agents/weatherAgent/stream', {
//     method: 'POST',
//     headers: {
//       'Accept': '*/*',
//       'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8,fr;q=0.7',
//       'Connection': 'keep-alive',
//       'Content-Type': 'application/json',
//       'x-mastra-dev-playground': 'true',
//     },
//     body: JSON.stringify({
//       messages: [{ role: "user", content: message }],
//       runId: "weatherAgent",
//       maxRetries: 2,
//       maxSteps: 5,
//       temperature: 0.5,
//       topP: 1,
//       runtimeContext: {},
//       threadId: threadId,
//       resourceId: "weatherAgent"
//     })
//   });

//   if (!response.ok) {
//     throw new Error("API returned status " + response.status);
//   }

//   const reader = response.body.getReader();
//   const decoder = new TextDecoder("utf-8");

//   let done = false;
//   while (!done) {
//     const { value, done: doneReading } = await reader.read();
//     if (value) {
//       const chunk = decoder.decode(value, { stream: true });
//       onChunk(chunk);
//     }
//     done = doneReading;
//   }
// }     






// src/utils/api.js
// export async function fetchWeatherResponseStream(message, threadId, onChunk) {
//   const response = await fetch(
//     'https://brief-thousands-sunset-9fcb1c78-485f-4967-ac04-2759a8fa1462.mastra.cloud/api/agents/weatherAgent/stream',
//     {
//       method: 'POST',
//       headers: {
//         'Accept': '*/*',
//         'Content-Type': 'application/json',
//         'x-mastra-dev-playground': 'true',
//       },
//       body: JSON.stringify({
//         messages: [{ role: 'user', content: message }],
//         runId: 'weatherAgent',
//         maxRetries: 2,
//         maxSteps: 5,
//         temperature: 0.5,
//         topP: 1,
//         runtimeContext: {},
//         threadId: threadId,
//         resourceId: 'weatherAgent',
//       }),
//     }
//   );

//   if (!response.ok) {
//     throw new Error(`API returned status ${response.status}`);
//   }

//   const reader = response.body.getReader();
//   const decoder = new TextDecoder('utf-8');

//   let done = false;
//   while (!done) {
//     const { value, done: doneReading } = await reader.read();
//     done = doneReading;

//     if (value) {
//       const chunk = decoder.decode(value, { stream: true });
//       onChunk(chunk); // Pass raw chunk text
//     }
//   }
// }

export async function fetchWeatherResponseStream(message, threadId, onChunk) {
  const response = await fetch(
    'https://brief-thousands-sunset-9fcb1c78-485f-4967-ac04-2759a8fa1462.mastra.cloud/api/agents/weatherAgent/stream',
    {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-mastra-dev-playground': 'true',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: message }],
        runId: 'weatherAgent',
        maxRetries: 2,
        maxSteps: 5,
        temperature: 0.5,
        topP: 1,
        runtimeContext: {},
        threadId,
        resourceId: 'weatherAgent',
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`API returned status ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let partial = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    partial += decoder.decode(value, { stream: true });

    // Split by newlines (each line might be like: 0:"word", f:{...}, a:{...}, etc.)
    const lines = partial.split('\n');
    partial = lines.pop(); // keep last unfinished line

    for (const line of lines) {
      if (line.startsWith('0:')) {
        // Extract and clean plain text
        const text = line.replace(/^0:\s*/, '').replace(/\\n/g, '\n').replace(/^"|"$/g, '');
        onChunk(text);
      }
    }
  }
}
