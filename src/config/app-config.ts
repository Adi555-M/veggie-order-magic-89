
/**
 * Application configuration file
 * Contains centralized configuration settings for the application
 */

export const appConfig = {
  // App information
  appName: "Veggie Order Magic",
  appDescription: "Fresh vegetables delivered to your doorstep",
  
  // API configuration (for future use)
  api: {
    baseUrl: "/api",
    timeout: 30000, // 30 seconds
  },
  
  // Feature flags
  features: {
    enableSearch: true,
    enableNotifications: false,
    enableOrderTracking: true,
  },
  
  // UI configuration
  ui: {
    itemsPerPage: 12,
    defaultCategory: "all",
    mobileBreakpoint: 768, // in pixels
  },
  
  // Contact information
  contact: {
    email: "support@veggieordermagic.com",
    phone: "+1 (555) 123-4567",
    address: "123 Fresh Produce Lane, Vegetable City, VC 98765",
  },
  
  // Social media links
  socialMedia: {
    facebook: "https://facebook.com/veggieordermagic",
    instagram: "https://instagram.com/veggieordermagic",
    twitter: "https://twitter.com/veggieordermagic",
  }
};

// Export individual config sections for convenience
export const { api, features, ui, contact, socialMedia } = appConfig;

// Default export for the entire config
export default appConfig;
