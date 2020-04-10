 module Api::V1
  class UsersController < ApplicationController
    before_action :set_user, only: [:show, :update, :destroy]

    # GET /users
    def index
      @users = User.all
      
      options = { include: [:club_users, :clubs] }
      render json: UserSerializer.new(@users, options)
    end

    # GET /users/1
    def show
      render json: serialization
    end

    # POST /users
    def create
      @user = User.new(user_params)

      if @user.save
        render json: serialization, status: :created, location: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /users/1
    def update
      if @user.update(user_params)
        render json: serialization
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    # DELETE /users/1
    def destroy
      @user.destroy
      destroy_response(@user)
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_user
        @user = User.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def user_params
        params.require(:user).permit(:name, :username, :email, :password_digest, :bio)
      end

      def serialization
        options = {
          include: [:clubs, :club_users, :comments],
          links: {uri: request.base_url + "/users/#{@user.id}"}
        }
        serialize(@user, options)
      end
  end
end