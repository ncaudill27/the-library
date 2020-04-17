class MembershipsController < ApplicationController

  def create
    @membership = Membership.new(membership_params)
    @membership.user = session_user unless session_user return status: :unauthorized
    if @membership.save
      render json: {
        userId: @membership.user_id,
        clubId: @membership.club_id,
        success: "#{@membership.user.name} joined #{@membership.club.name}."
      }
    else
      render json: {errors: @membership.errors.full_messages}, 
    end
  end

  private

  def membership_params
    params.require(:membership).permit(:club_id)
  end
end