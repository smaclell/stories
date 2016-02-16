class StartersController < ApplicationController

  def index
    # TODO: Add paging
    starters = Paragraph.roots.map { |p| {
      :_links => {
        :self => (make_url p.id),
        :items => (p.child_ids.map { |c| { :href => (make_url c) }}),
      },
      :id => p.id,
      :text => p.text
    } }

    render json: {
      :_links => {
        :self => '/starters/',
        :items => starters,
      }
    }
  end

private
  def make_url(id)
    '/paragraphs/' + id.to_s + '/'
  end

 end