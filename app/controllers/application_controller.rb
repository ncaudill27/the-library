class ApplicationController < ActionController::API

  private

  def serialize(object, options)
    class_name = object.class.name
    serializer_name = class_name + "Serializer"
    serializer = Object.const_get(serializer_name)
    # byebug
    serializer.new(object, options).serialized_json
  end
end
