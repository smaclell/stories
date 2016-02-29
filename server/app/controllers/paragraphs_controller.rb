class ParagraphsController < ApplicationController
  # TODO: Figure out how to propperly authenticate these requests and prevent CSRF
  # skip_before_filter :verify_authenticity_token

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

  def create
    input = params.require(:paragraph).permit(:text, :parent)

    parent = Paragraph.find(input[:parent])
    paragraph = Paragraph.create! :text => input[:text], :parent => parent

    # This could potentially be a redirect
    render json: {
      :_links => {
        :self => (make_url paragraph.id),
        :items => [],
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