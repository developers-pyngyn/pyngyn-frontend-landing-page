// `node --import ./tests/support/register.mjs`: lets tests import .tsx components.
import { register } from "node:module";

register("./tsx-loader.mjs", import.meta.url);
