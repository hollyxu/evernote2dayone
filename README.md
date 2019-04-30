# Migrate from Evernote into DayOne

This script will migrate exported notes from Evernote into individual entries in DayOne.

## Prerequisites

* NodeJS & NPM
* [DayOne](https://dayoneapp.com/) desktop app
* [Evernote](https://evernote.com/) desktop app

## Import From Evernote to DayOne
1. Install the [Day One Command Line Interface](https://help.dayoneapp.com/tips-and-tutorials/command-line-interface-cli)

2. Export Evernote files as HTML into the default
"My Notes" folder. Place it in the same directory as this script.

3. Install required packages
```
npm install
```

4. Run the import script!
All items will be tagged `EvernoteImport` and imported into the default journal.
```
node evernoteToDayOne.js
```

Please report any Issues on GitHub! Your feedback is appreciated.

## Future Improvements
Pull requests kindly accepted.
* Banner Image
* Allow users to specify folder other than "My Notes"
* Test special cases like images in tables
* handle cases with >10 images per entry

## Thanks
* [Turndown](https://github.com/domchristie/turndown)
* [jsdom](https://github.com/jsdom/jsdom)
