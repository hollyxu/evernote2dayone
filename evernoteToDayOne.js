const fs = require('fs');
const TurndownService = require('turndown');
const {JSDOM} = require('jsdom');
const { execSync } = require('child_process');

const noteFolder = './My\ Notes/';
const turndownService = new TurndownService();

// ensures title doesn't stick to first paragraph
turndownService.addRule('title', {
  filter: 'title',
  replacement: function(content) {
    return content + ' \n';
  }
})

// dayone2 will insert photos into each `[{photo}]` by order found in --photos
turndownService.addRule('img', {
  filter: 'img',
  replacement: function(content) {
    return '[{photo}]';
  }
})

fs.readdirSync(noteFolder).forEach(fileName => {
  // Skip directories which don't end in `.html` & `index.html` listing
  if (fileName.indexOf('.html') !== fileName.length - 5 || fileName === 'index.html') {
    return;
  }

  var contents = fs.readFileSync(noteFolder + fileName, 'utf8');
  var dom = new JSDOM(contents);

  let createdDate = '';
  const metaTags = dom.window.document.getElementsByTagName('meta');
  for (let i = 0; i < metaTags.length; i++) {
    if (metaTags[i].name === 'created') {
      createdDate = metaTags[i].content;
      break;
    }
  }

  let imgUrls = [];
  const imgTags = dom.window.document.getElementsByTagName('img');
  for (let i = 0; i < imgTags.length; i++) {
    imgUrls.push('"' + noteFolder + decodeURIComponent(imgTags[i].src) + '"');
  }

  const markdown = turndownService.turndown(contents).replace(/"/g, '\\"');
  const urls = imgUrls.join(' ');
  const isoDate = new Date(createdDate).toISOString().replace('.000', '');

  let execCommand = `dayone2 new "${markdown}" --isoDate "${isoDate}" --tags "EvernoteImport"`
  if (urls.length > 0) {
    execCommand += ` --photos ${urls}`;
  }

  execSync(execCommand, console.log);
});
