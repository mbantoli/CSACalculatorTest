/* eslint no-extend-native: 0 */
// core-js comes with Next.js. So, you can import it like below
import stringIncludes from "core-js/library/fn/string/virtual/includes";
import repeat from "core-js/library/fn/string/virtual/repeat";
import assign from "core-js/library/fn/object/assign";
import find from "core-js/library/fn/array/virtual/find";
//TODO: add back in
//import flatMap from "core-js/library/fn/array/virtual/flat-map";
import findIndex from "core-js/library/fn/array/virtual/find-index";
import arrayIncludes from "core-js/library/fn/array/virtual/includes";

// Add your polyfills
// This files runs at the very beginning (even before React and Next.js core)
String.prototype.includes = stringIncludes;
String.prototype.repeat = repeat;
Object.assign = assign;
Array.prototype.find = find;
//Array.prototype.flatMap = flatMap;
Array.prototype.findIndex = findIndex;
Array.prototype.includes = arrayIncludes;
