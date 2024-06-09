{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachSystem (flake-utils.lib.defaultSystems) (
      system: let
        pkgs = import nixpkgs { inherit system; };
      in {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs_22
            nodePackages_latest.pnpm
          ];
          
          shellHook = ''
            echo -e "\e[1;32m\n[Initializing environment]\n\e[0m"

            echo -e "\e[1;32m\n[Installing modules]\n\e[0m"
            pnpm install

            echo -e "\e[1;32m\n[Running server]\n\e[0m"
            pnpm dev
          '';
        };
      }
    );
}