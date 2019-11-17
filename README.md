# Logixboard Sample

- Uses `lowdb` for the database standin so it's clientside only
    - Data is stored in `localstorage`
- If you haven't imported the sample data yet, it will load that for you
    - the conditional check is more useful if I had implemented edit or delete
- Styling is rough, but I'm not a designer. Uses `Bulma` as a framework just because.
    - I created a symlink for the `bulma.min.css` file in the public folder so I wouldn't need a build step for it. If the git repo loses it you'll need to re-link it.
- I hadn't written in Svelte before so `App.svelte` is a little spaghetti looking. Probably should have split stuff into more components.
- Not fully offline capable since I didn't want to go through setting up a service worker and configuring `Workbox`
    - Will still work as long as you don't reload the page XD
- Entries are filterable by statuses and modes
- Search text is matched against all column values
    - Search for `"Stockholm"` will show entries with Stockholm as either the Origin or Destination

## Get started
*Note that you will need to have [Node.js](https://nodejs.org) installed.*

Install the dependencies...

```bash
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.


## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).


## Deploying to the web

### With [now](https://zeit.co/now)

Install `now` if you haven't already:

```bash
npm install -g now
```

Then, from within your project folder:

```bash
cd public
now deploy --name my-project
```

As an alternative, use the [Now desktop client](https://zeit.co/download) and simply drag the unzipped project folder to the taskbar icon.

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```

## Prompt

    For this challenge, we are asking you to create a simple web application that will let a freight forwarder see where shipments are in the world. You will start with a data file that lists each shipment and has the following data for each shipment:

        - Shipment ID
        - Client name
        - Origin address
        - Destination address
        - Mode of transport
        - ETD (estimated time of departure from the origin)
        - ETA (estimated time of arrival)
        - Status

    You will have creative freedom on how you want to present the information and what framework you want to build this in but keep the following things in mind:

        - There is tremendous value in seeing all the shipments in an aggregate view
        - User experience and concise information presentation will be important in order to encourage adoption
        - Even if the web app loses connectivity, it should still be able to function in some capacity

    As a bonus, in addition to displaying the existing shipments, add support for the forwarder to insert more shipments into the list.
