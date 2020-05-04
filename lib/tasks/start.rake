namespace :start do
  desc 'Start dev server'
  task :development do
    exec 'foreman start -f Procfile.dev'
  end

  desc 'Start production server'
  task :production do
    task :production do
      exec 'NPM_CONFIG_PRODUCTION=true npm run postinall && foreman start'
    end
  end
end

task start: 'start:development'