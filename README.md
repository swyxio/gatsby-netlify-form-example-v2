> Note: I no longer work at Netlify - if you'd like to maintain this example repo, please get in touch and I'd be happy to transfer.

# Integrating Netlify Form Handling in Gatsby

Example for integrating a basic contact form with Netlify’s form handling feature.

Demo: https://gatsby-netlify-form-example-v2.netlify.com/

Note: You can also find a [Gatsby + Netlify Forms example in the Gatsby+NetlifyCMS starter](https://gatsby-netlify-cms.netlify.com/contact/examples).

Features:

- Basic form submission
- File upload
- Form submission with reCAPTCHA

All examples use controlled forms to offer more flexibility, but you can use uncontrolled forms too.

More information in the blogpost: https://www.netlify.com/blog/2017/07/20/how-to-integrate-netlifys-form-handling-in-a-react-app/

## Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/sw-yx/gatsby-netlify-form-example-v2)

## Try it out in Gitpod

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/from-referrer/)

## How it Looks on Netlify app

![CleanShot 2021-08-29 at 16 40 57](https://user-images.githubusercontent.com/6764957/131269107-3272201f-9c68-4328-869d-a02330bffc8b.png)


![CleanShot 2021-08-29 at 16 41 17](https://user-images.githubusercontent.com/6764957/131269117-7538b676-fb41-44e6-af74-0d67f56afecb.png)


## reCAPTCHA

This example site uses [react-google-recaptcha](https://github.com/dozoisch/react-google-recaptcha) to render the reCAPTCHA widget.

To make the reCAPTCHA example work in your own copy of this site, you’ll need to do the following:

1. [Sign up for a reCAPTCHA API key pair](http://www.google.com/recaptcha/admin) for your site.
2. [Log in to your Netlify account](https://app.netlify.com), and add the following
   environment variables to your site’s Settings > Build & deploy > Build environment variables:

- `SITE_RECAPTCHA_KEY` with your reCAPTCHA site key.
- `SITE_RECAPTCHA_SECRET` with your reCAPTCHA secret key.

**Important**: the environment variables need to be called `SITE_RECAPTCHA_KEY` and `SITE_RECAPTCHA_SECRET` for the Netlify backend to find them. If you add a `GATSBY_` prefix to the variable names, the Netlify backend won't recognize them, the reCAPTCHA verification will fail, and your form submissions won't be stored.

If you still need the key on the frontend, like shown in this demo, you can simply duplicate the key:

![image](https://user-images.githubusercontent.com/6764957/79165052-e8e52b00-7e14-11ea-851f-55ae51e6f1f6.png)

3. Change the build command for your site to

```
echo SITE_RECAPTCHA_KEY=$SITE_RECAPTCHA_KEY >> .env.production && gatsby build
```

This will make the SITE_RECAPTCHA_KEY available to the Gatsby build in production.

To see the reCAPTCHA widget locally, add `SITE_RECAPTCHA_KEY=your-reCAPTCHA-API-site-key`
to your local [.env.development](https://www.gatsbyjs.org/docs/environment-variables/) file.
