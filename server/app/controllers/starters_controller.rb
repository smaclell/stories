class StartersController < ApplicationController

  def index
    # TODO: Add paging
    starters = Paragraph.roots.map { |p| { :id => p.id, :text => p.text } }
    render json: starters
  end


 end