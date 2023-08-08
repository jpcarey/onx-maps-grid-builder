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

  // validate for the required arguments
  if (!args["--name"]) throw new Error("missing required argument: --name");
  if (!args["--location"])
    throw new Error("missing required argument: --location");
  if (!args["--columns"])
    throw new Error("missing required argument: --columns");
  if (!args["--rows"]) throw new Error("missing required argument: --rows");

  // TODO: validate the token has been provided and appears to be valid
  // console.log(process.env.TOKEN?.substring(0, 10));
  if (!process.env.TOKEN)
    throw new Error("missing required environment variable: TOKEN");

  return {
    namePrefix: args["--name"],
    location: args["--location"],
    columns: args["--columns"],
    rows: args["--rows"],
    requestToken: process.env.TOKEN,
  };
};
