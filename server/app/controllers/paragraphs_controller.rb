class ParagraphsController < ApplicationController

  def show
    paragraph = Paragraph.find(params[:id])
    render json: {
      :_links => {
        :self => (make_url paragraph.id),
        :items => (paragraph.child_ids.map { |c| { :href => (make_url c) }}),
      },
      :id => paragraph.id,
      :text => paragraph.text,
    }
  end

private
  def make_url(id)
    '/api/v1/paragraphs/' + id.to_s + '/'
  end
end