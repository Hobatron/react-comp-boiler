module.exports = (destionation, compName) => {
    let Boilerplate =
        "import React from 'react';" +
        "\nimport " + compName + " from './components/" + compName + "';" +
        "\n" +
        "\nfunction " + destionation + "() {" +
        "\n\treturn (" +
        "\n" +
        "\n\t);" +
        "\n};" +
        "\nexport default " + destionation + ';';

    return Boilerplate;
}