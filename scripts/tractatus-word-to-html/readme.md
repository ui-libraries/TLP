requires python 3.7+, node 15+

`pip install python-docx`

node_modules is included in this repo because it's just lodash. npm install to regenerate the folder

Rename Word docs to recto.docx and verso.docx and place in same directory as the python scripts

`./run.sh`

an index.html file will be generated in the /dist directory. entire contents of dist go on server

verso.json and recto.json are generated each time it's run, so any manual edits to these files will be overwritten
