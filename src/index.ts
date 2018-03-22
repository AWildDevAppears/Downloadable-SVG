interface APIData {
    name: string;
    age:  number;
}
(function () {
    // Grab our ODM elements
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    const downloadButton = <HTMLAnchorElement>document.getElementById('download_button');

    const ctx = canvas.getContext('2d');

    const { name, age } = getDataFromAPI();

    // Turn the SVG into something we can draw to an image element.
    const data = encodeURIComponent(`
        <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">

            <rect fill="red" x="10" y="10" width="480" height="480"></rect>


            <text x="20" y="50" font-family="Verdana" font-size="35" stroke="white" fill="white">${name}</text>
            <text x="20" y="80" font-family="Verdana" font-size="25" stroke="white" fill="white">${age}</text>

            <circle cx="420" cy="420" r="80" fill="blue"></circle>
            <circle cx="420" cy="420" r="60" fill="white"></circle>
            <circle cx="420" cy="420" r="40" fill="pink"></circle>
            <circle cx="420" cy="420" r="20" fill="yellow"></circle>
        </svg>
    `);

    // Create an image, load it in with the correct dataURI
    const svg = new Image();
    svg.onload = () => {
        ctx.drawImage(svg, 0, 0);

        // Push all of our data to the download link so we can download the image as a PNG.
        downloadButton.setAttribute('download', 'downloadable.png');
        downloadButton.setAttribute('target', '_blank');
        downloadButton.setAttribute('rel', 'noopener noreferrer')
        downloadButton.setAttribute('href', canvas.toDataURL('image/png'));

    };
    svg.src = `data:image/svg+xml,${data}`;

    // This would technically talk to an API or possibly be
    // assigned using a templating language (if the svg was in the html)
    function getDataFromAPI(): APIData {
        // Mock API call
        return {
            name: 'Sally',
            age: 26
        };
    }
}());


