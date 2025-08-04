import express from 'express';
import proxy from 'express-http-proxy';

const app = express();

app.use(
  '/',
  proxy(process.env.SMARTCHAT_BASE_URL || process.env.VITE_SMARTCHAT_BASE_URL || 'https://smartchat.suaiden.com', {
    proxyReqPathResolver: req => req.originalUrl.replace(/^\/chatwoot/, ''),
    userResHeaderDecorator(headers) {
      delete headers['x-frame-options'];
      delete headers['X-Frame-Options'];
      delete headers['content-security-policy'];
      delete headers['Content-Security-Policy'];
      return headers;
    }
  })
);

app.use((req, res, next) => {
  res.removeHeader('X-Frame-Options');
  res.removeHeader('x-frame-options');
  res.removeHeader('Content-Security-Policy');
  res.removeHeader('content-security-policy');
  next();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Proxy rodando em http://localhost:${PORT}/chatwoot`);
});
