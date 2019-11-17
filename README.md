# Logixboard Sample

- Uses `lowdb` for the database standin so it's clientside only
    - Data is stored in `localstorage`
- if you haven't imported the sample data yet, it will load that for you
    - the conditional check is more useful if I had implemented edit or delete
- Styling is rough, but I'm not a designer. Uses `Bulma` as a framework just because.
    - I created a symlink for the `bulma.min.css` file in the public folder so I wouldn't need a build step for it. If the git repo loses it you'll need to re-link it.
- I hadn't written in Svelte before so `App.svelte` is a little spaghetti looking. Probably should have split stuff into more components.

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
