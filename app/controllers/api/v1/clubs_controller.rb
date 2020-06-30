module Api::V1
  class ClubsController < ApplicationController
    before_action :set_club, only: [:show, :update, :destroy]

    # GET /clubs
    def index
      @clubs = Club.all

      options = { meta: { total: @clubs.length } }
      render json: ClubSerializer.new(@clubs, options)
    end

    # GET /clubs/1
    def show
      render json: serialization
    end

    # POST /clubs
    def create
      @club = Club.new(club_params(:name, :description, :user_id))
      
      if @club.save
        @membership = Membership.new(club_id: @club.id, user_id: session_user.id, mod: true)
        if @membership.save
          render json: {club: serialization, mod: @membership.mod, success: "Created #{@club.name}"}, status: :created
        else
          render status: :unauthorized
        end
      else
        puts @club.errors.full_messages
        puts @membership.errors.full_messages
        render json: {errors: @club.errors}, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /clubs/1
    def update
      if @club.update(club_params)
        render json: serialization
      else
        render json: @club.errors, status: :unprocessable_entity
      end
    end

    # DELETE /clubs/1
    def destroy
      @club.destroy
      destroy_response(@club)
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_club
        @club = Club.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def club_params(*args)
        params.require(:club).permit(args)
      end

      def serialization
        options = {
          include: [:users, :memberships, :boards],
          links: {uri: request.base_url + "/clubs/#{@club.id}"}
        }
        serialize(@club, options)
      end
      
  end
end