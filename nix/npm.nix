{ npmCmd ? ""}:

let runScript = ''
      #! /usr/bin/env bash
      set -e
 
      npm ${npmCmd}
    '';

    npm = import ./env.nix { inherit runScript; };

in npm
