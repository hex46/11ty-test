const fs = require('fs')
const htmlmin = require("html-minifier");
const image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {

    // Initial configuration
    const dir = {
        input: "src",
        includes: "includes",
        data: "data", // default value
        output: "output", // default value
        posts: "posts"
    }

    // some static files
    eleventyConfig.addPassthroughCopy(`${dir.input}/.htaccess`);
    eleventyConfig.addPassthroughCopy(`${dir.input}/.robots.txt`);
    eleventyConfig.addPassthroughCopy(`${dir.input}/img/`);

    // CSS, SASS & JS
    eleventyConfig.addWatchTarget("./src/scss/");
    eleventyConfig.addWatchTarget("./src/css/");
    eleventyConfig.addWatchTarget("./src/js/");

    // 404
    // src : https://www.11ty.dev/docs/quicktips/not-found/
    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
          ready: function(err, bs) {    
            bs.addMiddleware("*", (req, res) => {
              const content_404 = fs.readFileSync(`${dir.output}/404.html`);
              // Add 404 http status code in request header.
              res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
              // Provides the 404 content without redirect.
              res.write(content_404);
              res.end();
            });
          }
        }
    });

    // Get all elements in /posts/
    // I don't use tags because I want to use it for taxonomies
    eleventyConfig.addCollection("postsList", function (collection) {
        return collection.getFilteredByGlob(`./${dir.input}/${dir.posts}/**/*.md`);
    });

    // HTML minify
    // https://www.11ty.dev/docs/config/#transforms-example-minify-html-output
    eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
        if( outputPath && outputPath.endsWith(".html") ) {
          let minified = htmlmin.minify(content, {
            useShortDoctype: true,
            removeComments: true,
            collapseWhitespace: true
          });
          return minified;
        }
    
        return content;
    });

    // Tags
    eleventyConfig.addCollection("tagsList", function (collection) {
        let ignoredTags = [];
        
        let tagsSet = collection.getAllSorted()
            .filter(item => "tags" in item.data) // Filter on pages with tags
            .reduce((tags, item) => tags.concat(...item.data.tags), []) // Reduce to array of tags
            .filter(tag => !ignoredTags.includes(tag)) // Remove ignored tags
            .reduce((tagsSet, tag) => tagsSet.add(tag), new Set()); // Reduce to a set 

        return [...tagsSet].sort();
    });

    return {
        dir: dir
    };

};