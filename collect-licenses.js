// Credits for the original script go to Josu Goñi
// Modified for 
// https://stackoverflow.com/a/70266175

// Licensed under CC BY-SA 4.0
// https://creativecommons.org/licenses/by-sa/4.0/

import FS from 'fs';

const packageJSON = JSON.parse(FS.readFileSync('package.json').toString());
const dependencies = packageJSON.dependencies;

const LICENSE_FILE_NAMES = [
  'LICENSE',
  'license',
  'LICENSE.md',
  'LICENSE.txt',
  'ThirdPartyNoticeText.txt'
];

// Add ability to specify custom license URLs for packages that don't include any files
const CUSTOM_LICENSE_URLS = [
  {
    name: "@iconify-json/iconoir",
    url: "https://github.com/iconoir-icons/iconoir/raw/main/LICENSE",
  },
  {
    name: "@iconify-json/ph",
    url: "https://github.com/phosphor-icons/core/raw/main/LICENSE",
  },
  // {
  //   name: "alpinejs",
  //   url: "https://github.com/alpinejs/alpine/raw/main/LICENSE.md",
  // },
  // {
  //   name: "@alpinejs/collapse",
  //   url: "https://github.com/alpinejs/alpine/raw/main/LICENSE.md"
  // }
]


let FAILED_TO_FIND_LICENSES = false;

let libraries = Object.keys(dependencies);

// libraries.forEach(async key => {
for (const key of libraries) {
  console.log();
  console.log("==========")
  console.log();
  console.log(key);
  console.log();

  const path = 'node_modules/' + key;

  // let license = null;
  // Modify to handle multiple licenses, such as third party notice files + own licenses
  let licenses = [];

  LICENSE_FILE_NAMES.forEach(name => {
    try {
      licenses.push(FS.readFileSync(path + '/' + name).toString());
    } catch (e) {}
  });

  let additional_custom_license = CUSTOM_LICENSE_URLS.find(entry => entry.name == key)
  if (additional_custom_license !== undefined) {
    const response = await fetch(additional_custom_license.url);
    licenses.push(await response.text())
  }

  // if (licenses.length === 0) {
  //   try {
  //     let libraryPackageFile = FS.readFileSync(path + '/package.json').toString();
  //     // You can try to get the license from the package.json here
  //   } catch (e) {}
  // }

  if (licenses.length > 0) {
    // console.log(license);
    licenses.forEach(licenseEntry => console.log(licenseEntry));
  } else {
    console.log('License not found');
    FAILED_TO_FIND_LICENSES = true;

    try { // This is to help update the LICENSE_NAMES before re-run it
      let files = FS.readdirSync(path);
      files.forEach(file => {
        console.log(file);
      });
    } catch (e) {}
  }
// });
}

if (FAILED_TO_FIND_LICENSES) {
  console.error('WARN: The license for some dependencies was not found!');
}
