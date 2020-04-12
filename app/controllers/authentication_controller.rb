class AuthenticationController < ApplicationController

  def login
    user = User.find_by(username: params[:username]).try(:authenticate, params[:password])
    if user.valid?
      payload = {user_id: user.id}
      token = encode_token(payload)
      render json: {user: user, auth_token: token success: "#{user.username} logged in!"}
    else
      render json: {failure: user.errors.full_messages}, status: :unauthorized
    end
  end
end