module Environment
  def minify_in_production(input)
    env = ENV.fetch('JEKYLL_ENV', 'development').to_sym
    input + (env == :production ? '.min.js' : '.js')
  end
end

Liquid::Template.register_filter(Environment)
