require 'addressable/uri'

module VideoDetection

  def is_video?
    current_page.data.has_key?('video')
  end

  def detect_video
    VideoUrlParser.parse_url(current_page.data.video) if is_video?
  end

  module VideoUrlParser
    SITE_REGEXP = %r{(?<site>youtube|vimeo)}

    def self.parse_url(video_url)
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
end