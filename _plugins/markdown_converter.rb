require 'fileutils'
require 'digest/md5'
require 'pygments'
require 'typogruby'
require 'redcarpet'

PYGMENTS_CACHE_DIR = File.expand_path('../../.cache', __FILE__)
FileUtils.mkdir_p(PYGMENTS_CACHE_DIR)

# Extended Markdown HTML Renderer
#
# It integrates syntax highlighting using Pygments, and better typography
# using Typogruby
#
class Markdown < Redcarpet::Render::HTML
  include Redcarpet::Render::SmartyPants

  def paragraph(text)
    "<p>#{improve(text)}</p>"
  end

  def normal_text(text)
    improve(text)
  end

  def block_code(code, lang)
    lang = lang || "text"
    path = File.join(PYGMENTS_CACHE_DIR, "#{lang}-#{Digest::MD5.hexdigest code}.html")
    cache(path) do
      begin
        colorized = Pygments.highlight(code, :lexer => lang, :formatter => 'html', :options => {:encoding => 'utf-8'})
        add_code_tags(colorized, lang)
      rescue StandardError => e
        puts e
      end
    end
  end

  def add_code_tags(code, lang)
    code.sub(/<pre>/, "<pre><code class=\"#{lang}\">").
         sub(/<\/pre>/, "</code></pre>")
  end

  def cache(path)
    if File.exist?(path)
      File.read(path)
    else
      content = yield
      File.open(path, 'w') {|f| f.print(content) }
      content
    end
  end

  def improve(text)
    Typogruby.improve(text)
  end
end

module Jekyll
  class MarkdownConverter < Jekyll::Converter
    def extensions
      Hash[ *@config['redcarpet']['extensions'].map {|e| [e.to_sym, true] }.flatten ]
    end

    def markdown
      @markdown ||= Redcarpet::Markdown.new(Markdown.new(extensions), extensions)
    end

    def convert(content)
      return super unless @config['markdown'] == 'redcarpet2'
      markdown.render(content)
    end
  end
end
