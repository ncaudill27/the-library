class ApplicationController < ActionController::API

  private

  def serialize(object, options)
    class_name = object.class.name
    serializer_name = class_name + "Serializer"
    serializer = Object.const_get(serializer_name)

    serializer.new(object, options)
  end

  def destroy_response(object)
    key = object.class.name.downcase + '_id'
    render json: { key => object.id }
  end
end
