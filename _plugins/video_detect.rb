require 'addressable/uri'

module Video
  SITE_REGEXP = %r{(?<site>youtube|vimeo)}

  def Video.parse_url(video_url)
    url = Addressable::URI.parse(video_url)
    match = SITE_REGEXP.match(url.host)[:site]
    Parsers.send("parse_#{match}_url", match, url)
  end

  module Parsers
    def Parsers.parse_youtube_url (site, uri)
      video_id = uri.query_values['v']
      return site, video_id
    end

    def Parsers.parse_vimeo_url (site, uri)
      video_id = %r{(?<id>\d+)}.match(uri.path)[:id]
      return site, video_id
    end
  end
end

module Jekyll
  class VideoDetectTag < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @url = Liquid::Variable.new(text)
    end

    def render(context)
      video_site, video_id = Video.parse_url(@url.render(context))
      context.scopes.last['video_site'] = video_site
      context.scopes.last['video_id'] = video_id
      ''
    end
  end
end

Liquid::Template.register_tag('detect_video', Jekyll::VideoDetectTag)