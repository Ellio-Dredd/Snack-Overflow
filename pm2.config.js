module.exports = {
    apps: [
      {
        name: 'server',
        script: 'server.js',
        instances: 'max', // or a specific number
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };