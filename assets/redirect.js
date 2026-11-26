const entry = location.protocol === "file:" ? "./index.html" : "./";
location.replace(entry + location.search + location.hash);
