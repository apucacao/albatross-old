SOURCE_DIR = File.expand_path('_site', File.dirname(__FILE__))
DEPLOY_REPO= 'apucacao.github.com'
DEPLOY_DIR = File.expand_path("../#{DEPLOY_REPO}", File.dirname(__FILE__))

desc 'Optimize content'
task :optimize do
  puts 'Optimizing content'
  system 'smusher images/'
end

desc 'Publish the site'
task :publish do

  puts 'Building javascript'
  system 'node r.js -o js-build.json' || 'Failed'

  puts 'Building site'
  system({'JEKYLL_ENV' => 'production'}, 'bundle exec jekyll')

  puts "Copying generated files to #{DEPLOY_DIR}"
  cp_r "#{SOURCE_DIR}/.", DEPLOY_DIR

  cd "#{DEPLOY_DIR}" do
    puts 'Staging changes'
    system 'git add .'
    system 'git add -u'

    timestamp = Time.now.strftime('%b %d %Y')
    system "git commit -m \"Update: #{timestamp}\""

    puts 'Publishing new content'
    system 'git push origin master --force'

    puts 'Done'
  end
end