import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import { navigate } from 'gatsby-link'
import Layout from '../layout'

function encode(data) {
  const formData = new FormData()

  for (const key of Object.keys(data)) {
    formData.append(key, data[key])
  }

  return formData
}

export default function Contact() {
  const [state, setState] = React.useState({})

  const handleChange = (e) => {
    setState({ [e.target.name]: e.target.value })
  }

  const handleAttachment = (e) => {
    setState({ [e.target.name]: e.target.files[0] })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
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
      <h1>File Upload</h1>
      <form
        name="file-upload"
        method="post"
        action="/thanks/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <input type="hidden" name="form-name" value="file-upload" />
        <p hidden>
          <label>
            Don’t fill this out: <input name="bot-field" onChange={handleChange} />
          </label>
        </p>
        <p>
          <label>
            Your name:
            <br />
            <input type="text" name="name" onChange={handleChange} />
          </label>
        </p>
        <p>
          <label>
            File:
            <br />
            <input type="file" name="attachment" onChange={handleAttachment} />
          </label>
        </p>
        <p>
          <button type="submit">Send</button>
        </p>
        <p>Note: multiple file uploads are not supported by Netlify at this time.</p>
      </form>
    </Layout>
  )
}
