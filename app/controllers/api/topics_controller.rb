class Api::TopicsController < ApplicationController
  def index
    @topics = Topic.all();

    render :index
  end

  # def show
  #   @topic = Topic.find(params[:id])
  #
  #   render :show
  # end
end
