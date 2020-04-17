module Api::V1
  class MembershipsController < ApplicationController

    def create
      @membership = Membership.new(membership_params)
      @membership.user = session_user
      @membership.mod = false
      if @membership.save
        render json: {
          userId: @membership.user_id.to_s,
          clubId: @membership.club_id.to_s,
          success: "#{@membership.user.name} joined #{@membership.club.name}."
        }, status: :created
      else
        render json: {errors: @membership.errors.full_messages}, status: :unprocessable_entity
      end
    end

    private

    def membership_params
      params.require(:membership).permit(:club_id)
    end
  end
end