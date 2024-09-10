interface Config {
    API_URL: string;
    ENV: string;
    VERSION: string;
    // Add other configuration variables as needed
  }
  
  const config: Config = {
    API_URL: process.env.REACT_APP_API_URL || 'https://naiktoolkit-876527589412.us-east1.run.app',
    ENV: process.env.NODE_ENV || 'development',
    VERSION: process.env.REACT_APP_VERSION || '0.1.0',
    // Add other configuration variables here
  };
  
  export default config;