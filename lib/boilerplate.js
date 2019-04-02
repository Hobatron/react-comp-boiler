module.exports = (compName) => {
    let Boilerplate =
        "import React from 'react';" +
        "\n" +
        "\nfunction " + compName + "() {" +
        "\n\treturn (" +
        "\n" +
        "\n\t);" +
        "\n};" +
        "\nexport default " + compName;

    return Boilerplate;
}