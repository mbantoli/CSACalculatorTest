# IKO

The IKO project is a tool that helps roofing contractors determine what roofing system to use, based on their project requirements.

## Tooling

The IKO web application uses Prismic as it's primary data store.  
NextJS is used for development of the server and client.  
The master branch is deployed through Netlify automatically.

## Getting Started Developing

Clone this project and run `yarn` to install the dependencies.  
Then run `yarn dev` to run the project in development mode.

## Production Deployments

The master branch and pull requests are automatically deployed to Netlify, so no need to manually deploy anything. You can test the production build by running `yarn deploy` to build the application, then running `yarn start`, to start the production server-side rendered application.

# Netlify Hosting

The app is hosted on Netlify. The staging and production deployment apps can be accessed at [https://app.netlify.com/teams/iko-systems/sites](https://app.netlify.com/teams/iko-systems/sites).

The staging app is found at: [https://compassionate-mcclintock-d05c1d.netlify.app/](https://compassionate-mcclintock-d05c1d.netlify.app/)
and the production app can be seen at: [https://brave-hawking-e3dd4d.netlify.app/](https://brave-hawking-e3dd4d.netlify.app/), as well as the custom domain it has been configured to.

# Prismic CMS Documentation

What is Prismic? (https://prismic.io/headless-cms-intro) In their words.
We use Prismic for our headless CMS backend to power the IKO Systems project. The Iko Systems dashboard acn be accessed at: [https://ikosystems.prismic.io/documents/](https://ikosystems.prismic.io/documents/).

## Types

Prismic Documentation (https://prismic.io/feature/custom-type-builder)
Found on the custom types (https://IKO-roofing-systems.prismic.io/masks/) page.

### Symbols Reference:

- Array : collection of items. [“one”, “two”, “three”]
- string: string of text. “this is a string”
- |: or

## roofing system

```
RoofingSystemType = {
  system_name: string
  wind_pressure: number
  membrane: "SBS" | "BUR" | "TPO"
  attachment: "MARS" | "PARS" | "AARS"
  components: Array<ComponentType>
  revit_block: Linked Prismic Media
  system_summary: string
}
```

```
ComponentType = {
  component_name: string
  alternatives?: Array<string>
}
```

- All fields are required in RoofingSystemType
- component_name is required for ComponentType
