
## Web3Forms integration notes

The official Web3Forms API reference documents browser-side `POST https://api.web3forms.com/submit` using an `access_key` field; `email`, `subject`, and other form fields may be included in the request body. The documented response includes a `success` boolean and a message. The official HTML example confirms that no backend is required for a static site and that the form should include `access_key`, `name`, `email`, and `message` fields. Sources: https://docs.web3forms.com/getting-started/api-reference and https://web3forms.com/platforms/html-contact-form.
