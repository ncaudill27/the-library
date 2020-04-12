class SessionsController < ApplicationController

  def create
    user = User.find_by(username: params[:username]).try(:authenticate, params[:password])
    if user
      session[:user_id] = user.id
      byebug
      render json: {
        status: :created,
        logged_in: true,
        user: user
      }
    else
      render json: { status: 401 }
    end
  end
  
end