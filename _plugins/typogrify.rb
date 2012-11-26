require 'typogruby'

module Jekyll
  class TypogrifyTag < Liquid::Block
    def render(context)
      output = super
      Typogruby.improve(output)
    end
  end
end

module Typogrify
  def typogrify(input)
    Typogruby.improve(input)
  end
end

Liquid::Template.register_tag('typogrify', Jekyll::TypogrifyTag)
Liquid::Template.register_filter(Typogrify)
