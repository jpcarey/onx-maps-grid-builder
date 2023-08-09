import arg from "arg";

export const initConfig = () => {
  const args = arg({
    // args can use `--name <string>` or `--name=<string>` syntax.
    "--name": String,
    "--location": String,
    "--columns": Number,
    "--rows": Number,

    // aliases, where the values are stored in the longer argument names
    "-n": "--name",
    "-l": "--location",
    "-c": "--columns",
    "-r": "--rows",
  });

  const initErrors: string[] = [];
  // validate for the required arguments
  // This extra check is necessary for Typscript type safety
  if (
    !args["--name"] ||
    !args["--location"] ||
    !args["--columns"] ||
    !args["--rows"] ||
    !process.env.TOKEN
  ) {
    if (!args["--name"]) {
      initErrors.push("missing required argument: --name");
    }
    if (!args["--location"]) {
      initErrors.push("missing required argument: --location");
    }
    if (!args["--columns"]) {
      initErrors.push("missing required argument: --columns");
    }
    if (!args["--rows"]) {
      initErrors.push("missing required argument: --rows");
    }
    if (!process.env.TOKEN) {
      // TODO: validate the token has been provided and appears to be valid
      initErrors.push("missing required environment variable: TOKEN");
    }

    throw new Error(initErrors.join("\n"));
  }

  return {
    namePrefix: args["--name"],
    location: args["--location"],
    columns: args["--columns"],
    rows: args["--rows"],
    requestToken: process.env.TOKEN,
  };
};
