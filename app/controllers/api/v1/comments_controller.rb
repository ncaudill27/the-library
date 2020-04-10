module Api::V1
  class CommentsController < ApplicationController
    before_action :set_comment, only: [:show, :update, :destroy]

    # GET /comments
    def index
      @comments = Comment.all

      # options = { include: [:users, :comments] }
      render json: @comments.to_json
    end

    # GET /comments/1
    # def show
    #   render json: serialization
    # end

    # POST /comments
    def create
      @comment = Comment.new(comment_params)

      if @comment.save
        render json: @comment, status: :created # location: @comment
      else
        render json: @comment.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /comments/1
    def update
      if @comment.update(comment_params)
        render json: serialization
      else
        render json: @comment.errors, status: :unprocessable_entity
      end
    end

    # DELETE /comments/1
    def destroy
      @comment.destroy
      destroy_response(@comment)
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_comment
        @comment = Comment.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def comment_params
        params.require(:comment).permit(:user_id, :board_id, :content)
      end

      def serialization
        options = {
          include: [:board, :user],
          links: { uri: request.base_url + "/comments/#{@comment.id}"}
        }
        serialize(@comment, options)
      end
  end
end