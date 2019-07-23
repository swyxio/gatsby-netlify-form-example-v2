import React from 'react'
import { navigate } from 'gatsby'
import Recaptcha from 'react-google-recaptcha'
import Layout from '../layout'

const RECAPTCHA_KEY = process.env.SITE_RECAPTCHA_KEY

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default function Contact() {
  const [state, setState] = React.useState({})

  const handleChange = (e) => {
    setState({ [e.target.name]: e.target.value })
  }

  const handleRecaptcha = (value) => {
    setState({ 'g-recaptcha-response': value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }

  return (
    <Layout>
      <h1>reCAPTCHA 2</h1>
      <form
        name="contact-recaptcha"
        method="post"
        action="/thanks/"
        data-netlify="true"
        data-netlify-recaptcha="true"
        onSubmit={handleSubmit}
      >
        <noscript>
          <p>This form won’t work with Javascript disabled</p>
        </noscript>
        <p>
          <label>
            Your name:
            <br />
            <input type="text" name="name" onChange={handleChange} />
          </label>
        </p>
        <p>
          <label>
            Your email:
            <br />
            <input type="email" name="email" onChange={handleChange} />
          </label>
        </p>
        <p>
          <label>
            Message:
            <br />
            <textarea name="message" onChange={handleChange} />
          </label>
        </p>
        <Recaptcha ref="recaptcha" sitekey={RECAPTCHA_KEY} onChange={handleRecaptcha} />
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
    </Layout>
  )
}
