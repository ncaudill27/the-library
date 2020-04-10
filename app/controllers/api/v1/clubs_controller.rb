module Api::V1
  class ClubsController < ApplicationController
    before_action :set_club, only: [:show, :update, :destroy]

    # GET /clubs
    def index
      @clubs = Club.all

      options = { include: [:users, :club_users] }
      render json: ClubSerializer.new(@clubs, options)
    end

    # GET /clubs/1
    def show
      render json: serialization
    end

    # POST /clubs
    def create
      @club = Club.new(club_params)

      if @club.save
        render json: serialization, status: :created, location: @club
      else
        render json: @club.errors, status: :unprocessable_entity
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
      def club_params
        params.require(:club).permit(:name, :description)
      end

      def serialization
        options = {
          include: [:users, :club_users, :boards],
          links: {link: request.base_url + "/clubs/#{@club.id}"}
        }
        serialize(@club, options)
      end
      
  end
end