# FCinkML1.7-renders
Renders of A. Awal, G. Feng, H. Mouchère, and C. Viard-Gaudin's flowchart dataset from their paper:  

> Awal, Ahmad Montaser & Feng, Guihuan & Mouchère, Harold & Viard-Gaudin, Christian. (2011). First Experiments on a new Online Handwritten Flowchart Database. Proceedings of SPIE - The International Society for Optical Engineering. 7874. 1-10. 10.1117/12.876624. 

Get the original dataset [here](http://ivc.univ-nantes.fr/en/databases/Flowchart/)

The original dataset doesn't work directly with InkML.js so I replaced portions of the .inkML files to provide the necessary context for InkMl.
This is done with node.
> `node annotate.js`.

To convert the files, run `http-server` or alike to load converter.htm. Conversion happens in the browser instead of something like JSDOM to ease
issues of working with canvas outside of the browser.

This converter uses:
* [Microsoft/InkMLjs](https://github.com/Microsoft/InkMLjs) to render the files
* [eligrey/FileSaver.js](https://github.com/eligrey/FileSaver.js) to programatically download the renders
* [eligey/canvas-toBlob.js](https://github.com/eligrey/canvas-toBlob.js) to capture the contents of the inkml canvas

