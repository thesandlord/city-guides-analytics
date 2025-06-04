// Learn more about clients at https://docs.boundaryml.com/docs/snippets/clients/overview

client<llm> Gemini {
  provider google-ai
  options {
    model "gemini-2.0-flash-lite"
    api_key env.GEMINI_API_KEY
  }
}
