# `MonkeyIDE`

`MonkeyIDE` is a small lightweight multi-tab IDE written based on `CodeMirror`.

## Importing

To import `MonkeyIDE`, run:

```bash
npm install --save codemirror
curl -s -o- https://yash-singh1.github.io/monkeyIDE/index.js > monkeyide.js
curl -s -o- https://yash-singh1.github.io/monkeyIDE/style.css > monkeyide.css

```

Now add the following into your `HTML`:

```html
<script src="node_modules/codemirror/lib/codemirror.js"></script>
<link rel="stylesheet" href="node_modules/codemirror/lib/codemirror.css" />
<link rel="stylesheet" href="monkeyide.css" />
<script src="monkeyide.js"></script>
```

`MonkeyIDE` is now fully imported! If you would like to import syntax highlighting, go to: [https://codemirror.net/mode/](https://codemirror.net/mode/), from the documentation for more information on that. Here is a link with an index of themes: [https://codemirror.net/theme/](https://codemirror.net/theme/). Just import a theme as: `node_modules/codemirror/theme/*.css`. Replace `*` with the theme name. For more information on codeMirror, go to their [main website](https://codemirror.net/)

## Using

The `MonkeyIDE` controls the `ide` object, which contains everything that you need to do when controlling the `IDE` programmatically:

#### Strings

The following are some plain strings in the `ide` object:

- `name`
  The name is simply => `"monkeyide"`
- `version`
  This is simply the current version of `monkeyide`
- `license`
  This is a string that contains => `"MIT"`

#### Elements

- `buttonsBar`
  This element contains all of the buttons that allows the user to navigate through the code editor
- `tabsElements`
  This contains the container for all of the tabs inside the code editor.

#### Lists

- `files`
  This is the one list inside the `ide` object that contains objects. These objects are in the format:

```
{
	mirror: CodeMirror,
	name: String,
	configuration: Object
}
```

The `mirror` key contains the `CodeMirror` for that tab. The `name` key contains a string for the specified string that the tab should be called. The `configuration` key contains an object for the configuration which was specified inside the call.

#### Integers

- `currentTab`
  This integer contains the current tab opened.
- `totalTabs`
  This is the total amount of tabs. It can also be obtained by examining the `files` list's length.
- `limit`
  The limit for the number of tabs that can be opened at once. Defaults to `"infinity"`. Will only be accepted if it is a `typeof` number

#### Functions

- `createTab`
  This function allows you to create a new tab for the IDE. It accepts two arguments: a string and an object. The string is the name of the tab. The object is the configuration passed into `CodeMirror`.
- `openTab`
  This function takes one argument, a number. That number is the index of the tab that will be opened.
- `removeElement`
  Used for internal purposes to manipulate arrays.
- `getCodeByTab`
  A function to get the code of the tabID specified.
- `getTabs`
  This returns the `ide.files` list.
- `getTab`
  Returns the given index on the `ide.files` list.
- `removeTab`
  Remove the tab at the specified index.
- `removeAll`
  Removes all of the tabs.
- `pack`
  Packs up the given list. You can run `ide.pack(ide.files)` to pack up everything now

## Testing

To test this program locally, run:

```bash
npm run test
```

Now you can view the tests at `localhost:1567/index.html`.

## Contributing

Contributions are welcome!
