// lib/analytics.js - Updated with backend logging

import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Generate a unique session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

// Queue for batch logging
let eventQueue = [];
let batchTimeout = null;

// Send event to both Google Analytics and Backend
const logToBackend = async (eventData) => {
  try {
    await axios.post(`${API_BASE_URL}/analytics/log`, {
      session_id: getSessionId(),
      ...eventData,
      page_url: window.location.href,
      referrer: document.referrer
    });
  } catch (error) {
    console.error('Failed to log to backend:', error);
  }
};

// Batch logging for better performance
const addToQueue = (eventData) => {
  eventQueue.push({
    session_id: getSessionId(),
    ...eventData,
    page_url: window.location.href,
    referrer: document.referrer
  });

  // Clear existing timeout
  if (batchTimeout) {
    clearTimeout(batchTimeout);
  }

  // Send batch after 2 seconds of inactivity or when queue reaches 5 events
  if (eventQueue.length >= 5) {
    sendBatch();
  } else {
    batchTimeout = setTimeout(sendBatch, 2000);
  }
};

const sendBatch = async () => {
  if (eventQueue.length === 0) return;

  const eventsToSend = [...eventQueue];
  eventQueue = [];

  try {
    await axios.post(`${API_BASE_URL}/analytics/log-batch`, {
      events: eventsToSend
    });
  } catch (error) {
    console.error('Failed to send batch events:', error);
  }
};

// Send remaining events when user leaves
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    if (eventQueue.length > 0) {
      // Use sendBeacon for reliable sending on page unload
      const blob = new Blob([JSON.stringify({ events: eventQueue })], {
        type: 'application/json'
      });
      navigator.sendBeacon(`${API_BASE_URL}/analytics/log-batch`, blob);
    }
  });
}

// Main tracking function
export const trackEvent = (eventName, eventParams = {}) => {
  // Send to Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }

  // Also log to backend (batched)
  addToQueue({
    event_type: eventName,
    event_data: eventParams,
    user_identifier: eventParams.email || null
  });
};

// Specific tracking functions with backend logging
export const trackCardCreationStep = (step, data = {}) => {
  const eventData = {
    step_number: step,
    step_name: step === 1 ? 'personal_info' : step === 2 ? 'payment_review' : 'card_received',
    card_type: data.cardPurpose || '',
    amount_usd: data.amountUSD || 0,
    ...data
  };

  trackEvent('card_creation_progress', eventData);

  // Backend logging with category
  addToQueue({
    event_type: 'card_creation_progress',
    event_category: 'card_creation',
    step_number: step,
    event_data: eventData,
    user_identifier: data.email || null
  });
};

export const trackFormInteraction = (action, field = '') => {
  const eventData = {
    action: action,
    field: field,
    timestamp: new Date().toISOString()
  };

  trackEvent('form_interaction', eventData);

  addToQueue({
    event_type: 'form_interaction',
    event_category: 'card_creation',
    event_data: eventData
  });
};

export const trackPaymentInitiated = (amount, currency, userEmail) => {
  const eventData = {
    value: amount,
    currency: currency,
    payment_method: 'paystack'
  };

  trackEvent('payment_initiated', eventData);

  addToQueue({
    event_type: 'payment_initiated',
    event_category: 'payment',
    event_data: eventData,
    user_identifier: userEmail
  });
};

export const trackPaymentCompleted = (reference, amount, userEmail) => {
  const eventData = {
    transaction_id: reference,
    value: amount,
    currency: 'GHS',
    items: [{
      item_id: 'virtual_card',
      item_name: 'Virtual Card',
      price: amount
    }]
  };

  trackEvent('purchase', eventData);

  // Important: Send immediately for conversions
  logToBackend({
    event_type: 'purchase',
    event_category: 'payment',
    event_data: eventData,
    user_identifier: userEmail
  });
};

export const trackError = (errorType, errorMessage, context = {}) => {
  const eventData = {
    error_type: errorType,
    error_message: errorMessage,
    ...context
  };

  trackEvent('error_occurred', eventData);

  // Send errors immediately
  logToBackend({
    event_type: 'error_occurred',
    event_category: 'error',
    event_data: eventData,
    user_identifier: context.email || null
  });
};

export const trackFormAbandonment = (step, formData) => {
  const eventData = {
    step: step,
    fields_completed: Object.keys(formData).filter(key => formData[key]).length,
    last_field: Object.keys(formData).reverse().find(key => formData[key])
  };

  trackEvent('form_abandoned', eventData);

  // Send immediately
  logToBackend({
    event_type: 'form_abandoned',
    event_category: 'card_creation',
    step_number: step,
    event_data: eventData,
    user_identifier: formData.email || null
  });
};

export const trackSessionStart = () => {
  const eventData = {
    landing_page: window.location.pathname
  };

  trackEvent('session_start', eventData);

  addToQueue({
    event_type: 'session_start',
    event_category: 'other',
    event_data: eventData
  });
};

let startTime = Date.now();
export const trackTimeOnPage = (pageName) => {
  const timeSpent = Math.round((Date.now() - startTime) / 1000);
  const eventData = {
    page: pageName,
    duration_seconds: timeSpent
  };

  trackEvent('time_on_page', eventData);

  addToQueue({
    event_type: 'time_on_page',
    event_category: 'other',
    event_data: eventData
  });
};