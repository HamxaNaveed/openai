require "net/http"
require "open-uri"
require "ruby/openai"

class HomeController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:generate_completion]

  def index
    @conversation = Conversation.where(user_id: current_user.id)
  end

  def generate_completion
    client = OpenAI::Client.new(access_token: "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")
    response = client.completions(
      parameters: {
        model: "text-davinci-001",
        prompt: params[:prompt],
        max_tokens: 2000,
      }
    )

    answer = response.parsed_response["choices"]

    Conversation.create!(question: params[:prompt], answer: response.parsed_response["choices"].first["text"], user_id: current_user.id)

    render json: answer
  end
end
