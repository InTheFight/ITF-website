{ lintCmd ? ""}:

let runScript = ''
      #! /usr/bin/env bash

      set -e

      if [ ! -d node_modules ];
      then
         npm install
      fi;
         node_modules/eslint/bin/eslint.js ${lintCmd}
    '';

    lint = import ./env.nix { inherit runScript; };

in lint
