const fetch = require('node-fetch');

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { userIdChatwoot } = JSON.parse(event.body || '{}');
  const api_access_token = process.env.CHATWOOT_API_TOKEN;
  const ssoEndpoint = `https://smartchat.suaiden.com/platform/api/v1/users/${userIdChatwoot}/login`;

  try {
    const response = await fetch(ssoEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${api_access_token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to get SSO link' })
    };
  }
}; 