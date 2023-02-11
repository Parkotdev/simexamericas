const config = {
  host: import.meta.env.VITE_HOST,
  port: import.meta.env.VITE_PORT,
  sanbox: import.meta.env.VITE_SANDBOX,
  re_captcha_key: import.meta.env.VITE_RE_CAPTCHA_KEY,
  editor_license_key: import.meta.env.VITE_LICENSE_KEY
};

export default config;
