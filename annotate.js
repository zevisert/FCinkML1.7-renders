let fs = require('fs');
let path = require('path');

let inputFolder  = "./sources";
let outputFolder = "./annotated";

let header = /<ink\ xmlns=.*>/;
let replacementHeader =
`<ink xmlns="http://www.w3.org/2003/InkML">
    <inkml:definitions>
        <inkml:context xml:id="ctx0">
            <inkml:inkSource xml:id="inkSrc0">
                <inkml:traceFormat>
                    <inkml:channel name="X" type="integer" max="3000" units="in"/>
                    <inkml:channel name="Y" type="integer" max="3000" units="in"/>
                    <inkml:channel name="F" type="integer" max="3000" units="dev"/>
                </inkml:traceFormat>
                <inkml:channelProperties>
                    <inkml:channelProperty channel="X" name="resolution" value="500" units="1/in"/>
                    <inkml:channelProperty channel="Y" name="resolution" value="500" units="1/in"/>
                    <inkml:channelProperty channel="F" name="resolution" value="0" units="1/dev"/>
                </inkml:channelProperties>
            </inkml:inkSource>
            <inkml:timestamp xml:id="ts0" timeString="2011-02-22T00:21:40.232"/>
        </inkml:context>
        <inkml:brush xml:id="br0">
            <inkml:brushProperty name="width" value="0.006667" units="cm"/>
            <inkml:brushProperty name="height" value="0.006667" units="cm"/>
            <inkml:brushProperty name="color" value="#000000"/>
            <inkml:brushProperty name="fitToCurve" value="1"/>
        </inkml:brush>
    </inkml:definitions>`;

let trace = /<trace /g;
let replacementTrace = `<trace contextRef="#ctx0" brushRef="#br0" `;

function annotate(file) {
    // Read file
    fs.readFile(path.join(inputFolder, file), (err, data) => {
        if (err) throw err;
        
        // Replace inkml
        var result = data.toString()
                    .replace(header, replacementHeader)
                    .replace(trace, replacementTrace);
                
        // Write output
        fs.writeFile(path.join(outputFolder, file), result, (err) => {
            if (err) throw err;

            console.log('The file has been saved!');
        });
    });
}

function main() {

    // Clean output folder first
    if (fs.existsSync(outputFolder)) {
        fs.readdirSync(outputFolder).forEach((file, index) => {
            fs.unlinkSync(path.join(outputFolder, file));
        });
        fs.rmdirSync(outputFolder);
    }

    // Make output dir
    fs.mkdirSync(outputFolder);

    // Read and annotate 
    fs.readdir(inputFolder, (err, files) => {
        if (err) throw err;

        files
        .filter((f) => f.match(/.*\.inkml/))
        .forEach(file => annotate(file));
    });
}

main();